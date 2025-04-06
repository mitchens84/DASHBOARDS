import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ReferenceLine, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ScatterChart, Scatter, ZAxis
} from 'recharts';
import { 
  Calendar, AlertCircle, Wind, Home, Droplets, Activity,
  Thermometer, AlertTriangle, ArrowDown, ArrowUp, Info, Settings,
  Search, Map, MountainSnow, Leaf, Users, Flame, Sun, Cloud
} from 'lucide-react';
import _ from 'lodash';

// Sample data based on the HTML document
const seasonalData = [
  { month: 'Jan', pm25: 35, pm10: 60, ozone: 30, no2: 15, co: 0.8, risk: 'Medium' },
  { month: 'Feb', pm25: 85, pm10: 140, ozone: 35, no2: 18, co: 1.2, risk: 'High' },
  { month: 'Mar', pm25: 120, pm10: 190, ozone: 45, no2: 22, co: 1.5, risk: 'Very High' },
  { month: 'Apr', pm25: 95, pm10: 160, ozone: 55, no2: 24, co: 1.3, risk: 'High' },
  { month: 'May', pm25: 45, pm10: 80, ozone: 50, no2: 20, co: 0.9, risk: 'Medium' },
  { month: 'Jun', pm25: 25, pm10: 50, ozone: 45, no2: 16, co: 0.7, risk: 'Moderate' },
  { month: 'Jul', pm25: 15, pm10: 30, ozone: 40, no2: 12, co: 0.5, risk: 'Low' },
  { month: 'Aug', pm25: 10, pm10: 25, ozone: 35, no2: 10, co: 0.4, risk: 'Low' },
  { month: 'Sep', pm25: 12, pm10: 28, ozone: 38, no2: 11, co: 0.4, risk: 'Low' },
  { month: 'Oct', pm25: 18, pm10: 35, ozone: 40, no2: 13, co: 0.5, risk: 'Low' },
  { month: 'Nov', pm25: 25, pm10: 45, ozone: 35, no2: 15, co: 0.6, risk: 'Moderate' },
  { month: 'Dec', pm25: 30, pm10: 55, ozone: 32, no2: 16, co: 0.7, risk: 'Moderate' }
];

const pollutionSourcesData = [
  { name: 'Biomass Burning', value: 51, color: '#e74c3c' },
  { name: 'Long-Range Pollution', value: 23, color: '#3498db' },
  { name: 'Vehicle Emissions', value: 15, color: '#2c3e50' },
  { name: 'Urban & Industrial', value: 11, color: '#f39c12' }
];

const pollutantTypesData = [
  { type: 'PM10', size: '2.5-10μm', maxConc: 300, impact: 'Upper respiratory' },
  { type: 'PM2.5', size: '0.1-2.5μm', maxConc: 200, impact: 'Deep lung penetration' },
  { type: 'Ultrafine', size: '<0.1μm', maxConc: 150, impact: 'Blood-brain barrier' },
  { type: 'Ozone', size: 'Gas', maxConc: 120, impact: 'Respiratory inflammation' },
  { type: 'NO2', size: 'Gas', maxConc: 80, impact: 'Respiratory irritation' },
  { type: 'CO', size: 'Gas', maxConc: 60, impact: 'Oxygen displacement' }
];

const healthImpactsData = [
  { name: 'Respiratory', pm25: 85, ozone: 80, no2: 70 },
  { name: 'Cardiovascular', pm25: 65, ozone: 40, no2: 50 },
  { name: 'Neurological', pm25: 55, ozone: 30, no2: 20 },
  { name: 'Immune', pm25: 45, ozone: 25, no2: 15 },
  { name: 'Skin & Eyes', pm25: 40, ozone: 60, no2: 45 }
];

const mitigationEffectivenessData = [
  { strategy: 'N95 Masks', pm25: 90, ozone: 5, no2: 5, cost: 2, effort: 1 },
  { strategy: 'HEPA Filters', pm25: 95, ozone: 25, no2: 30, cost: 4, effort: 2 },
  { strategy: 'Activated Carbon', pm25: 30, ozone: 80, no2: 75, cost: 3, effort: 2 },
  { strategy: 'Timing Activities', pm25: 60, ozone: 60, no2: 60, cost: 1, effort: 3 },
  { strategy: 'Relocation', pm25: 100, ozone: 100, no2: 100, cost: 5, effort: 5 }
];

// Risk thresholds based on PM2.5 levels (μg/m³)
const riskThresholds = {
  low: 12,
  moderate: 35.4,
  high: 55.4,
  veryHigh: 150.4,
  hazardous: 250.4
};

// Utility functions
const getRiskColor = (level) => {
  const colors = {
    'Low': '#27ae60',
    'Moderate': '#f39c12',
    'Medium': '#f39c12',
    'High': '#e74c3c',
    'Very High': '#8e44ad',
    'Hazardous': '#2c3e50'
  };
  return colors[level] || '#3498db';
};

const getRiskLevel = (pm25) => {
  if (pm25 <= riskThresholds.low) return 'Low';
  if (pm25 <= riskThresholds.moderate) return 'Moderate';
  if (pm25 <= riskThresholds.high) return 'High';
  if (pm25 <= riskThresholds.veryHigh) return 'Very High';
  return 'Hazardous';
};

