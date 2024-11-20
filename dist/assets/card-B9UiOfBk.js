import{r as L,j as W}from"./index-BtzWQMaa.js";import{c as ae}from"./clsx-B-dksMZM.js";const q="-",le=e=>{const r=ce(e),{conflictingClassGroups:t,conflictingClassGroupModifiers:o}=e;return{getClassGroupId:l=>{const s=l.split(q);return s[0]===""&&s.length!==1&&s.shift(),re(s,r)||ie(l)},getConflictingClassGroupIds:(l,s)=>{const u=t[l]||[];return s&&o[l]?[...u,...o[l]]:u}}},re=(e,r)=>{var l;if(e.length===0)return r.classGroupId;const t=e[0],o=r.nextPart.get(t),i=o?re(e.slice(1),o):void 0;if(i)return i;if(r.validators.length===0)return;const n=e.join(q);return(l=r.validators.find(({validator:s})=>s(n)))==null?void 0:l.classGroupId},D=/^\[(.+)\]$/,ie=e=>{if(D.test(e)){const r=D.exec(e)[1],t=r==null?void 0:r.substring(0,r.indexOf(":"));if(t)return"arbitrary.."+t}},ce=e=>{const{theme:r,prefix:t}=e,o={nextPart:new Map,validators:[]};return pe(Object.entries(e.classGroups),t).forEach(([n,l])=>{F(l,o,n,r)}),o},F=(e,r,t,o)=>{e.forEach(i=>{if(typeof i=="string"){const n=i===""?r:ee(r,i);n.classGroupId=t;return}if(typeof i=="function"){if(de(i)){F(i(o),r,t,o);return}r.validators.push({validator:i,classGroupId:t});return}Object.entries(i).forEach(([n,l])=>{F(l,ee(r,n),t,o)})})},ee=(e,r)=>{let t=e;return r.split(q).forEach(o=>{t.nextPart.has(o)||t.nextPart.set(o,{nextPart:new Map,validators:[]}),t=t.nextPart.get(o)}),t},de=e=>e.isThemeGetter,pe=(e,r)=>r?e.map(([t,o])=>{const i=o.map(n=>typeof n=="string"?r+n:typeof n=="object"?Object.fromEntries(Object.entries(n).map(([l,s])=>[r+l,s])):n);return[t,i]}):e,ue=e=>{if(e<1)return{get:()=>{},set:()=>{}};let r=0,t=new Map,o=new Map;const i=(n,l)=>{t.set(n,l),r++,r>e&&(r=0,o=t,t=new Map)};return{get(n){let l=t.get(n);if(l!==void 0)return l;if((l=o.get(n))!==void 0)return i(n,l),l},set(n,l){t.has(n)?t.set(n,l):i(n,l)}}},te="!",be=e=>{const{separator:r,experimentalParseClassName:t}=e,o=r.length===1,i=r[0],n=r.length,l=s=>{const u=[];let g=0,m=0,x;for(let p=0;p<s.length;p++){let f=s[p];if(g===0){if(f===i&&(o||s.slice(p,p+n)===r)){u.push(s.slice(m,p)),m=p+n;continue}if(f==="/"){x=p;continue}}f==="["?g++:f==="]"&&g--}const y=u.length===0?s:s.substring(m),v=y.startsWith(te),w=v?y.substring(1):y,b=x&&x>m?x-m:void 0;return{modifiers:u,hasImportantModifier:v,baseClassName:w,maybePostfixModifierPosition:b}};return t?s=>t({className:s,parseClassName:l}):l},ge=e=>{if(e.length<=1)return e;const r=[];let t=[];return e.forEach(o=>{o[0]==="["?(r.push(...t.sort(),o),t=[]):t.push(o)}),r.push(...t.sort()),r},fe=e=>({cache:ue(e.cacheSize),parseClassName:be(e),...le(e)}),me=/\s+/,he=(e,r)=>{const{parseClassName:t,getClassGroupId:o,getConflictingClassGroupIds:i}=r,n=[],l=e.trim().split(me);let s="";for(let u=l.length-1;u>=0;u-=1){const g=l[u],{modifiers:m,hasImportantModifier:x,baseClassName:y,maybePostfixModifierPosition:v}=t(g);let w=!!v,b=o(w?y.substring(0,v):y);if(!b){if(!w){s=g+(s.length>0?" "+s:s);continue}if(b=o(y),!b){s=g+(s.length>0?" "+s:s);continue}w=!1}const p=ge(m).join(":"),f=x?p+te:p,h=f+b;if(n.includes(h))continue;n.push(h);const G=i(b,w);for(let A=0;A<G.length;++A){const P=G[A];n.push(f+P)}s=g+(s.length>0?" "+s:s)}return s};function xe(){let e=0,r,t,o="";for(;e<arguments.length;)(r=arguments[e++])&&(t=oe(r))&&(o&&(o+=" "),o+=t);return o}const oe=e=>{if(typeof e=="string")return e;let r,t="";for(let o=0;o<e.length;o++)e[o]&&(r=oe(e[o]))&&(t&&(t+=" "),t+=r);return t};function ye(e,...r){let t,o,i,n=l;function l(u){const g=r.reduce((m,x)=>x(m),e());return t=fe(g),o=t.cache.get,i=t.cache.set,n=s,s(u)}function s(u){const g=o(u);if(g)return g;const m=he(u,t);return i(u,m),m}return function(){return n(xe.apply(null,arguments))}}const c=e=>{const r=t=>t[e]||[];return r.isThemeGetter=!0,r},ne=/^\[(?:([a-z-]+):)?(.+)\]$/i,we=/^\d+\/\d+$/,ve=new Set(["px","full","screen"]),Ce=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,ke=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,ze=/^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,Se=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,Ae=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,k=e=>M(e)||ve.has(e)||we.test(e),z=e=>R(e,"length",Ee),M=e=>!!e&&!Number.isNaN(Number(e)),U=e=>R(e,"number",M),j=e=>!!e&&Number.isInteger(Number(e)),Me=e=>e.endsWith("%")&&M(e.slice(0,-1)),a=e=>ne.test(e),S=e=>Ce.test(e),Re=new Set(["length","size","percentage"]),Ge=e=>R(e,Re,se),Ne=e=>R(e,"position",se),je=new Set(["image","url"]),Ie=e=>R(e,je,Le),Pe=e=>R(e,"",Te),I=()=>!0,R=(e,r,t)=>{const o=ne.exec(e);return o?o[1]?typeof r=="string"?o[1]===r:r.has(o[1]):t(o[2]):!1},Ee=e=>ke.test(e)&&!ze.test(e),se=()=>!1,Te=e=>Se.test(e),Le=e=>Ae.test(e),We=()=>{const e=c("colors"),r=c("spacing"),t=c("blur"),o=c("brightness"),i=c("borderColor"),n=c("borderRadius"),l=c("borderSpacing"),s=c("borderWidth"),u=c("contrast"),g=c("grayscale"),m=c("hueRotate"),x=c("invert"),y=c("gap"),v=c("gradientColorStops"),w=c("gradientColorStopPositions"),b=c("inset"),p=c("margin"),f=c("opacity"),h=c("padding"),G=c("saturate"),A=c("scale"),P=c("sepia"),H=c("skew"),J=c("space"),X=c("translate"),O=()=>["auto","contain","none"],_=()=>["auto","hidden","clip","visible","scroll"],$=()=>["auto",a,r],d=()=>[a,r],Z=()=>["",k,z],E=()=>["auto",M,a],K=()=>["bottom","center","left","left-bottom","left-top","right","right-bottom","right-top","top"],T=()=>["solid","dashed","dotted","double","none"],Q=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],B=()=>["start","end","center","between","around","evenly","stretch"],N=()=>["","0",a],Y=()=>["auto","avoid","all","avoid-page","page","left","right","column"],C=()=>[M,a];return{cacheSize:500,separator:":",theme:{colors:[I],spacing:[k,z],blur:["none","",S,a],brightness:C(),borderColor:[e],borderRadius:["none","","full",S,a],borderSpacing:d(),borderWidth:Z(),contrast:C(),grayscale:N(),hueRotate:C(),invert:N(),gap:d(),gradientColorStops:[e],gradientColorStopPositions:[Me,z],inset:$(),margin:$(),opacity:C(),padding:d(),saturate:C(),scale:C(),sepia:N(),skew:C(),space:d(),translate:d()},classGroups:{aspect:[{aspect:["auto","square","video",a]}],container:["container"],columns:[{columns:[S]}],"break-after":[{"break-after":Y()}],"break-before":[{"break-before":Y()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:[...K(),a]}],overflow:[{overflow:_()}],"overflow-x":[{"overflow-x":_()}],"overflow-y":[{"overflow-y":_()}],overscroll:[{overscroll:O()}],"overscroll-x":[{"overscroll-x":O()}],"overscroll-y":[{"overscroll-y":O()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:[b]}],"inset-x":[{"inset-x":[b]}],"inset-y":[{"inset-y":[b]}],start:[{start:[b]}],end:[{end:[b]}],top:[{top:[b]}],right:[{right:[b]}],bottom:[{bottom:[b]}],left:[{left:[b]}],visibility:["visible","invisible","collapse"],z:[{z:["auto",j,a]}],basis:[{basis:$()}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["wrap","wrap-reverse","nowrap"]}],flex:[{flex:["1","auto","initial","none",a]}],grow:[{grow:N()}],shrink:[{shrink:N()}],order:[{order:["first","last","none",j,a]}],"grid-cols":[{"grid-cols":[I]}],"col-start-end":[{col:["auto",{span:["full",j,a]},a]}],"col-start":[{"col-start":E()}],"col-end":[{"col-end":E()}],"grid-rows":[{"grid-rows":[I]}],"row-start-end":[{row:["auto",{span:[j,a]},a]}],"row-start":[{"row-start":E()}],"row-end":[{"row-end":E()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":["auto","min","max","fr",a]}],"auto-rows":[{"auto-rows":["auto","min","max","fr",a]}],gap:[{gap:[y]}],"gap-x":[{"gap-x":[y]}],"gap-y":[{"gap-y":[y]}],"justify-content":[{justify:["normal",...B()]}],"justify-items":[{"justify-items":["start","end","center","stretch"]}],"justify-self":[{"justify-self":["auto","start","end","center","stretch"]}],"align-content":[{content:["normal",...B(),"baseline"]}],"align-items":[{items:["start","end","center","baseline","stretch"]}],"align-self":[{self:["auto","start","end","center","stretch","baseline"]}],"place-content":[{"place-content":[...B(),"baseline"]}],"place-items":[{"place-items":["start","end","center","baseline","stretch"]}],"place-self":[{"place-self":["auto","start","end","center","stretch"]}],p:[{p:[h]}],px:[{px:[h]}],py:[{py:[h]}],ps:[{ps:[h]}],pe:[{pe:[h]}],pt:[{pt:[h]}],pr:[{pr:[h]}],pb:[{pb:[h]}],pl:[{pl:[h]}],m:[{m:[p]}],mx:[{mx:[p]}],my:[{my:[p]}],ms:[{ms:[p]}],me:[{me:[p]}],mt:[{mt:[p]}],mr:[{mr:[p]}],mb:[{mb:[p]}],ml:[{ml:[p]}],"space-x":[{"space-x":[J]}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":[J]}],"space-y-reverse":["space-y-reverse"],w:[{w:["auto","min","max","fit","svw","lvw","dvw",a,r]}],"min-w":[{"min-w":[a,r,"min","max","fit"]}],"max-w":[{"max-w":[a,r,"none","full","min","max","fit","prose",{screen:[S]},S]}],h:[{h:[a,r,"auto","min","max","fit","svh","lvh","dvh"]}],"min-h":[{"min-h":[a,r,"min","max","fit","svh","lvh","dvh"]}],"max-h":[{"max-h":[a,r,"min","max","fit","svh","lvh","dvh"]}],size:[{size:[a,r,"auto","min","max","fit"]}],"font-size":[{text:["base",S,z]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:["thin","extralight","light","normal","medium","semibold","bold","extrabold","black",U]}],"font-family":[{font:[I]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractons"],tracking:[{tracking:["tighter","tight","normal","wide","wider","widest",a]}],"line-clamp":[{"line-clamp":["none",M,U]}],leading:[{leading:["none","tight","snug","normal","relaxed","loose",k,a]}],"list-image":[{"list-image":["none",a]}],"list-style-type":[{list:["none","disc","decimal",a]}],"list-style-position":[{list:["inside","outside"]}],"placeholder-color":[{placeholder:[e]}],"placeholder-opacity":[{"placeholder-opacity":[f]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"text-color":[{text:[e]}],"text-opacity":[{"text-opacity":[f]}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...T(),"wavy"]}],"text-decoration-thickness":[{decoration:["auto","from-font",k,z]}],"underline-offset":[{"underline-offset":["auto",k,a]}],"text-decoration-color":[{decoration:[e]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:d()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",a]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",a]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-opacity":[{"bg-opacity":[f]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:[...K(),Ne]}],"bg-repeat":[{bg:["no-repeat",{repeat:["","x","y","round","space"]}]}],"bg-size":[{bg:["auto","cover","contain",Ge]}],"bg-image":[{bg:["none",{"gradient-to":["t","tr","r","br","b","bl","l","tl"]},Ie]}],"bg-color":[{bg:[e]}],"gradient-from-pos":[{from:[w]}],"gradient-via-pos":[{via:[w]}],"gradient-to-pos":[{to:[w]}],"gradient-from":[{from:[v]}],"gradient-via":[{via:[v]}],"gradient-to":[{to:[v]}],rounded:[{rounded:[n]}],"rounded-s":[{"rounded-s":[n]}],"rounded-e":[{"rounded-e":[n]}],"rounded-t":[{"rounded-t":[n]}],"rounded-r":[{"rounded-r":[n]}],"rounded-b":[{"rounded-b":[n]}],"rounded-l":[{"rounded-l":[n]}],"rounded-ss":[{"rounded-ss":[n]}],"rounded-se":[{"rounded-se":[n]}],"rounded-ee":[{"rounded-ee":[n]}],"rounded-es":[{"rounded-es":[n]}],"rounded-tl":[{"rounded-tl":[n]}],"rounded-tr":[{"rounded-tr":[n]}],"rounded-br":[{"rounded-br":[n]}],"rounded-bl":[{"rounded-bl":[n]}],"border-w":[{border:[s]}],"border-w-x":[{"border-x":[s]}],"border-w-y":[{"border-y":[s]}],"border-w-s":[{"border-s":[s]}],"border-w-e":[{"border-e":[s]}],"border-w-t":[{"border-t":[s]}],"border-w-r":[{"border-r":[s]}],"border-w-b":[{"border-b":[s]}],"border-w-l":[{"border-l":[s]}],"border-opacity":[{"border-opacity":[f]}],"border-style":[{border:[...T(),"hidden"]}],"divide-x":[{"divide-x":[s]}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":[s]}],"divide-y-reverse":["divide-y-reverse"],"divide-opacity":[{"divide-opacity":[f]}],"divide-style":[{divide:T()}],"border-color":[{border:[i]}],"border-color-x":[{"border-x":[i]}],"border-color-y":[{"border-y":[i]}],"border-color-s":[{"border-s":[i]}],"border-color-e":[{"border-e":[i]}],"border-color-t":[{"border-t":[i]}],"border-color-r":[{"border-r":[i]}],"border-color-b":[{"border-b":[i]}],"border-color-l":[{"border-l":[i]}],"divide-color":[{divide:[i]}],"outline-style":[{outline:["",...T()]}],"outline-offset":[{"outline-offset":[k,a]}],"outline-w":[{outline:[k,z]}],"outline-color":[{outline:[e]}],"ring-w":[{ring:Z()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:[e]}],"ring-opacity":[{"ring-opacity":[f]}],"ring-offset-w":[{"ring-offset":[k,z]}],"ring-offset-color":[{"ring-offset":[e]}],shadow:[{shadow:["","inner","none",S,Pe]}],"shadow-color":[{shadow:[I]}],opacity:[{opacity:[f]}],"mix-blend":[{"mix-blend":[...Q(),"plus-lighter","plus-darker"]}],"bg-blend":[{"bg-blend":Q()}],filter:[{filter:["","none"]}],blur:[{blur:[t]}],brightness:[{brightness:[o]}],contrast:[{contrast:[u]}],"drop-shadow":[{"drop-shadow":["","none",S,a]}],grayscale:[{grayscale:[g]}],"hue-rotate":[{"hue-rotate":[m]}],invert:[{invert:[x]}],saturate:[{saturate:[G]}],sepia:[{sepia:[P]}],"backdrop-filter":[{"backdrop-filter":["","none"]}],"backdrop-blur":[{"backdrop-blur":[t]}],"backdrop-brightness":[{"backdrop-brightness":[o]}],"backdrop-contrast":[{"backdrop-contrast":[u]}],"backdrop-grayscale":[{"backdrop-grayscale":[g]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[m]}],"backdrop-invert":[{"backdrop-invert":[x]}],"backdrop-opacity":[{"backdrop-opacity":[f]}],"backdrop-saturate":[{"backdrop-saturate":[G]}],"backdrop-sepia":[{"backdrop-sepia":[P]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":[l]}],"border-spacing-x":[{"border-spacing-x":[l]}],"border-spacing-y":[{"border-spacing-y":[l]}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["none","all","","colors","opacity","shadow","transform",a]}],duration:[{duration:C()}],ease:[{ease:["linear","in","out","in-out",a]}],delay:[{delay:C()}],animate:[{animate:["none","spin","ping","pulse","bounce",a]}],transform:[{transform:["","gpu","none"]}],scale:[{scale:[A]}],"scale-x":[{"scale-x":[A]}],"scale-y":[{"scale-y":[A]}],rotate:[{rotate:[j,a]}],"translate-x":[{"translate-x":[X]}],"translate-y":[{"translate-y":[X]}],"skew-x":[{"skew-x":[H]}],"skew-y":[{"skew-y":[H]}],"transform-origin":[{origin:["center","top","top-right","right","bottom-right","bottom","bottom-left","left","top-left",a]}],accent:[{accent:["auto",e]}],appearance:[{appearance:["none","auto"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",a]}],"caret-color":[{caret:[e]}],"pointer-events":[{"pointer-events":["none","auto"]}],resize:[{resize:["none","y","x",""]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":d()}],"scroll-mx":[{"scroll-mx":d()}],"scroll-my":[{"scroll-my":d()}],"scroll-ms":[{"scroll-ms":d()}],"scroll-me":[{"scroll-me":d()}],"scroll-mt":[{"scroll-mt":d()}],"scroll-mr":[{"scroll-mr":d()}],"scroll-mb":[{"scroll-mb":d()}],"scroll-ml":[{"scroll-ml":d()}],"scroll-p":[{"scroll-p":d()}],"scroll-px":[{"scroll-px":d()}],"scroll-py":[{"scroll-py":d()}],"scroll-ps":[{"scroll-ps":d()}],"scroll-pe":[{"scroll-pe":d()}],"scroll-pt":[{"scroll-pt":d()}],"scroll-pr":[{"scroll-pr":d()}],"scroll-pb":[{"scroll-pb":d()}],"scroll-pl":[{"scroll-pl":d()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",a]}],fill:[{fill:[e,"none"]}],"stroke-w":[{stroke:[k,z,U]}],stroke:[{stroke:[e,"none"]}],sr:["sr-only","not-sr-only"],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-s","border-color-e","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]}}},Ve=ye(We);function V(...e){return Ve(ae(e))}const Oe=L.forwardRef(({className:e,...r},t)=>W.jsx("div",{ref:t,className:V("rounded-lg border bg-card text-card-foreground shadow-sm",e),...r}));Oe.displayName="Card";const _e=L.forwardRef(({className:e,...r},t)=>W.jsx("div",{ref:t,className:V("flex flex-col space-y-1.5 p-6",e),...r}));_e.displayName="CardHeader";const $e=L.forwardRef(({className:e,...r},t)=>W.jsx("h3",{ref:t,className:V("text-2xl font-semibold leading-none tracking-tight",e),...r}));$e.displayName="CardTitle";const Be=L.forwardRef(({className:e,...r},t)=>W.jsx("div",{ref:t,className:V("p-6 pt-0",e),...r}));Be.displayName="CardContent";export{Oe as C,Be as a,_e as b,V as c,$e as d};
