import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../src/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../src/components/ui/card';
import { Badge } from '../../src/components/ui/badge';
import { ScrollArea } from '../../src/components/ui/scroll-area';
import { 
  Brain, Heart, Shield, Leaf, Sun, Moon, 
  Droplets, Flame, Activity, Scale, Sprout,
  Star, Info, AlertCircle, Clock, Plus 
} from 'lucide-react';

// Define comprehensive data structures
const healthCategories = {
  antiInflammatory: {
    icon: <Flame className="w-5 h-5" />,
    title: "Anti-Inflammatory Support",
    description: "Evidence-based blends for inflammation and pain management",
    recipes: [
      {
        name: "Core Anti-Inflammatory Blend",
        type: "Universal Base",
        ingredients: [
          { name: "Turmeric", amount: "2 tsp", rating: 9, icon: "🌿" },
          { name: "Black Pepper", amount: "1/4 tsp", rating: 8, icon: "🌶️" },
          { name: "Ginger", amount: "1 tsp", rating: 7, icon: "🌿" }
        ],
        preparation: {
          dry: "Combine ingredients in airtight dark glass container. Use within 3 months.",
          wet: "Create paste with small amount of water or oil. Refrigerate, use within 1 week."
        },
        usage: {
          food: "Add 1/2-1 tsp to cooked dishes",
          beverage: "Mix into warm (not hot) liquid with healthy fat"
        },
        evidence: "Multiple clinical trials show reduced inflammation markers",
        timing: "Best taken with meals containing healthy fats"
      }
    ]
  },
  digestive: {
    icon: <Droplets className="w-5 h-5" />,
    title: "Digestive Health",
    description: "Optimize digestion and gut health",
    recipes: [
      {
        name: "Digestive Harmony Blend",
        type: "Meal Support",
        ingredients: [
          { name: "Ginger", amount: "1 tsp", rating: 7, icon: "🌿" },
          { name: "Fennel", amount: "1 tsp", rating: 7, icon: "🌱" },
          { name: "Cardamom", amount: "1/2 tsp", rating: 9, icon: "🌶️" }
        ],
        preparation: {
          dry: "Combine ground spices in airtight container",
          wet: "Create tea infusion with hot water"
        },
        usage: {
          food: "Add to dishes during or after cooking",
          beverage: "Steep 1 tsp in hot water for 5-10 minutes"
        },
        evidence: "Traditional use supported by modern studies",
        timing: "Take 15-30 minutes before meals"
      }
    ]
  },
  cognitive: {
    icon: <Brain className="w-5 h-5" />,
    title: "Cognitive Enhancement",
    description: "Support mental clarity and focus",
    recipes: [
      {
        name: "Mental Clarity Blend",
        type: "Daily Support",
        ingredients: [
          { name: "Rosemary", amount: "1 tsp", rating: 9, icon: "🌿" },
          { name: "Sage", amount: "1 tsp", rating: 8, icon: "🌿" },
          { name: "Ceylon Cinnamon", amount: "1/2 tsp", rating: 7, icon: "🌶️" }
        ],
        preparation: {
          dry: "Mix herbs and store in airtight container",
          wet: "Create tea infusion"
        },
        usage: {
          food: "Add to savory dishes",
          beverage: "Steep as tea"
        },
        evidence: "Research supports cognitive benefits",
        timing: "Best used in morning or early afternoon"
      }
    ]
  },
  immune: {
    icon: <Shield className="w-5 h-5" />,
    title: "Immune Support",
    description: "Enhance immune system function",
    recipes: [
      {
        name: "Immune Defense Blend",
        type: "Preventive",
        ingredients: [
          { name: "Garlic", amount: "1 tsp", rating: 8, icon: "🌿" },
          { name: "Oregano", amount: "1 tsp", rating: 9, icon: "🌿" },
          { name: "Thyme", amount: "1 tsp", rating: 8, icon: "🌿" }
        ],
        preparation: {
          dry: "Mix dried herbs together",
          wet: "Infuse in apple cider vinegar"
        },
        usage: {
          food: "Add to savory dishes",
          beverage: "Make tea infusion"
        },
        evidence: "Strong antimicrobial properties documented",
        timing: "Regular daily use for prevention"
      }
    ]
  }
};

