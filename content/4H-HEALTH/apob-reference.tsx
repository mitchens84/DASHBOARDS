import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@ui/card';
import Table, { TableBody, TableCell, TableHeader, TableRow } from '@ui/table';
import { ArrowUpDown, Info } from 'lucide-react';

const ApoBReference = () => {
  // Categories for organizing factors
  const categories = {
    DIET: {
      title: "Dietary Factors",
      description: "Nutritional elements that influence ApoB levels"
    },
    LIFESTYLE: {
      title: "Lifestyle Factors",
      description: "Behavioral and environmental influences"
    },
    SUPPLEMENTS: {
      title: "Supplements & Medications",
      description: "Therapeutic interventions that affect ApoB"
    },
    EXERCISE: {
      title: "Exercise Factors",
      description: "Physical activity impacts on ApoB"
    }
  };

  const factors = [
    // Dietary Factors
    {
      category: "DIET",
      factor: "Saturated Fat",
      impact: "Major increase in ApoB",
      mechanism: "Increases hepatic cholesterol synthesis and LDL receptor downregulation",
      optimization: "Limit to <7% of total calories",
      importance: 5,
      frequency: "Daily monitoring",
      evidence: "Strong"
    },
    {
      category: "DIET",
      factor: "Added Sugars",
      impact: "Significant increase",
      mechanism: "Increases hepatic lipogenesis and VLDL production",
      optimization: "Limit to <5% of total calories",
      importance: 5,
      frequency: "Daily monitoring",
      evidence: "Strong"
    },
    {
      category: "DIET",
      factor: "Fiber",
      impact: "Moderate decrease",
      mechanism: "Binds bile acids and reduces cholesterol absorption",
      optimization: "30-40g per day",
      importance: 4,
      frequency: "Daily intake",
      evidence: "Strong"
    },
    {
      category: "DIET",
      factor: "Plant Sterols",
      impact: "Moderate decrease",
      mechanism: "Competes with cholesterol absorption",
      optimization: "2-3g per day",
      importance: 3,
      frequency: "Daily intake",
      evidence: "Strong"
    },
    // Lifestyle Factors
    {
      category: "LIFESTYLE",
      factor: "Sleep Duration",
      impact: "Moderate impact",
      mechanism: "Affects metabolic regulation and inflammation",
      optimization: "7-9 hours per night",
      importance: 4,
      frequency: "Daily",
      evidence: "Moderate"
    },
    {
      category: "LIFESTYLE",
      factor: "Stress Management",
      impact: "Moderate impact",
      mechanism: "Affects cortisol and metabolic regulation",
      optimization: "Regular stress reduction practices",
      importance: 3,
      frequency: "Daily",
      evidence: "Moderate"
    },
    // Supplements & Medications
    {
      category: "SUPPLEMENTS",
      factor: "Berberine",
      impact: "Moderate decrease",
      mechanism: "Increases LDL receptor expression",
      optimization: "500mg 2-3x daily",
      importance: 3,
      frequency: "Daily",
      evidence: "Moderate"
    },
    {
      category: "SUPPLEMENTS",
      factor: "Fish Oil (EPA/DHA)",
      impact: "Mild to moderate decrease",
      mechanism: "Reduces VLDL production",
      optimization: "2-4g combined EPA/DHA daily",
      importance: 3,
      frequency: "Daily",
      evidence: "Moderate"
    },
    {
      category: "SUPPLEMENTS",
      factor: "Red Yeast Rice",
      impact: "Moderate decrease",
      mechanism: "Natural statin-like effects",
      optimization: "1200-2400mg daily",
      importance: 3,
      frequency: "Daily",
      evidence: "Moderate"
    },
    // Exercise Factors
    {
      category: "EXERCISE",
      factor: "Aerobic Exercise",
      impact: "Moderate decrease",
      mechanism: "Improves insulin sensitivity and lipid metabolism",
      optimization: "150+ minutes moderate intensity per week",
      importance: 4,
      frequency: "3-5 sessions per week",
      evidence: "Strong"
    },
    {
      category: "EXERCISE",
      factor: "Resistance Training",
      impact: "Mild to moderate decrease",
      mechanism: "Improves metabolic health and body composition",
      optimization: "2-3 sessions per week, major muscle groups",
      importance: 3,
      frequency: "2-3x weekly",
      evidence: "Moderate"
    }
  ];

  const [sortField, setSortField] = useState('importance');
  const [sortDirection, setSortDirection] = useState('desc');

  const sortedFactors = [...factors].sort((a, b) => {
    if (sortDirection === 'desc') {
      return b[sortField] - a[sortField];
    }
    return a[sortField] - b[sortField];
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  return (
    <div className="w-full space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="w-5 h-5" />
            ApoB Optimization Guide
          </CardTitle>
        </CardHeader>
        <CardContent>
          {Object.entries(categories).map(([key, category]) => (
            <div key={key} className="mb-8">
              <h3 className="text-lg font-semibold mb-2">{category.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{category.description}</p>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHeader>Factor</TableHeader>
                      <TableHeader>Impact</TableHeader>
                      <TableHeader>Optimization</TableHeader>
                      <TableHeader onClick={() => handleSort('importance')} className="cursor-pointer">
                        <div className="flex items-center">
                          Importance
                          <ArrowUpDown className="w-4 h-4 ml-1" />
                        </div>
                      </TableHeader>
                      <TableHeader>Evidence</TableHeader>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedFactors
                      .filter(factor => factor.category === key)
                      .map((factor, index) => (
                        <TableRow key={index}>
                          <TableCell>{factor.factor}</TableCell>
                          <TableCell>{factor.impact}</TableCell>
                          <TableCell>{factor.optimization}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {Array(factor.importance).fill(0).map((_, i) => (
                                <span key={i} className="text-yellow-500">★</span>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>{factor.evidence}</TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ApoBReference;
