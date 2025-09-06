# 🌐 OrderFast Domain Change Guide

## Quick Domain Change Process

### Step 1: Choose Your New Domain
**Recommended domains:**
- `orderfast.com` ⭐ (Best choice)
- `orderfast.app` ⭐ (Great for mobile)
- `orderfast.io` ⭐ (Modern)
- `foodorderfast.com` (Food-focused)

### Step 2: Files That Need Domain Updates

#### 1. `public/index.html`
**Lines to update:**
- Line 21: `<meta property="og:url" content="https://orderfast.com/" />`
- Line 31: `<meta property="twitter:url" content="https://orderfast.com/" />`
- Line 48: `<link rel="canonical" href="https://orderfast.com/" />`
- Line 70: `"url": "https://orderfast.com",`
- Line 71: `"logo": "https://orderfast.com/logo512.png",`
- Line 72: `"image": "https://orderfast.com/logo512.png",`
- Line 125: `"hasMap": "https://orderfast.com",`

#### 2. `public/sitemap.xml`
**All URLs need updating:**
- `<loc>https://orderfast.com/</loc>`
- `<loc>https://orderfast.com/order</loc>`
- `<loc>https://orderfast.com/orders</loc>`

#### 3. `public/robots.txt`
**Line to update:**
- `Sitemap: https://orderfast.com/sitemap.xml`

#### 4. `src/Components/SEO/SEOHead.jsx`
**Default URL:**
- Line 8: `url = "https://orderfast.com",`

#### 5. Component Files
**Each component has SEO URLs that need updating:**
- `src/Components/Order/Order.jsx`
- `src/Components/LoginSignup/LoginSignup.jsx`
- `src/Components/Order/Orders.jsx`

### Step 3: Manual Update Instructions

#### Option A: Use the Update Script
1. Edit `update-domain.js`
2. Change `NEW_DOMAIN` to your chosen domain
3. Run: `node update-domain.js`

#### Option B: Manual Update
1. Open each file listed above
2. Find all instances of `https://orderfast.com`
3. Replace with your new domain
4. Save all files

### Step 4: Domain Registration & Setup

#### 1. Register Your Domain
- Go to domain registrar (GoDaddy, Namecheap, etc.)
- Search for your chosen domain
- Purchase the domain

#### 2. DNS Configuration
- Point your domain to your hosting provider
- Set up A records and CNAME records
- Wait for DNS propagation (24-48 hours)

#### 3. SSL Certificate
- Set up SSL certificate for HTTPS
- Ensure all URLs use HTTPS

### Step 5: SEO Migration

#### 1. Set Up 301 Redirects
```apache
# Add to .htaccess file
RewriteEngine On
RewriteCond %{HTTP_HOST} ^olddomain\.com$ [NC]
RewriteRule ^(.*)$ https://newdomain.com/$1 [R=301,L]
```

#### 2. Update Google Search Console
- Add new domain property
- Submit new sitemap
- Set up change of address

#### 3. Update Analytics
- Update Google Analytics property
- Update any tracking codes

### Step 6: Testing

#### 1. Test All URLs
- Homepage: `https://yournewdomain.com/`
- Order page: `https://yournewdomain.com/order`
- Orders page: `https://yournewdomain.com/orders`

#### 2. Test SEO Elements
- Meta tags display correctly
- Sitemap loads: `https://yournewdomain.com/sitemap.xml`
- Robots.txt loads: `https://yournewdomain.com/robots.txt`

#### 3. Test Redirects
- Old URLs redirect to new URLs
- All internal links work
- External links still work

### Step 7: Monitor & Maintain

#### 1. Monitor Rankings
- Check keyword rankings
- Monitor organic traffic
- Watch for any drops

#### 2. Update External References
- Social media profiles
- Business directories
- Marketing materials

## 🚨 Important Notes

### Before Changing Domain:
- ✅ Backup your website
- ✅ Test on staging environment
- ✅ Plan the migration timing
- ✅ Prepare redirects

### After Changing Domain:
- ✅ Monitor search rankings
- ✅ Check for broken links
- ✅ Update all references
- ✅ Monitor traffic

## 📞 Need Help?

If you need help with any step, just ask! I can:
- Update all files automatically
- Help with DNS configuration
- Guide you through testing
- Monitor the migration process

## 🎯 Quick Start

**To change domain right now:**
1. Tell me your chosen domain
2. I'll update all files automatically
3. You register the domain
4. I'll help with the rest!

**What domain would you like to use?**
