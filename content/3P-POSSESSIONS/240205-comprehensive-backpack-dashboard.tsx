import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Star,
  CheckCircle,
  Info,
  Package,
  Weight,
  Laptop,
  Shield,
  Briefcase,
  Activity,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  AreaChart,
  Area,
} from "recharts";

const BackpackDashboard = () => {
  const StarRating = ({ rating }: { rating: number }) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
        />,
      );
    }
    return <div className="flex space-x-1">{stars}</div>;
  };

  // Data for visualizations
  const activityCompatibility = [
    { activity: "Urban EDC", value: 95 },
    { activity: "Gym/Sports", value: 85 },
    { activity: "Travel", value: 80 },
    { activity: "Rucking", value: 70 },
    { activity: "Adventure", value: 75 },
  ];

  const loadComfortData = [
    { weight: 10, comfort: 95 },
    { weight: 20, comfort: 90 },
    { weight: 30, comfort: 75 },
    { weight: 40, comfort: 60 },
    { weight: 50, comfort: 40 },
  ];

  const transitionEfficiency = [
    { scenario: "Gym → Office", efficiency: 90 },
    { scenario: "Travel → Urban", efficiency: 85 },
    { scenario: "Hiking → Social", efficiency: 75 },
    { scenario: "Sport → Casual", efficiency: 85 },
  ];

  const materialPerformance = [
    { aspect: "Water Resistance", rating: 85 },
    { aspect: "Abrasion Resistance", rating: 75 },
    { aspect: "UV Resistance", rating: 80 },
    { aspect: "Tear Strength", rating: 85 },
    { aspect: "Weight/Strength", rating: 90 },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-4">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">
          CT21 V3.0 Backpack Analysis Dashboard
        </h1>
        <p className="text-gray-600">
          Comprehensive multi-purpose capability assessment
        </p>
      </div>

      {/* Main Navigation */}
      <Tabs value="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4"></TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Core Specs Card */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Core Specifications</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Package className="w-8 h-8 text-blue-500" />
                  <div>
                    <div className="text-sm text-gray-500">Volume</div>
                    <div className="text-xl font-bold">21L</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Weight className="w-8 h-8 text-blue-500" />
                  <div>
                    <div className="text-sm text-gray-500">Weight</div>
                    <div className="text-xl font-bold">1.28kg</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Laptop className="w-8 h-8 text-blue-500" />
                  <div>
                    <div className="text-sm text-gray-500">Laptop Size</div>
                    <div className="text-xl font-bold">Up to 16"</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-8 h-8 text-blue-500" />
                  <div>
                    <div className="text-sm text-gray-500">Warranty</div>
                    <div className="text-xl font-bold">Lifetime</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Material Performance Card */}
            <Card>
              <CardHeader>
                <CardTitle>Material Performance</CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={materialPerformance}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="aspect" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar
                      name="Performance"
                      dataKey="rating"
                      stroke="#2563eb"
                      fill="#2563eb"
                      fillOpacity={0.5}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Activity Compatibility Card */}
            <Card>
              <CardHeader>
                <CardTitle>Use Case Analysis</CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={activityCompatibility}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="activity" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar
                      name="Suitability"
                      dataKey="value"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.5}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* DAISAC Tab */}
        <TabsContent value="daisac">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* DAISAC Definition Card */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>
                  Daily Activities & Sports Adventure Carry (DAISAC)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  A unified approach to organizing daily carry needs across
                  multiple activity contexts, optimizing for smooth transitions
                  between different environments and use cases.
                </p>
              </CardContent>
            </Card>

            {/* Activity Transition Card */}
            <Card>
              <CardHeader>
                <CardTitle>Transition Efficiency</CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={transitionEfficiency}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="scenario" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="efficiency"
                      stroke="#8884d8"
                      fill="#8884d8"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Activity Specific Features */}
            <Card>
              <CardHeader>
                <CardTitle>Activity-Specific Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      Professional Environment
                    </h3>
                    <ul className="ml-6 mt-2 space-y-1">
                      <li>Clean aesthetic suitable for office</li>
                      <li>Protected laptop compartment</li>
                      <li>Quick-access pockets for essentials</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      Athletic Activities
                    </h3>
                    <ul className="ml-6 mt-2 space-y-1">
                      <li>Separate compartments for wet gear</li>
                      <li>Internal water bottle storage</li>
                      <li>Ventilated design</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Rucking Tab */}
        <TabsContent value="rucking">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Load Capacity Analysis */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Load Bearing Analysis</CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={loadComfortData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="weight"
                      label={{ value: "Load (lbs)", position: "bottom" }}
                    />
                    <YAxis
                      domain={[0, 100]}
                      label={{
                        value: "Comfort Score",
                        angle: -90,
                        position: "insideLeft",
                      }}
                    />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="comfort"
                      stroke="#2563eb"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Load Distribution Features */}
            <Card>
              <CardHeader>
                <CardTitle>Load Distribution Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <h3 className="font-semibold">Enhanced Strap System</h3>
                      <p className="text-sm text-gray-600">
                        PU Sponge padding with optimal weight distribution
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <h3 className="font-semibold">Frame Support</h3>
                      <p className="text-sm text-gray-600">
                        Removable PE frame sheet for structure
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <h3 className="font-semibold">Impact Protection</h3>
                      <p className="text-sm text-gray-600">
                        Anti-shock bottom padding system
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weight Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle>Weight Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Optimal Load</span>
                    <span className="font-bold text-green-500">15-25 lbs</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Maximum Load</span>
                    <span className="font-bold text-yellow-500">35-40 lbs</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Extended Carry</span>
                    <span className="font-bold text-blue-500">≤30 lbs</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Travel Tab */}
        <TabsContent value="travel">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Travel Capability Overview */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Travel Capability Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold">Weekend Trip</h3>
                    <StarRating rating={5} />
                    <p className="text-sm text-gray-600 mt-2">
                      Optimal capacity for 2-3 days
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold">Extended Trip</h3>
                    <StarRating rating={3} />
                    <p className="text-sm text-gray-600 mt-2">
                      Suitable with minimal packing
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold">Business Travel</h3>
                    <StarRating rating={4} />
                    <p className="text-sm text-gray-600 mt-2">
                      Excellent for professional use
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold">International</h3>
                    <StarRating rating={4} />
                    <p className="text-sm text-gray-600 mt-2">
                      Perfect personal item size
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Travel Features */}
            <Card>
              <CardHeader>
                <CardTitle>Travel-Optimized Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold flex items-center gap-2">
                      <Laptop className="w-4 h-4" />
                      TSA-Friendly Design
                    </h3>
                    <div className="ml-6 mt-2">
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Dedicated laptop quick-access
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Flat-opening main compartment
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Security Features
                    </h3>
                    <div className="ml-6 mt-2">
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Hidden passport pocket
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Lockable YKK zippers
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Packing Optimization */}
            <Card>
              <CardHeader>
                <CardTitle>Packing Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-700">
                      Maximum Efficiency Layout
                    </h3>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li>2-3 days clothing (rolled method)</li>
                      <li>Laptop + tech accessories</li>
                      <li>Toiletries kit</li>
                      <li>Extra shoes</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-700">
                      Smart Features
                    </h3>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li>Compression straps</li>
                      <li>Mesh organization</li>
                      <li>Quick-access pockets</li>
                      <li>Modular attachment points</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Material Performance */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Environmental Performance</CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart
                    data={[
                      { aspect: "Water Resistance", rating: 85 },
                      { aspect: "UV Protection", rating: 80 },
                      { aspect: "Temperature", rating: 90 },
                      { aspect: "Humidity", rating: 85 },
                      { aspect: "Dust/Debris", rating: 75 },
                    ]}
                  >
                    <PolarGrid />
                    <PolarAngleAxis dataKey="aspect" />
                    <PolarRadiusAxis domain={[0, 100]} />
                    <Radar
                      name="Performance"
                      dataKey="rating"
                      stroke="#059669"
                      fill="#059669"
                      fillOpacity={0.5}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Footer/Additional Information */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">Additional Notes</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-500" />
            Lifetime warranty covers manufacturing defects and material failure
          </li>
          <li className="flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-500" />
            Available in multiple colorways (check retailer stock)
          </li>
          <li className="flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-500" />
            Compatible with additional organization accessories
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BackpackDashboard;
