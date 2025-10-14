/**
 * © 2025 Nexus Luma - All Rights Reserved
 * LumX AI Assistant - Proprietary Software
 * License: Nexus Luma Restricted Access License
 * Unauthorized modification requires password: Sophisticated1192@
 */
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Vapi from '@vapi-ai/web';
import { Mic, X, Send } from 'lucide-react';

// Ensure component styles are bundled (keep your existing CSS file name/path)
import './VapiAssistant.css';

// Configuration - Replace with your actual Vapi credentials
const PUBLIC_KEY = '385ecf4c-99a4-4319-8b03-111c6c61abf9';
const ASSISTANT_ID = '900acf00-1429-4a76-92b2-93f0e4ffa109';

// API URL configuration
const getApiUrl = () => {
  if (import.meta.env.DEV) return '';
  const apiUrl = import.meta.env.VITE_API_URL || '';
  return apiUrl;
};

interface Message {
  type: 'user' | 'ai' | 'transcript';
  content: string;
  isTranscript?: boolean;
}

export const VapiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [currentMode, setCurrentMode] = useState<'voice' | 'text'>('voice');
  const [status, setStatus] = useState({ text: 'Ready to assist', className: 'inactive' });
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'ai',
      content:
        "Hello! I'm LumX, your AI assistant from Nexus Luma. I'm here to understand your needs and connect you with the right specialist. What can I help you with today?",
    },
  ]);
  const [textInput, setTextInput] = useState('');
  const [micPermission, setMicPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const [backendStatus, setBackendStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');

  const vapiRef = useRef<Vapi | null>(null);
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  // ---------- Utilities ----------
  const updateStatus = (text: string, className: string) => setStatus({ text, className });

  const addMessage = (type: 'user' | 'ai' | 'transcript', content: string) => {
    const newMessage: Message = { type, content };
    setMessages((prev) => [...prev, newMessage]);
  };

  // ---------- Backend health ----------
  const checkBackendStatus = async () => {
    try {
      const apiUrl = getApiUrl();

      if (!apiUrl || apiUrl === '' || apiUrl.includes('your-backend-url')) {
        setBackendStatus('disconnected');
        return;
      }

      const response = await fetch(`${apiUrl}/health`, {
        method: 'GET',
        mode: 'cors',
        headers: { Accept: 'application/json' },
      });

      setBackendStatus(response.ok ? 'connected' : 'disconnected');
    } catch {
      setBackendStatus('disconnected');
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  // ---------- Mic permission ----------
  const requestMicPermission = async (): Promise<boolean> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((t) => t.stop());
      setMicPermission('granted');
      return true;
    } catch (error) {
      setMicPermission('denied');
      console.error('[Mic] Permission denied:', error);
      updateStatus('❌ Microphone access denied', 'error');
      return false;
    }
  };

  // ---------- Vapi init ----------
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

      vapi.on('call-start', () => {
        setIsConnected(true);
        updateStatus('🔴 Connected - Speak now!', 'listening');
      });

      vapi.on('call-end', () => {
        setIsConnected(false);
        setIsListening(false);
        updateStatus('✅ Ready to assist', 'inactive');
      });

      vapi.on('speech-start', () => {
        setIsListening(true);
        updateStatus('🎤 Listening...', 'listening');
      });

      vapi.on('speech-end', () => {
        setIsListening(false);
        updateStatus('🤔 Processing...', 'thinking');
      });

      vapi.on('message', (message: any) => {
        if (message.type === 'transcript' && message.transcriptType === 'final') {
          addMessage('user', message.transcript);
        }

        if (message.type === 'function-call') {
          const response = message.functionCall?.parameters?.response;
          if (response) {
            addMessage('ai', response);
            updateStatus('✅ Ready for next question', 'inactive');
          }
        }

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
    } catch (error) {
      console.error('[Vapi] Initialization failed:', error);
      updateStatus('❌ Failed to initialize voice', 'error');
    }
  };

  // ---------- Voice control ----------
  const startVoice = async () => {
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
    } catch (error) {
      console.error('[Voice] Start failed:', error);
      updateStatus('❌ Failed to connect', 'error');
      addMessage('ai', 'Unable to start voice chat. Please try text mode or refresh the page.');
    }
  };

  const stopVoice = () => {
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

  // ---------- Mode ----------
  const handleModeChange = (mode: 'voice' | 'text') => {
    setCurrentMode(mode);
    if (mode === 'voice') {
      startVoice();
    } else {
      stopVoice();
      updateStatus('💬 Text mode active', 'inactive');
    }
  };

  // ---------- Streaming text chat ----------
  const streamMessage = async (userMessage: string, chatHistory: Message[]) => {
    updateStatus('🤔 AI thinking...', 'thinking');

    if (backendStatus === 'disconnected') {
      const errorMsg = import.meta.env.DEV
        ? '⚠️ Backend server is not running on port 3001. Please start the server.'
        : '⚠️ Backend server is not deployed. Text chat requires a deployed backend. Voice chat should still work!';
      addMessage('ai', errorMsg);
      updateStatus('💬 Text mode active', 'inactive');
      return;
    }

    const openAIMessages = chatHistory.map((msg) => ({
      role: msg.type === 'user' ? ('user' as const) : ('assistant' as const),
      content: msg.content,
    }));
    openAIMessages.push({ role: 'user', content: userMessage });

    const apiUrl = getApiUrl();
    const streamUrl = `${apiUrl}/api/text/stream`;

    try {
      const response = await fetch(streamUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: openAIMessages }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let assistantText = '';
      const messageIndex = messages.length;

      setMessages((prev) => [...prev, { type: 'ai', content: '...', isTranscript: false }]);

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        for (const line of chunk.split('\n')) {
          if (!line.startsWith('data:')) continue;

          try {
            const data = JSON.parse(line.slice(5));

            if (data.delta) {
              assistantText += data.delta;
              setMessages((prev) => {
                const newMessages = [...prev];
                if (newMessages[messageIndex]) {
                  newMessages[messageIndex] = {
                    type: 'ai',
                    content: assistantText || '...',
                    isTranscript: false,
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
              setMessages((prev) => {
                const newMessages = [...prev];
                if (newMessages[messageIndex]) {
                  newMessages[messageIndex] = {
                    type: 'ai',
                    content: 'Sorry, I encountered an error. Please try again.',
                    isTranscript: false,
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

      if (!assistantText.trim()) {
        setMessages((prev) => {
          const newMessages = [...prev];
          if (newMessages[messageIndex]) {
            newMessages[messageIndex] = {
              type: 'ai',
              content: "I apologize, but I didn't receive a proper response. Could you try again?",
              isTranscript: false,
            };
          }
          return newMessages;
        });
      }

      if (
        assistantText.toLowerCase().includes('consent') ||
        assistantText.toLowerCase().includes('contact you')
      ) {
        await extractLeadFromConversation([
          ...messages,
          { type: 'user', content: userMessage, isTranscript: false },
          { type: 'ai', content: assistantText, isTranscript: false },
        ]);
      }
    } catch (error) {
      console.error('Streaming error:', error);
      updateStatus('💬 Using fallback chat...', 'thinking');

      try {
        const chatUrl = `${apiUrl}/api/chat`;
        const fallbackResponse = await fetch(chatUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: openAIMessages }),
        });

        if (fallbackResponse.ok) {
          const data = await fallbackResponse.json();
          addMessage('ai', data.reply || 'Sorry, I encountered an error. Please try again.');
        } else {
          addMessage('ai', "I'm having trouble connecting. Please check your connection and try again.");
        }
      } catch (fallbackError) {
        console.error('Fallback error:', fallbackError);
        addMessage('ai', "I'm having trouble connecting. Please check your connection and try again.");
      }

      updateStatus('💬 Text mode active', 'inactive');
    }
  };

  // ---------- Lead extraction ----------
  const extractLeadFromConversation = async (conversationMessages: Message[]) => {
    try {
      const response = await fetch(`${getApiUrl()}/api/text/extract-lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: conversationMessages }),
      });

      const data = await response.json();

      if (data.lead && data.lead.consent) {
        await fetch(`${getApiUrl()}/api/leads`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lead: data.lead }),
        });
      }
    } catch (error) {
      console.error('Lead extraction error:', error);
    }
  };

  // ---------- Text send ----------
  const sendTextMessage = async () => {
    const message = textInput.trim();
    if (!message) return;

    addMessage('user', message);
    setTextInput('');

    if (isConnected && vapiRef.current) {
      try {
        vapiRef.current.send({
          type: 'add-message',
          message: { role: 'user', content: message },
        });
        return;
      } catch (error) {
        console.error('[Text] Failed to send via Vapi:', error);
      }
    }

    await streamMessage(message, messages);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendTextMessage();
    }
  };

  useEffect(() => {
    checkBackendStatus();
  }, []);

  useEffect(() => {
    return () => {
      if (vapiRef.current && isConnected) vapiRef.current.stop();
    };
  }, [isConnected]);

  // ---------- Render ----------
  return (
    <>
      {/* Floating Icon */}
      <div
        className="floating-icon"
        onClick={() => setIsOpen(true)}
        role="button"
        aria-label="Open AI Assistant"
      >
        <Mic size={30} color="white" />
      </div>

      {/* ===== FULLSCREEN OVERLAY via PORTAL (with inline fallback styles) ===== */}
      {createPortal(
        <div
          className={`holographic-interface ${isOpen ? 'active' : ''}`}
          style={{
            // Fallback styles in case CSS fails to load on host/embedded page
            position: 'fixed',
            inset: 0,
            width: '100vw',
            height: '100vh',
            display: isOpen ? 'flex' : 'none',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            // keep backdrop subtle—you can adjust or remove if your CSS handles bg
            background:
              'linear-gradient(135deg, rgba(4,7,20,0.85), rgba(12,16,35,0.85))',
            backdropFilter: 'blur(18px)',
          }}
        >
          <button
            className="close-btn"
            onClick={() => {
              setIsOpen(false);
              stopVoice();
            }}
            aria-label="Close assistant"
            style={{
              // Fallback close button styles
              position: 'absolute',
              top: 16,
              right: 16,
              width: 36,
              height: 36,
              borderRadius: 9999,
              border: '1px solid rgba(255,255,255,0.35)',
              background: 'rgba(255,255,255,0.08)',
              cursor: 'pointer',
            }}
          >
            <X size={16} />
          </button>

          <div className="interface-container" style={{ maxWidth: 560, width: '92%' }}>
            {/* VOICE SECTION */}
            {currentMode === 'voice' && (
              <>
                <div className="voice-interface">
                  <div className="voice-ring ring-outer"></div>
                  <div className="voice-ring ring-middle"></div>
                  <div className={`voice-ring ring-inner ${isListening ? 'listening' : ''}`}>
                    <Mic className={`mic-icon ${isListening ? 'listening' : ''}`} size={30} />
                  </div>
                </div>

                <div className="interface-text">
                  <h1 className="interface-title">Voice Assistant</h1>
                  <p className="interface-subtitle">Tap the mic and start speaking.</p>
                </div>

                <div className="controls">
                  <button className={`control-btn voice-btn active`} onClick={startVoice}>
                    Start Voice
                  </button>
                  <button className={`control-btn text-btn`} onClick={() => handleModeChange('text')}>
                    Switch to Text
                  </button>
                </div>

                <div className={`voice-visualizer ${isListening ? 'active' : ''}`}>
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="voice-bar"></div>
                  ))}
                </div>
              </>
            )}

            {/* TEXT SECTION */}
            {currentMode === 'text' && (
              <>
                <div className="interface-text">
                  <h1 className="interface-title">Text Chat</h1>
                </div>

                <div className="chat-container active">
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

                  <div className="chat-input-container chat-input-row">
                    <input
                      type="text"
                      className="chat-input chat-input-min"
                      placeholder="Type your message..."
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                    <button
                      className="send-btn send-btn-nomargin"
                      onClick={sendTextMessage}
                      disabled={!textInput.trim()}
                      aria-label="Send message"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>

                <div className="controls controls-side-by-side controls-text-spacing">
                  <button className={`control-btn voice-btn`} onClick={() => handleModeChange('voice')}>
                    Switch to Voice
                  </button>
                  <button className={`control-btn text-btn active`} disabled>
                    Text Chat
                  </button>
                </div>
              </>
            )}

            {/* STATUS */}
            <div className={`status ${status.className}`}>
              {status.text}
              <span className={`backend-status ${backendStatus}`}>
                {backendStatus === 'checking' && ' • Checking backend...'}
                {backendStatus === 'connected' && ' • Backend connected ✅'}
                {backendStatus === 'disconnected' && ' • Backend offline ⚠️'}
              </span>
            </div>
          </div>
        </div>,
        document.body
      )}
      {/* ===== END OVERLAY ===== */}
    </>
  );
};
