(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{1336:function(e,t,a){"use strict";a.r(t);var r=a(44),o=a.n(r),r=a(126),s=a.n(r),m=a(1),i=a.n(m),u=a(238),d=a(910),E=a(912),p=a(911),r=a(915),b=a.n(r);function n(t,e){var a,r=Object.keys(t);return Object.getOwnPropertySymbols&&(a=Object.getOwnPropertySymbols(t),e&&(a=a.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,a)),r}function f(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?n(Object(a),!0).forEach(function(e){o()(t,e,a[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):n(Object(a)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))})}return t}var g={formerPassword:{presence:{allowEmpty:!1,message:"is required"},length:{maximum:32}},newPassword:{presence:{allowEmpty:!1,message:"is required"},length:{minimum:6,maximum:32}},confirmPassword:{presence:{allowEmpty:!1,message:"is required"},length:{maximum:32,minimum:6,message:"must be at least 6 characters"},equality:"newPassword"}};t.default=function(e){var t=Object(u.b)(),a=Object(m.useState)("password"),r=s()(a,2),n=r[0],a=(r[1],Object(u.c)(function(e){return e.auth.user}),Object(m.useState)({isValid:!1,values:{},touched:{},errors:{}})),r=s()(a,2),l=r[0],c=r[1],a=function(e){return!(!l.touched[e]||!l.errors[e])},r=function(t){t.persist(),c(function(e){return f(f({},e),{},{values:f(f({},e.values),{},o()({},t.target.name,"checkbox"===t.target.type?t.target.checked:t.target.value)),touched:f(f({},e.touched),{},o()({},t.target.name,!0))})})};Object(m.useEffect)(function(){var t=b()(l.values,g);c(function(e){return f(f({},e),{},{isValid:!t,errors:t||{}})})},[l.values]);return i.a.createElement(d.T,null,i.a.createElement(d.j,{xs:"12",xl:"6",className:"align-content-center m-auto"},i.a.createElement(d.g,{className:"card-accent-dark shadow-lg",size:"lg"},i.a.createElement(d.i,{className:"text-center"},i.a.createElement("div",{className:"d-block my-3"},"Change Password")),i.a.createElement(d.h,{className:"text-center"},i.a.createElement(d.t,{onSubmit:function(e){e.preventDefault(),l.isValid&&t(Object(E.a)(l.values)),c({isValid:!1,values:{},touched:{},errors:{}})}},i.a.createElement(d.D,{className:"mb-3"},i.a.createElement(d.F,null,i.a.createElement(d.G,null,i.a.createElement(p.a,{name:"cil-lock-locked"}))),i.a.createElement(d.C,{type:n,name:"formerPassword",placeholder:"Current Password",autoComplete:"current-password",onChange:r,value:l.formerPassword}),i.a.createElement(d.v,{className:"help-block"}," ",a("formerPassword")?l.errors.formerPassword[0]:null," ")),i.a.createElement(d.D,{className:"mb-4"},i.a.createElement(d.F,null,i.a.createElement(d.G,null,i.a.createElement(p.a,{name:"cil-lock-locked"}))),i.a.createElement(d.C,{type:n,name:"newPassword",placeholder:"New Password",autoComplete:"new-password",onChange:r,value:l.newPassword}),i.a.createElement(d.v,{className:"help-block"}," ",a("newPassword")?l.errors.newPassword[0]:null," ")),i.a.createElement(d.D,{className:"mb-4"},i.a.createElement(d.F,null,i.a.createElement(d.G,null,i.a.createElement(p.a,{name:"cil-lock-locked"}))),i.a.createElement(d.C,{type:n,name:"confirmPassword",placeholder:"Confirm Password",autoComplete:"confirm-password",onChange:r,value:l.confirmPassword}),i.a.createElement("div",null,i.a.createElement(d.v,{className:"d-block help-block"}," ",a("confirmPassword")?l.errors.confirmPassword[0]:null," "))),i.a.createElement(d.T,null,i.a.createElement(d.j,{xs:"12"},i.a.createElement(d.e,{type:"submit",className:"px-4 sidebar-dark text-white",disabled:!l.isValid},"Submit"))))))))}},1348:function(e,t,a){"use strict";a.r(t);var r=a(44),f=a.n(r),r=a(126),g=a.n(r),h=a(1),v=a.n(h),w=a(238),y=a(910),j=a(911),O=a(1092),r=a(915),C=a.n(r);function n(t,e){var a,r=Object.keys(t);return Object.getOwnPropertySymbols&&(a=Object.getOwnPropertySymbols(t),e&&(a=a.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,a)),r}function P(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?n(Object(a),!0).forEach(function(e){f()(t,e,a[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):n(Object(a)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))})}return t}var k={title:{presence:{allowEmpty:!1,message:"is required"},length:{maximum:32}},role:{presence:{allowEmpty:!1,message:"is required"},length:{maximum:32}}};t.default=function(){var t=Object(w.b)(),e=Object(h.useState)(!1),a=g()(e,2),r=a[0],n=a[1],l=Object(h.useState)(!1),c=g()(l,2),o=c[0],s=c[1],m=Object(h.useState)(!1),e=g()(m,2),a=e[0],i=e[1],l=Object(h.useState)({}),c=g()(l,2),u=c[0],d=c[1],m=Object(h.useState)({isValid:!1,values:{},touched:{},errors:{}}),e=g()(m,2),E=e[0],p=e[1],l=Object(w.c)(function(e){return e.assetCategory.assetCategories}),c=Object(w.c)(function(e){return e.auth.user});Object(h.useEffect)(function(){var t=C()(E.values,k);p(function(e){return P(P({},e),{},{isValid:!t,errors:t||{}})})},[E.values]);function b(e){e.preventDefault(),t(Object(O.g)(u.id,E.values)),d({}),p({isValid:!1,values:{},touched:{},errors:{}}),s(!1)}m=function(e){return!(!E.touched[e]||!E.errors[e])},e=function(t){t.persist(),p(function(e){return P(P({},e),{},{values:P(P({},e.values),{},f()({},t.target.name,"checkbox"===t.target.type?t.target.checked:t.target.value)),touched:P(P({},e.touched),{},f()({},t.target.name,!0))})})};return v.a.createElement(v.a.Fragment,null,v.a.createElement(y.T,null,v.a.createElement(y.j,{xs:"12",lg:"12"},v.a.createElement(y.g,{className:"shadow-lg"},v.a.createElement(y.i,null,"Asset Data Categories",c&&"admin"===c.role?v.a.createElement(y.e,{variant:"outline",active:!0,"aria-pressed":"true",className:"float-right sidebar-dark text-white",onClick:function(){return n(!r)}},"Add New Category"):null),v.a.createElement(y.K,{show:r,onClose:n},v.a.createElement(y.N,{closeButton:!0},v.a.createElement(y.O,null,"New Category")),v.a.createElement(y.t,{className:"form-horizontal",onSubmit:function(e){return e.preventDefault(),E.isValid&&t(Object(O.a)(E.values)),p({isValid:!1,values:{},touched:{},errors:{}}),n(!1),!1}},v.a.createElement(y.L,null,v.a.createElement(y.u,{row:!0},v.a.createElement(y.j,{md:"3"},v.a.createElement(y.I,{htmlFor:"hf-email"},"Title")),v.a.createElement(y.j,{xs:"12",md:"9"},v.a.createElement(y.C,{type:"text",id:"title",name:"title",placeholder:"Enter Category...",onChange:e,value:E.values.title||"",required:!0}),v.a.createElement(y.v,{className:"help-block"}," ",m("title")?E.errors.title[0]:"Please enter your category"," "))),v.a.createElement(y.u,{row:!0},v.a.createElement(y.j,{md:"3"},v.a.createElement(y.I,{htmlFor:"hf-password"},"Access Role")),v.a.createElement(y.j,{xs:"12",md:"9"},v.a.createElement(y.U,{custom:!0,name:"role",id:"role",autoComplete:"name",onChange:e,value:E.values.role||"",required:!0},v.a.createElement("option",{value:""},"Please select "),v.a.createElement("option",{value:"design"},"Design"),v.a.createElement("option",{value:"manufacture"},"Manufacture"),v.a.createElement("option",{value:"delivery"},"Delivery"),v.a.createElement("option",{value:"installation"},"Installation")),v.a.createElement(y.v,{className:"help-block"}," ",m("role")?E.errors.role[0]:"Select access roles"," ")))),v.a.createElement(y.M,null,v.a.createElement(y.e,{className:"text-white sidebar-dark",type:"submit"},"Submit")," ",v.a.createElement(y.e,{color:"secondary",onClick:function(){return n(!1)}},"Cancel")))),v.a.createElement(y.h,null,l?v.a.createElement(y.m,{items:l,fields:c&&"admin"===c.role?["title","role","AssetFieldCount","actions"]:["title","role","AssetFieldCount"],itemsPerPage:10,pagination:!0,tableFilter:!0,sorter:!0,hover:!0,scopedSlots:{actions:function(t){return v.a.createElement("td",{className:"px-4"},v.a.createElement(y.e,{className:"pl-6",onClick:function(){return e=t,s(!0),p({isValid:!0,values:e,touched:{},errors:{}}),void d(e);var e},color:"primary",variant:"ghost"},v.a.createElement(j.a,{name:"cil-pencil",color:"primary",customClasses:"c-sidebar-nav-icon"})),v.a.createElement(y.e,{className:"pl-6",onClick:function(){return e=t,i(!0),void d(e);var e},color:"danger",variant:"ghost"},v.a.createElement(j.a,{name:"cil-trash",customClasses:"c-sidebar-nav-icon"})))}}}):v.a.createElement("div",null,"Loading ...")),v.a.createElement(y.K,{show:a,onClose:i},v.a.createElement(y.N,{closeButton:!0}," Confirm"),v.a.createElement(y.L,null,"Are you sure you want to delete this asset category? "),v.a.createElement(y.M,null,v.a.createElement(y.e,{className:"text-white bg-danger",type:"submit",onClick:function(){t(Object(O.c)(u.id)),d({}),i(!1)}},"Yes")," ",v.a.createElement(y.e,{color:"secondary",onClick:function(){return i(!1)}},"Cancel"))),v.a.createElement(y.K,{show:o,onClose:s},v.a.createElement(y.N,{closeButton:!0}," Confirm"),v.a.createElement(y.t,{className:"form-horizontal",onSubmit:b},v.a.createElement(y.L,null,v.a.createElement(y.u,{row:!0},v.a.createElement(y.j,{md:"3"},v.a.createElement(y.I,{htmlFor:"hf-email"},"Title")),v.a.createElement(y.j,{xs:"12",md:"9"},v.a.createElement(y.C,{type:"text",id:"title",name:"title",placeholder:"Enter Category...",onChange:e,value:E.values.title||"",required:!0}),v.a.createElement(y.v,{className:"help-block"}," ",m("title")?E.errors.title[0]:"Please enter your category"," "))),v.a.createElement(y.u,{row:!0},v.a.createElement(y.j,{md:"3"},v.a.createElement(y.I,{htmlFor:"hf-password"},"Access Role")),v.a.createElement(y.j,{xs:"12",md:"9"},v.a.createElement(y.U,{custom:!0,name:"role",id:"role",autoComplete:"name",onChange:e,value:E.values.role||"",required:!0},v.a.createElement("option",{value:""},"Please select "),v.a.createElement("option",{value:"design"},"Design"),v.a.createElement("option",{value:"manufacture"},"Manufacture"),v.a.createElement("option",{value:"delivery"},"Delivery"),v.a.createElement("option",{value:"installation"},"Installation")),v.a.createElement(y.v,{className:"help-block"}," ",m("role")?E.errors.role[0]:"Select access roles"," ")))),v.a.createElement(y.M,null,v.a.createElement(y.e,{className:"text-white bg-info",type:"submit",onClick:function(){return b()}},"Submit")," ",v.a.createElement(y.e,{color:"secondary",onClick:function(){return s(!1)}},"Cancel"))))))))}},1350:function(e,t,a){"use strict";a.r(t);var r=a(44),E=a.n(r),r=a(126),p=a.n(r),b=a(1),f=a.n(b),g=a(238),h=a(910),v=a(911),w=[{id:0,name:"Olugbenga Akinade",email:"olugbenga.akinade@gmail.com",role:"designer",project:"Virtual project community center"},{id:1,name:"Omolara Arawomo",email:"omolara.arawomo@gmail.com",role:"manufacturer",project:"Training center"},{id:2,name:"Saheed Alaka",email:"saheed.alaka@gmail.com",role:"installation",project:"School Cafetaria"},{id:3,name:"Charles Maguire",email:"charles.maguire@gmail.com",role:"delivery",project:"Training center"}],r=a(915),y=a.n(r),j=a(912);function n(t,e){var a,r=Object.keys(t);return Object.getOwnPropertySymbols&&(a=Object.getOwnPropertySymbols(t),e&&(a=a.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,a)),r}function O(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?n(Object(a),!0).forEach(function(e){E()(t,e,a[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):n(Object(a)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))})}return t}var C={name:{presence:{allowEmpty:!1,message:"is required"},length:{maximum:32}},role:{presence:{allowEmpty:!1,message:"is required"},length:{maximum:32}},email:{presence:{allowEmpty:!1,message:"is required"},length:{maximum:32}},projectId:{presence:{allowEmpty:!1,message:"is required"},length:{maximum:32}}},P=["name","email","project","actions"];t.default=function(){var t=Object(g.b)(),e=Object(b.useState)(!1),a=p()(e,2),r=a[0],n=a[1],l=Object(b.useState)(!1),c=p()(l,2),e=c[0],o=c[1],a=Object(b.useState)(!1),l=p()(a,2),c=l[0],s=l[1],a=Object(b.useState)({}),l=p()(a,2),m=l[0],i=l[1],a=Object(b.useState)({isValid:!1,values:{},touched:{},errors:{}}),l=p()(a,2),u=l[0],d=l[1],a=(Object(g.c)(function(e){return e.project.projects}),w);Object(b.useEffect)(function(){var t=y()(u.values,C);d(function(e){return O(O({},e),{},{isValid:!t,errors:t||{}})})},[u.values]);l=function(t){t.persist(),d(function(e){return O(O({},e),{},{values:O(O({},e.values),{},E()({},t.target.name,"checkbox"===t.target.type?t.target.checked:t.target.value)),touched:O(O({},e.touched),{},E()({},t.target.name,!0))})})};return f.a.createElement(f.a.Fragment,null,f.a.createElement(h.T,null,f.a.createElement(h.j,{xs:"12",lg:"12"},f.a.createElement(h.g,{className:"shadow-lg"},f.a.createElement(h.i,null,"User",f.a.createElement(h.e,{variant:"outline",active:!0,"aria-pressed":"true",className:"float-right sidebar-dark text-white",onClick:function(){return n(!r)}},"Invite User")),f.a.createElement(h.K,{show:r,onClose:n},f.a.createElement(h.N,{closeButton:!0},f.a.createElement(h.O,null,e?"Update User":"Invite New User")),f.a.createElement(h.t,{className:"form-horizontal"},f.a.createElement(h.L,null,f.a.createElement(h.u,{row:!0},f.a.createElement(h.j,{md:"3"},f.a.createElement(h.I,{htmlFor:"name"},"Name")),f.a.createElement(h.j,{xs:"12",md:"9"},f.a.createElement(h.C,{type:"text",id:"name",name:"name",placeholder:"Enter User Name...",onChange:l,value:u.values.name||"",required:!0}),f.a.createElement(h.v,{className:"help-block"},"Please enter username"))),e?null:f.a.createElement(h.u,{row:!0},f.a.createElement(h.j,{md:"3"},f.a.createElement(h.I,{htmlFor:"email"},"Email Address")),f.a.createElement(h.j,{xs:"12",md:"9"},f.a.createElement(h.C,{type:"text",id:"email",name:"email",placeholder:"Enter Email...",onChange:l,value:u.values.email||"",required:!0}),f.a.createElement(h.v,{className:"help-block"},"Please enter email")))),f.a.createElement(h.M,null,f.a.createElement(h.e,{className:"text-white sidebar-dark",type:"submit"},"Submit")," ",f.a.createElement(h.e,{color:"secondary",onClick:function(){n(!1),o(!1),d({isValid:!0,values:{},touched:{},errors:{}})}},"Cancel")))),f.a.createElement(h.h,null,f.a.createElement(h.m,{items:a,fields:P,itemsPerPage:10,pagination:!0,tableFilter:!0,sorter:!0,hover:!0,scopedSlots:{actions:function(t){return f.a.createElement("td",{className:"px-4"},f.a.createElement(h.e,{className:"pl-6 px-3",color:"primary",variant:"ghost",onClick:function(){return e=t,o(!0),n(!0),d({isValid:!0,values:e,touched:{},errors:{}}),void i(e);var e}},f.a.createElement(v.a,{name:"cil-pencil",color:"info",customClasses:"c-sidebar-nav-icon"})),f.a.createElement(h.e,{className:"pl-6",color:"danger",variant:"ghost",onClick:function(){return e=t,s(!0),void i(e);var e}},f.a.createElement(v.a,{name:"cil-trash",customClasses:"c-sidebar-nav-icon"})))}}}))),f.a.createElement(h.K,{show:c,onClose:s},f.a.createElement(h.N,{closeButton:!0}," Confirm"),f.a.createElement(h.L,null,"Are you sure you want to delete this user? "),f.a.createElement(h.M,null,f.a.createElement(h.e,{className:"text-white bg-danger",type:"submit",onClick:function(e){e.preventDefault(),t(Object(j.b)(m.id)),i({}),s(!1)}},"Yes")," ",f.a.createElement(h.e,{color:"secondary",onClick:function(){return s(!1)}},"Cancel"))))))}}}]);