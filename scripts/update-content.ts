/**
 * DASHBOARDS Content Update Script
 * =================================
 * 
 * This script automates the process of updating content in the DASHBOARDS application.
 * It scans the content directories, updates the content manifest, and provides guidance
 * for updating App.tsx with new components. It also validates content files for common
 * issues that could potentially break the build and deployment.
 * 
 * Command to run:
 * ```
 * npx tsx scripts/update-content.ts
 * ```
 * 
 * What this script does:
 * 1. Scans all content directories for .tsx files
 * 2. Updates src/content-manifest.ts with all discovered content files
 * 3. Generates guidance files in the /generated directory for updating App.tsx
 * 4. Validates content files for common issues (missing files, invalid imports, etc.)
 * 5. Provides warnings about potential deployment issues
 * 
 * After running this script:
 * - Check the generated/ directory for import-statements.txt, toc-entries.txt, and switch-cases.txt
 * - Manually update App.tsx using these files as a guide
 * - Address any validation warnings before deploying
 * 
 * @author DASHBOARDS Team
 */

import * as fs from 'fs';
import * as path from 'path';
import * as childProcess from 'child_process';

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

// Validate content files to catch potential errors before they break deployments
async function validateContentFiles(contentStructure: Record<string, string[]>) {
  console.log('Validating content files for potential errors...');
  const errors: Array<{file: string, error: string}> = [];

  // For each file, check for common issues
  for (const [category, files] of Object.entries(contentStructure)) {
    for (const file of files) {
      const filePath = path.join(CONTENT_DIR, category, `${file}.tsx`);
      
      try {
        // 1. Basic file existence check
        if (!fs.existsSync(filePath)) {
          errors.push({ 
            file: `${category}/${file}.tsx`, 
            error: 'File does not exist though it is listed in content structure' 
          });
          continue;
        }

        // 2. Read file content
        const content = fs.readFileSync(filePath, 'utf8');

        // 3. Check for invalid imports from popular libraries
        const lucideRegex = /import\s+{([^}]+)}\s+from\s+['"]lucide-react['"]/g;
        const lucideMatch = lucideRegex.exec(content);
        
        if (lucideMatch) {
          const importedIcons = lucideMatch[1].split(',').map(i => i.trim());
          
          // These are commonly misused icons (can be expanded)
          const potentialInvalidIcons = ['Boat', 'Car', 'Building', 'Person'];
          
          for (const icon of potentialInvalidIcons) {
            if (importedIcons.includes(icon)) {
              errors.push({
                file: `${category}/${file}.tsx`,
                error: `Potentially invalid icon import: ${icon}. Verify it exists in the installed 'lucide-react' package.`
              });
            }
          }
        }

        // 4. Check for spaces in component/variable names
        if (/const\s+(\w+\s+\w+)\s+=/.test(content)) {
          errors.push({
            file: `${category}/${file}.tsx`,
            error: 'Contains component/variable names with spaces which can cause build errors'
          });
        }
        
        // 5. Check for missing default export
        if (!content.includes('export default')) {
          errors.push({
            file: `${category}/${file}.tsx`,
            error: 'Missing default export which is required for dynamic imports'
          });
        }
      } catch (error) {
        errors.push({ 
          file: `${category}/${file}.tsx`, 
          error: `Error while validating: ${error}` 
        });
      }
    }
  }

  // Report findings
  if (errors.length > 0) {
    console.log('\n⚠️ Potential issues found that could break deployment:');
    errors.forEach(({file, error}) => {
      console.log(`  - ${file}: ${error}`);
    });
    console.log('\nPlease fix these issues before deploying.');
  } else {
    console.log('✅ All content files passed basic validation.');
  }

  return errors;
}

// Perform a dry-run build test to catch potential build errors
async function testBuild(): Promise<boolean> {
  console.log('Running a test build to check for potential deployment issues...');
  
  try {
    // Create a temporary script that imports all components but doesn't actually build
    const validateScript = `
    import * as React from 'react';
    // Import all content components to validate them
    ${Object.entries(scanContentDirectories()).flatMap(([category, files]) => 
      files.map(file => 
        `import './../content/${category}/${file}.tsx';`
      )
    ).join('\n')}
    
    console.log('All imports validated successfully.');
    `;
    
    const validatePath = path.resolve(__dirname, '../scripts/validate-imports.tsx');
    fs.writeFileSync(validatePath, validateScript);
    
    // Run the validation script
    const result = childProcess.execSync('npx tsx ./scripts/validate-imports.tsx', {
      encoding: 'utf-8',
      stdio: 'pipe'
    });
    
    console.log('✅ Test build completed successfully.');
    
    // Cleanup
    fs.unlinkSync(validatePath);
    return true;
  } catch (error) {
    console.error('❌ Test build failed. This may indicate issues that would break deployment:');
    console.error(error.toString());
    return false;
  }
}

// Main function
async function main() {
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
    
    console.log('\n=== Validation Phase ===');
    // Validate content files for potential issues
    await validateContentFiles(mergedContent);
    
    // Optional: Uncomment to run test build during update
    // This can catch build errors early but might slow down the update process
    // await testBuild();
    
    console.log('\nContent update completed successfully!');
    console.log('You can run "npm run build" to verify everything builds correctly.');
  } catch (error) {
    console.error('Error updating content:', error);
  }
}

// Run the main function
main();