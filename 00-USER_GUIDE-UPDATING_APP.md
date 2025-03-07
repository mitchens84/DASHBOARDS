# Adding New Content to the Dashboards Project

This guide outlines the process for integrating new content into the dashboards project.

## Automated Content Integration

The project includes an automated script to simplify the content integration process.

### Using VS Code Tasks

1. Open the Command Palette (`Cmd+Shift+P` on Mac)
2. Type "Tasks: Run Task" and select it
3. Choose one of the following tasks:
   - **Update Content**: Scans for new content and updates manifests
   - **Update and Validate Content**: Updates content and runs a build to validate changes

### What the Automation Does

The `update-content.ts` script automatically:
- Scans all content directories for new dashboard files
- Updates `src/content-manifest.ts` with discovered content
- Generates guidance files in the `/generated` directory with:
  - Import statements for App.tsx
  - Table of contents entries
  - Switch case statements
- Validates content files for common errors that might break the build

After running the task:
1. Check the `generated/` directory for guidance files
2. Update `App.tsx` using these files
3. Address any validation warnings before deploying

## Manual Content Integration Steps

If you prefer to manually integrate content or need to handle special cases, follow these steps:

## 1. Identify Content Type and Category

1. Review the new content to determine which LBS category it belongs to (e.g., 4H-MEDICAL, 4H-NUTRITION, etc.)
2. Check existing categories in `content/` directory and `src/content-manifest.ts`
3. Create a new category directory if needed (e.g., `content/4H-MEDICAL/`)

## 2. Name the Dashboard File

1. Follow the established naming convention: `{YYMMDD}-{descriptive-name}-type.tsx`
2. Ensure the name is kebab-case (lowercase with hyphens)
3. Include any relevant date prefixes if temporal ordering is important (e.g., `240205-comprehensive-backpack-dashboard.tsx`)

## 3. Move/Create Content File

1. Place the file in the appropriate category directory:
   ```bash
   mv new-dashboard.tsx content/{CATEGORY}/
   ```
2. If creating new content, use the existing dashboards as templates for structure and styling

## 4. Update Content Manifest

1. Open `src/content-manifest.ts`
2. Find or add the appropriate category section
3. Add the new dashboard's filename (without extension) to the category's array:
   ```typescript
   export const contentManifest = {
     "4H-MEDICAL": ["distal-biceps-tendinopathy-dashboard"],
     // other categories...
   };
   ```

## 5. Update App.tsx

1. Add import statement in the appropriate section:
   ```typescript
   // {CATEGORY} imports
   import NewDashboard from "../content/{CATEGORY}/{filename}.tsx";
   ```

2. Add table of contents entry in the `tocItems` array:
   ```typescript
   // {Category} Section
   { id: "category-header", title: "{CATEGORY}", level: 0 },
   { id: "new-dashboard", title: "Dashboard Title", level: 1 },
   ```

3. Add the rendering logic in the `renderContent` switch statement:
   ```typescript
   // {Category}
   case "new-dashboard":
     return <NewDashboard />;
   ```

## 6. Verify Integration

1. Check for TypeScript errors
2. Test navigation to the new dashboard
3. Verify all tabs and interactive elements work
4. Test responsiveness on different screen sizes

## Common Issues and Solutions

### TypeScript Errors

- **Import Path Issues**: Ensure the import path in App.tsx matches the actual file location
- **Component Props**: Make sure any UI components (Tabs, Cards, etc.) have the correct prop types
- **Missing Type Definitions**: Import required types from component libraries

### Navigation Issues

- Verify the `id` in `tocItems` matches the case statement in `renderContent`
- Check that the dashboard is exported as default from its file
- Ensure the content manifest entry matches the filename exactly

### Component Errors

- Review UI component documentation for proper usage
- Check for required vs optional props
- Verify state management implementation

## Example Integration

```typescript
// 1. File naming and placement
// content/4H-MEDICAL/distal-biceps-tendinopathy-dashboard.tsx

// 2. Content manifest update
export const contentManifest = {
  "4H-MEDICAL": ["distal-biceps-tendinopathy-dashboard"],
};

// 3. App.tsx updates
// Import
import DistalBicepsDashboard from "../content/4H-MEDICAL/distal-biceps-tendinopathy-dashboard.tsx";

// TOC entry
{ id: "medical", title: "4H-MEDICAL", level: 0 },
{ id: "distal-biceps", title: "Distal Biceps Management", level: 1 },

// Render logic
case "distal-biceps":
  return <DistalBicepsDashboard />;
```

## Package Dependencies and Troubleshooting

### Package Dependencies

- **Missing Package Errors**: If you encounter errors like `Cannot find module 'x'` or `x is not defined`:
  ```bash
  # Install the missing package
  npm install package-name
  # or with yarn
  yarn add package-name
  ```

- **Version Conflicts**: If components aren't rendering properly, check versions match:
  ```bash
  # Check what versions are installed
  npm list package-name
  # Install specific version if needed
  npm install package-name@version
  ```

- **Common Dashboard Dependencies**: Most dashboards require these packages:
  - `@mui/material` and `@mui/icons-material` - UI components
  - `react-chartjs-2` - For charts and visualizations
  - `@heroicons/react` - For icons

### Advanced Debugging

- **Browser Console**: Use browser dev tools (F12) to check for runtime errors

- **Component Debugging**:
  ```typescript
  // Add temporary debug logging
  console.log("Dashboard rendering with props:", props);
  console.log("State value:", someStateVariable);
  
  // Test individual components in isolation
  return <ProblemComponent {...mockProps} />;
  ```

- **TypeScript Build Issues**:
  ```bash
  # Get more verbose type errors
  npm run build -- --verbose
  
  # Check specific file types
  npx tsc --noEmit --jsx preserve src/path/to/file.tsx
  ```

- **React DevTools**: Install the browser extension to inspect component hierarchy and props

- **Layout Issues**: Add temporary borders to identify component boundaries:
  ```tsx
  <div style={{ border: '1px solid red' }}>
    {/* Component content */}
  </div>
  ```

- **Using Content Validation**: The automated script includes validation to catch common issues:
  ```bash
  # Run validation directly
  npx tsx scripts/update-content.ts
  ```
