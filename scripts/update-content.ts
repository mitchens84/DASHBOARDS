import * as fs from 'fs';
import * as path from 'path';

// Configuration
const CONTENT_DIR = path.resolve(__dirname, '../content');
const MANIFEST_PATH = path.resolve(__dirname, '../src/content-manifest.ts');

// Scan content directories for dashboard files
function scanContentDirectories() {
  const contentStructure: Record<string, string[]> = {};
  
  // Get all category directories
  const categories = fs.readdirSync(CONTENT_DIR)
    .filter(item => {
      const itemPath = path.join(CONTENT_DIR, item);
      return fs.statSync(itemPath).isDirectory() && !item.startsWith('.');
    });
  
  // For each category, get all tsx files
  categories.forEach(category => {
    const categoryPath = path.join(CONTENT_DIR, category);
    const files = fs.readdirSync(categoryPath)
      .filter(file => file.endsWith('.tsx') && file !== 'Icon.tsx')
      .map(file => file.replace('.tsx', ''));
    
    if (files.length > 0) {
      contentStructure[category] = files;
    }
  });
  
  return contentStructure;
}

// Parse existing manifest to preserve structure and comments
function parseExistingManifest(filepath: string): Record<string, string[]> {
  try {
    if (!fs.existsSync(filepath)) {
      console.log('No existing manifest file found, creating new one.');
      return {};
    }

    const content = fs.readFileSync(filepath, 'utf8');
    const existingStructure: Record<string, string[]> = {};

    // Simple regex to extract categories and files
    const manifestRegex = /\"([^\"]+)\"\s*:\s*\[([\s\S]*?)\]/g;
    let match;

    while ((match = manifestRegex.exec(content)) !== null) {
      const category = match[1];
      const filesBlock = match[2];
      
      // Extract individual file names
      const fileRegex = /\"([^\"]+)\"/g;
      const files: string[] = [];
      let fileMatch;
      
      while ((fileMatch = fileRegex.exec(filesBlock)) !== null) {
        files.push(fileMatch[1]);
      }
      
      existingStructure[category] = files;
    }

    return existingStructure;
  } catch (error) {
    console.error('Error parsing existing manifest:', error);
    return {};
  }
}

// Update content manifest file
function updateContentManifest(newContent: Record<string, string[]>) {
  // Read existing manifest to preserve any manual edits
  const existingContent = parseExistingManifest(MANIFEST_PATH);
  
  // Merge existing content with new content, preserving order where possible
  const mergedContent: Record<string, string[]> = { ...existingContent };
  
  // Update with new content from scan
  for (const [category, files] of Object.entries(newContent)) {
    // If category exists, merge files, else add new category
    if (mergedContent[category]) {
      // Create a set of existing files for quick lookup
      const existingFiles = new Set(mergedContent[category]);
      
      // Add new files that don't exist yet
      files.forEach(file => {
        if (!existingFiles.has(file)) {
          mergedContent[category].push(file);
        }
      });
    } else {
      mergedContent[category] = files;
    }
  }
  
  // Generate the content manifest code
  let manifestCode = 'export const contentManifest = {\n';
  
  Object.entries(mergedContent).forEach(([category, files]) => {
    manifestCode += `  "${category}": [\n`;
    files.forEach(file => {
      manifestCode += `    "${file}",\n`;
    });
    manifestCode += `  ],\n`;
  });
  
  manifestCode += '};\n\n';
  
  // Add the getContentPath function
  manifestCode += `export const getContentPath = (file: string) => {
  for (const [category, files] of Object.entries(contentManifest)) {
    if (files.includes(file)) {
      return \`\${category}/\${file}\`;
    }
  }
  return file; // fallback to root content directory
};\n`;
  
  // Write the file
  fs.writeFileSync(MANIFEST_PATH, manifestCode);
  console.log('Content manifest updated successfully at:', MANIFEST_PATH);
  
  return mergedContent;
}

// Generate guidance for App.tsx updates
function generateAppTsxGuidance(contentStructure: Record<string, string[]>) {
  const GENERATED_DIR = path.resolve(__dirname, '../generated');
  
  // Create generated directory if it doesn't exist
  if (!fs.existsSync(GENERATED_DIR)) {
    fs.mkdirSync(GENERATED_DIR, { recursive: true });
  }
  
  // Generate import statements
  let importStatements = '// Generated import statements for App.tsx\n';
  
  Object.entries(contentStructure).forEach(([category, files]) => {
    importStatements += `\n// ${category} imports\n`;
    
    files.forEach(file => {
      const componentName = file
        .split(/[-_]/)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');
      
      importStatements += `import ${componentName} from "../content/${category}/${file}";\n`;
    });
  });
  
  // Generate TOC entries
  let tocEntries = '// Generated TOC entries for App.tsx\n\n';
  
  Object.entries(contentStructure).forEach(([category, files]) => {
    const displayCategory = category.replace(/^\d+[A-Z]-/, '').replace(/-/g, ' ');
    tocEntries += `{ id: "${category.toLowerCase()}-header", title: "${displayCategory}", level: 0 },\n`;
    
    files.forEach(file => {
      const displayName = file
        .replace(/^\d+[-_]/, '')
        .split(/[-_]/)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
      
      tocEntries += `{ id: "${file}", title: "${displayName}", level: 1 },\n`;
    });
  });
  
  // Generate switch cases
  let switchCases = '// Generated switch cases for renderContent function in App.tsx\n\n';
  
  Object.entries(contentStructure).forEach(([category, files]) => {
    switchCases += `// ${category}\n`;
    
    files.forEach(file => {
      const componentName = file
        .split(/[-_]/)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');
      
      switchCases += `case "${file}":\n  return <${componentName} />;\n`;
    });
    
    switchCases += '\n';
  });
  
  // Write guidance files
  fs.writeFileSync(path.join(GENERATED_DIR, 'import-statements.txt'), importStatements);
  fs.writeFileSync(path.join(GENERATED_DIR, 'toc-entries.txt'), tocEntries);
  fs.writeFileSync(path.join(GENERATED_DIR, 'switch-cases.txt'), switchCases);
  
  console.log('App.tsx guidance generated in:', GENERATED_DIR);
  console.log('Please review these files and manually update App.tsx as needed.');
}

// Main function
function main() {
  try {
    console.log('Scanning content directories...');
    // Scan content directories
    const contentStructure = scanContentDirectories();
    
    console.log('Updating content manifest...');
    // Update content manifest
    const mergedContent = updateContentManifest(contentStructure);
    
    console.log('Generating guidance for App.tsx updates...');
    // Generate App.tsx guidance
    generateAppTsxGuidance(mergedContent);
    
    console.log('Content update completed successfully!');
  } catch (error) {
    console.error('Error updating content:', error);
  }
}

// Run the main function
main();