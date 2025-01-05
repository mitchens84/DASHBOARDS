import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const IngredientItem = ({ name, amount, isOriginal }) => (
  <div className={`p-2 rounded-lg mb-2 ${isOriginal ? 'bg-green-100' : 'bg-amber-100'}`}>
    <div className="flex justify-between items-center">
      <span className="font-medium">{name}</span>
      <span className="text-gray-600">{amount}</span>
    </div>
  </div>
);

const RecipeVisualizer = () => {
  const originalIngredients = [
    { name: 'Dark Green Leafy Vegetables', amount: '8 oz' },
    { name: 'Blueberries', amount: '2¼ cups' },
    { name: 'Banana', amount: '1 medium' },
    { name: 'Cocoa Powder', amount: '1 tbsp' },
    { name: 'Ground Flaxseed', amount: '1 tbsp' },
    { name: 'Plant-based Milk', amount: '½ cup' },
    { name: 'Water', amount: '½ cup' }
  ];

  const additionalIngredients = [
    { name: 'Fresh Ginger', amount: '½ inch' },
    { name: 'Goji Berries', amount: '1 tbsp' },
    { name: 'Medjool Date', amount: '1 piece' }
  ];

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center">Enhanced LIFE Anti-Inflammatory Smoothie</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <div className="w-4 h-4 bg-green-100 rounded mr-2"></div>
            <span className="font-semibold">Original Ingredients</span>
          </div>
          {originalIngredients.map((ingredient, index) => (
            <IngredientItem
              key={index}
              name={ingredient.name}
              amount={ingredient.amount}
              isOriginal={true}
            />
          ))}
        </div>
        
        <div>
          <div className="flex items-center mb-4">
            <div className="w-4 h-4 bg-amber-100 rounded mr-2"></div>
            <span className="font-semibold">Enhanced Ingredients</span>
          </div>
          {additionalIngredients.map((ingredient, index) => (
            <IngredientItem
              key={index}
              name={ingredient.name}
              amount={ingredient.amount}
              isOriginal={false}
            />
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">Instructions:</h3>
          <ol className="list-decimal list-inside space-y-2">
            <li>Soak goji berries in plant milk (10 mins)</li>
            <li>Add liquids and ginger to blender</li>
            <li>Add remaining ingredients</li>
            <li>Blend until smooth</li>
            <li>Adjust thickness with water if needed</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecipeVisualizer;