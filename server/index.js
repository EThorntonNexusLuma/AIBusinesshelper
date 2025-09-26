import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import OpenAI from 'openai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    // Use a fast, cost-effective model
    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini', // or 'gpt-4o' for richer outputs
      messages,
      temperature: 0.4,
      max_tokens: 220
    });

    const reply = completion.choices?.[0]?.message?.content ?? '';
    res.json({ reply });
  } catch (e) {
    console.error('/api/chat error:', e?.message);
    res.status(500).json({ error: 'chat_failed' });
  }
});

// 1) Realtime text replies via SSE streaming
app.post('/api/text/stream', async (req, res) => {
  const { messages } = req.body; // [{role:"user"|"assistant"|"system", content:"..."}]

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages array is required' });
  }

  // System prompt: lead-gen, one Q at a time, friendly & concise
  const SYSTEM = `You are "LumX"—a friendly, professional lead-qualification assistant for Nexus Luma. Your goals:

- Understand the user's needs (use_case, goals, obstacles).
- Collect contact info: name, email, optional phone/company.
- Ask ONE question at a time, short/plain language, warmly conversational.
- Keep answers helpful but brief; if the user asks about offerings, answer then return to a single clarifying question.
- When details are sufficient, summarize what you captured and ask for explicit consent to be contacted.
- Never invent emails/phones; validate obvious typos ("is it .com or .co?").
- If user declines, be polite and end.

Be conversational and concise. If user goes off-topic, briefly answer then return to a single clarifying lead question.`;

  // SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const stream = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'system', content: SYSTEM }, ...messages],
      temperature: 0.7,
      max_tokens: 300,
      stream: true
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        res.write(`data: ${JSON.stringify({ delta: content })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (e) {
    console.error('/api/text/stream error:', e?.message);
    res.write(`data: ${JSON.stringify({ error: e.message })}\n\n`);
    res.end();
  }
});

// 2) Structured lead extraction (safe, schema-validated JSON)
app.post('/api/text/extract-lead', async (req, res) => {
  try {
    const { transcript } = req.body; // full chat transcript text OR array

    if (!transcript) {
      return res.status(400).json({ error: 'Transcript is required' });
    }

    const conversationText = Array.isArray(transcript) 
      ? transcript.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n')
      : transcript;

    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Extract lead information from the conversation. Return a JSON object with these fields:
- name (string, required): Full name
- email (string, required): Email address
- company (string, optional): Company name
- phone (string, optional): Phone number
- use_case (string, required): What they need help with
- budget_range (string, optional): Budget range mentioned
- timeline (string, optional): Timeline mentioned
- preferred_contact_method (string, optional): How they prefer to be contacted
- consent (boolean, required): Whether they gave consent to be contacted

Only extract information explicitly mentioned. Use null for missing optional fields.`
        },
        {
          role: 'user',
          content: conversationText
        }
      ],
      temperature: 0.1,
      response_format: { type: 'json_object' }
    });

    const leadData = JSON.parse(completion.choices[0].message.content);
    
    // Basic validation
    const isValid = leadData.name && leadData.email && leadData.use_case && 
                   typeof leadData.consent === 'boolean';

    if (!isValid) {
      return res.json({ lead: null, error: 'Insufficient lead data' });
    }

    res.json({ lead: leadData });
  } catch (e) {
    console.error('/api/text/extract-lead error:', e?.message);
    res.status(500).json({ error: 'lead_extraction_failed' });
  }
});

// Accept the captured lead and forward it somewhere (Zapier, email, DB)
app.post('/api/leads', async (req, res) => {
  try {
    const { lead } = req.body;

    if (!lead) {
      return res.status(400).json({ error: 'Lead data is required' });
    }

    console.log('New lead received:', JSON.stringify(lead, null, 2));

    // TODO: Do one (or more) of these:
    // 1) Send to your CRM/Zapier webhook:
    // if (process.env.ZAPIER_HOOK_URL) {
    //   await fetch(process.env.ZAPIER_HOOK_URL, { 
    //     method: 'POST', 
    //     headers: { 'Content-Type': 'application/json' }, 
    //     body: JSON.stringify(lead) 
    //   });
    // }

    // 2) Email yourself (add nodemailer or similar):
    // await someMailer.send({ 
    //   to: 'info@nexusluma.com', 
    //   subject: 'New Lead from LumX Assistant', 
    //   text: JSON.stringify(lead, null, 2) 
    // });

    // 3) Store in DB (Supabase, etc.)
    // await supabase.from('leads').insert(lead);

    res.json({ ok: true, message: 'Lead received successfully' });
  } catch (e) {
    console.error('/api/leads error:', e?.message);
    res.status(500).json({ error: 'lead_submit_failed' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ API server listening on port ${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});