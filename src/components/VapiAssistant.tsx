import React, { useState, useEffect, useRef } from 'react';
import Vapi from '@vapi-ai/web';
import { Mic, X, Send } from 'lucide-react';

// Configuration - Replace with your actual Vapi credentials
const PUBLIC_KEY = "385ecf4c-99a4-4319-8b03-111c6c61abf9";
const ASSISTANT_ID = "900acf00-1429-4a76-92b2-93f0e4ffa109";

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
      content: "Hello! I'm your AI assistant. I can help you with information about luxury properties, answer questions, or just have a conversation. How can I assist you today?"
    }
  ]);
  const [textInput, setTextInput] = useState('');
  const [micPermission, setMicPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');

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
    }
  };

  // Text Chat
  const sendTextMessage = () => {
    const message = textInput.trim();
    if (!message) return;

    addMessage('user', message);
    setTextInput('');

    updateStatus('🤔 AI thinking...', 'thinking');

    // If voice is connected, try to send through Vapi
    if (isConnected && vapiRef.current) {
      try {
        vapiRef.current.send({
          type: 'add-message',
          message: {
            role: 'user',
            content: message
          }
        });
        return;
      } catch (error) {
        console.error('[Text] Failed to send via Vapi:', error);
      }
    }

    // Fallback: Simulate response for text-only mode
    setTimeout(() => {
      const responses = [
        "I'd be happy to help you with that. Could you provide more specific details about what you're looking for?",
        "That's an interesting question! Based on what you've asked, I can provide some information about luxury properties and their amenities.",
        "Thank you for your question. I can assist you with property information, scheduling viewings, or answering questions about our luxury real estate offerings.",
        "I understand you're interested in learning more. What specific aspects would you like me to focus on?",
        "Great question! I can provide detailed information about pricing, locations, amenities, and help you schedule property viewings."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      addMessage('ai', randomResponse);
      updateStatus('💬 Text mode active', 'inactive');
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendTextMessage();
    }
  };

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
      {/* Floating Icon */}
      <div 
        className="floating-icon"
        onClick={() => setIsOpen(true)}
        role="button"
        aria-label="Open AI Assistant"
      >
        <Mic size={30} color="white" />
      </div>

      {/* Holographic Interface - only render when open */}
      {isOpen && (
        <div className={`holographic-interface active`}> 
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
            {/* Voice Interface */}
            <div className="voice-interface">
              <div className="voice-ring ring-outer"></div>
              <div className="voice-ring ring-middle"></div>
              <div className={`voice-ring ring-inner ${isListening ? 'listening' : ''}`}> 
                <Mic 
                  className={`mic-icon ${isListening ? 'listening' : ''}`}
                  <>
                    {/* Floating Icon - always visible */}
                    <div 
                      className="floating-icon"
                      onClick={() => setIsOpen(true)}
                      role="button"
                      aria-label="Open AI Assistant"
                      style={{ pointerEvents: isOpen ? 'none' : 'auto', opacity: isOpen ? 0.5 : 1 }}
                    >
                      <Mic size={30} color="white" />
                    </div>

                    {/* Holographic Interface - only render when open */}
                    {isOpen && (
                      <div className={`holographic-interface active`}> 
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
                        {/* ...existing code... */}
                      </div>
                    )}
                  </>
            <div className={`voice-visualizer ${isListening ? 'active' : ''}`}> 
              {[...Array(5)].map((_, i) => (
                <div key={i} className="voice-bar"></div>
              ))}
            </div>

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
            </div>
          </div>
        </div>
      )}
    </>
  );
};