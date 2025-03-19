/**
 * Dashboard Storage Setup Script
 * 
 * This script automatically adds storage capabilities to all HTML dashboards
 * by injecting the necessary script tags into HTML files.
 */

const fs = require('fs');
const path = require('path');

// Configuration
const contentDir = path.join(__dirname, 'content');
const rootDir = __dirname;

// Check if running in dry-run mode (no changes will be made)
const dryRun = process.argv.includes('--dry-run');

// Find all HTML files
function findHtmlFiles(dir) {
  let results = [];
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Recursively search subdirectories
      results = results.concat(findHtmlFiles(filePath));
    } else if (file.endsWith('.html')) {
      results.push(filePath);
    }
  }
  
  return results;
}

function addStorageToHtml(filePath) {
  let htmlContent = fs.readFileSync(filePath, 'utf8');
  
  // Check if storage is already implemented
  const hasAutoStorage = htmlContent.includes('auto-storage.js');
  const hasSimpleStorage = htmlContent.includes('simple-storage.js');
  
  if (hasAutoStorage) {
    console.log(`✓ ${filePath} - Already has auto-storage.js`);
    return { changed: false, status: 'already-has-auto-storage' };
  }
  
  // Get relative path to the root from this file
  const relativeToRoot = path.relative(path.dirname(filePath), rootDir)
    .replace(/\\/g, '/') || '.'; // Handle case where file is directly in root
    
  // Define the script tags to add
  const storageScriptTag = `
  <!-- Automatic storage system -->
  <script type="module">
    // Import auto-storage system
    import autoStorage from '${relativeToRoot}/auto-storage.js';
  </script>
`;
  
  // Check if we need to add before existing script or at the end of body
  if (htmlContent.includes('</body>')) {
    // Insert before closing body tag
    htmlContent = htmlContent.replace('</body>', `${storageScriptTag}</body>`);
    
    // If it has legacy simple storage, add a comment about compatibility
    if (hasSimpleStorage) {
      htmlContent = htmlContent.replace('</body>', `  <!-- Legacy storage support maintained -->\n</body>`);
    }
    
    if (!dryRun) {
      fs.writeFileSync(filePath, htmlContent);
    }
    
    if (hasSimpleStorage) {
      console.log(`↑ ${filePath} - Upgraded from simple-storage to auto-storage`);
      return { changed: true, status: 'upgraded' };
    } else {
      console.log(`+ ${filePath} - Added auto-storage`);
      return { changed: true, status: 'added' };
    }
  } else {
    console.log(`! ${filePath} - Could not find </body> tag`);
    return { changed: false, status: 'error-no-body' };
  }
}

function main() {
  console.log('Dashboard Storage Setup');
  console.log('======================');
  console.log(`Mode: ${dryRun ? 'Dry run (no changes will be made)' : 'Live'}`);
  
  // Find HTML files
  const contentHtmlFiles = findHtmlFiles(contentDir);
  const rootHtmlFiles = fs.readdirSync(rootDir)
    .filter(file => file.endsWith('.html'))
    .map(file => path.join(rootDir, file));
    
  const allHtmlFiles = [...contentHtmlFiles, ...rootHtmlFiles];
  
  console.log(`\nFound ${allHtmlFiles.length} HTML files to process`);
  
  // Process each file
  const results = {
    total: allHtmlFiles.length,
    added: 0,
    upgraded: 0,
    unchanged: 0,
    errors: 0
  };
  
  for (const file of allHtmlFiles) {
    const result = addStorageToHtml(file);
    
    if (result.changed) {
      if (result.status === 'upgraded') {
        results.upgraded++;
      } else {
        results.added++;
      }
    } else if (result.status === 'already-has-auto-storage') {
      results.unchanged++;
    } else {
      results.errors++;
    }
  }
  
  // Print summary
  console.log('\nSummary:');
  console.log(`Total files processed: ${results.total}`);
  console.log(`Added storage to: ${results.added}`);
  console.log(`Upgraded from simple-storage: ${results.upgraded}`);
  console.log(`Already had storage: ${results.unchanged}`);
  console.log(`Errors: ${results.errors}`);
  
  if (dryRun) {
    console.log('\nThis was a dry run. No files were modified.');
    console.log('Run without --dry-run to apply changes.');
  }
}

// Run the main function
main();
