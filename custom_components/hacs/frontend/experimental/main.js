function t(t,e,s,i){var r,o=arguments.length,n=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(n=(o<3?r(n):o>3?r(e,s,n):r(e,s))||n);return o>3&&n&&Object.defineProperty(e,s,n),n}const e=new WeakMap,s=t=>"function"==typeof t&&e.has(t),i=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,r=(t,e,s=null)=>{for(;e!==s;){const s=e.nextSibling;t.removeChild(e),e=s}},o={},n={},a=`{{lit-${String(Math.random()).slice(2)}}}`,p=`\x3c!--${a}--\x3e`,l=new RegExp(`${a}|${p}`),h="$lit$";class c{constructor(t,e){this.parts=[],this.element=e;const s=[],i=[],r=document.createTreeWalker(e.content,133,null,!1);let o=0,n=-1,p=0;const{strings:c,values:{length:u}}=t;for(;p<u;){const t=r.nextNode();if(null!==t){if(n++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:s}=e;let i=0;for(let t=0;t<s;t++)d(e[t].name,h)&&i++;for(;i-- >0;){const e=c[p],s=_.exec(e)[2],i=s.toLowerCase()+h,r=t.getAttribute(i);t.removeAttribute(i);const o=r.split(l);this.parts.push({type:"attribute",index:n,name:s,strings:o}),p+=o.length-1}}"TEMPLATE"===t.tagName&&(i.push(t),r.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(a)>=0){const i=t.parentNode,r=e.split(l),o=r.length-1;for(let e=0;e<o;e++){let s,o=r[e];if(""===o)s=m();else{const t=_.exec(o);null!==t&&d(t[2],h)&&(o=o.slice(0,t.index)+t[1]+t[2].slice(0,-h.length)+t[3]),s=document.createTextNode(o)}i.insertBefore(s,t),this.parts.push({type:"node",index:++n})}""===r[o]?(i.insertBefore(m(),t),s.push(t)):t.data=r[o],p+=o}}else if(8===t.nodeType)if(t.data===a){const e=t.parentNode;null!==t.previousSibling&&n!==o||(n++,e.insertBefore(m(),t)),o=n,this.parts.push({type:"node",index:n}),null===t.nextSibling?t.data="":(s.push(t),n--),p++}else{let e=-1;for(;-1!==(e=t.data.indexOf(a,e+1));)this.parts.push({type:"node",index:-1}),p++}}else r.currentNode=i.pop()}for(const t of s)t.parentNode.removeChild(t)}}const d=(t,e)=>{const s=t.length-e.length;return s>=0&&t.slice(s)===e},u=t=>-1!==t.index,m=()=>document.createComment(""),_=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=\/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;class f{constructor(t,e,s){this.__parts=[],this.template=t,this.processor=e,this.options=s}update(t){let e=0;for(const s of this.__parts)void 0!==s&&s.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=i?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=[],s=this.template.parts,r=document.createTreeWalker(t,133,null,!1);let o,n=0,a=0,p=r.nextNode();for(;n<s.length;)if(o=s[n],u(o)){for(;a<o.index;)a++,"TEMPLATE"===p.nodeName&&(e.push(p),r.currentNode=p.content),null===(p=r.nextNode())&&(r.currentNode=e.pop(),p=r.nextNode());if("node"===o.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(p.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(p,o.name,o.strings,this.options));n++}else this.__parts.push(void 0),n++;return i&&(document.adoptNode(t),customElements.upgrade(t)),t}}const y=` ${a} `;class g{constructor(t,e,s,i){this.strings=t,this.values=e,this.type=s,this.processor=i}getHTML(){const t=this.strings.length-1;let e="",s=!1;for(let i=0;i<t;i++){const t=this.strings[i],r=t.lastIndexOf("\x3c!--");s=(r>-1||s)&&-1===t.indexOf("--\x3e",r+1);const o=_.exec(t);e+=null===o?t+(s?y:p):t.substr(0,o.index)+o[1]+o[2]+h+o[3]+a}return e+=this.strings[t]}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}const v=t=>null===t||!("object"==typeof t||"function"==typeof t),S=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class b{constructor(t,e,s){this.dirty=!0,this.element=t,this.name=e,this.strings=s,this.parts=[];for(let t=0;t<s.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new w(this)}_getValue(){const t=this.strings,e=t.length-1;let s="";for(let i=0;i<e;i++){s+=t[i];const e=this.parts[i];if(void 0!==e){const t=e.value;if(v(t)||!S(t))s+="string"==typeof t?t:String(t);else for(const e of t)s+="string"==typeof e?e:String(e)}}return s+=t[e]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class w{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===o||v(t)&&t===this.value||(this.value=t,s(t)||(this.committer.dirty=!0))}commit(){for(;s(this.value);){const t=this.value;this.value=o,t(this)}this.value!==o&&this.committer.commit()}}class P{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(m()),this.endNode=t.appendChild(m())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=m()),t.__insert(this.endNode=m())}insertAfterPart(t){t.__insert(this.startNode=m()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){for(;s(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=o,t(this)}const t=this.__pendingValue;t!==o&&(v(t)?t!==this.value&&this.__commitText(t):t instanceof g?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):S(t)?this.__commitIterable(t):t===n?(this.value=n,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,s="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=s:this.__commitNode(document.createTextNode(s)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof f&&this.value.template===e)this.value.update(t.values);else{const s=new f(e,t.processor,this.options),i=s._clone();s.update(t.values),this.__commitNode(i),this.value=s}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let s,i=0;for(const r of t)void 0===(s=e[i])&&(s=new P(this.options),e.push(s),0===i?s.appendIntoPart(this):s.insertAfterPart(e[i-1])),s.setValue(r),s.commit(),i++;i<e.length&&(e.length=i,this.clear(s&&s.endNode))}clear(t=this.startNode){r(this.startNode.parentNode,t.nextSibling,this.endNode)}}class x{constructor(t,e,s){if(this.value=void 0,this.__pendingValue=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=s}setValue(t){this.__pendingValue=t}commit(){for(;s(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=o,t(this)}if(this.__pendingValue===o)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=o}}class C extends b{constructor(t,e,s){super(t,e,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new N(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class N extends w{}let T=!1;try{const t={get capture(){return T=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}class A{constructor(t,e,s){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=s,this.__boundHandleEvent=(t=>this.handleEvent(t))}setValue(t){this.__pendingValue=t}commit(){for(;s(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=o,t(this)}if(this.__pendingValue===o)return;const t=this.__pendingValue,e=this.value,i=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),r=null!=t&&(null==e||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),r&&(this.__options=E(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=o}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const E=t=>t&&(T?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);const k=new class{handleAttributeExpressions(t,e,s,i){const r=e[0];return"."===r?new C(t,e.slice(1),s).parts:"@"===r?[new A(t,e.slice(1),i.eventContext)]:"?"===r?[new x(t,e.slice(1),s)]:new b(t,e,s).parts}handleTextExpression(t){return new P(t)}};function O(t){let e=U.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},U.set(t.type,e));let s=e.stringsArray.get(t.strings);if(void 0!==s)return s;const i=t.strings.join(a);return void 0===(s=e.keyString.get(i))&&(s=new c(t,t.getTemplateElement()),e.keyString.set(i,s)),e.stringsArray.set(t.strings,s),s}const U=new Map,V=new WeakMap;(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.1.2");const $=(t,...e)=>new g(t,e,"html",k),M=133;function z(t,e){const{element:{content:s},parts:i}=t,r=document.createTreeWalker(s,M,null,!1);let o=q(i),n=i[o],a=-1,p=0;const l=[];let h=null;for(;r.nextNode();){a++;const t=r.currentNode;for(t.previousSibling===h&&(h=null),e.has(t)&&(l.push(t),null===h&&(h=t)),null!==h&&p++;void 0!==n&&n.index===a;)n.index=null!==h?-1:n.index-p,n=i[o=q(i,o)]}l.forEach(t=>t.parentNode.removeChild(t))}const R=t=>{let e=11===t.nodeType?0:1;const s=document.createTreeWalker(t,M,null,!1);for(;s.nextNode();)e++;return e},q=(t,e=-1)=>{for(let s=e+1;s<t.length;s++){const e=t[s];if(u(e))return s}return-1};const j=(t,e)=>`${t}--${e}`;let I=!0;void 0===window.ShadyCSS?I=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),I=!1);const H=t=>e=>{const s=j(e.type,t);let i=U.get(s);void 0===i&&(i={stringsArray:new WeakMap,keyString:new Map},U.set(s,i));let r=i.stringsArray.get(e.strings);if(void 0!==r)return r;const o=e.strings.join(a);if(void 0===(r=i.keyString.get(o))){const s=e.getTemplateElement();I&&window.ShadyCSS.prepareTemplateDom(s,t),r=new c(e,s),i.keyString.set(o,r)}return i.stringsArray.set(e.strings,r),r},F=["html","svg"],L=new Set,B=(t,e,s)=>{L.add(t);const i=s?s.element:document.createElement("template"),r=e.querySelectorAll("style"),{length:o}=r;if(0===o)return void window.ShadyCSS.prepareTemplateStyles(i,t);const n=document.createElement("style");for(let t=0;t<o;t++){const e=r[t];e.parentNode.removeChild(e),n.textContent+=e.textContent}(t=>{F.forEach(e=>{const s=U.get(j(e,t));void 0!==s&&s.keyString.forEach(t=>{const{element:{content:e}}=t,s=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{s.add(t)}),z(t,s)})})})(t);const a=i.content;s?function(t,e,s=null){const{element:{content:i},parts:r}=t;if(null==s)return void i.appendChild(e);const o=document.createTreeWalker(i,M,null,!1);let n=q(r),a=0,p=-1;for(;o.nextNode();)for(p++,o.currentNode===s&&(a=R(e),s.parentNode.insertBefore(e,s));-1!==n&&r[n].index===p;){if(a>0){for(;-1!==n;)r[n].index+=a,n=q(r,n);return}n=q(r,n)}}(s,n,a.firstChild):a.insertBefore(n,a.firstChild),window.ShadyCSS.prepareTemplateStyles(i,t);const p=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==p)e.insertBefore(p.cloneNode(!0),e.firstChild);else if(s){a.insertBefore(n,a.firstChild);const t=new Set;t.add(n),z(s,t)}},W=(t,e,s)=>{if(!s||"object"!=typeof s||!s.scopeName)throw new Error("The `scopeName` option is required.");const i=s.scopeName,o=V.has(e),n=I&&11===e.nodeType&&!!e.host,a=n&&!L.has(i),p=a?document.createDocumentFragment():e;if(((t,e,s)=>{let i=V.get(e);void 0===i&&(r(e,e.firstChild),V.set(e,i=new P(Object.assign({templateFactory:O},s))),i.appendInto(e)),i.setValue(t),i.commit()})(t,p,Object.assign({templateFactory:H(i)},s)),a){const t=V.get(p);V.delete(p);const s=t.value instanceof f?t.value.template:void 0;B(i,p,s),r(e,e.firstChild),e.appendChild(p),V.set(e,t)}!o&&n&&window.ShadyCSS.styleElement(e.host)};window.JSCompiler_renameProperty=((t,e)=>t);const D={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},J=(t,e)=>e!==t&&(e==e||t==t),G={attribute:!0,type:String,converter:D,reflect:!1,hasChanged:J},Z=Promise.resolve(!0),K=1,Y=4,Q=8,X=16,tt=32,et="finalized";class st extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=Z,this._hasConnectedResolver=void 0,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,s)=>{const i=this._attributeNameForProperty(s,e);void 0!==i&&(this._attributeToPropertyMap.set(i,s),t.push(i))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=G){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const s="symbol"==typeof t?Symbol():`__${t}`;Object.defineProperty(this.prototype,t,{get(){return this[s]},set(e){const i=this[t];this[s]=e,this._requestUpdate(t,i)},configurable:!0,enumerable:!0})}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty(et)||t.finalize(),this[et]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const s of e)this.createProperty(s,t[s])}}static _attributeNameForProperty(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,s=J){return s(t,e)}static _propertyValueFromAttribute(t,e){const s=e.type,i=e.converter||D,r="function"==typeof i?i:i.fromAttribute;return r?r(t,s):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const s=e.type,i=e.converter;return(i&&i.toAttribute||D.toAttribute)(t,s)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this._updateState=this._updateState|tt,this._hasConnectedResolver&&(this._hasConnectedResolver(),this._hasConnectedResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,s){e!==s&&this._attributeToProperty(t,s)}_propertyToAttribute(t,e,s=G){const i=this.constructor,r=i._attributeNameForProperty(t,s);if(void 0!==r){const t=i._propertyValueToAttribute(e,s);if(void 0===t)return;this._updateState=this._updateState|Q,null==t?this.removeAttribute(r):this.setAttribute(r,t),this._updateState=this._updateState&~Q}}_attributeToProperty(t,e){if(this._updateState&Q)return;const s=this.constructor,i=s._attributeToPropertyMap.get(t);if(void 0!==i){const t=s._classProperties.get(i)||G;this._updateState=this._updateState|X,this[i]=s._propertyValueFromAttribute(e,t),this._updateState=this._updateState&~X}}_requestUpdate(t,e){let s=!0;if(void 0!==t){const i=this.constructor,r=i._classProperties.get(t)||G;i._valueHasChanged(this[t],e,r.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==r.reflect||this._updateState&X||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,r))):s=!1}!this._hasRequestedUpdate&&s&&this._enqueueUpdate()}requestUpdate(t,e){return this._requestUpdate(t,e),this.updateComplete}async _enqueueUpdate(){let t,e;this._updateState=this._updateState|Y;const s=this._updatePromise;this._updatePromise=new Promise((s,i)=>{t=s,e=i});try{await s}catch(t){}this._hasConnected||await new Promise(t=>this._hasConnectedResolver=t);try{const t=this.performUpdate();null!=t&&await t}catch(t){e(t)}t(!this._hasRequestedUpdate)}get _hasConnected(){return this._updateState&tt}get _hasRequestedUpdate(){return this._updateState&Y}get hasUpdated(){return this._updateState&K}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{(t=this.shouldUpdate(e))&&this.update(e)}catch(e){throw t=!1,e}finally{this._markUpdated()}t&&(this._updateState&K||(this._updateState=this._updateState|K,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~Y}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0)}updated(t){}firstUpdated(t){}}st[et]=!0;const it=t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:s,elements:i}=e;return{kind:s,elements:i,finisher(e){window.customElements.define(t,e)}}})(t,e),rt=(t,e)=>"method"!==e.kind||!e.descriptor||"value"in e.descriptor?{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(s){s.createProperty(e.key,t)}}:Object.assign({},e,{finisher(s){s.createProperty(e.key,t)}}),ot=(t,e,s)=>{e.constructor.createProperty(s,t)};function nt(t){return(e,s)=>void 0!==s?ot(t,e,s):rt(t,e)}const at="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,pt=Symbol();class lt{constructor(t,e){if(e!==pt)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(at?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const ht=(t,...e)=>{const s=e.reduce((e,s,i)=>e+(t=>{if(t instanceof lt)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(s)+t[i+1],t[0]);return new lt(s,pt)};(window.litElementVersions||(window.litElementVersions=[])).push("2.2.1");const ct=t=>t.flat?t.flat(1/0):function t(e,s=[]){for(let i=0,r=e.length;i<r;i++){const r=e[i];Array.isArray(r)?t(r,s):s.push(r)}return s}(t);class dt extends st{static finalize(){super.finalize.call(this),this._styles=this.hasOwnProperty(JSCompiler_renameProperty("styles",this))?this._getUniqueStyles():this._styles||[]}static _getUniqueStyles(){const t=this.styles,e=[];if(Array.isArray(t)){ct(t).reduceRight((t,e)=>(t.add(e),t),new Set).forEach(t=>e.unshift(t))}else t&&e.push(t);return e}initialize(){super.initialize(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?at?this.renderRoot.adoptedStyleSheets=t.map(t=>t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){super.update(t);const e=this.render();e instanceof g&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){}}dt.finalized=!0,dt.render=W;const ut=t=>null!==t,mt=t=>t?"":null,_t=(t,e)=>e!==t&&(e==e||t==t),ft={attribute:!0,type:String,reflect:!1,hasChanged:_t},yt=new Promise(t=>t(!0)),gt=1,vt=4,St=8;class bt extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=yt,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this._finalize();const t=[];for(const[e,s]of this._classProperties){const i=this._attributeNameForProperty(e,s);void 0!==i&&(this._attributeToPropertyMap.set(i,e),t.push(i))}return t}static createProperty(t,e=ft){if(!this.hasOwnProperty("_classProperties")){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}if(this._classProperties.set(t,e),this.prototype.hasOwnProperty(t))return;const s="symbol"==typeof t?Symbol():`__${t}`;Object.defineProperty(this.prototype,t,{get(){return this[s]},set(i){const r=this[t];this[s]=i,this._requestPropertyUpdate(t,r,e)},configurable:!0,enumerable:!0})}static _finalize(){if(this.hasOwnProperty("_finalized")&&this._finalized)return;const t=Object.getPrototypeOf(this);"function"==typeof t._finalize&&t._finalize(),this._finalized=!0,this._attributeToPropertyMap=new Map;const e=this.properties,s=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const t of s)this.createProperty(t,e[t])}static _attributeNameForProperty(t,e){const s=void 0!==e&&e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,s=_t){return s(t,e)}static _propertyValueFromAttribute(t,e){const s=e&&e.type;if(void 0===s)return t;const i=s===Boolean?ut:"function"==typeof s?s:s.fromAttribute;return i?i(t):t}static _propertyValueToAttribute(t,e){if(void 0===e||void 0===e.reflect)return;return(e.type===Boolean?mt:e.type&&e.type.toAttribute||String)(t)}initialize(){this.renderRoot=this.createRenderRoot(),this._saveInstanceProperties()}_saveInstanceProperties(){for(const[t]of this.constructor._classProperties)if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}}_applyInstanceProperties(){for(const[t,e]of this._instanceProperties)this[t]=e;this._instanceProperties=void 0}createRenderRoot(){return this.attachShadow({mode:"open"})}connectedCallback(){this._updateState&gt?void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this):this.requestUpdate()}disconnectedCallback(){}attributeChangedCallback(t,e,s){e!==s&&this._attributeToProperty(t,s)}_propertyToAttribute(t,e,s=ft){const i=this.constructor,r=i._propertyValueToAttribute(e,s);if(void 0!==r){const e=i._attributeNameForProperty(t,s);void 0!==e&&(this._updateState=this._updateState|St,null===r?this.removeAttribute(e):this.setAttribute(e,r),this._updateState=this._updateState&~St)}}_attributeToProperty(t,e){if(!(this._updateState&St)){const s=this.constructor,i=s._attributeToPropertyMap.get(t);if(void 0!==i){const t=s._classProperties.get(i);this[i]=s._propertyValueFromAttribute(e,t)}}}requestUpdate(t,e){if(void 0!==t){const s=this.constructor._classProperties.get(t)||ft;return this._requestPropertyUpdate(t,e,s)}return this._invalidate()}_requestPropertyUpdate(t,e,s){return this.constructor._valueHasChanged(this[t],e,s.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0===s.reflect&&(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,s)),this._invalidate()):this.updateComplete}async _invalidate(){if(!this._hasRequestedUpdate){let t;this._updateState=this._updateState|vt;const e=this._updatePromise;this._updatePromise=new Promise(e=>t=e),await e,this._validate(),t(!this._hasRequestedUpdate)}return this.updateComplete}get _hasRequestedUpdate(){return this._updateState&vt}_validate(){if(this._instanceProperties&&this._applyInstanceProperties(),this.shouldUpdate(this._changedProperties)){const t=this._changedProperties;this.update(t),this._markUpdated(),this._updateState&gt||(this._updateState=this._updateState|gt,this.firstUpdated(t)),this.updated(t)}else this._markUpdated()}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~vt}get updateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){if(void 0!==this._reflectingProperties&&this._reflectingProperties.size>0){for(const[t,e]of this._reflectingProperties)this._propertyToAttribute(t,this[t],e);this._reflectingProperties=void 0}}updated(t){}firstUpdated(t){}}bt._attributeToPropertyMap=new Map,bt._finalized=!0,bt._classProperties=new Map,bt.properties={};class wt extends bt{update(t){super.update(t);const e=this.render();e instanceof g&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this})}render(){}}wt.render=W;window.customElements.define("granite-spinner",class extends wt{static get properties(){return{active:{type:Boolean,reflect:!0},hover:{type:Boolean,reflect:!0},size:{type:Number},color:{type:String},lineWidth:{type:String},containerHeight:{type:Number,value:150},debug:{type:Boolean}}}constructor(){super(),this.size=100,this.color="#28b6d8",this.lineWidth="1.5em",this.containerHeight=150}firstUpdated(){this.debug&&console.log("[granite-spinner] firstUpdated")}shouldUpdate(){return this.debug&&console.log("[granite-spinner] shouldUpdate",this.lineWidth),!0}render(){if(this.active)return $`
      ${this._renderStyles()}      
      <div id="spinner-container">
        <div id="spinner" class="loading">
        </div>
      </div>
    `}_renderStyles(){return $`
      <style>
        @charset "UTF-8";

        /**
        @license MIT
        Copyright (c) 2015 Horacio "LostInBrittany" Gonzalez
        */
        
        :host {
          display: inline-block;
          position: relative;
          width:100%;
        }
        #spinner-container {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          width:100%;

          position: ${this.hover?"absolute":"relative"};
          min-width: ${this.size}px;
          min-height: ${this.size}px;
          height: ${Math.max(this.size,this.containerHeight,200)}px;
        }
        #spinner {
          margin: 60px auto;
          font-size: 10px;
          position: relative;
          text-indent: -9999em;
        
          border: 1.5em solid rgba(210,210,210, 1);
          border-left: 1.5em solid #28b6d8;
          -webkit-transform: translateZ(0);
          -ms-transform: translateZ(0);
          transform: translateZ(0);
          -webkit-animation: load8 1.25s infinite linear;
          animation: load8 1.25s infinite linear;          
          
          border-left-color: ${this.color};
          border-width: ${this.lineWidth};
        }
        
        #spinner,
        #spinner:after {
          border-radius: 50%;
          width: ${this.size?`${this.size}px`:"10em"};
          height: ${this.size?`${this.size}px`:"10em"};
        }

        @-webkit-keyframes load8 {
          0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
          }
          100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
          }
        }
        @keyframes load8 {
          0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
          }
          100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
          }
        }      

      </style>
      
    `}});let Pt=class extends dt{render(){return $`
            <granite-spinner color="var(--primary-color)" active hover size=400 containerHeight=100%></granite-spinner>
            `}};Pt=t([it("hacs-spinner")],Pt);let xt=class extends dt{render(){return $`

    <p>${this.hass}</p></br>
    <p>${this.repositories}</p></br>
    <p>${this.panel}</p></br>
          `}static get styles(){return ht`
      :host {
        color: var(--primary-text-color);
      }
      ha-card {
        margin: 8px;
      }
      `}};t([nt()],xt.prototype,"hass",void 0),t([nt()],xt.prototype,"repositories",void 0),t([nt()],xt.prototype,"panel",void 0),xt=t([it("hacs-panel-installed")],xt);let Ct=class extends dt{render(){return $`
    <div class="hacs-repositories">
    ${this.repositories.map(t=>$`<ha-card header="${t.name}">
      <div class="card-content">
        <i>${t.description}<i>
      </div>
      </ha-card>
      `)}
    </div>
          `}static get styles(){return ht`
      :host {
        color: var(--primary-text-color);
      }
      ha-card {
        margin: 8px;
      }
      `}};t([nt()],Ct.prototype,"hass",void 0),t([nt()],Ct.prototype,"repositories",void 0),t([nt()],Ct.prototype,"panel",void 0),Ct=t([it("hacs-panel-integrations")],Ct);let Nt=class extends dt{render(){return $`

    <p>${this.hass}</p></br>
    <p>${this.repositories}</p></br>
    <p>${this.panel}</p></br>
          `}static get styles(){return ht`
      :host {
        color: var(--primary-text-color);
      }
      ha-card {
        margin: 8px;
      }
      `}};t([nt()],Nt.prototype,"hass",void 0),t([nt()],Nt.prototype,"repositories",void 0),t([nt()],Nt.prototype,"panel",void 0),Nt=t([it("hacs-panel-settings")],Nt);let Tt=class extends dt{updated(t){console.log("updated"),t.forEach((t,e,s)=>{console.log(`${e} changed. oldValue: ${t}, newValue: ${s}`)})}render(){return console.log("hass: "+this.hass),console.log("repositories: "+this.repositories),console.log("panel: "+this.panel),$`

    <p>${this.hass}</p></br>
    <p>${this.repositories}</p></br>
    <p>${this.panel}</p></br>
          `}static get styles(){return ht`
      :host {
        color: var(--primary-text-color);
      }
      ha-card {
        margin: 8px;
      }
      `}};t([nt()],Tt.prototype,"hass",void 0),t([nt()],Tt.prototype,"repositories",void 0),t([nt()],Tt.prototype,"panel",void 0),Tt=t([it("hacs-panel")],Tt);let At=class extends dt{getRepositories(){this.repositories=void 0,this.requestUpdate(),this.hass.connection.sendMessagePromise({type:"hacs/repositories"}).then(t=>{this.repositories=t,console.log("Message OK!",t)},t=>{console.error("Message failed!",t)})}firstUpdated(){this.getRepositories(),function(){if(customElements.get("hui-view"))return!0;const t=document.createElement("partial-panel-resolver");t.hass=document.querySelector("home-assistant").hass,t.route={path:"/lovelace/"};try{document.querySelector("home-assistant").appendChild(t).catch(t=>{})}catch(e){document.querySelector("home-assistant").removeChild(t)}customElements.get("hui-view")}()}render(){var t=this._page;if(void 0===this.repositories)return $`<hacs-spinner></hacs-spinner>`;this.repositories.content;if(null!==t){var e=this._page;this.repositories.content.filter(function(t){return t.category==e})}return $`

    <app-header-layout has-scrolling-region>
    <app-header slot="header" fixed>
      <app-toolbar>
        <ha-menu-button .hass="${this.hass}" .narrow="${this.narrow}"></ha-menu-button>
        <div main-title>${this.hass.localize("component.hacs.config.title")}</div>
      </app-toolbar>
    </app-header>
    <paper-tabs
    scrollable
    attr-for-selected="page-name"
    .selected="${t}"
    @iron-activate=${this.handlePageSelected}>

    <paper-tab page-name="installed">
    INSTALLED
    </paper-tab>

    <paper-tab page-name="integration">
    INTEGRATIONS
    </paper-tab>

    <paper-tab page-name="plugin">
    PLUGINS
    </paper-tab>

    <paper-tab page-name="appdaemon">
    APPDAEMON APPS
    </paper-tab>

    <paper-tab page-name="python_script">
    PYTHON SCRIPTS
    </paper-tab>

    <paper-tab page-name="theme">
    THEMES
    </paper-tab>

    <paper-tab class="right" page-name="settings">
    ${this.hass.localize("component.hacs.common.settings").toUpperCase()}
    </paper-tab>

    </paper-tabs>

    <hacs-panel .repositories=${JSON.stringify(this.repositories.content)} .panel="${this._page}"></hacs-panel>

    </app-header-layout>
        `}handlePageSelected(t){this.requestUpdate();const e=t.detail.item.getAttribute("page-name");this.panel=e,console.log("nav"),Et(this,`/hacs/${e}`)}get _page(){return null===this.route.path.substr(1)?"installed":this.route.path.substr(1)}static get styles(){return ht`
    :host {
      color: var(--primary-text-color);
      --paper-card-header-color: var(--primary-text-color);
    }
    app-header {
      color: var(--text-primary-color);
      background-color: var(--primary-color);
      font-weight: 400;
    }
    paper-tabs {
      color: var(--text-primary-color);
      background-color: var(--primary-color);
      font-weight: 400;
      --paper-tabs-selection-bar-color: #fff;
      text-transform: uppercase;
    }
    ha-card {
      margin: 8px;
    }
    .hacs-repositories {
      display: grid;

      grid-template-columns: repeat(3, 1fr);
    }
    `}};t([nt()],At.prototype,"hass",void 0),t([nt()],At.prototype,"repositories",void 0),t([nt()],At.prototype,"route",void 0),t([nt()],At.prototype,"narrow",void 0),t([nt()],At.prototype,"panel",void 0),At=t([it("hacs-frontend")],At);const Et=(t,e,s=!0)=>{s?history.replaceState(null,"",e):history.pushState(null,"",e)};