/**
 * Add storage capabilities to all dashboard HTML files in the content folder
 */
const fs = require('fs');
const path = require('path');

// Path to content directory
const contentDir = path.join(__dirname, 'content');

// Function to recursively find all HTML files in a directory and its subdirectories
function findHtmlFiles(directory) {
  let htmlFiles = [];
  
  const items = fs.readdirSync(directory);
  
  for (const item of items) {
    const itemPath = path.join(directory, item);
    const stats = fs.statSync(itemPath);
    
    if (stats.isDirectory()) {
      // Recursive call for subdirectories
      htmlFiles = htmlFiles.concat(findHtmlFiles(itemPath));
    } else if (item.endsWith('.html')) {
      htmlFiles.push(itemPath);
    }
  }
  
  return htmlFiles;
}

// Find all HTML files in content directory and its subdirectories
const htmlFiles = findHtmlFiles(contentDir);
console.log(`Found ${htmlFiles.length} HTML files in content directory and subdirectories`);

// Storage script to inject
const storageScript = `
<script type="module">
  // Import auto-storage system
  import autoStorage from '../../../auto-storage.js';
  
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
let addedCount = 0;
let updatedCount = 0;
let alreadyHadCount = 0;

htmlFiles.forEach(filePath => {
  const fileName = path.basename(filePath);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if script is already added
  if (!content.includes('auto-storage.js') && !content.includes('simple-storage.js')) {
    // Find the closing body tag and insert our scripts before it
    content = content.replace('</body>', `${storageScript}\n</body>`);
    fs.writeFileSync(filePath, content);
    console.log(`Added auto-storage to ${fileName}`);
    addedCount++;
  } else if (content.includes('simple-storage.js')) {
    // Replace simple-storage with auto-storage
    content = content.replace(/<script src="..\/simple-storage.js"><\/script>[\s\S]*?<\/script>/m, storageScript);
    fs.writeFileSync(filePath, content);
    console.log(`Upgraded ${fileName} from simple-storage to auto-storage`);
    updatedCount++;
  } else {
    console.log(`${fileName} already has storage`);
    alreadyHadCount++;
  }
});

console.log(`
Storage setup complete:
- Added to ${addedCount} files
- Upgraded ${updatedCount} files from simple-storage to auto-storage
- ${alreadyHadCount} files already had storage
- Total processed: ${htmlFiles.length} files
`);
