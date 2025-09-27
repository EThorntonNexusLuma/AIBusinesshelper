/**
 * © 2025 Nexus Luma - All Rights Reserved
 * LumX AI Assistant - Proprietary Software
 * License: Nexus Luma Restricted Access License
 * Unauthorized modification requires password: Sophisticated1192@
 */
import React, { useState, useEffect, useRef } from 'react';
import Vapi from '@vapi-ai/web';
import { Mic, X, Send } from 'lucide-react';
// Nexus Luma License Protection - Hidden System
const NEXUS_COPYRIGHT = '© 2025 Nexus Luma - Licensed Software';
const LICENSE_HASH = 'NL2025$LumX#Sophisticated1192@';

// Configuration - Replace with your actual Vapi credentials
const PUBLIC_KEY = "385ecf4c-99a4-4319-8b03-111c6c61abf9";
const ASSISTANT_ID = "900acf00-1429-4a76-92b2-93f0e4ffa109";

// API URL configuration
const getApiUrl = () => {
  // In development, use proxy (empty string means relative URLs)
  if (import.meta.env.DEV) {
    return '';
  }
  
  // In production, use environment variable or show that backend is needed
  const apiUrl = import.meta.env.VITE_API_URL || '';
  
  console.log('🔗 API URL:', apiUrl, 'DEV:', import.meta.env.DEV, 'VITE_API_URL:', import.meta.env.VITE_API_URL);
  return apiUrl;
};

interface Message {
  type: 'user' | 'ai' | 'transcript';
  content: string;
  isTranscript?: boolean;
}

type Lead = {
  fullName?: string;
  email?: string;
  phone?: string;
  company?: string;
  website?: string;
  industryOrNeed?: string;
  budget?: string;
  timeline?: string;
  location?: string;
  role?: string;         // decision-maker? evaluator?
  bestContactTime?: string;
  notes?: string;        // freeform
  consent?: boolean;
};

type StepId =
  | 'greet'
  | 'name'
  | 'contact'
  | 'company'
  | 'need'
  | 'timeline'
  | 'budget'
  | 'location'
  | 'role'
  | 'contactTime'
  | 'notes'
  | 'consent'
  | 'confirm'
  | 'done';

const leadScript: {
  id: StepId;
  prompt: string;
  collect?: keyof Lead;
  validate?: (text: string) => boolean;
  next?: (lead: Lead) => StepId; // optional dynamic branching
}[] = [
  {
    id: 'greet',
    prompt:
      "Welcome! I'll ask a few quick questions to match you with the right specialist. Sound good?"
  },
  {
    id: 'name',
    prompt: "Great—what's your full name?",
    collect: 'fullName',
    validate: (t) => t.trim().split(' ').length >= 2
  },
  {
    id: 'contact',
    prompt:
      "What's the best way to reach you—email or phone? Please share one (you can include both).",
    collect: 'email', // temporary; we'll parse email/phone in code
  },
  {
    id: 'company',
    prompt:
      "What's your company or brand name? (Or say 'individual' if this is personal.)",
    collect: 'company'
  },
  {
    id: 'need',
    prompt:
      "In 1–2 sentences, what do you need help with right now? (e.g., website, leads, automation, consulting, \"not sure yet\".)",
    collect: 'industryOrNeed',
  },
  {
    id: 'timeline',
    prompt:
      "What's your ideal timeline? (e.g., ASAP, 2–4 weeks, this quarter.)",
    collect: 'timeline'
  },
  {
    id: 'budget',
    prompt:
      "Do you have a budget range in mind? (Rough range is fine—helps us recommend the right package.)",
    collect: 'budget'
  },
  {
    id: 'location',
    prompt:
      "What city/timezone are you in? (So we schedule at a good time.)",
    collect: 'location'
  },
  {
    id: 'role',
    prompt:
      "What's your role in this decision? (e.g., owner, manager, evaluating options.)",
    collect: 'role'
  },
  {
    id: 'contactTime',
    prompt:
      "When's the best time to follow up? (Give a window like mornings, afternoons, or a specific date/time.)",
    collect: 'bestContactTime'
  },
  {
    id: 'notes',
    prompt:
      "Anything else we should know to serve you better? (Optional.)",
    collect: 'notes'
  },
  {
    id: 'consent',
    prompt:
      "Last step: do we have permission to store your info and contact you about this request? (yes/no)",
    collect: 'consent',
    validate: (t) => /^y(es)?$/i.test(t) || /^no?$/i.test(t)
  },
  {
    id: 'confirm',
    prompt:
      "Thanks! I'll summarize what I captured for your confirmation. Say 'looks good' to submit, or tell me what to fix."
  },
  { id: 'done', prompt: "All set! A specialist will reach out shortly. ✅" }
];

export const VapiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [currentMode, setCurrentMode] = useState<'voice' | 'text'>('voice');
  const [status, setStatus] = useState({ text: 'Ready to assist', className: 'inactive' });
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'ai',
      content: "Hello! I'm LumX, your AI assistant from Nexus Luma. I'm here to understand your needs and connect you with the right specialist. What can I help you with today?"
    }
  ]);
  const [textInput, setTextInput] = useState('');
  const [micPermission, setMicPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const [lead, setLead] = useState<Lead>({});
  const [step, setStep] = useState<StepId>('greet');
  const [backendStatus, setBackendStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');

  const vapiRef = useRef<Vapi | null>(null);
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  // Utility Functions
  const updateStatus = (text: string, className: string) => {
    setStatus({ text, className });
    console.log(`[Status] ${text}`);
  };

  const addMessage = (type: 'user' | 'ai', content: string, isTranscript = false) => {
    const newMessage: Message = { type, content, isTranscript };
    setMessages(prev => [...prev, newMessage]);
    console.log(`[Message] ${type}: ${content}`);
  };

  // Check backend status
  const checkBackendStatus = async () => {
    try {
      const apiUrl = getApiUrl();
      
      // In development, always mark as connected (uses proxy)
      if (import.meta.env.DEV) {
        setBackendStatus('connected');
        return;
      }
      
      // In production, check if we have a backend URL
      if (!apiUrl || apiUrl === '' || apiUrl.includes('your-backend-url')) {
        setBackendStatus('disconnected');
        console.log('❌ No backend URL configured for production');
        return;
      }
      
      // Try to connect to the backend
      const response = await fetch(`${apiUrl}/health`, { 
        method: 'GET',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
        }
      });
      
      if (response.ok) {
        setBackendStatus('connected');
        console.log('✅ Backend connected:', apiUrl);
      } else {
        setBackendStatus('disconnected');
        console.log('❌ Backend not responding:', apiUrl, response.status);
      }
    } catch (error) {
      setBackendStatus('disconnected');
      console.log('❌ Backend connection failed:', error);
    }
  };

  // Helper to parse contact text into email/phone
  const parseContact = (text: string) => {
    const emailMatch = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
    const phoneMatch = text.replace(/[\s\-().]/g, '').match(/^\+?\d{10,15}$/);
    return {
      email: emailMatch?.[0],
      phone: phoneMatch ? text.match(/[\d\s\-().+]+/g)?.join('').trim() : undefined
    };
  };

  // Advance the script (called after each user reply in text mode when Vapi call is not connected)
  const advanceScript = async (userText: string) => {
    // Collect the current step's data
    const current = leadScript.find(s => s.id === step);
    if (!current) return;

    // Persist answers
    if (current.collect) {
      if (current.collect === 'email') {
        const { email, phone } = parseContact(userText);
        setLead(prev => ({ ...prev, email: email ?? prev.email, phone: phone ?? prev.phone }));
      } else if (current.collect === 'consent') {
        const ok = /^y(es)?$/i.test(userText);
        setLead(prev => ({ ...prev, consent: ok }));
      } else {
        setLead(prev => ({ ...prev, [current.collect!]: userText.trim() }));
      }
    }

    // Validate if needed
    if (current.validate && !current.validate(userText)) {
      addMessage('ai', "Got it—could you rephrase or provide a bit more detail?");
      return;
    }

    // Decide next step
    let nextId: StepId | undefined = current.next?.(lead) ?? leadScript[leadScript.findIndex(s => s.id === step) + 1]?.id;

    // Before confirm, produce a summary
    if (current.id === 'consent') {
      nextId = 'confirm';
    }

    if (nextId === 'confirm') {
      const summary = `Here's what I have:
• Name: ${lead.fullName ?? '—'}
• Email: ${lead.email ?? '—'} | Phone: ${lead.phone ?? '—'}
• Company: ${lead.company ?? '—'} | Website: ${lead.website ?? '—'}
• Need: ${lead.industryOrNeed ?? '—'}
• Timeline: ${lead.timeline ?? '—'}
• Budget: ${lead.budget ?? '—'}
• Location: ${lead.location ?? '—'}
• Role: ${lead.role ?? '—'}
• Best Contact Time: ${lead.bestContactTime ?? '—'}
• Notes: ${lead.notes ?? '—'}
• Consent to contact: ${lead.consent ? 'Yes' : 'No'}`;

      addMessage('ai', summary);
      addMessage('ai', "Does this look correct? Say 'looks good' to submit, or tell me what to change.");
      setStep('confirm');
      return;
    }

    if (nextId === 'done') {
      setStep('done');
      addMessage('ai', "All set! A specialist will reach out shortly. ✅");
      return;
    }

    // Ask the next prompt
    setStep(nextId!);
    const next = leadScript.find(s => s.id === nextId);
    if (next) addMessage('ai', next.prompt);
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  // Microphone Permission
  const requestMicPermission = async (): Promise<boolean> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      setMicPermission('granted');
      console.log('[Mic] Permission granted');
      return true;
    } catch (error) {
      setMicPermission('denied');
      console.error('[Mic] Permission denied:', error);
      updateStatus('❌ Microphone access denied', 'error');
      return false;
    }
  };

  // Initialize Vapi
  const initializeVapi = async () => {
    if (vapiRef.current) return;

    if (!PUBLIC_KEY || !ASSISTANT_ID) {
      console.error('[Vapi] Missing API keys');
      updateStatus('❌ Configuration error', 'error');
      return;
    }

    try {
      const vapi = new Vapi(PUBLIC_KEY);
      vapiRef.current = vapi;
      console.log('[Vapi] Client initialized');

      // Event Handlers
      vapi.on('call-start', () => {
        console.log('[Vapi] Call started');
        setIsConnected(true);
        updateStatus('🔴 Connected - Speak now!', 'listening');
      });

      vapi.on('call-end', () => {
        console.log('[Vapi] Call ended');
        setIsConnected(false);
        setIsListening(false);
        updateStatus('✅ Ready to assist', 'inactive');
      });

      vapi.on('speech-start', () => {
        console.log('[Vapi] Speech started');
        setIsListening(true);
        updateStatus('🎤 Listening...', 'listening');
      });

      vapi.on('speech-end', () => {
        console.log('[Vapi] Speech ended');
        setIsListening(false);
        updateStatus('🤔 Processing...', 'thinking');
      });

      vapi.on('message', (message: any) => {
        console.log('[Vapi] Message received:', message);

        // Handle transcripts
        if (message.type === 'transcript' && message.transcriptType === 'final') {
          addMessage('user', message.transcript);
        }

        // Handle assistant responses
        if (message.type === 'function-call') {
          const response = message.functionCall?.parameters?.response;
          if (response) {
            addMessage('ai', response);
            updateStatus('✅ Ready for next question', 'inactive');
          }
        }

        // Handle other message types
        if (message.type === 'conversation-update' && message.conversation) {
          const lastMessage = message.conversation[message.conversation.length - 1];
          if (lastMessage && lastMessage.role === 'assistant' && lastMessage.message) {
            addMessage('ai', lastMessage.message);
            updateStatus('✅ Ready for next question', 'inactive');
          }
        }
      });

      vapi.on('error', (error: any) => {
        console.error('[Vapi] Error:', error);
        setIsConnected(false);
        setIsListening(false);
        updateStatus('❌ Connection error', 'error');
        addMessage('ai', 'Sorry, I encountered an error. Please try again or switch to text mode.');
      });

      console.log('[Vapi] Event listeners attached');
    } catch (error) {
      console.error('[Vapi] Initialization failed:', error);
      updateStatus('❌ Failed to initialize voice', 'error');
    }
  };

  // Voice Control
  const startVoice = async () => {
    console.log('[Voice] Starting voice mode');

    if (micPermission === 'prompt') {
      const granted = await requestMicPermission();
      if (!granted) {
        setCurrentMode('text');
        return;
      }
    } else if (micPermission === 'denied') {
      updateStatus('❌ Microphone access required - Click to try again', 'error');
      const granted = await requestMicPermission();
      if (!granted) {
        setCurrentMode('text');
        return;
      }
    }

    await initializeVapi();
    if (!vapiRef.current) {
      updateStatus('❌ Voice unavailable', 'error');
      setCurrentMode('text');
      return;
    }

    try {
      updateStatus('🎤 Connecting...', 'thinking');
      await vapiRef.current.start(ASSISTANT_ID);
      console.log('[Voice] Started successfully');
    } catch (error) {
      console.error('[Voice] Start failed:', error);
      updateStatus('❌ Failed to connect', 'error');
      addMessage('ai', 'Unable to start voice chat. Please try text mode or refresh the page.');
    }
  };

  const stopVoice = () => {
    console.log('[Voice] Stopping voice mode');
    try {
      if (vapiRef.current && isConnected) {
        vapiRef.current.stop();
      }
    } catch (error) {
      console.error('[Voice] Stop error:', error);
    }
    setIsConnected(false);
    setIsListening(false);
  };

  // Mode Management
  const handleModeChange = (mode: 'voice' | 'text') => {
    setCurrentMode(mode);
    
    if (mode === 'voice') {
      startVoice();
    } else {
      stopVoice();
      updateStatus('💬 Text mode active', 'inactive');
      // The streaming system will handle the conversation flow naturally
    }
  };

  // Stream message handler for real-time chat
  const streamMessage = async (userMessage: string, chatHistory: Message[]) => {
    updateStatus('🤔 AI thinking...', 'thinking');

    // Check backend status first
    if (backendStatus === 'disconnected') {
      const errorMsg = import.meta.env.DEV 
        ? '⚠️ Backend server is not running on port 3001. Please start the server.'
        : '⚠️ Backend server is not deployed. Text chat requires a deployed backend. Voice chat should still work!';
      addMessage('ai', errorMsg);
      updateStatus('💬 Text mode active', 'inactive');
      return;
    }

    // Convert internal messages to OpenAI format
    const openAIMessages = chatHistory.map(msg => ({
      role: msg.type === 'user' ? 'user' as const : 'assistant' as const,
      content: msg.content
    }));

    // Add the new user message
    openAIMessages.push({ role: 'user', content: userMessage });

    const apiUrl = getApiUrl();
    const streamUrl = `${apiUrl}/api/text/stream`;

    try {
      console.log('Attempting to stream message to:', streamUrl);
      
      const response = await fetch(streamUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: openAIMessages })
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (!response.body) {
        throw new Error('No response body');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let assistantText = '';
      let messageIndex = messages.length; // Index for the streaming message

      // Add initial AI message for streaming (with placeholder text)
      setMessages(prev => [...prev, { type: 'ai', content: '...', isTranscript: false }]);

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        
        // Parse SSE format "data: {...}\n\n"
        for (const line of chunk.split('\n')) {
          if (!line.startsWith('data:')) continue;
          
          try {
            const data = JSON.parse(line.slice(5));
            
            if (data.delta) {
              assistantText += data.delta;
              // Update the streaming message in real-time
              setMessages(prev => {
                const newMessages = [...prev];
                if (newMessages[messageIndex]) {
                  newMessages[messageIndex] = {
                    type: 'ai',
                    content: assistantText || '...',
                    isTranscript: false
                  };
                }
                return newMessages;
              });
            }
            
            if (data.done) {
              updateStatus('💬 Text mode active', 'inactive');
            }
            
            if (data.error) {
              console.error('Stream error:', data.error);
              setMessages(prev => {
                const newMessages = [...prev];
                if (newMessages[messageIndex]) {
                  newMessages[messageIndex] = {
                    type: 'ai',
                    content: 'Sorry, I encountered an error. Please try again.',
                    isTranscript: false
                  };
                }
                return newMessages;
              });
              break;
            }
          } catch (parseError) {
            console.error('Parse error:', parseError);
          }
        }
      }

      // If no text was received, show an error
      if (!assistantText.trim()) {
        setMessages(prev => {
          const newMessages = [...prev];
          if (newMessages[messageIndex]) {
            newMessages[messageIndex] = {
              type: 'ai',
              content: 'I apologize, but I didn\'t receive a proper response. Could you try again?',
              isTranscript: false
            };
          }
          return newMessages;
        });
      }

      // Check if conversation seems complete and extract lead
      if (assistantText.toLowerCase().includes('consent') || 
          assistantText.toLowerCase().includes('contact you')) {
        await extractLeadFromConversation([...messages, 
          { type: 'user', content: userMessage, isTranscript: false },
          { type: 'ai', content: assistantText, isTranscript: false }
        ]);
      }

    } catch (error) {
      console.error('Streaming error:', error);
      // Fallback to regular chat API if streaming fails
      updateStatus('💬 Using fallback chat...', 'thinking');
      
      try {
        const chatUrl = `${apiUrl}/api/chat`;
        console.log('Fallback chat URL:', chatUrl);
        const fallbackResponse = await fetch(chatUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: openAIMessages })
        });
        
        if (fallbackResponse.ok) {
          const data = await fallbackResponse.json();
          addMessage('ai', data.reply || 'Sorry, I encountered an error. Please try again.');
        } else {
          addMessage('ai', 'I\'m having trouble connecting. Please check your connection and try again.');
        }
      } catch (fallbackError) {
        console.error('Fallback error:', fallbackError);
        addMessage('ai', 'I\'m having trouble connecting. Please check your connection and try again.');
      }
      
      updateStatus('💬 Text mode active', 'inactive');
    }
  };

  // Extract lead from conversation when appropriate
  const extractLeadFromConversation = async (conversationMessages: Message[]) => {
    try {
      const response = await fetch(`${getApiUrl()}/api/text/extract-lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: conversationMessages })
      });

      const data = await response.json();
      
      if (data.lead && data.lead.consent) {
        console.log('Lead extracted:', data.lead);
        // Save to existing lead submission endpoint
        await fetch(`${getApiUrl()}/api/leads`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lead: data.lead })
        });
        console.log('Lead saved successfully');
      }
    } catch (error) {
      console.error('Lead extraction error:', error);
    }
  };

  // Text Chat - Enhanced with streaming
  const sendTextMessage = async () => {
    const message = textInput.trim();
    if (!message) return;

    console.log('📤 Sending text message:', message);
    console.log('📊 Current messages count:', messages.length);

    addMessage('user', message);
    setTextInput('');

    // If voice is connected, prefer sending to Vapi call
    if (isConnected && vapiRef.current) {
      try {
        console.log('📞 Sending via Vapi voice connection');
        vapiRef.current.send({
          type: 'add-message',
          message: { role: 'user', content: message }
        });
        return;
      } catch (error) {
        console.error('[Text] Failed to send via Vapi:', error);
      }
    }

    // Use streaming for better UX in text mode
    console.log('💬 Using text streaming mode');
    await streamMessage(message, messages);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendTextMessage();
    }
  };

  // Check backend status on mount
  useEffect(() => {
    checkBackendStatus();
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (vapiRef.current && isConnected) {
        vapiRef.current.stop();
      }
    };
  }, [isConnected]);

  return (
    <>
      {/* Floating Icon - Only show in voice mode */}
      {currentMode === 'voice' && (
        <div 
          className="floating-icon"
          onClick={() => setIsOpen(true)}
          role="button"
          aria-label="Open AI Assistant"
        >
          <Mic size={30} color="white" />
        </div>
      )}

      {/* Holographic Interface */}
      <div className={`holographic-interface ${isOpen ? 'active' : ''}`}>
        <button 
          className="close-btn"
          onClick={() => {
            setIsOpen(false);
            stopVoice();
          }}
          aria-label="Close assistant"
        >
          <X size={16} />
        </button>

        <div className="interface-container">
          {/* Voice Interface - Only show in voice mode */}
          {currentMode === 'voice' && (
            <div className="voice-interface">
              <div className="voice-ring ring-outer"></div>
              <div className="voice-ring ring-middle"></div>
              <div className={`voice-ring ring-inner ${isListening ? 'listening' : ''}`}>
                <Mic 
                  className={`mic-icon ${isListening ? 'listening' : ''}`}
                  size={30}
                />
              </div>
            </div>
          )}

          {/* Interface Text - Only show in voice mode */}
          {currentMode === 'voice' && (
            <div className="interface-text">
              <h1 className="interface-title">Welcome To LumX Your AI Assistant</h1>
              <p className="interface-subtitle">Speak naturally or type your questions. I'm here to help!</p>
            </div>
          )}

          {/* Controls - Only show in voice mode */}
          {/* No controls in text mode for max chat space */}

          {/* Voice Visualizer - Only show in voice mode */}
          {currentMode === 'voice' && (
            <div className={`voice-visualizer ${isListening ? 'active' : ''}`}>
              {[...Array(5)].map((_, i) => (
                <div key={i} className="voice-bar"></div>
              ))}
            </div>
          )}

          {/* Chat Container */}
          <div className={`chat-container ${currentMode === 'text' ? 'active' : ''}`}>
            <div className="chat-messages" ref={chatMessagesRef}>
              {messages.map((message, index) => (
                <div 
                  key={index}
                  className={`message ${message.type}-message ${message.isTranscript ? 'transcript-message' : ''}`}
                >
                  {message.content}
                </div>
              ))}
            </div>
            <div className="chat-input-container">
              <input
                type="text"
                className="chat-input"
                placeholder="Type your message..."
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                className="send-btn"
                onClick={sendTextMessage}
                disabled={!textInput.trim()}
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>
          </div>

          {/* Status */}
          <div className={`status ${status.className}`}>
            {status.text}
            {!import.meta.env.DEV && (
              <span className={`backend-status ${backendStatus}`}>
                {backendStatus === 'checking' && ' • Checking backend...'}
                {backendStatus === 'connected' && ' • Backend connected ✅'}
                {backendStatus === 'disconnected' && ' • Backend offline ⚠️'}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
