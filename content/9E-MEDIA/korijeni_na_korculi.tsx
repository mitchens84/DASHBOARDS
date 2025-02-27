import React from 'react';
import { Globe2, Home, Boat, Sun, Heart } from 'lucide-react';

const SongVisualization = () => {
  const songMetrics = [
    { category: "Croatian Lines", value: 45 },
    { category: "English Lines", value: 35 },
    { category: "Mixed Lines", value: 20 }
  ];

  const familyMembers = [
    { name: "Father", traits: ["Stubborn", "Hard of hearing", "Gardener"] },
    { name: "Mother", traits: ["Strong-willed", "Like winter waves", "Determined"] },
    { name: "Sister", traits: ["Busy life", "Family focused", "Connected"] },
    { name: "Narrator", traits: ["Far away", "Philosophical", "Rooted"] }
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gradient-to-b from-blue-50 to-blue-100 rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-2">Korijeni Na Korčuli</h1>
        <p className="text-lg text-blue-600 italic">Roots on Korčula</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Language Distribution */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Globe2 className="w-5 h-5 text-blue-500" />
            Language Distribution
          </h2>
          <div className="h-48 relative">
            {songMetrics.map((metric, idx) => (
              <div key={idx} className="mb-4">
                <div className="flex justify-between mb-1">
                  <span>{metric.category}</span>
                  <span>{metric.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${metric.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Family Circle */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            Family Bonds
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {familyMembers.map((member, idx) => (
              <div key={idx} className="p-3 border-2 border-blue-200 rounded-lg hover:border-blue-400 transition-colors">
                <h3 className="font-bold text-blue-700">{member.name}</h3>
                <ul className="text-sm text-gray-600">
                  {member.traits.map((trait, i) => (
                    <li key={i} className="italic">• {trait}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Song Themes */}
        <div className="bg-white p-4 rounded-lg shadow md:col-span-2">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Sun className="w-5 h-5 text-yellow-500" />
            Dalmatian Elements
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Home className="w-6 h-6" />, text: "Unfinished Houses" },
              { icon: <Boat className="w-6 h-6" />, text: "Winter Sea" },
              { icon: <Sun className="w-6 h-6" />, text: "Mediterranean Sun" },
              { icon: <Heart className="w-6 h-6" />, text: "Family Bonds" }
            ].map((element, idx) => (
              <div key={idx} className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
                <div className="text-blue-500 mb-2">{element.icon}</div>
                <span className="text-center text-sm font-medium">{element.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongVisualization;
