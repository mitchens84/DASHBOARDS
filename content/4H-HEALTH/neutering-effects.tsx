import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AlertCircle, Activity, Brain, Heart, Microscope } from 'lucide-react';

const NeuteringEffects = () => {
  const [activeTab, setActiveTab] = useState('metabolic');

  const metabolicChanges = [
    { title: "Weight Management", details: "Increased risk of obesity with 60% obesity rate observed in studies" },
    { title: "Lipid Profile", details: "Higher triglycerides and HDL cholesterol levels" },
    { title: "Hormone Changes", details: "Decreased adiponectin and increased leptin levels" },
    { title: "Daily Weight Gain", details: "Significantly higher average daily gain in neutered dogs" }
  ];

  const microbialChanges = [
    { title: "Bacterial Diversity", details: "Reduced microbial diversity observed in neutered dogs" },
    { title: "Key Bacteria", details: "Decreased Bacteroides, Prevotella_9, and Megamonas populations" },
    { title: "SCFA Production", details: "Reduced acetate, propionate, and butyrate production" },
    { title: "Metabolic Impact", details: "Disrupted lipid metabolism and endocrine system function" }
  ];

  const healthImplications = [
    { title: "Digestive Health", details: "Compromised gut barrier function and nutrient absorption" },
    { title: "Immune Function", details: "Modified immune response and increased inflammation risk" },
    { title: "Metabolic Health", details: "Altered glucose regulation and energy metabolism" },
    { title: "Endocrine Impact", details: "Changes in hormone signaling and appetite regulation" }
  ];

  const preventiveStrategies = [
    { title: "Dietary Intervention", details: "High-protein, high-fiber diets can help limit weight gain" },
    { title: "Weight Monitoring", details: "Regular body condition scoring and weight checks" },
    { title: "Activity Levels", details: "Maintaining appropriate physical activity post-surgery" },
    { title: "Nutritional Support", details: "Potential benefits from omega-3 and medium-chain fatty acids" }
  ];

  const tabContent = {
    metabolic: metabolicChanges,
    microbial: microbialChanges,
    health: healthImplications,
    prevention: preventiveStrategies
  };

  const tabIcons = {
    metabolic: <Activity className="w-4 h-4" />,
    microbial: <Microscope className="w-4 h-4" />,
    health: <Heart className="w-4 h-4" />,
    prevention: <Brain className="w-4 h-4" />
  };

  const tabLabels = {
    metabolic: "Metabolic",
    microbial: "Microbial",
    health: "Health",
    prevention: "Prevention"
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Impact of Early Neutering on Canine Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-4">
            <AlertCircle className="inline-block mr-2 w-4 h-4" />
            <span>Based on research findings and clinical observations</span>
          </div>
        </CardContent>
      </Card>

      <div className="mb-6">
        <div className="grid grid-cols-4 gap-2">
          {Object.keys(tabContent).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center justify-center p-3 border rounded ${
                activeTab === tab ? 'bg-blue-100 border-blue-500' : 'hover:bg-gray-50'
              }`}
            >
              {tabIcons[tab]}
              <span className="ml-2">{tabLabels[tab]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {tabContent[activeTab].map((item, index) => (
          <Card key={index} className="p-4">
            <CardTitle className="text-lg mb-2">{item.title}</CardTitle>
            <p className="text-gray-600">{item.details}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <CardContent className="p-4">
          <h3 className="text-xl font-bold mb-2">Key Findings</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>High-protein, high-fiber diets can help mitigate weight gain after neutering</li>
            <li>Significant changes in gut microbiota composition affect overall health</li>
            <li>Reduced SCFA production impacts metabolic and immune function</li>
            <li>Early intervention and monitoring are crucial for preventing obesity</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default NeuteringEffects;