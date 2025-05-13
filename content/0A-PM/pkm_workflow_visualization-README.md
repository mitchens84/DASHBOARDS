# PKM Workflow Visualization

This visualization displays a Personal Knowledge Management (PKM) workflow based on data from Airtable.

## Overview

The visualization presents a force-directed graph of the PKM workflow, with nodes representing different elements in the workflow and connections showing the flow of information between them.

## Features

- **Color-coded by stage**: Different colors represent different workflow stages (SOURCE, CAPTURE, ORGANISE, DISTIL, EXPRESS)
- **Visual grouping**: Border colors indicate the type of element (Tool, Content, Method, Platform, Storage, Output)
- **Paid services indicator**: Dashed borders indicate paid services
- **Interactive filtering**: Filter by workflow type or visual group
- **Zoom and pan**: Navigate the visualization with intuitive controls
- **Detailed tooltips**: Hover over nodes to see detailed information
- **Drag functionality**: Reposition nodes to better visualize specific parts of the workflow

## How to Use

1. Open `pkm_workflow_visualization.html` in a web browser
2. Use the controls in the top-left to filter and navigate the visualization:
   - **Zoom In/Out**: Adjust the zoom level
   - **Reset**: Return to the default view
   - **Filter by Workflow**: Show only elements associated with a specific workflow
   - **Filter by Visual Group**: Show only elements of a specific type
   - **Highlight Paid Services**: Toggle the highlighting of paid services

3. Hover over nodes to see detailed information about each element
4. Drag nodes to reposition them for better viewing

## Data Structure

The visualization uses data from the `pkm_workflow_visualization-DATA.json` file. This file is expected to contain the graph data (nodes and links) in a JSON format.

## Workflow Stages

- **SOURCE**: Original content sources (Blue)
- **CAPTURE**: Tools and methods for collecting information (Teal)
- **ORGANISE**: Systems for organizing collected information (Green)
- **DISTIL**: Processes for refining and connecting information (Yellow)
- **EXPRESS**: Output formats and publishing methods (Orange)

## Visual Groups

- **Tool**: Software and services used in the workflow
- **Content**: Information sources and formats
- **Method**: Approaches and techniques
- **Platform**: Integrated systems for multiple functions
- **Storage**: Data storage solutions
- **Output**: Final products and publications

## Updating the Data

To update the visualization with new data:

1.  Ensure your workflow data is available in a JSON file named `pkm_workflow_visualization-DATA.json`.
2.  This file should be located in the same directory as `pkm_workflow_visualization.html` (i.e., `public/content/0A-PM/`).
3.  The data format should be an object containing `nodes` and `links` arrays, or directly an array of nodes if links are derived/implicit, as processed by the visualization's JavaScript.
4.  If you are using a script (like the original `workflow_extractor.py` or a similar method) to generate this data from Airtable or another source, ensure its output is saved as `pkm_workflow_visualization-DATA.json` in the correct location.
5.  After updating the JSON file, the visualization (when viewed in the dashboard or by opening `pkm_workflow_visualization.html` directly if testing standalone) should reflect the new data upon refresh.

## Requirements

- Modern web browser with JavaScript enabled
- D3.js library (loaded from CDN in the HTML file)
