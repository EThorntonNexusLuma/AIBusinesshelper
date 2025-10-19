
import React from 'react';
import { VapiAssistant } from './components/VapiAssistant';
import './components/VapiAssistant.css';

function App() {
  return (
    <div
  className="corner-widget-container bg-gradient-to-br from-[#ff944c] via-[#ff6f3f] to-[#1d150a] flex flex-col justify-between"
    >
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">LumX AI Assistant</h1>
          <p className="text-lg text-white mb-8">Click the floating icon to open your holographic AI assistant</p>
          <div className="bg-gradient-to-br from-[#ff944c] via-[#ff6f3f] to-[#1d150a] backdrop-blur-sm text-white p-8 rounded-lg shadow-lg max-w-md mx-auto border border-[#ffb81e]/30">
            <h2 className="text-xl font-semibold mb-4 text-[#ffb81e]">Get Started:</h2>
            <ul className="text-left space-y-2 text-[#fff]">
              <li>Welcome to LumX!</li>
              <li>1. Click the widget at the bottom right</li>
              <li>2. Accept microphone permission</li>
              <li>3. Start chatting by voice or text</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-sm text-[#ffb81e]">Powered by <span className="font-semibold text-[#ff944c]">Nexus Luma</span></div>
        <VapiAssistant />
      </div>
      <footer className="w-full py-6 px-4 text-center text-xs text-white border-t border-[#ffb81e]/30 bg-gradient-to-t from-[#1d150a] via-[#ff6f3f]/40 to-[#ff944c]/10">
        <div className="max-w-4xl mx-auto space-y-3">
          <p className="text-white leading-relaxed">
            Please note that AI technology may occasionally generate mistakes or inaccuracies. 
            Your privacy is important to us—your personal information will never be sold or shared with third parties. 
            Certain data may be used internally for marketing and service improvements. 
            If you have any questions, concerns, or issues, please contact us at{' '}
            <a href="mailto:Info@NexusLuma.com" className="text-[#ff944c] hover:text-[#ffb81e] underline">
              Info@NexusLuma.com
            </a>
          </p>
          <p className="text-white font-medium">
            &copy; {new Date().getFullYear()} Nexus Luma. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
