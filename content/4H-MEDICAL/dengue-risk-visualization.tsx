import { Sun, Moon, Droplets, ThermometerSun, Target, AlertTriangle, Clock } from 'lucide-react';

type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'SEVERE';

const DengueRiskDashboard = () => {
  const timeBlocks = [
    {hour: 6, risk: 'MODERATE' as RiskLevel, icon: Sun},
    {hour: 9, risk: 'LOW' as RiskLevel, icon: Sun},
    {hour: 12, risk: 'LOW' as RiskLevel, icon: Sun},
    {hour: 15, risk: 'LOW' as RiskLevel, icon: Sun},
    {hour: 18, risk: 'HIGH' as RiskLevel, icon: Moon},
    {hour: 21, risk: 'HIGH' as RiskLevel, icon: Moon},
  ];

  const monthlyRisk = [
    {month: 'JAN', risk: 'LOW' as RiskLevel},
    {month: 'FEB', risk: 'LOW' as RiskLevel},
    {month: 'MAR', risk: 'MODERATE' as RiskLevel},
    {month: 'APR', risk: 'HIGH' as RiskLevel},
    {month: 'MAY', risk: 'SEVERE' as RiskLevel},
    {month: 'JUN', risk: 'SEVERE' as RiskLevel},
    {month: 'JUL', risk: 'SEVERE' as RiskLevel},
    {month: 'AUG', risk: 'SEVERE' as RiskLevel},
    {month: 'SEP', risk: 'HIGH' as RiskLevel},
    {month: 'OCT', risk: 'MODERATE' as RiskLevel},
    {month: 'NOV', risk: 'LOW' as RiskLevel},
    {month: 'DEC', risk: 'LOW' as RiskLevel}
  ];

  const getRiskColor = (risk: RiskLevel): string => {
    const colors: Record<RiskLevel, string> = {
      'LOW': 'bg-green-100 text-green-800',
      'MODERATE': 'bg-yellow-100 text-yellow-800',
      'HIGH': 'bg-orange-100 text-orange-800',
      'SEVERE': 'bg-red-100 text-red-800'
    };
    return colors[risk] || 'bg-gray-100';
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Dengue Risk Assessment - Chiang Mai</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Daily Risk Pattern */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Daily Risk Pattern
          </h3>
          <div className="grid grid-cols-6 gap-2">
            {timeBlocks.map(({hour, risk, icon: Icon}) => (
              <div key={hour} className={`p-2 rounded-lg ${getRiskColor(risk)} text-center`}>
                <Icon className="w-6 h-6 mx-auto mb-1" />
                <div className="text-sm font-semibold">{hour}:00</div>
                <div className="text-xs">{risk}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Risk Factors */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Current Risk Factors
          </h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <ThermometerSun className="w-5 h-5 mr-2" />
              <span>Temperature: 28-32°C (Optimal for mosquitoes)</span>
            </div>
            <div className="flex items-center">
              <Droplets className="w-5 h-5 mr-2" />
              <span>Humidity: 70-80% (High risk)</span>
            </div>
            <div className="flex items-center">
              <Target className="w-5 h-5 mr-2" />
              <span>Cases in 2025: 40% increase YoY</span>
            </div>
          </div>
        </div>
      </div>

      {/* Seasonal Risk Pattern */}
      <div className="mt-6 border rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Annual Risk Pattern</h3>
        <div className="grid grid-cols-12 gap-1">
          {monthlyRisk.map(({month, risk}) => (
            <div key={month} className={`p-2 rounded-lg ${getRiskColor(risk)} text-center`}>
              <div className="text-sm font-semibold">{month}</div>
              <div className="text-xs">{risk}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Prevention Measures */}
      <div className="mt-6 border-t pt-4">
        <h3 className="text-lg font-semibold mb-3">Key Prevention Measures</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 bg-blue-50 rounded-lg">
            <h4 className="font-semibold">Personal Protection</h4>
            <ul className="text-sm space-y-1">
              <li>• Use EPA-registered repellents</li>
              <li>• Wear protective clothing</li>
              <li>• Install/maintain screens</li>
            </ul>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <h4 className="font-semibold">Environment Management</h4>
            <ul className="text-sm space-y-1">
              <li>• Eliminate standing water</li>
              <li>• Regular property inspection</li>
              <li>• Maintain drainage systems</li>
            </ul>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <h4 className="font-semibold">Monitoring Protocol</h4>
            <ul className="text-sm space-y-1">
              <li>• Track local case numbers</li>
              <li>• Monitor weather patterns</li>
              <li>• Regular health checks</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DengueRiskDashboard;
