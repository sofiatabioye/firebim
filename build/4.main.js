(window.webpackJsonp=window.webpackJsonp||[]).push([[4,10],{1093:function(e,o,t){"use strict";const r=t(1094),a=t(1095),u=t(1096),s=t(1097),c=Symbol("encodeFragmentIdentifier");function l(e){if("string"!=typeof e||1!==e.length)throw new TypeError("arrayFormatSeparator must be single character string")}function i(e,t){return t.encode?(t.strict?r:encodeURIComponent)(e):e}function p(e,t){return t.decode?a(e):e}function d(e){var t=e.indexOf("#");return e=-1!==t?e.slice(0,t):e}function n(e){var t=(e=d(e)).indexOf("?");return-1===t?"":e.slice(t+1)}function m(e,t){return t.parseNumbers&&!Number.isNaN(Number(e))&&"string"==typeof e&&""!==e.trim()?e=Number(e):!t.parseBooleans||null===e||"true"!==e.toLowerCase()&&"false"!==e.toLowerCase()||(e="true"===e.toLowerCase()),e}function f(e,r){l((r=Object.assign({decode:!0,sort:!0,arrayFormat:"none",arrayFormatSeparator:",",parseNumbers:!1,parseBooleans:!1},r)).arrayFormatSeparator);const a=function(s){let a;switch(s.arrayFormat){case"index":return(e,t,r)=>{a=/\[(\d*)\]$/.exec(e),e=e.replace(/\[\d*\]$/,""),a?(void 0===r[e]&&(r[e]={}),r[e][a[1]]=t):r[e]=t};case"bracket":return(e,t,r)=>{a=/(\[\])$/.exec(e),e=e.replace(/\[\]$/,""),a?void 0!==r[e]?r[e]=[].concat(r[e],t):r[e]=[t]:r[e]=t};case"comma":case"separator":return(e,t,r)=>{var a="string"==typeof t&&t.includes(s.arrayFormatSeparator),n="string"==typeof t&&!a&&p(t,s).includes(s.arrayFormatSeparator);t=n?p(t,s):t;t=a||n?t.split(s.arrayFormatSeparator).map(e=>p(e,s)):null===t?t:p(t,s);r[e]=t};case"bracket-separator":return(e,t,r)=>{var a=/(\[\])$/.test(e);e=e.replace(/\[\]$/,""),a?(a=null===t?[]:t.split(s.arrayFormatSeparator).map(e=>p(e,s)),void 0!==r[e]?r[e]=[].concat(r[e],a):r[e]=a):r[e]=t&&p(t,s)};default:return(e,t,r)=>{void 0!==r[e]?r[e]=[].concat(r[e],t):r[e]=t}}}(r),n=Object.create(null);if("string"!=typeof e)return n;if(!(e=e.trim().replace(/^[?#&]/,"")))return n;for(const s of e.split("&"))if(""!==s){let[e,t]=u(r.decode?s.replace(/\+/g," "):s,"=");t=void 0===t?null:["comma","separator","bracket-separator"].includes(r.arrayFormat)?t:p(t,r),a(p(e,r),t,n)}for(const t of Object.keys(n)){const o=n[t];if("object"==typeof o&&null!==o)for(const c of Object.keys(o))o[c]=m(o[c],r);else n[t]=m(o,r)}return!1===r.sort?n:(!0===r.sort?Object.keys(n).sort():Object.keys(n).sort(r.sort)).reduce((e,t)=>{var r=n[t];return Boolean(r)&&"object"==typeof r&&!Array.isArray(r)?e[t]=function e(t){return Array.isArray(t)?t.sort():"object"==typeof t?e(Object.keys(t)).sort((e,t)=>Number(e)-Number(t)).map(e=>t[e]):t}(r):e[t]=r,e},Object.create(null))}o.extract=n,o.parse=f,o.stringify=(r,a)=>{if(!r)return"";l((a=Object.assign({encode:!0,strict:!0,arrayFormat:"none",arrayFormatSeparator:","},a)).arrayFormatSeparator);var e;const n=function(n){switch(n.arrayFormat){case"index":return a=>(e,t)=>{const r=e.length;return void 0===t||n.skipNull&&null===t||n.skipEmptyString&&""===t?e:null===t?[...e,[i(a,n),"[",r,"]"].join("")]:[...e,[i(a,n),"[",i(r,n),"]=",i(t,n)].join("")]};case"bracket":return r=>(e,t)=>void 0===t||n.skipNull&&null===t||n.skipEmptyString&&""===t?e:null===t?[...e,[i(r,n),"[]"].join("")]:[...e,[i(r,n),"[]=",i(t,n)].join("")];case"comma":case"separator":case"bracket-separator":{const a="bracket-separator"===n.arrayFormat?"[]=":"=";return r=>(e,t)=>void 0===t||n.skipNull&&null===t||n.skipEmptyString&&""===t?e:(t=null===t?"":t,0===e.length?[[i(r,n),a,i(t,n)].join("")]:[[e,i(t,n)].join(n.arrayFormatSeparator)])}default:return r=>(e,t)=>void 0===t||n.skipNull&&null===t||n.skipEmptyString&&""===t?e:null===t?[...e,i(r,n)]:[...e,[i(r,n),"=",i(t,n)].join("")]}}(a),t={};for(const o of Object.keys(r))e=o,a.skipNull&&(e=>null==e)(r[e])||a.skipEmptyString&&""===r[e]||(t[o]=r[o]);const s=Object.keys(t);return!1!==a.sort&&s.sort(a.sort),s.map(e=>{const t=r[e];return void 0===t?"":null===t?i(e,a):Array.isArray(t)?0===t.length&&"bracket-separator"===a.arrayFormat?i(e,a)+"[]":t.reduce(n(e),[]).join("&"):i(e,a)+"="+i(t,a)}).filter(e=>0<e.length).join("&")},o.parseUrl=(e,t)=>{t=Object.assign({decode:!0},t);const[r,a]=u(e,"#");return Object.assign({url:r.split("?")[0]||"",query:f(n(e),t)},t&&t.parseFragmentIdentifier&&a?{fragmentIdentifier:p(a,t)}:{})},o.stringifyUrl=(e,t)=>{t=Object.assign({encode:!0,strict:!0,[c]:!0},t);var r=d(e.url).split("?")[0]||"",a=o.extract(e.url),a=o.parse(a,{sort:!1}),a=Object.assign(a,e.query);let n=o.stringify(a,t);n=n&&`?${n}`;let s=function(e){let t="";var r=e.indexOf("#");return-1!==r&&(t=e.slice(r)),t}(e.url);return e.fragmentIdentifier&&(s=`#${t[c]?i(e.fragmentIdentifier,t):e.fragmentIdentifier}`),`${r}${n}${s}`},o.pick=(e,t,r)=>{r=Object.assign({parseFragmentIdentifier:!0,[c]:!1},r);var{url:a,query:n,fragmentIdentifier:e}=o.parseUrl(e,r);return o.stringifyUrl({url:a,query:s(n,t),fragmentIdentifier:e},r)},o.exclude=(e,r,t)=>{var a=Array.isArray(r)?e=>!r.includes(e):(e,t)=>!r(e,t);return o.pick(e,a,t)}},1094:function(e,t,r){"use strict";e.exports=e=>encodeURIComponent(e).replace(/[!'()*]/g,e=>`%${e.charCodeAt(0).toString(16).toUpperCase()}`)},1095:function(e,t,r){"use strict";var a="%[a-f0-9]{2}",n=new RegExp(a,"gi"),c=new RegExp("("+a+")+","gi");function u(t){try{return decodeURIComponent(t)}catch(e){for(var r=t.match(n),a=1;a<r.length;a++)r=(t=function e(t,r){try{return decodeURIComponent(t.join(""))}catch(e){}if(1===t.length)return t;var a=t.slice(0,r=r||1),r=t.slice(r);return Array.prototype.concat.call([],e(a),e(r))}(r,a).join("")).match(n);return t}}e.exports=function(t){if("string"!=typeof t)throw new TypeError("Expected `encodedURI` to be of type `string`, got `"+typeof t+"`");try{return t=t.replace(/\+/g," "),decodeURIComponent(t)}catch(e){return function(e){for(var t={"%FE%FF":"��","%FF%FE":"��"},r=c.exec(e);r;){try{t[r[0]]=decodeURIComponent(r[0])}catch(e){var a=u(r[0]);a!==r[0]&&(t[r[0]]=a)}r=c.exec(e)}t["%C2"]="�";for(var n=Object.keys(t),s=0;s<n.length;s++){var o=n[s];e=e.replace(new RegExp(o,"g"),t[o])}return e}(t)}}},1096:function(e,t,r){"use strict";e.exports=(e,t)=>{if("string"!=typeof e||"string"!=typeof t)throw new TypeError("Expected the arguments to be of type `string`");if(""===t)return[e];var r=e.indexOf(t);return-1===r?[e]:[e.slice(0,r),e.slice(r+t.length)]}},1097:function(e,t,r){"use strict";e.exports=function(e,t){for(var r={},a=Object.keys(e),n=Array.isArray(t),s=0;s<a.length;s++){var o=a[s],c=e[o];(n?-1!==t.indexOf(o):t(o,c,e))&&(r[o]=c)}return r}},1243:function(e,t,r){"use strict";r.r(t);var a=r(44),u=r.n(a),a=r(126),l=r.n(a),i=r(1),p=r.n(i),d=r(17),m=r(26),a=r(1093),f=r.n(a),g=r(238),a=r(915),y=r.n(a),b=r(912);function n(t,e){var r,a=Object.keys(t);return Object.getOwnPropertySymbols&&(r=Object.getOwnPropertySymbols(t),e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),a.push.apply(a,r)),a}function h(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?n(Object(r),!0).forEach(function(e){u()(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}var v={password:{presence:{allowEmpty:!1,message:"is required"},length:{minimum:6,maximum:32}},confirmPassword:{presence:{allowEmpty:!1,message:"is required"},length:{maximum:32,minimum:6,message:"must be at least 6 characters"},equality:"password"}};t.default=function(e){var t=f.a.parse(e.location.search),r=t.resetToken,a=t.id,n=Object(m.g)(),e=Object(i.useState)({isValid:!1,values:{},touched:{},errors:{}}),t=l()(e,2),s=t[0],o=t[1],c=Object(g.b)();Object(i.useEffect)(function(){var t=y()(s.values,v);o(function(e){return h(h({},e),{},{isValid:!t,errors:t||{}})})},[s.values]);e=function(t){t.persist(),o(function(e){return h(h({},e),{},{values:h(h({},e.values),{},u()({},t.target.name,"checkbox"===t.target.type?t.target.checked:t.target.value)),touched:h(h({},e.touched),{},u()({},t.target.name,!0))})})},t=function(e){return!(!s.touched[e]||!s.errors[e])};return p.a.createElement("div",{className:"px-5"},p.a.createElement("p",{className:"text-center text-xl"},"Reset Password"),p.a.createElement("form",{className:"flex flex-col pt-3 md:pt-8",onSubmit:function(e){e.preventDefault(),c(Object(b.j)({password:s.values.password,resetToken:r,userId:a},n)),o({isValid:!1,values:{},touched:{},errors:{}})}},p.a.createElement("div",{className:"flex flex-col pt-4"},p.a.createElement("label",{htmlFor:"password",className:"text-lg"},"New Password"),p.a.createElement("input",{type:"password",id:"password",placeholder:"Password",name:"password",className:"shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline",onChange:e,value:s.values.password||"",required:!0}),p.a.createElement("span",{className:"text-danger py-2"},t("password")?s.errors.password[0]:null," ")),p.a.createElement("div",{className:"flex flex-col pt-4"},p.a.createElement("label",{htmlFor:"password",className:"text-lg"},"Confirm Password"),p.a.createElement("input",{type:"password",id:"confirmPassword",placeholder:"Confirm Password",name:"confirmPassword",className:"shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline",onChange:e,value:s.values.confirmPassword||"",required:!0}),p.a.createElement("span",{className:"text-danger py-2"},t("confirmPassword")?s.errors.confirmPassword[0]:null," ")),p.a.createElement("input",{type:"submit",value:"Submit",className:"loginButton text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8",disabled:!s.isValid})),p.a.createElement("div",{className:"text-center pt-5 pb-12"},p.a.createElement("p",null,"Remember your password ? ",p.a.createElement(d.b,{to:"/login",className:"underline font-semibold"},"Login"))))}},1326:function(e,t,r){"use strict";r.r(t);var a=r(44),o=r.n(a),a=r(126),c=r.n(a),u=r(1),l=r.n(u),i=r(17),p=r(238),d=r(26),a=r(915),m=r.n(a);r(912);function n(t,e){var r,a=Object.keys(t);return Object.getOwnPropertySymbols&&(r=Object.getOwnPropertySymbols(t),e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),a.push.apply(a,r)),a}function f(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?n(Object(r),!0).forEach(function(e){o()(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}var g={email:{presence:{allowEmpty:!1,message:"is required"},email:!0,length:{maximum:64}},password:{presence:{allowEmpty:!1,message:"is required"},length:{maximum:128}}};t.default=function(e){var t=Object(u.useState)({isValid:!1,values:{},touched:{},errors:{}}),r=c()(t,2),a=r[0],n=r[1];Object(p.b)(),Object(d.g)();Object(u.useEffect)(function(){var t=m()(a.values,g);n(function(e){return f(f({},e),{},{isValid:!t,errors:t||{}})})},[a.values]);function s(t){t.persist(),n(function(e){return f(f({},e),{},{values:f(f({},e.values),{},o()({},t.target.name,"checkbox"===t.target.type?t.target.checked:t.target.value)),touched:f(f({},e.touched),{},o()({},t.target.name,!0))})})}t=function(e){return!(!a.touched[e]||!a.errors[e])};return l.a.createElement("div",{className:"px-5"},l.a.createElement("p",{className:"text-center text-xl"},"Welcome."),l.a.createElement("form",{className:"flex flex-col pt-3 md:pt-8"},l.a.createElement("div",{className:"flex flex-col pt-4"},l.a.createElement("label",{htmlFor:"email",className:"text-lg"},"Email"),l.a.createElement("input",(r={type:"email",id:"email",name:"email",placeholder:"your@email.com",defaultValue:"olugbenga.akinade@gmail.com",className:"shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"},o()(r,"name","email"),o()(r,"autoComplete","email address"),o()(r,"onChange",s),o()(r,"value",a.email),r)),l.a.createElement("span",null,t.email?a.errors.email[0]:null," ")),l.a.createElement("div",{className:"flex flex-col pt-4"},l.a.createElement("label",{htmlFor:"password",className:"text-lg"},"Password"),l.a.createElement("input",{type:"password",id:"password",placeholder:"Password",name:"password",defaultValue:"firebim",className:"shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline",autoComplete:"current-password",onChange:s,value:a.password}),l.a.createElement("span",null,t("password")?a.errors.password[0]:null," ")),l.a.createElement(i.b,{to:"/"},l.a.createElement("div",{className:"loginButton text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"},"Login"))),l.a.createElement("div",{className:"text-center pt-5 pb-12"},l.a.createElement("p",null,"Forgot your password ? ",l.a.createElement(i.b,{to:"/forgotpassword",className:"underline font-semibold"},"Click here"))))}},1327:function(e,t,r){"use strict";r.r(t);var a=r(44),o=r.n(a),a=r(126),c=r.n(a),u=r(1),l=r.n(u),i=r(17),p=r(238),d=r(26),a=r(915),m=r.n(a),f=r(912);function n(t,e){var r,a=Object.keys(t);return Object.getOwnPropertySymbols&&(r=Object.getOwnPropertySymbols(t),e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),a.push.apply(a,r)),a}function g(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?n(Object(r),!0).forEach(function(e){o()(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}var y={email:{presence:{allowEmpty:!1,message:"is required"},email:!0,length:{maximum:64}}};t.default=function(e){var t=Object(u.useState)({isValid:!1,values:{},touched:{},errors:{}}),r=c()(t,2),a=r[0],n=r[1],s=Object(p.b)();Object(d.g)();Object(u.useEffect)(function(){var t=m()(a.values,y);n(function(e){return g(g({},e),{},{isValid:!t,errors:t||{}})})},[a.values]);t=function(e){return!(!a.touched[e]||!a.errors[e])};return l.a.createElement("div",{className:"px-5"},l.a.createElement("p",{className:"text-center text-xl"},"Forgot Password ?"),l.a.createElement("p",{className:"text-center text-md"},"Please provide your email"),l.a.createElement("form",{className:"flex flex-col pt-3 md:pt-8",onSubmit:function(e){e.preventDefault(),s(Object(f.c)(a.values)),n({isValid:!1,values:{},touched:{},errors:{}})}},l.a.createElement("div",{className:"flex flex-col pt-4"},l.a.createElement("label",{htmlFor:"email",className:"text-lg"},"Email"),l.a.createElement("input",(r={type:"email",id:"email",name:"email",placeholder:"your@email.com",className:"shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"},o()(r,"name","email"),o()(r,"autoComplete","email address"),o()(r,"onChange",function(t){t.persist(),n(function(e){return g(g({},e),{},{values:g(g({},e.values),{},o()({},t.target.name,"checkbox"===t.target.type?t.target.checked:t.target.value)),touched:g(g({},e.touched),{},o()({},t.target.name,!0))})})}),o()(r,"value",a.email),r)),l.a.createElement("span",null,t.email?a.errors.email[0]:null," ")),l.a.createElement("input",{type:"submit",value:"Submit",className:"loginButton text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8",disabled:!a.isValid})),l.a.createElement("div",{className:"text-center pt-5 pb-12"},l.a.createElement("p",null,"Remember your password ? ",l.a.createElement(i.b,{to:"/login",className:"underline font-semibold"},"Login"))))}},912:function(e,x,O){"use strict";!function(t){O.d(x,"k",function(){return a}),O.d(x,"h",function(){return u}),O.d(x,"d",function(){return l}),O.d(x,"l",function(){return i}),O.d(x,"g",function(){return p}),O.d(x,"i",function(){return d}),O.d(x,"a",function(){return m}),O.d(x,"c",function(){return f}),O.d(x,"j",function(){return g}),O.d(x,"f",function(){return y}),O.d(x,"e",function(){return b}),O.d(x,"b",function(){return h}),O.d(x,"m",function(){return v}),O.d(x,"n",function(){return w});var e=O(916),n=O.n(e),s=O(244),e=O(922),r=O(936),o=O(5),c=e.a.BASE_API_URL;function a(e){return{type:o.mb,user:e}}function u(t){return function(e){localStorage.removeItem("x-access-token"),localStorage.removeItem("user"),Object(r.a)(!1),e(a({})),t.push("/login"),s.b.success("You have logged out successfully")}}function l(e){return function(t){return n.a.get(c+"/model-components/model/"+e).then(function(e){return t((e=e.data.data,{type:o.M,data:e}))}).catch(function(e){t({type:o.N,message:e})})}}function i(e,r,a){return function(t){return t({type:o.rb}),n.a.put(c+"/model-components/".concat(a),r).then(function(e){s.b.success("Update completely successfully"),t((e=e.data.message,{type:o.tb,message:e,data:r,id:a}))}).catch(function(e){e=e.response.data.errors?e.response.data.errors.message:e.response.data.error;t({type:o.sb,error:e}),s.b.error(e)})}}function p(e){return function(r){return r({type:o.db}),n.a.post(c+"/invite-user",e).then(function(e){var t;s.b.success("Invite sent successfully"),r((t="Invite sent successfully",e=e.data.data,{type:o.fb,message:t,data:e}))}).catch(function(e){e=(e.response.data.errors||e.response.data).message;r({type:o.eb,error:e}),s.b.error(e)})}}function d(e){return function(r){return r({type:o.gb}),n.a.post(c+"/remove-user",e).then(function(e){var t;s.b.success("User removed from project successfully"),r((t="User removed from project successfully",e=e.data.data,{type:o.ib,message:t,data:e}))}).catch(function(e){e=(e.response.data.errors||e.response.data).message;r({type:o.hb,error:e}),s.b.error(e)})}}function m(e){return function(t){return t({type:o.j}),n.a.put(c+"/users/password",e).then(function(e){204===e.status&&(s.b.success("Password changed successfully"),t({type:o.l,message:"Password changed successfully"}))}).catch(function(e){e=(e.response.data.errors||e.response.data).message;t({type:o.k,error:e}),s.b.error(e)})}}function f(e){return function(t){return t({type:o.E}),n.a.post(c+"/password/request-reset",e).then(function(e){s.b.success(e.data.message),t((e=e.data.message,{type:o.G,message:e}))}).catch(function(e){e.response.data.errors,e=e.response.data.message;t({type:o.F,error:e}),s.b.error(e)})}}function g(e,r){return function(t){return t({type:o.jb}),n.a.post(c+"/reset-password",e).then(function(e){s.b.success("Password reset successful"),t({type:o.lb,message:"Password reset successful"}),r.push("/login")}).catch(function(e){e.response.data.errors,e=e.response.data.message;t({type:o.kb,error:e}),s.b.error(e)})}}function y(){return function(r){return r({type:o.X}),n.a.get(c+"/users").then(function(e){var t;r((t=e.data.data,e=e.data.message,{type:o.Z,data:t,message:e}))}).catch(function(e){e.response.data.errors,e=e.response.data.message;r({type:o.Y,error:e})})}}function b(e){return function(r){return r({type:o.ab}),n.a.get(c+"/user/"+e).then(function(e){var t;r((t=e.data.data,e=e.data.message,{type:o.cb,data:t,message:e}))}).catch(function(e){e.response.data.errors,e=e.response.data.message;r({type:o.bb,error:e})})}}function h(a){return function(r){return r({type:o.v}),n.a.delete(c+"/user/".concat(a)).then(function(e){var t;r((t="User deleted successfully",{type:o.x,id:a,message:t})),s.b.success("User deleted successfully")}).catch(function(e){t.log(e.response);e.response.data.errors,e=e.response.data.message;r({type:o.w,error:e}),s.b.error(e)})}}function v(e,a){return function(r){return r({type:o.Db}),n.a.put(c+"/user/".concat(a),e).then(function(e){var t;r((t="User updated successfully",e=e.data.data,{type:o.Ib,message:t,data:e,id:a})),s.b.success("User updated successfully")}).catch(function(e){e.response.data.errors,e=e.response.data.message;r({type:o.Eb,error:e}),s.b.error(e)})}}function w(e,a){return function(r){return r({type:o.Fb}),n.a.put(c+"/user/".concat(a),e).then(function(e){var t;r((t="User updated successfully",e=e.data.data,{type:o.Hb,message:t,data:e,id:a})),s.b.success("User updated successfully")}).catch(function(e){e.response.data.errors,e=e.response.data.message;r({type:o.Gb,error:e}),s.b.error(e)})}}}.call(this,O(43))},922:function(e,t,r){"use strict";t.a={BASE_API_URL:"https://firebimapi.herokuapp.com/api/"}},936:function(e,t,r){"use strict";var a=r(916),n=r.n(a);t.a=function(e){e?n.a.defaults.headers.common["x-access-token"]=e:delete n.a.defaults.headers.common["x-access-token"]}}}]);