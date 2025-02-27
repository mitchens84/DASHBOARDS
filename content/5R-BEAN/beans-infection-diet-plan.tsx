import React from 'react';
import { Coffee, Droplet, XCircle, CheckCircle, AlertTriangle, Clock, ExternalLink } from 'lucide-react';

const BeanDietPlan = () => {
  return (
    <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header Section */}
      <div className="bg-green-600 text-white p-6">
        <h1 className="text-3xl font-bold text-center">Bean's P. mirabilis UTI Recovery Diet Plan</h1>
        <p className="text-center text-xl mt-2">Phase 1 (Days 1-7) - 20kg Dog on Plant-Based Diet</p>
        <p className="text-center text-lg mt-1">One Meal Schedule (5pm feeding)</p>
      </div>

      {/* Main content container */}
      <div className="p-6">
        {/* Foods to Add Section */}
        <div className="mb-8">
          <div className="bg-green-100 rounded-t-lg p-4 flex items-center">
            <CheckCircle className="text-green-600 mr-2" size={24} />
            <h2 className="text-2xl font-bold text-green-800">Foods to Add/Increase</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Cooked Lentils */}
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="flex justify-between">
                <h3 className="text-xl font-bold text-green-700">Cooked Lentils</h3>
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">150g daily</span>
              </div>
              <p className="mt-2 text-gray-700">30% of meal mass</p>
              <div className="mt-3">
                <div className="bg-white p-2 rounded-md">
                  <p className="text-sm text-gray-600"><strong>Action:</strong> Provides 0.45g methionine; sulfur amino acid metabolism produces hydrogen ions</p>
                </div>
                <div className="bg-white p-2 rounded-md mt-2">
                  <p className="text-sm text-gray-600"><strong>Effect:</strong> 0.4 pH unit reduction; contributes to targeted acidification</p>
                </div>
              </div>
            </div>

            {/* Methionine-fortified Soy Protein */}
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="flex justify-between">
                <h3 className="text-xl font-bold text-green-700">Methionine-fortified Soy</h3>
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">50g daily</span>
              </div>
              <p className="mt-2 text-gray-700">10% of meal mass</p>
              <div className="mt-3">
                <div className="bg-white p-2 rounded-md">
                  <p className="text-sm text-gray-600"><strong>Action:</strong> Provides 0.6g methionine; high sulfur amino acid density</p>
                </div>
                <div className="bg-white p-2 rounded-md mt-2">
                  <p className="text-sm text-gray-600"><strong>Effect:</strong> Additional 0.4-0.6 pH unit reduction</p>
                </div>
              </div>
            </div>

            {/* Frozen Cranberries */}
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="flex justify-between">
                <h3 className="text-xl font-bold text-green-700">Frozen Cranberries</h3>
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">20g twice daily</span>
              </div>
              <p className="mt-2 text-gray-700">OR Cranberry Extract: 720mg (36mg PACs/kg)</p>
              <div className="mt-3">
                <div className="bg-white p-2 rounded-md">
                  <p className="text-sm text-gray-600"><strong>Action:</strong> Proanthocyanidins inhibit bacterial adhesion; mild acidification</p>
                </div>
                <div className="bg-white p-2 rounded-md mt-2">
                  <p className="text-sm text-gray-600"><strong>Effect:</strong> 70-75% reduction in bacterial attachment; 0.2-0.3 pH decrease</p>
                </div>
              </div>
            </div>

            {/* Added Water */}
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-green-700">Added Water</h3>
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">100ml per meal</span>
              </div>
              <p className="mt-2 text-gray-700">200ml daily extra hydration</p>
              <div className="mt-3">
                <div className="bg-white p-2 rounded-md">
                  <p className="text-sm text-gray-600"><strong>Action:</strong> Dilutes urine; increases urination frequency</p>
                </div>
                <div className="bg-white p-2 rounded-md mt-2">
                  <p className="text-sm text-gray-600"><strong>Effect:</strong> Urine specific gravity ≤1.025; supports bacterial flushing</p>
                </div>
              </div>
            </div>

            {/* Red Bell Pepper and Lime */}
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="flex justify-between">
                <h3 className="text-xl font-bold text-green-700">Red Bell Pepper + Lime</h3>
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">50g + 1/4 lime</span>
              </div>
              <p className="mt-2 text-gray-700">Natural vitamin C sources</p>
              <div className="mt-3">
                <div className="bg-white p-2 rounded-md">
                  <p className="text-sm text-gray-600"><strong>Action:</strong> Provides vitamin C and citric acid for additional acidification</p>
                </div>
                <div className="bg-white p-2 rounded-md mt-2">
                  <p className="text-sm text-gray-600"><strong>Effect:</strong> 0.2-0.3 pH unit reduction (enhanced with lime addition)</p>
                </div>
              </div>
            </div>

            {/* Apple Cider Vinegar */}
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="flex justify-between">
                <h3 className="text-xl font-bold text-green-700">Apple Cider Vinegar</h3>
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">1 tsp daily</span>
              </div>
              <p className="mt-2 text-gray-700">Diluted 1:10 ratio</p>
              <div className="mt-3">
                <div className="bg-white p-2 rounded-md">
                  <p className="text-sm text-gray-600"><strong>Action:</strong> Acetic acid provides direct acidification</p>
                </div>
                <div className="bg-white p-2 rounded-md mt-2">
                  <p className="text-sm text-gray-600"><strong>Effect:</strong> Additional 0.1-0.3 pH reduction</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Foods to Avoid Section */}
        <div className="mb-8">
          <div className="bg-red-100 rounded-t-lg p-4 flex items-center">
            <XCircle className="text-red-600 mr-2" size={24} />
            <h2 className="text-2xl font-bold text-red-800">Foods to Minimize/Avoid</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Alkaline-forming Vegetables */}
            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
              <h3 className="text-xl font-bold text-red-700">Alkaline-forming Vegetables</h3>
              <p className="mt-2 text-gray-700">Sweet potatoes, most fruits</p>
              <div className="mt-3">
                <div className="bg-white p-2 rounded-md">
                  <p className="text-sm text-gray-600"><strong>Reason:</strong> Counteract acidification efforts; raise urine pH</p>
                </div>
                <div className="bg-white p-2 rounded-md mt-2">
                  <p className="text-sm text-gray-600"><strong>Alternative:</strong> Neutral vegetables (green beans, broccoli)</p>
                </div>
              </div>
            </div>

            {/* High-Calcium Foods */}
            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
              <h3 className="text-xl font-bold text-red-700">High-Calcium Foods</h3>
              <p className="mt-2 text-gray-700">Without proper balance</p>
              <div className="mt-3">
                <div className="bg-white p-2 rounded-md">
                  <p className="text-sm text-gray-600"><strong>Reason:</strong> Risk of calcium oxalate stones if pH drops below 6.0</p>
                </div>
                <div className="bg-white p-2 rounded-md mt-2">
                  <p className="text-sm text-gray-600"><strong>Alternative:</strong> Balance with oxalate-binding calcium sources if needed</p>
                </div>
              </div>
            </div>

            {/* Highly Processed Foods */}
            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
              <h3 className="text-xl font-bold text-red-700">Highly Processed Foods</h3>
              <p className="mt-2 text-gray-700">Commercial dog treats and snacks</p>
              <div className="mt-3">
                <div className="bg-white p-2 rounded-md">
                  <p className="text-sm text-gray-600"><strong>Reason:</strong> May contain hidden sodium and phosphates</p>
                </div>
                <div className="bg-white p-2 rounded-md mt-2">
                  <p className="text-sm text-gray-600"><strong>Alternative:</strong> Whole food ingredients with known composition</p>
                </div>
              </div>
            </div>

            {/* High Oxalate Foods */}
            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
              <h3 className="text-xl font-bold text-red-700">High Oxalate Foods</h3>
              <p className="mt-2 text-gray-700">Without calcium balance</p>
              <div className="mt-3">
                <div className="bg-white p-2 rounded-md">
                  <p className="text-sm text-gray-600"><strong>Reason:</strong> Risk of calcium oxalate crystals when acidifying urine</p>
                </div>
                <div className="bg-white p-2 rounded-md mt-2">
                  <p className="text-sm text-gray-600"><strong>Alternative:</strong> Pair with calcium-rich foods (3:1 Ca:oxalate ratio ideal)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Monitoring Section */}
        <div className="mb-8">
          <div className="bg-blue-100 rounded-t-lg p-4 flex items-center">
            <AlertTriangle className="text-blue-600 mr-2" size={24} />
            <h2 className="text-2xl font-bold text-blue-800">Monitoring Protocol</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {/* Urine pH */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h3 className="text-xl font-bold text-blue-700">Urine pH</h3>
              <div className="flex items-center mt-2">
                <Clock className="text-blue-600 mr-2" size={16} />
                <p className="text-gray-700">Every 12 hours</p>
              </div>
              <div className="mt-3">
                <div className="bg-white p-2 rounded-md">
                  <p className="text-sm text-gray-600"><strong>Target:</strong> ≤6.5 by day 7</p>
                </div>
                <div className="bg-white p-2 rounded-md mt-2">
                  <p className="text-sm text-gray-600"><strong>Action:</strong> Adjust acidifying foods as needed</p>
                </div>
              </div>
            </div>

            {/* Hydration Status */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h3 className="text-xl font-bold text-blue-700">Hydration Status</h3>
              <div className="flex items-center mt-2">
                <Clock className="text-blue-600 mr-2" size={16} />
                <p className="text-gray-700">Daily</p>
              </div>
              <div className="mt-3">
                <div className="bg-white p-2 rounded-md">
                  <p className="text-sm text-gray-600"><strong>Target:</strong> Skin turgor &lt;2 seconds</p>
                </div>
                <div className="bg-white p-2 rounded-md mt-2">
                  <p className="text-sm text-gray-600"><strong>Action:</strong> Increase water addition to meals</p>
                </div>
              </div>
            </div>

            {/* Appetite/Digestion */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h3 className="text-xl font-bold text-blue-700">Appetite/Digestion</h3>
              <div className="flex items-center mt-2">
                <Clock className="text-blue-600 mr-2" size={16} />
                <p className="text-gray-700">Daily</p>
              </div>
              <div className="mt-3">
                <div className="bg-white p-2 rounded-md">
                  <p className="text-sm text-gray-600"><strong>Target:</strong> Normal appetite and stool</p>
                </div>
                <div className="bg-white p-2 rounded-md mt-2">
                  <p className="text-sm text-gray-600"><strong>Action:</strong> Reduce ACV if GI upset occurs</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Expected Outcome Section */}
        <div className="mt-8">
          <div className="bg-purple-100 rounded-t-lg p-4">
            <h2 className="text-2xl font-bold text-purple-800">Expected Outcome at End of Phase 1</h2>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-b-lg border border-purple-200">
            <ul className="list-disc pl-5 space-y-2">
              <li className="text-gray-700">Urine pH decreased by 0.8-1.0 units from baseline</li>
              <li className="text-gray-700">Reduced bacterial load by inhibition of adhesion</li>
              <li className="text-gray-700">Initiated dissolution of any struvite crystals</li>
              <li className="text-gray-700">Ready for Phase 2 (addition of D-mannose and balanced legume adjustment)</li>
            </ul>
          </div>
        </div>

        {/* Visual Meal Composition */}
        <div className="mt-8">
          <div className="bg-yellow-100 rounded-t-lg p-4">
            <h2 className="text-2xl font-bold text-yellow-800">Visual Meal Composition</h2>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-b-lg border border-yellow-200">
            {/* Pie chart style meal composition */}
            <div className="flex flex-col md:flex-row">
              {/* Left side: Pie chart */}
              <div className="w-full md:w-1/2 flex justify-center items-center">
                <div className="relative w-64 h-64">
                  {/* Base circle */}
                  <div className="absolute inset-0 rounded-full border-4 border-gray-300 bg-white"></div>
                  
                  {/* Pie segments */}
                  <svg viewBox="0 0 100 100" className="absolute inset-0">
                    {/* Base food - 60% */}
                    <path d="M 50 50 L 50 0 A 50 50 0 0 1 93.3 75 Z" fill="#BBF7D0" stroke="#000" strokeWidth="0.5" />
                    
                    {/* Lentils - 30% */}
                    <path d="M 50 50 L 93.3 75 A 50 50 0 0 1 50 100 Z" fill="#92400E" stroke="#000" strokeWidth="0.5" />
                    
                    {/* Soy protein - 10% */}
                    <path d="M 50 50 L 50 100 A 50 50 0 0 1 18.5 89.5 Z" fill="#FDE68A" stroke="#000" strokeWidth="0.5" />
                    
                    {/* Labels */}
                    <text x="65" y="40" fontSize="6" fontWeight="bold" fill="#166534">Base Food (60%)</text>
                    <text x="65" y="75" fontSize="6" fontWeight="bold" fill="#FFF">Lentils (30%)</text>
                    <text x="30" y="85" fontSize="6" fontWeight="bold" fill="#92400E">Soy (10%)</text>
                  </svg>
                  
                  {/* Center circle for add-ins */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white rounded-full w-24 h-24 border-2 border-gray-300 flex flex-col items-center justify-center p-1">
                      <span className="text-xs font-bold text-gray-800">Add-ins:</span>
                      <div className="grid grid-cols-2 gap-1 mt-1">
                        <div className="bg-red-500 rounded-full w-8 h-8 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">Cran</span>
                        </div>
                        <div className="bg-red-400 rounded-full w-8 h-8 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">Pepper</span>
                        </div>
                        <div className="bg-blue-300 rounded-full w-8 h-8 flex items-center justify-center">
                          <span className="text-blue-800 text-xs font-bold">H₂O</span>
                        </div>
                        <div className="bg-green-400 rounded-full w-8 h-8 flex items-center justify-center">
                          <span className="text-green-800 text-xs font-bold">Lime</span>
                        </div>
                      </div>
                      <div className="mt-1">
                        <div className="bg-amber-400 rounded-full w-8 h-8 flex items-center justify-center mx-auto">
                          <span className="text-amber-800 text-xs font-bold">ACV</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right side: Measurements */}
              <div className="w-full md:w-1/2 mt-4 md:mt-0">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Exact Measurements (Per Meal)</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-gray-700">Base Food:</span>
                      <span className="font-bold">60% of meal</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-700">Cooked Lentils:</span>
                      <span className="font-bold">150g (30%)</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-700">Methionine-Soy:</span>
                      <span className="font-bold">50g (10%)</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-700">Red Bell Pepper:</span>
                      <span className="font-bold">50g</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-700">Fresh Lime:</span>
                      <span className="font-bold">1/4 lime (juice)</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-700">Added Water:</span>
                      <span className="font-bold">100ml</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-700">Apple Cider Vinegar:</span>
                      <span className="font-bold">1 tsp (diluted 1:10)</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-700">Cranberries:</span>
                      <span className="font-bold">20g with meal</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-100 p-3 rounded-lg mt-4">
              <p className="text-gray-800 font-medium">
                <span className="font-bold">Schedule Note:</span> Since Bean only receives one meal (at 5pm), give cranberries twice daily: 20g with the meal and 20g in the morning (around 9-10am). Apple cider vinegar should be given with the meal.
              </p>
            </div>
          </div>
        </div>

        {/* Note Section */}
        <div className="mt-6 bg-gray-100 rounded-lg p-4">
          <p className="text-sm text-gray-600">
            <strong>Note:</strong> This protocol provides approximately 1g total methionine daily from combined sources, meeting the estimated requirement for a 20kg dog for urinary acidification without exceeding safety thresholds. Expected cumulative pH reduction by end of Phase 1: 0.8-1.2 units, with target pH of 6.0-6.5.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BeanDietPlan;