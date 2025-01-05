import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './components/TableOfContents.css'  // Add this to ensure ToC styles are loaded

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
