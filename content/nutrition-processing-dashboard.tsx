import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterPlot, Scatter, Cell } from 'recharts';

const PlantProcessingDashboard = () => {
  // Processing Methods Dataset
  const processingData = [
    {method_name: "pressure_cooking", food_category: "legumes", effectiveness_percentage: 90, time_required_minutes: 30, difficulty_level: "medium", antinutrient_reduction: 90, nutrient_impact: "minimal", digestibility_change: 45},
    {method_name: "soaking", food_category: "legumes", effectiveness_percentage: 30, time_required_minutes: 720, difficulty_level: "low", antinutrient_reduction: 25, nutrient_impact: "none", digestibility_change: 10},
    {method_name: "fermentation", food_category: "legumes", effectiveness_percentage: 80, time_required_minutes: 2160, difficulty_level: "high", antinutrient_reduction: 75, nutrient_impact: "improved", digestibility_change: 50},
    {method_name: "steaming", food_category: "leafy_greens", effectiveness_percentage: 70, time_required_minutes: 7, difficulty_level: "low", antinutrient_reduction: 45, nutrient_impact: "minimal", digestibility_change: 28},
    {method_name: "boiling", food_category: "leafy_greens", effectiveness_percentage: 75, time_required_minutes: 8, difficulty_level: "low", antinutrient_reduction: 75, nutrient_impact: "moderate", digestibility_change: 23}
  ];

  // Food Antinutrients Dataset
  const antinutrientData = [
    {food_category: "legumes", antinutrient_type: "lectins", risk_level: "high", heat_stability: "moderate", best_processing_method: "pressure_cooking", max_reduction_possible: 95},
    {food_category: "legumes", antinutrient_type: "phytates", risk_level: "moderate", heat_stability: "high", best_processing_method: "fermentation", max_reduction_possible: 90},
    {food_category: "leafy_greens", antinutrient_type: "oxalates", risk_level: "high", heat_stability: "moderate", best_processing_method: "boiling", max_reduction_possible: 80},
    {food_category: "leafy_greens", antinutrient_type: "goitrogens", risk_level: "moderate", heat_stability: "low", best_processing_method: "steaming", max_reduction_possible: 70}
  ];

  const [selectedFoodCategory, setSelectedFoodCategory] = useState('all');

  const foodCategories = ['all', ...new Set(processingData.map(item => item.food_category))];

  const filteredProcessingData = selectedFoodCategory === 'all' 
    ? processingData 
    : processingData.filter(item => item.food_category === selectedFoodCategory);

  const timeVsEffectivenessData = processingData.map(item => ({
    name: item.method_name,
    time: item.time_required_minutes,
    effectiveness: item.effectiveness_percentage,
    category: item.food_category
  }));

  const riskLevelDistribution = antinutrientData.reduce((acc, curr) => {
    acc[curr.risk_level] = (acc[curr.risk_level] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Plant Processing & Antinutrient Analysis Dashboard</h1>
      
      {/* Food Category Filter */}
      <div className="mb-6">
        <label className="mr-2 font-medium">Filter by Food Category:</label>
        <select 
          value={selectedFoodCategory}
          onChange={(e) => setSelectedFoodCategory(e.target.value)}
          className="p-2 border rounded"
        >
          {foodCategories.map(category => (
            <option key={category} value={category}>
              {category.replace('_', ' ').charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Processing Methods Effectiveness */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Processing Methods Effectiveness</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredProcessingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="method_name" angle={-45} textAnchor="end" height={80} />
              <YAxis label={{ value: 'Effectiveness (%)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="effectiveness_percentage" fill="#8884d8" name="Effectiveness" />
              <Bar dataKey="antinutrient_reduction" fill="#82ca9d" name="Antinutrient Reduction" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Time vs Effectiveness Scatter Plot */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Time vs Effectiveness</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={timeVsEffectivenessData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis label={{ value: 'Time (min) / Effectiveness (%)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="time" fill="#8884d8" name="Time (min)" />
              <Bar dataKey="effectiveness" fill="#82ca9d" name="Effectiveness (%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Level Distribution */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Antinutrient Risk Level Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={Object.entries(riskLevelDistribution).map(([level, count]) => ({ level, count }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="level" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#ff7f0e" name="Number of Antinutrients" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Processing Recommendations */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Processing Recommendations</h2>
          <div className="space-y-4">
            {antinutrientData.map((item, index) => (
              <div key={index} className="p-3 bg-white rounded shadow">
                <h3 className="font-medium">{item.food_category.replace('_', ' ').toUpperCase()}: {item.antinutrient_type}</h3>
                <p className="text-sm">
                  Risk Level: <span className={`font-medium ${
                    item.risk_level === 'high' ? 'text-red-600' :
                    item.risk_level === 'moderate' ? 'text-yellow-600' :
                    'text-green-600'
                  }`}>{item.risk_level}</span>
                </p>
                <p className="text-sm">Best Method: {item.best_processing_method.replace('_', ' ')}</p>
                <p className="text-sm">Max Reduction: {item.max_reduction_possible}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Quick Reference Guide */}
      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Quick Processing Guide</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 bg-white rounded shadow">
            <h3 className="font-medium text-green-600">Quick Methods (≤15 min)</h3>
            <ul className="list-disc list-inside text-sm">
              {processingData.filter(item => item.time_required_minutes <= 15)
                .map(item => (
                  <li key={item.method_name}>
                    {item.method_name.replace('_', ' ')}: {item.time_required_minutes} min
                  </li>
                ))}
            </ul>
          </div>
          <div className="p-3 bg-white rounded shadow">
            <h3 className="font-medium text-yellow-600">Standard Methods (15-60 min)</h3>
            <ul className="list-disc list-inside text-sm">
              {processingData.filter(item => item.time_required_minutes > 15 && item.time_required_minutes <= 60)
                .map(item => (
                  <li key={item.method_name}>
                    {item.method_name.replace('_', ' ')}: {item.time_required_minutes} min
                  </li>
                ))}
            </ul>
          </div>
          <div className="p-3 bg-white rounded shadow">
            <h3 className="font-medium text-red-600">Long Methods (60 min)</h3>
            <ul className="list-disc list-inside text-sm">
              {processingData.filter(item => item.time_required_minutes > 60)
                .map(item => (
                  <li key={item.method_name}>
                    {item.method_name.replace('_', ' ')}: {Math.round(item.time_required_minutes/60)} hrs
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantProcessingDashboard;