import React, { useState } from 'react';
import { AlertCircle, Music, Brain, Volume2, Moon, Sun, Heart } from 'lucide-react';

const EvidenceLevel = ({ level }) => {
  const getColor = () => {
    switch (level) {
      case 'Strong': return 'bg-green-500';
      case 'Moderate': return 'bg-yellow-500';
      case 'Limited': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`h-3 w-3 rounded-full ${getColor()}`}></div>
      <span className="text-sm font-medium">{level} Evidence</span>
    </div>
  );
};

const SoundTherapyGuide = () => {
  const [activeTab, setActiveTab] = useState('categories');
  
  const categories = [
    {
      title: "Meditation & Mindfulness",
      icon: <Brain className="w-6 h-6" />,
      description: "Sounds and music for deepening meditation practice",
      evidence: "Strong",
      recommendations: [
        {
          type: "Binaural Beats (4-8 Hz)",
          purpose: "Deep meditation states",
          notes: "Best with headphones"
        },
        {
          type: "Nature Sounds",
          purpose: "Open awareness meditation",
          notes: "Especially effective: rainfall, waves"
        },
        {
          type: "Tibetan Singing Bowls",
          purpose: "Focus and grounding",
          notes: "Traditional meditation aid"
        }
      ]
    },
    {
      title: "Sleep Enhancement",
      icon: <Moon className="w-6 h-6" />,
      description: "Audio for improving sleep quality and onset",
      evidence: "Moderate",
      recommendations: [
        {
          type: "Pink Noise",
          purpose: "Sleep maintenance",
          notes: "Similar to natural sounds"
        },
        {
          type: "Delta Waves (0.5-4 Hz)",
          purpose: "Deep sleep induction",
          notes: "Use 30-60 mins before bed"
        },
        {
          type: "Classical Music",
          purpose: "Sleep preparation",
          notes: "60-80 BPM tempo optimal"
        }
      ]
    },
    {
      title: "Stress Reduction",
      icon: <Heart className="w-6 h-6" />,
      description: "Calming sounds for anxiety and stress",
      evidence: "Strong",
      recommendations: [
        {
          type: "Classical Music",
          purpose: "Anxiety reduction",
          notes: "Especially string compositions"
        },
        {
          type: "Nature Soundscapes",
          purpose: "Stress relief",
          notes: "Forest and water sounds"
        },
        {
          type: "Alpha Waves (8-12 Hz)",
          purpose: "Relaxation",
          notes: "Good for background playing"
        }
      ]
    },
    {
      title: "Focus & Productivity",
      icon: <Sun className="w-6 h-6" />,
      description: "Audio for enhanced concentration",
      evidence: "Moderate",
      recommendations: [
        {
          type: "Beta Waves (12-30 Hz)",
          purpose: "Mental alertness",
          notes: "Best for complex tasks"
        },
        {
          type: "White Noise",
          purpose: "Background noise reduction",
          notes: "Helps in noisy environments"
        },
        {
          type: "Instrumental Music",
          purpose: "Sustained focus",
          notes: "Avoid lyrics when working"
        }
      ]
    }
  ];

  const frequencies = {
    delta: {
      range: "0.5-4 Hz",
      state: "Deep Sleep",
      applications: "Physical healing, regeneration",
      evidence: "Moderate"
    },
    theta: {
      range: "4-8 Hz",
      state: "Deep Meditation",
      applications: "Creativity, emotional processing",
      evidence: "Moderate"
    },
    alpha: {
      range: "8-12 Hz",
      state: "Relaxed Focus",
      applications: "Stress reduction, learning",
      evidence: "Strong"
    },
    beta: {
      range: "12-30 Hz",
      state: "Active Thinking",
      applications: "Concentration, problem-solving",
      evidence: "Strong"
    },
    gamma: {
      range: "30-100 Hz",
      state: "Peak Performance",
      applications: "Cognitive enhancement",
      evidence: "Limited"
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Sound Therapy Guide</h1>
        <div className="flex gap-4 mb-6">
          <button
            className={`px-4 py-2 rounded-lg ${activeTab === 'categories' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('categories')}
          >
            Applications
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${activeTab === 'frequencies' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('frequencies')}
          >
            Frequencies
          </button>
        </div>
      </div>

      {activeTab === 'categories' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                {category.icon}
                <h2 className="text-xl font-semibold">{category.title}</h2>
              </div>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <EvidenceLevel level={category.evidence} />
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Recommended Sounds:</h3>
                <ul className="space-y-2">
                  {category.recommendations.map((rec, idx) => (
                    <li key={idx} className="border-l-4 border-blue-500 pl-3">
                      <div className="font-medium">{rec.type}</div>
                      <div className="text-sm text-gray-600">{rec.purpose}</div>
                      <div className="text-sm text-gray-500 italic">{rec.notes}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'frequencies' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(frequencies).map(([wave, data]) => (
            <div key={wave} className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold mb-3 capitalize">{wave} Waves</h2>
              <div className="space-y-3">
                <div>
                  <span className="font-medium">Range: </span>
                  <span>{data.range}</span>
                </div>
                <div>
                  <span className="font-medium">Brain State: </span>
                  <span>{data.state}</span>
                </div>
                <div>
                  <span className="font-medium">Applications: </span>
                  <span>{data.applications}</span>
                </div>
                <EvidenceLevel level={data.evidence} />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold mb-2">Important Notes:</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
              <li>Individual responses to sound therapy can vary significantly</li>
              <li>Start with shorter sessions (15-20 minutes) and adjust based on personal response</li>
              <li>Use high-quality headphones for binaural beats and frequency-specific audio</li>
              <li>Avoid sound therapy while driving or operating machinery</li>
              <li>Consult healthcare providers if using sound therapy for medical conditions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoundTherapyGuide;
