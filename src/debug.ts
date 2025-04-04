// Debug script to help diagnose render issues
console.log('***********************');
console.log('Debug script loaded at:', new Date().toISOString());
console.log('***********************');

// Log environment variables to help diagnose path issues
console.log('Environment variables:');
console.log('BASE_URL:', import.meta.env.BASE_URL);
console.log('MODE:', import.meta.env.MODE);
console.log('DEV:', import.meta.env.DEV);
console.log('PROD:', import.meta.env.PROD);

// Check for React and ReactDOM
console.log('React availability check:');
console.log('React global:', typeof React !== 'undefined' ? 'Available' : 'Not available');
console.log('ReactDOM global:', typeof ReactDOM !== 'undefined' ? 'Available' : 'Not available');

// Document state
console.log('Document state:');
console.log('readyState:', document.readyState);
console.log('documentElement:', document.documentElement.outerHTML.substring(0, 150) + '...');

// Create a MutationObserver to watch for DOM changes
const observer = new MutationObserver((mutations) => {
  console.log('DOM mutation detected:', mutations.length, 'changes');
  mutations.forEach(mutation => {
    if (mutation.type === 'childList') {
      console.log('Children changed:', 
        mutation.addedNodes.length, 'added,', 
        mutation.removedNodes.length, 'removed');
    }
  });
});

// Capture any React errors
window.__REACT_ERROR_OVERLAY__ = {
  reportRuntimeError: (err: any) => {
    console.error('React runtime error:', err);
    return false;
  }
};

// Add detailed error logging
window.addEventListener('error', (event) => {
  console.error('Global error caught:');
  console.error('  Message:', event.message);
  console.error('  Filename:', event.filename);
  console.error('  Line:', event.lineno, 'Column:', event.colno);
  console.error('  Error object:', event.error);
});

// Add unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled Promise Rejection:');
  console.error('  Reason:', event.reason);
  console.error('  Promise:', event.promise);
});

// Listen for DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM content loaded');
  
  // Log rendered DOM
  console.log('Current DOM structure:');
  console.log(document.body.innerHTML);
  
  // Start observing the root element
  const rootElement = document.getElementById('root');
  if (rootElement) {
    console.log('Root element found:', rootElement);
    console.log('Root element innerHTML:', rootElement.innerHTML);
    observer.observe(rootElement, { 
      childList: true,
      subtree: true,
      attributes: true
    });
  } else {
    console.error('Root element not found!');
    console.log('Available elements by ID:', 
      Array.from(document.querySelectorAll('[id]'))
        .map(el => el.id));
  }
});

// Just before export, log completion of debug initialization
console.log('Debug initialization completed');

export {};