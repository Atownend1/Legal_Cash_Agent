#!/bin/bash

# Legal Cash Agent Netlify Deployment Script
echo "🚀 Legal Cash Agent Netlify Deployment Script"
echo "=============================================="

# Check if Git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "📦 Installing Netlify CLI..."
    npm install -g netlify-cli
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install
cd netlify/functions && npm install && cd ../..

# Check if .env file exists and create one if needed
if [ ! -f .env ]; then
    echo "⚠️  No .env file found. Creating one from template..."
    cp env.example .env
    echo "📝 Please edit .env file and add your OpenAI API key (optional)"
fi

# Check Git status
if [ -d ".git" ]; then
    echo "📝 Checking Git status..."
    git status
    
    echo ""
    echo "🔧 To deploy to Netlify:"
    echo "1. Commit your changes:"
    echo "   git add ."
    echo "   git commit -m 'Prepare for Netlify deployment'"
    echo "   git push origin main"
    echo ""
    echo "2. Deploy to Netlify:"
    echo "   netlify deploy --prod"
    echo ""
    echo "3. Or deploy via Netlify UI:"
    echo "   - Go to https://app.netlify.com"
    echo "   - Click 'New site from Git'"
    echo "   - Select your repository"
    echo "   - Build command: npm run build"
    echo "   - Publish directory: public"
else
    echo "⚠️  No Git repository found."
    echo "📝 Please initialize Git and push to GitHub/GitLab:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    echo "   git remote add origin <your-repo-url>"
    echo "   git push -u origin main"
fi

echo ""
echo "✅ Setup complete! Your Legal Cash Agent is ready for Netlify deployment."
echo "🌐 Once deployed, your site will be available at: https://your-site-name.netlify.app" 