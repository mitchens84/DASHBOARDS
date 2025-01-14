import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { 
  ResponsiveContainer, 
  Sankey, 
  Tooltip 
} from 'recharts';

const FunctionalFoodNetwork = () => {
  const [selectedNode, setSelectedNode] = useState(null);

  // Transform the original data into Sankey format
  const data = {
    nodes: [
      { name: 'Reishi' },
      { name: 'Turkey Tail' },
      { name: 'Garlic' },
      { name: 'Onion' },
      { name: 'Turmeric' },
      { name: 'Ginger' },
      { name: 'Beta-Glucans' },
      { name: 'Allicin' },
      { name: 'Curcumin' },
      { name: 'Immune System' },
      { name: 'Inflammation' },
      { name: 'Gut Health' }
    ],
    links: [
      { source: 0, target: 6, value: 2 },   // Reishi -> Beta-Glucans
      { source: 1, target: 6, value: 2 },   // Turkey Tail -> Beta-Glucans
      { source: 2, target: 7, value: 2 },   // Garlic -> Allicin
      { source: 4, target: 8, value: 2 },   // Turmeric -> Curcumin
      { source: 6, target: 9, value: 3 },   // Beta-Glucans -> Immune System
      { source: 7, target: 10, value: 3 },  // Allicin -> Inflammation
      { source: 8, target: 10, value: 3 },  // Curcumin -> Inflammation
      { source: 2, target: 11, value: 2 },  // Garlic -> Gut Health
      { source: 3, target: 11, value: 2 }   // Onion -> Gut Health
    ]
  };

  return (
    <div className="w-full h-screen bg-white p-4">
      <Card>
        <CardHeader>
          <CardTitle>Functional Foods Interaction Network</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[600px]">
            <ResponsiveContainer width="100%" height="100%">
              <Sankey
                data={data}
                nodePadding={50}
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}
              >
                <Tooltip />
              </Sankey>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FunctionalFoodNetwork;