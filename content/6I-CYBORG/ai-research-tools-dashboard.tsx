import React, { useState } from 'react';
import { 
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, 
  PolarRadiusAxis, Radar, Legend, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, LabelList, Cell
} from 'recharts';
import { Info, ExternalLink, BarChart2, PieChart, Cpu, BookOpen } from 'lucide-react';

// Brand colors for consistent visual identity
const BRAND_COLORS = {
  gemini: { primary: '#4285F4', light: 'rgba(66, 133, 244, 0.1)' },
  openai: { primary: '#10a37f', light: 'rgba(16, 163, 127, 0.1)' },
  perplexity: { primary: '#5536da', light: 'rgba(85, 54, 218, 0.1)' },
  claude: { primary: '#b159e9', light: 'rgba(177, 89, 233, 0.1)' }
};

// Performance data for radar chart
const radarData = [
  { subject: 'Reasoning', gemini: 85, openai: 90, perplexity: 70, claude: 85 },
  { subject: 'Speed', gemini: 75, openai: 50, perplexity: 95, claude: 65 },
  { subject: 'Citation Quality', gemini: 80, openai: 90, perplexity: 85, claude: 80 },
  { subject: 'User Experience', gemini: 85, openai: 75, perplexity: 80, claude: 70 },
  { subject: 'Integration', gemini: 90, openai: 70, perplexity: 60, claude: 85 },
  { subject: 'Visualization', gemini: 95, openai: 75, perplexity: 70, claude: 65 },
  { subject: 'Low Hallucination', gemini: 75, openai: 80, perplexity: 65, claude: 90 }
];

// Benchmark data for HLE scores
const benchmarkData = [
  { name: 'Gemini 2.5 Pro DR', value: 18.8, color: BRAND_COLORS.gemini.primary },
  { name: 'OpenAI DR', value: 14.0, color: BRAND_COLORS.openai.primary },
  { name: 'Perplexity DR', value: 21.1, color: BRAND_COLORS.perplexity.primary },
  { name: 'Claude Research', value: 8.9, color: BRAND_COLORS.claude.primary }
];

// Feature comparison data
const featureData = [
  { 
    category: 'Release Date',
    gemini: 'April 2025',
    openai: 'February 2025',
    perplexity: 'February 2025',
    claude: 'Not specifically dated'
  },
  { 
    category: 'Research Methodology',
    gemini: 'Reasoning-enhanced search with continuous loop',
    openai: 'Multi-step autonomous browsing',
    perplexity: 'Parallelized data ingestion',
    claude: 'Sequential search approach'
  },
  { 
    category: 'Processing Time',
    gemini: '~5-10 minutes',
    openai: '7-20 minutes',
    perplexity: '2-4 minutes',
    claude: 'Variable (unspecified)'
  },
  { 
    category: 'Subscription Cost',
    gemini: 'Gemini Advanced ($19.99/mo)',
    openai: 'ChatGPT Plus ($20/mo) or higher',
    perplexity: 'Free tier + Pro ($20/mo)',
    claude: 'Claude Pro ($20/mo) or higher'
  },
  { 
    category: 'Best Use Case',
    gemini: 'Visual-rich reporting, multimodal research',
    openai: 'Academic/technical deep research',
    perplexity: 'Fast, accessible research',
    claude: 'Workspace integration'
  }
];

// Use case domains
const useCases = [
  'Academic Research', 'Business Intelligence', 'Scientific Research', 
  'Journalism & Media', 'Legal Research', 'Medical Research', 'Education'
];