// Comprehensive ingredient database with evidence ratings
const ingredientLibrary = {
  turmeric: {
    name: "Turmeric",
    rating: 9,
    icon: "🌿",
    keyBenefits: ["Anti-inflammatory", "Antioxidant"],
    safetyNotes: "Well-tolerated; use with black pepper",
    synergies: ["Black Pepper", "Ginger"],
    evidence: "Strong clinical trial support",
    usage: {
      food: "Add to curries, soups, rice dishes",
      beverage: "Golden milk, teas",
      optimal: "Combined with black pepper and fat"
    }
  },
  cardamom: {
    name: "Cardamom",
    rating: 9,
    icon: "🌶️",
    keyBenefits: ["Digestive support", "Antioxidant"],
    safetyNotes: "Generally well-tolerated",
    synergies: ["Cinnamon", "Ginger"],
    evidence: "Traditional use supported by studies",
    usage: {
      food: "Curries, baked goods, rice dishes",
      beverage: "Teas, coffee",
      optimal: "Freshly ground pods"
    }
  },
  oregano: {
    name: "Oregano",
    rating: 9,
    icon: "🌿",
    keyBenefits: ["Antimicrobial", "Antioxidant"],
    safetyNotes: "Strong herb - use as directed",
    synergies: ["Thyme", "Rosemary"],
    evidence: "Potent antimicrobial properties proven",
    usage: {
      food: "Mediterranean dishes, marinades",
      beverage: "Herbal tea infusions",
      optimal: "Added near end of cooking"
    }
  },
  ginger: {
    name: "Ginger",
    rating: 7,
    icon: "🌿",
    keyBenefits: ["Anti-inflammatory", "Digestive aid"],
    safetyNotes: "Monitor with medications",
    synergies: ["Turmeric", "Black Pepper"],
    evidence: "Multiple clinical trials support benefits",
    usage: {
      food: "Stir-fries, soups, marinades",
      beverage: "Teas, smoothies",
      optimal: "Fresh root preferred"
    }
  }
};

// Synergy relationships with evidence ratings
const synergyMap = [
  {
    primary: "Turmeric",
    secondary: "Black Pepper",
    effect: "2000% increase in bioavailability",
    strength: "Strong",
    evidence: "Multiple clinical trials",
    details: "Piperine in black pepper enhances curcumin absorption"
  },
  {
    primary: "Rosemary",
    secondary: "Sage",
    effect: "Enhanced cognitive benefits",
    strength: "Moderate",
    evidence: "Traditional use + modern studies",
    details: "Complementary compounds support memory"
  },
  {
    primary: "Ginger",
    secondary: "Turmeric",
    effect: "Enhanced anti-inflammatory action",
    strength: "Moderate",
    evidence: "Research supported",
    details: "Synergistic effect on inflammation pathways"
  }
];

