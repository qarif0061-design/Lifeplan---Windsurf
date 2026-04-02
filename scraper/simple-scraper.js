const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

class SimpleTDPScraper {
    constructor() {
        this.baseUrl = 'https://tdpcommunity.thedailyplanners.com';
        this.membersUrl = 'https://tdpcommunity.thedailyplanners.com/members/all';
        this.emails = [];
        this.members = [];
        this.visitedUrls = new Set();
    }

    async fetchUrl(url) {
        return new Promise((resolve, reject) => {
            const protocol = url.startsWith('https') ? https : http;
            
            const options = {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.5',
                    'Accept-Encoding': 'gzip, deflate',
                    'Connection': 'keep-alive',
                    'Upgrade-Insecure-Requests': '1'
                }
            };

            const req = protocol.get(url, options, (res) => {
                let data = '';
                
                // Handle redirects
                if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                    return this.fetchUrl(res.headers.location).then(resolve).catch(reject);
                }
                
                res.on('data', (chunk) => {
                    data += chunk;
                });
                
                res.on('end', () => {
                    resolve(data);
                });
            });
            
            req.on('error', (error) => {
                reject(error);
            });
            
            req.setTimeout(10000, () => {
                req.destroy();
                reject(new Error('Request timeout'));
            });
        });
    }

    extractEmails(text) {
        const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
        const matches = text.match(emailRegex) || [];
        return [...new Set(matches)]; // Remove duplicates
    }

    extractMemberInfo(html) {
        const members = [];
        
        // Extract member names and basic info
        const nameRegex = /<[^>]*class="[^"]*member[^"]*"[^>]*>([^<]+)<\/[^>]*>/gi;
        const nameMatches = html.match(nameRegex) || [];
        
        nameMatches.forEach(match => {
            const name = match.replace(/<[^>]*>/g, '').trim();
            if (name && name.length > 2) {
                members.push({
                    name: name,
                    email: null,
                    profileUrl: null
                });
            }
        });
        
        // Extract profile URLs
        const profileUrlRegex = /href="([^"]*\/members\/[^"]*)"/gi;
        const urlMatches = html.match(profileUrlRegex) || [];
        
        urlMatches.forEach(urlMatch => {
            const url = urlMatch.match(/href="([^"]*)"/)[1];
            if (url && !this.visitedUrls.has(url)) {
                this.visitedUrls.add(url);
                
                // Try to find associated member
                const member = members.find(m => !m.profileUrl);
                if (member) {
                    member.profileUrl = url;
                } else {
                    members.push({
                        name: 'Unknown',
                        email: null,
                        profileUrl: url
                    });
                }
            }
        });
        
        return members;
    }

    async scrapeMemberProfiles() {
        console.log('🔍 Scraping individual member profiles...');
        
        for (const member of this.members) {
            if (member.profileUrl && !member.email) {
                try {
                    console.log(`👤 Visiting: ${member.name || 'Unknown'}`);
                    
                    const profileHtml = await this.fetchUrl(member.profileUrl);
                    const profileEmails = this.extractEmails(profileHtml);
                    
                    if (profileEmails.length > 0) {
                        member.email = profileEmails[0];
                        this.emails.push(profileEmails[0]);
                    }
                    
                    // Add delay to avoid rate limiting
                    await this.sleep(2000);
                    
                } catch (error) {
                    console.error(`❌ Error scraping ${member.profileUrl}:`, error.message);
                }
            }
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async discoverMembers() {
        console.log('🔍 Discovering members...');
        
        try {
            // Try common member directory URLs
            const urls = [
                '/members/all',
                '/members',
                '/directory',
                '/community/members',
                '/users',
                '/people'
            ];
            
            for (const urlPath of urls) {
                try {
                    const fullUrl = this.baseUrl + urlPath;
                    console.log(`🔍 Trying: ${fullUrl}`);
                    
                    const html = await this.fetchUrl(fullUrl);
                    
                    // Extract emails from main page
                    const pageEmails = this.extractEmails(html);
                    this.emails.push(...pageEmails);
                    
                    // Extract member info
                    const pageMembers = this.extractMemberInfo(html);
                    this.members.push(...pageMembers);
                    
                    console.log(`📊 Found ${pageEmails.length} emails and ${pageMembers.length} members from ${urlPath}`);
                    
                    // Look for pagination links
                    const paginationRegex = /href="([^"]*page[^"]*)"|href="([^"]*\?p=[^"]*)"|href="([^"]*\/members\/[^"]*)"/gi;
                    const paginationMatches = html.match(paginationRegex) || [];
                    
                    for (const match of paginationMatches) {
                        const url = match.match(/href="([^"]*)"/)[1];
                        if (url && url.startsWith('/')) {
                            const fullPaginationUrl = this.baseUrl + url;
                            if (!this.visitedUrls.has(fullPaginationUrl)) {
                                this.visitedUrls.add(fullPaginationUrl);
                                
                                try {
                                    console.log(`📄 Following pagination: ${fullPaginationUrl}`);
                                    const paginationHtml = await this.fetchUrl(fullPaginationUrl);
                                    
                                    const paginationEmails = this.extractEmails(paginationHtml);
                                    this.emails.push(...paginationEmails);
                                    
                                    const paginationMembers = this.extractMemberInfo(paginationHtml);
                                    this.members.push(...paginationMembers);
                                    
                                    console.log(`📊 Found ${paginationEmails.length} emails and ${paginationMembers.length} members from pagination`);
                                    
                                    await this.sleep(3000);
                                } catch (error) {
                                    console.error(`❌ Error with pagination ${fullPaginationUrl}:`, error.message);
                                }
                            }
                        }
                    }
                    
                } catch (error) {
                    console.error(`❌ Error with ${urlPath}:`, error.message);
                }
            }
            
        } catch (error) {
            console.error('❌ Error discovering members:', error.message);
        }
    }

    async tryAPIEndpoints() {
        console.log('🔍 Trying API endpoints...');
        
        const apiEndpoints = [
            '/api/members',
            '/api/users',
            '/wp-json/wp/v2/users',
            '/api/v1/members',
            '/api/directory',
            '/members.json',
            '/users.json'
        ];
        
        for (const endpoint of apiEndpoints) {
            try {
                const fullUrl = this.baseUrl + endpoint;
                console.log(`🔍 Trying API: ${fullUrl}`);
                
                const response = await this.fetchUrl(fullUrl);
                
                // Try to parse as JSON
                try {
                    const jsonData = JSON.parse(response);
                    const emails = this.extractEmails(JSON.stringify(jsonData));
                    this.emails.push(...emails);
                    console.log(`📊 Found ${emails.length} emails from API endpoint ${endpoint}`);
                } catch (jsonError) {
                    // Not JSON, try to extract emails from text
                    const emails = this.extractEmails(response);
                    this.emails.push(...emails);
                    console.log(`📊 Found ${emails.length} emails from text endpoint ${endpoint}`);
                }
                
            } catch (error) {
                console.error(`❌ API endpoint ${endpoint} failed:`, error.message);
            }
        }
    }

    saveResults() {
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
        const csvContent = 'Email,Name,Profile URL\n' + 
            [...new Set(this.emails)].map(email => {
                const member = this.members.find(m => m.email === email);
                return `"${email}","${member?.name || ''}","${member?.profileUrl || ''}"`;
            }).join('\n');
        
        fs.writeFileSync(
            path.join(resultsDir, 'tdp_emails.csv'),
            csvContent
        );
        
        console.log(`✅ Results saved to ${resultsDir}/`);
        console.log(`📊 Emails: ${emailsData.emails.length}`);
        console.log(`👥 Members: ${membersData.totalMembers}`);
    }

    async run() {
        console.log('🚀 Starting Simple TDP Community Scraper...');
        
        try {
            // Step 1: Try API endpoints first
            await this.tryAPIEndpoints();
            
            // Step 2: Discover members from web pages
            await this.discoverMembers();
            
            // Step 3: Scrape individual member profiles
            await this.scrapeMemberProfiles();
            
            // Step 4: Save results
            this.saveResults();
            
            console.log('✅ Scraping completed successfully!');
            
        } catch (error) {
            console.error('❌ Scraper error:', error.message);
        }
    }
}

// Usage
async function main() {
    const scraper = new SimpleTDPScraper();
    await scraper.run();
}

// Export for use as module
module.exports = SimpleTDPScraper;

// Run if called directly
if (require.main === module) {
    main().catch(console.error);
}