// Strengths and limitations data
const strengthsLimitations = {
  gemini: {
    strengths: [
      'Superior search integration with Google',
      'Excellent visualization capabilities',
      'Native multimodal processing',
      'Audio output option',
      'Reasoning-enhanced search refinement'
    ],
    limitations: [
      'SEO bias vulnerability',
      'Citations less reliable than OpenAI',
      'Not as fast as Perplexity',
      'Subscription required ($19.99/month)',
      'Limited access to proprietary sources'
    ]
  },
  openai: {
    strengths: [
      'Deep analysis capabilities',
      'Excellent citation quality',
      'Comprehensive approach',
      'Strong academic performance',
      'Low hallucination rate'
    ],
    limitations: [
      'Slowest processing time',
      'Most expensive tier',
      'Less visual capabilities',
      'Limited ecosystem integration',
      'Higher learning curve'
    ]
  },
  perplexity: {
    strengths: [
      'Fastest processing time',
      'Accessible free tier',
      'Inline citations',
      'Simple user interface',
      'Rapid iteration'
    ],
    limitations: [
      'Higher hallucination rate',
      'Less depth for complex topics',
      'Limited visualization',
      'Smaller context window',
      'Fewer integration options'
    ]
  },
  claude: {
    strengths: [
      'Excellent workspace integration',
      'Very low hallucination rate',
      'Strong document analysis',
      'Clear and transparent responses',
      'Reliable citations'
    ],
    limitations: [
      'Lower HLE score',
      'Limited visualization capabilities',
      'Variable processing time',
      'Less multimodal capability',
      'More limited research methodology'
    ]
  }
};

// Custom Tooltip component for the benchmark chart
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 rounded shadow-md text-xs">
        <p className="font-semibold">{`${payload[0].name}: ${payload[0].value}%`}</p>
        <p className="text-gray-500">Humanity's Last Exam Score</p>
      </div>
    );
  }
  return null;
};

// WeightSlider component for adjusting importance weights
const WeightSlider = ({ label, value, onChange }) => {
  return (
    <div className="flex items-center mb-4">
      <div className="w-32 mr-4 font-medium text-sm">{label}</div>
      <input 
        type="range" 
        min="1" 
        max="10" 
        value={value} 
        onChange={onChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <div className="ml-4 w-8 text-center bg-gray-100 rounded px-2 text-sm font-medium">
        {value}
      </div>
    </div>
  );
};

// InfoTag component for methodology notes
const InfoTag = ({ text }) => {
  return (
    <div className="inline-flex items-center bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full mr-2">
      <Info size={12} className="mr-1" />
      {text}
    </div>
  );
};

// ToolCard component for displaying tool information
const ToolCard = ({ name, color, description, score, badge, key }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border-t-4" style={{ borderColor: color }}>
      <div className="p-4">
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2" style={{ backgroundColor: color }}>
            <span className="text-white font-bold">{name.charAt(0)}</span>
          </div>
          <h3 className="font-bold">{name}</h3>
        </div>
        <p className="text-sm text-gray-600 mb-2">{description}</p>
        <div className="flex items-center justify-between">
          <div className="inline-block bg-gray-100 text-xs px-2 py-1 rounded">
            {badge}
          </div>
          <div className="font-bold" style={{ color }}>
            {score}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main dashboard component
const ResearchToolsDashboard = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('overview');
  
  // State for active use case
  const [activeUseCase, setActiveUseCase] = useState('Academic Research');
  
  // State for importance weights
  const [weights, setWeights] = useState({
    accuracy: 8,
    speed: 6,
    citations: 7,
    visualization: 5,
    integration: 4
  });

  // State for weighted scores (calculated based on weights)
  const [weightedScores, setWeightedScores] = useState({
    gemini: 8.2,
    openai: 7.8,
    perplexity: 7.5,
    claude: 7.7
  });

  // Handle weight change
  const handleWeightChange = (weight, value) => {
    const newWeights = { ...weights, [weight]: value };
    setWeights(newWeights);
    
    // Calculate new weighted scores
    const newScores = {
      gemini: calculateWeightedScore('gemini', newWeights),
      openai: calculateWeightedScore('openai', newWeights),
      perplexity: calculateWeightedScore('perplexity', newWeights),
      claude: calculateWeightedScore('claude', newWeights)
    };
    
    setWeightedScores(newScores);
  };

  // Calculate weighted score based on weights
  const calculateWeightedScore = (tool, currentWeights) => {
    // Tool-specific ratings for each dimension
    const ratings = {
      gemini: { accuracy: 8.5, speed: 7.5, citations: 8.0, visualization: 9.5, integration: 9.0 },
      openai: { accuracy: 9.0, speed: 5.0, citations: 9.0, visualization: 7.5, integration: 7.0 },
      perplexity: { accuracy: 7.0, speed: 9.5, citations: 8.5, visualization: 7.0, integration: 6.0 },
      claude: { accuracy: 8.5, speed: 6.5, citations: 8.0, visualization: 6.5, integration: 8.5 }
    };
    
    // Calculate weighted sum
    let weightSum = 0;
    let scoreSum = 0;
    
    for (const [dimension, weight] of Object.entries(currentWeights)) {
      scoreSum += ratings[tool][dimension] * weight;
      weightSum += parseInt(weight);
    }
    
    // Return rounded weighted average
    return Math.round((scoreSum / weightSum) * 10) / 10;
  };

  // Format data for the currently selected tab
  const formatChartData = (metric) => {
    return [
      { name: 'Gemini 2.5 Pro DR', value: getMetricValue('gemini', metric), color: BRAND_COLORS.gemini.primary },
      { name: 'OpenAI DR', value: getMetricValue('openai', metric), color: BRAND_COLORS.openai.primary },
      { name: 'Perplexity DR', value: getMetricValue('perplexity', metric), color: BRAND_COLORS.perplexity.primary },
      { name: 'Claude Research', value: getMetricValue('claude', metric), color: BRAND_COLORS.claude.primary }
    ];
  };

  // Get metric value for specific tool and metric
  const getMetricValue = (tool, metric) => {
    const metricValues = {
      accuracy: { gemini: 8.5, openai: 9.0, perplexity: 7.0, claude: 8.5 },
      speed: { gemini: 7.5, openai: 5.0, perplexity: 9.5, claude: 6.5 },
      citations: { gemini: 8.0, openai: 9.0, perplexity: 8.5, claude: 8.0 },
      visualization: { gemini: 9.5, openai: 7.5, perplexity: 7.0, claude: 6.5 },
      integration: { gemini: 9.0, openai: 7.0, perplexity: 6.0, claude: 8.5 }
    };
    
    return metricValues[metric][tool];
  };

  // Render the active tab content
  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview':
        return renderOverviewTab();
      case 'comparison':
        return renderComparisonTab();
      case 'benchmarks':
        return renderBenchmarksTab();
      case 'usecases':
        return renderUseCasesTab();
      default:
        return renderOverviewTab();
    }
  };

  // Render Overview tab content
  const renderOverviewTab = () => {
    return (
      <div>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <div className="flex">
            <Info className="mr-2 flex-shrink-0 text-blue-500" />
            <div>
              <h3 className="font-bold text-blue-800">Important Note</h3>
              <p className="text-sm text-blue-800">This comparative analysis focuses specifically on the Deep Research features of AI tools, not their general capabilities.</p>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-4">AI Research Tools Overview (2025)</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <ToolCard 
            name="Gemini 2.5 Pro DR" 
            color={BRAND_COLORS.gemini.primary}
            description="Deep Research feature with reasoning-enhanced search, visualization strength, and Google ecosystem integration."
            score="18.8% on HLE"
            badge="Released April 2025"
          />
          <ToolCard 
            name="OpenAI DR" 
            color={BRAND_COLORS.openai.primary}
            description="Multi-step autonomous browsing with excellent citation quality and deep analysis capabilities."
            score="14.0% on HLE"
            badge="Released February 2025"
          />
          <ToolCard 
            name="Perplexity DR" 
            color={BRAND_COLORS.perplexity.primary}
            description="Parallelized data ingestion with fastest processing time and accessible free tier."
            score="21.1% on HLE"
            badge="Released February 2025"
          />
          <ToolCard 
            name="Claude Research" 
            color={BRAND_COLORS.claude.primary}
            description="Sequential search approach with very low hallucination rate and strong workspace integration."
            score="8.9% on HLE"
            badge="Latest: Claude 3.7 Sonnet"
          />
        </div>

        <h2 className="text-xl font-bold mb-4">Performance Comparison</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-bold mb-2 flex items-center">
              <BarChart2 className="mr-2 text-gray-500" size={18} />
              Key Performance Metrics
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Comparative analysis across critical dimensions with 1-10 scale ratings.
            </p>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={formatChartData('accuracy')}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 10]} />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    tick={{ fontSize: 12 }}
                    width={80}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="value" 
                    nameKey="name"
                    radius={[0, 4, 4, 0]}
                  >
                    {formatChartData('accuracy').map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    <LabelList dataKey="value" position="right" formatter={(value) => `${value}/10`} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-bold mb-2 flex items-center">
              <PieChart className="mr-2 text-gray-500" size={18} />
              Capability Breakdown
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Multidimensional analysis of capabilities across key factors.
              <InfoTag text="Interactive" />
            </p>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius={90} data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
                  <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                  <Radar
                    name="Gemini 2.5 Pro DR"
                    dataKey="gemini"
                    stroke={BRAND_COLORS.gemini.primary}
                    fill={BRAND_COLORS.gemini.primary}
                    fillOpacity={0.2}
                  />
                  <Radar
                    name="OpenAI DR"
                    dataKey="openai"
                    stroke={BRAND_COLORS.openai.primary}
                    fill={BRAND_COLORS.openai.primary}
                    fillOpacity={0.2}
                  />
                  <Radar
                    name="Perplexity DR"
                    dataKey="perplexity"
                    stroke={BRAND_COLORS.perplexity.primary}
                    fill={BRAND_COLORS.perplexity.primary}
                    fillOpacity={0.2}
                  />
                  <Radar
                    name="Claude Research"
                    dataKey="claude"
                    stroke={BRAND_COLORS.claude.primary}
                    fill={BRAND_COLORS.claude.primary}
                    fillOpacity={0.2}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render Comparison tab content
  const renderComparisonTab = () => {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">Side-by-Side Comparison</h2>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Feature
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gemini 2.5 Pro DR
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    OpenAI DR
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Perplexity DR
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Claude Research
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {featureData.map((feature, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {feature.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {feature.gemini}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {feature.openai}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {feature.perplexity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {feature.claude}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-4">Strengths & Limitations</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden border-t-4" style={{ borderColor: BRAND_COLORS.gemini.primary }}>
            <div className="p-4">
              <h3 className="font-bold mb-2">Gemini 2.5 Pro DR</h3>
              <div className="mb-4">
                <h4 className="text-sm font-bold text-gray-700 mb-1">Key Strengths</h4>
                <ul className="text-sm text-gray-600 list-disc list-inside">
                  {strengthsLimitations.gemini.strengths.map((strength, index) => (
                    <li key={index}>{strength}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-700 mb-1">Limitations</h4>
                <ul className="text-sm text-gray-600 list-disc list-inside">
                  {strengthsLimitations.gemini.limitations.map((limitation, index) => (
                    <li key={index}>{limitation}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden border-t-4" style={{ borderColor: BRAND_COLORS.openai.primary }}>
            <div className="p-4">
              <h3 className="font-bold mb-2">OpenAI DR</h3>
              <div className="mb-4">
                <h4 className="text-sm font-bold text-gray-700 mb-1">Key Strengths</h4>
                <ul className="text-sm text-gray-600 list-disc list-inside">
                  {strengthsLimitations.openai.strengths.map((strength, index) => (
                    <li key={index}>{strength}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-700 mb-1">Limitations</h4>
                <ul className="text-sm text-gray-600 list-disc list-inside">
                  {strengthsLimitations.openai.limitations.map((limitation, index) => (
                    <li key={index}>{limitation}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden border-t-4" style={{ borderColor: BRAND_COLORS.perplexity.primary }}>
            <div className="p-4">
              <h3 className="font-bold mb-2">Perplexity DR</h3>
              <div className="mb-4">
                <h4 className="text-sm font-bold text-gray-700 mb-1">Key Strengths</h4>
                <ul className="text-sm text-gray-600 list-disc list-inside">
                  {strengthsLimitations.perplexity.strengths.map((strength, index) => (
                    <li key={index}>{strength}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-700 mb-1">Limitations</h4>
                <ul className="text-sm text-gray-600 list-disc list-inside">
                  {strengthsLimitations.perplexity.limitations.map((limitation, index) => (
                    <li key={index}>{limitation}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden border-t-4" style={{ borderColor: BRAND_COLORS.claude.primary }}>
            <div className="p-4">
              <h3 className="font-bold mb-2">Claude Research</h3>
              <div className="mb-4">
                <h4 className="text-sm font-bold text-gray-700 mb-1">Key Strengths</h4>
                <ul className="text-sm text-gray-600 list-disc list-inside">
                  {strengthsLimitations.claude.strengths.map((strength, index) => (
                    <li key={index}>{strength}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-700 mb-1">Limitations</h4>
                <ul className="text-sm text-gray-600 list-disc list-inside">
                  {strengthsLimitations.claude.limitations.map((limitation, index) => (
                    <li key={index}>{limitation}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-4">Weighted Comparison Tool</h2>
        
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <p className="text-sm text-gray-600 mb-4">
            Adjust the importance of different factors based on your specific needs:
            <InfoTag text="Interactive" />
          </p>
          
          <div className="mb-4">
            <WeightSlider
              label="Accuracy"
              value={weights.accuracy}
              onChange={(e) => handleWeightChange('accuracy', e.target.value)}
            />
            <WeightSlider
              label="Speed"
              value={weights.speed}
              onChange={(e) => handleWeightChange('speed', e.target.value)}
            />
            <WeightSlider
              label="Citation Quality"
              value={weights.citations}
              onChange={(e) => handleWeightChange('citations', e.target.value)}
            />
            <WeightSlider
              label="Visualization"
              value={weights.visualization}
              onChange={(e) => handleWeightChange('visualization', e.target.value)}
            />
            <WeightSlider
              label="Integration"
              value={weights.integration}
              onChange={(e) => handleWeightChange('integration', e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <h4 className="text-sm font-bold mb-2">Gemini 2.5 Pro DR</h4>
              <div className="text-2xl font-bold" style={{ color: BRAND_COLORS.gemini.primary }}>
                {weightedScores.gemini}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <h4 className="text-sm font-bold mb-2">OpenAI DR</h4>
              <div className="text-2xl font-bold" style={{ color: BRAND_COLORS.openai.primary }}>
                {weightedScores.openai}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <h4 className="text-sm font-bold mb-2">Perplexity DR</h4>
              <div className="text-2xl font-bold" style={{ color: BRAND_COLORS.perplexity.primary }}>
                {weightedScores.perplexity}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <h4 className="text-sm font-bold mb-2">Claude Research</h4>
              <div className="text-2xl font-bold" style={{ color: BRAND_COLORS.claude.primary }}>
                {weightedScores.claude}
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-2 text-center">
            Note: Scores calculated using weighted averages of the performance metrics.
          </p>
        </div>
      </div>
    );
  };

  // Render Benchmarks tab content
  const renderBenchmarksTab = () => {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">Benchmark Performance</h2>
        
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <h3 className="font-bold mb-2 flex items-center">
            <Cpu className="mr-2 text-gray-500" size={18} />
            HLE Benchmark Scores
            <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Humanity's Last Exam</span>
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Performance on the rigorous HLE benchmark testing across 100+ subjects.
          </p>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={benchmarkData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 25]} />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                  width={120}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="value" 
                  nameKey="name"
                  radius={[0, 4, 4, 0]}
                >
                  {benchmarkData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                  <LabelList dataKey="value" position="right" formatter={(value) => `${value}%`} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg mt-4">
            <h4 className="text-sm font-bold mb-2">Benchmark Methodology Note</h4>
            <p className="text-xs text-gray-600">
              HLE (Humanity's Last Exam) is a comprehensive benchmark testing AI systems across more than 100 subjects including mathematics, science, humanities, and professional disciplines. Higher scores indicate superior reasoning and knowledge capabilities.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-bold mb-2">Additional Gemini 2.5 Pro Benchmarks</h3>
            <table className="min-w-full divide-y divide-gray-200">
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">GPQA Diamond (Single Attempt)</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-blue-600 font-bold">84.0%</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">AIME 2025 (Single Attempt)</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-blue-600 font-bold">86.7%</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">SWE-Bench Verified</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-blue-600 font-bold">63.8%</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">Aider Polyglot (Whole File)</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-blue-600 font-bold">74.0%</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">MRCR (128k)</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-blue-600 font-bold">91.5%</td>
                </tr>
              </tbody>
            </table>
            <p className="text-xs text-gray-500 mt-2">
              Note: These benchmarks reflect the capabilities of the underlying Gemini 2.5 Pro model that powers the Deep Research feature.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-bold mb-2">Benchmark Insights</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start">
                <span className="inline-block w-4 h-4 rounded-full bg-green-100 text-green-800 text-xs flex items-center justify-center mr-2 mt-0.5">✓</span>
                <span><strong>HLE leader:</strong> Perplexity DR shows strongest performance (21.1%) on Humanity's Last Exam</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-4 h-4 rounded-full bg-green-100 text-green-800 text-xs flex items-center justify-center mr-2 mt-0.5">✓</span>
                <span><strong>STEM excellence:</strong> Gemini 2.5 Pro DR demonstrates exceptional performance on mathematical and scientific benchmarks</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-4 h-4 rounded-full bg-green-100 text-green-800 text-xs flex items-center justify-center mr-2 mt-0.5">✓</span>
                <span><strong>Context handling:</strong> MRCR score of 91.5% indicates superior long-context processing capabilities</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-4 h-4 rounded-full bg-green-100 text-green-800 text-xs flex items-center justify-center mr-2 mt-0.5">✓</span>
                <span><strong>Diverse capabilities:</strong> Strong performance across code (SWE-Bench), math (AIME), and scientific reasoning (GPQA)</span>
              </li>
            </ul>
            <div className="mt-4 border-t pt-4">
              <h4 className="text-sm font-bold mb-1">Methodological Considerations</h4>
              <p className="text-xs text-gray-600">
                Benchmark results should be interpreted with caution as they represent performance under controlled conditions and may not perfectly reflect real-world research capabilities. Benchmark methodologies vary and are continuously evolving.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render Use Cases tab content
  const renderUseCasesTab = () => {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">Domain-Specific Use Cases</h2>
        
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <h3 className="font-bold mb-2 flex items-center">
            <BookOpen className="mr-2 text-gray-500" size={18} />
            Optimal Tool Selection by Domain
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Different research tools excel in specific domains. Select your area of interest:
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {useCases.map((useCase) => (
              <button
                key={useCase}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  activeUseCase === useCase 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
                onClick={() => setActiveUseCase(useCase)}
              >
                {useCase}
              </button>
            ))}
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-bold mb-2">{activeUseCase} Use Cases</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h5 className="text-sm font-bold mb-1">When Gemini 2.5 Pro DR Excels</h5>
                <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                  <li>Multi-modal content integration</li>
                  <li>Complex visualization needs</li>
                  <li>STEM-focused research</li>
                  <li>Google ecosystem integration</li>
                  <li>Audio/visual output formats</li>
                </ul>
              </div>
              <div>
                <h5 className="text-sm font-bold mb-1">Optimal Complementary Tools</h5>
                <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                  <li><span style={{ color: BRAND_COLORS.perplexity.primary }} className="font-medium">Perplexity DR</span>: Initial rapid exploration</li>
                  <li><span style={{ color: BRAND_COLORS.openai.primary }} className="font-medium">OpenAI DR</span>: Deep academic literature analysis</li>
                  <li><span style={{ color: BRAND_COLORS.claude.primary }} className="font-medium">Claude Research</span>: When hallucination concerns are paramount</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-3 mt-3">
              <h5 className="text-sm font-bold mb-1">Recommended Workflow</h5>
              <ol className="text-sm text-gray-600 list-decimal list-inside space-y-1">
                <li>Begin with Perplexity DR for initial landscape mapping (speed advantage)</li>
                <li>Use Gemini 2.5 Pro DR for core research and visualization capabilities</li>
                <li>Supplement with OpenAI DR for depth in technical domains</li>
                <li>Verify factual claims with Claude Research when accuracy is critical</li>
              </ol>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <h3 className="font-bold mb-2">Key Takeaways</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="flex items-start">
              <span className="inline-block w-4 h-4 rounded-full bg-blue-100 text-blue-800 text-xs flex items-center justify-center mr-2 mt-0.5">i</span>
              <span><strong>No one-size-fits-all:</strong> Each tool has distinct strengths and limitations across domains</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-4 h-4 rounded-full bg-blue-100 text-blue-800 text-xs flex items-center justify-center mr-2 mt-0.5">i</span>
              <span><strong>Complementary capabilities:</strong> Consider using multiple tools strategically based on specific research requirements</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-4 h-4 rounded-full bg-blue-100 text-blue-800 text-xs flex items-center justify-center mr-2 mt-0.5">i</span>
              <span><strong>Domain expertise varies:</strong> Tools demonstrate varying levels of proficiency across subject domains</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-4 h-4 rounded-full bg-blue-100 text-blue-800 text-xs flex items-center justify-center mr-2 mt-0.5">i</span>
              <span><strong>Feature context matters:</strong> The Deep Research feature specifically (not just the base model) has unique strengths</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-bold mb-2">Research Methodology Comparison</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tool
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Research Approach
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Processing
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Unique Advantage
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium" style={{ color: BRAND_COLORS.gemini.primary }}>
                    Gemini 2.5 Pro DR
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    Reasoning-enhanced search with continuous loop
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    5-10 minutes
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    Multimodal integration & visualization
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium" style={{ color: BRAND_COLORS.openai.primary }}>
                    OpenAI DR
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    Multi-step autonomous browsing
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    7-20 minutes
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    Citation quality & depth
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium" style={{ color: BRAND_COLORS.perplexity.primary }}>
                    Perplexity DR
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    Parallelized data ingestion
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    2-4 minutes
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    Speed & accessibility
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium" style={{ color: BRAND_COLORS.claude.primary }}>
                    Claude Research
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    Sequential search approach
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    Variable
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    Low hallucination & workspace integration
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen pb-8">
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-8 mb-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">AI Research Tools Comparison (2025)</h1>
          <p className="text-lg opacity-90">Interactive analysis of deep research capabilities</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="bg-white shadow-md rounded-lg mb-6 flex overflow-x-auto">
          <button
            className={`px-4 py-3 font-medium text-sm flex-shrink-0 border-b-2 transition-colors ${
              activeTab === 'overview' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`px-4 py-3 font-medium text-sm flex-shrink-0 border-b-2 transition-colors ${
              activeTab === 'comparison' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('comparison')}
          >
            Detailed Comparison
          </button>
          <button
            className={`px-4 py-3 font-medium text-sm flex-shrink-0 border-b-2 transition-colors ${
              activeTab === 'benchmarks' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('benchmarks')}
          >
            Benchmarks
          </button>
          <button
            className={`px-4 py-3 font-medium text-sm flex-shrink-0 border-b-2 transition-colors ${
              activeTab === 'usecases' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('usecases')}
          >
            Use Cases
          </button>
        </div>
        
        {renderTabContent()}
        
        <div className="text-xs text-gray-500 text-center mt-8">
          <p>Interactive dashboard analyzing AI deep research capabilities, with specific focus on Gemini 2.5 Pro's Deep Research feature.</p>
          <p className="mt-1">Data validity as of April 2025 | Created with React and Recharts</p>
        </div>
      </div>
    </div>
  );
};

export default ResearchToolsDashboard;
