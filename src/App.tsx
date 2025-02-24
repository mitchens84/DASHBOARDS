import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import TableOfContents from "./components/TableOfContents";

// 0A-PREPAREDNESS imports

// 3P-POSSESSIONS imports
import BackpackDashboard from "../content/3P-POSSESSIONS/240205-comprehensive-backpack-dashboard.tsx";

// 4H-BIOHACKING-SKIN imports
import HolisticProtection from "../content/4H-BIOHACKING-SKIN/holistic-protection-dashboard.tsx";
import SunscreenCalculator from "../content/4H-BIOHACKING-SKIN/sunscreen-protection-calculator.tsx";
import SunscreenBOJ from "../content/4H-BIOHACKING-SKIN/4H-BIOHACKING-SKIN-SUNSCREEN-BOJ.tsx";

// 4H-ENVIRONMENT imports
import EnvDashboard from "../content/4H-ENVIRONMENT/env-dashboard.tsx";
import EnvironmentalDashboard from "../content/4H-ENVIRONMENT/environmental-dashboard.tsx";
import PlantsCO2Analysis from "../content/4H-ENVIRONMENT/plants-co2-analysis.tsx";
import MicroplasticsMonitoring from "../content/4H-ENVIRONMENT/microplastics-monitoring-dashboard.tsx";

// 4H-MEDICAL imports
import DistalBicepsDashboard from "../content/4H-MEDICAL/distal-biceps-tendinopathy-dashboard.tsx";
import DengueRiskDashboard from "../content/4H-MEDICAL/dengue-risk-visualization.tsx";

// 4H-HEALTH imports
import RetinolProtocolGuide from "../content/4H-HEALTH/retinol-protocol-guide.tsx";
import VollagenDashboard from "../content/4H-HEALTH/vollagen-dashboard.tsx";
import ApoBReference from "../content/4H-HEALTH/apob-reference.tsx";
import DentalCareStrategy from "../content/4H-HEALTH/dental-care-strategy.tsx";
import EmfSafetyDashboard from "../content/4H-HEALTH/emf-safety-dashboard.tsx";
import GeneticDashboard from "../content/4H-HEALTH/genetic-dashboard-complete.tsx";
import NeuteringEffects from "../content/4H-HEALTH/neutering-effects.tsx";
import VaccinationTimeline from "../content/4H-HEALTH/vaccination-timeline-analysis.tsx";

// 4H-NUTRITION imports
import SportsNutrition from "../content/4H-NUTRITION/241118-sports-nutrition-dashboard.tsx";
import LegumeGuide from "../content/4H-NUTRITION/241230-legumes cooking guide.tsx";
import EnhancedSodiumCalculator from "../content/4H-NUTRITION/enhanced-sodium-calculator.tsx";
import FunctionalFoodsNetwork from "../content/4H-NUTRITION/functional-foods-network.tsx";
import LifeSmoothie from "../content/4H-NUTRITION/life-smoothie-visual.tsx";
import NutritionProcessing from "../content/4H-NUTRITION/nutrition-processing-dashboard.tsx";
import TherapeuticSpiceBlend from "../content/4H-NUTRITION/therapeutic-spice-blend.tsx";

// 5R-BEAN imports
import BeanRiskAssessment from "../content/5R-BEAN/bean-risk-assessment-v2_revised.tsx";
import AntibioticDashboard from "../content/5R-BEAN/antibiotic-dashboard.tsx";
import BeanSodiumIntakeDashboard from "../content/5R-BEAN/bean-sodium-intake-dashboard.tsx";
import BeanTreatmentTimeline from "../content/5R-BEAN/bean-treatment-timeline-revised.tsx";

// 6I-INTELLECTUAL imports
import ReadingDashboard from "../content/6I-INTELLECTUAL/reading-dashboard.tsx";

// 9E-MEDIA imports
import HikingPlaylist from "../content/9E-MEDIA/hiking-playlist.tsx";
import MusicDashboardR1 from "../content/9E-MEDIA/music-dashboard-r1.tsx";
import MusicDashboard from "../content/9E-MEDIA/music-dashboard.tsx";
import SoundTherapy from "../content/9E-MEDIA/sound-therapy-guide.tsx";

function App() {
  const location = useLocation();
  const tocItems = [
    { id: "dashboard-overview", title: "DASHBOARDS", level: 0 },
    // 0A-PREPAREDNESS Section
    { id: "risk-assessment", title: "0A-PREPAREDNESS", level: 0 },
    // 3P-POSSESSIONS Section
    { id: "possessions", title: "3P-POSSESSIONS", level: 0 },
    { id: "backpack-dashboard", title: "Backpack Analysis", level: 1 },
    // 4H-BIOHACKING-SKIN Section
    { id: "skin-biohacking", title: "4H-BIOHACKING-SKIN", level: 0 },
    { id: "holistic-protection", title: "Holistic Protection", level: 1 },
    { id: "sunscreen-calculator", title: "Sunscreen Calculator", level: 1 },
    { id: "sunscreen-boj", title: "BOJ Sunscreen Analysis", level: 1 },
    // Environment Section
    { id: "environment", title: "4H-ENVIRONMENT", level: 0 },
    { id: "env-dashboard", title: "Environment Dashboard", level: 1 },
    {
      id: "environmental-dashboard",
      title: "Environmental Analysis",
      level: 1,
    },
    { id: "plants-co2", title: "Plants CO2 Analysis", level: 1 },
    {
      id: "microplastics-monitoring",
      title: "Microplastics Monitoring",
      level: 1,
    },
    // Health Section
    { id: "medical", title: "4H-MEDICAL", level: 0 },
    { id: "distal-biceps", title: "Distal Biceps Management", level: 1 },
    { id: "dengue-risk", title: "Dengue Risk Assessment", level: 1 },
    { id: "health-reference", title: "4H-HEALTH", level: 0 },
    { id: "apob-reference", title: "ApoB Reference", level: 1 },
    { id: "dental-care", title: "Dental Care Strategy", level: 1 },
    { id: "emf-safety", title: "EMF Safety", level: 1 },
    { id: "genetic-dashboard", title: "Genetic Dashboard", level: 1 },
    { id: "neutering-effects", title: "Neutering Effects", level: 1 },
    { id: "retinol", title: "Retinol Protocol Guide", level: 1 },
    { id: "vaccination-timeline", title: "Vaccination Timeline", level: 1 },
    { id: "vollagen", title: "Vollagen Dashboard", level: 1 },
    // Nutrition Section
    { id: "nutrition", title: "4H-NUTRITION", level: 0 },
    { id: "enhanced-sodium", title: "Sodium Balance Calculator", level: 1 },
    { id: "functional-foods", title: "Functional Foods", level: 1 },
    { id: "legume-guide", title: "Legume Guide", level: 1 },
    { id: "life-smoothie", title: "Life Smoothie", level: 1 },
    { id: "nutrition-processing", title: "Nutrition Processing", level: 1 },
    { id: "sports-nutrition", title: "Sports Nutrition", level: 1 },
    { id: "therapeutic-spice", title: "Therapeutic Spice Blend", level: 1 },
    // Bean Section
    { id: "bean", title: "5R-BEAN", level: 0 },
    { id: "antibiotic-dashboard", title: "Antibiotic Dashboard", level: 1 },
    { id: "bean-assessment", title: "Bean Risk Assessment", level: 1 },
    { id: "bean-sodium-intake", title: "Bean Sodium Intake", level: 1 },
    { id: "bean-treatment", title: "UTI Treatment Protocol", level: 1 },
    // Intellectual Section
    { id: "intellectual", title: "6I-INTELLECTUAL", level: 0 },
    { id: "reading-dashboard", title: "Reading Dashboard", level: 1 },
    // Media Section
    { id: "media", title: "9E-EXPERIENCE", level: 0 },
    { id: "hiking-playlist", title: "Hiking Playlist", level: 1 },
    { id: "music-dashboard", title: "Music Dashboard", level: 1 },
    { id: "music-dashboard-r1", title: "Music Dashboard R1", level: 1 },
    { id: "sound-therapy", title: "Sound Therapy Guide", level: 1 },
  ];

  const renderContent = (id: string) => {
    switch (id) {
      // Root level dashboards
      case "dengue-risk":
        return <DengueRiskDashboard />;
      case "dashboard-overview":
        return (
          <section id={id} className="p-6 bg-white rounded-lg shadow">
            <h1 className="text-3xl font-bold mb-4">DASHBOARDS OVERVIEW</h1>
            <p>
              Welcome to the collection of interactive visual content across LBS
              categories
            </p>
          </section>
        );

      // Environment
      case "env-dashboard":
        return <EnvDashboard />;
      case "environmental-dashboard":
        return <EnvironmentalDashboard />;
      case "plants-co2":
        return <PlantsCO2Analysis />;
      case "microplastics-monitoring":
        return <MicroplasticsMonitoring />;

      // Medical
      case "distal-biceps":
        return <DistalBicepsDashboard />;
      case "dengue-risk":
        return <DengueRiskDashboard />;

      // Health
      case "retinol":
        return <RetinolProtocolGuide />;
      case "vollagen":
        return <VollagenDashboard />;
      case "apob-reference":
        return <ApoBReference />;
      case "dental-care":
        return <DentalCareStrategy />;
      case "genetic-dashboard":
        return <GeneticDashboard />;
      case "neutering-effects":
        return <NeuteringEffects />;
      case "vaccination-timeline":
        return <VaccinationTimeline />;
      case "emf-safety-dashboard":
        return <EmfSafetyDashboard />;
      case "emf-safety":
        return <EmfSafetyDashboard />;

      // Nutrition
      case "sports-nutrition":
        return <SportsNutrition />;
      case "legume-guide":
        return <LegumeGuide />;
      case "life-smoothie":
        return <LifeSmoothie />;
      case "nutrition-processing":
        return <NutritionProcessing />;
      case "enhanced-sodium-calculator":
        return <EnhancedSodiumCalculator />;
      case "functional-foods-network":
        return <FunctionalFoodsNetwork />;
      case "enhanced-sodium":
        return <EnhancedSodiumCalculator />;
      case "functional-foods":
        return <FunctionalFoodsNetwork />;
      case "therapeutic-spice":
        return <TherapeuticSpiceBlend />;

      // Bean
      case "bean-assessment":
        return <BeanRiskAssessment />;
      case "antibiotic-dashboard":
        return <AntibioticDashboard />;
      case "bean-sodium-intake-dashboard":
        return <BeanSodiumIntakeDashboard />;
      case "bean-sodium-intake":
        return <BeanSodiumIntakeDashboard />;
      case "bean-treatment":
        return <BeanTreatmentTimeline />;

      // Intellectual
      case "reading-dashboard":
        return <ReadingDashboard />;

      // Media
      case "hiking-playlist":
        return <HikingPlaylist />;
      case "music-dashboard-r1":
        return <MusicDashboardR1 />;
      case "music-dashboard":
        return <MusicDashboard />;
      case "sound-therapy":
        return <SoundTherapy />;

      // Skin Biohacking
      case "holistic-protection":
        return <HolisticProtection />;
      case "sunscreen-calculator":
        return <SunscreenCalculator />;
      case "sunscreen-boj":
        return <SunscreenBOJ />;

      // Possessions
      case "backpack-dashboard":
        return <BackpackDashboard />;

      default:
        return null;
    }
  };

  // With HashRouter, we need to handle the hash portion of the URL
  const currentPath = location.pathname.replace(/^\//, '') || 'dashboard-overview';

  return (
    <Layout
      tableOfContents={
        <TableOfContents
          items={tocItems}
          activeItem={currentPath}
        />
      }
    >
      <Routes>
        <Route path="/" element={
          <div className="p-6">
            <section className="bg-white rounded-lg shadow">
              <h1 className="text-3xl font-bold mb-4">DASHBOARDS OVERVIEW</h1>
              <p>Welcome to the collection of interactive visual content</p>
            </section>
          </div>
        } />
        {tocItems.map((item) => (
          item.level === 1 && (
            <Route
              key={item.id}
              path={`/${item.id}`}
              element={<div className="p-6">{renderContent(item.id)}</div>}
            />
          )
        ))}
        <Route path="/dashboard-overview" element={
          <div className="p-6">
            <section className="bg-white rounded-lg shadow">
              <h1 className="text-3xl font-bold mb-4">DASHBOARDS OVERVIEW</h1>
              <p>Welcome to the collection of interactive visual content</p>
            </section>
          </div>
        } />
      </Routes>
    </Layout>
  );
}

export default App;
