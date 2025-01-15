import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Star, Shield, Beaker, Leaf, Clock, 
  AlertTriangle, Heart, Dog, Scale, 
  Plus, ArrowRight, Info 
} from 'lucide-react';

// Enhanced rating system with visual indicators
const RatingIndicator = ({ value, maxValue = 10, type = "evidence" }) => {
  const colors = {
    evidence: "bg-blue-500",
    safety: "bg-green-500",
    palatability: "bg-purple-500",
    synergy: "bg-amber-500"
  };
  
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {[...Array(maxValue)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-4 rounded ${
              i < value ? colors[type] : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
      <span className="text-sm text-gray-600">{value}/{maxValue}</span>
    </div>
  );
};

// Comprehensive ingredient database
const ingredients = {
  turmeric: {
    name: "Turmeric",
    icon: "🌿",
    ratings: {
      evidence: 9,
      safetyHuman: 9,
      safetyCanine: 8,
      palatability: 3
    },
    properties: {
      keyCompounds: ["Curcumin", "Turmerones"],
      benefits: [
        "Anti-inflammatory",
        "Antioxidant",
        "Joint support"
      ],
      preparation: {
        methods: [
          {
            name: "Basic Powder",
            instructions: "Use as is or combine with black pepper",
            storage: "6 months in airtight container",
            notes: "Best stored in dark glass"
          },
          {
            name: "Enhanced Paste",
            instructions: "Combine with black pepper and healthy fat",
            storage: "2 weeks refrigerated",
            notes: "Monitor for fermentation"
          }
        ],
        optimal: "Combined with black pepper (1:16 ratio) and fat"
      },
      safety: {
        human: {
          cautions: ["Monitor if on blood thinners", "May affect iron absorption"],
          dosage: "1/4-1 tsp daily",
          timing: "Best with meals containing fat"
        },
        canine: {
          cautions: ["Start with small amounts", "Monitor digestion"],
          dosage: "1/8-1/4 tsp per 10kg body weight",
          timing: "Mix with food"
        }
      },
      synergies: [
        {
          partner: "Black Pepper",
          effect: "2000% increase in bioavailability",
          evidence: "Strong clinical support",
          ratio: "1 part pepper to 16 parts turmeric"
        },
        {
          partner: "Ginger",
          effect: "Enhanced anti-inflammatory action",
          evidence: "Moderate research support",
          ratio: "Equal parts recommended"
        }
      ]
    }
  },
  ginger: {
    name: "Ginger",
    icon: "🌿",
    ratings: {
      evidence: 7,
      safetyHuman: 9,
      safetyCanine: 7,
      palatability: 4
    },
    properties: {
      keyCompounds: ["Gingerols", "Shogaols"],
      benefits: [
        "Digestive support",
        "Anti-inflammatory",
        "Nausea relief"
      ],
      preparation: {
        methods: [
          {
            name: "Fresh Root",
            instructions: "Grate or slice thinly",
            storage: "3 weeks refrigerated",
            notes: "Best when firm and fragrant"
          },
          {
            name: "Dried Powder",
            instructions: "Use as is or rehydrate",
            storage: "6 months in airtight container",
            notes: "Store away from heat and light"
          }
        ],
        optimal: "Fresh root preferred for maximum benefits"
      },
      safety: {
        human: {
          cautions: ["May interact with blood thinners", "Monitor blood sugar"],
          dosage: "1/4-1 tsp powder or 1-2 tsp fresh grated",
          timing: "Can be taken with or between meals"
        },
        canine: {
          cautions: ["Start with very small amounts", "Monitor for GI sensitivity"],
          dosage: "1/16-1/8 tsp powder per 10kg body weight",
          timing: "Best given with food"
        }
      },
      synergies: [
        {
          partner: "Turmeric",
          effect: "Enhanced anti-inflammatory action",
          evidence: "Moderate research support",
          ratio: "Equal parts recommended"
        }
      ]
    }
  }
  // Additional ingredients would follow same structure
};

// Main dashboard component
const IngredientDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedIngredient, setSelectedIngredient] = useState('turmeric');

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      {/* Header Section */}
      <div className="text-center py-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
        <h1 className="text-4xl font-bold mb-2">
          Ingredient Intelligence System
        </h1>
        <p className="text-xl text-gray-600">
          Evidence-Based Profiles & Synergistic Relationships
        </p>
      </div>

      {/* Ingredient Selection */}
      <div className="flex gap-2 mb-4">
        {Object.entries(ingredients).map(([key, ingredient]) => (
          <button
            key={key}
            onClick={() => setSelectedIngredient(key)}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              selectedIngredient === key 
                ? 'bg-blue-100 border-blue-500' 
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <span>{ingredient.icon}</span>
            {ingredient.name}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">
                  {ingredients[selectedIngredient].icon}
                </span>
                {ingredients[selectedIngredient].name}
              </CardTitle>
              <CardDescription>
                Comprehensive evidence-based profile
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                Evidence Rating: {ingredients[selectedIngredient].ratings.evidence}/10
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="profile" className="w-full">
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="safety">Safety</TabsTrigger>
              <TabsTrigger value="synergies">Synergies</TabsTrigger>
              <TabsTrigger value="preparation">Preparation</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Ratings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Evidence Strength</h3>
                      <RatingIndicator 
                        value={ingredients[selectedIngredient].ratings.evidence} 
                        type="evidence"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Safety Profile</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Heart className="w-4 h-4" />
                          <span>Human:</span>
                          <RatingIndicator 
                            value={ingredients[selectedIngredient].ratings.safetyHuman}
                            type="safety"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Dog className="w-4 h-4" />
                          <span>Canine:</span>
                          <RatingIndicator 
                            value={ingredients[selectedIngredient].ratings.safetyCanine}
                            type="safety"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Palatability (Canine)</h3>
                      <RatingIndicator 
                        value={ingredients[selectedIngredient].ratings.palatability}
                        maxValue={4}
                        type="palatability"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Key Benefits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {ingredients[selectedIngredient].properties.benefits.map((benefit, idx) => (
                          <Badge key={idx} variant="secondary">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Active Compounds</h3>
                        <div className="flex flex-wrap gap-2">
                          {ingredients[selectedIngredient].properties.keyCompounds.map((compound, idx) => (
                            <Badge key={idx} variant="outline">
                              {compound}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Safety Tab */}
            <TabsContent value="safety">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="w-5 h-5" />
                      Human Safety Guidelines
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Dosage</h3>
                      <p className="text-gray-600">
                        {ingredients[selectedIngredient].properties.safety.human.dosage}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Timing</h3>
                      <p className="text-gray-600">
                        {ingredients[selectedIngredient].properties.safety.human.timing}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Cautions</h3>
                      <ul className="list-disc pl-4 space-y-1">
                        {ingredients[selectedIngredient].properties.safety.human.cautions.map((caution, idx) => (
                          <li key={idx} className="text-gray-600">{caution}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Dog className="w-5 h-5" />
                      Canine Safety Guidelines
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Dosage</h3>
                      <p className="text-gray-600">
                        {ingredients[selectedIngredient].properties.safety.canine.dosage}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Timing</h3>
                      <p className="text-gray-600">
                        {ingredients[selectedIngredient].properties.safety.canine.timing}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Cautions</h3>
                      <ul className="list-disc pl-4 space-y-1">
                        {ingredients[selectedIngredient].properties.safety.canine.cautions.map((caution, idx) => (
                          <li key={idx} className="text-gray-600">{caution}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Synergies Tab */}
            <TabsContent value="synergies">
              <div className="space-y-4">
                {ingredients[selectedIngredient].properties.synergies.map((synergy, idx) => (
                  <Card key={idx}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Plus className="w-5 h-5" />
                        {ingredients[selectedIngredient].name} + {synergy.partner}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">Effect</h3>
                        <p className="text-gray-600">{synergy.effect}</p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Evidence</h3>
                        <p className="text-gray-600">{synergy.evidence}</p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Recommended Ratio</h3>
                        <p className="text-gray-600">{synergy.ratio}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Preparation Tab */}
            <TabsContent value="preparation">
            <div className="space-y-4">
              {ingredients[selectedIngredient].properties.preparation.methods.map((method, idx) => (
                <Card key={idx}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Beaker className="w-5 h-5" />
                      {method.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Instructions</h3>
                      <p className="text-gray-600">{method.instructions}</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Storage</h3>
                      <p className="text-gray-600">{method.storage}</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Notes</h3>
                      <p className="text-gray-600">{method.notes}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Optimal Preparation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {ingredients[selectedIngredient].properties.preparation.optimal}
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  </div>
);
};

export default IngredientDashboard;