import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Add error handling and logging
try {
  const rootElement = document.getElementById('root');
  console.log('Root element:', rootElement);
  
  if (!rootElement) {
    throw new Error('Root element not found!');
  }
  
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error('Error mounting React app:', error);
  document.body.innerHTML = `<div style="color: red; padding: 20px;">Error: ${error.message}</div>`;
}