import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
  Calculator, Sun, Shield, Droplets, 
  ThermometerSun, Info, Settings 
} from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const SunscreenCalculator = () => {
  // Base parameters for BOJ Aqua Fresh
  const defaultParams = {
    spf: 57.9,
    uvaPf: 19.3,
    applicationAmount: 2.0, // mL
    activityLevel: 1, // 1-3 scale
    humidity: 70, // percentage
    reapplicationInterval: 4, // hours
    physicalProtection: 40, // percentage
    uvIndex: 11, // Chiang Mai max
  };

  const [params, setParams] = useState(defaultParams);
  const [results, setResults] = useState(null);

  // Calculate protection metrics
  const calculateProtection = () => {
    // SPF effectiveness scaled by application amount
    const applicationScale = params.applicationAmount / 2.0; // 2.0mL is standard test amount
    const effectiveSpf = params.spf * applicationScale;

    // Activity adjustment (sweat, friction)
    const activityFactor = 1 - ((params.activityLevel - 1) * 0.15);

    // Humidity impact on durability
    const humidityFactor = 1 - ((params.humidity - 50) * 0.002);

    // Calculate protection decay over time
    const timePoints = Array.from({length: 12}, (_, i) => i);
    const protectionData = timePoints.map(hour => {
      // Exponential decay of protection
      const baseProtection = 100 * Math.exp(-0.15 * hour * activityFactor * humidityFactor);
      
      // Factor in physical protection (additive)
      const totalProtection = Math.min(100, baseProtection + params.physicalProtection);
      
      // Calculate effective protection against UVA and UVB
      const uvbProtection = totalProtection * (1 - 1/effectiveSpf);
      const uvaProtection = totalProtection * (1 - 1/params.uvaPf);
      
      return {
        hour,
        totalProtection,
        uvbProtection,
        uvaProtection,
        uvIndex: params.uvIndex * Math.sin(Math.PI * (hour + 6) / 24) // Simplified UV pattern
      };
    });

    setResults({
      protectionData,
      effectiveSpf,
      recommendedReapplication: 4 * activityFactor * humidityFactor,
      protectionScore: Math.round(effectiveSpf * activityFactor * humidityFactor)
    });
  };

  useEffect(() => {
    calculateProtection();
  }, [params]);

  return (
    <div className="w-full bg-white rounded-lg shadow-lg">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold">Sun Protection Calculator</h2>
        <p className="text-gray-600">Based on Beauty of Joseon Relief Sun Aqua Fresh</p>
      </div>

      <div className="p-6">
        {/* Input Parameters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Application Parameters</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Application Amount (mL)
              </label>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                value={params.applicationAmount}
                onChange={(e) => setParams({
                  ...params,
                  applicationAmount: parseFloat(e.target.value)
                })}
                className="w-full"
              />
              <div className="text-sm text-gray-600">
                {params.applicationAmount.toFixed(1)} mL
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Activity Level
              </label>
              <select
                value={params.activityLevel}
                onChange={(e) => setParams({
                  ...params,
                  activityLevel: parseInt(e.target.value)
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              >
                <option value={1}>Low (Indoor/Office)</option>
                <option value={2}>Moderate (Walking/Shopping)</option>
                <option value={3}>High (Sports/Swimming)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Humidity (%)
              </label>
              <input
                type="range"
                min="30"
                max="90"
                step="5"
                value={params.humidity}
                onChange={(e) => setParams({
                  ...params,
                  humidity: parseInt(e.target.value)
                })}
                className="w-full"
              />
              <div className="text-sm text-gray-600">
                {params.humidity}%
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Environmental Factors</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                UV Index
              </label>
              <input
                type="range"
                min="1"
                max="12"
                step="1"
                value={params.uvIndex}
                onChange={(e) => setParams({
                  ...params,
                  uvIndex: parseInt(e.target.value)
                })}
                className="w-full"
              />
              <div className="text-sm text-gray-600">
                {params.uvIndex}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Physical Protection (%)
              </label>
              <input
                type="range"
                min="0"
                max="80"
                step="5"
                value={params.physicalProtection}
                onChange={(e) => setParams({
                  ...params,
                  physicalProtection: parseInt(e.target.value)
                })}
                className="w-full"
              />
              <div className="text-sm text-gray-600">
                {params.physicalProtection}%
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {results && (
          <div className="space-y-6">
            {/* Protection Chart */}
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={results.protectionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" label={{ value: 'Hours After Application', position: 'bottom' }} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="totalProtection" 
                    stroke="#3b82f6" 
                    name="Total Protection %"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="uvbProtection" 
                    stroke="#82ca9d" 
                    name="UVB Protection %"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="uvaProtection" 
                    stroke="#ffc658" 
                    name="UVA Protection %"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="uvIndex" 
                    stroke="#ff7300" 
                    name="UV Index"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Results Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium">Effective SPF</h4>
                <p className="text-2xl font-bold text-blue-600">
                  {Math.round(results.effectiveSpf)}
                </p>
                <p className="text-sm text-gray-600">
                  Based on application amount
                </p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium">Recommended Reapplication</h4>
                <p className="text-2xl font-bold text-green-600">
                  {results.recommendedReapplication.toFixed(1)} hours
                </p>
                <p className="text-sm text-gray-600">
                  Adjusted for conditions
                </p>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-medium">Protection Score</h4>
                <p className="text-2xl font-bold text-yellow-600">
                  {results.protectionScore}/100
                </p>
                <p className="text-sm text-gray-600">
                  Overall effectiveness
                </p>
              </div>
            </div>
          </div>
        )}

        {/* References and Assumptions */}
        <div className="mt-8">
          <Alert>
            <AlertTitle>Key Assumptions and References</AlertTitle>
            <AlertDescription>
              <div className="mt-2 space-y-2 text-sm">
                <p>• Standard test amount: 2mg/cm² (approximately 2mL for face)</p>
                <p>• Protection decay follows exponential pattern based on activity and environmental factors</p>
                <p>• Physical protection (hats, shade) provides additive protection</p>
                <p>• Humidity impacts durability through increased sweating and product degradation</p>
                <p>• UV index follows simplified sinusoidal pattern throughout day</p>
                
                <div className="mt-4">
                  <strong>References:</strong>
                  <ul className="list-disc list-inside mt-1">
                    <li>Lab testing: Korean Lab SPF 57.9±6.8, UVA PF 19.3±2.8</li>
                    <li>Clinical study with 21 subjects (June-July 2024)</li>
                    <li>Beauty of Joseon product specifications</li>
                    <li>WHO UV index guidelines</li>
                  </ul>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
};

export default SunscreenCalculator;
