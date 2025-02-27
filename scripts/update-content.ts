import * as fs from 'fs';
import * as path from 'path';

// Configuration
const CONTENT_DIR = path.resolve(__dirname, '../content');
const MANIFEST_PATH = path.resolve(__dirname, '../src/content-manifest.ts');
const APP_TSX_PATH = path.resolve(__dirname, '../src/App.tsx');

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

// Safely convert a file name to a valid component name
function safeComponentName(fileName: string): string {
  // Replace spaces and special characters with underscores
  let safeName = fileName
    .replace(/\s+/g, '_')
    .replace(/[^\w\-]/g, '');
  
  // If the file name starts with a number, prefix with an underscore
  if (/^\d/.test(safeName)) {
    safeName = 'Component' + safeName;
  }
  
  // Convert to proper CamelCase
  return safeName
    .split(/[-_]/)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

// Generate a safe import path
function safeImportPath(category: string, fileName: string): string {
  return `../content/${category}/${fileName}`;
}

// Extract information from App.tsx
function parseAppTsx() {
  try {
    const content = fs.readFileSync(APP_TSX_PATH, 'utf8');
    
    // Find existing imports
    const importRegex = /import\s+(\w+)\s+from\s+["']\.\.\/content\/([^/]+)\/([^"']+)["'];/g;
    const existingImports: { componentName: string, categoryPath: string, fileName: string }[] = [];
    let importMatch;
    
    while ((importMatch = importRegex.exec(content)) !== null) {
      existingImports.push({
        componentName: importMatch[1],
        categoryPath: importMatch[2],
        fileName: importMatch[3].replace('.tsx', '')
      });
    }
    
    // Find TOC items
    const tocRegex = /{\s*id:\s*["']([^"']+)["'],\s*title:\s*["']([^"']+)["'],\s*level:\s*(\d+)\s*}/g;
    const existingTocItems: { id: string, title: string, level: number }[] = [];
    let tocMatch;
    
    while ((tocMatch = tocRegex.exec(content)) !== null) {
      existingTocItems.push({
        id: tocMatch[1],
        title: tocMatch[2],
        level: parseInt(tocMatch[3])
      });
    }
    
    // Find switch cases
    const caseRegex = /case\s+["']([^"']+)["']:\s*return\s+<(\w+)\s*\/>/g;
    const existingCases: { id: string, component: string }[] = [];
    let caseMatch;
    
    while ((caseMatch = caseRegex.exec(content)) !== null) {
      existingCases.push({
        id: caseMatch[1],
        component: caseMatch[2]
      });
    }
    
    return { existingImports, existingTocItems, existingCases, fullContent: content };
  } catch (error) {
    console.error('Error parsing App.tsx:', error);
    return { existingImports: [], existingTocItems: [], existingCases: [], fullContent: '' };
  }
}

// Generate guidance files for manual update
function generateGuidanceFiles(newImports: string[], newTocItems: string[], newCases: string[]) {
  const GENERATED_DIR = path.resolve(__dirname, '../generated');
  if (!fs.existsSync(GENERATED_DIR)) {
    fs.mkdirSync(GENERATED_DIR, { recursive: true });
  }
  
  // Write guidance files
  fs.writeFileSync(path.join(GENERATED_DIR, 'import-statements.txt'), newImports.join('\n'));
  fs.writeFileSync(path.join(GENERATED_DIR, 'toc-entries.txt'), newTocItems.join('\n'));
  fs.writeFileSync(path.join(GENERATED_DIR, 'switch-cases.txt'), newCases.join('\n'));
  
  console.log('Generated files for App.tsx updates in:', GENERATED_DIR);
  console.log(`- ${newImports.length} new imports`);
  console.log(`- ${newTocItems.length} new TOC entries`);
  console.log(`- ${newCases.length} new switch cases`);
}

// Create a fixed App.tsx with manual guidance
function createFixedAppTsx(contentStructure: Record<string, string[]>) {
  console.log('Creating fixed App.tsx file...');
  
  // First generate guidance for manual updates
  const { existingImports, existingTocItems, existingCases } = parseAppTsx();
  
  // Keep track of what needs to be added
  const newImports: string[] = [];
  const newTocItems: string[] = [];
  const newCases: string[] = [];
  
  // Process each file in the content structure
  Object.entries(contentStructure).forEach(([category, files]) => {
    files.forEach(file => {
      const componentName = safeComponentName(file);
      const importPath = safeImportPath(category, file);
      
      // Generate ID for TOC and case
      const id = file
        .replace(/^\d+[-_]/, '')
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9\-]/g, '');
      
      // Check if import exists
      const importExists = existingImports.some(imp => 
        imp.categoryPath === category && (imp.fileName === file || imp.fileName === file + '.tsx')
      );
      
      if (!importExists) {
        newImports.push(`import ${componentName} from "${importPath}";`);
      }
      
      // Check if TOC item exists
      const tocExists = existingTocItems.some(item => item.id === id);
      
      if (!tocExists) {
        const displayName = file
          .replace(/^\d+[-_]/, '')
          .split(/[-_]/)
          .map(part => part.charAt(0).toUpperCase() + part.slice(1))
          .join(' ');
        
        newTocItems.push(`{ id: "${id}", title: "${displayName}", level: 1 },`);
      }
      
      // Check if case exists
      const caseExists = existingCases.some(c => c.id === id);
      
      if (!caseExists) {
        newCases.push(`case "${id}":\n  return <${componentName} />;`);
      }
    });
  });
  
  if (newImports.length === 0 && newTocItems.length === 0 && newCases.length === 0) {
    console.log('App.tsx is already up to date, no changes needed.');
    return;
  }
  
  // Generate guidance files for manual update
  generateGuidanceFiles(newImports, newTocItems, newCases);
  
  console.log('NOTE: Due to special cases in your codebase (files with spaces, numbers in filenames), automatic update is not recommended.');
  console.log('Please use the generated files to manually update App.tsx to avoid syntax errors.');
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
    
    console.log('Creating guidance for updating App.tsx...');
    // Generate guidance for App.tsx
    createFixedAppTsx(mergedContent);
    
    console.log('Content update completed successfully!');
  } catch (error) {
    console.error('Error updating content:', error);
  }
}

// Run the main function
main();