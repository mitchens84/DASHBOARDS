import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { AlertCircle, Activity, Brain, Heart, Shield, Database, Dna, Bone, Clock, Pill, Apple, BookOpen } from 'lucide-react';

const GeneticDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // System impact data
  const systemScores = [
    { name: 'Neurological', risk: 6.0, protection: 2.0 },
    { name: 'Cardiovascular', risk: 3.0, protection: 3.0 },
    { name: 'Immune', risk: 3.5, protection: 1.5 },
    { name: 'Metabolic', risk: 3.0, protection: 2.0 },
    { name: 'Structural', risk: 2.0, protection: 2.0 },
  ];

  // Interaction data
  const interactionData = [
    { 
      subject: 'Inflammation', 
      impact: 9, 
      priority: 8,
      description: 'Central mediator affecting all systems, particularly important due to APOE4 status'
    },
    { 
      subject: 'Lipid Processing', 
      impact: 8, 
      priority: 7,
      description: 'Critical due to APOE4 genotype, affects both cognitive and cardiovascular health'
    },
    { 
      subject: 'Energy Metabolism', 
      impact: 7, 
      priority: 6,
      description: 'Influences cellular function across systems, particularly important for brain health'
    },
    { 
      subject: 'Stress Response', 
      impact: 8, 
      priority: 7,
      description: 'Modulates multiple pathways, particularly relevant for cognitive and immune function'
    },
    { 
      subject: 'Immune Function', 
      impact: 9, 
      priority: 6,
      description: 'Enhanced vigilance profile requires careful management across systems'
    },
  ];

  const CustomInteractionTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = interactionData.find(d => d.subject === label);
      return (
        <div className="bg-white p-3 rounded shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800">{label}</p>
          <p className="text-sm text-gray-600 mt-1">{data.description}</p>
          <div className="mt-2">
            <p className="text-blue-600">Impact Score: {payload[0].value}/10</p>
            <p className="text-amber-600">Priority Score: {payload[1].value}/10</p>
          </div>
        </div>
      );
    }
    return null;
  };

  // Intervention data by system
  const interventions = {
    neurological: {
      diet: [
        "Mediterranean-MIND diet emphasis",
        "High DHA/EPA intake (1-2g daily)",
        "Polyphenol-rich foods",
        "Time-restricted eating",
        "Limited saturated fats"
      ],
      supplements: [
        "DHA/EPA (2-3g daily)",
        "Vitamin D3 (2000-4000 IU)",
        "B-Complex (methylated forms)",
        "Magnesium L-Threonate",
        "Curcumin (bioavailable form)"
      ],
      lifestyle: [
        "Regular aerobic exercise (Zone 2)",
        "Cognitive training",
        "Social engagement",
        "Stress management",
        "Sleep optimization (7-8 hours)"
      ],
      monitoring: [
        "Quarterly lipid panels",
        "Annual cognitive assessment",
        "Regular sleep tracking",
        "Inflammation markers",
        "Oxidative stress markers"
      ]
    },
    cardiovascular: {
      diet: [
        "Low sodium emphasis",
        "High potassium foods",
        "Nitrate-rich vegetables",
        "Omega-3 rich sources",
        "Polyphenol focus"
      ],
      supplements: [
        "CoQ10 (100-200mg daily)",
        "Magnesium (glycinate/taurate)",
        "Vitamin K2 (MK-7)",
        "Grape seed extract",
        "Nattokinase (with caution)"
      ],
      lifestyle: [
        "Zone 2 cardiovascular base",
        "Regular strength training",
        "Stress management",
        "Sleep optimization",
        "Blood pressure monitoring"
      ],
      monitoring: [
        "Daily BP tracking",
        "Regular HRV monitoring",
        "Quarterly lipids",
        "Annual vessel assessment",
        "Exercise response patterns"
      ]
    }
    // ... other systems similar to above
  };

  const InterventionCard = ({ title, items, icon: Icon, colorClass }) => (
    <div className={`${colorClass} p-4 rounded-lg shadow`}>
      <div className="flex items-center mb-3">
        <Icon className="w-5 h-5 mr-2" />
        <h4 className="font-semibold">{title}</h4>
      </div>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start">
            <span className="w-2 h-2 mt-2 bg-current rounded-full mr-2 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  const SystemContent = ({ system }) => {
    const priorityData = {
      neurological: [
        { name: "APOE4 Management", value: 40, color: "#ef4444", description: "Critical focus due to homozygous APOE4 status" },
        { name: "Cognitive Protection", value: 30, color: "#f59e0b", description: "Preventive measures for cognitive health" },
        { name: "Inflammation Control", value: 20, color: "#3b82f6", description: "Managing neuroinflammation" },
        { name: "Support Systems", value: 10, color: "#22c55e", description: "Maintaining cognitive reserve" }
      ],
      cardiovascular: [
        { name: "Blood Pressure", value: 35, color: "#ef4444", description: "Primary cardiovascular risk factor" },
        { name: "Lipid Management", value: 30, color: "#f59e0b", description: "Critical for vascular health" },
        { name: "Exercise Protocol", value: 20, color: "#3b82f6", description: "Cardio-protective activities" },
        { name: "Rhythm Protection", value: 15, color: "#22c55e", description: "Maintaining heart rhythm stability" }
      ],
      immune: [
        { name: "Autoimmune Prevention", value: 40, color: "#ef4444", description: "Managing enhanced immune vigilance" },
        { name: "Inflammation Control", value: 30, color: "#f59e0b", description: "Systemic inflammation management" },
        { name: "Immune Balance", value: 20, color: "#3b82f6", description: "Maintaining optimal immune response" },
        { name: "Barrier Function", value: 10, color: "#22c55e", description: "Supporting immune barriers" }
      ],
      metabolic: [
        { name: "Glucose Control", value: 35, color: "#ef4444", description: "Primary metabolic focus" },
        { name: "Lipid Processing", value: 30, color: "#f59e0b", description: "Critical for metabolic health" },
        { name: "Metabolic Flexibility", value: 20, color: "#3b82f6", description: "Adaptability training" },
        { name: "Energy Systems", value: 15, color: "#22c55e", description: "Supporting energy production" }
      ],
      structural: [
        { name: "Bone Density", value: 35, color: "#ef4444", description: "Primary structural focus" },
        { name: "Joint Health", value: 30, color: "#f59e0b", description: "Maintaining joint function" },
        { name: "Muscle Mass", value: 20, color: "#3b82f6", description: "Supporting structure" },
        { name: "Recovery", value: 15, color: "#22c55e", description: "Optimizing repair processes" }
      ]
    }[system] || [];

    const timelineData = {
      neurological: [
        { time: "Daily", score: 5, activities: "DHA/EPA, exercise, cognitive training", importance: "Critical daily interventions for cognitive protection" },
        { time: "Weekly", score: 4, activities: "Social engagement, stress management", importance: "Regular activities for cognitive resilience" },
        { time: "Monthly", score: 3, activities: "Cognitive assessments", importance: "Tracking cognitive performance" },
        { time: "Quarterly", score: 4, activities: "Blood panels, inflammation markers", importance: "Key biomarker monitoring" },
        { time: "Annually", score: 5, activities: "Complete cognitive evaluation", importance: "Comprehensive assessment" }
      ],
      cardiovascular: [
        { time: "Daily", score: 5, activities: "BP monitoring, Zone 2 exercise", importance: "Core cardiovascular maintenance" },
        { time: "Weekly", score: 4, activities: "HRV tracking, strength training", importance: "Cardiovascular resilience building" },
        { time: "Monthly", score: 3, activities: "Cardiovascular assessment", importance: "Function monitoring" },
        { time: "Quarterly", score: 4, activities: "Lipid panels, inflammation markers", importance: "Risk factor tracking" },
        { time: "Annually", score: 5, activities: "Comprehensive cardiac evaluation", importance: "Full system assessment" }
      ],
      immune: [
        { time: "Daily", score: 5, activities: "Anti-inflammatory diet, stress management", importance: "Core immune support" },
        { time: "Weekly", score: 4, activities: "Cold exposure, exercise", importance: "Immune resilience training" },
        { time: "Monthly", score: 3, activities: "Immune function check", importance: "System monitoring" },
        { time: "Quarterly", score: 4, activities: "Inflammation panels", importance: "Key marker tracking" },
        { time: "Annually", score: 5, activities: "Full immune assessment", importance: "Complete evaluation" }
      ],
      metabolic: [
        { time: "Daily", score: 5, activities: "Time-restricted eating, glucose management", importance: "Core metabolic regulation" },
        { time: "Weekly", score: 4, activities: "High-intensity training, recovery", importance: "Metabolic flexibility training" },
        { time: "Monthly", score: 3, activities: "Body composition check", importance: "Progress monitoring" },
        { time: "Quarterly", score: 4, activities: "HbA1c, metabolic panels", importance: "Key metric tracking" },
        { time: "Annually", score: 5, activities: "Complete metabolic assessment", importance: "Full system evaluation" }
      ],
      structural: [
        { time: "Daily", score: 5, activities: "Loading exercise, mobility work", importance: "Core structural maintenance" },
        { time: "Weekly", score: 4, activities: "Strength training, recovery", importance: "Structural resilience building" },
        { time: "Monthly", score: 3, activities: "Movement assessment", importance: "Function monitoring" },
        { time: "Quarterly", score: 4, activities: "Vitamin D, mineral status", importance: "Key marker tracking" },
        { time: "Annually", score: 5, activities: "DEXA scan, full assessment", importance: "Complete evaluation" }
      ]
    }[system] || [];

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <InterventionCard
            title="Dietary Interventions"
            items={interventions[system]?.diet || []}
            icon={Apple}
            colorClass="bg-green-50 text-green-800"
          />
          <InterventionCard
            title="Supplementation"
            items={interventions[system]?.supplements || []}
            icon={Pill}
            colorClass="bg-blue-50 text-blue-800"
          />
          <InterventionCard
            title="Lifestyle Modifications"
            items={interventions[system]?.lifestyle || []}
            icon={Activity}
            colorClass="bg-yellow-50 text-yellow-800"
          />
          <InterventionCard
            title="Monitoring Protocol"
            items={interventions[system]?.monitoring || []}
            icon={Database}
            colorClass="bg-purple-50 text-purple-800"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Intervention Timeline
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={timelineData}>
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = timelineData.find(d => d.time === label);
                    return (
                      <div className="bg-white p-3 rounded shadow-lg border border-gray-200">
                        <p className="font-semibold text-gray-800">{label}</p>
                        <p className="text-sm text-blue-600 mt-1">Activities: {data.activities}</p>
                        <p className="text-sm text-gray-600 mt-1">{data.importance}</p>
                      </div>
                    );
                  }
                  return null;
                }} />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#3b82f6" 
                  name="Intervention Intensity"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              Priority Distribution
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={priorityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-3 rounded shadow-lg border border-gray-200">
                        <p className="font-semibold text-gray-800">{data.name}</p>
                        <p className="text-sm text-gray-600 mt-1">{data.description}</p>
                        <p className="text-sm text-blue-600 mt-1">Priority Level: {data.value}%</p>
                      </div>
                    );
                  }
                  return null;
                }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Genetic Profile Analysis Dashboard</h1>
        <p className="text-gray-600">Comprehensive cross-system analysis of genetic variants and their interactions</p>
      </div>

      <div className="mb-6">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {['overview', 'neurological', 'cardiovascular', 'immune', 'metabolic', 'structural'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg flex items-center ${
                activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-100'
              }`}
            >
              <span className="capitalize">{tab}</span>
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'overview' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">System Impact Analysis</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={systemScores}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="risk" fill="#ef4444" name="Risk Score" />
                <Bar dataKey="protection" fill="#22c55e" name="Protection Score" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">System Interactions</h2>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={interactionData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Tooltip content={CustomInteractionTooltip} />
                <Radar 
                  name="System Impact (1-10)" 
                  dataKey="impact" 
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.6} 
                />
                <Radar 
                  name="Intervention Priority (1-10)" 
                  dataKey="priority" 
                  stroke="#f59e0b" 
                  fill="#f59e0b" 
                  fillOpacity={0.6} 
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <SystemContent system={activeTab} />
      )}
    </div>
  );
};

export default GeneticDashboard;