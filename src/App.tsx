import React from 'react';
import { VapiAssistant } from './components/VapiAssistant';
import './components/VapiAssistant.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">LumX AI Assistant</h1>
          <p className="text-lg text-gray-600 mb-8">
            Click the floating icon to open your holographic AI assistant
          </p>
          <div className="bg-purple-700 p-8 rounded-lg shadow-md max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Get Started:</h2>
            <ul className="text-left space-y-2">
              <li>Welcome to LumX!</li>
              <li>1. Click the widget at the bottom right</li>
              <li>2. Accept microphone permission</li>
              <li>3. Start chatting by voice or text</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-sm text-gray-500">Powered by <span className="font-semibold text-purple-700">Nexus Luma</span></div>
        <VapiAssistant />
      </div>
      <footer className="w-full py-4 text-center text-xs text-gray-400 border-t border-gray-200">
        &copy; {new Date().getFullYear()} Nexus Luma. All rights reserved.
      </footer>
    </div>
  );
}

export default App;