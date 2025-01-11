import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertCircle, Droplets, Wind, UtensilsCrossed, Home, Activity } from 'lucide-react';

const mockData = [
  { date: '2024-01', pm25: 150, microplastics: 120, waterContaminants: 85 },
  { date: '2024-02', pm25: 180, microplastics: 125, waterContaminants: 82 },
  { date: '2024-03', pm25: 200, microplastics: 130, waterContaminants: 80 }
];

const ExposureMonitor = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const RiskCard = ({ title, icon: Icon, level, description }) => (
    <Card className="mb-4 hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        <Icon size={24} className={`${level === 'high' ? 'text-red-500' : level === 'medium' ? 'text-yellow-500' : 'text-green-500'}`} />
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Exposure Trends (Chiang Mai)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="pm25" stroke="#ef4444" name="PM2.5" />
                  <Line type="monotone" dataKey="microplastics" stroke="#3b82f6" name="Microplastics" />
                  <Line type="monotone" dataKey="waterContaminants" stroke="#10b981" name="Water Contaminants" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RiskCard 
          title="Air Quality Impact" 
          icon={Wind}
          level="high"
          description="High PM2.5 levels in Chiang Mai compound microplastic inhalation risks during burning season." 
        />

        <RiskCard 
          title="Water Exposure" 
          icon={Droplets}
          level="medium"
          description="Reverse osmosis filtration recommended for drinking water. Monitor mineral repletion." 
        />

        <RiskCard 
          title="Dietary Exposure" 
          icon={UtensilsCrossed}
          level="medium"
          description="Vegan diet increases plant-based exposure but reduces bioaccumulated toxins from animal products." 
        />

        <RiskCard 
          title="Indoor Environment" 
          icon={Home}
          level="medium"
          description="HEPA filtration essential during high PM2.5 periods. Monitor indoor air quality." 
        />

        <RiskCard 
          title="Physical Activity" 
          icon={Activity}
          level="medium"
          description="Exercise supports detoxification but increases exposure during poor air quality." 
        />

        <RiskCard 
          title="Combined Risk Profile" 
          icon={AlertCircle}
          level="high"
          description="Location-specific factors create elevated exposure risk requiring active management." 
        />
      </div>
    </div>
  );
};

export default ExposureMonitor;
