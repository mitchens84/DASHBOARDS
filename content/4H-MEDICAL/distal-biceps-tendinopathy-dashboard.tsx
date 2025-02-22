import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Check, AlertTriangle, Clock, ChefHat, Activity, Calendar, Printer, Target, BookOpen } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("diagnosis");

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Distal Biceps Insertional Tendinopathy Management</h1>
        <p className="text-gray-600">Comprehensive Analysis and Treatment Protocol</p>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value)} className="w-full">
        <TabsList className="grid grid-cols-6 w-full">
          <TabsTrigger value="diagnosis">Diagnosis</TabsTrigger>
          <TabsTrigger value="protocol">Protocol</TabsTrigger>
          <TabsTrigger value="remedies">Remedies</TabsTrigger>
          <TabsTrigger value="exercises">Exercises</TabsTrigger>
          <TabsTrigger value="tracking">Tracking</TabsTrigger>
          <TabsTrigger value="print">Print</TabsTrigger>
        </TabsList>

        <TabsContent value="diagnosis">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Clinical Pattern Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-blue-700">Key Symptom Pattern</h3>
                    <div className="mt-2 pl-4 border-l-2 border-blue-200 space-y-2">
                      <p>Pain exhibits a distinctive dual-peak pattern:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Initial concentric loading with wrist supination</li>
                        <li>End-range contraction with internal rotation</li>
                        <li>Localizes to distal biceps insertion region</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-green-700">Biomechanical Signature</h3>
                    <div className="mt-2 pl-4 border-l-2 border-green-200">
                      <p className="mb-2">Position-dependent pain characteristics:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Pain reduces with wider grip (decreased supination torque)</li>
                        <li>Minimal impact on grip strength activities</li>
                        <li>No neurological symptoms present</li>
                      </ul>
                    </div>
                  </div>

                  <Alert className="bg-amber-50">
                    <AlertTitle className="text-amber-800">Working Diagnosis</AlertTitle>
                    <AlertDescription className="space-y-2">
                      <p className="font-medium">Distal Biceps Insertional Tendinopathy</p>
                      <p>Distinguished by its specific relationship to combined elbow flexion and forearm supination stresses.</p>
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="protocol">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Daily Protocol Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold">Morning (10:00 AM)</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Anti-inflammatory dose with small snack</li>
                    <li>Wait 3 hours before exercise</li>
                    <li>Morning assessment protocol</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold">Exercise Window (1:00 PM)</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Pre-exercise mobility work</li>
                    <li>Modified workout routine</li>
                    <li>Post-exercise recovery protocol</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold">Evening (10:00 PM)</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Anti-inflammatory blend</li>
                    <li>Ice therapy if needed</li>
                    <li>Progress tracking</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="remedies">
          <Card>
            <CardHeader>
              <CardTitle>Therapeutic Interventions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold">Anti-inflammatory Blend</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Turmeric: 1 tsp (curcumin)</li>
                    <li>Black pepper: ¼ tsp (bioavailability)</li>
                    <li>Carrier fat: 1 tsp coconut oil</li>
                    <li>Liquid base: 200ml water or milk</li>
                  </ul>
                  <p className="mt-2 text-sm text-gray-600">Mix and heat briefly. Take within 15 minutes.</p>
                </div>
                <Alert className="bg-blue-50">
                  <AlertDescription>
                    Take on an empty stomach or with healthy fat for maximum absorption.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exercises">
          <Card>
            <CardHeader>
              <CardTitle>Exercise Protocol</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold">Pre-Workout (10 mins)</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Wrist flexor/extensor stretches: 30s each</li>
                    <li>Light band rotations: 20 reps each direction</li>
                    <li>Isometric holds: 10s at 30°, 60°, 90°</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold">Exercise Selection</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-green-600">Approved Exercises</h4>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Machine-based pulls</li>
                        <li>Supported rows</li>
                        <li>Limited ROM work</li>
                        <li>Isometric holds</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-red-600">Avoid</h4>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Direct bicep work</li>
                        <li>Heavy pulling</li>
                        <li>Full ROM exercises</li>
                        <li>Explosive movements</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold">Recovery Protocol</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Blood flow work: 2-3 minutes</li>
                    <li>Ice therapy: 10-15 minutes</li>
                    <li>Compression sleeve application</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tracking">
          <Card>
            <CardHeader>
              <CardTitle>Progress Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Morning Assessment</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Resting pain (0-10)</li>
                      <li>Morning stiffness duration</li>
                      <li>Sleep quality impact</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Exercise Testing</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Pain during activity (0-10)</li>
                      <li>Load tolerance</li>
                      <li>Movement quality</li>
                    </ul>
                  </div>
                </div>
                <Alert>
                  <AlertTriangle className="w-4 h-4" />
                  <AlertDescription>
                    Document any unusual symptoms or side effects
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="print">
          <Card className="print:shadow-none">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Daily Tracking Sheet</CardTitle>
                <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 print:hidden">
                  <Printer className="w-4 h-4" />
                  Print
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h2 className="text-lg font-bold mb-2">Progress Tracking</h2>
                  <p className="text-sm text-gray-600">Date: _________________</p>
                </div>
                
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold mb-3">Morning Metrics</h3>
                    <div className="space-y-4">
                      <div>
                        <p>Pain Level (0-10): ____</p>
                        <p>Stiffness Duration: ____ mins</p>
                        <p>Sleep Quality (0-10): ____</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">Exercise Session</h3>
                    <div className="space-y-4">
                      <div>
                        <p>Activity Pain (0-10): ____</p>
                        <p>Load Tolerance (%): ____</p>
                        <p>Recovery Time: ____ mins</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold mb-2">Notes</h3>
                  <div className="border-b border-dotted h-20"></div>
                </div>

                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Protocol Adherence</h3>
                  <div className="space-y-2">
                    <p>□ Morning Protocol (10:00 AM)</p>
                    <p>□ Exercise Protocol</p>
                    <p>□ Evening Protocol (10:00 PM)</p>
                    <p>□ Anti-inflammatory Blend</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
