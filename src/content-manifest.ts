// Dynamically load and register content TSX files using Vite's import.meta.glob
// src/content-manifest.ts

// Use Vite's import.meta.glob to import all TSX files from the content folder
const modules = import.meta.glob('../content/**/*.tsx', { eager: true });

export interface ContentRoute {
  path: string;
  component: any;
}

export const contentManifest: ContentRoute[] = Object.entries(modules).map(([filePath, module]) => {
  // Derive route by removing the '../content' prefix and '.tsx' suffix
  let route = filePath.replace(/^\.\.\/content/, '');
  route = route.replace(/\.tsx$/, '').toLowerCase();
  // Map '/index' to root route
  if (route === '/index') route = '/';
  return { path: route, component: (module as any).default };
});

export const getContentPath = (file: string) => {
  for (const [category, files] of Object.entries(contentManifest)) {
    if (files.includes(file)) {
      return `${category}/${file}`;
    }
  }
  return file; // fallback to root content directory
};
