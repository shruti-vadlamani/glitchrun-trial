import React, { useState, useRef, useEffect } from 'react';

function GroqChat({ onSendMessage }) {
  const [messages, setMessages] = useState([
    { sender: 'groq', text: 'Hello, Runner. Need some chaos? Just ask...' }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = () => {
    if (inputText.trim() === '') return;
    
    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text: inputText }]);
    
    // Send to parent for processing
    onSendMessage(inputText);
    
    // Add simulated Groq response
    setTimeout(() => {
      const responses = [
        "Reverse gravity it is! Enjoy floating around!",
        "You asked for chaos? Here's some random obstacles!",
        "I'm feeling generous. Have some platforms to jump on!",
        "Controls reversed. Good luck figuring that out!",
        "Hope you like surprises... 😈",
        "Chaos initiated. Don't say I didn't warn you!"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { sender: 'groq', text: randomResponse }]);
    }, 1000);
    
    // Clear input
    setInputText('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="absolute bottom-4 right-4 w-80 bg-black bg-opacity-80 border border-purple-500 rounded-lg overflow-hidden shadow-lg z-20">
      <div className="bg-gradient-to-r from-purple-800 to-blue-800 p-2 flex justify-between items-center">
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-cyan-400 mr-2 animate-pulse"></div>
          <span className="text-white font-bold">GROQ AI</span>
        </div>
        <div className="text-xs text-gray-300">Chaos Engine v2.0</div>
      </div>
      
      <div className="h-64 overflow-y-auto p-2 font-mono">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`mb-2 ${msg.sender === 'user' ? 'text-right' : ''}`}
          >
            <div 
              className={`inline-block rounded px-3 py-1 max-w-[80%] text-sm ${
                msg.sender === 'user' 
                  ? 'bg-purple-700 text-white'
                  : 'bg-gray-800 text-cyan-400'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-2 border-t border-gray-700 flex">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask Groq for chaos..."
          className="flex-1 bg-gray-800 border border-gray-600 rounded-l px-3 py-1 text-white text-sm focus:outline-none focus:border-purple-500"
        />
        <button
          onClick={handleSend}
          className="bg-purple-600 text-white px-3 py-1 rounded-r hover:bg-purple-700 transition duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default GroqChat;