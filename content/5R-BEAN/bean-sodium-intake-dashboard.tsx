import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, Legend } from 'recharts';
import { Dog, Thermometer, Salad, Heart, Calculator, Book, Stethoscope, Scale, Activity, DropletsIcon } from 'lucide-react';

const SodiumDashboard = () => {
  const data = [{
    name: 'Current Intake',
    commercial: 140,  // Updated based on 75g commercial food
    homemade: 100,
    total: 240
  }];

  const IconListItem = ({ icon: Icon, children }) => (
    <li className="flex items-center gap-2 mb-2">
      <Icon className="h-5 w-5 text-blue-600" />
      <span>{children}</span>
    </li>
  );

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="text-xl mb-2">Daily Sodium Balance Assessment</CardTitle>
        <p className="text-sm text-gray-600">Analysis for Bean: 20kg Adult Female Dog in Thailand</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="h-64 px-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} barSize={60} margin={{ top: 20, right: 60, left: 60, bottom: 20 }}>
                <XAxis dataKey="name" />
                <YAxis domain={[0, 1200]} />
                <Tooltip />
                <Legend verticalAlign="top" />
                <ReferenceLine 
                  y={320} 
                  stroke="#ff0000" 
                  strokeDasharray="3 3"
                  label={{ 
                    value: 'Minimum (320mg)', 
                    position: 'insideRight',
                    fill: '#ff0000',
                    fontSize: 12,
                    offset: 10
                  }} 
                />
                <ReferenceLine 
                  y={800} 
                  stroke="#00ff00" 
                  strokeDasharray="3 3"
                  label={{ 
                    value: 'Optimal (800mg)', 
                    position: 'insideRight',
                    fill: '#00ff00',
                    fontSize: 12,
                    offset: 10
                  }} 
                />
                <Bar dataKey="commercial" stackId="a" fill="#4169E1" name="Commercial Food (75g)" />
                <Bar dataKey="homemade" stackId="a" fill="#82ca9d" name="Home Prepared" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold mb-3">Key Assumptions</h3>
              <ul className="space-y-2 text-sm">
                <IconListItem icon={Dog}>Weight: 20kg adult female</IconListItem>
                <IconListItem icon={Activity}>Activity: Moderate daily exercise</IconListItem>
                <IconListItem icon={Salad}>Diet: 75g commercial, remainder home-prepared</IconListItem>
                <IconListItem icon={Thermometer}>Climate: Tropical (Chiang Mai, Thailand)</IconListItem>
                <IconListItem icon={Heart}>Health: No cardiovascular issues</IconListItem>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-3">Reference Values</h3>
              <ul className="space-y-2 text-sm">
                <IconListItem icon={Scale}>Minimum Required: 320mg/day (NRC, 2006)</IconListItem>
                <IconListItem icon={Calculator}>Optimal Target: 800mg/day (AAFCO, 2019)</IconListItem>
                <IconListItem icon={Book}>Maximum Safe: 6000mg/day (1.5% dry matter)</IconListItem>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h3 className="text-lg font-bold mb-3">Evidence-Based Recommendations</h3>
              <ul className="space-y-2 text-sm grid grid-cols-1 md:grid-cols-2 gap-4">
                <IconListItem icon={Stethoscope}>Verify sodium content in commercial food (WSAVA Guidelines, 2021)</IconListItem>
                <IconListItem icon={Activity}>Consider supplementation during high-activity periods</IconListItem>
                <IconListItem icon={DropletsIcon}>Monitor hydration status in hot weather</IconListItem>
                <IconListItem icon={Calculator}>Track urine specific gravity as sodium indicator</IconListItem>
              </ul>
            </div>

            <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-3">Detailed Calculations</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="font-bold">Base Daily Requirements</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Total daily dry matter intake: 20kg × 2% = 400g</li>
                    <li>Minimum sodium (0.08%): 400g × 0.0008 = 320mg</li>
                    <li>Optimal sodium (0.2%): 400g × 0.002 = 800mg</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold">Current Intake Estimation</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Commercial portion: 75g</li>
                    <li>Commercial sodium (0.3%): 75g × 0.003 = 140mg</li>
                    <li>Home-prepared portion: ~325g</li>
                    <li>Home-prepared sodium (estimated): ~100mg from natural ingredients</li>
                    <li>Total estimated daily intake: 140mg + 100mg = 240mg</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SodiumDashboard;
