import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import './components/TableOfContents.css';
import './debug'; // Import debug script

console.log('main.tsx execution started');

// Very simple error boundary for rendering
try {
  console.log('Attempting to render React app');
  
  // Get root element
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('Root element not found in DOM');
  }
  
  // Create root and render app
  ReactDOM.createRoot(rootElement).render(
    <HashRouter>
      <App />
    </HashRouter>
  );
  
  console.log('React app render call completed');
} catch (error) {
  console.error('Fatal error rendering React app:', error);
  
  // Display error on page for debugging
  const errorDisplay = document.getElementById('error-display');
  if (errorDisplay) {
    errorDisplay.style.display = 'block';
    errorDisplay.innerHTML = `
      <h3>React Rendering Error</h3>
      <p>${error instanceof Error ? error.message : String(error)}</p>
      <pre>${error instanceof Error && error.stack ? error.stack : 'No stack trace available'}</pre>
    `;
  }
}
