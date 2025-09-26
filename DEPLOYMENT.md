# GitHub Deployment Setup Guide

This guide explains how to securely add your OpenAI API key and other sensitive information to your GitHub repository for deployment.

## 🔐 Setting Up GitHub Secrets

GitHub Secrets allow you to store sensitive information (like API keys) securely in your repository without exposing them in your code.

### Step 1: Add Secrets to Your Repository

1. **Go to your GitHub repository**: https://github.com/EThorntonNexusLuma/AIBusinesshelper

2. **Navigate to Settings**:
   - Click on the **"Settings"** tab in your repository
   - Scroll down to **"Security"** section in the left sidebar
   - Click on **"Secrets and variables"**
   - Click on **"Actions"**

3. **Add Repository Secrets**:
   Click **"New repository secret"** and add these secrets one by one:

   | Secret Name | Description | Example Value |
   |-------------|-------------|---------------|
   | `OPENAI_API_KEY` | Your OpenAI API key | `sk-proj-[your-key-here]` |
   | `VITE_API_URL` | Your backend API URL (optional) | `https://your-backend.com` |
   | `PORT` | Server port (optional) | `3001` |
   | `ZAPIER_WEBHOOK_URL` | Zapier webhook for leads (optional) | `https://hooks.zapier.com/...` |

### Step 2: How to Add Each Secret

For **OPENAI_API_KEY**:
1. Click **"New repository secret"**
2. **Name**: `OPENAI_API_KEY`
3. **Secret**: Paste your OpenAI API key (starts with `sk-proj-...`)
4. Click **"Add secret"**

## 🚀 Backend Deployment Options

Since GitHub Pages only hosts static files, you'll need a separate service for your backend. Here are the best options:

### Option 1: Railway (Recommended)
1. **Sign up**: Go to [Railway.app](https://railway.app)
2. **Connect GitHub**: Link your repository
3. **Deploy**: Railway will automatically detect your Node.js server
4. **Add Environment Variables**: In Railway dashboard, add:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `PORT`: `3001` (or leave blank for Railway's default)

### Option 2: Render
1. **Sign up**: Go to [Render.com](https://render.com)
2. **New Web Service**: Connect your GitHub repository
3. **Settings**:
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && node index.js`
4. **Environment Variables**: Add your secrets in Render dashboard

### Option 3: Vercel (Serverless Functions)
1. **Sign up**: Go to [Vercel.com](https://vercel.com)
2. **Import Project**: Connect your GitHub repository
3. **Add API Routes**: Move server code to `/api` folder for serverless functions
4. **Environment Variables**: Add in Vercel dashboard

## 🔧 Local Development Setup

For local development, you still need to:

1. **Copy the example file**:
   ```bash
   cd server
   cp .env.example .env
   ```

2. **Add your API key**:
   Edit `server/.env` and replace `your-openai-api-key-here` with your actual key.

## 📋 Current Deployment Status

- ✅ **Frontend**: Automatically deploys to GitHub Pages
- ⏳ **Backend**: Needs to be deployed to a Node.js hosting service
- 🔐 **Secrets**: Ready to use GitHub Secrets in workflows

## 🛠️ Updating the Frontend to Use Your Backend

Once your backend is deployed, update your frontend:

1. **Add the backend URL as a GitHub Secret**:
   - Name: `VITE_API_URL`
   - Value: Your backend URL (e.g., `https://your-app.railway.app`)

2. **The GitHub Actions workflow will automatically use this URL during build**

## 🔍 Troubleshooting

### Build Fails
- Check that all required secrets are added to GitHub
- Verify your OpenAI API key is valid
- Check the Actions tab for detailed error logs

### Backend Connection Issues
- Ensure your backend URL is correct
- Check CORS settings in your server
- Verify the backend is actually running

### API Key Not Working
- Double-check the secret name matches exactly: `OPENAI_API_KEY`
- Ensure no extra spaces in the API key
- Verify the key has sufficient OpenAI credits

## 📞 Need Help?

If you encounter issues:
1. Check the **Actions** tab in GitHub for build logs
2. Check your hosting service logs for backend issues
3. Test API endpoints directly using curl or Postman