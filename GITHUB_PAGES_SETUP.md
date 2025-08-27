# GitHub Pages Setup Instructions

## 📚 How to Enable GitHub Pages for Client Preview

Follow these steps to make your Epsilon Academy project available as a live preview:

### 1. Push Your Code to GitHub
```bash
git add .
git commit -m "Setup GitHub Pages deployment"
git push origin main
```

### 2. Enable GitHub Pages in Repository Settings

1. Go to your GitHub repository: `https://github.com/Fading-Citizen/Epsilon-React`
2. Click on **Settings** (in the repository tabs)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select **"GitHub Actions"**
5. The deployment will automatically start when you push to main

### 3. Access Your Live Preview

Once deployed, your application will be available at:
**https://fading-citizen.github.io/Epsilon-React/**

### 4. Automatic Deployment

Every time you push changes to the `main` branch:
- GitHub Actions will automatically build the project
- Deploy it to GitHub Pages
- Your live preview will be updated within 2-3 minutes

### 5. Manual Deployment (Alternative)

If you prefer manual deployment:
```bash
cd epsilon-academy
npm run deploy
```

## ✅ What's Already Configured

✅ **package.json** - Added homepage and deploy scripts  
✅ **vite.config.js** - Configured base path for GitHub Pages  
✅ **GitHub Actions** - Workflow file created (.github/workflows/deploy.yml)  
✅ **Asset paths** - Updated to work with GitHub Pages  
✅ **Build configuration** - Ready for production deployment  

## 🎯 Perfect for Client Demos

This setup provides:
- **Live URL** - Share the link with clients instantly
- **Automatic updates** - Changes reflect immediately after push
- **Professional presentation** - No need for local setup
- **Mobile responsive** - Test on any device
- **Zero cost** - GitHub Pages is free for public repositories

## 🔧 Troubleshooting

If the deployment fails:
1. Check the **Actions** tab in your GitHub repository
2. Ensure the repository is public (required for free GitHub Pages)
3. Verify all files are committed and pushed
4. Check that the workflow file exists in `.github/workflows/deploy.yml`

## 📱 Testing the Deployment

Once live, test these features:
- ✅ Student Dashboard navigation
- ✅ Teacher Dashboard with quiz builder
- ✅ Admin panel functionality  
- ✅ Dark/light theme toggle
- ✅ Profile management system
- ✅ Responsive design on mobile devices

Your client preview is ready! 🚀