// Dashboard Component
const ChiangMaiAirPollutionDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [pollutantType, setPollutantType] = useState('pm25');
  const [timeRange, setTimeRange] = useState('annual');
  const [userProfile, setUserProfile] = useState({
    sensitivityLevel: 'moderate',
    activityLevel: 'moderate',
    mask: 'n95',
    indoorFilter: 'hepa',
    showHealth: true
  });
  
  // Calculate current risk based on month
  const currentMonth = new Date().getMonth();
  const currentMonthData = seasonalData[currentMonth];
  const currentRisk = getRiskLevel(currentMonthData.pm25);
  
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-blue-800 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Chiang Mai Air Pollution Dashboard</h1>
            <p className="text-blue-200">Interactive Analysis & Personal Protection</p>
          </div>
          <div className="flex items-center space-x-2 bg-blue-700 p-2 rounded-lg">
            <Calendar size={20} />
            <span className="font-medium">{currentMonthData.month} 2025</span>
            <span className="mx-2">|</span>
            <AlertCircle size={20} color={getRiskColor(currentRisk)} />
            <span className="font-medium" style={{color: getRiskColor(currentRisk)}}>{currentRisk} Risk</span>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="container mx-auto mt-4 flex border-b border-blue-700">
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'overview' ? 'bg-white text-blue-800 rounded-t-lg' : 'text-blue-200'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'patterns' ? 'bg-white text-blue-800 rounded-t-lg' : 'text-blue-200'}`}
            onClick={() => setActiveTab('patterns')}
          >
            Seasonal Patterns
          </button>
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'sources' ? 'bg-white text-blue-800 rounded-t-lg' : 'text-blue-200'}`}
            onClick={() => setActiveTab('sources')}
          >
            Pollution Sources
          </button>
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'health' ? 'bg-white text-blue-800 rounded-t-lg' : 'text-blue-200'}`}
            onClick={() => setActiveTab('health')}
          >
            Health Impacts
          </button>
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'protection' ? 'bg-white text-blue-800 rounded-t-lg' : 'text-blue-200'}`}
            onClick={() => setActiveTab('protection')}
          >
            Protection Strategies
          </button>
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'personalize' ? 'bg-white text-blue-800 rounded-t-lg' : 'text-blue-200'}`}
            onClick={() => setActiveTab('personalize')}
          >
            Personalize
          </button>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto py-6 px-4">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Current Conditions Card */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-bold mb-2 border-b pb-2">Current Conditions</h2>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600">PM2.5 Level</p>
                    <p className="text-3xl font-bold" style={{color: getRiskColor(currentRisk)}}>{currentMonthData.pm25} μg/m³</p>
                    <p className="bg-gray-100 text-gray-800 inline-block px-2 py-1 rounded mt-1">
                      {currentMonthData.pm25 > 25 ? `${Math.round(currentMonthData.pm25/25)}× WHO limit` : 'Within WHO limit'}
                    </p>
                  </div>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{backgroundColor: getRiskColor(currentRisk)}}>
                    <span className="text-white font-bold">{currentRisk.split(' ')[0]}</span>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-xs text-gray-500">PM10</p>
                    <p className="font-bold">{currentMonthData.pm10}</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-xs text-gray-500">Ozone</p>
                    <p className="font-bold">{currentMonthData.ozone}</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-xs text-gray-500">NO₂</p>
                    <p className="font-bold">{currentMonthData.no2}</p>
                  </div>
                </div>
              </div>
              
              {/* Key Facts Card */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-bold mb-2 border-b pb-2">Key Facts</h2>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Flame className="text-red-500 mr-2 mt-1 flex-shrink-0" size={16} />
                    <span>Biomass burning accounts for 51% of pollution</span>
                  </li>
                  <li className="flex items-start">
                    <Wind className="text-blue-500 mr-2 mt-1 flex-shrink-0" size={16} />
                    <span>23% comes from long-range sources (India)</span>
                  </li>
                  <li className="flex items-start">
                    <Calendar className="text-purple-500 mr-2 mt-1 flex-shrink-0" size={16} />
                    <span>Peak pollution season: February-April</span>
                  </li>
                  <li className="flex items-start">
                    <Activity className="text-orange-500 mr-2 mt-1 flex-shrink-0" size={16} />
                    <span>PM2.5 can reach 20× WHO guidelines during peaks</span>
                  </li>
                </ul>
              </div>
              
              {/* LBS Integration Card */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-bold mb-2 border-b pb-2">LBS Framework Integration</h2>
                <div className="space-y-3">
                  <div className="bg-blue-50 p-2 rounded border-l-4 border-blue-500">
                    <p className="font-medium text-blue-800">4H-ENVIRONMENT</p>
                    <p className="text-sm">System for identifying, evaluating, and managing personal exposure to harmful substances</p>
                  </div>
                  <div className="bg-green-50 p-2 rounded border-l-4 border-green-500">
                    <p className="font-medium text-green-800">3P-HOME</p>
                    <p className="text-sm">Customized living environment with pollution management considerations</p>
                  </div>
                  <div className="bg-purple-50 p-2 rounded border-l-4 border-purple-500">
                    <p className="font-medium text-purple-800">4H-BIOHACKING</p>
                    <p className="text-sm">Optimizing health and longevity despite environmental challenges</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Overview Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Seasonal Pattern Preview */}
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold">Annual Pollution Pattern</h2>
                  <button 
                    className="text-blue-600 text-sm flex items-center"
                    onClick={() => setActiveTab('patterns')}
                  >
                    Detailed View <ArrowRight size={16} className="ml-1" />
                  </button>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={seasonalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pm25" name="PM2.5" stroke="#e74c3c" />
                    <ReferenceLine y={25} stroke="#27ae60" strokeDasharray="3 3" label={{ value: 'WHO Guideline', position: 'insideBottomRight', fill: '#27ae60', fontSize: 12 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              {/* Pollution Sources Preview */}
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold">Pollution Sources</h2>
                  <button 
                    className="text-blue-600 text-sm flex items-center"
                    onClick={() => setActiveTab('sources')}
                  >
                    Detailed View <ArrowRight size={16} className="ml-1" />
                  </button>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-64 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pollutionSourcesData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {pollutionSourcesData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Personal Impact Summary */}
            <div className="mt-6 bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-bold mb-4">Personal Impact Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="font-medium text-gray-800 flex items-center">
                    <AlertTriangle size={18} className="text-orange-500 mr-2" />
                    Current Risk Level
                  </h3>
                  <div className="mt-2 flex items-center">
                    <div className="w-4 h-4 rounded-full mr-2" style={{backgroundColor: getRiskColor(currentRisk)}}></div>
                    <span className="font-bold">{currentRisk}</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    {currentRisk === 'Low' && 'Air quality is considered satisfactory, and air pollution poses little or no risk.'}
                    {currentRisk === 'Moderate' && 'Air quality is acceptable; however, some pollutants may be a moderate health concern for a small number of people.'}
                    {currentRisk === 'Medium' && 'Members of sensitive groups may experience health effects. The general public is not likely to be affected.'}
                    {currentRisk === 'High' && 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.'}
                    {currentRisk === 'Very High' && 'Health warnings of emergency conditions. The entire population is more likely to be affected.'}
                    {currentRisk === 'Hazardous' && 'Health alert: everyone may experience more serious health effects.'}
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="font-medium text-gray-800 flex items-center">
                    <Shield size={18} className="text-blue-500 mr-2" />
                    Recommended Protection
                  </h3>
                  <ul className="mt-2 space-y-1 text-sm">
                    {currentRisk === 'Low' && (
                      <>
                        <li className="flex items-center"><CheckCircle size={14} className="text-green-500 mr-1" /> Normal outdoor activities</li>
                        <li className="flex items-center"><CheckCircle size={14} className="text-green-500 mr-1" /> No special protection needed</li>
                      </>
                    )}
                    {(currentRisk === 'Moderate' || currentRisk === 'Medium') && (
                      <>
                        <li className="flex items-center"><CheckCircle size={14} className="text-green-500 mr-1" /> Consider N95 masks for sensitive individuals</li>
                        <li className="flex items-center"><CheckCircle size={14} className="text-green-500 mr-1" /> Monitor air quality when planning extended outdoor activities</li>
                      </>
                    )}
                    {(currentRisk === 'High' || currentRisk === 'Very High') && (
                      <>
                        <li className="flex items-center"><AlertCircle size={14} className="text-red-500 mr-1" /> Wear N95 masks outdoors</li>
                        <li className="flex items-center"><AlertCircle size={14} className="text-red-500 mr-1" /> Run HEPA air purifiers indoors</li>
                        <li className="flex items-center"><AlertCircle size={14} className="text-red-500 mr-1" /> Limit outdoor activities</li>
                      </>
                    )}
                    {currentRisk === 'Hazardous' && (
                      <>
                        <li className="flex items-center"><AlertCircle size={14} className="text-red-500 mr-1" /> Stay indoors with air purification</li>
                        <li className="flex items-center"><AlertCircle size={14} className="text-red-500 mr-1" /> Wear N95 masks if outdoors is necessary</li>
                        <li className="flex items-center"><AlertCircle size={14} className="text-red-500 mr-1" /> Consider temporary relocation if persistent</li>
                      </>
                    )}
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="font-medium text-gray-800 flex items-center">
                    <Calendar size={18} className="text-purple-500 mr-2" />
                    Projection & Planning
                  </h3>
                  <div className="mt-2">
                    <div className="flex items-center mb-2">
                      <ArrowUp size={16} className={`mr-1 ${seasonalData[(currentMonth + 1) % 12].pm25 > currentMonthData.pm25 ? 'text-red-500' : 'text-green-500'}`} />
                      <span className="text-sm">
                        Next month: <strong>{seasonalData[(currentMonth + 1) % 12].month}</strong> - 
                        <span className="font-medium"> {getRiskLevel(seasonalData[(currentMonth + 1) % 12].pm25)} Risk</span>
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-1 text-blue-500" />
                      <span className="text-sm">
                        Best air quality: <strong>July-October</strong>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Seasonal Patterns Tab */}
        {activeTab === 'patterns' && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4">Seasonal Pollution Patterns</h2>
              <p className="mb-4">
                Chiang Mai experiences dramatic seasonal variations in air pollutant levels, with the February-April burning season 
                showing PM2.5 concentrations up to 20 times WHO guidelines. This visualization allows you to explore these patterns 
                and plan accordingly.
              </p>
              
              <div className="bg-white p-4 rounded-lg shadow mb-6">
                <div className="flex flex-wrap gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pollutant Type</label>
                    <select 
                      className="border rounded p-2 bg-white"
                      value={pollutantType}
                      onChange={(e) => setPollutantType(e.target.value)}
                    >
                      <option value="pm25">PM2.5</option>
                      <option value="pm10">PM10</option>
                      <option value="ozone">Ozone</option>
                      <option value="no2">Nitrogen Dioxide</option>
                      <option value="co">Carbon Monoxide</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">View</label>
                    <div className="flex border rounded overflow-hidden">
                      <button 
                        className={`px-3 py-2 ${timeRange === 'annual' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                        onClick={() => setTimeRange('annual')}
                      >
                        Annual
                      </button>
                      <button 
                        className={`px-3 py-2 ${timeRange === 'seasonal' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                        onClick={() => setTimeRange('seasonal')}
                      >
                        Seasonal
                      </button>
                      <button 
                        className={`px-3 py-2 ${timeRange === 'compare' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                        onClick={() => setTimeRange('compare')}
                      >
                        Compare
                      </button>
                    </div>
                  </div>
                </div>
                
                <ResponsiveContainer width="100%" height={400}>
                  {timeRange === 'annual' ? (
                    <LineChart data={seasonalData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey={pollutantType} 
                        name={pollutantType.toUpperCase()} 
                        stroke="#8884d8" 
                        strokeWidth={2}
                      />
                      {pollutantType === 'pm25' && (
                        <ReferenceLine y={25} stroke="#27ae60" strokeDasharray="3 3" label={{ value: 'WHO Guideline', position: 'insideBottomRight', fill: '#27ae60', fontSize: 12 }} />
                      )}
                      {pollutantType === 'pm10' && (
                        <ReferenceLine y={50} stroke="#27ae60" strokeDasharray="3 3" label={{ value: 'WHO Guideline', position: 'insideBottomRight', fill: '#27ae60', fontSize: 12 }} />
                      )}
                    </LineChart>
                  ) : timeRange === 'seasonal' ? (
                    <BarChart data={seasonalData.reduce((acc, month) => {
                      const season = 
                        ['Dec', 'Jan', 'Feb'].includes(month.month) ? 'Cool Season' :
                        ['Mar', 'Apr', 'May'].includes(month.month) ? 'Burning Season' :
                        ['Jun', 'Jul', 'Aug'].includes(month.month) ? 'Rainy Season' : 
                        'Transition Season';
                      
                      const existingEntry = acc.find(entry => entry.season === season);
                      if (existingEntry) {
                        existingEntry.count++;
                        existingEntry[pollutantType] = (existingEntry[pollutantType] * (existingEntry.count - 1) + month[pollutantType]) / existingEntry.count;
                      } else {
                        acc.push({ 
                          season, 
                          [pollutantType]: month[pollutantType],
                          count: 1
                        });
                      }
                      return acc;
                    }, [])}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="season" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey={pollutantType} name={pollutantType.toUpperCase()} fill="#8884d8" />
                    </BarChart>
                  ) : (
                    <LineChart data={seasonalData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="pm25" name="PM2.5" stroke="#e74c3c" strokeWidth={2} />
                      <Line type="monotone" dataKey="pm10" name="PM10" stroke="#3498db" strokeWidth={2} />
                      <Line type="monotone" dataKey="ozone" name="Ozone" stroke="#2ecc71" strokeWidth={2} />
                    </LineChart>
                  )}
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-red-50 p-4 rounded border-t-4 border-red-500">
                  <h3 className="font-bold text-red-800 flex items-center">
                    <Flame size={18} className="mr-2" />
                    Burning Season
                  </h3>
                  <p className="text-sm mt-2">February - April</p>
                  <p className="text-sm mt-1">PM2.5: 50-300+ μg/m³</p>
                  <p className="text-sm mt-1">Agricultural burning, forest fires</p>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded border-t-4 border-yellow-500">
                  <h3 className="font-bold text-yellow-800 flex items-center">
                    <Sun size={18} className="mr-2" />
                    Transition Period
                  </h3>
                  <p className="text-sm mt-2">May - June</p>
                  <p className="text-sm mt-1">PM2.5: 15-50 μg/m³</p>
                  <p className="text-sm mt-1">Residual fires, urban emissions</p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded border-t-4 border-blue-500">
                  <h3 className="font-bold text-blue-800 flex items-center">
                    <Droplets size={18} className="mr-2" />
                    Rainy Season
                  </h3>
                  <p className="text-sm mt-2">July - October</p>
                  <p className="text-sm mt-1">PM2.5: 5-20 μg/m³</p>
                  <p className="text-sm mt-1">Urban emissions</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded border-t-4 border-gray-500">
                  <h3 className="font-bold text-gray-800 flex items-center">
                    <Thermometer size={18} className="mr-2" />
                    Cool Season
                  </h3>
                  <p className="text-sm mt-2">November - January</p>
                  <p className="text-sm mt-1">PM2.5: 15-50 μg/m³</p>
                  <p className="text-sm mt-1">Urban emissions, early burning</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold mb-4">Daily Variation Patterns</h3>
              <p className="mb-4">
                Typical daily patterns show pollution accumulation overnight and gradual clearing during daytime. 
                However, active fires can disrupt this pattern. The graph below shows typical 24-hour variation patterns 
                during different seasons.
              </p>
              
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={[
                    { hour: '12am', burning: 90, normal: 40, rainy: 15 },
                    { hour: '2am', burning: 95, normal: 45, rainy: 18 },
                    { hour: '4am', burning: 100, normal: 48, rainy: 20 },
                    { hour: '6am', burning: 110, normal: 50, rainy: 22 },
                    { hour: '8am', burning: 105, normal: 45, rainy: 20 },
                    { hour: '10am', burning: 85, normal: 38, rainy: 15 },
                    { hour: '12pm', burning: 95, normal: 35, rainy: 12 },
                    { hour: '2pm', burning: 110, normal: 32, rainy: 10 },
                    { hour: '4pm', burning: 100, normal: 30, rainy: 10 },
                    { hour: '6pm', burning: 90, normal: 32, rainy: 12 },
                    { hour: '8pm', burning: 85, normal: 35, rainy: 14 },
                    { hour: '10pm', burning: 88, normal: 38, rainy: 15 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="burning" name="Burning Season" stroke="#e74c3c" />
                  <Line type="monotone" dataKey="normal" name="Normal Days" stroke="#f39c12" />
                  <Line type="monotone" dataKey="rainy" name="Rainy Season" stroke="#3498db" />
                </LineChart>
              </ResponsiveContainer>
              
              <div className="mt-4 bg-yellow-50 p-4 rounded border-l-4 border-yellow-500">
                <h4 className="font-bold text-yellow-800">Pattern Disruption Alert</h4>
                <p className="text-sm mt-1">
                  During active forest fires, typical daily patterns can reverse, with pollution 
                  actually increasing during midday hours. Always rely on real-time monitoring 
                  rather than time-of-day assumptions during burning season.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Pollution Sources Tab */}
        {activeTab === 'sources' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Pollution Sources Analysis</h2>
            <p className="mb-4">
              Understanding the source distribution of Chiang Mai's air pollution helps target protection strategies 
              and supports broader systemic solutions.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold mb-4">Pollution Source Distribution</h3>
                <div className="flex justify-center">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pollutionSourcesData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {pollutionSourcesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold mb-4">Biomass Burning Breakdown</h3>
                <div className="flex justify-center">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Agricultural Burning', value: 28, color: '#e67e22' },
                          { name: 'Forest Fires', value: 12, color: '#c0392b' },
                          { name: 'Cultural Burning', value: 7, color: '#d35400' },
                          { name: 'Residential Waste', value: 4, color: '#e74c3c' }
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {[
                          { name: 'Agricultural Burning', value: 28, color: '#e67e22' },
                          { name: 'Forest Fires', value: 12, color: '#c0392b' },
                          { name: 'Cultural Burning', value: 7, color: '#d35400' },
                          { name: 'Residential Waste', value: 4, color: '#e74c3c' }
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold mb-4">Agricultural Burning Factors</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-orange-100 p-2 rounded-full mr-3">
                      <Leaf size={20} className="text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Crop Residue Burning</h4>
                      <p className="text-sm text-gray-600">
                        Corn stubble and rice husk burning is the most cost-effective field clearing method for 
                        farmers in mountainous terrain.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-orange-100 p-2 rounded-full mr-3">
                      <MountainSnow size={20} className="text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Geographical Challenges</h4>
                      <p className="text-sm text-gray-600">
                        The mountainous terrain makes mechanical clearing difficult and expensive,
                        making burning the most accessible option for many farmers.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-orange-100 p-2 rounded-full mr-3">
                      <DollarSign size={20} className="text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Economic Drivers</h4>
                      <p className="text-sm text-gray-600">
                        "If burning is the easiest and most cost-efficient way to grow your crops, 
                        or to make a living, until that is not true, it's going to continue to happen."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold mb-4">Forest Fire Contributions</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-red-100 p-2 rounded-full mr-3">
                      <Flame size={20} className="text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Forest Fire Dynamics</h4>
                      <p className="text-sm text-gray-600">
                        Forest fires constitute a major source starting in mid to late February,
                        creating a distinct burning season that peaks in March-April.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-red-100 p-2 rounded-full mr-3">
                      <Users size={20} className="text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Human Factors</h4>
                      <p className="text-sm text-gray-600">
                        Some fires are deliberately set to promote the growth of valuable wild
                        mushrooms (hed thob) in national parks and protected areas.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-red-100 p-2 rounded-full mr-3">
                      <Map size={20} className="text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Geographic Concentration</h4>
                      <p className="text-sm text-gray-600">
                        Fires concentrate in specific areas like Lamphun and Khun Tan,
                        creating hotspots that can affect the entire region.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold mb-4">Long-Range Pollution (23%)</h3>
              <p className="mb-4">
                Approximately 23% of Chiang Mai's air pollution comes from long-range sources, likely 
                originating from India. This transboundary pollution demonstrates how air quality issues 
                transcend national boundaries.
              </p>
              
              <div className="bg-blue-50 p-4 rounded">
                <h4 className="font-medium text-blue-800 flex items-center">
                  <Globe size={18} className="mr-2" />
                  Regional Influences
                </h4>
                <p className="text-sm mt-2">
                  Even when practices improve in Thailand, burning in neighboring countries like Laos 
                  and Myanmar affects air quality in border regions and beyond. This creates complex 
                  international policy challenges that exceed local management capacity.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Health Impacts Tab */}
        {activeTab === 'health' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Health Impacts Analysis</h2>
            <p className="mb-4">
              Air pollution causes significant and measurable health impacts in Chiang Mai, particularly 
              during the burning season. Understanding these effects is crucial for effective protection strategies.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold mb-4">System Impact Analysis</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart outerRadius={90} data={healthImpactsData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar name="PM2.5" dataKey="pm25" stroke="#e74c3c" fill="#e74c3c" fillOpacity={0.5} />
                    <Radar name="Ozone" dataKey="ozone" stroke="#3498db" fill="#3498db" fillOpacity={0.5} />
                    <Radar name="NO₂" dataKey="no2" stroke="#2ecc71" fill="#2ecc71" fillOpacity={0.5} />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold mb-4">Relative Risk Increase</h3>
                <p className="mb-2 text-sm text-gray-600">
                  Based on study of 216,000 outpatient visits (2011-2014)
                </p>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pollutant</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Upper Respiratory</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lower Respiratory</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-2 whitespace-nowrap">PM10</td>
                        <td className="px-4 py-2 whitespace-nowrap">+2.3% per 10 μg/m³</td>
                        <td className="px-4 py-2 whitespace-nowrap">+1.6% per 10 μg/m³</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 whitespace-nowrap">Ozone (O₃)</td>
                        <td className="px-4 py-2 whitespace-nowrap">+12.3% per 10 ppb</td>
                        <td className="px-4 py-2 whitespace-nowrap">+7.3% per 10 ppb</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 whitespace-nowrap">Nitrogen Dioxide (NO₂)</td>
                        <td className="px-4 py-2 whitespace-nowrap">+11.0% per 10 ppb</td>
                        <td className="px-4 py-2 whitespace-nowrap">+4.6% per 10 ppb</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold mb-4">Hospital Impact</h3>
                <div className="bg-red-50 p-4 rounded mb-4">
                  <div className="flex items-center">
                    <AlertTriangle size={20} className="text-red-500 mr-2 flex-shrink-0" />
                    <p className="font-medium text-red-800">Healthcare System Strain</p>
                  </div>
                  <p className="mt-2 text-sm">
                    In early 2023, Maharaj Nakorn Chiang Mai Hospital reported treating 12,671 patients for respiratory problems 
                    between January 1 and March 31, with many suffering from asthma and inflammation.
                  </p>
                  <p className="mt-2 text-sm">
                    The hospital noted that its 1,400-bed facility was unable to treat many patients due to 
                    overcrowding in its inpatient wing.
                  </p>
                </div>
                
                <h4 className="font-medium mb-2">Vulnerable Populations</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <div className="bg-gray-100 p-1 rounded-full mr-2 mt-1">
                      <Users size={14} className="text-gray-600" />
                    </div>
                    <span><strong>Elderly</strong>: Increased rates of hospitalization for cardiopulmonary conditions</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-gray-100 p-1 rounded-full mr-2 mt-1">
                      <Users size={14} className="text-gray-600" />
                    </div>
                    <span><strong>Children</strong>: Higher rates of acute upper respiratory infections and asthma exacerbations</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-gray-100 p-1 rounded-full mr-2 mt-1">
                      <Users size={14} className="text-gray-600" />
                    </div>
                    <span><strong>Pre-existing conditions</strong>: Individuals with asthma, COPD, or cardiovascular disease experience more severe exacerbations</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold mb-4">Specific Respiratory Symptoms</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                      <h4 className="font-medium">Upper Respiratory</h4>
                    </div>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li>• Nasal congestion</li>
                      <li>• Throat irritation</li>
                      <li>• Sneezing</li>
                      <li>• Sinus pressure</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                      <h4 className="font-medium">Lower Respiratory</h4>
                    </div>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li>• Dry cough</li>
                      <li>• Shortness of breath</li>
                      <li>• Wheezing</li>
                      <li>• Chest tightness</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                      <h4 className="font-medium">Systemic</h4>
                    </div>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li>• Fatigue</li>
                      <li>• Headache</li>
                      <li>• Low-grade fever</li>
                      <li>• Dizziness</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <h4 className="font-medium">Long-term Concerns</h4>
                    </div>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li>• Increased cancer risk</li>
                      <li>• Cardiovascular disease</li>
                      <li>• Chronic respiratory conditions</li>
                      <li>• Neurodevelopmental effects</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold mb-4">Pollutant-Specific Health Impacts</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pollutant</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size/Type</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Peak Levels</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Primary Health Impacts</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {pollutantTypesData.map((pollutant, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 whitespace-nowrap font-medium">{pollutant.type}</td>
                        <td className="px-4 py-2 whitespace-nowrap">{pollutant.size}</td>
                        <td className="px-4 py-2 whitespace-nowrap">{pollutant.maxConc} μg/m³</td>
                        <td className="px-4 py-2">{pollutant.impact}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 bg-purple-50 p-4 rounded border-l-4 border-purple-500">
                <h4 className="font-bold text-purple-800">LBS Connection: 4H-BIOHACKING</h4>
                <p className="text-sm mt-1">
                  Understanding these health impacts directly supports your biohacking goals for maintaining optimal health 
                  and longevity. This knowledge can inform targeted interventions to strengthen respiratory defenses and 
                  mitigate inflammation responses during pollution events.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Protection Strategies Tab */}
        {activeTab === 'protection' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Protection Strategies</h2>
            <p className="mb-4">
              Based on the pollution patterns and health impacts, several effective protection strategies can be 
              implemented at both personal and systemic levels.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold mb-4">Mitigation Effectiveness Comparison</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={mitigationEffectivenessData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="strategy" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="pm25" name="PM2.5 Reduction %" fill="#e74c3c" />
                    <Bar dataKey="ozone" name="Ozone Reduction %" fill="#3498db" />
                    <Bar dataKey="no2" name="NO₂ Reduction %" fill="#2ecc71" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold mb-4">Cost vs. Effectiveness</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <ScatterChart
                    margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" dataKey="cost" name="Cost (1-5)" domain={[0, 6]} />
                    <YAxis dataKey="pm25" name="PM2.5 Effectiveness %" />
                    <ZAxis dataKey="effort" name="Implementation Effort" range={[50, 300]} />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Legend />
                    <Scatter name="Protection Methods" data={mitigationEffectivenessData} fill="#8884d8">
                      {mitigationEffectivenessData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.pm25 > 80 ? '#27ae60' : entry.pm25 > 50 ? '#f39c12' : '#e74c3c'} />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold mb-4 flex items-center">
                  <User size={20} className="mr-2 text-blue-500" />
                  Personal Protection Strategies
                </h3>
                
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-medium">Respiratory Protection</h4>
                    <p className="text-sm mt-1">
                      Wear N95 or N100 masks when outdoors during peak pollution periods to filter out PM2.5 
                      and other fine particles. Standard surgical masks provide minimal protection against the 
                      finest particulates.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-medium">Indoor Air Quality Management</h4>
                    <p className="text-sm mt-1">
                      Use HEPA air purifiers indoors to maintain clean air quality. For maximum effectiveness:
                    </p>
                    <ul className="mt-1 text-sm list-disc list-inside">
                      <li>Choose purifiers with both HEPA filtration and activated carbon</li>
                      <li>Size purifiers appropriately for room dimensions</li>
                      <li>Create a "clean room" with sealed windows and doors</li>
                      <li>Consider implementing positive pressure systems in bedrooms</li>
                    </ul>
                  </div>
                  
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-medium">Behavioral Adaptations</h4>
                    <p className="text-sm mt-1">
                      Minimize outdoor activities during peak pollution hours, typically late morning to 
                      early afternoon when burning is most intense. Schedule necessary outdoor activities for 
                      early morning or after rainfall when possible.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-medium">Temporary Relocation</h4>
                    <p className="text-sm mt-1">
                      During the worst months, consider either remaining indoors with air purifiers or 
                      temporarily relocating to areas with better air quality, such as southern Thailand 
                      or Bangkok.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold mb-4 flex items-center">
                  <Users size={20} className="mr-2 text-green-500" />
                  Systemic Approaches
                </h3>
                
                <div className="space-y-4">
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-medium">Government Initiatives</h4>
                    <p className="text-sm mt-1">
                      Thailand has implemented a national zero-burning directive and is developing clean air 
                      legislation to ensure that access to clean air is recognized as a basic human right.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-medium">Agricultural Practice Alternatives</h4>
                    <p className="text-sm mt-1">
                      Alternatives to burning include community access to tractors for plowing stubble back 
                      into the soil, which also enriches nutrients and improves soil structure.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-medium">Controlled Burning Management</h4>
                    <p className="text-sm mt-1">
                      Chiang Mai province now permits controlled burns through a permit system managed via the 
                      FireD app, which predicts pollution levels using weather and satellite data.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-medium">Implementation Challenges</h4>
                    <p className="text-sm mt-1">
                      Economic realities mean burning remains the most cost-effective method for many farmers. 
                      As researcher Mary Mostafanezhad noted: "If burning is the easiest and most cost-efficient 
                      way to grow your crops, until that is not true, it's going to continue to happen."
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold mb-4">DIY Protection Solutions</h3>
              
              <div className="bg-blue-50 p-4 rounded mb-4">
                <div className="flex items-center">
                  <Tool size={20} className="text-blue-500 mr-2 flex-shrink-0" />
                  <p className="font-medium text-blue-800">DIY PM 2.5 Net</p>
                </div>
                <p className="mt-2 text-sm">
                  Researchers at Chiang Mai University have developed a "DIY-PM 2.5 Net" that creates a positive 
                  pressure environment for vulnerable individuals, reducing PM2.5 exposure from 78 μg/m³ to just 
                  8 μg/m³ in testing.
                </p>
                <p className="mt-2 text-sm">
                  This solution uses a HEPA filter attached to a fan that creates positive pressure inside a 
                  mosquito net, providing a clean air sleeping environment at a fraction of the cost of 
                  commercial solutions.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded">
                  <h4 className="font-medium mb-2">Box Fan Air Purifier</h4>
                  <p className="text-sm">
                    Attach a MERV 13 or higher filter to a box fan to create an inexpensive but effective 
                    air filtration system for small to medium rooms.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded">
                  <h4 className="font-medium mb-2">Window Sealing</h4>
                  <p className="text-sm">
                    Use weatherstripping tape and plastic sheeting to improve window seals during
                    peak pollution periods, minimizing infiltration of outdoor air.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded">
                  <h4 className="font-medium mb-2">Pressure Monitoring</h4>
                  <p className="text-sm">
                    Use incense or tissue paper to check for negative pressure points in your 
                    home and seal them to maintain positive pressure with filtered air.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Personalize Tab */}
        {activeTab === 'personalize' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Personalize Your Protection</h2>
            <p className="mb-4">
              Customize this dashboard to your specific needs and circumstances to create a 
              personalized air quality management system.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold mb-4">Personal Profile</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sensitivity Level
                    </label>
                    <select 
                      className="w-full border rounded p-2"
                      value={userProfile.sensitivityLevel}
                      onChange={(e) => setUserProfile({...userProfile, sensitivityLevel: e.target.value})}
                    >
                      <option value="low">Low Sensitivity (Healthy Adult)</option>
                      <option value="moderate">Moderate Sensitivity</option>
                      <option value="high">High Sensitivity (Elderly, Children, Pre-existing Conditions)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Activity Level
                    </label>
                    <select 
                      className="w-full border rounded p-2"
                      value={userProfile.activityLevel}
                      onChange={(e) => setUserProfile({...userProfile, activityLevel: e.target.value})}
                    >
                      <option value="low">Low (Mostly Indoors)</option>
                      <option value="moderate">Moderate (Regular Outdoor Activities)</option>
                      <option value="high">High (Outdoor Exercise, Work)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Protection Equipment
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Mask Type</label>
                        <select 
                          className="w-full border rounded p-2"
                          value={userProfile.mask}
                          onChange={(e) => setUserProfile({...userProfile, mask: e.target.value})}
                        >
                          <option value="none">None</option>
                          <option value="surgical">Surgical Mask</option>
                          <option value="n95">N95 Respirator</option>
                          <option value="n100">N100 Respirator</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Indoor Filtration</label>
                        <select 
                          className="w-full border rounded p-2"
                          value={userProfile.indoorFilter}
                          onChange={(e) => setUserProfile({...userProfile, indoorFilter: e.target.value})}
                        >
                          <option value="none">None</option>
                          <option value="basic">Basic Filter</option>
                          <option value="hepa">HEPA Filter</option>
                          <option value="hepa-carbon">HEPA + Carbon</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold mb-4">Dashboard Settings</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Display Preferences
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="show-health" 
                          className="h-4 w-4 text-blue-600 rounded"
                          checked={userProfile.showHealth}
                          onChange={(e) => setUserProfile({...userProfile, showHealth: e.target.checked})}
                        />
                        <label htmlFor="show-health" className="ml-2 text-sm text-gray-700">
                          Show health impact information
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="show-daily" 
                          className="h-4 w-4 text-blue-600 rounded"
                          checked={true}
                          onChange={() => {}}
                        />
                        <label htmlFor="show-daily" className="ml-2 text-sm text-gray-700">
                          Show daily variation patterns
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="show-lbs" 
                          className="h-4 w-4 text-blue-600 rounded"
                          checked={true}
                          onChange={() => {}}
                        />
                        <label htmlFor="show-lbs" className="ml-2 text-sm text-gray-700">
                          Show LBS framework connections
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notification Settings
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="alert-threshold" 
                          className="h-4 w-4 text-blue-600 rounded"
                          checked={true}
                          onChange={() => {}}
                        />
                        <label htmlFor="alert-threshold" className="ml-2 text-sm text-gray-700">
                          Alert when PM2.5 exceeds threshold
                        </label>
                      </div>
                      
                      <div className="pl-6">
                        <select className="border rounded p-1 text-sm">
                          <option>25 μg/m³ (WHO guideline)</option>
                          <option>35 μg/m³ (Moderate)</option>
                          <option>55 μg/m³ (Unhealthy for sensitive groups)</option>
                          <option>150 μg/m³ (Unhealthy)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Data Sources
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="source-iqair" 
                          className="h-4 w-4 text-blue-600 rounded"
                          checked={true}
                          onChange={() => {}}
                        />
                        <label htmlFor="source-iqair" className="ml-2 text-sm text-gray-700">
                          IQAir Data
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="source-government" 
                          className="h-4 w-4 text-blue-600 rounded"
                          checked={true}
                          onChange={() => {}}
                        />
                        <label htmlFor="source-government" className="ml-2 text-sm text-gray-700">
                          Thai Government Monitoring Stations
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="source-local" 
                          className="h-4 w-4 text-blue-600 rounded"
                          checked={true}
                          onChange={() => {}}
                        />
                        <label htmlFor="source-local" className="ml-2 text-sm text-gray-700">
                          Local Community Monitors
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold mb-4 flex items-center">
                  <Target size={20} className="mr-2 text-blue-500" />
                  Personal Risk Score
                </h3>
                
                <div className="bg-blue-50 p-4 rounded flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Your current risk level:</p>
                    <p className="text-3xl font-bold" style={{
                      color: userProfile.sensitivityLevel === 'high' 
                        ? getRiskColor(getRiskLevel(currentMonthData.pm25 * 1.5))
                        : getRiskColor(currentRisk)
                    }}>
                      {userProfile.sensitivityLevel === 'high' 
                        ? getRiskLevel(currentMonthData.pm25 * 1.5)
                        : currentRisk}
                    </p>
                  </div>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{
                    backgroundColor: userProfile.sensitivityLevel === 'high' 
                      ? getRiskColor(getRiskLevel(currentMonthData.pm25 * 1.5))
                      : getRiskColor(currentRisk)
                  }}>
                    <span className="text-white font-bold">
                      {userProfile.sensitivityLevel === 'high' 
                        ? getRiskLevel(currentMonthData.pm25 * 1.5).split(' ')[0]
                        : currentRisk.split(' ')[0]}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-sm">
                    <strong>Personal Factors:</strong> {userProfile.sensitivityLevel === 'high' && "Your high sensitivity level increases your risk."} 
                    {userProfile.activityLevel === 'high' && " Your high activity level increases exposure risk."}
                  </p>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold mb-4 flex items-center">
                  <ShieldCheck size={20} className="mr-2 text-green-500" />
                  Protection Effectiveness
                </h3>
                
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Mask Protection (PM2.5)</span>
                      <span className="font-medium">{
                        userProfile.mask === 'none' ? '0%' :
                        userProfile.mask === 'surgical' ? '30%' :
                        userProfile.mask === 'n95' ? '95%' : '99%'
                      }</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{
                        width: userProfile.mask === 'none' ? '0%' :
                               userProfile.mask === 'surgical' ? '30%' :
                               userProfile.mask === 'n95' ? '95%' : '99%'
                      }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Indoor Protection</span>
                      <span className="font-medium">{
                        userProfile.indoorFilter === 'none' ? '0%' :
                        userProfile.indoorFilter === 'basic' ? '50%' :
                        userProfile.indoorFilter === 'hepa' ? '99%' : '99.9%'
                      }</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{
                        width: userProfile.indoorFilter === 'none' ? '0%' :
                               userProfile.indoorFilter === 'basic' ? '50%' :
                               userProfile.indoorFilter === 'hepa' ? '99%' : '99.9%'
                      }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Combined Protection</span>
                      <span className="font-medium">{
                        userProfile.mask === 'none' && userProfile.indoorFilter === 'none' ? 'Minimal' :
                        userProfile.mask !== 'none' && userProfile.indoorFilter !== 'none' ? 'Excellent' :
                        'Partial'
                      }</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold mb-4 flex items-center">
                  <ListTodo size={20} className="mr-2 text-purple-500" />
                  Recommended Actions
                </h3>
                
                <ul className="space-y-2 text-sm">
                  {currentMonthData.pm25 > 55 && userProfile.mask === 'none' && (
                    <li className="flex items-start">
                      <AlertCircle size={16} className="text-red-500 mr-2 mt-1 flex-shrink-0" />
                      <span>Acquire N95 masks for outdoor activities</span>
                    </li>
                  )}
                  
                  {currentMonthData.pm25 > 35 && userProfile.indoorFilter === 'none' && (
                    <li className="flex items-start">
                      <AlertCircle size={16} className="text-red-500 mr-2 mt-1 flex-shrink-0" />
                      <span>Add HEPA filtration for indoor spaces</span>
                    </li>
                  )}
                  
                  {currentMonthData.pm25 > 150 && userProfile.sensitivityLevel === 'high' && (
                    <li className="flex items-start">
                      <AlertCircle size={16} className="text-red-500 mr-2 mt-1 flex-shrink-0" />
                      <span>Consider temporary relocation during peak season</span>
                    </li>
                  )}
                  
                  {currentMonthData.pm25 > 55 && userProfile.activityLevel === 'high' && (
                    <li className="flex items-start">
                      <AlertCircle size={16} className="text-orange-500 mr-2 mt-1 flex-shrink-0" />
                      <span>Reschedule outdoor exercises to early morning</span>
                    </li>
                  )}
                  
                  {currentMonthData.pm25 > 35 && (
                    <li className="flex items-start">
                      <Info size={16} className="text-blue-500 mr-2 mt-1 flex-shrink-0" />
                      <span>Monitor AQI levels daily during this season</span>
                    </li>
                  )}
                  
                  {currentMonthData.pm25 <= 35 && (
                    <li className="flex items-start">
                      <CheckCircle size={16} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span>Current air quality is acceptable for your profile</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            
            <div className="mt-6 bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold mb-4">LBS Framework Integration</h3>
              
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded">
                  <h4 className="font-medium text-blue-800">4H-ENVIRONMENT Integration</h4>
                  <p className="text-sm mt-2">
                    This personalized dashboard directly supports your goal to "develop a system for identifying, 
                    evaluating, and managing personal exposure to harmful substances" by providing real-time monitoring, 
                    risk assessment, and mitigation strategies for air pollution.
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded">
                  <h4 className="font-medium text-green-800">3P-HOME Integration</h4>
                  <p className="text-sm mt-2">
                    The seasonal patterns and pollution distribution data support informed decisions about 
                    home location, architectural considerations for pollution management, and potential 
                    seasonal residence strategies for Thailand.
                  </p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded">
                  <h4 className="font-medium text-purple-800">4H-BIOHACKING Integration</h4>
                  <p className="text-sm mt-2">
                    Health impact information and personalized risk assessment connect directly to your biohacking 
                    goal focused on "end-of-life capabilities" by highlighting specific physiological systems 
                    requiring protection in polluted environments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <footer className="bg-gray-100 border-t py-6 px-4">
        <div className="container mx-auto text-center text-gray-600 text-sm">
          <p>Chiang Mai Air Pollution Dashboard - Interactive Analysis & Personal Protection</p>
          <p className="mt-1">Created March 2025 | LBS Integration: 4H-ENVIRONMENT, 3P-HOME, 4H-BIOHACKING</p>
        </div>
      </footer>
    </div>
  );
};

// Helper components for missing icons
const Shield = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const Globe = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

const Tool = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
  </svg>
);

const CheckCircle = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const DollarSign = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

const ShieldCheck = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    <path d="M9 12l2 2 4-4"></path>
  </svg>
);

const Target = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
);

const ListTodo = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="5" width="6" height="6" rx="1"></rect>
    <path d="M3 17h6"></path>
    <path d="M13 5h8"></path>
    <path d="M13 9h5"></path>
    <path d="M13 17h8"></path>
    <path d="M13 13h8"></path>
  </svg>
);

const User = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const ArrowRight = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

export default ChiangMaiAirPollutionDashboard;