const TherapeuticBlendSystem = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      {/* Main Header */}
      <div className="text-center py-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
        <h1 className="text-4xl font-bold mb-2">
          Therapeutic Herb & Spice System
        </h1>
        <p className="text-xl text-gray-600">
          Evidence-Based Blends for Health & Wellness
        </p>
      </div>

      {/* Main Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-4">
          <TabsTrigger value="overview">System Overview</TabsTrigger>
          <TabsTrigger value="recipes">Health Recipes</TabsTrigger>
          <TabsTrigger value="ingredients">Ingredient Library</TabsTrigger>
          <TabsTrigger value="synergies">Synergy Map</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Quick Reference Guide</CardTitle>
              <CardDescription>
                Navigate to specific health outcomes and their evidence-based blends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(healthCategories).map(([key, category]) => (
                  <Card key={key} className="border-l-4 border-l-blue-500">
                    <CardHeader className="flex flex-row items-center space-x-2">
                      {category.icon}
                      <div>
                        <CardTitle className="text-lg">{category.title}</CardTitle>
                        <CardDescription className="text-sm">
                          {category.description}
                        </CardDescription>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recipes Tab */}
        <TabsContent value="recipes">
          <Tabs defaultValue="antiInflammatory" className="w-full">
            <TabsList className="flex flex-wrap gap-2 mb-4">
              {Object.entries(healthCategories).map(([key, category]) => (
                <TabsTrigger key={key} value={key} className="flex items-center gap-2">
                  {category.icon}
                  {category.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(healthCategories).map(([key, category]) => (
              <TabsContent key={key} value={key}>
                <ScrollArea className="h-[600px] w-full rounded-md border p-4">
                  {category.recipes.map((recipe, idx) => (
                    <Card key={idx} className="mb-4">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2">
                            {category.icon}
                            {recipe.name}
                          </CardTitle>
                          <Badge variant="outline">{recipe.type}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Recipe content... */}
                      </CardContent>
                    </Card>
                  ))}
                </ScrollArea>
              </TabsContent>
            ))}
          </Tabs>
        </TabsContent>

        {/* Ingredients Tab */}
        <TabsContent value="ingredients">
          <Card>
            <CardHeader>
              <CardTitle>Evidence-Based Ingredient Library</CardTitle>
              <CardDescription>
                Comprehensive guide to therapeutic herbs and spices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(ingredientLibrary).map(([key, ingredient]) => (
                  <Card key={key} className="border-l-4 border-l-green-500">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <span>{ingredient.icon}</span>
                          {ingredient.name}
                        </CardTitle>
                        <Badge variant="outline">Rating: {ingredient.rating}/10</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div>
                        <h4 className="font-medium">Key Benefits:</h4>
                        <div className="flex gap-2 mt-1 flex-wrap">
                          {ingredient.keyBenefits.map((benefit, idx) => (
                            <Badge key={idx} variant="secondary">{benefit}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium">Usage:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>Food: {ingredient.usage.food}</li>
                          <li>Beverage: {ingredient.usage.beverage}</li>
                          <li>Optimal: {ingredient.usage.optimal}</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium">Evidence:</h4>
                        <p className="text-sm text-gray-600">{ingredient.evidence}</p>
                      </div>
                      <div>
                        <h4 className="font-medium">Synergies:</h4>
                        <div className="flex gap-2 mt-1 flex-wrap">
                          {ingredient.synergies.map((syn, idx) => (
                            <Badge key={idx} variant="outline">{syn}</Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Synergies Tab */}
        <TabsContent value="synergies">
          <Card>
            <CardHeader>
              <CardTitle>Synergy Map</CardTitle>
              <CardDescription>
                Evidence-based interactions between herbs and spices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
              {synergyMap.map((synergy, idx) => (
                  <Card key={idx} className="border-l-4 border-l-purple-500">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          {synergy.primary} + {synergy.secondary}
                        </CardTitle>
                        <Badge 
                          variant={synergy.strength === 'Strong' ? 'default' : 'secondary'}
                        >
                          {synergy.strength}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div>
                        <h4 className="font-medium">Effect:</h4>
                        <p className="text-sm text-gray-600">{synergy.effect}</p>
                      </div>
                      <div>
                        <h4 className="font-medium">Evidence:</h4>
                        <p className="text-sm text-gray-600">{synergy.evidence}</p>
                      </div>
                      <div>
                        <h4 className="font-medium">Details:</h4>
                        <p className="text-sm text-gray-600">{synergy.details}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Synergy Guidelines */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Synergy Guidelines</CardTitle>
              <CardDescription>
                Best practices for combining herbs and spices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">General Principles:</h3>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Start with proven combinations</li>
                    <li>Consider timing of consumption</li>
                    <li>Monitor individual responses</li>
                    <li>Adjust ratios based on needs</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Safety Considerations:</h3>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Start with small amounts when combining</li>
                    <li>Monitor for any sensitivities</li>
                    <li>Consider medication interactions</li>
                    <li>Adjust based on individual tolerance</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Universal Footer Guidelines */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Usage Guidelines</CardTitle>
          <CardDescription>
            Universal principles for optimal benefits
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Storage</h3>
              <ul className="list-disc pl-4 space-y-1">
                <li>Use airtight containers</li>
                <li>Store in cool, dark place</li>
                <li>Monitor freshness regularly</li>
                <li>Replace after recommended period</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Preparation</h3>
              <ul className="list-disc pl-4 space-y-1">
                <li>Use recommended measurements</li>
                <li>Consider fresh vs dried ratios</li>
                <li>Follow optimal timing guidelines</li>
                <li>Monitor heat exposure</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Integration</h3>
              <ul className="list-disc pl-4 space-y-1">
                <li>Start with small amounts</li>
                <li>Build up gradually</li>
                <li>Monitor individual response</li>
                <li>Adjust based on needs</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TherapeuticBlendSystem;