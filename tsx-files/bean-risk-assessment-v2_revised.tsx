import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface Risk {
  name: string;
  impact: string;
  likelihood: string;
  description: string;
  mitigation: string[];
}

interface RiskCategoryProps {
  title: string;
  risks: Risk[];
}

const RiskCategory: React.FC<RiskCategoryProps> = ({ title, risks }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
    <h2 className="text-2xl font-bold mb-4 text-blue-600">{title}</h2>
    <div className="space-y-4">
      {risks.map((risk, index) => (
        <div key={index} className="border-l-4 border-blue-500 pl-4">
          <h3 className="font-semibold text-xl text-gray-800">{risk.name}</h3>
          <div className="grid grid-cols-2 gap-4 mb-3 text-sm text-gray-700">
            <span>Impact: <span className={`font-medium ${risk.impact === 'SEVERE' ? 'text-red-600' : risk.impact === 'MEDIUM' ? 'text-orange-600' : 'text-darkred'}`}>{risk.impact}</span></span>
            <span>Likelihood: <span className={`font-medium ${risk.likelihood === 'HIGH' ? 'text-orange-800' : 'text-yellow-600'}`}>{risk.likelihood}</span></span>
          </div>
          <p className="text-sm text-gray-600 mb-3">{risk.description}</p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-sm mb-2">Mitigation Strategies:</h4>
            <ul className="list-disc list-inside text-sm text-gray-800">
              {risk.mitigation.map((strategy, idx) => (
                <li key={idx} className="text-gray-800">{strategy}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const BeanRiskAssessment: React.FC = () => {
  const musculoskeletalRisks = {
    title: "Musculoskeletal System Risks",
    risks: [
      {
        name: "Hip Dysplasia Progression",
        impact: "SEVERE",
        likelihood: "HIGH",
        description: "Progressive joint deterioration affecting mobility and quality of life",
        mitigation: [
          "Regular swimming sessions",
          "Physical therapy exercises",
          "Weight management",
          "Joint supplements"
        ]
      },
      {
        name: "Muscle Development",
        impact: "MEDIUM",
        likelihood: "HIGH",
        description: "Challenges in maintaining muscle mass and strength",
        mitigation: [
          "Targeted exercises",
          "Protein optimization",
          "Regular assessment",
          "Activity monitoring"
        ]
      }
    ]
  };

  const nutritionalRisks = {
    title: "Nutritional Risks",
    risks: [
      {
        name: "Essential Amino Acids",
        impact: "SEVERE",
        likelihood: "HIGH",
        description: "Critical protein components needed for muscle maintenance and repair",
        mitigation: [
          "Regular amino acid profile testing",
          "Targeted supplementation (L-carnitine, Taurine)",
          "Combining complementary protein sources",
          "Digestive enzyme supplementation"
        ]
      },
      {
        name: "Vitamin B Complex",
        impact: "SEVERE",
        likelihood: "HIGH",
        description: "B12 deficiency risk and other B vitamins crucial for metabolism",
        mitigation: [
          "B12 supplementation",
          "Regular B-vitamin testing",
          "Fortified food sources",
          "Absorption optimization"
        ]
      },
      {
        name: "Mineral Balance",
        impact: "SEVERE",
        likelihood: "MEDIUM",
        description: "Iron, Zinc, Calcium, and other essential minerals",
        mitigation: [
          "Regular mineral panel testing",
          "Calcium and Vitamin D supplementation",
          "Iron-rich plant foods",
          "Mineral absorption enhancers"
        ]
      },
      {
        name: "Essential Fatty Acids",
        impact: "SEVERE",
        likelihood: "HIGH",
        description: "EPA/DHA requirements for joint health and inflammation",
        mitigation: [
          "Algae-based omega-3 supplements",
          "Regular fatty acid testing",
          "Anti-inflammatory food sources",
          "Proper fat absorption support"
        ]
      }
    ]
  };

  const safetyRisks = {
    title: "Safety Risks",
    risks: [
      {
        name: "Traffic Hazards",
        impact: "CATASTROPHIC",
        likelihood: "HIGH",
        description: "Risks associated with Chiang Mai's busy traffic and road conditions",
        mitigation: [
          "Reflective gear for evening walks",
          "Traffic avoidance route planning",
          "Strong recall training",
          "GPS tracker maintenance"
        ]
      },
      {
        name: "Local Dog Encounters",
        impact: "SEVERE",
        likelihood: "HIGH",
        description: "Interactions with street dogs and territorial conflicts",
        mitigation: [
          "Route planning to avoid known territories",
          "First aid kit maintenance",
          "Emergency vet contacts"
        ]
      }
    ]
  };

  const environmentalRisks = {
    title: "Environmental Risks",
    risks: [
      {
        name: "Heat Management",
        impact: "SEVERE",
        likelihood: "HIGH",
        description: "Managing condition in tropical climate",
        mitigation: [
          "Activity scheduling",
          "Climate control",
          "Hydration management",
          "Cool-down protocols"
        ]
      },
      {
        name: "Surface Adaptation",
        impact: "MEDIUM",
        likelihood: "HIGH",
        description: "Ensuring safe movement on various surfaces",
        mitigation: [
          "Surface modification",
          "Rest area setup",
          "Exercise space adaptation",
          "Grip enhancement"
        ]
      }
    ]
  };

  const functionalRisks = {
    title: "Functional Risks",
    risks: [
      {
        name: "Exercise Capacity",
        impact: "SEVERE",
        likelihood: "HIGH",
        description: "Managing exercise limitations",
        mitigation: [
          "Custom exercise plans",
          "Activity monitoring",
          "Recovery management",
          "Environmental adaptation"
        ]
      },
      {
        name: "Pain Management",
        impact: "SEVERE",
        likelihood: "HIGH",
        description: "Ongoing pain monitoring",
        mitigation: [
          "Daily assessment",
          "Activity modification",
          "Comfort measures",
          "Medical intervention"
        ]
      }
    ]
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg mb-6">
        <h1 className="text-3xl font-bold">Bean's Risk Assessment</h1>
        <p className="text-sm">Updated: {new Date().toLocaleDateString()}</p>
      </div>
      
      <RiskCategory {...musculoskeletalRisks} />
      <RiskCategory {...nutritionalRisks} />
      <RiskCategory {...environmentalRisks} />
      <RiskCategory {...functionalRisks} />
      <RiskCategory {...safetyRisks} />
      
      <div className="bg-yellow-50 p-6 rounded-lg shadow-lg mt-6">
        <h2 className="font-bold flex items-center text-lg">
          <AlertTriangle className="mr-2" />
          Monitoring Schedule
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-6 text-sm">
          <div>
            <h3 className="font-medium">Daily Checks</h3>
            <ul className="list-disc list-inside">
              <li>Pain assessment</li>
              <li>Mobility check</li>
              <li>Food intake</li>
              <li>Activity level</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium">Professional Reviews</h3>
            <ul className="list-disc list-inside">
              <li>Monthly therapy</li>
              <li>Quarterly vet check</li>
              <li>Bi-annual blood work</li>
              <li>Annual full review</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeanRiskAssessment;
