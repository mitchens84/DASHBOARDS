# DASHBOARDS USER GUIDE

## Adding and Updating Content

### Table of Contents
1. [Getting Started](#getting-started)
2. [Dashboard Structure](#dashboard-structure)
3. [Adding a New Dashboard](#adding-a-new-dashboard)
4. [Updating Existing Dashboards](#updating-existing-dashboards)
5. [Persistent Storage System](#persistent-storage-system)
6. [Working with Interactive Elements](#working-with-interactive-elements)
7. [Build and Update Scripts](#build-and-update-scripts)
8. [React Native Content](#react-native-content)
9. [Troubleshooting](#troubleshooting)

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

All dashboards automatically save user data and settings using the integrated storage system.

### How the Storage System Works

- The system automatically detects interactive elements like forms, checkboxes, and dropdowns
- Changes are automatically saved to the browser's local storage
- When a user revisits the dashboard, their previous state is restored
- No manual code is required to enable this functionality

### Including Storage in Your Dashboard

To enable automatic storage in any dashboard, simply add this line before your dashboard-specific scripts:

```html
<script src="index.js" type="module"></script>
```

This includes the auto-storage system that handles all persistence automatically.

### Manual Storage Control (Advanced)

For more advanced control, you can use the storage API directly:

```javascript
import dashboardStorage from './storage-manager.js';

// Save data
dashboardStorage.saveDashboard('your-dashboard-id', yourData);

// Load data
const savedData = dashboardStorage.loadDashboard('your-dashboard-id', defaultData);

// Clear data
dashboardStorage.clearDashboard('your-dashboard-id');
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
