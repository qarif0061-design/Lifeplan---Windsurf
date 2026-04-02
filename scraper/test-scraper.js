const TDPCommunityScraper = require('./tdp-scraper');

async function testScraper() {
    console.log('🧪 Testing TDP Community Scraper...');
    
    const scraper = new TDPCommunityScraper();
    
    try {
        // Test basic functionality without login
        await scraper.run({
            visitProfiles: false // Set to false for quick test
        });
        
        console.log('✅ Test completed successfully!');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

// Run test
testScraper();
