import React, { useState } from 'react';
import { 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ResponsiveContainer, Tooltip
} from 'recharts';
import { Search, Shield, Leaf, FlaskConical, AlertCircle, Info } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const SunscreenDashboard = () => {
  const [activeCategory, setActiveCategory] = useState('overview');
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const safetyMetrics = [
    { subject: 'UV Protection', value: 4.5 },
    { subject: 'Skin Safety', value: 4.0 },
    { subject: 'Environmental', value: 3.5 },
    { subject: 'Stability', value: 4.2 },
    { subject: 'Research Data', value: 4.0 }
  ];

  const categories = [
    { id: 'overview', name: 'Safety Overview', icon: Shield },
    { id: 'filters', name: 'UV Filters', icon: FlaskConical },
    { id: 'actives', name: 'Active Benefits', icon: Leaf },
    { id: 'sensitivity', name: 'Sensitivity', icon: AlertCircle }
  ];

  const uvFilters = [
    {
      name: 'Ethylhexyl Triazone',
      safety: 4.5,
      benefit: 5.0,
      details: 'High UVB protection, Photostable',
      concerns: 'Environmental persistence'
    },
    {
      name: 'Drometrizole Trisiloxane',
      safety: 4.0,
      benefit: 5.0,
      details: 'Broad spectrum, Highly photostable',
      concerns: 'Siloxane accumulation'
    },
    {
      name: 'Butyloctyl Salicylate',
      safety: 4.0,
      benefit: 4.0,
      details: 'UVB protection, Solubilizer',
      concerns: 'Limited long-term data'
    }
  ];

  const activeIngredients = [
    {
      name: 'Rice Seed Water',
      type: 'Natural',
      evidence: 'Strong',
      benefits: ['Antioxidant', 'Soothing', 'Brightening']
    },
    {
      name: 'Panthenol',
      type: 'Hydrator',
      evidence: 'Strong',
      benefits: ['Barrier repair', 'Anti-inflammatory', 'Wound healing']
    },
    {
      name: 'Ceramide NP',
      type: 'Barrier',
      evidence: 'Strong',
      benefits: ['Barrier repair', 'Moisture retention']
    }
  ];

  return (
    <div className="w-full bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold">Sunscreen Safety Analysis</h2>
        <p className="text-gray-600">Relief Sun Aqua-Fresh : Rice + B5 (SPF50+ PA+++)</p>
      </div>

      {/* Navigation */}
      <div className="flex p-4 space-x-4 border-b overflow-x-auto">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              activeCategory === category.id
                ? 'bg-blue-100 text-blue-700'
                : 'hover:bg-gray-100'
            }`}
          >
            <category.icon className="w-4 h-4 mr-2" />
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="p-6">
        {activeCategory === 'overview' && (
          <div className="space-y-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={safetyMetrics}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 5]} />
                  <Radar
                    name="Safety Score"
                    dataKey="value"
                    stroke="#2563eb"
                    fill="#3b82f6"
                    fillOpacity={0.6}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <Alert>
              <Info className="w-4 h-4" />
              <AlertTitle>Overall Safety Profile</AlertTitle>
              <AlertDescription>
                This formulation demonstrates strong safety scores across all metrics,
                with particularly high marks in UV protection and stability.
              </AlertDescription>
            </Alert>
          </div>
        )}

        {activeCategory === 'filters' && (
          <div className="space-y-4">
            {uvFilters.map(filter => (
              <div
                key={filter.name}
                className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedIngredient(filter)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{filter.name}</h3>
                    <p className="text-sm text-gray-600">{filter.details}</p>
                  </div>
                  <div className="flex space-x-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                      Safety: {filter.safety}
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">
                      Benefit: {filter.benefit}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeCategory === 'actives' && (
          <div className="space-y-4">
            {activeIngredients.map(active => (
              <div
                key={active.name}
                className="p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{active.name}</h3>
                    <p className="text-sm text-gray-600">Type: {active.type}</p>
                    <div className="mt-2">
                      {active.benefits.map(benefit => (
                        <span
                          key={benefit}
                          className="inline-block mr-2 mb-2 px-2 py-1 bg-gray-100 rounded-full text-sm"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-sm ${
                    active.evidence === 'Strong' 
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {active.evidence} Evidence
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeCategory === 'sensitivity' && (
          <div className="space-y-4">
            <Alert className="bg-green-50 border-green-200">
              <AlertTitle className="text-green-700">Low Risk Ingredients</AlertTitle>
              <AlertDescription className="text-green-600">
                Rice-based ingredients, Panthenol, Hyaluronic acid
              </AlertDescription>
            </Alert>

            <Alert className="bg-yellow-50 border-yellow-200">
              <AlertTitle className="text-yellow-700">Monitor for Sensitivity</AlertTitle>
              <AlertDescription className="text-yellow-600">
                UV filters (in sensitive individuals), Carbomer (rare sensitivity)
              </AlertDescription>
            </Alert>
          </div>
        )}
      </div>

      {/* Usage Guidelines */}
      <div className="p-6 bg-gray-50 border-t">
        <h3 className="font-semibold mb-2">Optimal Usage Guidelines</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 bg-white rounded border">
            <p className="font-medium">Application Amount</p>
            <p className="text-sm text-gray-600">2mg/cm²</p>
          </div>
          <div className="p-3 bg-white rounded border">
            <p className="font-medium">Reapplication</p>
            <p className="text-sm text-gray-600">Every 2-3 hours</p>
          </div>
          <div className="p-3 bg-white rounded border">
            <p className="font-medium">Storage</p>
            <p className="text-sm text-gray-600">Below 25°C, away from sunlight</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SunscreenDashboard;
