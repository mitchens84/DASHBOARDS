import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckSquare, AlertTriangle, Calendar, Wrench, PhoneCall, Droplets } from 'lucide-react';

const MaintenanceDashboard = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Trek Bike Maintenance Dashboard</h1>
      <div className="mb-4">
        <Alert className="bg-blue-50 border-blue-200">
          <AlertTriangle className="w-4 h-4 text-blue-500" />
          <AlertDescription>
            If you notice unusual noises, brake problems, or any safety concerns, contact ARMBIKES immediately
          </AlertDescription>
        </Alert>
      </div>

      {/* Daily Quick Check Section */}
      <Card className="mb-6 border-green-200 shadow-md">
        <CardHeader className="bg-green-50">
          <CardTitle className="flex items-center text-green-700">
            <CheckSquare className="mr-2" />
            Quick Pre-Ride Check (Daily)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">A - Air</h3>
              <ul className="list-disc list-inside text-sm">
                <li>Squeeze tires - firm but giving</li>
                <li>No bulging or flat spots</li>
              </ul>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">B - Brakes</h3>
              <ul className="list-disc list-inside text-sm">
                <li>Firm lever feel</li>
                <li>No grinding sounds</li>
              </ul>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">C - Chain</h3>
              <ul className="list-disc list-inside text-sm">
                <li>Clean and lubricated</li>
                <li>No rust or dry spots</li>
              </ul>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Q - Quick Release</h3>
              <ul className="list-disc list-inside text-sm">
                <li>Wheels secure</li>
                <li>Seat post tight</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Maintenance */}
      <Card className="mb-6 border-blue-200 shadow-md">
        <CardHeader className="bg-blue-50">
          <CardTitle className="flex items-center text-blue-700">
            <Calendar className="mr-2" />
            Weekly Maintenance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Clean</h3>
              <ul className="list-disc list-inside text-sm">
                <li>Wipe frame with damp cloth</li>
                <li>Clean rims and brake pads</li>
                <li>Wipe chain with dry cloth</li>
              </ul>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Check</h3>
              <ul className="list-disc list-inside text-sm">
                <li>Tire pressure (30-40 PSI)</li>
                <li>Inspect tires for damage</li>
                <li>Lubricate chain if needed</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Section */}
      <Card className="mb-6 border-purple-200 shadow-md">
        <CardHeader className="bg-purple-50">
          <CardTitle className="flex items-center text-purple-700">
            <Wrench className="mr-2" />
            Monthly Checks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Drivetrain</h3>
              <ul className="list-disc list-inside text-sm">
                <li>Deep clean chain</li>
                <li>Clean chainrings</li>
                <li>Clean cassette</li>
              </ul>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Bolts</h3>
              <ul className="list-disc list-inside text-sm">
                <li>Check all bolts</li>
                <li>Verify stem security</li>
                <li>Test brake mounts</li>
              </ul>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Systems</h3>
              <ul className="list-disc list-inside text-sm">
                <li>Check brake pads</li>
                <li>Test gear shifting</li>
                <li>Inspect cables</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rainy Season Alert */}
      <Card className="mb-6 border-yellow-200 shadow-md">
        <CardHeader className="bg-yellow-50">
          <CardTitle className="flex items-center text-yellow-700">
            <Droplets className="mr-2" />
            Rainy Season Care (July-October)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <ul className="list-disc list-inside text-sm">
                <li>More frequent chain lubrication</li>
                <li>Check brakes after wet rides</li>
                <li>Wipe bike dry after each ride</li>
              </ul>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <ul className="list-disc list-inside text-sm">
                <li>Monitor for rust development</li>
                <li>Keep chain extra clean</li>
                <li>Check tire grip regularly</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Card */}
      <Card className="border-red-200 shadow-md">
        <CardHeader className="bg-red-50">
          <CardTitle className="flex items-center text-red-700">
            <PhoneCall className="mr-2" />
            Professional Service Contact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-3 bg-gray-50 rounded-lg">
            <h3 className="font-semibold">ARMBIKES</h3>
            <p className="text-sm mt-2">Visit when you notice:</p>
            <ul className="list-disc list-inside text-sm mt-1">
              <li>Unusual noises (clicking, creaking)</li>
              <li>Persistent brake or shifting issues</li>
              <li>Any loose components</li>
              <li>Annual maintenance due</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaintenanceDashboard;
