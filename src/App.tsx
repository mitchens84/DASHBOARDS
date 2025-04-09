import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import TableOfContents from "./components/TableOfContents";
import HtmlContent from './components/HtmlContent';

// 0A-PREP imports
import BikeMaintenanceDashboard from "../content/0A-PREP/bike-maintenance-dashboard";

// 3P-POSSESSIONS imports
import BackpackDashboard from "../content/3P-POSSESSIONS/240205-comprehensive-backpack-dashboard";

// 3P-FINANCE imports
import ThaiImportCalculator from "../content/3P-FINANCE/thai-import-calculator";

// 4H-BIOHACKING imports
import HolisticProtectionDashboard from "../content/4H-BIOHACKING/holistic-protection-dashboard";
import SunscreenProtectionCalculator from "../content/4H-BIOHACKING/sunscreen-protection-calculator";
import SunscreenBOJ from "../content/4H-BIOHACKING/4H-BIOHACKING-SKIN-SUNSCREEN-BOJ";

// 4H-ENVIRONMENT imports
import EnvDashboard from "../content/4H-ENVIRONMENT/env-dashboard";
import EnvironmentalDashboard from "../content/4H-ENVIRONMENT/environmental-dashboard";
import PlantsCO2Analysis from "../content/4H-ENVIRONMENT/plants-co2-analysis";
import MicroplasticsMonitoring from "../content/4H-ENVIRONMENT/microplastics-monitoring-dashboard";
import ChiangMaiAirPollutionDashboard from "../content/4H-ENVIRONMENT/chiang-mai-air-pollution-dashboard";

// 4H-MEDICAL imports
import DistalBicepsDashboard from "../content/4H-MEDICAL/distal-biceps-tendinopathy-dashboard";
import DengueRiskDashboard from "../content/4H-MEDICAL/dengue-risk-visualization";

// 4H-HEALTH imports
import RetinolProtocolGuide from "../content/4H-HEALTH/retinol-protocol-guide";
import VollagenDashboard from "../content/4H-HEALTH/vollagen-dashboard";
import ApoBReference from "../content/4H-HEALTH/apob-reference";
import DentalCareStrategy from "../content/4H-HEALTH/dental-care-strategy";
import EmfSafetyDashboard from "../content/4H-HEALTH/emf-safety-dashboard";
import GeneticDashboard from "../content/4H-HEALTH/genetic-dashboard-complete";
import NeuteringEffects from "../content/4H-HEALTH/neutering-effects";
import VaccinationTimeline from "../content/4H-HEALTH/vaccination-timeline-analysis";
import ThaiMassageBenefitsRisksDashboard from "../content/4H-HEALTH/thai-massage-benefits-risks-dashboard";

// 4H-NUTRITION imports
import SportsNutrition from "../content/4H-NUTRITION/241118-sports-nutrition-dashboard";
import LegumeCookingGuide from "../content/4H-NUTRITION/241230-legumes cooking guide";
import EnhancedSodiumCalculator from "../content/4H-NUTRITION/enhanced-sodium-calculator";
import EnhancedSodiumCalculatorCopy from "../content/4H-NUTRITION/enhanced-sodium-calculator copy";
import FunctionalFoodsNetwork from "../content/4H-NUTRITION/functional-foods-network";
import LifeSmoothie from "../content/4H-NUTRITION/life-smoothie-visual";
import NutritionProcessing from "../content/4H-NUTRITION/nutrition-processing-dashboard";
import TherapeuticSpiceBlend from "../content/4H-NUTRITION/therapeutic-spice-blend";
import TvpDashboard from "../content/4H-NUTRITION/tvp-dashboard";

// 5R-BEAN imports
import BeanRiskAssessment from "../content/5R-BEAN/bean-risk-assessment-v2_revised";
import BeanRiskAssessmentV2 from "../content/5R-BEAN/bean-risk-assessment-v2";
import AntibioticDashboard from "../content/5R-BEAN/antibiotic-dashboard";
import BeanSodiumIntakeDashboard from "../content/5R-BEAN/bean-sodium-intake-dashboard";
import BeanTreatmentTimeline from "../content/5R-BEAN/bean-treatment-timeline-revised";
import BeansInfectionDietPlan from "../content/5R-BEAN/beans-infection-diet-plan";
import BeanCompleteNutritionDashboard from "../content/5R-BEAN/bean-complete-nutrition-dashboard";

// 6I-INTELLECTUAL imports
import ReadingDashboard from "../content/6I-INTELLECTUAL/reading-dashboard";
import MurderMysteryDinnerParty from "../content/6I-INTELLECTUAL/murder-mystery-dinner-party";
import MurderMysteryDinnerPartyR1 from "../content/6I-INTELLECTUAL/murder-mystery-dinner-party-r1";

// 9E-MEDIA imports
import KorijeniNaKorculi from "../content/9E-MEDIA/korijeni_na_korculi";
import HikingPlaylist from "../content/9E-MEDIA/hiking-playlist";
import HighlightDetectiveGame from "../content/9E-MEDIA/highlight_detective_game";
import MusicDashboardR1 from "../content/9E-MEDIA/music-dashboard-r1";
import MusicDashboard from "../content/9E-MEDIA/music-dashboard";
import SoundTherapy from "../content/9E-MEDIA/sound-therapy-guide";
import MediaPreferenceDashboard from "../content/9E-MEDIA/media-preference-dashboard";

function App() {
  const location = useLocation();
  const tocItems = [
    { id: "dashboard-overview", title: "DASHBOARDS", level: 0 },
    
    // 0A-PREPAREDNESS Section
    { id: "risk-assessment", title: "0A-PREPAREDNESS", level: 0 },
    { id: "bike-maintenance-dashboard", title: "Bike Maintenance Dashboard", level: 1 },
    
    // 3P-POSSESSIONS Section
    { id: "possessions", title: "3P-POSSESSIONS", level: 0 },
    { id: "backpack-dashboard", title: "Backpack Analysis", level: 1 },
    { id: "comprehensive-backpack-dashboard", title: "Comprehensive Backpack Dashboard", level: 1 },

    // 3P-FINANCE Section
    { id: "finance", title: "3P-FINANCE", level: 0 },
    { id: "thai-import-calculator", title: "Thai Import Calculator", level: 1 },
    
    // 4H-BIOHACKING Section
    { id: "skin-biohacking", title: "4H-BIOHACKING-SKIN", level: 0 },
    { id: "holistic-protection", title: "Holistic Protection", level: 1 },
    { id: "sunscreen-calculator", title: "Sunscreen Calculator", level: 1 },
    { id: "sunscreen-boj", title: "BOJ Sunscreen Analysis", level: 1 },
    { id: "holistic-protection-dashboard", title: "Holistic Protection Dashboard", level: 1 },
    { id: "sunscreen-protection-calculator", title: "Sunscreen Protection Calculator", level: 1 },
    { id: "4h-biohacking-skin-sunscreen-boj", title: "4H BIOHACKING SKIN SUNSCREEN BOJ", level: 1 },
    
    // Environment Section
    { id: "environment", title: "4H-ENVIRONMENT", level: 0 },
    { id: "env-dashboard", title: "Environment Dashboard", level: 1 },
    { id: "environmental-dashboard", title: "Environmental Analysis", level: 1 },
    { id: "plants-co2", title: "Plants CO2 Analysis", level: 1 },
    { id: "microplastics-monitoring", title: "Microplastics Monitoring", level: 1 },
    { id: "microplastics-monitoring-dashboard", title: "Microplastics Monitoring Dashboard", level: 1 },
    { id: "plants-co2-analysis", title: "Plants Co2 Analysis", level: 1 },
    { id: "chiang-mai-air-pollution-dashboard", title: "Chiang Mai Air Pollution Dashboard", level: 1 },
    
    // Health Section
    { id: "medical", title: "4H-MEDICAL", level: 0 },
    { id: "distal-biceps", title: "Distal Biceps Management", level: 1 },
    { id: "dengue-risk", title: "Dengue Risk Assessment", level: 1 },
    { id: "distal-biceps-tendinopathy-dashboard", title: "Distal Biceps Tendinopathy Dashboard", level: 1 },
    { id: "dengue-risk-visualization", title: "Dengue Risk Visualization", level: 1 },
    { id: "23andme-privacy-analysis", title: "23andMe Privacy Analysis", level: 1 },
    
    // 4H-HEALTH Section
    { id: "health-reference", title: "4H-HEALTH", level: 0 },
    { id: "apob-reference", title: "ApoB Reference", level: 1 },
    { id: "dental-care", title: "Dental Care Strategy", level: 1 },
    { id: "emf-safety", title: "EMF Safety", level: 1 },
    { id: "genetic-dashboard", title: "Genetic Dashboard", level: 1 },
    { id: "neutering-effects", title: "Neutering Effects", level: 1 },
    { id: "retinol", title: "Retinol Protocol Guide", level: 1 },
    { id: "vollagen", title: "Vollagen Dashboard", level: 1 },
    { id: "dental-care-strategy", title: "Dental Care Strategy", level: 1 },
    { id: "genetic-dashboard-complete", title: "Genetic Dashboard Complete", level: 1 },
    { id: "emf-safety-dashboard", title: "Emf Safety Dashboard", level: 1 },
    { id: "retinol-protocol-guide", title: "Retinol Protocol Guide", level: 1 },
    { id: "vaccination-timeline-analysis", title: "Vaccination Timeline Analysis", level: 1 },
    { id: "vollagen-dashboard", title: "Vollagen Dashboard", level: 1 },
    { id: "sulforaphane-protocol", title: "Sulforaphane Protocol", level: 1 },
    { id: "thai-massage-benefits-risks-dashboard", title: "Thai Massage Benefits Risks Dashboard", level: 1 },
    
    // Nutrition Section
    { id: "nutrition", title: "4H-NUTRITION", level: 0 },
    { id: "enhanced-sodium", title: "Sodium Balance Calculator", level: 1 },
    { id: "functional-foods", title: "Functional Foods", level: 1 },
    { id: "legume-guide", title: "Legume Guide", level: 1 },
    { id: "life-smoothie", title: "Life Smoothie", level: 1 },
    { id: "nutrition-processing", title: "Nutrition Processing", level: 1 },
    { id: "sports-nutrition", title: "Sports Nutrition", level: 1 },
    { id: "therapeutic-spice", title: "Therapeutic Spice Blend", level: 1 },
    { id: "life-smoothie-visual", title: "Life Smoothie Visual", level: 1 },
    { id: "legumes-cooking-guide", title: "Legumes Cooking Guide", level: 1 },
    { id: "sports-nutrition-dashboard", title: "Sports Nutrition Dashboard", level: 1 },
    { id: "nutrition-processing-dashboard", title: "Nutrition Processing Dashboard", level: 1 },
    { id: "enhanced-sodium-calculator-copy", title: "Enhanced Sodium Calculator Copy", level: 1 },
    { id: "enhanced-sodium-calculator", title: "Enhanced Sodium Calculator", level: 1 },
    { id: "functional-foods-network", title: "Functional Foods Network", level: 1 },
    { id: "therapeutic-spice-blend", title: "Therapeutic Spice Blend", level: 1 },
    { id: "tvp-dashboard", title: "TVP Dashboard", level: 1 },
    
    // 4H-PSYCHOLOGY Section (new)
    { id: "psychology", title: "4H-PSYCHOLOGY", level: 0 },
    { id: "psychometric-dashboard", title: "Psychometric Dashboard", level: 1 },

    // Bean Section
    { id: "bean", title: "5R-BEAN", level: 0 },
    { id: "antibiotic-dashboard", title: "Antibiotic Dashboard", level: 1 },
    { id: "bean-assessment", title: "Bean Risk Assessment", level: 1 },
    { id: "bean-sodium-intake", title: "Bean Sodium Intake", level: 1 },
    { id: "bean-treatment", title: "UTI Treatment Protocol", level: 1 },
    { id: "beans-infection-diet", title: "Infection Diet Plan", level: 1 },
    { id: "bean-complete-nutrition-dashboard", title: "Bean Complete Nutrition Dashboard", level: 1 },
    { id: "bean-treatment-timeline-revised", title: "Bean Treatment Timeline Revised", level: 1 },
    { id: "bean-risk-assessment-v2", title: "Bean Risk Assessment V2", level: 1 },
    { id: "bean-risk-assessment-v2-revised", title: "Bean Risk Assessment V2 Revised", level: 1 },
    { id: "bean-sodium-intake-dashboard", title: "Bean Sodium Intake Dashboard", level: 1 },
    { id: "beans-infection-diet-plan", title: "Beans Infection Diet Plan", level: 1 },
    { id: "bean-uti-prevention", title: "Bean UTI Prevention", level: 1 },
    
    // Intellectual Section
    { id: "intellectual", title: "6I-INTELLECTUAL", level: 0 },
    { id: "reading-dashboard", title: "Reading Dashboard", level: 1 },
    { id: "murder-mystery-dinner-party", title: "Murder Mystery Dinner Party", level: 1 },
    { id: "murder-mystery-dinner-party-r1", title: "Murder Mystery Dinner Party (Enhanced)", level: 1 },
    
    // Media Section
    { id: "media", title: "9E-MEDIA", level: 0 },
    { id: "hiking-playlist", title: "Hiking Playlist", level: 1 },
    { id: "highlightdetectivegame", title: "Highlight Detective Game", level: 1 },
    { id: "music-dashboard", title: "Music Dashboard", level: 1 },
    { id: "music-dashboard-r1", title: "Music Dashboard R1", level: 1 },
    { id: "sound-therapy", title: "Sound Therapy Guide", level: 1 },
    { id: "korijeni-na-korculi", title: "Korijeni Na Korculi", level: 1 },
    { id: "sound-therapy-guide", title: "Sound Therapy Guide", level: 1 },
    { id: "media-preference-dashboard", title: "Media Preference Dashboard", level: 1 },
    
    // Travel Section
    { id: "travel", title: "9E-TRAVEL", level: 0 },
    { id: "chiang-mai-air-pollution", title: "Chiang Mai Air Pollution", level: 1 },
    { id: "thailand-malaysia-journey", title: "Thailand-Malaysia Journey Planner", level: 1 },
  ];

  const renderContent = (id: string) => {
    switch (id) {
      // Root level dashboards
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

      // 0A-PREP
      case "bike-maintenance-dashboard":
        return <BikeMaintenanceDashboard />;

      // 3P-POSSESSIONS
      case "backpack-dashboard":
      case "comprehensive-backpack-dashboard":
        return <BackpackDashboard />;

      // 4H-BIOHACKING
      case "holistic-protection":
      case "holistic-protection-dashboard":
        return <HolisticProtectionDashboard />;
      case "sunscreen-calculator":
      case "sunscreen-protection-calculator":
        return <SunscreenProtectionCalculator />;
      case "sunscreen-boj":
      case "4h-biohacking-skin-sunscreen-boj":
        return <SunscreenBOJ />;

      // 4H-ENVIRONMENT
      case "env-dashboard":
        return <EnvDashboard />;
      case "environmental-dashboard":
        return <EnvironmentalDashboard />;
      case "plants-co2":
      case "plants-co2-analysis":
        return <PlantsCO2Analysis />;
      case "microplastics-monitoring":
      case "microplastics-monitoring-dashboard":
        return <MicroplasticsMonitoring />;
      case "chiang-mai-air-pollution-dashboard":
        return <ChiangMaiAirPollutionDashboard />;

      // 4H-MEDICAL
      case "distal-biceps":
      case "distal-biceps-tendinopathy-dashboard":
        return <DistalBicepsDashboard />;
      case "dengue-risk":
      case "dengue-risk-visualization":
        return <DengueRiskDashboard />;

      // 4H-HEALTH
      case "retinol":
      case "retinol-protocol-guide":
        return <RetinolProtocolGuide />;
      case "vollagen":
      case "vollagen-dashboard":
        return <VollagenDashboard />;
      case "apob-reference":
        return <ApoBReference />;
      case "dental-care":
      case "dental-care-strategy":
        return <DentalCareStrategy />;
      case "genetic-dashboard":
      case "genetic-dashboard-complete":
        return <GeneticDashboard />;
      case "neutering-effects":
        return <NeuteringEffects />;
      case "vaccination-timeline":
      case "vaccination-timeline-analysis":
        return <VaccinationTimeline />;
      case "emf-safety":
      case "emf-safety-dashboard":
        return <EmfSafetyDashboard />;
      case "thai-massage-benefits-risks-dashboard":
        return <ThaiMassageBenefitsRisksDashboard />;

      // 4H-NUTRITION
      case "sports-nutrition":
      case "sports-nutrition-dashboard":
        return <SportsNutrition />;
      case "legume-guide":
      case "legumes-cooking-guide":
        return <LegumeCookingGuide />;
      case "life-smoothie":
      case "life-smoothie-visual":
        return <LifeSmoothie />;
      case "nutrition-processing":
      case "nutrition-processing-dashboard":
        return <NutritionProcessing />;
      case "enhanced-sodium-calculator":
        return <EnhancedSodiumCalculator />;
      case "enhanced-sodium-calculator-copy":
        return <EnhancedSodiumCalculatorCopy />;
      case "functional-foods":
      case "functional-foods-network":
        return <FunctionalFoodsNetwork />;
      case "enhanced-sodium":
        return <EnhancedSodiumCalculator />;
      case "therapeutic-spice":
      case "therapeutic-spice-blend":
        return <TherapeuticSpiceBlend />;
      case "tvp-dashboard":
        return <TvpDashboard />;

      // 4H-PSYCHOLOGY
      case "psychometric-dashboard":
        return <HtmlContent filePath="content/4H-PSYCHOLOGY/psychometric-dashboard.html" />;

      // 5R-BEAN
      case "bean-assessment":
      case "bean-risk-assessment-v2-revised":
        return <BeanRiskAssessment />;
      case "bean-risk-assessment-v2":
        return <BeanRiskAssessmentV2 />;
      case "antibiotic-dashboard":
        return <AntibioticDashboard />;
      case "bean-sodium-intake-dashboard":
      case "bean-sodium-intake":
        return <BeanSodiumIntakeDashboard />;
      case "bean-treatment":
      case "bean-treatment-timeline-revised":
        return <BeanTreatmentTimeline />;
      case "beans-infection-diet":
      case "beans-infection-diet-plan":
        return <BeansInfectionDietPlan />;
      case "bean-complete-nutrition-dashboard":
        return <BeanCompleteNutritionDashboard />;

      // 6I-INTELLECTUAL
      case "reading-dashboard":
        return <ReadingDashboard />;
      case "murder-mystery-dinner-party":
        return <MurderMysteryDinnerParty />;
      case "murder-mystery-dinner-party-r1":
        return <MurderMysteryDinnerPartyR1 />;

      // 9E-MEDIA
      case "hiking-playlist":
        return <HikingPlaylist />;
      case "highlightdetectivegame":
        return <HighlightDetectiveGame />;
      case "music-dashboard-r1":
        return <MusicDashboardR1 />;
      case "music-dashboard":
        return <MusicDashboard />;
      case "sound-therapy":
      case "sound-therapy-guide":
        return <SoundTherapy />;
      case "korijeni-na-korculi":
        return <KorijeniNaKorculi />;
      case "media-preference-dashboard":
        return <MediaPreferenceDashboard />;

      // 3P-FINANCE
      case "thai-import-calculator":
        return <ThaiImportCalculator />;

      // 9E-TRAVEL
      case "chiang-mai-air-pollution":
        return <HtmlContent filePath="content/chiang-mai-air-pollution-guide.html" />;
      case "bean-uti-prevention":
        return <HtmlContent filePath="content/bean-uti-prevention-dashboard.html" />;
      case "sulforaphane-protocol":
        return <HtmlContent filePath="content/sulforaphane-protocol.html" />;
      case "thailand-malaysia-journey":
        return <HtmlContent filePath="content/thailand-malaysia-interactive-journey-planner.html" />;
      
      // 4H-MEDICAL HTML Content
      case "23andme-privacy-analysis":
        return <HtmlContent filePath="content/4H-MEDICAL/23andMe-Privacy-Analysis.html" />;

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
