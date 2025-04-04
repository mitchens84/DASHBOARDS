(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function t(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(r){if(r.ep)return;r.ep=!0;const o=t(r);fetch(r.href,o)}})();class b{constructor(e="dashboards"){this.namespace=e,this._cache=this._loadAllData()}saveDashboard(e,t){return this._cache[e]={data:t,lastUpdated:new Date().toISOString()},this._saveAllData(),!0}loadDashboard(e,t={}){const a=this._cache[e];return a?a.data:t}clearDashboard(e){return this._cache[e]?(delete this._cache[e],this._saveAllData(),!0):!1}clearAllDashboards(){return this._cache={},localStorage.removeItem(this.namespace),!0}_loadAllData(){const e=localStorage.getItem(this.namespace);return e?JSON.parse(e):{}}_saveAllData(){localStorage.setItem(this.namespace,JSON.stringify(this._cache))}}const l=new b;class g{constructor(){this.debugMode=localStorage.getItem("debug-storage")==="true",this.dashboardId=this.detectDashboardId(),this.setupMutationObserver(),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>this.init()):this.init()}log(...e){this.debugMode&&console.log("[AutoStorage]",...e)}warn(...e){console.warn("[AutoStorage]",...e)}detectDashboardId(){var r,o,s,n;const e=(s=(o=(r=document.currentScript)==null?void 0:r.src)==null?void 0:o.split("/").pop())==null?void 0:s.replace(".js","");if(e&&e!=="auto-storage")return this.log(`Dashboard ID from script path: ${e}`),e;const t=(n=window.location.pathname.split("/").pop())==null?void 0:n.replace(".html","");if(t)return this.log(`Dashboard ID from URL path: ${t}`),t;const a=document.title?document.title.toLowerCase().replace(/\s+/g,"-"):"dashboard";return this.log(`Dashboard ID from document title: ${a}`),a}init(){this.log(`AutoStorage initialized for "${this.dashboardId}"`);const e=l.loadDashboard(this.dashboardId,{});this.log(`Loading saved state for "${this.dashboardId}":`,e),Object.keys(e).length>0&&this.applyState(e),this.setupEventListeners(),this.importLegacyStorageData(),this.debugMode&&this.addDebugIndicator()}addDebugIndicator(){const e=document.createElement("div");e.style.position="fixed",e.style.bottom="10px",e.style.right="10px",e.style.backgroundColor="rgba(0, 0, 0, 0.7)",e.style.color="white",e.style.padding="5px 10px",e.style.borderRadius="5px",e.style.fontSize="12px",e.style.zIndex="9999",e.style.cursor="pointer",e.textContent=`📦 Storage: ${this.dashboardId}`,e.addEventListener("click",()=>{console.log("[AutoStorage] Current state:",l.loadDashboard(this.dashboardId,{}))}),document.body.appendChild(e)}importLegacyStorageData(){const e=`${this.dashboardId}-checkboxes`;try{const t=localStorage.getItem(e);if(t){const a=JSON.parse(t);this.log(`Found legacy checkbox data for "${this.dashboardId}":`,a);let r=0;Object.keys(a).forEach(o=>{const s=this.findElementById(o);s&&(s.checked=a[o],r++)}),r>0&&(this.log(`Migrated ${r} checkboxes from legacy storage`),this.saveCurrentState(),localStorage.removeItem(e))}}catch(t){this.warn("Error importing legacy storage data:",t)}}setupMutationObserver(){const e=new MutationObserver(t=>{let a=!1;t.forEach(r=>{r.addedNodes.length>0&&(a=!0)}),a&&(this.log("DOM mutation detected, setting up listeners for new elements"),this.setupEventListeners())});document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{e.observe(document.body,{childList:!0,subtree:!0})}):e.observe(document.body,{childList:!0,subtree:!0})}setupEventListeners(){let e=0;document.querySelectorAll('input[type="checkbox"]').forEach(t=>{t.hasAttribute("data-storage-bound")||(t.setAttribute("data-storage-bound","true"),t.addEventListener("change",()=>{this.log(`Checkbox changed: ${this.getElementIdentifier(t)||"unnamed"} = ${t.checked}`),this.saveCurrentState()}),e++)}),document.querySelectorAll('input[type="text"], input[type="number"], input[type="date"], textarea').forEach(t=>{t.hasAttribute("data-storage-bound")||(t.setAttribute("data-storage-bound","true"),t.addEventListener("change",()=>this.saveCurrentState()),t.addEventListener("blur",()=>this.saveCurrentState()),e++)}),document.querySelectorAll("select").forEach(t=>{t.hasAttribute("data-storage-bound")||(t.setAttribute("data-storage-bound","true"),t.addEventListener("change",()=>this.saveCurrentState()),e++)}),document.querySelectorAll('input[type="radio"]').forEach(t=>{t.hasAttribute("data-storage-bound")||(t.setAttribute("data-storage-bound","true"),t.addEventListener("change",()=>this.saveCurrentState()),e++)}),document.querySelectorAll(".collapsible, .accordion, [data-collapsible]").forEach(t=>{t.hasAttribute("data-storage-bound")||(t.setAttribute("data-storage-bound","true"),t.addEventListener("toggle",()=>this.saveCurrentState()),e++)}),document.querySelectorAll('[role="tabpanel"], [data-tab-panel], .tab-content').forEach(t=>{t.hasAttribute("data-storage-bound")||(t.setAttribute("data-storage-bound","true"),new MutationObserver(()=>this.saveCurrentState()).observe(t,{attributes:!0,attributeFilter:["class"]}),e++)}),e>0&&this.log(`Bound storage to ${e} new element(s)`)}collectCurrentState(){const e={checkboxes:{},inputs:{},selects:{},radios:{},collapsibles:{},tabs:{}};return document.querySelectorAll('input[type="checkbox"]').forEach((t,a)=>{const r=this.getElementIdentifier(t)||this.generateElementId(t,a);r&&(e.checkboxes[r]=t.checked)}),document.querySelectorAll('input[type="text"], input[type="number"], input[type="date"], textarea').forEach(t=>{const a=this.getElementIdentifier(t);a&&(e.inputs[a]=t.value)}),document.querySelectorAll("select").forEach(t=>{const a=this.getElementIdentifier(t);a&&(e.selects[a]=t.value)}),document.querySelectorAll('input[type="radio"]:checked').forEach(t=>{const a=t.name;a&&(e.radios[a]=t.value)}),document.querySelectorAll(".collapsible, .accordion, [data-collapsible]").forEach(t=>{const a=this.getElementIdentifier(t);a&&(e.collapsibles[a]=!t.classList.contains("collapsed"))}),document.querySelectorAll('[role="tabpanel"], [data-tab-panel], .tab-content').forEach(t=>{const a=this.getElementIdentifier(t);a&&t.classList.contains("active")&&(e.tabs[a]=!0)}),e}applyState(e){var r,o;let t=0,a=0;for(const[s,n]of Object.entries(e.checkboxes||{})){const i=this.findElementById(s);i?(i.checked=n,this.log(`Applied state to checkbox ${s}: ${n}`),t++):(this.debugMode&&this.warn(`Could not find checkbox with ID: ${s}`),a++)}for(const[s,n]of Object.entries(e.inputs||{})){const i=this.findElementById(s);i?(i.value=n,t++):a++}for(const[s,n]of Object.entries(e.selects||{})){const i=this.findElementById(s);i?(i.value=n,t++):a++}for(const[s,n]of Object.entries(e.radios||{})){const i=document.querySelector(`input[type="radio"][name="${s}"][value="${n}"]`);i?(i.checked=!0,t++):a++}for(const[s,n]of Object.entries(e.collapsibles||{})){const i=this.findElementById(s);i?(n?i.classList.remove("collapsed"):i.classList.add("collapsed"),t++):a++}for(const[s]of Object.entries(e.tabs||{})){const n=this.findElementById(s);if(n){Array.from(((r=n.parentNode)==null?void 0:r.children)||[]).forEach(d=>{d.classList.remove("active"),d.setAttribute("aria-selected","false")}),n.classList.add("active"),n.setAttribute("aria-selected","true");const c=n.getAttribute("aria-labelledby")||n.id;if(c){const d=document.querySelector(`[aria-controls="${c}"]`);d&&(Array.from(((o=d.parentNode)==null?void 0:o.children)||[]).forEach(f=>{f.classList.remove("active"),f.setAttribute("aria-selected","false")}),d.classList.add("active"),d.setAttribute("aria-selected","true"))}t++}else a++}this.log(`Applied saved state to ${t} element(s), ${a} element(s) not found`)}getElementIdentifier(e){return e.id||e.name||e.getAttribute("data-id")}generateElementId(e,t){var n;const a=[];let r=e,o=0;for(;r&&o<3;){if(r.id){a.unshift(r.id);break}if(r.tagName){const c=Array.from(((n=r.parentNode)==null?void 0:n.children)||[]).filter(d=>d.tagName===r.tagName).indexOf(r);a.unshift(`${r.tagName.toLowerCase()}:${c}`)}r=r.parentNode,o++}if(a.length>0){const i=`path:${a.join(">")}`;return this.log(`Generated path ID for element: ${i}`),i}const s=`auto-id-${Math.random().toString(36).substring(2,10)}`;return e.setAttribute("data-auto-id",s),this.log(`Generated random ID for element: ${s}`),s}findElementById(e){return e.startsWith("path:")?this.findElementByPath(e.substring(5)):document.getElementById(e)||document.querySelector(`[name="${e}"]`)||document.querySelector(`[data-id="${e}"]`)||document.querySelector(`[data-auto-id="${e}"]`)}findElementByPath(e){const t=e.split(">");let a=null;const r=t[0];if(r.includes(":")?a=document.body:(a=document.getElementById(r),t.shift()),!a||t.length===0)return null;let o=a;for(const s of t){if(!o)break;const[n,i]=s.split(":"),c=parseInt(i,10),d=Array.from(o.children).filter(h=>h.tagName.toLowerCase()===n.toLowerCase());if(d[c])o=d[c];else return null}return o}saveCurrentState(){const e=this.collectCurrentState();l.saveDashboard(this.dashboardId,e),this.log(`Saved state for "${this.dashboardId}"`);const t=new CustomEvent("autostorage:save",{detail:{dashboardId:this.dashboardId,state:e}});document.dispatchEvent(t)}forceUpdate(){this.saveCurrentState()}}const p=new g;window.autoStorage=p;
