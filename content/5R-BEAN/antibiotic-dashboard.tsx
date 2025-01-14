import React from 'react';
import { Clock, Pill, AlertCircle, Coffee, Moon, Sun, CheckCircle2, XCircle, ClipboardCheck, Droplet, Apple, HeartPulse, ScrollText, BookOpen, Beaker } from 'lucide-react';

const TimeSection = () => (
  <div className="flex justify-around items-center mb-8 p-4 bg-blue-50 rounded-lg">
    <div className="flex flex-col items-center">
      <Sun className="w-8 h-8 text-yellow-500 mb-2"/>
      <div className="text-center">
        <div className="font-bold">Morning</div>
        <div>7-8 AM</div>
      </div>
    </div>
    <div className="flex flex-col items-center">
      <Coffee className="w-8 h-8 text-orange-500 mb-2"/>
      <div className="text-center">
        <div className="font-bold">Evening</div>
        <div>3-4 PM</div>
      </div>
    </div>
    <div className="flex flex-col items-center">
      <Moon className="w-8 h-8 text-blue-500 mb-2"/>
      <div className="text-center">
        <div className="font-bold">Bedtime</div>
        <div>11 PM-12 AM</div>
      </div>
    </div>
  </div>
);

const AdministrationSection = () => (
  <div className="mb-8 p-4 bg-green-50 rounded-lg">
    <h3 className="font-bold mb-4 flex items-center"><Pill className="w-5 h-5 mr-2"/>Administration Guidelines</h3>
    <div className="grid grid-cols-2 gap-4">
      <ul className="list-none">
        <li className="flex items-center mb-2">
          <CheckCircle2 className="w-4 h-4 text-green-500 mr-2"/>
          Give with food
        </li>
        <li className="flex items-center mb-2">
          <CheckCircle2 className="w-4 h-4 text-green-500 mr-2"/>
          Ensure fresh water
        </li>
      </ul>
      <ul className="list-none">
        <li className="flex items-center mb-2">
          <XCircle className="w-4 h-4 text-red-500 mr-2"/>
          No calcium-rich foods
        </li>
        <li className="flex items-center mb-2">
          <XCircle className="w-4 h-4 text-red-500 mr-2"/>
          No probiotics within 2hrs
        </li>
      </ul>
    </div>
  </div>
);

const MonitoringSection = () => (
  <div className="mb-8 p-4 bg-yellow-50 rounded-lg">
    <h3 className="font-bold mb-4 flex items-center"><HeartPulse className="w-5 h-5 mr-2"/>Monitoring Response</h3>
    <div className="grid grid-cols-3 gap-4">
      <div>
        <h4 className="font-semibold mb-2">Days 1-3</h4>
        <ul className="list-none">
          <li className="flex items-center mb-2">
            <Droplet className="w-4 h-4 text-blue-500 mr-2"/>
            Less frequent urination
          </li>
          <li className="flex items-center mb-2">
            <Droplet className="w-4 h-4 text-blue-500 mr-2"/>
            Reduced straining
          </li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-2">Days 4-7</h4>
        <ul className="list-none">
          <li className="flex items-center mb-2">
            <Droplet className="w-4 h-4 text-blue-500 mr-2"/>
            Normal patterns
          </li>
          <li className="flex items-center mb-2">
            <Droplet className="w-4 h-4 text-blue-500 mr-2"/>
            Improved color
          </li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-2">Days 8-14</h4>
        <ul className="list-none">
          <li className="flex items-center mb-2">
            <Droplet className="w-4 h-4 text-blue-500 mr-2"/>
            Complete resolution
          </li>
          <li className="flex items-center mb-2">
            <Droplet className="w-4 h-4 text-blue-500 mr-2"/>
            Clear urine
          </li>
        </ul>
      </div>
    </div>
  </div>
);

const SideEffectsSection = () => (
  <div className="mb-8 p-4 bg-red-50 rounded-lg">
    <h3 className="font-bold mb-4 flex items-center"><AlertCircle className="w-5 h-5 mr-2"/>Watch For</h3>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <h4 className="font-semibold mb-2">Common Effects</h4>
        <ul className="list-none">
          <li className="flex items-center mb-2">
            <AlertCircle className="w-4 h-4 text-yellow-500 mr-2"/>
            Mild GI upset
          </li>
          <li className="flex items-center mb-2">
            <AlertCircle className="w-4 h-4 text-yellow-500 mr-2"/>
            Softer stools
          </li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-2">Red Flags</h4>
        <ul className="list-none">
          <li className="flex items-center mb-2">
            <AlertCircle className="w-4 h-4 text-red-500 mr-2"/>
            Severe diarrhea
          </li>
          <li className="flex items-center mb-2">
            <AlertCircle className="w-4 h-4 text-red-500 mr-2"/>
            Difficulty breathing
          </li>
        </ul>
      </div>
    </div>
  </div>
);

const DocumentationSection = () => (
  <div className="mb-8 p-4 bg-purple-50 rounded-lg">
    <h3 className="font-bold mb-4 flex items-center"><ScrollText className="w-5 h-5 mr-2"/>Daily Documentation</h3>
    <ul className="list-none">
      <li className="flex items-center mb-2">
        <ClipboardCheck className="w-4 h-4 text-purple-500 mr-2"/>
        Record dosing times
      </li>
      <li className="flex items-center mb-2">
        <ClipboardCheck className="w-4 h-4 text-purple-500 mr-2"/>
        Note urination patterns
      </li>
      <li className="flex items-center mb-2">
        <ClipboardCheck className="w-4 h-4 text-purple-500 mr-2"/>
        Document side effects
      </li>
    </ul>
  </div>
);

const KeyPointsSection = () => (
  <div className="p-4 bg-gray-50 rounded-lg">
    <h3 className="font-bold mb-4 flex items-center"><BookOpen className="w-5 h-5 mr-2"/>Key Points & References</h3>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <h4 className="font-semibold mb-2">Principles</h4>
        <ul className="list-none">
          <li className="flex items-center mb-2">
            <Beaker className="w-4 h-4 text-gray-500 mr-2"/>
            Complete full course
          </li>
          <li className="flex items-center mb-2">
            <Beaker className="w-4 h-4 text-gray-500 mr-2"/>
            Maintain 8hr intervals
          </li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-2">References</h4>
        <ul className="list-none text-sm text-gray-600">
          <li className="mb-1">P. mirabilis Treatment Guidelines</li>
          <li className="mb-1">Antimicrobial Therapy in Dogs</li>
        </ul>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-6 text-center">Bean's Antibiotic Treatment Dashboard</h2>
      <TimeSection />
      <div className="grid grid-cols-2 gap-4">
        <AdministrationSection />
        <MonitoringSection />
        <SideEffectsSection />
        <DocumentationSection />
      </div>
      <KeyPointsSection />
    </div>
  );
};

export default Dashboard;
