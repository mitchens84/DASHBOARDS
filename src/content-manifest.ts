export const contentManifest = {
  "4H-MEDICAL": [
    "distal-biceps-tendinopathy-dashboard",
    "dengue-risk-visualization",
  ],
  "3P-POSSESSIONS": [
    "240205-comprehensive-backpack-dashboard",
  ],
  "4H-HEALTH": [
    "apob-reference",
    "dental-care-strategy",
    "neutering-effects",
    "genetic-dashboard-complete",
    "emf-safety-dashboard",
    "retinol-protocol-guide",
    "vaccination-timeline-analysis",
    "vollagen-dashboard",
  ],
  "4H-NUTRITION": [
    "life-smoothie-visual",
    "241230-legumes cooking guide",
    "241118-sports-nutrition-dashboard",
    "nutrition-processing-dashboard",
    "enhanced-sodium-calculator copy",
    "enhanced-sodium-calculator",
    "functional-foods-network",
    "therapeutic-spice-blend",
    "tvp-dashboard",
  ],
  "4H-ENVIRONMENT": [
    "microplastics-monitoring-dashboard",
    "env-dashboard",
    "environmental-dashboard",
    "plants-co2-analysis",
  ],
  "6I-INTELLECTUAL": [
    "reading-dashboard",
  ],
  "9E-MEDIA": [
    "music-dashboard-r1",
    "hiking-playlist",
    "korijeni_na_korculi",
    "music-dashboard",
    "sound-therapy-guide",
  ],
  "5R-BEAN": [
    "bean-complete-nutrition-dashboard",
    "bean-treatment-timeline-revised",
    "antibiotic-dashboard",
    "bean-risk-assessment-v2",
    "bean-risk-assessment-v2_revised",
    "bean-sodium-intake-dashboard",
    "beans-infection-diet-plan",
  ],
  "4H-BIOHACKING-SKIN": [
    "holistic-protection-dashboard",
    "sunscreen-protection-calculator",
    "4H-BIOHACKING-SKIN-SUNSCREEN-BOJ",
  ],
  "0A-PREP": [
    "bike-maintenance-dashboard",
  ],
};

export const getContentPath = (file: string) => {
  for (const [category, files] of Object.entries(contentManifest)) {
    if (files.includes(file)) {
      return `${category}/${file}`;
    }
  }
  return file; // fallback to root content directory
};
