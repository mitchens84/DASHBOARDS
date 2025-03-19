# DASHBOARDS USER GUIDE

## Adding and Updating Content

### Table of Contents
1. [Getting Started](#getting-started)
2. [Dashboard Structure](#dashboard-structure)
3. [Adding a New Dashboard](#adding-a-new-dashboard)
4. [Persistent Storage System](#persistent-storage-system)
5. [Working with Interactive Elements](#working-with-interactive-elements)
6. [Troubleshooting](#troubleshooting)

## Getting Started

This application provides interactive dashboards for various purposes. All dashboards support persistent storage, meaning user data and preferences are saved automatically between sessions.

## Dashboard Structure

Each dashboard consists of:
- HTML file defining the layout and content
- JavaScript file for interactive functionality
- Shared resources (images, styles, etc.)

All dashboards automatically save their state to the browser's local storage.

## Adding a New Dashboard

To add a new dashboard:

1. Create a new HTML file in the DASHBOARDS directory:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Dashboard Title</title>
  <link rel="stylesheet" href="common/styles.css">
</head>
<body>
  <!-- Your dashboard content -->

  <!-- Include storage system for persistence -->
  <script type="module">
    // Import auto-storage system
    import autoStorage from '../../auto-storage.js';
  </script>
  
  <!-- Dashboard specific code -->
  <script src="your-dashboard-name.js" type="module"></script>
</body>
</html>
```

2. Create a JavaScript file with the same name as your HTML file:

```javascript
// your-dashboard-name.js
// Your dashboard-specific code

// Storage is automatically handled by the auto-storage.js system
// You don't need to manually implement storage functionality
```

3. Update the main index or navigation to include a link to your new dashboard.

Alternatively, you can run the setup script to automatically add storage to all your dashboard HTML files:

```bash
node setup-storage.js
```

## Updating Existing Dashboards

When updating existing dashboards:

1. Make your content changes to the HTML file
2. Add any new interactive elements (forms, checkboxes, etc.)
3. Update JavaScript functionality as needed

The persistent storage will automatically work with your new content without additional code.

## Persistent Storage System

All dashboard files now include persistent storage for user preferences and inputs through our enhanced auto-storage system.

### Dashboards with Storage

The following dashboards have persistent storage enabled:
- All HTML dashboards in content subdirectories

### Storage Implementation

The system uses three components working together:
1. **auto-storage.js** - Primary system that automatically detects and manages form elements
2. **storage-manager.js** - Core storage engine for saving/loading data
3. **simple-storage.js** - Legacy compatibility layer (for backward compatibility)

### Enhanced Features

The latest storage system offers:
1. **Automatic element identification** - Works with elements that have:
   - id attribute
   - name attribute
   - data-id attribute
   - Or elements without any identifier using path-based identification
2. **Storage for all interactive elements:**
   - Checkboxes
   - Text inputs
   - Select dropdowns
   - Radio buttons
   - Collapsible sections
3. **Mutation Observer** - Automatically detects and binds to new elements added dynamically

### Adding Storage to New Dashboards

The easiest way to add storage to new dashboards is to run the setup script:

```bash
node setup-storage.js
```

Or manually import the auto-storage system in your HTML:

```html
<script type="module">
  // Import auto-storage system
  import autoStorage from '../../auto-storage.js';
</script>
```

### Using Storage API Directly

You can also use the storage API directly in your JavaScript:

```javascript
// Using auto-storage (recommended)
import autoStorage from '../../auto-storage.js';

// Using dashboard storage directly
import dashboardStorage from '../../storage-manager.js';
dashboardStorage.saveDashboard('dashboard-id', yourData);
const savedData = dashboardStorage.loadDashboard('dashboard-id', defaultValue);

// Legacy SimpleStorage API (still supported)
SimpleStorage.save('your-key', yourData);
const savedData = SimpleStorage.load('your-key', defaultValue);
SimpleStorage.delete('your-key');
```

## Working with Interactive Elements

For best compatibility with the automatic storage system:

1. Always provide `id`, `name`, or `data-id` attributes for form elements:

```html
<input type="checkbox" id="task1" name="task1">
<select id="country-select" name="country">
  <option value="us">United States</option>
  <option value="ca">Canada</option>
</select>
```

2. For collapsible sections, use standard classes:

```html
<div class="collapsible" id="section1">
  <h2>Collapsible Section</h2>
  <div class="content">
    <!-- Section content -->
  </div>
</div>
```

3. For custom interactive elements, add the `data-id` attribute:

```html
<div class="custom-component" data-id="unique-identifier">
  <!-- Component content -->
</div>
```

4. Elements without identifiers will still work, but explicit IDs are recommended for reliability.

## Testing Storage Implementation

To verify storage is working properly:

1. Open the test page: `test.html`
2. Toggle checkboxes and interact with form elements
3. Reload the page - all selections should persist
4. Click "Run Storage Tests" to run automated tests
5. Click "Inspect Current Storage" to see stored data

## Build and Update Scripts

The application includes several scripts to automate common tasks:

### Building the Application

To build the application for production:

```bash
# From the project root
./scripts/build.sh
```

This will:
- Compile all JavaScript files
- Optimize assets
- Create a production-ready build in the `dist/` folder

### Updating Content

When updating content, use the update script:

```bash
# From the project root
./scripts/update-content.sh
```

This script will:
- Check for content structure issues
- Update navigation links automatically
- Rebuild indexes for search functionality
- Update the manifest

When adding new dashboards, run the storage setup script after updating content:

```bash
node setup-storage.js
```

### Deploying Changes

After making changes and testing locally:

```bash
# From the project root
./scripts/deploy.sh
```

This will deploy your changes to the production environment.

## React Native Content

The dashboards can also be used in React Native mobile applications.

### Adding React Native Components

1. Place React Native components in the `/Users/mitchens/Local/6I-CYBORG-AGENTS/DASHBOARDS/react-native/` directory

2. Create a component file:

```javascript
// Example component: MyDashboardComponent.js
import React from 'react';
import { View, Text } from 'react-native';

export default function MyDashboardComponent() {
  return (
    <View>
      <Text>My Dashboard Component</Text>
    </View>
  );
}
```

3. Update the React Native export index:

```javascript
// In react-native/index.js
export { default as MyDashboardComponent } from './MyDashboardComponent';
```

### Converting Web Dashboards to React Native

To adapt an existing web dashboard for React Native use:

1. Create a React Native version in the `/react-native/` directory
2. Use the provided adapter utilities:

```javascript
// Example
import { webStorageAdapter } from '../utils/storage-adapters';

// This adapts the web storage system to React Native's AsyncStorage
const dashboardStorage = webStorageAdapter('dashboard-name');
```

### Building for Mobile

To build dashboards for mobile use:

```bash
# Build for iOS
./scripts/build-ios.sh

# Build for Android
./scripts/build-android.sh
```

## Troubleshooting

### Storage Issues

If dashboard states aren't being saved:

1. Verify your dashboard includes the auto-storage system:
```html
<script type="module">
  import autoStorage from '../../auto-storage.js';
</script>
```

2. Check browser console for any errors

3. Ensure interactive elements have proper identifiers (id, name, or data-id attributes)

4. For privacy modes or incognito browsing, be aware that localStorage may be disabled

5. Run the test.html file to diagnose storage functionality

### Clearing Stored Data

To reset all dashboards to their default state, you can run this in the browser console:

```javascript
localStorage.clear();
```

Or to selectively clear a specific dashboard:

```javascript
import dashboardStorage from './storage-manager.js';
dashboardStorage.clearDashboard('dashboard-id');
```

### Storage System Debugging

To enable verbose debugging, add this to your browser console:

```javascript
localStorage.setItem('debug-storage', 'true');
```

For any additional assistance, contact the technical team.
