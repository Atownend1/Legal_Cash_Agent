#!/bin/bash

# Legal Cash Agent Deployment Script
echo "🚀 Legal Cash Agent Deployment Script"
echo "====================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  No .env file found. Creating one from template..."
    cp env.example .env
    echo "📝 Please edit .env file and add your OpenAI API key (optional)"
fi

# Start the server
echo "🚀 Starting Legal Cash Agent server..."
echo "🌐 Web interface: http://localhost:3000"
echo "🔧 API endpoint: http://localhost:3000/run-agent"
echo "📊 Health check: http://localhost:3000/health"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm start 