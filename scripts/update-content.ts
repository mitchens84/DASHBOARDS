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

// Update App.tsx with new content
function updateAppTsx(contentStructure: Record<string, string[]>) {
  console.log('Updating App.tsx...');
  
  const { existingImports, existingTocItems, existingCases, fullContent } = parseAppTsx();
  
  // Keep track of what needs to be added
  const newImports: string[] = [];
  const newTocItems: string[] = [];
  const newCases: string[] = [];
  
  // For each file in the content structure, check if it needs to be added
  Object.entries(contentStructure).forEach(([category, files]) => {
    files.forEach(file => {
      const componentName = file
        .split(/[-_]/)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');
      
      // Check if import exists
      const importExists = existingImports.some(imp => 
        imp.categoryPath === category && (imp.fileName === file || imp.fileName === file + '.tsx')
      );
      
      if (!importExists) {
        newImports.push(`import ${componentName} from "../content/${category}/${file}";`);
      }
      
      // Generate ID for TOC and case
      const id = file.replace(/^\d+[-_]/, '').toLowerCase().replace(/[^a-z0-9]/g, '-');
      
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
  
  // Generate guidance files
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
  
  // Attempt to automatically update App.tsx if there are changes
  try {
    console.log('Attempting to automatically update App.tsx...');
    
    let updatedContent = fullContent;
    
    // Add imports
    if (newImports.length > 0) {
      // Find the appropriate category comment section
      newImports.forEach(importLine => {
        const categoryMatch = importLine.match(/\/content\/([^/]+)\//);
        if (!categoryMatch) return;
        
        const category = categoryMatch[1];
        const commentLine = `// ${category} imports`;
        
        // Check if the category comment exists
        if (updatedContent.includes(commentLine)) {
          // Insert after the comment line
          updatedContent = updatedContent.replace(
            commentLine,
            `${commentLine}\n${importLine}`
          );
        } else {
          // Insert before the function App() line
          updatedContent = updatedContent.replace(
            /function App\(\)/,
            `// ${category} imports\n${importLine}\n\nfunction App()`
          );
        }
      });
    }
    
    // Add TOC items
    if (newTocItems.length > 0) {
      // Group by category
      const tocByCategory: Record<string, string[]> = {};
      
      newTocItems.forEach(tocItem => {
        const idMatch = tocItem.match(/id:\s*"([^"]+)"/);
        if (!idMatch) return;
        
        const id = idMatch[1];
        
        // Try to determine the category from the id
        let category = '';
        Object.entries(contentStructure).forEach(([cat, files]) => {
          files.forEach(file => {
            const fileId = file.replace(/^\d+[-_]/, '').toLowerCase().replace(/[^a-z0-9]/g, '-');
            if (fileId === id) {
              category = cat;
            }
          });
        });
        
        if (!category) return;
        
        if (!tocByCategory[category]) {
          tocByCategory[category] = [];
        }
        tocByCategory[category].push(tocItem);
      });
      
      // Add TOC items by category
      Object.entries(tocByCategory).forEach(([category, items]) => {
        // Find where to insert - after the last item of the category or at the end of the TOC
        const categoryCommentRegex = new RegExp(`// ${category} Section`);
        const nextCategoryRegex = /\/\/ (.*) Section/g;
        
        // Check if category comment exists
        if (categoryCommentRegex.test(updatedContent)) {
          // Find the next category after this one
          let lastIndex = -1;
          let match;
          
          while ((match = nextCategoryRegex.exec(updatedContent)) !== null) {
            if (match[1].includes(category)) {
              lastIndex = match.index;
            }
          }
          
          if (lastIndex !== -1) {
            // Find the end of this category's TOC items
            let endOfCategory = updatedContent.indexOf('// ', lastIndex + 1);
            if (endOfCategory === -1) {
              endOfCategory = updatedContent.indexOf('  ];', lastIndex);
            }
            
            // Insert before the next category or end of TOC
            if (endOfCategory !== -1) {
              const insertPoint = updatedContent.lastIndexOf('},', endOfCategory);
              if (insertPoint !== -1) {
                updatedContent = 
                  updatedContent.slice(0, insertPoint + 2) + 
                  '\n    ' + items.join('\n    ') + 
                  updatedContent.slice(insertPoint + 2);
              }
            }
          }
        } else {
          // Category doesn't exist yet, add it at the end of TOC
          const tocEndIndex = updatedContent.indexOf('  ];');
          if (tocEndIndex !== -1) {
            updatedContent = 
              updatedContent.slice(0, tocEndIndex) + 
              `    // ${category} Section\n    { id: "${category.toLowerCase()}", title: "${category}", level: 0 },\n    ` + 
              items.join('\n    ') + '\n' + 
              updatedContent.slice(tocEndIndex);
          }
        }
      });
    }
    
    // Add switch cases
    if (newCases.length > 0) {
      // Group by category
      const casesByCategory: Record<string, string[]> = {};
      
      newCases.forEach(caseItem => {
        const idMatch = caseItem.match(/case\s+"([^"]+)"/);
        if (!idMatch) return;
        
        const id = idMatch[1];
        
        // Try to determine the category from the id
        let category = '';
        Object.entries(contentStructure).forEach(([cat, files]) => {
          files.forEach(file => {
            const fileId = file.replace(/^\d+[-_]/, '').toLowerCase().replace(/[^a-z0-9]/g, '-');
            if (fileId === id) {
              category = cat;
            }
          });
        });
        
        if (!category) return;
        
        if (!casesByCategory[category]) {
          casesByCategory[category] = [];
        }
        casesByCategory[category].push(caseItem);
      });
      
      // Add cases by category
      Object.entries(casesByCategory).forEach(([category, cases]) => {
        const categoryCaseCommentRegex = new RegExp(`// ${category}`);
        const renderContentFnRegex = /const renderContent[\s\S]*?default:/s;
        
        // Check if render function exists
        const renderContentMatch = updatedContent.match(renderContentFnRegex);
        if (renderContentMatch) {
          // Check if category comment exists in switch statement
          const switchContent = renderContentMatch[0];
          
          if (categoryCaseCommentRegex.test(switchContent)) {
            // Category exists, add cases after the comment
            updatedContent = updatedContent.replace(
              categoryCaseCommentRegex,
              `// ${category}\n      ` + cases.join('\n      ')
            );
          } else {
            // Category doesn't exist, add before default case
            updatedContent = updatedContent.replace(
              /default:/,
              `// ${category}\n      ` + cases.join('\n      ') + '\n\n      default:'
            );
          }
        }
      });
    }
    
    // Write updated App.tsx
    fs.writeFileSync(APP_TSX_PATH, updatedContent);
    console.log('App.tsx has been automatically updated!');
    
  } catch (error) {
    console.error('Failed to automatically update App.tsx:', error);
    console.log('Please manually update App.tsx using the generated files.');
  }
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
    
    console.log('Updating App.tsx...');
    // Update App.tsx with new content
    updateAppTsx(mergedContent);
    
    console.log('Content update completed successfully!');
  } catch (error) {
    console.error('Error updating content:', error);
  }
}

// Run the main function
main();