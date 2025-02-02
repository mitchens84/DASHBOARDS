import React, { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  Brain, 
  Heart, 
  Activity, 
  Scale, 
  Droplet, 
  Apple, 
  Sun, 
  PieChart,
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronUp,
  Bone,
  Fish
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

// InfoTooltip Component
const InfoTooltip = ({ title, content }) => (
  <div className="group relative inline-block">
    <Info className="inline h-4 w-4 text-blue-500 cursor-help ml-1" />
    <div className="hidden group-hover:block absolute z-10 w-72 p-3 mt-2 text-sm bg-white rounded-lg shadow-lg border border-gray-200">
      <p className="font-medium mb-1">{title}</p>
      <p className="text-gray-600">{content}</p>
    </div>
  </div>
);

// ExpandableSection Component
const ExpandableSection = ({ title, children, icon }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="border rounded-lg mb-4">
      <button 
        className="w-full p-4 flex items-center justify-between bg-gray-50 rounded-t-lg"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          {icon}
          <span className="ml-2 font-semibold">{title}</span>
        </div>
        {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </button>
      {isExpanded && <div className="p-4">{children}</div>}
    </div>
  );
};

// Main Dashboard Component
const NutritionDashboard = () => {
  // January 8, 2025 data (rounded to whole numbers)
  const dailyData = {
    calories: 1037,
    macronutrients: {
      protein: 61,
      fat: 27,
      carbs: 154,
      fiber: 45
    },
    vitamins: {
      b12: 27,
      d3: 408,
      b6: 3,
      b1: 2,
      b2: 2,
      b3: 17,
      b5: 8,
      c: 219,
      a: 1219,
      k: 265
    },
    minerals: {
      calcium: 842,
      iron: 38,
      zinc: 18,
      iodine: 76,
      copper: 3,
      magnesium: 429,
      manganese: 9,
      phosphorus: 1282,
      potassium: 3214,
      selenium: 64,
      sodium: 202
    },
    fats: {
      monounsaturated: 3,
      polyunsaturated: 8,
      saturated: 4,
      omega3: 6,
      omega6: 4
    },
    aminoAcids: {
      arginine: 4,
      cystine: 1,
      histidine: 1,
      isoleucine: 2,
      leucine: 3,
      lysine: 3,
      methionine: 1,
      phenylalanine: 2,
      threonine: 2,
      tryptophan: 1,
      tyrosine: 1,
      valine: 2
    }
  };

  // Calculate macro ratios
  const macroCalories = {
    protein: dailyData.macronutrients.protein * 4,
    fat: dailyData.macronutrients.fat * 9,
    carbs: dailyData.macronutrients.carbs * 4
  };

  const totalCals = macroCalories.protein + macroCalories.fat + macroCalories.carbs;
  
  const pieData = [
    { name: 'Protein', value: Math.round((macroCalories.protein/totalCals)*100), color: '#3b82f6' },
    { name: 'Fat', value: Math.round((macroCalories.fat/totalCals)*100), color: '#8b5cf6' },
    { name: 'Carbs', value: Math.round((macroCalories.carbs/totalCals)*100), color: '#10b981' }
  ];

  const nutrientStatus = [
    { name: 'B12', value: Math.min((dailyData.vitamins.b12 / 9) * 100, 100), fullMark: 100 },
    { name: 'Vitamin D', value: Math.min((dailyData.vitamins.d3 / 500) * 100, 100), fullMark: 100 },
    { name: 'Calcium', value: Math.min((dailyData.minerals.calcium / 1000) * 100, 100), fullMark: 100 },
    { name: 'Zinc', value: Math.min((dailyData.minerals.zinc / 15) * 100, 100), fullMark: 100 },
    { name: 'Iron', value: Math.min((dailyData.minerals.iron / 7.5) * 100, 100), fullMark: 100 }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold flex items-center">
            <Brain className="mr-2 h-8 w-8 text-blue-500" />
            Bean's Nutritional Analysis
          </h1>
          <div className="text-right">
            <p className="text-lg font-medium">January 8, 2025</p>
            <p className="text-gray-600">Plant-based diet analysis</p>
          </div>
        </div>
      </div>

      {/* Daily Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center mb-2">
            <Scale className="h-5 w-5 text-blue-500 mr-2" />
            <h3 className="font-semibold">Total Calories</h3>
          </div>
          <p className="text-2xl font-bold">{dailyData.calories} kcal</p>
          <p className="text-sm text-gray-600">Target: 837-1046 kcal</p>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="flex items-center mb-2">
            <Activity className="h-5 w-5 text-purple-500 mr-2" />
            <h3 className="font-semibold">Protein Intake</h3>
          </div>
          <p className="text-2xl font-bold">{dailyData.macronutrients.protein}g</p>
          <p className="text-sm text-gray-600">Target: 45-56g</p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center mb-2">
            <Droplet className="h-5 w-5 text-green-500 mr-2" />
            <h3 className="font-semibold">Fiber Intake</h3>
          </div>
          <p className="text-2xl font-bold">{dailyData.macronutrients.fiber}g</p>
          <p className="text-sm text-gray-600">Excellent fiber levels</p>
        </div>
      </div>

      {/* Nutrient Status Overview */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Key Nutrient Status</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={nutrientStatus}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis domain={[0, 100]} />
              <Radar dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.5} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Macronutrient Distribution */}
      <ExpandableSection 
        title="Macronutrient Distribution" 
        icon={<PieChart className="h-5 w-5 text-blue-500" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </RePieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold">Distribution Analysis</h3>
            <ul className="space-y-2">
              <li>• Protein: {Math.round((macroCalories.protein/totalCals)*100)}% (Target: 25-35%)</li>
              <li>• Fat: {Math.round((macroCalories.fat/totalCals)*100)}% (Target: 20-30%)</li>
              <li>• Carbs: {Math.round((macroCalories.carbs/totalCals)*100)}% (Target: 40-50%)</li>
            </ul>
          </div>
        </div>
      </ExpandableSection>

      {/* Nutrient Details */}
      <ExpandableSection 
        title="Detailed Nutrient Analysis" 
        icon={<Activity className="h-5 w-5 text-green-500" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold mb-3">Vitamins</h3>
            <ul className="space-y-2">
              <li>• B12: {dailyData.vitamins.b12}μg (Target: 9μg)</li>
              <li>• D3: {dailyData.vitamins.d3}IU (Target: 500IU)</li>
              <li>• B6: {dailyData.vitamins.b6}mg</li>
              <li>• C: {dailyData.vitamins.c}mg</li>
            </ul>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="font-semibold mb-3">Minerals</h3>
            <ul className="space-y-2">
              <li>• Calcium: {dailyData.minerals.calcium}mg (Target: 1000mg)</li>
              <li>• Iron: {dailyData.minerals.iron}mg (Target: 7.5mg)</li>
              <li>• Zinc: {dailyData.minerals.zinc}mg (Target: 15mg)</li>
              <li>• Iodine: {dailyData.minerals.iodine}μg (Target: 220μg)</li>
            </ul>
          </div>
        </div>
      </ExpandableSection>

      {/* Optimization Recommendations */}
      <ExpandableSection 
        title="Optimization Recommendations" 
        icon={<Brain className="h-5 w-5 text-purple-500" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">Positive Findings</h3>
            <ul className="space-y-2">
              <li>• Excellent B12 levels (297% of target)</li>
              <li>• Strong iron content (509% of target)</li>
              <li>• High fiber intake (45g)</li>
              <li>• Good protein levels</li>
            </ul>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-semibold text-yellow-800 mb-2">Areas for Attention</h3>
            <ul className="space-y-2">
              <li>• Consider calcium-rich foods/supplements</li>
              <li>• Monitor D3 supplementation</li>
              <li>• Balance carbohydrate ratio</li>
              <li>• Evaluate zinc sources</li>
            </ul>
          </div>
        </div>
      </ExpandableSection>

      {/* Footer */}
      <div className="mt-8 text-sm text-gray-500 p-4 bg-gray-50 rounded-lg">
        <p>Analysis based on current veterinary nutritional guidelines and research on plant-based diets in dogs. All values rounded to nearest whole number for clarity.</p>
      </div>
    </div>
  );
};

export default NutritionDashboard;