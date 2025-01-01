import{r as j,j as e,e as n,x as b,y as R,z as g,g as c,h,B as N,C,X as f,Y as w,l as x}from"./vendor-CSR8WNta.js";import{T as B,a as H,b as m,c as v}from"./tabs-rus-rqER.js";import"./utils-sUf4FVbu.js";const A=()=>{j.useState("overview");const r={"2L":"#FFD700","4H":"#32CD32","6I":"#FF8C00","5R":"#FF4500","9E":"#7FFFD4","8C":"#87CEEB","7A":"#4169E1","0A":"#C0C0C0","3P":"#8B4513"},l={totalBooks:102,readBooks:28,toReadBooks:74,avgRating:4.1,categoriesCount:9,authorsCount:98,avgPages:312,ratedBooks:25},p=[{category:"Content Stats",items:[{label:"Average Pages",value:"312"},{label:"Longest Book",value:"790 pages (Behave)"},{label:"Shortest Book",value:"83 pages (Lying)"}]},{category:"Reading Stats",items:[{label:"Completion Rate",value:"27.5%"},{label:"Rated Books",value:"25"},{label:"Average Rating",value:"4.1/5"}]},{category:"Category Stats",items:[{label:"Most Common Category",value:"6I (Intellect)"},{label:"Categories Coverage",value:"9 categories"},{label:"Multi-category Books",value:"34%"}]}],o=[{name:"Read",value:28,color:"#4ADE80",details:"Completed books with average rating 4.1/5"},{name:"To Read",value:74,color:"#93C5FD",details:"Books in reading queue, prioritized by LBS framework"}],d=[{category:"Life Philosophy (2L)",read:5,toRead:12,avgRating:4.2,priority:"Very High",color:r["2L"]},{category:"Health (4H)",read:6,toRead:14,avgRating:4,priority:"High",color:r["4H"]},{category:"Intellect (6I)",read:4,toRead:18,avgRating:4.1,priority:"High",color:r["6I"]},{category:"Relationships (5R)",read:3,toRead:8,avgRating:4.3,priority:"High",color:r["5R"]},{category:"Experience (9E)",read:2,toRead:6,avgRating:4,priority:"Medium",color:r["9E"]}],u=[{title:"Deep Utopia",author:"Nick Bostrom",category:"6I",priority:"Very High",avgRating:3.9,pages:536,rationale:"Core text for AI understanding and future implications"},{title:"Outlive",author:"Peter Attia",category:"4H",priority:"Very High",avgRating:4.37,pages:496,rationale:"Comprehensive health and longevity framework"},{title:"The Body Keeps the Score",author:"Bessel van der Kolk",category:"2L",priority:"High",avgRating:4.39,pages:464,rationale:"Foundational text on trauma and healing"},{title:"Why Buddhism Is True",author:"Robert Wright",category:"2L",priority:"High",avgRating:4.02,pages:336,rationale:"Bridges scientific and contemplative approaches"},{title:"How Emotions Are Made",author:"Lisa Feldman Barrett",category:"4H",priority:"High",avgRating:4.11,pages:425,rationale:"Key text for understanding emotional intelligence"}],y=({active:a,payload:t,label:s})=>{if(a&&t&&t.length){const i=t[0].payload;return e.jsxs("div",{className:"bg-white p-4 shadow-lg rounded-lg border",children:[e.jsx("h3",{className:"font-bold",children:s}),e.jsxs("p",{children:["Read: ",i.read]}),e.jsxs("p",{children:["To Read: ",i.toRead]}),e.jsxs("p",{children:["Average Rating: ",i.avgRating,"/5"]}),e.jsxs("p",{children:["Priority: ",i.priority]})]})}return null};return e.jsx("div",{className:"w-full p-6 bg-gray-50",children:e.jsxs(B,{defaultValue:"overview",className:"w-full",children:[e.jsxs(H,{className:"mb-4",children:[e.jsx(m,{value:"overview",children:"Overview"}),e.jsx(m,{value:"stats",children:"Detailed Stats"})]}),e.jsxs(v,{value:"overview",children:[e.jsx("div",{className:"grid grid-cols-4 gap-4 mb-8",children:[{label:"Total Books",value:l.totalBooks},{label:"Read",value:l.readBooks},{label:"To Read",value:l.toReadBooks},{label:"Avg Rating",value:`${l.avgRating}/5`}].map((a,t)=>e.jsxs("div",{className:"bg-white p-4 rounded-lg shadow",children:[e.jsx("h3",{className:"text-gray-600 text-sm",children:a.label}),e.jsx("p",{className:"text-2xl font-bold text-gray-800",children:a.value})]},t))}),e.jsxs("div",{className:"grid grid-cols-2 gap-6 mb-8",children:[e.jsxs("div",{className:"bg-white p-4 rounded-lg shadow",children:[e.jsx("h2",{className:"text-lg font-semibold mb-4",children:"Reading Status"}),e.jsx("div",{className:"h-64",children:e.jsx(n,{width:"100%",height:"100%",children:e.jsxs(b,{children:[e.jsx(R,{data:o,dataKey:"value",nameKey:"name",cx:"50%",cy:"50%",outerRadius:80,label:({name:a,percent:t})=>`${a} ${(t*100).toFixed(0)}%`,children:o.map((a,t)=>e.jsx(g,{fill:a.color},t))}),e.jsx(c,{content:({active:a,payload:t})=>{if(a&&t&&t[0]){const s=t[0].payload;return e.jsxs("div",{className:"bg-white p-3 shadow-lg rounded-lg border",children:[e.jsx("p",{className:"font-bold",children:s.name}),e.jsx("p",{children:s.details})]})}return null}}),e.jsx(h,{})]})})})]}),e.jsxs("div",{className:"bg-white p-4 rounded-lg shadow",children:[e.jsx("h2",{className:"text-lg font-semibold mb-4",children:"Category Distribution"}),e.jsx("div",{className:"h-64",children:e.jsx(n,{width:"100%",height:"100%",children:e.jsxs(N,{data:d,children:[e.jsx(C,{strokeDasharray:"3 3"}),e.jsx(f,{dataKey:"category",angle:-45,textAnchor:"end",height:60}),e.jsx(w,{}),e.jsx(c,{content:e.jsx(y,{})}),e.jsx(h,{}),e.jsx(x,{dataKey:"read",name:"Read",stackId:"a",children:d.map((a,t)=>e.jsx(g,{fill:a.color},`cell-${t}`))}),e.jsx(x,{dataKey:"toRead",name:"To Read",stackId:"a",fill:"#93C5FD"})]})})})]})]}),e.jsxs("div",{className:"bg-white p-4 rounded-lg shadow",children:[e.jsx("h2",{className:"text-lg font-semibold mb-4",children:"Priority Reading List"}),e.jsx("div",{className:"grid grid-cols-1 gap-4",children:u.map((a,t)=>e.jsx("div",{className:"border-l-4 pl-4 py-3 bg-gray-50 rounded",style:{borderColor:r[a.category]},children:e.jsxs("div",{className:"flex justify-between items-start",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"font-semibold text-gray-800",children:a.title}),e.jsxs("p",{className:"text-sm text-gray-600",children:[a.author," • Category: ",a.category," • Priority: ",a.priority]}),e.jsx("p",{className:"text-sm text-gray-500 mt-1",children:a.rationale})]}),e.jsxs("div",{className:"text-right text-sm text-gray-600",children:[e.jsxs("p",{children:["Rating: ",a.avgRating,"/5"]}),e.jsxs("p",{children:[a.pages," pages"]})]})]})},t))})]})]}),e.jsx(v,{value:"stats",children:e.jsx("div",{className:"grid grid-cols-3 gap-6",children:p.map((a,t)=>e.jsxs("div",{className:"bg-white p-6 rounded-lg shadow",children:[e.jsx("h2",{className:"text-lg font-semibold mb-4",children:a.category}),e.jsx("div",{className:"space-y-4",children:a.items.map((s,i)=>e.jsxs("div",{className:"border-b pb-2",children:[e.jsx("p",{className:"text-sm text-gray-600",children:s.label}),e.jsx("p",{className:"text-lg font-medium",children:s.value})]},i))})]},t))})})]})})};export{A as default};