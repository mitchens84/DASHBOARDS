import{j as e,r as d,I as g,A as j}from"./vendor-CSR8WNta.js";import{C as E,b,c as S,a as v}from"./card-B7Vqs7mO.js";import"./utils-sUf4FVbu.js";const D=({children:t})=>e.jsx("table",{className:"min-w-full border-collapse border border-gray-200",children:t}),r=({children:t})=>e.jsx("thead",{className:"bg-gray-100",children:e.jsx("tr",{children:t})}),M=({children:t})=>e.jsx("tbody",{children:t}),m=({children:t})=>e.jsx("tr",{className:"border-b border-gray-200",children:t}),o=({children:t})=>e.jsx("td",{className:"p-4 border border-gray-200",children:t}),A=()=>{const t={DIET:{title:"Dietary Factors",description:"Nutritional elements that influence ApoB levels"},LIFESTYLE:{title:"Lifestyle Factors",description:"Behavioral and environmental influences"},SUPPLEMENTS:{title:"Supplements & Medications",description:"Therapeutic interventions that affect ApoB"},EXERCISE:{title:"Exercise Factors",description:"Physical activity impacts on ApoB"}},p=[{category:"DIET",factor:"Saturated Fat",impact:"Major increase in ApoB",mechanism:"Increases hepatic cholesterol synthesis and LDL receptor downregulation",optimization:"Limit to <7% of total calories",importance:5,frequency:"Daily monitoring",evidence:"Strong"},{category:"DIET",factor:"Added Sugars",impact:"Significant increase",mechanism:"Increases hepatic lipogenesis and VLDL production",optimization:"Limit to <5% of total calories",importance:5,frequency:"Daily monitoring",evidence:"Strong"},{category:"DIET",factor:"Fiber",impact:"Moderate decrease",mechanism:"Binds bile acids and reduces cholesterol absorption",optimization:"30-40g per day",importance:4,frequency:"Daily intake",evidence:"Strong"},{category:"DIET",factor:"Plant Sterols",impact:"Moderate decrease",mechanism:"Competes with cholesterol absorption",optimization:"2-3g per day",importance:3,frequency:"Daily intake",evidence:"Strong"},{category:"LIFESTYLE",factor:"Sleep Duration",impact:"Moderate impact",mechanism:"Affects metabolic regulation and inflammation",optimization:"7-9 hours per night",importance:4,frequency:"Daily",evidence:"Moderate"},{category:"LIFESTYLE",factor:"Stress Management",impact:"Moderate impact",mechanism:"Affects cortisol and metabolic regulation",optimization:"Regular stress reduction practices",importance:3,frequency:"Daily",evidence:"Moderate"},{category:"SUPPLEMENTS",factor:"Berberine",impact:"Moderate decrease",mechanism:"Increases LDL receptor expression",optimization:"500mg 2-3x daily",importance:3,frequency:"Daily",evidence:"Moderate"},{category:"SUPPLEMENTS",factor:"Fish Oil (EPA/DHA)",impact:"Mild to moderate decrease",mechanism:"Reduces VLDL production",optimization:"2-4g combined EPA/DHA daily",importance:3,frequency:"Daily",evidence:"Moderate"},{category:"SUPPLEMENTS",factor:"Red Yeast Rice",impact:"Moderate decrease",mechanism:"Natural statin-like effects",optimization:"1200-2400mg daily",importance:3,frequency:"Daily",evidence:"Moderate"},{category:"EXERCISE",factor:"Aerobic Exercise",impact:"Moderate decrease",mechanism:"Improves insulin sensitivity and lipid metabolism",optimization:"150+ minutes moderate intensity per week",importance:4,frequency:"3-5 sessions per week",evidence:"Strong"},{category:"EXERCISE",factor:"Resistance Training",impact:"Mild to moderate decrease",mechanism:"Improves metabolic health and body composition",optimization:"2-3 sessions per week, major muscle groups",importance:3,frequency:"2-3x weekly",evidence:"Moderate"}],[s,h]=d.useState("importance"),[n,l]=d.useState("desc"),y=[...p].sort((i,c)=>n==="desc"?c[s]-i[s]:i[s]-c[s]),u=i=>{s===i?l(n==="desc"?"asc":"desc"):(h(i),l("desc"))};return e.jsx("div",{className:"w-full space-y-6",children:e.jsxs(E,{children:[e.jsx(b,{children:e.jsxs(S,{className:"flex items-center gap-2",children:[e.jsx(g,{className:"w-5 h-5"}),"ApoB Optimization Guide"]})}),e.jsx(v,{children:Object.entries(t).map(([i,c])=>e.jsxs("div",{className:"mb-8",children:[e.jsx("h3",{className:"text-lg font-semibold mb-2",children:c.title}),e.jsx("p",{className:"text-sm text-gray-600 mb-4",children:c.description}),e.jsx("div",{className:"rounded-lg border",children:e.jsxs(D,{children:[e.jsx(r,{children:e.jsxs(m,{children:[e.jsx(r,{children:"Factor"}),e.jsx(r,{children:"Impact"}),e.jsx(r,{children:"Optimization"}),e.jsx(r,{onClick:()=>u("importance"),className:"cursor-pointer",children:e.jsxs("div",{className:"flex items-center",children:["Importance",e.jsx(j,{className:"w-4 h-4 ml-1"})]})}),e.jsx(r,{children:"Evidence"})]})}),e.jsx(M,{children:y.filter(a=>a.category===i).map((a,x)=>e.jsxs(m,{children:[e.jsx(o,{children:a.factor}),e.jsx(o,{children:a.impact}),e.jsx(o,{children:a.optimization}),e.jsx(o,{children:e.jsx("div",{className:"flex items-center",children:Array(a.importance).fill(0).map((N,f)=>e.jsx("span",{className:"text-yellow-500",children:"★"},f))})}),e.jsx(o,{children:a.evidence})]},x))})]})})]},i))})]})})};export{A as default};
