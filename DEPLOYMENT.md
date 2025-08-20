# 🚀 Deployment Guide

This guide will help you deploy your portfolio website to GitHub Pages.

## Prerequisites

1. **GitHub Account**: Make sure you have a GitHub account
2. **Repository**: Your repository should be named `dharmeshim.github.io` (or `username.github.io`)
3. **Node.js**: Version 18 or higher installed
4. **Git**: Git installed and configured

## 🎯 Step 1: Repository Setup

1. Create a new repository on GitHub named `dharmeshim.github.io`
2. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/dharmeshim/dharmeshim.github.io.git
   cd dharmeshim.github.io
   ```

## 🛠️ Step 2: Install Dependencies

```bash
npm install
```

## 🧪 Step 3: Test Locally

Before deploying, test your application locally:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to verify everything works.

## 🚀 Step 4: Deploy to GitHub Pages

### Option A: Automatic Deployment (Recommended)

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit - Portfolio website"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click on "Settings" tab
   - Scroll down to "Pages" section
   - Under "Source", select "GitHub Actions"
   - The GitHub Actions workflow will automatically build and deploy your site

3. **Wait for deployment**:
   - Go to "Actions" tab to monitor the deployment progress
   - Once complete, your site will be available at `https://dharmeshim.github.io`

### Option B: Manual Deployment

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy using gh-pages**:
   ```bash
   npm run deploy
   ```

3. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Set source to "Deploy from a branch"
   - Select `gh-pages` branch and `/ (root)` folder
   - Click Save

## 🔧 Step 5: Verify Deployment

1. Wait a few minutes for changes to propagate
2. Visit `https://dharmeshim.github.io`
3. Check that all sections load correctly
4. Test navigation and responsiveness

## 📝 Step 6: Custom Domain (Optional)

If you want to use a custom domain:

1. **Add custom domain**:
   - Go to repository Settings → Pages
   - Enter your domain in "Custom domain" field
   - Click Save

2. **Update configuration**:
   - Update `vite.config.ts` base path
   - Update `package.json` homepage
   - Update meta tags in `index.html`

3. **DNS Configuration**:
   - Add CNAME record pointing to `username.github.io`
   - Wait for DNS propagation (up to 24 hours)

## 🔄 Updating Your Site

### Automatic Updates
- Simply push changes to the `main` branch
- GitHub Actions will automatically rebuild and deploy

### Manual Updates
```bash
npm run build
npm run deploy
```

## 🐛 Troubleshooting

### Common Issues

1. **Site not loading**:
   - Check GitHub Actions for build errors
   - Verify base path in `vite.config.ts`
   - Ensure repository is public

2. **Assets not loading**:
   - Check file paths in `index.html`
   - Verify base path configuration
   - Check browser console for 404 errors

3. **Build failures**:
   - Check Node.js version (requires 18+)
   - Run `npm install` to ensure dependencies are up to date
   - Check for TypeScript errors with `npm run type-check`

### Getting Help

- Check GitHub Actions logs for detailed error messages
- Verify all configuration files are correct
- Ensure all dependencies are properly installed

## 📚 Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Configuration](https://vitejs.dev/config/)
- [React Deployment](https://create-react-app.dev/docs/deployment/)

---

**Happy Deploying! 🎉**

Your portfolio will be live at: [https://dharmeshim.github.io](https://dharmeshim.github.io)
