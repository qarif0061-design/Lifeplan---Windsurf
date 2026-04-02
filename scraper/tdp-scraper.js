const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

class TDPCommunityScraper {
    constructor() {
        this.baseUrl = 'https://tdpcommunity.thedailyplanners.com';
        this.membersUrl = 'https://tdpcommunity.thedailyplanners.com/members/all';
        this.emails = [];
        this.members = [];
        this.browser = null;
        this.page = null;
    }

    async init() {
        console.log('🚀 Initializing TDP Community Scraper...');
        this.browser = await puppeteer.launch({
            headless: false, // Set to true for production
            defaultViewport: null,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--single-process',
                '--disable-gpu'
            ]
        });
        this.page = await this.browser.newPage();
        
        // Set user agent to avoid detection
        await this.page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        
        // Enable request interception for debugging
        await this.page.setRequestInterception(true);
        this.page.on('request', (request) => {
            request.continue();
        });
        
        console.log('✅ Browser initialized successfully');
    }

    async login(email, password) {
        console.log('🔐 Attempting to login...');
        
        try {
            await this.page.goto(this.baseUrl, { waitUntil: 'networkidle2' });
            
            // Look for login/signup buttons
            const signInButton = await this.page.$('a[href*="sign_in"]');
            if (signInButton) {
                await signInButton.click();
                await this.page.waitForNavigation({ waitUntil: 'networkidle2' });
            }
            
            // Fill login form
            await this.page.waitForSelector('input[type="email"], input[name="email"]', { timeout: 10000 });
            
            // Try different email field selectors
            const emailSelectors = ['input[type="email"]', 'input[name="email"]', 'input[placeholder*="email"]'];
            let emailField = null;
            
            for (const selector of emailSelectors) {
                try {
                    emailField = await this.page.$(selector);
                    if (emailField) break;
                } catch (e) {
                    continue;
                }
            }
            
            if (!emailField) {
                throw new Error('Email field not found');
            }
            
            await emailField.type(email);
            
            // Try different password field selectors
            const passwordSelectors = ['input[type="password"]', 'input[name="password"]'];
            let passwordField = null;
            
            for (const selector of passwordSelectors) {
                try {
                    passwordField = await this.page.$(selector);
                    if (passwordField) break;
                } catch (e) {
                    continue;
                }
            }
            
            if (!passwordField) {
                throw new Error('Password field not found');
            }
            
            await passwordField.type(password);
            
            // Submit login form
            const submitButton = await this.page.$('button[type="submit"], input[type="submit"], button:contains("Sign In"), button:contains("Log In")');
            if (submitButton) {
                await submitButton.click();
            } else {
                await passwordField.press('Enter');
            }
            
            await this.page.waitForNavigation({ waitUntil: 'networkidle2' });
            
            // Check if login was successful
            const isLoggedIn = await this.checkLoginStatus();
            
            if (isLoggedIn) {
                console.log('✅ Login successful!');
                return true;
            } else {
                console.log('❌ Login failed');
                return false;
            }
            
        } catch (error) {
            console.error('❌ Login error:', error.message);
            return false;
        }
    }

    async checkLoginStatus() {
        try {
            // Check for logout button or user menu
            const logoutSelectors = [
                'a[href*="sign_out"]',
                'a[href*="logout"]',
                'button:contains("Sign Out")',
                '.user-menu',
                '.profile-menu'
            ];
            
            for (const selector of logoutSelectors) {
                try {
                    const element = await this.page.$(selector);
                    if (element) return true;
                } catch (e) {
                    continue;
                }
            }
            
            // Check if we're still on login page
            const currentUrl = this.page.url();
            return !currentUrl.includes('sign_in') && !currentUrl.includes('login');
        } catch (error) {
            return false;
        }
    }

    async scrapeMembers() {
        console.log('👥 Starting member scraping...');
        
        try {
            await this.page.goto(this.membersUrl, { waitUntil: 'networkidle2' });
            
            // Wait for member list to load
            await this.page.waitForTimeout(3000);
            
            let hasNextPage = true;
            let pageNumber = 1;
            
            while (hasNextPage) {
                console.log(`📄 Scraping page ${pageNumber}...`);
                
                // Extract member information from current page
                const pageMembers = await this.extractMembersFromPage();
                this.members.push(...pageMembers);
                
                // Extract emails from current page
                const pageEmails = await this.extractEmailsFromPage();
                this.emails.push(...pageEmails);
                
                console.log(`📊 Found ${pageMembers.length} members and ${pageEmails.length} emails on page ${pageNumber}`);
                
                // Try to go to next page
                hasNextPage = await this.goToNextPage();
                pageNumber++;
                
                // Add delay to avoid rate limiting
                await this.page.waitForTimeout(2000);
            }
            
            console.log(`✅ Scraping complete! Found ${this.members.length} total members and ${this.emails.length} total emails`);
            
        } catch (error) {
            console.error('❌ Scraping error:', error.message);
        }
    }

    async extractMembersFromPage() {
        try {
            const members = await this.page.evaluate(() => {
                const memberData = [];
                
                // Try different selectors for member cards
                const memberSelectors = [
                    '.member-card',
                    '.member-item',
                    '.user-card',
                    '.member',
                    '[data-member]',
                    '.person',
                    '.profile-card'
                ];
                
                let memberElements = [];
                for (const selector of memberSelectors) {
                    memberElements = document.querySelectorAll(selector);
                    if (memberElements.length > 0) break;
                }
                
                memberElements.forEach(element => {
                    const member = {};
                    
                    // Extract name
                    const nameSelectors = ['.name', '.member-name', '.user-name', 'h3', 'h4', '.title'];
                    for (const selector of nameSelectors) {
                        const nameElement = element.querySelector(selector);
                        if (nameElement) {
                            member.name = nameElement.textContent.trim();
                            break;
                        }
                    }
                    
                    // Extract email
                    const emailSelectors = ['.email', '.member-email', 'a[href*="mailto:"]'];
                    for (const selector of emailSelectors) {
                        const emailElement = element.querySelector(selector);
                        if (emailElement) {
                            const emailText = emailElement.textContent.trim();
                            const emailMatch = emailText.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/);
                            if (emailMatch) {
                                member.email = emailMatch[1];
                                break;
                            }
                        }
                    }
                    
                    // Extract profile URL
                    const linkElement = element.querySelector('a[href*="/members/"]');
                    if (linkElement) {
                        member.profileUrl = linkElement.href;
                    }
                    
                    // Extract bio/description
                    const bioSelectors = ['.bio', '.description', '.about', '.member-bio'];
                    for (const selector of bioSelectors) {
                        const bioElement = element.querySelector(selector);
                        if (bioElement) {
                            member.bio = bioElement.textContent.trim();
                            break;
                        }
                    }
                    
                    if (member.name || member.email) {
                        memberData.push(member);
                    }
                });
                
                return memberData;
            });
            
            return members;
        } catch (error) {
            console.error('❌ Error extracting members:', error.message);
            return [];
        }
    }

    async extractEmailsFromPage() {
        try {
            const emails = await this.page.evaluate(() => {
                const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
                const pageText = document.body.innerText;
                const matches = pageText.match(emailRegex) || [];
                return [...new Set(matches)]; // Remove duplicates
            });
            
            return emails;
        } catch (error) {
            console.error('❌ Error extracting emails:', error.message);
            return [];
        }
    }

    async goToNextPage() {
        try {
            // Try different pagination selectors
            const nextSelectors = [
                'a[rel="next"]',
                '.next',
                '.pagination-next',
                'a:contains("Next")',
                'button:contains("Next")',
                '.page-next'
            ];
            
            for (const selector of nextSelectors) {
                try {
                    const nextButton = await this.page.$(selector);
                    if (nextButton) {
                        const isDisabled = await this.page.evaluate(el => el.disabled || el.classList.contains('disabled'), nextButton);
                        if (!isDisabled) {
                            await nextButton.click();
                            await this.page.waitForNavigation({ waitUntil: 'networkidle2' });
                            return true;
                        }
                    }
                } catch (e) {
                    continue;
                }
            }
            
            return false;
        } catch (error) {
            console.error('❌ Error going to next page:', error.message);
            return false;
        }
    }

    async visitMemberProfiles() {
        console.log('🔍 Visiting individual member profiles for detailed info...');
        
        for (let i = 0; i < this.members.length; i++) {
            const member = this.members[i];
            
            if (member.profileUrl && !member.email) {
                try {
                    console.log(`👤 Visiting profile: ${member.name || 'Unknown'}`);
                    
                    await this.page.goto(member.profileUrl, { waitUntil: 'networkidle2' });
                    await this.page.waitForTimeout(2000);
                    
                    // Extract email from profile page
                    const profileEmails = await this.extractEmailsFromPage();
                    if (profileEmails.length > 0) {
                        member.email = profileEmails[0]; // Take first email found
                        this.emails.push(profileEmails[0]);
                    }
                    
                    // Extract additional profile info
                    const additionalInfo = await this.page.evaluate(() => {
                        const info = {};
                        
                        // Try to find contact information
                        const contactSelectors = ['.contact', '.contact-info', '.member-contact'];
                        for (const selector of contactSelectors) {
                            const contactElement = document.querySelector(selector);
                            if (contactElement) {
                                info.contactInfo = contactElement.textContent.trim();
                                break;
                            }
                        }
                        
                        return info;
                    });
                    
                    Object.assign(member, additionalInfo);
                    
                } catch (error) {
                    console.error(`❌ Error visiting profile ${member.profileUrl}:`, error.message);
                }
                
                // Add delay to avoid rate limiting
                await this.page.waitForTimeout(3000);
            }
        }
    }

    async saveResults() {
        console.log('💾 Saving results...');
        
        // Create results directory
        const resultsDir = path.join(__dirname, 'results');
        if (!fs.existsSync(resultsDir)) {
            fs.mkdirSync(resultsDir);
        }
        
        // Save emails
        const emailsData = {
            extractedAt: new Date().toISOString(),
            totalEmails: this.emails.length,
            emails: [...new Set(this.emails)] // Remove duplicates
        };
        
        fs.writeFileSync(
            path.join(resultsDir, 'tdp_emails.json'),
            JSON.stringify(emailsData, null, 2)
        );
        
        // Save members
        const membersData = {
            extractedAt: new Date().toISOString(),
            totalMembers: this.members.length,
            members: this.members
        };
        
        fs.writeFileSync(
            path.join(resultsDir, 'tdp_members.json'),
            JSON.stringify(membersData, null, 2)
        );
        
        // Save emails as CSV
        const csvContent = 'Email,Name,Profile URL,Bio\n' + 
            [...new Set(this.emails)].map(email => {
                const member = this.members.find(m => m.email === email);
                return `"${email}","${member?.name || ''}","${member?.profileUrl || ''}","${member?.bio || ''}"`;
            }).join('\n');
        
        fs.writeFileSync(
            path.join(resultsDir, 'tdp_emails.csv'),
            csvContent
        );
        
        console.log(`✅ Results saved to ${resultsDir}/`);
        console.log(`📊 Emails: ${emailsData.emails.length}`);
        console.log(`👥 Members: ${membersData.totalMembers}`);
    }

    async run(options = {}) {
        const { email, password, visitProfiles = true } = options;
        
        try {
            await this.init();
            
            // Try to login if credentials provided
            if (email && password) {
                const loginSuccess = await this.login(email, password);
                if (!loginSuccess) {
                    console.log('⚠️ Login failed, proceeding without authentication...');
                }
            }
            
            // Scrape members
            await this.scrapeMembers();
            
            // Visit individual profiles if requested
            if (visitProfiles) {
                await this.visitMemberProfiles();
            }
            
            // Save results
            await this.saveResults();
            
        } catch (error) {
            console.error('❌ Scraper error:', error.message);
        } finally {
            await this.cleanup();
        }
    }

    async cleanup() {
        if (this.browser) {
            await this.browser.close();
            console.log('🧹 Browser closed');
        }
    }
}

// Usage example
async function main() {
    const scraper = new TDPCommunityScraper();
    
    // Run without authentication (public data only)
    await scraper.run({
        visitProfiles: true
    });
    
    // Or run with authentication
    // await scraper.run({
    //     email: 'your-email@example.com',
    //     password: 'your-password',
    //     visitProfiles: true
    // });
}

// Export for use as module
module.exports = TDPCommunityScraper;

// Run if called directly
if (require.main === module) {
    main().catch(console.error);
}
