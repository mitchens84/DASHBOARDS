import{j as e,r as h,au as m,av as f}from"./vendor-BfOnRHgj.js";import{S as v,D as b,M as p,H as x,R as g,a as o,b as j,B as y,I as E,F as c,c as d,P as D,d as N,C as S,e as R,E as u,V as A,N as P,G as B,f as C,A as I,g as L,h as k,i as O,j as M,k as T,l as w}from"./content-CpLl2S6y.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function r(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(t){if(t.ep)return;t.ep=!0;const s=r(t);fetch(t.href,s)}})();const H=({children:i,tableOfContents:a})=>e.jsxs("div",{className:"layout-container",children:[e.jsx("main",{className:"main-content",children:i}),a]}),V=({items:i,onSelect:a,activeItem:r})=>{const n=t=>{a(t);const s=document.getElementById(t);s&&s.scrollIntoView({behavior:"smooth"})};return e.jsxs("nav",{className:"toc-container",style:{backgroundColor:"#f8f9fa",padding:"20px"},children:[e.jsx("h2",{className:"toc-heading",children:"Contents"}),e.jsx("ul",{className:"toc-list",children:i.map(t=>e.jsx("li",{className:"toc-item",style:{paddingLeft:`${t.level*1.25}rem`,marginBottom:"8px"},children:e.jsx("button",{onClick:()=>n(t.id),className:`toc-link ${r===t.id?"active":""}`,style:{cursor:"pointer"},children:t.title})},t.id))})]})};function F(){const[i,a]=h.useState("dashboard-overview"),r=[{id:"dashboard-overview",title:"DASHBOARDS",level:0},{id:"risk-assessment",title:"0A-PREPAREDNESS",level:0},{id:"bean-assessment",title:"Bean Risk Assessment",level:1},{id:"environment",title:"4H-ENVIRONMENT",level:0},{id:"env-dashboard",title:"Environment Dashboard",level:1},{id:"environmental-dashboard",title:"Environmental Analysis",level:1},{id:"plants-co2",title:"Plants CO2 Analysis",level:1},{id:"microplastics-monitoring",title:"Microplastics Monitoring",level:1},{id:"retinol",title:"Retinol Protocol Guide",level:1},{id:"vollagen",title:"Vollagen Dashboard",level:1},{id:"health-reference",title:"4H-HEALTH",level:0},{id:"apob-reference",title:"ApoB Reference",level:1},{id:"dental-care",title:"Dental Care Strategy",level:1},{id:"genetic-dashboard",title:"Genetic Dashboard",level:1},{id:"neutering-effects",title:"Neutering Effects",level:1},{id:"vaccination-timeline",title:"Vaccination Timeline",level:1},{id:"emf-safety",title:"EMF Safety",level:1},{id:"nutrition",title:"4H-NUTRITION",level:0},{id:"sports-nutrition",title:"Sports Nutrition",level:1},{id:"legume-guide",title:"Legume Guide",level:1},{id:"enhanced-sodium",title:"Sodium Balance Calculator",level:1},{id:"functional-foods",title:"Functional Foods",level:1},{id:"life-smoothie",title:"Life Smoothie",level:1},{id:"nutrition-processing",title:"Nutrition Processing",level:1},{id:"therapeutic-spice",title:"Therapeutic Spice Blend",level:1},{id:"bean",title:"5R-BEAN",level:0},{id:"bean-assessment",title:"Bean Risk Assessment",level:1},{id:"antibiotic-dashboard",title:"Antibiotic Dashboard",level:1},{id:"bean-sodium-intake",title:"Bean Sodium Intake",level:1},{id:"intellectual",title:"6I-INTELLECTUAL",level:0},{id:"reading-dashboard",title:"Reading Dashboard",level:1},{id:"media",title:"9E-EXPERIENCE",level:0},{id:"hiking-playlist",title:"Hiking Playlist",level:1},{id:"music-dashboard-r1",title:"Music Dashboard R1",level:1},{id:"music-dashboard",title:"Music Dashboard",level:1},{id:"sound-therapy",title:"Sound Therapy Guide",level:1}],n=t=>{switch(t){case"dashboard-overview":return e.jsxs("section",{id:t,className:"p-6 bg-white rounded-lg shadow",children:[e.jsx("h1",{className:"text-3xl font-bold mb-4",children:"DASHBOARDS OVERVIEW"}),e.jsx("p",{children:"Welcome to the collection of interactive visual content across LBS categories"})]});case"env-dashboard":return e.jsx(w,{});case"environmental-dashboard":return e.jsx(T,{});case"plants-co2":return e.jsx(M,{});case"microplastics-monitoring":return e.jsx(O,{});case"retinol":return e.jsx(k,{});case"vollagen":return e.jsx(L,{});case"apob-reference":return e.jsx(I,{});case"dental-care":return e.jsx(C,{});case"genetic-dashboard":return e.jsx(B,{});case"neutering-effects":return e.jsx(P,{});case"vaccination-timeline":return e.jsx(A,{});case"emf-safety-dashboard":return e.jsx(u,{});case"emf-safety":return e.jsx(u,{});case"sports-nutrition":return e.jsx(R,{});case"legume-guide":return e.jsx(S,{});case"life-smoothie":return e.jsx(N,{});case"nutrition-processing":return e.jsx(D,{});case"enhanced-sodium-calculator":return e.jsx(d,{});case"functional-foods-network":return e.jsx(c,{});case"enhanced-sodium":return e.jsx(d,{});case"functional-foods":return e.jsx(c,{});case"therapeutic-spice":return e.jsx(E,{});case"bean-assessment":return e.jsx(y,{});case"antibiotic-dashboard":return e.jsx(j,{});case"bean-sodium-intake-dashboard":return e.jsx(o,{});case"bean-sodium-intake":return e.jsx(o,{});case"reading-dashboard":return e.jsx(g,{});case"hiking-playlist":return e.jsx(x,{});case"music-dashboard-r1":return e.jsx(p,{});case"music-dashboard":return e.jsx(b,{});case"sound-therapy":return e.jsx(v,{});default:return null}};return e.jsx(H,{tableOfContents:e.jsx(V,{items:r,onSelect:a,activeItem:i}),children:e.jsx("div",{className:"p-6",children:n(i)})})}m.createRoot(document.getElementById("root")).render(e.jsx(f.StrictMode,{children:e.jsx(F,{})}));
