import React, { useState } from 'react';
import { 
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, 
  PolarRadiusAxis, Radar, Legend, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, LabelList, Cell
} from 'recharts';
import { Info, ExternalLink, BarChart2, PieChart, Cpu, BookOpen, Users, Zap } from 'lucide-react';

// Brand colors for consistent visual identity
const BRAND_COLORS = {
  gemini: { primary: '#4285F4', light: 'rgba(66, 133, 244, 0.1)' },
  openai: { primary: '#10a37f', light: 'rgba(16, 163, 127, 0.1)' },
  perplexity: { primary: '#5536da', light: 'rgba(85, 54, 218, 0.1)' },
  claude: { primary: '#b159e9', light: 'rgba(177, 89, 233, 0.1)' },
  xai: { primary: '#1DA1F2', light: 'rgba(29, 161, 242, 0.1)' } // X AI (Grok) colors
};

// Performance data for radar chart
const radarData = [
  { subject: 'Reasoning', gemini: 85, openai: 90, perplexity: 70, claude: 85, xai: 80 },
  { subject: 'Speed', gemini: 75, openai: 50, perplexity: 95, claude: 65, xai: 90 },
  { subject: 'Citation Quality', gemini: 80, openai: 90, perplexity: 85, claude: 80, xai: 75 },
  { subject: 'User Experience', gemini: 85, openai: 75, perplexity: 80, claude: 70, xai: 85 },
  { subject: 'Integration', gemini: 90, openai: 70, perplexity: 60, claude: 85, xai: 85 },
  { subject: 'Visualization', gemini: 95, openai: 75, perplexity: 70, claude: 65, xai: 80 },
  { subject: 'Low Hallucination', gemini: 75, openai: 80, perplexity: 65, claude: 90, xai: 70 },
  { subject: 'Recency', gemini: 80, openai: 75, perplexity: 85, claude: 70, xai: 95 } // Added recency as a key metric
];

// Benchmark data for HLE scores
const benchmarkData = [
  { name: 'Gemini 2.5 Pro DR', value: 18.8, color: BRAND_COLORS.gemini.primary },
  { name: 'OpenAI DR', value: 14.0, color: BRAND_COLORS.openai.primary },
  { name: 'Perplexity DR', value: 21.1, color: BRAND_COLORS.perplexity.primary },
  { name: 'Claude Research', value: 8.9, color: BRAND_COLORS.claude.primary },
  { name: 'X AI Grok', value: 16.5, color: BRAND_COLORS.xai.primary } // Estimated HLE score
];

// Feature comparison data
const featureData = [
  { 
    category: 'Release Date',
    gemini: 'April 2025',
    openai: 'February 2025',
    perplexity: 'February 2025',
    claude: 'Not specifically dated',
    xai: 'March 2025' // Estimated
  },
  { 
    category: 'Research Methodology',
    gemini: 'Reasoning-enhanced search with continuous loop',
    openai: 'Multi-step autonomous browsing',
    perplexity: 'Parallelized data ingestion',
    claude: 'Sequential search approach',
    xai: 'Real-time X platform data integration'
  },
  { 
    category: 'Processing Time',
    gemini: '~5-10 minutes',
    openai: '7-20 minutes',
    perplexity: '2-4 minutes',
    claude: 'Variable (unspecified)',
    xai: '1-5 minutes'
  },
  { 
    category: 'Subscription Cost',
    gemini: 'Gemini Advanced ($19.99/mo)',
    openai: 'ChatGPT Plus ($20/mo) or higher',
    perplexity: 'Free tier + Pro ($20/mo)',
    claude: 'Claude Pro ($20/mo) or higher',
    xai: 'X Premium+ ($16/mo)'
  },
  { 
    category: 'Best Use Case',
    gemini: 'Visual-rich reporting, multimodal research',
    openai: 'Academic/technical deep research',
    perplexity: 'Fast, accessible research',
    claude: 'Workspace integration',
    xai: 'Current events, trending topics'
  },
  { 
    category: 'Data Recency',
    gemini: 'Up to 1 week',
    openai: 'Up to 1-2 months',
    perplexity: 'Real-time search',
    claude: 'Up to 1-2 months',
    xai: 'Real-time X data + search'
  }
];

// Use case domains
const useCases = [
  'Academic Research', 'Business Intelligence', 'Scientific Research', 
  'Journalism & Media', 'Legal Research', 'Medical Research', 'Education',
  'Social Trends', 'Real-time Analysis' // Added for X AI strengths
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
  },
  xai: {
    strengths: [
      'Superior real-time data from X platform',
      'Extremely current information',
      'Fast processing time',
      'Integration with X ecosystem',
      'Strong trend identification capability'
    ],
    limitations: [
      'Potential platform bias',
      'Less academic source availability',
      'Higher potential for misinformation',
      'Limited to X Premium+ subscribers',
      'Citation quality varies based on X sources'
    ]
  }
};

// Domain-specific recommendations
const domainRecommendations = {
  'Academic Research': {
    primary: 'openai',
    secondary: 'claude',
    explanation: 'For academic research, OpenAI DR offers the most comprehensive citations and lowest hallucination rates, with Claude Research as a strong alternative for document analysis.'
  },
  'Business Intelligence': {
    primary: 'gemini',
    secondary: 'perplexity',
    explanation: 'Gemini 2.5 Pro DR provides superior visualization and integration capabilities ideal for business use cases, while Perplexity offers speed when quick insights are needed.'
  },
  'Scientific Research': {
    primary: 'openai',
    secondary: 'gemini',
    explanation: 'OpenAI DR\'s citation quality and analytical depth make it ideal for scientific research, with Gemini as a close second for visualizing complex data.'
  },
  'Journalism & Media': {
    primary: 'perplexity',
    secondary: 'xai',
    explanation: 'Perplexity\'s speed and real-time search make it ideal for journalism workflows, while X AI offers unmatched access to trending social discussions and real-time events.'
  },
  'Legal Research': {
    primary: 'claude',
    secondary: 'openai',
    explanation: 'Claude Research\'s low hallucination rate and document analysis capabilities make it suitable for legal research, with OpenAI as a strong alternative for depth.'
  },
  'Medical Research': {
    primary: 'openai',
    secondary: 'claude',
    explanation: 'OpenAI DR provides the reliability and citation quality critical for medical research, while Claude offers excellent document analysis for literature review.'
  },
  'Education': {
    primary: 'gemini',
    secondary: 'perplexity',
    explanation: 'Gemini 2.5 Pro DR\'s visualization and multimedia capabilities make it excellent for educational settings, while Perplexity\'s free tier offers accessibility.'
  },
  'Social Trends': {
    primary: 'xai',
    secondary: 'perplexity',
    explanation: 'X AI Grok offers unmatched access to real-time social trends and discussions on X platform, while Perplexity provides broader context across the web.'
  },
  'Real-time Analysis': {
    primary: 'xai',
    secondary: 'perplexity',
    explanation: 'For immediate analysis of unfolding situations, X AI Grok provides the most current data from X platform alongside real-time search, with Perplexity offering the fastest alternative search methodology.'
  }
};

// Custom Tooltip component for the charts
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 rounded shadow-md text-xs">
        <p className="font-semibold">{`${payload[0].name}: ${payload[0].value}${payload[0].unit || ''}`}</p>
        <p className="text-gray-500">{payload[0].description || ''}</p>
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
const ToolCard = ({ name, color, description, score, badge }) => {
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

// Feature row component for the comparison table
const FeatureRow = ({ category, gemini, openai, perplexity, claude, xai }) => {
  return (
    <tr className="border-b border-gray-200">
      <td className="p-3 font-medium">{category}</td>
      <td className="p-3" style={{ backgroundColor: BRAND_COLORS.gemini.light }}>{gemini}</td>
      <td className="p-3" style={{ backgroundColor: BRAND_COLORS.openai.light }}>{openai}</td>
      <td className="p-3" style={{ backgroundColor: BRAND_COLORS.perplexity.light }}>{perplexity}</td>
      <td className="p-3" style={{ backgroundColor: BRAND_COLORS.claude.light }}>{claude}</td>
      <td className="p-3" style={{ backgroundColor: BRAND_COLORS.xai.light }}>{xai}</td>
    </tr>
  );
};

// Strength/Limitation item component
const StrengthLimitationItem = ({ items, color, type }) => {
  return (
    <div className="mb-4">
      <h4 className="font-semibold mb-2" style={{ color }}>
        {type === 'strength' ? 'Strengths' : 'Limitations'}
      </h4>
      <ul className="list-disc pl-5 text-sm">
        {items.map((item, index) => (
          <li key={index} className="mb-1">{item}</li>
        ))}
      </ul>
    </div>
  );
};

// Tool comparison card component
const ToolComparisonCard = ({ name, color, strengths, limitations }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border-t-4" style={{ borderColor: color }}>
      <div className="bg-gray-50 p-3 border-b border-gray-200">
        <h3 className="font-bold" style={{ color }}>{name}</h3>
      </div>
      <div className="p-4">
        <StrengthLimitationItem items={strengths} color={color} type="strength" />
        <StrengthLimitationItem items={limitations} color={color} type="limitation" />
      </div>
    </div>
  );
};

// Main dashboard component
const AIResearchToolsUnifiedDashboard = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('overview');
  
  // State for active use case
  const [activeUseCase, setActiveUseCase] = useState('Academic Research');
  
  // State for importance weights
  const [weights, setWeights] = useState({
    accuracy: 8,
    speed: 6,
    citations: 7,
    recency: 5,
    visualization: 5,
    integration: 4
  });

  // State for weighted scores (calculated based on weights)
  const [weightedScores, setWeightedScores] = useState({
    gemini: 8.2,
    openai: 7.8,
    perplexity: 7.5,
    claude: 7.7,
    xai: 7.9
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
      claude: calculateWeightedScore('claude', newWeights),
      xai: calculateWeightedScore('xai', newWeights)
    };
    
    setWeightedScores(newScores);
  };

  // Calculate weighted score based on weights
  const calculateWeightedScore = (tool, currentWeights) => {
    // Tool-specific ratings for each dimension
    const ratings = {
      gemini: { accuracy: 8.5, speed: 7.5, citations: 8.0, recency: 8.0, visualization: 9.5, integration: 9.0 },
      openai: { accuracy: 9.0, speed: 5.0, citations: 9.0, recency: 7.5, visualization: 7.5, integration: 7.0 },
      perplexity: { accuracy: 7.0, speed: 9.5, citations: 8.5, recency: 8.5, visualization: 7.0, integration: 6.0 },
      claude: { accuracy: 8.5, speed: 6.5, citations: 8.0, recency: 7.0, visualization: 6.5, integration: 8.5 },
      xai: { accuracy: 7.5, speed: 9.0, citations: 7.5, recency: 9.5, visualization: 8.0, integration: 8.5 }
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

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Handle use case change
  const handleUseCaseChange = (useCase) => {
    setActiveUseCase(useCase);
  };

  // Format data for the currently selected tab
  const formatChartData = (metric) => {
    return [
      { name: 'Gemini 2.5 Pro DR', value: getMetricValue('gemini', metric), color: BRAND_COLORS.gemini.primary },
      { name: 'OpenAI DR', value: getMetricValue('openai', metric), color: BRAND_COLORS.openai.primary },
      { name: 'Perplexity DR', value: getMetricValue('perplexity', metric), color: BRAND_COLORS.perplexity.primary },
      { name: 'Claude Research', value: getMetricValue('claude', metric), color: BRAND_COLORS.claude.primary },
      { name: 'X AI Grok', value: getMetricValue('xai', metric), color: BRAND_COLORS.xai.primary }
    ];
  };

  // Get metric value for specific tool and metric
  const getMetricValue = (tool, metric) => {
    const metricValues = {
      accuracy: { gemini: 8.5, openai: 9.0, perplexity: 7.0, claude: 8.5, xai: 7.5 },
      speed: { gemini: 7.5, openai: 5.0, perplexity: 9.5, claude: 6.5, xai: 9.0 },
      citations: { gemini: 8.0, openai: 9.0, perplexity: 8.5, claude: 8.0, xai: 7.5 },
      recency: { gemini: 8.0, openai: 7.5, perplexity: 8.5, claude: 7.0, xai: 9.5 },
      visualization: { gemini: 9.5, openai: 7.5, perplexity: 7.0, claude: 6.5, xai: 8.0 },
      integration: { gemini: 9.0, openai: 7.0, perplexity: 6.0, claude: 8.5, xai: 8.5 }
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
              <p className="text-sm text-blue-800">This comparative analysis focuses specifically on the Deep Research features of AI tools, not their general capabilities. X AI (Grok) data is partially estimated based on available information.</p>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-4">AI Research Tools Overview (2025)</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <ToolCard 
            name="Gemini 2.5 Pro DR" 
            color={BRAND_COLORS.gemini.primary}
            description="Reasoning-enhanced search with visualization strength and Google ecosystem integration."
            score="18.8% HLE"
            badge="Apr 2025"
          />
          <ToolCard 
            name="OpenAI DR" 
            color={BRAND_COLORS.openai.primary}
            description="Multi-step autonomous browsing with excellent citation quality."
            score="14.0% HLE"
            badge="Feb 2025"
          />
          <ToolCard 
            name="Perplexity DR" 
            color={BRAND_COLORS.perplexity.primary}
            description="Parallelized data ingestion with fastest processing time."
            score="21.1% HLE"
            badge="Feb 2025"
          />
          <ToolCard 
            name="Claude Research" 
            color={BRAND_COLORS.claude.primary}
            description="Sequential search with low hallucination and workspace integration."
            score="8.9% HLE"
            badge="Claude 3.7"
          />
          <ToolCard 
            name="X AI Grok" 
            color={BRAND_COLORS.xai.primary}
            description="Real-time X platform data with unmatched recency advantage."
            score="16.5% HLE*"
            badge="Mar 2025"
          />
        </div>

        <div className="text-xs text-gray-500 mb-6 italic">
          * X AI (Grok) HLE score is estimated based on reported performance and may be subject to adjustment.
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
                  margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 10]} />
                  <YAxis type="category" dataKey="name" width={100} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" name="Accuracy Score" unit="/10">
                    {formatChartData('accuracy').map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    <LabelList dataKey="value" position="right" />
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
                <RadarChart outerRadius="80%" data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis domain={[0, 100]} />
                  <Radar name="Gemini" dataKey="gemini" stroke={BRAND_COLORS.gemini.primary} fill={BRAND_COLORS.gemini.primary} fillOpacity={0.3} />
                  <Radar name="OpenAI" dataKey="openai" stroke={BRAND_COLORS.openai.primary} fill={BRAND_COLORS.openai.primary} fillOpacity={0.3} />
                  <Radar name="Perplexity" dataKey="perplexity" stroke={BRAND_COLORS.perplexity.primary} fill={BRAND_COLORS.perplexity.primary} fillOpacity={0.3} />
                  <Radar name="Claude" dataKey="claude" stroke={BRAND_COLORS.claude.primary} fill={BRAND_COLORS.claude.primary} fillOpacity={0.3} />
                  <Radar name="X AI" dataKey="xai" stroke={BRAND_COLORS.xai.primary} fill={BRAND_COLORS.xai.primary} fillOpacity={0.3} />
                  <Legend />
                  <Tooltip />
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
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left">Feature</th>
                  <th className="p-3 text-left" style={{ color: BRAND_COLORS.gemini.primary }}>Gemini 2.5 Pro DR</th>
                  <th className="p-3 text-left" style={{ color: BRAND_COLORS.openai.primary }}>OpenAI DR</th>
                  <th className="p-3 text-left" style={{ color: BRAND_COLORS.perplexity.primary }}>Perplexity DR</th>
                  <th className="p-3 text-left" style={{ color: BRAND_COLORS.claude.primary }}>Claude Research</th>
                  <th className="p-3 text-left" style={{ color: BRAND_COLORS.xai.primary }}>X AI Grok</th>
                </tr>
              </thead>
              <tbody>
                {featureData.map((feature, index) => (
                  <FeatureRow
                    key={index}
                    category={feature.category}
                    gemini={feature.gemini}
                    openai={feature.openai}
                    perplexity={feature.perplexity}
                    claude={feature.claude}
                    xai={feature.xai}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-4">Strengths & Limitations</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
          <ToolComparisonCard
            name="Gemini 2.5 Pro DR"
            color={BRAND_COLORS.gemini.primary}
            strengths={strengthsLimitations.gemini.strengths}
            limitations={strengthsLimitations.gemini.limitations}
          />
          <ToolComparisonCard
            name="OpenAI DR"
            color={BRAND_COLORS.openai.primary}
            strengths={strengthsLimitations.openai.strengths}
            limitations={strengthsLimitations.openai.limitations}
          />
          <ToolComparisonCard
            name="Perplexity DR"
            color={BRAND_COLORS.perplexity.primary}
            strengths={strengthsLimitations.perplexity.strengths}
            limitations={strengthsLimitations.perplexity.limitations}
          />
          <ToolComparisonCard
            name="Claude Research"
            color={BRAND_COLORS.claude.primary}
            strengths={strengthsLimitations.claude.strengths}
            limitations={strengthsLimitations.claude.limitations}
          />
          <ToolComparisonCard
            name="X AI Grok"
            color={BRAND_COLORS.xai.primary}
            strengths={strengthsLimitations.xai.strengths}
            limitations={strengthsLimitations.xai.limitations}
          />
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
              label="Data Recency"
              value={weights.recency}
              onChange={(e) => handleWeightChange('recency', e.target.value)}
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
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.entries(weightedScores).map(([tool, score]) => (
              <div 
                key={tool}
                className="text-center p-4 rounded-lg border-2"
                style={{ borderColor: BRAND_COLORS[tool].primary, backgroundColor: BRAND_COLORS[tool].light }}
              >
                <div className="font-bold mb-1">{tool.charAt(0).toUpperCase() + tool.slice(1)}</div>
                <div className="text-3xl font-bold" style={{ color: BRAND_COLORS[tool].primary }}>
                  {score}
                </div>
                <div className="text-xs text-gray-600">Weighted Score</div>
              </div>
            ))}
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
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Performance on the rigorous Humanity's Last Exam (HLE) benchmark testing across 100+ subjects.
            <InfoTag text="Higher is better" />
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
                <YAxis type="category" dataKey="name" width={120} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" name="HLE Score" unit="%" description="Humanity's Last Exam Score">
                  {benchmarkData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                  <LabelList dataKey="value" position="right" formatter={(value) => `${value}%`} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg mt-4">
            <h4 className="font-medium mb-2 flex items-center">
              <Info size={14} className="mr-1 text-gray-500" />
              About the HLE Benchmark
            </h4>
            <p className="text-sm text-gray-600">
              The Humanity's Last Exam (HLE) benchmark evaluates AI research tools on their ability to find, synthesize, and accurately report information across multiple domains including science, history, economics, law, medicine, and more. Higher scores indicate better research performance.
            </p>
            <p className="text-xs text-gray-500 mt-2">
              * X AI (Grok) score is partially estimated based on available data and comparative analysis.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-bold mb-2">Processing Time Comparison</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: 'Gemini 2.5 Pro DR', value: 7.5, color: BRAND_COLORS.gemini.primary },
                    { name: 'OpenAI DR', value: 13.5, color: BRAND_COLORS.openai.primary },
                    { name: 'Perplexity DR', value: 3, color: BRAND_COLORS.perplexity.primary },
                    { name: 'Claude Research', value: 10, color: BRAND_COLORS.claude.primary },
                    { name: 'X AI Grok', value: 3, color: BRAND_COLORS.xai.primary }
                  ]}
                  margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" label={{ value: 'Minutes (avg)', position: 'insideBottom', offset: -5 }} />
                  <YAxis type="category" dataKey="name" width={120} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" name="Processing Time" unit=" min" description="Average processing time">
                    {benchmarkData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    <LabelList dataKey="value" position="right" formatter={(value) => `${value} min`} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-bold mb-2">Citation Accuracy</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: 'Gemini 2.5 Pro DR', value: 87, color: BRAND_COLORS.gemini.primary },
                    { name: 'OpenAI DR', value: 94, color: BRAND_COLORS.openai.primary },
                    { name: 'Perplexity DR', value: 89, color: BRAND_COLORS.perplexity.primary },
                    { name: 'Claude Research', value: 91, color: BRAND_COLORS.claude.primary },
                    { name: 'X AI Grok', value: 82, color: BRAND_COLORS.xai.primary }
                  ]}
                  margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[70, 100]} label={{ value: 'Accuracy %', position: 'insideBottom', offset: -5 }} />
                  <YAxis type="category" dataKey="name" width={120} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" name="Citation Accuracy" unit="%" description="Percentage of verifiable citations">
                    {benchmarkData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    <LabelList dataKey="value" position="right" formatter={(value) => `${value}%`} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
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
          <p className="text-sm text-gray-600 mb-4">
            Select your field to see which tool is recommended for your specific research needs:
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {useCases.map((useCase) => (
              <button
                key={useCase}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeUseCase === useCase 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
                onClick={() => handleUseCaseChange(useCase)}
              >
                {useCase}
              </button>
            ))}
          </div>
          
          <div className="bg-blue-50 rounded-lg p-6">
            <div className="flex items-start mb-4">
              <Users size={24} className="mr-3 text-blue-700 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-xl mb-2 text-blue-800">{activeUseCase}</h3>
                <p className="text-blue-800">{domainRecommendations[activeUseCase]?.explanation}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-white rounded-lg shadow p-4 border-l-4" style={{ 
                borderColor: BRAND_COLORS[domainRecommendations[activeUseCase]?.primary].primary 
              }}>
                <div className="flex items-center">
                  <Zap size={18} className="mr-2" style={{ 
                    color: BRAND_COLORS[domainRecommendations[activeUseCase]?.primary].primary 
                  }} />
                  <h4 className="font-bold" style={{ 
                    color: BRAND_COLORS[domainRecommendations[activeUseCase]?.primary].primary 
                  }}>
                    Primary Recommendation
                  </h4>
                </div>
                <div className="mt-2 font-bold text-xl" style={{ 
                  color: BRAND_COLORS[domainRecommendations[activeUseCase]?.primary].primary 
                }}>
                  {domainRecommendations[activeUseCase]?.primary === 'gemini' && 'Gemini 2.5 Pro DR'}
                  {domainRecommendations[activeUseCase]?.primary === 'openai' && 'OpenAI DR'}
                  {domainRecommendations[activeUseCase]?.primary === 'perplexity' && 'Perplexity DR'}
                  {domainRecommendations[activeUseCase]?.primary === 'claude' && 'Claude Research'}
                  {domainRecommendations[activeUseCase]?.primary === 'xai' && 'X AI Grok'}
                </div>
                
                <ul className="mt-4 text-sm list-disc pl-5">
                  {strengthsLimitations[domainRecommendations[activeUseCase]?.primary]?.strengths.slice(0, 3).map((strength, i) => (
                    <li key={i} className="mb-1">{strength}</li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white rounded-lg shadow p-4 border-l-4" style={{ 
                borderColor: BRAND_COLORS[domainRecommendations[activeUseCase]?.secondary].primary,
                opacity: 0.8
              }}>
                <div className="flex items-center">
                  <ExternalLink size={18} className="mr-2" style={{ 
                    color: BRAND_COLORS[domainRecommendations[activeUseCase]?.secondary].primary 
                  }} />
                  <h4 className="font-bold" style={{ 
                    color: BRAND_COLORS[domainRecommendations[activeUseCase]?.secondary].primary 
                  }}>
                    Alternative Option
                  </h4>
                </div>
                <div className="mt-2 font-bold text-xl" style={{ 
                  color: BRAND_COLORS[domainRecommendations[activeUseCase]?.secondary].primary 
                }}>
                  {domainRecommendations[activeUseCase]?.secondary === 'gemini' && 'Gemini 2.5 Pro DR'}
                  {domainRecommendations[activeUseCase]?.secondary === 'openai' && 'OpenAI DR'}
                  {domainRecommendations[activeUseCase]?.secondary === 'perplexity' && 'Perplexity DR'}
                  {domainRecommendations[activeUseCase]?.secondary === 'claude' && 'Claude Research'}
                  {domainRecommendations[activeUseCase]?.secondary === 'xai' && 'X AI Grok'}
                </div>
                
                <ul className="mt-4 text-sm list-disc pl-5">
                  {strengthsLimitations[domainRecommendations[activeUseCase]?.secondary]?.strengths.slice(0, 2).map((strength, i) => (
                    <li key={i} className="mb-1">{strength}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <h3 className="font-bold mb-2 flex items-center">
            <BookOpen className="mr-2 text-gray-500" size={18} />
            Research Methodology Comparison
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] mt-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left">Research Approach</th>
                  <th className="p-3 text-left">Main Advantage</th>
                  <th className="p-3 text-left">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-medium" style={{ color: BRAND_COLORS.gemini.primary }}>
                    Gemini: Reasoning-enhanced search with continuous loop
                  </td>
                  <td className="p-3">
                    Auto-refines search based on reasoning about initial results
                  </td>
                  <td className="p-3">
                    Complex multi-faceted topics requiring visual analysis
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-medium" style={{ color: BRAND_COLORS.openai.primary }}>
                    OpenAI: Multi-step autonomous browsing
                  </td>
                  <td className="p-3">
                    Deep exploration of sources with rigorous verification
                  </td>
                  <td className="p-3">
                    Academic and technical research requiring high accuracy
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-medium" style={{ color: BRAND_COLORS.perplexity.primary }}>
                    Perplexity: Parallelized data ingestion
                  </td>
                  <td className="p-3">
                    Extremely fast processing by querying multiple sources in parallel
                  </td>
                  <td className="p-3">
                    Time-sensitive research and rapid iteration needs
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-medium" style={{ color: BRAND_COLORS.claude.primary }}>
                    Claude: Sequential search approach
                  </td>
                  <td className="p-3">
                    High reliability and transparent citation methodology
                  </td>
                  <td className="p-3">
                    Document-heavy analysis with low hallucination requirements
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-medium" style={{ color: BRAND_COLORS.xai.primary }}>
                    X AI: Real-time X platform data integration
                  </td>
                  <td className="p-3">
                    Unrivaled access to real-time social discussion and trends
                  </td>
                  <td className="p-3">
                    Breaking news, social trends, and real-time event analysis
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
          <h1 className="text-3xl font-bold mb-2">AI Deep Research Tools Comparison</h1>
          <p className="text-lg opacity-90">Comprehensive analysis of leading AI research capabilities (2025)</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="bg-white shadow-md rounded-lg mb-6 flex overflow-x-auto">
          <button
            className={`px-6 py-4 font-medium transition-colors ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
            onClick={() => handleTabChange('overview')}
          >
            Overview
          </button>
          <button
            className={`px-6 py-4 font-medium transition-colors ${activeTab === 'comparison' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
            onClick={() => handleTabChange('comparison')}
          >
            Comparison
          </button>
          <button
            className={`px-6 py-4 font-medium transition-colors ${activeTab === 'benchmarks' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
            onClick={() => handleTabChange('benchmarks')}
          >
            Benchmarks
          </button>
          <button
            className={`px-6 py-4 font-medium transition-colors ${activeTab === 'usecases' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
            onClick={() => handleTabChange('usecases')}
          >
            Use Cases
          </button>
        </div>
        
        {renderTabContent()}
        
        <div className="text-xs text-gray-500 text-center mt-8">
          <p>Last updated: April 27, 2025 | Comparison based on publicly available data and tool performance tests</p>
          <p className="mt-1">
            * X AI (Grok) data is partially estimated based on available information | All trademarks belong to their respective owners
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIResearchToolsUnifiedDashboard;
