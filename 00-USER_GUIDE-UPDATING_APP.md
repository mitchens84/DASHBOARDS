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

  <!-- Include auto-storage system for persistence -->
  <script src="index.js" type="module"></script>
  
  <!-- Dashboard specific code -->
  <script src="your-dashboard-name.js" type="module"></script>
</body>
</html>
```

2. Create a JavaScript file with the same name as your HTML file:

```javascript
// your-dashboard-name.js
// Your dashboard-specific code

// Storage is automatically handled by including index.js
// You don't need to manually implement storage functionality
```

3. Update the main index or navigation to include a link to your new dashboard.

## Updating Existing Dashboards

When updating existing dashboards:

1. Make your content changes to the HTML file
2. Add any new interactive elements (forms, checkboxes, etc.)
3. Update JavaScript functionality as needed

The persistent storage will automatically work with your new content without additional code.

## Persistent Storage System

Selected dashboards now include persistent storage for user preferences and inputs.

### Dashboards with Storage

The following dashboards have persistent storage enabled:
- Sulforaphane Information
- Thailand-Malaysia Journey

### Adding Storage to New Dashboards

To add persistent storage to a new dashboard:

1. Ensure your HTML file references the storage script:

```html
<script src="../simple-storage.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Choose a unique ID for your dashboard
    const dashboardId = 'your-dashboard-id';
    
    // Enable checkbox persistence
    SimpleStorage.loadCheckboxes(dashboardId);
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        SimpleStorage.saveCheckboxes(dashboardId);
      });
    });
    
    // Enable form element persistence if needed
    // Additional code for saving form fields...
  });
</script>
```

2. Make sure all interactive elements have unique IDs:

```html
<input type="checkbox" id="unique-checkbox-id">
<input type="text" id="unique-input-id">
```

### Using Storage API Directly

You can also use the storage API directly in your code:

```javascript
// Save data
SimpleStorage.save('your-key', yourData);

// Load data
const savedData = SimpleStorage.load('your-key', defaultValue);

// Delete data
SimpleStorage.delete('your-key');
```

## Working with Interactive Elements

For best compatibility with the automatic storage system:

1. Always provide `id` or `name` attributes for form elements:

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

1. Verify your dashboard includes `index.js`:
```html
<script src="index.js" type="module"></script>
```

2. Check browser console for any errors

3. Ensure interactive elements have proper identifiers (id, name, or data-id attributes)

4. For privacy modes or incognito browsing, be aware that localStorage may be disabled

### Clearing Stored Data

To reset a dashboard to its default state, you can run this in the browser console:

```javascript
localStorage.removeItem('dashboards');
```

Or to selectively clear a specific dashboard:

```javascript
import dashboardStorage from './storage-manager.js';
dashboardStorage.clearDashboard('dashboard-id');
```

For any additional assistance, contact the technical team.
