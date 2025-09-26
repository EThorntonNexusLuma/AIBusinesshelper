# Railway Deployment for Backend

## Quick Deploy to Railway

1. **Sign up at Railway**: https://railway.app
2. **Connect GitHub**: Link your repository
3. **Deploy Backend**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose `AIBusinesshelper` repository
   - Railway will auto-detect Node.js

## Environment Variables
Add these in Railway Dashboard:
- `OPENAI_API_KEY`: Your OpenAI API key
- `PORT`: Leave blank (Railway sets automatically)

## Railway will provide a URL like:
- `https://your-app-name.up.railway.app`

## Then update your frontend to use this URL for production builds.