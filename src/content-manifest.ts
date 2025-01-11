export const contentManifest = {
  '4H-HEALTH': [
    'apob-reference',
    'dental-care-strategy',
    'neutering-effects',
    'genetic-dashboard-complete',
    'vaccination-timeline'  // Added new content
  ],
  '4H-NUTRITION': [
    'life-smoothie-visual',
    '241230-legumes cooking guide',
    '241118-sports-nutrition-dashboard',
    'nutrition-processing-dashboard'
  ],
  '4H-ENVIRONMENT': [
    'microplastics-monitoring-dashboard'
  ],
  '6I-INTELLECTUAL': [
    'reading-dashboard'
  ],
  '9E-MEDIA': [
    'music-dashboard-r1',
    'hiking-playlist'
  ]
};

export const getContentPath = (file: string) => {
  for (const [category, files] of Object.entries(contentManifest)) {
    if (files.includes(file)) {
      return `${category}/${file}`;
    }
  }
  return file; // fallback to root content directory
};
