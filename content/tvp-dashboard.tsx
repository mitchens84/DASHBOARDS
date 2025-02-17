import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Check, X, ThermometerSun, Clock, Droplets, ShoppingBag, Home, AlertTriangle } from 'lucide-react';

const Section = ({ title, children }) => (
  <Card className="w-full mb-4">
    <CardHeader>
      <CardTitle className="text-lg font-semibold">{title}</CardTitle>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

const RiskItem = ({ risk, impact, mitigation }) => (
  <div className="mb-4 p-4 border rounded-lg bg-gray-50">
    <div className="flex items-center mb-2">
      <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
      <h3 className="font-semibold">{risk}</h3>
    </div>
    <p className="text-gray-600 mb-2">Impact: {impact}</p>
    <p className="text-gray-600">Mitigation: {mitigation}</p>
  </div>
);

const PrepStep = ({ step, description }) => (
  <div className="flex items-start mb-3">
    <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center mr-3 mt-1">
      {step}
    </div>
    <p className="flex-1">{description}</p>
  </div>
);

const ChecklistItem = ({ text, good }) => (
  <div className="flex items-center mb-2">
    {good ? (
      <Check className="w-5 h-5 text-green-500 mr-2" />
    ) : (
      <X className="w-5 h-5 text-red-500 mr-2" />
    )}
    <span>{text}</span>
  </div>
);

export default function TVPDashboard() {
  const [activeTab, setActiveTab] = useState('health');

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">TVP Safety & Preparation Guide</h1>
      
      <Tabs defaultValue="health" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="health">Health</TabsTrigger>
          <TabsTrigger value="preparation">Preparation</TabsTrigger>
          <TabsTrigger value="storage">Storage</TabsTrigger>
          <TabsTrigger value="sourcing">Sourcing</TabsTrigger>
          <TabsTrigger value="principles">Principles</TabsTrigger>
        </TabsList>

        <TabsContent value="health">
          <Section title="Key Health Concerns">
            <RiskItem 
              risk="Hexane Residue"
              impact="Potential neurotoxicity from solvent residues"
              mitigation="Source organic/hexane-free TVP, thorough rinsing, proper cooking"
            />
            <RiskItem 
              risk="Processing Aids"
              impact="Chemical residues from manufacturing process"
              mitigation="Extended soaking, multiple water changes, pressure cooking"
            />
            <RiskItem 
              risk="Thailand-Specific"
              impact="Higher risk due to climate and variable standards"
              mitigation="Careful supplier selection, proper storage, regular inspection"
            />
          </Section>
        </TabsContent>

        <TabsContent value="preparation">
          <Section title="Preparation Methods">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Basic Rehydration Process</h3>
                <PrepStep step="1" description="Use 2-3 parts hot water (80°C+) for 1 part TVP" />
                <PrepStep step="2" description="Soak smaller pieces 10 mins, larger pieces 20-30 mins" />
                <PrepStep step="3" description="Drain and rinse thoroughly" />
                <PrepStep step="4" description="Cook thoroughly (internal temp 74°C minimum)" />
              </div>

              <div>
                <h3 className="font-semibold mb-3">Advanced Safety Methods</h3>
                <PrepStep step="1" description="Multiple rinse cycles before and after soaking" />
                <PrepStep step="2" description="Use pressure cooking when possible" />
                <PrepStep step="3" description="Verify complete hydration before cooking" />
                <PrepStep step="4" description="Monitor internal temperature with thermometer" />
              </div>
            </div>
          </Section>
        </TabsContent>

        <TabsContent value="storage">
          <Section title="Storage Guidelines">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Dry Storage</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChecklistItem text="Keep below 20°C" good={true} />
                  <ChecklistItem text="Airtight container" good={true} />
                  <ChecklistItem text="Away from direct sunlight" good={true} />
                  <ChecklistItem text="High humidity exposure" good={false} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Prepared Storage</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChecklistItem text="Use within 3-4 days" good={true} />
                  <ChecklistItem text="Keep refrigerated" good={true} />
                  <ChecklistItem text="Cool completely before storing" good={true} />
                  <ChecklistItem text="Room temperature storage" good={false} />
                </CardContent>
              </Card>
            </div>
          </Section>
        </TabsContent>

        <TabsContent value="sourcing">
          <Section title="Sourcing Guidelines">
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-blue-50">
                <h3 className="font-semibold mb-2">Preferred Characteristics</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Certified organic (hexane-free)
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Proper packaging with clear labeling
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Known manufacturer with quality certifications
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Clear production/expiration dates
                  </li>
                </ul>
              </div>

              <div className="p-4 border rounded-lg bg-red-50">
                <h3 className="font-semibold mb-2">Warning Signs</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <X className="w-4 h-4 text-red-500 mr-2" />
                    Unclear origin or manufacturer
                  </li>
                  <li className="flex items-center">
                    <X className="w-4 h-4 text-red-500 mr-2" />
                    Damaged or compromised packaging
                  </li>
                  <li className="flex items-center">
                    <X className="w-4 h-4 text-red-500 mr-2" />
                    Missing or unclear date information
                  </li>
                  <li className="flex items-center">
                    <X className="w-4 h-4 text-red-500 mr-2" />
                    Signs of moisture or contamination
                  </li>
                </ul>
              </div>
            </div>
          </Section>
        </TabsContent>

        <TabsContent value="principles">
          <Section title="Key Principles">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-3">Quality Indicators</h3>
                <ul className="space-y-2">
                  <li>Uniform color and texture</li>
                  <li>No off-odors</li>
                  <li>Complete hydration when prepared</li>
                  <li>Proper heat penetration during cooking</li>
                </ul>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-3">Safety Priorities</h3>
                <ul className="space-y-2">
                  <li>Complete hydration before cooking</li>
                  <li>Proper temperature control</li>
                  <li>Clean storage conditions</li>
                  <li>Regular quality checks</li>
                </ul>
              </div>
            </div>
          </Section>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <div className="flex items-center mb-2">
          <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
          <h3 className="font-semibold">Thailand-Specific Considerations</h3>
        </div>
        <ul className="space-y-2">
          <li>Extra attention to storage due to high humidity</li>
          <li>More frequent quality checks recommended</li>
          <li>Careful supplier verification important</li>
          <li>Consider smaller purchase quantities</li>
        </ul>
      </div>
    </div>
  );
}
