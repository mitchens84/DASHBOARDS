import React from 'react';
import { AlertTriangle, Shield, Activity, Heart } from 'lucide-react';

const RiskCategory = ({ title, risks }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
    <h2 className="text-2xl font-bold mb-4 text-blue-600">{title}</h2>
    <div className="space-y-4">
      {risks.map((risk, index) => (
        <div key={index} className="border-l-4 border-blue-500 pl-4">
          <h3 className="font-semibold text-xl">{risk.name}</h3>
          <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
            <span>Impact: <span className="font-medium">{risk.impact}</span></span>
            <span>Likelihood: <span className="font-medium">{risk.likelihood}</span></span>
          </div>
          <p className="text-sm text-gray-700 mb-3">{risk.description}</p>
          <div className="bg-gray-100 p-3 rounded">
            <h4 className="font-medium text-sm mb-2">Mitigation Strategies:</h4>
            <ul className="list-disc list-inside text-sm text-gray-800">
              {risk.mitigation.map((strategy, idx) => (
                <li key={idx}>{strategy}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const BeanRiskAssessment = () => {
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
        description
