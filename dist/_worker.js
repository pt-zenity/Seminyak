var $t=Object.defineProperty;var ot=e=>{throw TypeError(e)};var Ft=(e,t,a)=>t in e?$t(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a;var A=(e,t,a)=>Ft(e,typeof t!="symbol"?t+"":t,a),Ze=(e,t,a)=>t.has(e)||ot("Cannot "+a);var m=(e,t,a)=>(Ze(e,t,"read from private field"),a?a.call(e):t.get(e)),C=(e,t,a)=>t.has(e)?ot("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,a),E=(e,t,a,n)=>(Ze(e,t,"write to private field"),n?n.call(e,a):t.set(e,a),a),_=(e,t,a)=>(Ze(e,t,"access private method"),a);var dt=(e,t,a,n)=>({set _(s){E(e,t,s,a)},get _(){return m(e,t,n)}});var lt=(e,t,a)=>(n,s)=>{let i=-1;return o(0);async function o(r){if(r<=i)throw new Error("next() called multiple times");i=r;let u,l=!1,d;if(e[r]?(d=e[r][0][0],n.req.routeIndex=r):d=r===e.length&&s||void 0,d)try{u=await d(n,()=>o(r+1))}catch(y){if(y instanceof Error&&t)n.error=y,u=await t(y,n),l=!0;else throw y}else n.finalized===!1&&a&&(u=await a(n));return u&&(n.finalized===!1||l)&&(n.res=u),n}},Gt=Symbol(),Yt=async(e,t=Object.create(null))=>{const{all:a=!1,dot:n=!1}=t,i=(e instanceof Et?e.raw.headers:e.headers).get("Content-Type");return i!=null&&i.startsWith("multipart/form-data")||i!=null&&i.startsWith("application/x-www-form-urlencoded")?Jt(e,{all:a,dot:n}):{}};async function Jt(e,t){const a=await e.formData();return a?Vt(a,t):{}}function Vt(e,t){const a=Object.create(null);return e.forEach((n,s)=>{t.all||s.endsWith("[]")?Wt(a,s,n):a[s]=n}),t.dot&&Object.entries(a).forEach(([n,s])=>{n.includes(".")&&(Qt(a,n,s),delete a[n])}),a}var Wt=(e,t,a)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(a):e[t]=[e[t],a]:t.endsWith("[]")?e[t]=[a]:e[t]=a},Qt=(e,t,a)=>{if(/(?:^|\.)__proto__\./.test(t))return;let n=e;const s=t.split(".");s.forEach((i,o)=>{o===s.length-1?n[i]=a:((!n[i]||typeof n[i]!="object"||Array.isArray(n[i])||n[i]instanceof File)&&(n[i]=Object.create(null)),n=n[i])})},kt=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},Zt=e=>{const{groups:t,path:a}=ea(e),n=kt(a);return ta(n,t)},ea=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(a,n)=>{const s=`@${n}`;return t.push([s,a]),s}),{groups:t,path:e}},ta=(e,t)=>{for(let a=t.length-1;a>=0;a--){const[n]=t[a];for(let s=e.length-1;s>=0;s--)if(e[s].includes(n)){e[s]=e[s].replace(n,t[a][1]);break}}return e},Xe={},aa=(e,t)=>{if(e==="*")return"*";const a=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(a){const n=`${e}#${t}`;return Xe[n]||(a[2]?Xe[n]=t&&t[0]!==":"&&t[0]!=="*"?[n,a[1],new RegExp(`^${a[2]}(?=/${t})`)]:[e,a[1],new RegExp(`^${a[2]}$`)]:Xe[n]=[e,a[1],!0]),Xe[n]}return null},st=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,a=>{try{return t(a)}catch{return a}})}},xt=e=>st(e,decodeURI),wt=e=>{const t=e.url,a=t.indexOf("/",t.indexOf(":")+4);let n=a;for(;n<t.length;n++){const s=t.charCodeAt(n);if(s===37){const i=t.indexOf("?",n),o=t.indexOf("#",n),r=i===-1?o===-1?void 0:o:o===-1?i:Math.min(i,o),u=t.slice(a,r);return xt(u.includes("%25")?u.replace(/%25/g,"%2525"):u)}else if(s===63||s===35)break}return t.slice(a,n)},sa=e=>{const t=wt(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},xe=(e,t,...a)=>(a.length&&(t=xe(t,...a)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),St=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),a=[];let n="";return t.forEach(s=>{if(s!==""&&!/\:/.test(s))n+="/"+s;else if(/\:/.test(s))if(/\?/.test(s)){a.length===0&&n===""?a.push("/"):a.push(n);const i=s.replace("?","");n+="/"+i,a.push(n)}else n+="/"+s}),a.filter((s,i,o)=>o.indexOf(s)===i)},et=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?st(e,It):e):e,Tt=(e,t,a)=>{let n;if(!a&&t&&!/[%+]/.test(t)){let o=e.indexOf("?",8);if(o===-1)return;for(e.startsWith(t,o+1)||(o=e.indexOf(`&${t}`,o+1));o!==-1;){const r=e.charCodeAt(o+t.length+1);if(r===61){const u=o+t.length+2,l=e.indexOf("&",u);return et(e.slice(u,l===-1?void 0:l))}else if(r==38||isNaN(r))return"";o=e.indexOf(`&${t}`,o+1)}if(n=/[%+]/.test(e),!n)return}const s={};n??(n=/[%+]/.test(e));let i=e.indexOf("?",8);for(;i!==-1;){const o=e.indexOf("&",i+1);let r=e.indexOf("=",i);r>o&&o!==-1&&(r=-1);let u=e.slice(i+1,r===-1?o===-1?void 0:o:r);if(n&&(u=et(u)),i=o,u==="")continue;let l;r===-1?l="":(l=e.slice(r+1,o===-1?void 0:o),n&&(l=et(l))),a?(s[u]&&Array.isArray(s[u])||(s[u]=[]),s[u].push(l)):s[u]??(s[u]=l)}return t?s[t]:s},na=Tt,ia=(e,t)=>Tt(e,t,!0),It=decodeURIComponent,ct=e=>st(e,It),Te,X,se,At,Pt,at,ne,mt,Et=(mt=class{constructor(e,t="/",a=[[]]){C(this,se);A(this,"raw");C(this,Te);C(this,X);A(this,"routeIndex",0);A(this,"path");A(this,"bodyCache",{});C(this,ne,e=>{const{bodyCache:t,raw:a}=this,n=t[e];if(n)return n;const s=Object.keys(t)[0];return s?t[s].then(i=>(s==="json"&&(i=JSON.stringify(i)),new Response(i)[e]())):t[e]=a[e]()});this.raw=e,this.path=t,E(this,X,a),E(this,Te,{})}param(e){return e?_(this,se,At).call(this,e):_(this,se,Pt).call(this)}query(e){return na(this.url,e)}queries(e){return ia(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((a,n)=>{t[n]=a}),t}async parseBody(e){return Yt(this,e)}json(){return m(this,ne).call(this,"text").then(e=>JSON.parse(e))}text(){return m(this,ne).call(this,"text")}arrayBuffer(){return m(this,ne).call(this,"arrayBuffer")}blob(){return m(this,ne).call(this,"blob")}formData(){return m(this,ne).call(this,"formData")}addValidatedData(e,t){m(this,Te)[e]=t}valid(e){return m(this,Te)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[Gt](){return m(this,X)}get matchedRoutes(){return m(this,X)[0].map(([[,e]])=>e)}get routePath(){return m(this,X)[0].map(([[,e]])=>e)[this.routeIndex].path}},Te=new WeakMap,X=new WeakMap,se=new WeakSet,At=function(e){const t=m(this,X)[0][this.routeIndex][1][e],a=_(this,se,at).call(this,t);return a&&/\%/.test(a)?ct(a):a},Pt=function(){const e={},t=Object.keys(m(this,X)[0][this.routeIndex][1]);for(const a of t){const n=_(this,se,at).call(this,m(this,X)[0][this.routeIndex][1][a]);n!==void 0&&(e[a]=/\%/.test(n)?ct(n):n)}return e},at=function(e){return m(this,X)[1]?m(this,X)[1][e]:e},ne=new WeakMap,mt),ra={Stringify:1},Ct=async(e,t,a,n,s)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const i=e.callbacks;return i!=null&&i.length?(s?s[0]+=e:s=[e],Promise.all(i.map(r=>r({phase:t,buffer:s,context:n}))).then(r=>Promise.all(r.filter(Boolean).map(u=>Ct(u,t,!1,n,s))).then(()=>s[0]))):Promise.resolve(e)},oa="text/plain; charset=UTF-8",tt=(e,t)=>({"Content-Type":e,...t}),De=(e,t)=>new Response(e,t),Me,He,Z,Ie,ee,j,je,Ee,Ae,me,ze,Ke,ie,we,gt,da=(gt=class{constructor(e,t){C(this,ie);C(this,Me);C(this,He);A(this,"env",{});C(this,Z);A(this,"finalized",!1);A(this,"error");C(this,Ie);C(this,ee);C(this,j);C(this,je);C(this,Ee);C(this,Ae);C(this,me);C(this,ze);C(this,Ke);A(this,"render",(...e)=>(m(this,Ee)??E(this,Ee,t=>this.html(t)),m(this,Ee).call(this,...e)));A(this,"setLayout",e=>E(this,je,e));A(this,"getLayout",()=>m(this,je));A(this,"setRenderer",e=>{E(this,Ee,e)});A(this,"header",(e,t,a)=>{this.finalized&&E(this,j,De(m(this,j).body,m(this,j)));const n=m(this,j)?m(this,j).headers:m(this,me)??E(this,me,new Headers);t===void 0?n.delete(e):a!=null&&a.append?n.append(e,t):n.set(e,t)});A(this,"status",e=>{E(this,Ie,e)});A(this,"set",(e,t)=>{m(this,Z)??E(this,Z,new Map),m(this,Z).set(e,t)});A(this,"get",e=>m(this,Z)?m(this,Z).get(e):void 0);A(this,"newResponse",(...e)=>_(this,ie,we).call(this,...e));A(this,"body",(e,t,a)=>_(this,ie,we).call(this,e,t,a));A(this,"text",(e,t,a)=>!m(this,me)&&!m(this,Ie)&&!t&&!a&&!this.finalized?new Response(e):_(this,ie,we).call(this,e,t,tt(oa,a)));A(this,"json",(e,t,a)=>_(this,ie,we).call(this,JSON.stringify(e),t,tt("application/json",a)));A(this,"html",(e,t,a)=>{const n=s=>_(this,ie,we).call(this,s,t,tt("text/html; charset=UTF-8",a));return typeof e=="object"?Ct(e,ra.Stringify,!1,{}).then(n):n(e)});A(this,"redirect",(e,t)=>{const a=String(e);return this.header("Location",/[^\x00-\xFF]/.test(a)?encodeURI(a):a),this.newResponse(null,t??302)});A(this,"notFound",()=>(m(this,Ae)??E(this,Ae,()=>De()),m(this,Ae).call(this,this)));E(this,Me,e),t&&(E(this,ee,t.executionCtx),this.env=t.env,E(this,Ae,t.notFoundHandler),E(this,Ke,t.path),E(this,ze,t.matchResult))}get req(){return m(this,He)??E(this,He,new Et(m(this,Me),m(this,Ke),m(this,ze))),m(this,He)}get event(){if(m(this,ee)&&"respondWith"in m(this,ee))return m(this,ee);throw Error("This context has no FetchEvent")}get executionCtx(){if(m(this,ee))return m(this,ee);throw Error("This context has no ExecutionContext")}get res(){return m(this,j)||E(this,j,De(null,{headers:m(this,me)??E(this,me,new Headers)}))}set res(e){if(m(this,j)&&e){e=De(e.body,e);for(const[t,a]of m(this,j).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const n=m(this,j).headers.getSetCookie();e.headers.delete("set-cookie");for(const s of n)e.headers.append("set-cookie",s)}else e.headers.set(t,a)}E(this,j,e),this.finalized=!0}get var(){return m(this,Z)?Object.fromEntries(m(this,Z)):{}}},Me=new WeakMap,He=new WeakMap,Z=new WeakMap,Ie=new WeakMap,ee=new WeakMap,j=new WeakMap,je=new WeakMap,Ee=new WeakMap,Ae=new WeakMap,me=new WeakMap,ze=new WeakMap,Ke=new WeakMap,ie=new WeakSet,we=function(e,t,a){const n=m(this,j)?new Headers(m(this,j).headers):m(this,me)??new Headers;if(typeof t=="object"&&"headers"in t){const i=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[o,r]of i)o.toLowerCase()==="set-cookie"?n.append(o,r):n.set(o,r)}if(a)for(const[i,o]of Object.entries(a))if(typeof o=="string")n.set(i,o);else{n.delete(i);for(const r of o)n.append(i,r)}const s=typeof t=="number"?t:(t==null?void 0:t.status)??m(this,Ie);return De(e,{status:s,headers:n})},gt),O="ALL",la="all",ca=["get","post","put","delete","options","patch"],_t="Can not add a route since the matcher is already built.",Bt=class extends Error{},pa="__COMPOSED_HANDLER",ua=e=>e.text("404 Not Found",404),pt=(e,t)=>{if("getResponse"in e){const a=e.getResponse();return t.newResponse(a.body,a)}return console.error(e),t.text("Internal Server Error",500)},$,q,Rt,F,ue,$e,Fe,Pe,fa=(Pe=class{constructor(t={}){C(this,q);A(this,"get");A(this,"post");A(this,"put");A(this,"delete");A(this,"options");A(this,"patch");A(this,"all");A(this,"on");A(this,"use");A(this,"router");A(this,"getPath");A(this,"_basePath","/");C(this,$,"/");A(this,"routes",[]);C(this,F,ua);A(this,"errorHandler",pt);A(this,"onError",t=>(this.errorHandler=t,this));A(this,"notFound",t=>(E(this,F,t),this));A(this,"fetch",(t,...a)=>_(this,q,Fe).call(this,t,a[1],a[0],t.method));A(this,"request",(t,a,n,s)=>t instanceof Request?this.fetch(a?new Request(t,a):t,n,s):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${xe("/",t)}`,a),n,s)));A(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(_(this,q,Fe).call(this,t.request,t,void 0,t.request.method))})});[...ca,la].forEach(i=>{this[i]=(o,...r)=>(typeof o=="string"?E(this,$,o):_(this,q,ue).call(this,i,m(this,$),o),r.forEach(u=>{_(this,q,ue).call(this,i,m(this,$),u)}),this)}),this.on=(i,o,...r)=>{for(const u of[o].flat()){E(this,$,u);for(const l of[i].flat())r.map(d=>{_(this,q,ue).call(this,l.toUpperCase(),m(this,$),d)})}return this},this.use=(i,...o)=>(typeof i=="string"?E(this,$,i):(E(this,$,"*"),o.unshift(i)),o.forEach(r=>{_(this,q,ue).call(this,O,m(this,$),r)}),this);const{strict:n,...s}=t;Object.assign(this,s),this.getPath=n??!0?t.getPath??wt:sa}route(t,a){const n=this.basePath(t);return a.routes.map(s=>{var o;let i;a.errorHandler===pt?i=s.handler:(i=async(r,u)=>(await lt([],a.errorHandler)(r,()=>s.handler(r,u))).res,i[pa]=s.handler),_(o=n,q,ue).call(o,s.method,s.path,i)}),this}basePath(t){const a=_(this,q,Rt).call(this);return a._basePath=xe(this._basePath,t),a}mount(t,a,n){let s,i;n&&(typeof n=="function"?i=n:(i=n.optionHandler,n.replaceRequest===!1?s=u=>u:s=n.replaceRequest));const o=i?u=>{const l=i(u);return Array.isArray(l)?l:[l]}:u=>{let l;try{l=u.executionCtx}catch{}return[u.env,l]};s||(s=(()=>{const u=xe(this._basePath,t),l=u==="/"?0:u.length;return d=>{const y=new URL(d.url);return y.pathname=y.pathname.slice(l)||"/",new Request(y,d)}})());const r=async(u,l)=>{const d=await a(s(u.req.raw),...o(u));if(d)return d;await l()};return _(this,q,ue).call(this,O,xe(t,"*"),r),this}},$=new WeakMap,q=new WeakSet,Rt=function(){const t=new Pe({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,E(t,F,m(this,F)),t.routes=this.routes,t},F=new WeakMap,ue=function(t,a,n){t=t.toUpperCase(),a=xe(this._basePath,a);const s={basePath:this._basePath,path:a,method:t,handler:n};this.router.add(t,a,[n,s]),this.routes.push(s)},$e=function(t,a){if(t instanceof Error)return this.errorHandler(t,a);throw t},Fe=function(t,a,n,s){if(s==="HEAD")return(async()=>new Response(null,await _(this,q,Fe).call(this,t,a,n,"GET")))();const i=this.getPath(t,{env:n}),o=this.router.match(s,i),r=new da(t,{path:i,matchResult:o,env:n,executionCtx:a,notFoundHandler:m(this,F)});if(o[0].length===1){let l;try{l=o[0][0][0][0](r,async()=>{r.res=await m(this,F).call(this,r)})}catch(d){return _(this,q,$e).call(this,d,r)}return l instanceof Promise?l.then(d=>d||(r.finalized?r.res:m(this,F).call(this,r))).catch(d=>_(this,q,$e).call(this,d,r)):l??m(this,F).call(this,r)}const u=lt(o[0],this.errorHandler,m(this,F));return(async()=>{try{const l=await u(r);if(!l.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return l.res}catch(l){return _(this,q,$e).call(this,l,r)}})()},Pe),Dt=[];function ma(e,t){const a=this.buildAllMatchers(),n=((s,i)=>{const o=a[s]||a[O],r=o[2][i];if(r)return r;const u=i.match(o[0]);if(!u)return[[],Dt];const l=u.indexOf("",1);return[o[1][l],u]});return this.match=n,n(e,t)}var Ye="[^/]+",Le=".*",Oe="(?:|/.*)",Se=Symbol(),ga=new Set(".\\+*[^]$()");function ba(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===Le||e===Oe?1:t===Le||t===Oe?-1:e===Ye?1:t===Ye?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var ge,be,G,ye,ha=(ye=class{constructor(){C(this,ge);C(this,be);C(this,G,Object.create(null))}insert(t,a,n,s,i){if(t.length===0){if(m(this,ge)!==void 0)throw Se;if(i)return;E(this,ge,a);return}const[o,...r]=t,u=o==="*"?r.length===0?["","",Le]:["","",Ye]:o==="/*"?["","",Oe]:o.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let l;if(u){const d=u[1];let y=u[2]||Ye;if(d&&u[2]&&(y===".*"||(y=y.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(y))))throw Se;if(l=m(this,G)[y],!l){if(Object.keys(m(this,G)).some(f=>f!==Le&&f!==Oe))throw Se;if(i)return;l=m(this,G)[y]=new ye,d!==""&&E(l,be,s.varIndex++)}!i&&d!==""&&n.push([d,m(l,be)])}else if(l=m(this,G)[o],!l){if(Object.keys(m(this,G)).some(d=>d.length>1&&d!==Le&&d!==Oe))throw Se;if(i)return;l=m(this,G)[o]=new ye}l.insert(r,a,n,s,i)}buildRegExpStr(){const a=Object.keys(m(this,G)).sort(ba).map(n=>{const s=m(this,G)[n];return(typeof m(s,be)=="number"?`(${n})@${m(s,be)}`:ga.has(n)?`\\${n}`:n)+s.buildRegExpStr()});return typeof m(this,ge)=="number"&&a.unshift(`#${m(this,ge)}`),a.length===0?"":a.length===1?a[0]:"(?:"+a.join("|")+")"}},ge=new WeakMap,be=new WeakMap,G=new WeakMap,ye),Ve,Ue,bt,va=(bt=class{constructor(){C(this,Ve,{varIndex:0});C(this,Ue,new ha)}insert(e,t,a){const n=[],s=[];for(let o=0;;){let r=!1;if(e=e.replace(/\{[^}]+\}/g,u=>{const l=`@\\${o}`;return s[o]=[l,u],o++,r=!0,l}),!r)break}const i=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let o=s.length-1;o>=0;o--){const[r]=s[o];for(let u=i.length-1;u>=0;u--)if(i[u].indexOf(r)!==-1){i[u]=i[u].replace(r,s[o][1]);break}}return m(this,Ue).insert(i,t,n,m(this,Ve),a),n}buildRegExp(){let e=m(this,Ue).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const a=[],n=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(s,i,o)=>i!==void 0?(a[++t]=Number(i),"$()"):(o!==void 0&&(n[Number(o)]=++t),"")),[new RegExp(`^${e}`),a,n]}},Ve=new WeakMap,Ue=new WeakMap,bt),ya=[/^$/,[],Object.create(null)],Ge=Object.create(null);function Nt(e){return Ge[e]??(Ge[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,a)=>a?`\\${a}`:"(?:|/.*)")}$`))}function ka(){Ge=Object.create(null)}function xa(e){var l;const t=new va,a=[];if(e.length===0)return ya;const n=e.map(d=>[!/\*|\/:/.test(d[0]),...d]).sort(([d,y],[f,b])=>d?1:f?-1:y.length-b.length),s=Object.create(null);for(let d=0,y=-1,f=n.length;d<f;d++){const[b,g,p]=n[d];b?s[g]=[p.map(([v])=>[v,Object.create(null)]),Dt]:y++;let w;try{w=t.insert(g,y,b)}catch(v){throw v===Se?new Bt(g):v}b||(a[y]=p.map(([v,c])=>{const k=Object.create(null);for(c-=1;c>=0;c--){const[h,T]=w[c];k[h]=T}return[v,k]}))}const[i,o,r]=t.buildRegExp();for(let d=0,y=a.length;d<y;d++)for(let f=0,b=a[d].length;f<b;f++){const g=(l=a[d][f])==null?void 0:l[1];if(!g)continue;const p=Object.keys(g);for(let w=0,v=p.length;w<v;w++)g[p[w]]=r[g[p[w]]]}const u=[];for(const d in o)u[d]=a[o[d]];return[i,u,s]}function ke(e,t){if(e){for(const a of Object.keys(e).sort((n,s)=>s.length-n.length))if(Nt(a).test(t))return[...e[a]]}}var re,oe,We,Lt,ht,wa=(ht=class{constructor(){C(this,We);A(this,"name","RegExpRouter");C(this,re);C(this,oe);A(this,"match",ma);E(this,re,{[O]:Object.create(null)}),E(this,oe,{[O]:Object.create(null)})}add(e,t,a){var r;const n=m(this,re),s=m(this,oe);if(!n||!s)throw new Error(_t);n[e]||[n,s].forEach(u=>{u[e]=Object.create(null),Object.keys(u[O]).forEach(l=>{u[e][l]=[...u[O][l]]})}),t==="/*"&&(t="*");const i=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const u=Nt(t);e===O?Object.keys(n).forEach(l=>{var d;(d=n[l])[t]||(d[t]=ke(n[l],t)||ke(n[O],t)||[])}):(r=n[e])[t]||(r[t]=ke(n[e],t)||ke(n[O],t)||[]),Object.keys(n).forEach(l=>{(e===O||e===l)&&Object.keys(n[l]).forEach(d=>{u.test(d)&&n[l][d].push([a,i])})}),Object.keys(s).forEach(l=>{(e===O||e===l)&&Object.keys(s[l]).forEach(d=>u.test(d)&&s[l][d].push([a,i]))});return}const o=St(t)||[t];for(let u=0,l=o.length;u<l;u++){const d=o[u];Object.keys(s).forEach(y=>{var f;(e===O||e===y)&&((f=s[y])[d]||(f[d]=[...ke(n[y],d)||ke(n[O],d)||[]]),s[y][d].push([a,i-l+u+1]))})}}buildAllMatchers(){const e=Object.create(null);return Object.keys(m(this,oe)).concat(Object.keys(m(this,re))).forEach(t=>{e[t]||(e[t]=_(this,We,Lt).call(this,t))}),E(this,re,E(this,oe,void 0)),ka(),e}},re=new WeakMap,oe=new WeakMap,We=new WeakSet,Lt=function(e){const t=[];let a=e===O;return[m(this,re),m(this,oe)].forEach(n=>{const s=n[e]?Object.keys(n[e]).map(i=>[i,n[e][i]]):[];s.length!==0?(a||(a=!0),t.push(...s)):e!==O&&t.push(...Object.keys(n[O]).map(i=>[i,n[O][i]]))}),a?xa(t):null},ht),de,te,vt,Sa=(vt=class{constructor(e){A(this,"name","SmartRouter");C(this,de,[]);C(this,te,[]);E(this,de,e.routers)}add(e,t,a){if(!m(this,te))throw new Error(_t);m(this,te).push([e,t,a])}match(e,t){if(!m(this,te))throw new Error("Fatal error");const a=m(this,de),n=m(this,te),s=a.length;let i=0,o;for(;i<s;i++){const r=a[i];try{for(let u=0,l=n.length;u<l;u++)r.add(...n[u]);o=r.match(e,t)}catch(u){if(u instanceof Bt)continue;throw u}this.match=r.match.bind(r),E(this,de,[r]),E(this,te,void 0);break}if(i===s)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,o}get activeRouter(){if(m(this,te)||m(this,de).length!==1)throw new Error("No active router has been determined yet.");return m(this,de)[0]}},de=new WeakMap,te=new WeakMap,vt),Ne=Object.create(null),Ta=e=>{for(const t in e)return!0;return!1},le,H,he,Ce,M,ae,fe,_e,Ia=(_e=class{constructor(t,a,n){C(this,ae);C(this,le);C(this,H);C(this,he);C(this,Ce,0);C(this,M,Ne);if(E(this,H,n||Object.create(null)),E(this,le,[]),t&&a){const s=Object.create(null);s[t]={handler:a,possibleKeys:[],score:0},E(this,le,[s])}E(this,he,[])}insert(t,a,n){E(this,Ce,++dt(this,Ce)._);let s=this;const i=Zt(a),o=[];for(let r=0,u=i.length;r<u;r++){const l=i[r],d=i[r+1],y=aa(l,d),f=Array.isArray(y)?y[0]:l;if(f in m(s,H)){s=m(s,H)[f],y&&o.push(y[1]);continue}m(s,H)[f]=new _e,y&&(m(s,he).push(y),o.push(y[1])),s=m(s,H)[f]}return m(s,le).push({[t]:{handler:n,possibleKeys:o.filter((r,u,l)=>l.indexOf(r)===u),score:m(this,Ce)}}),s}search(t,a){var d;const n=[];E(this,M,Ne);let i=[this];const o=kt(a),r=[],u=o.length;let l=null;for(let y=0;y<u;y++){const f=o[y],b=y===u-1,g=[];for(let w=0,v=i.length;w<v;w++){const c=i[w],k=m(c,H)[f];k&&(E(k,M,m(c,M)),b?(m(k,H)["*"]&&_(this,ae,fe).call(this,n,m(k,H)["*"],t,m(c,M)),_(this,ae,fe).call(this,n,k,t,m(c,M))):g.push(k));for(let h=0,T=m(c,he).length;h<T;h++){const S=m(c,he)[h],x=m(c,M)===Ne?{}:{...m(c,M)};if(S==="*"){const L=m(c,H)["*"];L&&(_(this,ae,fe).call(this,n,L,t,m(c,M)),E(L,M,x),g.push(L));continue}const[R,D,N]=S;if(!f&&!(N instanceof RegExp))continue;const P=m(c,H)[R];if(N instanceof RegExp){if(l===null){l=new Array(u);let W=a[0]==="/"?1:0;for(let Re=0;Re<u;Re++)l[Re]=W,W+=o[Re].length+1}const L=a.substring(l[y]),V=N.exec(L);if(V){if(x[D]=V[0],_(this,ae,fe).call(this,n,P,t,m(c,M),x),Ta(m(P,H))){E(P,M,x);const W=((d=V[0].match(/\//))==null?void 0:d.length)??0;(r[W]||(r[W]=[])).push(P)}continue}}(N===!0||N.test(f))&&(x[D]=f,b?(_(this,ae,fe).call(this,n,P,t,x,m(c,M)),m(P,H)["*"]&&_(this,ae,fe).call(this,n,m(P,H)["*"],t,x,m(c,M))):(E(P,M,x),g.push(P)))}}const p=r.shift();i=p?g.concat(p):g}return n.length>1&&n.sort((y,f)=>y.score-f.score),[n.map(({handler:y,params:f})=>[y,f])]}},le=new WeakMap,H=new WeakMap,he=new WeakMap,Ce=new WeakMap,M=new WeakMap,ae=new WeakSet,fe=function(t,a,n,s,i){for(let o=0,r=m(a,le).length;o<r;o++){const u=m(a,le)[o],l=u[n]||u[O],d={};if(l!==void 0&&(l.params=Object.create(null),t.push(l),s!==Ne||i&&i!==Ne))for(let y=0,f=l.possibleKeys.length;y<f;y++){const b=l.possibleKeys[y],g=d[l.score];l.params[b]=i!=null&&i[b]&&!g?i[b]:s[b]??(i==null?void 0:i[b]),d[l.score]=!0}}},_e),ve,yt,Ea=(yt=class{constructor(){A(this,"name","TrieRouter");C(this,ve);E(this,ve,new Ia)}add(e,t,a){const n=St(t);if(n){for(let s=0,i=n.length;s<i;s++)m(this,ve).insert(e,n[s],a);return}m(this,ve).insert(e,t,a)}match(e,t){return m(this,ve).search(e,t)}},ve=new WeakMap,yt),Ot=class extends fa{constructor(e={}){super(e),this.router=e.router??new Sa({routers:[new wa,new Ea]})}},Aa=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i,ut=(e,t=Ca)=>{const a=/\.([a-zA-Z0-9]+?)$/,n=e.match(a);if(!n)return;let s=t[n[1].toLowerCase()];return s&&s.startsWith("text")&&(s+="; charset=utf-8"),s},Pa={aac:"audio/aac",avi:"video/x-msvideo",avif:"image/avif",av1:"video/av1",bin:"application/octet-stream",bmp:"image/bmp",css:"text/css",csv:"text/csv",eot:"application/vnd.ms-fontobject",epub:"application/epub+zip",gif:"image/gif",gz:"application/gzip",htm:"text/html",html:"text/html",ico:"image/x-icon",ics:"text/calendar",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",jsonld:"application/ld+json",map:"application/json",mid:"audio/x-midi",midi:"audio/x-midi",mjs:"text/javascript",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",oga:"audio/ogg",ogv:"video/ogg",ogx:"application/ogg",opus:"audio/opus",otf:"font/otf",pdf:"application/pdf",png:"image/png",rtf:"application/rtf",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",ttf:"font/ttf",txt:"text/plain",wasm:"application/wasm",webm:"video/webm",weba:"audio/webm",webmanifest:"application/manifest+json",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",xhtml:"application/xhtml+xml",xml:"application/xml",zip:"application/zip","3gp":"video/3gpp","3g2":"video/3gpp2",gltf:"model/gltf+json",glb:"model/gltf-binary"},Ca=Pa,_a=(...e)=>{let t=e.filter(s=>s!=="").join("/");t=t.replace(new RegExp("(?<=\\/)\\/+","g"),"");const a=t.split("/"),n=[];for(const s of a)s===".."&&n.length>0&&n.at(-1)!==".."?n.pop():s!=="."&&n.push(s);return n.join("/")||"."},qt={br:".br",zstd:".zst",gzip:".gz"},Ba=Object.keys(qt),Ra="index.html",Da=e=>{const t=e.root??"./",a=e.path,n=e.join??_a;return async(s,i)=>{var d,y,f,b;if(s.finalized)return i();let o;if(e.path)o=e.path;else try{if(o=xt(s.req.path),/(?:^|[\/\\])\.{1,2}(?:$|[\/\\])|[\/\\]{2,}/.test(o))throw new Error}catch{return await((d=e.onNotFound)==null?void 0:d.call(e,s.req.path,s)),i()}let r=n(t,!a&&e.rewriteRequestPath?e.rewriteRequestPath(o):o);e.isDir&&await e.isDir(r)&&(r=n(r,Ra));const u=e.getContent;let l=await u(r,s);if(l instanceof Response)return s.newResponse(l.body,l);if(l){const g=e.mimes&&ut(r,e.mimes)||ut(r);if(s.header("Content-Type",g||"application/octet-stream"),e.precompressed&&(!g||Aa.test(g))){const p=new Set((y=s.req.header("Accept-Encoding"))==null?void 0:y.split(",").map(w=>w.trim()));for(const w of Ba){if(!p.has(w))continue;const v=await u(r+qt[w],s);if(v){l=v,s.header("Content-Encoding",w),s.header("Vary","Accept-Encoding",{append:!0});break}}}return await((f=e.onFound)==null?void 0:f.call(e,r,s)),s.body(l)}await((b=e.onNotFound)==null?void 0:b.call(e,r,s)),await i()}},Na=async(e,t)=>{let a;t&&t.manifest?typeof t.manifest=="string"?a=JSON.parse(t.manifest):a=t.manifest:typeof __STATIC_CONTENT_MANIFEST=="string"?a=JSON.parse(__STATIC_CONTENT_MANIFEST):a=__STATIC_CONTENT_MANIFEST;let n;t&&t.namespace?n=t.namespace:n=__STATIC_CONTENT;const s=a[e];if(!s)return null;const i=await n.get(s,{type:"stream"});return i||null},La=e=>async function(a,n){return Da({...e,getContent:async i=>Na(i,{manifest:e.manifest,namespace:e.namespace?e.namespace:a.env?a.env.__STATIC_CONTENT:void 0})})(a,n)},Oa=e=>La(e);function qa(){return`<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>LPD Seminyak – API Explorer</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css"/>
<style>
:root{
  --bg:#fafafa;--sidebar:#1a1f2e;--primary:#1d4ed8;--primary-dark:#1e40af;
  --green:#16a34a;--yellow:#d97706;--red:#dc2626;--purple:#7c3aed;--cyan:#0891b2;
  --border:#e5e7eb;--text:#111827;--muted:#6b7280;--code-bg:#0f172a;
}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',system-ui,sans-serif;background:var(--bg);color:var(--text);font-size:14px}

/* TOP NAV */
#topnav{position:sticky;top:0;z-index:200;background:var(--sidebar);color:#fff;
  display:flex;align-items:center;padding:0 20px;height:52px;gap:16px;box-shadow:0 2px 8px rgba(0,0,0,.4)}
#topnav .logo{font-weight:800;font-size:16px;color:#fff;display:flex;align-items:center;gap:8px}
#topnav .logo span{color:#60a5fa}
#topnav .tagline{font-size:11px;color:#94a3b8;border-left:1px solid #334155;padding-left:16px}
#topnav .nav-links{margin-left:auto;display:flex;gap:4px}
#topnav .nav-links a{color:#94a3b8;text-decoration:none;padding:6px 12px;border-radius:6px;font-size:12px;font-weight:600;transition:.15s}
#topnav .nav-links a:hover{background:rgba(255,255,255,.1);color:#fff}
#base-url-bar{background:#1e293b;border-bottom:1px solid #334155;padding:8px 20px;display:flex;align-items:center;gap:10px;font-size:12px}
#base-url-bar label{color:#94a3b8;font-weight:600;white-space:nowrap}
#base-url-input{flex:1;max-width:480px;background:#0f172a;border:1px solid #334155;color:#e2e8f0;
  padding:6px 12px;border-radius:6px;font-family:monospace;font-size:12px;outline:none}
#base-url-input:focus{border-color:#3b82f6}
.url-badge{background:#065f46;color:#d1fae5;font-size:10px;font-weight:700;padding:2px 8px;border-radius:4px}

/* TOKEN TOOLBAR */
#token-toolbar{background:#0f172a;border-bottom:2px solid #1e293b;padding:8px 20px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;font-size:12px}
#token-toolbar .tt-label{color:#64748b;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:.6px;white-space:nowrap}
.token-badge{display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:6px;font-size:11px;font-weight:700;font-family:monospace;background:#1e293b;color:#64748b;border:1px solid #334155;min-width:180px;transition:.2s}
.auto-token-btn{display:inline-flex;align-items:center;gap:6px;padding:5px 14px;border-radius:6px;font-size:11px;font-weight:700;cursor:pointer;border:none;transition:.15s}
.auto-token-btn.snap-btn{background:linear-gradient(135deg,#7c3aed,#5b21b6);color:#fff}
.auto-token-btn.snap-btn:hover{background:linear-gradient(135deg,#8b5cf6,#6d28d9);transform:translateY(-1px)}
.auto-token-btn.ios-btn{background:linear-gradient(135deg,#059669,#065f46);color:#fff}
.auto-token-btn.ios-btn:hover{background:linear-gradient(135deg,#10b981,#047857);transform:translateY(-1px)}
.auto-token-btn:disabled{opacity:.5;cursor:not-allowed;transform:none!important}
.xfwd-toggle{display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:6px;background:#1e293b;border:1px solid #334155;color:#94a3b8;font-size:11px;cursor:pointer;user-select:none;transition:.15s;white-space:nowrap}
.xfwd-toggle:hover{border-color:#f59e0b;color:#fbbf24}
.xfwd-toggle input[type=checkbox]{accent-color:#f59e0b;width:13px;height:13px;cursor:pointer}
.xfwd-toggle.active{border-color:#f59e0b;background:rgba(245,158,11,.08);color:#fbbf24}
.tt-sep{width:1px;height:24px;background:#1e293b;flex-shrink:0}

/* LAYOUT */
#layout{display:flex;min-height:calc(100vh - 128px)}
#sidebar{width:260px;flex-shrink:0;background:#fff;border-right:1px solid var(--border);
  position:sticky;top:128px;height:calc(100vh - 128px);overflow-y:auto}
#main-content{flex:1;padding:24px;max-width:960px}

/* SIDEBAR */
.sb-section{padding:10px 16px 4px;font-size:10px;font-weight:700;text-transform:uppercase;
  letter-spacing:1px;color:var(--muted)}
.sb-item{display:flex;align-items:center;gap:8px;padding:7px 16px;cursor:pointer;
  font-size:12px;color:var(--muted);transition:.15s;border-left:3px solid transparent;
  text-decoration:none}
.sb-item:hover{background:#f3f4f6;color:var(--text)}
.sb-item.active{background:#eff6ff;color:var(--primary);border-left-color:var(--primary);font-weight:600}
.method-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.dot-post{background:var(--yellow)}.dot-get{background:var(--green)}

/* TAG GROUP */
.tag-group{margin-bottom:32px}
.tag-header{display:flex;align-items:center;gap:10px;padding:12px 0;border-bottom:2px solid var(--border);margin-bottom:16px;cursor:pointer}
.tag-header h2{font-size:18px;font-weight:800;color:var(--text)}
.tag-desc{font-size:13px;color:var(--muted);margin-top:2px}
.tag-count{background:#f3f4f6;color:var(--muted);font-size:11px;font-weight:700;
  padding:2px 8px;border-radius:999px;margin-left:auto}

/* ENDPOINT CARD */
.ep-card{border:1px solid var(--border);border-radius:10px;margin-bottom:12px;
  overflow:hidden;transition:box-shadow .2s}
.ep-card:hover{box-shadow:0 2px 12px rgba(0,0,0,.08)}
.ep-card.open{border-color:#93c5fd;box-shadow:0 0 0 1px #93c5fd}
.ep-header{display:flex;align-items:center;gap:12px;padding:14px 16px;
  cursor:pointer;background:#fff;user-select:none;transition:background .15s}
.ep-header:hover{background:#f8fafc}
.method-badge{font-size:11px;font-weight:700;padding:4px 10px;border-radius:5px;
  min-width:56px;text-align:center;letter-spacing:.5px}
.mb-post{background:#fef3c7;color:#92400e}
.mb-get{background:#d1fae5;color:#065f46}
.ep-path{font-family:'Courier New',monospace;font-size:13px;font-weight:600;color:var(--primary)}
.ep-summary{font-size:12px;color:var(--muted);margin-left:4px}
.ep-chevron{margin-left:auto;color:var(--muted);transition:transform .2s;font-size:12px}
.ep-card.open .ep-chevron{transform:rotate(180deg)}
.ep-body{display:none;border-top:1px solid var(--border);background:#fff}
.ep-card.open .ep-body{display:block}

/* EP BODY TABS */
.ep-tabs{display:flex;gap:0;border-bottom:1px solid var(--border);padding:0 16px}
.ep-tab{padding:10px 16px;font-size:12px;font-weight:600;cursor:pointer;
  color:var(--muted);border-bottom:2px solid transparent;margin-bottom:-1px;transition:.15s}
.ep-tab.active{color:var(--primary);border-bottom-color:var(--primary)}
.ep-pane{display:none;padding:16px}
.ep-pane.active{display:block}

/* PARAMETERS TABLE */
.param-table{width:100%;border-collapse:collapse;font-size:12px;margin-bottom:12px}
.param-table th{background:#f8fafc;padding:8px 12px;text-align:left;font-weight:700;
  color:#374151;border-bottom:2px solid var(--border);font-size:11px;text-transform:uppercase;letter-spacing:.5px}
.param-table td{padding:8px 12px;border-bottom:1px solid #f3f4f6;vertical-align:top}
.param-table tr:last-child td{border-bottom:none}
.param-name{font-family:monospace;font-weight:700;color:#1e40af}
.param-type{font-size:10px;color:#7c3aed;background:#f3e8ff;padding:1px 6px;border-radius:3px;font-weight:600}
.param-in{font-size:10px;color:var(--muted);background:#f3f4f6;padding:1px 6px;border-radius:3px}
.param-req{font-size:10px;color:#dc2626;background:#fee2e2;padding:1px 6px;border-radius:3px;font-weight:700}
.param-opt{font-size:10px;color:#6b7280;background:#f3f4f6;padding:1px 6px;border-radius:3px}

/* TRY IT OUT */
.try-panel{background:#f8fafc;border-radius:8px;padding:16px;border:1px solid #e2e8f0}
.try-label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--muted);margin-bottom:6px}
.try-row{margin-bottom:12px}
.try-input{width:100%;padding:8px 10px;border:1px solid #d1d5db;border-radius:6px;
  font-family:monospace;font-size:12px;background:#fff;outline:none;transition:.15s}
.try-input:focus{border-color:var(--primary);box-shadow:0 0 0 2px #dbeafe}
.try-textarea{min-height:100px;resize:vertical}
.try-btn{background:var(--primary);color:#fff;border:none;padding:9px 20px;
  border-radius:6px;font-size:13px;font-weight:600;cursor:pointer;transition:.15s;
  display:flex;align-items:center;gap:6px}
.try-btn:hover{background:var(--primary-dark)}
.try-btn:disabled{opacity:.5;cursor:not-allowed}
.try-btn.loading .fa-play{display:none}
.try-clear{background:#f3f4f6;color:var(--muted);border:1px solid #d1d5db;
  padding:9px 16px;border-radius:6px;font-size:12px;cursor:pointer;transition:.15s;margin-left:8px}
.try-clear:hover{background:#e5e7eb}
.response-box{margin-top:14px;border-radius:8px;overflow:hidden;border:1px solid var(--border)}
.response-status{display:flex;align-items:center;gap:8px;padding:8px 14px;background:#1e293b;font-size:12px}
.status-code{font-family:monospace;font-weight:700;font-size:14px}
.status-2xx{color:#4ade80}.status-4xx{color:#fbbf24}.status-5xx{color:#f87171}
.response-time{color:#64748b;font-size:11px;margin-left:auto}
.response-body{background:var(--code-bg);color:#e2e8f0;padding:14px;
  font-family:'Courier New',monospace;font-size:12px;line-height:1.7;
  overflow-x:auto;max-height:420px;overflow-y:auto;white-space:pre;word-break:break-all}

/* CODE BLOCK */
pre.code-block{background:var(--code-bg);color:#e2e8f0;padding:14px 16px;border-radius:8px;
  font-size:12px;line-height:1.7;overflow-x:auto;margin:8px 0;white-space:pre}
.hl-key{color:#7dd3fc}.hl-str{color:#86efac}.hl-num{color:#fda4af}.hl-bool{color:#c4b5fd}

/* MIDDLEWARE BADGES */
.mw-badge{display:inline-flex;align-items:center;gap:4px;background:#1e293b;
  color:#94a3b8;font-size:10px;padding:3px 8px;border-radius:4px;margin:2px;font-family:monospace}
.mw-badge i{font-size:9px}

/* INFO BOX */
.info-box{padding:10px 14px;border-radius:6px;font-size:12px;margin:8px 0;display:flex;gap:8px}
.ib-blue{background:#eff6ff;border-left:3px solid #3b82f6;color:#1e40af}
.ib-yellow{background:#fffbeb;border-left:3px solid #f59e0b;color:#92400e}
.ib-red{background:#fef2f2;border-left:3px solid #ef4444;color:#991b1b}
.ib-green{background:#f0fdf4;border-left:3px solid #22c55e;color:#15803d}

/* SCHEMA */
.schema-obj{background:#0f172a;border-radius:8px;padding:14px;font-family:monospace;
  font-size:12px;line-height:1.8;color:#e2e8f0;margin:8px 0;overflow-x:auto}

/* RESPONSIVE */
@media(max-width:768px){
  #sidebar{display:none}
  #main-content{padding:12px}
  #layout{flex-direction:column}
}

/* JSON SYNTAX HIGHLIGHT */
.jk{color:#7dd3fc}.js{color:#86efac}.jn{color:#fda4af}.jb{color:#c4b5fd}.jnull{color:#94a3b8}

/* Spinner */
.spinner{display:inline-block;width:14px;height:14px;border:2px solid rgba(255,255,255,.3);
  border-top-color:#fff;border-radius:50%;animation:spin .6s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}

/* Token detail panel slide-in */
#token-detail-panel{transition:transform .25s ease,opacity .25s ease}
#token-detail-panel::-webkit-scrollbar{width:4px}
#token-detail-panel::-webkit-scrollbar-thumb{background:#1e293b;border-radius:4px}

/* SNAP client key input */
#snap-client-key{transition:border-color .15s}
#snap-client-key:focus{border-color:#7c3aed !important;box-shadow:0 0 0 2px rgba(124,58,237,.2)}
</style>
</head>
<body>

<!-- TOP NAV -->
<nav id="topnav">
  <div class="logo"><i class="fas fa-university" style="color:#60a5fa"></i><span>LPD</span> Seminyak <span style="font-weight:300;color:#94a3b8">API Explorer</span></div>
  <div class="tagline">Laravel 5.5 · PHP 7.4 · SQL Server</div>
  <div class="nav-links">
    <a href="/docs"><i class="fas fa-book mr-1"></i>Docs</a>
    <a href="/swagger" style="color:#60a5fa;background:rgba(96,165,250,.1)"><i class="fas fa-flask mr-1"></i>Explorer</a>
  </div>
</nav>

<!-- BASE URL BAR -->
<div id="base-url-bar">
  <label><i class="fas fa-server" style="margin-right:4px"></i>Base URL:</label>
  <input id="base-url-input" type="text" value="https://lpdseminyak.biz.id:8000" placeholder="https://your-api-host.com"/>
  <span class="url-badge">LIVE</span>
  <div style="width:1px;height:24px;background:#334155;flex-shrink:0;margin:0 6px"></div>
  <label style="color:#94a3b8;font-size:11px;font-weight:600;white-space:nowrap"><i class="fas fa-id-card" style="margin-right:4px;color:#7c3aed"></i>X-CLIENT-KEY:</label>
  <input id="snap-client-key" type="text" value="LPD-SEMINYAK-001"
    style="background:#0f172a;border:1px solid #334155;color:#c4b5fd;padding:5px 10px;border-radius:5px;font-family:monospace;font-size:11px;width:160px;outline:none"
    placeholder="LPD-SEMINYAK-001"
    title="X-CLIENT-KEY untuk SNAP B2B Token (partner ID yang terdaftar di BPD)"/>
  <span style="color:#64748b;font-size:10px;margin-left:4px">SNAP</span>
</div>

<!-- TOKEN TOOLBAR -->
<div id="token-toolbar">
  <span class="tt-label"><i class="fas fa-key" style="margin-right:4px;color:#f59e0b"></i>Auth Tokens</span>
  <div class="tt-sep"></div>

  <!-- SNAP Token -->
  <button id="btn-snap-token" class="auto-token-btn snap-btn" onclick="autoToken('snap')">
    <i class="fas fa-bolt"></i> Auto Token SNAP
  </button>
  <span id="snap-token-badge" class="token-badge">
    <i class="fas fa-circle" style="font-size:7px;color:#475569"></i>
    <span>SNAP – Belum ada token</span>
  </span>

  <div class="tt-sep"></div>

  <!-- iOS Token -->
  <button id="btn-ios-token" class="auto-token-btn ios-btn" onclick="autoToken('ios')">
    <i class="fas fa-mobile-alt"></i> Auto Token iOS
  </button>
  <span id="ios-token-badge" class="token-badge">
    <i class="fas fa-circle" style="font-size:7px;color:#475569"></i>
    <span>iOS – Belum ada token</span>
  </span>

  <div class="tt-sep"></div>

  <!-- X-Forwarded-For Toggle -->
  <label class="xfwd-toggle active" id="xfwd-label" onclick="toggleXFwd(this)">
    <input type="checkbox" id="chk-xforward" checked onchange="updateXFwdStyle()"/>
    <i class="fas fa-shield-alt" style="color:#f59e0b"></i>
    X-Forwarded-For: <code style="color:#fbbf24;margin-left:2px">34.50.74.78</code>
  </label>

  <span style="color:#334155;font-size:10px;margin-left:4px">· IP whitelist otomatis diinjeksi ke setiap request</span>
</div>

<div id="layout">

<!-- SIDEBAR -->
<aside id="sidebar">
  <div class="sb-section">SNAP · BPD</div>
  <a class="sb-item" href="#" onclick="scrollTo('grp-snap');return false"><span class="method-dot dot-post"></span>SNAP Token B2B</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-snap');return false"><span class="method-dot dot-post"></span>Transfer VA Inquiry</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-snap');return false"><span class="method-dot dot-post"></span>Transfer VA Payment</a>
  <div class="sb-section">Mobile Banking</div>
  <a class="sb-item" href="#" onclick="scrollTo('grp-auth');return false"><span class="method-dot dot-post"></span>Get Token</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-auth');return false"><span class="method-dot dot-post"></span>Register</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-auth');return false"><span class="method-dot dot-post"></span>Login</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-auth');return false"><span class="method-dot dot-post"></span>Logout</a>
  <div class="sb-section">Tabungan</div>
  <a class="sb-item" href="#" onclick="scrollTo('grp-tabungan');return false"><span class="method-dot dot-post"></span>Account List</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-tabungan');return false"><span class="method-dot dot-post"></span>Transaction History</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-tabungan');return false"><span class="method-dot dot-post"></span>Mutasi History</a>
  <div class="sb-section">Transfer</div>
  <a class="sb-item" href="#" onclick="scrollTo('grp-transfer');return false"><span class="method-dot dot-post"></span>LPD Check</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-transfer');return false"><span class="method-dot dot-post"></span>LPD Inquiry</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-transfer');return false"><span class="method-dot dot-post"></span>LPD Posting</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-transfer');return false"><span class="method-dot dot-post"></span>Bank Check</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-transfer');return false"><span class="method-dot dot-post"></span>Bank Inquiry</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-transfer');return false"><span class="method-dot dot-post"></span>Bank Posting</a>
  <div class="sb-section">PPOB · IAK</div>
  <a class="sb-item" href="#" onclick="scrollTo('grp-ppob');return false"><span class="method-dot dot-post"></span>PPOB Check</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-ppob');return false"><span class="method-dot dot-post"></span>PPOB Request</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-ppob');return false"><span class="method-dot dot-post"></span>IAK Check</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-ppob');return false"><span class="method-dot dot-post"></span>IAK Request</a>
  <div class="sb-section">ATM Cardless</div>
  <a class="sb-item" href="#" onclick="scrollTo('grp-atm');return false"><span class="method-dot dot-post"></span>Create Token</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-atm');return false"><span class="method-dot dot-post"></span>Get Token</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-atm');return false"><span class="method-dot dot-post"></span>Check Balance</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-atm');return false"><span class="method-dot dot-post"></span>Cash Debit</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-atm');return false"><span class="method-dot dot-post"></span>Cash Credit</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-atm');return false"><span class="method-dot dot-post"></span>Reversal Debit</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-atm');return false"><span class="method-dot dot-post"></span>Reversal Credit</a>
  <div class="sb-section">Callback</div>
  <a class="sb-item" href="#" onclick="scrollTo('grp-ppob-cb');return false"><span class="method-dot dot-post"></span>PPOB Callback</a>
</aside>

<!-- MAIN CONTENT -->
<main id="main-content">

<!-- ═══════════════════════════════════════════════════ -->
<!-- GROUP: SNAP -->
<!-- ═══════════════════════════════════════════════════ -->
<div class="tag-group" id="grp-snap">
  <div class="tag-header" onclick="toggleGroup('grp-snap')">
    <i class="fas fa-plug" style="color:#7c3aed;font-size:18px"></i>
    <div>
      <h2>SNAP – Transfer VA BPD</h2>
      <div class="tag-desc">Standar Nasional Open API Pembayaran – Virtual Account Transfer-In (Bank BPD Bali)</div>
    </div>
    <span class="tag-count">3 endpoints</span>
    <i class="fas fa-chevron-down" style="color:var(--muted);font-size:12px"></i>
  </div>
  <div class="grp-body">

    <!-- SNAP Token -->
    ${B("snap-token","POST","/api/v1.0/access-token/b2b","Get Access Token B2B",[{name:"grantType",in:"body",type:"string",req:!0,desc:"Harus bernilai <code>client_credentials</code>"},{name:"X-TIMESTAMP",in:"header",type:"string",req:!0,desc:"ISO 8601 datetime: <code>2024-01-15T10:30:00+07:00</code>"},{name:"X-CLIENT-KEY",in:"header",type:"string",req:!0,desc:"Partner ID / Client Key dari konfigurasi SNAP"},{name:"X-SIGNATURE",in:"header",type:"string",req:!0,desc:"Tanda tangan RSA SHA-256 dengan private key LPD"}],'{"responseCode":"2007300","responseMessage":"Successful","accessToken":"eyJ0eXAiOiJKV1QiLC...","tokenType":"BearerToken","expiresIn":"900"}',`{
  "grantType": "client_credentials"
}`,["snapTransferIn middleware","RSA SHA-256 signature","JWT token (exp: 15 menit)"],"Token digunakan untuk semua request SNAP selanjutnya. Expire dalam 15 menit.")}

    <!-- SNAP Inquiry -->
    ${B("snap-inquiry","POST","/api/v1.0/transfer-va/inquiry","Virtual Account Inquiry",[{name:"Authorization",in:"header",type:"string",req:!0,desc:"Bearer {accessToken} dari endpoint access-token/b2b"},{name:"X-TIMESTAMP",in:"header",type:"string",req:!0,desc:"ISO 8601 datetime"},{name:"X-SIGNATURE",in:"header",type:"string",req:!0,desc:"HMAC-SHA512 signature"},{name:"X-PARTNER-ID",in:"header",type:"string",req:!0,desc:"Partner ID (BPD Bali)"},{name:"X-EXTERNAL-ID",in:"header",type:"string",req:!0,desc:"Unique ID request (max 36 char)"},{name:"CHANNEL-ID",in:"header",type:"string",req:!0,desc:"Channel ID sistem"},{name:"partnerServiceId",in:"body",type:"string",req:!0,desc:"Kode bank prefix (8 digit, left-padded dengan spasi)"},{name:"customerNo",in:"body",type:"string",req:!0,desc:"Nomor nasabah (max 20 char)"},{name:"virtualAccountNo",in:"body",type:"string",req:!0,desc:"Nomor Virtual Account lengkap"},{name:"inquiryRequestId",in:"body",type:"string",req:!0,desc:"Reference ID unik dari bank pengirim"},{name:"amount",in:"body",type:"object",req:!1,desc:'Object {value: "100000.00", currency: "IDR"}'},{name:"additionalInfo",in:"body",type:"object",req:!0,desc:"{terminalType, terminalId}"}],'{"responseCode":"2002400","responseMessage":"Success","virtualAccountData":{"partnerServiceId":"  881234","customerNo":"0123456","virtualAccountNo":"  8812340123456","inquiryRequestId":"INQ-001","virtualAccountName":"I MADE BUDI"}}',`{
  "partnerServiceId": "  881234",
  "customerNo": "0123456",
  "virtualAccountNo": "  8812340123456",
  "inquiryRequestId": "INQ-20240115-001",
  "amount": { "value": "100000.00", "currency": "IDR" },
  "additionalInfo": { "terminalType": "6010", "terminalId": "BPD001" }
}`,["snapTransferIn middleware","HMAC-SHA512 signature check","IP whitelist BPD (8 IP)","Token validation"],"Middleware memvalidasi: IP sumber, HMAC signature, token JWT, dan field mandatory.")}

    <!-- SNAP Payment -->
    ${B("snap-payment","POST","/api/v1.0/transfer-va/payment","Virtual Account Payment",[{name:"Authorization",in:"header",type:"string",req:!0,desc:"Bearer {accessToken}"},{name:"X-TIMESTAMP",in:"header",type:"string",req:!0,desc:"ISO 8601 datetime"},{name:"X-SIGNATURE",in:"header",type:"string",req:!0,desc:"HMAC-SHA512 signature"},{name:"X-PARTNER-ID",in:"header",type:"string",req:!0,desc:"Partner ID"},{name:"X-EXTERNAL-ID",in:"header",type:"string",req:!0,desc:"Unique request ID"},{name:"partnerServiceId",in:"body",type:"string",req:!0,desc:"Kode bank prefix"},{name:"customerNo",in:"body",type:"string",req:!0,desc:"Nomor nasabah"},{name:"virtualAccountNo",in:"body",type:"string",req:!0,desc:"Nomor Virtual Account"},{name:"virtualAccountName",in:"body",type:"string",req:!0,desc:"Nama nasabah"},{name:"paymentRequestId",in:"body",type:"string",req:!0,desc:"Reference ID unik pembayaran"},{name:"amount",in:"body",type:"object",req:!0,desc:'{value: "100000.00", currency: "IDR"}'},{name:"trxDateTime",in:"body",type:"string",req:!0,desc:"Waktu transaksi ISO 8601"},{name:"additionalInfo",in:"body",type:"object",req:!1,desc:"{terminalType, terminalId}"}],'{"responseCode":"2002500","responseMessage":"Success","virtualAccountData":{"partnerServiceId":"  881234","customerNo":"0123456","virtualAccountNo":"  8812340123456","paymentRequestId":"PAY-001","paidAmount":{"value":"100000.00","currency":"IDR"},"trxDateTime":"2024-01-15T10:35:00+07:00"}}',`{
  "partnerServiceId": "  881234",
  "customerNo": "0123456",
  "virtualAccountNo": "  8812340123456",
  "virtualAccountName": "I MADE BUDI",
  "paymentRequestId": "PAY-20240115-001",
  "amount": { "value": "100000.00", "currency": "IDR" },
  "trxDateTime": "2024-01-15T10:35:00+07:00",
  "additionalInfo": { "terminalType": "6010", "terminalId": "BPD001" }
}`,["snapTransferIn middleware","Duplicate check (inquiryRequestId)","DB insert: gtb_folio, gak_mutasi, gcore_transfer"],"Melakukan posting ke database: folio tabungan, mutasi kredit, dan core transfer.")}

  </div>
</div>

<!-- ═══════════════════════════════════════════════════ -->
<!-- GROUP: AUTH -->
<!-- ═══════════════════════════════════════════════════ -->
<div class="tag-group" id="grp-auth">
  <div class="tag-header" onclick="toggleGroup('grp-auth')">
    <i class="fas fa-key" style="color:#f59e0b;font-size:18px"></i>
    <div>
      <h2>Mobile Banking – Autentikasi</h2>
      <div class="tag-desc">Token, registrasi, login, logout, dan update credentials</div>
    </div>
    <span class="tag-count">6 endpoints</span>
    <i class="fas fa-chevron-down" style="color:var(--muted);font-size:12px"></i>
  </div>
  <div class="grp-body">

    ${B("ios-token","POST","/api/smart/access/token","Get Access Token iOS",[{name:"user_id",in:"query",type:"string",req:!0,desc:"Customer ID / IMEI (dienkripsi AES-256)"},{name:"device_id",in:"query",type:"string",req:!0,desc:"Device identifier"},{name:"X-Access-Key",in:"header",type:"string",req:!0,desc:"Access key dari konfigurasi"},{name:"X-Timestamp",in:"header",type:"string",req:!0,desc:"Unix timestamp"}],'{"status":"00","message":"Sukses","token":"eyJ0eXAiOiJKV1Qi...","expired":"2024-01-15 11:30:00"}',"",["iosCheckAccess middleware","IP whitelist check","Partner validation","Access logging"],"Token berlaku selama sesi aktif. Gunakan sebagai Authorization header di endpoint lain.")}

    ${B("ios-register","POST","/api/smart/access/register","Register Nasabah",[{name:"user_name",in:"query",type:"string",req:!0,desc:"Username nasabah (dienkripsi)"},{name:"user_pass",in:"query",type:"string",req:!0,desc:"Password (dienkripsi AES-256)"},{name:"Authorization",in:"header",type:"string",req:!0,desc:"Bearer {token} dari /access/token"},{name:"X-Timestamp",in:"header",type:"string",req:!0,desc:"Unix timestamp"}],'{"status":"00","message":"Sukses","customer_id":"ENC_ID...","customer_name":"I MADE BUDI","pin":"ENC_PIN...","account_list":[{"norek":"1.123456","type":"tabungan"}],"bank_key":"KEY...","bank_list":[...],"ppob_list":[...]}',"",["iosCheckAccess","iosTokenMdw"],"Jika nasabah pertama kali (status=SY), akan di-upgrade ke status A dan dikembalikan data lengkap.")}

    ${B("ios-login","POST","/api/smart/access/login","Login Nasabah",[{name:"user_name",in:"query",type:"string",req:!0,desc:"Username (dienkripsi AES-256)"},{name:"user_pass",in:"query",type:"string",req:!0,desc:"Password (dienkripsi AES-256)"},{name:"Authorization",in:"header",type:"string",req:!0,desc:"Bearer {token}"},{name:"X-Timestamp",in:"header",type:"string",req:!0,desc:"Unix timestamp"}],'{"status":"00","message":"Sukses","customer_id":"ENC_ID...","customer_name":"I MADE BUDI","account_list":[{"norek":"1.123456","type":"tabungan","saldo":"ENC_SALDO"}],"bank_key":"KEY...","bank_list":[...],"ppob_list":[...]}',"",["iosCheckAccess","iosTokenMdw"],"Mengembalikan daftar rekening dan saldo (terenkripsi), daftar bank, dan produk PPOB aktif.")}

    ${B("ios-logout","POST","/api/smart/access/logout","Logout Nasabah",[{name:"Authorization",in:"header",type:"string",req:!0,desc:"Bearer {token}"},{name:"X-Timestamp",in:"header",type:"string",req:!0,desc:"Unix timestamp"}],'{"status":"00","message":"Sukses"}',"",["iosCheckAccess","iosTokenMdw"],"Menutup token di gmob_token (set status=closed, end_time=now).")}

    ${B("ios-update-pass","POST","/api/smart/access/update/pass","Update Password",[{name:"old_pass",in:"query",type:"string",req:!0,desc:"Password lama (dienkripsi AES-256)"},{name:"new_pass",in:"query",type:"string",req:!0,desc:"Password baru (dienkripsi AES-256)"},{name:"Authorization",in:"header",type:"string",req:!0,desc:"Bearer {token}"},{name:"X-Timestamp",in:"header",type:"string",req:!0,desc:"Unix timestamp"}],'{"status":"00","message":"Password berhasil diubah"}',"",["iosCheckAccess","iosTokenMdw"],"Verifikasi password lama sebelum update ke gmob_nasabah.pass_crypto.")}

    ${B("ios-update-pin","POST","/api/smart/access/update/pin","Update PIN",[{name:"old_pin",in:"query",type:"string",req:!0,desc:"PIN lama (dienkripsi AES-256)"},{name:"new_pin",in:"query",type:"string",req:!0,desc:"PIN baru (dienkripsi AES-256)"},{name:"Authorization",in:"header",type:"string",req:!0,desc:"Bearer {token}"},{name:"X-Timestamp",in:"header",type:"string",req:!0,desc:"Unix timestamp"}],'{"status":"00","message":"PIN berhasil diubah"}',"",["iosCheckAccess","iosTokenMdw"],"Verifikasi PIN lama sebelum update ke gmob_nasabah.pin_crypto.")}

  </div>
</div>

<!-- ═══════════════════════════════════════════════════ -->
<!-- GROUP: TABUNGAN -->
<!-- ═══════════════════════════════════════════════════ -->
<div class="tag-group" id="grp-tabungan">
  <div class="tag-header" onclick="toggleGroup('grp-tabungan')">
    <i class="fas fa-piggy-bank" style="color:#16a34a;font-size:18px"></i>
    <div>
      <h2>Tabungan</h2>
      <div class="tag-desc">Daftar rekening, histori transaksi, dan mutasi tabungan</div>
    </div>
    <span class="tag-count">3 endpoints</span>
    <i class="fas fa-chevron-down" style="color:var(--muted);font-size:12px"></i>
  </div>
  <div class="grp-body">

    ${B("tab-list","POST","/api/smart/tabungan/account-list","Daftar Rekening Nasabah",[{name:"customer_id",in:"query",type:"string",req:!0,desc:"Customer ID terenkripsi"},{name:"Authorization",in:"header",type:"string",req:!0,desc:"Bearer {token}"},{name:"X-Timestamp",in:"header",type:"string",req:!0,desc:"Unix timestamp"}],'{"status":"00","message":"Sukses","data":[{"norek":"ENC...","type":"tabungan","saldo":"ENC...","currency":"IDR"},{"norek":"ENC...","type":"pinjaman","saldo":"ENC..."}]}',"",["iosCheckAccess","iosTokenMdw"],"Mengembalikan semua rekening (tabungan, pinjaman, deposito) dengan saldo terenkripsi.")}

    ${B("tab-history","POST","/api/smart/tabungan/transaction-history","Histori Transaksi",[{name:"account_no",in:"query",type:"string",req:!0,desc:"Nomor rekening (dienkripsi)"},{name:"start_date",in:"query",type:"string",req:!1,desc:"Tanggal mulai YYYY-MM-DD"},{name:"end_date",in:"query",type:"string",req:!1,desc:"Tanggal akhir YYYY-MM-DD"},{name:"Authorization",in:"header",type:"string",req:!0,desc:"Bearer {token}"},{name:"X-Timestamp",in:"header",type:"string",req:!0,desc:"Unix timestamp"}],'{"status":"00","message":"Sukses","data":[{"tanggal":"2024-01-15","keterangan":"Transfer Masuk","debet":0,"kredit":100000,"saldo":1500000}]}',"",["iosCheckAccess","iosTokenMdw"],"Query dari gtb_folio, hasil dienkripsi. Default 30 hari terakhir jika tanggal tidak disertakan.")}

    ${B("tab-mutasi","POST","/api/smart/tabungan/mutasi-history","Histori Mutasi",[{name:"account_no",in:"query",type:"string",req:!0,desc:"Nomor rekening (dienkripsi)"},{name:"period",in:"query",type:"string",req:!1,desc:"Periode: YYYYMM (default: bulan ini)"},{name:"Authorization",in:"header",type:"string",req:!0,desc:"Bearer {token}"},{name:"X-Timestamp",in:"header",type:"string",req:!0,desc:"Unix timestamp"}],'{"status":"00","message":"Sukses","saldo_awal":"ENC...","saldo_akhir":"ENC...","data":[{"tgl":"2024-01-15","ket":"PPOB-PLN","nominal":"ENC...","jenis":"D"}]}',"",["iosCheckAccess","iosTokenMdw"],"Mutasi per periode (bulanan). Semua nilai nominal dienkripsi AES-256-CBC.")}

  </div>
</div>

<!-- ═══════════════════════════════════════════════════ -->
<!-- GROUP: TRANSFER -->
<!-- ═══════════════════════════════════════════════════ -->
<div class="tag-group" id="grp-transfer">
  <div class="tag-header" onclick="toggleGroup('grp-transfer')">
    <i class="fas fa-exchange-alt" style="color:#0891b2;font-size:18px"></i>
    <div>
      <h2>Transfer</h2>
      <div class="tag-desc">Transfer sesama LPD dan transfer ke bank lain (via BPD)</div>
    </div>
    <span class="tag-count">6 endpoints</span>
    <i class="fas fa-chevron-down" style="color:var(--muted);font-size:12px"></i>
  </div>
  <div class="grp-body">

    ${B("tr-lpd-check","POST","/api/smart/transfer/lpd/check","LPD – Cek Rekening Tujuan",[{name:"account_no",in:"query",type:"string",req:!0,desc:"Nomor rekening tujuan (dienkripsi AES-256)"},{name:"Authorization",in:"header",type:"string",req:!0,desc:"Bearer {token}"},{name:"X-Timestamp",in:"header",type:"string",req:!0,desc:"Unix timestamp"}],'{"status":"00","message":"Sukses inquiry","product_type":"tabungan","customer_name":"I WAYAN SARI"}',"",["iosCheckAccess","iosTokenMdw"],"Verifikasi rekening tujuan sesama LPD. Error 01 = rekening tidak aktif.")}

    ${B("tr-lpd-inquiry","POST","/api/smart/transfer/lpd/inquiry","LPD – Inquiry Transfer",[{name:"from_acc",in:"query",type:"string",req:!0,desc:"Rekening sumber (dienkripsi)"},{name:"to_acc",in:"query",type:"string",req:!0,desc:"Rekening tujuan (dienkripsi)"},{name:"amount",in:"query",type:"string",req:!0,desc:"Nominal (dienkripsi)"},{name:"from_name",in:"query",type:"string",req:!0,desc:"Nama pengirim (dienkripsi)"},{name:"to_name",in:"query",type:"string",req:!0,desc:"Nama penerima (dienkripsi)"},{name:"remark",in:"query",type:"string",req:!0,desc:"Keterangan + hashCode (dienkripsi, format: ket<>hash)"},{name:"Authorization",in:"header",type:"string",req:!0,desc:"Bearer {token}"},{name:"X-Timestamp",in:"header",type:"string",req:!0,desc:"Unix timestamp"}],'{"status":"81","message":"Sukses Inquiry"}',"",["iosCheckAccess","iosTokenMdw","SHA-256 hash check","Saldo & limit check"],"Verifikasi: hash SHA-256, saldo cukup (min SALDO_MIN=50.000), limit transfer (10K–1M). Status 81 = bisa dilanjutkan.")}

    ${B("tr-lpd-post","POST","/api/smart/transfer/lpd/post","LPD – Posting Transfer",[{name:"trans_no",in:"query",type:"string",req:!0,desc:"Nomor transaksi unik (dienkripsi)"},{name:"from_acc",in:"query",type:"string",req:!0,desc:"Rekening sumber (dienkripsi)"},{name:"to_acc",in:"query",type:"string",req:!0,desc:"Rekening tujuan (dienkripsi)"},{name:"amount",in:"query",type:"string",req:!0,desc:"Nominal (dienkripsi)"},{name:"pin",in:"query",type:"string",req:!0,desc:"PIN nasabah (dienkripsi)"},{name:"remark",in:"query",type:"string",req:!0,desc:"Keterangan (dienkripsi)"},{name:"Authorization",in:"header",type:"string",req:!0,desc:"Bearer {token}"},{name:"X-Timestamp",in:"header",type:"string",req:!0,desc:"Unix timestamp"}],'{"status":"00","message":"Transfer Berhasil","reference_no":"20240115120001"}',"",["iosCheckAccess","iosTokenMdw","PIN validation","Duplicate check (trans_no)","DB: gtb_folio + gak_mutasi"],"Error 40=saldo kurang, 45=duplikat transaksi, 51-53=hash mismatch, 54=PIN salah. Posting ke gtb_folio dan gak_mutasi.")}

    ${B("tr-bank-check","POST","/api/smart/transfer/bank/check","Bank – Cek Rekening Tujuan",[{name:"bank_code",in:"query",type:"string",req:!0,desc:"Kode bank tujuan (dienkripsi)"},{name:"account_no",in:"query",type:"string",req:!0,desc:"Rekening tujuan di bank (dienkripsi)"},{name:"Authorization",in:"header",type:"string",req:!0,desc:"Bearer {token}"},{name:"X-Timestamp",in:"header",type:"string",req:!0,desc:"Unix timestamp"}],'{"status":"00","message":"Sukses","customer_name":"I KETUT DANA","bank_name":"BNI"}',"",["iosCheckAccess","iosTokenMdw"],"Melakukan cURL ke BPD API untuk validasi rekening tujuan di bank lain.")}

    ${B("tr-bank-inquiry","POST","/api/smart/transfer/bank/inquiry","Bank – Inquiry Transfer",[{name:"bank_code",in:"query",type:"string",req:!0,desc:"Kode bank tujuan (dienkripsi)"},{name:"account_no",in:"query",type:"string",req:!0,desc:"Rekening tujuan (dienkripsi)"},{name:"from_acc",in:"query",type:"string",req:!0,desc:"Rekening sumber (dienkripsi)"},{name:"amount",in:"query",type:"string",req:!0,desc:"Nominal transfer (dienkripsi)"},{name:"remark",in:"query",type:"string",req:!0,desc:"Keterangan + hash (dienkripsi)"},{name:"Authorization",in:"header",type:"string",req:!0,desc:"Bearer {token}"},{name:"X-Timestamp",in:"header",type:"string",req:!0,desc:"Unix timestamp"}],'{"status":"81","message":"Sukses Inquiry","fee":"3500","total":"103500"}',"",["iosCheckAccess","iosTokenMdw","HMAC-SHA256 check","BPD cURL call"],"Menghitung biaya transfer dari gcore_bankcode. Status 81 = dapat dilanjutkan ke posting.")}

    ${B("tr-bank-post","POST","/api/smart/transfer/bank/post","Bank – Posting Transfer",[{name:"bank_code",in:"query",type:"string",req:!0,desc:"Kode bank (dienkripsi)"},{name:"account_no",in:"query",type:"string",req:!0,desc:"Rekening tujuan (dienkripsi)"},{name:"from_acc",in:"query",type:"string",req:!0,desc:"Rekening sumber (dienkripsi)"},{name:"amount",in:"query",type:"string",req:!0,desc:"Nominal (dienkripsi)"},{name:"pin",in:"query",type:"string",req:!0,desc:"PIN nasabah (dienkripsi)"},{name:"trans_no",in:"query",type:"string",req:!0,desc:"Nomor transaksi (dienkripsi)"},{name:"remark",in:"query",type:"string",req:!0,desc:"Keterangan (dienkripsi)"},{name:"Authorization",in:"header",type:"string",req:!0,desc:"Bearer {token}"},{name:"X-Timestamp",in:"header",type:"string",req:!0,desc:"Unix timestamp"}],'{"status":"00","message":"Transfer Berhasil","reference_no":"BPD20240115001"}',"",["iosCheckAccess","iosTokenMdw","PIN check","BPD API call via cURL","DB: gcore_transfer"],"Mengirim ke BPD API, jika sukses insert ke gcore_transfer. Jika gagal, lakukan rollback gtb_folio.")}

  </div>
</div>

<!-- ═══════════════════════════════════════════════════ -->
<!-- GROUP: PPOB -->
<!-- ═══════════════════════════════════════════════════ -->
<div class="tag-group" id="grp-ppob">
  <div class="tag-header" onclick="toggleGroup('grp-ppob')">
    <i class="fas fa-bolt" style="color:#f59e0b;font-size:18px"></i>
    <div>
      <h2>PPOB &amp; IAK</h2>
      <div class="tag-desc">Pembayaran tagihan PLN, PDAM, BPJS, Pulsa (via FastPay &amp; IAK)</div>
    </div>
    <span class="tag-count">4 endpoints</span>
    <i class="fas fa-chevron-down" style="color:var(--muted);font-size:12px"></i>
  </div>
  <div class="grp-body">

    ${B("ppob-check","POST","/api/smart/ppob/check","PPOB – Cek Tagihan",[{name:"product_code",in:"query",type:"string",req:!0,desc:"Kode produk PPOB (dienkripsi). Contoh: PLN-POSTPAID"},{name:"customer_id",in:"query",type:"string",req:!0,desc:"ID Pelanggan / nomor meter (dienkripsi)"},{name:"account_no",in:"query",type:"string",req:!0,desc:"Rekening pembayaran (dienkripsi)"},{name:"Authorization",in:"header",type:"string",req:!0,desc:"Bearer {token}"},{name:"X-Timestamp",in:"header",type:"string",req:!0,desc:"Unix timestamp"}],'{"status":"00","message":"Sukses","customer_name":"I MADE SUKERTA","tagihan":"150000","period":"202401","denda":"0","total":"150000","admin":"2500"}',"",["iosCheckAccess","iosTokenMdw"],"Cek ke FastPay/IAK. Kembalikan detail tagihan: nama, jumlah, periode, denda, biaya admin.")}

    ${B("ppob-request","POST","/api/smart/ppob/request","PPOB – Bayar Tagihan",[{name:"product_code",in:"query",type:"string",req:!0,desc:"Kode produk PPOB (dienkripsi)"},{name:"customer_id",in:"query",type:"string",req:!0,desc:"ID Pelanggan (dienkripsi)"},{name:"account_no",in:"query",type:"string",req:!0,desc:"Rekening pembayaran (dienkripsi)"},{name:"amount",in:"query",type:"string",req:!0,desc:"Nominal pembayaran (dienkripsi)"},{name:"pin",in:"query",type:"string",req:!0,desc:"PIN transaksi (dienkripsi)"},{name:"trans_no",in:"query",type:"string",req:!0,desc:"Nomor transaksi unik (dienkripsi)"},{name:"Authorization",in:"header",type:"string",req:!0,desc:"Bearer {token}"},{name:"X-Timestamp",in:"header",type:"string",req:!0,desc:"Unix timestamp"}],'{"status":"00","message":"Pembayaran Berhasil","ref_no":"FP20240115001","struk":"PLN POSTPAID 150000 OK"}',"",["iosCheckAccess","iosTokenMdw","PIN validation","Saldo check","FastPay/IAK API call"],"Cek saldo cukup, kirim ke FastPay/IAK, insert gppob_transaction dan gtb_folio. Jika gagal = rollback.")}

    ${B("iak-check","POST","/api/smart/iak/check","IAK – Cek Produk",[{name:"product_code",in:"query",type:"string",req:!0,desc:"Kode produk IAK (dienkripsi). Contoh: TSEL5 (Telkomsel 5K)"},{name:"customer_id",in:"query",type:"string",req:!0,desc:"Nomor HP tujuan (dienkripsi)"},{name:"account_no",in:"query",type:"string",req:!0,desc:"Rekening pembayaran (dienkripsi)"},{name:"Authorization",in:"header",type:"string",req:!0,desc:"Bearer {token}"},{name:"X-Timestamp",in:"header",type:"string",req:!0,desc:"Unix timestamp"}],'{"status":"00","message":"Sukses","product_name":"Telkomsel 5.000","price":"5500","admin":"0"}',"",["iosCheckAccess","iosTokenMdw"],"Cek ketersediaan dan harga produk IAK (pulsa, paket data, game voucher).")}

    ${B("iak-request","POST","/api/smart/iak/request","IAK – Beli Produk",[{name:"product_code",in:"query",type:"string",req:!0,desc:"Kode produk IAK (dienkripsi)"},{name:"customer_id",in:"query",type:"string",req:!0,desc:"Nomor HP tujuan (dienkripsi)"},{name:"account_no",in:"query",type:"string",req:!0,desc:"Rekening pembayaran (dienkripsi)"},{name:"pin",in:"query",type:"string",req:!0,desc:"PIN transaksi (dienkripsi)"},{name:"trans_no",in:"query",type:"string",req:!0,desc:"Nomor transaksi unik (dienkripsi)"},{name:"Authorization",in:"header",type:"string",req:!0,desc:"Bearer {token}"},{name:"X-Timestamp",in:"header",type:"string",req:!0,desc:"Unix timestamp"}],'{"status":"00","message":"Transaksi Berhasil","ref_no":"IAK20240115001","sn":"SN123456789"}',"",["iosCheckAccess","iosTokenMdw","PIN validation","IAK API call"],"Pembelian pulsa/paket via IAK API. SN = serial number produk dari IAK.")}

  </div>
</div>

<!-- ═══════════════════════════════════════════════════ -->
<!-- GROUP: ATM -->
<!-- ═══════════════════════════════════════════════════ -->
<div class="tag-group" id="grp-atm">
  <div class="tag-header" onclick="toggleGroup('grp-atm')">
    <i class="fas fa-credit-card" style="color:#dc2626;font-size:18px"></i>
    <div>
      <h2>ATM Cardless</h2>
      <div class="tag-desc">Operasi mesin ATM tanpa kartu – token, saldo, setor, tarik, batal</div>
    </div>
    <span class="tag-count">7 endpoints</span>
    <i class="fas fa-chevron-down" style="color:var(--muted);font-size:12px"></i>
  </div>
  <div class="grp-body">

    ${B("atm-create-token","POST","/api/cardless/create-token","ATM – Buat Token Cardless",[{name:"account_no",in:"query",type:"string",req:!0,desc:"Nomor rekening lengkap (format: PREFIX+norek, contoh: 8812341.123456)"},{name:"X-Machine-Hash",in:"header",type:"string",req:!0,desc:"HMAC-SHA256 hash dari mesin ATM"},{name:"X-Machine-IP",in:"header",type:"string",req:!0,desc:"IP address mesin ATM (whitelist)"}],'{"status":"00","message":"Token Berhasil.","data":"A1B2C3"}',"",["machineCheck middleware","IP whitelist","HMAC hash validation"],"Token 6 karakter, berlaku 5 menit. Disimpan di gmob_token. Digunakan untuk transaksi cardless.")}

    ${B("atm-get-token","POST","/api/cardless/get-token","ATM – Validasi Token dari Mobile",[{name:"account_no",in:"query",type:"string",req:!0,desc:"Nomor rekening (format BPD)"},{name:"transaction_code",in:"query",type:"string",req:!0,desc:'Kode transaksi ATM (harus "39")'},{name:"transaction_id",in:"query",type:"string",req:!0,desc:"ID transaksi ATM"},{name:"transaction_datetime",in:"query",type:"string",req:!0,desc:"Datetime transaksi (YYYYMMDDHHmmss)"},{name:"X-Machine-Hash",in:"header",type:"string",req:!0,desc:"HMAC hash mesin"},{name:"X-Machine-IP",in:"header",type:"string",req:!0,desc:"IP mesin ATM"}],'{"transaction_code":"39","transaction_id":"TXN001","response_code":"00","token":"A1B2C3"}',"",["machineCheck middleware"],"Mesin ATM memanggil ini untuk mendapatkan token yang dibuat nasabah dari mobile. response_code: 00=OK, 12=kode salah, 14=rekening tidak aktif, 30=token expired.")}

    ${B("atm-balance","POST","/api/cardless/check-balance","ATM – Cek Saldo",[{name:"account_no",in:"query",type:"string",req:!0,desc:"Nomor rekening (format BPD)"},{name:"token",in:"query",type:"string",req:!0,desc:"Token cardless 6 digit"},{name:"X-Machine-Hash",in:"header",type:"string",req:!0,desc:"HMAC hash mesin"},{name:"X-Machine-IP",in:"header",type:"string",req:!0,desc:"IP mesin"}],'{"status":"00","message":"Sukses","saldo":"1500000","account_no":"1.123456","account_name":"I MADE BUDI"}',"",["machineCheck middleware","Token validation"],"Validasi token aktif, kembalikan saldo dari gtb_folio (sum kredit-debit).")}

    ${B("atm-debit","POST","/api/cardless/cash-debit","ATM – Penarikan Tunai",[{name:"account_no",in:"query",type:"string",req:!0,desc:"Nomor rekening"},{name:"token",in:"query",type:"string",req:!0,desc:"Token cardless aktif"},{name:"amount",in:"query",type:"string",req:!0,desc:"Nominal penarikan (numerik)"},{name:"transaction_id",in:"query",type:"string",req:!0,desc:"ID transaksi ATM unik"},{name:"transaction_datetime",in:"query",type:"string",req:!0,desc:"Datetime (YYYYMMDDHHmmss)"},{name:"X-Machine-Hash",in:"header",type:"string",req:!0,desc:"HMAC hash mesin"},{name:"X-Machine-IP",in:"header",type:"string",req:!0,desc:"IP mesin"}],'{"status":"00","message":"Penarikan Berhasil","saldo_akhir":"1400000","reference":"ATM20240115001"}',"",["machineCheck","Token validation","Saldo check","DB: gtb_folio + gak_mutasi"],"Debet rekening nasabah. Insert folio debet ke gtb_folio dan mutasi ke gak_mutasi. Token dinonaktifkan setelah transaksi.")}

    ${B("atm-credit","POST","/api/cardless/cash-credit","ATM – Penyetoran Tunai",[{name:"account_no",in:"query",type:"string",req:!0,desc:"Nomor rekening"},{name:"token",in:"query",type:"string",req:!0,desc:"Token cardless aktif"},{name:"amount",in:"query",type:"string",req:!0,desc:"Nominal setoran (numerik)"},{name:"transaction_id",in:"query",type:"string",req:!0,desc:"ID transaksi ATM unik"},{name:"transaction_datetime",in:"query",type:"string",req:!0,desc:"Datetime (YYYYMMDDHHmmss)"},{name:"X-Machine-Hash",in:"header",type:"string",req:!0,desc:"HMAC hash mesin"},{name:"X-Machine-IP",in:"header",type:"string",req:!0,desc:"IP mesin"}],'{"status":"00","message":"Setoran Berhasil","saldo_akhir":"1600000","reference":"ATM20240115002"}',"",["machineCheck","Token validation","DB: gtb_folio + gak_mutasi"],"Kredit rekening nasabah. Insert folio kredit ke gtb_folio. Token dinonaktifkan setelah transaksi.")}

    ${B("atm-rev-debit","POST","/api/cardless/reversal-debit","ATM – Batal Penarikan",[{name:"account_no",in:"query",type:"string",req:!0,desc:"Nomor rekening"},{name:"transaction_id",in:"query",type:"string",req:!0,desc:"ID transaksi yang akan dibatalkan"},{name:"X-Machine-Hash",in:"header",type:"string",req:!0,desc:"HMAC hash mesin"},{name:"X-Machine-IP",in:"header",type:"string",req:!0,desc:"IP mesin"}],'{"status":"00","message":"Batal Penarikan Berhasil"}',"",["machineCheck","Transaction lookup"],"Reversal transaksi penarikan. Hapus record dari gtb_folio dan gak_mutasi berdasarkan transaction_id.")}

    ${B("atm-rev-credit","POST","/api/cardless/reversal-credit","ATM – Batal Setoran",[{name:"account_no",in:"query",type:"string",req:!0,desc:"Nomor rekening"},{name:"transaction_id",in:"query",type:"string",req:!0,desc:"ID transaksi yang akan dibatalkan"},{name:"X-Machine-Hash",in:"header",type:"string",req:!0,desc:"HMAC hash mesin"},{name:"X-Machine-IP",in:"header",type:"string",req:!0,desc:"IP mesin"}],'{"status":"00","message":"Batal Setoran Berhasil"}',"",["machineCheck","Transaction lookup"],"Reversal transaksi setoran. Hapus record folio kredit dari database.")}

  </div>
</div>

<!-- ═══════════════════════════════════════════════════ -->
<!-- GROUP: PPOB CALLBACK -->
<!-- ═══════════════════════════════════════════════════ -->
<div class="tag-group" id="grp-ppob-cb">
  <div class="tag-header" onclick="toggleGroup('grp-ppob-cb')">
    <i class="fas fa-reply" style="color:#6b7280;font-size:18px"></i>
    <div>
      <h2>PPOB Callback</h2>
      <div class="tag-desc">Webhook dari FastPay untuk notifikasi hasil transaksi PPOB</div>
    </div>
    <span class="tag-count">1 endpoint</span>
    <i class="fas fa-chevron-down" style="color:var(--muted);font-size:12px"></i>
  </div>
  <div class="grp-body">

    ${B("ppob-cb","POST","/api/ppob/callback","PPOB – Notifikasi Callback FastPay",[{name:"ref_id",in:"body",type:"string",req:!0,desc:"Reference ID transaksi dari FastPay"},{name:"product_code",in:"body",type:"string",req:!0,desc:"Kode produk"},{name:"customer_id",in:"body",type:"string",req:!0,desc:"ID pelanggan"},{name:"status",in:"body",type:"string",req:!0,desc:"Status: 00=sukses, lainnya=gagal"},{name:"amount",in:"body",type:"number",req:!0,desc:"Nominal transaksi"},{name:"timestamp",in:"body",type:"string",req:!1,desc:"Waktu callback dari FastPay"},{name:"X-FastPay-Signature",in:"header",type:"string",req:!1,desc:"Tanda tangan dari FastPay (opsional tergantung konfigurasi)"}],'{"status":"00","message":"OK"}',`{
  "ref_id": "FP20240115001",
  "product_code": "PLN-POSTPAID",
  "customer_id": "12345678901",
  "status": "00",
  "amount": 152500,
  "timestamp": "2024-01-15T10:35:00Z"
}`,["IP whitelist FastPay"],"Update status transaksi di gppob_transaction. Jika status gagal, rollback folio nasabah.")}

  </div>
</div>

</main>
</div>

<script>
var openCards = {};
var openGroups = {};

function epToggle(id) {
  var card = document.getElementById('ep-'+id);
  if (!card) return;
  var isOpen = card.classList.contains('open');
  card.classList.toggle('open', !isOpen);
  openCards[id] = !isOpen;
}

function toggleGroup(id) {
  var grp = document.getElementById(id);
  if (!grp) return;
  var body = grp.querySelector('.grp-body');
  if (!body) return;
  var isHidden = body.style.display === 'none';
  body.style.display = isHidden ? '' : 'none';
  var chevron = grp.querySelector('.tag-header .fa-chevron-down, .tag-header .fa-chevron-up');
  if (chevron) {
    chevron.classList.toggle('fa-chevron-down', !isHidden);
    chevron.classList.toggle('fa-chevron-up', isHidden);
  }
}

function showTab(epId, tab) {
  var panes = document.querySelectorAll('#ep-'+epId+' .ep-pane');
  var tabs = document.querySelectorAll('#ep-'+epId+' .ep-tab');
  panes.forEach(function(p){ p.classList.remove('active'); });
  tabs.forEach(function(t){ t.classList.remove('active'); });
  var pane = document.getElementById('pane-'+epId+'-'+tab);
  var tabEl = document.getElementById('tab-'+epId+'-'+tab);
  if (pane) pane.classList.add('active');
  if (tabEl) tabEl.classList.add('active');
}

function scrollTo(id) {
  var el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ─── Global token store ───────────────────────────────────────────────────────
var _tokens = { snap: null, ios: null, snapHeaders: {}, iosHeaders: {} };
window._tokenHdrCache = {};


var WHITELIST_IP = '34.50.74.78';

function toggleXFwd(label) {
  var chk = document.getElementById('chk-xforward');
  // If the click came from the label (not directly on checkbox), toggle manually
  if (event && event.target !== chk) {
    chk.checked = !chk.checked;
    event.preventDefault();
  }
  updateXFwdStyle();
}
function updateXFwdStyle() {
  var chk = document.getElementById('chk-xforward');
  var lbl = document.getElementById('xfwd-label');
  if (!lbl) return;
  if (chk && chk.checked) {
    lbl.classList.add('active');
  } else {
    lbl.classList.remove('active');
  }
}

function getBaseUrl() {
  return (document.getElementById('base-url-input').value || '').replace(/\\/+$/, '');
}

// ─── Auto Token ───────────────────────────────────────────────────────────────
function autoToken(type) {
  var btn = document.getElementById('btn-' + type + '-token');
  if (!btn) return;
  var origHtml = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span> Generating...';

  // Read optional client-key override from UI
  var clientKeyEl = document.getElementById('snap-client-key');
  var clientKey = clientKeyEl ? clientKeyEl.value.trim() : '';

  var payload = { type: type, baseUrl: getBaseUrl() };
  if (clientKey) payload.clientKey = clientKey;

  var t0 = Date.now();
  fetch('/api/token/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(function(r){ return r.json(); })
  .then(function(d){
    var ms = Date.now() - t0;
    d._ms = ms;
    if (type === 'snap') {
      _tokens.snap = d.token;
      _tokens.snapHeaders = d.headers || {};
      updateTokenBadge('snap', d.token, d);
      // Inject headers even when token is null (we still have valid timestamp+signature)
      if (d.headers) injectSnapHeaders(d.headers, d.token);
    } else {
      _tokens.ios = d.token;
      _tokens.iosHeaders = d.headers || {};
      updateTokenBadge('ios', d.token, d);
      if (d.headers) injectIosHeaders(d.headers, d.token);
    }
    if (d.token) localStorage.setItem('lpd_'+type+'_token', d.token);
    showTokenDetail(type, d);
  })
  .catch(function(e){
    showTokenDetail(type, { ok: false, error: 'Fetch error: ' + e.message,
      hint: 'Periksa Base URL dan koneksi jaringan.' });
  })
  .finally(function(){ btn.disabled = false; btn.innerHTML = origHtml; });
}

function updateTokenBadge(type, token, d) {
  var el = document.getElementById(type + '-token-badge');
  if (!el) return;
  var dot = el.querySelector('i');
  var txt = el.querySelector('span');
  if (token) {
    el.style.background   = type === 'snap' ? 'rgba(91,33,182,.25)' : 'rgba(6,95,70,.25)';
    el.style.color        = '#e2e8f0';
    el.style.borderColor  = type === 'snap' ? '#7c3aed' : '#059669';
    if (dot) { dot.style.color = type === 'snap' ? '#a78bfa' : '#34d399'; }
    if (txt) txt.textContent  = type.toUpperCase() + ' ✓ ' + token.substring(0,16) + '...';
    el.title = 'Token: ' + token + (d && d.timestamp ? ' | ' + d.timestamp : '');
  } else {
    var code = (d && (d.responseCode || d.error)) ? String(d.responseCode || d.error).substring(0,12) : 'Gagal';
    el.style.background  = 'rgba(127,29,29,.2)';
    el.style.color       = '#fca5a5';
    el.style.borderColor = '#7f1d1d';
    if (dot) dot.style.color = '#ef4444';
    if (txt) txt.textContent = type.toUpperCase() + ' ✕ ' + code;
    el.title = d ? JSON.stringify(d.raw || {error: d.error}) : '';
  }
}

function setHeaderInput(epId, key, value) {
  if (!value) return;
  var inp = document.querySelector('#ep-' + epId + ' .try-header-input[data-key="' + key + '"]');
  if (inp) inp.value = value;
}

function injectSnapHeaders(headers, token) {
  ['snap-token','snap-inquiry','snap-payment'].forEach(function(id) {
    setHeaderInput(id, 'X-TIMESTAMP',  headers['X-TIMESTAMP']);
    setHeaderInput(id, 'X-CLIENT-KEY', headers['X-CLIENT-KEY']);
    setHeaderInput(id, 'X-SIGNATURE',  headers['X-SIGNATURE']);
    if (token) setHeaderInput(id, 'Authorization', 'Bearer ' + token);
  });
}

function injectIosHeaders(headers, token) {
  // Inject into all non-SNAP, non-callback cards
  document.querySelectorAll('.ep-card').forEach(function(card) {
    var id = card.id.replace('ep-','');
    if (id && !id.startsWith('snap') && id !== 'ppob-cb') {
      setHeaderInput(id, 'X-TIMESTAMP', headers['X-TIMESTAMP']);
      setHeaderInput(id, 'X-CLIENT-ID', headers['X-CLIENT-ID']);
      setHeaderInput(id, 'X-SIGNATURE', headers['X-SIGNATURE']);
      if (token) setHeaderInput(id, 'Authorization', 'Bearer ' + token);
    }
  });
}

// ─── Token Detail Panel ───────────────────────────────────────────────────────
function showTokenDetail(type, d) {
  var panel = document.getElementById('token-detail-panel');
  if (!panel) {
    panel = document.createElement('div');
    panel.id = 'token-detail-panel';
    panel.style.cssText = [
      'position:fixed;bottom:0;right:0;width:500px;max-height:90vh;overflow-y:auto',
      'background:#0f172a;color:#e2e8f0;border-radius:12px 0 0 0;z-index:9999',
      'box-shadow:-4px -4px 40px rgba(0,0,0,.7);font-size:12px;font-family:monospace',
      'border-top:2px solid #334155;border-left:2px solid #334155;transition:all .2s'
    ].join(';');
    document.body.appendChild(panel);
  }

  var ok      = !!(d.token);
  var hasResp = !!(d.responseCode || d.httpStatus);
  var isSnap  = type === 'snap';
  var accent  = ok ? '#22c55e' : (hasResp ? '#f59e0b' : '#ef4444');
  var icon    = ok ? 'fa-check-circle' : (hasResp ? 'fa-exclamation-triangle' : 'fa-times-circle');
  var ms      = d._ms ? '<span style="color:#475569;font-weight:400;font-size:11px">' + d._ms + ' ms</span>' : '';

  // ── Header rows (always shown if we got headers from signing) ──────────────
  var hdr = d.headers || {};
  // Store header values in a temp object accessible by copyHdr() below
  window._tokenHdrCache = hdr;
  var headerBlock = '';
  if (Object.keys(hdr).length > 0) {
    var hdrIdx = 0;
    var hdrRows = Object.keys(hdr).map(function(k) {
      var v = hdr[k];
      var shortened = v && v.length > 60 ? v.substring(0,60) + '...' : v;
      var color = k === 'X-SIGNATURE' ? '#86efac' : k === 'X-TIMESTAMP' ? '#c4b5fd' : '#fbbf24';
      var safeKey = k;
      return '<tr>'
        + '<td style="color:#64748b;padding:3px 10px 3px 0;white-space:nowrap;vertical-align:top;font-size:11px">' + safeKey + '</td>'
        + '<td style="padding:3px 0"><code style="color:' + color + ';word-break:break-all;font-size:11px">' + shortened + '</code>'
        + ' <button onclick="copyHdr(&quot;' + safeKey + '&quot;)" style="background:#1e293b;border:none;color:#64748b;cursor:pointer;padding:1px 5px;border-radius:3px;font-size:10px" title="Copy">&#128203;</button>'
        + '</td></tr>';
    }).join('');
    headerBlock = '<div style="margin-bottom:8px">'
      + '<div style="color:#94a3b8;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;margin-bottom:4px;padding-bottom:4px;border-bottom:1px solid #1e293b">Generated Request Headers</div>'
      + '<table style="width:100%;border-collapse:collapse;line-height:1.6">'
        + hdrRows
        + '<tr><td style="color:#64748b;font-size:11px;padding:2px 10px 2px 0">X-Forwarded-For</td><td><code style="color:#f59e0b">34.50.74.78</code> <button id="copy-xfwd" onclick="copyHdr(&quot;X-Forwarded-For&quot;)" style="background:#1e293b;border:none;color:#64748b;cursor:pointer;padding:1px 5px;border-radius:3px;font-size:10px">&#128203;</button></td></tr>'
      + '</table>'
      + '</div>';
  }

  // ── Response rows ──────────────────────────────────────────────────────────
  var respRows = '';
  if (d.url)            respRows += '<tr><td style="color:#64748b;font-size:11px;white-space:nowrap;padding:2px 10px 2px 0">URL</td><td><code style="color:#7dd3fc;word-break:break-all;font-size:10px">' + d.url + '</code></td></tr>';
  if (d.httpStatus)     respRows += '<tr><td style="color:#64748b;font-size:11px;white-space:nowrap;padding:2px 10px 2px 0">HTTP Status</td><td><code style="color:' + (d.httpStatus===200?'#4ade80':'#fbbf24') + '">' + d.httpStatus + '</code></td></tr>';
  if (d.responseCode)   respRows += '<tr><td style="color:#64748b;font-size:11px;white-space:nowrap;padding:2px 10px 2px 0">responseCode</td><td><code style="color:' + (d.responseCode==='2007300'?'#4ade80':'#fbbf24') + '">' + d.responseCode + '</code></td></tr>';
  if (d.responseMessage)respRows += '<tr><td style="color:#64748b;font-size:11px;white-space:nowrap;padding:2px 10px 2px 0">responseMessage</td><td><code style="color:#94a3b8">' + d.responseMessage + '</code></td></tr>';
  if (d.token)          respRows += '<tr><td style="color:#64748b;font-size:11px;white-space:nowrap;padding:2px 10px 2px 0">accessToken</td><td><code style="color:#4ade80;word-break:break-all;font-size:10px">' + d.token + '</code></td></tr>';
  if (d.error)          respRows += '<tr><td style="color:#64748b;font-size:11px;white-space:nowrap;padding:2px 10px 2px 0;vertical-align:top">error</td><td><code style="color:#f87171;word-break:break-all;font-size:10px">' + d.error + '</code></td></tr>';
  if (d.hint)           respRows += '<tr><td style="color:#64748b;font-size:11px;white-space:nowrap;padding:2px 10px 2px 0;vertical-align:top">hint</td><td><code style="color:#fbbf24;font-size:10px">' + d.hint + '</code></td></tr>';

  // ── Status notes ───────────────────────────────────────────────────────────
  var noteHtml = '';
  if (ok) {
    noteHtml = '<div style="padding:10px 0 4px;color:#60a5fa;font-size:11px;line-height:1.7;border-top:1px solid #1e293b;margin-top:8px">'
      + '<i class="fas fa-magic" style="color:#a78bfa"></i> X-TIMESTAMP, X-' + (isSnap?'CLIENT-KEY':'CLIENT-ID') + ', X-SIGNATURE & Authorization <b>diisi otomatis</b>.<br>'
      + '<i class="fas fa-shield-alt" style="color:#f59e0b"></i> X-Forwarded-For: 34.50.74.78 diinjeksi otomatis ke setiap request.<br>'
      + '<i class="fas fa-clock" style="color:#94a3b8"></i> Token berlaku 3 menit dari: ' + (d.timestamp||'') + '.'
      + '</div>';
  } else if (isSnap && d.responseCode === '4017301') {
    noteHtml = '<div style="padding:10px 0 4px;color:#fbbf24;font-size:11px;line-height:1.7;border-top:1px solid #1e293b;margin-top:8px">'
      + '<i class="fas fa-info-circle"></i> <b>responseCode 4017301</b> = "Invalid access Token"<br>'
      + 'Artinya signature sampai ke server tetapi verifikasi gagal. Server memverifikasi menggunakan <b>public_key_bpd.pem</b>.<br>'
      + '<span style="color:#94a3b8">Diperlukan private key BPD (dari bank BPD Bali) untuk mendapatkan token SNAP yang valid.</span><br><br>'
      + '<i class="fas fa-check" style="color:#22c55e"></i> Headers (X-TIMESTAMP + X-SIGNATURE) <b>sudah diisi otomatis</b> di form endpoint.'
      + '</div>';
  } else if (!isSnap && d.httpStatus === 500) {
    noteHtml = '<div style="padding:10px 0 4px;color:#fbbf24;font-size:11px;line-height:1.7;border-top:1px solid #1e293b;margin-top:8px">'
      + '<i class="fas fa-database"></i> <b>HTTP 500</b> = Server error internal (koneksi SQL Server production bermasalah).<br>'
      + '<i class="fas fa-key" style="color:#22c55e"></i> <b style="color:#22c55e">Public key sudah terdaftar</b> di server via <code style="color:#94a3b8">/api/smart/access/key</code>.<br>'
      + '<span style="color:#94a3b8">Signature iOS sudah benar menggunakan <b>private_key_lpd.pem</b>. Masalah ada di sisi DB server production.</span><br><br>'
      + '<i class="fas fa-check" style="color:#22c55e"></i> Headers (X-TIMESTAMP + X-SIGNATURE) <b>sudah diisi otomatis</b> di form endpoint.'
      + '</div>';
  } else {
    noteHtml = '<div style="padding:10px 0 4px;color:#f87171;font-size:11px;line-height:1.7;border-top:1px solid #1e293b;margin-top:8px">'
      + '<i class="fas fa-exclamation-circle"></i> Koneksi ke server gagal. Periksa Base URL dan pastikan server berjalan.'
      + '</div>';
  }

  // ── Assemble panel ─────────────────────────────────────────────────────────
  panel.innerHTML =
    '<div style="display:flex;align-items:center;gap:8px;padding:12px 16px;border-bottom:2px solid #1e293b;background:#020617;position:sticky;top:0;z-index:1">'
      + '<i class="fas ' + icon + '" style="color:' + accent + ';font-size:15px"></i>'
      + '<b style="color:' + accent + ';font-size:13px">' + type.toUpperCase() + ' Token — '
        + (ok ? '&#10003; Berhasil' : (hasResp ? '&#9888; Respons Server' : '&#10007; Gagal')) + '</b>'
      + ms
      + '<button onclick="closeTokenPanel()" style="margin-left:auto;background:transparent;border:none;color:#64748b;cursor:pointer;font-size:18px;line-height:1;padding:0 4px">&times;</button>'
    + '</div>'
    + '<div style="padding:14px 16px">'
      + headerBlock
      + (respRows ? '<div style="margin-top:8px"><div style="color:#94a3b8;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;margin-bottom:4px;padding-bottom:4px;border-bottom:1px solid #1e293b">Server Response</div><table style="width:100%;border-collapse:collapse;line-height:1.7">' + respRows + '</table></div>' : '')
      + noteHtml
    + '</div>';

  panel.style.display = 'block';
  clearTimeout(panel._timer);
  // Keep open longer if error (user needs to read)
  panel._timer = setTimeout(function(){ panel.style.display='none'; }, ok ? 10000 : 20000);
}

// Keep showTokenToast as alias for compatibility
function showTokenToast(type, d) { showTokenDetail(type, d); }

function closeTokenPanel() {
  var p = document.getElementById('token-detail-panel');
  if (p) p.style.display = 'none';
}



// ─── Copy header value to clipboard ──────────────────────────────────────────
function copyHdr(key) {
  var cache = window._tokenHdrCache || {};
  var val = cache[key] || (key === 'X-Forwarded-For' ? WHITELIST_IP : '');
  if (!val) return;
  try {
    navigator.clipboard.writeText(val).then(function() {
      var btns = document.querySelectorAll('[onclick*="copyHdr(\\"' + key + '\\")"]');
      btns.forEach(function(b) {
        var o = b.innerHTML; b.innerHTML = '&#10003;';
        setTimeout(function(){ b.innerHTML = o; }, 1200);
      });
    });
  } catch(e) {
    var ta = document.createElement('textarea');
    ta.value = val; ta.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(ta); ta.select();
    document.execCommand('copy'); document.body.removeChild(ta);
  }
}

// ─── Try Request (+ X-Forwarded-For otomatis) ────────────────────────────────
function tryRequest(epId) {
  var btn = document.getElementById('try-btn-'+epId);
  var method = btn.getAttribute('data-method');
  var path = btn.getAttribute('data-path');
  var baseUrl = getBaseUrl();
  var url = baseUrl + path;

  var headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' };

  // Inject X-Forwarded-For jika checkbox aktif (default: aktif)
  var chk = document.getElementById('chk-xforward');
  var xfwdOn = chk ? chk.checked : true;  // default on jika elemen tidak ada
  if (xfwdOn) {
    headers['X-Forwarded-For'] = WHITELIST_IP;
    headers['X-Real-IP']       = WHITELIST_IP;
  }

  // Collect header inputs
  document.querySelectorAll('#ep-'+epId+' .try-header-input').forEach(function(inp) {
    var k = inp.getAttribute('data-key');
    var v = inp.value.trim();
    if (k && v) headers[k] = v;
  });

  // Collect query params
  var queryParams = [];
  document.querySelectorAll('#ep-'+epId+' .try-query-input').forEach(function(inp) {
    var k = inp.getAttribute('data-key');
    var v = inp.value.trim();
    if (k && v) queryParams.push(encodeURIComponent(k)+'='+encodeURIComponent(v));
  });
  if (queryParams.length) url += '?' + queryParams.join('&');

  var bodyEl = document.getElementById('try-body-'+epId);
  var bodyStr = bodyEl ? bodyEl.value.trim() : '';

  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span> Sending...';
  document.getElementById('resp-'+epId).style.display = 'none';

  var fetchOpts = { method: method, headers: headers };
  if (method === 'POST' && bodyStr) {
    try { JSON.parse(bodyStr); fetchOpts.body = bodyStr; } catch(e) {}
  }

  var reqInfo = method + ' ' + url;
  var t0 = Date.now();

  // Build sent-headers summary (exclude Content-Type for display)
  var sentHdrs = Object.keys(headers).filter(function(k){ return k !== 'Accept'; }).map(function(k){
    var v = headers[k];
    // Truncate long values
    return k + ': ' + (v && v.length > 40 ? v.substring(0,38) + '…' : v);
  }).join(String.fromCharCode(10));

  fetch(url, fetchOpts)
    .then(function(r) {
      var ms = Date.now() - t0;
      return r.text().then(function(text){ return { status: r.status, text: text, ms: ms }; });
    })
    .then(function(d){ showResponse(epId, d.status, d.text, d.ms, reqInfo, sentHdrs); })
    .catch(function(err) {
      var NL = String.fromCharCode(10);
      showResponse(epId, 0, 'Network Error: ' + err.message + NL + NL + 'Pastikan:' + NL + '1. Base URL benar' + NL + '2. Server berjalan' + NL + '3. CORS diizinkan', Date.now()-t0, reqInfo, sentHdrs);
    })
    .finally(function() {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Request';
    });
}

function showResponse(epId, status, text, ms, reqInfo, sentHdrs) {
  var box = document.getElementById('resp-'+epId);
  var codeEl = document.getElementById('resp-status-'+epId);
  var timeEl = document.getElementById('resp-time-'+epId);
  var bodyEl = document.getElementById('resp-body-'+epId);
  var reqEl  = document.getElementById('resp-req-'+epId);
  var hdrsEl = document.getElementById('resp-hdrs-'+epId);

  box.style.display = 'block';
  timeEl.textContent = ms + ' ms';
  if (reqEl && reqInfo) reqEl.textContent = reqInfo;
  if (hdrsEl && sentHdrs) {
    hdrsEl.textContent = sentHdrs;
    hdrsEl.style.display = 'block';
  }

  var cls = status >= 200 && status < 300 ? 'status-2xx' : status >= 400 && status < 500 ? 'status-4xx' : 'status-5xx';
  if (status === 0) cls = 'status-5xx';
  codeEl.className = 'status-code ' + cls;
  codeEl.textContent = status || 'ERR';

  try {
    var parsed = JSON.parse(text);
    bodyEl.innerHTML = syntaxHighlight(JSON.stringify(parsed, null, 2));
  } catch(e) {
    bodyEl.textContent = text;
  }
}

function syntaxHighlight(json) {
  json = json.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  return json.replace(/(\\s*)(\\"[^\\"]*\\")\\s*:\\s*/g, function(m,sp,key){
    return sp + '<span class="jk">'+key+'</span>: ';
  }).replace(/:\\s*(\\"[^\\"]*\\")/g, function(m,val){
    return ': <span class="js">'+val+'</span>';
  }).replace(/:\\s*(-?\\d+\\.?\\d*)/g, function(m,num){
    return ': <span class="jn">'+num+'</span>';
  }).replace(/:\\s*(true|false)/g, function(m,b){
    return ': <span class="jb">'+b+'</span>';
  }).replace(/:\\s*(null)/g, function(m,n){
    return ': <span class="jnull">'+n+'</span>';
  });
}

function copyExample(epId) {
  var el = document.getElementById('try-body-'+epId);
  var ex = el ? el.getAttribute('data-example') : '';
  if (el && ex) { el.value = ex; }
}

// Base URL change -> persist
document.getElementById('base-url-input').addEventListener('change', function() {
  localStorage.setItem('lpd_base_url', this.value);
});
(function(){
  var saved = localStorage.getItem('lpd_base_url');
  if (saved) document.getElementById('base-url-input').value = saved;
  // Restore token badges dari localStorage
  var st = localStorage.getItem('lpd_snap_token');
  var it = localStorage.getItem('lpd_ios_token');
  if (st) { _tokens.snap = st; updateTokenBadge('snap', st); }
  if (it) { _tokens.ios = it; updateTokenBadge('ios', it); }
})();
<\/script>
</body>
</html>`}function B(e,t,a,n,s,i,o,r,u){const l="mb-post",d=s.map(h=>`
    <tr>
      <td><span class="param-name">${h.name}</span></td>
      <td><span class="param-type">${h.type}</span></td>
      <td><span class="param-in">${h.in}</span></td>
      <td><span class="${h.req?"param-req":"param-opt"}">${h.req?"required":"optional"}</span></td>
      <td style="color:#374151;font-size:12px">${h.desc}</td>
    </tr>`).join(""),y=s.filter(h=>h.in==="header"),f=s.filter(h=>h.in==="query"),b=s.filter(h=>h.in==="body"),g=y.length?`
    <div class="try-label">Headers</div>
    ${y.map(h=>`
    <div class="try-row">
      <label style="font-size:11px;color:var(--muted);display:block;margin-bottom:3px">${h.name}${h.req?' <span style="color:red">*</span>':""}</label>
      <input class="try-input try-header-input" data-key="${h.name}" type="text"
        placeholder="${h.name==="Authorization"?"Bearer eyJ0eXAi...":h.name==="X-TIMESTAMP"?"2024-01-15T10:30:00+07:00":h.type}"/>
    </div>`).join("")}`:"",p=f.length?`
    <div class="try-label" style="margin-top:8px">Query Parameters</div>
    ${f.map(h=>`
    <div class="try-row">
      <label style="font-size:11px;color:var(--muted);display:block;margin-bottom:3px">${h.name}${h.req?' <span style="color:red">*</span>':""}</label>
      <input class="try-input try-query-input" data-key="${h.name}" type="text" placeholder="${h.type}"/>
    </div>`).join("")}`:"",w=b.length?`
    <div class="try-label" style="margin-top:8px">Request Body (JSON)</div>
    ${o?`<button onclick="copyExample('${e}')" style="font-size:11px;background:#f1f5f9;border:1px solid #e2e8f0;padding:3px 8px;border-radius:4px;cursor:pointer;margin-bottom:6px;color:#475569"><i class="fas fa-copy" style="margin-right:4px"></i>Isi Contoh</button>`:""}
    <textarea id="try-body-${e}" class="try-input try-textarea" data-example="${o.replace(/"/g,"&quot;")}"
      placeholder='${JSON.stringify(Object.fromEntries(b.map(h=>[h.name,h.type])),null,2)}'>${o}</textarea>`:"",v=r.map(h=>`<span class="mw-badge"><i class="fas fa-shield-alt"></i>${h}</span>`).join(""),c=u?`<div class="info-box ib-blue" style="margin-top:12px"><i class="fas fa-info-circle"></i><span>${u}</span></div>`:"",k=i?`
    <div class="try-label">Contoh Response 200 OK</div>
    <div class="schema-obj">${Ma(i)}</div>`:"";return`
<div class="ep-card" id="ep-${e}">
  <div class="ep-header" onclick="epToggle('${e}')">
    <span class="method-badge ${l}">${t}</span>
    <span class="ep-path">${a}</span>
    <span class="ep-summary">${n}</span>
    <i class="fas fa-chevron-down ep-chevron"></i>
  </div>
  <div class="ep-body">
    <div class="ep-tabs">
      <div class="ep-tab active" id="tab-${e}-params" onclick="showTab('${e}','params')">Parameters</div>
      <div class="ep-tab" id="tab-${e}-response" onclick="showTab('${e}','response')">Response</div>
      <div class="ep-tab" id="tab-${e}-try" onclick="showTab('${e}','try')">Try it out</div>
    </div>

    <!-- PARAMS TAB -->
    <div class="ep-pane active" id="pane-${e}-params">
      ${v?`<div style="margin-bottom:10px">${v}</div>`:""}
      ${c}
      <table class="param-table">
        <thead><tr><th>Name</th><th>Type</th><th>In</th><th>Required</th><th>Description</th></tr></thead>
        <tbody>${d}</tbody>
      </table>
    </div>

    <!-- RESPONSE TAB -->
    <div class="ep-pane" id="pane-${e}-response">
      ${k}
      <div class="try-label" style="margin-top:16px">Response Codes</div>
      <table class="param-table" style="margin-top:6px">
        <thead><tr><th>Status / Code</th><th>Arti</th></tr></thead>
        <tbody>
          <tr><td><span style="color:#16a34a;font-weight:700">200 / 00</span></td><td>Sukses</td></tr>
          <tr><td><span style="color:#d97706;font-weight:700">81</span></td><td>Inquiry sukses, lanjut ke posting</td></tr>
          <tr><td><span style="color:#dc2626;font-weight:700">01</span></td><td>Data tidak ditemukan / rekening tidak aktif</td></tr>
          <tr><td><span style="color:#dc2626;font-weight:700">40</span></td><td>Saldo tidak mencukupi</td></tr>
          <tr><td><span style="color:#dc2626;font-weight:700">45</span></td><td>Transaksi duplikat</td></tr>
          <tr><td><span style="color:#dc2626;font-weight:700">51-53</span></td><td>Hash mismatch (data dimodifikasi)</td></tr>
          <tr><td><span style="color:#dc2626;font-weight:700">54</span></td><td>PIN salah</td></tr>
          <tr><td><span style="color:#dc2626;font-weight:700">62</span></td><td>Transaksi tidak dapat diproses</td></tr>
          <tr><td><span style="color:#dc2626;font-weight:700">68</span></td><td>Timeout / exception</td></tr>
        </tbody>
      </table>
    </div>

    <!-- TRY IT OUT TAB -->
    <div class="ep-pane" id="pane-${e}-try">
      <div class="try-panel">
        ${g}
        ${p}
        ${w}
        <div style="display:flex;align-items:center;margin-top:14px;flex-wrap:wrap;gap:8px">
          <button class="try-btn" id="try-btn-${e}" data-method="${t}" data-path="${a}" onclick="tryRequest('${e}')">
            <i class="fas fa-paper-plane"></i> Send Request
          </button>
          <button class="try-clear" onclick="document.getElementById('resp-${e}').style.display='none'">Clear</button>
          <span style="font-size:11px;color:var(--muted);margin-left:auto">
            <i class="fas fa-info-circle"></i> Request dikirim ke Base URL di atas
          </span>
        </div>
        <div id="resp-${e}" class="response-box" style="display:none">
          <div class="response-status">
            <span class="status-code" id="resp-status-${e}">200</span>
            <span style="color:#94a3b8;font-size:12px">Response</span>
            <span class="response-time" id="resp-time-${e}"></span>
            <span id="resp-req-${e}" style="color:#475569;font-size:10px;margin-left:8px;font-family:monospace;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:220px"></span>
          </div>
          <pre id="resp-hdrs-${e}" style="display:none;background:#0a0f1e;color:#475569;font-size:10px;padding:8px 14px;margin:0;border-bottom:1px solid #1e293b;white-space:pre;font-family:monospace;line-height:1.5"></pre>
          <pre class="response-body" id="resp-body-${e}"></pre>
        </div>
      </div>
    </div>

  </div>
</div>`}function Ma(e){try{return JSON.stringify(JSON.parse(e),null,2).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/("[\w-]+")\s*:/g,'<span class="hl-key">$1</span>:').replace(/:\s*(".*?")/g,': <span class="hl-str">$1</span>').replace(/:\s*(-?\d+\.?\d*)/g,': <span class="hl-num">$1</span>').replace(/:\s*(true|false)/g,': <span class="hl-bool">$1</span>')}catch{return e}}function Ha(){return`<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>LPD Seminyak — Crypto Toolkit</title>
<script src="https://cdn.tailwindcss.com"><\/script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css"/>
<style>
:root{--primary:#7c3aed;--primary-dark:#5b21b6;--secondary:#0f172a;--sidebar-w:260px}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',system-ui,sans-serif;background:#0f172a;color:#e2e8f0;min-height:100vh}
#sidebar{position:fixed;top:0;left:0;width:var(--sidebar-w);height:100vh;background:#1e1b4b;overflow-y:auto;z-index:100;border-right:1px solid #312e81}
#sidebar .logo{padding:18px 16px 14px;background:linear-gradient(135deg,#4c1d95,#7c3aed);border-bottom:1px solid #4c1d95}
#sidebar .logo h1{font-size:15px;font-weight:800;color:#fff;letter-spacing:.5px}
#sidebar .logo p{font-size:10px;color:#c4b5fd;margin-top:3px}
#sidebar nav a{display:flex;align-items:center;gap:9px;padding:9px 14px;font-size:12px;color:#a5b4fc;text-decoration:none;transition:all .15s;cursor:pointer;border-left:3px solid transparent}
#sidebar nav a:hover,#sidebar nav a.active{color:#fff;background:rgba(139,92,246,.2);border-left-color:#7c3aed}
#sidebar nav a i{width:16px;text-align:center;font-size:13px}
#sidebar .nav-section{padding:10px 14px 3px;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:1.5px;color:#4c1d95}
#main{margin-left:var(--sidebar-w);min-height:100vh;padding:0 0 40px}
.topbar{background:#1e1b4b;border-bottom:1px solid #312e81;padding:12px 28px;display:flex;align-items:center;justify-content:space-between}
.topbar h2{font-size:16px;font-weight:700;color:#c4b5fd}
.section{display:none}.section.active{display:block}
.content{padding:24px 28px}
.panel{background:#1e293b;border:1px solid #334155;border-radius:12px;margin-bottom:20px;overflow:hidden}
.panel-header{padding:14px 18px;background:#0f172a;border-bottom:1px solid #1e293b;display:flex;align-items:center;gap:10px}
.panel-header h3{font-size:13px;font-weight:700;color:#a78bfa}
.panel-header .badge{font-size:10px;padding:2px 8px;border-radius:999px;background:#312e81;color:#c4b5fd;font-weight:600}
.panel-body{padding:18px}
label{display:block;font-size:11px;font-weight:600;color:#94a3b8;margin-bottom:5px;text-transform:uppercase;letter-spacing:.5px}
input[type=text],input[type=number],textarea,select{
  width:100%;background:#0f172a;border:1px solid #334155;border-radius:7px;
  padding:9px 12px;color:#e2e8f0;font-size:13px;font-family:'Courier New',monospace;
  outline:none;transition:border .15s;
}
input[type=text]:focus,input[type=number]:focus,textarea:focus,select:focus{border-color:#7c3aed}
textarea{resize:vertical;min-height:80px;line-height:1.5}
select{cursor:pointer}
.btn{display:inline-flex;align-items:center;gap:7px;padding:9px 18px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;border:none;transition:all .15s;text-transform:uppercase;letter-spacing:.5px}
.btn-primary{background:linear-gradient(135deg,#7c3aed,#6d28d9);color:#fff}
.btn-primary:hover{background:linear-gradient(135deg,#6d28d9,#5b21b6);transform:translateY(-1px)}
.btn-secondary{background:#334155;color:#94a3b8}
.btn-secondary:hover{background:#475569;color:#e2e8f0}
.btn-green{background:linear-gradient(135deg,#059669,#047857);color:#fff}
.btn-green:hover{background:linear-gradient(135deg,#047857,#065f46)}
.btn-orange{background:linear-gradient(135deg,#d97706,#b45309);color:#fff}
.btn-orange:hover{background:linear-gradient(135deg,#b45309,#92400e)}
.btn-red{background:linear-gradient(135deg,#dc2626,#b91c1c);color:#fff}
.btn-red:hover{background:linear-gradient(135deg,#b91c1c,#991b1b)}
.btn:disabled{opacity:.5;cursor:not-allowed;transform:none!important}
.result-box{margin-top:14px;display:none}
.result-box.show{display:block}
.result-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}
.result-header span{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.5px}
.result-ok{color:#34d399}.result-err{color:#f87171}
pre.result{background:#020617;border:1px solid #1e293b;border-radius:8px;padding:14px;font-size:11.5px;font-family:'Courier New',monospace;color:#a5f3fc;overflow-x:auto;white-space:pre-wrap;word-break:break-all;max-height:400px;overflow-y:auto;line-height:1.6}
.copy-btn{background:#1e293b;border:1px solid #334155;color:#94a3b8;border-radius:5px;padding:3px 9px;font-size:10px;cursor:pointer;transition:all .15s}
.copy-btn:hover{background:#334155;color:#e2e8f0}
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.grid-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px}
@media(max-width:900px){.grid-2,.grid-3{grid-template-columns:1fr}}
.field-row{margin-bottom:12px}
.info-box{padding:10px 14px;border-radius:8px;font-size:12px;margin:10px 0;display:flex;gap:9px;align-items:flex-start;line-height:1.6}
.info-box i{margin-top:1px;flex-shrink:0}
.info-purple{background:#1e1b4b;border-left:3px solid #7c3aed;color:#a5b4fc}
.info-green{background:#022c22;border-left:3px solid #059669;color:#6ee7b7}
.info-red{background:#2d0000;border-left:3px solid #dc2626;color:#fca5a5}
.info-yellow{background:#1c1200;border-left:3px solid #d97706;color:#fcd34d}
.spinner{width:14px;height:14px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:spin .6s linear infinite;display:inline-block}
@keyframes spin{to{transform:rotate(360deg)}}
.tab-bar{display:flex;gap:2px;border-bottom:1px solid #334155;margin-bottom:16px}
.tab{padding:8px 16px;font-size:12px;font-weight:600;color:#64748b;cursor:pointer;border-bottom:2px solid transparent;transition:all .15s}
.tab.active{color:#a78bfa;border-bottom-color:#7c3aed}
.tab-panel{display:none}.tab-panel.active{display:block}
.stat-row{display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid #1e293b;font-size:12px}
.stat-row:last-child{border-bottom:none}
.stat-key{color:#64748b;min-width:130px;font-family:monospace}
.stat-val{color:#a5f3fc;font-family:monospace;word-break:break-all}
.divider{height:1px;background:#1e293b;margin:16px 0}
.quick-ref{background:#020617;border:1px solid #1e293b;border-radius:8px;padding:12px;font-size:11px;font-family:monospace;color:#64748b;line-height:2}
.quick-ref .cmd{color:#a5f3fc}
.quick-ref .comment{color:#475569}
.badge-algo{display:inline-block;padding:2px 7px;border-radius:4px;font-size:10px;font-weight:700}
.badge-aes{background:#1e3a5f;color:#60a5fa}
.badge-hmac{background:#1c1200;color:#fcd34d}
.badge-rsa{background:#1e1b4b;color:#a78bfa}
.badge-sha{background:#022c22;color:#6ee7b7}
.nav-back{padding:10px 14px;border-top:1px solid #312e81;position:sticky;bottom:0;background:#1e1b4b}

/* ── MOBILE HAMBURGER & OVERLAY ── */
#menu-toggle{display:none;background:none;border:none;color:#a5b4fc;font-size:22px;cursor:pointer;padding:4px 8px;line-height:1}
#sidebar-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:99;backdrop-filter:blur(2px)}
#sidebar-overlay.show{display:block}

/* ── TOPBAR RESPONSIVE ── */
.topbar{flex-wrap:wrap;gap:8px}
.topbar-badges{display:flex;gap:6px;flex-wrap:wrap}

/* ── BUTTON GROUPS ── */
.btn-group{display:flex;gap:8px;flex-wrap:wrap;margin-top:4px}
.btn-group .btn{flex:1;min-width:120px;justify-content:center}

/* ── SMART / TRANSAKSI ── */
.session-box{background:#0c1a0c;border:1px solid #166534;border-radius:10px;padding:12px 16px;margin-bottom:16px}
.session-box .session-title{font-size:11px;font-weight:700;color:#4ade80;text-transform:uppercase;letter-spacing:.8px;margin-bottom:8px}
.session-field{display:flex;align-items:center;gap:8px;margin-bottom:4px;font-size:11px}
.session-field .sf-label{color:#6ee7b7;min-width:90px;font-family:monospace}
.session-field .sf-val{color:#a7f3d0;font-family:monospace;word-break:break-all;flex:1}
.session-field .sf-copy{background:none;border:1px solid #166534;color:#4ade80;border-radius:4px;padding:1px 7px;font-size:10px;cursor:pointer}
.badge-live{display:inline-flex;align-items:center;gap:5px;background:#052e16;border:1px solid #166534;color:#4ade80;font-size:10px;font-weight:700;padding:2px 9px;border-radius:999px}
.badge-live .dot{width:6px;height:6px;background:#4ade80;border-radius:50%;animation:pulse 1.5s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
.badge-offline{display:inline-flex;align-items:center;gap:5px;background:#1f1f1f;border:1px solid #374151;color:#6b7280;font-size:10px;font-weight:700;padding:2px 9px;border-radius:999px}
.step-indicator{display:flex;align-items:center;gap:0;margin-bottom:18px;flex-wrap:wrap;gap:4px}
.step{display:flex;align-items:center;gap:6px;font-size:11px;font-weight:600;padding:5px 12px;border-radius:999px;background:#1e293b;color:#64748b;border:1px solid #334155}
.step.done{background:#052e16;color:#4ade80;border-color:#166534}
.step.active{background:#312e81;color:#a78bfa;border-color:#4c1d95}
.step-arrow{color:#334155;font-size:10px}
.amount-input{font-size:20px!important;font-weight:700!important;color:#fbbf24!important;text-align:right}
.confirm-box{background:#1c1200;border:1px solid #92400e;border-radius:10px;padding:14px;margin:12px 0}
.confirm-row{display:flex;justify-content:space-between;align-items:center;padding:5px 0;border-bottom:1px solid #292524;font-size:12px}
.confirm-row:last-child{border-bottom:none}
.confirm-label{color:#78716c}
.confirm-value{color:#fbbf24;font-weight:700;font-family:monospace}

/* ── MOBILE BREAKPOINT ── */
@media(max-width:768px){
  :root{--sidebar-w:280px}
  #sidebar{transform:translateX(-100%);transition:transform .25s ease;box-shadow:4px 0 20px rgba(0,0,0,.5)}
  #sidebar.open{transform:translateX(0)}
  #menu-toggle{display:inline-flex;align-items:center}
  #main{margin-left:0!important}
  .topbar{padding:10px 14px}
  .topbar h2{font-size:13px}
  .content{padding:14px 12px}
  .panel-body{padding:12px}
  .panel-header{padding:10px 14px}
  .grid-2,.grid-3{grid-template-columns:1fr!important}
  .topbar-badges span{font-size:9px;padding:2px 7px}
  pre.result{font-size:10.5px;max-height:280px}
  .stat-key{min-width:100px;font-size:11px}
  .stat-val{font-size:11px}
  .btn{padding:10px 14px;font-size:11px}
  .quick-ref{font-size:10px}
  textarea{min-height:70px}
}

@media(max-width:480px){
  .topbar h2 span.hide-xs{display:none}
  .btn-group .btn{min-width:100%;flex:1 1 100%}
  .tab{padding:7px 10px;font-size:11px}
  .info-box{font-size:11px}
  label{font-size:10px}
  input[type=text],input[type=number],textarea,select{font-size:12px;padding:8px 10px}
}
</style>
</head>
<body>

<div id="sidebar-overlay" onclick="closeSidebar()"></div>
<aside id="sidebar">
<div class="logo">
  <h1><i class="fas fa-lock mr-1"></i> LPD Crypto Toolkit</h1>
  <p>AES-256-CBC · RSA · HMAC-SHA512</p>
</div>
<nav>
  <div class="nav-section">Kunci &amp; Token</div>
  <a href="#" onclick="showTab('keygen');return false" id="nav-keygen" class="active"><i class="fas fa-key"></i> Derive AES Keys</a>
  <a href="#" onclick="showTab('timestamp');return false" id="nav-timestamp"><i class="fas fa-clock"></i> Timestamp Jakarta</a>
  <a href="#" onclick="showTab('reference');return false" id="nav-reference"><i class="fas fa-hashtag"></i> Generate X-REFERENCE</a>
  <div class="nav-section">Enkripsi &amp; Dekripsi</div>
  <a href="#" onclick="showTab('encrypt');return false" id="nav-encrypt"><i class="fas fa-lock"></i> AES Encrypt</a>
  <a href="#" onclick="showTab('decrypt');return false" id="nav-decrypt"><i class="fas fa-unlock"></i> AES Decrypt</a>
  <a href="#" onclick="showTab('decrypt-body');return false" id="nav-decrypt-body"><i class="fas fa-box-open"></i> Decrypt Request Body</a>
  <div class="nav-section">Header Decode/Encode</div>
  <a href="#" onclick="showTab('did-decode');return false" id="nav-did-decode"><i class="fas fa-id-card"></i> Decode X-CLIENT-ID</a>
  <a href="#" onclick="showTab('did-encode');return false" id="nav-did-encode"><i class="fas fa-id-badge"></i> Encode X-CLIENT-ID</a>
  <a href="#" onclick="showTab('jwt-decode');return false" id="nav-jwt-decode"><i class="fas fa-file-code"></i> Decode JWT</a>
  <a href="#" onclick="showTab('sig-decode');return false" id="nav-sig-decode"><i class="fas fa-signature"></i> Decode X-SIGNATURE</a>
  <div class="nav-section">Generate Signature</div>
  <a href="#" onclick="showTab('signature');return false" id="nav-signature"><i class="fas fa-pen-nib"></i> X-SIGNATURE / PARTNER-ID</a>
  <a href="#" onclick="showTab('ios-token-sig');return false" id="nav-ios-token-sig"><i class="fas fa-mobile-alt"></i> iOS Token Signature</a>
  <a href="#" onclick="showTab('snap-token-sig');return false" id="nav-snap-token-sig"><i class="fas fa-plug"></i> SNAP Token Signature</a>
  <div class="nav-section">Hash &amp; Builder</div>
  <a href="#" onclick="showTab('hashcode');return false" id="nav-hashcode"><i class="fas fa-fingerprint"></i> Hash Code Transfer</a>
  <a href="#" onclick="showTab('build-transfer');return false" id="nav-build-transfer"><i class="fas fa-hammer"></i> Build Transfer Request</a>
  <div class="nav-section">Referensi</div>
  <a href="#" onclick="showTab('quick-ref');return false" id="nav-quick-ref"><i class="fas fa-book"></i> Referensi Cepat</a>
  <div class="nav-section" style="color:#f59e0b">Transaksi</div>
  <a href="#" onclick="showTab('smart-login');return false" id="nav-smart-login"><i class="fas fa-sign-in-alt"></i> Login Nasabah</a>
  <a href="#" onclick="showTab('smart-saldo');return false" id="nav-smart-saldo"><i class="fas fa-wallet"></i> Cek Saldo</a>
  <a href="#" onclick="showTab('smart-transfer');return false" id="nav-smart-transfer"><i class="fas fa-exchange-alt"></i> Transfer</a>
</nav>
<div class="nav-back">
  <a href="/swagger" style="display:flex;align-items:center;gap:7px;font-size:11px;color:#6d28d9;text-decoration:none"><i class="fas fa-flask"></i> Buka API Explorer</a>
</div>
</aside>

<div id="main">
<div class="topbar">
  <div style="display:flex;align-items:center;gap:10px">
    <button id="menu-toggle" onclick="toggleSidebar()" aria-label="Menu"><i class="fas fa-bars"></i></button>
    <h2><i class="fas fa-lock" style="margin-right:6px"></i><span>LPD Seminyak</span> <span class="hide-xs">— Crypto Toolkit</span></h2>
  </div>
  <div class="topbar-badges">
    <span style="background:#312e81;color:#a5b4fc;font-size:10px;padding:3px 9px;border-radius:999px;font-weight:700">AES-256-CBC</span>
    <span style="background:#1c1200;color:#fcd34d;font-size:10px;padding:3px 9px;border-radius:999px;font-weight:700">HMAC-SHA512</span>
    <span style="background:#022c22;color:#6ee7b7;font-size:10px;padding:3px 9px;border-radius:999px;font-weight:700">RSA-SHA256</span>
  </div>
</div>

<div class="content">

<!-- ═══════════════════════════════════════════════════════════ -->
<!-- DERIVE AES KEYS -->
<!-- ═══════════════════════════════════════════════════════════ -->
<section id="tab-keygen" class="section active">
<div class="panel">
  <div class="panel-header">
    <i class="fas fa-key" style="color:#a78bfa"></i>
    <h3>Derive AES Keys (Gio_CreateKeyAndIv)</h3>
    <span class="badge">HMAC-SHA512</span>
  </div>
  <div class="panel-body">
    <div class="info-box info-purple">
      <i class="fas fa-info-circle"></i>
      <div>Menderivasi AES key, IV, dan CS dari <b>clientID</b> + <b>timestamp</b>. Replika tepat dari PHP <code>Gio_CreateKeyAndIv($clientID, $timeStamp)</code>. Digunakan pada saat registrasi perangkat baru (bukan DB lookup).</div>
    </div>
    <div class="grid-2">
      <div class="field-row">
        <label>Client ID</label>
        <input type="text" id="kg-clientid" placeholder="AQ3A.240912.001.01102025120205" value="AQ3A.240912.001.01102025120205"/>
      </div>
      <div class="field-row">
        <label>Timestamp (YYYY-MM-DD HH:MM:SS)</label>
        <input type="text" id="kg-ts" placeholder="2026-04-20 11:44:20" value="2026-04-20 11:44:20"/>
      </div>
    </div>
    <div class="btn-group">
      <button class="btn btn-primary" onclick="runOp(event,'keygen')"><i class="fas fa-play"></i> Derive Keys + Generate X-CLIENT-ID</button>
      <button class="btn btn-secondary" onclick="fillNow('kg-ts')"><i class="fas fa-clock"></i> Sekarang (Jakarta)</button>
    </div>
    <div id="result-keygen" class="result-box"></div>

    <!-- Auto X-CLIENT-ID result panel (muncul otomatis setelah keygen) -->
    <div id="kg-did-panel" style="display:none;margin-top:12px;border:1px solid #22c55e33;border-radius:8px;background:#0a1a0a;padding:14px">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
        <span style="color:#22c55e;font-size:13px;font-weight:700"><i class="fas fa-id-badge"></i> X-CLIENT-ID (Auto-Generated)</span>
        <span id="kg-did-badge" style="background:#14532d;color:#4ade80;font-size:10px;padding:2px 8px;border-radius:10px;font-weight:700">✅ SIAP</span>
      </div>
      <div style="display:flex;gap:6px;align-items:stretch">
        <textarea id="kg-did-output" readonly rows="3" style="flex:1;background:#0d0d0d;border:1px solid #1a3a1a;border-radius:6px;color:#4ade80;font-size:10px;font-family:monospace;padding:8px;resize:none;word-break:break-all"></textarea>
        <div style="display:flex;flex-direction:column;gap:6px">
          <button class="btn btn-secondary" style="font-size:10px;padding:6px 10px;white-space:nowrap" onclick="copyText(this,document.getElementById('kg-did-output').value)"><i class="fas fa-copy"></i> Salin</button>
          <button class="btn btn-primary" style="font-size:10px;padding:6px 10px;white-space:nowrap;background:linear-gradient(135deg,#d97706,#b45309)" onclick="showTab('smart-login')"><i class="fas fa-sign-in-alt"></i> Login</button>
        </div>
      </div>
      <div style="margin-top:8px;font-size:10px;color:#6b7280"><i class="fas fa-magic" style="color:#a78bfa"></i> X-CLIENT-ID di-encode otomatis dari clientID + timestamp yang sama. Form Login sudah diisi otomatis.</div>
    </div>

    <div class="divider"></div>
    <div class="info-box info-yellow">
      <i class="fas fa-info-circle"></i>
      <div><b>Cara kerja:</b> HMAC-SHA512(key=timestamp, msg=clientID) → 64 bytes → slice ke-HH:MM:SS untuk dapat key/iv/cs. AES Key = 32 bytes, IV = 16 bytes, CS = 8 bytes. <b>X-CLIENT-ID di-encode otomatis</b> menggunakan clientID + timestamp yang sama.</div>
    </div>
    <div class="quick-ref">
      <span class="comment"># CLI:</span><br>
      <span class="cmd">node lpd-crypto.cjs keygen "AQ3A.240912.001.01102025120205" "2026-04-20 11:44:20"</span>
    </div>
  </div>
</div>
</section>

<!-- ═══════════════════════════════════════════════════════════ -->
<!-- TIMESTAMP -->
<!-- ═══════════════════════════════════════════════════════════ -->
<section id="tab-timestamp" class="section">
<div class="panel">
  <div class="panel-header">
    <i class="fas fa-clock" style="color:#a78bfa"></i>
    <h3>Timestamp Jakarta (WIB UTC+7)</h3>
    <span class="badge">Utility</span>
  </div>
  <div class="panel-body">
    <div class="info-box info-green">
      <i class="fas fa-info-circle"></i>
      <div>Menghasilkan timestamp waktu Jakarta sekarang dalam dua format: <b>YYYY-MM-DD HH:MM:SS</b> (untuk iOS API) dan <b>ISO8601+07:00</b> (untuk SNAP API).</div>
    </div>
    <button class="btn btn-green" onclick="runOp(event,'timestamp')"><i class="fas fa-sync"></i> Get Timestamp Sekarang</button>
    <div id="result-timestamp" class="result-box"></div>
    <div class="divider"></div>
    <div class="quick-ref">
      <span class="comment"># Format iOS (gmob_request, X-TIMESTAMP field):</span><br>
      <span class="cmd">2026-04-20 11:44:20</span><br>
      <span class="comment"># Format SNAP (ISO8601 dengan offset):</span><br>
      <span class="cmd">2026-04-20T11:44:20+07:00</span>
    </div>
  </div>
</div>
</section>

<!-- ═══════════════════════════════════════════════════════════ -->
<!-- REFERENCE -->
<!-- ═══════════════════════════════════════════════════════════ -->
<section id="tab-reference" class="section">
<div class="panel">
  <div class="panel-header">
    <i class="fas fa-hashtag" style="color:#a78bfa"></i>
    <h3>Generate X-REFERENCE</h3>
    <span class="badge">Unique ID</span>
  </div>
  <div class="panel-body">
    <div class="info-box info-purple">
      <i class="fas fa-info-circle"></i>
      <div>Generate nomor referensi unik format <b>SMYHHMMSSxxxxO1012YYYYMMDD</b>. Setiap request transfer membutuhkan X-REFERENCE yang belum pernah digunakan (status 45 = duplikat).</div>
    </div>
    <div class="grid-2">
      <div class="field-row">
        <label>Prefix (default: SMY)</label>
        <input type="text" id="ref-prefix" placeholder="SMY" value="SMY"/>
      </div>
      <div class="field-row">
        <label>Jumlah (1–10)</label>
        <input type="number" id="ref-count" placeholder="5" value="5" min="1" max="10"/>
      </div>
    </div>
    <button class="btn btn-primary" onclick="runOp(event,'reference')"><i class="fas fa-dice"></i> Generate References</button>
    <div id="result-reference" class="result-box"></div>
    <div class="divider"></div>
    <div class="info-box info-red">
      <i class="fas fa-exclamation-triangle"></i>
      <div><b>Penting:</b> Setiap X-REFERENCE hanya bisa digunakan SATU KALI per endpoint. Jika server mengembalikan status 45 ("No. referensi duplikat"), generate reference baru.</div>
    </div>
  </div>
</div>
</section>

<!-- ═══════════════════════════════════════════════════════════ -->
<!-- AES ENCRYPT -->
<!-- ═══════════════════════════════════════════════════════════ -->
<section id="tab-encrypt" class="section">
<div class="panel">
  <div class="panel-header">
    <i class="fas fa-lock" style="color:#a78bfa"></i>
    <h3>AES-256-CBC Encrypt (Gio_Encrypt)</h3>
    <span class="badge">AES-256-CBC</span>
  </div>
  <div class="panel-body">
    <div class="info-box info-purple">
      <i class="fas fa-info-circle"></i>
      <div>Enkripsi plaintext dengan AES-256-CBC. Replika dari PHP <code>openssl_encrypt($plain,'AES-256-CBC',$key,OPENSSL_RAW_DATA,$iv)</code>. Gunakan key/iv dari hasil Derive AES Keys.</div>
    </div>
    <div class="field-row">
      <label>Plaintext</label>
      <input type="text" id="enc-plain" placeholder="1234567890"/>
    </div>
    <div class="grid-2">
      <div class="field-row">
        <label>AES Key (base64, 32 bytes)</label>
        <input type="text" id="enc-key" placeholder="6mFbbiR/yZ7y1O7pFHEDJ0lZOVJFalA8piKaZLrWcBg="/>
      </div>
      <div class="field-row">
        <label>AES IV (base64, 16 bytes)</label>
        <input type="text" id="enc-iv" placeholder="ZLrWcBiRrq+egQkyb8Pf0g=="/>
      </div>
    </div>
    <div class="btn-group">
      <button class="btn btn-primary" onclick="runOp(event,'encrypt')"><i class="fas fa-lock"></i> Encrypt</button>
      <button class="btn btn-secondary" onclick="pasteFromKeygen('enc-key','enc-iv')"><i class="fas fa-paste"></i> Paste dari Keygen</button>
    </div>
    <div id="result-encrypt" class="result-box"></div>
    <div class="divider"></div>
    <div class="quick-ref">
      <span class="comment"># CLI:</span><br>
      <span class="cmd">node lpd-crypto.cjs encrypt "plaintext" "&lt;aesKey_b64&gt;" "&lt;aesIv_b64&gt;"</span>
    </div>
  </div>
</div>
</section>

<!-- ═══════════════════════════════════════════════════════════ -->
<!-- AES DECRYPT -->
<!-- ═══════════════════════════════════════════════════════════ -->
<section id="tab-decrypt" class="section">
<div class="panel">
  <div class="panel-header">
    <i class="fas fa-unlock" style="color:#a78bfa"></i>
    <h3>AES-256-CBC Decrypt (Gio_Decrypt)</h3>
    <span class="badge">AES-256-CBC</span>
  </div>
  <div class="panel-body">
    <div class="info-box info-purple">
      <i class="fas fa-info-circle"></i>
      <div>Dekripsi ciphertext base64 kembali ke plaintext. Replika dari PHP <code>openssl_decrypt(base64_decode($enc),'AES-256-CBC',$key,OPENSSL_RAW_DATA,$iv)</code>.</div>
    </div>
    <div class="field-row">
      <label>Ciphertext (base64)</label>
      <textarea id="dec-cipher" placeholder="RKtZRW+Abxp/HBPMeBzAMw=="></textarea>
    </div>
    <div class="grid-2">
      <div class="field-row">
        <label>AES Key (base64, 32 bytes)</label>
        <input type="text" id="dec-key" placeholder="6mFbbiR/yZ7y1O7pFHEDJ0lZOVJFalA8piKaZLrWcBg="/>
      </div>
      <div class="field-row">
        <label>AES IV (base64, 16 bytes)</label>
        <input type="text" id="dec-iv" placeholder="ZLrWcBiRrq+egQkyb8Pf0g=="/>
      </div>
    </div>
    <div class="btn-group">
      <button class="btn btn-orange" onclick="runOp(event,'decrypt')"><i class="fas fa-unlock"></i> Decrypt</button>
      <button class="btn btn-secondary" onclick="pasteFromKeygen('dec-key','dec-iv')"><i class="fas fa-paste"></i> Paste dari Keygen</button>
    </div>
    <div id="result-decrypt" class="result-box"></div>
    <div class="divider"></div>
    <div class="quick-ref">
      <span class="comment"># CLI:</span><br>
      <span class="cmd">node lpd-crypto.cjs decrypt "&lt;cipher_b64&gt;" "&lt;aesKey_b64&gt;" "&lt;aesIv_b64&gt;"</span>
    </div>
  </div>
</div>
</section>

<!-- ═══════════════════════════════════════════════════════════ -->
<!-- DECRYPT REQUEST BODY -->
<!-- ═══════════════════════════════════════════════════════════ -->
<section id="tab-decrypt-body" class="section">
<div class="panel">
  <div class="panel-header">
    <i class="fas fa-box-open" style="color:#a78bfa"></i>
    <h3>Decrypt Full Request Body</h3>
    <span class="badge">Batch Decrypt</span>
  </div>
  <div class="panel-body">
    <div class="info-box info-yellow">
      <i class="fas fa-exclamation-triangle"></i>
      <div><b>Catatan:</b> Body field (from_acc, to_acc, dst) hanya bisa didekripsi jika AES key/IV-nya SAMA dengan yang digunakan saat enkripsi (dari DB atau Gio_CreateKeyAndIv). Data dari curl real membutuhkan AES key dari tabel gmob_nasabah di database.</div>
    </div>
    <div class="field-row">
      <label>Body JSON (field-field yang terenkripsi)</label>
      <textarea id="db-body" style="min-height:160px;font-size:11px" placeholder='{"from_acc":"5re0Z89b0k2cwoL+K1HeRQ==","to_acc":"AvYW9eJG...","amount":"rJTs...","date_time":"SRcf...","to_name":"q7fp...","hash_code":"3MNi...","remark":""}'></textarea>
    </div>
    <div class="grid-2">
      <div class="field-row">
        <label>AES Key (base64, 32 bytes)</label>
        <input type="text" id="db-key" placeholder="6mFbbiR/yZ7y1O7pFHEDJ0lZOVJFalA8piKaZLrWcBg="/>
      </div>
      <div class="field-row">
        <label>AES IV (base64, 16 bytes)</label>
        <input type="text" id="db-iv" placeholder="ZLrWcBiRrq+egQkyb8Pf0g=="/>
      </div>
    </div>
    <div class="btn-group">
      <button class="btn btn-orange" onclick="runOp(event,'decrypt-body')"><i class="fas fa-box-open"></i> Decrypt Body</button>
      <button class="btn btn-secondary" onclick="pasteFromKeygen('db-key','db-iv')"><i class="fas fa-paste"></i> Paste dari Keygen</button>
      <button class="btn btn-secondary" onclick="fillSampleBody()"><i class="fas fa-fill"></i> Contoh dari curl Real</button>
    </div>
    <div id="result-decrypt-body" class="result-box"></div>
  </div>
</div>
</section>

<!-- ═══════════════════════════════════════════════════════════ -->
<!-- DID DECODE -->
<!-- ═══════════════════════════════════════════════════════════ -->
<section id="tab-did-decode" class="section">
<div class="panel">
  <div class="panel-header">
    <i class="fas fa-id-card" style="color:#a78bfa"></i>
    <h3>Decode X-CLIENT-ID (Gio_DecryptDID)</h3>
    <span class="badge">DID</span>
  </div>
  <div class="panel-body">
    <div class="info-box info-purple">
      <i class="fas fa-info-circle"></i>
      <div>Dekode header <b>X-CLIENT-ID</b> menjadi <code>app|clientID|timestamp</code>. Algoritma custom: ekstrak 3 segmen base64 dari posisi tersembunyi, decode, split oleh "|".</div>
    </div>
    <div class="field-row">
      <label>X-CLIENT-ID (encoded DID, biasanya 400–600 karakter)</label>
      <textarea id="did-decode-val" style="min-height:100px;font-size:10px" placeholder="U01ZU2V6F3B7BWtV[M39ZkVGUk0wRXVNalF3T1RFeUxqQXdNUzR3TVRFd01qQXlOVEU2VtaW55YWt8..."></textarea>
    </div>
    <div class="btn-group">
      <button class="btn btn-primary" onclick="runOp(event,'did-decode')"><i class="fas fa-unlock-alt"></i> Decode DID</button>
      <button class="btn btn-secondary" onclick="fillSampleDID()"><i class="fas fa-fill"></i> Contoh DID Real</button>
    </div>
    <div id="result-did-decode" class="result-box"></div>
    <div class="divider"></div>
    <div class="quick-ref">
      <span class="comment"># CLI:</span><br>
      <span class="cmd">node lpd-crypto.cjs did "&lt;X-CLIENT-ID&gt;"</span>
    </div>
  </div>
</div>
</section>

<!-- ═══════════════════════════════════════════════════════════ -->
<!-- DID ENCODE -->
<!-- ═══════════════════════════════════════════════════════════ -->
<section id="tab-did-encode" class="section">
<div class="panel">
  <div class="panel-header">
    <i class="fas fa-id-badge" style="color:#a78bfa"></i>
    <h3>Encode X-CLIENT-ID (kebalikan DID)</h3>
    <span class="badge">DID Encode</span>
  </div>
  <div class="panel-body">
    <div class="info-box info-green">
      <i class="fas fa-info-circle"></i>
      <div>Buat X-CLIENT-ID dari clientID + timestamp. Berguna untuk simulasi request dari perangkat baru.</div>
    </div>
    <div class="grid-2">
      <div class="field-row">
        <label>Client ID</label>
        <input type="text" id="die-clientid" placeholder="AQ3A.240912.001.01102025120205" value="AQ3A.240912.001.01102025120205"/>
      </div>
      <div class="field-row">
        <label>Timestamp (YYYY-MM-DD HH:MM:SS)</label>
        <input type="text" id="die-ts" placeholder="2026-04-21 10:30:00"/>
      </div>
    </div>
    <div class="field-row">
      <label>App Name (default: Seminyak)</label>
      <input type="text" id="die-app" placeholder="Seminyak" value="Seminyak"/>
    </div>
    <div class="btn-group">
      <button class="btn btn-green" onclick="runOp(event,'did-encode')"><i class="fas fa-lock"></i> Encode DID</button>
      <button class="btn btn-secondary" onclick="fillNow('die-ts')"><i class="fas fa-clock"></i> Timestamp Sekarang</button>
    </div>
    <div id="result-did-encode" class="result-box"></div>
  </div>
</div>
</section>

<!-- ═══════════════════════════════════════════════════════════ -->
<!-- JWT DECODE -->
<!-- ═══════════════════════════════════════════════════════════ -->
<section id="tab-jwt-decode" class="section">
<div class="panel">
  <div class="panel-header">
    <i class="fas fa-file-code" style="color:#a78bfa"></i>
    <h3>Decode JWT (Authorization header)</h3>
    <span class="badge">JWT RS256</span>
  </div>
  <div class="panel-body">
    <div class="info-box info-purple">
      <i class="fas fa-info-circle"></i>
      <div>Decode JWT Authorization header. Format custom LPD: header berisi <code>trans_no</code> + <code>alg:RS256</code>; payload berisi <code>trans_time</code>. Dibuat oleh lamanuna.biz.id Get_Token.</div>
    </div>
    <div class="field-row">
      <label>JWT Token (Authorization header value)</label>
      <textarea id="jwt-val" style="min-height:100px;font-size:10px" placeholder="eyJ0cmFuc19ubyI6IjExMTIzLTQzNTI0..."></textarea>
    </div>
    <div class="btn-group">
      <button class="btn btn-primary" onclick="runOp(event,'jwt-decode')"><i class="fas fa-code"></i> Decode JWT</button>
      <button class="btn btn-secondary" onclick="fillSampleJWT()"><i class="fas fa-fill"></i> Contoh JWT Real</button>
    </div>
    <div id="result-jwt-decode" class="result-box"></div>
    <div class="divider"></div>
    <div class="quick-ref">
      <span class="comment"># CLI:</span><br>
      <span class="cmd">node lpd-crypto.cjs jwt "&lt;token&gt;"</span>
    </div>
  </div>
</div>
</section>

<!-- ═══════════════════════════════════════════════════════════ -->
<!-- SIG DECODE -->
<!-- ═══════════════════════════════════════════════════════════ -->
<section id="tab-sig-decode" class="section">
<div class="panel">
  <div class="panel-header">
    <i class="fas fa-signature" style="color:#a78bfa"></i>
    <h3>Decode X-SIGNATURE / X-PARTNER-ID</h3>
    <span class="badge">base64 → hex</span>
  </div>
  <div class="panel-body">
    <div class="info-box info-purple">
      <i class="fas fa-info-circle"></i>
      <div>Decode X-SIGNATURE atau X-PARTNER-ID dari base64 ke hex. Keduanya menggunakan formula yang sama: <code>base64(HMAC-SHA512(token:timestamp, aes_cs))</code>.</div>
    </div>
    <div class="field-row">
      <label>X-SIGNATURE atau X-PARTNER-ID (base64)</label>
      <textarea id="sigd-val" placeholder="N2E2Y2VhNGNlZDgyYWQ3NT..."></textarea>
    </div>
    <button class="btn btn-primary" onclick="runOp(event,'sig-decode')"><i class="fas fa-search"></i> Decode Signature</button>
    <div id="result-sig-decode" class="result-box"></div>
    <div class="divider"></div>
    <div class="quick-ref">
      <span class="comment"># CLI:</span><br>
      <span class="cmd">node lpd-crypto.cjs sig "&lt;base64_signature&gt;"</span>
    </div>
  </div>
</div>
</section>

<!-- ═══════════════════════════════════════════════════════════ -->
<!-- SIGNATURE -->
<!-- ═══════════════════════════════════════════════════════════ -->
<section id="tab-signature" class="section">
<div class="panel">
  <div class="panel-header">
    <i class="fas fa-pen-nib" style="color:#a78bfa"></i>
    <h3>Generate X-SIGNATURE &amp; X-PARTNER-ID</h3>
    <span class="badge">HMAC-SHA512</span>
  </div>
  <div class="panel-body">
    <div class="info-box info-purple">
      <i class="fas fa-info-circle"></i>
      <div>Generate X-SIGNATURE dan X-PARTNER-ID. Formula: <code>base64(HMAC-SHA512(token + ":" + timestamp, aes_cs))</code>. Keduanya menghasilkan nilai yang SAMA jika menggunakan aes_cs yang sama.</div>
    </div>
    <div class="field-row">
      <label>Authorization Token (JWT)</label>
      <textarea id="sig-token" style="min-height:80px;font-size:10px" placeholder="eyJ0cmFuc19ubyI6..."></textarea>
    </div>
    <div class="grid-2">
      <div class="field-row">
        <label>X-TIMESTAMP (YYYY-MM-DD HH:MM:SS)</label>
        <input type="text" id="sig-ts" placeholder="2026-04-20 11:44:20"/>
      </div>
      <div class="field-row">
        <label>AES CS (base64, 8 bytes)</label>
        <input type="text" id="sig-cs" placeholder="1O7pFHEDJ0k="/>
      </div>
    </div>
    <div class="btn-group">
      <button class="btn btn-primary" onclick="runOp(event,'signature')"><i class="fas fa-pen"></i> Generate Signature</button>
      <button class="btn btn-secondary" onclick="pasteFromKeygenCS('sig-cs');fillNow('sig-ts')"><i class="fas fa-paste"></i> Paste dari Keygen</button>
    </div>
    <div id="result-signature" class="result-box"></div>
    <div class="divider"></div>
    <div class="quick-ref">
      <span class="comment"># Formula:</span><br>
      <span class="cmd">base64( HMAC-SHA512( token + ":" + timestamp, aes_cs ) )</span>
    </div>
  </div>
</div>
</section>

<!-- ═══════════════════════════════════════════════════════════ -->
<!-- iOS TOKEN SIG -->
<!-- ═══════════════════════════════════════════════════════════ -->
<section id="tab-ios-token-sig" class="section">
<div class="panel">
  <div class="panel-header">
    <i class="fas fa-mobile-alt" style="color:#a78bfa"></i>
    <h3>iOS Token Signature (iosTokenCtrl)</h3>
    <span class="badge">RSA-SHA256</span>
  </div>
  <div class="panel-body">
    <div class="info-box info-green">
      <i class="fas fa-info-circle"></i>
      <div>Generate X-SIGNATURE untuk endpoint <code>POST /api/smart/access/token</code>. Formula: <code>RSA-SHA256(SHA256("Seminyak|" + timestamp))</code> menggunakan <b>private_key_lpd.pem</b>.</div>
    </div>
    <div class="field-row">
      <label>Timestamp (YYYY-MM-DD HH:MM:SS) — kosongkan untuk otomatis</label>
      <input type="text" id="ios-ts" placeholder="Kosongkan untuk timestamp sekarang (Jakarta)"/>
    </div>
    <div class="btn-group">
      <button class="btn btn-primary" onclick="runOp(event,'ios-token-sig')"><i class="fas fa-mobile-alt"></i> Generate iOS Sig</button>
      <button class="btn btn-secondary" onclick="fillNow('ios-ts')"><i class="fas fa-clock"></i> Timestamp Sekarang</button>
    </div>
    <div id="result-ios-token-sig" class="result-box"></div>
    <div class="divider"></div>
    <div class="quick-ref">
      <span class="comment"># Formula PHP (iosTokenCtrl.php):</span><br>
      <span class="cmd">$clientStamp = hash("sha256", "Seminyak|" . $timeStamp);</span><br>
      <span class="cmd">openssl_sign($clientStamp, $sig, $privateKey);</span><br>
      <span class="cmd">base64_encode($sig);</span>
    </div>
  </div>
</div>
</section>

<!-- ═══════════════════════════════════════════════════════════ -->
<!-- SNAP TOKEN SIG -->
<!-- ═══════════════════════════════════════════════════════════ -->
<section id="tab-snap-token-sig" class="section">
<div class="panel">
  <div class="panel-header">
    <i class="fas fa-plug" style="color:#a78bfa"></i>
    <h3>SNAP Token Signature (BPD)</h3>
    <span class="badge">RSA-SHA256</span>
  </div>
  <div class="panel-body">
    <div class="info-box info-purple">
      <i class="fas fa-info-circle"></i>
      <div>Generate X-SIGNATURE untuk endpoint <code>POST /api/v1.0/access-token/b2b</code>. Formula: <code>RSA-SHA256(clientKey + "|" + timestamp)</code> menggunakan <b>private_bpd_003.pem</b>.</div>
    </div>
    <div class="grid-2">
      <div class="field-row">
        <label>X-CLIENT-KEY</label>
        <input type="text" id="snap-key" placeholder="LPD-SEMINYAK-001" value="LPD-SEMINYAK-001"/>
      </div>
      <div class="field-row">
        <label>Timestamp ISO8601 — kosongkan untuk otomatis</label>
        <input type="text" id="snap-ts" placeholder="2026-04-21T10:30:00+07:00"/>
      </div>
    </div>
    <div class="btn-group">
      <button class="btn btn-primary" onclick="runOp(event,'snap-token-sig')"><i class="fas fa-plug"></i> Generate SNAP Sig</button>
      <button class="btn btn-secondary" onclick="fillNowISO('snap-ts')"><i class="fas fa-clock"></i> Timestamp Sekarang</button>
    </div>
    <div id="result-snap-token-sig" class="result-box"></div>
    <div class="divider"></div>
    <div class="quick-ref">
      <span class="comment"># Formula SNAP BPD:</span><br>
      <span class="cmd">message = clientKey + "|" + timestamp</span><br>
      <span class="cmd">RSA-SHA256(message, private_bpd_003.pem)</span><br>
      <span class="cmd">base64_encode(signature)</span>
    </div>
  </div>
</div>
</section>

<!-- ═══════════════════════════════════════════════════════════ -->
<!-- HASHCODE -->
<!-- ═══════════════════════════════════════════════════════════ -->
<section id="tab-hashcode" class="section">
<div class="panel">
  <div class="panel-header">
    <i class="fas fa-fingerprint" style="color:#a78bfa"></i>
    <h3>Hash Code Transfer</h3>
    <span class="badge">SHA-256</span>
  </div>
  <div class="panel-body">
    <div class="tab-bar">
      <div class="tab active" onclick="switchSubTab(this,'hash','check')">Check/Inquiry</div>
      <div class="tab" onclick="switchSubTab(this,'hash','posting')">Posting</div>
      <div class="tab" onclick="switchSubTab(this,'hash','lpd')">LPD Internal</div>
    </div>
    <div id="hash-check" class="tab-panel active">
      <div class="info-box info-purple">
        <i class="fas fa-info-circle"></i>
        <div>Formula Check/Inquiry: <code>SHA256("%"+fromAcc+"#"+amount+"@"+dateTime+"^"+refNo+"*"+destBank+"~"+destAcc+"|"+BPD_HASHCODE+"%")</code></div>
      </div>
    </div>
    <div id="hash-posting" class="tab-panel">
      <div class="info-box info-yellow">
        <i class="fas fa-info-circle"></i>
        <div>Formula Posting: <code>SHA256("@"+fromAcc+"|"+amount+"~"+dateTime+"*"+refNo+"^"+destBank+"#"+destAcc+"("+destName+")"+BPD_HASHCODE+"@")</code></div>
      </div>
    </div>
    <div id="hash-lpd" class="tab-panel">
      <div class="info-box info-green">
        <i class="fas fa-info-circle"></i>
        <div>Formula LPD Internal: <code>SHA256("{"+nominal+"*"+norekFrom+"^"+norekTo+"%"+nameFrom+"#"+nameTo+"@"+BPD_HASHCODE+"}")</code></div>
      </div>
    </div>
    <input type="hidden" id="hash-step" value="check"/>

    <div id="hash-fields-transfer">
      <div class="grid-2">
        <div class="field-row">
          <label>From Account (Rek. Asal)</label>
          <input type="text" id="hc-from" placeholder="1234567890"/>
        </div>
        <div class="field-row">
          <label>Amount (Nominal)</label>
          <input type="text" id="hc-amount" placeholder="500000"/>
        </div>
        <div class="field-row">
          <label>Date Time (YYYY-MM-DD HH:MM:SS)</label>
          <input type="text" id="hc-dt" placeholder="2026-04-20 11:44:20"/>
        </div>
        <div class="field-row">
          <label>Reference No (X-REFERENCE)</label>
          <input type="text" id="hc-ref" placeholder="SMY0444582O10120422"/>
        </div>
        <div class="field-row">
          <label>Dest Bank Code</label>
          <input type="text" id="hc-bank" placeholder="014"/>
        </div>
        <div class="field-row">
          <label>Dest Account</label>
          <input type="text" id="hc-acc" placeholder="0987654321"/>
        </div>
      </div>
      <div class="field-row" id="hash-field-destname">
        <label>Dest Name (Nama Penerima) — diperlukan untuk Posting</label>
        <input type="text" id="hc-name" placeholder="I MADE BUDI SANTOSA"/>
      </div>
    </div>

    <div id="hash-fields-lpd" style="display:none">
      <div class="grid-2">
        <div class="field-row">
          <label>Nominal</label>
          <input type="text" id="hc-nominal" placeholder="500000"/>
        </div>
        <div class="field-row">
          <label>Norek From</label>
          <input type="text" id="hc-nfrom" placeholder="1234567890"/>
        </div>
        <div class="field-row">
          <label>Norek To</label>
          <input type="text" id="hc-nto" placeholder="0987654321"/>
        </div>
        <div class="field-row">
          <label>Name From</label>
          <input type="text" id="hc-nfromname" placeholder="I WAYAN SARI"/>
        </div>
      </div>
      <div class="field-row">
        <label>Name To</label>
        <input type="text" id="hc-ntoname" placeholder="I MADE BUDI"/>
      </div>
    </div>

    <button class="btn btn-primary" onclick="runOp(event,'hashcode')"><i class="fas fa-fingerprint"></i> Generate Hash Code</button>
    <div id="result-hashcode" class="result-box"></div>
    <div class="divider"></div>
    <div class="info-box info-yellow">
      <i class="fas fa-lock"></i>
      <div>BPD_HASHCODE = <b>p91wrswK</b> (dari .env production). Hash code ini kemudian di-encrypt dengan AES sebelum dikirim di body request.</div>
    </div>
    <div class="quick-ref">
      <span class="comment"># CLI:</span><br>
      <span class="cmd">node lpd-crypto.cjs hashcode &lt;fromAcc&gt; &lt;amount&gt; &lt;dateTime&gt; &lt;refNo&gt; &lt;destBank&gt; &lt;destAcc&gt; &lt;destName&gt;</span>
    </div>
  </div>
</div>
</section>

<!-- ═══════════════════════════════════════════════════════════ -->
<!-- BUILD TRANSFER REQUEST -->
<!-- ═══════════════════════════════════════════════════════════ -->
<section id="tab-build-transfer" class="section">
<div class="panel">
  <div class="panel-header">
    <i class="fas fa-hammer" style="color:#a78bfa"></i>
    <h3>Build Transfer Bank Request (Lengkap)</h3>
    <span class="badge">Full Builder</span>
  </div>
  <div class="panel-body">
    <div class="info-box info-purple">
      <i class="fas fa-info-circle"></i>
      <div>Build request lengkap untuk <code>/api/smart/transfer/bank/check</code> atau <code>/post</code> atau <code>/inquiry</code>. Menghasilkan semua header + body terenkripsi + curl command siap pakai.</div>
    </div>

    <div class="tab-bar">
      <div class="tab active" onclick="switchSubTab(this,'bt','check')">Check</div>
      <div class="tab" onclick="switchSubTab(this,'bt','inquiry')">Inquiry</div>
      <div class="tab" onclick="switchSubTab(this,'bt','posting')">Posting</div>
    </div>
    <input type="hidden" id="bt-step" value="check"/>

    <div class="grid-2">
      <div class="field-row">
        <label>Base URL</label>
        <input type="text" id="bt-url" value="https://lpdseminyak.biz.id:8000"/>
      </div>
      <div class="field-row">
        <label>Authorization (JWT Token)</label>
        <input type="text" id="bt-token" placeholder="eyJ0cmFuc19ubyI6..."/>
      </div>
      <div class="field-row">
        <label>X-CLIENT-ID (encoded DID)</label>
        <input type="text" id="bt-did" placeholder="U01ZU2V6F3B7B..."/>
      </div>
      <div class="field-row">
        <label>AES Key (base64)</label>
        <input type="text" id="bt-key" placeholder="6mFbbiR/..."/>
      </div>
      <div class="field-row">
        <label>AES IV (base64)</label>
        <input type="text" id="bt-iv" placeholder="ZLrWcBiR..."/>
      </div>
      <div class="field-row">
        <label>AES CS (base64, untuk X-SIGNATURE)</label>
        <input type="text" id="bt-cs" placeholder="1O7pFHEDJ0k="/>
      </div>
      <div class="field-row">
        <label>From Account</label>
        <input type="text" id="bt-from" placeholder="1234567890"/>
      </div>
      <div class="field-row">
        <label>Amount</label>
        <input type="text" id="bt-amount" placeholder="500000"/>
      </div>
      <div class="field-row">
        <label>Dest Bank Code</label>
        <input type="text" id="bt-dbank" placeholder="014"/>
      </div>
      <div class="field-row">
        <label>Dest Account</label>
        <input type="text" id="bt-dacc" placeholder="0987654321"/>
      </div>
      <div class="field-row">
        <label>Dest Name</label>
        <input type="text" id="bt-dname" placeholder="I MADE BUDI SANTOSA"/>
      </div>
      <div class="field-row">
        <label>Date Time (kosong = otomatis)</label>
        <input type="text" id="bt-dt" placeholder="Otomatis timestamp Jakarta"/>
      </div>
    </div>
    <div class="field-row">
      <label>X-REFERENCE (kosong = generate otomatis)</label>
      <input type="text" id="bt-ref" placeholder="Generate otomatis (SMY...)"/>
    </div>

    <div class="btn-group">
      <button class="btn btn-primary" onclick="runOp(event,'build-transfer')"><i class="fas fa-hammer"></i> Build Request</button>
      <button class="btn btn-secondary" onclick="pasteFromKeygen('bt-key','bt-iv');pasteFromKeygenCS('bt-cs')"><i class="fas fa-paste"></i> Paste dari Keygen</button>
    </div>
    <div id="result-build-transfer" class="result-box"></div>
  </div>
</div>
</section>

<!-- ═══════════════════════════════════════════════════════════ -->
<!-- ═══════════════════════════════════════════════════════════ -->
<!-- SMART: LOGIN NASABAH -->
<!-- ═══════════════════════════════════════════════════════════ -->
<section id="tab-smart-login" class="section">

<!-- Session status bar (ditampilkan di semua smart tabs) -->
<div id="smart-session-bar" style="display:none" class="content" style="padding-bottom:0">
<div class="session-box">
  <div class="session-title"><span class="badge-live"><span class="dot"></span>Sesi Aktif</span> &nbsp; Nasabah Login</div>
  <div class="session-field"><span class="sf-label">Status</span><span class="sf-val" id="ss-token-preview">—</span><button class="sf-copy" onclick="copyRaw(document.getElementById('ss-token-full').value)" title="Salin X-CLIENT-ID">Salin DID</button><input type="hidden" id="ss-token-full"/></div>
  <div class="session-field"><span class="sf-label">AES Key</span><span class="sf-val" id="ss-key">—</span><button class="sf-copy" onclick="copyRaw(this.previousElementSibling.textContent)">Salin</button></div>
  <div class="session-field"><span class="sf-label">AES IV</span><span class="sf-val" id="ss-iv">—</span><button class="sf-copy" onclick="copyRaw(this.previousElementSibling.textContent)">Salin</button></div>
  <div class="session-field"><span class="sf-label">AES CS</span><span class="sf-val" id="ss-cs">—</span><button class="sf-copy" onclick="copyRaw(this.previousElementSibling.textContent)">Salin</button></div>
  <div class="session-field"><span class="sf-label">X-CLIENT-ID</span><span class="sf-val" id="ss-did">—</span><button class="sf-copy" onclick="copyRaw(this.previousElementSibling.textContent)">Salin</button></div>
  <div style="margin-top:8px;display:flex;gap:8px;flex-wrap:wrap">
    <button class="btn btn-red" style="font-size:10px;padding:5px 12px" onclick="smartLogout()"><i class="fas fa-sign-out-alt"></i> Logout</button>
    <button class="btn btn-secondary" style="font-size:10px;padding:5px 12px" onclick="showTab('smart-saldo')"><i class="fas fa-wallet"></i> Cek Saldo</button>
    <button class="btn btn-secondary" style="font-size:10px;padding:5px 12px" onclick="showTab('smart-transfer')"><i class="fas fa-exchange-alt"></i> Transfer</button>
  </div>
</div>
</div>

<div class="content">
<div class="panel">
  <div class="panel-header">
    <i class="fas fa-sign-in-alt" style="color:#fbbf24"></i>
    <h3>Login Nasabah</h3>
    <span class="badge" style="background:#1c1200;color:#fbbf24">POST /api/smart/access/login</span>
  </div>
  <div class="panel-body">

    <div class="info-box info-yellow">
      <i class="fas fa-info-circle"></i>
      <div>Login mengirim <code>MD5(user_name)</code> &amp; <code>MD5(user_pass)</code> sebagai body. Header <b>Authorization</b> (JWT), <b>X-SIGNATURE</b>, <b>X-PARTNER-ID</b>, <b>X-CLIENT-ID</b> dibuat otomatis dari AES CS + private key LPD. Setelah berhasil, sesi aktif untuk Cek Saldo &amp; Transfer.</div>
    </div>

    <!-- Step indicator -->
    <div class="step-indicator">
      <div class="step" id="sl-step1"><i class="fas fa-key"></i> 1. Derive Keys</div>
      <span class="step-arrow">›</span>
      <div class="step" id="sl-step2"><i class="fas fa-user"></i> 2. Isi Kredensial</div>
      <span class="step-arrow">›</span>
      <div class="step" id="sl-step3"><i class="fas fa-sign-in-alt"></i> 3. Login</div>
      <span class="step-arrow">›</span>
      <div class="step" id="sl-step4"><i class="fas fa-check"></i> 4. Status 00</div>
    </div>

    <!-- Auto-fill status banner -->
    <div id="sl-autofill-banner" style="display:none;background:#0a1a0a;border:1px solid #22c55e44;border-radius:8px;padding:10px 14px;margin-bottom:12px;display:flex;align-items:center;gap:10px">
      <span style="color:#22c55e;font-size:18px"><i class="fas fa-magic"></i></span>
      <div style="flex:1">
        <div style="color:#4ade80;font-size:12px;font-weight:700">Kunci & X-CLIENT-ID Terisi Otomatis!</div>
        <div style="color:#6b7280;font-size:10px" id="sl-autofill-info">AES Key/IV/CS + X-CLIENT-ID dari Derive Keys tadi.</div>
      </div>
      <button class="btn btn-secondary" style="font-size:10px;padding:4px 10px" onclick="slPasteKeygen()"><i class="fas fa-sync"></i> Refresh</button>
    </div>
    <div id="sl-no-keygen-banner" style="background:#1a0a00;border:1px solid #d9770644;border-radius:8px;padding:10px 14px;margin-bottom:12px;display:flex;align-items:center;gap:10px">
      <span style="color:#f59e0b;font-size:18px"><i class="fas fa-exclamation-triangle"></i></span>
      <div style="flex:1">
        <div style="color:#fbbf24;font-size:12px;font-weight:700">Belum ada data Keygen</div>
        <div style="color:#6b7280;font-size:10px">Jalankan <b>Derive AES Keys</b> terlebih dahulu — X-CLIENT-ID akan otomatis terisi.</div>
      </div>
      <button class="btn btn-secondary" style="font-size:10px;padding:4px 10px" onclick="showTab('keygen')"><i class="fas fa-key"></i> Ke Keygen</button>
    </div>

    <!-- AES Keys (dari Keygen — diisi otomatis) -->
    <h4 style="font-size:12px;font-weight:700;color:#fbbf24;margin-bottom:10px"><i class="fas fa-key"></i> Kunci AES & X-CLIENT-ID <span id="sl-keys-badge" style="display:none;background:#14532d;color:#4ade80;font-size:9px;padding:2px 7px;border-radius:8px;font-weight:700;margin-left:6px">✅ AUTO</span></h4>
    <div class="grid-2">
      <div class="field-row">
        <label>AES Key (base64, 32 bytes)</label>
        <input type="text" id="sl-key" placeholder="Otomatis dari Derive AES Keys" readonly style="background:#111;color:#a78bfa"/>
      </div>
      <div class="field-row">
        <label>AES IV (base64, 16 bytes)</label>
        <input type="text" id="sl-iv" placeholder="Otomatis dari Derive AES Keys" readonly style="background:#111;color:#a78bfa"/>
      </div>
    </div>
    <div class="grid-2">
      <div class="field-row">
        <label>AES CS (base64, 8 bytes)</label>
        <input type="text" id="sl-cs" placeholder="Otomatis dari Derive AES Keys" readonly style="background:#111;color:#a78bfa"/>
      </div>
      <div class="field-row">
        <label>X-CLIENT-ID (encoded) <span style="color:#22c55e;font-size:9px">⚡ Auto</span></label>
        <input type="text" id="sl-did" placeholder="Otomatis dari Derive AES Keys" readonly style="background:#111;color:#22c55e"/>
      </div>
    </div>
    <div class="divider"></div>

    <!-- Kredensial -->
    <h4 style="font-size:12px;font-weight:700;color:#fbbf24;margin-bottom:10px"><i class="fas fa-user-lock"></i> Kredensial Nasabah</h4>
    <div class="grid-2">
      <div class="field-row">
        <label>Username (plaintext / MD5)</label>
        <input type="text" id="sl-user" placeholder="c70225c9408df9a1ebacc16870f6e7d1"/>
      </div>
      <div class="field-row">
        <label>Password (plaintext / MD5)</label>
        <input type="password" id="sl-pass" placeholder="2b481940af1d3458913abd25b114745c"/>
      </div>
    </div>
    <div class="field-row">
      <label>Base URL Server</label>
      <input type="text" id="sl-url" value="https://lpdseminyak.biz.id:8000"/>
    </div>

    <div class="btn-group">
      <button class="btn btn-primary" style="background:linear-gradient(135deg,#d97706,#b45309)" id="sl-btn" onclick="smartLogin(this)"><i class="fas fa-sign-in-alt"></i> Login Sekarang</button>
      <button class="btn btn-secondary" onclick="slShowCurl()" title="Tampilkan curl command yang akan dikirim"><i class="fas fa-terminal"></i> Preview Curl</button>
    </div>
    <div id="result-smart-login" class="result-box"></div>

    <div class="divider"></div>
    <div class="quick-ref">
      <span class="comment"># Flow otomatis (sesuai POC sukses):</span><br>
      <span class="cmd">1. MD5(user_name)  →  user_name hashed (32 hex)</span><br>
      <span class="cmd">2. MD5(user_pass)  →  user_pass hashed (32 hex)</span><br>
      <span class="cmd">3. createJWT(refNo, tsISO, priv_lpd)  →  Authorization header</span><br>
      <span class="cmd">4. generateSignature(jwt, ts, aesCs)  →  X-SIGNATURE & X-PARTNER-ID</span><br>
      <span class="cmd">5. POST /api/smart/access/login  →  status:"00" + account_list</span><br>
      <span class="comment"># Catatan: Body TIDAK di-AES-encrypt. Hanya header yang perlu AES CS.</span><br>
    </div>
  </div>
</div>
</div>
</section>

<!-- ═══════════════════════════════════════════════════════════ -->
<!-- SMART: CEK SALDO -->
<!-- ═══════════════════════════════════════════════════════════ -->
<section id="tab-smart-saldo" class="section">
<div class="content">
<div id="smart-saldo-session" class="session-box" style="display:none">
  <div class="session-title"><span class="badge-live"><span class="dot"></span>Sesi Aktif</span></div>
  <div class="session-field"><span class="sf-label">Status</span><span class="sf-val" id="saldo-token-preview">—</span></div>
</div>
<div id="smart-saldo-noauth" class="info-box info-red">
  <i class="fas fa-exclamation-triangle"></i>
  <div>Belum login. Silakan <a href="#" onclick="showTab('smart-login');return false" style="color:#fca5a5;font-weight:700">Login Nasabah</a> terlebih dahulu untuk mendapatkan token.</div>
</div>

<div class="panel">
  <div class="panel-header">
    <i class="fas fa-wallet" style="color:#34d399"></i>
    <h3>Cek Saldo</h3>
    <span class="badge" style="background:#022c22;color:#6ee7b7">POST /api/smart/account/balance</span>
  </div>
  <div class="panel-body">
    <div class="info-box info-green">
      <i class="fas fa-info-circle"></i>
      <div>Nomor rekening akan dienkripsi AES-256-CBC sebelum dikirim. JWT &amp; signature dibuat ulang otomatis dari private key LPD tiap request.</div>
    </div>
    <div class="field-row">
      <label>Nomor Rekening</label>
      <input type="text" id="sb-norek" placeholder="0100001234"/>
    </div>
    <div class="btn-group">
      <button class="btn btn-green" id="sb-btn" onclick="smartSaldo(this)"><i class="fas fa-search"></i> Cek Saldo</button>
    </div>
    <div id="result-smart-saldo" class="result-box"></div>
    <div class="divider"></div>
    <div class="quick-ref">
      <span class="comment"># Endpoint:</span><br>
      <span class="cmd">POST /api/smart/account/balance</span><br>
      <span class="cmd">Body: { no_rek: aesEncrypt(norek) }</span><br>
    </div>
  </div>
</div>
</div>
</section>

<!-- ═══════════════════════════════════════════════════════════ -->
<!-- SMART: TRANSFER -->
<!-- ═══════════════════════════════════════════════════════════ -->
<section id="tab-smart-transfer" class="section">
<div class="content">
<div id="smart-tf-session" class="session-box" style="display:none">
  <div class="session-title"><span class="badge-live"><span class="dot"></span>Sesi Aktif</span></div>
  <div class="session-field"><span class="sf-label">Status</span><span class="sf-val" id="tf-token-preview">—</span></div>
</div>
<div id="smart-tf-noauth" class="info-box info-red">
  <i class="fas fa-exclamation-triangle"></i>
  <div>Belum login. Silakan <a href="#" onclick="showTab('smart-login');return false" style="color:#fca5a5;font-weight:700">Login Nasabah</a> terlebih dahulu.</div>
</div>

<div class="panel">
  <div class="panel-header">
    <i class="fas fa-exchange-alt" style="color:#f59e0b"></i>
    <h3>Transfer Antar Rekening</h3>
    <span class="badge" style="background:#1c1200;color:#fbbf24">Inquiry → Posting</span>
  </div>
  <div class="panel-body">

    <!-- Transfer steps -->
    <div class="step-indicator" id="tf-step-indicator">
      <div class="step active" id="tf-step1"><i class="fas fa-search"></i> 1. Inquiry</div>
      <span class="step-arrow">›</span>
      <div class="step" id="tf-step2"><i class="fas fa-check-circle"></i> 2. Konfirmasi</div>
      <span class="step-arrow">›</span>
      <div class="step" id="tf-step3"><i class="fas fa-paper-plane"></i> 3. Posting</div>
    </div>

    <!-- Panel inquiry -->
    <div id="tf-panel-inquiry">
      <h4 style="font-size:12px;font-weight:700;color:#fbbf24;margin-bottom:12px"><i class="fas fa-search"></i> Inquiry Transfer</h4>
      <div class="info-box info-yellow">
        <i class="fas fa-info-circle"></i>
        <div>Inquiry untuk mengecek ketersediaan rekening tujuan dan nominal. Semua field dienkripsi sebelum dikirim.</div>
      </div>
      <div class="grid-2">
        <div class="field-row">
          <label>No. Rekening Asal</label>
          <input type="text" id="tf-from" placeholder="0100001234"/>
        </div>
        <div class="field-row">
          <label>No. Rekening Tujuan</label>
          <input type="text" id="tf-to" placeholder="0100005678"/>
        </div>
      </div>
      <div class="grid-2">
        <div class="field-row">
          <label>Nominal (angka, tanpa titik/koma)</label>
          <input type="number" id="tf-nominal" class="amount-input" placeholder="500000" min="1"/>
        </div>
        <div class="field-row">
          <label>Kode Bank Tujuan (opsional)</label>
          <input type="text" id="tf-bank" placeholder="008 (Mandiri), kosong jika intrabank"/>
        </div>
      </div>
      <div class="btn-group">
        <button class="btn btn-primary" style="background:linear-gradient(135deg,#d97706,#b45309)" id="tf-inquiry-btn" onclick="smartInquiry(this)"><i class="fas fa-search"></i> Inquiry</button>
      </div>
      <div id="result-smart-inquiry" class="result-box"></div>
    </div>

    <!-- Panel konfirmasi (tampil setelah inquiry berhasil) -->
    <div id="tf-panel-confirm" style="display:none">
      <div class="divider"></div>
      <h4 style="font-size:12px;font-weight:700;color:#f59e0b;margin-bottom:12px"><i class="fas fa-check-circle"></i> Konfirmasi Transfer</h4>
      <div class="confirm-box">
        <div class="confirm-row"><span class="confirm-label">Dari Rekening</span><span class="confirm-value" id="cf-from">—</span></div>
        <div class="confirm-row"><span class="confirm-label">Ke Rekening</span><span class="confirm-value" id="cf-to">—</span></div>
        <div class="confirm-row"><span class="confirm-label">Nominal</span><span class="confirm-value" id="cf-nominal" style="font-size:16px;color:#fbbf24">—</span></div>
        <div class="confirm-row"><span class="confirm-label">Bank Tujuan</span><span class="confirm-value" id="cf-bank">—</span></div>
        <div class="confirm-row"><span class="confirm-label">Ref. Inquiry</span><span class="confirm-value" id="cf-ref">—</span></div>
      </div>
      <div class="field-row">
        <label>Nama Penerima (opsional)</label>
        <input type="text" id="tf-nama-dest" placeholder="Nama rekening tujuan"/>
      </div>
      <div class="field-row">
        <label>Keterangan / Berita Transfer (opsional)</label>
        <input type="text" id="tf-ket" placeholder="Pembayaran tagihan, dll"/>
      </div>
      <div class="btn-group">
        <button class="btn btn-secondary" onclick="tfReset()"><i class="fas fa-arrow-left"></i> Ubah Data</button>
        <button class="btn btn-primary" style="background:linear-gradient(135deg,#dc2626,#b91c1c)" id="tf-posting-btn" onclick="smartPosting(this)"><i class="fas fa-paper-plane"></i> Posting Transfer</button>
      </div>
      <div id="result-smart-posting" class="result-box"></div>
    </div>

    <div class="divider"></div>
    <div class="quick-ref">
      <span class="comment"># Flow Transfer:</span><br>
      <span class="cmd">1. POST /api/smart/transfer/inquiry   →  cek rekening &amp; saldo</span><br>
      <span class="cmd">2. Konfirmasi data oleh user</span><br>
      <span class="cmd">3. POST /api/smart/transfer/posting   →  eksekusi transfer</span><br>
      <span class="comment"># Semua field dienkripsi AES-256-CBC, JWT &amp; signature otomatis</span><br>
    </div>
  </div>
</div>
</div>
</section>

<!-- QUICK REF -->
<!-- ═══════════════════════════════════════════════════════════ -->
<section id="tab-quick-ref" class="section">
<div class="panel">
  <div class="panel-header">
    <i class="fas fa-book" style="color:#a78bfa"></i>
    <h3>Referensi Cepat</h3>
  </div>
  <div class="panel-body">
    <h4 style="font-size:13px;font-weight:700;margin-bottom:10px;color:#a78bfa">Konstanta dari .env</h4>
    <div class="stat-row"><div class="stat-key">BPD_HASHCODE</div><div class="stat-val">p91wrswK</div></div>
    <div class="stat-row"><div class="stat-key">CLIENT_SECRET</div><div class="stat-val">7vCjkNHs</div></div>
    <div class="stat-row"><div class="stat-key">CLIENT_VA</div><div class="stat-val">VA-325</div></div>
    <div class="stat-row"><div class="stat-key">WHITELIST_IP</div><div class="stat-val">34.50.74.78</div></div>
    <div class="stat-row"><div class="stat-key">BPD_PREFIX</div><div class="stat-val">989191</div></div>
    <div class="stat-row"><div class="stat-key">X-CLIENT-KEY (SNAP)</div><div class="stat-val">LPD-SEMINYAK-001</div></div>

    <div class="divider"></div>
    <h4 style="font-size:13px;font-weight:700;margin-bottom:10px;color:#a78bfa">Algoritma Enkripsi per Komponen</h4>
    <div class="stat-row"><div class="stat-key">Body fields</div><div class="stat-val"><span class="badge-algo badge-aes">AES-256-CBC</span> key/iv dari DB atau Gio_CreateKeyAndIv</div></div>
    <div class="stat-row"><div class="stat-key">X-SIGNATURE</div><div class="stat-val"><span class="badge-algo badge-hmac">HMAC-SHA512</span> base64(HMAC(token:ts, aes_cs))</div></div>
    <div class="stat-row"><div class="stat-key">X-PARTNER-ID</div><div class="stat-val"><span class="badge-algo badge-hmac">HMAC-SHA512</span> sama dengan X-SIGNATURE</div></div>
    <div class="stat-row"><div class="stat-key">hash_code (transfer)</div><div class="stat-val"><span class="badge-algo badge-sha">SHA-256</span> string dengan separators khusus</div></div>
    <div class="stat-row"><div class="stat-key">iOS token sig</div><div class="stat-val"><span class="badge-algo badge-rsa">RSA-SHA256</span> sign(SHA256("Seminyak|ts"), priv_lpd)</div></div>
    <div class="stat-row"><div class="stat-key">SNAP token sig</div><div class="stat-val"><span class="badge-algo badge-rsa">RSA-SHA256</span> sign(clientKey+"|"+ts, priv_bpd)</div></div>
    <div class="stat-row"><div class="stat-key">AES Key derivation</div><div class="stat-val"><span class="badge-algo badge-hmac">HMAC-SHA512</span> key=ts, msg=clientID → 64 bytes → slice</div></div>

    <div class="divider"></div>
    <h4 style="font-size:13px;font-weight:700;margin-bottom:10px;color:#a78bfa">CLI Commands</h4>
    <div class="quick-ref" style="line-height:2.2">
      <span class="cmd">node lpd-crypto.cjs demo</span><br>
      <span class="cmd">node lpd-crypto.cjs keygen "clientID" "timestamp"</span><br>
      <span class="cmd">node lpd-crypto.cjs encrypt "plaintext" "key_b64" "iv_b64"</span><br>
      <span class="cmd">node lpd-crypto.cjs decrypt "cipher_b64" "key_b64" "iv_b64"</span><br>
      <span class="cmd">node lpd-crypto.cjs did "X-CLIENT-ID"</span><br>
      <span class="cmd">node lpd-crypto.cjs jwt "JWT_token"</span><br>
      <span class="cmd">node lpd-crypto.cjs sig "X-SIGNATURE_b64"</span><br>
      <span class="cmd">node lpd-crypto.cjs hashcode from amount datetime ref bank acc name</span><br>
      <span class="cmd">node lpd-crypto.cjs ref SMY</span>
    </div>

    <div class="divider"></div>
    <h4 style="font-size:13px;font-weight:700;margin-bottom:10px;color:#a78bfa">File Keys</h4>
    <div class="stat-row"><div class="stat-key">private_bpd_003.pem</div><div class="stat-val">Private key SNAP BPD Bali (untuk X-SIGNATURE SNAP)</div></div>
    <div class="stat-row"><div class="stat-key">private_key_lpd.pem</div><div class="stat-val">Private key LPD Seminyak (untuk iOS token sig)</div></div>
    <div class="stat-row"><div class="stat-key">keys/public_key.pem</div><div class="stat-val">Public key client (diterima server untuk verifikasi iOS)</div></div>
    <div class="stat-row"><div class="stat-key">public_key_bpd.pem</div><div class="stat-val">Public key BPD (untuk verifikasi SNAP token)</div></div>
  </div>
</div>
</section>

</div><!-- .content -->
</div><!-- #main -->

<script>
// ── State ─────────────────────────────────────────────────────────────────────
let lastKeygen = null;

// ── Navigation ────────────────────────────────────────────────────────────────
function showTab(name) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('#sidebar nav a').forEach(a => a.classList.remove('active'));
  const sec = document.getElementById('tab-' + name);
  if (sec) sec.classList.add('active');
  const nav = document.getElementById('nav-' + name);
  if (nav) nav.classList.add('active');
  // Auto-close sidebar on mobile after nav click
  if (window.innerWidth <= 768) closeSidebar();
  // Update login banner saat pindah ke tab smart-login
  if (name === 'smart-login') {
    slPasteKeygen && slPasteKeygen();
    updateLoginBanner && updateLoginBanner();
  }
}

// ── Mobile Sidebar ─────────────────────────────────────────────────────────
function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  const ov = document.getElementById('sidebar-overlay');
  if (sb.classList.contains('open')) {
    closeSidebar();
  } else {
    sb.classList.add('open');
    ov.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('show');
  document.body.style.overflow = '';
}

// Close sidebar on resize to desktop
window.addEventListener('resize', function() {
  if (window.innerWidth > 768) closeSidebar();
});

function switchSubTab(el, group, tab) {
  const container = document.getElementById('tab-' + (group === 'hash' ? 'hashcode' : 'build-transfer'));
  container.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  container.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  const panel = document.getElementById(group + '-' + tab);
  if (panel) panel.classList.add('active');
  if (group === 'hash') {
    document.getElementById('hash-step').value = tab;
    const isLPD = tab === 'lpd';
    document.getElementById('hash-fields-transfer').style.display = isLPD ? 'none' : '';
    document.getElementById('hash-fields-lpd').style.display = isLPD ? '' : 'none';
  } else if (group === 'bt') {
    document.getElementById('bt-step').value = tab;
  }
}

// ── Helper ────────────────────────────────────────────────────────────────────
async function callCrypto(payload) {
  const resp = await fetch('/api/crypto', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return resp.json();
}

function val(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

function showResult(id, data, isOk) {
  const box = document.getElementById('result-' + id);
  box.className = 'result-box show';
  const statusClass = isOk ? 'result-ok' : 'result-err';
  const icon = isOk ? '✅' : '❌';
  const text = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
  const safeId = 'rv_' + Math.random().toString(36).slice(2);
  window[safeId] = text;
  box.innerHTML = '<div class="result-header">' +
    '<span class="' + statusClass + '">' + icon + ' ' + (isOk ? 'Berhasil' : 'Gagal') + '</span>' +
    '<button class="copy-btn" onclick="copyText(this,window.'+safeId+')"><i class="fas fa-copy"></i> Salin</button>' +
    '</div><pre class="result">' + escHtml(text) + '</pre>';
}

function escHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

async function copyText(btn, text) {
  try {
    await navigator.clipboard.writeText(text);
    btn.innerHTML = '<i class="fas fa-check"></i> Tersalin!';
    setTimeout(() => { btn.innerHTML = '<i class="fas fa-copy"></i> Salin'; }, 1500);
  } catch(e) { alert('Gagal salin: ' + e.message); }
}

function setLoading(btn, loading) {
  if (loading) {
    btn._orig = btn.innerHTML;
    btn.innerHTML = '<span class="spinner"></span> Proses...';
    btn.disabled = true;
  } else {
    btn.innerHTML = btn._orig || 'Run';
    btn.disabled = false;
  }
}

// ── Fill helpers ──────────────────────────────────────────────────────────────
async function fillNow(id) {
  const r = await callCrypto({ op: 'timestamp' });
  if (r.ok) document.getElementById(id).value = r.result.jakarta;
}
async function fillNowISO(id) {
  const r = await callCrypto({ op: 'timestamp' });
  if (r.ok) document.getElementById(id).value = r.result.jakartaISO;
}

function pasteFromKeygen(keyId, ivId) {
  if (!lastKeygen) { alert('Jalankan Derive AES Keys terlebih dahulu.'); return; }
  if (keyId) document.getElementById(keyId).value = lastKeygen.aesKey;
  if (ivId) document.getElementById(ivId).value = lastKeygen.aesIv;
}
function pasteFromKeygenCS(csId) {
  if (!lastKeygen) { alert('Jalankan Derive AES Keys terlebih dahulu.'); return; }
  if (csId) document.getElementById(csId).value = lastKeygen.aesCs;
}
function pasteFromKeygenTS(tsId) {
  // just fill current time
  fillNow(tsId);
}

function fillSampleDID() {
  document.getElementById('did-decode-val').value = 'U01ZU2V6F3B7BWtV[M39ZkVGUk0wRXVNalF3T1RFeUxqQXdNUzR3TVRFd01qQXlOVEU2VtaW55YWt8QVEzQS4yNDA5MTIXdJREV4T2pRME9qSXc4IT5RVkV6VVM0eU5EQTVNuMDAxLjAxMTAyXhNVEF5MURJMU1USXdNakExZkZOMDI1MTIwMjA1fDIwMjYtMDQtMjAgMTE6NDQ6MjAORFE2TWpBKCEpUTI5d2VYSnBaMmgwSU1LcElESXdNallnVUZRZ1IybHZjMjltZENCVGJXRnlkSEJ5YnlCSmJtUnZibVZ6YVdFZ0NsWmxjbk5wYjI0Z01TNHhMakY0TWpBeU5pMHdOQzB5TUNBeE1UbzBORG95TUh4QlVUTkJMakkwTURreE1pNHdNREV1TURFeE1ESXdNalV4TWpBeU1EVXkhXUNvcHlyaWdodCDCqSAyMDI2IFBUIEdpb3NvZnQgU21hcnRwcm8gSW5kb25lc2lhIApWZXJzaW9uIDEuMS4x=';
}

function fillSampleJWT() {
  document.getElementById('jwt-val').value = 'eyJ0cmFuc19ubyI6IjExMTIzLTQzNTI0LTIwMTAyLTI2ODc2IiwiYWxnIjoiUlMyNTYifQ.eyJ0cmFuc190aW1lIjoiMjAyNi0wNC0yMFQxMTo0MzoyMCswODowMCJ9.Hi4em1vt9TI-XcaWXjr4pZPdr1_8K8lNO3I5SAWOTvZoA2c-ILo-8LasRawWaUMwVVhDLFmLBofvGCLnyI4MKuOMpMpS8PRN9v7-UPc-htnglJkC4o9TDPb9qEHOU3QReAn0jROlEK5V0ThZdGLGF-Ma0bffC_IUUFtl7rzq-CpWArJF6GkH6KJNAbYgfp64On_QjGkOuhFN6qB7t5uEU_dAC-INRiiMeKZilJnSE7DcEOR-3DChdsxo6wbrL8PLHDQdHQeG-4NOPgg13JUsWzVgZFn24v0-Kk_mxgBTJ_jhY9ioCfAI7Z5VourvGsdLAYtLAcpC3NR7mZlJHp_vyQ';
}

function fillSampleBody() {
  document.getElementById('db-body').value = JSON.stringify({
    from_acc:  '5re0Z89b0k2cwoL+K1HeRQ==',
    to_acc:    'AvYW9eJGgNn7ekcnO3rcVcZEU76bgksWwQMjYKgHwptVxBFQWKyxVjM7AULzMEI6stJoXOrq+oYe0ZOx1V31jeVSWNA+9ufZtGabdKHw+aVJTUtmj4yxkMH8dQXfe4CeOLFmbnPtVSA0P43ThtPd3gKhAhz1IZ75urnc9xpsHCA=',
    amount:    'rJTsdtV8mD+Ogo2Ize6Y3g==',
    date_time: 'SRcf8pIUGi2A4D3bRlZZX8oXtNtIe3E7T1rRncMBaCc=',
    to_name:   'q7fpK0JWVKPz2ZWqxXnt5A==',
    hash_code: '3MNidoAhRMGSsi02xjJY+J1uYWhj6VDxMzHYzUwwSsUTE6v40k+jnpED0wN3m7WULe7hwqh++m0zzUt1Dt/0gMAxRQoOwz+DCUV4GJa7uyw=',
    remark: ''
  }, null, 2);
}

// ── Main op dispatcher ────────────────────────────────────────────────────────
async function runOp(e, opName) {
  const btn = e.currentTarget;
  setLoading(btn, true);
  try {
    let payload = { op: opName };

    if (opName === 'keygen') {
      payload.clientID  = val('kg-clientid');
      payload.timestamp = val('kg-ts');
    } else if (opName === 'encrypt') {
      payload.plaintext = val('enc-plain');
      payload.aesKey    = val('enc-key');
      payload.aesIv     = val('enc-iv');
    } else if (opName === 'decrypt') {
      payload.ciphertext = val('dec-cipher');
      payload.aesKey     = val('dec-key');
      payload.aesIv      = val('dec-iv');
    } else if (opName === 'decrypt-body') {
      payload.op = 'decrypt-body';
      try {
        payload.body = JSON.parse(val('db-body') || '{}');
      } catch(e) {
        showResult('decrypt-body', 'Body JSON tidak valid: ' + e.message, false);
        return;
      }
      payload.aesKey = val('db-key');
      payload.aesIv  = val('db-iv');
    } else if (opName === 'did-decode') {
      payload.did = val('did-decode-val');
    } else if (opName === 'did-encode') {
      payload.clientID  = val('die-clientid');
      payload.timestamp = val('die-ts');
      payload.appName   = val('die-app') || 'Seminyak';
    } else if (opName === 'jwt-decode') {
      payload.jwt = val('jwt-val');
    } else if (opName === 'sig-decode') {
      payload.signature = val('sigd-val');
    } else if (opName === 'signature') {
      payload.token     = val('sig-token');
      payload.timestamp = val('sig-ts');
      payload.aesCs     = val('sig-cs');
    } else if (opName === 'ios-token-sig') {
      payload.timestamp = val('ios-ts') || undefined;
    } else if (opName === 'snap-token-sig') {
      payload.clientKey = val('snap-key') || 'LPD-SEMINYAK-001';
      payload.timestamp = val('snap-ts') || undefined;
    } else if (opName === 'hashcode') {
      const step = val('hash-step');
      payload.step = step;
      if (step === 'lpd') {
        payload.nominal  = val('hc-nominal');
        payload.norekFrom = val('hc-nfrom');
        payload.norekTo  = val('hc-nto');
        payload.nameFrom = val('hc-nfromname');
        payload.nameTo   = val('hc-ntoname');
      } else {
        payload.fromAcc  = val('hc-from');
        payload.amount   = val('hc-amount');
        payload.dateTime = val('hc-dt');
        payload.refNo    = val('hc-ref');
        payload.destBank = val('hc-bank');
        payload.destAcc  = val('hc-acc');
        payload.destName = val('hc-name');
      }
    } else if (opName === 'reference') {
      payload.prefix = val('ref-prefix') || 'SMY';
      payload.count  = parseInt(val('ref-count')) || 5;
    } else if (opName === 'build-transfer') {
      payload.baseUrl    = val('bt-url') || 'https://lpdseminyak.biz.id:8000';
      payload.token      = val('bt-token');
      payload.didEncoded = val('bt-did');
      payload.aesKey     = val('bt-key');
      payload.aesIv      = val('bt-iv');
      payload.aesCs      = val('bt-cs');
      payload.fromAcc    = val('bt-from');
      payload.amount     = val('bt-amount');
      payload.destBank   = val('bt-dbank');
      payload.destAcc    = val('bt-dacc');
      payload.destName   = val('bt-dname');
      payload.dateTime   = val('bt-dt') || undefined;
      payload.refNo      = val('bt-ref') || undefined;
      payload.step       = val('bt-step');
    }

    const r = await callCrypto(payload);

    if (r.ok) {
      // Save keygen result for paste helpers
      if (opName === 'keygen') {
        lastKeygen = r.result;
        window._lastKeygen = r.result; // also for smart login

        // ── AUTO: generate X-CLIENT-ID langsung setelah keygen berhasil ──────
        var kgClientId = val('kg-clientid');
        var kgTs       = val('kg-ts');
        if (kgClientId && kgTs) {
          callCrypto({ op: 'did-encode', clientID: kgClientId, timestamp: kgTs, appName: 'Seminyak' })
            .then(function(dr) {
              if (dr.ok && dr.result && dr.result.encoded) {
                var encoded = dr.result.encoded;
                window._lastDid = encoded;
                if (window._lastKeygen) window._lastKeygen.clientIdEnc = encoded;

                // Tampilkan panel hasil X-CLIENT-ID di tab keygen
                var panel = document.getElementById('kg-did-panel');
                var out   = document.getElementById('kg-did-output');
                if (panel) panel.style.display = 'block';
                if (out)   out.value = encoded;

                // Auto-fill semua field di form login
                var elKey = document.getElementById('sl-key');
                var elIv  = document.getElementById('sl-iv');
                var elCs  = document.getElementById('sl-cs');
                var elDid = document.getElementById('sl-did');
                if (elKey && r.result.aesKey) elKey.value = r.result.aesKey;
                if (elIv  && r.result.aesIv)  elIv.value  = r.result.aesIv;
                if (elCs  && r.result.aesCs)  elCs.value  = r.result.aesCs;
                if (elDid) elDid.value = encoded;

                // Tampilkan banner & badge di form login
                var banner   = document.getElementById('sl-autofill-banner');
                var noBanner = document.getElementById('sl-no-keygen-banner');
                var badge    = document.getElementById('sl-keys-badge');
                var info     = document.getElementById('sl-autofill-info');
                var step1    = document.getElementById('sl-step1');
                if (banner)   { banner.style.display = 'flex'; }
                if (noBanner) { noBanner.style.display = 'none'; }
                if (badge)    { badge.style.display = 'inline'; }
                if (info)     { info.textContent = 'clientID: ' + kgClientId.substring(0,20) + '..., ts: ' + kgTs; }
                if (step1)    { step1.className = 'step active'; }
              }
            })
            .catch(function() { /* silent fail */ });
        }
        // ─────────────────────────────────────────────────────────────────────
      }
      // Save did-encode result for smart login paste
      if (opName === 'did-encode' && r.result && r.result.encoded) {
        window._lastDid = r.result.encoded;
        // Also attach to keygen for convenience
        if (window._lastKeygen) window._lastKeygen.clientIdEnc = r.result.encoded;
      }
      // Special formatting for build-transfer: show curl command
      if (opName === 'build-transfer' && r.result) {
        const res = r.result;
        const curlLines = buildCurl(res);
        showResult('build-transfer', curlLines, true);
      } else if (opName === 'reference' && r.result && r.result.references) {
        showResult('reference', r.result.references.join(String.fromCharCode(10)), true);
      } else {
        showResult(opName === 'decrypt-body' ? 'decrypt-body' : opName, r.result, true);
      }
    } else {
      showResult(opName === 'decrypt-body' ? 'decrypt-body' : opName, r.error || 'Unknown error', false);
    }
  } catch(e) {
    showResult(opName === 'decrypt-body' ? 'decrypt-body' : opName, 'Fetch error: ' + e.message, false);
  } finally {
    setLoading(btn, false);
  }
}

function buildCurl(res) {
  var h = res.headers || {};
  var b = res.body || {};
  var BS = String.fromCharCode(92);
  var lines = [];
  lines.push('# curl command siap pakai:');
  lines.push('curl -X POST "' + (res.url || '') + '" ' + BS);
  Object.keys(h).forEach(function(k) {
    lines.push('  -H "' + k + ': ' + h[k] + '" ' + BS);
  });
  var bodyStr = JSON.stringify(b, null, 2);
  var sq = String.fromCharCode(39);
  var safeBody = bodyStr.replace(/'/g, sq + BS + sq + sq);
  lines.push("  -d " + sq + safeBody + sq);
  lines.push('');
  lines.push('# === HEADERS ===');
  lines.push(JSON.stringify(h, null, 2));
  lines.push('');
  lines.push('# === BODY (encrypted) ===');
  lines.push(bodyStr);
  lines.push('');
  lines.push('# === DEBUG ===');
  lines.push('refNo    : ' + (res.refNo || ''));
  lines.push('timestamp: ' + (res.ts || ''));
  lines.push('hashRaw  : ' + (res.debug && res.debug.hashRaw ? res.debug.hashRaw : 'N/A'));
  return lines.join(String.fromCharCode(10));
}

// ── SMART STATE ────────────────────────────────────────────────────────────────
var smartSession = null; // { token, aesKey, aesIv, aesCs, clientIdEnc, baseUrl }
var tfInquiryData = null; // simpan data inquiry untuk posting

// ── SMART HELPERS ───────────────────────────────────────────────────────────
function getSmartSession() { return smartSession; }

function updateSessionUI() {
  var has = !!smartSession;
  // Login page session bar
  var bar = document.getElementById('smart-session-bar');
  if (bar) bar.style.display = has ? 'block' : 'none';
  // Saldo page
  var salEl = document.getElementById('smart-saldo-session');
  var salNo = document.getElementById('smart-saldo-noauth');
  if (salEl) salEl.style.display = has ? 'block' : 'none';
  if (salNo) salNo.style.display = has ? 'none' : 'flex';
  // Transfer page
  var tfEl = document.getElementById('smart-tf-session');
  var tfNo = document.getElementById('smart-tf-noauth');
  if (tfEl) tfEl.style.display = has ? 'block' : 'none';
  if (tfNo) tfNo.style.display = has ? 'none' : 'flex';

  if (has) {
    // Show session info - JWT is re-generated per request, show AES CS preview instead
    var csPreview = (smartSession.aesCs || '').substring(0, 12) + '...';
    var statusLabel = '✅ Login OK (status:00)';
    var els = ['ss-token-preview','saldo-token-preview','tf-token-preview'];
    els.forEach(function(id) {
      var e = document.getElementById(id);
      if (e) e.textContent = statusLabel;
    });
    var full = document.getElementById('ss-token-full');
    if (full) full.value = smartSession.clientIdEnc || '';
    var ssKey = document.getElementById('ss-key');
    if (ssKey) ssKey.textContent = smartSession.aesKey ? smartSession.aesKey.substring(0,20)+'...' : '—';
    var ssIv = document.getElementById('ss-iv');
    if (ssIv) ssIv.textContent = smartSession.aesIv ? smartSession.aesIv.substring(0,20)+'...' : '—';
    var ssCs = document.getElementById('ss-cs');
    if (ssCs) ssCs.textContent = smartSession.aesCs || '—';
    var ssDid = document.getElementById('ss-did');
    if (ssDid) ssDid.textContent = (smartSession.clientIdEnc || '—').substring(0,40) + '...';
    // Show account_list count if available
    var lr = smartSession.loginResult;
    if (lr && lr.account_list) {
      var accs = lr.account_list.split ? lr.account_list.split('|') : [];
      var ssTitle = document.querySelector('#smart-session-bar .session-title');
      if (ssTitle) ssTitle.innerHTML = '<span class="badge-live"><span class="dot"></span>Sesi Aktif</span> &nbsp; ' + (accs.length > 0 ? accs.length + ' Rekening' : 'Login Berhasil');
    }
    // Update nav badge
    var navLogin = document.getElementById('nav-smart-login');
    if (navLogin) navLogin.innerHTML = '<i class="fas fa-check-circle" style="color:#4ade80"></i> Login ✓';
  } else {
    var navLogin2 = document.getElementById('nav-smart-login');
    if (navLogin2) navLogin2.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login Nasabah';
  }
}

function smartLogout() {
  smartSession = null;
  tfInquiryData = null;
  updateSessionUI();
  showResult('smart-login', 'Logout berhasil. Session dihapus.', true);
}

function copyRaw(text) {
  if (!text) return;
  navigator.clipboard.writeText(text).catch(function(){});
}

// Update tampilan banner login berdasarkan ketersediaan keygen
function updateLoginBanner() {
  var hasKeygen = !!(window._lastKeygen && window._lastKeygen.clientIdEnc);
  var banner   = document.getElementById('sl-autofill-banner');
  var noBanner = document.getElementById('sl-no-keygen-banner');
  var badge    = document.getElementById('sl-keys-badge');
  var step1    = document.getElementById('sl-step1');
  if (banner)   banner.style.display   = hasKeygen ? 'flex'   : 'none';
  if (noBanner) noBanner.style.display = hasKeygen ? 'none'   : 'flex';
  if (badge)    badge.style.display    = hasKeygen ? 'inline' : 'none';
  if (step1)    step1.className        = hasKeygen ? 'step active' : 'step';
}

// Paste / refresh AES keys dari keygen ke form login
function slPasteKeygen() {
  if (window._lastKeygen) {
    var k = window._lastKeygen;
    var elKey = document.getElementById('sl-key');
    var elIv  = document.getElementById('sl-iv');
    var elCs  = document.getElementById('sl-cs');
    var elDid = document.getElementById('sl-did');
    if (elKey && k.aesKey) elKey.value = k.aesKey;
    if (elIv  && k.aesIv)  elIv.value  = k.aesIv;
    if (elCs  && k.aesCs)  elCs.value  = k.aesCs;
    // X-CLIENT-ID
    var did = k.clientIdEnc || window._lastDid || '';
    if (elDid && did) elDid.value = did;
    updateLoginBanner();
  } else {
    alert('Belum ada data Keygen. Silakan jalankan Derive AES Keys terlebih dahulu.');
  }
}

// Preview curl command untuk login (tanpa benar-benar mengirim request)
function slShowCurl() {
  var did     = val('sl-did');
  var aesCs   = val('sl-cs');
  var user    = val('sl-user') || '<user_name>';
  var pass    = val('sl-pass') || '<user_pass>';
  var baseUrl = val('sl-url') || 'https://lpdseminyak.biz.id:8000';

  if (!did || !aesCs) {
    showResult('smart-login', 'Isi X-CLIENT-ID dan AES CS terlebih dahulu (Paste dari Keygen)', false);
    return;
  }

  var md5Note = (user.length === 32 && /^[0-9a-f]+$/i.test(user))
    ? '(sudah MD5)' : '(akan di-MD5 otomatis)';
  var bs = String.fromCharCode(92);
  var q  = String.fromCharCode(39);
  var nl = String.fromCharCode(10);
  var passPreview = pass.length > 8 ? pass.substring(0,4)+'****' : pass;
  var lines = [];
  lines.push('# Login request - body berisi MD5(user_name) dan MD5(user_pass)');
  lines.push('# Header JWT/X-SIGNATURE di-generate otomatis dari private key LPD');
  lines.push('');
  lines.push('curl -X POST "' + baseUrl + '/api/smart/access/login" ' + bs);
  lines.push('  -H "Content-Type: application/json" ' + bs);
  lines.push('  -H "Authorization: <JWT - di-generate dari private_lpd.pem>" ' + bs);
  lines.push('  -H "X-TIMESTAMP: <timestamp Jakarta>" ' + bs);
  lines.push('  -H "X-SIGNATURE: <HMAC-SHA512(jwt:ts,aesCs)>" ' + bs);
  lines.push('  -H "X-PARTNER-ID: <sama dgn X-SIGNATURE>" ' + bs);
  lines.push('  -H "X-CLIENT-ID: ' + did.substring(0,30) + '..." ' + bs);
  lines.push('  -H "X-REFERENCE: <SMY...>" ' + bs);
  lines.push('  -H "X-Forwarded-For: 34.50.74.78" ' + bs);
  lines.push('  -d ' + q + '{"user_name":"<MD5(' + user + ')> ' + md5Note + '","user_pass":"<MD5(' + passPreview + ')>"}' + q);
  lines.push('');
  lines.push('# Respons sukses: {"status":"00","message":"Sukses","account_list":"...","bank_key":"..."}');
  showResult('smart-login', lines.join(nl), true);
}

// Panggil API /api/smart
async function callSmart(payload) {
  var resp = await fetch('/api/smart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return resp.json();
}

// ── SMART LOGIN ─────────────────────────────────────────────────────────────
async function smartLogin(btn) {
  var aesKey  = val('sl-key');
  var aesIv   = val('sl-iv');
  var aesCs   = val('sl-cs');
  var did     = val('sl-did');
  var user    = val('sl-user');
  var pass    = val('sl-pass');
  var baseUrl = val('sl-url') || 'https://lpdseminyak.biz.id:8000';

  if (!did)           { alert('X-CLIENT-ID wajib diisi! (Paste dari Keygen dulu)'); return; }
  if (!aesCs)         { alert('AES CS wajib diisi! (Paste dari Keygen dulu)'); return; }
  if (!user || !pass) { alert('Username dan Password wajib diisi!'); return; }

  setLoading(btn, true);
  try {
    var r = await callSmart({
      action: 'login', baseUrl: baseUrl,
      aesKey: aesKey, aesIv: aesIv, aesCs: aesCs,
      clientIdEnc: did,
      user_name: user, user_pass: pass,
    });

    // Server mengembalikan status:"00" jika berhasil (tidak ada field "token")
    // Sesi disimpan dengan AES keys untuk request berikutnya
    var loginOk = r.ok && r.result && (
      r.result.status === '00' ||
      r.result.token ||
      (r.result.data && r.result.data.token)
    );

    if (loginOk) {
      // Simpan sesi: gunakan "logged_in" sebagai marker, JWT di-generate ulang tiap request
      smartSession = {
        token: 'LOGGED_IN',  // marker - JWT di-generate ulang tiap request di backend
        aesKey: aesKey, aesIv: aesIv, aesCs: aesCs,
        clientIdEnc: did, baseUrl: baseUrl,
        loginResult: r.result,  // simpan data akun (account_list, bank_key, dll)
      };
      updateSessionUI();
      showResult('smart-login', r, true);
    } else {
      showResult('smart-login', r, false);
    }
  } catch(e) {
    showResult('smart-login', 'Error: ' + e.message, false);
  } finally {
    setLoading(btn, false);
  }
}

// ── CEK SALDO ────────────────────────────────────────────────────────────────
async function smartSaldo(btn) {
  var s = getSmartSession();
  if (!s) { alert('Belum login! Silakan login dulu.'); showTab('smart-login'); return; }
  var noRek = val('sb-norek');
  if (!noRek) { alert('Nomor rekening wajib diisi!'); return; }

  setLoading(btn, true);
  try {
    var r = await callSmart({
      action: 'cek-saldo', baseUrl: s.baseUrl,
      token: s.token, aesKey: s.aesKey, aesIv: s.aesIv, aesCs: s.aesCs,
      clientIdEnc: s.clientIdEnc,
      no_rek: noRek,
    });
    showResult('smart-saldo', r, r.ok);
  } catch(e) {
    showResult('smart-saldo', 'Error: ' + e.message, false);
  } finally {
    setLoading(btn, false);
  }
}

// ── TRANSFER INQUIRY ─────────────────────────────────────────────────────────
async function smartInquiry(btn) {
  var s = getSmartSession();
  if (!s) { alert('Belum login!'); showTab('smart-login'); return; }

  var from    = val('tf-from');
  var to      = val('tf-to');
  var nominal = val('tf-nominal');
  var bank    = val('tf-bank');

  if (!from || !to || !nominal) { alert('No. rekening asal, tujuan, dan nominal wajib diisi!'); return; }

  setLoading(btn, true);
  try {
    var r = await callSmart({
      action: 'inquiry', baseUrl: s.baseUrl,
      token: s.token, aesKey: s.aesKey, aesIv: s.aesIv, aesCs: s.aesCs,
      clientIdEnc: s.clientIdEnc,
      no_rek_from: from, no_rek_to: to, nominal: nominal, bank_dest: bank,
    });

    showResult('smart-inquiry', r, r.ok);

    if (r.ok) {
      // Simpan data inquiry untuk posting
      tfInquiryData = { from: from, to: to, nominal: nominal, bank: bank,
                        ref: (r.debug && r.debug.ref) || '', inquiryResult: r.result };
      // Update confirmation box
      document.getElementById('cf-from').textContent    = from;
      document.getElementById('cf-to').textContent      = to;
      document.getElementById('cf-nominal').textContent = 'Rp ' + Number(nominal).toLocaleString('id-ID');
      document.getElementById('cf-bank').textContent    = bank || 'Intrabank (LPD)';
      document.getElementById('cf-ref').textContent     = tfInquiryData.ref || '—';
      // Show confirm panel & update steps
      document.getElementById('tf-panel-confirm').style.display = 'block';
      document.getElementById('tf-step1').className = 'step done';
      document.getElementById('tf-step2').className = 'step active';
      // Scroll to confirm
      document.getElementById('tf-panel-confirm').scrollIntoView({ behavior: 'smooth' });
    }
  } catch(e) {
    showResult('smart-inquiry', 'Error: ' + e.message, false);
  } finally {
    setLoading(btn, false);
  }
}

// ── TRANSFER POSTING ─────────────────────────────────────────────────────────
async function smartPosting(btn) {
  var s = getSmartSession();
  if (!s) { alert('Belum login!'); return; }
  if (!tfInquiryData) { alert('Lakukan Inquiry terlebih dahulu!'); return; }

  var namaDest = val('tf-nama-dest');
  var ket      = val('tf-ket');

  if (!confirm('Konfirmasi transfer Rp ' + Number(tfInquiryData.nominal).toLocaleString('id-ID') + ' ke rekening ' + tfInquiryData.to + '?')) return;

  setLoading(btn, true);
  try {
    var r = await callSmart({
      action: 'posting', baseUrl: s.baseUrl,
      token: s.token, aesKey: s.aesKey, aesIv: s.aesIv, aesCs: s.aesCs,
      clientIdEnc: s.clientIdEnc,
      no_rek_from: tfInquiryData.from,
      no_rek_to:   tfInquiryData.to,
      nominal:     tfInquiryData.nominal,
      bank_dest:   tfInquiryData.bank,
      nama_dest:   namaDest,
      keterangan:  ket,
      transNo:     tfInquiryData.ref,
    });

    showResult('smart-posting', r, r.ok);

    if (r.ok) {
      document.getElementById('tf-step2').className = 'step done';
      document.getElementById('tf-step3').className = 'step done';
      document.getElementById('result-smart-posting').scrollIntoView({ behavior: 'smooth' });
    }
  } catch(e) {
    showResult('smart-posting', 'Error: ' + e.message, false);
  } finally {
    setLoading(btn, false);
  }
}

// Reset transfer form
function tfReset() {
  tfInquiryData = null;
  document.getElementById('tf-panel-confirm').style.display = 'none';
  document.getElementById('tf-step1').className = 'step active';
  document.getElementById('tf-step2').className = 'step';
  document.getElementById('tf-step3').className = 'step';
  var r = document.getElementById('result-smart-inquiry');
  if (r) r.className = 'result-box';
}

// ── Init ─────────────────────────────────────────────────────────────────────
// Isi timestamp sekarang ke field keygen
fillNow('kg-ts');
// Saat halaman load, update banner login (mungkin ada data dari session sebelumnya)
updateLoginBanner();
<\/script>
</body>
</html>`}function ja(){return`<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>LPD Seminyak — Admin Panel</title>
<script src="https://cdn.tailwindcss.com"><\/script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css"/>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"><\/script>
<style>
:root{--primary:#0f766e;--primary-dark:#0d5752;--secondary:#0f172a;--sidebar-w:240px}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',system-ui,sans-serif;background:#0f172a;color:#e2e8f0;min-height:100vh}

/* ── SIDEBAR ── */
#sidebar{position:fixed;top:0;left:0;width:var(--sidebar-w);height:100vh;background:#134e4a;overflow-y:auto;z-index:100;border-right:1px solid #0d3b37;display:flex;flex-direction:column}
#sidebar .logo{padding:16px 14px 12px;background:linear-gradient(135deg,#0d3b37,#0f766e);border-bottom:1px solid #0d3b37}
#sidebar .logo h1{font-size:14px;font-weight:800;color:#fff;letter-spacing:.5px}
#sidebar .logo p{font-size:10px;color:#99f6e4;margin-top:2px}
#sidebar nav{flex:1;padding:8px 0}
#sidebar nav a{display:flex;align-items:center;gap:9px;padding:9px 14px;font-size:12px;color:#99f6e4;text-decoration:none;transition:all .15s;cursor:pointer;border-left:3px solid transparent}
#sidebar nav a:hover,#sidebar nav a.active{color:#fff;background:rgba(20,184,166,.2);border-left-color:#14b8a6}
#sidebar nav a i{width:16px;text-align:center;font-size:12px}
#sidebar .nav-section{padding:10px 14px 3px;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:1.5px;color:#0d6b65}
#sidebar .sidebar-footer{padding:12px 14px;border-top:1px solid #0d3b37;font-size:10px;color:#4d9e99}

/* ── MAIN ── */
#main{margin-left:var(--sidebar-w);min-height:100vh;padding:0 0 40px}
.topbar{background:#134e4a;border-bottom:1px solid #0d3b37;padding:12px 24px;display:flex;align-items:center;justify-content:space-between}
.topbar h2{font-size:15px;font-weight:700;color:#a7f3d0}
.topbar-right{display:flex;align-items:center;gap:12px;font-size:11px;color:#5eead4}
.section{display:none}.section.active{display:block}
.content{padding:20px 24px}

/* ── CARDS ── */
.stat-card{background:#1e293b;border:1px solid #334155;border-radius:10px;padding:16px;position:relative;overflow:hidden;transition:border-color .2s}
.stat-card:hover{border-color:#14b8a6}
.stat-card .sc-icon{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;margin-bottom:10px}
.stat-card .sc-val{font-size:26px;font-weight:800;color:#e2e8f0;line-height:1}
.stat-card .sc-label{font-size:11px;color:#64748b;margin-top:4px;text-transform:uppercase;letter-spacing:.5px}
.stat-card .sc-sub{font-size:11px;color:#14b8a6;margin-top:4px}

/* ── PANEL ── */
.panel{background:#1e293b;border:1px solid #334155;border-radius:10px;margin-bottom:16px;overflow:hidden}
.panel-header{padding:12px 16px;background:#0f172a;border-bottom:1px solid #1e293b;display:flex;align-items:center;justify-content:space-between}
.panel-header-left{display:flex;align-items:center;gap:8px}
.panel-header h3{font-size:13px;font-weight:700;color:#5eead4}
.panel-header .badge{font-size:10px;padding:2px 7px;border-radius:999px;background:#134e4a;color:#5eead4;font-weight:600}
.panel-body{padding:16px}

/* ── TABLE ── */
.data-table{width:100%;border-collapse:collapse;font-size:12px}
.data-table th{text-align:left;padding:8px 12px;background:#0f172a;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:.5px;font-size:10px;border-bottom:1px solid #1e293b;white-space:nowrap}
.data-table td{padding:8px 12px;border-bottom:1px solid #1e293b;color:#cbd5e1;vertical-align:top}
.data-table tr:last-child td{border-bottom:none}
.data-table tr:hover td{background:rgba(20,184,166,.04)}
.data-table td.mono{font-family:'Courier New',monospace;font-size:11px;color:#67e8f9;word-break:break-all}
.data-table td.ts{font-family:'Courier New',monospace;font-size:11px;color:#94a3b8;white-space:nowrap}
.data-table td.url{font-family:'Courier New',monospace;font-size:10px;color:#a5b4fc;word-break:break-all;max-width:200px}
.data-table td.status-ok{color:#34d399;font-weight:700}
.data-table td.status-err{color:#f87171;font-weight:700}
.data-table td.status-warn{color:#fbbf24;font-weight:700}

/* ── BUTTONS ── */
.btn{display:inline-flex;align-items:center;gap:6px;padding:7px 14px;border-radius:7px;font-size:11px;font-weight:700;cursor:pointer;border:none;transition:all .15s;text-transform:uppercase;letter-spacing:.5px}
.btn-primary{background:linear-gradient(135deg,#0f766e,#0d6b65);color:#fff}
.btn-primary:hover{background:linear-gradient(135deg,#0d6b65,#0a5952);transform:translateY(-1px)}
.btn-secondary{background:#1e293b;border:1px solid #334155;color:#94a3b8}
.btn-secondary:hover{background:#334155;color:#e2e8f0}
.btn-sm{padding:4px 10px;font-size:10px}
.btn:disabled{opacity:.5;cursor:not-allowed;transform:none!important}

/* ── FORM ── */
label{display:block;font-size:10px;font-weight:700;color:#64748b;margin-bottom:4px;text-transform:uppercase;letter-spacing:.5px}
input[type=text],input[type=date],select,textarea{width:100%;background:#0f172a;border:1px solid #334155;border-radius:6px;padding:8px 10px;color:#e2e8f0;font-size:12px;font-family:'Courier New',monospace;outline:none;transition:border .15s}
input[type=text]:focus,input[type=date]:focus,select:focus,textarea:focus{border-color:#0f766e}
select{cursor:pointer}

/* ── MISC ── */
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.grid-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px}
.grid-4{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:14px}
@media(max-width:1100px){.grid-4{grid-template-columns:1fr 1fr}}
@media(max-width:900px){.grid-2,.grid-3,.grid-4{grid-template-columns:1fr}}
.field-row{margin-bottom:10px}
.info-box{padding:10px 14px;border-radius:8px;font-size:12px;margin:10px 0;display:flex;gap:9px;align-items:flex-start;line-height:1.6}
.info-box i{margin-top:2px;flex-shrink:0}
.info-teal{background:#0d3b37;border-left:3px solid #14b8a6;color:#99f6e4}
.info-yellow{background:#1c1200;border-left:3px solid #d97706;color:#fcd34d}
.info-red{background:#2d0000;border-left:3px solid #dc2626;color:#fca5a5}
.badge-pill{display:inline-block;padding:2px 8px;border-radius:999px;font-size:10px;font-weight:700}
.badge-ok{background:#022c22;color:#34d399}
.badge-warn{background:#2c1900;color:#fbbf24}
.badge-err{background:#2d0000;color:#f87171}
.badge-info{background:#0d3b37;color:#5eead4}
.spinner{width:14px;height:14px;border:2px solid rgba(255,255,255,.3);border-top-color:#14b8a6;border-radius:50%;animation:spin .6s linear infinite;display:inline-block}
@keyframes spin{to{transform:rotate(360deg)}}
.empty-state{text-align:center;padding:40px 20px;color:#475569}
.empty-state i{font-size:36px;margin-bottom:10px;display:block}
.log-entry{border:1px solid #1e293b;border-radius:8px;margin-bottom:8px;overflow:hidden;background:#0a0f1a}
.log-entry-header{display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:#0f172a;cursor:pointer;user-select:none}
.log-entry-body{padding:12px;font-size:11px;font-family:'Courier New',monospace;color:#7dd3fc;white-space:pre-wrap;word-break:break-all;display:none;max-height:300px;overflow-y:auto;line-height:1.6}
.log-entry-body.show{display:block}
.method-tag{font-size:9px;font-weight:800;padding:2px 7px;border-radius:4px}
.method-post{background:#1e1b4b;color:#a78bfa}
.method-get{background:#022c22;color:#34d399}
.search-bar{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:12px}
.search-bar input,.search-bar select{flex:1;min-width:120px;padding:7px 10px;font-size:12px}
.pagination{display:flex;align-items:center;justify-content:space-between;padding:10px 0;font-size:11px;color:#64748b}
.pagination-btns{display:flex;gap:6px}
.chart-container{position:relative;height:180px}
.section-title{font-size:13px;font-weight:700;color:#5eead4;margin-bottom:12px;display:flex;align-items:center;gap:8px}
.section-title i{font-size:14px}
.tag{display:inline-block;padding:2px 6px;border-radius:4px;font-size:10px;font-weight:600;background:#1e293b;color:#94a3b8;margin:1px}
.separator{height:1px;background:#1e293b;margin:12px 0}
.truncate-cell{max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;cursor:help}

/* ── MOBILE ── */
#menu-toggle{display:none;background:none;border:none;color:#5eead4;font-size:20px;cursor:pointer;padding:4px}
#sidebar-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:99}
#sidebar-overlay.show{display:block}
@media(max-width:768px){
  #menu-toggle{display:block}
  #sidebar{transform:translateX(-100%);transition:transform .25s}
  #sidebar.open{transform:translateX(0)}
  #sidebar-overlay.show{display:block}
  #main{margin-left:0}
  .topbar{padding:10px 14px}
}
</style>
</head>
<body>

<!-- Sidebar overlay -->
<div id="sidebar-overlay" onclick="closeSidebar()"></div>

<!-- ── SIDEBAR ── -->
<aside id="sidebar">
  <div class="logo">
    <h1><i class="fas fa-university mr-2"></i>LPD Seminyak</h1>
    <p>Admin Management Panel</p>
  </div>
  <nav>
    <div class="nav-section">Dashboard</div>
    <a href="#" onclick="showSection('dashboard')" id="nav-dashboard" class="active">
      <i class="fas fa-tachometer-alt"></i> Overview
    </a>
    <a href="#" onclick="showSection('activity')" id="nav-activity">
      <i class="fas fa-chart-line"></i> Aktivitas Harian
    </a>

    <div class="nav-section">Monitoring</div>
    <a href="#" onclick="showSection('logs-access')" id="nav-logs-access">
      <i class="fas fa-sign-in-alt"></i> Log Akses Nasabah
    </a>
    <a href="#" onclick="showSection('logs-transfer')" id="nav-logs-transfer">
      <i class="fas fa-exchange-alt"></i> Log Transfer
    </a>
    <a href="#" onclick="showSection('logs-tabungan')" id="nav-logs-tabungan">
      <i class="fas fa-piggy-bank"></i> Log Tabungan
    </a>
    <a href="#" onclick="showSection('logs-token')" id="nav-logs-token">
      <i class="fas fa-key"></i> Log Token / SNAP
    </a>

    <div class="nav-section">Analisis</div>
    <a href="#" onclick="showSection('stats')" id="nav-stats">
      <i class="fas fa-chart-bar"></i> Statistik API
    </a>
    <a href="#" onclick="showSection('errors')" id="nav-errors">
      <i class="fas fa-exclamation-triangle"></i> Error Log
    </a>

    <div class="nav-section">Transaksi</div>
    <a href="#" onclick="showSection('trx')" id="nav-trx">
      <i class="fas fa-terminal"></i> Jalankan Transaksi
    </a>
    <a href="#" onclick="showSection('trx-history')" id="nav-trx-history">
      <i class="fas fa-history"></i> Riwayat Transaksi
    </a>

    <div class="nav-section">Sistem</div>
    <a href="#" onclick="showSection('crypto-ops')" id="nav-crypto-ops">
      <i class="fas fa-lock"></i> Crypto Test
    </a>
    <a href="/crypto" target="_blank">
      <i class="fas fa-tools"></i> Crypto Toolkit <i class="fas fa-external-link-alt ml-1" style="font-size:9px"></i>
    </a>
    <a href="/swagger" target="_blank">
      <i class="fas fa-book"></i> Swagger API <i class="fas fa-external-link-alt ml-1" style="font-size:9px"></i>
    </a>
  </nav>
  <div class="sidebar-footer">
    <div><i class="fas fa-circle" style="color:#22c55e;font-size:7px"></i> Production: lpdseminyak.biz.id</div>
    <div style="margin-top:3px"><i class="fas fa-clock"></i> <span id="sidebar-time">—</span></div>
  </div>
</aside>

<!-- ── MAIN ── -->
<main id="main">

  <!-- TOPBAR -->
  <div class="topbar">
    <div style="display:flex;align-items:center;gap:10px">
      <button id="menu-toggle" onclick="toggleSidebar()"><i class="fas fa-bars"></i></button>
      <h2 id="topbar-title"><i class="fas fa-tachometer-alt mr-2"></i>Overview</h2>
    </div>
    <div class="topbar-right">
      <span id="topbar-date" style="font-size:11px;color:#5eead4"></span>
      <button class="btn btn-secondary btn-sm" onclick="refreshAll()"><i class="fas fa-sync-alt"></i> Refresh</button>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════
       SECTION: DASHBOARD
  ═══════════════════════════════════════════════════ -->
  <div id="section-dashboard" class="section active content">

    <div class="grid-4" style="margin-bottom:16px" id="stat-cards">
      <div class="stat-card">
        <div class="sc-icon" style="background:#0d3b37"><i class="fas fa-sign-in-alt" style="color:#14b8a6"></i></div>
        <div class="sc-val" id="stat-total-access">—</div>
        <div class="sc-label">Total Login Hari Ini</div>
        <div class="sc-sub" id="stat-access-sub">memuat...</div>
      </div>
      <div class="stat-card">
        <div class="sc-icon" style="background:#1e1b4b"><i class="fas fa-exchange-alt" style="color:#a78bfa"></i></div>
        <div class="sc-val" id="stat-total-transfer">—</div>
        <div class="sc-label">Transfer Hari Ini</div>
        <div class="sc-sub" id="stat-transfer-sub">memuat...</div>
      </div>
      <div class="stat-card">
        <div class="sc-icon" style="background:#022c22"><i class="fas fa-key" style="color:#34d399"></i></div>
        <div class="sc-val" id="stat-total-token">—</div>
        <div class="sc-label">Token Request Hari Ini</div>
        <div class="sc-sub" id="stat-token-sub">memuat...</div>
      </div>
      <div class="stat-card">
        <div class="sc-icon" style="background:#1c0d00"><i class="fas fa-exclamation-triangle" style="color:#f97316"></i></div>
        <div class="sc-val" id="stat-total-errors">—</div>
        <div class="sc-label">Error 7 Hari</div>
        <div class="sc-sub" id="stat-error-sub">memuat...</div>
      </div>
    </div>

    <div class="grid-2" style="margin-bottom:16px">
      <div class="panel">
        <div class="panel-header">
          <div class="panel-header-left">
            <h3><i class="fas fa-sign-in-alt mr-2"></i>Login Terbaru</h3>
            <span class="badge" id="badge-recent-access">—</span>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="showSection('logs-access')">Lihat Semua</button>
        </div>
        <div class="panel-body" style="padding:0">
          <table class="data-table">
            <thead><tr><th>Waktu</th><th>Endpoint</th><th>Status</th></tr></thead>
            <tbody id="recent-access-body">
              <tr><td colspan="3" class="text-center" style="padding:16px;color:#475569">Memuat...</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="panel">
        <div class="panel-header">
          <div class="panel-header-left">
            <h3><i class="fas fa-exchange-alt mr-2"></i>Transfer Terbaru</h3>
            <span class="badge" id="badge-recent-transfer">—</span>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="showSection('logs-transfer')">Lihat Semua</button>
        </div>
        <div class="panel-body" style="padding:0">
          <table class="data-table">
            <thead><tr><th>Waktu</th><th>Endpoint</th><th>Nominal</th></tr></thead>
            <tbody id="recent-transfer-body">
              <tr><td colspan="3" class="text-center" style="padding:16px;color:#475569">Memuat...</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="panel">
      <div class="panel-header">
        <div class="panel-header-left">
          <h3><i class="fas fa-history mr-2"></i>File Log Tersedia</h3>
        </div>
      </div>
      <div class="panel-body" id="log-files-overview">
        <div style="color:#475569;font-size:12px">Memuat...</div>
      </div>
    </div>

  </div>

  <!-- ═══════════════════════════════════════════════════
       SECTION: AKTIVITAS HARIAN
  ═══════════════════════════════════════════════════ -->
  <div id="section-activity" class="section content">
    <div class="section-title"><i class="fas fa-chart-line"></i> Aktivitas Harian — Request per Jam</div>

    <div class="panel" style="margin-bottom:16px">
      <div class="panel-header">
        <div class="panel-header-left">
          <h3><i class="fas fa-calendar mr-2"></i>Pilih Tanggal & Tipe Log</h3>
        </div>
        <button class="btn btn-primary btn-sm" onclick="loadActivity()"><i class="fas fa-search"></i> Load</button>
      </div>
      <div class="panel-body">
        <div class="grid-3">
          <div class="field-row">
            <label>Tanggal</label>
            <input type="date" id="act-date" />
          </div>
          <div class="field-row">
            <label>Tipe Log</label>
            <select id="act-type">
              <option value="access">Access (Login/Logout)</option>
              <option value="transfer-AR">Transfer Bank (AR)</option>
              <option value="transfer-AB">Transfer LPD (AB)</option>
              <option value="tabungan">Tabungan / Mutasi</option>
              <option value="token">Token SNAP</option>
            </select>
          </div>
          <div class="field-row">
            <label>Filter Endpoint</label>
            <input type="text" id="act-filter" placeholder="cth: login, transfer, inquiry" />
          </div>
        </div>
      </div>
    </div>

    <div class="grid-2" style="margin-bottom:16px">
      <div class="panel">
        <div class="panel-header"><div class="panel-header-left"><h3>Request Per Jam</h3><span class="badge" id="badge-act-total">0</span></div></div>
        <div class="panel-body"><div class="chart-container"><canvas id="chart-hourly"></canvas></div></div>
      </div>
      <div class="panel">
        <div class="panel-header"><div class="panel-header-left"><h3>Distribusi Endpoint</h3></div></div>
        <div class="panel-body"><div class="chart-container"><canvas id="chart-endpoint"></canvas></div></div>
      </div>
    </div>

    <div class="panel">
      <div class="panel-header">
        <div class="panel-header-left"><h3><i class="fas fa-list mr-2"></i>Log Entries</h3><span class="badge" id="badge-act-entries">0</span></div>
      </div>
      <div class="panel-body" style="padding:0">
        <div id="activity-log-list" style="padding:12px"></div>
      </div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════
       SECTION: LOG AKSES
  ═══════════════════════════════════════════════════ -->
  <div id="section-logs-access" class="section content">
    <div class="section-title"><i class="fas fa-sign-in-alt"></i> Log Akses Nasabah</div>
    <div class="panel" style="margin-bottom:12px">
      <div class="panel-header"><div class="panel-header-left"><h3>Filter</h3></div>
        <button class="btn btn-primary btn-sm" onclick="loadAccessLogs()"><i class="fas fa-search"></i> Cari</button>
      </div>
      <div class="panel-body">
        <div class="grid-3">
          <div class="field-row"><label>Tanggal</label><input type="date" id="acc-date"/></div>
          <div class="field-row"><label>Sumber File</label>
            <select id="acc-source">
              <option value="root">Root (access-YYYY-MM-DD.txt)</option>
              <option value="his">his/ (access-YYYY-MM-DD.txt)</option>
            </select>
          </div>
          <div class="field-row"><label>Cari Teks</label><input type="text" id="acc-search" placeholder="endpoint, username hash, ..."/></div>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header">
        <div class="panel-header-left"><h3><i class="fas fa-list-alt mr-2"></i>Log Entries</h3><span class="badge" id="badge-acc-count">0</span></div>
      </div>
      <div id="access-log-list" style="padding:12px"></div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════
       SECTION: LOG TRANSFER
  ═══════════════════════════════════════════════════ -->
  <div id="section-logs-transfer" class="section content">
    <div class="section-title"><i class="fas fa-exchange-alt"></i> Log Transfer</div>
    <div class="panel" style="margin-bottom:12px">
      <div class="panel-header"><div class="panel-header-left"><h3>Filter</h3></div>
        <button class="btn btn-primary btn-sm" onclick="loadTransferLogs()"><i class="fas fa-search"></i> Cari</button>
      </div>
      <div class="panel-body">
        <div class="grid-3">
          <div class="field-row"><label>Tanggal</label><input type="date" id="tr-date"/></div>
          <div class="field-row"><label>Tipe Transfer</label>
            <select id="tr-type">
              <option value="AR">Transfer Bank Antar (AR)</option>
              <option value="AB">Transfer LPD Antar (AB)</option>
              <option value="in">Transfer In (Masuk)</option>
            </select>
          </div>
          <div class="field-row"><label>Sumber</label>
            <select id="tr-source">
              <option value="root">Root</option>
              <option value="his">his/</option>
            </select>
          </div>
        </div>
        <div class="field-row"><label>Cari Teks</label><input type="text" id="tr-search" placeholder="endpoint, reference, ..."/></div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header">
        <div class="panel-header-left"><h3><i class="fas fa-list-alt mr-2"></i>Log Entries</h3><span class="badge" id="badge-tr-count">0</span></div>
      </div>
      <div id="transfer-log-list" style="padding:12px"></div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════
       SECTION: LOG TABUNGAN
  ═══════════════════════════════════════════════════ -->
  <div id="section-logs-tabungan" class="section content">
    <div class="section-title"><i class="fas fa-piggy-bank"></i> Log Tabungan & Mutasi</div>
    <div class="panel" style="margin-bottom:12px">
      <div class="panel-header"><div class="panel-header-left"><h3>Filter</h3></div>
        <button class="btn btn-primary btn-sm" onclick="loadTabunganLogs()"><i class="fas fa-search"></i> Cari</button>
      </div>
      <div class="panel-body">
        <div class="grid-2">
          <div class="field-row"><label>Tanggal</label><input type="date" id="tab-date"/></div>
          <div class="field-row"><label>Cari Teks</label><input type="text" id="tab-search" placeholder="customer_id, endpoint..."/></div>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header">
        <div class="panel-header-left"><h3><i class="fas fa-list-alt mr-2"></i>Log Entries</h3><span class="badge" id="badge-tab-count">0</span></div>
      </div>
      <div id="tabungan-log-list" style="padding:12px"></div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════
       SECTION: LOG TOKEN
  ═══════════════════════════════════════════════════ -->
  <div id="section-logs-token" class="section content">
    <div class="section-title"><i class="fas fa-key"></i> Log Token / SNAP B2B</div>
    <div class="panel" style="margin-bottom:12px">
      <div class="panel-header"><div class="panel-header-left"><h3>Filter</h3></div>
        <button class="btn btn-primary btn-sm" onclick="loadTokenLogs()"><i class="fas fa-search"></i> Cari</button>
      </div>
      <div class="panel-body">
        <div class="grid-3">
          <div class="field-row"><label>Tanggal</label><input type="date" id="tok-date"/></div>
          <div class="field-row"><label>Tipe</label>
            <select id="tok-type">
              <option value="root">Root (token-YYYY-MM-DD.txt)</option>
              <option value="token-dir">token/ (request-YYYY-MM-DD.log)</option>
            </select>
          </div>
          <div class="field-row"><label>Cari Teks</label><input type="text" id="tok-search" placeholder="accessToken, responseCode..."/></div>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header">
        <div class="panel-header-left"><h3><i class="fas fa-list-alt mr-2"></i>Log Entries</h3><span class="badge" id="badge-tok-count">0</span></div>
      </div>
      <div id="token-log-list" style="padding:12px"></div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════
       SECTION: STATISTIK
  ═══════════════════════════════════════════════════ -->
  <div id="section-stats" class="section content">
    <div class="section-title"><i class="fas fa-chart-bar"></i> Statistik API</div>
    <div class="info-box info-teal">
      <i class="fas fa-info-circle"></i>
      Statistik dihitung dari file log yang tersedia di storage Laravel.
      Data diambil secara real-time dari server.
    </div>

    <div class="grid-2" style="margin-bottom:16px">
      <div class="panel">
        <div class="panel-header"><div class="panel-header-left"><h3>Top Endpoints (7 Hari)</h3></div></div>
        <div class="panel-body" id="stats-endpoints">
          <div style="color:#475569;text-align:center;padding:20px">Memuat...</div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-header"><div class="panel-header-left"><h3>Aktivitas Per Hari (30 Hari)</h3></div></div>
        <div class="panel-body"><div class="chart-container"><canvas id="chart-daily"></canvas></div></div>
      </div>
    </div>

    <div class="panel">
      <div class="panel-header">
        <div class="panel-header-left"><h3>Daftar File Log</h3></div>
        <button class="btn btn-primary btn-sm" onclick="loadStats()"><i class="fas fa-sync-alt"></i> Refresh</button>
      </div>
      <div class="panel-body" style="padding:0">
        <table class="data-table">
          <thead><tr><th>File</th><th>Direktori</th><th>Ukuran</th><th>Entri</th></tr></thead>
          <tbody id="stats-files-body">
            <tr><td colspan="4" style="text-align:center;padding:16px;color:#475569">Memuat...</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════
       SECTION: ERROR LOG
  ═══════════════════════════════════════════════════ -->
  <div id="section-errors" class="section content">
    <div class="section-title"><i class="fas fa-exclamation-triangle"></i> Error Log Laravel</div>
    <div class="panel" style="margin-bottom:12px">
      <div class="panel-header"><div class="panel-header-left"><h3>Filter</h3></div>
        <button class="btn btn-primary btn-sm" onclick="loadErrors()"><i class="fas fa-search"></i> Cari</button>
      </div>
      <div class="panel-body">
        <div class="grid-2">
          <div class="field-row"><label>Level</label>
            <select id="err-level">
              <option value="all">Semua</option>
              <option value="ERROR">ERROR</option>
              <option value="WARNING">WARNING</option>
              <option value="INFO">INFO</option>
            </select>
          </div>
          <div class="field-row"><label>Cari Teks</label><input type="text" id="err-search" placeholder="SQLSTATE, Exception, ..."/></div>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header">
        <div class="panel-header-left"><h3><i class="fas fa-bug mr-2"></i>Laravel Error Log</h3><span class="badge" id="badge-err-count">0</span></div>
      </div>
      <div id="error-log-list" style="padding:12px"></div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════
       SECTION: TRANSAKSI
  ═══════════════════════════════════════════════════ -->
  <div id="section-trx" class="section content">
    <div class="section-title"><i class="fas fa-terminal"></i> Jalankan Transaksi Smart API</div>
    <div class="info-box info-teal" style="margin-bottom:14px">
      <i class="fas fa-info-circle"></i>
      <div>Lakukan transaksi langsung ke server LPD. Semua data dienkripsi AES-256-CBC sebelum dikirim.
      Alur: <strong>1. Setup Sesi</strong> → <strong>2. Login</strong> → <strong>3. Pilih Transaksi</strong> → <strong>4. Posting</strong></div>
    </div>

    <!-- Step 1: Session Setup -->
    <div class="panel" style="border-left:3px solid #14b8a6">
      <div class="panel-header">
        <div class="panel-header-left">
          <span style="background:#14b8a6;color:#0f172a;width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:11px;flex-shrink:0">1</span>
          <h3><i class="fas fa-key mr-2"></i>Setup Sesi (Derive Keys)</h3>
          <span class="badge" id="trx-session-badge">Belum aktif</span>
        </div>
        <div style="display:flex;gap:8px">
          <button class="btn btn-secondary btn-sm" onclick="trxAutoSetup()"><i class="fas fa-magic"></i> Auto Setup</button>
          <button class="btn btn-secondary btn-sm" onclick="trxGetFreshToken(true)"><i class="fas fa-sync-alt"></i> Refresh Token</button>
        </div>
      </div>
      <div class="panel-body">
        <div class="grid-2">
          <div>
            <div class="field-row"><label>Client ID Raw</label><input type="text" id="trx-clientid" value="AQ3A.240912.001.01102025120205"/></div>
            <div class="field-row"><label>Base URL Server</label><input type="text" id="trx-baseurl" value="https://lpdseminyak.biz.id:8000"/></div>
          </div>
          <div>
            <div class="field-row"><label>Client ID Encoded (X-CLIENT-ID)</label><input type="text" id="trx-clientid-enc" placeholder="Otomatis dari Auto Setup..."/></div>
            <div class="field-row"><label>Timestamp Sesi</label><input type="text" id="trx-session-ts" placeholder="Otomatis dari Auto Setup..."/></div>
          </div>
        </div>
        <div class="grid-2" style="margin-top:6px">
          <div><div class="field-row"><label>AES Key (Base64)</label><input type="text" id="trx-aeskey" placeholder="Otomatis dari Auto Setup..."/></div></div>
          <div><div class="field-row"><label>AES IV (Base64)</label><input type="text" id="trx-aesiv" placeholder="Otomatis dari Auto Setup..."/></div></div>
        </div>
        <div class="field-row" style="margin-top:6px"><label>AES CS (Base64)</label><input type="text" id="trx-aescs" placeholder="Otomatis dari Auto Setup..."/></div>
        <div style="margin-top:10px;display:flex;align-items:center;gap:10px">
          <span style="font-size:10px;color:#64748b;text-transform:uppercase;letter-spacing:.5px;font-weight:700">Status Token iOS:</span>
          <span id="trx-token-status"><span class="badge-pill badge-err">Belum ada token</span></span>
        </div>
        <div id="trx-setup-result" style="margin-top:10px;display:none"></div>
      </div>
    </div>

    <!-- Step 2: Login -->
    <div class="panel" style="border-left:3px solid #a78bfa">
      <div class="panel-header">
        <div class="panel-header-left">
          <span style="background:#a78bfa;color:#0f172a;width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:11px;flex-shrink:0">2</span>
          <h3><i class="fas fa-sign-in-alt mr-2"></i>Login Nasabah</h3>
          <span class="badge" id="trx-login-badge">Belum login</span>
        </div>
        <button class="btn btn-primary btn-sm" onclick="trxLogin()"><i class="fas fa-sign-in-alt"></i> Login</button>
      </div>
      <div class="panel-body">
        <div class="grid-2">
          <div><div class="field-row"><label>Username</label><input type="text" id="trx-username" placeholder="username nasabah"/></div></div>
          <div><div class="field-row"><label>Password (plain atau MD5)</label><input type="text" id="trx-password" placeholder="password nasabah"/></div></div>
        </div>
        <div id="trx-login-result" style="margin-top:10px;display:none"></div>
      </div>
    </div>

    <!-- Step 3: Select Operation -->
    <div class="panel" style="border-left:3px solid #fbbf24">
      <div class="panel-header">
        <div class="panel-header-left">
          <span style="background:#fbbf24;color:#0f172a;width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:11px;flex-shrink:0">3</span>
          <h3><i class="fas fa-list mr-2"></i>Pilih Operasi</h3>
        </div>
      </div>
      <div class="panel-body">
        <div class="grid-4" style="margin-bottom:12px">
          <button class="btn btn-secondary" onclick="trxShowOp('cek-saldo')"><i class="fas fa-wallet"></i> Cek Saldo</button>
          <button class="btn btn-secondary" onclick="trxShowOp('account-list')"><i class="fas fa-list-alt"></i> Daftar Rekening</button>
          <button class="btn btn-secondary" onclick="trxShowOp('mutasi')"><i class="fas fa-history"></i> Mutasi</button>
          <button class="btn btn-secondary" onclick="trxShowOp('transfer-lpd')"><i class="fas fa-building mr-1"></i> Transfer LPD</button>
          <button class="btn btn-secondary" onclick="trxShowOp('transfer-bank')"><i class="fas fa-university mr-1"></i> Transfer Bank</button>
          <button class="btn btn-secondary" onclick="trxShowOp('logout')"><i class="fas fa-sign-out-alt"></i> Logout</button>
        </div>

        <!-- CEK SALDO -->
        <div id="trx-op-cek-saldo" class="trx-op-panel" style="display:none">
          <div class="separator"></div>
          <div class="section-title" style="margin-bottom:8px"><i class="fas fa-wallet"></i> Cek Saldo Rekening</div>
          <div class="field-row"><label>Nomor Rekening</label><input type="text" id="trx-cs-norek" placeholder="e.g. 2010123456"/></div>
          <button class="btn btn-primary" onclick="trxExec('cek-saldo')"><i class="fas fa-search"></i> Cek Saldo</button>
          <div id="trx-result-cek-saldo" style="margin-top:10px;display:none"></div>
        </div>

        <!-- ACCOUNT LIST -->
        <div id="trx-op-account-list" class="trx-op-panel" style="display:none">
          <div class="separator"></div>
          <div class="section-title" style="margin-bottom:8px"><i class="fas fa-list-alt"></i> Daftar Rekening Nasabah</div>
          <div class="field-row"><label>Customer ID</label><input type="text" id="trx-al-custid" placeholder="e.g. 12345"/></div>
          <button class="btn btn-primary" onclick="trxExec('account-list')"><i class="fas fa-search"></i> Cari Rekening</button>
          <div id="trx-result-account-list" style="margin-top:10px;display:none"></div>
        </div>

        <!-- MUTASI HISTORY -->
        <div id="trx-op-mutasi" class="trx-op-panel" style="display:none">
          <div class="separator"></div>
          <div class="section-title" style="margin-bottom:8px"><i class="fas fa-history"></i> Riwayat Mutasi</div>
          <div class="grid-2">
            <div><div class="field-row"><label>Nomor Rekening</label><input type="text" id="trx-mu-norek" placeholder="e.g. 2010123456"/></div></div>
            <div><div class="field-row"><label>Customer ID</label><input type="text" id="trx-mu-custid" placeholder="e.g. 12345"/></div></div>
            <div><div class="field-row"><label>Tanggal Awal</label><input type="date" id="trx-mu-tglawal"/></div></div>
            <div><div class="field-row"><label>Tanggal Akhir</label><input type="date" id="trx-mu-tglakhir"/></div></div>
          </div>
          <div style="display:flex;gap:8px;margin-top:4px">
            <button class="btn btn-primary" onclick="trxExec('mutasi-history')"><i class="fas fa-history"></i> Cek Mutasi</button>
            <button class="btn btn-secondary" onclick="trxExec('transaction-history')"><i class="fas fa-list"></i> Riwayat Transaksi</button>
          </div>
          <div id="trx-result-mutasi-history" style="margin-top:10px;display:none"></div>
          <div id="trx-result-transaction-history" style="margin-top:10px;display:none"></div>
        </div>

        <!-- TRANSFER LPD -->
        <div id="trx-op-transfer-lpd" class="trx-op-panel" style="display:none">
          <div class="separator"></div>
          <div class="section-title" style="margin-bottom:8px"><i class="fas fa-building"></i> Transfer Sesama LPD</div>
          <div class="grid-2">
            <div><div class="field-row"><label>Rekening Sumber</label><input type="text" id="trx-tlpd-from" placeholder="No rekening pengirim"/></div></div>
            <div>
              <div class="field-row">
                <label>Rekening Tujuan</label>
                <div style="display:flex;gap:6px">
                  <input type="text" id="trx-tlpd-to" placeholder="No rekening tujuan"/>
                  <button class="btn btn-secondary btn-sm" onclick="trxExec('transfer-lpd-check')" style="white-space:nowrap"><i class="fas fa-search"></i> Cek</button>
                </div>
              </div>
              <div id="trx-result-transfer-lpd-check" style="margin-bottom:8px;display:none"></div>
            </div>
            <div><div class="field-row"><label>Nama Tujuan</label><input type="text" id="trx-tlpd-name" placeholder="Nama pemilik rekening"/></div></div>
            <div><div class="field-row"><label>Nominal (Rp)</label><input type="text" id="trx-tlpd-nominal" placeholder="e.g. 100000"/></div></div>
            <div><div class="field-row"><label>Keterangan</label><input type="text" id="trx-tlpd-ket" placeholder="Pembayaran..."/></div></div>
          </div>
          <div style="display:flex;gap:8px;margin-top:8px">
            <button class="btn btn-secondary" onclick="trxExec('transfer-lpd-inquiry')"><i class="fas fa-check-circle"></i> Inquiry</button>
            <button class="btn btn-primary" onclick="trxConfirmPosting('transfer-lpd-posting')"><i class="fas fa-paper-plane"></i> Posting</button>
          </div>
          <div id="trx-result-transfer-lpd-inquiry" style="margin-top:10px;display:none"></div>
          <div id="trx-result-transfer-lpd-posting" style="margin-top:10px;display:none"></div>
        </div>

        <!-- TRANSFER BANK -->
        <div id="trx-op-transfer-bank" class="trx-op-panel" style="display:none">
          <div class="separator"></div>
          <div class="section-title" style="margin-bottom:8px"><i class="fas fa-university"></i> Transfer ke Bank Lain</div>
          <div class="grid-2">
            <div><div class="field-row"><label>Rekening Sumber</label><input type="text" id="trx-tbank-from" placeholder="No rekening pengirim"/></div></div>
            <div>
              <div class="field-row">
                <label>Rekening Tujuan</label>
                <div style="display:flex;gap:6px">
                  <input type="text" id="trx-tbank-to" placeholder="No rekening tujuan"/>
                  <button class="btn btn-secondary btn-sm" onclick="trxExec('transfer-bank-check')" style="white-space:nowrap"><i class="fas fa-search"></i> Cek</button>
                </div>
              </div>
              <div id="trx-result-transfer-bank-check" style="margin-bottom:8px;display:none"></div>
            </div>
            <div>
              <div class="field-row"><label>Kode Bank</label>
                <select id="trx-tbank-kode">
                  <option value="">-- Pilih Bank --</option>
                  <option value="014">BCA (014)</option>
                  <option value="008">Mandiri (008)</option>
                  <option value="009">BNI (009)</option>
                  <option value="002">BRI (002)</option>
                  <option value="022">CIMB Niaga (022)</option>
                  <option value="011">Danamon (011)</option>
                  <option value="016">BII Maybank (016)</option>
                  <option value="013">Permata (013)</option>
                  <option value="023">UOB (023)</option>
                  <option value="028">OCBC NISP (028)</option>
                  <option value="147">Muamalat (147)</option>
                  <option value="451">BSI (451)</option>
                  <option value="110">BJB (110)</option>
                  <option value="112">BPD Bali (112)</option>
                  <option value="111">DKI (111)</option>
                </select>
              </div>
            </div>
            <div><div class="field-row"><label>Nominal (Rp)</label><input type="text" id="trx-tbank-nominal" placeholder="e.g. 100000"/></div></div>
            <div><div class="field-row"><label>Keterangan</label><input type="text" id="trx-tbank-ket" placeholder="Pembayaran..."/></div></div>
          </div>
          <div style="display:flex;gap:8px;margin-top:8px">
            <button class="btn btn-secondary" onclick="trxExec('transfer-bank-inquiry')"><i class="fas fa-check-circle"></i> Inquiry</button>
            <button class="btn btn-primary" onclick="trxConfirmPosting('transfer-bank-posting')"><i class="fas fa-paper-plane"></i> Posting</button>
          </div>
          <div id="trx-result-transfer-bank-inquiry" style="margin-top:10px;display:none"></div>
          <div id="trx-result-transfer-bank-posting" style="margin-top:10px;display:none"></div>
        </div>

        <!-- LOGOUT -->
        <div id="trx-op-logout" class="trx-op-panel" style="display:none">
          <div class="separator"></div>
          <div class="section-title" style="margin-bottom:8px"><i class="fas fa-sign-out-alt"></i> Logout Sesi</div>
          <button class="btn btn-primary" onclick="trxExec('logout')"><i class="fas fa-sign-out-alt"></i> Logout Sekarang</button>
          <div id="trx-result-logout" style="margin-top:10px;display:none"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════
       SECTION: RIWAYAT TRANSAKSI
  ═══════════════════════════════════════════════════ -->
  <div id="section-trx-history" class="section content">
    <div class="section-title"><i class="fas fa-history"></i> Riwayat Transaksi</div>
    <div class="panel" style="margin-bottom:16px">
      <div class="panel-header">
        <div class="panel-header-left"><h3><i class="fas fa-filter mr-2"></i>Filter</h3></div>
        <button class="btn btn-primary btn-sm" onclick="loadTrxHistory()"><i class="fas fa-sync-alt"></i> Muat</button>
      </div>
      <div class="panel-body">
        <div class="grid-4">
          <div><div class="field-row"><label>Tipe Log</label>
            <select id="th-type">
              <option value="transfer-AB">Transfer AB (Bank)</option>
              <option value="transfer-AR">Transfer AR (LPD)</option>
              <option value="access">Akses Login</option>
              <option value="tabungan">Tabungan</option>
            </select>
          </div></div>
          <div><div class="field-row"><label>Tanggal</label><input type="date" id="th-date"/></div></div>
          <div><div class="field-row"><label>Filter Teks</label><input type="text" id="th-search" placeholder="nomor rekening, nominal..."/></div></div>
          <div style="display:flex;align-items:flex-end;padding-bottom:10px"><button class="btn btn-secondary" onclick="loadTrxHistory()"><i class="fas fa-search"></i> Cari</button></div>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header">
        <div class="panel-header-left">
          <h3><i class="fas fa-list mr-2"></i>Hasil</h3>
          <span class="badge" id="th-count">0</span>
        </div>
      </div>
      <div id="th-log-list" style="padding:12px">
        <div class="empty-state"><i class="fas fa-search"></i><div>Pilih filter dan klik Muat</div></div>
      </div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════
       SECTION: CRYPTO TEST
  ═══════════════════════════════════════════════════ -->
  <div id="section-crypto-ops" class="section content">
    <div class="section-title"><i class="fas fa-lock"></i> Crypto Operations Test</div>
    <div class="info-box info-teal">
      <i class="fas fa-shield-alt"></i>
      Operasi kriptografi berjalan di Cloudflare Edge menggunakan Web Crypto API.
      Tidak ada proxy ke sandbox — semua operasi 100% edge-native.
    </div>

    <div class="grid-2">
      <div class="panel">
        <div class="panel-header"><div class="panel-header-left"><h3><i class="fas fa-clock mr-2"></i>Timestamp Jakarta</h3></div></div>
        <div class="panel-body">
          <button class="btn btn-primary" onclick="cryptoTest('timestamp')"><i class="fas fa-sync-alt"></i> Get Timestamp</button>
          <div id="result-timestamp" style="margin-top:10px;display:none"></div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-header"><div class="panel-header-left"><h3><i class="fas fa-key mr-2"></i>Generate AES Keys</h3></div></div>
        <div class="panel-body">
          <div class="field-row">
            <label>Client ID</label>
            <input type="text" id="cto-clientid" value="AQ3A.240912.001.01102025120205"/>
          </div>
          <div class="field-row">
            <label>Timestamp</label>
            <input type="text" id="cto-ts" placeholder="2026-04-20 11:44:20"/>
          </div>
          <button class="btn btn-primary" onclick="cryptoTest('keygen')"><i class="fas fa-cogs"></i> Generate Keys</button>
          <div id="result-keygen" style="margin-top:10px;display:none"></div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-header"><div class="panel-header-left"><h3><i class="fas fa-fingerprint mr-2"></i>Encode X-CLIENT-ID</h3></div></div>
        <div class="panel-body">
          <div class="field-row">
            <label>Client ID Raw</label>
            <input type="text" id="cto-did-cid" value="AQ3A.240912.001.01102025120205"/>
          </div>
          <div class="field-row">
            <label>Timestamp</label>
            <input type="text" id="cto-did-ts" placeholder="2026-04-20 11:44:20"/>
          </div>
          <button class="btn btn-primary" onclick="cryptoTest('did-encode')"><i class="fas fa-code"></i> Encode DID</button>
          <div id="result-did-encode" style="margin-top:10px;display:none"></div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-header"><div class="panel-header-left"><h3><i class="fas fa-signature mr-2"></i>Generate Signature</h3></div></div>
        <div class="panel-body">
          <div class="field-row">
            <label>AES CS (dari keygen)</label>
            <input type="text" id="cto-sig-cs" placeholder="EueZ6DfS18s="/>
          </div>
          <div class="field-row">
            <label>Client ID Encoded</label>
            <input type="text" id="cto-sig-cid" placeholder="U01ZU2V6G3C7CWtV..."/>
          </div>
          <button class="btn btn-primary" onclick="cryptoTest('signature')"><i class="fas fa-pencil-alt"></i> Generate Sig</button>
          <div id="result-signature" style="margin-top:10px;display:none"></div>
        </div>
      </div>
    </div>
  </div>

</main>

<script>
/* ─────────────────────────────────────────────────────
   STATE & HELPERS
───────────────────────────────────────────────────── */
let hourlyChart = null, endpointChart = null, dailyChart = null;

function todayStr() {
  const d = new Date();
  return d.toISOString().slice(0,10);
}

function fmtTime(s) {
  // Extract timestamp from log entry text
  const m = s.match(/\\[(\\d{4}-\\d{2}-\\d{2}\\s+\\d{2}:\\d{2}:\\d{2})\\]/);
  return m ? m[1] : '—';
}

function extractEndpoint(text) {
  const m = text.match(/POST\\s+(https?:\\/\\/[^\\n]+)/);
  if (m) {
    const url = m[1].trim();
    const parts = url.split('/');
    return parts.slice(-3).join('/');
  }
  return '—';
}

function extractDataBody(text) {
  const m = text.match(/DATA:\\s*([\\s\\S]*?)(?=\\[\\d{4}|$)/);
  if (m && m[1].trim()) return m[1].trim();
  return '';
}

function escH(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function showSection(name) {
  document.querySelectorAll('.section').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('#sidebar nav a').forEach(el => el.classList.remove('active'));
  document.getElementById('section-' + name)?.classList.add('active');
  document.getElementById('nav-' + name)?.classList.add('active');
  const titles = {
    'dashboard': '<i class="fas fa-tachometer-alt mr-2"></i>Overview',
    'activity': '<i class="fas fa-chart-line mr-2"></i>Aktivitas Harian',
    'logs-access': '<i class="fas fa-sign-in-alt mr-2"></i>Log Akses Nasabah',
    'logs-transfer': '<i class="fas fa-exchange-alt mr-2"></i>Log Transfer',
    'logs-tabungan': '<i class="fas fa-piggy-bank mr-2"></i>Log Tabungan',
    'logs-token': '<i class="fas fa-key mr-2"></i>Log Token',
    'stats': '<i class="fas fa-chart-bar mr-2"></i>Statistik API',
    'errors': '<i class="fas fa-exclamation-triangle mr-2"></i>Error Log',
    'crypto-ops': '<i class="fas fa-lock mr-2"></i>Crypto Test',
    'trx': '<i class="fas fa-terminal mr-2"></i>Jalankan Transaksi',
    'trx-history': '<i class="fas fa-history mr-2"></i>Riwayat Transaksi',
  };
  document.getElementById('topbar-title').innerHTML = titles[name] || name;
  closeSidebar();
  return false;
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebar-overlay').classList.toggle('show');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('show');
}

function updateClock() {
  const now = new Date();
  const wib = new Date(now.getTime() + 7*3600000);
  const ts = wib.toISOString().replace('T',' ').slice(0,19);
  document.getElementById('sidebar-time').textContent = ts + ' WIB';
  document.getElementById('topbar-date').textContent = ts + ' WIB';
}

/* ─────────────────────────────────────────────────────
   API CALLS
───────────────────────────────────────────────────── */
async function callAdmin(payload) {
  const r = await fetch('/api/admin', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(payload)
  });
  return r.json();
}

async function callCrypto(payload) {
  const r = await fetch('/api/crypto', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(payload)
  });
  return r.json();
}

/* ─────────────────────────────────────────────────────
   PARSE LOG ENTRIES
   Format: [YYYY-MM-DD HH:MM:SS] local.INFO: \\nREQUEST:\\n...
───────────────────────────────────────────────────── */
function parseLogEntries(text) {
  // Split on timestamp markers
  const chunks = text.split(/(?=\\[\\d{4}-\\d{2}-\\d{2}\\s+\\d{2}:\\d{2}:\\d{2}\\])/);
  return chunks.filter(c => c.trim().length > 5).map(chunk => {
    const ts = fmtTime(chunk);
    const endpoint = extractEndpoint(chunk);
    const data = extractDataBody(chunk);
    const isResponse = chunk.includes('RESPONSE');
    const isError = chunk.toLowerCase().includes('local.error') || chunk.toLowerCase().includes('exception');
    return { ts, endpoint, data, raw: chunk.trim(), isResponse, isError };
  });
}

function renderLogEntries(entries, containerId, searchText = '') {
  const el = document.getElementById(containerId);
  if (!entries || entries.length === 0) {
    el.innerHTML = '<div class="empty-state"><i class="fas fa-inbox"></i><div>Tidak ada log ditemukan</div></div>';
    return 0;
  }
  const filtered = searchText
    ? entries.filter(e => e.raw.toLowerCase().includes(searchText.toLowerCase()))
    : entries;
  
  el.innerHTML = filtered.slice(0, 200).map((e, i) => {
    const method = e.raw.includes('POST ') ? '<span class="method-tag method-post">POST</span>' :
                   e.raw.includes('GET ') ? '<span class="method-tag method-get">GET</span>' : '';
    const typeTag = e.isResponse
      ? '<span class="badge-pill badge-info">RESPONSE</span>'
      : e.isError
        ? '<span class="badge-pill badge-err">ERROR</span>'
        : '<span class="badge-pill badge-ok">REQUEST</span>';
    const endpointShort = e.endpoint.length > 50 ? e.endpoint.slice(-50) : e.endpoint;
    return \`<div class="log-entry">
      <div class="log-entry-header" onclick="toggleLog(this)">
        <div style="display:flex;align-items:center;gap:8px;min-width:0;flex:1">
          \${method} \${typeTag}
          <span style="font-family:monospace;font-size:10px;color:#94a3b8;white-space:nowrap">\${e.ts}</span>
          <span style="font-size:11px;color:#7dd3fc;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">\${escH(endpointShort)}</span>
        </div>
        <i class="fas fa-chevron-down" style="color:#334155;font-size:10px;flex-shrink:0;margin-left:8px"></i>
      </div>
      <div class="log-entry-body"><pre>\${escH(e.raw)}</pre></div>
    </div>\`;
  }).join('');
  return filtered.length;
}

function toggleLog(header) {
  const body = header.nextElementSibling;
  const icon = header.querySelector('.fa-chevron-down,.fa-chevron-up');
  body.classList.toggle('show');
  if (icon) {
    icon.classList.toggle('fa-chevron-down');
    icon.classList.toggle('fa-chevron-up');
  }
}

/* ─────────────────────────────────────────────────────
   DASHBOARD LOAD
───────────────────────────────────────────────────── */
async function loadDashboard() {
  const today = todayStr();

  // Load today's access log
  try {
    const accRes = await callAdmin({ op: 'read-log', path: \`access-\${today}.txt\`, dir: 'root' });
    if (accRes.ok && accRes.content) {
      const entries = parseLogEntries(accRes.content).filter(e => !e.isResponse);
      document.getElementById('stat-total-access').textContent = entries.length;
      document.getElementById('stat-access-sub').textContent = 'Login/Logout hari ini';
      const recent = entries.slice(-5).reverse();
      document.getElementById('badge-recent-access').textContent = entries.length;
      document.getElementById('recent-access-body').innerHTML = recent.map(e =>
        \`<tr><td class="ts">\${e.ts.slice(11)}</td><td class="url">\${escH(e.endpoint)}</td>
         <td><span class="badge-pill badge-ok">OK</span></td></tr>\`
      ).join('') || '<tr><td colspan="3" style="text-align:center;color:#475569;padding:10px">—</td></tr>';
    } else {
      document.getElementById('stat-total-access').textContent = '0';
      document.getElementById('stat-access-sub').textContent = 'Belum ada log';
    }
  } catch(e) {
    document.getElementById('stat-total-access').textContent = '?';
  }

  // Load today's transfer log
  try {
    const trRes = await callAdmin({ op: 'read-log', path: \`transfer-AB-\${today}.txt\`, dir: 'root' });
    if (trRes.ok && trRes.content) {
      const entries = parseLogEntries(trRes.content).filter(e => !e.isResponse);
      document.getElementById('stat-total-transfer').textContent = entries.length;
      document.getElementById('stat-transfer-sub').textContent = 'Transfer LPD (AB) hari ini';
      const recent = entries.slice(-5).reverse();
      document.getElementById('badge-recent-transfer').textContent = entries.length;
      document.getElementById('recent-transfer-body').innerHTML = recent.map(e => {
        const body = e.data;
        const amtMatch = body.match(/"amount":"([^"]+)"/);
        return \`<tr><td class="ts">\${e.ts.slice(11)}</td><td class="url">\${escH(e.endpoint)}</td>
               <td class="mono" style="font-size:10px">\${amtMatch ? '🔒 enc' : '—'}</td></tr>\`;
      }).join('') || '<tr><td colspan="3" style="text-align:center;color:#475569;padding:10px">—</td></tr>';
    } else {
      document.getElementById('stat-total-transfer').textContent = '0';
      document.getElementById('stat-transfer-sub').textContent = 'Belum ada log';
      document.getElementById('recent-transfer-body').innerHTML = '<tr><td colspan="3" style="text-align:center;color:#475569;padding:10px">—</td></tr>';
    }
  } catch(e) {
    document.getElementById('stat-total-transfer').textContent = '?';
  }

  // Load today's token log
  try {
    const tokRes = await callAdmin({ op: 'read-log', path: \`token-\${today}.txt\`, dir: 'root' });
    if (tokRes.ok && tokRes.content) {
      const entries = parseLogEntries(tokRes.content);
      document.getElementById('stat-total-token').textContent = entries.length;
      document.getElementById('stat-token-sub').textContent = 'Token request hari ini';
    } else {
      document.getElementById('stat-total-token').textContent = '0';
      document.getElementById('stat-token-sub').textContent = 'Belum ada log';
    }
  } catch(e) {
    document.getElementById('stat-total-token').textContent = '?';
  }

  // Load log files overview
  try {
    const filesRes = await callAdmin({ op: 'list-logs' });
    if (filesRes.ok) {
      document.getElementById('stat-total-errors').textContent = filesRes.error_count || '—';
      document.getElementById('stat-error-sub').textContent = '7 hari terakhir';
      renderLogFilesOverview(filesRes.files);
    }
  } catch(e) {}
}

function renderLogFilesOverview(files) {
  if (!files || files.length === 0) return;
  const grouped = {};
  files.forEach(f => {
    const g = f.dir || 'root';
    if (!grouped[g]) grouped[g] = [];
    grouped[g].push(f);
  });
  
  const html = Object.entries(grouped).map(([dir, flist]) => \`
    <div style="margin-bottom:12px">
      <div style="font-size:10px;font-weight:700;color:#0d6b65;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px">
        <i class="fas fa-folder-open mr-1"></i> \${dir === 'root' ? 'storage/logs/' : 'storage/logs/' + dir + '/'}
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:4px">
        \${flist.slice(0,20).map(f => \`<span class="tag" title="\${f.name}">\${f.name}</span>\`).join('')}
        \${flist.length > 20 ? \`<span class="tag" style="color:#64748b">+\${flist.length-20} lainnya</span>\` : ''}
      </div>
    </div>
  \`).join('');
  document.getElementById('log-files-overview').innerHTML = html;
}

/* ─────────────────────────────────────────────────────
   ACTIVITY SECTION
───────────────────────────────────────────────────── */
async function loadActivity() {
  const date = document.getElementById('act-date').value || todayStr();
  const type = document.getElementById('act-type').value;
  const filter = document.getElementById('act-filter').value.toLowerCase();

  // Build filename
  let filename = '';
  let dir = 'root';
  if (type === 'access') { filename = \`access-\${date}.txt\`; }
  else if (type === 'transfer-AR') { filename = \`transfer-AR-\${date}.txt\`; }
  else if (type === 'transfer-AB') { filename = \`transfer-AB-\${date}.txt\`; }
  else if (type === 'tabungan') { filename = \`tabungan-\${date}.txt\`; }
  else if (type === 'token') { filename = \`token-\${date}.txt\`; }

  document.getElementById('activity-log-list').innerHTML = '<div style="text-align:center;padding:20px;color:#475569"><span class="spinner"></span> Memuat...</div>';

  const res = await callAdmin({ op: 'read-log', path: filename, dir });
  if (!res.ok) {
    document.getElementById('activity-log-list').innerHTML = \`<div class="info-box info-yellow"><i class="fas fa-exclamation-triangle"></i> \${res.error || 'File tidak ditemukan: ' + filename}</div>\`;
    document.getElementById('badge-act-total').textContent = '0';
    document.getElementById('badge-act-entries').textContent = '0';
    return;
  }

  const entries = parseLogEntries(res.content);
  const filtered = filter ? entries.filter(e => e.raw.toLowerCase().includes(filter)) : entries;
  document.getElementById('badge-act-total').textContent = filtered.length;
  document.getElementById('badge-act-entries').textContent = filtered.length;

  // Hourly chart
  const hourCounts = Array(24).fill(0);
  filtered.forEach(e => {
    const h = parseInt(e.ts.slice(11,13));
    if (!isNaN(h)) hourCounts[h]++;
  });
  renderHourlyChart(hourCounts);

  // Endpoint chart
  const epCount = {};
  filtered.forEach(e => {
    const ep = e.endpoint.split('/').slice(-1)[0] || 'unknown';
    epCount[ep] = (epCount[ep] || 0) + 1;
  });
  renderEndpointChart(epCount);

  // Log list
  const count = renderLogEntries(filtered, 'activity-log-list', '');
  if (filtered.length === 0) {
    document.getElementById('activity-log-list').innerHTML = \`<div class="empty-state"><i class="fas fa-inbox"></i><div>Tidak ada log untuk \${filename}</div></div>\`;
  }
}

function renderHourlyChart(data) {
  const ctx = document.getElementById('chart-hourly').getContext('2d');
  if (hourlyChart) hourlyChart.destroy();
  hourlyChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Array.from({length:24}, (_,i) => i+'h'),
      datasets: [{
        data,
        backgroundColor: 'rgba(20,184,166,.6)',
        borderColor: '#14b8a6',
        borderWidth: 1,
        borderRadius: 3,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: '#475569', font: { size: 9 } }, grid: { color: '#1e293b' } },
        y: { ticks: { color: '#475569', font: { size: 9 } }, grid: { color: '#1e293b' } }
      }
    }
  });
}

function renderEndpointChart(data) {
  const ctx = document.getElementById('chart-endpoint').getContext('2d');
  if (endpointChart) endpointChart.destroy();
  const sorted = Object.entries(data).sort((a,b)=>b[1]-a[1]).slice(0,8);
  endpointChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: sorted.map(e=>e[0]),
      datasets: [{ data: sorted.map(e=>e[1]),
        backgroundColor: ['#14b8a6','#a78bfa','#34d399','#fbbf24','#60a5fa','#f87171','#fb923c','#818cf8'],
        borderWidth: 1, borderColor: '#0f172a' }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'right', labels: { color: '#94a3b8', font: { size: 9 }, boxWidth: 10, padding: 8 } } }
    }
  });
}

/* ─────────────────────────────────────────────────────
   ACCESS LOGS
───────────────────────────────────────────────────── */
async function loadAccessLogs() {
  const date = document.getElementById('acc-date').value || todayStr();
  const source = document.getElementById('acc-source').value;
  const search = document.getElementById('acc-search').value;
  
  let filename = \`access-\${date}.txt\`;
  let dir = source;
  if (source === 'his') { dir = 'his'; }

  document.getElementById('access-log-list').innerHTML = '<div style="text-align:center;padding:20px;color:#475569"><span class="spinner"></span></div>';
  
  const res = await callAdmin({ op: 'read-log', path: filename, dir });
  if (!res.ok) {
    document.getElementById('access-log-list').innerHTML = \`<div class="info-box info-yellow"><i class="fas fa-info-circle"></i> \${res.error || 'File tidak ditemukan'}</div>\`;
    document.getElementById('badge-acc-count').textContent = '0';
    return;
  }
  const entries = parseLogEntries(res.content);
  const count = renderLogEntries(entries, 'access-log-list', search);
  document.getElementById('badge-acc-count').textContent = count;
}

/* ─────────────────────────────────────────────────────
   TRANSFER LOGS
───────────────────────────────────────────────────── */
async function loadTransferLogs() {
  const date = document.getElementById('tr-date').value || todayStr();
  const type = document.getElementById('tr-type').value;
  const source = document.getElementById('tr-source').value;
  const search = document.getElementById('tr-search').value;
  
  let filename = '';
  if (type === 'AR') filename = \`transfer-AR-\${date}.txt\`;
  else if (type === 'AB') filename = \`transfer-AB-\${date}.txt\`;
  else filename = \`transfer-in-\${date}.txt\`;
  let dir = source;

  document.getElementById('transfer-log-list').innerHTML = '<div style="text-align:center;padding:20px;color:#475569"><span class="spinner"></span></div>';
  
  const res = await callAdmin({ op: 'read-log', path: filename, dir });
  if (!res.ok) {
    document.getElementById('transfer-log-list').innerHTML = \`<div class="info-box info-yellow"><i class="fas fa-info-circle"></i> \${res.error || 'File tidak ditemukan'}</div>\`;
    document.getElementById('badge-tr-count').textContent = '0';
    return;
  }
  const entries = parseLogEntries(res.content);
  const count = renderLogEntries(entries, 'transfer-log-list', search);
  document.getElementById('badge-tr-count').textContent = count;
}

/* ─────────────────────────────────────────────────────
   TABUNGAN LOGS
───────────────────────────────────────────────────── */
async function loadTabunganLogs() {
  const date = document.getElementById('tab-date').value || todayStr();
  const search = document.getElementById('tab-search').value;
  const filename = \`tabungan-\${date}.txt\`;

  document.getElementById('tabungan-log-list').innerHTML = '<div style="text-align:center;padding:20px;color:#475569"><span class="spinner"></span></div>';
  
  const res = await callAdmin({ op: 'read-log', path: filename, dir: 'root' });
  if (!res.ok) {
    document.getElementById('tabungan-log-list').innerHTML = \`<div class="info-box info-yellow"><i class="fas fa-info-circle"></i> \${res.error || 'File tidak ditemukan'}</div>\`;
    document.getElementById('badge-tab-count').textContent = '0';
    return;
  }
  const entries = parseLogEntries(res.content);
  const count = renderLogEntries(entries, 'tabungan-log-list', search);
  document.getElementById('badge-tab-count').textContent = count;
}

/* ─────────────────────────────────────────────────────
   TOKEN LOGS
───────────────────────────────────────────────────── */
async function loadTokenLogs() {
  const date = document.getElementById('tok-date').value || todayStr();
  const type = document.getElementById('tok-type').value;
  const search = document.getElementById('tok-search').value;
  
  let filename = '', dir = 'root';
  if (type === 'root') { filename = \`token-\${date}.txt\`; dir = 'root'; }
  else { filename = \`request-\${date}.log\`; dir = 'token'; }

  document.getElementById('token-log-list').innerHTML = '<div style="text-align:center;padding:20px;color:#475569"><span class="spinner"></span></div>';
  
  const res = await callAdmin({ op: 'read-log', path: filename, dir });
  if (!res.ok) {
    document.getElementById('token-log-list').innerHTML = \`<div class="info-box info-yellow"><i class="fas fa-info-circle"></i> \${res.error || 'File tidak ditemukan'}</div>\`;
    document.getElementById('badge-tok-count').textContent = '0';
    return;
  }
  const entries = parseLogEntries(res.content);
  const count = renderLogEntries(entries, 'token-log-list', search);
  document.getElementById('badge-tok-count').textContent = count;
}

/* ─────────────────────────────────────────────────────
   STATISTICS
───────────────────────────────────────────────────── */
async function loadStats() {
  document.getElementById('stats-files-body').innerHTML = '<tr><td colspan="4" style="text-align:center;padding:16px"><span class="spinner"></span></td></tr>';
  const res = await callAdmin({ op: 'list-logs' });
  if (!res.ok) return;
  
  // Files table
  const filesHtml = (res.files || []).map(f => \`
    <tr>
      <td class="mono">\${f.name}</td>
      <td><span class="tag">\${f.dir}</span></td>
      <td class="mono">\${f.size_kb ? f.size_kb + ' KB' : '—'}</td>
      <td><span class="badge-pill badge-info">\${f.entries || '—'}</span></td>
    </tr>
  \`).join('');
  document.getElementById('stats-files-body').innerHTML = filesHtml || '<tr><td colspan="4" style="text-align:center;color:#475569">Tidak ada file</td></tr>';

  // Endpoint stats
  if (res.endpoints) {
    const sorted = Object.entries(res.endpoints).sort((a,b)=>b[1]-a[1]).slice(0,15);
    const max = sorted[0]?.[1] || 1;
    document.getElementById('stats-endpoints').innerHTML = sorted.map(([ep, cnt]) => \`
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;font-size:11px">
        <div style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:monospace;color:#a5b4fc" title="\${ep}">\${ep}</div>
        <div style="background:#14b8a6;height:6px;border-radius:3px;width:\${Math.round(cnt/max*120)}px;flex-shrink:0"></div>
        <div style="color:#5eead4;font-weight:700;min-width:30px;text-align:right">\${cnt}</div>
      </div>
    \`).join('') || '<div style="color:#475569;text-align:center;padding:20px">Belum ada data</div>';
  }

  // Daily chart
  if (res.daily) renderDailyChart(res.daily);
}

function renderDailyChart(data) {
  const ctx = document.getElementById('chart-daily').getContext('2d');
  if (dailyChart) dailyChart.destroy();
  const sorted = Object.entries(data).sort((a,b)=>a[0].localeCompare(b[0])).slice(-30);
  dailyChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: sorted.map(e=>e[0].slice(5)),
      datasets: [{
        data: sorted.map(e=>e[1]),
        borderColor: '#14b8a6', backgroundColor: 'rgba(20,184,166,.1)',
        borderWidth: 2, pointRadius: 2, fill: true, tension: 0.4,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: '#475569', font: { size: 9 }, maxRotation: 45 }, grid: { color: '#1e293b' } },
        y: { ticks: { color: '#475569', font: { size: 9 } }, grid: { color: '#1e293b' } }
      }
    }
  });
}

/* ─────────────────────────────────────────────────────
   ERROR LOGS
───────────────────────────────────────────────────── */
async function loadErrors() {
  const level = document.getElementById('err-level').value;
  const search = document.getElementById('err-search').value;

  document.getElementById('error-log-list').innerHTML = '<div style="text-align:center;padding:20px"><span class="spinner"></span></div>';
  
  const res = await callAdmin({ op: 'read-log', path: 'laravel.log', dir: 'root' });
  if (!res.ok) {
    document.getElementById('error-log-list').innerHTML = \`<div class="info-box info-red"><i class="fas fa-times-circle"></i> \${res.error || 'Gagal membaca laravel.log'}</div>\`;
    return;
  }

  // Parse laravel log blocks (each starts with [date])
  const raw = res.content || '';
  const blocks = raw.split(/(?=\\[\\d{4}-\\d{2}-\\d{2}\\s+\\d{2}:\\d{2}:\\d{2}\\])/);
  
  let filtered = blocks.filter(b => {
    if (!b.trim()) return false;
    if (level !== 'all' && !b.toLowerCase().includes('local.' + level.toLowerCase())) return false;
    if (search && !b.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  document.getElementById('badge-err-count').textContent = filtered.length;
  
  if (filtered.length === 0) {
    document.getElementById('error-log-list').innerHTML = '<div class="empty-state"><i class="fas fa-check-circle" style="color:#34d399"></i><div>Tidak ada error ditemukan</div></div>';
    return;
  }

  document.getElementById('error-log-list').innerHTML = filtered.slice(-100).reverse().map((block, i) => {
    const ts = fmtTime(block);
    const isErr = block.toLowerCase().includes('local.error');
    const isWarn = block.toLowerCase().includes('local.warning');
    const cls = isErr ? 'badge-err' : isWarn ? 'badge-warn' : 'badge-info';
    const levelText = isErr ? 'ERROR' : isWarn ? 'WARNING' : 'INFO';
    const preview = block.trim().slice(0,120).replace(/\\n/g,' ');
    return \`<div class="log-entry">
      <div class="log-entry-header" onclick="toggleLog(this)">
        <div style="display:flex;align-items:center;gap:8px;flex:1;min-width:0">
          <span class="badge-pill \${cls}">\${levelText}</span>
          <span style="font-family:monospace;font-size:10px;color:#94a3b8;white-space:nowrap">\${ts}</span>
          <span style="font-size:11px;color:#cbd5e1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">\${escH(preview)}</span>
        </div>
        <i class="fas fa-chevron-down" style="color:#334155;font-size:10px;flex-shrink:0;margin-left:8px"></i>
      </div>
      <div class="log-entry-body"><pre>\${escH(block.trim())}</pre></div>
    </div>\`;
  }).join('');
}

/* ─────────────────────────────────────────────────────
   CRYPTO TEST
───────────────────────────────────────────────────── */
async function cryptoTest(op) {
  const resultId = 'result-' + op;
  const el = document.getElementById(resultId);
  el.style.display = 'block';
  el.innerHTML = '<span class="spinner"></span> Memproses...';
  
  let payload = { op };
  if (op === 'keygen') {
    payload.clientID = document.getElementById('cto-clientid').value;
    payload.timestamp = document.getElementById('cto-ts').value;
    if (!payload.timestamp) {
      const tsRes = await callCrypto({ op: 'timestamp' });
      payload.timestamp = tsRes.result?.jakarta || '';
    }
  } else if (op === 'did-encode') {
    payload.clientID = document.getElementById('cto-did-cid').value;
    payload.timestamp = document.getElementById('cto-did-ts').value;
    if (!payload.timestamp) {
      const tsRes = await callCrypto({ op: 'timestamp' });
      payload.timestamp = tsRes.result?.jakarta || '';
    }
  } else if (op === 'signature') {
    payload.aesCs = document.getElementById('cto-sig-cs').value;
    payload.clientIdEnc = document.getElementById('cto-sig-cid').value;
  }
  
  try {
    const res = await callCrypto(payload);
    el.innerHTML = \`<div style="background:#020617;border:1px solid #1e293b;border-radius:6px;padding:10px;font-size:11px;font-family:monospace;color:#a5f3fc;overflow-x:auto;white-space:pre-wrap;word-break:break-all;max-height:200px;overflow-y:auto">\${JSON.stringify(res, null, 2)}</div>\`;
  } catch(e) {
    el.innerHTML = \`<div class="info-box info-red"><i class="fas fa-times-circle"></i> Error: \${e.message}</div>\`;
  }
}

/* ─────────────────────────────────────────────────────
   TRANSAKSI — STATE
───────────────────────────────────────────────────── */
const TRX = {
  baseUrl: '',
  clientIdRaw: '',
  clientIdEnc: '',
  aesKey: '',
  aesIv: '',
  aesCs: '',
  sessionTs: '',
  loggedIn: false,
  postingRef: '',        // stored ref after inquiry for posting
  bankHashCode: '',      // hash_code from bank inquiry
  // iOS token management (expire 3 menit di gmob_token DB)
  iosToken: '',          // token dari /smart/access-token (disimpan di gmob_token)
  tokenFetchedAt: 0,     // timestamp saat token diambil (ms)
  TOKEN_TTL: 150_000,    // 150 detik (safety margin dari 180s expiry)
};

// Update status token di UI
function trxUpdateTokenStatus() {
  const el = document.getElementById('trx-token-status');
  if (!el) return;
  if (!TRX.iosToken) {
    el.innerHTML = '<span class="badge-pill badge-err">Belum ada token</span>';
    return;
  }
  const age  = Date.now() - TRX.tokenFetchedAt;
  const remaining = Math.max(0, Math.ceil((TRX.TOKEN_TTL - age) / 1000));
  if (remaining <= 0) {
    el.innerHTML = '<span class="badge-pill badge-err">Token kadaluarsa — akan diperbarui otomatis</span>';
  } else {
    el.innerHTML = \`<span class="badge-pill badge-ok">Token aktif (~\${remaining}s)</span> <span style="font-size:9px;font-family:monospace;color:#475569">\${TRX.iosToken.slice(0,20)}...</span>\`;
  }
}

// Ambil fresh iOS token dari server LPD (otomatis sebelum setiap transaksi)
async function trxGetFreshToken(force = false) {
  const sess = trxGetSession();
  if (!sess.clientIdEnc) return null;
  const age = Date.now() - TRX.tokenFetchedAt;
  // Pakai token yang ada jika masih valid
  if (!force && TRX.iosToken && age < TRX.TOKEN_TTL) {
    trxUpdateTokenStatus();
    return TRX.iosToken;
  }
  // Ambil token baru
  const el = document.getElementById('trx-token-status');
  if (el) el.innerHTML = '<span class="badge-pill badge-warn"><span class="spinner" style="width:10px;height:10px;border-width:1px"></span> Mengambil token baru...</span>';
  
  const res = await fetch('/api/smart/get-ios-token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ baseUrl: sess.baseUrl, clientIdEnc: sess.clientIdEnc, aesCs: sess.aesCs })
  }).then(r => r.json()).catch(e => ({ ok: false, error: e.message }));
  
  if (res.ok && res.token) {
    TRX.iosToken = res.token;
    TRX.tokenFetchedAt = Date.now();
    trxUpdateTokenStatus();
    return res.token;
  }
  if (el) el.innerHTML = \`<span class="badge-pill badge-err">Gagal ambil token: \${res.error || '?'}</span>\`;
  return null;
}

function trxLog(items) {
  if (!Array.isArray(items)) items = [items];
  const now = new Date();
  const ts = now.toLocaleTimeString('id-ID');
  items.forEach(entry => {
    if (typeof entry === 'string') {
      TRX_HISTORY.push({ ts, text: entry });
    } else {
      TRX_HISTORY.push({ ts, ...entry });
    }
  });
}
const TRX_HISTORY = [];

function trxShowOp(op) {
  document.querySelectorAll('.trx-op-panel').forEach(el => el.style.display = 'none');
  const el = document.getElementById('trx-op-' + op);
  if (el) el.style.display = 'block';
}

function trxResultEl(id, html, isErr) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.display = 'block';
  const cls = isErr ? 'info-red' : 'info-teal';
  el.innerHTML = \`<div class="info-box \${cls}" style="font-family:monospace;font-size:11px;white-space:pre-wrap;word-break:break-all">\${html}</div>\`;
}

function trxJsonBox(id, obj, ok) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.display = 'block';
  const color = ok ? '#a7f3d0' : '#fca5a5';
  el.innerHTML = \`<div style="background:#020617;border:1px solid #1e293b;border-radius:6px;padding:10px;font-size:11px;font-family:monospace;color:\${color};white-space:pre-wrap;word-break:break-all;max-height:300px;overflow-y:auto">\${escH(JSON.stringify(obj, null, 2))}</div>\`;
}

function trxSpin(id) {
  const el = document.getElementById(id);
  if (el) { el.style.display = 'block'; el.innerHTML = '<div style="text-align:center;padding:10px"><span class="spinner"></span></div>'; }
}

async function trxAutoSetup() {
  const clientId = document.getElementById('trx-clientid').value.trim();
  if (!clientId) { alert('Client ID harus diisi'); return; }
  
  trxSpin('trx-setup-result');

  // 1. Get timestamp
  const tsRes = await callCrypto({ op: 'timestamp' });
  if (!tsRes.ok) { trxResultEl('trx-setup-result', 'Gagal get timestamp: ' + (tsRes.error||'?'), true); return; }
  const ts = tsRes.result?.jakarta || '';
  document.getElementById('trx-session-ts').value = ts;

  // 2. Derive AES keys
  const kgRes = await callCrypto({ op: 'keygen', clientID: clientId, timestamp: ts });
  if (!kgRes.ok) { trxResultEl('trx-setup-result', 'Gagal keygen: ' + (kgRes.error||'?'), true); return; }
  const keys = kgRes.result || {};
  document.getElementById('trx-aeskey').value = keys.aesKey || '';
  document.getElementById('trx-aesiv').value  = keys.aesIv || '';
  document.getElementById('trx-aescs').value  = keys.aesCs || '';

  // 3. Encode X-CLIENT-ID
  const didRes = await callCrypto({ op: 'did-encode', clientID: clientId, timestamp: ts });
  if (!didRes.ok) { trxResultEl('trx-setup-result', 'Gagal DID encode: ' + (didRes.error||'?'), true); return; }
  const enc = didRes.result?.encoded || '';
  document.getElementById('trx-clientid-enc').value = enc;

  // Store into TRX state
  TRX.baseUrl      = document.getElementById('trx-baseurl').value.trim();
  TRX.clientIdRaw  = clientId;
  TRX.clientIdEnc  = enc;
  TRX.aesKey       = keys.aesKey || '';
  TRX.aesIv        = keys.aesIv  || '';
  TRX.aesCs        = keys.aesCs  || '';
  TRX.sessionTs    = ts;

  document.getElementById('trx-session-badge').textContent = 'Aktif ✓';
  document.getElementById('trx-session-badge').style.background = '#022c22';
  document.getElementById('trx-session-badge').style.color = '#34d399';

  // 4. Auto-fetch iOS token dari server LPD
  const tokenStatusEl = document.getElementById('trx-token-status');
  if (tokenStatusEl) tokenStatusEl.innerHTML = '<span class="badge-pill badge-warn"><span class="spinner" style="width:10px;height:10px;border-width:1px"></span> Mengambil iOS token...</span>';
  const tokenRes = await fetch('/api/smart/get-ios-token', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ baseUrl: TRX.baseUrl, clientIdEnc: enc, aesCs: keys.aesCs || '' })
  }).then(r => r.json()).catch(e => ({ ok: false, error: e.message }));

  let tokenInfo = '';
  if (tokenRes.ok && tokenRes.token) {
    TRX.iosToken = tokenRes.token;
    TRX.tokenFetchedAt = Date.now();
    trxUpdateTokenStatus();
    tokenInfo = \`\\n  iOS Token  : \${tokenRes.token.slice(0,20)}... (aktif ~\${tokenRes.expiresIn||180}s)\`;
  } else {
    if (tokenStatusEl) tokenStatusEl.innerHTML = \`<span class="badge-pill badge-err">Token gagal: \${tokenRes.error||'?'}</span>\`;
    tokenInfo = \`\\n  iOS Token  : GAGAL (\${tokenRes.error||'?'}) — coba Refresh Token manual\`;
  }

  trxResultEl('trx-setup-result', \`✓ Sesi siap\\n  Timestamp  : \${ts}\\n  Client ID  : \${clientId}\\n  AES Key    : \${keys.aesKey?.slice(0,20)}...\\n  AES IV     : \${keys.aesIv?.slice(0,20)}...\\n  AES CS     : \${keys.aesCs}\\n  X-CLIENT-ID: \${enc?.slice(0,30)}...\${tokenInfo}\`, false);

  // Start timer to refresh token periodically
  trxStartTokenRefresh();
}

let trxTokenRefreshTimer = null;
function trxStartTokenRefresh() {
  if (trxTokenRefreshTimer) clearInterval(trxTokenRefreshTimer);
  // Update status display every 10 seconds
  trxTokenRefreshTimer = setInterval(() => {
    trxUpdateTokenStatus();
    // Auto-refresh token saat tinggal 20 detik
    const age = Date.now() - TRX.tokenFetchedAt;
    if (TRX.iosToken && age > (TRX.TOKEN_TTL - 20_000)) {
      trxGetFreshToken(true);
    }
  }, 10_000);
}

async function trxLogin() {
  const un = document.getElementById('trx-username').value.trim();
  const pw = document.getElementById('trx-password').value.trim();
  if (!un || !pw) { alert('Username dan password harus diisi'); return; }
  if (!TRX.clientIdEnc && !document.getElementById('trx-clientid-enc').value.trim()) {
    alert('Lakukan Auto Setup sesi terlebih dahulu');
    return;
  }
  // Allow manual override
  TRX.clientIdEnc = document.getElementById('trx-clientid-enc').value.trim() || TRX.clientIdEnc;
  TRX.aesKey = document.getElementById('trx-aeskey').value.trim() || TRX.aesKey;
  TRX.aesIv  = document.getElementById('trx-aesiv').value.trim()  || TRX.aesIv;
  TRX.aesCs  = document.getElementById('trx-aescs').value.trim()  || TRX.aesCs;
  TRX.baseUrl = document.getElementById('trx-baseurl').value.trim();

  trxSpin('trx-login-result');
  // Login butuh iosToken yang valid di server DB
  const freshToken = await trxGetFreshToken();
  const res = await fetch('/api/smart', {
    method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({
      action: 'login',
      baseUrl: TRX.baseUrl,
      clientIdEnc: TRX.clientIdEnc,
      aesKey: TRX.aesKey,
      aesIv: TRX.aesIv,
      aesCs: TRX.aesCs,
      iosToken: freshToken || '',
      user_name: un,
      user_pass: pw,
    })
  }).then(r=>r.json()).catch(e=>({ok:false,error:e.message}));

  const ok = res.ok && (res.httpStatus >= 200 && res.httpStatus < 300);
  TRX.loggedIn = ok;
  if (ok) {
    document.getElementById('trx-login-badge').textContent = \`Login: \${un} ✓\`;
    document.getElementById('trx-login-badge').style.background = '#022c22';
    document.getElementById('trx-login-badge').style.color = '#34d399';
    trxLog({ action: 'login', user: un, ts: new Date().toISOString(), ok: true });
  } else {
    document.getElementById('trx-login-badge').textContent = 'Gagal login';
    document.getElementById('trx-login-badge').style.background = '#2d0000';
    document.getElementById('trx-login-badge').style.color = '#f87171';
  }
  trxJsonBox('trx-login-result', res, ok);
}

function trxGetSession() {
  // Allow manual override from input fields
  return {
    baseUrl:     document.getElementById('trx-baseurl').value.trim()      || TRX.baseUrl,
    clientIdEnc: document.getElementById('trx-clientid-enc').value.trim() || TRX.clientIdEnc,
    aesKey:      document.getElementById('trx-aeskey').value.trim()       || TRX.aesKey,
    aesIv:       document.getElementById('trx-aesiv').value.trim()        || TRX.aesIv,
    aesCs:       document.getElementById('trx-aescs').value.trim()        || TRX.aesCs,
  };
}

async function trxExec(action) {
  const sess = trxGetSession();
  if (!sess.clientIdEnc) { alert('Setup sesi terlebih dahulu (langkah 1)'); return; }

  const resultId = 'trx-result-' + action;
  trxSpin(resultId);

  // Auto-refresh iOS token sebelum setiap request (token expire 3 menit di server)
  const freshToken = await trxGetFreshToken();
  if (!freshToken) {
    trxResultEl(resultId, '❌ Gagal mendapatkan iOS token dari server LPD.
Pastikan:
1. Auto Setup sesi sudah dijalankan
2. Koneksi ke server LPD aktif
3. IP whitelist terdaftar di server', true);
    return;
  }

  let payload = { action, ...sess, iosToken: freshToken };

  // Build payload per action
  if (action === 'cek-saldo') {
    payload.no_rek = document.getElementById('trx-cs-norek').value.trim();
    if (!payload.no_rek) { trxResultEl(resultId, 'Nomor rekening harus diisi', true); return; }

  } else if (action === 'account-list') {
    payload.customer_id = document.getElementById('trx-al-custid').value.trim();

  } else if (action === 'mutasi-history') {
    payload.customer_id = document.getElementById('trx-mu-custid').value.trim();
    payload.no_rek      = document.getElementById('trx-mu-norek').value.trim();
    payload.tgl_awal    = document.getElementById('trx-mu-tglawal').value;
    payload.tgl_akhir   = document.getElementById('trx-mu-tglakhir').value;

  } else if (action === 'transaction-history') {
    payload.no_rek    = document.getElementById('trx-mu-norek').value.trim();
    payload.tgl_awal  = document.getElementById('trx-mu-tglawal').value;
    payload.tgl_akhir = document.getElementById('trx-mu-tglakhir').value;

  } else if (action === 'transfer-lpd-check') {
    payload.no_rek_tujuan = document.getElementById('trx-tlpd-to').value.trim();
    if (!payload.no_rek_tujuan) { trxResultEl(resultId, 'Nomor rekening tujuan harus diisi', true); return; }

  } else if (action === 'transfer-lpd-inquiry') {
    payload.no_rek_from  = document.getElementById('trx-tlpd-from').value.trim();
    payload.no_rek_to    = document.getElementById('trx-tlpd-to').value.trim();
    payload.nama_tujuan  = document.getElementById('trx-tlpd-name').value.trim();
    payload.nominal      = document.getElementById('trx-tlpd-nominal').value.trim().replace(/[^0-9]/g,'');
    payload.keterangan   = document.getElementById('trx-tlpd-ket').value.trim();
    if (!payload.no_rek_from || !payload.no_rek_to || !payload.nominal) {
      trxResultEl(resultId, 'Rekening sumber, tujuan, dan nominal harus diisi', true); return;
    }

  } else if (action === 'transfer-lpd-posting') {
    payload.no_rek_from  = document.getElementById('trx-tlpd-from').value.trim();
    payload.no_rek_to    = document.getElementById('trx-tlpd-to').value.trim();
    payload.nama_tujuan  = document.getElementById('trx-tlpd-name').value.trim();
    payload.nominal      = document.getElementById('trx-tlpd-nominal').value.trim().replace(/[^0-9]/g,'');
    payload.keterangan   = document.getElementById('trx-tlpd-ket').value.trim();
    if (TRX.postingRef) payload.transNo = TRX.postingRef;
    if (!payload.no_rek_from || !payload.no_rek_to || !payload.nominal) {
      trxResultEl(resultId, 'Rekening sumber, tujuan, dan nominal harus diisi', true); return;
    }

  } else if (action === 'transfer-bank-check') {
    payload.no_rek_tujuan = document.getElementById('trx-tbank-to').value.trim();
    payload.kode_bank     = document.getElementById('trx-tbank-kode').value.trim();
    if (!payload.no_rek_tujuan || !payload.kode_bank) { trxResultEl(resultId, 'Nomor rekening dan kode bank harus diisi', true); return; }

  } else if (action === 'transfer-bank-inquiry') {
    payload.no_rek_from = document.getElementById('trx-tbank-from').value.trim();
    payload.no_rek_to   = document.getElementById('trx-tbank-to').value.trim();
    payload.kode_bank   = document.getElementById('trx-tbank-kode').value.trim();
    payload.nominal     = document.getElementById('trx-tbank-nominal').value.trim().replace(/[^0-9]/g,'');
    payload.keterangan  = document.getElementById('trx-tbank-ket').value.trim();
    if (!payload.no_rek_from || !payload.no_rek_to || !payload.kode_bank || !payload.nominal) {
      trxResultEl(resultId, 'Semua field transfer bank harus diisi', true); return;
    }

  } else if (action === 'transfer-bank-posting') {
    payload.no_rek_from = document.getElementById('trx-tbank-from').value.trim();
    payload.no_rek_to   = document.getElementById('trx-tbank-to').value.trim();
    payload.kode_bank   = document.getElementById('trx-tbank-kode').value.trim();
    payload.nominal     = document.getElementById('trx-tbank-nominal').value.trim().replace(/[^0-9]/g,'');
    payload.keterangan  = document.getElementById('trx-tbank-ket').value.trim();
    if (TRX.postingRef)   payload.transNo  = TRX.postingRef;
    if (TRX.bankHashCode) payload.hash_code = TRX.bankHashCode;
    if (!payload.no_rek_from || !payload.no_rek_to || !payload.kode_bank || !payload.nominal) {
      trxResultEl(resultId, 'Semua field transfer bank harus diisi', true); return;
    }
  }

  const res = await fetch('/api/smart', {
    method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify(payload)
  }).then(r=>r.json()).catch(e=>({ok:false,error:e.message}));

  const ok = res.ok !== false;

  // Store ref for posting
  if (action === 'transfer-lpd-inquiry' && res.debug?.ref) TRX.postingRef = res.debug.ref;
  if (action === 'transfer-bank-inquiry') {
    if (res.debug?.ref) TRX.postingRef = res.debug.ref;
    const bc = res.result?.data?.hash_code || res.result?.hash_code || '';
    if (bc) TRX.bankHashCode = bc;
  }
  if (action === 'logout' && ok) {
    TRX.loggedIn = false;
    document.getElementById('trx-login-badge').textContent = 'Belum login';
    document.getElementById('trx-login-badge').style.background = '#134e4a';
    document.getElementById('trx-login-badge').style.color = '#5eead4';
  }

  trxLog({ action, ok, ts: new Date().toISOString() });
  trxJsonBox(resultId, res, ok);
}

async function trxConfirmPosting(action) {
  const label = action === 'transfer-lpd-posting' ? 'Transfer LPD' : 'Transfer Bank';
  const nomEl = action === 'transfer-lpd-posting' 
    ? document.getElementById('trx-tlpd-nominal')
    : document.getElementById('trx-tbank-nominal');
  const nom = nomEl ? nomEl.value.trim().replace(/[^0-9]/g,'') : '?';
  const fmtNom = new Intl.NumberFormat('id-ID').format(parseInt(nom)||0);
  
  const ok = confirm(\`Konfirmasi Posting\\n\\nAksi: \${label}\\nNominal: Rp \${fmtNom}\\n\\nApakah Anda yakin ingin melanjutkan?\`);
  if (ok) await trxExec(action);
}

async function loadTrxHistory() {
  const type   = document.getElementById('th-type').value;
  const date   = document.getElementById('th-date').value || todayStr();
  const search = document.getElementById('th-search').value.trim();
  
  const dir  = (type === 'access' || type === 'tabungan') ? 'root' : 'root';
  const file = \`\${type}-\${date}.txt\`;
  
  document.getElementById('th-log-list').innerHTML = '<div style="text-align:center;padding:20px"><span class="spinner"></span></div>';

  const res = await callAdmin({ op: 'read-log', path: file, dir });
  if (!res.ok) {
    document.getElementById('th-log-list').innerHTML = \`<div class="info-box info-yellow"><i class="fas fa-exclamation-triangle"></i> \${res.error || 'File tidak ditemukan: '+file}</div>\`;
    document.getElementById('th-count').textContent = '0';
    return;
  }

  const entries = parseLogEntries(res.content || '');
  const cnt = renderLogEntries(entries, 'th-log-list', search);
  document.getElementById('th-count').textContent = String(cnt);
}

/* ─────────────────────────────────────────────────────
   REFRESH ALL
───────────────────────────────────────────────────── */
function refreshAll() {
  const active = document.querySelector('.section.active');
  if (active?.id === 'section-dashboard') loadDashboard();
  else if (active?.id === 'section-stats') loadStats();
  else if (active?.id === 'section-errors') loadErrors();
  else if (active?.id === 'section-activity') loadActivity();
  else if (active?.id === 'section-logs-access') loadAccessLogs();
  else if (active?.id === 'section-logs-transfer') loadTransferLogs();
  else if (active?.id === 'section-logs-tabungan') loadTabunganLogs();
  else if (active?.id === 'section-logs-token') loadTokenLogs();
  else if (active?.id === 'section-trx-history') loadTrxHistory();
}

/* ─────────────────────────────────────────────────────
   INIT
───────────────────────────────────────────────────── */
window.addEventListener('DOMContentLoaded', () => {
  // Set default dates
  const today = todayStr();
  ['act-date','acc-date','tr-date','tab-date','tok-date','th-date'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = today;
  });
  // Set trx mutasi default dates
  const tglawal  = document.getElementById('trx-mu-tglawal');
  const tglakhir = document.getElementById('trx-mu-tglakhir');
  if (tglawal)  tglawal.value  = today;
  if (tglakhir) tglakhir.value = today;
  
  updateClock();
  setInterval(updateClock, 10000);
  loadDashboard();
});
<\/script>
</body>
</html>`}const Mt=`-----BEGIN PRIVATE KEY-----
MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQD3KiZu/RXRO+R/
onutm7eR205pKykTggG7rWQyCJj/bMK6IqxESOHjO8Y4quWPnQCnO+TKwENJzrKj
z8S91zQgoHSfYYc2mJ5Rs93bUzvO5csPbzzQ+JwKxu3aFgvjDl4UxP6qmBf+dXC1
UplzVb52XwB7CowbXMLfLSEnljGIp/gkC0d081XafNo8TaeZJvFkQpJPSPNXVLaY
QDt+53+T7k2v0IlHsLuRM56AmYCa1i2w2H+qV66U+F1g4x9jRVu1NTXwVxNWBmNG
HrFK0YzoaMgF6f46PtkC+zGB4SrZ+G2fqV6rnySpJPSDO6DlEZuNzpmZgsNcl+ua
JEsRTSp/AgMBAAECggEBAMPvLRKVHOOGWCh6NRM2OzqsIKesaF6nlBokZSZovGjX
3jJSZD+pizBo5UVs7JiBfNAV4dR8v5rV+bV0cmGQJSmsKWdjmB3GtNLOBJTmkaX9
cpDkvNBoFMNSWaGmEnxHmntagwvXkEXO8a88MJtGoLsTqrzfapwSWAU1sG/CV7gc
6P6pOdldFS7TGeOQJK7pEvBdrPgN0sQ9LBbACxOWGOSfkv1i2bPgwCIuMBe5JV03
/ZfdCY7XwkCfy91EVRNQX/caYJ+EXxNUNHD4xN7us5H4guCcgZYz8G3xqeb9Vqr8
Z9gL9Ii7fMpOaciO0YgEkiplnYNu2KB40S7d5J0XG5ECgYEA/CBkbYLT1VzgJRDz
+QvALFpVF4u4ga5tAtDA8MqVM/YL4ay0xiJO6O9HZdwTLYbqnrHf2IfqrFw6ol25
Ya4cHVZutUtlXIf7Zv4/HzZh0aJfSnMs5eOg1BSuC1bXph5PWrOXmBSTZm/J615J
9TzyLJTlgACgB2lX1xiTRx+UShcCgYEA+vY+LF2eEpy0FdbbmFBrZbpyz9vZHvr+
PTpr346a9FJtSBm6Am5/4DBAvKbTHqHe5pLeNu9o1uqngUQtCS80N0MqLY6LLdm9
TxtT0Rg1R1hd+UnBTqBa7EJhHb+pAS+jrdnxKZhzOn4Rq1WJT1calDb5T9+sPYXh
r2KIUiTrq9kCgYEAwfVlbP3VWvGdGcbF+ZR5nWVMytVY9qKqCB1yIIuoZpXlJBKJ
61bfX8EcKxc3xbFh8v2h1+EPvtMg5GG3yJZ52HPyrRO4gYu28s+q3acnb287YXnj
U2NfCWhzUBPZyFjO8VbxyzQhBRAAxUn/GWNuZq+RMnzIn4sB4V5thqyblrcCgYEA
vmiua4LsODrk99z45+u8UIbSLZskdTkCRPpadlgAgXc4qwe59bZZF4QE2h3I+Ojf
8hlkuFGVPdr0FEPh16IVAAjZq48HUlZuJ+MYCQFRCzyksEuhe0J3OeJzRNryI5A9
o95D98dPRgX46gIQGD6CUAoVxuByEovN2//qZkjU9qECgYBTGQALqhaSSZUAyPaJ
LIU0rIaMxiyLBc2bDtFLUSmSfvOA83BZCRN452obnM3pgQYTD5/AvultHlJwraVL
1O9CH97AwrE9TUsc+hlrIVGGZFUHfZr2Buj5TZUFOR+/gKszBcgpvROwnqklTsId
tZ4umdUY0ubwdxMbJQU3S2pX2A==
-----END PRIVATE KEY-----`,za=`-----BEGIN PRIVATE KEY-----
MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDLhEUdMTZ3/dJz
FEE5zvwulheeHaoLI9WxPB9Xm4tnKMWWn0aS0EtNZWyAU9HQV6VEY0JoE4f8f3g6
hMkdMcmN37eUJ7imef3HIBenVQNUZnyABIOAdLuaetClNlWm5944+H+BZFnpudCO
+Hj1U2W+U7T5C3pl5T8+GhxCsgqzUvXKRewNIMOzDnmrxCwqb/M8xIjDvx4oGN1o
BFnPj8rbd0/arsAPdcUZiYRb6UXRNCtbBGjCNInZ91t+MND8S52irVmd47Ow3FoZ
GjCUAj4rNzEHRh06XjNMMk77G85y1mYM7nn1hUhf3l0DUN8TwGhC9vVg+M+tt/fr
l7y3xtoHAgMBAAECggEACQQ1qart/lfs9HM/xodgjdHRfwxSZcbzJzSCMPfvr6TT
SC6LSmLXCzlEmtTb1U6kwEhjf0fqPOoK0hDi9huoEdSJBhPSbvG1qBZIZf3ytVEL
EALjLpQ9YYUybDdhiRD5u+1qfLmM8Dluv37LoRbOSaXcvTHgfNYwvJgci2nm5nXg
t8UiU8OHXgV8GHdLm9GbBB3bB00nacRznfuxBNem2nCDvDnFqSEV0jWjugj6psdM
83h9Ye4HB77y7OpaofpLsOJQFZYZRNBmw1ypdQrnbLKwdKLk869VRI7ZwHdqkZHw
J+sLpPtwCC2cdajRPVNYsGt0yRchGg0h9+7y4TQhTQKBgQDssg/9897n557giRHj
3MSibvxASeHJ+G8qgszr7W5+Y05Bgd7bZrIPN/KNEJ3ADbnt5mA0UIgGLRIvoJE4
exnodmhueVTZCIQq6JEed/GVbNqAMejy+byeJM6KNkFbhd/ypf+MCzKURc9w2IYA
sYU46rgIpMwSpAgUSKywKQ2oWwKBgQDcHXhE3cy2wlLM8H5YE17MkvwR4qNLYEzd
1vMvlq+hi3srpF9mJQ/OGhDSYTsmj9vHgUyIhUytfNg9Sog6AHkcLt6wV7lonjvr
UeoHbE+/TlUuzIQgz7R/yEndE2XA6affM7BpZOpajjV8CSzsCZG40k24GALAuZvI
6kxy3V6kxQKBgQC3zosmrdQDCNZTDX6MEavNbByNnBIv8rH5NDwIVohAs8NYkY7L
mFNcCBlePHIUa1Rgj09UMNmA2k1OGQXM86Op5xGwAJ7IL5nbbGENZR2A6VhAxwFc
dl1n/bM6l2lntm2zk/7/9M4hYJj3y907+p83FOc3JyqmqyTvA4S/BBJsEwKBgQCi
ds3yZpNWwY9D3K4kbAeoj0SmHtXQKMATbTgJg/sWDVFYIPaY+fn0caDA5ys1hzD8
zB6lFV5HHsKsWnq59OdvOdj754PeCAzJ36gQ2ozx8utEo4dSgHwFZNu/5TVRciSJ
xikLYYToWdZ4On2Bqn54ICFlI7PEdDrbzLOohGP60QKBgQDbG6zu4XXDO3EaZFr9
VTllOVESELjc6V6OWo0mBnKXylQ4j/ps7kY9Imz7jpyi22dtLfqwzirmi/lsIERv
MswoO11LenV8bbIamN/vBfLJKKYGen+lOerjBDSJhIWyPN1VrczVKm5Y0bGP4qgy
Utb/zmklYi3CbDFQwlX02oS4bQ==
-----END PRIVATE KEY-----`,Qe="p91wrswK";function ce(e){if(!e||typeof e!="string")return new Uint8Array(0);const t=e.replace(/-/g,"+").replace(/_/g,"/"),a=t.padEnd(t.length+(4-t.length%4)%4,"=");try{const n=atob(a);return Uint8Array.from(n,s=>s.charCodeAt(0))}catch{return new Uint8Array(0)}}function pe(e){return btoa(String.fromCharCode(...new Uint8Array(e)))}function Be(e){return Array.from(new Uint8Array(e)).map(t=>t.toString(16).padStart(2,"0")).join("")}function J(e){return new TextEncoder().encode(e)}function Ka(e){function t(v,c){const k=(v&65535)+(c&65535);return(v>>16)+(c>>16)+(k>>16)<<16|k&65535}function a(v,c){return v<<c|v>>>32-c}function n(v,c,k,h,T,S){return t(a(t(t(c,v),t(h,S)),T),k)}function s(v,c,k,h,T,S,x){return n(c&k|~c&h,v,c,T,S,x)}function i(v,c,k,h,T,S,x){return n(c&h|k&~h,v,c,T,S,x)}function o(v,c,k,h,T,S,x){return n(c^k^h,v,c,T,S,x)}function r(v,c,k,h,T,S,x){return n(k^(c|~h),v,c,T,S,x)}function u(v){const c=[];for(let k=0;k<v.length;k++){const h=v.charCodeAt(k);h<128?c.push(h):h<2048?c.push(h>>6|192,h&63|128):h<65536?c.push(h>>12|224,h>>6&63|128,h&63|128):c.push(h>>18|240,h>>12&63|128,h>>6&63|128,h&63|128)}return c}const l=u(e),d=l.length;for(l.push(128);l.length%64!==56;)l.push(0);const y=d*8;for(let v=0;v<8;v++)l.push(v<4?y>>>v*8&255:y/4294967296>>>v*4*8&255);let f=1732584193,b=4023233417,g=2562383102,p=271733878;for(let v=0;v<l.length;v+=64){const c=[];for(let x=0;x<16;x++)c[x]=l[v+x*4]|l[v+x*4+1]<<8|l[v+x*4+2]<<16|l[v+x*4+3]<<24;let[k,h,T,S]=[f,b,g,p];f=s(f,b,g,p,c[0],7,-680876936),p=s(p,f,b,g,c[1],12,-389564586),g=s(g,p,f,b,c[2],17,606105819),b=s(b,g,p,f,c[3],22,-1044525330),f=s(f,b,g,p,c[4],7,-176418897),p=s(p,f,b,g,c[5],12,1200080426),g=s(g,p,f,b,c[6],17,-1473231341),b=s(b,g,p,f,c[7],22,-45705983),f=s(f,b,g,p,c[8],7,1770035416),p=s(p,f,b,g,c[9],12,-1958414417),g=s(g,p,f,b,c[10],17,-42063),b=s(b,g,p,f,c[11],22,-1990404162),f=s(f,b,g,p,c[12],7,1804603682),p=s(p,f,b,g,c[13],12,-40341101),g=s(g,p,f,b,c[14],17,-1502002290),b=s(b,g,p,f,c[15],22,1236535329),f=i(f,b,g,p,c[1],5,-165796510),p=i(p,f,b,g,c[6],9,-1069501632),g=i(g,p,f,b,c[11],14,643717713),b=i(b,g,p,f,c[0],20,-373897302),f=i(f,b,g,p,c[5],5,-701558691),p=i(p,f,b,g,c[10],9,38016083),g=i(g,p,f,b,c[15],14,-660478335),b=i(b,g,p,f,c[4],20,-405537848),f=i(f,b,g,p,c[9],5,568446438),p=i(p,f,b,g,c[14],9,-1019803690),g=i(g,p,f,b,c[3],14,-187363961),b=i(b,g,p,f,c[8],20,1163531501),f=i(f,b,g,p,c[13],5,-1444681467),p=i(p,f,b,g,c[2],9,-51403784),g=i(g,p,f,b,c[7],14,1735328473),b=i(b,g,p,f,c[12],20,-1926607734),f=o(f,b,g,p,c[5],4,-378558),p=o(p,f,b,g,c[8],11,-2022574463),g=o(g,p,f,b,c[11],16,1839030562),b=o(b,g,p,f,c[14],23,-35309556),f=o(f,b,g,p,c[1],4,-1530992060),p=o(p,f,b,g,c[4],11,1272893353),g=o(g,p,f,b,c[7],16,-155497632),b=o(b,g,p,f,c[10],23,-1094730640),f=o(f,b,g,p,c[13],4,681279174),p=o(p,f,b,g,c[0],11,-358537222),g=o(g,p,f,b,c[3],16,-722521979),b=o(b,g,p,f,c[6],23,76029189),f=o(f,b,g,p,c[9],4,-640364487),p=o(p,f,b,g,c[12],11,-421815835),g=o(g,p,f,b,c[15],16,530742520),b=o(b,g,p,f,c[2],23,-995338651),f=r(f,b,g,p,c[0],6,-198630844),p=r(p,f,b,g,c[7],10,1126891415),g=r(g,p,f,b,c[14],15,-1416354905),b=r(b,g,p,f,c[5],21,-57434055),f=r(f,b,g,p,c[12],6,1700485571),p=r(p,f,b,g,c[3],10,-1894986606),g=r(g,p,f,b,c[10],15,-1051523),b=r(b,g,p,f,c[1],21,-2054922799),f=r(f,b,g,p,c[8],6,1873313359),p=r(p,f,b,g,c[15],10,-30611744),g=r(g,p,f,b,c[6],15,-1560198380),b=r(b,g,p,f,c[13],21,1309151649),f=r(f,b,g,p,c[4],6,-145523070),p=r(p,f,b,g,c[11],10,-1120210379),g=r(g,p,f,b,c[2],15,718787259),b=r(b,g,p,f,c[9],21,-343485551),f=t(f,k),b=t(b,h),g=t(g,T),p=t(p,S)}function w(v){let c="";for(let k=0;k<4;k++)c+=(v>>>k*8&255).toString(16).padStart(2,"0");return c}return w(f)+w(b)+w(g)+w(p)}async function Ua(e,t){const a=t.slice(-8),n=a.split(":").map(Number),s=await crypto.subtle.importKey("raw",J(t),{name:"HMAC",hash:"SHA-512"},!1,["sign"]),i=new Uint8Array(await crypto.subtle.sign("HMAC",s,J(e))),o=i.length,r=n[0],u=Math.floor((o+n[1])/2)-16,l=Math.floor((o+n[2])/3)-8,d=pe(i.slice(r,r+32)),y=pe(i.slice(u,u+16)),f=pe(i.slice(l,l+8));return{aesKey:d,aesIv:y,aesCs:f,times:n,kStart:r,ivStart:u,csStart:l,debug:{lastEight:a,times:n,kStart:r,ivStart:u,csStart:l,keyBytesHex:Be(i).slice(0,32)+"..."}}}async function I(e,t,a){const n=await crypto.subtle.importKey("raw",ce(t),"AES-CBC",!1,["encrypt"]),s=ce(a),i=await crypto.subtle.encrypt({name:"AES-CBC",iv:s},n,J(e));return pe(i)}async function Ht(e,t,a){try{const n=await crypto.subtle.importKey("raw",ce(t),"AES-CBC",!1,["decrypt"]),s=ce(a),i=await crypto.subtle.decrypt({name:"AES-CBC",iv:s},n,ce(e));return new TextDecoder().decode(i)}catch{return null}}function Xa(e){const t=e.endsWith("==")?"==":e.endsWith("=")?"=":"",a=e.substring(7,13),n=parseInt(a[0])*10+a.charCodeAt(1)-64,s=100+parseInt(a[2])*10+a.charCodeAt(3)-64,i=100+parseInt(a[4])*10+a.charCodeAt(5)-64,o=e.substring(16,20),r=o.charCodeAt(0)-64,u=o.charCodeAt(1)-64,l=parseInt(o.slice(2)),d=e.substring(n,n+r)+e.substring(s,s+u)+e.substring(i,i+l),y=atob((d+t).replace(/-/g,"+").replace(/_/g,"/")),f=y.split("|");return{app:f[0]||"",clientID:f[1]||"",regTime:f[2]||"",rawDecoded:y,parts:f,debug:{col1:n,col2:s,col3:i,len1:r,len2:u,len3:l,idd:d.slice(0,20)+"..."}}}function $a(e,t,a="Seminyak"){const n=`${a}|${e}|${t}`,s=btoa(n),i=s.endsWith("==")?"==":s.endsWith("=")?"=":"",o=s.slice(0,s.length-i.length),r=o.length,u=20,l=104,d=172,y=Math.floor(r/3),f=y,b=y,g=r-f-b,p=o.slice(0,f),w=o.slice(f,f+b),v=o.slice(f+b),c=x=>String(Math.floor(x/10))+String.fromCharCode(x%10+64),k=c(u)+c(l-100)+c(d-100),h=String.fromCharCode(f+64)+String.fromCharCode(b+64)+String(g).padStart(2,"0"),T=Math.max(d+g,200),S=new Array(T+50).fill("A");S[7]=k[0],S[8]=k[1],S[9]=k[2],S[10]=k[3],S[11]=k[4],S[12]=k[5],S[16]=h[0],S[17]=h[1],S[18]=h[2],S[19]=h[3];for(let x=0;x<p.length;x++)S[u+x]=p[x];for(let x=0;x<w.length;x++)S[l+x]=w[x];for(let x=0;x<v.length;x++)S[d+x]=v[x];return S.join("").slice(0,d+g)+i}function Fa(e){const t=e.split(".");if(t.length<2)return{error:"Bukan format JWT valid"};try{const a=JSON.parse(atob(t[0].replace(/-/g,"+").replace(/_/g,"/"))),n=JSON.parse(atob(t[1].replace(/-/g,"+").replace(/_/g,"/")));return{header:a,payload:n,signatureB64:t[2]||"",raw:{headerB64:t[0],payloadB64:t[1]}}}catch(a){return{error:a instanceof Error?a.message:String(a)}}}async function nt(e){const t=e.replace(/-----[^-]+-----/g,"").replace(/\s/g,"");return ce(t).buffer}async function jt(e,t,a=Mt){const n=btoa(JSON.stringify({trans_no:e,alg:"RS256"})).replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,""),s=btoa(JSON.stringify({trans_time:t})).replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,""),i=`${n}.${s}`,o=await nt(a),r=await crypto.subtle.importKey("pkcs8",o,{name:"RSASSA-PKCS1-v1_5",hash:"SHA-256"},!1,["sign"]),u=await crypto.subtle.sign("RSASSA-PKCS1-v1_5",r,J(i)),l=pe(u).replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"");return`${i}.${l}`}async function it(e,t,a){const n=ce(a),s=n.length>=8?n:new Uint8Array(8),i=J(`${e}:${t}`),o=await crypto.subtle.importKey("raw",s,{name:"HMAC",hash:"SHA-512"},!1,["sign"]),r=await crypto.subtle.sign("HMAC",o,i);return pe(r)}function Ga(e){return Be(ce(e))}async function zt(e){const t=`%${e.fromAcc}#${e.amount}@${e.dateTime}^${e.refNo}*${e.destBank}~${e.destAcc}|${Qe}%`;return Be(await crypto.subtle.digest("SHA-256",J(t)))}async function Kt(e){const t=`@${e.fromAcc}|${e.amount}~${e.dateTime}*${e.refNo}^${e.destBank}#${e.destAcc}(${e.destName})${Qe}@`;return Be(await crypto.subtle.digest("SHA-256",J(t)))}async function Ya(e){const t=`{${e.nominal}*${e.norekFrom}^${e.norekTo}%${e.nameFrom}#${e.nameTo}@${Qe}}`;return Be(await crypto.subtle.digest("SHA-256",J(t)))}async function rt(e){const t=Be(await crypto.subtle.digest("SHA-256",J(`Seminyak|${e}`))),a=await nt(Mt),n=await crypto.subtle.importKey("pkcs8",a,{name:"RSASSA-PKCS1-v1_5",hash:"SHA-256"},!1,["sign"]),s=await crypto.subtle.sign("RSASSA-PKCS1-v1_5",n,J(t));return{signature:pe(s),timestamp:e,clientStamp:t}}async function Ut(e,t){const a=`${e}|${t}`,n=await nt(za),s=await crypto.subtle.importKey("pkcs8",n,{name:"RSASSA-PKCS1-v1_5",hash:"SHA-256"},!1,["sign"]),i=await crypto.subtle.sign("RSASSA-PKCS1-v1_5",s,J(a));return{signature:pe(i),clientKey:e,timestamp:t,message:a}}function Y(){const e=new Date;return new Date(e.getTime()+7*36e5).toISOString().replace("T"," ").slice(0,19)}function qe(){const e=new Date;return new Date(e.getTime()+7*36e5).toISOString().slice(0,19)+"+07:00"}function U(e="SMY"){const t=new Date(new Date().getTime()+252e5),a=t.toISOString().slice(11,19).replace(/:/g,"").slice(0,6),n=String(Math.floor(Math.random()*9e3)+1e3),s=t.toISOString().slice(0,10).replace(/-/g,"");return`${e}${a}${n}O1012${s.slice(4)}`}async function Ja(e){const t=e.timestamp||Y(),a=e.refNo||U(),n=await I(e.fromAcc,e.aesKey,e.aesIv),s=await I(String(e.amount),e.aesKey,e.aesIv),i=await I(e.dateTime,e.aesKey,e.aesIv),o=await I(e.destName||"",e.aesKey,e.aesIv);let r,u,l;e.step==="posting"?(r=await Kt({...e,refNo:a}),u=await I(`${e.destBank}-${e.destAcc}`,e.aesKey,e.aesIv),l=await I(r,e.aesKey,e.aesIv)):(r=await zt({...e,refNo:a}),u=await I(`${e.destBank}-${e.destAcc}-${r}`,e.aesKey,e.aesIv),l=null);const d=await jt(a,qe()),y=await it(d,t,e.aesCs),f=y,b={from_acc:n,to_acc:u,amount:s,date_time:i,to_name:o,hash_code:l||"",remark:e.remark||""};return{headers:{"Content-Type":"application/json",Authorization:d,"X-TIMESTAMP":t,"X-SIGNATURE":y,"X-PARTNER-ID":f,"X-CLIENT-ID":e.didEncoded||"","X-REFERENCE":a,"X-Forwarded-For":"34.50.74.78","X-Real-IP":"34.50.74.78"},body:b,url:`${e.baseUrl||"https://lpdseminyak.biz.id:8000"}/api/smart/transfer/bank/post`,refNo:a,ts:t,debug:{hashRaw:r,step:e.step||"check"}}}async function Va(e,t,a){const n={};for(const[s,i]of Object.entries(e))i&&typeof i=="string"&&(n[s]=await Ht(i,t,a));return n}async function Wa(e){const t=e.op;try{let a;if(t==="keygen")a=await Ua(e.clientID,e.timestamp);else if(t==="encrypt")a={encrypted:await I(e.plaintext,e.aesKey,e.aesIv),plaintext:e.plaintext};else if(t==="decrypt")a={decrypted:await Ht(e.ciphertext,e.aesKey,e.aesIv),ciphertext:e.ciphertext};else if(t==="did-decode")a=Xa(e.did);else if(t==="did-encode")a={encoded:$a(e.clientID,e.timestamp,e.appName||"Seminyak"),clientID:e.clientID,timestamp:e.timestamp};else if(t==="jwt-decode")a=Fa(e.jwt);else if(t==="hashcode"){const n=e.step||"check";let s;n==="posting"?s=await Kt(e):n==="lpd"?s=await Ya(e):s=await zt(e);const i=Qe;a={hash:s,step:n,formula:n==="posting"?`SHA256("@"+fromAcc+"|"+amount+"~"+dateTime+"*"+refNo+"^"+destBank+"#"+destAcc+"("+destName+")${i}@")`:`SHA256("%"+fromAcc+"#"+amount+"@"+dateTime+"^"+refNo+"*"+destBank+"~"+destAcc+"|${i}%")`}}else if(t==="reference"){const n=[];for(let s=0;s<(parseInt(e.count)||3);s++)n.push(U(e.prefix||"SMY"));a={references:n}}else if(t==="signature")a={signature:await it(e.token,e.timestamp,e.aesCs)};else if(t==="sig-decode"){const n=Ga(e.signature);a={hex:n,length:n.length}}else if(t==="ios-token-sig")a=await rt(e.timestamp||Y());else if(t==="snap-token-sig")a=await Ut(e.clientKey||"LPD-SEMINYAK-001",e.timestamp||qe());else if(t==="build-transfer")a=await Ja({...e,timestamp:e.timestamp||Y(),refNo:e.refNo||U()});else if(t==="decrypt-body"){const n=JSON.parse(e.body||"{}");a={decrypted:await Va(n,e.aesKey,e.aesIv)}}else if(t==="timestamp")a={jakarta:Y(),jakartaISO:qe(),utc:new Date().toISOString()};else return{ok:!1,error:`Unknown operation: ${t}`};return{ok:!0,op:t,result:a}}catch(a){return{ok:!1,op:t,error:a instanceof Error?a.message:String(a)}}}const z=new Ot;z.use("/static/*",Oa({root:"./public"}));z.get("/favicon.ico",e=>e.body(null,204));z.post("/api/exec",async e=>{try{const t=await e.req.json(),n=await(await fetch("http://127.0.0.1:3001/exec",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})).json();return e.json(n)}catch(t){const a=t instanceof Error?t.message:String(t);return e.json({stdout:"",stderr:"Terminal server tidak tersedia: "+a,cwd:"/home/user",exitCode:1},500)}});z.get("/api/exec/health",async e=>{try{const a=await(await fetch("http://127.0.0.1:3001/health")).json();return e.json({ok:!0,...a})}catch{return e.json({ok:!1,error:"Terminal server tidak tersedia di production. Gunakan sandbox URL untuk operasi crypto.",sandbox_only:!0})}});z.post("/api/crypto",async e=>{try{const t=await e.req.json(),a=await Wa(t);return e.json(a)}catch(t){const a=t instanceof Error?t.message:String(t);return e.json({ok:!1,error:"Crypto error: "+a})}});const Je="34.50.74.78";async function K(e,t,a,n){if(!t)throw new Error("X-CLIENT-ID (clientIdEnc) wajib diisi — jalankan Derive AES Keys terlebih dahulu");const s=Y(),i=qe(),o=a||U(),r=await jt(o,i),u=await it(r,s,e||""),l=U(),d=n&&n.trim()?n.trim():r;return{jwt:r,ts:s,tsISO:i,sig:u,xref:l,headers:{"Content-Type":"application/json",Authorization:d,"X-TIMESTAMP":s,"X-SIGNATURE":u,"X-PARTNER-ID":u,"X-CLIENT-ID":t,"X-REFERENCE":l,"X-Forwarded-For":Je,"X-Real-IP":Je}}}async function Qa(e,t,a){try{const n=Y(),s=await rt(n),i=e+"/api/smart/access/token",o={"Content-Type":"application/json","X-TIMESTAMP":n,"X-CLIENT-ID":t,"X-SIGNATURE":s.signature,"X-Forwarded-For":Je,"X-Real-IP":Je},r=await fetch(i,{method:"POST",headers:o,body:"{}"}),u=await r.text();let l={};try{l=JSON.parse(u)}catch{l={_raw:u}}const d=l.token||l.accessToken||"";return r.status<400&&d?{ok:!0,token:d}:{ok:!1,error:`HTTP ${r.status}: ${l.message||u.slice(0,100)}`}}catch(n){return{ok:!1,error:n.message}}}z.post("/api/smart/get-ios-token",async e=>{try{const t=await e.req.json(),{baseUrl:a,clientIdEnc:n,aesCs:s}=t;if(!n)return e.json({ok:!1,error:"clientIdEnc wajib diisi"});const i=(a||"https://lpdseminyak.biz.id:8000").replace(/\/+$/,""),o=await Qa(i,n,s||"");return e.json({ok:o.ok,token:o.token,error:o.error,expiresIn:180})}catch(t){return e.json({ok:!1,error:t.message})}});z.post("/api/smart",async e=>{try{const t=await e.req.json(),{action:a,baseUrl:n,aesKey:s,aesIv:i,aesCs:o,clientIdEnc:r,transNo:u,iosToken:l,...d}=t,y=(n||"https://lpdseminyak.biz.id:8000").replace(/\/+$/,""),f=p=>Ka(p),b=p=>/^[0-9a-f]{32}$/i.test(p);if(a==="login"){if(!d.user_name||!d.user_pass)throw new Error("user_name dan user_pass wajib diisi");if(!r)throw new Error("clientIdEnc (X-CLIENT-ID) wajib diisi");const p=b(d.user_name)?d.user_name:f(d.user_name),w=b(d.user_pass)?d.user_pass:f(d.user_pass),{headers:v,ts:c,xref:k,jwt:h,sig:T}=await K(o,r,u,l),S=y+"/api/smart/access/login",x=JSON.stringify({user_name:p,user_pass:w});let R=0,D={};try{const N=await fetch(S,{method:"POST",headers:v,body:x});R=N.status;const P=await N.text();try{D=JSON.parse(P)}catch{D={_raw:P}}}catch(N){return e.json({ok:!1,action:a,error:N.message,url:S,headers:v})}return e.json({ok:R>=200&&R<300,action:a,httpStatus:R,url:S,result:D,debug:{ts:c,xref:k,user_name_sent:p,user_pass_sent:w,jwt_preview:h.substring(0,40)+"...",sig_preview:T.substring(0,20)+"..."},requestHeaders:v,requestBody:{user_name:p,user_pass:w}})}if(a==="cek-saldo"){if(!d.no_rek)throw new Error("no_rek wajib diisi");if(!r)throw new Error("clientIdEnc wajib diisi");if(!s||!i)throw new Error("aesKey dan aesIv wajib diisi");const p=await I(d.no_rek,s,i),{headers:w,ts:v,xref:c}=await K(o,r,u,l),k=y+"/api/smart/account/balance",h=JSON.stringify({no_rek:p});let T=0,S={};try{const x=await fetch(k,{method:"POST",headers:w,body:h});T=x.status;const R=await x.text();try{S=JSON.parse(R)}catch{S={_raw:R}}}catch(x){return e.json({ok:!1,action:a,error:x.message})}return e.json({ok:T>=200&&T<300,action:a,httpStatus:T,url:k,result:S,debug:{ts:v,xref:c,no_rek_enc:p},requestHeaders:w})}if(a==="inquiry"){if(!d.no_rek_from||!d.no_rek_to||!d.nominal)throw new Error("no_rek_from, no_rek_to, nominal wajib diisi");if(!r)throw new Error("clientIdEnc wajib diisi");const p=u||U(),{headers:w,ts:v,xref:c}=await K(o,r,p,l),[k,h,T,S]=await Promise.all([I(d.no_rek_from,s,i),I(d.no_rek_to,s,i),I(d.nominal,s,i),d.bank_dest?I(d.bank_dest,s,i):Promise.resolve("")]),x=y+"/api/smart/transfer/inquiry",R=JSON.stringify({no_rek_from:k,no_rek_to:h,nominal:T,bank_dest:S,ref_no:p});let D=0,N={};try{const P=await fetch(x,{method:"POST",headers:w,body:R});D=P.status;const L=await P.text();try{N=JSON.parse(L)}catch{N={_raw:L}}}catch(P){return e.json({ok:!1,action:a,error:P.message})}return e.json({ok:D>=200&&D<300,action:a,httpStatus:D,url:x,result:N,debug:{ts:v,xref:c,ref:p},requestHeaders:w})}if(a==="posting"){if(!d.no_rek_from||!d.no_rek_to||!d.nominal)throw new Error("no_rek_from, no_rek_to, nominal wajib diisi");if(!r)throw new Error("clientIdEnc wajib diisi");const p=u||U(),{headers:w,ts:v,xref:c}=await K(o,r,p,l),[k,h,T,S,x,R]=await Promise.all([I(d.no_rek_from,s,i),I(d.no_rek_to,s,i),I(d.nominal,s,i),d.bank_dest?I(d.bank_dest,s,i):Promise.resolve(""),d.nama_dest?I(d.nama_dest,s,i):Promise.resolve(""),d.keterangan?I(d.keterangan,s,i):Promise.resolve("")]),D=y+"/api/smart/transfer/posting",N=JSON.stringify({no_rek_from:k,no_rek_to:h,nominal:T,bank_dest:S,nama_dest:x,keterangan:R,ref_no:p});let P=0,L={};try{const V=await fetch(D,{method:"POST",headers:w,body:N});P=V.status;const W=await V.text();try{L=JSON.parse(W)}catch{L={_raw:W}}}catch(V){return e.json({ok:!1,action:a,error:V.message})}return e.json({ok:P>=200&&P<300,action:a,httpStatus:P,url:D,result:L,debug:{ts:v,xref:c,ref:p},requestHeaders:w})}const g=async(p,w,v)=>{const c=await fetch(p,{method:"POST",headers:w,body:v}),k=await c.text();let h;try{h=JSON.parse(k)}catch{h={_raw:k}}return{httpStatus:c.status,parsed:h}};if(a==="logout"){if(!r)throw new Error("clientIdEnc wajib diisi");const{headers:p,ts:w,xref:v}=await K(o,r,void 0,l),c=y+"/api/smart/access/logout";try{const{httpStatus:k,parsed:h}=await g(c,p,"{}");return e.json({ok:k<400,action:a,httpStatus:k,url:c,result:h,debug:{ts:w,xref:v}})}catch(k){return e.json({ok:!1,action:a,error:k.message})}}if(a==="account-list"){if(!r)throw new Error("clientIdEnc wajib diisi");if(!s||!i)throw new Error("aesKey dan aesIv wajib diisi");const p=await I(d.customer_id||"",s,i),{headers:w,ts:v,xref:c}=await K(o,r,void 0,l),k=y+"/api/smart/tabungan/account-list",h=JSON.stringify({customer_id:p});try{const{httpStatus:T,parsed:S}=await g(k,w,h);return e.json({ok:T<400,action:a,httpStatus:T,url:k,result:S,debug:{ts:v,xref:c,customer_id_enc:p}})}catch(T){return e.json({ok:!1,action:a,error:T.message})}}if(a==="mutasi-history"){if(!r)throw new Error("clientIdEnc wajib diisi");if(!s||!i)throw new Error("aesKey dan aesIv wajib diisi");const p=await I(d.customer_id||"",s,i),{headers:w,ts:v,xref:c}=await K(o,r,void 0,l),k=y+"/api/smart/tabungan/mutasi-history",h=JSON.stringify({customer_id:p});try{const{httpStatus:T,parsed:S}=await g(k,w,h);return e.json({ok:T<400,action:a,httpStatus:T,url:k,result:S,debug:{ts:v,xref:c,customer_id_enc:p}})}catch(T){return e.json({ok:!1,action:a,error:T.message})}}if(a==="transaction-history"){if(!r)throw new Error("clientIdEnc wajib diisi");if(!s||!i)throw new Error("aesKey dan aesIv wajib diisi");const p=await I(d.no_rek||"",s,i),w=await I(d.tgl_awal||"",s,i),v=await I(d.tgl_akhir||"",s,i),{headers:c,ts:k,xref:h}=await K(o,r,void 0,l),T=y+"/api/smart/tabungan/transaction-history",S=JSON.stringify({no_rek:p,tgl_awal:w,tgl_akhir:v});try{const{httpStatus:x,parsed:R}=await g(T,c,S);return e.json({ok:x<400,action:a,httpStatus:x,url:T,result:R,debug:{ts:k,xref:h}})}catch(x){return e.json({ok:!1,action:a,error:x.message})}}if(a==="transfer-lpd-check"){if(!d.no_rek_tujuan)throw new Error("no_rek_tujuan wajib diisi");if(!r)throw new Error("clientIdEnc wajib diisi");if(!s||!i)throw new Error("aesKey dan aesIv wajib diisi");const p=U(),w=await I(d.no_rek_tujuan,s,i),{headers:v,ts:c,xref:k}=await K(o,r,p,l),h=y+"/api/smart/transfer/lpd/check",T=JSON.stringify({account_no:w});try{const{httpStatus:S,parsed:x}=await g(h,v,T);return e.json({ok:S<400,action:a,httpStatus:S,url:h,result:x,debug:{ts:c,xref:k,ref:p,account_no_enc:w}})}catch(S){return e.json({ok:!1,action:a,error:S.message})}}if(a==="transfer-lpd-inquiry"){if(!d.no_rek_from||!d.no_rek_to||!d.nominal)throw new Error("no_rek_from, no_rek_to, nominal wajib diisi");if(!r)throw new Error("clientIdEnc wajib diisi");if(!s||!i)throw new Error("aesKey dan aesIv wajib diisi");const p=u||U(),{headers:w,ts:v,xref:c}=await K(o,r,p,l),[k,h,T,S,x,R]=await Promise.all([I(d.no_rek_from,s,i),I(d.no_rek_to,s,i),I(d.nama_tujuan||"",s,i),I(d.nominal,s,i),I(d.date_time||Y(),s,i),I(d.keterangan||"",s,i)]),D=y+"/api/smart/transfer/lpd/inquiry",N=JSON.stringify({to_acc:h,to_name:T,from_acc:k,from_name:k,amount:S,remark:R});try{const{httpStatus:P,parsed:L}=await g(D,w,N);return e.json({ok:P<400,action:a,httpStatus:P,url:D,result:L,debug:{ts:v,xref:c,ref:p}})}catch(P){return e.json({ok:!1,action:a,error:P.message})}}if(a==="transfer-lpd-posting"){if(!d.no_rek_from||!d.no_rek_to||!d.nominal)throw new Error("no_rek_from, no_rek_to, nominal wajib diisi");if(!r)throw new Error("clientIdEnc wajib diisi");if(!s||!i)throw new Error("aesKey dan aesIv wajib diisi");const p=u||U(),{headers:w,ts:v,xref:c}=await K(o,r,p,l),[k,h,T,S,x,R]=await Promise.all([I(d.no_rek_from,s,i),I(d.no_rek_to,s,i),I(d.nama_tujuan||"",s,i),I(d.nominal,s,i),I(d.date_time||Y(),s,i),I(d.keterangan||"",s,i)]),D=y+"/api/smart/transfer/lpd/post",N=JSON.stringify({to_acc:h,to_name:T,from_acc:k,from_name:k,amount:S,remark:R});try{const{httpStatus:P,parsed:L}=await g(D,w,N);return e.json({ok:P<400,action:a,httpStatus:P,url:D,result:L,debug:{ts:v,xref:c,ref:p}})}catch(P){return e.json({ok:!1,action:a,error:P.message})}}if(a==="transfer-bank-check"){if(!d.no_rek_tujuan||!d.kode_bank)throw new Error("no_rek_tujuan dan kode_bank wajib diisi");if(!r)throw new Error("clientIdEnc wajib diisi");if(!s||!i)throw new Error("aesKey dan aesIv wajib diisi");const p=U(),[w,v]=await Promise.all([I(d.no_rek_tujuan,s,i),I(d.kode_bank,s,i)]),{headers:c,ts:k,xref:h}=await K(o,r,p,l),T=y+"/api/smart/transfer/bank/check",S=JSON.stringify({account_no:w,bank_code:v});try{const{httpStatus:x,parsed:R}=await g(T,c,S);return e.json({ok:x<400,action:a,httpStatus:x,url:T,result:R,debug:{ts:k,xref:h,ref:p}})}catch(x){return e.json({ok:!1,action:a,error:x.message})}}if(a==="transfer-bank-inquiry"){if(!d.no_rek_from||!d.no_rek_to||!d.nominal||!d.kode_bank)throw new Error("no_rek_from, no_rek_to, nominal, kode_bank wajib diisi");if(!r)throw new Error("clientIdEnc wajib diisi");if(!s||!i)throw new Error("aesKey dan aesIv wajib diisi");const p=u||U(),{headers:w,ts:v,xref:c}=await K(o,r,p,l),[k,h,T,S,x,R]=await Promise.all([I(d.no_rek_from,s,i),I(d.no_rek_to,s,i),I(d.kode_bank,s,i),I(d.nominal,s,i),I(d.date_time||Y(),s,i),I(d.hash_code||"",s,i)]),D=y+"/api/smart/transfer/bank/inquiry",N=JSON.stringify({from_acc:k,to_acc:h,bank_code:T,amount:S,date_time:x,hash_code:R,remark:""});try{const{httpStatus:P,parsed:L}=await g(D,w,N);return e.json({ok:P<400,action:a,httpStatus:P,url:D,result:L,debug:{ts:v,xref:c,ref:p}})}catch(P){return e.json({ok:!1,action:a,error:P.message})}}if(a==="transfer-bank-posting"){if(!d.no_rek_from||!d.no_rek_to||!d.nominal||!d.kode_bank)throw new Error("no_rek_from, no_rek_to, nominal, kode_bank wajib diisi");if(!r)throw new Error("clientIdEnc wajib diisi");if(!s||!i)throw new Error("aesKey dan aesIv wajib diisi");const p=u||U(),{headers:w,ts:v,xref:c}=await K(o,r,p,l),[k,h,T,S,x,R,D]=await Promise.all([I(d.no_rek_from,s,i),I(d.no_rek_to,s,i),I(d.kode_bank,s,i),I(d.nominal,s,i),I(d.date_time||Y(),s,i),I(d.hash_code||"",s,i),I(d.keterangan||"",s,i)]),N=y+"/api/smart/transfer/bank/post",P=JSON.stringify({from_acc:k,to_acc:h,bank_code:T,amount:S,date_time:x,hash_code:R,remark:D});try{const{httpStatus:L,parsed:V}=await g(N,w,P);return e.json({ok:L<400,action:a,httpStatus:L,url:N,result:V,debug:{ts:v,xref:c,ref:p}})}catch(L){return e.json({ok:!1,action:a,error:L.message})}}return e.json({ok:!1,error:"Unknown action: "+a})}catch(t){const a=t instanceof Error?t.message:String(t);return e.json({ok:!1,error:"Smart error: "+a})}});z.post("/api/token/generate",async e=>{try{const t=await e.req.json(),{type:a,baseUrl:n,clientIdEnc:s,clientKey:i}=t;let o;if(a==="ios"){const r=Y(),u=await rt(r),l=(n||"https://lpdseminyak.biz.id:8000")+"/api/smart/access/token",d={"Content-Type":"application/json","X-TIMESTAMP":r,"X-CLIENT-ID":s||"","X-SIGNATURE":u.signature,"X-Forwarded-For":"34.50.74.78","X-Real-IP":"34.50.74.78"};try{const y=await fetch(l,{method:"POST",headers:d,body:"{}"}),f=await y.text();let b;try{b=JSON.parse(f)}catch{b={_raw:f}}o={ok:y.status<400,httpStatus:y.status,result:b,debug:u}}catch(y){o={ok:!1,error:y.message}}}else if(a==="snap"){const r=qe();o={ok:!0,result:await Ut(i||"LPD-SEMINYAK-001",r)}}else o={ok:!1,error:"type must be snap or ios"};return e.json(o)}catch(t){const a=t instanceof Error?t.message:String(t);return e.json({ok:!1,error:"Token error: "+a})}});const Q="/home/user/webapp/lpd_seminyak/storage/logs";z.post("/api/admin",async e=>{try{const t=await e.req.json(),a=t.op;if(a==="list-logs"){const o=((await(await fetch("http://127.0.0.1:3001/exec",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({command:`find ${Q} -maxdepth 2 \\( -name "*.txt" -o -name "*.log" \\) | sort -r | head -200`})})).json()).stdout||"").trim().split(`
`).filter(Boolean).map(w=>{const v=w.split("/").pop()||"",c=w.replace(Q+"/","").replace("/"+v,"");return{name:v,dir:c===v?"root":c,path:w}}),u=await(await fetch("http://127.0.0.1:3001/exec",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({command:`grep -c "local.ERROR" ${Q}/laravel.log 2>/dev/null || echo 0`})})).json(),l=parseInt((u.stdout||"0").trim())||0,y=await(await fetch("http://127.0.0.1:3001/exec",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({command:`grep -h "POST http" ${Q}/access-*.txt ${Q}/transfer-*.txt ${Q}/tabungan-*.txt 2>/dev/null | grep -oP '/api/[a-z/._-]+' | sort | uniq -c | sort -rn | head -20`})})).json(),f={};(y.stdout||"").trim().split(`
`).forEach(w=>{const v=w.trim().match(/^(\d+)\s+(.+)$/);v&&(f[v[2]]=parseInt(v[1]))});const g=await(await fetch("http://127.0.0.1:3001/exec",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({command:`grep -h "REQUEST" ${Q}/access-*.txt 2>/dev/null | grep -oP '\\d{4}-\\d{2}-\\d{2}' | sort | uniq -c | tail -30`})})).json(),p={};return(g.stdout||"").trim().split(`
`).forEach(w=>{const v=w.trim().match(/^(\d+)\s+(\d{4}-\d{2}-\d{2})$/);v&&(p[v[2]]=parseInt(v[1]))}),e.json({ok:!0,files:o,error_count:l,endpoints:f,daily:p})}if(a==="read-log"){const n=(t.path||"").replace(/\.\./g,"").replace(/[^a-zA-Z0-9._\-]/g,""),s=(t.dir||"root").replace(/\.\./g,"").replace(/[^a-zA-Z0-9._\-]/g,"");let i="";s==="root"?i=`${Q}/${n}`:i=`${Q}/${s}/${n}`;const r=await(await fetch("http://127.0.0.1:3001/exec",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({command:`cat "${i}" 2>/dev/null | head -c 500000`})})).json();return!r.stdout||r.stdout.trim()===""?e.json({ok:!1,error:`File tidak ditemukan atau kosong: ${n}`}):e.json({ok:!0,content:r.stdout,path:i})}return e.json({ok:!1,error:"Unknown operation: "+a})}catch(t){const a=t instanceof Error?t.message:String(t);return a.includes("fetch")||a.includes("ECONNREFUSED")||a.includes("refused")?e.json({ok:!1,error:"Admin panel memerlukan sandbox environment. Di production, fitur baca log tidak tersedia karena tidak ada akses filesystem."}):e.json({ok:!1,error:"Admin error: "+a})}});z.get("/",e=>e.redirect("/admin"));z.get("/swagger",e=>e.html(qa()));z.get("/admin",e=>e.html(ja()));z.get("/crypto",e=>e.html(Ha()));z.get("/docs",e=>{const t=Za();return e.html(t)});function Za(){const e={installPhp:["# Ubuntu/Debian:","sudo apt-get install -y software-properties-common","sudo add-apt-repository ppa:ondrej/php","sudo apt-get update","sudo apt-get install -y php7.4 php7.4-cli php7.4-mbstring php7.4-xml \\","  php7.4-curl php7.4-zip php7.4-json php7.4-pdo php7.4-intl","","# Verifikasi:","php7.4 --version"].join(`
`),installOdbc:["# Install ODBC Driver 17 (Ubuntu):","curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -","curl https://packages.microsoft.com/config/ubuntu/20.04/prod.list \\","  > /etc/apt/sources.list.d/mssql-release.list","sudo apt-get update","sudo ACCEPT_EULA=Y apt-get install -y msodbcsql17 unixodbc-dev","","# Install ekstensi PHP sqlsrv:","sudo pecl install sqlsrv pdo_sqlsrv",'echo "extension=sqlsrv.so" >> /etc/php/7.4/cli/php.ini','echo "extension=pdo_sqlsrv.so" >> /etc/php/7.4/cli/php.ini'].join(`
`),extractCode:["# Extract dari zip:","unzip lpd_seminyak.zip -d /var/www/html/","","# Atau clone dari repository (jika ada):","git clone https://your-repo.git /var/www/html/lpd_seminyak","","# Masuk ke direktori:","cd /var/www/html/lpd_seminyak"].join(`
`),composerInstall:["# Install composer (jika belum ada):","curl -sS https://getcomposer.org/installer | php7.4","mv composer.phar /usr/local/bin/composer","","# Install dependencies:","cd /var/www/html/lpd_seminyak","COMPOSER_ALLOW_SUPERUSER=1 composer install --no-dev \\","  --no-interaction --ignore-platform-reqs","","# Jika ada error autoload, jalankan:","composer dump-autoload --no-scripts --optimize"].join(`
`),envSetup:["cp .env.example .env","","# Generate application key:","php7.4 artisan key:generate","","# Edit file .env:","nano .env"].join(`
`),envMinimal:["APP_URL=https://your-domain.com","DB_HOST=your-sqlserver-host","DB_DATABASE=Giosoft_LPD","DB_USERNAME=sa","DB_PASSWORD=your-password","","# Path key absolut sesuai OS:","PUBLIC_KEY_LPD=/var/www/html/lpd_seminyak/keys/public_key.pem","PUBLIC_KEY_BPD=/var/www/html/lpd_seminyak/public_key_bpd.pem","MASTER_BANK_LIST=/var/www/html/lpd_seminyak/bank.list","MASTER_PPOB_LIST=/var/www/html/lpd_seminyak/ppob.list","MASTER_DISPLAY_LIST=/var/www/html/lpd_seminyak/display.list"].join(`
`),keysSetup:["mkdir -p /var/www/html/lpd_seminyak/keys","cp public_key_lpd.pem keys/public_key.pem","chmod 644 keys/public_key.pem"].join(`
`),permissions:["chmod -R 775 /var/www/html/lpd_seminyak/storage","chmod -R 775 /var/www/html/lpd_seminyak/bootstrap/cache","chown -R www-data:www-data /var/www/html/lpd_seminyak/storage"].join(`
`),dbSchema:["-- Di SQL Server Management Studio:","CREATE DATABASE Giosoft_LPD;","USE Giosoft_LPD;","","-- Tabel utama yang diperlukan:","-- gmob_nasabah, gmob_token, gmob_request, gmob_transfer,","-- gmob_transferlog, gmob_payment, gmob_log, gmob_access,","-- gmob_rekening, gmob_responcode, gmob_counter, gmob_listaccount,","-- gtb_nasabah, gtb_folio, gak_mutasi, gak_ledger,","-- gum_config, gak_bookstatus, gcore_bankcode, gcore_transfer,","-- gcore_log, gppob_produk, gppob_inquiry, gppob_transaction"].join(`
`),apacheConf:["# /etc/apache2/sites-available/lpd_seminyak.conf","<VirtualHost *:80>","    ServerName your-domain.com","    DocumentRoot /var/www/html/lpd_seminyak/public","    ","    <Directory /var/www/html/lpd_seminyak/public>","        AllowOverride All","        Require all granted","    </Directory>","    ","    ErrorLog ${APACHE_LOG_DIR}/lpd_error.log","    CustomLog ${APACHE_LOG_DIR}/lpd_access.log combined","</VirtualHost>","","# Aktifkan:","a2ensite lpd_seminyak.conf","a2enmod rewrite","systemctl restart apache2"].join(`
`),verify:["# Cek bootstrap Laravel:","php7.4 artisan env","","# Test koneksi database:","php7.4 artisan tinker","# Di dalam tinker:","DB::connection()->getPdo()","","# Test akses API:","curl -X POST https://your-domain.com/v1.0/access-token/b2b \\",'  -H "Content-Type: application/json" \\',`  -d '{"grantType":"client_credentials"}'`].join(`
`)};return`<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Dokumentasi LPD Seminyak API</title>
<script src="https://cdn.tailwindcss.com"><\/script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css"/>
<style>
:root{--primary:#1e40af;--primary-light:#3b82f6;--secondary:#0f172a;--sidebar-w:280px}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',system-ui,sans-serif;background:#f1f5f9;color:#1e293b}
#sidebar{position:fixed;top:0;left:0;width:var(--sidebar-w);height:100vh;background:var(--secondary);color:#e2e8f0;overflow-y:auto;z-index:100;transition:transform .3s}
#sidebar .logo{padding:20px 16px 16px;border-bottom:1px solid #334155;background:linear-gradient(135deg,#1e3a8a,#1d4ed8)}
#sidebar .logo h1{font-size:18px;font-weight:700;color:#fff}
#sidebar .logo p{font-size:11px;color:#93c5fd;margin-top:2px}
#sidebar nav a{display:flex;align-items:center;gap:10px;padding:9px 16px;font-size:13px;color:#94a3b8;text-decoration:none;transition:all .15s;cursor:pointer;border-left:3px solid transparent}
#sidebar nav a:hover,#sidebar nav a.active{color:#fff;background:rgba(255,255,255,.07);border-left-color:var(--primary-light)}
#sidebar nav a i{width:18px;text-align:center;font-size:14px}
#sidebar .nav-section{padding:12px 16px 4px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#475569}
#main{margin-left:var(--sidebar-w);min-height:100vh}
.topbar{position:sticky;top:0;z-index:50;background:#fff;border-bottom:1px solid #e2e8f0;padding:14px 32px;display:flex;align-items:center;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,.08)}
.topbar h2{font-size:20px;font-weight:700;color:var(--secondary)}
.badge{display:inline-block;padding:3px 10px;border-radius:999px;font-size:11px;font-weight:600}
.badge-blue{background:#dbeafe;color:#1d4ed8}.badge-green{background:#d1fae5;color:#065f46}
.badge-yellow{background:#fef3c7;color:#92400e}.badge-red{background:#fee2e2;color:#991b1b}
.badge-purple{background:#ede9fe;color:#5b21b6}
.content{padding:32px}
.section{display:none}.section.active{display:block}
.card{background:#fff;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,.06);margin-bottom:24px;overflow:hidden}
.card-header{padding:16px 20px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:10px}
.card-header h3{font-size:15px;font-weight:700;color:var(--secondary)}
.card-body{padding:20px}
.endpoint{border:1px solid #e2e8f0;border-radius:10px;margin-bottom:16px;overflow:hidden}
.endpoint-header{padding:12px 16px;display:flex;align-items:center;gap:10px;cursor:pointer;background:#f8fafc;transition:background .15s}
.endpoint-header:hover{background:#f1f5f9}
.method{font-size:11px;font-weight:700;padding:3px 8px;border-radius:4px;min-width:48px;text-align:center}
.method-post{background:#fef3c7;color:#92400e}.method-get{background:#d1fae5;color:#065f46}
.endpoint-path{font-family:monospace;font-size:13px;font-weight:600;color:#1e40af}
.endpoint-body{padding:16px;border-top:1px solid #f1f5f9;background:#fff}
.endpoint-body.hidden{display:none}
pre{background:#0f172a;color:#e2e8f0;padding:16px;border-radius:8px;font-size:12px;line-height:1.6;overflow-x:auto;margin:8px 0;white-space:pre-wrap;word-break:break-all}
code{font-family:'Courier New',monospace}
.inline-code{background:#f1f5f9;color:#0f172a;padding:1px 6px;border-radius:4px;font-family:monospace;font-size:12px}
table{width:100%;border-collapse:collapse;font-size:13px}
th{background:#f8fafc;padding:10px 14px;text-align:left;font-weight:600;color:#374151;border-bottom:2px solid #e5e7eb}
td{padding:10px 14px;border-bottom:1px solid #f3f4f6;vertical-align:top}
tr:last-child td{border-bottom:none}
.info-box{padding:12px 16px;border-radius:8px;font-size:13px;margin:12px 0;display:flex;gap:10px;align-items:flex-start}
.info-box i{margin-top:1px;flex-shrink:0}
.info-blue{background:#eff6ff;border-left:4px solid #3b82f6;color:#1e40af}
.info-yellow{background:#fffbeb;border-left:4px solid #f59e0b;color:#92400e}
.info-red{background:#fef2f2;border-left:4px solid #ef4444;color:#991b1b}
.steps{}
.step{display:flex;gap:16px;margin-bottom:20px;padding:16px;background:#f8fafc;border-radius:10px}
.step-num{width:32px;height:32px;background:var(--primary);color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;flex-shrink:0}
.step-content h4{font-weight:700;margin-bottom:6px;font-size:14px}
.step-content p{font-size:13px;color:#4b5563;line-height:1.6}
.stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:16px;margin-bottom:24px}
.stat-card{background:#fff;padding:20px;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,.06);text-align:center}
.stat-card .stat-num{font-size:32px;font-weight:800}
.stat-card .stat-label{font-size:12px;color:#64748b;margin-top:4px}
.flow{display:flex;align-items:center;gap:0;flex-wrap:wrap;margin:12px 0}
.flow-step{background:#dbeafe;color:#1e40af;padding:8px 14px;border-radius:6px;font-size:12px;font-weight:600}
.flow-arrow{padding:0 8px;color:#94a3b8;font-size:18px}
.db-table{background:#1e293b;color:#e2e8f0;border-radius:8px;overflow:hidden;margin-bottom:16px}
.db-table-header{background:#0f172a;padding:10px 16px;font-weight:700;font-family:monospace;color:#38bdf8;font-size:14px}
.db-table-body{padding:12px 16px}
.db-col{display:flex;gap:12px;padding:4px 0;font-size:12px;font-family:monospace;border-bottom:1px solid #334155}
.db-col:last-child{border-bottom:none}
.db-col-name{color:#fbbf24;min-width:160px}
.db-col-type{color:#34d399;min-width:100px}
.db-col-desc{color:#94a3b8}
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
@media(max-width:900px){.grid-2{grid-template-columns:1fr}}
@media(max-width:768px){#sidebar{transform:translateX(-100%)}#sidebar.open{transform:translateX(0)}#main{margin-left:0}}
.toggle-btn{display:none;position:fixed;bottom:20px;left:20px;z-index:200;background:var(--primary);color:#fff;border:none;border-radius:50%;width:48px;height:48px;font-size:18px;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,.3)}
@media(max-width:768px){.toggle-btn{display:flex;align-items:center;justify-content:center}}
</style>
</head>
<body>

<aside id="sidebar">
<div class="logo">
  <h1><i class="fas fa-university mr-2"></i>LPD Seminyak</h1>
  <p>API Gateway Documentation v1.0</p>
</div>
<nav>
  <div class="nav-section">Overview</div>
  <a href="#" onclick="showSection('overview');return false" class="active" id="nav-overview"><i class="fas fa-home"></i> Beranda &amp; Ringkasan</a>
  <a href="#" onclick="showSection('architecture');return false" id="nav-architecture"><i class="fas fa-sitemap"></i> Arsitektur Sistem</a>
  <a href="#" onclick="showSection('install');return false" id="nav-install"><i class="fas fa-download"></i> Panduan Instalasi</a>
  <a href="#" onclick="showSection('config');return false" id="nav-config"><i class="fas fa-cog"></i> Konfigurasi .env</a>
  <div class="nav-section">API Reference</div>
  <a href="#" onclick="showSection('auth');return false" id="nav-auth"><i class="fas fa-key"></i> Autentikasi &amp; Token</a>
  <a href="#" onclick="showSection('ios-access');return false" id="nav-ios-access"><i class="fas fa-mobile-alt"></i> iOS – Login &amp; Register</a>
  <a href="#" onclick="showSection('ios-tabungan');return false" id="nav-ios-tabungan"><i class="fas fa-piggy-bank"></i> iOS – Tabungan</a>
  <a href="#" onclick="showSection('ios-transfer-lpd');return false" id="nav-ios-transfer-lpd"><i class="fas fa-exchange-alt"></i> iOS – Transfer LPD</a>
  <a href="#" onclick="showSection('ios-transfer-bank');return false" id="nav-ios-transfer-bank"><i class="fas fa-landmark"></i> iOS – Transfer Antar Bank</a>
  <a href="#" onclick="showSection('ios-ppob');return false" id="nav-ios-ppob"><i class="fas fa-bolt"></i> iOS – PPOB</a>
  <a href="#" onclick="showSection('snap');return false" id="nav-snap"><i class="fas fa-plug"></i> SNAP – Transfer VA BPD</a>
  <a href="#" onclick="showSection('atm');return false" id="nav-atm"><i class="fas fa-credit-card"></i> ATM Cardless</a>
  <a href="#" onclick="showSection('ppob-callback');return false" id="nav-ppob-callback"><i class="fas fa-reply"></i> PPOB Callback</a>
  <div class="nav-section">Referensi</div>
  <a href="#" onclick="showSection('database');return false" id="nav-database"><i class="fas fa-database"></i> Skema Database</a>
  <a href="#" onclick="showSection('response-codes');return false" id="nav-response-codes"><i class="fas fa-list-ol"></i> Kode Respons</a>
  <a href="#" onclick="showSection('security');return false" id="nav-security"><i class="fas fa-shield-alt"></i> Keamanan &amp; Enkripsi</a>
  <a href="#" onclick="showSection('middleware');return false" id="nav-middleware"><i class="fas fa-filter"></i> Middleware &amp; Guard</a>
  <a href="#" onclick="showSection('helpers');return false" id="nav-helpers"><i class="fas fa-tools"></i> Helper Classes</a>
  <a href="#" onclick="showSection('troubleshoot');return false" id="nav-troubleshoot"><i class="fas fa-bug"></i> Troubleshooting</a>
  <div class="nav-section">Tools</div>
  <a href="/swagger" style="color:#7c3aed;font-weight:700"><i class="fas fa-flask"></i> API Explorer (Swagger)</a>
  <a href="#" onclick="showSection('terminal');return false" id="nav-terminal"><i class="fas fa-terminal"></i> Terminal Interaktif</a>
</nav>
</aside>

<main id="main">
<div class="topbar">
  <h2 id="page-title"><i class="fas fa-home mr-2" style="color:#2563eb"></i>LPD Seminyak – Dokumentasi API</h2>
  <div style="display:flex;gap:8px;flex-wrap:wrap">
    <span class="badge badge-green">Laravel 5.5</span>
    <span class="badge badge-blue">PHP 7.x</span>
    <span class="badge badge-yellow">SQL Server</span>
    <span class="badge badge-purple">JWT Auth</span>
  </div>
</div>
<div class="content">

<!-- OVERVIEW -->
<section id="section-overview" class="section active">
  <div class="stats-grid">
    <div class="stat-card"><div class="stat-num" style="color:#1d4ed8">30+</div><div class="stat-label">Endpoint API</div></div>
    <div class="stat-card"><div class="stat-num" style="color:#059669">7</div><div class="stat-label">Helper Classes</div></div>
    <div class="stat-card"><div class="stat-num" style="color:#d97706">4</div><div class="stat-label">Grup Layanan</div></div>
    <div class="stat-card"><div class="stat-num" style="color:#7c3aed">11</div><div class="stat-label">Middleware</div></div>
    <div class="stat-card"><div class="stat-num" style="color:#dc2626">25+</div><div class="stat-label">Tabel Database</div></div>
  </div>

  <div class="card">
    <div class="card-header"><i class="fas fa-info-circle" style="color:#3b82f6"></i><h3>Tentang Sistem LPD Seminyak</h3></div>
    <div class="card-body">
      <p style="font-size:14px;line-height:1.8;color:#374151;margin-bottom:16px">
        <strong>LPD Seminyak</strong> adalah backend API berbasis <strong>Laravel 5.5</strong> yang melayani transaksi perbankan digital untuk
        <strong>Lembaga Perkreditan Desa (LPD) Seminyak</strong>, Bali. Sistem ini bertindak sebagai gateway antara aplikasi mobile nasabah (iOS mBanking),
        mesin ATM cardless, dan sistem perbankan BPD Bali (via protokol SNAP BI).
      </p>
      <div class="grid-2">
        <div>
          <h4 style="font-weight:700;margin-bottom:8px;font-size:13px">Fungsi Utama:</h4>
          <ul style="font-size:13px;color:#374151;line-height:2;list-style:disc;padding-left:16px">
            <li>Mobile Banking iOS (registrasi, login, tabungan)</li>
            <li>Transfer antar nasabah LPD</li>
            <li>Transfer ke bank lain (via BPD)</li>
            <li>Pembayaran PPOB (PLN, PDAM, BPJS, Pulsa)</li>
            <li>Transfer-In via Virtual Account (SNAP BI)</li>
            <li>Layanan ATM Cardless (setor/tarik tanpa kartu)</li>
          </ul>
        </div>
        <div>
          <h4 style="font-weight:700;margin-bottom:8px;font-size:13px">Teknologi Stack:</h4>
          <ul style="font-size:13px;color:#374151;line-height:2;list-style:disc;padding-left:16px">
            <li>Framework: Laravel 5.5.* (PHP &gt;= 7.0)</li>
            <li>Database: Microsoft SQL Server (sqlsrv)</li>
            <li>Autentikasi: JWT (tymon/jwt-auth)</li>
            <li>HTTP Client: GuzzleHTTP ~6.0</li>
            <li>Enkripsi: AES-256-CBC + RSA (OpenSSL)</li>
            <li>Signing: HMAC-SHA512 / SHA-256</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-header"><i class="fas fa-network-wired" style="color:#10b981"></i><h3>Topologi Integrasi</h3></div>
    <div class="card-body">
      <table>
        <tr><th>Sistem Eksternal</th><th>Protokol</th><th>Tujuan</th></tr>
        <tr><td><strong>BPD Bali iBank</strong></td><td><span class="inline-code">HTTPS REST</span></td><td>Transfer antar bank (Inquiry + Posting)</td></tr>
        <tr><td><strong>BPD SNAP BI</strong></td><td><span class="inline-code">SNAP ISO-8583</span></td><td>Terima transfer masuk via Virtual Account</td></tr>
        <tr><td><strong>FastPay / RajaBiller</strong></td><td><span class="inline-code">HTTPS JSON</span></td><td>Pembayaran PPOB (tagihan, pulsa)</td></tr>
        <tr><td><strong>IAK Prepaid/Postpaid</strong></td><td><span class="inline-code">HTTPS JSON</span></td><td>Isi ulang pulsa, cek tagihan</td></tr>
        <tr><td><strong>Lamanuna (SmartIndo)</strong></td><td><span class="inline-code">HTTPS REST</span></td><td>Get Token, Insert IP, Insert User</td></tr>
        <tr><td><strong>LPD Core (giosoftech.com)</strong></td><td><span class="inline-code">HTTPS REST</span></td><td>Core banking data nasabah</td></tr>
      </table>
    </div>
  </div>

  <div class="card">
    <div class="card-header"><i class="fas fa-project-diagram" style="color:#7c3aed"></i><h3>Alur Layanan</h3></div>
    <div class="card-body">
      <p style="font-size:13px;font-weight:600;margin-bottom:8px">Mobile Banking iOS:</p>
      <div class="flow">
        <div class="flow-step">App Mobile</div><div class="flow-arrow">&#8594;</div>
        <div class="flow-step">iosAccessMdw<br/><small>(Validasi Token/IP/AES)</small></div><div class="flow-arrow">&#8594;</div>
        <div class="flow-step">Controller</div><div class="flow-arrow">&#8594;</div>
        <div class="flow-step">Helper Class</div><div class="flow-arrow">&#8594;</div>
        <div class="flow-step">SQL Server DB</div>
      </div>
      <p style="font-size:13px;font-weight:600;margin-bottom:8px;margin-top:16px">SNAP Transfer-In BPD:</p>
      <div class="flow">
        <div class="flow-step">BPD Bank</div><div class="flow-arrow">&#8594;</div>
        <div class="flow-step">SNAPCheckTransferIn</div><div class="flow-arrow">&#8594;</div>
        <div class="flow-step">SNAPTransferIn</div><div class="flow-arrow">&#8594;</div>
        <div class="flow-step">Post ke DB</div><div class="flow-arrow">&#8594;</div>
        <div class="flow-step">Nasabah +Saldo</div>
      </div>
      <p style="font-size:13px;font-weight:600;margin-bottom:8px;margin-top:16px">ATM Cardless:</p>
      <div class="flow">
        <div class="flow-step">Mesin ATM</div><div class="flow-arrow">&#8594;</div>
        <div class="flow-step">MachineCheck<br/><small>(IP + Hash)</small></div><div class="flow-arrow">&#8594;</div>
        <div class="flow-step">MachineController</div><div class="flow-arrow">&#8594;</div>
        <div class="flow-step">Update Folio/Mutasi</div>
      </div>
    </div>
  </div>
</section>

<!-- ARCHITECTURE -->
<section id="section-architecture" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-folder-open" style="color:#d97706"></i><h3>Struktur Direktori</h3></div>
    <div class="card-body">
      <pre>lpd_seminyak/
&#9500;&#9472;&#9472; app/
&#9474;   &#9500;&#9472;&#9472; Helpers/          # 7 helper class utama
&#9474;   &#9474;   &#9500;&#9472;&#9472; MBankingHelper.php    # Validasi akses, posting VA, enkripsi
&#9474;   &#9474;   &#9500;&#9472;&#9472; MobileHelper.php      # Login, register, ATM token
&#9474;   &#9474;   &#9500;&#9472;&#9472; SNAPHelper.php        # Validasi signature SNAP BPD
&#9474;   &#9474;   &#9500;&#9472;&#9472; TabunganHelper.php    # Saldo, folio, PIN, daftar rek
&#9474;   &#9474;   &#9500;&#9472;&#9472; TransferHelper.php    # Validasi &amp; log transfer antar bank
&#9474;   &#9474;   &#9500;&#9472;&#9472; iosHelper.php         # Helper utama iOS mBanking (AES)
&#9474;   &#9474;   &#9492;&#9472;&#9472; iosTransferHelper.php # Transfer LPD, log, cek saldo
&#9474;   &#9500;&#9472;&#9472; Http/
&#9474;   &#9474;   &#9500;&#9472;&#9472; Controllers/          # 13 controller
&#9474;   &#9474;   &#9474;   &#9500;&#9472;&#9472; iosTokenCtrl.php          # Get access token iOS
&#9474;   &#9474;   &#9474;   &#9500;&#9472;&#9472; iosAccessCtrl.php         # Register/Login/Logout
&#9474;   &#9474;   &#9474;   &#9500;&#9472;&#9472; iosTabunganCtrl.php       # Daftar rek &amp; mutasi
&#9474;   &#9474;   &#9474;   &#9500;&#9472;&#9472; iosTransferLPDCtrl.php    # Transfer sesama LPD
&#9474;   &#9474;   &#9474;   &#9500;&#9472;&#9472; iosTransferBankCtrl.php   # Transfer ke bank lain
&#9474;   &#9474;   &#9474;   &#9500;&#9472;&#9472; iosPPOBController.php     # Bayar PPOB FastPay
&#9474;   &#9474;   &#9474;   &#9500;&#9472;&#9472; iosPPOBIAKController.php  # PPOB via IAK
&#9474;   &#9474;   &#9474;   &#9500;&#9472;&#9472; iosMachineCtrl.php        # Token cardless iOS
&#9474;   &#9474;   &#9474;   &#9500;&#9472;&#9472; MachineController.php     # ATM Cardless
&#9474;   &#9474;   &#9474;   &#9500;&#9472;&#9472; PPOBController.php        # Callback PPOB
&#9474;   &#9474;   &#9474;   &#9500;&#9472;&#9472; SNAPTransferIn.php        # SNAP Inquiry &amp; Payment
&#9474;   &#9474;   &#9474;   &#9492;&#9472;&#9472; SNAPTokenTransferIn.php   # SNAP Access Token
&#9474;   &#9474;   &#9500;&#9472;&#9472; Middleware/          # 11 middleware
&#9474;   &#9474;   &#9492;&#9472;&#9472; Kernel.php
&#9500;&#9472;&#9472; config/app.php       # Load PEM keys + SNAP response codes
&#9500;&#9472;&#9472; keys/
&#9474;   &#9492;&#9472;&#9472; public_key.pem       # Public key LPD
&#9500;&#9472;&#9472; routes/api.php       # Semua route API
&#9500;&#9472;&#9472; .env                 # Konfigurasi environment
&#9500;&#9472;&#9472; bank.list            # Daftar kode bank nasional
&#9500;&#9472;&#9472; ppob.list            # Produk PPOB tersedia
&#9492;&#9472;&#9472; display.list         # Konfigurasi tampilan app</pre>
    </div>
  </div>

  <div class="card">
    <div class="card-header"><i class="fas fa-map" style="color:#3b82f6"></i><h3>Peta Route API Lengkap</h3></div>
    <div class="card-body">
      <table>
        <tr><th>Path</th><th>Controller@Method</th><th>Middleware</th><th>Fungsi</th></tr>
        <tr><td><span class="inline-code">/v1.0/access-token/b2b</span></td><td>SNAPTokenTransferIn@AccessToken</td><td>snapTokenIn</td><td>Token SNAP BPD</td></tr>
        <tr><td><span class="inline-code">/v1.0/transfer-va/inquiry</span></td><td>SNAPTransferIn@Inquiry</td><td>snapTransferIn</td><td>SNAP Inquiry VA</td></tr>
        <tr><td><span class="inline-code">/v1.0/transfer-va/payment</span></td><td>SNAPTransferIn@Payment</td><td>snapTransferIn</td><td>SNAP Payment VA</td></tr>
        <tr><td><span class="inline-code">/cardless/create-token</span></td><td>MachineController@CreateToken</td><td>machineCheck</td><td>Buat token ATM</td></tr>
        <tr><td><span class="inline-code">/cardless/get-token</span></td><td>MachineController@GetToken</td><td>machineCheck</td><td>Validasi token ATM</td></tr>
        <tr><td><span class="inline-code">/cardless/check-balance</span></td><td>MachineController@CekSaldo</td><td>machineCheck</td><td>Cek saldo ATM</td></tr>
        <tr><td><span class="inline-code">/cardless/cash-debit</span></td><td>MachineController@Penarikan</td><td>machineCheck</td><td>Tarik tunai</td></tr>
        <tr><td><span class="inline-code">/cardless/cash-credit</span></td><td>MachineController@Penyetoran</td><td>machineCheck</td><td>Setor tunai</td></tr>
        <tr><td><span class="inline-code">/cardless/reversal-debit</span></td><td>MachineController@BatalTarik</td><td>machineCheck</td><td>Batal tarik</td></tr>
        <tr><td><span class="inline-code">/cardless/reversal-credit</span></td><td>MachineController@BatalSetor</td><td>machineCheck</td><td>Batal setor</td></tr>
        <tr><td><span class="inline-code">/ppob/callback</span></td><td>PPOBController@Callback</td><td>—</td><td>Callback PPOB</td></tr>
        <tr><td><span class="inline-code">/smart/access-token</span></td><td>iosTokenCtrl@AccessToken</td><td>iosCheckToken</td><td>Token iOS</td></tr>
        <tr><td><span class="inline-code">/smart/access-key</span></td><td>iosTokenCtrl@AccessKey</td><td>iosCheckToken</td><td>Upload public key</td></tr>
        <tr><td><span class="inline-code">/smart/register</span></td><td>iosAccessCtrl@Register</td><td>iosCheckAccess</td><td>Registrasi nasabah</td></tr>
        <tr><td><span class="inline-code">/smart/login</span></td><td>iosAccessCtrl@Login</td><td>iosCheckAccess</td><td>Login nasabah</td></tr>
        <tr><td><span class="inline-code">/smart/logout</span></td><td>iosAccessCtrl@Logout</td><td>iosCheckAccess</td><td>Logout</td></tr>
        <tr><td><span class="inline-code">/smart/update-pass</span></td><td>iosAccessCtrl@UpdatePass</td><td>iosCheckAccess</td><td>Ganti password</td></tr>
        <tr><td><span class="inline-code">/smart/update-pin</span></td><td>iosAccessCtrl@UpdatePin</td><td>iosCheckAccess</td><td>Ganti PIN</td></tr>
        <tr><td><span class="inline-code">/smart/tabungan/account-list</span></td><td>iosTabunganCtrl@ListAccount</td><td>iosCheckAccess</td><td>Daftar rekening</td></tr>
        <tr><td><span class="inline-code">/smart/tabungan/transaction-history</span></td><td>iosTabunganCtrl@HistoryTransaction</td><td>iosCheckAccess</td><td>Riwayat transaksi</td></tr>
        <tr><td><span class="inline-code">/smart/tabungan/mutasi-history</span></td><td>iosTabunganCtrl@HistoryMutasi</td><td>iosCheckAccess</td><td>Mutasi rekening</td></tr>
        <tr><td><span class="inline-code">/smart/transfer-lpd/check</span></td><td>iosTransferLPDCtrl@Check</td><td>iosCheckAccess</td><td>Cek rek tujuan</td></tr>
        <tr><td><span class="inline-code">/smart/transfer-lpd/inquiry</span></td><td>iosTransferLPDCtrl@Inquiry</td><td>iosCheckAccess</td><td>Inquiry transfer LPD</td></tr>
        <tr><td><span class="inline-code">/smart/transfer-lpd/post</span></td><td>iosTransferLPDCtrl@Posting</td><td>iosCheckAccess</td><td>Posting transfer LPD</td></tr>
        <tr><td><span class="inline-code">/smart/transfer-bank/check</span></td><td>iosTransferBankCtrl@Check</td><td>iosCheckAccess</td><td>Cek rek bank tujuan</td></tr>
        <tr><td><span class="inline-code">/smart/transfer-bank/inquiry</span></td><td>iosTransferBankCtrl@Inquiry</td><td>iosCheckAccess</td><td>Inquiry ke BPD</td></tr>
        <tr><td><span class="inline-code">/smart/transfer-bank/post</span></td><td>iosTransferBankCtrl@Posting</td><td>iosCheckAccess</td><td>Posting ke BPD</td></tr>
        <tr><td><span class="inline-code">/smart/ppob/check</span></td><td>iosPPOBController@Check</td><td>iosCheckAccess</td><td>Cek tagihan PPOB</td></tr>
        <tr><td><span class="inline-code">/smart/ppob/request</span></td><td>iosPPOBController@Request</td><td>iosCheckAccess</td><td>Bayar PPOB</td></tr>
        <tr><td><span class="inline-code">/smart/iak/check</span></td><td>iosPPOBIAKController@Check</td><td>iosCheckAccess</td><td>Cek tagihan IAK</td></tr>
        <tr><td><span class="inline-code">/smart/iak/request</span></td><td>iosPPOBIAKController@Request</td><td>iosCheckAccess</td><td>Bayar via IAK</td></tr>
      </table>
    </div>
  </div>
</section>

<!-- INSTALL -->
<section id="section-install" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-server" style="color:#3b82f6"></i><h3>Persyaratan Sistem</h3></div>
    <div class="card-body">
      <div class="grid-2">
        <div>
          <table>
            <tr><th>Komponen</th><th>Versi</th></tr>
            <tr><td>PHP</td><td>7.0 – 7.4 <span class="badge badge-yellow">Wajib 7.4</span></td></tr>
            <tr><td>Microsoft SQL Server</td><td>2014 / 2016+</td></tr>
            <tr><td>Composer</td><td>2.x</td></tr>
            <tr><td>Web Server</td><td>Apache / Nginx</td></tr>
            <tr><td>PHP Extension</td><td>pdo_sqlsrv, mbstring, openssl, curl</td></tr>
            <tr><td>ODBC Driver</td><td>Microsoft ODBC Driver 17/18</td></tr>
          </table>
        </div>
        <div>
          <div class="info-box info-yellow">
            <i class="fas fa-exclamation-triangle"></i>
            <span><strong>Penting:</strong> PHP 8.x TIDAK kompatibel! Gunakan PHP 7.4. IP server harus terdaftar di whitelist BPD Bali dan GIO.</span>
          </div>
          <div class="info-box info-red" style="margin-top:8px">
            <i class="fas fa-ban"></i>
            <span>Database hanya mendukung <strong>Microsoft SQL Server</strong>. MySQL/MariaDB/PostgreSQL tidak didukung.</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-header"><i class="fas fa-list-check" style="color:#10b981"></i><h3>Langkah Instalasi Lengkap</h3></div>
    <div class="card-body">
      <div class="steps">
        <div class="step">
          <div class="step-num">1</div>
          <div class="step-content">
            <h4>Install PHP 7.4 dan ekstensi yang dibutuhkan</h4>
            <p>Sistem memerlukan PHP 7.x. PHP 8.x tidak kompatibel.</p>
            <pre>${e.installPhp}</pre>
          </div>
        </div>
        <div class="step">
          <div class="step-num">2</div>
          <div class="step-content">
            <h4>Install ODBC Driver dan ekstensi PHP SQL Server</h4>
            <p>Driver Microsoft ODBC wajib untuk koneksi ke SQL Server.</p>
            <pre>${e.installOdbc}</pre>
          </div>
        </div>
        <div class="step">
          <div class="step-num">3</div>
          <div class="step-content">
            <h4>Extract Source Code ke Server</h4>
            <pre>${e.extractCode}</pre>
          </div>
        </div>
        <div class="step">
          <div class="step-num">4</div>
          <div class="step-content">
            <h4>Install Dependency via Composer</h4>
            <pre>${e.composerInstall}</pre>
          </div>
        </div>
        <div class="step">
          <div class="step-num">5</div>
          <div class="step-content">
            <h4>Siapkan File .env</h4>
            <pre>${e.envSetup}</pre>
            <p style="margin-top:8px">Konfigurasi minimal yang harus diubah:</p>
            <pre>${e.envMinimal}</pre>
          </div>
        </div>
        <div class="step">
          <div class="step-num">6</div>
          <div class="step-content">
            <h4>Setup Folder Keys (Kunci Kriptografi)</h4>
            <pre>${e.keysSetup}</pre>
          </div>
        </div>
        <div class="step">
          <div class="step-num">7</div>
          <div class="step-content">
            <h4>Set Permission Storage dan Bootstrap</h4>
            <pre>${e.permissions}</pre>
            <p style="margin-top:8px">Buat direktori log yang diperlukan:</p>
            <pre>mkdir -p storage/logs/token storage/logs/transfer-in/inquiry
mkdir -p storage/logs/transfer-in/posting storage/logs/access
mkdir -p storage/logs/tabungan storage/logs/transfer-AR
mkdir -p storage/logs/transfer-AB storage/logs/ppob</pre>
          </div>
        </div>
        <div class="step">
          <div class="step-num">8</div>
          <div class="step-content">
            <h4>Setup Database SQL Server</h4>
            <p>Buat database dan semua tabel yang diperlukan di SQL Server:</p>
            <pre>${e.dbSchema}</pre>
          </div>
        </div>
        <div class="step">
          <div class="step-num">9</div>
          <div class="step-content">
            <h4>Konfigurasi Web Server Apache</h4>
            <pre>${e.apacheConf}</pre>
          </div>
        </div>
        <div class="step">
          <div class="step-num">10</div>
          <div class="step-content">
            <h4>Verifikasi Instalasi</h4>
            <pre>${e.verify}</pre>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-header"><i class="fas fa-windows" style="color:#3b82f6"></i><h3>Instalasi di Windows (XAMPP)</h3></div>
    <div class="card-body">
      <div class="steps">
        <div class="step">
          <div class="step-num">1</div>
          <div class="step-content">
            <h4>Install XAMPP PHP 7.4 + SQL Server Driver</h4>
            <pre>1. Download XAMPP dengan PHP 7.4
2. Download php_sqlsrv_74_nts.dll dan php_pdo_sqlsrv_74_nts.dll
   dari: https://docs.microsoft.com/en-us/sql/connect/php/
3. Letakkan DLL di C:\\xampp\\php\\ext\\
4. Tambahkan di php.ini:
   extension=php_sqlsrv_74_nts.dll
   extension=php_pdo_sqlsrv_74_nts.dll
5. Install Microsoft ODBC Driver 17 for SQL Server</pre>
          </div>
        </div>
        <div class="step">
          <div class="step-num">2</div>
          <div class="step-content">
            <h4>Tempatkan Project dan Konfigurasi .env</h4>
            <pre>1. Ekstrak ke C:\\xampp\\htdocs\\lpd_seminyak
2. Buat .env dari .env.example
3. Update path di .env (gunakan forward slash):
   PUBLIC_KEY_LPD=c:/xampp/htdocs/lpd_seminyak/keys/public_key.pem
   MASTER_BANK_LIST=c:/xampp/htdocs/lpd_seminyak/bank.list
4. Jalankan: composer install --ignore-platform-reqs
5. Jalankan: php artisan key:generate</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- CONFIG -->
<section id="section-config" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-cog" style="color:#64748b"></i><h3>Referensi Lengkap Variabel .env</h3></div>
    <div class="card-body">
      <h4 style="font-weight:700;margin-bottom:12px;font-size:14px;color:#1d4ed8">Aplikasi</h4>
      <table style="margin-bottom:20px">
        <tr><th>Key</th><th>Contoh</th><th>Keterangan</th></tr>
        <tr><td><span class="inline-code">APP_NAME</span></td><td>LPD Seminyak</td><td>Nama aplikasi</td></tr>
        <tr><td><span class="inline-code">APP_ENV</span></td><td>local / production</td><td>Environment</td></tr>
        <tr><td><span class="inline-code">APP_KEY</span></td><td>base64:xxx</td><td>Generate dengan php artisan key:generate</td></tr>
        <tr><td><span class="inline-code">APP_DEBUG</span></td><td>false</td><td>false di production</td></tr>
        <tr><td><span class="inline-code">APP_URL</span></td><td>https://lpdseminyak.biz.id:8000</td><td>URL dasar aplikasi</td></tr>
        <tr><td><span class="inline-code">APP_STATUS</span></td><td>Production</td><td>Indikator status</td></tr>
      </table>
      <h4 style="font-weight:700;margin-bottom:12px;font-size:14px;color:#1d4ed8">Database SQL Server</h4>
      <table style="margin-bottom:20px">
        <tr><th>Key</th><th>Nilai</th><th>Keterangan</th></tr>
        <tr><td><span class="inline-code">DB_CONNECTION</span></td><td>sqlsrv</td><td>WAJIB sqlsrv (bukan mysql)</td></tr>
        <tr><td><span class="inline-code">DB_HOST</span></td><td>localhost</td><td>Hostname SQL Server</td></tr>
        <tr><td><span class="inline-code">DB_PORT</span></td><td>1433</td><td>Port default SQL Server</td></tr>
        <tr><td><span class="inline-code">DB_DATABASE</span></td><td>Giosoft_LPD</td><td>Nama database</td></tr>
        <tr><td><span class="inline-code">DB_USERNAME</span></td><td>sa</td><td>Username SQL Server</td></tr>
        <tr><td><span class="inline-code">DB_PASSWORD</span></td><td>#sa?seminyak</td><td>Password SQL Server</td></tr>
      </table>
      <h4 style="font-weight:700;margin-bottom:12px;font-size:14px;color:#1d4ed8">Path File Kunci dan List</h4>
      <table style="margin-bottom:20px">
        <tr><th>Key</th><th>Keterangan</th></tr>
        <tr><td><span class="inline-code">PUBLIC_KEY_LPD</span></td><td>Path absolut public_key.pem LPD – untuk verifikasi tanda tangan iOS</td></tr>
        <tr><td><span class="inline-code">PUBLIC_KEY_BPD</span></td><td>Path absolut public_key_bpd.pem – verifikasi SNAP signature</td></tr>
        <tr><td><span class="inline-code">MASTER_BANK_LIST</span></td><td>Path ke bank.list – daftar kode bank nasional</td></tr>
        <tr><td><span class="inline-code">MASTER_PPOB_LIST</span></td><td>Path ke ppob.list – daftar produk PPOB tersedia</td></tr>
        <tr><td><span class="inline-code">MASTER_DISPLAY_LIST</span></td><td>Path ke display.list – konfigurasi menu tampilan app</td></tr>
      </table>
      <h4 style="font-weight:700;margin-bottom:12px;font-size:14px;color:#1d4ed8">BPD Bali Integration</h4>
      <table style="margin-bottom:20px">
        <tr><th>Key</th><th>Keterangan</th></tr>
        <tr><td><span class="inline-code">BPD_URL</span></td><td>Base URL production BPD: https://ibank.bpdbali.id/virtualAccount/</td></tr>
        <tr><td><span class="inline-code">BPD_URL_DEV</span></td><td>Base URL dev BPD: https://dev.bpdbali.id:8443/openapi</td></tr>
        <tr><td><span class="inline-code">BPD_PREFIX</span></td><td>989191 – Prefix VA production</td></tr>
        <tr><td><span class="inline-code">BPD_PREFIX_DEV</span></td><td>989067 – Prefix VA dev</td></tr>
        <tr><td><span class="inline-code">BPD_HASHCODE</span></td><td>Secret hashcode untuk signing request ke BPD</td></tr>
        <tr><td><span class="inline-code">BPD_STATICIP1..7</span></td><td>IP statis BPD yang diizinkan</td></tr>
        <tr><td><span class="inline-code">BPD_WHITE_LIST</span></td><td>Format: |ip1|ip2|ip3|</td></tr>
        <tr><td><span class="inline-code">CLIENT_SECRET</span></td><td>Secret untuk HMAC-SHA512 SNAP signing</td></tr>
      </table>
      <h4 style="font-weight:700;margin-bottom:12px;font-size:14px;color:#1d4ed8">Limit Transaksi</h4>
      <table style="margin-bottom:20px">
        <tr><th>Key</th><th>Default</th><th>Keterangan</th></tr>
        <tr><td><span class="inline-code">SALDO_MIN</span></td><td>50000</td><td>Saldo minimum tersisa setelah transaksi (Rp)</td></tr>
        <tr><td><span class="inline-code">MIN_TRANSFER</span></td><td>10000</td><td>Minimum nominal transfer (Rp)</td></tr>
        <tr><td><span class="inline-code">MAX_TRANSFER</span></td><td>1000000</td><td>Maksimum transfer per transaksi (Rp)</td></tr>
      </table>
      <h4 style="font-weight:700;margin-bottom:12px;font-size:14px;color:#1d4ed8">PPOB</h4>
      <table>
        <tr><th>Key</th><th>Keterangan</th></tr>
        <tr><td><span class="inline-code">PPOB_USER / PPOB_PIN</span></td><td>Kredensial FastPay</td></tr>
        <tr><td><span class="inline-code">IAK_USER / IAK_KEY</span></td><td>Kredensial IAK production</td></tr>
        <tr><td><span class="inline-code">IAK_PREPAID_URL</span></td><td>https://prepaid.iak.id/api/top-up</td></tr>
        <tr><td><span class="inline-code">IAK_POSTPAID_URL</span></td><td>https://mobilepulsa.net/api/v1/bill/check</td></tr>
      </table>
    </div>
  </div>
</section>

<!-- AUTH -->
<section id="section-auth" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-key" style="color:#d97706"></i><h3>Sistem Autentikasi</h3></div>
    <div class="card-body">
      <div class="grid-2">
        <div>
          <h4 style="font-weight:700;margin-bottom:8px;font-size:13px">1. iOS mBanking Token</h4>
          <ul style="font-size:13px;color:#374151;line-height:2;list-style:disc;padding-left:16px">
            <li>Dibuat di endpoint <span class="inline-code">/smart/access-token</span></li>
            <li>Disimpan di tabel <span class="inline-code">gmob_token</span></li>
            <li>Valid selama <strong>3 menit</strong></li>
            <li>Header: <span class="inline-code">Authorization: Bearer &lt;token&gt;</span></li>
            <li>Divalidasi oleh middleware <span class="inline-code">iosCheckAccess</span></li>
          </ul>
        </div>
        <div>
          <h4 style="font-weight:700;margin-bottom:8px;font-size:13px">2. SNAP BPD Token (OAuth2 B2B)</h4>
          <ul style="font-size:13px;color:#374151;line-height:2;list-style:disc;padding-left:16px">
            <li>Endpoint: <span class="inline-code">/v1.0/access-token/b2b</span></li>
            <li>Signature: HMAC-SHA512 dari (method:endpoint:token:bodyHash:timestamp)</li>
            <li>IP whitelist BPD Bali wajib cocok</li>
            <li>Divalidasi middleware <span class="inline-code">snapTransferIn</span></li>
          </ul>
        </div>
      </div>
      <h4 style="font-weight:700;font-size:13px;margin-top:16px;margin-bottom:8px">Endpoint: GET ACCESS TOKEN (iOS)</h4>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span>
          <span class="endpoint-path">/smart/access-token</span>
          <span style="font-size:12px;color:#64748b;margin-left:auto">Dapatkan token akses sesi iOS</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <p style="font-size:13px;margin-bottom:8px">Middleware: <span class="badge badge-blue">iosCheckToken</span></p>
          <table style="margin-bottom:12px">
            <tr><th>Header</th><th>Format</th><th>Keterangan</th></tr>
            <tr><td><span class="inline-code">X-CLIENT-ID</span></td><td>Terenkripsi</td><td>Device ID nasabah</td></tr>
            <tr><td><span class="inline-code">X-TIMESTAMP</span></td><td>ISO 8601</td><td>Waktu request</td></tr>
            <tr><td><span class="inline-code">X-SIGNATURE</span></td><td>Base64 RSA-SHA256</td><td>Signature dengan private key app</td></tr>
          </table>
          <pre>// Respon sukses:
{
  "status": "00",
  "message": "Sukses",
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "signature": "base64_signature"
}</pre>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- iOS ACCESS -->
<section id="section-ios-access" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-user-plus" style="color:#3b82f6"></i><h3>iOS – Registrasi, Login, Logout</h3></div>
    <div class="card-body">
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/smart/register</span>
          <span style="font-size:12px;color:#64748b;margin-left:auto">Daftarkan perangkat nasabah</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <div class="info-box info-blue"><i class="fas fa-info-circle"></i><span>Nasabah harus sudah ada di <span class="inline-code">gmob_nasabah</span> dengan status 'R' (Registered belum aktif). Saat registrasi, IMEI device disimpan dan status diubah ke 'A'.</span></div>
          <pre>// Request Headers:
Authorization: Bearer &lt;access_token&gt;
X-TIMESTAMP: 2025-01-01T10:00:00+07:00
X-SIGNATURE: &lt;hmac_sha512&gt;
X-CLIENT-ID: &lt;device_imei_encrypted&gt;

// Respon sukses:
{
  "status": "00",
  "message": "Sukses",
  "customer_id": "enc_noid",
  "customer_name": "Nama Nasabah",
  "customer_pin": "enc_pin",
  "account_list": "enc_[norek#nama#saldo#produk]",
  "bank_key": "enc_BPD_PREFIX&lt;&gt;BPD_HASHCODE",
  "bank_list": "kode1-nama1#kode2-nama2#...",
  "ppob_list": "TYPE;CODE;NAME;NOMINAL;ADMIN#..."
}</pre>
          <table><tr><th>Status</th><th>Keterangan</th></tr>
          <tr><td><span class="badge badge-green">00</span></td><td>Sukses – status berubah ke A</td></tr>
          <tr><td><span class="badge badge-red">10</span></td><td>Data tidak ditemukan / status bukan R</td></tr>
          <tr><td><span class="badge badge-red">68</span></td><td>Timeout</td></tr></table>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/smart/login</span>
          <span style="font-size:12px;color:#64748b;margin-left:auto">Login nasabah</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Validasi: imei_code + username + pass_crypto dari gmob_nasabah
// Respon sukses:
{
  "status": "00",
  "message": "Sukses",
  "account_list": "enc_daftar_rekening",
  "bank_key": "enc_key",
  "bank_list": "...",
  "ppob_list": "..."
}</pre>
          <table><tr><th>Status</th><th>Keterangan</th></tr>
          <tr><td><span class="badge badge-green">00</span></td><td>Login berhasil</td></tr>
          <tr><td><span class="badge badge-red">21</span></td><td>Username/password salah</td></tr>
          <tr><td><span class="badge badge-red">43</span></td><td>Akun diblokir (status B)</td></tr></table>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/smart/logout</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Update gmob_token: status = 'closed', end_time = CURRENT_TIMESTAMP
{ "status": "00", "message": "Logout berhasil." }</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/smart/update-pass</span>
          <span style="font-size:12px;color:#64748b;margin-left:auto">Ganti password</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Query params (terenkripsi AES):
?pass_old=enc_old&amp;pass_new=enc_new
// Sukses: {"status":"00","message":"Sukses"}
// Gagal:  {"status":"01","message":"Kata sandi tidak sama."}</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/smart/update-pin</span>
          <span style="font-size:12px;color:#64748b;margin-left:auto">Ganti PIN transaksi</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Query params (terenkripsi AES):
?pin_old=enc_old&amp;pin_new=enc_new
// Sukses: {"status":"00","message":"Sukses"}
// Gagal:  {"status":"01","message":"PIN tidak sama."}</pre>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- iOS TABUNGAN -->
<section id="section-ios-tabungan" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-piggy-bank" style="color:#10b981"></i><h3>iOS – Layanan Tabungan</h3></div>
    <div class="card-body">
      <div class="info-box info-blue"><i class="fas fa-info-circle"></i><span>Semua endpoint tabungan memerlukan middleware <strong>iosCheckAccess</strong>. Data yang dikembalikan dienkripsi AES-256-CBC.</span></div>
      <div class="endpoint" style="margin-top:16px">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/smart/tabungan/account-list</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Mengambil semua rekening dari gmob_rekening berdasarkan noid
// Saldo diambil real-time dari gtb_folio (SUM credit-debit)
// Format data setelah dekripsi:
[norek#nama_nasabah#saldo#jenis_produk]
// Contoh: [01234567890#I KETUT WIRA#2500000#Tabungan]

// Status error: 84 = data tidak ada, 01 = tidak aktif</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/smart/tabungan/transaction-history</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Request: account_no (enc), start_date, end_date
// Query ke gtb_folio JOIN gum_kdtrs
// Format respon: [tgl#debval#trans_no#amount#keterangan]</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/smart/tabungan/mutasi-history</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Mengambil mutasi dari gak_mutasi / tabel dinamis gte_folio, gtf_folio, dll
// berdasarkan prefix nomor rekening (10/11=Takamas, 20=Sipura, dll)
// Respon terenkripsi AES</pre>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- iOS TRANSFER LPD -->
<section id="section-ios-transfer-lpd" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-exchange-alt" style="color:#7c3aed"></i><h3>iOS – Transfer Sesama Nasabah LPD</h3></div>
    <div class="card-body">
      <p style="font-size:13px;line-height:1.8;margin-bottom:16px">
        3 tahap: <strong>Check &rarr; Inquiry &rarr; Posting</strong>. Setiap tahap memvalidasi hash SHA-256.
      </p>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/smart/transfer-lpd/check</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Request: account_to (enc nomor rekening tujuan)
// Respon: { "status":"00", "product_type":"Tabungan", "customer_name":"Nama" }
// Error: 01 = rekening tujuan tidak aktif</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/smart/transfer-lpd/inquiry</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Hash formula: SHA-256(from+to+amount+namaDari+namaTujuan+remark+BPD_HASHCODE)
{
  "account_from": "enc_norek_asal",
  "account_to": "enc_norek_tujuan",
  "amount": "enc_nominal",
  "name_from": "enc_nama_pengirim",
  "name_to": "enc_nama_penerima",
  "remark": "enc_keterangan",
  "hash_code": "sha256_hash"
}
// Sukses: { "status":"00", "balance": 2500000 }
// Error: 62=hash salah, 01=tdk aktif, 04=saldo kurang, 25=min, 26=limit</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/smart/transfer-lpd/post</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Tambahan field: ref_no (referensi unik), pin (enc)
// Proses: insert ke gmob_transfer, update folio &amp; mutasi
// Sukses: { "status":"00", "trans_no":"REF123", "amount":500000, "balance":2000000 }
// Error: 63=hash salah, 23=duplikat ref, 24=gagal proses</pre>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- iOS TRANSFER BANK -->
<section id="section-ios-transfer-bank" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-landmark" style="color:#3b82f6"></i><h3>iOS – Transfer ke Bank Lain via BPD</h3></div>
    <div class="card-body">
      <p style="font-size:13px;margin-bottom:16px">Transfer dari rekening LPD ke bank lain (BNI, BRI, Mandiri, dll) melalui jaringan BPD Bali. Biaya transfer dari tabel <span class="inline-code">gcore_bankcode</span>.</p>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/smart/transfer-bank/check</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Request: bank_code, account_to (enc), hash_code
// Proses: request ke BPD Account Inquiry External
// Respon: { "status":"00", "account_name":"NAMA PENERIMA", "bank_name":"BNI" }</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/smart/transfer-bank/inquiry</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Hash: SHA-256(from+bankCode+to+amount+BPD_HASHCODE)
// Respon: { "status":"00", "transfer_cost":6500, "balance":2500000 }
// Error: 51/52/53=hash salah, 40=saldo kurang</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/smart/transfer-bank/post</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Alur: Debit folio LPD -&gt; Kirim ke BPD API -&gt; Catat gcore_transfer
// BPD response code sukses: 2001800
// Error: 45=duplikat ref, 68=BPD timeout</pre>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- iOS PPOB -->
<section id="section-ios-ppob" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-bolt" style="color:#d97706"></i><h3>iOS – PPOB (Pembayaran Tagihan &amp; Pulsa)</h3></div>
    <div class="card-body">
      <p style="font-size:13px;margin-bottom:16px">Gateway: <strong>FastPay (RajaBiller)</strong> dan <strong>IAK</strong>. Fee admin: <strong>Rp 2.000</strong>/transaksi.</p>
      <h4 style="font-weight:700;font-size:13px;margin-bottom:8px">Produk yang didukung:</h4>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px">
        <span class="badge badge-blue">PLN Prabayar/Pascabayar</span>
        <span class="badge badge-blue">PDAM</span>
        <span class="badge badge-blue">BPJS Kesehatan</span>
        <span class="badge badge-blue">Telkom</span>
        <span class="badge badge-blue">Paket Internet</span>
        <span class="badge badge-blue">Pulsa (Prepaid)</span>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/smart/ppob/check</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Request: account_no (enc), product_code, customer_id (enc)
// Endpoint FastPay: POST https://rajabiller.fastpay.co.id/transaksi/api_json.php
// Respon: { "status":"00", "tagihan":250000, "admin":2000, "customer_name":"NAMA" }
// Error: 04=saldo kurang, 05=deposit PPOB kurang, 26=limit harian</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/smart/ppob/request</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Tambahan: nominal (enc), hash_code, pin (enc)
// Proses: validasi -&gt; create gmob_payment -&gt; call FastPay API -&gt; update folio
// Respon: { "status":"00", "tagihan":250000, "admin":2000, "remark":"PLN|ID|TOKEN" }</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/smart/iak/check &amp; /smart/iak/request</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// IAK API (idalamat.com):
// Prepaid: POST https://prepaid.iak.id/api/top-up
// Postpaid: POST https://mobilepulsa.net/api/v1/bill/check
// Signature IAK: MD5(username + apikey + ref_id)
// Respon format sama dengan /ppob/*</pre>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- SNAP -->
<section id="section-snap" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-plug" style="color:#3b82f6"></i><h3>SNAP BI – Transfer Masuk via VA BPD</h3></div>
    <div class="card-body">
      <p style="font-size:13px;margin-bottom:16px">Implementasi <strong>SNAP BI (Standar Nasional Open API Pembayaran)</strong> untuk menerima transfer dari bank lain menggunakan Virtual Account BPD. Prefix VA production: <span class="inline-code">989191</span>.</p>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/v1.0/access-token/b2b</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Headers: X-TIMESTAMP, X-CLIENT-KEY, X-SIGNATURE
// Body: { "grantType": "client_credentials" }
// Respon: {
//   "responseCode": "2002500",
//   "accessToken": "token_string",
//   "tokenType": "BearerToken",
//   "expiresIn": 900
// }</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/v1.0/transfer-va/inquiry</span>
          <span class="badge badge-yellow" style="margin-left:8px">Service Code 24</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Headers: Authorization: Bearer &lt;token&gt;, X-TIMESTAMP, X-SIGNATURE
// X-PARTNER-ID, X-EXTERNAL-ID
// HMAC-SHA512: POST:/v1.0/transfer-va/inquiry:token:sha256(body):timestamp

// Body:
{
  "partnerServiceId": "  989191",
  "customerNo": "012345678901234",
  "virtualAccountNo": "989191012345678901234",
  "inquiryRequestId": "unique-id",
  "amount": { "value": "500000.00", "currency": "IDR" },
  "additionalInfo": { "terminalType": "01", "terminalId": "ATM001" }
}

// Sukses (200): responseCode: "2002400"
// virtualAccountName: nama nasabah, inquiryStatus: "00"</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/v1.0/transfer-va/payment</span>
          <span class="badge badge-yellow" style="margin-left:8px">Service Code 25</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Proses: kredit nasabah di gtb_folio + gak_mutasi + gcore_transfer
// Body: paymentRequestId, paidAmount, sourceAccountNo, referenceNo
// Sukses (200): responseCode: "2002500", paymentFlagStatus: "00"</pre>
        </div>
      </div>
      <h4 style="font-weight:700;font-size:13px;margin-top:16px;margin-bottom:8px">Kode Respons SNAP:</h4>
      <table>
        <tr><th>Code</th><th>Arti</th></tr>
        <tr><td>2002400 / 2002500</td><td>Sukses inquiry / payment</td></tr>
        <tr><td>4002400</td><td>Missing mandatory field</td></tr>
        <tr><td>4012400</td><td>Invalid signature</td></tr>
        <tr><td>4012401</td><td>Invalid access token</td></tr>
        <tr><td>4032400</td><td>IP tidak dikenal</td></tr>
        <tr><td>4032415</td><td>Rekening tidak aktif</td></tr>
        <tr><td>4092401</td><td>Duplicate reference</td></tr>
      </table>
    </div>
  </div>
</section>

<!-- ATM -->
<section id="section-atm" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-credit-card" style="color:#ea580c"></i><h3>ATM Cardless – Setor &amp; Tarik Tanpa Kartu</h3></div>
    <div class="card-body">
      <div class="info-box info-yellow"><i class="fas fa-exclamation-triangle"></i>
        <span>Hash: <strong>SHA-256(ATM_HASHCODE + token + account_no + transaction_datetime)</strong>. IP harus ada di ATM_WHITE_LIST.</span>
      </div>
      <div class="endpoint" style="margin-top:16px">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/cardless/create-token</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Dari app mobile iOS, buat token 6 digit untuk digunakan di ATM
// Request: account_no, token, hash_code
// Proses: insert/update gmob_token status='open'
// Respon: { "status":"00", "data":"TOKEN6DIGIT" }</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/cardless/get-token</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Dari ATM, validasi token yang dimasukkan nasabah
// Request: token, transaction_code (01=tarik, 02=setor), hash_code
// Respon: { "status":"00", "account_no":"norek", "customer_name":"NAMA" }
// Error: 30=hash salah, 40=IP tidak dikenal</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/cardless/cash-debit</span>
          <span style="font-size:12px;color:#64748b;margin-left:auto">Tarik tunai</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Request: account_no, token, amount, transaction_datetime, hash_code
// Proses: kurangi saldo, update gtb_folio &amp; gak_mutasi
// Respon: { "responseCode":"00", "balance":2000000 }
// Error: 61=saldo kurang, 14=rekening tidak aktif</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/cardless/cash-credit</span>
          <span style="font-size:12px;color:#64748b;margin-left:auto">Setor tunai</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Proses: tambah saldo, update gtb_folio &amp; gak_mutasi
// Respon: { "responseCode":"00", "balance":3000000 }</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/cardless/reversal-debit &amp; /reversal-credit</span>
          <span style="font-size:12px;color:#64748b;margin-left:auto">Batal transaksi</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Hapus record folio &amp; mutasi yang sudah diproses
// Request: account_no, token, trans_no, hash_code
// Respon: { "responseCode": "00" }</pre>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- PPOB CALLBACK -->
<section id="section-ppob-callback" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-reply" style="color:#64748b"></i><h3>PPOB Callback</h3></div>
    <div class="card-body">
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/ppob/callback</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Menerima callback dari FastPay / provider PPOB
// Selalu mengembalikan:
{ "status": "99", "rc": "&lt;rc_dari_provider&gt;" }</pre>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- DATABASE -->
<section id="section-database" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-database" style="color:#3b82f6"></i><h3>Skema Database SQL Server: Giosoft_LPD</h3></div>
    <div class="card-body">
      <div class="info-box info-yellow"><i class="fas fa-exclamation-triangle"></i>
        <span>Beberapa query lintas database: <span class="inline-code">Giosoft_Dev.dbo.gtb_folio</span></span>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px">
        <div class="db-table">
          <div class="db-table-header">gmob_nasabah</div>
          <div class="db-table-body">
            <div class="db-col"><span class="db-col-name">noid</span><span class="db-col-type">varchar PK</span><span class="db-col-desc">ID unik nasabah</span></div>
            <div class="db-col"><span class="db-col-name">nama</span><span class="db-col-type">varchar</span><span class="db-col-desc">Nama nasabah</span></div>
            <div class="db-col"><span class="db-col-name">norek</span><span class="db-col-type">varchar</span><span class="db-col-desc">Nomor rekening utama</span></div>
            <div class="db-col"><span class="db-col-name">username</span><span class="db-col-type">varchar</span><span class="db-col-desc">Username login</span></div>
            <div class="db-col"><span class="db-col-name">pass_crypto</span><span class="db-col-type">varchar</span><span class="db-col-desc">Password (md5)</span></div>
            <div class="db-col"><span class="db-col-name">pin_crypto</span><span class="db-col-type">varchar</span><span class="db-col-desc">PIN transaksi</span></div>
            <div class="db-col"><span class="db-col-name">imei_code</span><span class="db-col-type">varchar</span><span class="db-col-desc">IMEI / device ID</span></div>
            <div class="db-col"><span class="db-col-name">status</span><span class="db-col-type">char(1)</span><span class="db-col-desc">R=Register A=Aktif B=Blokir</span></div>
            <div class="db-col"><span class="db-col-name">aes_key</span><span class="db-col-type">varchar</span><span class="db-col-desc">Kunci AES-256 per perangkat</span></div>
            <div class="db-col"><span class="db-col-name">aes_iv</span><span class="db-col-type">varchar</span><span class="db-col-desc">IV AES</span></div>
            <div class="db-col"><span class="db-col-name">max_transfer</span><span class="db-col-type">bigint</span><span class="db-col-desc">Limit transfer harian</span></div>
            <div class="db-col"><span class="db-col-name">scramble_code</span><span class="db-col-type">varchar</span><span class="db-col-desc">Kode scramble enkripsi</span></div>
            <div class="db-col"><span class="db-col-name">version</span><span class="db-col-type">varchar</span><span class="db-col-desc">Versi app iOS nasabah</span></div>
          </div>
        </div>
        <div class="db-table">
          <div class="db-table-header">gmob_token</div>
          <div class="db-table-body">
            <div class="db-col"><span class="db-col-name">id</span><span class="db-col-type">int PK</span><span class="db-col-desc">Auto increment</span></div>
            <div class="db-col"><span class="db-col-name">account_no</span><span class="db-col-type">varchar</span><span class="db-col-desc">IMEI / noid nasabah</span></div>
            <div class="db-col"><span class="db-col-name">token</span><span class="db-col-type">varchar</span><span class="db-col-desc">Token string</span></div>
            <div class="db-col"><span class="db-col-name">date_time</span><span class="db-col-type">datetime</span><span class="db-col-desc">Waktu pembuatan</span></div>
            <div class="db-col"><span class="db-col-name">status</span><span class="db-col-type">varchar</span><span class="db-col-desc">open/closed</span></div>
            <div class="db-col"><span class="db-col-name">end_time</span><span class="db-col-type">datetime</span><span class="db-col-desc">Waktu logout</span></div>
          </div>
        </div>
        <div class="db-table">
          <div class="db-table-header">gtb_folio</div>
          <div class="db-table-body">
            <div class="db-col"><span class="db-col-name">linker</span><span class="db-col-type">varchar</span><span class="db-col-desc">Nomor rekening</span></div>
            <div class="db-col"><span class="db-col-name">mutasi_date</span><span class="db-col-type">date</span><span class="db-col-desc">Tanggal audit</span></div>
            <div class="db-col"><span class="db-col-name">trans_date</span><span class="db-col-type">datetime</span><span class="db-col-desc">Tanggal transaksi</span></div>
            <div class="db-col"><span class="db-col-name">debit</span><span class="db-col-type">decimal</span><span class="db-col-desc">Jumlah debit</span></div>
            <div class="db-col"><span class="db-col-name">credit</span><span class="db-col-type">decimal</span><span class="db-col-desc">Jumlah kredit</span></div>
            <div class="db-col"><span class="db-col-name">saldo</span><span class="db-col-type">decimal</span><span class="db-col-desc">Saldo setelah transaksi</span></div>
            <div class="db-col"><span class="db-col-name">trans_no</span><span class="db-col-type">varchar</span><span class="db-col-desc">Nomor referensi</span></div>
            <div class="db-col"><span class="db-col-name">remark</span><span class="db-col-type">varchar</span><span class="db-col-desc">Keterangan (max 50)</span></div>
            <div class="db-col"><span class="db-col-name">debit_val</span><span class="db-col-type">char(1)</span><span class="db-col-desc">T=debit F=kredit</span></div>
          </div>
        </div>
        <div class="db-table">
          <div class="db-table-header">gcore_transfer</div>
          <div class="db-table-body">
            <div class="db-col"><span class="db-col-name">transfer_code</span><span class="db-col-type">varchar PK</span><span class="db-col-desc">Kode unik transfer</span></div>
            <div class="db-col"><span class="db-col-name">transfer_type</span><span class="db-col-type">varchar</span><span class="db-col-desc">IN/OUT</span></div>
            <div class="db-col"><span class="db-col-name">norek</span><span class="db-col-type">varchar</span><span class="db-col-desc">Rekening LPD</span></div>
            <div class="db-col"><span class="db-col-name">amount</span><span class="db-col-type">decimal</span><span class="db-col-desc">Nominal</span></div>
            <div class="db-col"><span class="db-col-name">referenceNumber</span><span class="db-col-type">varchar</span><span class="db-col-desc">Nomor referensi BPD</span></div>
            <div class="db-col"><span class="db-col-name">responseCode</span><span class="db-col-type">varchar</span><span class="db-col-desc">Kode respons</span></div>
            <div class="db-col"><span class="db-col-name">destinationBankCode</span><span class="db-col-type">varchar</span><span class="db-col-desc">Kode bank tujuan</span></div>
          </div>
        </div>
      </div>
      <h4 style="font-weight:700;margin:16px 0 8px;font-size:14px">Tabel Pendukung Lainnya:</h4>
      <table>
        <tr><th>Tabel</th><th>Fungsi</th></tr>
        <tr><td><span class="inline-code">gmob_transfer</span></td><td>Transfer sesama LPD (AR)</td></tr>
        <tr><td><span class="inline-code">gmob_payment</span></td><td>Transaksi PPOB</td></tr>
        <tr><td><span class="inline-code">gmob_rekening</span></td><td>Daftar rekening per nasabah</td></tr>
        <tr><td><span class="inline-code">gmob_responcode</span></td><td>Master kode dan pesan respons</td></tr>
        <tr><td><span class="inline-code">gmob_counter</span></td><td>Counter nomor referensi per periode</td></tr>
        <tr><td><span class="inline-code">gum_config</span></td><td>Tanggal audit + limit transfer global</td></tr>
        <tr><td><span class="inline-code">gak_mutasi</span></td><td>Mutasi GL akuntansi</td></tr>
        <tr><td><span class="inline-code">gak_bookstatus</span></td><td>Status buka/tutup buku harian</td></tr>
        <tr><td><span class="inline-code">gcore_bankcode</span></td><td>Kode bank + biaya transfer</td></tr>
        <tr><td><span class="inline-code">gcore_log</span></td><td>Log detail transaksi VA</td></tr>
        <tr><td><span class="inline-code">gppob_produk</span></td><td>Master produk PPOB</td></tr>
        <tr><td><span class="inline-code">gtb_nasabah</span></td><td>Data nasabah tabungan core</td></tr>
        <tr><td><span class="inline-code">gkr_debitor</span></td><td>Data debitur (pinjaman)</td></tr>
        <tr><td><span class="inline-code">gdp_deposan</span></td><td>Data deposito</td></tr>
      </table>
    </div>
  </div>
</section>

<!-- RESPONSE CODES -->
<section id="section-response-codes" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-list-ol" style="color:#3b82f6"></i><h3>Daftar Kode Respons Sistem</h3></div>
    <div class="card-body">
      <div class="grid-2">
        <div>
          <h4 style="font-weight:700;margin-bottom:8px;font-size:13px">iOS mBanking:</h4>
          <table>
            <tr><th>Kode</th><th>Arti</th></tr>
            <tr><td><span class="badge badge-green">00</span></td><td>Sukses</td></tr>
            <tr><td><span class="badge badge-red">01</span></td><td>Rekening tidak aktif</td></tr>
            <tr><td><span class="badge badge-red">04</span></td><td>Saldo tidak cukup</td></tr>
            <tr><td><span class="badge badge-red">05</span></td><td>Deposit PPOB kurang</td></tr>
            <tr><td><span class="badge badge-red">10</span></td><td>Data tidak ditemukan</td></tr>
            <tr><td><span class="badge badge-red">21</span></td><td>Username/password salah</td></tr>
            <tr><td><span class="badge badge-red">23</span></td><td>Referensi duplikat</td></tr>
            <tr><td><span class="badge badge-red">24</span></td><td>Gagal memproses</td></tr>
            <tr><td><span class="badge badge-red">25</span></td><td>Nominal di bawah minimum</td></tr>
            <tr><td><span class="badge badge-red">26</span></td><td>Melebihi limit harian</td></tr>
            <tr><td><span class="badge badge-red">43</span></td><td>Akun diblokir</td></tr>
            <tr><td><span class="badge badge-red">51/52/53</span></td><td>Hash mismatch (check/inquiry/post)</td></tr>
            <tr><td><span class="badge badge-red">54</span></td><td>PIN salah</td></tr>
            <tr><td><span class="badge badge-red">62/63</span></td><td>Hash LPD (inquiry/posting)</td></tr>
            <tr><td><span class="badge badge-red">68</span></td><td>Timeout / error internal</td></tr>
            <tr><td><span class="badge badge-red">84</span></td><td>Data tidak ditemukan</td></tr>
          </table>
        </div>
        <div>
          <h4 style="font-weight:700;margin-bottom:8px;font-size:13px">ATM Cardless:</h4>
          <table style="margin-bottom:16px">
            <tr><th>Kode</th><th>Arti</th></tr>
            <tr><td><span class="badge badge-green">00</span></td><td>Sukses</td></tr>
            <tr><td><span class="badge badge-red">14</span></td><td>Status rekening tidak valid</td></tr>
            <tr><td><span class="badge badge-red">30</span></td><td>Hash code salah</td></tr>
            <tr><td><span class="badge badge-red">40</span></td><td>IP tidak ada di whitelist</td></tr>
            <tr><td><span class="badge badge-red">61</span></td><td>Saldo tidak cukup</td></tr>
          </table>
          <h4 style="font-weight:700;margin-bottom:8px;font-size:13px">SNAP BI:</h4>
          <table>
            <tr><th>Code</th><th>Arti</th></tr>
            <tr><td>2002400/2002500</td><td>Sukses inquiry/payment</td></tr>
            <tr><td>4002400</td><td>Missing mandatory field</td></tr>
            <tr><td>4012400</td><td>Invalid signature</td></tr>
            <tr><td>4012401</td><td>Invalid access token</td></tr>
            <tr><td>4032415</td><td>Rekening tidak aktif</td></tr>
            <tr><td>4092401</td><td>Duplicate reference</td></tr>
            <tr><td>5002500</td><td>General error</td></tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- SECURITY -->
<section id="section-security" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-shield-alt" style="color:#10b981"></i><h3>Mekanisme Keamanan &amp; Enkripsi</h3></div>
    <div class="card-body">
      <h4 style="font-weight:700;font-size:14px;margin-bottom:12px;color:#1d4ed8">1. AES-256-CBC per Perangkat (iOS)</h4>
      <pre>// Key dibuat saat registrasi, disimpan di gmob_nasabah:
$key = md5($timestamp . $clientID . "KEY");
$iv  = md5($timestamp . $clientID . "IV");
$cs  = md5($timestamp . $clientID . "CS");

// Enkripsi: openssl_encrypt(data, AES-256-CBC, key, RAW, iv) -&gt; base64
// Dekripsi: base64_decode -&gt; openssl_decrypt(...)</pre>

      <h4 style="font-weight:700;font-size:14px;margin-bottom:12px;margin-top:20px;color:#1d4ed8">2. RSA Signature Verifikasi (iosTokenCtrl)</h4>
      <pre>// Saat get access token:
$strToSign = $clientID . "|" . $timestamp;
$isValid = openssl_verify($strToSign, base64_decode($signature),
  config('app.public_key_lpd'), OPENSSL_ALGO_SHA256);
// Public key dimuat dari env PUBLIC_KEY_LPD saat boot</pre>

      <h4 style="font-weight:700;font-size:14px;margin-bottom:12px;margin-top:20px;color:#1d4ed8">3. HMAC-SHA512 (SNAP &amp; mBanking)</h4>
      <pre>// SNAP Transfer VA:
$strToSign = "POST:" . $endpoint . ":" . $token . ":" . sha256(body) . ":" . $timestamp;
$signHash = base64_encode(hash_hmac("sha512", $strToSign, CLIENT_SECRET, true));

// mBanking access:
$strToSign = $partnerID . "|" . $accessToken;
$signHash = base64_encode(hash_hmac("sha512", $strToSign, CLIENT_SECRET));</pre>

      <h4 style="font-weight:700;font-size:14px;margin-bottom:12px;margin-top:20px;color:#1d4ed8">4. SHA-256 Hash Validasi Transfer</h4>
      <pre>// Transfer LPD Inquiry:
SHA-256(fromNorek + toNorek + amount + fromName + toName + remark + BPD_HASHCODE)

// Transfer Bank:
SHA-256(fromNorek + bankCode + toNorek + amount + BPD_HASHCODE)

// ATM:
SHA-256(ATM_HASHCODE + token + accountNo + datetime)</pre>

      <h4 style="font-weight:700;font-size:14px;margin-bottom:12px;margin-top:20px;color:#1d4ed8">5. Whitelist IP per Layanan</h4>
      <table>
        <tr><th>Layanan</th><th>Env Variable</th><th>Middleware</th></tr>
        <tr><td>SNAP BPD</td><td>BPD_STATICIP1..7</td><td>SNAPCheckTransferIn</td></tr>
        <tr><td>Mobile Banking</td><td>BPD_WHITE_LIST + GIO_WHITE_LIST</td><td>iosAccessMdw</td></tr>
        <tr><td>ATM Cardless</td><td>GIO_WHITE_LIST + ATM_WHITE_LIST</td><td>MachineCheck</td></tr>
      </table>

      <h4 style="font-weight:700;font-size:14px;margin-bottom:12px;margin-top:20px;color:#1d4ed8">6. Pembatasan Waktu Layanan</h4>
      <pre>// Di iosAccessMdw::check_access():
// Transfer diblokir: 00:00 - 05:00 (jam 0-4)
// PPOB diblokir:     01:00 - 03:00 (jam 1-2)</pre>
    </div>
  </div>
</section>

<!-- MIDDLEWARE -->
<section id="section-middleware" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-filter" style="color:#7c3aed"></i><h3>Daftar Middleware</h3></div>
    <div class="card-body">
      <table>
        <tr><th>Alias</th><th>Class</th><th>Digunakan Untuk</th><th>Validasi</th></tr>
        <tr><td><span class="inline-code">iosCheckToken</span></td><td>iosTokenMdw</td><td>/smart/access-token</td><td>Signature RSA, client ID, IP</td></tr>
        <tr><td><span class="inline-code">iosCheckAccess</span></td><td>iosAccessMdw</td><td>Semua /smart/*</td><td>Token 3 menit, IP, URL, jam, AES keys</td></tr>
        <tr><td><span class="inline-code">snapTokenIn</span></td><td>SNAPCheckTokenIn</td><td>/v1.0/access-token/b2b</td><td>Field grantType</td></tr>
        <tr><td><span class="inline-code">snapTransferIn</span></td><td>SNAPCheckTransferIn</td><td>/v1.0/transfer-va/*</td><td>HMAC-SHA512, token, IP BPD</td></tr>
        <tr><td><span class="inline-code">machineCheck</span></td><td>MachineCheck</td><td>/cardless/*</td><td>IP whitelist ATM, SHA-256 hash</td></tr>
      </table>
      <div class="info-box info-blue" style="margin-top:16px">
        <i class="fas fa-info-circle"></i>
        <div>
          <strong>Alur iosAccessMdw:</strong>
          <ol style="margin-top:8px;padding-left:16px;line-height:2;font-size:12px">
            <li>Init global params via <span class="inline-code">iosHelper::Gio_SetParam()</span></li>
            <li>Tentukan log path berdasarkan URI</li>
            <li>Insert log request ke file harian (storage/logs/)</li>
            <li>Buat atau ambil AES key/IV/CS dari DB per device</li>
            <li>Ekstrak headers: X-CLIENT-ID, X-TIMESTAMP, X-PARTNER-ID</li>
            <li>Validasi via check_access(): partner, token(3mnt), IP, URL, jam</li>
            <li>Set $_POST['status'] dan $_POST['message']</li>
            <li>Teruskan request ke controller</li>
            <li>Tambahkan CORS headers ke response</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- HELPERS -->
<section id="section-helpers" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-tools" style="color:#ea580c"></i><h3>Deskripsi Helper Classes</h3></div>
    <div class="card-body">
      <table>
        <tr><th>Helper</th><th>Ukuran</th><th>Fungsi Utama</th></tr>
        <tr>
          <td><strong>MBankingHelper</strong></td><td>~25KB</td>
          <td>checkAccess() SNAP/mBanking, Gio_PostTransferVA(), enkripsi Gio_Encrypt/Decrypt/Decode(), Gio_InsertIntoFolio/Mutasi(), logging</td>
        </tr>
        <tr>
          <td><strong>MobileHelper</strong></td><td>~16KB</td>
          <td>Check_Register/Login/OTP(), Change_Password/PIN(), ATM_GetToken/ValidToken(), Gio_InsertIntoFolio/Mutasi(), Gio_GetNoReferensi()</td>
        </tr>
        <tr>
          <td><strong>SNAPHelper</strong></td><td>~16KB</td>
          <td>checkTransferVA() validasi SNAP, Gio_PostTransferVA(), log per external ID, Gio_CheckToken(), Gio_GetReferenceVA()</td>
        </tr>
        <tr>
          <td><strong>TabunganHelper</strong></td><td>~14KB</td>
          <td>Check_StatusTabungan/Rekening(), Get_FolioTabungan/Pinjaman/Deposito(), Gio_CheckSaldo/Pin(), GetModulCode(), Gio_InsTransaksiPPOB()</td>
        </tr>
        <tr>
          <td><strong>TransferHelper</strong></td><td>~9KB</td>
          <td>checkTransferIn() (legacy), Gio_GetNasabah() cari by VA, Gio_InqTransferIn/PostTransferIn(), Ins_TransferAR(), logging</td>
        </tr>
        <tr>
          <td><strong>iosHelper</strong></td><td>~14KB</td>
          <td>Gio_CheckToken() 3 menit, Gio_CreateKeyAndIv/GetKeyAndIv(), Gio_Encrypt/Decrypt() AES, Get_DaftarRek(), Gio_GetConfig(), Gio_SetParam()</td>
        </tr>
        <tr>
          <td><strong>iosTransferHelper</strong></td><td>~7KB</td>
          <td>Ins_TransferAR(), Gio_CheckSaldo() + limit, Gio_CheckPIN(), Gio_InsTransferARLog(), Gio_InsTransferVALog(), Get_TransferCost()</td>
        </tr>
      </table>
      <h4 style="font-weight:700;font-size:14px;margin-top:20px;margin-bottom:8px">Modul Rekening (GetModulCode / prefix norek):</h4>
      <table>
        <tr><th>Prefix</th><th>Kode Modul</th><th>Jenis Rekening</th></tr>
        <tr><td>01, 02, 03 (lainnya)</td><td>b</td><td>Tabungan</td></tr>
        <tr><td>10, 11</td><td>e</td><td>Takamas (tabungan khusus)</td></tr>
        <tr><td>20</td><td>f</td><td>Sipura</td></tr>
        <tr><td>30</td><td>g</td><td>Sitirta</td></tr>
        <tr><td>40</td><td>h</td><td>Simapan</td></tr>
        <tr><td>33, 34</td><td>D</td><td>Deposito</td></tr>
      </table>
    </div>
  </div>
</section>

<!-- TROUBLESHOOT -->
<section id="section-troubleshoot" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-bug" style="color:#ef4444"></i><h3>Panduan Troubleshooting</h3></div>
    <div class="card-body">
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <i class="fas fa-exclamation-circle" style="color:#ef4444"></i>
          <span style="font-weight:600;font-size:13px;margin-left:8px">Error: "could not find driver" (SQL Server)</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Install ODBC Driver 17 + ekstensi PHP sqlsrv:
curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -
sudo ACCEPT_EULA=Y apt-get install msodbcsql17 unixodbc-dev
sudo pecl install sqlsrv pdo_sqlsrv
echo "extension=sqlsrv.so" &gt;&gt; /etc/php/7.4/cli/php.ini</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <i class="fas fa-exclamation-circle" style="color:#ef4444"></i>
          <span style="font-weight:600;font-size:13px;margin-left:8px">Error: file_get_contents() saat boot (config/app.php)</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Penyebab: Path PUBLIC_KEY_LPD / MASTER_BANK_LIST tidak valid
// Pastikan file ada dan .env menggunakan path absolut yang benar:
ls -la /path/to/keys/public_key.pem
chmod 644 keys/public_key.pem</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <i class="fas fa-exclamation-circle" style="color:#d97706"></i>
          <span style="font-weight:600;font-size:13px;margin-left:8px">Warning: Deprecated PHP 8.x</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// SOLUSI: Gunakan PHP 7.4 (sangat disarankan, jangan PHP 8.x)
sudo update-alternatives --config php
# Pilih php7.4</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <i class="fas fa-exclamation-circle" style="color:#d97706"></i>
          <span style="font-weight:600;font-size:13px;margin-left:8px">Error: Composer autoload Helper not found</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Penyebab: case-sensitive path di Linux
// Path di composer.json: "App/Helpers/..." (huruf A besar)
// Path aktual: "app/Helpers/..." (huruf a kecil)
// Solusi: composer dump-autoload --no-scripts</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <i class="fas fa-exclamation-circle" style="color:#d97706"></i>
          <span style="font-weight:600;font-size:13px;margin-left:8px">Error 403: IP tidak dikenal</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Tambahkan IP development ke .env:
GIO_WHITE_LIST=|103.66.86.234|127.0.0.1|YOUR_DEV_IP

// Atau di iosAccessMdw.php check_access():
// Tambahkan kondisi || $noip == "127.0.0.1"</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <i class="fas fa-exclamation-circle" style="color:#3b82f6"></i>
          <span style="font-weight:600;font-size:13px;margin-left:8px">Token selalu expired / invalid</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Token valid 3 menit dari pembuatan (iosHelper::Gio_CheckToken)
// Solusi: 
sudo ntpdate -u pool.ntp.org  // Sinkronkan waktu server
// Pastikan ada record di gmob_token yang masih fresh</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <i class="fas fa-exclamation-circle" style="color:#3b82f6"></i>
          <span style="font-weight:600;font-size:13px;margin-left:8px">Storage / log permission error</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>sudo chmod -R 775 storage/ bootstrap/cache/
sudo chown -R www-data:www-data storage/
mkdir -p storage/logs/{token,transfer-in/inquiry,transfer-in/posting,access,tabungan,transfer-AR,transfer-AB,ppob}</pre>
        </div>
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header"><i class="fas fa-file-alt" style="color:#64748b"></i><h3>Lokasi Log Files</h3></div>
    <div class="card-body">
      <table>
        <tr><th>Path Log</th><th>Isi</th></tr>
        <tr><td><span class="inline-code">storage/logs/token/request.log</span></td><td>Log request get access token (harian)</td></tr>
        <tr><td><span class="inline-code">storage/logs/access.txt</span></td><td>Log akses umum iOS (harian)</td></tr>
        <tr><td><span class="inline-code">storage/logs/tabungan.txt</span></td><td>Log request endpoint tabungan</td></tr>
        <tr><td><span class="inline-code">storage/logs/transfer-AR.txt</span></td><td>Log transfer sesama LPD</td></tr>
        <tr><td><span class="inline-code">storage/logs/transfer-AB.txt</span></td><td>Log transfer antar bank</td></tr>
        <tr><td><span class="inline-code">storage/logs/ppob.txt</span></td><td>Log request PPOB</td></tr>
        <tr><td><span class="inline-code">storage/logs/transfer-in/inquiry/</span></td><td>Log SNAP inquiry (per external ID)</td></tr>
        <tr><td><span class="inline-code">storage/logs/transfer-in/posting/</span></td><td>Log SNAP payment (per external ID)</td></tr>
        <tr><td><span class="inline-code">storage/logs/laravel-YYYY-MM-DD.log</span></td><td>Log Laravel standar</td></tr>
      </table>
    </div>
  </div>
</section>


<!-- TERMINAL -->
<section id="section-terminal" class="section">
  <div class="card" style="max-width:900px">
    <div class="card-header" style="background:#0f172a;border-bottom:1px solid #1e293b">
      <i class="fas fa-terminal" style="color:#22d3ee"></i>
      <h3 style="color:#e2e8f0">Terminal Interaktif</h3>
      <span style="margin-left:auto;font-size:11px;color:#64748b">Sandbox: /home/user</span>
      <button onclick="clearTerminal()" title="Clear" style="margin-left:12px;background:#1e293b;border:none;color:#94a3b8;padding:4px 10px;border-radius:4px;cursor:pointer;font-size:12px"><i class="fas fa-eraser"></i></button>
    </div>
    <div style="background:#0f172a;padding:0">
      <!-- Output area -->
      <div id="term-output" style="font-family:'Courier New',monospace;font-size:13px;line-height:1.7;padding:16px;min-height:360px;max-height:520px;overflow-y:auto;color:#e2e8f0;background:#0f172a"></div>
      <!-- Input row -->
      <div style="display:flex;align-items:center;border-top:1px solid #1e293b;padding:10px 16px;background:#0a0f1e;gap:8px">
        <span id="term-prompt" style="color:#22d3ee;font-family:monospace;font-size:13px;white-space:nowrap;flex-shrink:0">user@sandbox:~$</span>
        <input id="term-input" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
          style="flex:1;background:transparent;border:none;outline:none;color:#f1f5f9;font-family:'Courier New',monospace;font-size:13px;caret-color:#22d3ee"
          placeholder="ketik perintah..."
          onkeydown="termKeyDown(event)"/>
        <button onclick="termRun()" style="background:#1d4ed8;border:none;color:#fff;padding:5px 14px;border-radius:4px;cursor:pointer;font-size:12px;font-weight:600">Run <i class="fas fa-play" style="font-size:10px"></i></button>
      </div>
    </div>
  </div>

  <div class="card" style="max-width:900px;margin-top:16px">
    <div class="card-header"><i class="fas fa-bolt" style="color:#f59e0b"></i><h3>Perintah Cepat</h3></div>
    <div class="card-body" style="display:flex;flex-wrap:wrap;gap:10px">
      <button class="quick-cmd" onclick="quickCmd('php7.4 --version')">php --version</button>
      <button class="quick-cmd" onclick="quickCmd('ls /home/user/webapp/lpd_seminyak')">ls lpd_seminyak/</button>
      <button class="quick-cmd" onclick="quickCmd('cat /home/user/webapp/lpd_seminyak/.env | grep -v PASSWORD | grep -v SECRET | grep -v KEY | head -30')">cat .env (safe)</button>
      <button class="quick-cmd" onclick="quickCmd('php7.4 /home/user/webapp/lpd_seminyak/artisan env')">artisan env</button>
      <button class="quick-cmd" onclick="quickCmd('php7.4 /home/user/webapp/lpd_seminyak/artisan route:list 2>&1 | head -40')">artisan route:list</button>
      <button class="quick-cmd" onclick="quickCmd('composer --version')">composer --version</button>
      <button class="quick-cmd" onclick="quickCmd('ls /home/user/webapp/lpd_seminyak/app/Http/Controllers/')">ls Controllers/</button>
      <button class="quick-cmd" onclick="quickCmd('ls /home/user/webapp/lpd_seminyak/app/Helpers/')">ls Helpers/</button>
      <button class="quick-cmd" onclick="quickCmd('php7.4 -m | grep -E "pdo|sqlsrv|mbstring|openssl"')">php modules</button>
      <button class="quick-cmd" onclick="quickCmd('cat /home/user/webapp/lpd_seminyak/routes/api.php | head -60')">routes/api.php</button>
      <button class="quick-cmd" onclick="quickCmd('du -sh /home/user/webapp/lpd_seminyak/*')">disk usage</button>
      <button class="quick-cmd" onclick="quickCmd('uname -a && cat /etc/os-release | head -5')">system info</button>
    </div>
  </div>

  <div class="info-box info-yellow" style="max-width:900px">
    <i class="fas fa-exclamation-triangle"></i>
    <div><strong>Catatan:</strong> Terminal berjalan di sandbox server. Perintah berbahaya (rm -rf /, fork bomb, dll) diblokir. Timeout 15 detik per perintah.</div>
  </div>
</section>

</div>
</main>

<button class="toggle-btn" onclick="toggleSidebar()"><i class="fas fa-bars"></i></button>

<style>
.quick-cmd{background:#f1f5f9;border:1px solid #e2e8f0;color:#1e40af;padding:7px 14px;border-radius:6px;cursor:pointer;font-size:12px;font-weight:600;transition:all .15s;font-family:'Courier New',monospace}
.quick-cmd:hover{background:#dbeafe;border-color:#93c5fd}
.term-line-out{color:#e2e8f0}
.term-line-err{color:#fca5a5}
.term-line-cmd{color:#22d3ee;font-weight:700}
.term-line-info{color:#86efac}
.term-line-cwd{color:#94a3b8;font-size:11px}
</style>

<script>
var termHistory = [];
var termHistIdx = -1;
var termCwd = '/home/user';

function termKeyDown(e) {
  if (e.key === 'Enter') { e.preventDefault(); termRun(); }
  else if (e.key === 'ArrowUp') { e.preventDefault(); if (termHistIdx < termHistory.length-1) { termHistIdx++; document.getElementById('term-input').value = termHistory[termHistIdx] || ''; } }
  else if (e.key === 'ArrowDown') { e.preventDefault(); if (termHistIdx > 0) { termHistIdx--; document.getElementById('term-input').value = termHistory[termHistIdx] || ''; } else { termHistIdx=-1; document.getElementById('term-input').value=''; } }
}

function termRun() {
  var input = document.getElementById('term-input');
  var cmd = input.value.trim();
  if (!cmd) return;
  input.value = '';
  termHistIdx = -1;
  termHistory.unshift(cmd);
  if (termHistory.length > 100) termHistory.pop();
  appendTermLine('$ ' + cmd, 'term-line-cmd');
  setTermBusy(true);
  fetch('/api/exec', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ command: cmd, workdir: termCwd })
  })
  .then(function(r){ return r.json(); })
  .then(function(d){
    var NL = String.fromCharCode(10);
    if (d.stdout && d.stdout.trim()) d.stdout.trim().split(NL).forEach(function(l){ appendTermLine(l,'term-line-out'); });
    if (d.stderr && d.stderr.trim()) d.stderr.trim().split(NL).forEach(function(l){ appendTermLine(l,'term-line-err'); });
    if (d.cwd && d.cwd !== termCwd) {
      termCwd = d.cwd;
      updatePrompt();
    }
    if (!d.stdout && !d.stderr && d.exitCode === 0) appendTermLine('(perintah selesai, tidak ada output)','term-line-info');
    setTermBusy(false);
    scrollTermBottom();
  })
  .catch(function(err){
    appendTermLine('Error: ' + err.message, 'term-line-err');
    setTermBusy(false);
    scrollTermBottom();
  });
}

function quickCmd(cmd) {
  showSection('terminal');
  document.getElementById('term-input').value = cmd;
  document.getElementById('term-input').focus();
  setTimeout(termRun, 100);
}

function appendTermLine(text, cls) {
  var out = document.getElementById('term-output');
  var line = document.createElement('div');
  line.className = cls || 'term-line-out';
  line.textContent = text;
  out.appendChild(line);
}

function scrollTermBottom() {
  var out = document.getElementById('term-output');
  out.scrollTop = out.scrollHeight;
}

function clearTerminal() {
  document.getElementById('term-output').innerHTML = '';
  appendTermLine('Terminal dibersihkan. Ketik perintah di bawah.', 'term-line-info');
}

function setTermBusy(busy) {
  var btn = document.querySelector('#section-terminal button[onclick="termRun()"]');
  var inp = document.getElementById('term-input');
  if (btn) btn.disabled = busy;
  if (inp) inp.disabled = busy;
  if (busy) appendTermLine('⏳ menjalankan...', 'term-line-info');
}

function updatePrompt() {
  var short = termCwd.replace('/home/user', '~');
  document.getElementById('term-prompt').textContent = 'user@sandbox:' + short + '$';
}

// Inisialisasi terminal
(function initTerminal() {
  fetch('/api/exec/health').then(function(r){return r.json();}).then(function(d){
    if (d.ok) {
      termCwd = d.cwd || '/home/user';
      updatePrompt();
      appendTermLine('✅ Terminal siap. Server berjalan di sandbox.', 'term-line-info');
      appendTermLine('💡 Ketik perintah Linux atau klik tombol Perintah Cepat di bawah.', 'term-line-info');
    } else {
      appendTermLine('⚠️  Terminal server offline. Coba muat ulang halaman.', 'term-line-err');
    }
  }).catch(function(){
    appendTermLine('⚠️  Tidak dapat terhubung ke terminal server.', 'term-line-err');
  });
})();
<\/script>

<script>
function showSection(name) {
  document.querySelectorAll('.section').forEach(function(s){s.classList.remove('active')});
  document.querySelectorAll('#sidebar nav a').forEach(function(a){a.classList.remove('active')});
  var sec = document.getElementById('section-' + name);
  if (sec) sec.classList.add('active');
  var nav = document.getElementById('nav-' + name);
  if (nav) nav.classList.add('active');
  var titles = {
    'overview': 'Beranda & Ringkasan',
    'architecture': 'Arsitektur Sistem',
    'install': 'Panduan Instalasi',
    'config': 'Konfigurasi .env',
    'auth': 'Autentikasi & Token',
    'ios-access': 'iOS – Login & Register',
    'ios-tabungan': 'iOS – Tabungan',
    'ios-transfer-lpd': 'iOS – Transfer LPD',
    'ios-transfer-bank': 'iOS – Transfer Antar Bank',
    'ios-ppob': 'iOS – PPOB',
    'snap': 'SNAP – Transfer VA BPD',
    'atm': 'ATM Cardless',
    'ppob-callback': 'PPOB Callback',
    'database': 'Skema Database',
    'response-codes': 'Kode Respons',
    'security': 'Keamanan & Enkripsi',
    'middleware': 'Middleware & Guard',
    'helpers': 'Helper Classes',
    'troubleshoot': 'Troubleshooting',
    'terminal': 'Terminal Interaktif'
  };
  document.getElementById('page-title').innerHTML = '<i class="fas fa-book mr-2" style="color:#2563eb"></i>' + (titles[name] || name);
  window.scrollTo(0,0);
}
function toggleEndpoint(header) {
  var body = header.nextElementSibling;
  body.classList.toggle('hidden');
  var icon = header.querySelector('.fa-chevron-down,.fa-chevron-up');
  if (icon) { icon.classList.toggle('fa-chevron-down'); icon.classList.toggle('fa-chevron-up'); }
}
function toggleSidebar() { document.getElementById('sidebar').classList.toggle('open'); }
<\/script>
</body>
</html>`}const ft=new Ot,es=Object.assign({"/src/index.tsx":z});let Xt=!1;for(const[,e]of Object.entries(es))e&&(ft.all("*",t=>{let a;try{a=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,a)}),ft.notFound(t=>{let a;try{a=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,a)}),Xt=!0);if(!Xt)throw new Error("Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']");export{ft as default};
