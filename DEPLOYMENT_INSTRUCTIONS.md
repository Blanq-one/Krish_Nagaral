# Deployment Instructions for Portfolio

## Quick Steps to Deploy Your Portfolio

### 1. Create GitHub Repository
- Go to: https://github.com/new
- Repository name: **Krish_Nagaral** (must match your vite.config.js base path)
- Make it **Public** (required for free GitHub Pages)
- **Don't** initialize with README
- Click "Create repository"

### 2. Push Your Code
Run these commands in your terminal:

```bash
# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/Blanq-one/Krish_Nagaral.git

# Push your code
git branch -M main
git push -u origin main
```

**OR if you prefer to keep master branch:**
```bash
git remote add origin https://github.com/Blanq-one/Krish_Nagaral.git
git push -u origin master
```

### 3. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**, select: **GitHub Actions**
5. Save

### 4. Wait for Deployment
- GitHub Actions will automatically build and deploy your site
- Go to **Actions** tab to see deployment progress
- Once complete, your site will be live at:
  - **https://blanq-one.github.io/Krish_Nagaral/**

### 5. Update Repository Name (Optional)
If you used a different repository name, update `vite.config.js`:
```javascript
base: process.env.NODE_ENV === 'production' ? "/YOUR_REPO_NAME/" : "/",
```

## Your Portfolio URL
Once deployed, your portfolio will be accessible at:
**https://blanq-one.github.io/Krish_Nagaral/**

Your GitHub username: **Blanq-one**

