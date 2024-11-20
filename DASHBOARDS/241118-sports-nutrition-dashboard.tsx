import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

// Dataset embedded directly in the component
const NUTRIENTS_DATA = [
  {
    nutrient_name: "Vitamin B12",
    sources: "N/A",
    supplementation_notes: "Supplementation required for ALL on plant-based diet"
  },
  {
    nutrient_name: "Calcium",
    sources: "Greens, beans, and fortified dairy alternatives",
    supplementation_notes: null
  },
  {
    nutrient_name: "Iron",
    sources: "Greens, legumes, whole grains, nuts and seeds",
    supplementation_notes: "Supplementation not recommended unless deficiency confirmed by blood test"
  },
  {
    nutrient_name: "Selenium",
    sources: "Grains, nuts and seeds - just two Brazil nuts provides daily requirement",
    supplementation_notes: null
  },
  {
    nutrient_name: "Zinc",
    sources: "Legumes, whole grains, nuts and soy products",
    supplementation_notes: "Soaking, fermenting and sprouting grains and legumes can increase absorption"
  },
  {
    nutrient_name: "Vitamin D",
    sources: "Made in skin after sun exposure",
    supplementation_notes: "Supplementation recommended for ALL during winter months"
  },
  {
    nutrient_name: "Iodine",
    sources: "Seaweed, iodised salt, fortified dairy alternatives",
    supplementation_notes: "Half a teaspoon of iodised salt provides the recommended intake"
  },
  {
    nutrient_name: "Omega-3",
    sources: "Flax seeds, chia seeds, hemp seeds, walnuts",
    supplementation_notes: "2 tablespoons of seeds or 3-4 walnuts daily, or algae-based supplement"
  }
];

const CARB_GUIDELINES = [
  {
    activity_level: "Low intensity or skill-based activities",
    duration: "N/A",
    carb_requirement: { min: 3, max: 5 },
    notes: "Basic requirement"
  },
  {
    activity_level: "Moderate exercise program",
    duration: "1 hour/day",
    carb_requirement: { min: 5, max: 7 },
    notes: "Standard training"
  },
  {
    activity_level: "Endurance program",
    duration: "1-3 hours/day moderate to high-intensity",
    carb_requirement: { min: 6, max: 10 },
    notes: "Higher intensity needs"
  },
  {
    activity_level: "Extreme commitment",
    duration: "4-5 hours/day moderate to high-intensity",
    carb_requirement: { min: 8, max: 12 },
    notes: "Maximum intake range"
  }
];

const SUPPLEMENTS_DATA = [
  {
    name: "Caffeine",
    effects: [
      "Reduces perception of fatigue",
      "Allows exercise to be sustained at optimal intensity/output for longer"
    ],
    concerns: [
      "Can cause anxiety in some",
      "Can affect sleep if used in afternoon or evening"
    ]
  },
  {
    name: "Creatine",
    effects: [
      "Improves performance of repeated high intensity exercise with short recovery periods",
      "May be more effective in plant-based athletes"
    ],
    concerns: [
      "Associated with acute weight gain (0.6-1 kg)",
      "Athletes with kidney problems should avoid",
      "Safety beyond 4 years not studied"
    ]
  },
  {
    name: "Beetroot juice",
    effects: [
      "Improves exercise tolerance and economy",
      "Improves performance in endurance exercise"
    ],
    concerns: [
      "May cause gut discomfort",
      "Discoloration of urine",
      "Less effective in highly-trained athletes"
    ]
  },
  {
    name: "Sodium bicarbonate",
    effects: [
      "Improves performance of short-term high intensity events limited by lactic acid"
    ],
    concerns: [
      "Can cause severe gastrointestinal side effects"
    ]
  },
  {
    name: "Beta-alanine",
    effects: [
      "Improves performance of short-term high intensity events limited by lactic acid"
    ],
    concerns: [
      "May cause tingling sensation",
      "Less improvement in well-trained athletes"
    ]
  }
];

const Dashboard = () => {
  const [weight, setWeight] = useState(60);
  const [selectedActivity, setSelectedActivity] = useState('moderate');

  const calculateCarbs = () => {
    const activityMap = {
      'low': 0,
      'moderate': 1,
      'endurance': 2,
      'extreme': 3
    };
    
    const guideline = CARB_GUIDELINES[activityMap[selectedActivity]];
    return {
      min: Math.round(guideline.carb_requirement.min * weight),
      max: Math.round(guideline.carb_requirement.max * weight)
    };
  };

  const calculateProtein = () => {
    return {
      endurance: Math.round(weight * 1.2),
      strength: Math.round(weight * 1.6),
      general: Math.round(weight * 0.75)
    };
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Plant-Based Sports Nutrition Dashboard</h1>
      
      <Tabs defaultValue="calculators" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="calculators">Nutrition Calculators</TabsTrigger>
          <TabsTrigger value="nutrients">Key Nutrients</TabsTrigger>
          <TabsTrigger value="supplements">Supplements Guide</TabsTrigger>
        </TabsList>

        <TabsContent value="calculators">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Weight Input Card */}
            <Card className="col-span-full">
              <CardContent className="pt-6">
                <label className="block mb-2 font-medium">Your Weight (kg)</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-24 p-2 border rounded"
                  min="30"
                  max="200"
                />
              </CardContent>
            </Card>

            {/* Carbohydrate Calculator */}
            <Card>
              <CardHeader>
                <CardTitle>Carbohydrate Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <select
                  value={selectedActivity}
                  onChange={(e) => setSelectedActivity(e.target.value)}
                  className="w-full p-2 mb-4 border rounded"
                >
                  <option value="low">Low Intensity Activities</option>
                  <option value="moderate">Moderate Exercise (1 hour/day)</option>
                  <option value="endurance">Endurance Program (1-3 hours/day)</option>
                  <option value="extreme">Extreme Training (4-5 hours/day)</option>
                </select>
                
                <div className="mt-4">
                  <p className="text-lg">Recommended daily intake:</p>
                  <p className="text-2xl font-bold text-green-600">
                    {calculateCarbs().min} - {calculateCarbs().max}g
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Based on {weight}kg body weight
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Protein Calculator */}
            <Card>
              <CardHeader>
                <CardTitle>Protein Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">General Public:</p>
                    <p className="text-xl">{calculateProtein().general}g/day</p>
                  </div>
                  <div>
                    <p className="font-medium">Endurance Athletes:</p>
                    <p className="text-xl">{calculateProtein().endurance}g/day</p>
                  </div>
                  <div>
                    <p className="font-medium">Strength Athletes:</p>
                    <p className="text-xl">{calculateProtein().strength}g/day</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="nutrients">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {NUTRIENTS_DATA.map((nutrient, index) => (
              <Card key={index} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{nutrient.nutrient_name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="mb-2"><strong>Sources:</strong> {nutrient.sources}</p>
                  {nutrient.supplementation_notes && (
                    <Alert className="mt-2">
                      <Info className="h-4 w-4" />
                      <AlertDescription>{nutrient.supplementation_notes}</AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="supplements">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {SUPPLEMENTS_DATA.map((supplement, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{supplement.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Benefits:</h4>
                    <ul className="list-disc pl-4">
                      {supplement.effects.map((effect, i) => (
                        <li key={i}>{effect}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Concerns:</h4>
                    <ul className="list-disc pl-4 text-red-600">
                      {supplement.concerns.map((concern, i) => (
                        <li key={i}>{concern}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;