
import React from 'react';
import { VapiAssistant } from './components/VapiAssistant';
import './components/VapiAssistant.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex flex-col justify-between">
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">LumX AI Assistant</h1>
          <p className="text-lg text-white mb-8 drop-shadow">
            Click the floating icon to open your holographic AI assistant
          </p>
          <div className="bg-gradient-to-br from-indigo-800/80 to-blue-600/90 backdrop-blur-sm text-white p-8 rounded-lg shadow-lg max-w-md mx-auto border border-blue-400/30">
            <h2 className="text-xl font-semibold mb-4">Get Started:</h2>
            <ul className="text-left space-y-2">
              <li>Welcome to LumX!</li>
              <li>1. Click the widget at the bottom right</li>
              <li>2. Accept microphone permission</li>
              <li>3. Start chatting by voice or text</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-sm text-white/90">Powered by <span className="font-semibold text-cyan-300">Nexus Luma</span></div>
        <VapiAssistant />
      </div>
      <footer className="w-full py-6 px-4 text-center text-xs text-white/70 border-t border-blue-400/30">
        <div className="max-w-4xl mx-auto space-y-3">
          <p className="text-white/60 leading-relaxed">
            Please note that AI technology may occasionally generate mistakes or inaccuracies. 
            Your privacy is important to us—your personal information will never be sold or shared with third parties. 
            Certain data may be used internally for marketing and service improvements. 
            If you have any questions, concerns, or issues, please contact us at{' '}
            <a href="mailto:Info@NexusLuma.com" className="text-cyan-300 hover:text-cyan-200 underline">
              Info@NexusLuma.com
            </a>
          </p>
          <p className="text-white/70 font-medium">
            &copy; {new Date().getFullYear()} Nexus Luma. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
