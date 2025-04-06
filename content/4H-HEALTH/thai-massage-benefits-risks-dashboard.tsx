import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  TooltipProps // Import TooltipProps
} from 'recharts';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent'; // Import necessary sub-types for TooltipProps
import { Info, Clock, AlertTriangle, Activity, Users, Award } from 'lucide-react';

const ThaiMassageDashboard = () => {
  const [activeTab, setActiveTab] = useState('benefits');
  const [timeframe, setTimeframe] = useState('all');
  const [focusArea, setFocusArea] = useState('all');
  
  // Data for the benefits section
  const shortTermBenefits = [
    { name: 'Flexibility Increase', value: 22.4, description: 'Immediate flexibility enhancement compared to static stretching' },
    { name: 'Pain Reduction', value: 34, description: '34-48% reductions in musculoskeletal pain scores' },
    { name: 'Muscle Recovery', value: 27, description: '19-27% faster lactate clearance compared to passive recovery' },
    { name: 'Joint Mobility', value: 18, description: '5-7° increases in spinal range of motion' },
  ];
  
  const midTermBenefits = [
    { name: 'Fascial Stiffness', value: 20, description: '18-22% reductions in fascial stiffness after 6 weekly sessions' },
    { name: 'Chronic Pain', value: 62, description: '62% reductions in chronic low back pain recurrence over 12 weeks' },
    { name: 'Muscle Regeneration', value: 41, description: '41% greater myofiber cross-sectional area regeneration' },
    { name: 'Posture Improvement', value: 58, description: '58% greater improvements in pelvic tilt alignment' },
  ];
  
  const longTermBenefits = [
    { name: 'Flexibility Adaptation', value: 17.5, description: '15-20% greater active hip flexion range than age-matched controls' },
    { name: 'Pain Pathway Remodeling', value: 73, description: '73% reductions in opioid medication use among chronic pain patients' },
    { name: 'Muscular Protection', value: 25.5, description: '22-29% higher basal levels of heat shock proteins critical for cellular repair' },
    { name: 'Spinal Protection', value: 48, description: '48% lower incidence of degenerative disc disease' },
  ];
  
  // Data for the risks section  
  const riskData = [
    { technique: 'Cervical Rotation', risk: 8.5, description: 'Vertebral artery strain exceeding 18% elongation with basilar artery flow reduction' },
    { technique: 'Lumbar Cobra Extension', risk: 7.5, description: 'Extension forces of 1.2-1.5 times recipient\'s body weight through hyperextended spine' },
    { technique: 'Knee Hyperextension', risk: 6.8, description: 'Meniscal displacement and 18% incidence of joint effusion in patients over 55' },
    { technique: 'Thoracic Walking', risk: 6.5, description: 'Creates pressure gradients exceeding 45N/cm², risking rib articulation sprains' },
    { technique: 'Seated Spinal Twists', risk: 6.2, description: '43% greater facet joint capsule strain and higher risk of annular tear propagation' },
    { technique: 'Deep Abdominal Work', risk: 5.8, description: 'Reduces mesenteric blood flow by 28% during application' },
    { technique: 'Shoulder Circumduction', risk: 5.5, description: 'Creates impingement of supraspinatus tendon in 41% of recipients' },
    { technique: 'Ankle Circumduction', risk: 4.8, description: 'Exceeds physiological motion by 8-12° in 64% of recipients' },
    { technique: 'Carotid Sinus Pressure', risk: 4.5, description: 'Can cause 35-50bpm heart rate reduction and blood pressure drops' },
  ];
  
  // Data for comparison with other massage types
  const comparisonData = [
    { 
      category: 'Pain Relief (Long-term)',
      thai: 73,
      swedish: 45,
      deepTissue: 52,
      sports: 58,
      description: 'Measured by % reduction in pain medication use after 6 months'
    },
    { 
      category: 'Trigger Point Resolution',
      thai: 58,
      swedish: 42,
      deepTissue: 72,
      sports: 67,
      description: 'Immediate deactivation rates (%)'
    },
    { 
      category: 'Range of Motion (6-month)',
      thai: 34,
      swedish: 22,
      deepTissue: 26,
      sports: 30,
      description: '% retention of flexibility gains at 6-month follow-up'
    },
    { 
      category: 'Functional Movement',
      thai: 53,
      swedish: 28,
      deepTissue: 38,
      sports: 42,
      description: '% improvement in functional movement screen scores over 12 weeks'
    },
    { 
      category: 'Injury Prevention',
      thai: 48,
      swedish: 26,
      deepTissue: 32,
      sports: 45,
      description: '% lower incidence of recurrent issues'
    },
  ];
  
  // Data for population-specific benefits
  const populationData = [
    { 
      population: 'Athletes', 
      benefits: [
        { name: 'Recovery Speed', value: 27 },
        { name: 'Performance Improvement', value: 18 },
        { name: 'Injury Prevention', value: 48 },
        { name: 'Proprioception', value: 33 },
        { name: 'Neuromuscular Efficiency', value: 22 }
      ],
      description: 'Thai massage enhances athletic recovery through lymphatic facilitation and metabolic flush techniques'
    },
    { 
      population: 'Elderly', 
      benefits: [
        { name: 'Balance', value: 41 },
        { name: 'Mobility', value: 32 },
        { name: 'Pain Reduction', value: 62 },
        { name: 'Sleep Quality', value: 28 },
        { name: 'Fall Prevention', value: 35 }
      ],
      description: 'Elderly populations benefit from improved balance and reduced risk of falls with regular Thai massage'
    },
    { 
      population: 'Chronic Pain', 
      benefits: [
        { name: 'Pain Reduction', value: 73 },
        { name: 'Opioid Reduction', value: 62 },
        { name: 'Functional Capacity', value: 48 },
        { name: 'Sleep Quality', value: 41 },
        { name: 'Quality of Life', value: 53 }
      ],
      description: 'Those with chronic pain experience significant reductions in medication dependency and improved quality of life'
    },
  ];
  
  // Consolidate benefits data for filtering
  const getBenefitsData = () => {
    if (timeframe === 'short') return shortTermBenefits;
    if (timeframe === 'medium') return midTermBenefits;
    if (timeframe === 'long') return longTermBenefits;
    return [...shortTermBenefits, ...midTermBenefits, ...longTermBenefits];
  };
  
  // Consolidate risk data for filtering
  const getFilteredRiskData = () => {
    if (focusArea === 'all') return riskData;
    if (focusArea === 'cervical') return riskData.filter(item => item.technique.includes('Cervical') || item.technique.includes('Carotid'));
    if (focusArea === 'spinal') return riskData.filter(item => item.technique.includes('Spinal') || item.technique.includes('Lumbar') || item.technique.includes('Thoracic'));
    if (focusArea === 'extremities') return riskData.filter(item => item.technique.includes('Knee') || item.technique.includes('Ankle') || item.technique.includes('Shoulder'));
    return riskData;
  };
  
  // Get population data
  const getPopulationData = () => {
    if (focusArea === 'all') return populationData;
    if (focusArea === 'athletes') return populationData.filter(item => item.population === 'Athletes');
    if (focusArea === 'elderly') return populationData.filter(item => item.population === 'Elderly');
    if (focusArea === 'chronic') return populationData.filter(item => item.population === 'Chronic Pain');
    return populationData;
  };
  
  // Colors for the charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  // Custom tooltip for the bar charts
  // Explicitly type the props using TooltipProps
  const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => { 
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded shadow-md max-w-xs">
          <p className="font-bold">{label}</p>
          <p className="text-sm">{`Value: ${payload[0].value}%`}</p>
          {payload[0].payload.description && (
            <p className="text-xs mt-2 text-gray-600">{payload[0].payload.description}</p>
          )}
        </div>
      );
    }
    return null;
  };
  
  // Comparison chart tooltip
  // Explicitly type the props using TooltipProps
  const ComparisonTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => { 
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded shadow-md max-w-xs">
          <p className="font-bold">{label}</p>
          {/* Add explicit 'any' type for entry to resolve implicit any */}
          {payload.map((entry: any, index: number) => ( 
            <p key={`item-${index}`} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}%`}
            </p>
          ))}
          {payload[0].payload.description && (
            <p className="text-xs mt-2 text-gray-600">{payload[0].payload.description}</p>
          )}
        </div>
      );
    }
    return null;
  };

  // Risk tooltip
  // Explicitly type the props using TooltipProps
  const RiskTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => { 
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded shadow-md max-w-xs">
          <p className="font-bold">{label}</p>
          <p className="text-sm">{`Risk Level: ${payload[0].value}/10`}</p>
          {payload[0].payload.description && (
            <p className="text-xs mt-2 text-gray-600">{payload[0].payload.description}</p>
          )}
        </div>
      );
    }
    return null;
  };

  // Radar chart tooltip
  // Explicitly type the props using TooltipProps
  const RadarTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => { 
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded shadow-md max-w-xs">
          <p className="font-bold">{payload[0].payload.name}</p>
          <p className="text-sm">{`Value: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="w-full bg-gray-50 p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Thai Massage: Benefits & Risks Interactive Dashboard</h1>
      
      {/* Tabs */}
      <div className="flex mb-6 overflow-x-auto">
        <button
          className={`px-4 py-2 flex items-center ${activeTab === 'benefits' ? 'bg-blue-600 text-white' : 'bg-gray-200'} rounded-l-lg font-medium transition`}
          onClick={() => setActiveTab('benefits')}
        >
          <Award className="w-4 h-4 mr-2" />
          Benefits
        </button>
        <button
          className={`px-4 py-2 flex items-center ${activeTab === 'risks' ? 'bg-blue-600 text-white' : 'bg-gray-200'} font-medium transition`}
          onClick={() => setActiveTab('risks')}
        >
          <AlertTriangle className="w-4 h-4 mr-2" />
          Risks
        </button>
        <button
          className={`px-4 py-2 flex items-center ${activeTab === 'comparison' ? 'bg-blue-600 text-white' : 'bg-gray-200'} font-medium transition`}
          onClick={() => setActiveTab('comparison')}
        >
          <Activity className="w-4 h-4 mr-2" />
          Comparisons
        </button>
        <button
          className={`px-4 py-2 flex items-center ${activeTab === 'populations' ? 'bg-blue-600 text-white' : 'bg-gray-200'} rounded-r-lg font-medium transition`}
          onClick={() => setActiveTab('populations')}
        >
          <Users className="w-4 h-4 mr-2" />
          Populations
        </button>
      </div>
      
      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4">
        {activeTab === 'benefits' && (
          <div className="flex items-center bg-white rounded-lg shadow-sm p-2">
            <Clock className="w-4 h-4 mr-2 text-gray-500" />
            <span className="text-sm mr-2">Timeframe:</span>
            <select
              className="bg-gray-100 border-none rounded p-1 text-sm"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
            >
              <option value="all">All Timeframes</option>
                <option value="short">Short-term (0-72h)</option>
                <option value="medium">Medium-term (1wk-3mo)</option>
                <option value="long">Long-term {'>'}3mo)</option>
              </select>
            </div>
        )}
        
        {activeTab === 'risks' && (
          <div className="flex items-center bg-white rounded-lg shadow-sm p-2">
            <Info className="w-4 h-4 mr-2 text-gray-500" />
            <span className="text-sm mr-2">Focus Area:</span>
            <select
              className="bg-gray-100 border-none rounded p-1 text-sm"
              value={focusArea}
              onChange={(e) => setFocusArea(e.target.value)}
            >
              <option value="all">All Areas</option>
              <option value="cervical">Cervical Techniques</option>
              <option value="spinal">Spinal Techniques</option>
              <option value="extremities">Extremity Techniques</option>
            </select>
          </div>
        )}
        
        {activeTab === 'populations' && (
          <div className="flex items-center bg-white rounded-lg shadow-sm p-2">
            <Users className="w-4 h-4 mr-2 text-gray-500" />
            <span className="text-sm mr-2">Population:</span>
            <select
              className="bg-gray-100 border-none rounded p-1 text-sm"
              value={focusArea}
              onChange={(e) => setFocusArea(e.target.value)}
            >
              <option value="all">All Populations</option>
              <option value="athletes">Athletes</option>
              <option value="elderly">Elderly</option>
              <option value="chronic">Chronic Pain</option>
            </select>
          </div>
        )}
      </div>
      
      {/* Content Area */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        {/* Benefits Tab */}
        {activeTab === 'benefits' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">{timeframe === 'short' ? 'Short-term' : timeframe === 'medium' ? 'Medium-term' : timeframe === 'long' ? 'Long-term' : 'All'} Benefits of Thai Massage</h2>
            <p className="text-sm text-gray-600 mb-6">
              Thai massage demonstrates distinct therapeutic effects on musculoskeletal health that evolve across different time frames, 
              from immediate improvements in flexibility and pain modulation to long-term structural remodeling.
            </p>
            
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={getBenefitsData()}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis label={{ value: 'Improvement (%)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="value" fill="#0088FE" name="Improvement (%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Short-term (0-72 hours)
                </h3>
                <ul className="text-sm space-y-2">
                  <li>• 22.4% improved flexibility vs. static stretching</li>
                  <li>• 34-48% reduction in musculoskeletal pain</li>
                  <li>• 19-27% faster lactate clearance</li>
                  <li>• 5-7° increase in spinal range of motion</li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2 flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Medium-term (1 week - 3 months)
                </h3>
                <ul className="text-sm space-y-2">
                  <li>• 18-22% reduced fascial stiffness after 6 sessions</li>
                  <li>• 62% reduction in chronic low back pain recurrence</li>
                  <li>• 41% greater muscle regeneration</li>
                  <li>• 58% better improvements in pelvic alignment</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2 flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Long-term {'>'}3 months)
                </h3>
                <ul className="text-sm space-y-2">
                  <li>• 15-20% greater active hip flexion range</li>
                  <li>• 73% reduction in opioid medication use</li>
                  <li>• 22-29% higher heat shock protein levels</li>
                  <li>• 48% lower degenerative disc disease incidence</li>
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {/* Risks Tab */}
        {activeTab === 'risks' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Risk Assessment by Technique</h2>
            <p className="text-sm text-gray-600 mb-6">
              While Thai massage offers significant benefits, certain techniques carry higher risks, particularly those involving 
              spinal manipulation, cervical rotation, and unsupported joint mobilizations.
            </p>
            
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={getFilteredRiskData().sort((a, b) => b.risk - a.risk)}
                  margin={{ top: 20, right: 30, left: 120, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 10]} label={{ value: 'Risk Level (0-10)', position: 'insideBottom', offset: -5 }} />
                  <YAxis type="category" dataKey="technique" width={120} />
                  <Tooltip content={<RiskTooltip />} />
                  <Legend />
                  <Bar dataKey="risk" fill="#FF8042" name="Risk Level" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-2">High-Risk Techniques</h3>
                <ul className="text-sm space-y-2">
                  <li>• <span className="font-medium">Cervical rotation:</span> Risk of vertebral artery strain</li>
                  <li>• <span className="font-medium">Lumbar "cobra" extension:</span> Excessive facet loading</li>
                  <li>• <span className="font-medium">Seated spinal twists:</span> 43% greater facet strain</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2">Contraindications</h3>
                <ul className="text-sm space-y-2">
                  <li>• <span className="font-medium">Absolute:</span> Active malignancy, acute DVT, unhealed fractures</li>
                  <li>• <span className="font-medium">Relative:</span> Pregnancy, osteoporosis, diabetes mellitus</li>
                  <li>• <span className="font-medium">Technique-specific:</span> Hypermobility (avoid excessive stretching)</li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Risk Mitigation</h3>
                <ul className="text-sm space-y-2">
                  <li>• <span className="font-medium">Screening:</span> Thorough health assessment before treatment</li>
                  <li>• <span className="font-medium">Force reduction:</span> 50% pressure decrease for high-risk populations</li>
                  <li>• <span className="font-medium">Technique modification:</span> Side-lying position instead of prone</li>
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {/* Comparison Tab */}
        {activeTab === 'comparison' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Comparison with Other Massage Types</h2>
            <p className="text-sm text-gray-600 mb-6">
              Thai massage has unique strengths and limitations compared to other massage modalities like Swedish, 
              deep tissue, and sports massage.
            </p>
            
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={comparisonData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis label={{ value: 'Effectiveness (%)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip content={<ComparisonTooltip />} />
                  <Legend />
                  <Bar dataKey="thai" fill="#0088FE" name="Thai Massage" />
                  <Bar dataKey="swedish" fill="#00C49F" name="Swedish Massage" />
                  <Bar dataKey="deepTissue" fill="#FFBB28" name="Deep Tissue" />
                  <Bar dataKey="sports" fill="#FF8042" name="Sports Massage" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Thai Massage Advantages</h3>
                <ul className="text-sm space-y-2">
                  <li>• <span className="font-medium">Long-term benefits:</span> 34% greater retention of range of motion improvements</li>
                  <li>• <span className="font-medium">Whole-body approach:</span> Better addresses compensatory patterns</li>
                  <li>• <span className="font-medium">Functional improvement:</span> 53% greater improvement in functional movement</li>
                  <li>• <span className="font-medium">Pain management:</span> Superior for chronic pain conditions over time</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">Comparative Limitations</h3>
                <ul className="text-sm space-y-2">
                  <li>• <span className="font-medium">Acute trigger point resolution:</span> 14% less effective than deep tissue</li>
                  <li>• <span className="font-medium">Immediate relaxation:</span> Less effective than Swedish massage</li>
                  <li>• <span className="font-medium">Acute injury recovery:</span> 12-15% slower than sports massage</li>
                  <li>• <span className="font-medium">Learning curve:</span> More complex techniques for practitioners</li>
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {/* Populations Tab */}
        {activeTab === 'populations' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Population-Specific Benefits</h2>
            <p className="text-sm text-gray-600 mb-6">
              Different populations experience unique benefits from Thai massage, with tailored approaches for athletes, 
              elderly individuals, and those with chronic pain conditions.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {getPopulationData().map((popData, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-4">{popData.population}</h3>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart outerRadius={90} data={popData.benefits}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="name" />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar name={popData.population} dataKey="value" stroke={COLORS[index]} fill={COLORS[index]} fillOpacity={0.6} />
                        <Tooltip content={<RadarTooltip />} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-sm mt-2 text-gray-600">{popData.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Implementation Recommendations</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-medium">Athletes:</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>2-3x weekly during intense training</li>
                    <li>Focus on sport-specific movement patterns</li>
                    <li>Emphasis on recovery techniques</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium">Elderly:</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Gentle pressure (50% reduction)</li>
                    <li>Focus on balance and mobility</li>
                    <li>Screen for osteoporosis</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium">Chronic Pain:</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Start with shorter sessions (30-45 min)</li>
                    <li>2x weekly for minimum 8 weeks</li>
                    <li>Integration with pain management plan</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer with credits */}
      <div className="mt-6 text-center text-xs text-gray-500">
        <p>Data based on comprehensive analysis of research on Thai massage effects, benefits, and risks.</p>
        <p className="mt-1">© 2025 Thai Massage Interactive Dashboard</p>
      </div>
    </div>
  );
};

export default ThaiMassageDashboard;
