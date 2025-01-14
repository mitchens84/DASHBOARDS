import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Info, AlertTriangle, Shield, Clock } from 'lucide-react';

const EMFDashboard = () => {
  const [activeTab, setActiveTab] = useState('household');

  const deviceData = [
    { 
      device: 'Wi-Fi Router',
      safeDistance: 1, // meters
      frequency: 2.4,
      maxExposure: 6,
      riskLevel: 'low',
      notes: 'Keep out of bedroom'
    },
    {
      device: 'Smartphone',
      safeDistance: 0.5,
      frequency: 2.4,
      maxExposure: 4,
      riskLevel: 'moderate',
      notes: 'Avoid pocket carrying'
    },
    {
      device: 'Laptop',
      safeDistance: 0.3,
      frequency: 2.4,
      maxExposure: 3,
      riskLevel: 'low',
      notes: 'Use on desk'
    },
    {
      device: 'Microwave',
      safeDistance: 1.5,
      frequency: 2.45,
      maxExposure: 8,
      riskLevel: 'moderate',
      notes: 'Stand back when operating'
    },
    {
      device: 'Smart TV',
      safeDistance: 2,
      frequency: 2.4,
      maxExposure: 2,
      riskLevel: 'low',
      notes: 'Minimal concern'
    }
  ];

  const frequencyBands = [
    {
      band: 'Wi-Fi 2.4GHz',
      frequency: 2.4,
      wavelength: 12.5,
      penetration: 'High',
      commonDevices: 'Routers, phones, laptops'
    },
    {
      band: 'Wi-Fi 5GHz',
      frequency: 5,
      wavelength: 6,
      penetration: 'Medium',
      commonDevices: 'Modern routers, new devices'
    },
    {
      band: 'Cellular 4G',
      frequency: 2.1,
      wavelength: 14.3,
      penetration: 'High',
      commonDevices: 'Smartphones, tablets'
    },
    {
      band: 'Cellular 5G',
      frequency: 28,
      wavelength: 1.07,
      penetration: 'Low',
      commonDevices: '5G phones, modems'
    }
  ];

  const safetyData = deviceData.map(item => ({
    name: item.device,
    distance: item.safeDistance,
    exposure: item.maxExposure
  }));

  const getRiskColor = (level) => {
    switch(level) {
      case 'low': return 'text-green-600';
      case 'moderate': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-6 h-6" />
            EMF Exposure Safety Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="household" className="w-full">
            <TabsList>
              <TabsTrigger value="household">Household Devices</TabsTrigger>
              <TabsTrigger value="frequencies">Frequency Bands</TabsTrigger>
              <TabsTrigger value="visualization">Safety Visualization</TabsTrigger>
            </TabsList>

            <TabsContent value="household">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {deviceData.map((device, index) => (
                  <Card key={index} className="p-4">
                    <h3 className="font-bold text-lg mb-2">{device.device}</h3>
                    <div className="space-y-2">
                      <p className="flex items-center gap-2">
                        <Info className="w-4 h-4" />
                        Safe Distance: {device.safeDistance}m
                      </p>
                      <p className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        Risk Level: <span className={getRiskColor(device.riskLevel)}>{device.riskLevel}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Max Daily Exposure: {device.maxExposure}hrs
                      </p>
                      <p className="text-sm text-gray-600 mt-2">{device.notes}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="frequencies">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 text-left">Band</th>
                      <th className="p-2 text-left">Frequency (GHz)</th>
                      <th className="p-2 text-left">Wavelength (cm)</th>
                      <th className="p-2 text-left">Penetration</th>
                      <th className="p-2 text-left">Common Devices</th>
                    </tr>
                  </thead>
                  <tbody>
                    {frequencyBands.map((band, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2">{band.band}</td>
                        <td className="p-2">{band.frequency}</td>
                        <td className="p-2">{band.wavelength}</td>
                        <td className="p-2">{band.penetration}</td>
                        <td className="p-2">{band.commonDevices}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="visualization">
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={safetyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="distance" name="Safe Distance (m)" fill="#8884d8" />
                    <Bar yAxisId="right" dataKey="exposure" name="Max Daily Exposure (hrs)" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Research References & Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>• World Health Organization (WHO) EMF Project Guidelines</p>
            <p>• International Commission on Non-Ionizing Radiation Protection (ICNIRP) Standards</p>
            <p>• Federal Communications Commission (FCC) Safety Guidelines</p>
            <p>• European Union EMF Exposure Limits</p>
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              Note: All measurements and recommendations are based on current scientific consensus and international safety standards. Individual sensitivity may vary, and precautionary principles can be applied for additional safety.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EMFDashboard;
