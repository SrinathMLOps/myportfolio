# Deployment Guide for srinathkaithoju.com

## Step 1: Push Code to GitHub

### If you don't have Git installed:
1. Download Git from: https://git-scm.com/downloads
2. Install it with default settings

### Initialize and Push to GitHub:

Open Command Prompt in your project folder and run these commands:

```cmd
git init
git add .
git commit -m "Initial commit - Portfolio website"
```

### Create GitHub Repository:
1. Go to https://github.com and sign in (or create account)
2. Click the "+" icon (top right) → "New repository"
3. Name it: `portfolio` or `srinathkaithoju.com`
4. Don't initialize with README (we already have files)
5. Click "Create repository"

### Connect and Push:
Replace `YOUR_USERNAME` with your GitHub username:

```cmd
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

You'll be prompted to login to GitHub.

---

## Step 2: Host on srinathkaithoju.com

You have several options:

### Option A: GitHub Pages with Custom Domain (Recommended - FREE)

1. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click "Settings" → "Pages" (left sidebar)
   - Under "Source", select "main" branch
   - Click "Save"

2. **Configure Custom Domain:**
   - In the same Pages settings
   - Under "Custom domain", enter: `srinathkaithoju.com`
   - Click "Save"
   - Check "Enforce HTTPS" (after DNS propagates)

3. **Update DNS Settings:**
   - Go to your domain registrar (where you bought srinathkaithoju.com)
   - Find DNS settings
   - Add these records:

   **For root domain (srinathkaithoju.com):**
   ```
   Type: A
   Name: @ (or leave blank)
   Value: 185.199.108.153
   
   Type: A
   Name: @ (or leave blank)
   Value: 185.199.109.153
   
   Type: A
   Name: @ (or leave blank)
   Value: 185.199.110.153
   
   Type: A
   Name: @ (or leave blank)
   Value: 185.199.111.153
   ```

   **For www subdomain:**
   ```
   Type: CNAME
   Name: www
   Value: YOUR_USERNAME.github.io
   ```

4. **Wait for DNS propagation** (can take 24-48 hours, usually faster)

5. **Verify:** Visit http://srinathkaithoju.com

---

### Option B: Netlify with Custom Domain (FREE, Easier DNS)

1. **Deploy to Netlify:**
   - Go to https://netlify.com and sign up
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub account
   - Select your repository
   - Click "Deploy site"

2. **Add Custom Domain:**
   - In Netlify dashboard, go to "Domain settings"
   - Click "Add custom domain"
   - Enter: `srinathkaithoju.com`
   - Netlify will show you DNS records to add

3. **Update DNS at your registrar:**
   - Follow Netlify's instructions
   - Usually just one CNAME or A record
   - Netlify provides automatic HTTPS

---

### Option C: Vercel with Custom Domain (FREE)

1. **Deploy to Vercel:**
   - Go to https://vercel.com and sign up
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Click "Deploy"

2. **Add Custom Domain:**
   - Go to project settings → "Domains"
   - Add `srinathkaithoju.com`
   - Follow DNS configuration instructions

---

### Option D: Traditional Web Hosting

If you already have hosting (Hostinger, Bluehost, GoDaddy, etc.):

1. **Upload files via FTP:**
   - Use FileZilla or your host's file manager
   - Upload all files to `public_html` or `www` folder

2. **Point domain:**
   - Usually automatic if hosting and domain are from same provider
   - Otherwise, update nameservers at domain registrar

---

## Step 3: Update Your Website Content

Before going live, customize these in `index.html`:

- [ ] Your name
- [ ] Job title and location
- [ ] Email and phone number
- [ ] About me description
- [ ] Services/skills descriptions
- [ ] Testimonials
- [ ] Add your images (profile.jpg, testimonials, client logos)

---

## Troubleshooting

### DNS not working?
- Wait 24-48 hours for propagation
- Check DNS with: https://dnschecker.org
- Clear browser cache

### GitHub Pages not showing?
- Make sure repository is public
- Check that index.html is in root folder
- Verify Pages is enabled in settings

### Images not showing?
- Make sure image files are in the same folder as index.html
- Check file names match exactly (case-sensitive)
- Verify images are pushed to GitHub

---

## Quick Commands Reference

### Update website after changes:
```cmd
git add .
git commit -m "Update content"
git push
```

### Check Git status:
```cmd
git status
```

### View remote repository:
```cmd
git remote -v
```

---

## Need Help?

- GitHub Pages docs: https://docs.github.com/en/pages
- Netlify docs: https://docs.netlify.com
- Vercel docs: https://vercel.com/docs

Your website will be live at: http://srinathkaithoju.com
