import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, Clock, Zap, Activity, ArrowRight, Plus, AlertTriangle } from 'lucide-react';

const DashboardCard = ({ title, icon: Icon, children }) => (
  <Card className="h-full">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      {children}
    </CardContent>
  </Card>
);

const ProtocolSection = ({ title, items }) => (
  <div className="mb-4">
    <h3 className="text-sm font-semibold mb-2">{title}</h3>
    <ul className="list-none pl-0">
      {items.map((item, index) => (
        <li key={index} className="flex items-start mb-2">
          <ArrowRight className="h-4 w-4 mt-1 mr-2 flex-shrink-0 text-blue-500" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default function VollagenDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="p-4 w-full max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Vollagen Supplementation Protocol</h1>
        <p className="text-gray-600">
          A comprehensive guide to optimizing your Vollagen supplementation for maximum benefits
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardCard title="Core Protocol" icon={Info}>
          <ProtocolSection 
            title="Standard Dosage"
            items={[
              'Daily dose: 1000mg (2 capsules)',
              'Minimum effective dose shown in studies',
              'Can be increased safely if needed',
              'Start with standard dose for 60 days before adjusting'
            ]}
          />
        </DashboardCard>

        <DashboardCard title="Timing & Administration" icon={Clock}>
          <ProtocolSection 
            title="Optimal Timing"
            items={[
              'Take with food for optimal absorption',
              'Can split dose morning/evening',
              'Maintain consistent daily schedule',
              'Take with vitamin C-rich meal if possible'
            ]}
          />
        </DashboardCard>

        <DashboardCard title="Synergistic Compounds" icon={Plus}>
          <ProtocolSection 
            title="Key Enhancers"
            items={[
              'Vitamin C (essential cofactor)',
              'Bone Care formula for joint support',
              'MultiVit for overall optimization',
              'Omega-3s for complementary benefits'
            ]}
          />
        </DashboardCard>

        <DashboardCard title="Performance Optimization" icon={Zap}>
          <ProtocolSection 
            title="Enhancement Strategies"
            items={[
              'Maintain adequate hydration',
              'Combine with protein-rich meals',
              'Consider higher doses for athletics',
              'Monitor and adjust based on results'
            ]}
          />
        </DashboardCard>

        <DashboardCard title="Progress Tracking" icon={Activity}>
          <ProtocolSection 
            title="Key Markers (60-day cycle)"
            items={[
              'Skin hydration and elasticity',
              'Nail strength and growth rate',
              'Joint comfort and flexibility',
              'Overall skin texture and tone'
            ]}
          />
        </DashboardCard>

        <DashboardCard title="Important Considerations" icon={AlertTriangle}>
          <ProtocolSection 
            title="Key Points"
            items={[
              'Consult healthcare provider if on medication',
              'Safe during pregnancy/breastfeeding',
              'Store in cool, dry place',
              'Allow full 60 days for initial assessment'
            ]}
          />
        </DashboardCard>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Pro Tips</h3>
        <ul className="list-disc pl-5">
          <li className="mb-2">Combine with exercise for enhanced collagen synthesis</li>
          <li className="mb-2">Take photos monthly to track visible progress</li>
          <li className="mb-2">Consider seasonal adjustments (e.g., higher doses in winter)</li>
          <li>Track sleep quality and recovery times as secondary markers</li>
        </ul>
      </div>
    </div>
  );
}
