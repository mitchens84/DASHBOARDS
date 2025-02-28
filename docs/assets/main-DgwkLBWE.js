import{j as e,bo as d,bp as u,bq as h,br as r,bs as b,bt as m,bu as v}from"./vendor-DAaXsnjZ.js";import{S as p,a as g,D as f,M as x,H as j,b as D,R as k,N as y,B as S,T as N,c as E,d as R,e as A,f as B,g as P,I as C,h as c,F as I,i as O,P as H,j as T,C as V,k as L,E as M,V as w,l as G,G as $,m as F,A as K,n as z,o as W,p as U,q,r as J,s as X,t as Q,u as Y,v as Z,w as _,x as ee,y as te,z as ae}from"./content-R7H2-ifp.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&l(o)}).observe(document,{childList:!0,subtree:!0});function i(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function l(t){if(t.ep)return;t.ep=!0;const a=i(t);fetch(t.href,a)}})();const se=({children:n,tableOfContents:s})=>e.jsxs("div",{className:"layout-container",children:[e.jsx("main",{className:"main-content",children:n}),s]}),ie=({items:n,activeItem:s})=>e.jsxs("nav",{className:"toc-container",style:{backgroundColor:"#f8f9fa",padding:"20px"},children:[e.jsx("h2",{className:"toc-heading",children:"Contents"}),e.jsx("ul",{className:"toc-list",children:n.map(i=>{const l=location.pathname===`/${i.id}`;return e.jsx("li",{className:"toc-item",style:{paddingLeft:`${i.level*1.25}rem`,marginBottom:"8px"},children:e.jsx(d,{to:`/${i.id}`,className:`toc-link ${l?"active":""}`,style:{cursor:"pointer",display:"block"},children:i.title})},i.id)})})]});function ne(){const n=u(),s=[{id:"dashboard-overview",title:"DASHBOARDS",level:0},{id:"risk-assessment",title:"0A-PREPAREDNESS",level:0},{id:"bike-maintenance-dashboard",title:"Bike Maintenance Dashboard",level:1},{id:"possessions",title:"3P-POSSESSIONS",level:0},{id:"backpack-dashboard",title:"Backpack Analysis",level:1},{id:"comprehensive-backpack-dashboard",title:"Comprehensive Backpack Dashboard",level:1},{id:"skin-biohacking",title:"4H-BIOHACKING-SKIN",level:0},{id:"holistic-protection",title:"Holistic Protection",level:1},{id:"sunscreen-calculator",title:"Sunscreen Calculator",level:1},{id:"sunscreen-boj",title:"BOJ Sunscreen Analysis",level:1},{id:"holistic-protection-dashboard",title:"Holistic Protection Dashboard",level:1},{id:"sunscreen-protection-calculator",title:"Sunscreen Protection Calculator",level:1},{id:"4h-biohacking-skin-sunscreen-boj",title:"4H BIOHACKING SKIN SUNSCREEN BOJ",level:1},{id:"environment",title:"4H-ENVIRONMENT",level:0},{id:"env-dashboard",title:"Environment Dashboard",level:1},{id:"environmental-dashboard",title:"Environmental Analysis",level:1},{id:"plants-co2",title:"Plants CO2 Analysis",level:1},{id:"microplastics-monitoring",title:"Microplastics Monitoring",level:1},{id:"microplastics-monitoring-dashboard",title:"Microplastics Monitoring Dashboard",level:1},{id:"plants-co2-analysis",title:"Plants Co2 Analysis",level:1},{id:"medical",title:"4H-MEDICAL",level:0},{id:"distal-biceps",title:"Distal Biceps Management",level:1},{id:"dengue-risk",title:"Dengue Risk Assessment",level:1},{id:"distal-biceps-tendinopathy-dashboard",title:"Distal Biceps Tendinopathy Dashboard",level:1},{id:"dengue-risk-visualization",title:"Dengue Risk Visualization",level:1},{id:"health-reference",title:"4H-HEALTH",level:0},{id:"apob-reference",title:"ApoB Reference",level:1},{id:"dental-care",title:"Dental Care Strategy",level:1},{id:"emf-safety",title:"EMF Safety",level:1},{id:"genetic-dashboard",title:"Genetic Dashboard",level:1},{id:"neutering-effects",title:"Neutering Effects",level:1},{id:"retinol",title:"Retinol Protocol Guide",level:1},{id:"vollagen",title:"Vollagen Dashboard",level:1},{id:"dental-care-strategy",title:"Dental Care Strategy",level:1},{id:"genetic-dashboard-complete",title:"Genetic Dashboard Complete",level:1},{id:"emf-safety-dashboard",title:"Emf Safety Dashboard",level:1},{id:"retinol-protocol-guide",title:"Retinol Protocol Guide",level:1},{id:"vaccination-timeline-analysis",title:"Vaccination Timeline Analysis",level:1},{id:"vollagen-dashboard",title:"Vollagen Dashboard",level:1},{id:"nutrition",title:"4H-NUTRITION",level:0},{id:"enhanced-sodium",title:"Sodium Balance Calculator",level:1},{id:"functional-foods",title:"Functional Foods",level:1},{id:"legume-guide",title:"Legume Guide",level:1},{id:"life-smoothie",title:"Life Smoothie",level:1},{id:"nutrition-processing",title:"Nutrition Processing",level:1},{id:"sports-nutrition",title:"Sports Nutrition",level:1},{id:"therapeutic-spice",title:"Therapeutic Spice Blend",level:1},{id:"life-smoothie-visual",title:"Life Smoothie Visual",level:1},{id:"legumes-cooking-guide",title:"Legumes Cooking Guide",level:1},{id:"sports-nutrition-dashboard",title:"Sports Nutrition Dashboard",level:1},{id:"nutrition-processing-dashboard",title:"Nutrition Processing Dashboard",level:1},{id:"enhanced-sodium-calculator-copy",title:"Enhanced Sodium Calculator Copy",level:1},{id:"enhanced-sodium-calculator",title:"Enhanced Sodium Calculator",level:1},{id:"functional-foods-network",title:"Functional Foods Network",level:1},{id:"therapeutic-spice-blend",title:"Therapeutic Spice Blend",level:1},{id:"tvp-dashboard",title:"TVP Dashboard",level:1},{id:"bean",title:"5R-BEAN",level:0},{id:"antibiotic-dashboard",title:"Antibiotic Dashboard",level:1},{id:"bean-assessment",title:"Bean Risk Assessment",level:1},{id:"bean-sodium-intake",title:"Bean Sodium Intake",level:1},{id:"bean-treatment",title:"UTI Treatment Protocol",level:1},{id:"beans-infection-diet",title:"Infection Diet Plan",level:1},{id:"bean-complete-nutrition-dashboard",title:"Bean Complete Nutrition Dashboard",level:1},{id:"bean-treatment-timeline-revised",title:"Bean Treatment Timeline Revised",level:1},{id:"bean-risk-assessment-v2",title:"Bean Risk Assessment V2",level:1},{id:"bean-risk-assessment-v2-revised",title:"Bean Risk Assessment V2 Revised",level:1},{id:"bean-sodium-intake-dashboard",title:"Bean Sodium Intake Dashboard",level:1},{id:"beans-infection-diet-plan",title:"Beans Infection Diet Plan",level:1},{id:"intellectual",title:"6I-INTELLECTUAL",level:0},{id:"reading-dashboard",title:"Reading Dashboard",level:1},{id:"media",title:"9E-EXPERIENCE",level:0},{id:"hiking-playlist",title:"Hiking Playlist",level:1},{id:"highlightdetectivegame",title:"Highlight Detective Game",level:1},{id:"music-dashboard",title:"Music Dashboard",level:1},{id:"music-dashboard-r1",title:"Music Dashboard R1",level:1},{id:"sound-therapy",title:"Sound Therapy Guide",level:1},{id:"korijeni-na-korculi",title:"Korijeni Na Korculi",level:1},{id:"sound-therapy-guide",title:"Sound Therapy Guide",level:1}],i=t=>{switch(t){case"dashboard-overview":return e.jsxs("section",{id:t,className:"p-6 bg-white rounded-lg shadow",children:[e.jsx("h1",{className:"text-3xl font-bold mb-4",children:"DASHBOARDS OVERVIEW"}),e.jsx("p",{children:"Welcome to the collection of interactive visual content across LBS categories"})]});case"bike-maintenance-dashboard":return e.jsx(ae,{});case"backpack-dashboard":case"comprehensive-backpack-dashboard":return e.jsx(te,{});case"holistic-protection":case"holistic-protection-dashboard":return e.jsx(ee,{});case"sunscreen-calculator":case"sunscreen-protection-calculator":return e.jsx(_,{});case"sunscreen-boj":case"4h-biohacking-skin-sunscreen-boj":return e.jsx(Z,{});case"env-dashboard":return e.jsx(Y,{});case"environmental-dashboard":return e.jsx(Q,{});case"plants-co2":case"plants-co2-analysis":return e.jsx(X,{});case"microplastics-monitoring":case"microplastics-monitoring-dashboard":return e.jsx(J,{});case"distal-biceps":case"distal-biceps-tendinopathy-dashboard":return e.jsx(q,{});case"dengue-risk":case"dengue-risk-visualization":return e.jsx(U,{});case"retinol":case"retinol-protocol-guide":return e.jsx(W,{});case"vollagen":case"vollagen-dashboard":return e.jsx(z,{});case"apob-reference":return e.jsx(K,{});case"dental-care":case"dental-care-strategy":return e.jsx(F,{});case"genetic-dashboard":case"genetic-dashboard-complete":return e.jsx($,{});case"neutering-effects":return e.jsx(G,{});case"vaccination-timeline":case"vaccination-timeline-analysis":return e.jsx(w,{});case"emf-safety":case"emf-safety-dashboard":return e.jsx(M,{});case"sports-nutrition":case"sports-nutrition-dashboard":return e.jsx(L,{});case"legume-guide":case"legumes-cooking-guide":return e.jsx(V,{});case"life-smoothie":case"life-smoothie-visual":return e.jsx(T,{});case"nutrition-processing":case"nutrition-processing-dashboard":return e.jsx(H,{});case"enhanced-sodium-calculator":return e.jsx(c,{});case"enhanced-sodium-calculator-copy":return e.jsx(O,{});case"functional-foods":case"functional-foods-network":return e.jsx(I,{});case"enhanced-sodium":return e.jsx(c,{});case"therapeutic-spice":case"therapeutic-spice-blend":return e.jsx(C,{});case"tvp-dashboard":return e.jsx(P,{});case"bean-assessment":case"bean-risk-assessment-v2-revised":return e.jsx(B,{});case"bean-risk-assessment-v2":return e.jsx(A,{});case"antibiotic-dashboard":return e.jsx(R,{});case"bean-sodium-intake-dashboard":case"bean-sodium-intake":return e.jsx(E,{});case"bean-treatment":case"bean-treatment-timeline-revised":return e.jsx(N,{});case"beans-infection-diet":case"beans-infection-diet-plan":return e.jsx(S,{});case"bean-complete-nutrition-dashboard":return e.jsx(y,{});case"reading-dashboard":return e.jsx(k,{});case"hiking-playlist":return e.jsx(D,{});case"highlightdetectivegame":return e.jsx(j,{});case"music-dashboard-r1":return e.jsx(x,{});case"music-dashboard":return e.jsx(f,{});case"sound-therapy":case"sound-therapy-guide":return e.jsx(g,{});case"korijeni-na-korculi":return e.jsx(p,{});default:return null}},l=n.pathname.replace(/^\//,"")||"dashboard-overview";return e.jsx(se,{tableOfContents:e.jsx(ie,{items:s,activeItem:l}),children:e.jsxs(h,{children:[e.jsx(r,{path:"/",element:e.jsx("div",{className:"p-6",children:e.jsxs("section",{className:"bg-white rounded-lg shadow",children:[e.jsx("h1",{className:"text-3xl font-bold mb-4",children:"DASHBOARDS OVERVIEW"}),e.jsx("p",{children:"Welcome to the collection of interactive visual content"})]})})}),s.map(t=>t.level===1&&e.jsx(r,{path:`/${t.id}`,element:e.jsx("div",{className:"p-6",children:i(t.id)})},t.id)),e.jsx(r,{path:"/dashboard-overview",element:e.jsx("div",{className:"p-6",children:e.jsxs("section",{className:"bg-white rounded-lg shadow",children:[e.jsx("h1",{className:"text-3xl font-bold mb-4",children:"DASHBOARDS OVERVIEW"}),e.jsx("p",{children:"Welcome to the collection of interactive visual content"})]})})})]})})}b.createRoot(document.getElementById("root")).render(e.jsx(m.StrictMode,{children:e.jsx(v,{children:e.jsx(ne,{})})}));
