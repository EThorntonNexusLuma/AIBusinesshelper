# LumX AI Assistant

A sophisticated AI-powered business assistant built with React, TypeScript, and OpenAI integration. Features real-time voice and text chat capabilities with automated lead extraction.

## 🚀 Features

- **Voice Chat**: Real-time voice interaction using Vapi AI
- **Text Chat**: Streaming text responses with OpenAI integration
- **Lead Extraction**: Automatic lead capture and structured data extraction
- **Holographic UI**: Modern, futuristic interface design
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Streaming**: Server-Sent Events (SSE) for live responses

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Vapi AI** for voice interactions

### Backend
- **Node.js** with Express.js
- **OpenAI API** (GPT-4o-mini) for AI responses
- **Server-Sent Events** for real-time streaming
- **CORS** enabled for cross-origin requests

## 📦 Quick Start

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- OpenAI API key

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/EThorntonNexusLuma/AIBusinesshelper.git
   cd AIBusinesshelper
   ```

2. **Install frontend dependencies**:
   ```bash
   npm install
   ```

3. **Install backend dependencies**:
   ```bash
   cd server
   npm install
   ```

4. **Set up environment variables**:
   ```bash
   cd server
   cp .env.example .env
   # Edit .env and add your OpenAI API key
   ```

5. **Start the development servers**:

   **Backend** (in one terminal):
   ```bash
   cd server
   node index.js
   ```

   **Frontend** (in another terminal):
   ```bash
   npm run dev
   ```

6. **Open your browser**:
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## 🔐 Environment Variables

Create a `.env` file in the `server` directory with:

```env
# Required
OPENAI_API_KEY=your-openai-api-key-here

# Optional
PORT=3001
ZAPIER_WEBHOOK_URL=your-zapier-webhook-url
```

## 🚀 Deployment

### GitHub Pages (Frontend)
The frontend automatically deploys to GitHub Pages when you push to the main branch.

**Live URL**: https://ethornionnexusluma.github.io/AIBusinesshelper/

### Backend Deployment
For the backend, you'll need a Node.js hosting service. See our [Deployment Guide](./DEPLOYMENT.md) for detailed instructions on:

- Setting up GitHub Secrets for API keys
- Deploying to Railway, Render, or Vercel
- Configuring environment variables securely

## 📁 Project Structure

```
AIBusinesshelper/
├── src/                    # Frontend React application
│   ├── components/         # React components
│   │   ├── VapiAssistant.tsx
│   │   └── VapiAssistant.css
│   ├── App.tsx
│   └── main.tsx
├── server/                 # Backend Node.js API
│   ├── index.js           # Express server with OpenAI integration
│   ├── package.json       # Backend dependencies
│   └── .env.example       # Environment variables template
├── public/                # Static assets
├── .github/workflows/     # GitHub Actions for deployment
└── docs/                  # Documentation
```

## 🔧 Development

### Available Scripts

**Frontend**:
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run clean` - Clean build artifacts

**Backend**:
- `node index.js` - Start the API server
- `npm install` - Install dependencies

### API Endpoints

- `POST /api/chat` - Standard chat completion
- `POST /api/text/stream` - Streaming chat with SSE
- `POST /api/text/extract-lead` - Extract lead information
- `GET /health` - Health check endpoint

## 🎨 Features in Detail

### Voice Assistant
- Real-time voice interaction
- Speech-to-text and text-to-speech
- Integrated with Vapi AI platform
- Seamless voice-to-text transition

### Text Chat
- Streaming responses for better UX
- OpenAI GPT-4o-mini integration
- Conversation memory and context
- Automatic error handling and fallbacks

### Lead Extraction
- Automatic detection of complete conversations
- Structured JSON extraction of contact information
- Schema validation for data quality
- Optional Zapier integration for CRM

### UI/UX
- Holographic, futuristic design
- Smooth animations and transitions
- Responsive layout for all devices
- Accessible color contrasts and typography

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

Need help? Check out:

- [Deployment Guide](./DEPLOYMENT.md) - Detailed deployment instructions
- [GitHub Issues](https://github.com/EThorntonNexusLuma/AIBusinesshelper/issues) - Report bugs or request features
- [GitHub Discussions](https://github.com/EThorntonNexusLuma/AIBusinesshelper/discussions) - Community support

## 🔗 Links

- **Live Demo**: https://ethornionnexusluma.github.io/AIBusinesshelper/
- **Repository**: https://github.com/EThorntonNexusLuma/AIBusinesshelper
- **Issues**: https://github.com/EThorntonNexusLuma/AIBusinesshelper/issues

---

Made with ❤️ by [Nexus Luma](https://github.com/EThorntonNexusLuma)# Backend connected to Railway
Backend connected to Vercel: https://ai-businesshelper12.vercel.app
# Frontend deployment trigger - connect to Vercel backend
