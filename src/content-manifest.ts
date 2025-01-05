export const contentManifest = {
  '4H-HEALTH': [
    'apob-reference',
    'dental-care-strategy',
    'neutering-effects'
  ],
  '4H-NUTRITION': [
    'life-smoothie-visual',
    '241230-legumes cooking guide',
    '241118-sports-nutrition-dashboard'
  ],
  // Add other categories and their files
};

export const getContentPath = (file: string) => {
  for (const [category, files] of Object.entries(contentManifest)) {
    if (files.includes(file)) {
      return `${category}/${file}`;
    }
  }
  return file; // fallback to root content directory
};
