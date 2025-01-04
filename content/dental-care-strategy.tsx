import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  Clock, 
  Droplets, 
  Coffee, 
  Apple, 
  Moon,
  Shield,
  Settings,
  Calendar
} from 'lucide-react';

const DentalCareStrategy = () => {
  const dailyRoutines = {
    morning: [
      {
        time: "After Waking",
        steps: [
          "Dry brush without toothpaste (3 minutes)",
          "Rinse thoroughly with filtered water",
          "Gargle with green tea (30 seconds)",
          "Wait 30 minutes before breakfast"
        ]
      }
    ],
    daytime: [
      {
        time: "After Meals/Smoothies",
        steps: [
          "Rinse immediately with water",
          "Wait 30-60 minutes before brushing",
          "Optional green tea gargle",
          "For smoothies: use straw to minimize acid contact"
        ]
      }
    ],
    evening: [
      {
        time: "Before Bed",
        steps: [
          "Floss all teeth",
          "Use Super Floss between crowns 11-21",
          "Brush with toxin-free toothpaste (2 minutes)",
          "Gargle with green tea mouthwash (30 seconds)",
          "No water rinse after - let ingredients work overnight"
        ]
      }
    ]
  };

  const specialCare = {
    infectedGums: [
      "Extra gentle brushing around teeth 11 & 21",
      "Ensure Super Floss reaches below gumline",
      "Extended green tea gargling focusing on front area",
      "Monitor for increased sensitivity or bleeding"
    ],
    crackSensitivity: [
      "Avoid direct pressure on tooth 37 while brushing",
      "Use lukewarm water (avoid temperature extremes)",
      "Clean thoroughly but gently around affected area",
      "Report any changes in sensitivity to dentist"
    ]
  };

  const tools = {
    toothbrush: {
      features: [
        "Extra-soft bristled manual toothbrush",
        "Small-medium head size",
        "Multi-level bristle configuration",
        "Rounded bristle tips",
        "Non-slip ergonomic handle",
        "Replace every 3 months or sooner if bristles fray"
      ],
      cleaning: [
        "Rinse thoroughly after each use",
        "Shake excess water off",
        "Store upright in open air",
        "Weekly deep clean: soak in vinegar-water solution for 30 minutes",
        "Monthly sanitize: hydrogen peroxide solution soak",
        "Never store in closed containers",
        "Keep away from toilet area"
      ]
    },
    flossing: {
      technique: [
        "Use 18 inches of floss",
        "Wind around middle fingers",
        "Hold 1-2 inches between thumbs and forefingers",
        "Guide gently between teeth using C-shape",
        "Slide up and down against tooth surface",
        "Use fresh section for each tooth"
      ],
      superFloss: [
        "Insert stiffened end between crowns 11-21",
        "Pull spongy floss through the space",
        "Clean against both tooth surfaces",
        "Gently work below gumline"
      ]
    },
    mouthwash: {
      greenTea: [
        "Brew strong green tea (2 bags per cup)",
        "Let cool to room temperature",
        "Store in sealed container in fridge",
        "Use within 3 days",
        "Warm to room temperature before use"
      ]
    },
    water: {
      specifications: [
        "Use filtered water (removes chlorine/fluoride)",
        "Room temperature (protect sensitive teeth)",
        "Never use hot water with brush",
        "Consider reverse osmosis system"
      ]
    },
    toothpaste: {
      requirements: [
        "Free from Triclosan",
        "Free from Sodium Lauryl Sulfate (SLS)",
        "Free from artificial sweeteners",
        "Minimal ingredients",
        "Natural antibacterial properties"
      ]
    }
  };

  const IconWrapper = ({ children, color }) => (
    <div className={`p-2 rounded-full ${color} mb-4`}>
      {children}
    </div>
  );

  return (
    <div className="w-full max-w-4xl space-y-6">
      <Card className="border-t-4 border-t-blue-500">
        <CardHeader className="bg-gray-50 rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-6 w-6 text-blue-500" />
            Personalized Dental Care Strategy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="routines">
            <TabsList className="w-full justify-center bg-gray-100 p-1 rounded-lg">
              <TabsTrigger value="routines" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Daily Routines
              </TabsTrigger>
              <TabsTrigger value="special" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Special Care
              </TabsTrigger>
              <TabsTrigger value="tools" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Tools & Techniques
              </TabsTrigger>
            </TabsList>

            <TabsContent value="routines">
              <div className="space-y-6">
                <Card className="border-l-4 border-l-yellow-400">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <IconWrapper color="bg-yellow-100">
                        <Clock className="h-5 w-5 text-yellow-600" />
                      </IconWrapper>
                      <h3 className="font-semibold text-yellow-700">Morning Routine</h3>
                    </div>
                    <ul className="space-y-2 list-disc pl-6">
                      {dailyRoutines.morning[0].steps.map((step, idx) => (
                        <li key={idx} className="text-sm">{step}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-400">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <IconWrapper color="bg-green-100">
                        <Apple className="h-5 w-5 text-green-600" />
                      </IconWrapper>
                      <h3 className="font-semibold text-green-700">After Meals & Smoothies</h3>
                    </div>
                    <ul className="space-y-2 list-disc pl-6">
                      {dailyRoutines.daytime[0].steps.map((step, idx) => (
                        <li key={idx} className="text-sm">{step}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-400">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <IconWrapper color="bg-purple-100">
                        <Moon className="h-5 w-5 text-purple-600" />
                      </IconWrapper>
                      <h3 className="font-semibold text-purple-700">Evening Routine</h3>
                    </div>
                    <ul className="space-y-2 list-disc pl-6">
                      {dailyRoutines.evening[0].steps.map((step, idx) => (
                        <li key={idx} className="text-sm">{step}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="special">
              <div className="space-y-6">
                <Card className="border-l-4 border-l-red-400">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <IconWrapper color="bg-red-100">
                        <Shield className="h-5 w-5 text-red-600" />
                      </IconWrapper>
                      <h3 className="font-semibold text-red-700">Front Teeth (11 & 21) Care</h3>
                    </div>
                    <ul className="space-y-2 list-disc pl-6">
                      {specialCare.infectedGums.map((item, idx) => (
                        <li key={idx} className="text-sm">{item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-orange-400">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <IconWrapper color="bg-orange-100">
                        <Droplets className="h-5 w-5 text-orange-600" />
                      </IconWrapper>
                      <h3 className="font-semibold text-orange-700">Tooth 37 Sensitivity Care</h3>
                    </div>
                    <ul className="space-y-2 list-disc pl-6">
                      {specialCare.crackSensitivity.map((item, idx) => (
                        <li key={idx} className="text-sm">{item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="tools">
              <div className="space-y-6">
                <Card className="border-l-4 border-l-blue-400">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <IconWrapper color="bg-blue-100">
                        <Settings className="h-5 w-5 text-blue-600" />
                      </IconWrapper>
                      <h3 className="font-semibold text-blue-700">Toothbrush Care</h3>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2 text-blue-600">Specifications</h4>
                        <ul className="space-y-2 list-disc pl-6">
                          {tools.toothbrush.features.map((feature, idx) => (
                            <li key={idx} className="text-sm">{feature}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2 text-blue-600">Cleaning & Maintenance</h4>
                        <ul className="space-y-2 list-disc pl-6">
                          {tools.toothbrush.cleaning.map((step, idx) => (
                            <li key={idx} className="text-sm">{step}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-teal-400">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <IconWrapper color="bg-teal-100">
                        <Settings className="h-5 w-5 text-teal-600" />
                      </IconWrapper>
                      <h3 className="font-semibold text-teal-700">Flossing Technique</h3>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2 text-teal-600">Regular Flossing</h4>
                        <ul className="space-y-2 list-disc pl-6">
                          {tools.flossing.technique.map((step, idx) => (
                            <li key={idx} className="text-sm">{step}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2 text-teal-600">Super Floss for Crowns</h4>
                        <ul className="space-y-2 list-disc pl-6">
                          {tools.flossing.superFloss.map((step, idx) => (
                            <li key={idx} className="text-sm">{step}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-400">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <IconWrapper color="bg-green-100">
                        <Coffee className="h-5 w-5 text-green-600" />
                      </IconWrapper>
                      <h3 className="font-semibold text-green-700">Green Tea Mouthwash</h3>
                    </div>
                    <ul className="space-y-2 list-disc pl-6">
                      {tools.mouthwash.greenTea.map((step, idx) => (
                        <li key={idx} className="text-sm">{step}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-cyan-400">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <IconWrapper color="bg-cyan-100">
                        <Droplets className="h-5 w-5 text-cyan-600" />
                      </IconWrapper>
                      <h3 className="font-semibold text-cyan-700">Water Specifications</h3>
                    </div>
                    <ul className="space-y-2 list-disc pl-6">
                      {tools.water.specifications.map((spec, idx) => (
                        <li key={idx} className="text-sm">{spec}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-indigo-400">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <IconWrapper color="bg-indigo-100">
                        <Shield className="h-5 w-5 text-indigo-600" />
                      </IconWrapper>
                      <h3 className="font-semibold text-indigo-700">Toothpaste Requirements</h3>
                    </div>
                    <ul className="space-y-2 list-disc pl-6">
                      {tools.toothpaste.requirements.map((req, idx) => (
                        <li key={idx} className="text-sm">{req}</li>
                      ))}
                    </ul>
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

export default DentalCareStrategy;
