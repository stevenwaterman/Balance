var al=Object.defineProperty,cl=Object.defineProperties;var ul=Object.getOwnPropertyDescriptors;var Li=Object.getOwnPropertySymbols;var ll=Object.prototype.hasOwnProperty,hl=Object.prototype.propertyIsEnumerable;var xi=(t,e,n)=>e in t?al(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Ui=(t,e)=>{for(var n in e||(e={}))ll.call(e,n)&&xi(t,n,e[n]);if(Li)for(var n of Li(e))hl.call(e,n)&&xi(t,n,e[n]);return t},Fi=(t,e)=>cl(t,ul(e));/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const na=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let r=t.charCodeAt(s);r<128?e[n++]=r:r<2048?(e[n++]=r>>6|192,e[n++]=r&63|128):(r&64512)===55296&&s+1<t.length&&(t.charCodeAt(s+1)&64512)===56320?(r=65536+((r&1023)<<10)+(t.charCodeAt(++s)&1023),e[n++]=r>>18|240,e[n++]=r>>12&63|128,e[n++]=r>>6&63|128,e[n++]=r&63|128):(e[n++]=r>>12|224,e[n++]=r>>6&63|128,e[n++]=r&63|128)}return e},dl=function(t){const e=[];let n=0,s=0;for(;n<t.length;){const r=t[n++];if(r<128)e[s++]=String.fromCharCode(r);else if(r>191&&r<224){const i=t[n++];e[s++]=String.fromCharCode((r&31)<<6|i&63)}else if(r>239&&r<365){const i=t[n++],o=t[n++],a=t[n++],c=((r&7)<<18|(i&63)<<12|(o&63)<<6|a&63)-65536;e[s++]=String.fromCharCode(55296+(c>>10)),e[s++]=String.fromCharCode(56320+(c&1023))}else{const i=t[n++],o=t[n++];e[s++]=String.fromCharCode((r&15)<<12|(i&63)<<6|o&63)}}return e.join("")},sa={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let r=0;r<t.length;r+=3){const i=t[r],o=r+1<t.length,a=o?t[r+1]:0,c=r+2<t.length,u=c?t[r+2]:0,l=i>>2,h=(i&3)<<4|a>>4;let f=(a&15)<<2|u>>6,g=u&63;c||(g=64,o||(f=64)),s.push(n[l],n[h],n[f],n[g])}return s.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(na(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):dl(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let r=0;r<t.length;){const i=n[t.charAt(r++)],a=r<t.length?n[t.charAt(r)]:0;++r;const u=r<t.length?n[t.charAt(r)]:64;++r;const h=r<t.length?n[t.charAt(r)]:64;if(++r,i==null||a==null||u==null||h==null)throw Error();const f=i<<2|a>>4;if(s.push(f),u!==64){const g=a<<4&240|u>>2;if(s.push(g),h!==64){const v=u<<6&192|h;s.push(v)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}},fl=function(t){const e=na(t);return sa.encodeByteArray(e,!0)},ra=function(t){return fl(t).replace(/\./g,"")},pl=function(t){try{return sa.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gl{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,s)=>{n?this.reject(n):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,s))}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function q(){return typeof navigator!="undefined"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function ia(){return typeof window!="undefined"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(q())}function oa(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function aa(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function ml(){return q().indexOf("Electron/")>=0}function ca(){const t=q();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function yl(){return q().indexOf("MSAppHost/")>=0}function vl(){return typeof indexedDB=="object"}function wl(){return new Promise((t,e)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(s);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(s),t(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{var i;e(((i=r.error)===null||i===void 0?void 0:i.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const El="FirebaseError";class Ze extends Error{constructor(e,n,s){super(n),this.code=e,this.customData=s,this.name=El,Object.setPrototypeOf(this,Ze.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,rn.prototype.create)}}class rn{constructor(e,n,s){this.service=e,this.serviceName=n,this.errors=s}create(e,...n){const s=n[0]||{},r=`${this.service}/${e}`,i=this.errors[e],o=i?Il(i,s):"Error",a=`${this.serviceName}: ${o} (${r}).`;return new Ze(r,a,s)}}function Il(t,e){return t.replace(Tl,(n,s)=>{const r=e[s];return r!=null?String(r):`<${s}?>`})}const Tl=/\{\$([^}]+)}/g;function _l(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function $n(t,e){if(t===e)return!0;const n=Object.keys(t),s=Object.keys(e);for(const r of n){if(!s.includes(r))return!1;const i=t[r],o=e[r];if(Vi(i)&&Vi(o)){if(!$n(i,o))return!1}else if(i!==o)return!1}for(const r of s)if(!n.includes(r))return!1;return!0}function Vi(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function on(t){const e=[];for(const[n,s]of Object.entries(t))Array.isArray(s)?s.forEach(r=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(r))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}function Sl(t,e){const n=new bl(t,e);return n.subscribe.bind(n)}class bl{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(s=>{this.error(s)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,s){let r;if(e===void 0&&n===void 0&&s===void 0)throw new Error("Missing Observer.");Cl(e,["next","error","complete"])?r=e:r={next:e,error:n,complete:s},r.next===void 0&&(r.next=Fs),r.error===void 0&&(r.error=Fs),r.complete===void 0&&(r.complete=Fs);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch{}}),this.observers.push(r),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(s){typeof console!="undefined"&&console.error&&console.error(s)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Cl(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function Fs(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ce(t){return t&&t._delegate?t._delegate:t}class Ke{constructor(e,n,s){this.name=e,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fe="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Al{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const s=new gl;if(this.instancesDeferred.set(n,s),this.isInitialized(n)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:n});r&&s.resolve(r)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const s=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(s)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:s})}catch(i){if(r)return null;throw i}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Dl(e))try{this.getOrInitializeService({instanceIdentifier:Fe})}catch{}for(const[n,s]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:r});s.resolve(i)}catch{}}}}clearInstance(e=Fe){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Fe){return this.instances.has(e)}getOptions(e=Fe){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:s,options:n});for(const[i,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(i);s===a&&o.resolve(r)}return r}onInit(e,n){var s;const r=this.normalizeInstanceIdentifier(n),i=(s=this.onInitCallbacks.get(r))!==null&&s!==void 0?s:new Set;i.add(e),this.onInitCallbacks.set(r,i);const o=this.instances.get(r);return o&&e(o,r),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const s=this.onInitCallbacks.get(n);if(!!s)for(const r of s)try{r(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:kl(e),options:n}),this.instances.set(e,s),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=Fe){return this.component?this.component.multipleInstances?e:Fe:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function kl(t){return t===Fe?void 0:t}function Dl(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rl{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new Al(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var R;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(R||(R={}));const Nl={debug:R.DEBUG,verbose:R.VERBOSE,info:R.INFO,warn:R.WARN,error:R.ERROR,silent:R.SILENT},Ol=R.INFO,Ml={[R.DEBUG]:"log",[R.VERBOSE]:"log",[R.INFO]:"info",[R.WARN]:"warn",[R.ERROR]:"error"},Pl=(t,e,...n)=>{if(e<t.logLevel)return;const s=new Date().toISOString(),r=Ml[e];if(r)console[r](`[${s}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Dr{constructor(e){this.name=e,this._logLevel=Ol,this._logHandler=Pl,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in R))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Nl[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,R.DEBUG,...e),this._logHandler(this,R.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,R.VERBOSE,...e),this._logHandler(this,R.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,R.INFO,...e),this._logHandler(this,R.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,R.WARN,...e),this._logHandler(this,R.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,R.ERROR,...e),this._logHandler(this,R.ERROR,...e)}}const Ll=(t,e)=>e.some(n=>t instanceof n);let Bi,$i;function xl(){return Bi||(Bi=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Ul(){return $i||($i=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const ua=new WeakMap,nr=new WeakMap,la=new WeakMap,Vs=new WeakMap,Rr=new WeakMap;function Fl(t){const e=new Promise((n,s)=>{const r=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(De(t.result)),r()},o=()=>{s(t.error),r()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&ua.set(n,t)}).catch(()=>{}),Rr.set(e,t),e}function Vl(t){if(nr.has(t))return;const e=new Promise((n,s)=>{const r=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),r()},o=()=>{s(t.error||new DOMException("AbortError","AbortError")),r()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});nr.set(t,e)}let sr={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return nr.get(t);if(e==="objectStoreNames")return t.objectStoreNames||la.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return De(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Bl(t){sr=t(sr)}function $l(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const s=t.call(Bs(this),e,...n);return la.set(s,e.sort?e.sort():[e]),De(s)}:Ul().includes(t)?function(...e){return t.apply(Bs(this),e),De(ua.get(this))}:function(...e){return De(t.apply(Bs(this),e))}}function jl(t){return typeof t=="function"?$l(t):(t instanceof IDBTransaction&&Vl(t),Ll(t,xl())?new Proxy(t,sr):t)}function De(t){if(t instanceof IDBRequest)return Fl(t);if(Vs.has(t))return Vs.get(t);const e=jl(t);return e!==t&&(Vs.set(t,e),Rr.set(e,t)),e}const Bs=t=>Rr.get(t);function ql(t,e,{blocked:n,upgrade:s,blocking:r,terminated:i}){const o=indexedDB.open(t,e),a=De(o);return s&&o.addEventListener("upgradeneeded",c=>{s(De(o.result),c.oldVersion,c.newVersion,De(o.transaction))}),n&&o.addEventListener("blocked",()=>n()),a.then(c=>{i&&c.addEventListener("close",()=>i()),r&&c.addEventListener("versionchange",()=>r())}).catch(()=>{}),a}const Hl=["get","getKey","getAll","getAllKeys","count"],Kl=["put","add","delete","clear"],$s=new Map;function ji(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if($s.get(e))return $s.get(e);const n=e.replace(/FromIndex$/,""),s=e!==n,r=Kl.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(r||Hl.includes(n)))return;const i=async function(o,...a){const c=this.transaction(o,r?"readwrite":"readonly");let u=c.store;return s&&(u=u.index(a.shift())),(await Promise.all([u[n](...a),r&&c.done]))[0]};return $s.set(e,i),i}Bl(t=>Fi(Ui({},t),{get:(e,n,s)=>ji(e,n)||t.get(e,n,s),has:(e,n)=>!!ji(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zl{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Gl(n)){const s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}}function Gl(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const rr="@firebase/app",qi="0.7.27";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nr=new Dr("@firebase/app"),Wl="@firebase/app-compat",Ql="@firebase/analytics-compat",Xl="@firebase/analytics",Yl="@firebase/app-check-compat",Jl="@firebase/app-check",Zl="@firebase/auth",eh="@firebase/auth-compat",th="@firebase/database",nh="@firebase/database-compat",sh="@firebase/functions",rh="@firebase/functions-compat",ih="@firebase/installations",oh="@firebase/installations-compat",ah="@firebase/messaging",ch="@firebase/messaging-compat",uh="@firebase/performance",lh="@firebase/performance-compat",hh="@firebase/remote-config",dh="@firebase/remote-config-compat",fh="@firebase/storage",ph="@firebase/storage-compat",gh="@firebase/firestore",mh="@firebase/firestore-compat",yh="firebase",vh="9.8.4";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ha="[DEFAULT]",wh={[rr]:"fire-core",[Wl]:"fire-core-compat",[Xl]:"fire-analytics",[Ql]:"fire-analytics-compat",[Jl]:"fire-app-check",[Yl]:"fire-app-check-compat",[Zl]:"fire-auth",[eh]:"fire-auth-compat",[th]:"fire-rtdb",[nh]:"fire-rtdb-compat",[sh]:"fire-fn",[rh]:"fire-fn-compat",[ih]:"fire-iid",[oh]:"fire-iid-compat",[ah]:"fire-fcm",[ch]:"fire-fcm-compat",[uh]:"fire-perf",[lh]:"fire-perf-compat",[hh]:"fire-rc",[dh]:"fire-rc-compat",[fh]:"fire-gcs",[ph]:"fire-gcs-compat",[gh]:"fire-fst",[mh]:"fire-fst-compat","fire-js":"fire-js",[yh]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jn=new Map,ir=new Map;function Eh(t,e){try{t.container.addComponent(e)}catch(n){Nr.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function dt(t){const e=t.name;if(ir.has(e))return Nr.debug(`There were multiple attempts to register component ${e}.`),!1;ir.set(e,t);for(const n of jn.values())Eh(n,t);return!0}function Or(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ih={["no-app"]:"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",["bad-app-name"]:"Illegal App name: '{$appName}",["duplicate-app"]:"Firebase App named '{$appName}' already exists with different options or config",["app-deleted"]:"Firebase App named '{$appName}' already deleted",["invalid-app-argument"]:"firebase.{$appName}() takes either no argument or a Firebase App instance.",["invalid-log-argument"]:"First argument to `onLog` must be null or a function.",["storage-open"]:"Error thrown when opening storage. Original error: {$originalErrorMessage}.",["storage-get"]:"Error thrown when reading from storage. Original error: {$originalErrorMessage}.",["storage-set"]:"Error thrown when writing to storage. Original error: {$originalErrorMessage}.",["storage-delete"]:"Error thrown when deleting from storage. Original error: {$originalErrorMessage}."},ze=new rn("app","Firebase",Ih);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Th{constructor(e,n,s){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new Ke("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ze.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const an=vh;function _h(t,e={}){typeof e!="object"&&(e={name:e});const n=Object.assign({name:ha,automaticDataCollectionEnabled:!1},e),s=n.name;if(typeof s!="string"||!s)throw ze.create("bad-app-name",{appName:String(s)});const r=jn.get(s);if(r){if($n(t,r.options)&&$n(n,r.config))return r;throw ze.create("duplicate-app",{appName:s})}const i=new Rl(s);for(const a of ir.values())i.addComponent(a);const o=new Th(t,n,i);return jn.set(s,o),o}function da(t=ha){const e=jn.get(t);if(!e)throw ze.create("no-app",{appName:t});return e}function Re(t,e,n){var s;let r=(s=wh[t])!==null&&s!==void 0?s:t;n&&(r+=`-${n}`);const i=r.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const a=[`Unable to register library "${r}" with version "${e}":`];i&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Nr.warn(a.join(" "));return}dt(new Ke(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sh="firebase-heartbeat-database",bh=1,qt="firebase-heartbeat-store";let js=null;function fa(){return js||(js=ql(Sh,bh,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(qt)}}}).catch(t=>{throw ze.create("storage-open",{originalErrorMessage:t.message})})),js}async function Ch(t){var e;try{return(await fa()).transaction(qt).objectStore(qt).get(pa(t))}catch(n){throw ze.create("storage-get",{originalErrorMessage:(e=n)===null||e===void 0?void 0:e.message})}}async function Hi(t,e){var n;try{const r=(await fa()).transaction(qt,"readwrite");return await r.objectStore(qt).put(e,pa(t)),r.done}catch(s){throw ze.create("storage-set",{originalErrorMessage:(n=s)===null||n===void 0?void 0:n.message})}}function pa(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ah=1024,kh=30*24*60*60*1e3;class Dh{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Nh(n),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Ki();if(this._heartbeatsCache===null&&(this._heartbeatsCache=await this._heartbeatsCachePromise),!(this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(r=>r.date===s)))return this._heartbeatsCache.heartbeats.push({date:s,agent:n}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(r=>{const i=new Date(r.date).valueOf();return Date.now()-i<=kh}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache===null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Ki(),{heartbeatsToSend:n,unsentEntries:s}=Rh(this._heartbeatsCache.heartbeats),r=ra(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}}function Ki(){return new Date().toISOString().substring(0,10)}function Rh(t,e=Ah){const n=[];let s=t.slice();for(const r of t){const i=n.find(o=>o.agent===r.agent);if(i){if(i.dates.push(r.date),zi(n)>e){i.dates.pop();break}}else if(n.push({agent:r.agent,dates:[r.date]}),zi(n)>e){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}class Nh{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return vl()?wl().then(()=>!0).catch(()=>!1):!1}async read(){return await this._canUseIndexedDBPromise?await Ch(this.app)||{heartbeats:[]}:{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const r=await this.read();return Hi(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const r=await this.read();return Hi(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function zi(t){return ra(JSON.stringify({version:2,heartbeats:t})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oh(t){dt(new Ke("platform-logger",e=>new zl(e),"PRIVATE")),dt(new Ke("heartbeat",e=>new Dh(e),"PRIVATE")),Re(rr,qi,t),Re(rr,qi,"esm2017"),Re("fire-js","")}Oh("");var Mh=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},m,Mr=Mr||{},I=Mh||self;function qn(){}function or(t){var e=typeof t;return e=e!="object"?e:t?Array.isArray(t)?"array":e:"null",e=="array"||e=="object"&&typeof t.length=="number"}function cn(t){var e=typeof t;return e=="object"&&t!=null||e=="function"}function Ph(t){return Object.prototype.hasOwnProperty.call(t,qs)&&t[qs]||(t[qs]=++Lh)}var qs="closure_uid_"+(1e9*Math.random()>>>0),Lh=0;function xh(t,e,n){return t.call.apply(t.bind,arguments)}function Uh(t,e,n){if(!t)throw Error();if(2<arguments.length){var s=Array.prototype.slice.call(arguments,2);return function(){var r=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(r,s),t.apply(e,r)}}return function(){return t.apply(e,arguments)}}function G(t,e,n){return Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?G=xh:G=Uh,G.apply(null,arguments)}function Cn(t,e){var n=Array.prototype.slice.call(arguments,1);return function(){var s=n.slice();return s.push.apply(s,arguments),t.apply(this,s)}}function X(t,e){function n(){}n.prototype=e.prototype,t.Z=e.prototype,t.prototype=new n,t.prototype.constructor=t,t.Vb=function(s,r,i){for(var o=Array(arguments.length-2),a=2;a<arguments.length;a++)o[a-2]=arguments[a];return e.prototype[r].apply(s,o)}}function xe(){this.s=this.s,this.o=this.o}var Fh=0;xe.prototype.s=!1;xe.prototype.na=function(){!this.s&&(this.s=!0,this.M(),Fh!=0)&&Ph(this)};xe.prototype.M=function(){if(this.o)for(;this.o.length;)this.o.shift()()};const ga=Array.prototype.indexOf?function(t,e){return Array.prototype.indexOf.call(t,e,void 0)}:function(t,e){if(typeof t=="string")return typeof e!="string"||e.length!=1?-1:t.indexOf(e,0);for(let n=0;n<t.length;n++)if(n in t&&t[n]===e)return n;return-1},ma=Array.prototype.forEach?function(t,e,n){Array.prototype.forEach.call(t,e,n)}:function(t,e,n){const s=t.length,r=typeof t=="string"?t.split(""):t;for(let i=0;i<s;i++)i in r&&e.call(n,r[i],i,t)};function Vh(t){e:{var e=Rd;const n=t.length,s=typeof t=="string"?t.split(""):t;for(let r=0;r<n;r++)if(r in s&&e.call(void 0,s[r],r,t)){e=r;break e}e=-1}return 0>e?null:typeof t=="string"?t.charAt(e):t[e]}function Gi(t){return Array.prototype.concat.apply([],arguments)}function Pr(t){const e=t.length;if(0<e){const n=Array(e);for(let s=0;s<e;s++)n[s]=t[s];return n}return[]}function Hn(t){return/^[\s\xa0]*$/.test(t)}var Wi=String.prototype.trim?function(t){return t.trim()}:function(t){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(t)[1]};function ee(t,e){return t.indexOf(e)!=-1}function Hs(t,e){return t<e?-1:t>e?1:0}var te;e:{var Qi=I.navigator;if(Qi){var Xi=Qi.userAgent;if(Xi){te=Xi;break e}}te=""}function Lr(t,e,n){for(const s in t)e.call(n,t[s],s,t)}function ya(t){const e={};for(const n in t)e[n]=t[n];return e}var Yi="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function va(t,e){let n,s;for(let r=1;r<arguments.length;r++){s=arguments[r];for(n in s)t[n]=s[n];for(let i=0;i<Yi.length;i++)n=Yi[i],Object.prototype.hasOwnProperty.call(s,n)&&(t[n]=s[n])}}function xr(t){return xr[" "](t),t}xr[" "]=qn;function Bh(t){var e=qh;return Object.prototype.hasOwnProperty.call(e,9)?e[9]:e[9]=t(9)}var $h=ee(te,"Opera"),ft=ee(te,"Trident")||ee(te,"MSIE"),wa=ee(te,"Edge"),ar=wa||ft,Ea=ee(te,"Gecko")&&!(ee(te.toLowerCase(),"webkit")&&!ee(te,"Edge"))&&!(ee(te,"Trident")||ee(te,"MSIE"))&&!ee(te,"Edge"),jh=ee(te.toLowerCase(),"webkit")&&!ee(te,"Edge");function Ia(){var t=I.document;return t?t.documentMode:void 0}var Kn;e:{var Ks="",zs=function(){var t=te;if(Ea)return/rv:([^\);]+)(\)|;)/.exec(t);if(wa)return/Edge\/([\d\.]+)/.exec(t);if(ft)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(t);if(jh)return/WebKit\/(\S+)/.exec(t);if($h)return/(?:Version)[ \/]?(\S+)/.exec(t)}();if(zs&&(Ks=zs?zs[1]:""),ft){var Gs=Ia();if(Gs!=null&&Gs>parseFloat(Ks)){Kn=String(Gs);break e}}Kn=Ks}var qh={};function Hh(){return Bh(function(){let t=0;const e=Wi(String(Kn)).split("."),n=Wi("9").split("."),s=Math.max(e.length,n.length);for(let o=0;t==0&&o<s;o++){var r=e[o]||"",i=n[o]||"";do{if(r=/(\d*)(\D*)(.*)/.exec(r)||["","","",""],i=/(\d*)(\D*)(.*)/.exec(i)||["","","",""],r[0].length==0&&i[0].length==0)break;t=Hs(r[1].length==0?0:parseInt(r[1],10),i[1].length==0?0:parseInt(i[1],10))||Hs(r[2].length==0,i[2].length==0)||Hs(r[2],i[2]),r=r[3],i=i[3]}while(t==0)}return 0<=t})}var cr;if(I.document&&ft){var Ji=Ia();cr=Ji||parseInt(Kn,10)||void 0}else cr=void 0;var Kh=cr,zh=function(){if(!I.addEventListener||!Object.defineProperty)return!1;var t=!1,e=Object.defineProperty({},"passive",{get:function(){t=!0}});try{I.addEventListener("test",qn,e),I.removeEventListener("test",qn,e)}catch{}return t}();function Z(t,e){this.type=t,this.g=this.target=e,this.defaultPrevented=!1}Z.prototype.h=function(){this.defaultPrevented=!0};function Ht(t,e){if(Z.call(this,t?t.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,t){var n=this.type=t.type,s=t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:null;if(this.target=t.target||t.srcElement,this.g=e,e=t.relatedTarget){if(Ea){e:{try{xr(e.nodeName);var r=!0;break e}catch{}r=!1}r||(e=null)}}else n=="mouseover"?e=t.fromElement:n=="mouseout"&&(e=t.toElement);this.relatedTarget=e,s?(this.clientX=s.clientX!==void 0?s.clientX:s.pageX,this.clientY=s.clientY!==void 0?s.clientY:s.pageY,this.screenX=s.screenX||0,this.screenY=s.screenY||0):(this.clientX=t.clientX!==void 0?t.clientX:t.pageX,this.clientY=t.clientY!==void 0?t.clientY:t.pageY,this.screenX=t.screenX||0,this.screenY=t.screenY||0),this.button=t.button,this.key=t.key||"",this.ctrlKey=t.ctrlKey,this.altKey=t.altKey,this.shiftKey=t.shiftKey,this.metaKey=t.metaKey,this.pointerId=t.pointerId||0,this.pointerType=typeof t.pointerType=="string"?t.pointerType:Gh[t.pointerType]||"",this.state=t.state,this.i=t,t.defaultPrevented&&Ht.Z.h.call(this)}}X(Ht,Z);var Gh={2:"touch",3:"pen",4:"mouse"};Ht.prototype.h=function(){Ht.Z.h.call(this);var t=this.i;t.preventDefault?t.preventDefault():t.returnValue=!1};var un="closure_listenable_"+(1e6*Math.random()|0),Wh=0;function Qh(t,e,n,s,r){this.listener=t,this.proxy=null,this.src=e,this.type=n,this.capture=!!s,this.ia=r,this.key=++Wh,this.ca=this.fa=!1}function us(t){t.ca=!0,t.listener=null,t.proxy=null,t.src=null,t.ia=null}function ls(t){this.src=t,this.g={},this.h=0}ls.prototype.add=function(t,e,n,s,r){var i=t.toString();t=this.g[i],t||(t=this.g[i]=[],this.h++);var o=lr(t,e,s,r);return-1<o?(e=t[o],n||(e.fa=!1)):(e=new Qh(e,this.src,i,!!s,r),e.fa=n,t.push(e)),e};function ur(t,e){var n=e.type;if(n in t.g){var s=t.g[n],r=ga(s,e),i;(i=0<=r)&&Array.prototype.splice.call(s,r,1),i&&(us(e),t.g[n].length==0&&(delete t.g[n],t.h--))}}function lr(t,e,n,s){for(var r=0;r<t.length;++r){var i=t[r];if(!i.ca&&i.listener==e&&i.capture==!!n&&i.ia==s)return r}return-1}var Ur="closure_lm_"+(1e6*Math.random()|0),Ws={};function Ta(t,e,n,s,r){if(s&&s.once)return Sa(t,e,n,s,r);if(Array.isArray(e)){for(var i=0;i<e.length;i++)Ta(t,e[i],n,s,r);return null}return n=Br(n),t&&t[un]?t.N(e,n,cn(s)?!!s.capture:!!s,r):_a(t,e,n,!1,s,r)}function _a(t,e,n,s,r,i){if(!e)throw Error("Invalid event type");var o=cn(r)?!!r.capture:!!r,a=Vr(t);if(a||(t[Ur]=a=new ls(t)),n=a.add(e,n,s,o,i),n.proxy)return n;if(s=Xh(),n.proxy=s,s.src=t,s.listener=n,t.addEventListener)zh||(r=o),r===void 0&&(r=!1),t.addEventListener(e.toString(),s,r);else if(t.attachEvent)t.attachEvent(Ca(e.toString()),s);else if(t.addListener&&t.removeListener)t.addListener(s);else throw Error("addEventListener and attachEvent are unavailable.");return n}function Xh(){function t(n){return e.call(t.src,t.listener,n)}var e=Yh;return t}function Sa(t,e,n,s,r){if(Array.isArray(e)){for(var i=0;i<e.length;i++)Sa(t,e[i],n,s,r);return null}return n=Br(n),t&&t[un]?t.O(e,n,cn(s)?!!s.capture:!!s,r):_a(t,e,n,!0,s,r)}function ba(t,e,n,s,r){if(Array.isArray(e))for(var i=0;i<e.length;i++)ba(t,e[i],n,s,r);else s=cn(s)?!!s.capture:!!s,n=Br(n),t&&t[un]?(t=t.i,e=String(e).toString(),e in t.g&&(i=t.g[e],n=lr(i,n,s,r),-1<n&&(us(i[n]),Array.prototype.splice.call(i,n,1),i.length==0&&(delete t.g[e],t.h--)))):t&&(t=Vr(t))&&(e=t.g[e.toString()],t=-1,e&&(t=lr(e,n,s,r)),(n=-1<t?e[t]:null)&&Fr(n))}function Fr(t){if(typeof t!="number"&&t&&!t.ca){var e=t.src;if(e&&e[un])ur(e.i,t);else{var n=t.type,s=t.proxy;e.removeEventListener?e.removeEventListener(n,s,t.capture):e.detachEvent?e.detachEvent(Ca(n),s):e.addListener&&e.removeListener&&e.removeListener(s),(n=Vr(e))?(ur(n,t),n.h==0&&(n.src=null,e[Ur]=null)):us(t)}}}function Ca(t){return t in Ws?Ws[t]:Ws[t]="on"+t}function Yh(t,e){if(t.ca)t=!0;else{e=new Ht(e,this);var n=t.listener,s=t.ia||t.src;t.fa&&Fr(t),t=n.call(s,e)}return t}function Vr(t){return t=t[Ur],t instanceof ls?t:null}var Qs="__closure_events_fn_"+(1e9*Math.random()>>>0);function Br(t){return typeof t=="function"?t:(t[Qs]||(t[Qs]=function(e){return t.handleEvent(e)}),t[Qs])}function H(){xe.call(this),this.i=new ls(this),this.P=this,this.I=null}X(H,xe);H.prototype[un]=!0;H.prototype.removeEventListener=function(t,e,n,s){ba(this,t,e,n,s)};function W(t,e){var n,s=t.I;if(s)for(n=[];s;s=s.I)n.push(s);if(t=t.P,s=e.type||e,typeof e=="string")e=new Z(e,t);else if(e instanceof Z)e.target=e.target||t;else{var r=e;e=new Z(s,t),va(e,r)}if(r=!0,n)for(var i=n.length-1;0<=i;i--){var o=e.g=n[i];r=An(o,s,!0,e)&&r}if(o=e.g=t,r=An(o,s,!0,e)&&r,r=An(o,s,!1,e)&&r,n)for(i=0;i<n.length;i++)o=e.g=n[i],r=An(o,s,!1,e)&&r}H.prototype.M=function(){if(H.Z.M.call(this),this.i){var t=this.i,e;for(e in t.g){for(var n=t.g[e],s=0;s<n.length;s++)us(n[s]);delete t.g[e],t.h--}}this.I=null};H.prototype.N=function(t,e,n,s){return this.i.add(String(t),e,!1,n,s)};H.prototype.O=function(t,e,n,s){return this.i.add(String(t),e,!0,n,s)};function An(t,e,n,s){if(e=t.i.g[String(e)],!e)return!0;e=e.concat();for(var r=!0,i=0;i<e.length;++i){var o=e[i];if(o&&!o.ca&&o.capture==n){var a=o.listener,c=o.ia||o.src;o.fa&&ur(t.i,o),r=a.call(c,s)!==!1&&r}}return r&&!s.defaultPrevented}var $r=I.JSON.stringify;function Jh(){var t=ka;let e=null;return t.g&&(e=t.g,t.g=t.g.next,t.g||(t.h=null),e.next=null),e}class Zh{constructor(){this.h=this.g=null}add(e,n){const s=Aa.get();s.set(e,n),this.h?this.h.next=s:this.g=s,this.h=s}}var Aa=new class{constructor(t,e){this.i=t,this.j=e,this.h=0,this.g=null}get(){let t;return 0<this.h?(this.h--,t=this.g,this.g=t.next,t.next=null):t=this.i(),t}}(()=>new ed,t=>t.reset());class ed{constructor(){this.next=this.g=this.h=null}set(e,n){this.h=e,this.g=n,this.next=null}reset(){this.next=this.g=this.h=null}}function td(t){I.setTimeout(()=>{throw t},0)}function jr(t,e){hr||nd(),dr||(hr(),dr=!0),ka.add(t,e)}var hr;function nd(){var t=I.Promise.resolve(void 0);hr=function(){t.then(sd)}}var dr=!1,ka=new Zh;function sd(){for(var t;t=Jh();){try{t.h.call(t.g)}catch(n){td(n)}var e=Aa;e.j(t),100>e.h&&(e.h++,t.next=e.g,e.g=t)}dr=!1}function hs(t,e){H.call(this),this.h=t||1,this.g=e||I,this.j=G(this.kb,this),this.l=Date.now()}X(hs,H);m=hs.prototype;m.da=!1;m.S=null;m.kb=function(){if(this.da){var t=Date.now()-this.l;0<t&&t<.8*this.h?this.S=this.g.setTimeout(this.j,this.h-t):(this.S&&(this.g.clearTimeout(this.S),this.S=null),W(this,"tick"),this.da&&(qr(this),this.start()))}};m.start=function(){this.da=!0,this.S||(this.S=this.g.setTimeout(this.j,this.h),this.l=Date.now())};function qr(t){t.da=!1,t.S&&(t.g.clearTimeout(t.S),t.S=null)}m.M=function(){hs.Z.M.call(this),qr(this),delete this.g};function Hr(t,e,n){if(typeof t=="function")n&&(t=G(t,n));else if(t&&typeof t.handleEvent=="function")t=G(t.handleEvent,t);else throw Error("Invalid listener argument");return 2147483647<Number(e)?-1:I.setTimeout(t,e||0)}function Da(t){t.g=Hr(()=>{t.g=null,t.i&&(t.i=!1,Da(t))},t.j);const e=t.h;t.h=null,t.m.apply(null,e)}class rd extends xe{constructor(e,n){super(),this.m=e,this.j=n,this.h=null,this.i=!1,this.g=null}l(e){this.h=arguments,this.g?this.i=!0:Da(this)}M(){super.M(),this.g&&(I.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Kt(t){xe.call(this),this.h=t,this.g={}}X(Kt,xe);var Zi=[];function Ra(t,e,n,s){Array.isArray(n)||(n&&(Zi[0]=n.toString()),n=Zi);for(var r=0;r<n.length;r++){var i=Ta(e,n[r],s||t.handleEvent,!1,t.h||t);if(!i)break;t.g[i.key]=i}}function Na(t){Lr(t.g,function(e,n){this.g.hasOwnProperty(n)&&Fr(e)},t),t.g={}}Kt.prototype.M=function(){Kt.Z.M.call(this),Na(this)};Kt.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};function ds(){this.g=!0}ds.prototype.Aa=function(){this.g=!1};function id(t,e,n,s,r,i){t.info(function(){if(t.g)if(i)for(var o="",a=i.split("&"),c=0;c<a.length;c++){var u=a[c].split("=");if(1<u.length){var l=u[0];u=u[1];var h=l.split("_");o=2<=h.length&&h[1]=="type"?o+(l+"="+u+"&"):o+(l+"=redacted&")}}else o=null;else o=i;return"XMLHTTP REQ ("+s+") [attempt "+r+"]: "+e+`
`+n+`
`+o})}function od(t,e,n,s,r,i,o){t.info(function(){return"XMLHTTP RESP ("+s+") [ attempt "+r+"]: "+e+`
`+n+`
`+i+" "+o})}function rt(t,e,n,s){t.info(function(){return"XMLHTTP TEXT ("+e+"): "+cd(t,n)+(s?" "+s:"")})}function ad(t,e){t.info(function(){return"TIMEOUT: "+e})}ds.prototype.info=function(){};function cd(t,e){if(!t.g)return e;if(!e)return null;try{var n=JSON.parse(e);if(n){for(t=0;t<n.length;t++)if(Array.isArray(n[t])){var s=n[t];if(!(2>s.length)){var r=s[1];if(Array.isArray(r)&&!(1>r.length)){var i=r[0];if(i!="noop"&&i!="stop"&&i!="close")for(var o=1;o<r.length;o++)r[o]=""}}}}return $r(n)}catch{return e}}var et={},eo=null;function fs(){return eo=eo||new H}et.Ma="serverreachability";function Oa(t){Z.call(this,et.Ma,t)}X(Oa,Z);function zt(t){const e=fs();W(e,new Oa(e,t))}et.STAT_EVENT="statevent";function Ma(t,e){Z.call(this,et.STAT_EVENT,t),this.stat=e}X(Ma,Z);function ne(t){const e=fs();W(e,new Ma(e,t))}et.Na="timingevent";function Pa(t,e){Z.call(this,et.Na,t),this.size=e}X(Pa,Z);function ln(t,e){if(typeof t!="function")throw Error("Fn must not be null and must be a function");return I.setTimeout(function(){t()},e)}var ps={NO_ERROR:0,lb:1,yb:2,xb:3,sb:4,wb:5,zb:6,Ja:7,TIMEOUT:8,Cb:9},La={qb:"complete",Mb:"success",Ka:"error",Ja:"abort",Eb:"ready",Fb:"readystatechange",TIMEOUT:"timeout",Ab:"incrementaldata",Db:"progress",tb:"downloadprogress",Ub:"uploadprogress"};function Kr(){}Kr.prototype.h=null;function to(t){return t.h||(t.h=t.i())}function xa(){}var hn={OPEN:"a",pb:"b",Ka:"c",Bb:"d"};function zr(){Z.call(this,"d")}X(zr,Z);function Gr(){Z.call(this,"c")}X(Gr,Z);var fr;function gs(){}X(gs,Kr);gs.prototype.g=function(){return new XMLHttpRequest};gs.prototype.i=function(){return{}};fr=new gs;function dn(t,e,n,s){this.l=t,this.j=e,this.m=n,this.X=s||1,this.V=new Kt(this),this.P=ud,t=ar?125:void 0,this.W=new hs(t),this.H=null,this.i=!1,this.s=this.A=this.v=this.K=this.F=this.Y=this.B=null,this.D=[],this.g=null,this.C=0,this.o=this.u=null,this.N=-1,this.I=!1,this.O=0,this.L=null,this.aa=this.J=this.$=this.U=!1,this.h=new Ua}function Ua(){this.i=null,this.g="",this.h=!1}var ud=45e3,pr={},zn={};m=dn.prototype;m.setTimeout=function(t){this.P=t};function gr(t,e,n){t.K=1,t.v=ys(Ie(e)),t.s=n,t.U=!0,Fa(t,null)}function Fa(t,e){t.F=Date.now(),fn(t),t.A=Ie(t.v);var n=t.A,s=t.X;Array.isArray(s)||(s=[String(s)]),Ka(n.h,"t",s),t.C=0,n=t.l.H,t.h=new Ua,t.g=hc(t.l,n?e:null,!t.s),0<t.O&&(t.L=new rd(G(t.Ia,t,t.g),t.O)),Ra(t.V,t.g,"readystatechange",t.gb),e=t.H?ya(t.H):{},t.s?(t.u||(t.u="POST"),e["Content-Type"]="application/x-www-form-urlencoded",t.g.ea(t.A,t.u,t.s,e)):(t.u="GET",t.g.ea(t.A,t.u,null,e)),zt(),id(t.j,t.u,t.A,t.m,t.X,t.s)}m.gb=function(t){t=t.target;const e=this.L;e&&ye(t)==3?e.l():this.Ia(t)};m.Ia=function(t){try{if(t==this.g)e:{const l=ye(this.g);var e=this.g.Da();const h=this.g.ba();if(!(3>l)&&(l!=3||ar||this.g&&(this.h.h||this.g.ga()||io(this.g)))){this.I||l!=4||e==7||(e==8||0>=h?zt(3):zt(2)),ms(this);var n=this.g.ba();this.N=n;t:if(Va(this)){var s=io(this.g);t="";var r=s.length,i=ye(this.g)==4;if(!this.h.i){if(typeof TextDecoder=="undefined"){Ve(this),xt(this);var o="";break t}this.h.i=new I.TextDecoder}for(e=0;e<r;e++)this.h.h=!0,t+=this.h.i.decode(s[e],{stream:i&&e==r-1});s.splice(0,r),this.h.g+=t,this.C=0,o=this.h.g}else o=this.g.ga();if(this.i=n==200,od(this.j,this.u,this.A,this.m,this.X,l,n),this.i){if(this.$&&!this.J){t:{if(this.g){var a,c=this.g;if((a=c.g?c.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!Hn(a)){var u=a;break t}}u=null}if(n=u)rt(this.j,this.m,n,"Initial handshake response via X-HTTP-Initial-Response"),this.J=!0,mr(this,n);else{this.i=!1,this.o=3,ne(12),Ve(this),xt(this);break e}}this.U?(Ba(this,l,o),ar&&this.i&&l==3&&(Ra(this.V,this.W,"tick",this.fb),this.W.start())):(rt(this.j,this.m,o,null),mr(this,o)),l==4&&Ve(this),this.i&&!this.I&&(l==4?ac(this.l,this):(this.i=!1,fn(this)))}else n==400&&0<o.indexOf("Unknown SID")?(this.o=3,ne(12)):(this.o=0,ne(13)),Ve(this),xt(this)}}}catch{}finally{}};function Va(t){return t.g?t.u=="GET"&&t.K!=2&&t.l.Ba:!1}function Ba(t,e,n){let s=!0,r;for(;!t.I&&t.C<n.length;)if(r=ld(t,n),r==zn){e==4&&(t.o=4,ne(14),s=!1),rt(t.j,t.m,null,"[Incomplete Response]");break}else if(r==pr){t.o=4,ne(15),rt(t.j,t.m,n,"[Invalid Chunk]"),s=!1;break}else rt(t.j,t.m,r,null),mr(t,r);Va(t)&&r!=zn&&r!=pr&&(t.h.g="",t.C=0),e!=4||n.length!=0||t.h.h||(t.o=1,ne(16),s=!1),t.i=t.i&&s,s?0<n.length&&!t.aa&&(t.aa=!0,e=t.l,e.g==t&&e.$&&!e.L&&(e.h.info("Great, no buffering proxy detected. Bytes received: "+n.length),ni(e),e.L=!0,ne(11))):(rt(t.j,t.m,n,"[Invalid Chunked Response]"),Ve(t),xt(t))}m.fb=function(){if(this.g){var t=ye(this.g),e=this.g.ga();this.C<e.length&&(ms(this),Ba(this,t,e),this.i&&t!=4&&fn(this))}};function ld(t,e){var n=t.C,s=e.indexOf(`
`,n);return s==-1?zn:(n=Number(e.substring(n,s)),isNaN(n)?pr:(s+=1,s+n>e.length?zn:(e=e.substr(s,n),t.C=s+n,e)))}m.cancel=function(){this.I=!0,Ve(this)};function fn(t){t.Y=Date.now()+t.P,$a(t,t.P)}function $a(t,e){if(t.B!=null)throw Error("WatchDog timer not null");t.B=ln(G(t.eb,t),e)}function ms(t){t.B&&(I.clearTimeout(t.B),t.B=null)}m.eb=function(){this.B=null;const t=Date.now();0<=t-this.Y?(ad(this.j,this.A),this.K!=2&&(zt(),ne(17)),Ve(this),this.o=2,xt(this)):$a(this,this.Y-t)};function xt(t){t.l.G==0||t.I||ac(t.l,t)}function Ve(t){ms(t);var e=t.L;e&&typeof e.na=="function"&&e.na(),t.L=null,qr(t.W),Na(t.V),t.g&&(e=t.g,t.g=null,e.abort(),e.na())}function mr(t,e){try{var n=t.l;if(n.G!=0&&(n.g==t||yr(n.i,t))){if(n.I=t.N,!t.J&&yr(n.i,t)&&n.G==3){try{var s=n.Ca.g.parse(e)}catch{s=null}if(Array.isArray(s)&&s.length==3){var r=s;if(r[0]==0){e:if(!n.u){if(n.g)if(n.g.F+3e3<t.F)Xn(n),Es(n);else break e;ti(n),ne(18)}}else n.ta=r[1],0<n.ta-n.U&&37500>r[2]&&n.N&&n.A==0&&!n.v&&(n.v=ln(G(n.ab,n),6e3));if(1>=Wa(n.i)&&n.ka){try{n.ka()}catch{}n.ka=void 0}}else Be(n,11)}else if((t.J||n.g==t)&&Xn(n),!Hn(e))for(r=n.Ca.g.parse(e),e=0;e<r.length;e++){let u=r[e];if(n.U=u[0],u=u[1],n.G==2)if(u[0]=="c"){n.J=u[1],n.la=u[2];const l=u[3];l!=null&&(n.ma=l,n.h.info("VER="+n.ma));const h=u[4];h!=null&&(n.za=h,n.h.info("SVER="+n.za));const f=u[5];f!=null&&typeof f=="number"&&0<f&&(s=1.5*f,n.K=s,n.h.info("backChannelRequestTimeoutMs_="+s)),s=n;const g=t.g;if(g){const v=g.g?g.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(v){var i=s.i;!i.g&&(ee(v,"spdy")||ee(v,"quic")||ee(v,"h2"))&&(i.j=i.l,i.g=new Set,i.h&&(Xr(i,i.h),i.h=null))}if(s.D){const k=g.g?g.g.getResponseHeader("X-HTTP-Session-Id"):null;k&&(s.sa=k,M(s.F,s.D,k))}}n.G=3,n.j&&n.j.xa(),n.$&&(n.O=Date.now()-t.F,n.h.info("Handshake RTT: "+n.O+"ms")),s=n;var o=t;if(s.oa=lc(s,s.H?s.la:null,s.W),o.J){Qa(s.i,o);var a=o,c=s.K;c&&a.setTimeout(c),a.B&&(ms(a),fn(a)),s.g=o}else ic(s);0<n.l.length&&Is(n)}else u[0]!="stop"&&u[0]!="close"||Be(n,7);else n.G==3&&(u[0]=="stop"||u[0]=="close"?u[0]=="stop"?Be(n,7):ei(n):u[0]!="noop"&&n.j&&n.j.wa(u),n.A=0)}}zt(4)}catch{}}function hd(t){if(t.R&&typeof t.R=="function")return t.R();if(typeof t=="string")return t.split("");if(or(t)){for(var e=[],n=t.length,s=0;s<n;s++)e.push(t[s]);return e}e=[],n=0;for(s in t)e[n++]=t[s];return e}function Wr(t,e){if(t.forEach&&typeof t.forEach=="function")t.forEach(e,void 0);else if(or(t)||typeof t=="string")ma(t,e,void 0);else{if(t.T&&typeof t.T=="function")var n=t.T();else if(t.R&&typeof t.R=="function")n=void 0;else if(or(t)||typeof t=="string"){n=[];for(var s=t.length,r=0;r<s;r++)n.push(r)}else for(r in n=[],s=0,t)n[s++]=r;s=hd(t),r=s.length;for(var i=0;i<r;i++)e.call(void 0,s[i],n&&n[i],t)}}function Tt(t,e){this.h={},this.g=[],this.i=0;var n=arguments.length;if(1<n){if(n%2)throw Error("Uneven number of arguments");for(var s=0;s<n;s+=2)this.set(arguments[s],arguments[s+1])}else if(t)if(t instanceof Tt)for(n=t.T(),s=0;s<n.length;s++)this.set(n[s],t.get(n[s]));else for(s in t)this.set(s,t[s])}m=Tt.prototype;m.R=function(){Qr(this);for(var t=[],e=0;e<this.g.length;e++)t.push(this.h[this.g[e]]);return t};m.T=function(){return Qr(this),this.g.concat()};function Qr(t){if(t.i!=t.g.length){for(var e=0,n=0;e<t.g.length;){var s=t.g[e];Ge(t.h,s)&&(t.g[n++]=s),e++}t.g.length=n}if(t.i!=t.g.length){var r={};for(n=e=0;e<t.g.length;)s=t.g[e],Ge(r,s)||(t.g[n++]=s,r[s]=1),e++;t.g.length=n}}m.get=function(t,e){return Ge(this.h,t)?this.h[t]:e};m.set=function(t,e){Ge(this.h,t)||(this.i++,this.g.push(t)),this.h[t]=e};m.forEach=function(t,e){for(var n=this.T(),s=0;s<n.length;s++){var r=n[s],i=this.get(r);t.call(e,i,r,this)}};function Ge(t,e){return Object.prototype.hasOwnProperty.call(t,e)}var ja=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;function dd(t,e){if(t){t=t.split("&");for(var n=0;n<t.length;n++){var s=t[n].indexOf("="),r=null;if(0<=s){var i=t[n].substring(0,s);r=t[n].substring(s+1)}else i=t[n];e(i,r?decodeURIComponent(r.replace(/\+/g," ")):"")}}}function We(t,e){if(this.i=this.s=this.j="",this.m=null,this.o=this.l="",this.g=!1,t instanceof We){this.g=e!==void 0?e:t.g,Gn(this,t.j),this.s=t.s,Wn(this,t.i),Qn(this,t.m),this.l=t.l,e=t.h;var n=new Gt;n.i=e.i,e.g&&(n.g=new Tt(e.g),n.h=e.h),no(this,n),this.o=t.o}else t&&(n=String(t).match(ja))?(this.g=!!e,Gn(this,n[1]||"",!0),this.s=Ut(n[2]||""),Wn(this,n[3]||"",!0),Qn(this,n[4]),this.l=Ut(n[5]||"",!0),no(this,n[6]||"",!0),this.o=Ut(n[7]||"")):(this.g=!!e,this.h=new Gt(null,this.g))}We.prototype.toString=function(){var t=[],e=this.j;e&&t.push(Mt(e,so,!0),":");var n=this.i;return(n||e=="file")&&(t.push("//"),(e=this.s)&&t.push(Mt(e,so,!0),"@"),t.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),n=this.m,n!=null&&t.push(":",String(n))),(n=this.l)&&(this.i&&n.charAt(0)!="/"&&t.push("/"),t.push(Mt(n,n.charAt(0)=="/"?yd:md,!0))),(n=this.h.toString())&&t.push("?",n),(n=this.o)&&t.push("#",Mt(n,wd)),t.join("")};function Ie(t){return new We(t)}function Gn(t,e,n){t.j=n?Ut(e,!0):e,t.j&&(t.j=t.j.replace(/:$/,""))}function Wn(t,e,n){t.i=n?Ut(e,!0):e}function Qn(t,e){if(e){if(e=Number(e),isNaN(e)||0>e)throw Error("Bad port number "+e);t.m=e}else t.m=null}function no(t,e,n){e instanceof Gt?(t.h=e,Ed(t.h,t.g)):(n||(e=Mt(e,vd)),t.h=new Gt(e,t.g))}function M(t,e,n){t.h.set(e,n)}function ys(t){return M(t,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),t}function fd(t){return t instanceof We?Ie(t):new We(t,void 0)}function pd(t,e,n,s){var r=new We(null,void 0);return t&&Gn(r,t),e&&Wn(r,e),n&&Qn(r,n),s&&(r.l=s),r}function Ut(t,e){return t?e?decodeURI(t.replace(/%25/g,"%2525")):decodeURIComponent(t):""}function Mt(t,e,n){return typeof t=="string"?(t=encodeURI(t).replace(e,gd),n&&(t=t.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),t):null}function gd(t){return t=t.charCodeAt(0),"%"+(t>>4&15).toString(16)+(t&15).toString(16)}var so=/[#\/\?@]/g,md=/[#\?:]/g,yd=/[#\?]/g,vd=/[#\?@]/g,wd=/#/g;function Gt(t,e){this.h=this.g=null,this.i=t||null,this.j=!!e}function Ue(t){t.g||(t.g=new Tt,t.h=0,t.i&&dd(t.i,function(e,n){t.add(decodeURIComponent(e.replace(/\+/g," ")),n)}))}m=Gt.prototype;m.add=function(t,e){Ue(this),this.i=null,t=_t(this,t);var n=this.g.get(t);return n||this.g.set(t,n=[]),n.push(e),this.h+=1,this};function qa(t,e){Ue(t),e=_t(t,e),Ge(t.g.h,e)&&(t.i=null,t.h-=t.g.get(e).length,t=t.g,Ge(t.h,e)&&(delete t.h[e],t.i--,t.g.length>2*t.i&&Qr(t)))}function Ha(t,e){return Ue(t),e=_t(t,e),Ge(t.g.h,e)}m.forEach=function(t,e){Ue(this),this.g.forEach(function(n,s){ma(n,function(r){t.call(e,r,s,this)},this)},this)};m.T=function(){Ue(this);for(var t=this.g.R(),e=this.g.T(),n=[],s=0;s<e.length;s++)for(var r=t[s],i=0;i<r.length;i++)n.push(e[s]);return n};m.R=function(t){Ue(this);var e=[];if(typeof t=="string")Ha(this,t)&&(e=Gi(e,this.g.get(_t(this,t))));else{t=this.g.R();for(var n=0;n<t.length;n++)e=Gi(e,t[n])}return e};m.set=function(t,e){return Ue(this),this.i=null,t=_t(this,t),Ha(this,t)&&(this.h-=this.g.get(t).length),this.g.set(t,[e]),this.h+=1,this};m.get=function(t,e){return t?(t=this.R(t),0<t.length?String(t[0]):e):e};function Ka(t,e,n){qa(t,e),0<n.length&&(t.i=null,t.g.set(_t(t,e),Pr(n)),t.h+=n.length)}m.toString=function(){if(this.i)return this.i;if(!this.g)return"";for(var t=[],e=this.g.T(),n=0;n<e.length;n++){var s=e[n],r=encodeURIComponent(String(s));s=this.R(s);for(var i=0;i<s.length;i++){var o=r;s[i]!==""&&(o+="="+encodeURIComponent(String(s[i]))),t.push(o)}}return this.i=t.join("&")};function _t(t,e){return e=String(e),t.j&&(e=e.toLowerCase()),e}function Ed(t,e){e&&!t.j&&(Ue(t),t.i=null,t.g.forEach(function(n,s){var r=s.toLowerCase();s!=r&&(qa(this,s),Ka(this,r,n))},t)),t.j=e}var Id=class{constructor(t,e){this.h=t,this.g=e}};function za(t){this.l=t||Td,I.PerformanceNavigationTiming?(t=I.performance.getEntriesByType("navigation"),t=0<t.length&&(t[0].nextHopProtocol=="hq"||t[0].nextHopProtocol=="h2")):t=!!(I.g&&I.g.Ea&&I.g.Ea()&&I.g.Ea().Zb),this.j=t?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}var Td=10;function Ga(t){return t.h?!0:t.g?t.g.size>=t.j:!1}function Wa(t){return t.h?1:t.g?t.g.size:0}function yr(t,e){return t.h?t.h==e:t.g?t.g.has(e):!1}function Xr(t,e){t.g?t.g.add(e):t.h=e}function Qa(t,e){t.h&&t.h==e?t.h=null:t.g&&t.g.has(e)&&t.g.delete(e)}za.prototype.cancel=function(){if(this.i=Xa(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const t of this.g.values())t.cancel();this.g.clear()}};function Xa(t){if(t.h!=null)return t.i.concat(t.h.D);if(t.g!=null&&t.g.size!==0){let e=t.i;for(const n of t.g.values())e=e.concat(n.D);return e}return Pr(t.i)}function Yr(){}Yr.prototype.stringify=function(t){return I.JSON.stringify(t,void 0)};Yr.prototype.parse=function(t){return I.JSON.parse(t,void 0)};function _d(){this.g=new Yr}function Sd(t,e,n){const s=n||"";try{Wr(t,function(r,i){let o=r;cn(r)&&(o=$r(r)),e.push(s+i+"="+encodeURIComponent(o))})}catch(r){throw e.push(s+"type="+encodeURIComponent("_badmap")),r}}function bd(t,e){const n=new ds;if(I.Image){const s=new Image;s.onload=Cn(kn,n,s,"TestLoadImage: loaded",!0,e),s.onerror=Cn(kn,n,s,"TestLoadImage: error",!1,e),s.onabort=Cn(kn,n,s,"TestLoadImage: abort",!1,e),s.ontimeout=Cn(kn,n,s,"TestLoadImage: timeout",!1,e),I.setTimeout(function(){s.ontimeout&&s.ontimeout()},1e4),s.src=t}else e(!1)}function kn(t,e,n,s,r){try{e.onload=null,e.onerror=null,e.onabort=null,e.ontimeout=null,r(s)}catch{}}function pn(t){this.l=t.$b||null,this.j=t.ib||!1}X(pn,Kr);pn.prototype.g=function(){return new vs(this.l,this.j)};pn.prototype.i=function(t){return function(){return t}}({});function vs(t,e){H.call(this),this.D=t,this.u=e,this.m=void 0,this.readyState=Jr,this.status=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.v=new Headers,this.h=null,this.C="GET",this.B="",this.g=!1,this.A=this.j=this.l=null}X(vs,H);var Jr=0;m=vs.prototype;m.open=function(t,e){if(this.readyState!=Jr)throw this.abort(),Error("Error reopening a connection");this.C=t,this.B=e,this.readyState=1,Wt(this)};m.send=function(t){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const e={headers:this.v,method:this.C,credentials:this.m,cache:void 0};t&&(e.body=t),(this.D||I).fetch(new Request(this.B,e)).then(this.Va.bind(this),this.ha.bind(this))};m.abort=function(){this.response=this.responseText="",this.v=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted."),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,gn(this)),this.readyState=Jr};m.Va=function(t){if(this.g&&(this.l=t,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=t.headers,this.readyState=2,Wt(this)),this.g&&(this.readyState=3,Wt(this),this.g)))if(this.responseType==="arraybuffer")t.arrayBuffer().then(this.Ta.bind(this),this.ha.bind(this));else if(typeof I.ReadableStream!="undefined"&&"body"in t){if(this.j=t.body.getReader(),this.u){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.A=new TextDecoder;Ya(this)}else t.text().then(this.Ua.bind(this),this.ha.bind(this))};function Ya(t){t.j.read().then(t.Sa.bind(t)).catch(t.ha.bind(t))}m.Sa=function(t){if(this.g){if(this.u&&t.value)this.response.push(t.value);else if(!this.u){var e=t.value?t.value:new Uint8Array(0);(e=this.A.decode(e,{stream:!t.done}))&&(this.response=this.responseText+=e)}t.done?gn(this):Wt(this),this.readyState==3&&Ya(this)}};m.Ua=function(t){this.g&&(this.response=this.responseText=t,gn(this))};m.Ta=function(t){this.g&&(this.response=t,gn(this))};m.ha=function(){this.g&&gn(this)};function gn(t){t.readyState=4,t.l=null,t.j=null,t.A=null,Wt(t)}m.setRequestHeader=function(t,e){this.v.append(t,e)};m.getResponseHeader=function(t){return this.h&&this.h.get(t.toLowerCase())||""};m.getAllResponseHeaders=function(){if(!this.h)return"";const t=[],e=this.h.entries();for(var n=e.next();!n.done;)n=n.value,t.push(n[0]+": "+n[1]),n=e.next();return t.join(`\r
`)};function Wt(t){t.onreadystatechange&&t.onreadystatechange.call(t)}Object.defineProperty(vs.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(t){this.m=t?"include":"same-origin"}});var Cd=I.JSON.parse;function U(t){H.call(this),this.headers=new Tt,this.u=t||null,this.h=!1,this.C=this.g=null,this.H="",this.m=0,this.j="",this.l=this.F=this.v=this.D=!1,this.B=0,this.A=null,this.J=Ja,this.K=this.L=!1}X(U,H);var Ja="",Ad=/^https?$/i,kd=["POST","PUT"];m=U.prototype;m.ea=function(t,e,n,s){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.H+"; newUri="+t);e=e?e.toUpperCase():"GET",this.H=t,this.j="",this.m=0,this.D=!1,this.h=!0,this.g=this.u?this.u.g():fr.g(),this.C=this.u?to(this.u):to(fr),this.g.onreadystatechange=G(this.Fa,this);try{this.F=!0,this.g.open(e,String(t),!0),this.F=!1}catch(i){ro(this,i);return}t=n||"";const r=new Tt(this.headers);s&&Wr(s,function(i,o){r.set(o,i)}),s=Vh(r.T()),n=I.FormData&&t instanceof I.FormData,!(0<=ga(kd,e))||s||n||r.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8"),r.forEach(function(i,o){this.g.setRequestHeader(o,i)},this),this.J&&(this.g.responseType=this.J),"withCredentials"in this.g&&this.g.withCredentials!==this.L&&(this.g.withCredentials=this.L);try{tc(this),0<this.B&&((this.K=Dd(this.g))?(this.g.timeout=this.B,this.g.ontimeout=G(this.pa,this)):this.A=Hr(this.pa,this.B,this)),this.v=!0,this.g.send(t),this.v=!1}catch(i){ro(this,i)}};function Dd(t){return ft&&Hh()&&typeof t.timeout=="number"&&t.ontimeout!==void 0}function Rd(t){return t.toLowerCase()=="content-type"}m.pa=function(){typeof Mr!="undefined"&&this.g&&(this.j="Timed out after "+this.B+"ms, aborting",this.m=8,W(this,"timeout"),this.abort(8))};function ro(t,e){t.h=!1,t.g&&(t.l=!0,t.g.abort(),t.l=!1),t.j=e,t.m=5,Za(t),ws(t)}function Za(t){t.D||(t.D=!0,W(t,"complete"),W(t,"error"))}m.abort=function(t){this.g&&this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1,this.m=t||7,W(this,"complete"),W(this,"abort"),ws(this))};m.M=function(){this.g&&(this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1),ws(this,!0)),U.Z.M.call(this)};m.Fa=function(){this.s||(this.F||this.v||this.l?ec(this):this.cb())};m.cb=function(){ec(this)};function ec(t){if(t.h&&typeof Mr!="undefined"&&(!t.C[1]||ye(t)!=4||t.ba()!=2)){if(t.v&&ye(t)==4)Hr(t.Fa,0,t);else if(W(t,"readystatechange"),ye(t)==4){t.h=!1;try{const a=t.ba();e:switch(a){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var e=!0;break e;default:e=!1}var n;if(!(n=e)){var s;if(s=a===0){var r=String(t.H).match(ja)[1]||null;if(!r&&I.self&&I.self.location){var i=I.self.location.protocol;r=i.substr(0,i.length-1)}s=!Ad.test(r?r.toLowerCase():"")}n=s}if(n)W(t,"complete"),W(t,"success");else{t.m=6;try{var o=2<ye(t)?t.g.statusText:""}catch{o=""}t.j=o+" ["+t.ba()+"]",Za(t)}}finally{ws(t)}}}}function ws(t,e){if(t.g){tc(t);const n=t.g,s=t.C[0]?qn:null;t.g=null,t.C=null,e||W(t,"ready");try{n.onreadystatechange=s}catch{}}}function tc(t){t.g&&t.K&&(t.g.ontimeout=null),t.A&&(I.clearTimeout(t.A),t.A=null)}function ye(t){return t.g?t.g.readyState:0}m.ba=function(){try{return 2<ye(this)?this.g.status:-1}catch{return-1}};m.ga=function(){try{return this.g?this.g.responseText:""}catch{return""}};m.Qa=function(t){if(this.g){var e=this.g.responseText;return t&&e.indexOf(t)==0&&(e=e.substring(t.length)),Cd(e)}};function io(t){try{if(!t.g)return null;if("response"in t.g)return t.g.response;switch(t.J){case Ja:case"text":return t.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in t.g)return t.g.mozResponseArrayBuffer}return null}catch{return null}}m.Da=function(){return this.m};m.La=function(){return typeof this.j=="string"?this.j:String(this.j)};function Nd(t){let e="";return Lr(t,function(n,s){e+=s,e+=":",e+=n,e+=`\r
`}),e}function Zr(t,e,n){e:{for(s in n){var s=!1;break e}s=!0}s||(n=Nd(n),typeof t=="string"?n!=null&&encodeURIComponent(String(n)):M(t,e,n))}function Ot(t,e,n){return n&&n.internalChannelParams&&n.internalChannelParams[t]||e}function nc(t){this.za=0,this.l=[],this.h=new ds,this.la=this.oa=this.F=this.W=this.g=this.sa=this.D=this.aa=this.o=this.P=this.s=null,this.Za=this.V=0,this.Xa=Ot("failFast",!1,t),this.N=this.v=this.u=this.m=this.j=null,this.X=!0,this.I=this.ta=this.U=-1,this.Y=this.A=this.C=0,this.Pa=Ot("baseRetryDelayMs",5e3,t),this.$a=Ot("retryDelaySeedMs",1e4,t),this.Ya=Ot("forwardChannelMaxRetries",2,t),this.ra=Ot("forwardChannelRequestTimeoutMs",2e4,t),this.qa=t&&t.xmlHttpFactory||void 0,this.Ba=t&&t.Yb||!1,this.K=void 0,this.H=t&&t.supportsCrossDomainXhr||!1,this.J="",this.i=new za(t&&t.concurrentRequestLimit),this.Ca=new _d,this.ja=t&&t.fastHandshake||!1,this.Ra=t&&t.Wb||!1,t&&t.Aa&&this.h.Aa(),t&&t.forceLongPolling&&(this.X=!1),this.$=!this.ja&&this.X&&t&&t.detectBufferingProxy||!1,this.ka=void 0,this.O=0,this.L=!1,this.B=null,this.Wa=!t||t.Xb!==!1}m=nc.prototype;m.ma=8;m.G=1;function ei(t){if(sc(t),t.G==3){var e=t.V++,n=Ie(t.F);M(n,"SID",t.J),M(n,"RID",e),M(n,"TYPE","terminate"),mn(t,n),e=new dn(t,t.h,e,void 0),e.K=2,e.v=ys(Ie(n)),n=!1,I.navigator&&I.navigator.sendBeacon&&(n=I.navigator.sendBeacon(e.v.toString(),"")),!n&&I.Image&&(new Image().src=e.v,n=!0),n||(e.g=hc(e.l,null),e.g.ea(e.v)),e.F=Date.now(),fn(e)}uc(t)}m.hb=function(t){try{this.h.info("Origin Trials invoked: "+t)}catch{}};function Es(t){t.g&&(ni(t),t.g.cancel(),t.g=null)}function sc(t){Es(t),t.u&&(I.clearTimeout(t.u),t.u=null),Xn(t),t.i.cancel(),t.m&&(typeof t.m=="number"&&I.clearTimeout(t.m),t.m=null)}function Xs(t,e){t.l.push(new Id(t.Za++,e)),t.G==3&&Is(t)}function Is(t){Ga(t.i)||t.m||(t.m=!0,jr(t.Ha,t),t.C=0)}function Od(t,e){return Wa(t.i)>=t.i.j-(t.m?1:0)?!1:t.m?(t.l=e.D.concat(t.l),!0):t.G==1||t.G==2||t.C>=(t.Xa?0:t.Ya)?!1:(t.m=ln(G(t.Ha,t,e),cc(t,t.C)),t.C++,!0)}m.Ha=function(t){if(this.m)if(this.m=null,this.G==1){if(!t){this.V=Math.floor(1e5*Math.random()),t=this.V++;const r=new dn(this,this.h,t,void 0);let i=this.s;if(this.P&&(i?(i=ya(i),va(i,this.P)):i=this.P),this.o===null&&(r.H=i),this.ja)e:{for(var e=0,n=0;n<this.l.length;n++){t:{var s=this.l[n];if("__data__"in s.g&&(s=s.g.__data__,typeof s=="string")){s=s.length;break t}s=void 0}if(s===void 0)break;if(e+=s,4096<e){e=n;break e}if(e===4096||n===this.l.length-1){e=n+1;break e}}e=1e3}else e=1e3;e=rc(this,r,e),n=Ie(this.F),M(n,"RID",t),M(n,"CVER",22),this.D&&M(n,"X-HTTP-Session-Id",this.D),mn(this,n),this.o&&i&&Zr(n,this.o,i),Xr(this.i,r),this.Ra&&M(n,"TYPE","init"),this.ja?(M(n,"$req",e),M(n,"SID","null"),r.$=!0,gr(r,n,null)):gr(r,n,e),this.G=2}}else this.G==3&&(t?oo(this,t):this.l.length==0||Ga(this.i)||oo(this))};function oo(t,e){var n;e?n=e.m:n=t.V++;const s=Ie(t.F);M(s,"SID",t.J),M(s,"RID",n),M(s,"AID",t.U),mn(t,s),t.o&&t.s&&Zr(s,t.o,t.s),n=new dn(t,t.h,n,t.C+1),t.o===null&&(n.H=t.s),e&&(t.l=e.D.concat(t.l)),e=rc(t,n,1e3),n.setTimeout(Math.round(.5*t.ra)+Math.round(.5*t.ra*Math.random())),Xr(t.i,n),gr(n,s,e)}function mn(t,e){t.j&&Wr({},function(n,s){M(e,s,n)})}function rc(t,e,n){n=Math.min(t.l.length,n);var s=t.j?G(t.j.Oa,t.j,t):null;e:{var r=t.l;let i=-1;for(;;){const o=["count="+n];i==-1?0<n?(i=r[0].h,o.push("ofs="+i)):i=0:o.push("ofs="+i);let a=!0;for(let c=0;c<n;c++){let u=r[c].h;const l=r[c].g;if(u-=i,0>u)i=Math.max(0,r[c].h-100),a=!1;else try{Sd(l,o,"req"+u+"_")}catch{s&&s(l)}}if(a){s=o.join("&");break e}}}return t=t.l.splice(0,n),e.D=t,s}function ic(t){t.g||t.u||(t.Y=1,jr(t.Ga,t),t.A=0)}function ti(t){return t.g||t.u||3<=t.A?!1:(t.Y++,t.u=ln(G(t.Ga,t),cc(t,t.A)),t.A++,!0)}m.Ga=function(){if(this.u=null,oc(this),this.$&&!(this.L||this.g==null||0>=this.O)){var t=2*this.O;this.h.info("BP detection timer enabled: "+t),this.B=ln(G(this.bb,this),t)}};m.bb=function(){this.B&&(this.B=null,this.h.info("BP detection timeout reached."),this.h.info("Buffering proxy detected and switch to long-polling!"),this.N=!1,this.L=!0,ne(10),Es(this),oc(this))};function ni(t){t.B!=null&&(I.clearTimeout(t.B),t.B=null)}function oc(t){t.g=new dn(t,t.h,"rpc",t.Y),t.o===null&&(t.g.H=t.s),t.g.O=0;var e=Ie(t.oa);M(e,"RID","rpc"),M(e,"SID",t.J),M(e,"CI",t.N?"0":"1"),M(e,"AID",t.U),mn(t,e),M(e,"TYPE","xmlhttp"),t.o&&t.s&&Zr(e,t.o,t.s),t.K&&t.g.setTimeout(t.K);var n=t.g;t=t.la,n.K=1,n.v=ys(Ie(e)),n.s=null,n.U=!0,Fa(n,t)}m.ab=function(){this.v!=null&&(this.v=null,Es(this),ti(this),ne(19))};function Xn(t){t.v!=null&&(I.clearTimeout(t.v),t.v=null)}function ac(t,e){var n=null;if(t.g==e){Xn(t),ni(t),t.g=null;var s=2}else if(yr(t.i,e))n=e.D,Qa(t.i,e),s=1;else return;if(t.I=e.N,t.G!=0){if(e.i)if(s==1){n=e.s?e.s.length:0,e=Date.now()-e.F;var r=t.C;s=fs(),W(s,new Pa(s,n,e,r)),Is(t)}else ic(t);else if(r=e.o,r==3||r==0&&0<t.I||!(s==1&&Od(t,e)||s==2&&ti(t)))switch(n&&0<n.length&&(e=t.i,e.i=e.i.concat(n)),r){case 1:Be(t,5);break;case 4:Be(t,10);break;case 3:Be(t,6);break;default:Be(t,2)}}}function cc(t,e){let n=t.Pa+Math.floor(Math.random()*t.$a);return t.j||(n*=2),n*e}function Be(t,e){if(t.h.info("Error code "+e),e==2){var n=null;t.j&&(n=null);var s=G(t.jb,t);n||(n=new We("//www.google.com/images/cleardot.gif"),I.location&&I.location.protocol=="http"||Gn(n,"https"),ys(n)),bd(n.toString(),s)}else ne(2);t.G=0,t.j&&t.j.va(e),uc(t),sc(t)}m.jb=function(t){t?(this.h.info("Successfully pinged google.com"),ne(2)):(this.h.info("Failed to ping google.com"),ne(1))};function uc(t){t.G=0,t.I=-1,t.j&&((Xa(t.i).length!=0||t.l.length!=0)&&(t.i.i.length=0,Pr(t.l),t.l.length=0),t.j.ua())}function lc(t,e,n){let s=fd(n);if(s.i!="")e&&Wn(s,e+"."+s.i),Qn(s,s.m);else{const r=I.location;s=pd(r.protocol,e?e+"."+r.hostname:r.hostname,+r.port,n)}return t.aa&&Lr(t.aa,function(r,i){M(s,i,r)}),e=t.D,n=t.sa,e&&n&&M(s,e,n),M(s,"VER",t.ma),mn(t,s),s}function hc(t,e,n){if(e&&!t.H)throw Error("Can't create secondary domain capable XhrIo object.");return e=n&&t.Ba&&!t.qa?new U(new pn({ib:!0})):new U(t.qa),e.L=t.H,e}function dc(){}m=dc.prototype;m.xa=function(){};m.wa=function(){};m.va=function(){};m.ua=function(){};m.Oa=function(){};function Yn(){if(ft&&!(10<=Number(Kh)))throw Error("Environmental error: no available transport.")}Yn.prototype.g=function(t,e){return new oe(t,e)};function oe(t,e){H.call(this),this.g=new nc(e),this.l=t,this.h=e&&e.messageUrlParams||null,t=e&&e.messageHeaders||null,e&&e.clientProtocolHeaderRequired&&(t?t["X-Client-Protocol"]="webchannel":t={"X-Client-Protocol":"webchannel"}),this.g.s=t,t=e&&e.initMessageHeaders||null,e&&e.messageContentType&&(t?t["X-WebChannel-Content-Type"]=e.messageContentType:t={"X-WebChannel-Content-Type":e.messageContentType}),e&&e.ya&&(t?t["X-WebChannel-Client-Profile"]=e.ya:t={"X-WebChannel-Client-Profile":e.ya}),this.g.P=t,(t=e&&e.httpHeadersOverwriteParam)&&!Hn(t)&&(this.g.o=t),this.A=e&&e.supportsCrossDomainXhr||!1,this.v=e&&e.sendRawJson||!1,(e=e&&e.httpSessionIdParam)&&!Hn(e)&&(this.g.D=e,t=this.h,t!==null&&e in t&&(t=this.h,e in t&&delete t[e])),this.j=new St(this)}X(oe,H);oe.prototype.m=function(){this.g.j=this.j,this.A&&(this.g.H=!0);var t=this.g,e=this.l,n=this.h||void 0;t.Wa&&(t.h.info("Origin Trials enabled."),jr(G(t.hb,t,e))),ne(0),t.W=e,t.aa=n||{},t.N=t.X,t.F=lc(t,null,t.W),Is(t)};oe.prototype.close=function(){ei(this.g)};oe.prototype.u=function(t){if(typeof t=="string"){var e={};e.__data__=t,Xs(this.g,e)}else this.v?(e={},e.__data__=$r(t),Xs(this.g,e)):Xs(this.g,t)};oe.prototype.M=function(){this.g.j=null,delete this.j,ei(this.g),delete this.g,oe.Z.M.call(this)};function fc(t){zr.call(this);var e=t.__sm__;if(e){e:{for(const n in e){t=n;break e}t=void 0}(this.i=t)&&(t=this.i,e=e!==null&&t in e?e[t]:void 0),this.data=e}else this.data=t}X(fc,zr);function pc(){Gr.call(this),this.status=1}X(pc,Gr);function St(t){this.g=t}X(St,dc);St.prototype.xa=function(){W(this.g,"a")};St.prototype.wa=function(t){W(this.g,new fc(t))};St.prototype.va=function(t){W(this.g,new pc(t))};St.prototype.ua=function(){W(this.g,"b")};Yn.prototype.createWebChannel=Yn.prototype.g;oe.prototype.send=oe.prototype.u;oe.prototype.open=oe.prototype.m;oe.prototype.close=oe.prototype.close;ps.NO_ERROR=0;ps.TIMEOUT=8;ps.HTTP_ERROR=6;La.COMPLETE="complete";xa.EventType=hn;hn.OPEN="a";hn.CLOSE="b";hn.ERROR="c";hn.MESSAGE="d";H.prototype.listen=H.prototype.N;U.prototype.listenOnce=U.prototype.O;U.prototype.getLastError=U.prototype.La;U.prototype.getLastErrorCode=U.prototype.Da;U.prototype.getStatus=U.prototype.ba;U.prototype.getResponseJson=U.prototype.Qa;U.prototype.getResponseText=U.prototype.ga;U.prototype.send=U.prototype.ea;var Md=function(){return new Yn},Pd=function(){return fs()},Ys=ps,Ld=La,xd=et,ao={rb:0,ub:1,vb:2,Ob:3,Tb:4,Qb:5,Rb:6,Pb:7,Nb:8,Sb:9,PROXY:10,NOPROXY:11,Lb:12,Hb:13,Ib:14,Gb:15,Jb:16,Kb:17,nb:18,mb:19,ob:20},Ud=pn,Dn=xa,Fd=U;const co="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class se{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}se.UNAUTHENTICATED=new se(null),se.GOOGLE_CREDENTIALS=new se("google-credentials-uid"),se.FIRST_PARTY=new se("first-party-uid"),se.MOCK_USER=new se("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let bt="9.8.4";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qe=new Dr("@firebase/firestore");function uo(){return Qe.logLevel}function y(t,...e){if(Qe.logLevel<=R.DEBUG){const n=e.map(si);Qe.debug(`Firestore (${bt}): ${t}`,...n)}}function Oe(t,...e){if(Qe.logLevel<=R.ERROR){const n=e.map(si);Qe.error(`Firestore (${bt}): ${t}`,...n)}}function lo(t,...e){if(Qe.logLevel<=R.WARN){const n=e.map(si);Qe.warn(`Firestore (${bt}): ${t}`,...n)}}function si(t){if(typeof t=="string")return t;try{return e=t,JSON.stringify(e)}catch{return t}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _(t="Unexpected state"){const e=`FIRESTORE (${bt}) INTERNAL ASSERTION FAILED: `+t;throw Oe(e),new Error(e)}function O(t,e){t||_()}function S(t,e){return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const p={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class E extends Ze{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class je{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vd{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Bd{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(se.UNAUTHENTICATED))}shutdown(){}}class $d{constructor(e){this.t=e,this.currentUser=se.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){let s=this.i;const r=c=>this.i!==s?(s=this.i,n(c)):Promise.resolve();let i=new je;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new je,e.enqueueRetryable(()=>r(this.currentUser))};const o=()=>{const c=i;e.enqueueRetryable(async()=>{await c.promise,await r(this.currentUser)})},a=c=>{y("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.auth.addAuthTokenListener(this.o),o()};this.t.onInit(c=>a(c)),setTimeout(()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?a(c):(y("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new je)}},0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(s=>this.i!==e?(y("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):s?(O(typeof s.accessToken=="string"),new Vd(s.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){const e=this.auth&&this.auth.getUid();return O(e===null||typeof e=="string"),new se(e)}}class jd{constructor(e,n,s){this.type="FirstParty",this.user=se.FIRST_PARTY,this.headers=new Map,this.headers.set("X-Goog-AuthUser",n);const r=e.auth.getAuthHeaderValueForFirstParty([]);r&&this.headers.set("Authorization",r),s&&this.headers.set("X-Goog-Iam-Authorization-Token",s)}}class qd{constructor(e,n,s){this.h=e,this.l=n,this.m=s}getToken(){return Promise.resolve(new jd(this.h,this.l,this.m))}start(e,n){e.enqueueRetryable(()=>n(se.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Hd{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Kd{constructor(e){this.g=e,this.forceRefresh=!1,this.appCheck=null,this.p=null}start(e,n){const s=i=>{i.error!=null&&y("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.p;return this.p=i.token,y("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>s(i))};const r=i=>{y("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.appCheck.addTokenListener(this.o)};this.g.onInit(i=>r(i)),setTimeout(()=>{if(!this.appCheck){const i=this.g.getImmediate({optional:!0});i?r(i):y("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(O(typeof n.token=="string"),this.p=n.token,new Hd(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zd(t){const e=typeof self!="undefined"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let s=0;s<t;s++)n[s]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gc{static I(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=Math.floor(256/e.length)*e.length;let s="";for(;s.length<20;){const r=zd(40);for(let i=0;i<r.length;++i)s.length<20&&r[i]<n&&(s+=e.charAt(r[i]%e.length))}return s}}function N(t,e){return t<e?-1:t>e?1:0}function pt(t,e,n){return t.length===e.length&&t.every((s,r)=>n(s,e[r]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F{constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new E(p.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new E(p.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<-62135596800)throw new E(p.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new E(p.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return F.fromMillis(Date.now())}static fromDate(e){return F.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),s=Math.floor(1e6*(e-1e3*n));return new F(n,s)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?N(this.nanoseconds,e.nanoseconds):N(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class b{constructor(e){this.timestamp=e}static fromTimestamp(e){return new b(e)}static min(){return new b(new F(0,0))}static max(){return new b(new F(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qt{constructor(e,n,s){n===void 0?n=0:n>e.length&&_(),s===void 0?s=e.length-n:s>e.length-n&&_(),this.segments=e,this.offset=n,this.len=s}get length(){return this.len}isEqual(e){return Qt.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof Qt?e.forEach(s=>{n.push(s)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,s=this.limit();n<s;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const s=Math.min(e.length,n.length);for(let r=0;r<s;r++){const i=e.get(r),o=n.get(r);if(i<o)return-1;if(i>o)return 1}return e.length<n.length?-1:e.length>n.length?1:0}}class P extends Qt{construct(e,n,s){return new P(e,n,s)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...e){const n=[];for(const s of e){if(s.indexOf("//")>=0)throw new E(p.INVALID_ARGUMENT,`Invalid segment (${s}). Paths must not contain // in them.`);n.push(...s.split("/").filter(r=>r.length>0))}return new P(n)}static emptyPath(){return new P([])}}const Gd=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class J extends Qt{construct(e,n,s){return new J(e,n,s)}static isValidIdentifier(e){return Gd.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),J.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new J(["__name__"])}static fromServerFormat(e){const n=[];let s="",r=0;const i=()=>{if(s.length===0)throw new E(p.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(s),s=""};let o=!1;for(;r<e.length;){const a=e[r];if(a==="\\"){if(r+1===e.length)throw new E(p.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[r+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new E(p.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);s+=c,r+=2}else a==="`"?(o=!o,r++):a!=="."||o?(s+=a,r++):(i(),r++)}if(i(),o)throw new E(p.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new J(n)}static emptyPath(){return new J([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class w{constructor(e){this.path=e}static fromPath(e){return new w(P.fromString(e))}static fromName(e){return new w(P.fromString(e).popFirst(5))}static empty(){return new w(P.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&P.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return P.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new w(new P(e.slice()))}}function Wd(t,e){const n=t.toTimestamp().seconds,s=t.toTimestamp().nanoseconds+1,r=b.fromTimestamp(s===1e9?new F(n+1,0):new F(n,s));return new Me(r,w.empty(),e)}function Qd(t){return new Me(t.readTime,t.key,-1)}class Me{constructor(e,n,s){this.readTime=e,this.documentKey=n,this.largestBatchId=s}static min(){return new Me(b.min(),w.empty(),-1)}static max(){return new Me(b.max(),w.empty(),-1)}}function Xd(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=w.comparator(t.documentKey,e.documentKey),n!==0?n:N(t.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yd="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Jd{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yn(t){if(t.code!==p.FAILED_PRECONDITION||t.message!==Yd)throw t;y("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class d{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&_(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new d((s,r)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(s,r)},this.catchCallback=i=>{this.wrapFailure(n,i).next(s,r)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof d?n:d.resolve(n)}catch(n){return d.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):d.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):d.reject(n)}static resolve(e){return new d((n,s)=>{n(e)})}static reject(e){return new d((n,s)=>{s(e)})}static waitFor(e){return new d((n,s)=>{let r=0,i=0,o=!1;e.forEach(a=>{++r,a.next(()=>{++i,o&&i===r&&n()},c=>s(c))}),o=!0,i===r&&n()})}static or(e){let n=d.resolve(!1);for(const s of e)n=n.next(r=>r?d.resolve(r):s());return n}static forEach(e,n){const s=[];return e.forEach((r,i)=>{s.push(n.call(this,r,i))}),this.waitFor(s)}static mapArray(e,n){return new d((s,r)=>{const i=e.length,o=new Array(i);let a=0;for(let c=0;c<i;c++){const u=c;n(e[u]).next(l=>{o[u]=l,++a,a===i&&s(o)},l=>r(l))}})}static doWhile(e,n){return new d((s,r)=>{const i=()=>{e()===!0?n().next(()=>{i()},r):s()};i()})}}function vn(t){return t.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ri{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=s=>this.it(s),this.rt=s=>n.writeSequenceNumber(s))}it(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.rt&&this.rt(e),e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ho(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function Ct(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function mc(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ri.ot=-1;class B{constructor(e,n){this.comparator=e,this.root=n||K.EMPTY}insert(e,n){return new B(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,K.BLACK,null,null))}remove(e){return new B(this.comparator,this.root.remove(e,this.comparator).copy(null,null,K.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const s=this.comparator(e,n.key);if(s===0)return n.value;s<0?n=n.left:s>0&&(n=n.right)}return null}indexOf(e){let n=0,s=this.root;for(;!s.isEmpty();){const r=this.comparator(e,s.key);if(r===0)return n+s.left.size;r<0?s=s.left:(n+=s.left.size+1,s=s.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,s)=>(e(n,s),!1))}toString(){const e=[];return this.inorderTraversal((n,s)=>(e.push(`${n}:${s}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Rn(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Rn(this.root,e,this.comparator,!1)}getReverseIterator(){return new Rn(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Rn(this.root,e,this.comparator,!0)}}class Rn{constructor(e,n,s,r){this.isReverse=r,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=n?s(e.key,n):1,n&&r&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class K{constructor(e,n,s,r,i){this.key=e,this.value=n,this.color=s!=null?s:K.RED,this.left=r!=null?r:K.EMPTY,this.right=i!=null?i:K.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,s,r,i){return new K(e!=null?e:this.key,n!=null?n:this.value,s!=null?s:this.color,r!=null?r:this.left,i!=null?i:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,s){let r=this;const i=s(e,r.key);return r=i<0?r.copy(null,null,null,r.left.insert(e,n,s),null):i===0?r.copy(null,n,null,null,null):r.copy(null,null,null,null,r.right.insert(e,n,s)),r.fixUp()}removeMin(){if(this.left.isEmpty())return K.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let s,r=this;if(n(e,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(e,n),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),n(e,r.key)===0){if(r.right.isEmpty())return K.EMPTY;s=r.right.min(),r=r.copy(s.key,s.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(e,n))}return r.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,K.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,K.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw _();const e=this.left.check();if(e!==this.right.check())throw _();return e+(this.isRed()?0:1)}}K.EMPTY=null,K.RED=!0,K.BLACK=!1;K.EMPTY=new class{constructor(){this.size=0}get key(){throw _()}get value(){throw _()}get color(){throw _()}get left(){throw _()}get right(){throw _()}copy(t,e,n,s,r){return this}insert(t,e,n){return new K(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V{constructor(e){this.comparator=e,this.data=new B(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,s)=>(e(n),!1))}forEachInRange(e,n){const s=this.data.getIteratorFrom(e[0]);for(;s.hasNext();){const r=s.getNext();if(this.comparator(r.key,e[1])>=0)return;n(r.key)}}forEachWhile(e,n){let s;for(s=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();s.hasNext();)if(!e(s.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new fo(this.data.getIterator())}getIteratorFrom(e){return new fo(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(s=>{n=n.add(s)}),n}isEqual(e){if(!(e instanceof V)||this.size!==e.size)return!1;const n=this.data.getIterator(),s=e.data.getIterator();for(;n.hasNext();){const r=n.getNext().key,i=s.getNext().key;if(this.comparator(r,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new V(this.comparator);return n.data=e,n}}class fo{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ue{constructor(e){this.fields=e,e.sort(J.comparator)}static empty(){return new ue([])}unionWith(e){let n=new V(J.comparator);for(const s of this.fields)n=n.add(s);for(const s of e)n=n.add(s);return new ue(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return pt(this.fields,e.fields,(n,s)=>n.isEqual(s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Q{constructor(e){this.binaryString=e}static fromBase64String(e){const n=atob(e);return new Q(n)}static fromUint8Array(e){const n=function(s){let r="";for(let i=0;i<s.length;++i)r+=String.fromCharCode(s[i]);return r}(e);return new Q(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return e=this.binaryString,btoa(e);var e}toUint8Array(){return function(e){const n=new Uint8Array(e.length);for(let s=0;s<e.length;s++)n[s]=e.charCodeAt(s);return n}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return N(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Q.EMPTY_BYTE_STRING=new Q("");const Zd=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Pe(t){if(O(!!t),typeof t=="string"){let e=0;const n=Zd.exec(t);if(O(!!n),n[1]){let r=n[1];r=(r+"000000000").substr(0,9),e=Number(r)}const s=new Date(t);return{seconds:Math.floor(s.getTime()/1e3),nanos:e}}return{seconds:x(t.seconds),nanos:x(t.nanos)}}function x(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function gt(t){return typeof t=="string"?Q.fromBase64String(t):Q.fromUint8Array(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yc(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="server_timestamp"}function vc(t){const e=t.mapValue.fields.__previous_value__;return yc(e)?vc(e):e}function Xt(t){const e=Pe(t.mapValue.fields.__local_write_time__.timestampValue);return new F(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ef{constructor(e,n,s,r,i,o,a,c){this.databaseId=e,this.appId=n,this.persistenceKey=s,this.host=r,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=a,this.useFetchStreams=c}}class mt{constructor(e,n){this.projectId=e,this.database=n||"(default)"}static empty(){return new mt("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof mt&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ts(t){return t==null}function Jn(t){return t===0&&1/t==-1/0}function tf(t){return typeof t=="number"&&Number.isInteger(t)&&!Jn(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nn={mapValue:{fields:{__type__:{stringValue:"__max__"}}}};function Xe(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?yc(t)?4:nf(t)?9007199254740991:10:_()}function fe(t,e){if(t===e)return!0;const n=Xe(t);if(n!==Xe(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return Xt(t).isEqual(Xt(e));case 3:return function(s,r){if(typeof s.timestampValue=="string"&&typeof r.timestampValue=="string"&&s.timestampValue.length===r.timestampValue.length)return s.timestampValue===r.timestampValue;const i=Pe(s.timestampValue),o=Pe(r.timestampValue);return i.seconds===o.seconds&&i.nanos===o.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(s,r){return gt(s.bytesValue).isEqual(gt(r.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(s,r){return x(s.geoPointValue.latitude)===x(r.geoPointValue.latitude)&&x(s.geoPointValue.longitude)===x(r.geoPointValue.longitude)}(t,e);case 2:return function(s,r){if("integerValue"in s&&"integerValue"in r)return x(s.integerValue)===x(r.integerValue);if("doubleValue"in s&&"doubleValue"in r){const i=x(s.doubleValue),o=x(r.doubleValue);return i===o?Jn(i)===Jn(o):isNaN(i)&&isNaN(o)}return!1}(t,e);case 9:return pt(t.arrayValue.values||[],e.arrayValue.values||[],fe);case 10:return function(s,r){const i=s.mapValue.fields||{},o=r.mapValue.fields||{};if(ho(i)!==ho(o))return!1;for(const a in i)if(i.hasOwnProperty(a)&&(o[a]===void 0||!fe(i[a],o[a])))return!1;return!0}(t,e);default:return _()}}function Yt(t,e){return(t.values||[]).find(n=>fe(n,e))!==void 0}function yt(t,e){if(t===e)return 0;const n=Xe(t),s=Xe(e);if(n!==s)return N(n,s);switch(n){case 0:case 9007199254740991:return 0;case 1:return N(t.booleanValue,e.booleanValue);case 2:return function(r,i){const o=x(r.integerValue||r.doubleValue),a=x(i.integerValue||i.doubleValue);return o<a?-1:o>a?1:o===a?0:isNaN(o)?isNaN(a)?0:-1:1}(t,e);case 3:return po(t.timestampValue,e.timestampValue);case 4:return po(Xt(t),Xt(e));case 5:return N(t.stringValue,e.stringValue);case 6:return function(r,i){const o=gt(r),a=gt(i);return o.compareTo(a)}(t.bytesValue,e.bytesValue);case 7:return function(r,i){const o=r.split("/"),a=i.split("/");for(let c=0;c<o.length&&c<a.length;c++){const u=N(o[c],a[c]);if(u!==0)return u}return N(o.length,a.length)}(t.referenceValue,e.referenceValue);case 8:return function(r,i){const o=N(x(r.latitude),x(i.latitude));return o!==0?o:N(x(r.longitude),x(i.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return function(r,i){const o=r.values||[],a=i.values||[];for(let c=0;c<o.length&&c<a.length;++c){const u=yt(o[c],a[c]);if(u)return u}return N(o.length,a.length)}(t.arrayValue,e.arrayValue);case 10:return function(r,i){if(r===Nn.mapValue&&i===Nn.mapValue)return 0;if(r===Nn.mapValue)return 1;if(i===Nn.mapValue)return-1;const o=r.fields||{},a=Object.keys(o),c=i.fields||{},u=Object.keys(c);a.sort(),u.sort();for(let l=0;l<a.length&&l<u.length;++l){const h=N(a[l],u[l]);if(h!==0)return h;const f=yt(o[a[l]],c[u[l]]);if(f!==0)return f}return N(a.length,u.length)}(t.mapValue,e.mapValue);default:throw _()}}function po(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return N(t,e);const n=Pe(t),s=Pe(e),r=N(n.seconds,s.seconds);return r!==0?r:N(n.nanos,s.nanos)}function at(t){return vr(t)}function vr(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(s){const r=Pe(s);return`time(${r.seconds},${r.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?gt(t.bytesValue).toBase64():"referenceValue"in t?(n=t.referenceValue,w.fromName(n).toString()):"geoPointValue"in t?`geo(${(e=t.geoPointValue).latitude},${e.longitude})`:"arrayValue"in t?function(s){let r="[",i=!0;for(const o of s.values||[])i?i=!1:r+=",",r+=vr(o);return r+"]"}(t.arrayValue):"mapValue"in t?function(s){const r=Object.keys(s.fields||{}).sort();let i="{",o=!0;for(const a of r)o?o=!1:i+=",",i+=`${a}:${vr(s.fields[a])}`;return i+"}"}(t.mapValue):_();var e,n}function wr(t){return!!t&&"integerValue"in t}function ii(t){return!!t&&"arrayValue"in t}function go(t){return!!t&&"nullValue"in t}function mo(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function Mn(t){return!!t&&"mapValue"in t}function Ft(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return Ct(t.mapValue.fields,(n,s)=>e.mapValue.fields[n]=Ft(s)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=Ft(t.arrayValue.values[n]);return e}return Object.assign({},t)}function nf(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ae{constructor(e){this.value=e}static empty(){return new ae({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let s=0;s<e.length-1;++s)if(n=(n.mapValue.fields||{})[e.get(s)],!Mn(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=Ft(n)}setAll(e){let n=J.emptyPath(),s={},r=[];e.forEach((o,a)=>{if(!n.isImmediateParentOf(a)){const c=this.getFieldsMap(n);this.applyChanges(c,s,r),s={},r=[],n=a.popLast()}o?s[a.lastSegment()]=Ft(o):r.push(a.lastSegment())});const i=this.getFieldsMap(n);this.applyChanges(i,s,r)}delete(e){const n=this.field(e.popLast());Mn(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return fe(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let s=0;s<e.length;++s){let r=n.mapValue.fields[e.get(s)];Mn(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},n.mapValue.fields[e.get(s)]=r),n=r}return n.mapValue.fields}applyChanges(e,n,s){Ct(n,(r,i)=>e[r]=i);for(const r of s)delete e[r]}clone(){return new ae(Ft(this.value))}}function wc(t){const e=[];return Ct(t.fields,(n,s)=>{const r=new J([n]);if(Mn(s)){const i=wc(s.mapValue).fields;if(i.length===0)e.push(r);else for(const o of i)e.push(r.child(o))}else e.push(r)}),new ue(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z{constructor(e,n,s,r,i,o){this.key=e,this.documentType=n,this.version=s,this.readTime=r,this.data=i,this.documentState=o}static newInvalidDocument(e){return new z(e,0,b.min(),b.min(),ae.empty(),0)}static newFoundDocument(e,n,s){return new z(e,1,n,b.min(),s,0)}static newNoDocument(e,n){return new z(e,2,n,b.min(),ae.empty(),0)}static newUnknownDocument(e,n){return new z(e,3,n,b.min(),ae.empty(),2)}convertToFoundDocument(e,n){return this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=ae.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=ae.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=b.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof z&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new z(this.key,this.documentType,this.version,this.readTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sf{constructor(e,n=null,s=[],r=[],i=null,o=null,a=null){this.path=e,this.collectionGroup=n,this.orderBy=s,this.filters=r,this.limit=i,this.startAt=o,this.endAt=a,this.ut=null}}function yo(t,e=null,n=[],s=[],r=null,i=null,o=null){return new sf(t,e,n,s,r,i,o)}function oi(t){const e=S(t);if(e.ut===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(s=>{return(r=s).field.canonicalString()+r.op.toString()+at(r.value);var r}).join(","),n+="|ob:",n+=e.orderBy.map(s=>function(r){return r.field.canonicalString()+r.dir}(s)).join(","),Ts(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(s=>at(s)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(s=>at(s)).join(",")),e.ut=n}return e.ut}function rf(t){let e=t.path.canonicalString();return t.collectionGroup!==null&&(e+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(e+=`, filters: [${t.filters.map(n=>{return`${(s=n).field.canonicalString()} ${s.op} ${at(s.value)}`;var s}).join(", ")}]`),Ts(t.limit)||(e+=", limit: "+t.limit),t.orderBy.length>0&&(e+=`, orderBy: [${t.orderBy.map(n=>function(s){return`${s.field.canonicalString()} (${s.dir})`}(n)).join(", ")}]`),t.startAt&&(e+=", startAt: ",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(n=>at(n)).join(",")),t.endAt&&(e+=", endAt: ",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(n=>at(n)).join(",")),`Target(${e})`}function ai(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let r=0;r<t.orderBy.length;r++)if(!ff(t.orderBy[r],e.orderBy[r]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let r=0;r<t.filters.length;r++)if(n=t.filters[r],s=e.filters[r],n.op!==s.op||!n.field.isEqual(s.field)||!fe(n.value,s.value))return!1;var n,s;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!wo(t.startAt,e.startAt)&&wo(t.endAt,e.endAt)}function Er(t){return w.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}class re extends class{}{constructor(e,n,s){super(),this.field=e,this.op=n,this.value=s}static create(e,n,s){return e.isKeyField()?n==="in"||n==="not-in"?this.ct(e,n,s):new of(e,n,s):n==="array-contains"?new uf(e,s):n==="in"?new lf(e,s):n==="not-in"?new hf(e,s):n==="array-contains-any"?new df(e,s):new re(e,n,s)}static ct(e,n,s){return n==="in"?new af(e,s):new cf(e,s)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&this.at(yt(n,this.value)):n!==null&&Xe(this.value)===Xe(n)&&this.at(yt(n,this.value))}at(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return _()}}ht(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}}class of extends re{constructor(e,n,s){super(e,n,s),this.key=w.fromName(s.referenceValue)}matches(e){const n=w.comparator(e.key,this.key);return this.at(n)}}class af extends re{constructor(e,n){super(e,"in",n),this.keys=Ec("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class cf extends re{constructor(e,n){super(e,"not-in",n),this.keys=Ec("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function Ec(t,e){var n;return(((n=e.arrayValue)===null||n===void 0?void 0:n.values)||[]).map(s=>w.fromName(s.referenceValue))}class uf extends re{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return ii(n)&&Yt(n.arrayValue,this.value)}}class lf extends re{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&Yt(this.value.arrayValue,n)}}class hf extends re{constructor(e,n){super(e,"not-in",n)}matches(e){if(Yt(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&!Yt(this.value.arrayValue,n)}}class df extends re{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!ii(n)||!n.arrayValue.values)&&n.arrayValue.values.some(s=>Yt(this.value.arrayValue,s))}}class Zn{constructor(e,n){this.position=e,this.inclusive=n}}class Vt{constructor(e,n="asc"){this.field=e,this.dir=n}}function ff(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}function vo(t,e,n){let s=0;for(let r=0;r<t.position.length;r++){const i=e[r],o=t.position[r];if(i.field.isKeyField()?s=w.comparator(w.fromName(o.referenceValue),n.key):s=yt(o,n.data.field(i.field)),i.dir==="desc"&&(s*=-1),s!==0)break}return s}function wo(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!fe(t.position[n],e.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _s{constructor(e,n=null,s=[],r=[],i=null,o="F",a=null,c=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=s,this.filters=r,this.limit=i,this.limitType=o,this.startAt=a,this.endAt=c,this.lt=null,this.ft=null,this.startAt,this.endAt}}function pf(t,e,n,s,r,i,o,a){return new _s(t,e,n,s,r,i,o,a)}function ci(t){return new _s(t)}function gf(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function mf(t){return t.explicitOrderBy.length>0?t.explicitOrderBy[0].field:null}function yf(t){for(const e of t.filters)if(e.ht())return e.field;return null}function vf(t){return t.collectionGroup!==null}function Jt(t){const e=S(t);if(e.lt===null){e.lt=[];const n=yf(e),s=mf(e);if(n!==null&&s===null)n.isKeyField()||e.lt.push(new Vt(n)),e.lt.push(new Vt(J.keyField(),"asc"));else{let r=!1;for(const i of e.explicitOrderBy)e.lt.push(i),i.field.isKeyField()&&(r=!0);if(!r){const i=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";e.lt.push(new Vt(J.keyField(),i))}}}return e.lt}function Ye(t){const e=S(t);if(!e.ft)if(e.limitType==="F")e.ft=yo(e.path,e.collectionGroup,Jt(e),e.filters,e.limit,e.startAt,e.endAt);else{const n=[];for(const i of Jt(e)){const o=i.dir==="desc"?"asc":"desc";n.push(new Vt(i.field,o))}const s=e.endAt?new Zn(e.endAt.position,e.endAt.inclusive):null,r=e.startAt?new Zn(e.startAt.position,e.startAt.inclusive):null;e.ft=yo(e.path,e.collectionGroup,n,e.filters,e.limit,s,r)}return e.ft}function wf(t,e,n){return new _s(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function Ss(t,e){return ai(Ye(t),Ye(e))&&t.limitType===e.limitType}function Ic(t){return`${oi(Ye(t))}|lt:${t.limitType}`}function Ir(t){return`Query(target=${rf(Ye(t))}; limitType=${t.limitType})`}function ui(t,e){return e.isFoundDocument()&&function(n,s){const r=s.key.path;return n.collectionGroup!==null?s.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(r):w.isDocumentKey(n.path)?n.path.isEqual(r):n.path.isImmediateParentOf(r)}(t,e)&&function(n,s){for(const r of n.explicitOrderBy)if(!r.field.isKeyField()&&s.data.field(r.field)===null)return!1;return!0}(t,e)&&function(n,s){for(const r of n.filters)if(!r.matches(s))return!1;return!0}(t,e)&&function(n,s){return!(n.startAt&&!function(r,i,o){const a=vo(r,i,o);return r.inclusive?a<=0:a<0}(n.startAt,Jt(n),s)||n.endAt&&!function(r,i,o){const a=vo(r,i,o);return r.inclusive?a>=0:a>0}(n.endAt,Jt(n),s))}(t,e)}function Ef(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function Tc(t){return(e,n)=>{let s=!1;for(const r of Jt(t)){const i=If(r,e,n);if(i!==0)return i;s=s||r.field.isKeyField()}return 0}}function If(t,e,n){const s=t.field.isKeyField()?w.comparator(e.key,n.key):function(r,i,o){const a=i.data.field(r),c=o.data.field(r);return a!==null&&c!==null?yt(a,c):_()}(t.field,e,n);switch(t.dir){case"asc":return s;case"desc":return-1*s;default:return _()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _c(t,e){if(t.dt){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Jn(e)?"-0":e}}function Sc(t){return{integerValue:""+t}}function Tf(t,e){return tf(e)?Sc(e):_c(t,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bs{constructor(){this._=void 0}}function _f(t,e,n){return t instanceof es?function(s,r){const i={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return r&&(i.fields.__previous_value__=r),{mapValue:i}}(n,e):t instanceof Zt?Cc(t,e):t instanceof en?Ac(t,e):function(s,r){const i=bc(s,r),o=Eo(i)+Eo(s._t);return wr(i)&&wr(s._t)?Sc(o):_c(s.wt,o)}(t,e)}function Sf(t,e,n){return t instanceof Zt?Cc(t,e):t instanceof en?Ac(t,e):n}function bc(t,e){return t instanceof ts?wr(n=e)||function(s){return!!s&&"doubleValue"in s}(n)?e:{integerValue:0}:null;var n}class es extends bs{}class Zt extends bs{constructor(e){super(),this.elements=e}}function Cc(t,e){const n=kc(e);for(const s of t.elements)n.some(r=>fe(r,s))||n.push(s);return{arrayValue:{values:n}}}class en extends bs{constructor(e){super(),this.elements=e}}function Ac(t,e){let n=kc(e);for(const s of t.elements)n=n.filter(r=>!fe(r,s));return{arrayValue:{values:n}}}class ts extends bs{constructor(e,n){super(),this.wt=e,this._t=n}}function Eo(t){return x(t.integerValue||t.doubleValue)}function kc(t){return ii(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}function bf(t,e){return t.field.isEqual(e.field)&&function(n,s){return n instanceof Zt&&s instanceof Zt||n instanceof en&&s instanceof en?pt(n.elements,s.elements,fe):n instanceof ts&&s instanceof ts?fe(n._t,s._t):n instanceof es&&s instanceof es}(t.transform,e.transform)}class Cf{constructor(e,n){this.version=e,this.transformResults=n}}class le{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new le}static exists(e){return new le(void 0,e)}static updateTime(e){return new le(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Pn(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class Cs{}function Dc(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new Nc(t.key,le.none()):new wn(t.key,t.data,le.none());{const n=t.data,s=ae.empty();let r=new V(J.comparator);for(let i of e.fields)if(!r.has(i)){let o=n.field(i);o===null&&i.length>1&&(i=i.popLast(),o=n.field(i)),o===null?s.delete(i):s.set(i,o),r=r.add(i)}return new tt(t.key,s,new ue(r.toArray()),le.none())}}function Af(t,e,n){t instanceof wn?function(s,r,i){const o=s.value.clone(),a=To(s.fieldTransforms,r,i.transformResults);o.setAll(a),r.convertToFoundDocument(i.version,o).setHasCommittedMutations()}(t,e,n):t instanceof tt?function(s,r,i){if(!Pn(s.precondition,r))return void r.convertToUnknownDocument(i.version);const o=To(s.fieldTransforms,r,i.transformResults),a=r.data;a.setAll(Rc(s)),a.setAll(o),r.convertToFoundDocument(i.version,a).setHasCommittedMutations()}(t,e,n):function(s,r,i){r.convertToNoDocument(i.version).setHasCommittedMutations()}(0,e,n)}function Bt(t,e,n,s){return t instanceof wn?function(r,i,o,a){if(!Pn(r.precondition,i))return o;const c=r.value.clone(),u=_o(r.fieldTransforms,a,i);return c.setAll(u),i.convertToFoundDocument(i.version,c).setHasLocalMutations(),null}(t,e,n,s):t instanceof tt?function(r,i,o,a){if(!Pn(r.precondition,i))return o;const c=_o(r.fieldTransforms,a,i),u=i.data;return u.setAll(Rc(r)),u.setAll(c),i.convertToFoundDocument(i.version,u).setHasLocalMutations(),o===null?null:o.unionWith(r.fieldMask.fields).unionWith(r.fieldTransforms.map(l=>l.field))}(t,e,n,s):function(r,i,o){return Pn(r.precondition,i)?(i.convertToNoDocument(i.version).setHasLocalMutations(),null):o}(t,e,n)}function kf(t,e){let n=null;for(const s of t.fieldTransforms){const r=e.data.field(s.field),i=bc(s.transform,r||null);i!=null&&(n===null&&(n=ae.empty()),n.set(s.field,i))}return n||null}function Io(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(n,s){return n===void 0&&s===void 0||!(!n||!s)&&pt(n,s,(r,i)=>bf(r,i))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class wn extends Cs{constructor(e,n,s,r=[]){super(),this.key=e,this.value=n,this.precondition=s,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class tt extends Cs{constructor(e,n,s,r,i=[]){super(),this.key=e,this.data=n,this.fieldMask=s,this.precondition=r,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Rc(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const s=t.data.field(n);e.set(n,s)}}),e}function To(t,e,n){const s=new Map;O(t.length===n.length);for(let r=0;r<n.length;r++){const i=t[r],o=i.transform,a=e.data.field(i.field);s.set(i.field,Sf(o,a,n[r]))}return s}function _o(t,e,n){const s=new Map;for(const r of t){const i=r.transform,o=n.data.field(r.field);s.set(r.field,_f(i,o,e))}return s}class Nc extends Cs{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Df extends Cs{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rf{constructor(e){this.count=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var L,A;function Nf(t){switch(t){default:return _();case p.CANCELLED:case p.UNKNOWN:case p.DEADLINE_EXCEEDED:case p.RESOURCE_EXHAUSTED:case p.INTERNAL:case p.UNAVAILABLE:case p.UNAUTHENTICATED:return!1;case p.INVALID_ARGUMENT:case p.NOT_FOUND:case p.ALREADY_EXISTS:case p.PERMISSION_DENIED:case p.FAILED_PRECONDITION:case p.ABORTED:case p.OUT_OF_RANGE:case p.UNIMPLEMENTED:case p.DATA_LOSS:return!0}}function Oc(t){if(t===void 0)return Oe("GRPC error has no .code"),p.UNKNOWN;switch(t){case L.OK:return p.OK;case L.CANCELLED:return p.CANCELLED;case L.UNKNOWN:return p.UNKNOWN;case L.DEADLINE_EXCEEDED:return p.DEADLINE_EXCEEDED;case L.RESOURCE_EXHAUSTED:return p.RESOURCE_EXHAUSTED;case L.INTERNAL:return p.INTERNAL;case L.UNAVAILABLE:return p.UNAVAILABLE;case L.UNAUTHENTICATED:return p.UNAUTHENTICATED;case L.INVALID_ARGUMENT:return p.INVALID_ARGUMENT;case L.NOT_FOUND:return p.NOT_FOUND;case L.ALREADY_EXISTS:return p.ALREADY_EXISTS;case L.PERMISSION_DENIED:return p.PERMISSION_DENIED;case L.FAILED_PRECONDITION:return p.FAILED_PRECONDITION;case L.ABORTED:return p.ABORTED;case L.OUT_OF_RANGE:return p.OUT_OF_RANGE;case L.UNIMPLEMENTED:return p.UNIMPLEMENTED;case L.DATA_LOSS:return p.DATA_LOSS;default:return _()}}(A=L||(L={}))[A.OK=0]="OK",A[A.CANCELLED=1]="CANCELLED",A[A.UNKNOWN=2]="UNKNOWN",A[A.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",A[A.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",A[A.NOT_FOUND=5]="NOT_FOUND",A[A.ALREADY_EXISTS=6]="ALREADY_EXISTS",A[A.PERMISSION_DENIED=7]="PERMISSION_DENIED",A[A.UNAUTHENTICATED=16]="UNAUTHENTICATED",A[A.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",A[A.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",A[A.ABORTED=10]="ABORTED",A[A.OUT_OF_RANGE=11]="OUT_OF_RANGE",A[A.UNIMPLEMENTED=12]="UNIMPLEMENTED",A[A.INTERNAL=13]="INTERNAL",A[A.UNAVAILABLE=14]="UNAVAILABLE",A[A.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class At{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),s=this.inner[n];if(s!==void 0){for(const[r,i]of s)if(this.equalsFn(r,e))return i}}has(e){return this.get(e)!==void 0}set(e,n){const s=this.mapKeyFn(e),r=this.inner[s];if(r===void 0)return this.inner[s]=[[e,n]],void this.innerSize++;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return void(r[i]=[e,n]);r.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),s=this.inner[n];if(s===void 0)return!1;for(let r=0;r<s.length;r++)if(this.equalsFn(s[r][0],e))return s.length===1?delete this.inner[n]:s.splice(r,1),this.innerSize--,!0;return!1}forEach(e){Ct(this.inner,(n,s)=>{for(const[r,i]of s)e(r,i)})}isEmpty(){return mc(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Of=new B(w.comparator);function Te(){return Of}const Mc=new B(w.comparator);function Pt(...t){let e=Mc;for(const n of t)e=e.insert(n.key,n);return e}function Pc(t){let e=Mc;return t.forEach((n,s)=>e=e.insert(n,s.overlayedDocument)),e}function $e(){return $t()}function Lc(){return $t()}function $t(){return new At(t=>t.toString(),(t,e)=>t.isEqual(e))}const Mf=new B(w.comparator),Pf=new V(w.comparator);function C(...t){let e=Pf;for(const n of t)e=e.add(n);return e}const Lf=new V(N);function xc(){return Lf}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class As{constructor(e,n,s,r,i){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=s,this.documentUpdates=r,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,n){const s=new Map;return s.set(e,En.createSynthesizedTargetChangeForCurrentChange(e,n)),new As(b.min(),s,xc(),Te(),C())}}class En{constructor(e,n,s,r,i){this.resumeToken=e,this.current=n,this.addedDocuments=s,this.modifiedDocuments=r,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,n){return new En(Q.EMPTY_BYTE_STRING,n,C(),C(),C())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ln{constructor(e,n,s,r){this.gt=e,this.removedTargetIds=n,this.key=s,this.yt=r}}class Uc{constructor(e,n){this.targetId=e,this.It=n}}class Fc{constructor(e,n,s=Q.EMPTY_BYTE_STRING,r=null){this.state=e,this.targetIds=n,this.resumeToken=s,this.cause=r}}class So{constructor(){this.Tt=0,this.Et=Co(),this.At=Q.EMPTY_BYTE_STRING,this.Rt=!1,this.bt=!0}get current(){return this.Rt}get resumeToken(){return this.At}get Pt(){return this.Tt!==0}get vt(){return this.bt}Vt(e){e.approximateByteSize()>0&&(this.bt=!0,this.At=e)}St(){let e=C(),n=C(),s=C();return this.Et.forEach((r,i)=>{switch(i){case 0:e=e.add(r);break;case 2:n=n.add(r);break;case 1:s=s.add(r);break;default:_()}}),new En(this.At,this.Rt,e,n,s)}Dt(){this.bt=!1,this.Et=Co()}Ct(e,n){this.bt=!0,this.Et=this.Et.insert(e,n)}xt(e){this.bt=!0,this.Et=this.Et.remove(e)}Nt(){this.Tt+=1}kt(){this.Tt-=1}Ot(){this.bt=!0,this.Rt=!0}}class xf{constructor(e){this.Mt=e,this.Ft=new Map,this.$t=Te(),this.Bt=bo(),this.Lt=new V(N)}Ut(e){for(const n of e.gt)e.yt&&e.yt.isFoundDocument()?this.qt(n,e.yt):this.Kt(n,e.key,e.yt);for(const n of e.removedTargetIds)this.Kt(n,e.key,e.yt)}Gt(e){this.forEachTarget(e,n=>{const s=this.Qt(n);switch(e.state){case 0:this.jt(n)&&s.Vt(e.resumeToken);break;case 1:s.kt(),s.Pt||s.Dt(),s.Vt(e.resumeToken);break;case 2:s.kt(),s.Pt||this.removeTarget(n);break;case 3:this.jt(n)&&(s.Ot(),s.Vt(e.resumeToken));break;case 4:this.jt(n)&&(this.Wt(n),s.Vt(e.resumeToken));break;default:_()}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.Ft.forEach((s,r)=>{this.jt(r)&&n(r)})}zt(e){const n=e.targetId,s=e.It.count,r=this.Ht(n);if(r){const i=r.target;if(Er(i))if(s===0){const o=new w(i.path);this.Kt(n,o,z.newNoDocument(o,b.min()))}else O(s===1);else this.Jt(n)!==s&&(this.Wt(n),this.Lt=this.Lt.add(n))}}Yt(e){const n=new Map;this.Ft.forEach((i,o)=>{const a=this.Ht(o);if(a){if(i.current&&Er(a.target)){const c=new w(a.target.path);this.$t.get(c)!==null||this.Xt(o,c)||this.Kt(o,c,z.newNoDocument(c,e))}i.vt&&(n.set(o,i.St()),i.Dt())}});let s=C();this.Bt.forEach((i,o)=>{let a=!0;o.forEachWhile(c=>{const u=this.Ht(c);return!u||u.purpose===2||(a=!1,!1)}),a&&(s=s.add(i))}),this.$t.forEach((i,o)=>o.setReadTime(e));const r=new As(e,n,this.Lt,this.$t,s);return this.$t=Te(),this.Bt=bo(),this.Lt=new V(N),r}qt(e,n){if(!this.jt(e))return;const s=this.Xt(e,n.key)?2:0;this.Qt(e).Ct(n.key,s),this.$t=this.$t.insert(n.key,n),this.Bt=this.Bt.insert(n.key,this.Zt(n.key).add(e))}Kt(e,n,s){if(!this.jt(e))return;const r=this.Qt(e);this.Xt(e,n)?r.Ct(n,1):r.xt(n),this.Bt=this.Bt.insert(n,this.Zt(n).delete(e)),s&&(this.$t=this.$t.insert(n,s))}removeTarget(e){this.Ft.delete(e)}Jt(e){const n=this.Qt(e).St();return this.Mt.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}Nt(e){this.Qt(e).Nt()}Qt(e){let n=this.Ft.get(e);return n||(n=new So,this.Ft.set(e,n)),n}Zt(e){let n=this.Bt.get(e);return n||(n=new V(N),this.Bt=this.Bt.insert(e,n)),n}jt(e){const n=this.Ht(e)!==null;return n||y("WatchChangeAggregator","Detected inactive target",e),n}Ht(e){const n=this.Ft.get(e);return n&&n.Pt?null:this.Mt.te(e)}Wt(e){this.Ft.set(e,new So),this.Mt.getRemoteKeysForTarget(e).forEach(n=>{this.Kt(e,n,null)})}Xt(e,n){return this.Mt.getRemoteKeysForTarget(e).has(n)}}function bo(){return new B(w.comparator)}function Co(){return new B(w.comparator)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uf=(()=>({asc:"ASCENDING",desc:"DESCENDING"}))(),Ff=(()=>({"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"}))();class Vf{constructor(e,n){this.databaseId=e,this.dt=n}}function ns(t,e){return t.dt?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Vc(t,e){return t.dt?e.toBase64():e.toUint8Array()}function Bf(t,e){return ns(t,e.toTimestamp())}function Ee(t){return O(!!t),b.fromTimestamp(function(e){const n=Pe(e);return new F(n.seconds,n.nanos)}(t))}function li(t,e){return function(n){return new P(["projects",n.projectId,"databases",n.database])}(t).child("documents").child(e).canonicalString()}function Bc(t){const e=P.fromString(t);return O(qc(e)),e}function Tr(t,e){return li(t.databaseId,e.path)}function Js(t,e){const n=Bc(e);if(n.get(1)!==t.databaseId.projectId)throw new E(p.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new E(p.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new w($c(n))}function _r(t,e){return li(t.databaseId,e)}function $f(t){const e=Bc(t);return e.length===4?P.emptyPath():$c(e)}function Sr(t){return new P(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function $c(t){return O(t.length>4&&t.get(4)==="documents"),t.popFirst(5)}function Ao(t,e,n){return{name:Tr(t,e),fields:n.value.mapValue.fields}}function jf(t,e){let n;if("targetChange"in e){e.targetChange;const s=function(c){return c==="NO_CHANGE"?0:c==="ADD"?1:c==="REMOVE"?2:c==="CURRENT"?3:c==="RESET"?4:_()}(e.targetChange.targetChangeType||"NO_CHANGE"),r=e.targetChange.targetIds||[],i=function(c,u){return c.dt?(O(u===void 0||typeof u=="string"),Q.fromBase64String(u||"")):(O(u===void 0||u instanceof Uint8Array),Q.fromUint8Array(u||new Uint8Array))}(t,e.targetChange.resumeToken),o=e.targetChange.cause,a=o&&function(c){const u=c.code===void 0?p.UNKNOWN:Oc(c.code);return new E(u,c.message||"")}(o);n=new Fc(s,r,i,a||null)}else if("documentChange"in e){e.documentChange;const s=e.documentChange;s.document,s.document.name,s.document.updateTime;const r=Js(t,s.document.name),i=Ee(s.document.updateTime),o=new ae({mapValue:{fields:s.document.fields}}),a=z.newFoundDocument(r,i,o),c=s.targetIds||[],u=s.removedTargetIds||[];n=new Ln(c,u,a.key,a)}else if("documentDelete"in e){e.documentDelete;const s=e.documentDelete;s.document;const r=Js(t,s.document),i=s.readTime?Ee(s.readTime):b.min(),o=z.newNoDocument(r,i),a=s.removedTargetIds||[];n=new Ln([],a,o.key,o)}else if("documentRemove"in e){e.documentRemove;const s=e.documentRemove;s.document;const r=Js(t,s.document),i=s.removedTargetIds||[];n=new Ln([],i,r,null)}else{if(!("filter"in e))return _();{e.filter;const s=e.filter;s.targetId;const r=s.count||0,i=new Rf(r),o=s.targetId;n=new Uc(o,i)}}return n}function qf(t,e){let n;if(e instanceof wn)n={update:Ao(t,e.key,e.value)};else if(e instanceof Nc)n={delete:Tr(t,e.key)};else if(e instanceof tt)n={update:Ao(t,e.key,e.data),updateMask:Zf(e.fieldMask)};else{if(!(e instanceof Df))return _();n={verify:Tr(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(s=>function(r,i){const o=i.transform;if(o instanceof es)return{fieldPath:i.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(o instanceof Zt)return{fieldPath:i.field.canonicalString(),appendMissingElements:{values:o.elements}};if(o instanceof en)return{fieldPath:i.field.canonicalString(),removeAllFromArray:{values:o.elements}};if(o instanceof ts)return{fieldPath:i.field.canonicalString(),increment:o._t};throw _()}(0,s))),e.precondition.isNone||(n.currentDocument=function(s,r){return r.updateTime!==void 0?{updateTime:Bf(s,r.updateTime)}:r.exists!==void 0?{exists:r.exists}:_()}(t,e.precondition)),n}function Hf(t,e){return t&&t.length>0?(O(e!==void 0),t.map(n=>function(s,r){let i=s.updateTime?Ee(s.updateTime):Ee(r);return i.isEqual(b.min())&&(i=Ee(r)),new Cf(i,s.transformResults||[])}(n,e))):[]}function Kf(t,e){return{documents:[_r(t,e.path)]}}function zf(t,e){const n={structuredQuery:{}},s=e.path;e.collectionGroup!==null?(n.parent=_r(t,s),n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(n.parent=_r(t,s.popLast()),n.structuredQuery.from=[{collectionId:s.lastSegment()}]);const r=function(c){if(c.length===0)return;const u=c.map(l=>function(h){if(h.op==="=="){if(mo(h.value))return{unaryFilter:{field:st(h.field),op:"IS_NAN"}};if(go(h.value))return{unaryFilter:{field:st(h.field),op:"IS_NULL"}}}else if(h.op==="!="){if(mo(h.value))return{unaryFilter:{field:st(h.field),op:"IS_NOT_NAN"}};if(go(h.value))return{unaryFilter:{field:st(h.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:st(h.field),op:Xf(h.op),value:h.value}}}(l));return u.length===1?u[0]:{compositeFilter:{op:"AND",filters:u}}}(e.filters);r&&(n.structuredQuery.where=r);const i=function(c){if(c.length!==0)return c.map(u=>function(l){return{field:st(l.field),direction:Qf(l.dir)}}(u))}(e.orderBy);i&&(n.structuredQuery.orderBy=i);const o=function(c,u){return c.dt||Ts(u)?u:{value:u}}(t,e.limit);var a;return o!==null&&(n.structuredQuery.limit=o),e.startAt&&(n.structuredQuery.startAt={before:(a=e.startAt).inclusive,values:a.position}),e.endAt&&(n.structuredQuery.endAt=function(c){return{before:!c.inclusive,values:c.position}}(e.endAt)),n}function Gf(t){let e=$f(t.parent);const n=t.structuredQuery,s=n.from?n.from.length:0;let r=null;if(s>0){O(s===1);const l=n.from[0];l.allDescendants?r=l.collectionId:e=e.child(l.collectionId)}let i=[];n.where&&(i=jc(n.where));let o=[];n.orderBy&&(o=n.orderBy.map(l=>function(h){return new Vt(it(h.field),function(f){switch(f){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(h.direction))}(l)));let a=null;n.limit&&(a=function(l){let h;return h=typeof l=="object"?l.value:l,Ts(h)?null:h}(n.limit));let c=null;n.startAt&&(c=function(l){const h=!!l.before,f=l.values||[];return new Zn(f,h)}(n.startAt));let u=null;return n.endAt&&(u=function(l){const h=!l.before,f=l.values||[];return new Zn(f,h)}(n.endAt)),pf(e,r,o,i,a,"F",c,u)}function Wf(t,e){const n=function(s,r){switch(r){case 0:return null;case 1:return"existence-filter-mismatch";case 2:return"limbo-document";default:return _()}}(0,e.purpose);return n==null?null:{"goog-listen-tags":n}}function jc(t){return t?t.unaryFilter!==void 0?[Jf(t)]:t.fieldFilter!==void 0?[Yf(t)]:t.compositeFilter!==void 0?t.compositeFilter.filters.map(e=>jc(e)).reduce((e,n)=>e.concat(n)):_():[]}function Qf(t){return Uf[t]}function Xf(t){return Ff[t]}function st(t){return{fieldPath:t.canonicalString()}}function it(t){return J.fromServerFormat(t.fieldPath)}function Yf(t){return re.create(it(t.fieldFilter.field),function(e){switch(e){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return _()}}(t.fieldFilter.op),t.fieldFilter.value)}function Jf(t){switch(t.unaryFilter.op){case"IS_NAN":const e=it(t.unaryFilter.field);return re.create(e,"==",{doubleValue:NaN});case"IS_NULL":const n=it(t.unaryFilter.field);return re.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=it(t.unaryFilter.field);return re.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const r=it(t.unaryFilter.field);return re.create(r,"!=",{nullValue:"NULL_VALUE"});default:return _()}}function Zf(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function qc(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ep{constructor(e,n,s,r){this.batchId=e,this.localWriteTime=n,this.baseMutations=s,this.mutations=r}applyToRemoteDocument(e,n){const s=n.mutationResults;for(let r=0;r<this.mutations.length;r++){const i=this.mutations[r];i.key.isEqual(e.key)&&Af(i,e,s[r])}}applyToLocalView(e,n){for(const s of this.baseMutations)s.key.isEqual(e.key)&&(n=Bt(s,e,n,this.localWriteTime));for(const s of this.mutations)s.key.isEqual(e.key)&&(n=Bt(s,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const s=Lc();return this.mutations.forEach(r=>{const i=e.get(r.key),o=i.overlayedDocument;let a=this.applyToLocalView(o,i.mutatedFields);a=n.has(r.key)?null:a;const c=Dc(o,a);c!==null&&s.set(r.key,c),o.isValidDocument()||o.convertToNoDocument(b.min())}),s}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),C())}isEqual(e){return this.batchId===e.batchId&&pt(this.mutations,e.mutations,(n,s)=>Io(n,s))&&pt(this.baseMutations,e.baseMutations,(n,s)=>Io(n,s))}}class hi{constructor(e,n,s,r){this.batch=e,this.commitVersion=n,this.mutationResults=s,this.docVersions=r}static from(e,n,s){O(e.mutations.length===s.length);let r=Mf;const i=e.mutations;for(let o=0;o<i.length;o++)r=r.insert(i[o].key,s[o].version);return new hi(e,n,s,r)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tp{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qe{constructor(e,n,s,r,i=b.min(),o=b.min(),a=Q.EMPTY_BYTE_STRING){this.target=e,this.targetId=n,this.purpose=s,this.sequenceNumber=r,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=a}withSequenceNumber(e){return new qe(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken)}withResumeToken(e,n){return new qe(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e)}withLastLimboFreeSnapshotVersion(e){return new qe(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class np{constructor(e){this.ne=e}}function sp(t){const e=Gf({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?wf(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rp{constructor(){this.ze=new ip}addToCollectionParentIndex(e,n){return this.ze.add(n),d.resolve()}getCollectionParents(e,n){return d.resolve(this.ze.getEntries(n))}addFieldIndex(e,n){return d.resolve()}deleteFieldIndex(e,n){return d.resolve()}getDocumentsMatchingTarget(e,n){return d.resolve(null)}getIndexType(e,n){return d.resolve(0)}getFieldIndexes(e,n){return d.resolve([])}getNextCollectionGroupToUpdate(e){return d.resolve(null)}getMinOffset(e,n){return d.resolve(Me.min())}getMinOffsetFromCollectionGroup(e,n){return d.resolve(Me.min())}updateCollectionGroup(e,n,s){return d.resolve()}updateIndexEntries(e,n){return d.resolve()}}class ip{constructor(){this.index={}}add(e){const n=e.lastSegment(),s=e.popLast(),r=this.index[n]||new V(P.comparator),i=!r.has(s);return this.index[n]=r.add(s),i}has(e){const n=e.lastSegment(),s=e.popLast(),r=this.index[n];return r&&r.has(s)}getEntries(e){return(this.index[e]||new V(P.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vt{constructor(e){this.En=e}next(){return this.En+=2,this.En}static An(){return new vt(0)}static Rn(){return new vt(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class op{constructor(){this.changes=new At(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,z.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const s=this.changes.get(n);return s!==void 0?d.resolve(s):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ap{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cp{constructor(e,n,s,r){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=s,this.indexManager=r}getDocument(e,n){let s=null;return this.documentOverlayCache.getOverlay(e,n).next(r=>(s=r,this.getBaseDocument(e,n,s))).next(r=>(s!==null&&Bt(s.mutation,r,ue.empty(),F.now()),r))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(s=>this.getLocalViewOfDocuments(e,s,C()).next(()=>s))}getLocalViewOfDocuments(e,n,s=C()){const r=$e();return this.populateOverlays(e,r,n).next(()=>this.computeViews(e,n,r,s).next(i=>{let o=Pt();return i.forEach((a,c)=>{o=o.insert(a,c.overlayedDocument)}),o}))}getOverlayedDocuments(e,n){const s=$e();return this.populateOverlays(e,s,n).next(()=>this.computeViews(e,n,s,C()))}populateOverlays(e,n,s){const r=[];return s.forEach(i=>{n.has(i)||r.push(i)}),this.documentOverlayCache.getOverlays(e,r).next(i=>{i.forEach((o,a)=>{n.set(o,a)})})}computeViews(e,n,s,r){let i=Te();const o=$t(),a=$t();return n.forEach((c,u)=>{const l=s.get(u.key);r.has(u.key)&&(l===void 0||l.mutation instanceof tt)?i=i.insert(u.key,u):l!==void 0&&(o.set(u.key,l.mutation.getFieldMask()),Bt(l.mutation,u,l.mutation.getFieldMask(),F.now()))}),this.recalculateAndSaveOverlays(e,i).next(c=>(c.forEach((u,l)=>o.set(u,l)),n.forEach((u,l)=>{var h;return a.set(u,new ap(l,(h=o.get(u))!==null&&h!==void 0?h:null))}),a))}recalculateAndSaveOverlays(e,n){const s=$t();let r=new B((o,a)=>o-a),i=C();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(o=>{for(const a of o)a.keys().forEach(c=>{const u=n.get(c);if(u===null)return;let l=s.get(c)||ue.empty();l=a.applyToLocalView(u,l),s.set(c,l);const h=(r.get(a.batchId)||C()).add(c);r=r.insert(a.batchId,h)})}).next(()=>{const o=[],a=r.getReverseIterator();for(;a.hasNext();){const c=a.getNext(),u=c.key,l=c.value,h=Lc();l.forEach(f=>{if(!i.has(f)){const g=Dc(n.get(f),s.get(f));g!==null&&h.set(f,g),i=i.add(f)}}),o.push(this.documentOverlayCache.saveOverlays(e,u,h))}return d.waitFor(o)}).next(()=>s)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(s=>this.recalculateAndSaveOverlays(e,s))}getDocumentsMatchingQuery(e,n,s){return function(r){return w.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):vf(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,s):this.getDocumentsMatchingCollectionQuery(e,n,s)}getNextDocuments(e,n,s,r){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,s,r).next(i=>{const o=r-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,s.largestBatchId,r-i.size):d.resolve($e());let a=-1,c=i;return o.next(u=>d.forEach(u,(l,h)=>(a<h.largestBatchId&&(a=h.largestBatchId),i.get(l)?d.resolve():this.getBaseDocument(e,l,h).next(f=>{c=c.insert(l,f)}))).next(()=>this.populateOverlays(e,u,i)).next(()=>this.computeViews(e,c,u,C())).next(l=>({batchId:a,changes:Pc(l)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new w(n)).next(s=>{let r=Pt();return s.isFoundDocument()&&(r=r.insert(s.key,s)),r})}getDocumentsMatchingCollectionGroupQuery(e,n,s){const r=n.collectionGroup;let i=Pt();return this.indexManager.getCollectionParents(e,r).next(o=>d.forEach(o,a=>{const c=function(u,l){return new _s(l,null,u.explicitOrderBy.slice(),u.filters.slice(),u.limit,u.limitType,u.startAt,u.endAt)}(n,a.child(r));return this.getDocumentsMatchingCollectionQuery(e,c,s).next(u=>{u.forEach((l,h)=>{i=i.insert(l,h)})})}).next(()=>i))}getDocumentsMatchingCollectionQuery(e,n,s){let r;return this.remoteDocumentCache.getAllFromCollection(e,n.path,s).next(i=>(r=i,this.documentOverlayCache.getOverlaysForCollection(e,n.path,s.largestBatchId))).next(i=>{i.forEach((a,c)=>{const u=c.getKey();r.get(u)===null&&(r=r.insert(u,z.newInvalidDocument(u)))});let o=Pt();return r.forEach((a,c)=>{const u=i.get(a);u!==void 0&&Bt(u.mutation,c,ue.empty(),F.now()),ui(n,c)&&(o=o.insert(a,c))}),o})}getBaseDocument(e,n,s){return s===null||s.mutation.type===1?this.remoteDocumentCache.getEntry(e,n):d.resolve(z.newInvalidDocument(n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class up{constructor(e){this.wt=e,this.Jn=new Map,this.Yn=new Map}getBundleMetadata(e,n){return d.resolve(this.Jn.get(n))}saveBundleMetadata(e,n){var s;return this.Jn.set(n.id,{id:(s=n).id,version:s.version,createTime:Ee(s.createTime)}),d.resolve()}getNamedQuery(e,n){return d.resolve(this.Yn.get(n))}saveNamedQuery(e,n){return this.Yn.set(n.name,function(s){return{name:s.name,query:sp(s.bundledQuery),readTime:Ee(s.readTime)}}(n)),d.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lp{constructor(){this.overlays=new B(w.comparator),this.Xn=new Map}getOverlay(e,n){return d.resolve(this.overlays.get(n))}getOverlays(e,n){const s=$e();return d.forEach(n,r=>this.getOverlay(e,r).next(i=>{i!==null&&s.set(r,i)})).next(()=>s)}saveOverlays(e,n,s){return s.forEach((r,i)=>{this.ie(e,n,i)}),d.resolve()}removeOverlaysForBatchId(e,n,s){const r=this.Xn.get(s);return r!==void 0&&(r.forEach(i=>this.overlays=this.overlays.remove(i)),this.Xn.delete(s)),d.resolve()}getOverlaysForCollection(e,n,s){const r=$e(),i=n.length+1,o=new w(n.child("")),a=this.overlays.getIteratorFrom(o);for(;a.hasNext();){const c=a.getNext().value,u=c.getKey();if(!n.isPrefixOf(u.path))break;u.path.length===i&&c.largestBatchId>s&&r.set(c.getKey(),c)}return d.resolve(r)}getOverlaysForCollectionGroup(e,n,s,r){let i=new B((u,l)=>u-l);const o=this.overlays.getIterator();for(;o.hasNext();){const u=o.getNext().value;if(u.getKey().getCollectionGroup()===n&&u.largestBatchId>s){let l=i.get(u.largestBatchId);l===null&&(l=$e(),i=i.insert(u.largestBatchId,l)),l.set(u.getKey(),u)}}const a=$e(),c=i.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach((u,l)=>a.set(u,l)),!(a.size()>=r)););return d.resolve(a)}ie(e,n,s){const r=this.overlays.get(s.key);if(r!==null){const o=this.Xn.get(r.largestBatchId).delete(s.key);this.Xn.set(r.largestBatchId,o)}this.overlays=this.overlays.insert(s.key,new tp(n,s));let i=this.Xn.get(n);i===void 0&&(i=C(),this.Xn.set(n,i)),this.Xn.set(n,i.add(s.key))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class di{constructor(){this.Zn=new V(j.ts),this.es=new V(j.ns)}isEmpty(){return this.Zn.isEmpty()}addReference(e,n){const s=new j(e,n);this.Zn=this.Zn.add(s),this.es=this.es.add(s)}ss(e,n){e.forEach(s=>this.addReference(s,n))}removeReference(e,n){this.rs(new j(e,n))}os(e,n){e.forEach(s=>this.removeReference(s,n))}us(e){const n=new w(new P([])),s=new j(n,e),r=new j(n,e+1),i=[];return this.es.forEachInRange([s,r],o=>{this.rs(o),i.push(o.key)}),i}cs(){this.Zn.forEach(e=>this.rs(e))}rs(e){this.Zn=this.Zn.delete(e),this.es=this.es.delete(e)}hs(e){const n=new w(new P([])),s=new j(n,e),r=new j(n,e+1);let i=C();return this.es.forEachInRange([s,r],o=>{i=i.add(o.key)}),i}containsKey(e){const n=new j(e,0),s=this.Zn.firstAfterOrEqual(n);return s!==null&&e.isEqual(s.key)}}class j{constructor(e,n){this.key=e,this.ls=n}static ts(e,n){return w.comparator(e.key,n.key)||N(e.ls,n.ls)}static ns(e,n){return N(e.ls,n.ls)||w.comparator(e.key,n.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hp{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.fs=1,this.ds=new V(j.ts)}checkEmpty(e){return d.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,s,r){const i=this.fs;this.fs++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new ep(i,n,s,r);this.mutationQueue.push(o);for(const a of r)this.ds=this.ds.add(new j(a.key,i)),this.indexManager.addToCollectionParentIndex(e,a.key.path.popLast());return d.resolve(o)}lookupMutationBatch(e,n){return d.resolve(this._s(n))}getNextMutationBatchAfterBatchId(e,n){const s=n+1,r=this.ws(s),i=r<0?0:r;return d.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return d.resolve(this.mutationQueue.length===0?-1:this.fs-1)}getAllMutationBatches(e){return d.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const s=new j(n,0),r=new j(n,Number.POSITIVE_INFINITY),i=[];return this.ds.forEachInRange([s,r],o=>{const a=this._s(o.ls);i.push(a)}),d.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,n){let s=new V(N);return n.forEach(r=>{const i=new j(r,0),o=new j(r,Number.POSITIVE_INFINITY);this.ds.forEachInRange([i,o],a=>{s=s.add(a.ls)})}),d.resolve(this.gs(s))}getAllMutationBatchesAffectingQuery(e,n){const s=n.path,r=s.length+1;let i=s;w.isDocumentKey(i)||(i=i.child(""));const o=new j(new w(i),0);let a=new V(N);return this.ds.forEachWhile(c=>{const u=c.key.path;return!!s.isPrefixOf(u)&&(u.length===r&&(a=a.add(c.ls)),!0)},o),d.resolve(this.gs(a))}gs(e){const n=[];return e.forEach(s=>{const r=this._s(s);r!==null&&n.push(r)}),n}removeMutationBatch(e,n){O(this.ys(n.batchId,"removed")===0),this.mutationQueue.shift();let s=this.ds;return d.forEach(n.mutations,r=>{const i=new j(r.key,n.batchId);return s=s.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,r.key)}).next(()=>{this.ds=s})}In(e){}containsKey(e,n){const s=new j(n,0),r=this.ds.firstAfterOrEqual(s);return d.resolve(n.isEqual(r&&r.key))}performConsistencyCheck(e){return this.mutationQueue.length,d.resolve()}ys(e,n){return this.ws(e)}ws(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}_s(e){const n=this.ws(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dp{constructor(e){this.ps=e,this.docs=new B(w.comparator),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const s=n.key,r=this.docs.get(s),i=r?r.size:0,o=this.ps(n);return this.docs=this.docs.insert(s,{document:n.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,s.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const s=this.docs.get(n);return d.resolve(s?s.document.mutableCopy():z.newInvalidDocument(n))}getEntries(e,n){let s=Te();return n.forEach(r=>{const i=this.docs.get(r);s=s.insert(r,i?i.document.mutableCopy():z.newInvalidDocument(r))}),d.resolve(s)}getAllFromCollection(e,n,s){let r=Te();const i=new w(n.child("")),o=this.docs.getIteratorFrom(i);for(;o.hasNext();){const{key:a,value:{document:c}}=o.getNext();if(!n.isPrefixOf(a.path))break;a.path.length>n.length+1||Xd(Qd(c),s)<=0||(r=r.insert(c.key,c.mutableCopy()))}return d.resolve(r)}getAllFromCollectionGroup(e,n,s,r){_()}Is(e,n){return d.forEach(this.docs,s=>n(s))}newChangeBuffer(e){return new fp(this)}getSize(e){return d.resolve(this.size)}}class fp extends op{constructor(e){super(),this.zn=e}applyChanges(e){const n=[];return this.changes.forEach((s,r)=>{r.isValidDocument()?n.push(this.zn.addEntry(e,r)):this.zn.removeEntry(s)}),d.waitFor(n)}getFromCache(e,n){return this.zn.getEntry(e,n)}getAllFromCache(e,n){return this.zn.getEntries(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pp{constructor(e){this.persistence=e,this.Ts=new At(n=>oi(n),ai),this.lastRemoteSnapshotVersion=b.min(),this.highestTargetId=0,this.Es=0,this.As=new di,this.targetCount=0,this.Rs=vt.An()}forEachTarget(e,n){return this.Ts.forEach((s,r)=>n(r)),d.resolve()}getLastRemoteSnapshotVersion(e){return d.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return d.resolve(this.Es)}allocateTargetId(e){return this.highestTargetId=this.Rs.next(),d.resolve(this.highestTargetId)}setTargetsMetadata(e,n,s){return s&&(this.lastRemoteSnapshotVersion=s),n>this.Es&&(this.Es=n),d.resolve()}vn(e){this.Ts.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.Rs=new vt(n),this.highestTargetId=n),e.sequenceNumber>this.Es&&(this.Es=e.sequenceNumber)}addTargetData(e,n){return this.vn(n),this.targetCount+=1,d.resolve()}updateTargetData(e,n){return this.vn(n),d.resolve()}removeTargetData(e,n){return this.Ts.delete(n.target),this.As.us(n.targetId),this.targetCount-=1,d.resolve()}removeTargets(e,n,s){let r=0;const i=[];return this.Ts.forEach((o,a)=>{a.sequenceNumber<=n&&s.get(a.targetId)===null&&(this.Ts.delete(o),i.push(this.removeMatchingKeysForTargetId(e,a.targetId)),r++)}),d.waitFor(i).next(()=>r)}getTargetCount(e){return d.resolve(this.targetCount)}getTargetData(e,n){const s=this.Ts.get(n)||null;return d.resolve(s)}addMatchingKeys(e,n,s){return this.As.ss(n,s),d.resolve()}removeMatchingKeys(e,n,s){this.As.os(n,s);const r=this.persistence.referenceDelegate,i=[];return r&&n.forEach(o=>{i.push(r.markPotentiallyOrphaned(e,o))}),d.waitFor(i)}removeMatchingKeysForTargetId(e,n){return this.As.us(n),d.resolve()}getMatchingKeysForTargetId(e,n){const s=this.As.hs(n);return d.resolve(s)}containsKey(e,n){return d.resolve(this.As.containsKey(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gp{constructor(e,n){this.bs={},this.overlays={},this.Ps=new ri(0),this.vs=!1,this.vs=!0,this.referenceDelegate=e(this),this.Vs=new pp(this),this.indexManager=new rp,this.remoteDocumentCache=function(s){return new dp(s)}(s=>this.referenceDelegate.Ss(s)),this.wt=new np(n),this.Ds=new up(this.wt)}start(){return Promise.resolve()}shutdown(){return this.vs=!1,Promise.resolve()}get started(){return this.vs}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new lp,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let s=this.bs[e.toKey()];return s||(s=new hp(n,this.referenceDelegate),this.bs[e.toKey()]=s),s}getTargetCache(){return this.Vs}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ds}runTransaction(e,n,s){y("MemoryPersistence","Starting transaction:",e);const r=new mp(this.Ps.next());return this.referenceDelegate.Cs(),s(r).next(i=>this.referenceDelegate.xs(r).next(()=>i)).toPromise().then(i=>(r.raiseOnCommittedEvent(),i))}Ns(e,n){return d.or(Object.values(this.bs).map(s=>()=>s.containsKey(e,n)))}}class mp extends Jd{constructor(e){super(),this.currentSequenceNumber=e}}class fi{constructor(e){this.persistence=e,this.ks=new di,this.Os=null}static Ms(e){return new fi(e)}get Fs(){if(this.Os)return this.Os;throw _()}addReference(e,n,s){return this.ks.addReference(s,n),this.Fs.delete(s.toString()),d.resolve()}removeReference(e,n,s){return this.ks.removeReference(s,n),this.Fs.add(s.toString()),d.resolve()}markPotentiallyOrphaned(e,n){return this.Fs.add(n.toString()),d.resolve()}removeTarget(e,n){this.ks.us(n.targetId).forEach(r=>this.Fs.add(r.toString()));const s=this.persistence.getTargetCache();return s.getMatchingKeysForTargetId(e,n.targetId).next(r=>{r.forEach(i=>this.Fs.add(i.toString()))}).next(()=>s.removeTargetData(e,n))}Cs(){this.Os=new Set}xs(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return d.forEach(this.Fs,s=>{const r=w.fromPath(s);return this.$s(e,r).next(i=>{i||n.removeEntry(r,b.min())})}).next(()=>(this.Os=null,n.apply(e)))}updateLimboDocument(e,n){return this.$s(e,n).next(s=>{s?this.Fs.delete(n.toString()):this.Fs.add(n.toString())})}Ss(e){return 0}$s(e,n){return d.or([()=>d.resolve(this.ks.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Ns(e,n)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pi{constructor(e,n,s,r){this.targetId=e,this.fromCache=n,this.Pi=s,this.vi=r}static Vi(e,n){let s=C(),r=C();for(const i of n.docChanges)switch(i.type){case 0:s=s.add(i.doc.key);break;case 1:r=r.add(i.doc.key)}return new pi(e,n.fromCache,s,r)}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yp{constructor(){this.Si=!1}initialize(e,n){this.Di=e,this.indexManager=n,this.Si=!0}getDocumentsMatchingQuery(e,n,s,r){return this.Ci(e,n).next(i=>i||this.xi(e,n,r,s)).next(i=>i||this.Ni(e,n))}Ci(e,n){return d.resolve(null)}xi(e,n,s,r){return gf(n)||r.isEqual(b.min())?this.Ni(e,n):this.Di.getDocuments(e,s).next(i=>{const o=this.ki(n,i);return this.Oi(n,o,s,r)?this.Ni(e,n):(uo()<=R.DEBUG&&y("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),Ir(n)),this.Mi(e,o,n,Wd(r,-1)))})}ki(e,n){let s=new V(Tc(e));return n.forEach((r,i)=>{ui(e,i)&&(s=s.add(i))}),s}Oi(e,n,s,r){if(e.limit===null)return!1;if(s.size!==n.size)return!0;const i=e.limitType==="F"?n.last():n.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(r)>0)}Ni(e,n){return uo()<=R.DEBUG&&y("QueryEngine","Using full collection scan to execute query:",Ir(n)),this.Di.getDocumentsMatchingQuery(e,n,Me.min())}Mi(e,n,s,r){return this.Di.getDocumentsMatchingQuery(e,s,r).next(i=>(n.forEach(o=>{i=i.insert(o.key,o)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vp{constructor(e,n,s,r){this.persistence=e,this.Fi=n,this.wt=r,this.$i=new B(N),this.Bi=new At(i=>oi(i),ai),this.Li=new Map,this.Ui=e.getRemoteDocumentCache(),this.Vs=e.getTargetCache(),this.Ds=e.getBundleCache(),this.qi(s)}qi(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new cp(this.Ui,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ui.setIndexManager(this.indexManager),this.Fi.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.$i))}}function wp(t,e,n,s){return new vp(t,e,n,s)}async function Hc(t,e){const n=S(t);return await n.persistence.runTransaction("Handle user change","readonly",s=>{let r;return n.mutationQueue.getAllMutationBatches(s).next(i=>(r=i,n.qi(e),n.mutationQueue.getAllMutationBatches(s))).next(i=>{const o=[],a=[];let c=C();for(const u of r){o.push(u.batchId);for(const l of u.mutations)c=c.add(l.key)}for(const u of i){a.push(u.batchId);for(const l of u.mutations)c=c.add(l.key)}return n.localDocuments.getDocuments(s,c).next(u=>({Ki:u,removedBatchIds:o,addedBatchIds:a}))})})}function Ep(t,e){const n=S(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",s=>{const r=e.batch.keys(),i=n.Ui.newChangeBuffer({trackRemovals:!0});return function(o,a,c,u){const l=c.batch,h=l.keys();let f=d.resolve();return h.forEach(g=>{f=f.next(()=>u.getEntry(a,g)).next(v=>{const k=c.docVersions.get(g);O(k!==null),v.version.compareTo(k)<0&&(l.applyToRemoteDocument(v,c),v.isValidDocument()&&(v.setReadTime(c.commitVersion),u.addEntry(v)))})}),f.next(()=>o.mutationQueue.removeMutationBatch(a,l))}(n,s,e,i).next(()=>i.apply(s)).next(()=>n.mutationQueue.performConsistencyCheck(s)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(s,r,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(s,function(o){let a=C();for(let c=0;c<o.mutationResults.length;++c)o.mutationResults[c].transformResults.length>0&&(a=a.add(o.batch.mutations[c].key));return a}(e))).next(()=>n.localDocuments.getDocuments(s,r))})}function Kc(t){const e=S(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.Vs.getLastRemoteSnapshotVersion(n))}function Ip(t,e){const n=S(t),s=e.snapshotVersion;let r=n.$i;return n.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=n.Ui.newChangeBuffer({trackRemovals:!0});r=n.$i;const a=[];e.targetChanges.forEach((l,h)=>{const f=r.get(h);if(!f)return;a.push(n.Vs.removeMatchingKeys(i,l.removedDocuments,h).next(()=>n.Vs.addMatchingKeys(i,l.addedDocuments,h)));let g=f.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.has(h)?g=g.withResumeToken(Q.EMPTY_BYTE_STRING,b.min()).withLastLimboFreeSnapshotVersion(b.min()):l.resumeToken.approximateByteSize()>0&&(g=g.withResumeToken(l.resumeToken,s)),r=r.insert(h,g),function(v,k,D){return v.resumeToken.approximateByteSize()===0||k.snapshotVersion.toMicroseconds()-v.snapshotVersion.toMicroseconds()>=3e8?!0:D.addedDocuments.size+D.modifiedDocuments.size+D.removedDocuments.size>0}(f,g,l)&&a.push(n.Vs.updateTargetData(i,g))});let c=Te(),u=C();if(e.documentUpdates.forEach(l=>{e.resolvedLimboDocuments.has(l)&&a.push(n.persistence.referenceDelegate.updateLimboDocument(i,l))}),a.push(Tp(i,o,e.documentUpdates).next(l=>{c=l.Gi,u=l.Qi})),!s.isEqual(b.min())){const l=n.Vs.getLastRemoteSnapshotVersion(i).next(h=>n.Vs.setTargetsMetadata(i,i.currentSequenceNumber,s));a.push(l)}return d.waitFor(a).next(()=>o.apply(i)).next(()=>n.localDocuments.getLocalViewOfDocuments(i,c,u)).next(()=>c)}).then(i=>(n.$i=r,i))}function Tp(t,e,n){let s=C(),r=C();return n.forEach(i=>s=s.add(i)),e.getEntries(t,s).next(i=>{let o=Te();return n.forEach((a,c)=>{const u=i.get(a);c.isFoundDocument()!==u.isFoundDocument()&&(r=r.add(a)),c.isNoDocument()&&c.version.isEqual(b.min())?(e.removeEntry(a,c.readTime),o=o.insert(a,c)):!u.isValidDocument()||c.version.compareTo(u.version)>0||c.version.compareTo(u.version)===0&&u.hasPendingWrites?(e.addEntry(c),o=o.insert(a,c)):y("LocalStore","Ignoring outdated watch update for ",a,". Current version:",u.version," Watch version:",c.version)}),{Gi:o,Qi:r}})}function _p(t,e){const n=S(t);return n.persistence.runTransaction("Get next mutation batch","readonly",s=>(e===void 0&&(e=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(s,e)))}function Sp(t,e){const n=S(t);return n.persistence.runTransaction("Allocate target","readwrite",s=>{let r;return n.Vs.getTargetData(s,e).next(i=>i?(r=i,d.resolve(r)):n.Vs.allocateTargetId(s).next(o=>(r=new qe(e,o,0,s.currentSequenceNumber),n.Vs.addTargetData(s,r).next(()=>r))))}).then(s=>{const r=n.$i.get(s.targetId);return(r===null||s.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(n.$i=n.$i.insert(s.targetId,s),n.Bi.set(e,s.targetId)),s})}async function br(t,e,n){const s=S(t),r=s.$i.get(e),i=n?"readwrite":"readwrite-primary";try{n||await s.persistence.runTransaction("Release target",i,o=>s.persistence.referenceDelegate.removeTarget(o,r))}catch(o){if(!vn(o))throw o;y("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}s.$i=s.$i.remove(e),s.Bi.delete(r.target)}function ko(t,e,n){const s=S(t);let r=b.min(),i=C();return s.persistence.runTransaction("Execute query","readonly",o=>function(a,c,u){const l=S(a),h=l.Bi.get(u);return h!==void 0?d.resolve(l.$i.get(h)):l.Vs.getTargetData(c,u)}(s,o,Ye(e)).next(a=>{if(a)return r=a.lastLimboFreeSnapshotVersion,s.Vs.getMatchingKeysForTargetId(o,a.targetId).next(c=>{i=c})}).next(()=>s.Fi.getDocumentsMatchingQuery(o,e,n?r:b.min(),n?i:C())).next(a=>(bp(s,Ef(e),a),{documents:a,ji:i})))}function bp(t,e,n){let s=b.min();n.forEach((r,i)=>{i.readTime.compareTo(s)>0&&(s=i.readTime)}),t.Li.set(e,s)}class Do{constructor(){this.activeTargetIds=xc()}Xi(e){this.activeTargetIds=this.activeTargetIds.add(e)}Zi(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Yi(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Cp{constructor(){this.Fr=new Do,this.$r={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,s){}addLocalQueryTarget(e){return this.Fr.Xi(e),this.$r[e]||"not-current"}updateQueryState(e,n,s){this.$r[e]=n}removeLocalQueryTarget(e){this.Fr.Zi(e)}isLocalQueryTarget(e){return this.Fr.activeTargetIds.has(e)}clearQueryState(e){delete this.$r[e]}getAllActiveQueryTargets(){return this.Fr.activeTargetIds}isActiveQueryTarget(e){return this.Fr.activeTargetIds.has(e)}start(){return this.Fr=new Do,Promise.resolve()}handleUserChange(e,n,s){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ap{Br(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ro{constructor(){this.Lr=()=>this.Ur(),this.qr=()=>this.Kr(),this.Gr=[],this.Qr()}Br(e){this.Gr.push(e)}shutdown(){window.removeEventListener("online",this.Lr),window.removeEventListener("offline",this.qr)}Qr(){window.addEventListener("online",this.Lr),window.addEventListener("offline",this.qr)}Ur(){y("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.Gr)e(0)}Kr(){y("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.Gr)e(1)}static V(){return typeof window!="undefined"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kp={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dp{constructor(e){this.jr=e.jr,this.Wr=e.Wr}zr(e){this.Hr=e}Jr(e){this.Yr=e}onMessage(e){this.Xr=e}close(){this.Wr()}send(e){this.jr(e)}Zr(){this.Hr()}eo(e){this.Yr(e)}no(e){this.Xr(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rp extends class{constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const n=e.ssl?"https":"http";this.so=n+"://"+e.host,this.io="projects/"+this.databaseId.projectId+"/databases/"+this.databaseId.database+"/documents"}ro(e,n,s,r,i){const o=this.oo(e,n);y("RestConnection","Sending: ",o,s);const a={};return this.uo(a,r,i),this.co(e,o,a,s).then(c=>(y("RestConnection","Received: ",c),c),c=>{throw lo("RestConnection",`${e} failed with error: `,c,"url: ",o,"request:",s),c})}ao(e,n,s,r,i,o){return this.ro(e,n,s,r,i)}uo(e,n,s){e["X-Goog-Api-Client"]="gl-js/ fire/"+bt,e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach((r,i)=>e[i]=r),s&&s.headers.forEach((r,i)=>e[i]=r)}oo(e,n){const s=kp[e];return`${this.so}/v1/${n}:${s}`}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams}co(e,n,s,r){return new Promise((i,o)=>{const a=new Fd;a.listenOnce(Ld.COMPLETE,()=>{try{switch(a.getLastErrorCode()){case Ys.NO_ERROR:const u=a.getResponseJson();y("Connection","XHR received:",JSON.stringify(u)),i(u);break;case Ys.TIMEOUT:y("Connection",'RPC "'+e+'" timed out'),o(new E(p.DEADLINE_EXCEEDED,"Request time out"));break;case Ys.HTTP_ERROR:const l=a.getStatus();if(y("Connection",'RPC "'+e+'" failed with status:',l,"response text:",a.getResponseText()),l>0){const h=a.getResponseJson().error;if(h&&h.status&&h.message){const f=function(g){const v=g.toLowerCase().replace(/_/g,"-");return Object.values(p).indexOf(v)>=0?v:p.UNKNOWN}(h.status);o(new E(f,h.message))}else o(new E(p.UNKNOWN,"Server responded with status "+a.getStatus()))}else o(new E(p.UNAVAILABLE,"Connection failed."));break;default:_()}}finally{y("Connection",'RPC "'+e+'" completed.')}});const c=JSON.stringify(r);a.send(n,"POST",c,s,15)})}ho(e,n,s){const r=[this.so,"/","google.firestore.v1.Firestore","/",e,"/channel"],i=Md(),o=Pd(),a={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling};this.useFetchStreams&&(a.xmlHttpFactory=new Ud({})),this.uo(a.initMessageHeaders,n,s),ia()||aa()||ml()||ca()||yl()||oa()||(a.httpHeadersOverwriteParam="$httpHeaders");const c=r.join("");y("Connection","Creating WebChannel: "+c,a);const u=i.createWebChannel(c,a);let l=!1,h=!1;const f=new Dp({jr:v=>{h?y("Connection","Not sending because WebChannel is closed:",v):(l||(y("Connection","Opening WebChannel transport."),u.open(),l=!0),y("Connection","WebChannel sending:",v),u.send(v))},Wr:()=>u.close()}),g=(v,k,D)=>{v.listen(k,$=>{try{D($)}catch(Y){setTimeout(()=>{throw Y},0)}})};return g(u,Dn.EventType.OPEN,()=>{h||y("Connection","WebChannel transport opened.")}),g(u,Dn.EventType.CLOSE,()=>{h||(h=!0,y("Connection","WebChannel transport closed"),f.eo())}),g(u,Dn.EventType.ERROR,v=>{h||(h=!0,lo("Connection","WebChannel transport errored:",v),f.eo(new E(p.UNAVAILABLE,"The operation could not be completed")))}),g(u,Dn.EventType.MESSAGE,v=>{var k;if(!h){const D=v.data[0];O(!!D);const $=D,Y=$.error||((k=$[0])===null||k===void 0?void 0:k.error);if(Y){y("Connection","WebChannel received error:",Y);const ge=Y.status;let Se=function(Rt){const Nt=L[Rt];if(Nt!==void 0)return Oc(Nt)}(ge),Dt=Y.message;Se===void 0&&(Se=p.INTERNAL,Dt="Unknown error status: "+ge+" with message "+Y.message),h=!0,f.eo(new E(Se,Dt)),u.close()}else y("Connection","WebChannel received:",D),f.no(D)}}),g(o,xd.STAT_EVENT,v=>{v.stat===ao.PROXY?y("Connection","Detected buffering proxy"):v.stat===ao.NOPROXY&&y("Connection","Detected no buffering proxy")}),setTimeout(()=>{f.Zr()},0),f}}function Zs(){return typeof document!="undefined"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ks(t){return new Vf(t,!0)}class zc{constructor(e,n,s=1e3,r=1.5,i=6e4){this.js=e,this.timerId=n,this.lo=s,this.fo=r,this._o=i,this.wo=0,this.mo=null,this.yo=Date.now(),this.reset()}reset(){this.wo=0}po(){this.wo=this._o}Io(e){this.cancel();const n=Math.floor(this.wo+this.To()),s=Math.max(0,Date.now()-this.yo),r=Math.max(0,n-s);r>0&&y("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.wo} ms, delay with jitter: ${n} ms, last attempt: ${s} ms ago)`),this.mo=this.js.enqueueAfterDelay(this.timerId,r,()=>(this.yo=Date.now(),e())),this.wo*=this.fo,this.wo<this.lo&&(this.wo=this.lo),this.wo>this._o&&(this.wo=this._o)}Eo(){this.mo!==null&&(this.mo.skipDelay(),this.mo=null)}cancel(){this.mo!==null&&(this.mo.cancel(),this.mo=null)}To(){return(Math.random()-.5)*this.wo}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gc{constructor(e,n,s,r,i,o,a,c){this.js=e,this.Ao=s,this.Ro=r,this.bo=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=a,this.listener=c,this.state=0,this.Po=0,this.vo=null,this.Vo=null,this.stream=null,this.So=new zc(e,n)}Do(){return this.state===1||this.state===5||this.Co()}Co(){return this.state===2||this.state===3}start(){this.state!==4?this.auth():this.xo()}async stop(){this.Do()&&await this.close(0)}No(){this.state=0,this.So.reset()}ko(){this.Co()&&this.vo===null&&(this.vo=this.js.enqueueAfterDelay(this.Ao,6e4,()=>this.Oo()))}Mo(e){this.Fo(),this.stream.send(e)}async Oo(){if(this.Co())return this.close(0)}Fo(){this.vo&&(this.vo.cancel(),this.vo=null)}$o(){this.Vo&&(this.Vo.cancel(),this.Vo=null)}async close(e,n){this.Fo(),this.$o(),this.So.cancel(),this.Po++,e!==4?this.So.reset():n&&n.code===p.RESOURCE_EXHAUSTED?(Oe(n.toString()),Oe("Using maximum backoff delay to prevent overloading the backend."),this.So.po()):n&&n.code===p.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.Bo(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Jr(n)}Bo(){}auth(){this.state=1;const e=this.Lo(this.Po),n=this.Po;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([s,r])=>{this.Po===n&&this.Uo(s,r)},s=>{e(()=>{const r=new E(p.UNKNOWN,"Fetching auth token failed: "+s.message);return this.qo(r)})})}Uo(e,n){const s=this.Lo(this.Po);this.stream=this.Ko(e,n),this.stream.zr(()=>{s(()=>(this.state=2,this.Vo=this.js.enqueueAfterDelay(this.Ro,1e4,()=>(this.Co()&&(this.state=3),Promise.resolve())),this.listener.zr()))}),this.stream.Jr(r=>{s(()=>this.qo(r))}),this.stream.onMessage(r=>{s(()=>this.onMessage(r))})}xo(){this.state=5,this.So.Io(async()=>{this.state=0,this.start()})}qo(e){return y("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}Lo(e){return n=>{this.js.enqueueAndForget(()=>this.Po===e?n():(y("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Np extends Gc{constructor(e,n,s,r,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,s,r,o),this.wt=i}Ko(e,n){return this.bo.ho("Listen",e,n)}onMessage(e){this.So.reset();const n=jf(this.wt,e),s=function(r){if(!("targetChange"in r))return b.min();const i=r.targetChange;return i.targetIds&&i.targetIds.length?b.min():i.readTime?Ee(i.readTime):b.min()}(e);return this.listener.Go(n,s)}Qo(e){const n={};n.database=Sr(this.wt),n.addTarget=function(r,i){let o;const a=i.target;return o=Er(a)?{documents:Kf(r,a)}:{query:zf(r,a)},o.targetId=i.targetId,i.resumeToken.approximateByteSize()>0?o.resumeToken=Vc(r,i.resumeToken):i.snapshotVersion.compareTo(b.min())>0&&(o.readTime=ns(r,i.snapshotVersion.toTimestamp())),o}(this.wt,e);const s=Wf(this.wt,e);s&&(n.labels=s),this.Mo(n)}jo(e){const n={};n.database=Sr(this.wt),n.removeTarget=e,this.Mo(n)}}class Op extends Gc{constructor(e,n,s,r,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,s,r,o),this.wt=i,this.Wo=!1}get zo(){return this.Wo}start(){this.Wo=!1,this.lastStreamToken=void 0,super.start()}Bo(){this.Wo&&this.Ho([])}Ko(e,n){return this.bo.ho("Write",e,n)}onMessage(e){if(O(!!e.streamToken),this.lastStreamToken=e.streamToken,this.Wo){this.So.reset();const n=Hf(e.writeResults,e.commitTime),s=Ee(e.commitTime);return this.listener.Jo(s,n)}return O(!e.writeResults||e.writeResults.length===0),this.Wo=!0,this.listener.Yo()}Xo(){const e={};e.database=Sr(this.wt),this.Mo(e)}Ho(e){const n={streamToken:this.lastStreamToken,writes:e.map(s=>qf(this.wt,s))};this.Mo(n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mp extends class{}{constructor(e,n,s,r){super(),this.authCredentials=e,this.appCheckCredentials=n,this.bo=s,this.wt=r,this.Zo=!1}tu(){if(this.Zo)throw new E(p.FAILED_PRECONDITION,"The client has already been terminated.")}ro(e,n,s){return this.tu(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([r,i])=>this.bo.ro(e,n,s,r,i)).catch(r=>{throw r.name==="FirebaseError"?(r.code===p.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),r):new E(p.UNKNOWN,r.toString())})}ao(e,n,s,r){return this.tu(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.bo.ao(e,n,s,i,o,r)).catch(i=>{throw i.name==="FirebaseError"?(i.code===p.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new E(p.UNKNOWN,i.toString())})}terminate(){this.Zo=!0}}class Pp{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.eu=0,this.nu=null,this.su=!0}iu(){this.eu===0&&(this.ru("Unknown"),this.nu=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.nu=null,this.ou("Backend didn't respond within 10 seconds."),this.ru("Offline"),Promise.resolve())))}uu(e){this.state==="Online"?this.ru("Unknown"):(this.eu++,this.eu>=1&&(this.cu(),this.ou(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ru("Offline")))}set(e){this.cu(),this.eu=0,e==="Online"&&(this.su=!1),this.ru(e)}ru(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}ou(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.su?(Oe(n),this.su=!1):y("OnlineStateTracker",n)}cu(){this.nu!==null&&(this.nu.cancel(),this.nu=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lp{constructor(e,n,s,r,i){this.localStore=e,this.datastore=n,this.asyncQueue=s,this.remoteSyncer={},this.au=[],this.hu=new Map,this.lu=new Set,this.fu=[],this.du=i,this.du.Br(o=>{s.enqueueAndForget(async()=>{nt(this)&&(y("RemoteStore","Restarting streams for network reachability change."),await async function(a){const c=S(a);c.lu.add(4),await In(c),c._u.set("Unknown"),c.lu.delete(4),await Ds(c)}(this))})}),this._u=new Pp(s,r)}}async function Ds(t){if(nt(t))for(const e of t.fu)await e(!0)}async function In(t){for(const e of t.fu)await e(!1)}function Wc(t,e){const n=S(t);n.hu.has(e.targetId)||(n.hu.set(e.targetId,e),yi(n)?mi(n):kt(n).Co()&&gi(n,e))}function Qc(t,e){const n=S(t),s=kt(n);n.hu.delete(e),s.Co()&&Xc(n,e),n.hu.size===0&&(s.Co()?s.ko():nt(n)&&n._u.set("Unknown"))}function gi(t,e){t.wu.Nt(e.targetId),kt(t).Qo(e)}function Xc(t,e){t.wu.Nt(e),kt(t).jo(e)}function mi(t){t.wu=new xf({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),te:e=>t.hu.get(e)||null}),kt(t).start(),t._u.iu()}function yi(t){return nt(t)&&!kt(t).Do()&&t.hu.size>0}function nt(t){return S(t).lu.size===0}function Yc(t){t.wu=void 0}async function xp(t){t.hu.forEach((e,n)=>{gi(t,e)})}async function Up(t,e){Yc(t),yi(t)?(t._u.uu(e),mi(t)):t._u.set("Unknown")}async function Fp(t,e,n){if(t._u.set("Online"),e instanceof Fc&&e.state===2&&e.cause)try{await async function(s,r){const i=r.cause;for(const o of r.targetIds)s.hu.has(o)&&(await s.remoteSyncer.rejectListen(o,i),s.hu.delete(o),s.wu.removeTarget(o))}(t,e)}catch(s){y("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),s),await ss(t,s)}else if(e instanceof Ln?t.wu.Ut(e):e instanceof Uc?t.wu.zt(e):t.wu.Gt(e),!n.isEqual(b.min()))try{const s=await Kc(t.localStore);n.compareTo(s)>=0&&await function(r,i){const o=r.wu.Yt(i);return o.targetChanges.forEach((a,c)=>{if(a.resumeToken.approximateByteSize()>0){const u=r.hu.get(c);u&&r.hu.set(c,u.withResumeToken(a.resumeToken,i))}}),o.targetMismatches.forEach(a=>{const c=r.hu.get(a);if(!c)return;r.hu.set(a,c.withResumeToken(Q.EMPTY_BYTE_STRING,c.snapshotVersion)),Xc(r,a);const u=new qe(c.target,a,1,c.sequenceNumber);gi(r,u)}),r.remoteSyncer.applyRemoteEvent(o)}(t,n)}catch(s){y("RemoteStore","Failed to raise snapshot:",s),await ss(t,s)}}async function ss(t,e,n){if(!vn(e))throw e;t.lu.add(1),await In(t),t._u.set("Offline"),n||(n=()=>Kc(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{y("RemoteStore","Retrying IndexedDB access"),await n(),t.lu.delete(1),await Ds(t)})}function Jc(t,e){return e().catch(n=>ss(t,n,e))}async function Rs(t){const e=S(t),n=Le(e);let s=e.au.length>0?e.au[e.au.length-1].batchId:-1;for(;Vp(e);)try{const r=await _p(e.localStore,s);if(r===null){e.au.length===0&&n.ko();break}s=r.batchId,Bp(e,r)}catch(r){await ss(e,r)}Zc(e)&&eu(e)}function Vp(t){return nt(t)&&t.au.length<10}function Bp(t,e){t.au.push(e);const n=Le(t);n.Co()&&n.zo&&n.Ho(e.mutations)}function Zc(t){return nt(t)&&!Le(t).Do()&&t.au.length>0}function eu(t){Le(t).start()}async function $p(t){Le(t).Xo()}async function jp(t){const e=Le(t);for(const n of t.au)e.Ho(n.mutations)}async function qp(t,e,n){const s=t.au.shift(),r=hi.from(s,e,n);await Jc(t,()=>t.remoteSyncer.applySuccessfulWrite(r)),await Rs(t)}async function Hp(t,e){e&&Le(t).zo&&await async function(n,s){if(r=s.code,Nf(r)&&r!==p.ABORTED){const i=n.au.shift();Le(n).No(),await Jc(n,()=>n.remoteSyncer.rejectFailedWrite(i.batchId,s)),await Rs(n)}var r}(t,e),Zc(t)&&eu(t)}async function No(t,e){const n=S(t);n.asyncQueue.verifyOperationInProgress(),y("RemoteStore","RemoteStore received new credentials");const s=nt(n);n.lu.add(3),await In(n),s&&n._u.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.lu.delete(3),await Ds(n)}async function Kp(t,e){const n=S(t);e?(n.lu.delete(2),await Ds(n)):e||(n.lu.add(2),await In(n),n._u.set("Unknown"))}function kt(t){return t.mu||(t.mu=function(e,n,s){const r=S(e);return r.tu(),new Np(n,r.bo,r.authCredentials,r.appCheckCredentials,r.wt,s)}(t.datastore,t.asyncQueue,{zr:xp.bind(null,t),Jr:Up.bind(null,t),Go:Fp.bind(null,t)}),t.fu.push(async e=>{e?(t.mu.No(),yi(t)?mi(t):t._u.set("Unknown")):(await t.mu.stop(),Yc(t))})),t.mu}function Le(t){return t.gu||(t.gu=function(e,n,s){const r=S(e);return r.tu(),new Op(n,r.bo,r.authCredentials,r.appCheckCredentials,r.wt,s)}(t.datastore,t.asyncQueue,{zr:$p.bind(null,t),Jr:Hp.bind(null,t),Yo:jp.bind(null,t),Jo:qp.bind(null,t)}),t.fu.push(async e=>{e?(t.gu.No(),await Rs(t)):(await t.gu.stop(),t.au.length>0&&(y("RemoteStore",`Stopping write stream with ${t.au.length} pending writes`),t.au=[]))})),t.gu}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vi{constructor(e,n,s,r,i){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=s,this.op=r,this.removalCallback=i,this.deferred=new je,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}static createAndSchedule(e,n,s,r,i){const o=Date.now()+s,a=new vi(e,n,o,r,i);return a.start(s),a}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new E(p.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function wi(t,e){if(Oe("AsyncQueue",`${e}: ${t}`),vn(t))return new E(p.UNAVAILABLE,`${e}: ${t}`);throw t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ct{constructor(e){this.comparator=e?(n,s)=>e(n,s)||w.comparator(n.key,s.key):(n,s)=>w.comparator(n.key,s.key),this.keyedMap=Pt(),this.sortedSet=new B(this.comparator)}static emptySet(e){return new ct(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,s)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof ct)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),s=e.sortedSet.getIterator();for(;n.hasNext();){const r=n.getNext().key,i=s.getNext().key;if(!r.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const s=new ct;return s.comparator=this.comparator,s.keyedMap=e,s.sortedSet=n,s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oo{constructor(){this.yu=new B(w.comparator)}track(e){const n=e.doc.key,s=this.yu.get(n);s?e.type!==0&&s.type===3?this.yu=this.yu.insert(n,e):e.type===3&&s.type!==1?this.yu=this.yu.insert(n,{type:s.type,doc:e.doc}):e.type===2&&s.type===2?this.yu=this.yu.insert(n,{type:2,doc:e.doc}):e.type===2&&s.type===0?this.yu=this.yu.insert(n,{type:0,doc:e.doc}):e.type===1&&s.type===0?this.yu=this.yu.remove(n):e.type===1&&s.type===2?this.yu=this.yu.insert(n,{type:1,doc:s.doc}):e.type===0&&s.type===1?this.yu=this.yu.insert(n,{type:2,doc:e.doc}):_():this.yu=this.yu.insert(n,e)}pu(){const e=[];return this.yu.inorderTraversal((n,s)=>{e.push(s)}),e}}class wt{constructor(e,n,s,r,i,o,a,c){this.query=e,this.docs=n,this.oldDocs=s,this.docChanges=r,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=a,this.excludesMetadataChanges=c}static fromInitialDocuments(e,n,s,r){const i=[];return n.forEach(o=>{i.push({type:0,doc:o})}),new wt(e,n,ct.emptySet(n),i,s,r,!0,!1)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Ss(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,s=e.docChanges;if(n.length!==s.length)return!1;for(let r=0;r<n.length;r++)if(n[r].type!==s[r].type||!n[r].doc.isEqual(s[r].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zp{constructor(){this.Iu=void 0,this.listeners=[]}}class Gp{constructor(){this.queries=new At(e=>Ic(e),Ss),this.onlineState="Unknown",this.Tu=new Set}}async function Wp(t,e){const n=S(t),s=e.query;let r=!1,i=n.queries.get(s);if(i||(r=!0,i=new zp),r)try{i.Iu=await n.onListen(s)}catch(o){const a=wi(o,`Initialization of query '${Ir(e.query)}' failed`);return void e.onError(a)}n.queries.set(s,i),i.listeners.push(e),e.Eu(n.onlineState),i.Iu&&e.Au(i.Iu)&&Ei(n)}async function Qp(t,e){const n=S(t),s=e.query;let r=!1;const i=n.queries.get(s);if(i){const o=i.listeners.indexOf(e);o>=0&&(i.listeners.splice(o,1),r=i.listeners.length===0)}if(r)return n.queries.delete(s),n.onUnlisten(s)}function Xp(t,e){const n=S(t);let s=!1;for(const r of e){const i=r.query,o=n.queries.get(i);if(o){for(const a of o.listeners)a.Au(r)&&(s=!0);o.Iu=r}}s&&Ei(n)}function Yp(t,e,n){const s=S(t),r=s.queries.get(e);if(r)for(const i of r.listeners)i.onError(n);s.queries.delete(e)}function Ei(t){t.Tu.forEach(e=>{e.next()})}class Jp{constructor(e,n,s){this.query=e,this.Ru=n,this.bu=!1,this.Pu=null,this.onlineState="Unknown",this.options=s||{}}Au(e){if(!this.options.includeMetadataChanges){const s=[];for(const r of e.docChanges)r.type!==3&&s.push(r);e=new wt(e.query,e.docs,e.oldDocs,s,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0)}let n=!1;return this.bu?this.vu(e)&&(this.Ru.next(e),n=!0):this.Vu(e,this.onlineState)&&(this.Su(e),n=!0),this.Pu=e,n}onError(e){this.Ru.error(e)}Eu(e){this.onlineState=e;let n=!1;return this.Pu&&!this.bu&&this.Vu(this.Pu,e)&&(this.Su(this.Pu),n=!0),n}Vu(e,n){if(!e.fromCache)return!0;const s=n!=="Offline";return(!this.options.Du||!s)&&(!e.docs.isEmpty()||n==="Offline")}vu(e){if(e.docChanges.length>0)return!0;const n=this.Pu&&this.Pu.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}Su(e){e=wt.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache),this.bu=!0,this.Ru.next(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tu{constructor(e){this.key=e}}class nu{constructor(e){this.key=e}}class Zp{constructor(e,n){this.query=e,this.Fu=n,this.$u=null,this.current=!1,this.Bu=C(),this.mutatedKeys=C(),this.Lu=Tc(e),this.Uu=new ct(this.Lu)}get qu(){return this.Fu}Ku(e,n){const s=n?n.Gu:new Oo,r=n?n.Uu:this.Uu;let i=n?n.mutatedKeys:this.mutatedKeys,o=r,a=!1;const c=this.query.limitType==="F"&&r.size===this.query.limit?r.last():null,u=this.query.limitType==="L"&&r.size===this.query.limit?r.first():null;if(e.inorderTraversal((l,h)=>{const f=r.get(l),g=ui(this.query,h)?h:null,v=!!f&&this.mutatedKeys.has(f.key),k=!!g&&(g.hasLocalMutations||this.mutatedKeys.has(g.key)&&g.hasCommittedMutations);let D=!1;f&&g?f.data.isEqual(g.data)?v!==k&&(s.track({type:3,doc:g}),D=!0):this.Qu(f,g)||(s.track({type:2,doc:g}),D=!0,(c&&this.Lu(g,c)>0||u&&this.Lu(g,u)<0)&&(a=!0)):!f&&g?(s.track({type:0,doc:g}),D=!0):f&&!g&&(s.track({type:1,doc:f}),D=!0,(c||u)&&(a=!0)),D&&(g?(o=o.add(g),i=k?i.add(l):i.delete(l)):(o=o.delete(l),i=i.delete(l)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const l=this.query.limitType==="F"?o.last():o.first();o=o.delete(l.key),i=i.delete(l.key),s.track({type:1,doc:l})}return{Uu:o,Gu:s,Oi:a,mutatedKeys:i}}Qu(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,s){const r=this.Uu;this.Uu=e.Uu,this.mutatedKeys=e.mutatedKeys;const i=e.Gu.pu();i.sort((u,l)=>function(h,f){const g=v=>{switch(v){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return _()}};return g(h)-g(f)}(u.type,l.type)||this.Lu(u.doc,l.doc)),this.ju(s);const o=n?this.Wu():[],a=this.Bu.size===0&&this.current?1:0,c=a!==this.$u;return this.$u=a,i.length!==0||c?{snapshot:new wt(this.query,e.Uu,r,i,e.mutatedKeys,a===0,c,!1),zu:o}:{zu:o}}Eu(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Uu:this.Uu,Gu:new Oo,mutatedKeys:this.mutatedKeys,Oi:!1},!1)):{zu:[]}}Hu(e){return!this.Fu.has(e)&&!!this.Uu.has(e)&&!this.Uu.get(e).hasLocalMutations}ju(e){e&&(e.addedDocuments.forEach(n=>this.Fu=this.Fu.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.Fu=this.Fu.delete(n)),this.current=e.current)}Wu(){if(!this.current)return[];const e=this.Bu;this.Bu=C(),this.Uu.forEach(s=>{this.Hu(s.key)&&(this.Bu=this.Bu.add(s.key))});const n=[];return e.forEach(s=>{this.Bu.has(s)||n.push(new nu(s))}),this.Bu.forEach(s=>{e.has(s)||n.push(new tu(s))}),n}Ju(e){this.Fu=e.ji,this.Bu=C();const n=this.Ku(e.documents);return this.applyChanges(n,!0)}Yu(){return wt.fromInitialDocuments(this.query,this.Uu,this.mutatedKeys,this.$u===0)}}class eg{constructor(e,n,s){this.query=e,this.targetId=n,this.view=s}}class tg{constructor(e){this.key=e,this.Xu=!1}}class ng{constructor(e,n,s,r,i,o){this.localStore=e,this.remoteStore=n,this.eventManager=s,this.sharedClientState=r,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Zu={},this.tc=new At(a=>Ic(a),Ss),this.ec=new Map,this.nc=new Set,this.sc=new B(w.comparator),this.ic=new Map,this.rc=new di,this.oc={},this.uc=new Map,this.cc=vt.Rn(),this.onlineState="Unknown",this.ac=void 0}get isPrimaryClient(){return this.ac===!0}}async function sg(t,e){const n=fg(t);let s,r;const i=n.tc.get(e);if(i)s=i.targetId,n.sharedClientState.addLocalQueryTarget(s),r=i.view.Yu();else{const o=await Sp(n.localStore,Ye(e));n.isPrimaryClient&&Wc(n.remoteStore,o);const a=n.sharedClientState.addLocalQueryTarget(o.targetId);s=o.targetId,r=await rg(n,e,s,a==="current")}return r}async function rg(t,e,n,s){t.hc=(l,h,f)=>async function(g,v,k,D){let $=v.view.Ku(k);$.Oi&&($=await ko(g.localStore,v.query,!1).then(({documents:Se})=>v.view.Ku(Se,$)));const Y=D&&D.targetChanges.get(v.targetId),ge=v.view.applyChanges($,g.isPrimaryClient,Y);return Po(g,v.targetId,ge.zu),ge.snapshot}(t,l,h,f);const r=await ko(t.localStore,e,!0),i=new Zp(e,r.ji),o=i.Ku(r.documents),a=En.createSynthesizedTargetChangeForCurrentChange(n,s&&t.onlineState!=="Offline"),c=i.applyChanges(o,t.isPrimaryClient,a);Po(t,n,c.zu);const u=new eg(e,n,i);return t.tc.set(e,u),t.ec.has(n)?t.ec.get(n).push(e):t.ec.set(n,[e]),c.snapshot}async function ig(t,e){const n=S(t),s=n.tc.get(e),r=n.ec.get(s.targetId);if(r.length>1)return n.ec.set(s.targetId,r.filter(i=>!Ss(i,e))),void n.tc.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(s.targetId),n.sharedClientState.isActiveQueryTarget(s.targetId)||await br(n.localStore,s.targetId,!1).then(()=>{n.sharedClientState.clearQueryState(s.targetId),Qc(n.remoteStore,s.targetId),Cr(n,s.targetId)}).catch(yn)):(Cr(n,s.targetId),await br(n.localStore,s.targetId,!0))}async function og(t,e,n){const s=pg(t);try{const r=await function(i,o){const a=S(i),c=F.now(),u=o.reduce((f,g)=>f.add(g.key),C());let l,h;return a.persistence.runTransaction("Locally write mutations","readwrite",f=>{let g=Te(),v=C();return a.Ui.getEntries(f,u).next(k=>{g=k,g.forEach((D,$)=>{$.isValidDocument()||(v=v.add(D))})}).next(()=>a.localDocuments.getOverlayedDocuments(f,g)).next(k=>{l=k;const D=[];for(const $ of o){const Y=kf($,l.get($.key).overlayedDocument);Y!=null&&D.push(new tt($.key,Y,wc(Y.value.mapValue),le.exists(!0)))}return a.mutationQueue.addMutationBatch(f,c,D,o)}).next(k=>{h=k;const D=k.applyToLocalDocumentSet(l,v);return a.documentOverlayCache.saveOverlays(f,k.batchId,D)})}).then(()=>({batchId:h.batchId,changes:Pc(l)}))}(s.localStore,e);s.sharedClientState.addPendingMutation(r.batchId),function(i,o,a){let c=i.oc[i.currentUser.toKey()];c||(c=new B(N)),c=c.insert(o,a),i.oc[i.currentUser.toKey()]=c}(s,r.batchId,n),await Tn(s,r.changes),await Rs(s.remoteStore)}catch(r){const i=wi(r,"Failed to persist write");n.reject(i)}}async function su(t,e){const n=S(t);try{const s=await Ip(n.localStore,e);e.targetChanges.forEach((r,i)=>{const o=n.ic.get(i);o&&(O(r.addedDocuments.size+r.modifiedDocuments.size+r.removedDocuments.size<=1),r.addedDocuments.size>0?o.Xu=!0:r.modifiedDocuments.size>0?O(o.Xu):r.removedDocuments.size>0&&(O(o.Xu),o.Xu=!1))}),await Tn(n,s,e)}catch(s){await yn(s)}}function Mo(t,e,n){const s=S(t);if(s.isPrimaryClient&&n===0||!s.isPrimaryClient&&n===1){const r=[];s.tc.forEach((i,o)=>{const a=o.view.Eu(e);a.snapshot&&r.push(a.snapshot)}),function(i,o){const a=S(i);a.onlineState=o;let c=!1;a.queries.forEach((u,l)=>{for(const h of l.listeners)h.Eu(o)&&(c=!0)}),c&&Ei(a)}(s.eventManager,e),r.length&&s.Zu.Go(r),s.onlineState=e,s.isPrimaryClient&&s.sharedClientState.setOnlineState(e)}}async function ag(t,e,n){const s=S(t);s.sharedClientState.updateQueryState(e,"rejected",n);const r=s.ic.get(e),i=r&&r.key;if(i){let o=new B(w.comparator);o=o.insert(i,z.newNoDocument(i,b.min()));const a=C().add(i),c=new As(b.min(),new Map,new V(N),o,a);await su(s,c),s.sc=s.sc.remove(i),s.ic.delete(e),Ii(s)}else await br(s.localStore,e,!1).then(()=>Cr(s,e,n)).catch(yn)}async function cg(t,e){const n=S(t),s=e.batch.batchId;try{const r=await Ep(n.localStore,e);iu(n,s,null),ru(n,s),n.sharedClientState.updateMutationState(s,"acknowledged"),await Tn(n,r)}catch(r){await yn(r)}}async function ug(t,e,n){const s=S(t);try{const r=await function(i,o){const a=S(i);return a.persistence.runTransaction("Reject batch","readwrite-primary",c=>{let u;return a.mutationQueue.lookupMutationBatch(c,o).next(l=>(O(l!==null),u=l.keys(),a.mutationQueue.removeMutationBatch(c,l))).next(()=>a.mutationQueue.performConsistencyCheck(c)).next(()=>a.documentOverlayCache.removeOverlaysForBatchId(c,u,o)).next(()=>a.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(c,u)).next(()=>a.localDocuments.getDocuments(c,u))})}(s.localStore,e);iu(s,e,n),ru(s,e),s.sharedClientState.updateMutationState(e,"rejected",n),await Tn(s,r)}catch(r){await yn(r)}}function ru(t,e){(t.uc.get(e)||[]).forEach(n=>{n.resolve()}),t.uc.delete(e)}function iu(t,e,n){const s=S(t);let r=s.oc[s.currentUser.toKey()];if(r){const i=r.get(e);i&&(n?i.reject(n):i.resolve(),r=r.remove(e)),s.oc[s.currentUser.toKey()]=r}}function Cr(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const s of t.ec.get(e))t.tc.delete(s),n&&t.Zu.lc(s,n);t.ec.delete(e),t.isPrimaryClient&&t.rc.us(e).forEach(s=>{t.rc.containsKey(s)||ou(t,s)})}function ou(t,e){t.nc.delete(e.path.canonicalString());const n=t.sc.get(e);n!==null&&(Qc(t.remoteStore,n),t.sc=t.sc.remove(e),t.ic.delete(n),Ii(t))}function Po(t,e,n){for(const s of n)s instanceof tu?(t.rc.addReference(s.key,e),lg(t,s)):s instanceof nu?(y("SyncEngine","Document no longer in limbo: "+s.key),t.rc.removeReference(s.key,e),t.rc.containsKey(s.key)||ou(t,s.key)):_()}function lg(t,e){const n=e.key,s=n.path.canonicalString();t.sc.get(n)||t.nc.has(s)||(y("SyncEngine","New document in limbo: "+n),t.nc.add(s),Ii(t))}function Ii(t){for(;t.nc.size>0&&t.sc.size<t.maxConcurrentLimboResolutions;){const e=t.nc.values().next().value;t.nc.delete(e);const n=new w(P.fromString(e)),s=t.cc.next();t.ic.set(s,new tg(n)),t.sc=t.sc.insert(n,s),Wc(t.remoteStore,new qe(Ye(ci(n.path)),s,2,ri.ot))}}async function Tn(t,e,n){const s=S(t),r=[],i=[],o=[];s.tc.isEmpty()||(s.tc.forEach((a,c)=>{o.push(s.hc(c,e,n).then(u=>{if(u){s.isPrimaryClient&&s.sharedClientState.updateQueryState(c.targetId,u.fromCache?"not-current":"current"),r.push(u);const l=pi.Vi(c.targetId,u);i.push(l)}}))}),await Promise.all(o),s.Zu.Go(r),await async function(a,c){const u=S(a);try{await u.persistence.runTransaction("notifyLocalViewChanges","readwrite",l=>d.forEach(c,h=>d.forEach(h.Pi,f=>u.persistence.referenceDelegate.addReference(l,h.targetId,f)).next(()=>d.forEach(h.vi,f=>u.persistence.referenceDelegate.removeReference(l,h.targetId,f)))))}catch(l){if(!vn(l))throw l;y("LocalStore","Failed to update sequence numbers: "+l)}for(const l of c){const h=l.targetId;if(!l.fromCache){const f=u.$i.get(h),g=f.snapshotVersion,v=f.withLastLimboFreeSnapshotVersion(g);u.$i=u.$i.insert(h,v)}}}(s.localStore,i))}async function hg(t,e){const n=S(t);if(!n.currentUser.isEqual(e)){y("SyncEngine","User change. New user:",e.toKey());const s=await Hc(n.localStore,e);n.currentUser=e,function(r,i){r.uc.forEach(o=>{o.forEach(a=>{a.reject(new E(p.CANCELLED,i))})}),r.uc.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,s.removedBatchIds,s.addedBatchIds),await Tn(n,s.Ki)}}function dg(t,e){const n=S(t),s=n.ic.get(e);if(s&&s.Xu)return C().add(s.key);{let r=C();const i=n.ec.get(e);if(!i)return r;for(const o of i){const a=n.tc.get(o);r=r.unionWith(a.view.qu)}return r}}function fg(t){const e=S(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=su.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=dg.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=ag.bind(null,e),e.Zu.Go=Xp.bind(null,e.eventManager),e.Zu.lc=Yp.bind(null,e.eventManager),e}function pg(t){const e=S(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=cg.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=ug.bind(null,e),e}class gg{constructor(){this.synchronizeTabs=!1}async initialize(e){this.wt=ks(e.databaseInfo.databaseId),this.sharedClientState=this.dc(e),this.persistence=this._c(e),await this.persistence.start(),this.localStore=this.wc(e),this.gcScheduler=this.mc(e,this.localStore),this.indexBackfillerScheduler=this.gc(e,this.localStore)}mc(e,n){return null}gc(e,n){return null}wc(e){return wp(this.persistence,new yp,e.initialUser,this.wt)}_c(e){return new gp(fi.Ms,this.wt)}dc(e){return new Cp}async terminate(){this.gcScheduler&&this.gcScheduler.stop(),await this.sharedClientState.shutdown(),await this.persistence.shutdown()}}class mg{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=s=>Mo(this.syncEngine,s,1),this.remoteStore.remoteSyncer.handleCredentialChange=hg.bind(null,this.syncEngine),await Kp(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new Gp}createDatastore(e){const n=ks(e.databaseInfo.databaseId),s=(r=e.databaseInfo,new Rp(r));var r;return function(i,o,a,c){return new Mp(i,o,a,c)}(e.authCredentials,e.appCheckCredentials,s,n)}createRemoteStore(e){return n=this.localStore,s=this.datastore,r=e.asyncQueue,i=a=>Mo(this.syncEngine,a,0),o=Ro.V()?new Ro:new Ap,new Lp(n,s,r,i,o);var n,s,r,i,o}createSyncEngine(e,n){return function(s,r,i,o,a,c,u){const l=new ng(s,r,i,o,a,c);return u&&(l.ac=!0),l}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}terminate(){return async function(e){const n=S(e);y("RemoteStore","RemoteStore shutting down."),n.lu.add(5),await In(n),n.du.shutdown(),n._u.set("Unknown")}(this.remoteStore)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yg{constructor(e){this.observer=e,this.muted=!1}next(e){this.observer.next&&this.Ic(this.observer.next,e)}error(e){this.observer.error?this.Ic(this.observer.error,e):console.error("Uncaught Error in snapshot listener:",e)}Tc(){this.muted=!0}Ic(e,n){this.muted||setTimeout(()=>{this.muted||e(n)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vg{constructor(e,n,s,r){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=s,this.databaseInfo=r,this.user=se.UNAUTHENTICATED,this.clientId=gc.I(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this.authCredentials.start(s,async i=>{y("FirestoreClient","Received user=",i.uid),await this.authCredentialListener(i),this.user=i}),this.appCheckCredentials.start(s,i=>(y("FirestoreClient","Received new app check token=",i),this.appCheckCredentialListener(i,this.user)))}async getConfiguration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new E(p.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();const e=new je;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this.onlineComponents&&await this.onlineComponents.terminate(),this.offlineComponents&&await this.offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const s=wi(n,"Failed to shutdown persistence");e.reject(s)}}),e.promise}}async function wg(t,e){t.asyncQueue.verifyOperationInProgress(),y("FirestoreClient","Initializing OfflineComponentProvider");const n=await t.getConfiguration();await e.initialize(n);let s=n.initialUser;t.setCredentialChangeListener(async r=>{s.isEqual(r)||(await Hc(e.localStore,r),s=r)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t.offlineComponents=e}async function Eg(t,e){t.asyncQueue.verifyOperationInProgress();const n=await Ig(t);y("FirestoreClient","Initializing OnlineComponentProvider");const s=await t.getConfiguration();await e.initialize(n,s),t.setCredentialChangeListener(r=>No(e.remoteStore,r)),t.setAppCheckTokenChangeListener((r,i)=>No(e.remoteStore,i)),t.onlineComponents=e}async function Ig(t){return t.offlineComponents||(y("FirestoreClient","Using default OfflineComponentProvider"),await wg(t,new gg)),t.offlineComponents}async function au(t){return t.onlineComponents||(y("FirestoreClient","Using default OnlineComponentProvider"),await Eg(t,new mg)),t.onlineComponents}function Tg(t){return au(t).then(e=>e.syncEngine)}async function Lo(t){const e=await au(t),n=e.eventManager;return n.onListen=sg.bind(null,e.syncEngine),n.onUnlisten=ig.bind(null,e.syncEngine),n}const xo=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cu(t,e,n){if(!n)throw new E(p.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function _g(t,e,n,s){if(e===!0&&s===!0)throw new E(p.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function Uo(t){if(!w.isDocumentKey(t))throw new E(p.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function Fo(t){if(w.isDocumentKey(t))throw new E(p.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function Ti(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(n){return n.constructor?n.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":_()}function ut(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new E(p.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Ti(t);throw new E(p.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vo{constructor(e){var n;if(e.host===void 0){if(e.ssl!==void 0)throw new E(p.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(n=e.ssl)===null||n===void 0||n;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new E(p.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.useFetchStreams=!!e.useFetchStreams,_g("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling)}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _i{constructor(e,n,s){this._authCredentials=n,this._appCheckCredentials=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Vo({}),this._settingsFrozen=!1,e instanceof mt?this._databaseId=e:(this._app=e,this._databaseId=function(r){if(!Object.prototype.hasOwnProperty.apply(r.options,["projectId"]))throw new E(p.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new mt(r.options.projectId)}(e))}get app(){if(!this._app)throw new E(p.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!==void 0}_setSettings(e){if(this._settingsFrozen)throw new E(p.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Vo(e),e.credentials!==void 0&&(this._authCredentials=function(n){if(!n)return new Bd;switch(n.type){case"gapi":const s=n.client;return O(!(typeof s!="object"||s===null||!s.auth||!s.auth.getAuthHeaderValueForFirstParty)),new qd(s,n.sessionIndex||"0",n.iamToken||null);case"provider":return n.client;default:throw new E(p.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const n=xo.get(e);n&&(y("ComponentProvider","Removing Datastore"),xo.delete(e),n.terminate())}(this),Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ie{constructor(e,n,s){this.converter=n,this._key=s,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Ne(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new ie(this.firestore,e,this._key)}}class Ns{constructor(e,n,s){this.converter=n,this._query=s,this.type="query",this.firestore=e}withConverter(e){return new Ns(this.firestore,e,this._query)}}class Ne extends Ns{constructor(e,n,s){super(e,n,ci(s)),this._path=s,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new ie(this.firestore,null,new w(e))}withConverter(e){return new Ne(this.firestore,e,this._path)}}function Ry(t,e,...n){if(t=ce(t),cu("collection","path",e),t instanceof _i){const s=P.fromString(e,...n);return Fo(s),new Ne(t,null,s)}{if(!(t instanceof ie||t instanceof Ne))throw new E(p.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=t._path.child(P.fromString(e,...n));return Fo(s),new Ne(t.firestore,null,s)}}function Sg(t,e,...n){if(t=ce(t),arguments.length===1&&(e=gc.I()),cu("doc","path",e),t instanceof _i){const s=P.fromString(e,...n);return Uo(s),new ie(t,null,new w(s))}{if(!(t instanceof ie||t instanceof Ne))throw new E(p.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=t._path.child(P.fromString(e,...n));return Uo(s),new ie(t.firestore,t instanceof Ne?t.converter:null,new w(s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bg{constructor(){this.Oc=Promise.resolve(),this.Mc=[],this.Fc=!1,this.$c=[],this.Bc=null,this.Lc=!1,this.Uc=!1,this.qc=[],this.So=new zc(this,"async_queue_retry"),this.Kc=()=>{const n=Zs();n&&y("AsyncQueue","Visibility state changed to "+n.visibilityState),this.So.Eo()};const e=Zs();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.Kc)}get isShuttingDown(){return this.Fc}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Gc(),this.Qc(e)}enterRestrictedMode(e){if(!this.Fc){this.Fc=!0,this.Uc=e||!1;const n=Zs();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.Kc)}}enqueue(e){if(this.Gc(),this.Fc)return new Promise(()=>{});const n=new je;return this.Qc(()=>this.Fc&&this.Uc?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Mc.push(e),this.jc()))}async jc(){if(this.Mc.length!==0){try{await this.Mc[0](),this.Mc.shift(),this.So.reset()}catch(e){if(!vn(e))throw e;y("AsyncQueue","Operation failed with retryable error: "+e)}this.Mc.length>0&&this.So.Io(()=>this.jc())}}Qc(e){const n=this.Oc.then(()=>(this.Lc=!0,e().catch(s=>{this.Bc=s,this.Lc=!1;const r=function(i){let o=i.message||"";return i.stack&&(o=i.stack.includes(i.message)?i.stack:i.message+`
`+i.stack),o}(s);throw Oe("INTERNAL UNHANDLED ERROR: ",r),s}).then(s=>(this.Lc=!1,s))));return this.Oc=n,n}enqueueAfterDelay(e,n,s){this.Gc(),this.qc.indexOf(e)>-1&&(n=0);const r=vi.createAndSchedule(this,e,n,s,i=>this.Wc(i));return this.$c.push(r),r}Gc(){this.Bc&&_()}verifyOperationInProgress(){}async zc(){let e;do e=this.Oc,await e;while(e!==this.Oc)}Hc(e){for(const n of this.$c)if(n.timerId===e)return!0;return!1}Jc(e){return this.zc().then(()=>{this.$c.sort((n,s)=>n.targetTimeMs-s.targetTimeMs);for(const n of this.$c)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.zc()})}Yc(e){this.qc.push(e)}Wc(e){const n=this.$c.indexOf(e);this.$c.splice(n,1)}}function Bo(t){return function(e,n){if(typeof e!="object"||e===null)return!1;const s=e;for(const r of n)if(r in s&&typeof s[r]=="function")return!0;return!1}(t,["next","error","complete"])}class tn extends _i{constructor(e,n,s){super(e,n,s),this.type="firestore",this._queue=new bg,this._persistenceKey="name"in e?e.name:"[DEFAULT]"}_terminate(){return this._firestoreClient||lu(this),this._firestoreClient.terminate()}}function Cg(t=da()){return Or(t,"firestore").getImmediate()}function uu(t){return t._firestoreClient||lu(t),t._firestoreClient.verifyNotTerminated(),t._firestoreClient}function lu(t){var e;const n=t._freezeSettings(),s=function(r,i,o,a){return new ef(r,i,o,a.host,a.ssl,a.experimentalForceLongPolling,a.experimentalAutoDetectLongPolling,a.useFetchStreams)}(t._databaseId,((e=t._app)===null||e===void 0?void 0:e.options.appId)||"",t._persistenceKey,n);t._firestoreClient=new vg(t._authCredentials,t._appCheckCredentials,t._queue,s)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Si{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new E(p.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new J(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Et{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Et(Q.fromBase64String(e))}catch(n){throw new E(p.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new Et(Q.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hu{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bi{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new E(p.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new E(p.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return N(this._lat,e._lat)||N(this._long,e._long)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ag=/^__.*__$/;class kg{constructor(e,n,s){this.data=e,this.fieldMask=n,this.fieldTransforms=s}toMutation(e,n){return this.fieldMask!==null?new tt(e,this.data,this.fieldMask,n,this.fieldTransforms):new wn(e,this.data,n,this.fieldTransforms)}}function du(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw _()}}class Ci{constructor(e,n,s,r,i,o){this.settings=e,this.databaseId=n,this.wt=s,this.ignoreUndefinedProperties=r,i===void 0&&this.Xc(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Zc(){return this.settings.Zc}ta(e){return new Ci(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.wt,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}ea(e){var n;const s=(n=this.path)===null||n===void 0?void 0:n.child(e),r=this.ta({path:s,na:!1});return r.sa(e),r}ia(e){var n;const s=(n=this.path)===null||n===void 0?void 0:n.child(e),r=this.ta({path:s,na:!1});return r.Xc(),r}ra(e){return this.ta({path:void 0,na:!0})}oa(e){return rs(e,this.settings.methodName,this.settings.ua||!1,this.path,this.settings.ca)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}Xc(){if(this.path)for(let e=0;e<this.path.length;e++)this.sa(this.path.get(e))}sa(e){if(e.length===0)throw this.oa("Document fields must not be empty");if(du(this.Zc)&&Ag.test(e))throw this.oa('Document fields cannot begin and end with "__"')}}class Dg{constructor(e,n,s){this.databaseId=e,this.ignoreUndefinedProperties=n,this.wt=s||ks(e)}aa(e,n,s,r=!1){return new Ci({Zc:e,methodName:n,ca:s,path:J.emptyPath(),na:!1,ua:r},this.databaseId,this.wt,this.ignoreUndefinedProperties)}}function fu(t){const e=t._freezeSettings(),n=ks(t._databaseId);return new Dg(t._databaseId,!!e.ignoreUndefinedProperties,n)}function pu(t,e,n,s,r,i={}){const o=t.aa(i.merge||i.mergeFields?2:0,e,n,r);vu("Data must be an object, but it was:",o,s);const a=mu(s,o);let c,u;if(i.merge)c=new ue(o.fieldMask),u=o.fieldTransforms;else if(i.mergeFields){const l=[];for(const h of i.mergeFields){const f=Rg(e,h,n);if(!o.contains(f))throw new E(p.INVALID_ARGUMENT,`Field '${f}' is specified in your field mask but missing from your input data.`);Og(l,f)||l.push(f)}c=new ue(l),u=o.fieldTransforms.filter(h=>c.covers(h.field))}else c=null,u=o.fieldTransforms;return new kg(new ae(a),c,u)}function gu(t,e){if(yu(t=ce(t)))return vu("Unsupported field value:",e,t),mu(t,e);if(t instanceof hu)return function(n,s){if(!du(s.Zc))throw s.oa(`${n._methodName}() can only be used with update() and set()`);if(!s.path)throw s.oa(`${n._methodName}() is not currently supported inside arrays`);const r=n._toFieldTransform(s);r&&s.fieldTransforms.push(r)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.na&&e.Zc!==4)throw e.oa("Nested arrays are not supported");return function(n,s){const r=[];let i=0;for(const o of n){let a=gu(o,s.ra(i));a==null&&(a={nullValue:"NULL_VALUE"}),r.push(a),i++}return{arrayValue:{values:r}}}(t,e)}return function(n,s){if((n=ce(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return Tf(s.wt,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const r=F.fromDate(n);return{timestampValue:ns(s.wt,r)}}if(n instanceof F){const r=new F(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:ns(s.wt,r)}}if(n instanceof bi)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof Et)return{bytesValue:Vc(s.wt,n._byteString)};if(n instanceof ie){const r=s.databaseId,i=n.firestore._databaseId;if(!i.isEqual(r))throw s.oa(`Document reference is for database ${i.projectId}/${i.database} but should be for database ${r.projectId}/${r.database}`);return{referenceValue:li(n.firestore._databaseId||s.databaseId,n._key.path)}}throw s.oa(`Unsupported field value: ${Ti(n)}`)}(t,e)}function mu(t,e){const n={};return mc(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Ct(t,(s,r)=>{const i=gu(r,e.ea(s));i!=null&&(n[s]=i)}),{mapValue:{fields:n}}}function yu(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof F||t instanceof bi||t instanceof Et||t instanceof ie||t instanceof hu)}function vu(t,e,n){if(!yu(n)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(n)){const s=Ti(n);throw s==="an object"?e.oa(t+" a custom object"):e.oa(t+" "+s)}}function Rg(t,e,n){if((e=ce(e))instanceof Si)return e._internalPath;if(typeof e=="string")return wu(t,e);throw rs("Field path arguments must be of type string or ",t,!1,void 0,n)}const Ng=new RegExp("[~\\*/\\[\\]]");function wu(t,e,n){if(e.search(Ng)>=0)throw rs(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new Si(...e.split("."))._internalPath}catch{throw rs(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function rs(t,e,n,s,r){const i=s&&!s.isEmpty(),o=r!==void 0;let a=`Function ${e}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(i||o)&&(c+=" (found",i&&(c+=` in field ${s}`),o&&(c+=` in document ${r}`),c+=")"),new E(p.INVALID_ARGUMENT,a+t+c)}function Og(t,e){return t.some(n=>n.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eu{constructor(e,n,s,r,i){this._firestore=e,this._userDataWriter=n,this._key=s,this._document=r,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new ie(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new Mg(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(Iu("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class Mg extends Eu{data(){return super.data()}}function Iu(t,e){return typeof e=="string"?wu(t,e):e instanceof Si?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Tu extends Eu{constructor(e,n,s,r,i,o){super(e,n,s,r,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new xn(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const s=this._document.data.field(Iu("DocumentSnapshot.get",e));if(s!==null)return this._userDataWriter.convertValue(s,n.serverTimestamps)}}}class xn extends Tu{data(e={}){return super.data(e)}}class Pg{constructor(e,n,s,r){this._firestore=e,this._userDataWriter=n,this._snapshot=r,this.metadata=new Lt(r.hasPendingWrites,r.fromCache),this.query=s}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(s=>{e.call(n,new xn(this._firestore,this._userDataWriter,s.key,s,new Lt(this._snapshot.mutatedKeys.has(s.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new E(p.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(s,r){if(s._snapshot.oldDocs.isEmpty()){let i=0;return s._snapshot.docChanges.map(o=>({type:"added",doc:new xn(s._firestore,s._userDataWriter,o.doc.key,o.doc,new Lt(s._snapshot.mutatedKeys.has(o.doc.key),s._snapshot.fromCache),s.query.converter),oldIndex:-1,newIndex:i++}))}{let i=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(o=>r||o.type!==3).map(o=>{const a=new xn(s._firestore,s._userDataWriter,o.doc.key,o.doc,new Lt(s._snapshot.mutatedKeys.has(o.doc.key),s._snapshot.fromCache),s.query.converter);let c=-1,u=-1;return o.type!==0&&(c=i.indexOf(o.doc.key),i=i.delete(o.doc.key)),o.type!==1&&(i=i.add(o.doc),u=i.indexOf(o.doc.key)),{type:Lg(o.type),doc:a,oldIndex:c,newIndex:u}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}}function Lg(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return _()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xg(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new E(p.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ug{convertValue(e,n="none"){switch(Xe(e)){case 0:return null;case 1:return e.booleanValue;case 2:return x(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(gt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 10:return this.convertObject(e.mapValue,n);default:throw _()}}convertObject(e,n){const s={};return Ct(e.fields,(r,i)=>{s[r]=this.convertValue(i,n)}),s}convertGeoPoint(e){return new bi(x(e.latitude),x(e.longitude))}convertArray(e,n){return(e.values||[]).map(s=>this.convertValue(s,n))}convertServerTimestamp(e,n){switch(n){case"previous":const s=vc(e);return s==null?null:this.convertValue(s,n);case"estimate":return this.convertTimestamp(Xt(e));default:return null}}convertTimestamp(e){const n=Pe(e);return new F(n.seconds,n.nanos)}convertDocumentKey(e,n){const s=P.fromString(e);O(qc(s));const r=new mt(s.get(1),s.get(3)),i=new w(s.popFirst(5));return r.isEqual(n)||Oe(`Document ${i} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _u(t,e,n){let s;return s=t?n&&(n.merge||n.mergeFields)?t.toFirestore(e,n):t.toFirestore(e):e,s}class Su extends Ug{constructor(e){super(),this.firestore=e}convertBytes(e){return new Et(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new ie(this.firestore,null,n)}}function Ny(t,e,n){t=ut(t,ie);const s=ut(t.firestore,tn),r=_u(t.converter,e,n);return bu(s,[pu(fu(s),"setDoc",t._key,r,t.converter!==null,n).toMutation(t._key,le.none())])}function Oy(t,e){const n=ut(t.firestore,tn),s=Sg(t),r=_u(t.converter,e);return bu(n,[pu(fu(t.firestore),"addDoc",s._key,r,t.converter!==null,{}).toMutation(s._key,le.exists(!1))]).then(()=>s)}function My(t,...e){var n,s,r;t=ce(t);let i={includeMetadataChanges:!1},o=0;typeof e[o]!="object"||Bo(e[o])||(i=e[o],o++);const a={includeMetadataChanges:i.includeMetadataChanges};if(Bo(e[o])){const h=e[o];e[o]=(n=h.next)===null||n===void 0?void 0:n.bind(h),e[o+1]=(s=h.error)===null||s===void 0?void 0:s.bind(h),e[o+2]=(r=h.complete)===null||r===void 0?void 0:r.bind(h)}let c,u,l;if(t instanceof ie)u=ut(t.firestore,tn),l=ci(t._key.path),c={next:h=>{e[o]&&e[o](Fg(u,t,h))},error:e[o+1],complete:e[o+2]};else{const h=ut(t,Ns);u=ut(h.firestore,tn),l=h._query;const f=new Su(u);c={next:g=>{e[o]&&e[o](new Pg(u,f,h,g))},error:e[o+1],complete:e[o+2]},xg(t._query)}return function(h,f,g,v){const k=new yg(v),D=new Jp(f,k,g);return h.asyncQueue.enqueueAndForget(async()=>Wp(await Lo(h),D)),()=>{k.Tc(),h.asyncQueue.enqueueAndForget(async()=>Qp(await Lo(h),D))}}(uu(u),l,a,c)}function bu(t,e){return function(n,s){const r=new je;return n.asyncQueue.enqueueAndForget(async()=>og(await Tg(n),s,r)),r.promise}(uu(t),e)}function Fg(t,e,n){const s=n.docs.get(e._key),r=new Su(t);return new Tu(t,r,e._key,s,new Lt(n.hasPendingWrites,n.fromCache),e.converter)}(function(t,e=!0){(function(n){bt=n})(an),dt(new Ke("firestore",(n,{options:s})=>{const r=n.getProvider("app").getImmediate(),i=new tn(r,new $d(n.getProvider("auth-internal")),new Kd(n.getProvider("app-check-internal")));return s=Object.assign({useFetchStreams:e},s),i._setSettings(s),i},"PUBLIC")),Re(co,"3.4.11",t),Re(co,"3.4.11","esm2017")})();var Vg="firebase",Bg="9.8.4";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Re(Vg,Bg,"app");/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function Ai(t,e){var n={};for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&e.indexOf(s)<0&&(n[s]=t[s]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,s=Object.getOwnPropertySymbols(t);r<s.length;r++)e.indexOf(s[r])<0&&Object.prototype.propertyIsEnumerable.call(t,s[r])&&(n[s[r]]=t[s[r]]);return n}function Cu(){return{["dependent-sdk-initialized-before-auth"]:"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const $g=Cu,Au=new rn("auth","Firebase",Cu());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $o=new Dr("@firebase/auth");function Un(t,...e){$o.logLevel<=R.ERROR&&$o.error(`Auth (${an}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pe(t,...e){throw ki(t,...e)}function he(t,...e){return ki(t,...e)}function ku(t,e,n){const s=Object.assign(Object.assign({},$g()),{[e]:n});return new rn("auth","Firebase",s).create(e,{appName:t.name})}function jg(t,e,n){const s=n;if(!(e instanceof s))throw s.name!==e.constructor.name&&pe(t,"argument-error"),ku(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function ki(t,...e){if(typeof t!="string"){const n=e[0],s=[...e.slice(1)];return s[0]&&(s[0].appName=t.name),t._errorFactory.create(n,...s)}return Au.create(t,...e)}function T(t,e,...n){if(!t)throw ki(e,...n)}function ve(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Un(e),new Error(e)}function _e(t,e){t||ve(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jo=new Map;function we(t){_e(t instanceof Function,"Expected a class definition");let e=jo.get(t);return e?(_e(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,jo.set(t,e),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qg(t,e){const n=Or(t,"auth");if(n.isInitialized()){const r=n.getImmediate(),i=n.getOptions();if($n(i,e!=null?e:{}))return r;pe(r,"already-initialized")}return n.initialize({options:e})}function Hg(t,e){const n=(e==null?void 0:e.persistence)||[],s=(Array.isArray(n)?n:[n]).map(we);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(s,e==null?void 0:e.popupRedirectResolver)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ar(){var t;return typeof self!="undefined"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function Kg(){return qo()==="http:"||qo()==="https:"}function qo(){var t;return typeof self!="undefined"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zg(){return typeof navigator!="undefined"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Kg()||oa()||"connection"in navigator)?navigator.onLine:!0}function Gg(){if(typeof navigator=="undefined")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _n{constructor(e,n){this.shortDelay=e,this.longDelay=n,_e(n>e,"Short delay should be less than long delay!"),this.isMobile=ia()||aa()}get(){return zg()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Di(t,e){_e(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Du{static initialize(e,n,s){this.fetchImpl=e,n&&(this.headersImpl=n),s&&(this.responseImpl=s)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self!="undefined"&&"fetch"in self)return self.fetch;ve("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self!="undefined"&&"Headers"in self)return self.Headers;ve("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self!="undefined"&&"Response"in self)return self.Response;ve("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wg={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"internal-error",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qg=new _n(3e4,6e4);function Xg(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function Os(t,e,n,s,r={}){return Ru(t,r,async()=>{let i={},o={};s&&(e==="GET"?o=s:i={body:JSON.stringify(s)});const a=on(Object.assign({key:t.config.apiKey},o)).slice(1),c=await t._getAdditionalHeaders();return c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode),Du.fetch()(Nu(t,t.config.apiHost,n,a),Object.assign({method:e,headers:c,referrerPolicy:"no-referrer"},i))})}async function Ru(t,e,n){t._canInitEmulator=!1;const s=Object.assign(Object.assign({},Wg),e);try{const r=new Jg(t),i=await Promise.race([n(),r.promise]);r.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw On(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const a=i.ok?o.errorMessage:o.error.message,[c,u]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw On(t,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw On(t,"email-already-in-use",o);if(c==="USER_DISABLED")throw On(t,"user-disabled",o);const l=s[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(u)throw ku(t,l,u);pe(t,l)}}catch(r){if(r instanceof Ze)throw r;pe(t,"network-request-failed")}}async function Yg(t,e,n,s,r={}){const i=await Os(t,e,n,s,r);return"mfaPendingCredential"in i&&pe(t,"multi-factor-auth-required",{_serverResponse:i}),i}function Nu(t,e,n,s){const r=`${e}${n}?${s}`;return t.config.emulator?Di(t.config,r):`${t.config.apiScheme}://${r}`}class Jg{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,s)=>{this.timer=setTimeout(()=>s(he(this.auth,"network-request-failed")),Qg.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function On(t,e,n){const s={appName:t.name};n.email&&(s.email=n.email),n.phoneNumber&&(s.phoneNumber=n.phoneNumber);const r=he(t,e,s);return r.customData._tokenResponse=n,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Zg(t,e){return Os(t,"POST","/v1/accounts:delete",e)}async function em(t,e){return Os(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jt(t){if(!!t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function tm(t,e=!1){const n=ce(t),s=await n.getIdToken(e),r=Ri(s);T(r&&r.exp&&r.auth_time&&r.iat,n.auth,"internal-error");const i=typeof r.firebase=="object"?r.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:r,token:s,authTime:jt(er(r.auth_time)),issuedAtTime:jt(er(r.iat)),expirationTime:jt(er(r.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function er(t){return Number(t)*1e3}function Ri(t){var e;const[n,s,r]=t.split(".");if(n===void 0||s===void 0||r===void 0)return Un("JWT malformed, contained fewer than 3 sections"),null;try{const i=pl(s);return i?JSON.parse(i):(Un("Failed to decode base64 JWT payload"),null)}catch(i){return Un("Caught error parsing JWT payload as JSON",(e=i)===null||e===void 0?void 0:e.toString()),null}}function nm(t){const e=Ri(t);return T(e,"internal-error"),T(typeof e.exp!="undefined","internal-error"),T(typeof e.iat!="undefined","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function nn(t,e,n=!1){if(n)return e;try{return await e}catch(s){throw s instanceof Ze&&sm(s)&&t.auth.currentUser===t&&await t.auth.signOut(),s}}function sm({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rm{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){!this.isRunning||(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const s=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),s}else{this.errorBackoff=3e4;const r=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){var e;try{await this.user.getIdToken(!0)}catch(n){((e=n)===null||e===void 0?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ou{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=jt(this.lastLoginAt),this.creationTime=jt(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function is(t){var e;const n=t.auth,s=await t.getIdToken(),r=await nn(t,em(n,{idToken:s}));T(r==null?void 0:r.users.length,n,"internal-error");const i=r.users[0];t._notifyReloadListener(i);const o=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?am(i.providerUserInfo):[],a=om(t.providerData,o),c=t.isAnonymous,u=!(t.email&&i.passwordHash)&&!(a!=null&&a.length),l=c?u:!1,h={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:a,metadata:new Ou(i.createdAt,i.lastLoginAt),isAnonymous:l};Object.assign(t,h)}async function im(t){const e=ce(t);await is(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function om(t,e){return[...t.filter(s=>!e.some(r=>r.providerId===s.providerId)),...e]}function am(t){return t.map(e=>{var{providerId:n}=e,s=Ai(e,["providerId"]);return{providerId:n,uid:s.rawId||"",displayName:s.displayName||null,email:s.email||null,phoneNumber:s.phoneNumber||null,photoURL:s.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cm(t,e){const n=await Ru(t,{},async()=>{const s=on({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:r,apiKey:i}=t.config,o=Nu(t,r,"/v1/token",`key=${i}`),a=await t._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",Du.fetch()(o,{method:"POST",headers:a,body:s})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){T(e.idToken,"internal-error"),T(typeof e.idToken!="undefined","internal-error"),T(typeof e.refreshToken!="undefined","internal-error");const n="expiresIn"in e&&typeof e.expiresIn!="undefined"?Number(e.expiresIn):nm(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}async getToken(e,n=!1){return T(!this.accessToken||this.refreshToken,e,"user-token-expired"),!n&&this.accessToken&&!this.isExpired?this.accessToken:this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:s,refreshToken:r,expiresIn:i}=await cm(e,n);this.updateTokensAndExpiration(s,r,Number(i))}updateTokensAndExpiration(e,n,s){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+s*1e3}static fromJSON(e,n){const{refreshToken:s,accessToken:r,expirationTime:i}=n,o=new sn;return s&&(T(typeof s=="string","internal-error",{appName:e}),o.refreshToken=s),r&&(T(typeof r=="string","internal-error",{appName:e}),o.accessToken=r),i&&(T(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new sn,this.toJSON())}_performRefresh(){return ve("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function be(t,e){T(typeof t=="string"||typeof t=="undefined","internal-error",{appName:e})}class He{constructor(e){var{uid:n,auth:s,stsTokenManager:r}=e,i=Ai(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new rm(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=s,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new Ou(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await nn(this,this.stsTokenManager.getToken(this.auth,e));return T(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return tm(this,e)}reload(){return im(this)}_assign(e){this!==e&&(T(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){return new He(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}))}_onReload(e){T(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let s=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),s=!0),n&&await is(this),await this.auth._persistUserIfCurrent(this),s&&this.auth._notifyListenersIfCurrent(this)}async delete(){const e=await this.getIdToken();return await nn(this,Zg(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var s,r,i,o,a,c,u,l;const h=(s=n.displayName)!==null&&s!==void 0?s:void 0,f=(r=n.email)!==null&&r!==void 0?r:void 0,g=(i=n.phoneNumber)!==null&&i!==void 0?i:void 0,v=(o=n.photoURL)!==null&&o!==void 0?o:void 0,k=(a=n.tenantId)!==null&&a!==void 0?a:void 0,D=(c=n._redirectEventId)!==null&&c!==void 0?c:void 0,$=(u=n.createdAt)!==null&&u!==void 0?u:void 0,Y=(l=n.lastLoginAt)!==null&&l!==void 0?l:void 0,{uid:ge,emailVerified:Se,isAnonymous:Dt,providerData:Rt,stsTokenManager:Nt}=n;T(ge&&Nt,e,"internal-error");const il=sn.fromJSON(this.name,Nt);T(typeof ge=="string",e,"internal-error"),be(h,e.name),be(f,e.name),T(typeof Se=="boolean",e,"internal-error"),T(typeof Dt=="boolean",e,"internal-error"),be(g,e.name),be(v,e.name),be(k,e.name),be(D,e.name),be($,e.name),be(Y,e.name);const Us=new He({uid:ge,auth:e,email:f,emailVerified:Se,displayName:h,isAnonymous:Dt,photoURL:v,phoneNumber:g,tenantId:k,stsTokenManager:il,createdAt:$,lastLoginAt:Y});return Rt&&Array.isArray(Rt)&&(Us.providerData=Rt.map(ol=>Object.assign({},ol))),D&&(Us._redirectEventId=D),Us}static async _fromIdTokenResponse(e,n,s=!1){const r=new sn;r.updateFromServerResponse(n);const i=new He({uid:n.localId,auth:e,stsTokenManager:r,isAnonymous:s});return await is(i),i}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mu{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Mu.type="NONE";const Ho=Mu;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fn(t,e,n){return`firebase:${t}:${e}:${n}`}class lt{constructor(e,n,s){this.persistence=e,this.auth=n,this.userKey=s;const{config:r,name:i}=this.auth;this.fullUserKey=Fn(this.userKey,r.apiKey,i),this.fullPersistenceKey=Fn("persistence",r.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?He._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,s="authUser"){if(!n.length)return new lt(we(Ho),e,s);const r=(await Promise.all(n.map(async u=>{if(await u._isAvailable())return u}))).filter(u=>u);let i=r[0]||we(Ho);const o=Fn(s,e.config.apiKey,e.name);let a=null;for(const u of n)try{const l=await u._get(o);if(l){const h=He._fromJSON(e,l);u!==i&&(a=h),i=u;break}}catch{}const c=r.filter(u=>u._shouldAllowMigration);return!i._shouldAllowMigration||!c.length?new lt(i,e,s):(i=c[0],a&&await i._set(o,a.toJSON()),await Promise.all(n.map(async u=>{if(u!==i)try{await u._remove(o)}catch{}})),new lt(i,e,s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ko(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(xu(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Pu(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Fu(e))return"Blackberry";if(Vu(e))return"Webos";if(Ni(e))return"Safari";if((e.includes("chrome/")||Lu(e))&&!e.includes("edge/"))return"Chrome";if(Uu(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,s=t.match(n);if((s==null?void 0:s.length)===2)return s[1]}return"Other"}function Pu(t=q()){return/firefox\//i.test(t)}function Ni(t=q()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Lu(t=q()){return/crios\//i.test(t)}function xu(t=q()){return/iemobile/i.test(t)}function Uu(t=q()){return/android/i.test(t)}function Fu(t=q()){return/blackberry/i.test(t)}function Vu(t=q()){return/webos/i.test(t)}function Ms(t=q()){return/iphone|ipad|ipod/i.test(t)}function um(t=q()){var e;return Ms(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function lm(){return ca()&&document.documentMode===10}function Bu(t=q()){return Ms(t)||Uu(t)||Vu(t)||Fu(t)||/windows phone/i.test(t)||xu(t)}function hm(){try{return!!(window&&window!==window.top)}catch{return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $u(t,e=[]){let n;switch(t){case"Browser":n=Ko(q());break;case"Worker":n=`${Ko(q())}-${t}`;break;default:n=t}const s=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${an}/${s}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dm{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const s=i=>new Promise((o,a)=>{try{const c=e(i);o(c)}catch(c){a(c)}});s.onAbort=n,this.queue.push(s);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){var n;if(this.auth.currentUser===e)return;const s=[];try{for(const r of this.queue)await r(e),r.onAbort&&s.push(r.onAbort)}catch(r){s.reverse();for(const i of s)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:(n=r)===null||n===void 0?void 0:n.message})}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fm{constructor(e,n,s){this.app=e,this.heartbeatServiceProvider=n,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new zo(this),this.idTokenSubscription=new zo(this),this.beforeStateQueue=new dm(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Au,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=we(n)),this._initializationPromise=this.queue(async()=>{var s,r;if(!this._deleted&&(this.persistenceManager=await lt.create(this,e),!this._deleted)){if(!((s=this._popupRedirectResolver)===null||s===void 0)&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((r=this.currentUser)===null||r===void 0?void 0:r.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUser(e){var n;const s=await this.assertedPersistence.getCurrentUser();let r=s,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,a=r==null?void 0:r._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===a)&&(c==null?void 0:c.user)&&(r=c.user,i=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(r)}catch(o){r=s,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return T(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){var n;try{await is(e)}catch(s){if(((n=s)===null||n===void 0?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Gg()}async _delete(){this._deleted=!0}async updateCurrentUser(e){const n=e?ce(e):null;return n&&T(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&T(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0)}setPersistence(e){return this.queue(async()=>{await this.assertedPersistence.setPersistence(we(e))})}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new rn("auth","Firebase",e())}onAuthStateChanged(e,n,s){return this.registerStateListener(this.authStateSubscription,e,n,s)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,s){return this.registerStateListener(this.idTokenSubscription,e,n,s)}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const s=await this.getOrInitRedirectPersistenceManager(n);return e===null?s.removeCurrentUser():s.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&we(e)||this._popupRedirectResolver;T(n,this,"argument-error"),this.redirectPersistenceManager=await lt.create(this,[we(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,s;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((s=this.redirectUser)===null||s===void 0?void 0:s._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const s=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==s&&(this.lastNotifiedUid=s,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,s,r){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n),o=this._isInitialized?Promise.resolve():this._initializationPromise;return T(o,this,"internal-error"),o.then(()=>i(this.currentUser)),typeof n=="function"?e.addObserver(n,s,r):e.addObserver(n)}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&(this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh()),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return T(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=$u(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={["X-Client-Version"]:this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const s=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());return s&&(n["X-Firebase-Client"]=s),n}}function Ps(t){return ce(t)}class zo{constructor(e){this.auth=e,this.observer=null,this.addObserver=Sl(n=>this.observer=n)}get next(){return T(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ju{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return ve("not implemented")}_getIdTokenResponse(e){return ve("not implemented")}_linkToIdToken(e,n){return ve("not implemented")}_getReauthenticationResolver(e){return ve("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ht(t,e){return Yg(t,"POST","/v1/accounts:signInWithIdp",Xg(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pm="http://localhost";class Je extends ju{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new Je(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):pe("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:s,signInMethod:r}=n,i=Ai(n,["providerId","signInMethod"]);if(!s||!r)return null;const o=new Je(s,r);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return ht(e,n)}_linkToIdToken(e,n){const s=this.buildRequest();return s.idToken=n,ht(e,s)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,ht(e,n)}buildRequest(){const e={requestUri:pm,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=on(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oi{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sn extends Oi{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ce extends Sn{constructor(){super("facebook.com")}static credential(e){return Je._fromParams({providerId:Ce.PROVIDER_ID,signInMethod:Ce.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Ce.credentialFromTaggedObject(e)}static credentialFromError(e){return Ce.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Ce.credential(e.oauthAccessToken)}catch{return null}}}Ce.FACEBOOK_SIGN_IN_METHOD="facebook.com";Ce.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class me extends Sn{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return Je._fromParams({providerId:me.PROVIDER_ID,signInMethod:me.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return me.credentialFromTaggedObject(e)}static credentialFromError(e){return me.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:s}=e;if(!n&&!s)return null;try{return me.credential(n,s)}catch{return null}}}me.GOOGLE_SIGN_IN_METHOD="google.com";me.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ae extends Sn{constructor(){super("github.com")}static credential(e){return Je._fromParams({providerId:Ae.PROVIDER_ID,signInMethod:Ae.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Ae.credentialFromTaggedObject(e)}static credentialFromError(e){return Ae.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Ae.credential(e.oauthAccessToken)}catch{return null}}}Ae.GITHUB_SIGN_IN_METHOD="github.com";Ae.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ke extends Sn{constructor(){super("twitter.com")}static credential(e,n){return Je._fromParams({providerId:ke.PROVIDER_ID,signInMethod:ke.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return ke.credentialFromTaggedObject(e)}static credentialFromError(e){return ke.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:s}=e;if(!n||!s)return null;try{return ke.credential(n,s)}catch{return null}}}ke.TWITTER_SIGN_IN_METHOD="twitter.com";ke.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class It{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,s,r=!1){const i=await He._fromIdTokenResponse(e,s,r),o=Go(s);return new It({user:i,providerId:o,_tokenResponse:s,operationType:n})}static async _forOperation(e,n,s){await e._updateTokensIfNecessary(s,!0);const r=Go(s);return new It({user:e,providerId:r,_tokenResponse:s,operationType:n})}}function Go(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class os extends Ze{constructor(e,n,s,r){var i;super(n.code,n.message),this.operationType=s,this.user=r,Object.setPrototypeOf(this,os.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:n.customData._serverResponse,operationType:s}}static _fromErrorAndOperation(e,n,s,r){return new os(e,n,s,r)}}function qu(t,e,n,s){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?os._fromErrorAndOperation(t,i,e,s):i})}async function gm(t,e,n=!1){const s=await nn(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return It._forOperation(t,"link",s)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mm(t,e,n=!1){var s;const{auth:r}=t,i="reauthenticate";try{const o=await nn(t,qu(r,i,e,t),n);T(o.idToken,r,"internal-error");const a=Ri(o.idToken);T(a,r,"internal-error");const{sub:c}=a;return T(t.uid===c,r,"user-mismatch"),It._forOperation(t,i,o)}catch(o){throw((s=o)===null||s===void 0?void 0:s.code)==="auth/user-not-found"&&pe(r,"user-mismatch"),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ym(t,e,n=!1){const s="signIn",r=await qu(t,s,e),i=await It._fromIdTokenResponse(t,s,r);return n||await t._updateCurrentUser(i.user),i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vm(t,e){return ce(t).setPersistence(e)}const as="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hu{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(as,"1"),this.storage.removeItem(as),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wm(){const t=q();return Ni(t)||Ms(t)}const Em=1e3,Im=10;class Ku extends Hu{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=wm()&&hm(),this.fallbackToPolling=Bu(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const s=this.storage.getItem(n),r=this.localCache[n];s!==r&&e(n,r,s)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const s=e.key;if(n?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){const o=this.storage.getItem(s);if(e.newValue!==o)e.newValue!==null?this.storage.setItem(s,e.newValue):this.storage.removeItem(s);else if(this.localCache[s]===e.newValue&&!n)return}const r=()=>{const o=this.storage.getItem(s);!n&&this.localCache[s]===o||this.notifyListeners(s,o)},i=this.storage.getItem(s);lm()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,Im):r()}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const r of Array.from(s))r(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,s)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:s}),!0)})},Em)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}Ku.type="LOCAL";const zu=Ku;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gu extends Hu{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}Gu.type="SESSION";const Wu=Gu;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tm(t){return Promise.all(t.map(async e=>{try{const n=await e;return{fulfilled:!0,value:n}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ls{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(r=>r.isListeningto(e));if(n)return n;const s=new Ls(e);return this.receivers.push(s),s}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:s,eventType:r,data:i}=n.data,o=this.handlersMap[r];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:s,eventType:r});const a=Array.from(o).map(async u=>u(n.origin,i)),c=await Tm(a);n.ports[0].postMessage({status:"done",eventId:s,eventType:r,response:c})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Ls.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mi(t="",e=10){let n="";for(let s=0;s<e;s++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _m{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,s=50){const r=typeof MessageChannel!="undefined"?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let i,o;return new Promise((a,c)=>{const u=Mi("",20);r.port1.start();const l=setTimeout(()=>{c(new Error("unsupported_event"))},s);o={messageChannel:r,onMessage(h){const f=h;if(f.data.eventId===u)switch(f.data.status){case"ack":clearTimeout(l),i=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),a(f.data.response);break;default:clearTimeout(l),clearTimeout(i),c(new Error("invalid_response"));break}}},this.handlers.add(o),r.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:u,data:n},[r.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function de(){return window}function Sm(t){de().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qu(){return typeof de().WorkerGlobalScope!="undefined"&&typeof de().importScripts=="function"}async function bm(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Cm(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function Am(){return Qu()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xu="firebaseLocalStorageDb",km=1,cs="firebaseLocalStorage",Yu="fbase_key";class bn{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function xs(t,e){return t.transaction([cs],e?"readwrite":"readonly").objectStore(cs)}function Dm(){const t=indexedDB.deleteDatabase(Xu);return new bn(t).toPromise()}function kr(){const t=indexedDB.open(Xu,km);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const s=t.result;try{s.createObjectStore(cs,{keyPath:Yu})}catch(r){n(r)}}),t.addEventListener("success",async()=>{const s=t.result;s.objectStoreNames.contains(cs)?e(s):(s.close(),await Dm(),e(await kr()))})})}async function Wo(t,e,n){const s=xs(t,!0).put({[Yu]:e,value:n});return new bn(s).toPromise()}async function Rm(t,e){const n=xs(t,!1).get(e),s=await new bn(n).toPromise();return s===void 0?null:s.value}function Qo(t,e){const n=xs(t,!0).delete(e);return new bn(n).toPromise()}const Nm=800,Om=3;class Ju{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await kr(),this.db)}async _withRetries(e){let n=0;for(;;)try{const s=await this._openDb();return await e(s)}catch(s){if(n++>Om)throw s;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Qu()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Ls._getInstance(Am()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await bm(),!this.activeServiceWorker)return;this.sender=new _m(this.activeServiceWorker);const s=await this.sender._send("ping",{},800);!s||((e=s[0])===null||e===void 0?void 0:e.fulfilled)&&((n=s[0])===null||n===void 0?void 0:n.value.includes("keyChanged"))&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Cm()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await kr();return await Wo(e,as,"1"),await Qo(e,as),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(s=>Wo(s,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(s=>Rm(s,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Qo(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(r=>{const i=xs(r,!1).getAll();return new bn(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],s=new Set;for(const{fbase_key:r,value:i}of e)s.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),n.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!s.has(r)&&(this.notifyListeners(r,null),n.push(r));return n}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const r of Array.from(s))r(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Nm)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Ju.type="LOCAL";const Mm=Ju;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pm(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}function Lm(t){return new Promise((e,n)=>{const s=document.createElement("script");s.setAttribute("src",t),s.onload=e,s.onerror=r=>{const i=he("internal-error");i.customData=r,n(i)},s.type="text/javascript",s.charset="UTF-8",Pm().appendChild(s)})}function xm(t){return`__${t}${Math.floor(Math.random()*1e6)}`}new _n(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zu(t,e){return e?we(e):(T(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pi extends ju{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return ht(e,this._buildIdpRequest())}_linkToIdToken(e,n){return ht(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return ht(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function Um(t){return ym(t.auth,new Pi(t),t.bypassAuthState)}function Fm(t){const{auth:e,user:n}=t;return T(n,e,"internal-error"),mm(n,new Pi(t),t.bypassAuthState)}async function Vm(t){const{auth:e,user:n}=t;return T(n,e,"internal-error"),gm(n,new Pi(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class el{constructor(e,n,s,r,i=!1){this.auth=e,this.resolver=s,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(s){this.reject(s)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:s,postBody:r,tenantId:i,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:n,sessionId:s,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(u){this.reject(u)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Um;case"linkViaPopup":case"linkViaRedirect":return Vm;case"reauthViaPopup":case"reauthViaRedirect":return Fm;default:pe(this.auth,"internal-error")}}resolve(e){_e(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){_e(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bm=new _n(2e3,1e4);class ot extends el{constructor(e,n,s,r,i){super(e,n,r,i),this.provider=s,this.authWindow=null,this.pollId=null,ot.currentPopupAction&&ot.currentPopupAction.cancel(),ot.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return T(e,this.auth,"internal-error"),e}async onExecution(){_e(this.filter.length===1,"Popup operations only handle one event");const e=Mi();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(he(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(he(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,ot.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,s;if(!((s=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||s===void 0)&&s.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(he(this.auth,"popup-closed-by-user"))},2e3);return}this.pollId=window.setTimeout(e,Bm.get())};e()}}ot.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $m="pendingRedirect",Vn=new Map;class jm extends el{constructor(e,n,s=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,s),this.eventId=null}async execute(){let e=Vn.get(this.auth._key());if(!e){try{const s=await qm(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(s)}catch(n){e=()=>Promise.reject(n)}Vn.set(this.auth._key(),e)}return this.bypassAuthState||Vn.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function qm(t,e){const n=nl(e),s=tl(t);if(!await s._isAvailable())return!1;const r=await s._get(n)==="true";return await s._remove(n),r}async function Hm(t,e){return tl(t)._set(nl(e),"true")}function Km(t,e){Vn.set(t._key(),e)}function tl(t){return we(t._redirectPersistence)}function nl(t){return Fn($m,t.config.apiKey,t.name)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zm(t,e,n){return Gm(t,e,n)}async function Gm(t,e,n){const s=Ps(t);jg(t,e,Oi);const r=Zu(s,n);return await Hm(r,s),r._openRedirect(s,e,"signInViaRedirect")}async function Wm(t,e){return await Ps(t)._initializationPromise,sl(t,e,!1)}async function sl(t,e,n=!1){const s=Ps(t),r=Zu(s,e),o=await new jm(s,r,n).execute();return o&&!n&&(delete o.user._redirectEventId,await s._persistUserIfCurrent(o.user),await s._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qm=10*60*1e3;class Xm{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(s=>{this.isEventForConsumer(e,s)&&(n=!0,this.sendToConsumer(e,s),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Ym(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var s;if(e.error&&!rl(e)){const r=((s=e.error.code)===null||s===void 0?void 0:s.split("auth/")[1])||"internal-error";n.onError(he(this.auth,r))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const s=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&s}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Qm&&this.cachedEventUids.clear(),this.cachedEventUids.has(Xo(e))}saveEventToCache(e){this.cachedEventUids.add(Xo(e)),this.lastProcessedEventTime=Date.now()}}function Xo(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function rl({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Ym(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return rl(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Jm(t,e={}){return Os(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zm=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,ey=/^https?/;async function ty(t){if(t.config.emulator)return;const{authorizedDomains:e}=await Jm(t);for(const n of e)try{if(ny(n))return}catch{}pe(t,"unauthorized-domain")}function ny(t){const e=Ar(),{protocol:n,hostname:s}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&s===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===s}if(!ey.test(n))return!1;if(Zm.test(t))return s===t;const r=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+r+"|"+r+")$","i").test(s)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sy=new _n(3e4,6e4);function Yo(){const t=de().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function ry(t){return new Promise((e,n)=>{var s,r,i;function o(){Yo(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Yo(),n(he(t,"network-request-failed"))},timeout:sy.get()})}if(!((r=(s=de().gapi)===null||s===void 0?void 0:s.iframes)===null||r===void 0)&&r.Iframe)e(gapi.iframes.getContext());else if(!((i=de().gapi)===null||i===void 0)&&i.load)o();else{const a=xm("iframefcb");return de()[a]=()=>{gapi.load?o():n(he(t,"network-request-failed"))},Lm(`https://apis.google.com/js/api.js?onload=${a}`).catch(c=>n(c))}}).catch(e=>{throw Bn=null,e})}let Bn=null;function iy(t){return Bn=Bn||ry(t),Bn}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oy=new _n(5e3,15e3),ay="__/auth/iframe",cy="emulator/auth/iframe",uy={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},ly=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function hy(t){const e=t.config;T(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Di(e,cy):`https://${t.config.authDomain}/${ay}`,s={apiKey:e.apiKey,appName:t.name,v:an},r=ly.get(t.config.apiHost);r&&(s.eid=r);const i=t._getFrameworks();return i.length&&(s.fw=i.join(",")),`${n}?${on(s).slice(1)}`}async function dy(t){const e=await iy(t),n=de().gapi;return T(n,t,"internal-error"),e.open({where:document.body,url:hy(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:uy,dontclear:!0},s=>new Promise(async(r,i)=>{await s.restyle({setHideOnLeave:!1});const o=he(t,"network-request-failed"),a=de().setTimeout(()=>{i(o)},oy.get());function c(){de().clearTimeout(a),r(s)}s.ping(c).then(c,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fy={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},py=500,gy=600,my="_blank",yy="http://localhost";class Jo{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function vy(t,e,n,s=py,r=gy){const i=Math.max((window.screen.availHeight-r)/2,0).toString(),o=Math.max((window.screen.availWidth-s)/2,0).toString();let a="";const c=Object.assign(Object.assign({},fy),{width:s.toString(),height:r.toString(),top:i,left:o}),u=q().toLowerCase();n&&(a=Lu(u)?my:n),Pu(u)&&(e=e||yy,c.scrollbars="yes");const l=Object.entries(c).reduce((f,[g,v])=>`${f}${g}=${v},`,"");if(um(u)&&a!=="_self")return wy(e||"",a),new Jo(null);const h=window.open(e||"",a,l);T(h,t,"popup-blocked");try{h.focus()}catch{}return new Jo(h)}function wy(t,e){const n=document.createElement("a");n.href=t,n.target=e;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ey="__/auth/handler",Iy="emulator/auth/handler";function Zo(t,e,n,s,r,i){T(t.config.authDomain,t,"auth-domain-config-required"),T(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:s,v:an,eventId:r};if(e instanceof Oi){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",_l(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[c,u]of Object.entries(i||{}))o[c]=u}if(e instanceof Sn){const c=e.getScopes().filter(u=>u!=="");c.length>0&&(o.scopes=c.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const c of Object.keys(a))a[c]===void 0&&delete a[c];return`${Ty(t)}?${on(a).slice(1)}`}function Ty({config:t}){return t.emulator?Di(t,Iy):`https://${t.authDomain}/${Ey}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tr="webStorageSupport";class _y{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Wu,this._completeRedirectFn=sl,this._overrideRedirectResult=Km}async _openPopup(e,n,s,r){var i;_e((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=Zo(e,n,s,Ar(),r);return vy(e,o,Mi())}async _openRedirect(e,n,s,r){return await this._originValidation(e),Sm(Zo(e,n,s,Ar(),r)),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:r,promise:i}=this.eventManagers[n];return r?Promise.resolve(r):(_e(i,"If manager is not set, promise should be"),i)}const s=this.initAndGetManager(e);return this.eventManagers[n]={promise:s},s.catch(()=>{delete this.eventManagers[n]}),s}async initAndGetManager(e){const n=await dy(e),s=new Xm(e);return n.register("authEvent",r=>(T(r==null?void 0:r.authEvent,e,"invalid-auth-event"),{status:s.onEvent(r.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:s},this.iframes[e._key()]=n,s}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(tr,{type:tr},r=>{var i;const o=(i=r==null?void 0:r[0])===null||i===void 0?void 0:i[tr];o!==void 0&&n(!!o),pe(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=ty(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Bu()||Ni()||Ms()}}const Sy=_y;var ea="@firebase/auth",ta="0.20.4";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class by{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(s=>{var r;e(((r=s)===null||r===void 0?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);!n||(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){T(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cy(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}function Ay(t){dt(new Ke("auth",(e,{options:n})=>{const s=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),{apiKey:i,authDomain:o}=s.options;return((a,c)=>{T(i&&!i.includes(":"),"invalid-api-key",{appName:a.name}),T(!(o!=null&&o.includes(":")),"argument-error",{appName:a.name});const u={apiKey:i,authDomain:o,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:$u(t)},l=new fm(a,c,u);return Hg(l,n),l})(s,r)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,s)=>{e.getProvider("auth-internal").initialize()})),dt(new Ke("auth-internal",e=>{const n=Ps(e.getProvider("auth").getImmediate());return(s=>new by(s))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),Re(ea,ta,Cy(t)),Re(ea,ta,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ky(t=da()){const e=Or(t,"auth");return e.isInitialized()?e.getImmediate():qg(t,{popupRedirectResolver:Sy,persistence:[Mm,zu,Wu]})}Ay("Browser");function Py(){const e=_h({apiKey:"AIzaSyDgmBSpuzMuyZ2z_Dd5KSwwPRRHNvDw5so",authDomain:"balance-scores.firebaseapp.com",projectId:"balance-scores",storageBucket:"balance-scores.appspot.com",messagingSenderId:"900673448207",appId:"1:900673448207:web:dd5f173851b0edcb7a767a"});return Cg(e)}async function Ly(){const t=ky();return vm(t,zu).then(async()=>{if(t.currentUser!==null)return t.currentUser;const e=await Wm(t);if(e!==null)return e.user;await zm(t,new me)})}export{Sg as D,My as E,Oy as T,Ry as V,Py as i,Ly as l,Ny as y};
