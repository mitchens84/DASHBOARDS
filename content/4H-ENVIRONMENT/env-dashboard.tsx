import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Papa from 'papaparse';
import _ from 'lodash';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');

  useEffect(() => {
    const loadData = async () => {
      try {
        // Get raw CSV content from the textarea
        const rawCsv = document.getElementById('csv-data').value;
        
        const parsed = Papa.parse(rawCsv, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true
        });

        const processedData = parsed.data
          .filter(row => row.Time && row['Temperature (°C)']) // Filter out invalid rows
          .map(row => ({
            ...row,
            timestamp: new Date(row.Time)
          }))
          .sort((a, b) => a.timestamp - b.timestamp);

        setData(processedData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  const getFilteredData = () => {
    if (!data.length) return [];
    const now = new Date(data[data.length - 1].timestamp);
    const hours = selectedTimeframe === '24h' ? 24 : selectedTimeframe === '7d' ? 168 : 720;
    const cutoff = new Date(now.getTime() - (hours * 60 * 60 * 1000));
    return data.filter(d => d.timestamp >= cutoff);
  };

  const getLatestReadings = () => {
    if (!data.length) return null;
    return data[data.length - 1];
  };

  const getStatistics = (metric) => {
    const values = data.map(d => d[metric]).filter(v => v !== null && !isNaN(v));
    return {
      min: _.min(values),
      max: _.max(values),
      avg: _.mean(values)
    };
  };

  const latestReadings = getLatestReadings();
  const filteredData = getFilteredData();

  const getThresholdStatus = (value, thresholds) => {
    if (!value || isNaN(value)) return 'text-gray-600';
    if (value > thresholds.high) return 'text-red-600';
    if (value > thresholds.medium) return 'text-yellow-600';
    return 'text-green-600';
  };

  // Hide the textarea containing raw CSV data
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <textarea 
        id="csv-data" 
        style={{display: 'none'}} 
        defaultValue={`Time,Temperature (°C),Humidity (%),CO2 (ppm),PM2.5(μg/m³),PM10(μg/m³)
2024-09-24 15:15,28.0,79.7,462,3,3
[...full CSV content...]`}
      />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Environmental Monitoring Dashboard</h1>
          <select 
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-3 py-2 border rounded-md bg-white"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>

        {/* Current Readings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {latestReadings && (
            <>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Temperature</h3>
                <p className={`text-2xl font-bold ${getThresholdStatus(latestReadings['Temperature (°C)'], {high: 30, medium: 25})}`}>
                  {latestReadings['Temperature (°C)']?.toFixed(1)}°C
                </p>
                <div className="text-sm text-gray-600 mt-2">
                  <p>Min: {getStatistics('Temperature (°C)').min?.toFixed(1)}°C</p>
                  <p>Max: {getStatistics('Temperature (°C)').max?.toFixed(1)}°C</p>
                  <p>Avg: {getStatistics('Temperature (°C)').avg?.toFixed(1)}°C</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Humidity</h3>
                <p className={`text-2xl font-bold ${getThresholdStatus(latestReadings['Humidity (%)'], {high: 80, medium: 60})}`}>
                  {latestReadings['Humidity (%)']?.toFixed(1)}%
                </p>
                <div className="text-sm text-gray-600 mt-2">
                  <p>Min: {getStatistics('Humidity (%)').min?.toFixed(1)}%</p>
                  <p>Max: {getStatistics('Humidity (%)').max?.toFixed(1)}%</p>
                  <p>Avg: {getStatistics('Humidity (%)').avg?.toFixed(1)}%</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">CO₂</h3>
                <p className={`text-2xl font-bold ${getThresholdStatus(latestReadings['CO2 (ppm)'], {high: 1000, medium: 800})}`}>
                  {latestReadings['CO2 (ppm)']?.toFixed(0)} ppm
                </p>
                <div className="text-sm text-gray-600 mt-2">
                  <p>Min: {getStatistics('CO2 (ppm)').min?.toFixed(0)} ppm</p>
                  <p>Max: {getStatistics('CO2 (ppm)').max?.toFixed(0)} ppm</p>
                  <p>Avg: {getStatistics('CO2 (ppm)').avg?.toFixed(0)} ppm</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">PM2.5</h3>
                <p className={`text-2xl font-bold ${getThresholdStatus(latestReadings['PM2.5(μg/m³)'], {high: 35, medium: 12})}`}>
                  {latestReadings['PM2.5(μg/m³)']?.toFixed(1)} μg/m³
                </p>
                <div className="text-sm text-gray-600 mt-2">
                  <p>Min: {getStatistics('PM2.5(μg/m³)').min?.toFixed(1)} μg/m³</p>
                  <p>Max: {getStatistics('PM2.5(μg/m³)').max?.toFixed(1)} μg/m³</p>
                  <p>Avg: {getStatistics('PM2.5(μg/m³)').avg?.toFixed(1)} μg/m³</p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Charts */}
        <div className="space-y-6">
          {/* Temperature Chart */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Temperature Trend</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="timestamp" 
                    tickFormatter={(timestamp) => {
                      const date = new Date(timestamp);
                      return `${date.getMonth()+1}/${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
                    }}
                  />
                  <YAxis domain={['auto', 'auto']} />
                  <Tooltip 
                    labelFormatter={(timestamp) => new Date(timestamp).toLocaleString()}
                    formatter={(value) => [`${value.toFixed(1)}°C`, 'Temperature']}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="Temperature (°C)" 
                    stroke="#ef4444" 
                    dot={false} 
                    name="Temperature"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Humidity Chart */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Humidity Trend</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="timestamp" 
                    tickFormatter={(timestamp) => {
                      const date = new Date(timestamp);
                      return `${date.getMonth()+1}/${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
                    }}
                  />
                  <YAxis domain={['auto', 'auto']} />
                  <Tooltip 
                    labelFormatter={(timestamp) => new Date(timestamp).toLocaleString()}
                    formatter={(value) => [`${value.toFixed(1)}%`, 'Humidity']}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="Humidity (%)" 
                    stroke="#3b82f6" 
                    dot={false} 
                    name="Humidity"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* CO2 Chart */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">CO₂ Trend</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="timestamp" 
                    tickFormatter={(timestamp) => {
                      const date = new Date(timestamp);
                      return `${date.getMonth()+1}/${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
                    }}
                  />
                  <YAxis domain={['auto', 'auto']} />
                  <Tooltip 
                    labelFormatter={(timestamp) => new Date(timestamp).toLocaleString()}
                    formatter={(value) => [`${value.toFixed(0)} ppm`, 'CO₂']}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="CO2 (ppm)" 
                    stroke="#84cc16" 
                    dot={false} 
                    name="CO₂"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* PM2.5 Chart */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">PM2.5 Trend</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="timestamp" 
                    tickFormatter={(timestamp) => {
                      const date = new Date(timestamp);
                      return `${date.getMonth()+1}/${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
                    }}
                  />
                  <YAxis domain={['auto', 'auto']} />
                  <Tooltip 
                    labelFormatter={(timestamp) => new Date(timestamp).toLocaleString()}
                    formatter={(value) => [`${value.toFixed(1)} μg/m³`, 'PM2.5']}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="PM2.5(μg/m³)" 
                    stroke="#a855f7" 
                    dot={false} 
                    name="PM2.5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;