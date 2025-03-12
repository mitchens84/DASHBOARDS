import React, { useState, useEffect } from 'react';

const ThaiImportCalculator = () => {
  // State for user inputs
  const [productType, setProductType] = useState('supplements');
  const [productCost, setProductCost] = useState(100);
  const [shippingCost, setShippingCost] = useState(20);
  const [insuranceCost, setInsuranceCost] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [splitShipments, setSplitShipments] = useState(false);
  
  // State for calculation results
  const [dutyRate, setDutyRate] = useState(7.1);
  const [cifValue, setCifValue] = useState(0);
  const [dutyAmount, setDutyAmount] = useState(0);
  const [vatAmount, setVatAmount] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [totalWithoutTax, setTotalWithoutTax] = useState(0);
  const [taxPercentage, setTaxPercentage] = useState(0);
  const [splitShipmentCost, setSplitShipmentCost] = useState(0);
  
  // Duty rates by product type
  const dutyRates = {
    supplements: 7.1,
    personalCare: 20,
    clothing: 15,
    electronics: 10,
    cosmetics: 30,
    books: 0,
    foodItems: 30,
  };
  
  // Product type descriptions and HS codes
  const productInfo = {
    supplements: {
      description: "Dietary supplements, vitamins, protein powders",
      hsCode: "HS 2106.90",
      restrictions: "Requires Thai FDA approval and Thai-language labeling"
    },
    personalCare: {
      description: "Soaps, shampoos, toothpaste, deodorants",
      hsCode: "HS 3304-3307",
      restrictions: "May require FDA certification for some items"
    },
    clothing: {
      description: "Apparel, footwear, accessories",
      hsCode: "HS 61-64",
      restrictions: "Varies by material type"
    },
    electronics: {
      description: "Gadgets, devices, computer parts",
      hsCode: "HS 8471-8473",
      restrictions: "May require import permits for certain electronics"
    },
    cosmetics: {
      description: "Makeup, skincare, fragrances",
      hsCode: "HS 3303-3304",
      restrictions: "Requires Thai FDA approval"
    },
    books: {
      description: "Printed books, educational materials",
      hsCode: "HS 4901",
      restrictions: "Generally unrestricted, subject to content review"
    },
    foodItems: {
      description: "Packaged foods, specialty items",
      hsCode: "HS 1601-2106",
      restrictions: "Requires Thai FDA approval and Thai-language labeling"
    }
  };

  // Threshold for duty exemption in THB and USD
  const dutyFreeThreshold = {
    thb: 1500,
    usd: 44
  };
  
  // Calculate results whenever inputs change
  useEffect(() => {
    // Set duty rate based on product type
    setDutyRate(dutyRates[productType]);
    
    // Calculate CIF value (Cost + Insurance + Freight)
    const totalProductCost = productCost * quantity;
    const cif = totalProductCost + shippingCost + insuranceCost;
    setCifValue(cif);
    
    // Determine if shipment qualifies for duty exemption
    const isDutyFree = cif <= dutyFreeThreshold.usd;
    
    // Calculate duty amount
    const duty = isDutyFree ? 0 : cif * (dutyRate / 100);
    setDutyAmount(duty);
    
    // Calculate VAT (7% of CIF + Duty)
    const vat = (cif + duty) * 0.07;
    setVatAmount(vat);
    
    // Calculate total cost
    const total = cif + duty + vat;
    setTotalCost(total);
    
    // Calculate cost without import taxes
    setTotalWithoutTax(totalProductCost + shippingCost + insuranceCost);
    
    // Calculate tax percentage of total
    setTaxPercentage(((duty + vat) / cif) * 100);

    // Calculate split shipment strategy if selected
    if (splitShipments) {
      // Determine optimal number of shipments (keeping each under duty-free threshold)
      const optimalShipments = Math.ceil(totalProductCost / dutyFreeThreshold.usd);
      const shippingPerPackage = shippingCost;
      const totalShippingCost = shippingPerPackage * optimalShipments;
      
      // Calculate costs for split shipments (only 7% VAT applied)
      const splitVat = (totalProductCost + totalShippingCost) * 0.07;
      const splitTotal = totalProductCost + totalShippingCost + splitVat;
      
      setSplitShipmentCost(splitTotal);
    }
  }, [productType, productCost, shippingCost, insuranceCost, quantity, splitShipments]);

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Thailand Import Fee Calculator</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Product Information</h2>
          
          <div className="mb-4">
            <label className="block mb-2 font-medium">Product Type</label>
            <select 
              value={productType} 
              onChange={(e) => setProductType(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="supplements">Supplements & Health Products</option>
              <option value="personalCare">Personal Care Items</option>
              <option value="clothing">Clothing</option>
              <option value="electronics">Electronics</option>
              <option value="cosmetics">Cosmetics</option>
              <option value="books">Books</option>
              <option value="foodItems">Food Items</option>
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium">Product Cost (USD)</label>
              <input 
                type="number" 
                min="0"
                value={productCost} 
                onChange={(e) => setProductCost(Number(e.target.value))}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block mb-2 font-medium">Quantity</label>
              <input 
                type="number" 
                min="1"
                value={quantity} 
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block mb-2 font-medium">Shipping Cost (USD)</label>
              <input 
                type="number" 
                min="0"
                value={shippingCost} 
                onChange={(e) => setShippingCost(Number(e.target.value))}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block mb-2 font-medium">Insurance Cost (USD)</label>
              <input 
                type="number" 
                min="0"
                value={insuranceCost} 
                onChange={(e) => setInsuranceCost(Number(e.target.value))}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="mt-4">
            <label className="flex items-center">
              <input 
                type="checkbox" 
                checked={splitShipments} 
                onChange={(e) => setSplitShipments(e.target.checked)}
                className="mr-2"
              />
              <span>Calculate split shipment strategy</span>
            </label>
          </div>
          
          <div className="mt-6 bg-blue-50 p-3 rounded">
            <h3 className="font-semibold mb-2">Product Category Info:</h3>
            <p className="text-sm"><strong>Description:</strong> {productInfo[productType].description}</p>
            <p className="text-sm"><strong>HS Code:</strong> {productInfo[productType].hsCode}</p>
            <p className="text-sm"><strong>Restrictions:</strong> {productInfo[productType].restrictions}</p>
          </div>
        </div>
        
        {/* Results Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Import Cost Calculation</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between py-1 border-b">
              <span>Product Cost:</span>
              <span>${(productCost * quantity).toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between py-1 border-b">
              <span>Shipping & Insurance:</span>
              <span>${(shippingCost + insuranceCost).toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between py-1 border-b">
              <span>CIF Value:</span>
              <span>${cifValue.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between py-1 border-b">
              <span>Duty Rate:</span>
              <span>{dutyRate}%</span>
            </div>
            
            <div className="flex justify-between py-1 border-b">
              <span>Duty Amount:</span>
              <span>${dutyAmount.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between py-1 border-b">
              <span>VAT (7%):</span>
              <span>${vatAmount.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between py-1 border-b font-bold">
              <span>Total Import Cost:</span>
              <span>${totalCost.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between py-1 border-b text-red-600">
              <span>Import Taxes:</span>
              <span>${(dutyAmount + vatAmount).toFixed(2)} ({taxPercentage.toFixed(1)}%)</span>
            </div>
            
            {splitShipments && (
              <div className="mt-4 p-3 bg-green-50 rounded">
                <h3 className="font-semibold mb-2">Split Shipment Strategy:</h3>
                <div className="flex justify-between py-1 border-b">
                  <span>Optimal Cost with Split Shipments:</span>
                  <span>${splitShipmentCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1 border-b text-green-600 font-bold">
                  <span>Potential Savings:</span>
                  <span>${(totalCost - splitShipmentCost).toFixed(2)}</span>
                </div>
                <p className="text-sm mt-2">
                  By splitting your order into smaller packages (under 1,500 THB or ~$44 each), 
                  you can avoid customs duty while only paying the 7% VAT.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Optimization Tips Section */}
      <div className="mt-8 bg-gray-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Import Cost Optimization Tips</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded shadow">
            <h3 className="font-semibold text-lg mb-2">Duty-Free Threshold</h3>
            <p>Shipments valued at 1,500 THB (~$44) or less are exempt from import duties, but still subject to 7% VAT.</p>
            <p className="mt-2 text-sm italic">Tip: Consider splitting large orders into multiple shipments under this threshold.</p>
          </div>
          
          <div className="bg-white p-3 rounded shadow">
            <h3 className="font-semibold text-lg mb-2">Product Classification</h3>
            <p>Verify the exact HS code for your product. Incorrect classification can result in higher duty rates.</p>
            <p className="mt-2 text-sm italic">Tip: Use the Thai Customs Department's HS code lookup to confirm the correct classification.</p>
          </div>
          
          <div className="bg-white p-3 rounded shadow">
            <h3 className="font-semibold text-lg mb-2">Regulatory Requirements</h3>
            <p>Health products, supplements, and cosmetics require Thai FDA approval before importation.</p>
            <p className="mt-2 text-sm italic">Tip: Check if your product requires special permits or certifications before purchasing.</p>
          </div>
          
          <div className="bg-white p-3 rounded shadow">
            <h3 className="font-semibold text-lg mb-2">Documentation</h3>
            <p>Proper documentation can prevent delays and additional inspection fees at customs.</p>
            <p className="mt-2 text-sm italic">Tip: Ensure you have Commercial Invoice, Packing List, and any required certificates.</p>
          </div>
        </div>
      </div>
      
      {/* Key Documents Section */}
      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-3">Required Documentation Checklist</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Commercial Invoice (3 copies)</li>
          <li>Packing List</li>
          <li>Bill of Lading/Air Waybill</li>
          <li>FDA permits (for health products, supplements, cosmetics)</li>
          <li>Certificate of Origin (for duty reductions under trade agreements)</li>
        </ul>
      </div>
      
      <div className="mt-6 text-sm text-gray-500 text-center">
        <p>This calculator is for informational purposes only. Actual import costs may vary based on current regulations and customs assessment.</p>
        <p>Data sources: Thai Customs Department, DHL Thailand, Frank Legal & Tax</p>
      </div>
    </div>
  );
};

export default ThaiImportCalculator;
