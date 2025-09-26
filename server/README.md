# LumX API Server

Backend API server for the LumX AI Assistant lead generation system.

## Quick Start

1. **Install dependencies:**
   ```bash
   cd server
   npm install
   ```

2. **Set up environment:**
   ```bash
   cp .env.example .env
   # Edit .env and add your OpenAI API key
   ```

3. **Start the server:**
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:5174`

## API Endpoints

### POST /api/chat
Processes chat messages using OpenAI for natural language responses.

**Request:**
```json
{
  "messages": [
    {"role": "system", "content": "You are a helpful assistant"},
    {"role": "user", "content": "Hello"}
  ]
}
```

**Response:**
```json
{
  "reply": "Hello! How can I help you today?"
}
```

### POST /api/leads
Accepts captured lead data for processing/storage.

**Request:**
```json
{
  "lead": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "company": "Example Corp",
    "industryOrNeed": "Website development",
    "timeline": "ASAP",
    "budget": "$5k-$10k",
    "location": "New York",
    "role": "Owner",
    "bestContactTime": "Mornings",
    "notes": "Looking for e-commerce solution",
    "consent": true
  }
}
```

**Response:**
```json
{
  "ok": true,
  "message": "Lead received successfully"
}
```

### GET /health
Health check endpoint.

## Configuration

### Environment Variables

- `OPENAI_API_KEY` - Your OpenAI API key (required)
- `PORT` - Server port (default: 5174)
- `ZAPIER_HOOK_URL` - Optional Zapier webhook for lead forwarding
- `DATABASE_URL` - Optional database connection string

### Lead Processing Options

The `/api/leads` endpoint is ready to integrate with:

1. **CRM/Zapier Webhooks** - Uncomment the Zapier section in `index.js`
2. **Email Notifications** - Add nodemailer and configure SMTP
3. **Database Storage** - Add your preferred database client
4. **Custom Processing** - Add your own lead processing logic

## Development

The server uses ES modules and includes:

- Express.js for REST API
- OpenAI SDK for AI chat
- CORS enabled for frontend integration
- Body parser for JSON requests
- Environment variable support

## Security Notes

- Never commit `.env` files
- Keep your OpenAI API key secure
- Consider rate limiting for production
- Validate all input data
- Use HTTPS in production