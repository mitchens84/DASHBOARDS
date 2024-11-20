import{j as e}from"./vendor-Esh1b0AM.js";const p=()=>{const r=[{name:"Snake Plant (Sansevieria trifasciata)",co2Capacity:"High",properties:["Night oxygen production","Low maintenance","Drought resistant","Effective in bedrooms"],environment:"Low to bright indirect light, 18-27°C"},{name:"Peace Lily (Spathiphyllum)",co2Capacity:"Medium-High",properties:["Excellent air purifier","Humidity increaser","Moderate maintenance","Toxic to pets"],environment:"Low to medium light, 18-30°C"},{name:"Spider Plant (Chlorophytum comosum)",co2Capacity:"Medium",properties:["Fast growing","Safe for pets","Easy propagation","Multiple varieties"],environment:"Bright indirect light, 18-32°C"},{name:"Dracaena varieties",co2Capacity:"Medium-High",properties:["Multiple species options","Vertical growth","Long-lasting","Toxic to pets"],environment:"Low to bright indirect light, 18-25°C"},{name:"Bamboo Palm (Chamaedorea seifrizii)",co2Capacity:"High",properties:["Natural humidifier","Pet safe","Large coverage area","Tropical feel"],environment:"Medium to bright indirect light, 18-25°C"}],a=t=>{switch(t){case"High":return"#15803d";case"Medium-High":return"#16a34a";case"Medium":return"#22c55e";default:return"#4ade80"}},i={container:{maxWidth:"1200px",margin:"20px auto",padding:"20px",fontFamily:"system-ui, -apple-system, sans-serif"},plantGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))",gap:"20px",marginBottom:"20px"},card:{border:"1px solid #e5e7eb",borderRadius:"8px",padding:"16px",backgroundColor:"white",boxShadow:"0 1px 3px rgba(0,0,0,0.1)"},title:{fontSize:"24px",marginBottom:"20px",color:"#111827"},plantName:{fontSize:"18px",fontWeight:"600",marginBottom:"12px",color:"#111827"},capacityBadge:{fontSize:"14px",marginLeft:"8px",fontWeight:"500"},propertyList:{listStyle:"disc",paddingLeft:"20px",margin:"12px 0"},propertyItem:{marginBottom:"6px",color:"#374151"},environment:{marginTop:"12px",color:"#374151"},findings:{listStyle:"none",padding:"0",margin:"0"},findingItem:{marginBottom:"8px",paddingLeft:"16px",position:"relative",color:"#374151"}};return e.jsxs("div",{style:i.container,children:[e.jsxs("div",{style:i.card,children:[e.jsx("h1",{style:i.title,children:"🌿 Top Indoor Plants for CO2 Processing"}),e.jsx("div",{style:i.plantGrid,children:r.map((t,n)=>e.jsxs("div",{style:i.card,children:[e.jsxs("h2",{style:i.plantName,children:[t.name,e.jsxs("span",{style:{...i.capacityBadge,color:a(t.co2Capacity)},children:["(",t.co2Capacity," CO2 Processing)"]})]}),e.jsxs("div",{children:[e.jsx("strong",{children:"Key Properties:"}),e.jsx("ul",{style:i.propertyList,children:t.properties.map((o,s)=>e.jsx("li",{style:i.propertyItem,children:o},s))}),e.jsxs("div",{style:i.environment,children:[e.jsx("strong",{children:"Ideal Environment: "}),t.environment]})]})]},n))})]}),e.jsxs("div",{style:i.card,children:[e.jsx("h2",{style:i.title,children:"Key Findings on Indoor Plants and CO2"}),e.jsx("ul",{style:i.findings,children:["Plants primarily process CO2 during daylight hours through photosynthesis","Most plants release CO2 at night, except for some like Snake Plants and Orchids","A typical indoor plant processes around 0.9-3.6 kg of CO2 annually","Multiple plants are needed for meaningful CO2 reduction in a room","Plant effectiveness depends on light levels, temperature, and health"].map((t,n)=>e.jsxs("li",{style:i.findingItem,children:["• ",t]},n))})]})]})};export{p as default};
