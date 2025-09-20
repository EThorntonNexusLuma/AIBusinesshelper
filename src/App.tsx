import React from 'react';
import { VapiAssistant } from './components/VapiAssistant';
import './components/VapiAssistant.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">LumX AI Assistant</h1>
        <p className="text-lg text-gray-600 mb-8">
          Click the floating icon to open your holographic AI assistant
        </p>
  <div className="bg-purple-700 p-8 rounded-lg shadow-md max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-4">Features:</h2>
          <ul className="text-centered space-y-2">
            <li>Voice chat with Vapi AI</li>
            <li>Text chat fallback</li>
            <li>Holographic interface</li>
            <li>Mobile responsive</li>
            <li>Voice visualization</li>
          </ul>
        </div>
      </div>
      
      <VapiAssistant />
    </div>
  );
}

export default App;