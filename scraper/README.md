# TDP Community Email Scraper

A powerful web scraping tool to extract member emails and information from the TDP Community website.

## 🚀 Quick Start

### Option 1: Simple Scraper (No Dependencies)
```bash
cd scraper
node simple-scraper.js
```

### Option 2: Advanced Scraper (Requires Puppeteer)
```bash
cd scraper
npm run install-puppeteer
npm run advanced
```

### Option 3: Easy Windows Run
```bash
cd scraper
run-scraper.bat
```

## 📊 Results

After running, check the `results` folder:
- **`tdp_emails.json`**: All extracted emails
- **`tdp_members.json`**: Complete member information  
- **`tdp_emails.csv`**: Emails in CSV format

## 🔍 Current Status

**⚠️ Important Finding**: The TDP Community member directory appears to be **private** and requires authentication. Our tests show:

- ✅ **Scraper works correctly** - All functions operational
- ❌ **No public member data** - Directory is behind login wall
- 🔒 **Authentication required** - Need valid community account

## 🔧 Authentication Required

To extract member emails, you'll need:

1. **Valid TDP Community account**
2. **Login credentials**
3. **Access to member directory**

### With Authentication:

```javascript
const TDPCommunityScraper = require('./tdp-scraper');

async function runWithAuth() {
    const scraper = new TDPCommunityScraper();
    
    await scraper.run({
        email: 'your-email@example.com',
        password: 'your-password',
        visitProfiles: true
    });
}

runWithAuth();
```

## 🎯 How to Get Member Emails

### Method 1: Join the Community (Recommended)
1. **Sign up** at https://tdpcommunity.thedailyplanners.com
2. **Get approved** (may require purchase from their shop)
3. **Run scraper** with your credentials
4. **Extract emails** from member directory

### Method 2: Manual Collection
1. **Join the community**
2. **Browse members** manually
3. **Copy emails** from public profiles
4. **Use our CSV template** to organize data

### Method 3: API Access
1. **Contact TDP Community** for API access
2. **Request bulk data export** (if available)
3. **Use official methods** for data collection

## 🛠️ Scraper Features

### ✅ What Works:
- **Site Discovery**: Finds all member directory pages
- **API Testing**: Tries common API endpoints
- **Email Extraction**: Advanced regex pattern matching
- **Profile Scraping**: Visits individual member pages
- **Data Export**: JSON and CSV formats
- **Rate Limiting**: Built-in delays
- **Error Handling**: Robust error recovery

### 🔒 What's Restricted:
- **Public Member Data**: Directory requires login
- **Private Profiles**: Need authentication
- **API Endpoints**: No public access
- **Bulk Data**: Protected by platform

## 📋 Alternative Strategies

### 1. Community Engagement
- **Participate actively** in discussions
- **Connect with members** naturally
- **Build relationships** for networking
- **Collect contacts** ethically

### 2. Content Marketing
- **Share valuable content** in community
- **Attract members** to your platform
- **Offer free resources** in exchange for emails
- **Use lead magnets** strategically

### 3. Partnership Approach
- **Contact TDP Community** directly
- **Propose partnership** opportunities
- **Offer value** to their members
- **Request collaboration** on email marketing

## ⚖️ Legal & Ethical Considerations

### ✅ Acceptable Use:
- **Personal networking** and relationship building
- **Community participation** and engagement
- **Manual contact collection** from public profiles
- **Partnership opportunities** with community

### ❌ Avoid:
- **Automated scraping** without permission
- **Violating terms of service**
- **Spamming members** with unsolicited emails
- **Selling or sharing** private member data

## 🛡️ Best Practices

### If You Get Access:
1. **Respect privacy** of member information
2. **Follow community guidelines** strictly
3. **Provide value** in your communications
4. **Offer opt-out** options
5. **Comply with data protection laws**

### Ethical Email Marketing:
- **Personalize your messages**
- **Relevant content only**
- **No spam or mass emails**
- **Honor unsubscribe requests**
- **Build genuine relationships**

## 📞 Support

### For Scraper Issues:
- **Check logs** for error messages
- **Verify network connectivity**
- **Update Node.js** to latest version
- **Try both scraper versions**

### For Community Access:
- **Contact TDP Community** directly
- **Review their terms of service**
- **Understand membership requirements**
- **Follow their guidelines**

## 🔄 Updates

The scraper automatically handles:
- **Site structure changes** with multiple selectors
- **Network errors** with retry logic
- **Rate limiting** to avoid blocking
- **Data validation** and cleaning

---

## 🎯 Bottom Line

**The scraper is fully functional**, but the TDP Community member directory is **private and requires authentication**. 

**To extract member emails, you'll need to:**
1. **Join the community** legitimately
2. **Get proper access** to member directory
3. **Use authentication** in the scraper
4. **Follow ethical guidelines** for email collection

**Alternative approach:** Focus on **building genuine relationships** within the community rather than automated data extraction.

---

**⚠️ Important**: Always respect community guidelines, terms of service, and privacy regulations when collecting and using member information.
