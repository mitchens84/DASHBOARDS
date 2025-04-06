import"./auto-storage-D0wBx_2p.js";import{j as e,bF as D,r as d,bG as E,bH as k,bI as g,bJ as w,bK as R}from"./vendor-Camp4PTS.js";import{T as S,M as A,S as N,a as P,D as M,b as T,H as C,c as B,P as H,d as I,R as L,N as O,B as $,e as V,f as G,g as F,h as z,i as _,j as K,I as Q,k as f,F as U,l as W,m as J,n as q,C as Y,o as X,p as Z,E as ee,V as te,q as ae,G as ie,r as oe,A as se,s as ne,t as re,u as le,v as ce,w as de,x as ue,y as he,z as me,J as be,K as pe,L as ge,O as ve,Q as fe,U as ye}from"./content-dP_I9scZ.js";const xe=({children:t,tableOfContents:a})=>e.jsxs("div",{className:"layout-container",children:[e.jsx("main",{className:"main-content",children:t}),a]}),je=({items:t,activeItem:a})=>e.jsxs("nav",{className:"toc-container",style:{backgroundColor:"#f8f9fa",padding:"20px"},children:[e.jsx("h2",{className:"toc-heading",children:"Contents"}),e.jsx("ul",{className:"toc-list",children:t.map(r=>{const u=location.pathname===`/${r.id}`;return e.jsx("li",{className:"toc-item",style:{paddingLeft:`${r.level*1.25}rem`,marginBottom:"8px"},children:e.jsx(D,{to:`/${r.id}`,className:`toc-link ${u?"active":""}`,style:{cursor:"pointer",display:"block"},children:r.title})},r.id)})})]}),h=({filePath:t})=>{const[a,r]=d.useState(""),[u,l]=d.useState(!0),[v,p]=d.useState(null),m=d.useRef(null);return d.useEffect(()=>{(async()=>{try{const s="/DASHBOARDS/",o=t.startsWith("/")?t.substring(1):t,n=s.endsWith("/")?`${s}${o}`:`${s}/${o}`;console.log(`Fetching HTML from: ${n}`);const i=new AbortController,c=setTimeout(()=>i.abort(),1e4),b=await fetch(n,{signal:i.signal});if(clearTimeout(c),!b.ok)throw new Error(`Failed to fetch HTML: ${b.status} ${b.statusText}`);const j=await b.text();r(j),p(null)}catch(s){console.error("Error loading HTML:",s),s instanceof DOMException&&s.name==="AbortError"?p("Request timed out. Please check your network connection and try again."):p(`Failed to load content: ${s instanceof Error?s.message:String(s)}`)}finally{l(!1)}})()},[t]),d.useEffect(()=>!a||!m.current?void 0:(setTimeout(()=>{m.current.querySelectorAll("script").forEach(o=>{var i;const n=document.createElement("script");Array.from(o.attributes).forEach(c=>{n.setAttribute(c.name,c.value)}),o.src?n.src=o.src:n.textContent=o.textContent,(i=o.parentNode)==null||i.replaceChild(n,o)}),typeof window<"u"&&setTimeout(()=>{var n;const o=(n=m.current)==null?void 0:n.querySelectorAll('[data-bs-toggle="tab"], [data-toggle="tab"]');if(o&&o.forEach(i=>{if(window.bootstrap&&window.bootstrap.Tab&&new window.bootstrap.Tab(i),window.$||window.jQuery)try{(window.$||window.jQuery)(i).tab()}catch(c){console.warn("Error initializing tab with jQuery:",c)}}),window.$||window.jQuery){const i=window.$||window.jQuery;try{i('[data-toggle="tooltip"]').tooltip(),i('[data-toggle="popover"]').popover(),i(".collapse").collapse(),i(".dropdown-toggle").dropdown()}catch(c){console.warn("Error initializing Bootstrap components:",c)}}},500)},100),()=>{}),[a]),u?e.jsx("div",{className:"flex items-center justify-center p-8",children:e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"}),e.jsx("p",{className:"mt-4",children:"Loading content..."})]})}):v?e.jsxs("div",{className:"bg-red-50 border border-red-200 text-red-800 rounded-md p-4 my-4",children:[e.jsx("h3",{className:"text-lg font-semibold mb-2",children:"Error Loading Content"}),e.jsx("p",{children:v}),e.jsxs("p",{className:"mt-2 text-sm",children:["Path attempted: ",t]}),e.jsx("p",{className:"mt-2 text-sm",children:"Make sure the HTML file exists in the content directory and has been copied to the build output."})]}):e.jsx("div",{className:"html-content-wrapper w-full",children:e.jsx("div",{ref:m,className:"html-content",dangerouslySetInnerHTML:{__html:a}})})};function De(){const t=E(),a=[{id:"dashboard-overview",title:"DASHBOARDS",level:0},{id:"risk-assessment",title:"0A-PREPAREDNESS",level:0},{id:"bike-maintenance-dashboard",title:"Bike Maintenance Dashboard",level:1},{id:"possessions",title:"3P-POSSESSIONS",level:0},{id:"backpack-dashboard",title:"Backpack Analysis",level:1},{id:"comprehensive-backpack-dashboard",title:"Comprehensive Backpack Dashboard",level:1},{id:"finance",title:"3P-FINANCE",level:0},{id:"thai-import-calculator",title:"Thai Import Calculator",level:1},{id:"skin-biohacking",title:"4H-BIOHACKING-SKIN",level:0},{id:"holistic-protection",title:"Holistic Protection",level:1},{id:"sunscreen-calculator",title:"Sunscreen Calculator",level:1},{id:"sunscreen-boj",title:"BOJ Sunscreen Analysis",level:1},{id:"holistic-protection-dashboard",title:"Holistic Protection Dashboard",level:1},{id:"sunscreen-protection-calculator",title:"Sunscreen Protection Calculator",level:1},{id:"4h-biohacking-skin-sunscreen-boj",title:"4H BIOHACKING SKIN SUNSCREEN BOJ",level:1},{id:"environment",title:"4H-ENVIRONMENT",level:0},{id:"env-dashboard",title:"Environment Dashboard",level:1},{id:"environmental-dashboard",title:"Environmental Analysis",level:1},{id:"plants-co2",title:"Plants CO2 Analysis",level:1},{id:"microplastics-monitoring",title:"Microplastics Monitoring",level:1},{id:"microplastics-monitoring-dashboard",title:"Microplastics Monitoring Dashboard",level:1},{id:"plants-co2-analysis",title:"Plants Co2 Analysis",level:1},{id:"chiang-mai-air-pollution-dashboard",title:"Chiang Mai Air Pollution Dashboard",level:1},{id:"medical",title:"4H-MEDICAL",level:0},{id:"distal-biceps",title:"Distal Biceps Management",level:1},{id:"dengue-risk",title:"Dengue Risk Assessment",level:1},{id:"distal-biceps-tendinopathy-dashboard",title:"Distal Biceps Tendinopathy Dashboard",level:1},{id:"dengue-risk-visualization",title:"Dengue Risk Visualization",level:1},{id:"health-reference",title:"4H-HEALTH",level:0},{id:"apob-reference",title:"ApoB Reference",level:1},{id:"dental-care",title:"Dental Care Strategy",level:1},{id:"emf-safety",title:"EMF Safety",level:1},{id:"genetic-dashboard",title:"Genetic Dashboard",level:1},{id:"neutering-effects",title:"Neutering Effects",level:1},{id:"retinol",title:"Retinol Protocol Guide",level:1},{id:"vollagen",title:"Vollagen Dashboard",level:1},{id:"dental-care-strategy",title:"Dental Care Strategy",level:1},{id:"genetic-dashboard-complete",title:"Genetic Dashboard Complete",level:1},{id:"emf-safety-dashboard",title:"Emf Safety Dashboard",level:1},{id:"retinol-protocol-guide",title:"Retinol Protocol Guide",level:1},{id:"vaccination-timeline-analysis",title:"Vaccination Timeline Analysis",level:1},{id:"vollagen-dashboard",title:"Vollagen Dashboard",level:1},{id:"sulforaphane-protocol",title:"Sulforaphane Protocol",level:1},{id:"thai-massage-benefits-risks-dashboard",title:"Thai Massage Benefits Risks Dashboard",level:1},{id:"nutrition",title:"4H-NUTRITION",level:0},{id:"enhanced-sodium",title:"Sodium Balance Calculator",level:1},{id:"functional-foods",title:"Functional Foods",level:1},{id:"legume-guide",title:"Legume Guide",level:1},{id:"life-smoothie",title:"Life Smoothie",level:1},{id:"nutrition-processing",title:"Nutrition Processing",level:1},{id:"sports-nutrition",title:"Sports Nutrition",level:1},{id:"therapeutic-spice",title:"Therapeutic Spice Blend",level:1},{id:"life-smoothie-visual",title:"Life Smoothie Visual",level:1},{id:"legumes-cooking-guide",title:"Legumes Cooking Guide",level:1},{id:"sports-nutrition-dashboard",title:"Sports Nutrition Dashboard",level:1},{id:"nutrition-processing-dashboard",title:"Nutrition Processing Dashboard",level:1},{id:"enhanced-sodium-calculator-copy",title:"Enhanced Sodium Calculator Copy",level:1},{id:"enhanced-sodium-calculator",title:"Enhanced Sodium Calculator",level:1},{id:"functional-foods-network",title:"Functional Foods Network",level:1},{id:"therapeutic-spice-blend",title:"Therapeutic Spice Blend",level:1},{id:"tvp-dashboard",title:"TVP Dashboard",level:1},{id:"psychology",title:"4H-PSYCHOLOGY",level:0},{id:"psychometric-dashboard",title:"Psychometric Dashboard",level:1},{id:"bean",title:"5R-BEAN",level:0},{id:"antibiotic-dashboard",title:"Antibiotic Dashboard",level:1},{id:"bean-assessment",title:"Bean Risk Assessment",level:1},{id:"bean-sodium-intake",title:"Bean Sodium Intake",level:1},{id:"bean-treatment",title:"UTI Treatment Protocol",level:1},{id:"beans-infection-diet",title:"Infection Diet Plan",level:1},{id:"bean-complete-nutrition-dashboard",title:"Bean Complete Nutrition Dashboard",level:1},{id:"bean-treatment-timeline-revised",title:"Bean Treatment Timeline Revised",level:1},{id:"bean-risk-assessment-v2",title:"Bean Risk Assessment V2",level:1},{id:"bean-risk-assessment-v2-revised",title:"Bean Risk Assessment V2 Revised",level:1},{id:"bean-sodium-intake-dashboard",title:"Bean Sodium Intake Dashboard",level:1},{id:"beans-infection-diet-plan",title:"Beans Infection Diet Plan",level:1},{id:"bean-uti-prevention",title:"Bean UTI Prevention",level:1},{id:"intellectual",title:"6I-INTELLECTUAL",level:0},{id:"reading-dashboard",title:"Reading Dashboard",level:1},{id:"murder-mystery-dinner-party",title:"Murder Mystery Dinner Party",level:1},{id:"murder-mystery-dinner-party-r1",title:"Murder Mystery Dinner Party (Enhanced)",level:1},{id:"media",title:"9E-MEDIA",level:0},{id:"hiking-playlist",title:"Hiking Playlist",level:1},{id:"highlightdetectivegame",title:"Highlight Detective Game",level:1},{id:"music-dashboard",title:"Music Dashboard",level:1},{id:"music-dashboard-r1",title:"Music Dashboard R1",level:1},{id:"sound-therapy",title:"Sound Therapy Guide",level:1},{id:"korijeni-na-korculi",title:"Korijeni Na Korculi",level:1},{id:"sound-therapy-guide",title:"Sound Therapy Guide",level:1},{id:"media-preference-dashboard",title:"Media Preference Dashboard",level:1},{id:"travel",title:"9E-TRAVEL",level:0},{id:"chiang-mai-air-pollution",title:"Chiang Mai Air Pollution",level:1},{id:"thailand-malaysia-journey",title:"Thailand-Malaysia Journey Planner",level:1}],r=l=>{switch(l){case"dashboard-overview":return e.jsxs("section",{id:l,className:"p-6 bg-white rounded-lg shadow",children:[e.jsx("h1",{className:"text-3xl font-bold mb-4",children:"DASHBOARDS OVERVIEW"}),e.jsx("p",{children:"Welcome to the collection of interactive visual content across LBS categories"})]});case"bike-maintenance-dashboard":return e.jsx(ye,{});case"backpack-dashboard":case"comprehensive-backpack-dashboard":return e.jsx(fe,{});case"holistic-protection":case"holistic-protection-dashboard":return e.jsx(ve,{});case"sunscreen-calculator":case"sunscreen-protection-calculator":return e.jsx(ge,{});case"sunscreen-boj":case"4h-biohacking-skin-sunscreen-boj":return e.jsx(pe,{});case"env-dashboard":return e.jsx(be,{});case"environmental-dashboard":return e.jsx(me,{});case"plants-co2":case"plants-co2-analysis":return e.jsx(he,{});case"microplastics-monitoring":case"microplastics-monitoring-dashboard":return e.jsx(ue,{});case"chiang-mai-air-pollution-dashboard":return e.jsx(de,{});case"distal-biceps":case"distal-biceps-tendinopathy-dashboard":return e.jsx(ce,{});case"dengue-risk":case"dengue-risk-visualization":return e.jsx(le,{});case"retinol":case"retinol-protocol-guide":return e.jsx(re,{});case"vollagen":case"vollagen-dashboard":return e.jsx(ne,{});case"apob-reference":return e.jsx(se,{});case"dental-care":case"dental-care-strategy":return e.jsx(oe,{});case"genetic-dashboard":case"genetic-dashboard-complete":return e.jsx(ie,{});case"neutering-effects":return e.jsx(ae,{});case"vaccination-timeline":case"vaccination-timeline-analysis":return e.jsx(te,{});case"emf-safety":case"emf-safety-dashboard":return e.jsx(ee,{});case"thai-massage-benefits-risks-dashboard":return e.jsx(Z,{});case"sports-nutrition":case"sports-nutrition-dashboard":return e.jsx(X,{});case"legume-guide":case"legumes-cooking-guide":return e.jsx(Y,{});case"life-smoothie":case"life-smoothie-visual":return e.jsx(q,{});case"nutrition-processing":case"nutrition-processing-dashboard":return e.jsx(J,{});case"enhanced-sodium-calculator":return e.jsx(f,{});case"enhanced-sodium-calculator-copy":return e.jsx(W,{});case"functional-foods":case"functional-foods-network":return e.jsx(U,{});case"enhanced-sodium":return e.jsx(f,{});case"therapeutic-spice":case"therapeutic-spice-blend":return e.jsx(Q,{});case"tvp-dashboard":return e.jsx(K,{});case"psychometric-dashboard":return e.jsx(h,{filePath:"content/4H-PSYCHOLOGY/psychometric-dashboard.html"});case"bean-assessment":case"bean-risk-assessment-v2-revised":return e.jsx(_,{});case"bean-risk-assessment-v2":return e.jsx(z,{});case"antibiotic-dashboard":return e.jsx(F,{});case"bean-sodium-intake-dashboard":case"bean-sodium-intake":return e.jsx(G,{});case"bean-treatment":case"bean-treatment-timeline-revised":return e.jsx(V,{});case"beans-infection-diet":case"beans-infection-diet-plan":return e.jsx($,{});case"bean-complete-nutrition-dashboard":return e.jsx(O,{});case"reading-dashboard":return e.jsx(L,{});case"murder-mystery-dinner-party":return e.jsx(I,{});case"murder-mystery-dinner-party-r1":return e.jsx(H,{});case"hiking-playlist":return e.jsx(B,{});case"highlightdetectivegame":return e.jsx(C,{});case"music-dashboard-r1":return e.jsx(T,{});case"music-dashboard":return e.jsx(M,{});case"sound-therapy":case"sound-therapy-guide":return e.jsx(P,{});case"korijeni-na-korculi":return e.jsx(N,{});case"media-preference-dashboard":return e.jsx(A,{});case"thai-import-calculator":return e.jsx(S,{});case"chiang-mai-air-pollution":return e.jsx(h,{filePath:"content/chiang-mai-air-pollution-guide.html"});case"bean-uti-prevention":return e.jsx(h,{filePath:"content/bean-uti-prevention-dashboard.html"});case"sulforaphane-protocol":return e.jsx(h,{filePath:"content/sulforaphane-protocol.html"});case"thailand-malaysia-journey":return e.jsx(h,{filePath:"content/thailand-malaysia-interactive-journey-planner.html"});default:return null}},u=t.pathname.replace(/^\//,"")||"dashboard-overview";return e.jsx(xe,{tableOfContents:e.jsx(je,{items:a,activeItem:u}),children:e.jsxs(k,{children:[e.jsx(g,{path:"/",element:e.jsx("div",{className:"p-6",children:e.jsxs("section",{className:"bg-white rounded-lg shadow",children:[e.jsx("h1",{className:"text-3xl font-bold mb-4",children:"DASHBOARDS OVERVIEW"}),e.jsx("p",{children:"Welcome to the collection of interactive visual content"})]})})}),a.map(l=>l.level===1&&e.jsx(g,{path:`/${l.id}`,element:e.jsx("div",{className:"p-6",children:r(l.id)})},l.id)),e.jsx(g,{path:"/dashboard-overview",element:e.jsx("div",{className:"p-6",children:e.jsxs("section",{className:"bg-white rounded-lg shadow",children:[e.jsx("h1",{className:"text-3xl font-bold mb-4",children:"DASHBOARDS OVERVIEW"}),e.jsx("p",{children:"Welcome to the collection of interactive visual content"})]})})})]})})}console.log("***********************");console.log("Debug script loaded at:",new Date().toISOString());console.log("***********************");console.log("Environment variables:");console.log("BASE_URL:","/DASHBOARDS/");console.log("MODE:","production");console.log("DEV:",!1);console.log("PROD:",!0);console.log("React availability check:");console.log("React global:",typeof React<"u"?"Available":"Not available");console.log("ReactDOM global:",typeof ReactDOM<"u"?"Available":"Not available");console.log("Document state:");console.log("readyState:",document.readyState);console.log("documentElement:",document.documentElement.outerHTML.substring(0,150)+"...");const Ee=new MutationObserver(t=>{console.log("DOM mutation detected:",t.length,"changes"),t.forEach(a=>{a.type==="childList"&&console.log("Children changed:",a.addedNodes.length,"added,",a.removedNodes.length,"removed")})});window.__REACT_ERROR_OVERLAY__={reportRuntimeError:t=>(console.error("React runtime error:",t),!1)};window.addEventListener("error",t=>{console.error("Global error caught:"),console.error("  Message:",t.message),console.error("  Filename:",t.filename),console.error("  Line:",t.lineno,"Column:",t.colno),console.error("  Error object:",t.error)});window.addEventListener("unhandledrejection",t=>{console.error("Unhandled Promise Rejection:"),console.error("  Reason:",t.reason),console.error("  Promise:",t.promise)});document.addEventListener("DOMContentLoaded",()=>{console.log("DOM content loaded"),console.log("Current DOM structure:"),console.log(document.body.innerHTML);const t=document.getElementById("root");t?(console.log("Root element found:",t),console.log("Root element innerHTML:",t.innerHTML),Ee.observe(t,{childList:!0,subtree:!0,attributes:!0})):(console.error("Root element not found!"),console.log("Available elements by ID:",Array.from(document.querySelectorAll("[id]")).map(a=>a.id)))});console.log("Debug initialization completed");console.log("main.tsx execution started");try{console.log("Attempting to render React app");const t=document.getElementById("root");if(!t)throw new Error("Root element not found in DOM");w.createRoot(t).render(e.jsx(R,{children:e.jsx(De,{})})),console.log("React app render call completed")}catch(t){console.error("Fatal error rendering React app:",t);const a=document.getElementById("error-display");a&&(a.style.display="block",a.innerHTML=`
      <h3>React Rendering Error</h3>
      <p>${t instanceof Error?t.message:String(t)}</p>
      <pre>${t instanceof Error&&t.stack?t.stack:"No stack trace available"}</pre>
    `)}const y=new MutationObserver(t=>{document.getElementById("root").children.length>0&&(document.getElementById("loading-indicator").style.display="none",y.disconnect())});y.observe(document.getElementById("root"),{childList:!0});setTimeout(()=>{document.getElementById("root").children.length===0&&(document.getElementById("error-display").style.display="block",document.getElementById("error-display").innerHTML='<h3>Application Load Error</h3><p>The dashboard application is taking too long to load. This could be due to:</p><ul><li>A JavaScript error preventing React from initializing</li><li>A network issue preventing resources from loading</li><li>A routing issue causing redirect loops</li></ul><p>Check the browser console (F12) for more detailed error information.</p><p><button onclick="window.location.reload()">Reload Page</button></p>')},5e3);
