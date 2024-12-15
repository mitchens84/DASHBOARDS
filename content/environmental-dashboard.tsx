import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { AlertTriangle } from 'lucide-react';
import Papa from 'papaparse';
import _ from 'lodash';
import HealthInsights from './HealthInsights';
import CorrelationsChart from './CorrelationsChart';

const EnvironmentalDashboard = () => {
  const [data, setData] = useState([]);
  const [hourlyAverages, setHourlyAverages] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await window.fs.readFile('The_historical_data_of_Air Monitor Lite_20241024151138.csv', { encoding: 'utf8' });
        const result = Papa.parse(response, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true
        });

        const processedData = result.data.map(row => ({
          time: new Date(row.Time),
          temperature: row['Temperature (°C)'],
          humidity: row['Humidity (%)'],
          co2: row['CO2 (ppm)'],
          pm25: row['PM2.5(μg/m³)'],
          pm10: row['PM10(μg/m³)']
        })).filter(row => !isNaN(row.time.getTime()));

        setData(processedData);

        // Calculate hourly averages
        const averages = _.chain(processedData)
          .groupBy(row => row.time.getHours())
          .mapValues(hourData => ({
            temperature: _.meanBy(hourData, d => d.temperature),
            humidity: _.meanBy(hourData, d => d.humidity),
            co2: _.meanBy(hourData, d => d.co2),
            pm25: _.meanBy(hourData, d => d.pm25)
          }))
          .map((values, hour) => ({
            hour: parseInt(hour),
            ...values
          }))
          .sortBy('hour')
          .value();

        setHourlyAverages(averages);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  const MetricCard = ({ title, value, unit, stats, threshold, thresholdType = 'max', status }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-sm font-medium text-gray-600 uppercase">{title}</h3>
        {status === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
      </div>
      <div className="text-xs text-gray-500 mb-2">Current Reading</div>
      <div className="flex items-baseline mb-3">
        <span className="text-2xl font-bold">
          {typeof value === 'number' ? value.toFixed(1) : '—'}
        </span>
        <span className="ml-1 text-gray-500 text-sm">{unit}</span>
      </div>
      <div className="text-xs">
        <div className="flex justify-between items-center border-t pt-2">
          <div className="text-center">
            <div className="font-medium text-gray-600">MIN</div>
            <div className="text-lg font-semibold">{stats?.min?.toFixed(1)}</div>
            <div className="text-gray-500">{unit}</div>
            {/* Health Insights Component */}
          <HealthInsights data={data} />

          {/* Correlations Chart */}
          <CorrelationsChart data={data} />
          <div className="text-center">
            <div className="font-medium text-gray-600">MEAN</div>
            <div className="text-lg font-semibold">{stats?.avg?.toFixed(1)}</div>
            <div className="text-gray-500">{unit}</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-gray-600">MAX</div>
            <div className="text-lg font-semibold">{stats?.max?.toFixed(1)}</div>
            <div className="text-gray-500">{unit}</div>
          </div>
        </div>
      </div>
    </div>
  );

  const calculateStats = () => {
    if (data.length === 0) return {};
    return {
      temperature: {
        min: _.minBy(data, d => d.temperature).temperature,
        max: _.maxBy(data, d => d.temperature).temperature,
        avg: _.meanBy(data, d => d.temperature),
      },
      humidity: {
        min: _.minBy(data, d => d.humidity).humidity,
        max: _.maxBy(data, d => d.humidity).humidity,
        avg: _.meanBy(data, d => d.humidity),
      },
      co2: {
        min: _.minBy(data, d => d.co2).co2,
        max: _.maxBy(data, d => d.co2).co2,
        avg: _.meanBy(data, d => d.co2),
      },
      pm25: {
        min: _.minBy(data, d => d.pm25).pm25,
        max: _.maxBy(data, d => d.pm25).pm25,
        avg: _.meanBy(data, d => d.pm25),
      }
    };
  };

  const getLatestMetrics = () => {
    if (data.length === 0) return {};
    const latest = data[data.length - 1];
    return {
      temperature: {
        value: latest.temperature,
        status: latest.temperature > 26 || latest.temperature < 20 ? 'warning' : 'normal'
      },
      humidity: {
        value: latest.humidity,
        status: latest.humidity > 60 ? 'warning' : 'normal'
      },
      co2: {
        value: latest.co2,
        status: latest.co2 > 1000 ? 'warning' : 'normal'
      },
      pm25: {
        value: latest.pm25,
        status: latest.pm25 > 35 ? 'warning' : 'normal'
      }
    };
  };

  const formatHour = (hour) => `${String(hour).padStart(2, '0')}:00`;

  const latestMetrics = getLatestMetrics();
  const stats = calculateStats();

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">Indoor Environmental Quality Monitor</h1>
          <div className="text-sm text-gray-500">
            {data.length > 0 ? `Last updated: ${data[data.length-1].time.toLocaleString()}` : 'Loading...'}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <MetricCard 
            title="MEAN TEMPERATURE" 
            value={latestMetrics.temperature?.value}
            unit="°C"
            threshold={26}
            status={latestMetrics.temperature?.status}
            stats={stats.temperature}
          />
          <MetricCard 
            title="MEAN HUMIDITY" 
            value={latestMetrics.humidity?.value}
            unit="%"
            threshold={60}
            status={latestMetrics.humidity?.status}
            stats={stats.humidity}
          />
          <MetricCard 
            title="MEAN CO₂" 
            value={latestMetrics.co2?.value}
            unit="ppm"
            threshold={1000}
            status={latestMetrics.co2?.status}
            stats={stats.co2}
          />
          <MetricCard 
            title="MEAN PM2.5" 
            value={latestMetrics.pm25?.value}
            unit="μg/m³"
            threshold={35}
            status={latestMetrics.pm25?.status}
            stats={stats.pm25}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-600 mb-4 uppercase">Average Daily Temperature Pattern</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hourlyAverages} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="hour"
                    tickFormatter={formatHour}
                    type="number"
                    domain={[0, 23]}
                  />
                  <YAxis domain={['auto', 'auto']} />
                  <Tooltip 
                    labelFormatter={(label) => formatHour(label)}
                    formatter={(value) => [`${value.toFixed(1)}°C`, 'Temperature']}
                  />
                  <Line type="monotone" dataKey="temperature" stroke="#2563eb" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-600 mb-4 uppercase">Average Daily CO₂ Pattern</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hourlyAverages} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="hour"
                    tickFormatter={formatHour}
                    type="number"
                    domain={[0, 23]}
                  />
                  <YAxis domain={['auto', 'auto']} />
                  <Tooltip 
                    labelFormatter={(label) => formatHour(label)}
                    formatter={(value) => [`${value.toFixed(0)} ppm`, 'CO₂']}
                  />
                  <Line type="monotone" dataKey="co2" stroke="#dc2626" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-600 mb-4 uppercase">Average Daily Humidity Pattern</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hourlyAverages} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="hour"
                    tickFormatter={formatHour}
                    type="number"
                    domain={[0, 23]}
                  />
                  <YAxis domain={['auto', 'auto']} />
                  <Tooltip 
                    labelFormatter={(label) => formatHour(label)}
                    formatter={(value) => [`${value.toFixed(1)}%`, 'Humidity']}
                  />
                  <Line type="monotone" dataKey="humidity" stroke="#0891b2" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-600 mb-4 uppercase">Average Daily PM2.5 Pattern</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hourlyAverages} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="hour"
                    tickFormatter={formatHour}
                    type="number"
                    domain={[0, 23]}
                  />
                  <YAxis domain={['auto', 'auto']} />
                  <Tooltip 
                    labelFormatter={(label) => formatHour(label)}
                    formatter={(value) => [`${value.toFixed(1)} μg/m³`, 'PM2.5']}
                  />
                  <Line type="monotone" dataKey="pm25" stroke="#7c3aed" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalDashboard;