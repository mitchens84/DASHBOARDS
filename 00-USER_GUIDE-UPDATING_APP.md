# Adding New Content to the Dashboards Project

This guide outlines the step-by-step process for integrating new content into the dashboards project.

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
