# TSX File Runner

Simple system to run React TSX files with minimal setup.

## Adding New TSX Files
1. Place your .tsx file in the `tsx-files/` directory
2. If your component needs additional packages, install them:
```bash
npm install package-name
```

## Running TSX Files
1. Go to the root directory of this project:
   "cd OUTPUT_04-CLAUDE_TSX"
2. Start the server:
```bash
npm run dev
```

1. View your component in browser:
- Default (plants): http://localhost:5173
- Any other file: http://localhost:5173?file=your-file-name

Examples:
- Plants analysis: http://localhost:5173?file=plants-co2-analysis
- Environment dashboard: http://localhost:5173?file=env-dashboard

## Currently Available Files:
- plants-co2-analysis.tsx
- env-dashboard.tsx

## Notes
- Files must export a default React component
- Tailwind CSS styling is available
- Place all TSX files in the tsx-files/ directory
- Don't include the .tsx extension in the URL

## File Organization
Content files are organized in the following categories:
- 4H-HEALTH: Health-related dashboards and visualizations
- 4H-NUTRITION: Nutrition and diet related content
- 4H-ENVIRONMENT: Environmental monitoring and analysis
- 6I-INTELLECTUAL: Intellectual and learning content
- 9E-MEDIA: Media and entertainment dashboards

When linking to files, use just the filename without the category path:
http://localhost:5173?file=env-dashboard

# DASHBOARDS
