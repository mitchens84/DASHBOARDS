/**
 * Script to automatically update the content structure in App.tsx
 * based on the actual content folder structure.
 */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const CONTENT_DIR = path.resolve(__dirname, '../../content');
const APP_FILE = path.resolve(__dirname, '../App.tsx');

// Define category names mapping
const CATEGORY_NAMES: Record<string, string> = {
  '0A-PREP': '0A-PREPAREDNESS',
  '3P-POSSESSIONS': '3P-POSSESSIONS',
  '4H-BIOHACKING': '4H-BIOHACKING-SKIN',
  '4H-ENVIRONMENT': '4H-ENVIRONMENT',
  '4H-MEDICAL': '4H-MEDICAL',
  '4H-HEALTH': '4H-HEALTH',
  '4H-NUTRITION': '4H-NUTRITION',
  '5R-BEAN': '5R-BEAN',
  '6I-INTELLECTUAL': '6I-INTELLECTUAL',
  '9E-MEDIA': '9E-MEDIA',
  '9E-TRAVEL': '9E-TRAVEL',
  // Add more categories as needed
};

// Get all directories in the content folder
function getContentStructure() {
  const structure: Record<string, string[]> = {};
  
  // Get all folders in the content directory
  const contentFolders = fs.readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  // For each folder, get the content files
  contentFolders.forEach(folder => {
    const folderPath = path.join(CONTENT_DIR, folder);
    const files = fs.readdirSync(folderPath)
      .filter(file => !file.startsWith('.') && !fs.statSync(path.join(folderPath, file)).isDirectory());
      
    structure[folder] = files;
  });
  
  return structure;
}

// Generate TOC items for App.tsx
function generateTocItems(structure: Record<string, string[]>) {
  let tocItems = '[\n';
  tocItems += '    { id: "dashboard-overview", title: "DASHBOARDS", level: 0 },\n';
  
  Object.keys(structure).sort().forEach(category => {
    const displayName = CATEGORY_NAMES[category] || category;
    const categoryId = category.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    
    // Add category header
    tocItems += `    \n    // ${displayName} Section\n`;
    tocItems += `    { id: "${categoryId}", title: "${displayName}", level: 0 },\n`;
    
    // Add items in this category
    structure[category].forEach(file => {
      // Extract item ID and title from filename
      const itemId = path.basename(file, path.extname(file))
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, '-');
      
      // Generate a readable title from the filename
      let itemTitle = path.basename(file, path.extname(file))
        .replace(/^\d+[-_]/, '') // Remove leading numbers
        .replace(/[-_]/g, ' ')   // Replace hyphens/underscores with spaces
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      tocItems += `    { id: "${itemId}", title: "${itemTitle}", level: 1 },\n`;
    });
  });
  
  tocItems += '  ]';
  return tocItems;
}

// Generate case statements for renderContent
function generateRenderContent(structure: Record<string, string[]>) {
  let renderContent = 'switch (id) {\n';
  renderContent += '      // Root level dashboards\n';
  renderContent += '      case "dashboard-overview":\n';
  renderContent += '        return (\n';
  renderContent += '          <section id={id} className="p-6 bg-white rounded-lg shadow">\n';
  renderContent += '            <h1 className="text-3xl font-bold mb-4">DASHBOARDS OVERVIEW</h1>\n';
  renderContent += '            <p>\n';
  renderContent += '              Welcome to the collection of interactive visual content across LBS\n';
  renderContent += '              categories\n';
  renderContent += '            </p>\n';
  renderContent += '          </section>\n';
  renderContent += '        );\n\n';
  
  Object.keys(structure).sort().forEach(category => {
    renderContent += `      // ${category} cases\n`;
    
    structure[category].forEach(file => {
      const itemId = path.basename(file, path.extname(file))
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, '-');
      
      const extension = path.extname(file).toLowerCase();
      
      if (extension === '.html') {
        // HTML files use HtmlContent component
        renderContent += `      case "${itemId}":\n`;
        renderContent += `        return <HtmlContent filePath="content/${category}/${file}" />;\n`;
      } else {
        // React components are imported
        const componentName = path.basename(file, path.extname(file))
          .replace(/[^a-zA-Z0-9_]/g, '')
          .replace(/^\d+/, ''); // Remove leading numbers
        
        renderContent += `      case "${itemId}":\n`;
        renderContent += `        return <${componentName} />;\n`;
      }
    });
    
    renderContent += '\n';
  });
  
  renderContent += '      default:\n';
  renderContent += '        return null;\n';
  renderContent += '    }';
  
  return renderContent;
}

// Generate import statements
function generateImports(structure: Record<string, string[]>) {
  let imports = '';
  
  Object.keys(structure).sort().forEach(category => {
    imports += `// ${category} imports\n`;
    
    structure[category]
      .filter(file => path.extname(file).toLowerCase() !== '.html')
      .forEach(file => {
        const componentName = path.basename(file, path.extname(file))
          .replace(/[^a-zA-Z0-9_]/g, '')
          .replace(/^\d+/, ''); // Remove leading numbers
        
        imports += `import ${componentName} from "../content/${category}/${file}";\n`;
      });
    
    imports += '\n';
  });
  
  return imports;
}

// Update App.tsx with the generated content
function updateAppTsx(structure: Record<string, string[]>) {
  const tocItems = generateTocItems(structure);
  const renderContent = generateRenderContent(structure);
  const imports = generateImports(structure);
  
  // Read current App.tsx
  let appContent = fs.readFileSync(APP_FILE, 'utf-8');
  
  // Replace TOC items
  appContent = appContent.replace(
    /const tocItems = \[[\s\S]*?\];/m, 
    `const tocItems = ${tocItems};`
  );
  
  // Replace renderContent
  appContent = appContent.replace(
    /const renderContent = \(id: string\) => {[\s\S]*?};/m,
    `const renderContent = (id: string) => {\n    ${renderContent}\n  };`
  );
  
  // Replace imports (more careful approach needed)
  const importSection = appContent.match(/import.*?from.*?;([\s\S]*?)function App/m);
  if (importSection && importSection[1]) {
    const beforeImports = appContent.split(importSection[1])[0];
    const afterImports = appContent.split(importSection[1])[1];
    appContent = beforeImports + '\n' + imports + 'function App' + afterImports;
  }
  
  // Write updated content back
  fs.writeFileSync(APP_FILE, appContent, 'utf-8');
  
  console.log('App.tsx has been updated to match content folder structure!');
  
  // Format the file with prettier if available
  try {
    execSync('npx prettier --write ' + APP_FILE);
    console.log('App.tsx has been formatted with prettier.');
  } catch (e) {
    console.log('Could not format App.tsx with prettier. You may want to format it manually.');
  }
}

// Main execution
const contentStructure = getContentStructure();
updateAppTsx(contentStructure);

console.log('Content structure update complete!');
