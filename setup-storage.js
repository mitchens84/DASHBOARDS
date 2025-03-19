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
<script src="../simple-storage.js"></script>
<script>
  // Initialize when page loads
  document.addEventListener('DOMContentLoaded', function() {
    // Generate a dashboard ID from filename
    const dashboardId = window.location.pathname.split('/').pop().replace('.html', '');
    
    // Load any saved checkbox states
    SimpleStorage.loadCheckboxes(dashboardId);
    
    // Save checkbox states when they change
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        SimpleStorage.saveCheckboxes(dashboardId);
      });
    });
    
    // For other interactive elements like textareas, inputs, etc.
    function saveFormState() {
      const formData = {};
      document.querySelectorAll('input[type="text"], textarea, select').forEach(el => {
        if (el.id) {
          formData[el.id] = el.value;
        }
      });
      SimpleStorage.save(dashboardId + '-forms', formData);
    }
    
    // Load saved form data
    const savedFormData = SimpleStorage.load(dashboardId + '-forms', {});
    Object.keys(savedFormData).forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.value = savedFormData[id];
      }
    });
    
    // Add change listeners to form elements
    document.querySelectorAll('input[type="text"], textarea, select').forEach(el => {
      el.addEventListener('change', saveFormState);
      el.addEventListener('blur', saveFormState);
    });
  });
</script>
`;

// Process each file
files.forEach(file => {
  const filePath = path.join(contentDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if script is already added
  if (!content.includes('simple-storage.js')) {
    // Find the closing body tag and insert our scripts before it
    content = content.replace('</body>', `${storageScript}\n</body>`);
    fs.writeFileSync(filePath, content);
    console.log(`Added storage to ${file}`);
  } else {
    console.log(`${file} already has storage`);
  }
});

console.log('Done adding storage to dashboard files');
