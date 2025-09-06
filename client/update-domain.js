#!/usr/bin/env node

/**
 * Domain Update Script for OrderFast
 * This script updates all domain references in your SEO files
 */

const fs = require('fs');
const path = require('path');

// Configuration
const OLD_DOMAIN = 'https://orderfast.com';
const NEW_DOMAIN = 'https://orderfast.com'; // Current domain - all files are already updated!

// Files to update
const filesToUpdate = [
    'public/index.html',
    'public/sitemap.xml',
    'public/robots.txt',
    'src/Components/SEO/SEOHead.jsx',
    'src/Components/Order/Order.jsx',
    'src/Components/LoginSignup/LoginSignup.jsx',
    'src/Components/Order/Orders.jsx'
];

function updateDomainInFile(filePath) {
    try {
        const fullPath = path.join(__dirname, filePath);
        
        if (!fs.existsSync(fullPath)) {
            console.log(`⚠️  File not found: ${filePath}`);
            return;
        }

        let content = fs.readFileSync(fullPath, 'utf8');
        const originalContent = content;
        
        // Replace domain references
        content = content.replace(new RegExp(OLD_DOMAIN.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), NEW_DOMAIN);
        
        if (content !== originalContent) {
            fs.writeFileSync(fullPath, content, 'utf8');
            console.log(`✅ Updated: ${filePath}`);
        } else {
            console.log(`ℹ️  No changes needed: ${filePath}`);
        }
    } catch (error) {
        console.error(`❌ Error updating ${filePath}:`, error.message);
    }
}

function main() {
    console.log('🚀 Starting domain update process...');
    console.log(`📝 Updating from: ${OLD_DOMAIN}`);
    console.log(`📝 Updating to: ${NEW_DOMAIN}`);
    console.log('');

    filesToUpdate.forEach(updateDomainInFile);
    
    console.log('');
    console.log('✅ Domain update completed!');
    console.log('');
    console.log('📋 Next steps:');
    console.log('1. Register your new domain');
    console.log('2. Update DNS settings');
    console.log('3. Set up 301 redirects');
    console.log('4. Update Google Search Console');
    console.log('5. Test all URLs');
}

// Run the script
if (require.main === module) {
    main();
}

module.exports = { updateDomainInFile, OLD_DOMAIN, NEW_DOMAIN };
