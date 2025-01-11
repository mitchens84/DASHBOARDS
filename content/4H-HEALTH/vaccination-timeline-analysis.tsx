import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, ShieldAlert, Map, Activity } from 'lucide-react';

const VaccinationDashboard = () => {
  const timelineData = [
    { date: '2023', dtap: 20, covid: 85, rabies: 95, mmr: 50, travelCore: 30 },
    { date: '2024', dtap: 10, covid: 65, rabies: 90, mmr: 50, travelCore: 20 },
    { date: '2025', dtap: 5, covid: 45, rabies: 85, mmr: 50, travelCore: 10 }
  ];

  return (
    <div className="w-full space-y-6">
      {/* Critical Alerts */}
      <div className="space-y-4">
        <Alert className="bg-orange-50 border-orange-200">
          <ShieldAlert className="w-4 h-4 text-orange-600" />
          <AlertTitle className="text-orange-800">Priority Updates Required</AlertTitle>
          <AlertDescription className="text-orange-700">
            DTP booster overdue (last dose 2009) and MMR series incomplete
          </AlertDescription>
        </Alert>
      </div>

      {/* Protection Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Immunity Protection Forecast
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis label={{ value: 'Protection Level (%)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="dtap" stroke="#8884d8" name="DTP" />
                <Line type="monotone" dataKey="covid" stroke="#82ca9d" name="COVID-19" />
                <Line type="monotone" dataKey="rabies" stroke="#ffc658" name="Rabies" />
                <Line type="monotone" dataKey="mmr" stroke="#ff7300" name="MMR" />
                <Line type="monotone" dataKey="travelCore" stroke="#0088fe" name="Travel Core" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Regional Risk Assessment */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Map className="w-5 h-5" />
              Regional Risk Factors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                Japanese Encephalitis endemic in region
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                Dengue fever risk in urban areas
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                Seasonal influenza patterns differ from temperate regions
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Recommended Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="text-red-600 font-medium">Immediate (within 1 month):</li>
              <li className="pl-4">- DTP booster</li>
              <li className="pl-4">- MMR second dose</li>
              <li className="text-orange-600 font-medium">Short-term (3-6 months):</li>
              <li className="pl-4">- Japanese Encephalitis consideration</li>
              <li className="text-blue-600 font-medium">Monitoring:</li>
              <li className="pl-4">- COVID-19 boosters as per local guidelines</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VaccinationDashboard;
