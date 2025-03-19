/**
 * Add storage capabilities to all dashboard HTML files in the content folder
 */
const fs = require('fs');
const path = require('path');

// Path to content directory
const contentDir = path.join(__dirname, 'content');

// Get all HTML files
const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.html'));

// Storage script to inject
const storageScript = `
<script type="module">
  // Import auto-storage system
  import autoStorage from '../auto-storage.js';
  
  // For backward compatibility with any manual SimpleStorage calls
  window.SimpleStorage = {
    saveCheckboxes: (dashboardId) => {
      // Auto-storage will handle this automatically
      console.log('Using autoStorage instead of SimpleStorage');
    },
    loadCheckboxes: (dashboardId) => {
      // Auto-storage will handle this automatically
      console.log('Using autoStorage instead of SimpleStorage');
    },
    save: (key, data) => {
      localStorage.setItem(key, JSON.stringify(data));
    },
    load: (key, defaultValue = null) => {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : defaultValue;
    },
    delete: (key) => {
      localStorage.removeItem(key);
    }
  };
</script>
`;

// Process each file
files.forEach(file => {
  const filePath = path.join(contentDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if script is already added
  if (!content.includes('auto-storage.js') && !content.includes('simple-storage.js')) {
    // Find the closing body tag and insert our scripts before it
    content = content.replace('</body>', `${storageScript}\n</body>`);
    fs.writeFileSync(filePath, content);
    console.log(`Added auto-storage to ${file}`);
  } else if (content.includes('simple-storage.js')) {
    // Replace simple-storage with auto-storage
    content = content.replace(/<script src="..\/simple-storage.js"><\/script>[\s\S]*?<\/script>/m, storageScript);
    fs.writeFileSync(filePath, content);
    console.log(`Upgraded ${file} from simple-storage to auto-storage`);
  } else {
    console.log(`${file} already has storage`);
  }
});

console.log('Done adding storage to dashboard files');
