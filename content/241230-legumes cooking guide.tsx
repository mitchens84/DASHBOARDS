import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const ComprehensiveLegumeGuide = () => {
  const cookingData = [
    {
      type: 'Red Lentils',
      amount: '1 kg',
      waterLevel: '5 cm above',
      cookTime: '15 mins',
      naturalRelease: '10 mins',
      totalTime: '25 mins',
    },
    {
      type: 'Brown Lentils',
      amount: '1 kg',
      waterLevel: '5 cm above',
      cookTime: '15 mins',
      naturalRelease: '10 mins',
      totalTime: '25 mins',
    },
    {
      type: 'Chickpeas',
      amount: '900g',
      waterLevel: '5 cm above',
      cookTime: '20 mins',
      naturalRelease: '15 mins',
      totalTime: '35 mins',
    },
    {
      type: 'Kidney Beans',
      amount: '800g',
      waterLevel: '5 cm above',
      cookTime: '20 mins',
      naturalRelease: '15 mins',
      totalTime: '35 mins',
    },
    {
      type: 'Black Beans',
      amount: '800g',
      waterLevel: '5 cm above',
      cookTime: '17 mins',
      naturalRelease: '15 mins',
      totalTime: '32 mins',
    }
  ];

  const nutritionalData = [
    {
      type: 'Lentils',
      rank: 1,
      protein: '18g',
      iron: '6.5mg',
      fiber: '15.6g',
      benefits: ['Best iron absorption', 'High folate', 'Quick cooking'],
      antinutrient: 'Low'
    },
    {
      type: 'Chickpeas',
      rank: 2,
      protein: '15g',
      iron: '4.3mg',
      fiber: '12.2g',
      benefits: ['High selenium', 'Rich in butyrate', 'Rare antioxidants'],
      antinutrient: 'Medium'
    },
    {
      type: 'Black Beans',
      rank: 3,
      protein: '21g',
      iron: '5.3mg',
      fiber: '15.5g',
      benefits: ['Highest antioxidants', 'High manganese', 'Strong fiber profile'],
      antinutrient: 'Medium'
    },
    {
      type: 'Kidney Beans',
      rank: 4,
      protein: '15.3g',
      iron: '5.0mg',
      fiber: '11.3g',
      benefits: ['Good thiamine', 'High phosphorus', 'Balanced minerals'],
      antinutrient: 'High'
    }
  ];

  const antinutrients = [
    {
      type: 'Phytic Acid',
      affected: 'All',
      effects: 'Reduces mineral absorption',
      reduction: ['Soaking', 'Sprouting', 'Cooking']
    },
    {
      type: 'Lectins',
      affected: 'Highest in kidney beans',
      effects: 'Digestive issues',
      reduction: ['Thorough cooking', 'Proper soaking']
    },
    {
      type: 'Oligosaccharides',
      affected: 'All',
      effects: 'Gas and bloating',
      reduction: ['Soaking', 'Discarding soak water']
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-8 print:p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Comprehensive Legume Guide</h1>

      {/* Pre-Cooking Safety and Setup */}
      <Card className="mb-8 print:break-inside-avoid">
        <CardHeader>
          <CardTitle>Pre-Cooking Safety and Setup</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold mb-2">Essential Safety Checks</h3>
              <ul className="list-disc pl-4 mb-4">
                <li>Sealing ring properly installed and undamaged</li>
                <li>Floating valve moves freely</li>
                <li>Steam release valve clean and functional</li>
                <li>Inner pot free from cracks or damage</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Fill Level Guidelines</h3>
              <ul className="list-disc pl-4 mb-4">
                <li>Standard foods: Max 2/3 full</li>
                <li>Expanding foods (beans, grains): Max 1/2 full</li>
                <li>Minimum liquid: 1 cup (unless recipe specifies)</li>
                <li>Water level 5cm above legumes</li>
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-bold mb-2">Basic Pressure Cooking Steps</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Setup</h4>
                <ol className="list-decimal pl-4 mb-4">
                  <li>Add ingredients + liquid</li>
                  <li>Lock lid securely</li>
                  <li>Set valve to "Sealing"</li>
                  <li>Select cooking function</li>
                  <li>Allow pressure to build (5-10 mins)</li>
                  <li>Cook for set time</li>
                  <li>Allow natural release as specified</li>
                </ol>
              </div>
              <div>
                <h4 className="font-semibold mb-2">After Cooking</h4>
                <ol className="list-decimal pl-4">
                  <li>Wait for natural release time</li>
                  <li>Ensure float valve has dropped</li>
                  <li>Open lid away from face</li>
                  <li>Check legumes for doneness</li>
                  <li>Adjust seasonings as needed</li>
                </ol>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pressure Cooker Instructions */}
      <Card className="mb-8 print:break-inside-avoid">
        <CardHeader>
          <CardTitle>Pressure Cooker Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border text-left">Type</th>
                  <th className="p-2 border text-left">Amount</th>
                  <th className="p-2 border text-left">Water Level</th>
                  <th className="p-2 border text-left">Cook Time</th>
                  <th className="p-2 border text-left">Natural Release</th>
                  <th className="p-2 border text-left">Total Time</th>
                </tr>
              </thead>
              <tbody>
                {cookingData.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-2 border font-medium">{item.type}</td>
                    <td className="p-2 border">{item.amount}</td>
                    <td className="p-2 border">{item.waterLevel}</td>
                    <td className="p-2 border">{item.cookTime}</td>
                    <td className="p-2 border">{item.naturalRelease}</td>
                    <td className="p-2 border">{item.totalTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Nutritional Information */}
      <Card className="mb-8 print:break-inside-avoid">
        <CardHeader>
          <CardTitle>Nutritional Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border text-left">Type</th>
                  <th className="p-2 border text-left">Rank</th>
                  <th className="p-2 border text-left">Protein</th>
                  <th className="p-2 border text-left">Iron</th>
                  <th className="p-2 border text-left">Fiber</th>
                  <th className="p-2 border text-left">Benefits</th>
                  <th className="p-2 border text-left">Antinutrient Level</th>
                </tr>
              </thead>
              <tbody>
                {nutritionalData.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-2 border font-medium">{item.type}</td>
                    <td className="p-2 border">{item.rank}</td>
                    <td className="p-2 border">{item.protein}</td>
                    <td className="p-2 border">{item.iron}</td>
                    <td className="p-2 border">{item.fiber}</td>
                    <td className="p-2 border">
                      <ul className="list-disc pl-4">
                        {item.benefits.map((benefit, i) => (
                          <li key={i}>{benefit}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-2 border">{item.antinutrient}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Antinutrient Management */}
      <Card className="mb-8 print:break-inside-avoid">
        <CardHeader>
          <CardTitle>Antinutrient Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border text-left">Antinutrient</th>
                  <th className="p-2 border text-left">Affected Legumes</th>
                  <th className="p-2 border text-left">Effects</th>
                  <th className="p-2 border text-left">Reduction Methods</th>
                </tr>
              </thead>
              <tbody>
                {antinutrients.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-2 border font-medium">{item.type}</td>
                    <td className="p-2 border">{item.affected}</td>
                    <td className="p-2 border">{item.effects}</td>
                    <td className="p-2 border">
                      <ul className="list-disc pl-4">
                        {item.reduction.map((method, i) => (
                          <li key={i}>{method}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Troubleshooting Guide */}
      <Card className="mb-8 print:break-inside-avoid">
        <CardHeader>
          <CardTitle>Troubleshooting Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold mb-2">Common Issues</h3>
              <ul className="list-disc pl-4 mb-4">
                <li><span className="font-semibold">Legumes not fully cooked:</span> Add 2-3 minutes, reseal and cook again</li>
                <li><span className="font-semibold">Too much foam:</span> Ensure oil was added, don't exceed fill line</li>
                <li><span className="font-semibold">Burn notice:</span> Add more liquid, ensure no stuck food at bottom</li>
                <li><span className="font-semibold">Sealing issues:</span> Check ring placement, clean valve</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Prevention Tips</h3>
              <ul className="list-disc pl-4">
                <li>Always use recommended water levels</li>
                <li>Clean sealing ring after each use</li>
                <li>Store lid upside down when not in use</li>
                <li>Regular valve maintenance</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Optimization Tips */}
      <Card className="print:break-inside-avoid">
        <CardHeader>
          <CardTitle>Optimization Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold mb-2">General Preparation</h3>
              <ul className="list-disc pl-4 mb-4">
                <li>Sort and remove debris before soaking</li>
                <li>Rinse thoroughly after soaking</li>
                <li>Add salt only after legumes are tender</li>
                <li>Store cooked legumes in cooking liquid</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Digestibility Enhancement</h3>
              <ul className="list-disc pl-4 mb-4">
                <li>Add digestive spices (cumin, ginger, fennel)</li>
                <li>Consider adding kombu seaweed</li>
                <li>Thoroughly cook until very tender</li>
                <li>Introduce gradually to diet</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Nutrient Preservation</h3>
              <ul className="list-disc pl-4 mb-4">
                <li>Don't overcook (follow recommended times)</li>
                <li>Consider pressure cooking for nutrient retention</li>
                <li>Add acidic ingredients after cooking</li>
                <li>Store properly in airtight containers</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Safety Considerations</h3>
              <ul className="list-disc pl-4">
                <li>Never consume raw or undercooked kidney beans</li>
                <li>Ensure proper soaking for all varieties except lentils</li>
                <li>Always discard soaking water</li>
                <li>Use fresh, clean water for cooking</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComprehensiveLegumeGuide;