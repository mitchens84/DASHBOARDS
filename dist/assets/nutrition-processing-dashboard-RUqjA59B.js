import{r as j,j as e,e as r,B as l,C as d,X as o,Y as c,g as m,h,l as n}from"./vendor-CSR8WNta.js";const v=()=>{const t=[{method_name:"pressure_cooking",food_category:"legumes",effectiveness_percentage:90,time_required_minutes:30,difficulty_level:"medium",antinutrient_reduction:90,nutrient_impact:"minimal",digestibility_change:45},{method_name:"soaking",food_category:"legumes",effectiveness_percentage:30,time_required_minutes:720,difficulty_level:"low",antinutrient_reduction:25,nutrient_impact:"none",digestibility_change:10},{method_name:"fermentation",food_category:"legumes",effectiveness_percentage:80,time_required_minutes:2160,difficulty_level:"high",antinutrient_reduction:75,nutrient_impact:"improved",digestibility_change:50},{method_name:"steaming",food_category:"leafy_greens",effectiveness_percentage:70,time_required_minutes:7,difficulty_level:"low",antinutrient_reduction:45,nutrient_impact:"minimal",digestibility_change:28},{method_name:"boiling",food_category:"leafy_greens",effectiveness_percentage:75,time_required_minutes:8,difficulty_level:"low",antinutrient_reduction:75,nutrient_impact:"moderate",digestibility_change:23}],_=[{food_category:"legumes",antinutrient_type:"lectins",risk_level:"high",heat_stability:"moderate",best_processing_method:"pressure_cooking",max_reduction_possible:95},{food_category:"legumes",antinutrient_type:"phytates",risk_level:"moderate",heat_stability:"high",best_processing_method:"fermentation",max_reduction_possible:90},{food_category:"leafy_greens",antinutrient_type:"oxalates",risk_level:"high",heat_stability:"moderate",best_processing_method:"boiling",max_reduction_possible:80},{food_category:"leafy_greens",antinutrient_type:"goitrogens",risk_level:"moderate",heat_stability:"low",best_processing_method:"steaming",max_reduction_possible:70}],[a,g]=j.useState("all"),u=["all",...new Set(t.map(s=>s.food_category))],x=a==="all"?t:t.filter(s=>s.food_category===a),f=t.map(s=>({name:s.method_name,time:s.time_required_minutes,effectiveness:s.effectiveness_percentage,category:s.food_category})),p=_.reduce((s,i)=>(s[i.risk_level]=(s[i.risk_level]||0)+1,s),{});return e.jsxs("div",{className:"w-full p-6 bg-white rounded-lg shadow",children:[e.jsx("h1",{className:"text-2xl font-bold mb-6",children:"Plant Processing & Antinutrient Analysis Dashboard"}),e.jsxs("div",{className:"mb-6",children:[e.jsx("label",{className:"mr-2 font-medium",children:"Filter by Food Category:"}),e.jsx("select",{value:a,onChange:s=>g(s.target.value),className:"p-2 border rounded",children:u.map(s=>e.jsx("option",{value:s,children:s.replace("_"," ").charAt(0).toUpperCase()+s.slice(1)},s))})]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"bg-gray-50 p-4 rounded-lg",children:[e.jsx("h2",{className:"text-lg font-semibold mb-4",children:"Processing Methods Effectiveness"}),e.jsx(r,{width:"100%",height:300,children:e.jsxs(l,{data:x,children:[e.jsx(d,{strokeDasharray:"3 3"}),e.jsx(o,{dataKey:"method_name",angle:-45,textAnchor:"end",height:80}),e.jsx(c,{label:{value:"Effectiveness (%)",angle:-90,position:"insideLeft"}}),e.jsx(m,{}),e.jsx(h,{}),e.jsx(n,{dataKey:"effectiveness_percentage",fill:"#8884d8",name:"Effectiveness"}),e.jsx(n,{dataKey:"antinutrient_reduction",fill:"#82ca9d",name:"Antinutrient Reduction"})]})})]}),e.jsxs("div",{className:"bg-gray-50 p-4 rounded-lg",children:[e.jsx("h2",{className:"text-lg font-semibold mb-4",children:"Time vs Effectiveness"}),e.jsx(r,{width:"100%",height:300,children:e.jsxs(l,{data:f,children:[e.jsx(d,{strokeDasharray:"3 3"}),e.jsx(o,{dataKey:"name",angle:-45,textAnchor:"end",height:80}),e.jsx(c,{label:{value:"Time (min) / Effectiveness (%)",angle:-90,position:"insideLeft"}}),e.jsx(m,{}),e.jsx(h,{}),e.jsx(n,{dataKey:"time",fill:"#8884d8",name:"Time (min)"}),e.jsx(n,{dataKey:"effectiveness",fill:"#82ca9d",name:"Effectiveness (%)"})]})})]}),e.jsxs("div",{className:"bg-gray-50 p-4 rounded-lg",children:[e.jsx("h2",{className:"text-lg font-semibold mb-4",children:"Antinutrient Risk Level Distribution"}),e.jsx(r,{width:"100%",height:300,children:e.jsxs(l,{data:Object.entries(p).map(([s,i])=>({level:s,count:i})),children:[e.jsx(d,{strokeDasharray:"3 3"}),e.jsx(o,{dataKey:"level"}),e.jsx(c,{}),e.jsx(m,{}),e.jsx(h,{}),e.jsx(n,{dataKey:"count",fill:"#ff7f0e",name:"Number of Antinutrients"})]})})]}),e.jsxs("div",{className:"bg-gray-50 p-4 rounded-lg",children:[e.jsx("h2",{className:"text-lg font-semibold mb-4",children:"Processing Recommendations"}),e.jsx("div",{className:"space-y-4",children:_.map((s,i)=>e.jsxs("div",{className:"p-3 bg-white rounded shadow",children:[e.jsxs("h3",{className:"font-medium",children:[s.food_category.replace("_"," ").toUpperCase(),": ",s.antinutrient_type]}),e.jsxs("p",{className:"text-sm",children:["Risk Level: ",e.jsx("span",{className:`font-medium ${s.risk_level==="high"?"text-red-600":s.risk_level==="moderate"?"text-yellow-600":"text-green-600"}`,children:s.risk_level})]}),e.jsxs("p",{className:"text-sm",children:["Best Method: ",s.best_processing_method.replace("_"," ")]}),e.jsxs("p",{className:"text-sm",children:["Max Reduction: ",s.max_reduction_possible,"%"]})]},i))})]})]}),e.jsxs("div",{className:"mt-6 bg-gray-50 p-4 rounded-lg",children:[e.jsx("h2",{className:"text-lg font-semibold mb-4",children:"Quick Processing Guide"}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[e.jsxs("div",{className:"p-3 bg-white rounded shadow",children:[e.jsx("h3",{className:"font-medium text-green-600",children:"Quick Methods (≤15 min)"}),e.jsx("ul",{className:"list-disc list-inside text-sm",children:t.filter(s=>s.time_required_minutes<=15).map(s=>e.jsxs("li",{children:[s.method_name.replace("_"," "),": ",s.time_required_minutes," min"]},s.method_name))})]}),e.jsxs("div",{className:"p-3 bg-white rounded shadow",children:[e.jsx("h3",{className:"font-medium text-yellow-600",children:"Standard Methods (15-60 min)"}),e.jsx("ul",{className:"list-disc list-inside text-sm",children:t.filter(s=>s.time_required_minutes>15&&s.time_required_minutes<=60).map(s=>e.jsxs("li",{children:[s.method_name.replace("_"," "),": ",s.time_required_minutes," min"]},s.method_name))})]}),e.jsxs("div",{className:"p-3 bg-white rounded shadow",children:[e.jsx("h3",{className:"font-medium text-red-600",children:"Long Methods (60 min)"}),e.jsx("ul",{className:"list-disc list-inside text-sm",children:t.filter(s=>s.time_required_minutes>60).map(s=>e.jsxs("li",{children:[s.method_name.replace("_"," "),": ",Math.round(s.time_required_minutes/60)," hrs"]},s.method_name))})]})]})]})]})};export{v as default};
