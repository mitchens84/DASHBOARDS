import React, { useState } from 'react';
import { Clock, Droplet, Coffee, Moon, Sun, AlertTriangle, Pill, Activity } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface TimelineEventProps {
  time: string;
  title: string;
  description: string;
  icon: LucideIcon;
  importance?: 'high' | 'normal';
}

interface ProtocolTabProps {
  title: string;
  children: React.ReactNode;
}

const TimelineEvent = ({ time, title, description, icon: Icon, importance = 'normal' }: TimelineEventProps) => (
  <div className={`flex items-start mb-4 space-x-3 ${
    importance === 'high' ? 'bg-blue-50 p-3 rounded-lg' : ''
  }`}>
    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
      importance === 'high' ? 'bg-blue-200' : 'bg-blue-100'
    }`}>
      <Icon className="w-5 h-5 text-blue-600" />
    </div>
    <div>
      <p className="font-semibold text-gray-900">{time}</p>
      <h3 className="font-medium text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

const ProtocolTab = ({ title, children }: ProtocolTabProps) => (
  <div className="p-4 bg-white rounded-lg shadow">
    <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
    {children}
  </div>
);

export default function TreatmentProtocol() {
  const [activeTab, setActiveTab] = useState('timeline');

  const tabs = [
    { id: 'timeline', label: 'Daily Timeline' },
    { id: 'supplements', label: 'Supplements' },
    { id: 'nutrition', label: 'Nutrition Guide' },
    { id: 'monitoring', label: 'Monitoring' },
    { id: 'warnings', label: 'Warning Signs' }
  ];

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 bg-blue-50">
          <h1 className="text-2xl font-bold text-gray-900">Bean's UTI Treatment Protocol</h1>
          <p className="text-gray-600">14-Day Treatment Period | February 2025</p>
        </div>

        <div className="border-b border-gray-200">
          <nav className="flex flex-wrap">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 font-medium ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4">
          {activeTab === 'timeline' && (
            <ProtocolTab title="Daily Schedule">
              <TimelineEvent
                time="Morning (6:00-7:00 AM)"
                title="Hydration & Morning Supplements"
                description="Check urine pH, D-Mannose (2000mg), fresh water"
                icon={Sun}
                importance="high"
              />
              <TimelineEvent
                time="Morning Walk (7:00-8:00 AM)"
                title="Exercise & Elimination"
                description="Monitor urination patterns and comfort"
                icon={Coffee}
              />
              <TimelineEvent
                time="Throughout Day"
                title="Hydration Maintenance"
                description="Ensure access to fresh water (target: 1600mL daily)"
                icon={Droplet}
              />
              <TimelineEvent
                time="Evening Meal (5:00 PM)"
                title="Main Meal & Evening Supplements"
                description="Plant-based meal with methionine-rich ingredients, Methionine (2000mg), N-Acetylcysteine (500mg)"
                icon={Clock}
                importance="high"
              />
              <TimelineEvent
                time="Night (10:00 PM)"
                title="Medication Administration"
                description="Enrofloxacin 150mg with minimal food (15g), final bathroom break"
                icon={Moon}
                importance="high"
              />
            </ProtocolTab>
          )}

          {activeTab === 'supplements' && (
            <ProtocolTab title="Supplement Protocol">
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Essential Supplements</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Pill className="w-5 h-5 text-blue-600 mt-1" />
                      <div>
                        <p className="font-medium">Morning (with small meal)</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>D-Mannose: 2000mg</li>
                          <li>Cranberry Extract: 500mg</li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Pill className="w-5 h-5 text-blue-600 mt-1" />
                      <div>
                        <p className="font-medium">Evening (with main meal)</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Methionine: 2000mg</li>
                          <li>N-Acetylcysteine: 500mg</li>
                          <li>Omega-3 (from algae): 1000mg</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Natural Food Sources</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Dried cranberries: 30g daily</li>
                    <li>Brazil nuts: 15g daily</li>
                    <li>Sesame seeds: 20g daily</li>
                    <li>Pumpkin seeds: 20g daily</li>
                  </ul>
                </div>
              </div>
            </ProtocolTab>
          )}

          {activeTab === 'nutrition' && (
            <ProtocolTab title="Nutrition Protocol">
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Evening Meal Components</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Protein base (choose one):
                      <ul className="pl-5 space-y-1">
                        <li>Lentils (200g cooked)</li>
                        <li>Tempeh (100g)</li>
                        <li>Mixed beans (150g cooked)</li>
                      </ul>
                    </li>
                    <li>Methionine-rich additions:
                      <ul className="pl-5 space-y-1">
                        <li>Brazil nuts (15g)</li>
                        <li>Sesame seeds (20g)</li>
                        <li>Pumpkin seeds (20g)</li>
                      </ul>
                    </li>
                    <li>Supporting ingredients:
                      <ul className="pl-5 space-y-1">
                        <li>Dried cranberries (30g)</li>
                        <li>Sweet potato (100g)</li>
                        <li>Moisture-rich vegetables</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </ProtocolTab>
          )}

          {activeTab === 'monitoring' && (
            <ProtocolTab title="Daily Monitoring Checklist">
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Essential Checks</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Activity className="w-5 h-5 text-blue-600" />
                      <span>Morning urine pH (target: 6.0-6.5)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Droplet className="w-5 h-5 text-blue-600" />
                      <span>Water intake (target: 1600mL)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <span>Urination frequency and comfort</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Weekly Checks</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Weight measurement</li>
                    <li>Overall energy assessment</li>
                    <li>Appetite patterns</li>
                    <li>Medication side effects</li>
                  </ul>
                </div>
              </div>
            </ProtocolTab>
          )}

          {activeTab === 'warnings' && (
            <ProtocolTab title="Warning Signs">
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="w-5 h-5 text-red-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-red-700">Contact Vet Immediately If:</h3>
                    <ul className="list-disc pl-5 mt-2 space-y-2 text-red-700">
                      <li>Fever or elevated temperature</li>
                      <li>Severe straining during urination</li>
                      <li>Blood in urine</li>
                      <li>Lethargy or appetite loss</li>
                      <li>Vomiting or diarrhea</li>
                      <li>Excessive water consumption</li>
                      <li>Signs of pain or discomfort</li>
                    </ul>
                  </div>
                </div>
              </div>
            </ProtocolTab>
          )}
        </div>
      </div>
    </div>
  );
}
