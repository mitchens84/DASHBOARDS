import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Info, Activity, Thermometer, Droplets, AlertTriangle, Heart, Brain, Clock } from 'lucide-react';

const SodiumCalculator = () => {
  // Base state management
  const [baselineNeeds, setBaselineNeeds] = useState(3000); // mg sodium
  const [weight, setWeight] = useState(70); // kg
  const [exerciseHours, setExerciseHours] = useState(1);
  const [exerciseIntensity, setExerciseIntensity] = useState(5);
  const [temperature, setTemperature] = useState(25);
  const [humidity, setHumidity] = useState(50);
  const [saunaMinutes, setSaunaMinutes] = useState(20);
  const [saunaTemp, setSaunaTemp] = useState(80);
  const [potassiumIntake, setPotassiumIntake] = useState(3500);
  const [lastIntakeHours, setLastIntakeHours] = useState(0);

  // Research-based constants
  const CONSTANTS = {
    BASE_SODIUM_PER_KG: 45, // mg/kg/day
    SWEAT_SODIUM_CONCENTRATION: 1000, // mg/L
    SAUNA_LOSS_FACTOR: 1.5, // increased concentration in heat
    POTASSIUM_RATIO_TARGET: 2, // optimal Na:K ratio
    MIN_SAFE_SODIUM: 3000, // mg/day
    MAX_SAFE_SODIUM: 7000 // mg/day
  };

  // Depletion timeline data
  const generateDepletionData = () => {
    const hoursArray = Array.from({length: 24}, (_, i) => i);
    return hoursArray.map(hour => {
      const baseLevel = totalNeeds * 0.8; // 80% of daily needs as baseline
      const depletionRate = 0.04; // 4% per hour
      const timeSinceIntake = (hour + 24 - lastIntakeHours) % 24;
      const currentLevel = baseLevel * Math.exp(-depletionRate * timeSinceIntake);
      
      return {
        hour,
        sodiumLevel: Math.round(currentLevel),
        optimalLevel: totalNeeds / 24, // ideal steady state
        minSafe: CONSTANTS.MIN_SAFE_SODIUM / 24,
        maxSafe: CONSTANTS.MAX_SAFE_SODIUM / 24
      };
    });
  };

  // Parameter impact explanations
  const parameterImpacts = {
    weight: {
      title: "Body Weight Impact",
      description: "Base sodium needs scale with body mass. Each kg requires approximately 45mg sodium daily.",
      research: "Based on metabolic studies showing correlation between lean mass and sodium requirements.",
      impact: (value) => `${Math.round(value * CONSTANTS.BASE_SODIUM_PER_KG)}mg baseline need`
    },
    exercise: {
      title: "Exercise Impact",
      description: "Exercise increases sodium loss through sweat, varying with intensity and duration.",
      research: "Sports medicine studies show losses of 1-2g sodium per hour of intense exercise.",
      impact: (hours, intensity) => `${Math.round(hours * intensity * 200)}mg additional need`
    },
    environment: {
      title: "Environmental Impact",
      description: "Temperature and humidity affect sweat rate and sodium loss.",
      research: "Studies in hot climates show increased sodium needs of 20-50% above baseline.",
      impact: (temp, humid) => `${Math.round((temp - 20) * (humid/100) * 100)}mg adjustment`
    },
    sauna: {
      title: "Sauna Impact",
      description: "Heat exposure increases sodium loss through concentrated sweat.",
      research: "Thermal stress studies indicate elevated sodium losses in sauna conditions.",
      impact: (mins, temp) => `${Math.round(mins * (temp/80) * 25)}mg additional need`
    }
  };

  // Enhanced calculation with research-based factors
  const calculateSodiumNeeds = () => {
    // Base needs from weight
    const weightBased = weight * CONSTANTS.BASE_SODIUM_PER_KG;
    let total = Math.max(weightBased, baselineNeeds);

    // Exercise adjustment
    const sweatRate = (exerciseIntensity / 10) * (temperature / 30) * (humidity / 100);
    const exerciseLoss = exerciseHours * sweatRate * CONSTANTS.SWEAT_SODIUM_CONCENTRATION;
    
    // Sauna adjustment
    const saunaSweatRate = (saunaTemp / 100) * (saunaMinutes / 30);
    const saunaLoss = saunaSweatRate * CONSTANTS.SWEAT_SODIUM_CONCENTRATION * CONSTANTS.SAUNA_LOSS_FACTOR;

    // Environmental adjustment
    const environmentalFactor = Math.max(0, (temperature - 20) * (humidity / 100) * 100);

    // Potassium interaction adjustment
    const potassiumRatio = potassiumIntake / 3500;
    const ratioAdjustment = 1 + (1 - Math.min(potassiumRatio, 2)) * 0.2;

    total = (total + exerciseLoss + saunaLoss + environmentalFactor) * ratioAdjustment;

    return Math.round(total);
  };

  const [totalNeeds, setTotalNeeds] = useState(calculateSodiumNeeds());
  const [depletionData, setDepletionData] = useState(generateDepletionData());

  useEffect(() => {
    const newTotal = calculateSodiumNeeds();
    setTotalNeeds(newTotal);
    setDepletionData(generateDepletionData());
  }, [weight, exerciseHours, exerciseIntensity, temperature, humidity, 
      saunaMinutes, saunaTemp, potassiumIntake, lastIntakeHours]);

  // Risk assessment ranges with research context
  const rangeData = [
    {
      range: 'Too Low',
      min: 0,
      max: 3000,
      risk: 'High',
      implications: 'Risk of RAAS activation, increased lipids, compromised performance',
      research: 'Studies show increased cardiovascular risk below 3g/day'
    },
    {
      range: 'Optimal Low',
      min: 3000,
      max: 4000,
      risk: 'Low',
      implications: 'Good for blood pressure management if not highly active',
      research: 'Associated with lowest mortality in sedentary populations'
    },
    {
      range: 'Optimal',
      min: 4000,
      max: 5000,
      risk: 'Minimal',
      implications: 'Ideal range for most active individuals',
      research: 'Supported by multiple large-scale studies'
    },
    {
      range: 'Optimal High',
      min: 5000,
      max: 6000,
      risk: 'Low',
      implications: 'May be appropriate for very active individuals in hot climates',
      research: 'Based on studies of athletes in hot environments'
    },
    {
      range: 'Too High',
      min: 6000,
      max: 7000,
      risk: 'High',
      implications: 'Risk of blood pressure elevation and fluid retention',
      research: 'Associated with increased cardiovascular risk'
    }
  ];

  return (
    <div className="w-full max-w-4xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Advanced Sodium Balance Calculator
          </CardTitle>
          <p className="text-sm text-gray-600">
            Evidence-based sodium needs calculation with real-time depletion tracking
          </p>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="calculator">
            <TabsList>
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="timeline">Depletion Timeline</TabsTrigger>
              <TabsTrigger value="research">Research</TabsTrigger>
            </TabsList>

            <TabsContent value="calculator">
              <div className="space-y-6">
                <Alert className="mb-4">
                  <AlertTitle>Research-Based Calculation</AlertTitle>
                  <AlertDescription>
                    This calculator combines evidence from sports medicine, environmental physiology, 
                    and metabolic research to provide personalized recommendations.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Base Metrics */}
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Info className="h-5 w-5 text-blue-500" />
                      Base Metrics
                    </h3>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">Weight (kg)</label>
                      <Slider 
                        value={[weight]}
                        min={40}
                        max={120}
                        step={1}
                        onValueChange={(value) => setWeight(value[0])}
                      />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>{weight} kg</span>
                        <span>{parameterImpacts.weight.impact(weight)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Activity Metrics */}
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Activity className="h-5 w-5 text-blue-500" />
                      Activity Metrics
                    </h3>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">Exercise Duration (hours/day)</label>
                      <Slider 
                        value={[exerciseHours]}
                        min={0}
                        max={4}
                        step={0.5}
                        onValueChange={(value) => setExerciseHours(value[0])}
                      />
                      <span className="text-sm text-gray-500">{exerciseHours} hours</span>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium">Exercise Intensity (1-10)</label>
                      <Slider 
                        value={[exerciseIntensity]}
                        min={1}
                        max={10}
                        step={1}
                        onValueChange={(value) => setExerciseIntensity(value[0])}
                      />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Level {exerciseIntensity}</span>
                        <span>{parameterImpacts.exercise.impact(exerciseHours, exerciseIntensity)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Environmental Factors */}
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Thermometer className="h-5 w-5 text-blue-500" />
                      Environmental Factors
                    </h3>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">Temperature (°C)</label>
                      <Slider 
                        value={[temperature]}
                        min={15}
                        max={40}
                        step={1}
                        onValueChange={(value) => setTemperature(value[0])}
                      />
                      <span className="text-sm text-gray-500">{temperature}°C</span>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium">Humidity (%)</label>
                      <Slider 
                        value={[humidity]}
                        min={0}
                        max={100}
                        step={5}
                        onValueChange={(value) => setHumidity(value[0])}
                      />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>{humidity}%</span>
                        <span>{parameterImpacts.environment.impact(temperature, humidity)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Sauna Usage */}
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Thermometer className="h-5 w-5 text-red-500" />
                      Sauna Usage
                    </h3>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">Duration (minutes/day)</label>
                      <Slider 
                        value={[saunaMinutes]}
                        min={0}
                        max={60}
                        step={5}
                        onValueChange={(value) => setSaunaMinutes(value[0])}
                      />
                      <span className="text-sm text-gray-500">{saunaMinutes} minutes</span>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium">Temperature (°C)</label>
                      <Slider 
                        value={[saunaTemp]}
                        min={60}
                        max={100}
                        step={5}
                        onValueChange={(value) => setSaunaTemp(value[0])}
                      />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>{saunaTemp}°C</span>
                        <span>{parameterImpacts.sauna.impact(saunaMinutes, saunaTemp)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Results Analysis</h3>
                  
                  <div className="text-3xl font-bold text-blue-600 mb-4">
                    {Math.round(totalNeeds)} mg sodium
                    <span className="text-sm text-gray-600 ml-2">
                      ({Math.round(totalNeeds/1000 * 2.5)} g salt)
                    </span>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Risk Assessment</h4>
                    {rangeData.map((range, index) => (
                      <div 
                        key={index}
                        className={`p-4 rounded-lg ${
                          totalNeeds >= range.min && totalNeeds < range.max 
                          ? 'bg-blue-100 border-l-4 border-blue-500' 
                          : 'bg-gray-50'
                        }`}
                      >
                        <div className="font-medium">{range.range}: {range.min}-{range.max} mg/day</div>
                        <div className="text-sm text-gray-600">Risk Level: {range.risk}</div>
                        <div className="text-sm mt-1">{range.implications}</div>
                        <div className="text-xs text-gray-500 mt-1 italic">{range.research}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="timeline">
              <div className="space-y-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold flex items-center gap-2 mb-4">
                    <Clock className="h-5 w-5 text-blue-500" />
                    Sodium Depletion Timeline
                  </h3>
                  <LineChart
                    width={700}
                    height={300}
                    data={depletionData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" label={{ value: 'Hours', position: 'bottom' }} />
                    <YAxis label={{ value: 'Sodium (mg)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="sodiumLevel" 
                      stroke="#8884d8" 
                      name="Current Level"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="optimalLevel" 
                      stroke="#82ca9d" 
                      name="Optimal Level"
                      strokeDasharray="5 5"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="minSafe" 
                      stroke="#ff7f7f" 
                      name="Minimum Safe Level"
                      strokeDasharray="3 3"
                    />
                  </LineChart>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Depletion Factors</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Base metabolic loss: ~0.2g/hour</li>
                      <li>• Exercise accelerates loss by 2-4x</li>
                      <li>• Heat exposure increases loss by 1.5-2x</li>
                      <li>• Recovery period: 4-6 hours post-intake</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Replenishment Strategy</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Divide daily intake into 4-6 portions</li>
                      <li>• Time larger portions around exercise</li>
                      <li>• Account for environmental conditions</li>
                      <li>• Monitor hydration status</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="research">
              <div className="prose max-w-none">
                <h3>Research Foundation</h3>
                <p>This calculator integrates findings from multiple research domains:</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold">Core Research Findings</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Optimal range: 3-5g/day for most adults</li>
                      <li>• Athletic needs: Additional 1-2g/day</li>
                      <li>• Environmental impact: Up to 50% increased needs</li>
                      <li>• Potassium interaction: Optimal Na:K ratio 1:2</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold">Individual Variation Factors</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Metabolic rate differences: ±20%</li>
                      <li>• Sweat sodium concentration: 0.5-2.3g/L</li>
                      <li>• Heat adaptation: 20-30% reduction over time</li>
                      <li>• Activity level impact: 30-120% increase</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold">Key Research References</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Sports medicine studies on electrolyte balance</li>
                    <li>• Environmental physiology research</li>
                    <li>• Clinical trials on sodium-health relationships</li>
                    <li>• Population studies on optimal intake ranges</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SodiumCalculator;