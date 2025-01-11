import React, { useState } from 'react'
import Layout from './components/Layout'
import TableOfContents from './components/TableOfContents'

// 4H-ENVIRONMENT imports
import EnvDashboard from '../content/4H-ENVIRONMENT/env-dashboard.tsx'
import EnvironmentalDashboard from '../content/4H-ENVIRONMENT/environmental-dashboard.tsx'
import PlantsCO2Analysis from '../content/4H-ENVIRONMENT/plants-co2-analysis.tsx'
import MicroplasticsMonitoring from '../content/4H-ENVIRONMENT/microplastics-monitoring-dashboard'

// 4H-HEALTH imports
import ApoBReference from '../content/4H-HEALTH/apob-reference.tsx'
import DentalCareStrategy from '../content/4H-HEALTH/dental-care-strategy.tsx'
import GeneticDashboard from '../content/4H-HEALTH/genetic-dashboard-complete.tsx'
import NeuteringEffects from '../content/4H-HEALTH/neutering-effects.tsx'
import VaccinationTimeline from '../content/4H-HEALTH/vaccination-timeline-analysis.tsx'

// 4H-NUTRITION imports
import SportsNutrition from '../content/4H-NUTRITION/241118-sports-nutrition-dashboard.tsx'
import LegumeGuide from '../content/4H-NUTRITION/241230-legumes cooking guide.tsx'
import LifeSmoothie from '../content/4H-NUTRITION/life-smoothie-visual.tsx'
import NutritionProcessing from '../content/4H-NUTRITION/nutrition-processing-dashboard.tsx'

// 5R-BEAN imports
import BeanRiskAssessment from '../content/5R-BEAN/bean-risk-assessment-v2_revised.tsx'

// 6I-INTELLECTUAL imports
import ReadingDashboard from '../content/6I-INTELLECTUAL/reading-dashboard.tsx'

// 9E-MEDIA imports
import HikingPlaylist from '../content/9E-MEDIA/hiking-playlist.tsx'
import MusicDashboardR1 from '../content/9E-MEDIA/music-dashboard-r1.tsx'
import MusicDashboard from '../content/9E-MEDIA/music-dashboard.tsx'
import SoundTherapy from '../content/9E-MEDIA/sound-therapy-guide.tsx'

function App() {
  const [selectedSection, setSelectedSection] = useState('dashboard-overview')
  
  const tocItems = [
    { id: 'dashboard-overview', title: 'DASHBOARDS', level: 0 },
    // 0A-PREPAREDNESS Section
    { id: 'risk-assessment', title: '0A-PREPAREDNESS', level: 0 },
    { id: 'bean-assessment', title: 'Bean Risk Assessment', level: 1 },
    // Environment Section
    { id: 'environment', title: '4H-ENVIRONMENT', level: 0 },
    { id: 'env-dashboard', title: 'Environment Dashboard', level: 1 },
    { id: 'environmental-dashboard', title: 'Environmental Analysis', level: 1 },
    { id: 'plants-co2', title: 'Plants CO2 Analysis', level: 1 },
    { id: 'microplastics-monitoring', title: 'Microplastics Monitoring', level: 1 },
    // Health Section
    { id: 'health-reference', title: '4H-HEALTH', level: 0 },
    { id: 'apob-reference', title: 'ApoB Reference', level: 1 },
    { id: 'dental-care', title: 'Dental Care Strategy', level: 1 },
    { id: 'genetic-dashboard', title: 'Genetic Dashboard', level: 1 },
    { id: 'neutering-effects', title: 'Neutering Effects', level: 1 },
    { id: 'vaccination-timeline', title: 'Vaccination Timeline', level: 1 },
    // Nutrition Section
    { id: 'nutrition', title: '4H-NUTRITION', level: 0 },
    { id: 'sports-nutrition', title: 'Sports Nutrition', level: 1 },
    { id: 'legume-guide', title: 'Legume Guide', level: 1 },
    { id: 'life-smoothie', title: 'Life Smoothie', level: 1 },
    { id: 'nutrition-processing', title: 'Nutrition Processing', level: 1 },
    // Intellectual Section
    { id: 'intellectual', title: '6I-INTELLECTUAL', level: 0 },
    { id: 'reading-dashboard', title: 'Reading Dashboard', level: 1 },
    // Media Section
    { id: 'media', title: '9E-EXPERIENCE', level: 0 },
    { id: 'hiking-playlist', title: 'Hiking Playlist', level: 1 },
    { id: 'music-dashboard-r1', title: 'Music Dashboard R1', level: 1 },
    { id: 'music-dashboard', title: 'Music Dashboard', level: 1 },
    { id: 'sound-therapy', title: 'Sound Therapy Guide', level: 1 }
  ]

  const renderContent = (id: string) => {
    switch(id) {
      case 'dashboard-overview':
        return (
          <section id={id} className="p-6 bg-white rounded-lg shadow">
            <h1 className="text-3xl font-bold mb-4">DASHBOARDS OVERVIEW</h1>
            <p>Welcome to the collection of interactive visual content across LBS categories</p>
          </section>
        )
      
      // Environment
      case 'env-dashboard':
        return <EnvDashboard />
      case 'environmental-dashboard':
        return <EnvironmentalDashboard />
      case 'plants-co2':
        return <PlantsCO2Analysis />
      case 'microplastics-monitoring':
        return <MicroplasticsMonitoring />
      
      // Health
      case 'apob-reference':
        return <ApoBReference />
      case 'dental-care':
        return <DentalCareStrategy />
      case 'genetic-dashboard':
        return <GeneticDashboard />
      case 'neutering-effects':
        return <NeuteringEffects />
      case 'vaccination-timeline':
        return <VaccinationTimeline />
      
      // Nutrition
      case 'sports-nutrition':
        return <SportsNutrition />
      case 'legume-guide':
        return <LegumeGuide />
      case 'life-smoothie':
        return <LifeSmoothie />
      case 'nutrition-processing':
        return <NutritionProcessing />
      
      // Bean
      case 'bean-assessment':
        return <BeanRiskAssessment />
      
      // Intellectual
      case 'reading-dashboard':
        return <ReadingDashboard />
      
      // Media
      case 'hiking-playlist':
        return <HikingPlaylist />
      case 'music-dashboard-r1':
        return <MusicDashboardR1 />
      case 'music-dashboard':
        return <MusicDashboard />
      case 'sound-therapy':
        return <SoundTherapy />
      
      default:
        return null
    }
  }

  return (
    <Layout 
      tableOfContents={
        <TableOfContents 
          items={tocItems} 
          onSelect={setSelectedSection}
          activeItem={selectedSection}
        />
      }
    >
      <div className="p-6">
        {renderContent(selectedSection)}
      </div>
    </Layout>
  )
}

export default App
