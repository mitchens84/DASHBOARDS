import React, { useState } from 'react';
import { 
  LineChart, Line, AreaChart, Area, ComposedChart,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Bar, ReferenceLine
} from 'recharts';
import { 
  Sun, 
  Shield, 
  Leaf, 
  Umbrella,
  Apple, 
  ThermometerSun, 
  Info,
  Baseline // Replace Hat with Baseline icon
} from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const HolisticProtection = () => {
  // Comprehensive protection data including all defense layers
  const protectionData = [
    { time: '6:00', uvIndex: 0, sunscreen: 0, physical: 40, dietary: 30, totalProtection: 70, application: false },
    { time: '7:00', uvIndex: 2, sunscreen: 0, physical: 40, dietary: 30, totalProtection: 70, application: false },
    { time: '8:00', uvIndex: 4, sunscreen: 95, physical: 40, dietary: 30, totalProtection: 98, application: true },
    { time: '9:00', uvIndex: 6, sunscreen: 90, physical: 40, dietary: 30, totalProtection: 95, application: false },
    { time: '10:00', uvIndex: 8, sunscreen: 85, physical: 40, dietary: 30, totalProtection: 92, application: false },
    { time: '11:00', uvIndex: 10, sunscreen: 80, physical: 40, dietary: 30, totalProtection: 90, application: false },
    { time: '12:00', uvIndex: 11, sunscreen: 75, physical: 40, dietary: 30, totalProtection: 88, application: false },
    { time: '13:00', uvIndex: 11, sunscreen: 70, physical: 40, dietary: 30, totalProtection: 85, application: false },
    { time: '14:00', uvIndex: 10, sunscreen: 95, physical: 40, dietary: 30, totalProtection: 98, application: true },
    { time: '15:00', uvIndex: 8, sunscreen: 90, physical: 40, dietary: 30, totalProtection: 95, application: false },
    { time: '16:00', uvIndex: 6, sunscreen: 85, physical: 40, dietary: 30, totalProtection: 92, application: false },
    { time: '17:00', uvIndex: 4, sunscreen: 80, physical: 40, dietary: 30, totalProtection: 90, application: false },
    { time: '18:00', uvIndex: 2, sunscreen: 75, physical: 40, dietary: 30, totalProtection: 88, application: false }
  ];

  const physicalProtection = {
    hat: {
      type: 'Wide-brimmed hat',
      protection: '27% reduction in facial UV exposure',
      coverage: 'Face, ears, neck',
      notes: 'Most effective 10am-2pm'
    },
    clothing: {
      type: 'UPF 50+ clothing',
      protection: '98% UV blockage',
      coverage: 'Covered areas',
      notes: 'Lightweight, breathable fabrics recommended'
    },
    shade: {
      type: 'Structural shade',
      protection: '50-95% UV reduction',
      coverage: 'Full body when utilized',
      notes: 'Effectiveness varies by time and structure'
    }
  };

  const dietaryProtection = [
    { 
      nutrient: 'Polyphenols',
      foods: 'Green tea, berries, dark chocolate',
      mechanism: 'Antioxidant, anti-inflammatory',
      protection: 'Internal UV defense boost'
    },
    {
      nutrient: 'Carotenoids',
      foods: 'Sweet potatoes, carrots, leafy greens',
      mechanism: 'Photoprotective compounds',
      protection: 'Skin cell defense enhancement'
    },
    {
      nutrient: 'Omega-3s',
      foods: 'Fatty fish, chia seeds, walnuts',
      mechanism: 'Membrane protection',
      protection: 'Cellular resilience'
    }
  ];

  const [activeSection, setActiveSection] = useState('overview');

  return (
    <div className="w-full bg-white rounded-lg shadow-lg">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold">Integrated Sun Protection System</h2>
        <p className="text-gray-600">Optimized for twice-daily application in Chiang Mai</p>
      </div>

      <div className="p-6">
        {/* Main Protection Chart */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Daily Protection Profile</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={protectionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="dietary"
                  stackId="1"
                  fill="#82ca9d"
                  stroke="#82ca9d"
                  name="Dietary Protection"
                />
                <Area
                  type="monotone"
                  dataKey="physical"
                  stackId="1"
                  fill="#8884d8"
                  stroke="#8884d8"
                  name="Physical Protection"
                />
                <Area
                  type="monotone"
                  dataKey="sunscreen"
                  stackId="1"
                  fill="#ffc658"
                  stroke="#ffc658"
                  name="Sunscreen Protection"
                />
                <Line
                  type="monotone"
                  dataKey="uvIndex"
                  stroke="#ff7300"
                  name="UV Index"
                />
                <ReferenceLine
                  y={85}
                  label="Minimum Protection Threshold"
                  stroke="red"
                  strokeDasharray="3 3"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Application Schedule */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold flex items-center mb-3">
              <Shield className="w-4 h-4 mr-2" />
              Morning Application (8:00)
            </h4>
            <ul className="space-y-2 text-sm">
              <li>• Initial protection layer: 2.5ml</li>
              <li>• Covers morning peak UV period</li>
              <li>• Combine with physical protection</li>
              <li>• Focus on even coverage</li>
            </ul>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold flex items-center mb-3">
              <Shield className="w-4 h-4 mr-2" />
              Afternoon Application (14:00)
            </h4>
            <ul className="space-y-2 text-sm">
              <li>• Renewal layer: 2.0ml</li>
              <li>• Covers afternoon activities</li>
              <li>• Adjust timing based on outdoor exposure</li>
              <li>• Maintain physical protection</li>
            </ul>
          </div>
        </div>

        {/* Physical Protection */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Physical Protection Layer</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(physicalProtection).map(([key, data]) => (
              <div key={key} className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium capitalize flex items-center mb-2">
                  <Baseline className="w-4 h-4 mr-2" /> {/* Replace Hat with Baseline */}
                  {key}
                </h4>
                <div className="text-sm space-y-1">
                  <p className="text-blue-600">{data.protection}</p>
                  <p className="text-gray-600">Coverage: {data.coverage}</p>
                  <p className="text-gray-500 text-xs">{data.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dietary Protection */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Internal Protection Support</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {dietaryProtection.map((item, index) => (
              <div key={index} className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium flex items-center mb-2">
                  <Leaf className="w-4 h-4 mr-2" />
                  {item.nutrient}
                </h4>
                <div className="text-sm space-y-1">
                  <p className="text-green-600">{item.foods}</p>
                  <p className="text-gray-600">{item.mechanism}</p>
                  <p className="text-gray-500 text-xs">{item.protection}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Important Notes */}
        <Alert className="mt-6">
          <AlertTitle className="flex items-center">
            <Info className="w-4 h-4 mr-2" />
            Optimal Protection Strategy
          </AlertTitle>
          <AlertDescription>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Combine all three protection layers for maximum effectiveness</li>
              <li>Physical protection is consistent and reliable throughout the day</li>
              <li>Dietary protection provides baseline cellular defense</li>
              <li>Adjust application timing based on outdoor exposure patterns</li>
              <li>Monitor UV index for additional protection needs</li>
            </ul>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default HolisticProtection;
