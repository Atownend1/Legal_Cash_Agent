# Netlify Deployment Guide

## 🚀 Deploying Legal Cash Agent to Netlify

This guide will help you deploy your Legal Cash Agent to Netlify with full functionality.

### Prerequisites

1. **Netlify Account**: Sign up at [netlify.com](https://netlify.com)
2. **GitHub/GitLab Repository**: Your code should be in a Git repository
3. **OpenAI API Key** (optional): For full AI functionality

### Step 1: Prepare Your Repository

1. **Push your code to GitHub/GitLab**
   ```bash
   git add .
   git commit -m "Prepare for Netlify deployment"
   git push origin main
   ```

2. **Ensure your repository structure looks like this**:
   ```
   Legal_Cash_Agent/
   ├── public/
   │   └── index.html
   ├── netlify/
   │   └── functions/
   │       ├── api.js
   │       └── package.json
   ├── netlify.toml
   ├── package.json
   └── README.md
   ```

### Step 2: Deploy to Netlify

#### Option A: Deploy via Netlify UI

1. **Go to Netlify Dashboard**
   - Visit [app.netlify.com](https://app.netlify.com)
   - Click "New site from Git"

2. **Connect your repository**
   - Choose your Git provider (GitHub/GitLab)
   - Select your Legal Cash Agent repository
   - Click "Deploy site"

3. **Configure build settings**
   - **Build command**: `npm run build`
   - **Publish directory**: `public`
   - Click "Deploy site"

#### Option B: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Deploy your site**
   ```bash
   netlify deploy --prod
   ```

### Step 3: Configure Environment Variables

1. **Go to Site Settings**
   - In your Netlify dashboard, go to your site
   - Click "Site settings" → "Environment variables"

2. **Add OpenAI API Key** (optional)
   - **Key**: `OPENAI_API_KEY`
   - **Value**: Your OpenAI API key
   - Click "Save"

### Step 4: Test Your Deployment

1. **Visit your site**
   - Your site URL will be: `https://your-site-name.netlify.app`

2. **Test the functionality**
   - Try the example data buttons
   - Test the analysis feature
   - Verify API endpoints work

### Step 5: Custom Domain (Optional)

1. **Add custom domain**
   - Go to "Domain settings" in your Netlify dashboard
   - Click "Add custom domain"
   - Follow the DNS configuration instructions

### Troubleshooting

#### Common Issues

1. **Build fails**
   - Check that all files are committed to Git
   - Verify `netlify.toml` is in the root directory
   - Check build logs in Netlify dashboard

2. **Functions not working**
   - Ensure `netlify/functions/api.js` exists
   - Check that `netlify/functions/package.json` has axios dependency
   - Verify environment variables are set correctly

3. **CORS errors**
   - The functions include CORS headers automatically
   - Check that your frontend is making requests to the correct endpoints

#### Debugging

1. **Check function logs**
   - Go to "Functions" tab in Netlify dashboard
   - Click on your function to see logs

2. **Test functions locally**
   ```bash
   netlify dev
   ```

### API Endpoints

Your deployed site will have these endpoints:

- **Web Interface**: `https://your-site.netlify.app`
- **Health Check**: `https://your-site.netlify.app/.netlify/functions/api/health`
- **Main Analysis**: `https://your-site.netlify.app/.netlify/functions/api/run-agent`
- **API v1**: `https://your-site.netlify.app/.netlify/functions/api/v1/*`

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | No | OpenAI API key for full AI functionality |

### Performance

- **Cold starts**: Functions may take 1-2 seconds on first request
- **Warm starts**: Subsequent requests are much faster
- **Timeout**: Functions timeout after 10 seconds

### Security

- **CORS**: Configured to allow all origins for demo purposes
- **API Keys**: Store sensitive keys in environment variables
- **Rate Limiting**: Consider implementing rate limiting for production

### Monitoring

- **Function logs**: Available in Netlify dashboard
- **Analytics**: Enable Netlify Analytics for usage insights
- **Error tracking**: Consider adding error tracking service

## 🎉 Success!

Your Legal Cash Agent is now live on Netlify! Users can access your financial analysis tool through the web interface, and the AI-powered analysis will work seamlessly in the cloud. 