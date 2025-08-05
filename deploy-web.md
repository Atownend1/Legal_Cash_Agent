# 🌐 Netlify Web Deployment Guide

Your Legal Cash Agent is ready for deployment! Follow these steps:

## Step 1: Go to Netlify
1. Open your browser and go to: https://app.netlify.com
2. Sign in with your account (at.axionx@gmail.com)

## Step 2: Create New Site
1. Click **"New site from Git"**
2. Choose **GitHub** as your Git provider
3. Select your repository: **Atownend1/Legal_Cash_Agent**

## Step 3: Configure Build Settings
Set these exact values:

- **Build command**: `npm run build`
- **Publish directory**: `public`
- **Base directory**: (leave empty)

## Step 4: Deploy
1. Click **"Deploy site"**
2. Wait for the build to complete (usually 2-3 minutes)

## Step 5: Your Site URL
Once deployed, your site will be available at:
`https://[random-name].netlify.app`

## Step 6: Test Your Site
1. Visit your new URL
2. Try the example data buttons
3. Test the analysis feature

## Step 7: Optional - Add Environment Variables
1. Go to **Site settings** → **Environment variables**
2. Add `OPENAI_API_KEY` with your API key (optional)

## Step 8: Custom Domain (Optional)
1. Go to **Domain settings**
2. Click **"Add custom domain"**
3. Follow the DNS instructions

---

## 🎉 Success!
Your Legal Cash Agent will be live and accessible worldwide!

## 🔧 If You Need Help
- Check the build logs in Netlify dashboard
- Verify all files are in the correct directories
- Make sure the build command is exactly: `npm run build`

## 📱 Your Site Features
- ✅ Beautiful web interface
- ✅ AI-powered financial analysis
- ✅ Demo mode (works without API key)
- ✅ Mobile responsive
- ✅ All API endpoints working 