(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{1092:function(e,p,g){"use strict";!function(t){g.d(p,"e",function(){return a}),g.d(p,"a",function(){return s}),g.d(p,"g",function(){return o}),g.d(p,"c",function(){return i}),g.d(p,"f",function(){return m}),g.d(p,"b",function(){return d}),g.d(p,"h",function(){return u}),g.d(p,"d",function(){return f});var e=g(916),n=g.n(e),r=g(244),e=g(922),c=g(5),l=(g(929),e.a.BASE_API_URL);function a(){return function(a){return a({type:c.J}),n.a.get(l+"/assetcategories").then(function(e){var t;a((t=e.data.data,e=e.data.message,{type:c.L,categories:t,message:e}))}).catch(function(e){a({type:c.K,error:e})})}}function s(e){return function(a){return a({type:c.a}),n.a.post(l+"/assetcategories",e).then(function(e){var t;a((t=e.data.data,e="Category created successfully",{type:c.c,category:t,message:e})),r.b.success("Category created successfully")}).catch(function(e){var t;a((t=e.message,{type:c.b,error:t})),r.b.error(e.message)})}}function o(s,e){return function(a){return a({type:c.ob}),n.a.put(l+"/assetcategories/"+s,e).then(function(e){var t;a((t=e.data.data.assetCategory,e=e.data.message,{type:c.qb,category:t,id:s,message:e})),r.b.success("Asset updated successfully")}).catch(function(e){a({type:c.pb,error:e}),r.b.error(e.message)})}}function i(s){return function(a){return a({type:c.m}),n.a.delete(l+"/assetcategories/".concat(s)).then(function(e){var t;a((t="Category deleted successfully",{type:c.o,message:t,id:s})),r.b.success("Category deleted successfully")}).catch(function(e){var t;a((t=e.message,{type:c.n,error:t})),r.b.error(e.message)})}}function m(){return function(a){return a({type:c.O}),n.a.get(l+"/assetfields").then(function(e){var t;a((t=e.data.data,e=e.data.message,{type:c.Q,categories:t,message:e}))}).catch(function(e){a((e=e.message,{type:c.P,error:e}))})}}function d(e){return function(a){return a({type:c.d}),n.a.post(l+"/assetfields",e).then(function(e){var t;a((t=e.data.data,e="Field created successfully",{type:c.f,field:t,message:e})),r.b.success("Asset Datapoint created successfully")}).catch(function(e){e.response.data.errors,e=e.response.data.message;a({type:c.e,error:e}),r.b.error(e)})}}function u(s,e){return t.log(e,s,"$$$$$$"),function(a){return a({type:c.ub}),n.a.put(l+"/assetfields/"+s,e).then(function(e){var t;a((t=e.data.data.assetField,e=e.data.message,{type:c.wb,field:t,id:s,message:e})),r.b.success("Asset field updated successfully")}).catch(function(e){e.response.data.errors,e=e.response.data.message;a({type:c.vb,error:e}),r.b.error(e)})}}function f(s){return function(a){return a({type:c.p}),n.a.delete(l+"/assetfields/".concat(s)).then(function(e){var t;a((t="Asset field deleted successfully",{type:c.r,message:t,id:s})),r.b.success("Asset field deleted successfully")}).catch(function(e){e.response.data.errors,e=e.response.data.message;t.log(e),a({type:c.q,error:e}),r.b.error(e)})}}}.call(this,g(43))},1200:function(e,t,a){"use strict";t.a=a.p+"user.png"},1328:function(e,t,a){"use strict";a.r(t);var s=a(1),n=a.n(s),r=a(910),c=a(911);t.default=function(){return n.a.createElement("div",{className:"c-app c-default-layout flex-row align-items-center"},n.a.createElement(r.k,null,n.a.createElement(r.T,{className:"justify-content-center"},n.a.createElement(r.j,{md:"6"},n.a.createElement("div",{className:"clearfix"},n.a.createElement("h1",{className:"float-left display-3 mr-4"},"404"),n.a.createElement("h4",{className:"pt-3"},"Oops! You","'","re lost."),n.a.createElement("p",{className:"text-muted float-left"},"The page you are looking for was not found.")),n.a.createElement(r.D,{className:"input-prepend"},n.a.createElement(r.F,null,n.a.createElement(r.G,null,n.a.createElement(c.a,{name:"cil-magnifying-glass"}))),n.a.createElement(r.C,{size:"16",type:"text",placeholder:"What are you looking for?"}),n.a.createElement(r.E,null,n.a.createElement(r.e,{color:"info"},"Search")))))))}},1329:function(e,t,a){"use strict";a.r(t);var s=a(1),n=a.n(s),r=a(910),c=a(911);t.default=function(){return n.a.createElement("div",{className:"c-app c-default-layout flex-row align-items-center"},n.a.createElement(r.k,null,n.a.createElement(r.T,{className:"justify-content-center"},n.a.createElement(r.j,{md:"6"},n.a.createElement("span",{className:"clearfix"},n.a.createElement("h1",{className:"float-left display-3 mr-4"},"500"),n.a.createElement("h4",{className:"pt-3"},"Houston, we have a problem!"),n.a.createElement("p",{className:"text-muted float-left"},"The page you are looking for is temporarily unavailable.")),n.a.createElement(r.D,{className:"input-prepend"},n.a.createElement(r.F,null,n.a.createElement(r.G,null,n.a.createElement(c.a,{name:"cil-magnifying-glass"}))),n.a.createElement(r.C,{size:"16",type:"text",placeholder:"What are you looking for?"}),n.a.createElement(r.E,null,n.a.createElement(r.e,{color:"info"},"Search")))))))}},1341:function(e,t,a){"use strict";a.r(t);function r(e){var t=e.handleLogout,a=e.user,s=(v()(e,w),Object(i.b)()),n=Object(i.c)(function(e){return e.initial.sidebarShow});return o.a.createElement(d.w,{withSubheader:!0},o.a.createElement(d.ib,{inHeader:!0,className:"ml-md-3 d-lg-none",onClick:function(){var e=!![!1,"responsive"].includes(n)||"responsive";s({type:"set",sidebarShow:e})}}),o.a.createElement(d.ib,{inHeader:!0,className:"ml-3 d-md-down-none",onClick:function(){var e=![!0,"responsive"].includes(n)&&"responsive";s({type:"set",sidebarShow:e})}}),o.a.createElement(d.x,{className:"mx-auto d-lg-none",to:"/dashbaord"},o.a.createElement(x.a,{name:"logo",src:N,width:48,alt:"Logo"}),"Fire Rating"),o.a.createElement(d.y,{className:"d-md-down-none mr-auto"},o.a.createElement(d.z,{className:"px-3"},o.a.createElement(d.A,{to:"/dashboard"},"Fire Rating"))),o.a.createElement(d.y,{className:"px-3"},o.a.createElement(k,{handleLogout:t,user:a})),o.a.createElement(d.eb,{className:"px-3 justify-content-between"},o.a.createElement(d.d,{className:"border-0 c-subheader-nav m-0 px-0 px-md-3",routes:u})))}var l=a(1),o=a.n(l),i=a(238),c=a(26),m=a(17),d=a(910),u=[{path:"/",exact:!0,name:"Home"},{path:"/assets/categories",exact:!0,name:"Asset Categories",component:o.a.lazy(function(){return Promise.all([a.e(0),a.e(5)]).then(a.bind(null,1348))})},{path:"/assets/datapoints",exact:!0,name:"Asset Datapoints",component:o.a.lazy(function(){return Promise.all([a.e(0),a.e(8)]).then(a.bind(null,1330))})},{path:"/projects",exact:!0,name:"Projects",component:o.a.lazy(function(){return Promise.all([a.e(0),a.e(7),a.e(12),a.e(18)]).then(a.bind(null,1332))})},{path:"/project/:projectId/datapoints",exact:!0,name:"Project Datapoints",component:o.a.lazy(function(){return Promise.all([a.e(13),a.e(27)]).then(a.bind(null,1333))})},{path:"/users",exact:!0,name:"Users",component:o.a.lazy(function(){return Promise.all([a.e(0),a.e(5)]).then(a.bind(null,1350))})},{path:"/dashboard",exact:!0,name:"Dashboard",component:o.a.lazy(function(){return Promise.all([a.e(6),a.e(7),a.e(17)]).then(a.bind(null,1331))})},{path:"/project/model/:modelId/assets",exact:!0,name:"Asset Data Points",component:o.a.lazy(function(){return a.e(16).then(a.bind(null,1334))})},{path:"/viewer/:urn",exact:!0,name:"Model Viewer",component:o.a.lazy(function(){return Promise.all([a.e(6),a.e(15),a.e(14)]).then(a.bind(null,1335))})},{path:"/project/:projectId/:modelId",exact:!0,name:"Project",component:o.a.lazy(function(){return a.e(11).then(a.bind(null,1349))})},{path:"/change-password",exact:!0,name:"Change Password",component:o.a.lazy(function(){return Promise.all([a.e(0),a.e(5)]).then(a.bind(null,1336))})},{path:"/resetpassword/:resetToken:/id",exact:!0,name:"Reset Password",component:o.a.lazy(function(){return Promise.all([a.e(0),a.e(10)]).then(a.bind(null,1243))})},{path:"/userprofile",exact:!0,name:"Profile",component:o.a.lazy(function(){return Promise.all([a.e(0),a.e(8)]).then(a.bind(null,1337))})},{path:"/bat-tutorial",exact:!0,name:"BIM Asset Tagging Tutorial",component:o.a.lazy(function(){return a.e(19).then(a.bind(null,1338))})},{path:"/mobile-app-tutorial",exact:!0,name:"Mobile App Tutorial",component:o.a.lazy(function(){return a.e(20).then(a.bind(null,1339))})},{path:"/cloud-logistics-tutorial",exact:!0,name:"Web-based Cloud Logistics Tutorial",component:o.a.lazy(function(){return a.e(21).then(a.bind(null,1340))})}],f=(a(313),a(912)),p=a(929),g=a(1092),h=a(936),E=o.a.createElement("div",{className:"pt-3 text-center"},o.a.createElement("div",{className:"sk-spinner sk-spinner-pulse"})),b=o.a.memo(function(){var s=Object(i.b)(),n=Object(i.c)(function(e){return e.auth.user}),a=Object(i.c)(function(e){return e.project.projects});return Object(l.useEffect)(function(){var e,t=localStorage.getItem("user"),a=localStorage.getItem("x-access-token");t&&(e=JSON.parse(t),Object(h.a)(a),s(Object(f.k)(e))),s(Object(p.e)()),s(Object(g.f)()),s(Object(g.e)()),s(Object(f.d)(1)),s(Object(f.e)(n.id)),t&&"admin"===JSON.parse(t).role&&s(Object(f.f)())},[]),o.a.createElement("main",{className:"c-main"},o.a.createElement(d.k,{fluid:!0},o.a.createElement(l.Suspense,{fallback:E},o.a.createElement(m.f,null,u.map(function(t,e){return t.component&&o.a.createElement(m.e,{key:e,path:t.path,exact:t.exact,project:a,name:t.name,render:function(e){return o.a.createElement(d.r,null,o.a.createElement(t.component,e))}})}),o.a.createElement(m.d,{from:"/",to:"/dashboard"})))))}),y=o.a.memo(function(){return o.a.createElement(d.s,{fixed:!1},o.a.createElement("div",{className:"mfs-auto"},o.a.createElement("span",{className:"mr-1"},"@"),o.a.createElement("a",{href:"#",rel:"noopener noreferrer",className:"text-dark"},"Fire BIM 2022")))}),s=a(124),v=a.n(s),x=a(911),N=a.p+"logot.png",w=["handleLogout","user"],n=(a(2),a(1200)),j=["handleLogout","user"],k=function(e){var t=e.handleLogout,a=e.user;v()(e,j);return o.a.createElement(d.n,{inNav:!0,className:"c-header-nav-items mx-2",direction:"down"},o.a.createElement(d.q,{className:"c-header-nav-link",caret:!1},o.a.createElement("div",{className:"c-avatar"},o.a.createElement(d.B,{src:a&&a.image?"data:image/png;base64, "+a.image:n.a,className:"c-avatar-img",shape:"rounded-circle",thumbnail:!0}))),o.a.createElement(d.p,{className:"pt-0",placement:"bottom-end"},o.a.createElement(d.o,{header:!0,tag:"div",color:"light",className:"text-center"},o.a.createElement("strong",null,"Account"),o.a.createElement("div",null,a?a.email:null),o.a.createElement("div",null," Role: ",o.a.createElement("i",null,a?a.role:null))),o.a.createElement(d.o,{to:"/userprofile"},o.a.createElement(x.a,{name:"cil-bell",className:"mfe-2"}),"Profile"),o.a.createElement(d.o,{to:"/change-password"},o.a.createElement(x.a,{name:"cil-settings",className:"mfe-2"}),"Change Password"),o.a.createElement(d.o,{divider:!0}),o.a.createElement(d.o,{onClick:t},o.a.createElement(x.a,{name:"cil-x",className:"mfe-2"}),"Log Out")))},s=a(126),I=a.n(s),S=(a.p,[{_tag:"CSidebarNavItem",name:"Dashboard",to:"/dashboard",icon:o.a.createElement(x.a,{name:"cil-speedometer",customClasses:"c-sidebar-nav-icon"})},{_tag:"CSidebarNavTitle",_children:["Users"]},{_tag:"CSidebarNavItem",name:"Users",to:"/users",icon:"cil-user"},{_tag:"CSidebarNavTitle",_children:["Projects"]},{_tag:"CSidebarNavItem",name:"Projects",to:"/projects",icon:"cil-list"}]),P=o.a.memo(function(e){var t=Object(i.b)(),a=Object(i.c)(function(e){return e.initial.sidebarShow}),s=Object(l.useState)([]),n=I()(s,2),s=n[0],r=n[1],c=e.user,e=e.projects;return Object(l.useEffect)(function(){var e=(c&&c.role,S).filter(function(e){return"/base"!==e.route});r(e)},[e,c]),o.a.createElement(d.V,{className:"sidebar-dark",show:a,onShowChange:function(e){return t({type:"set",sidebarShow:e})}},o.a.createElement(d.W,{className:"d-md-down-none my-4 text-decoration-none text-center pr-2",to:"/dashbaord"},o.a.createElement("h4",{style:{color:"#ede6e6"}},"Fire BIM")),o.a.createElement(d.Y,null,o.a.createElement(d.l,{className:"sidebar-links",items:s,components:{CSidebarNavDivider:d.Z,CSidebarNavDropdown:d.ab,CSidebarNavItem:d.bb,CSidebarNavTitle:d.cb}})),o.a.createElement(d.X,{className:"c-d-md-down-none"}))});t.default=function(){var t=Object(c.g)(),e=Object(i.c)(function(e){return e.auth.user}),a=Object(i.c)(function(e){return e.auth.profile}),s=Object(i.c)(function(e){return e.project.projects}),n=Object(i.b)();return o.a.createElement("div",{className:"c-app c-default-layout"},o.a.createElement(P,{user:e,projects:s}),o.a.createElement("div",{className:"c-wrapper"},o.a.createElement(r,{handleLogout:function(e){e.preventDefault(),n(Object(f.h)(t))},user:a}),o.a.createElement("div",{className:"c-body"},o.a.createElement(b,null)),o.a.createElement(y,null)))}},1342:function(e,t,a){"use strict";a.r(t);var s=a(126),n=a.n(s),r=a(1),c=a.n(r),l=a(937),o=a(243),i=a(242),m=a.p+"digital.png",d=a.p+"iot.png",u=a.p+"smartIcon.png",f=a.p+"van.png",p=a.p+"pic.jpg",g=a(910);t.default=function(){var e=Object(r.useState)(!1),t=n()(e,2),e=t[0],a=t[1];return c.a.createElement("div",null,c.a.createElement("div",{className:"preloader"},c.a.createElement("div",{className:"loader"},c.a.createElement("div",{className:"ytp-spinner"},c.a.createElement("div",{className:"ytp-spinner-container"},c.a.createElement("div",{className:"ytp-spinner-rotator"},c.a.createElement("div",{className:"ytp-spinner-left"},c.a.createElement("div",{className:"ytp-spinner-circle"})),c.a.createElement("div",{className:"ytp-spinner-right"},c.a.createElement("div",{className:"ytp-spinner-circle"}))))))),c.a.createElement("section",{className:"header_area "},c.a.createElement(o.a,null),c.a.createElement("div",{id:"home",className:"header_hero bg-hero-pattern relative z-10 overflow-hidden lg:flex items-center transform skew-y-6"},c.a.createElement("div",{className:"container"},c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"w-full  mt-80 lg:mt-0 md:mt-80 py-5 lg:py-0 md:py-0"},c.a.createElement("div",{className:"header_hero_content align-bottom text-center"},c.a.createElement("h1",{className:"hero_title sm:mt-4 md:mt-4 sm:text-xl md:text-3xl lg:text-5xl xl:text-6xl font-extrabold text-white"},"TIES Advanced Logistics"),c.a.createElement("div",{className:"flex justify-center"},c.a.createElement("p",{style:{width:"50%",color:"#bfb8b8"},className:"mt-8 lg:mr-8 text-xl py-3"},"End-to-end BIM-based asset data intelligent management system using Digital Twins (DT) and Internet of Things (IoT) to transform Modern Methods of Construction (MMC), and improve Just in Time (JIT) delivery and construction/infrastructure productivity.")))))))),c.a.createElement("section",{className:"py-5 bg-white"},c.a.createElement("div",{className:"flex flex-row divide-x divide-green-500 justify-center text-center"},c.a.createElement("div",{className:"p-3 border-right mr-3 tools"},c.a.createElement("div",{className:"flex justify-center pb-2"},c.a.createElement("img",{src:m,alt:"iot",className:"img-responsive"})),c.a.createElement("span",{className:"text-xl"},"Digital twins")),c.a.createElement("div",{className:"p-3 border-right mr-3 tools"},c.a.createElement("div",{className:"flex justify-center pb-2"},c.a.createElement("img",{src:d,alt:"iot",className:"img-responsive"})),c.a.createElement("span",{className:"text-xl"},"Internet of things")),c.a.createElement("div",{className:"p-3 border-right mr-3 tools"},c.a.createElement("div",{className:"flex justify-center pb-2"},c.a.createElement("img",{src:u,alt:"iot",className:"img-responsive"})),c.a.createElement("span",{className:"text-xl"},"Smart planning")),c.a.createElement("div",{className:"p-3 tools"},c.a.createElement("div",{className:"flex justify-center pb-2"},c.a.createElement("img",{src:f,alt:"iot",className:"img-responsive"})),c.a.createElement("span",{className:"text-xl"},"Just in time delivery ")))),c.a.createElement(g.K,{show:e,onClose:function(){return a(!1)},className:"videoModal",size:"xl"},c.a.createElement(g.L,null,c.a.createElement(l.a,{embedId:"HyX210K6LVc"})," ")),c.a.createElement("section",{id:"about",className:"about_area pt-120 pb-120 relative bg-gray"},c.a.createElement("div",{className:"container"},c.a.createElement("div",{className:"row justify-end"},c.a.createElement("div",{className:"w-full lg:w-full md:w-full"},c.a.createElement("div",{className:"about_content mx-4 pt-11 lg:pt-15 lg:pb-15 text-center"},c.a.createElement("div",{className:"section_title pb-5"},c.a.createElement("h4",{className:"sub_title"},"About Us"),c.a.createElement("h4",{className:"main_title"},"End-to-end digital platform for asset management")),c.a.createElement("p",{className:"text-justify"},c.a.createElement("img",{src:p,alt:"about",className:"img-responsive shadow min-w-0 float-left m-4",style:{filter:"brightness(5px)"}}),c.a.createElement("span",{className:"pt-3"},c.a.createElement("span",{className:"text-lg"},"T"),"IES Advanced logistics project is a state-of-the-art advanced logistics system based on digital twin technology to revolutionise modern methods of construction and improve productivity. We are team of researchers at UWE Bristol, led by Professor Lamine Mahdjoubi investigating four key areas that can improve efficiency and quality within the construction industry: artificial intelligence data mining, advanced logistics, conversational artificial intelligence and quality assurance.")," "),c.a.createElement("p",{className:"mt-4 text-justify"},"UWE Bristol, led by Lamine Mahdjoubi, Professor of Digital Built Environment, delivered an end-to-end cloud-based advanced offsite logistics platform to track and visualise the status of an asset from early design to installation. The technology has a potential to be applied for project operation and maintenance, as well as decommissioning. The platform provides flexible and all-inclusive connected digital solutions by harnessing advances in the artificial intelligence, digital twin technology, and Internet of things.  It assists in smart planning of offsite logistics activities.  Above all, it ensures just-in-time delivery of manufactured items to construction sites.",c.a.createElement("p",{className:"pt-3 pb-3"}," The digital platform provides also a single source of truth and a common language of business. The advanced logistics digital platform confers the following key benefits: By harnessing advances in digital twin technology to gain insight about the latest status of an asset. By accessing the same version of truth, supply chain integration and coordination is significantly improved. Harmonisation of asset data and information is a key feature of advanced logistics, as it complies with the latest British Standards and standards set by the International Organisation for Standardisation. A personalised notification of decision-makers is critical to enable them to take appropriate actions based on the latest progress status of an asset. Thanks to its intuitive colour coding approach, it is easier to visualise the latest status of an asset and query the data. The platform assists in improved certainty of onsite delivery and address potential onsite space constraints performance. Easy generation of a QR code to tag and scan an asset, as well as track the status of the asset throughout project lifecycle. The adoption of Industry Foundation Classes (IFC) facilitates the seamless flow of asset data and information during project lifecycle. Using Artificial Intelligence to determine the optimum route for the delivery of an asset on time to a construction site, with minimum impact on carbon, cost and road users. The deliverables enable strategic planning and scenario planning for achieving a reduction in time, labour and transport cost and carbon footprint, as well as improvements in certainty and reliability of onsite delivery.  The project has six major outputs:")),c.a.createElement("div",{className:"row mt-4"},c.a.createElement("div",{className:"col-lg-2 h-4"},c.a.createElement("div",{className:"card shadow-sm p-3 text-responsive"},c.a.createElement("div",{className:"pb-2"},c.a.createElement("i",{className:"fa fa-check-circle text-red fa-2x"})),"TIES Asset Data Points (ADP)")),c.a.createElement("div",{className:"col-lg-2 h-4"},c.a.createElement("div",{className:"card shadow-sm p-3"},c.a.createElement("div",{className:"pb-2"},c.a.createElement("i",{className:"fa fa-check-circle text-red fa-2x"})),"TIES BIM Asset Tagging (BAT)")),c.a.createElement("div",{className:"col-lg-3 h-4"},c.a.createElement("div",{className:"card shadow-sm p-3 "},c.a.createElement("div",{className:"pb-2"},c.a.createElement("i",{className:"fa fa-check-circle text-red fa-2x"})),"Cloud-based TIES Advanced Logistics Dashboard (ALD)")),c.a.createElement("div",{className:"col-lg-3 h-2"},c.a.createElement("div",{className:"card shadow-sm p-3"},c.a.createElement("div",{className:"pb-2"},c.a.createElement("i",{className:"fa fa-check-circle text-red fa-2x"})),"TIES Advanced Logistics Smartphone App")),c.a.createElement("div",{className:"col-lg-2 h-2"},c.a.createElement("div",{className:"card shadow-sm p-3"},c.a.createElement("div",{className:"pb-2"},c.a.createElement("i",{className:"fa fa-check-circle text-red fa-2x"})),"TIES Optimised Asset Delivery Route (ODR)")))))))),c.a.createElement("section",{id:"features",className:"services_area pt-150 pb-120 bg-features bg-services z-10"},c.a.createElement("div",{className:"container z-20 bg-blend-difference"},c.a.createElement("div",{className:"row justify-center"},c.a.createElement("div",{className:"w-full lg:w-1/2"},c.a.createElement("div",{className:"section_title text-center pb-6"},c.a.createElement("h5",{className:"sub_title"},"What We Do"),c.a.createElement("h4",{className:"main_title text-white"},"Key Features")))),c.a.createElement("div",{className:"text-center text-wheat"},c.a.createElement("p",{className:"px-5 mx-4 mb-3 font-sm"},"The project is a part of TIES Living Lab, a transformative collaboration aimed at harnessing the vast quantities of intelligence that UK infrastructure projects generate to drive down delivery times, reduce carbon emissions and improve safety and skills for construction workers. We are committed to finding better ways of delivering high quality, cost-effective projects that also offer social value and are better for the environment.")),c.a.createElement("div",{className:"row justify-start px-4 mt-2"},c.a.createElement("div",{className:"w-full sm:w-10/12 md:w-6/12 lg:w-4/12 mt-10 mb-6"},c.a.createElement("div",{className:"flex items-start space-x-2 text-sm font-sm"},c.a.createElement("i",{className:"fa fa-brain fa-2x text-red"}),c.a.createElement("div",{className:"mx-4 text-justify"},c.a.createElement("h5",null,"Decision Making"),c.a.createElement("p",{className:"mt-2 mr-5 font-sm text-bl opacity-8"},"Gain powerful insight from Digital Twinning BIM and physical assets")))),c.a.createElement("div",{className:"w-full sm:w-10/12 md:w-6/12 lg:w-4/12 mt-10 mb-6"},c.a.createElement("div",{className:"flex items-start space-x-2 text-sm font-sm"},c.a.createElement("i",{className:"fa fa-link fa-2x text-red"}),c.a.createElement("div",{className:"mx-4 text-justify"},c.a.createElement("h5",null,"Integration/Coordination"),c.a.createElement("p",{className:"mt-2 mr-5 font-sm text-bl"},"Access to same version of reality to manage and keep track of an asset's journey")))),c.a.createElement("div",{className:"w-full sm:w-10/12 md:w-6/12 lg:w-4/12 mt-10 mb-6"},c.a.createElement("div",{className:"flex items-start space-x-2 text-sm font-sm"},c.a.createElement("i",{className:"fa fa-balance-scale fa-2x text-red"}),c.a.createElement("div",{className:"mx-4 text-justify"},c.a.createElement("h5",null,"Project Performance"),c.a.createElement("p",{className:"mt-2 mr-5 font-sm text-bl"},"Improved certainty of onsite delivery and onsite space constraints")))),c.a.createElement("div",{className:"w-full sm:w-10/12 md:w-6/12 lg:w-4/12 mt-10 mb-6"},c.a.createElement("div",{className:"flex items-start space-x-2 text-sm font-sm text-gray-500"},c.a.createElement("i",{className:"fa fa-code-branch fa-2x text-red"}),c.a.createElement("div",{className:"mx-4 text-justify"},c.a.createElement("h5",null,"Harmonisation"),c.a.createElement("p",{className:"mt-2 mr-5 font-sm text-bl"},"Asset data/information captured according to the latest BS and ISO standards")))),c.a.createElement("div",{className:"w-full sm:w-10/12 md:w-6/12 lg:w-4/12 mt-10 mb-6"},c.a.createElement("div",{className:"flex items-start space-x-2 text-sm font-sm text-gray-500"},c.a.createElement("i",{className:"fa fa-lightbulb fa-2x text-red"}),c.a.createElement("div",{className:"mx-4 text-justify"},c.a.createElement("h5",null,"Actionable Intelligence"),c.a.createElement("p",{className:"mt-2 mr-5 font-sm text-bl"},"Ability to deal with situation at hand and/or undertake corrective measures")))),c.a.createElement("div",{className:"w-full sm:w-10/12 md:w-6/12 lg:w-4/12 mt-10 mb-6"},c.a.createElement("div",{className:"flex items-start space-x-2 text-sm font-sm text-gray-500"},c.a.createElement("i",{className:"fa fa-chart-line fa-2x text-red"}),c.a.createElement("div",{className:"mx-4 text-justify"},c.a.createElement("h5",null,"Cognitive Visualisation"),c.a.createElement("p",{className:"mt-2 mr-5 font-sm text-bl"},"Colour coding to visualise latest asset status and ability to query data")))),c.a.createElement("div",{className:"w-full sm:w-10/12 md:w-6/12 lg:w-4/12 mt-10 mb-6"},c.a.createElement("div",{className:"flex items-start space-x-2 text-sm font-sm text-gray-500"},c.a.createElement("i",{className:"fa fa-cogs fa-2x text-red"}),c.a.createElement("div",{className:"mx-4 text-justify"},c.a.createElement("h5",null,"Benchmarking Intelligence"),c.a.createElement("p",{className:"mt-2 mr-5 font-sm text-bl"},"Tradeoff between delivery route, carbon footprint, cost, and disruption to road users")))),c.a.createElement("div",{className:"w-full sm:w-10/12 md:w-6/12 lg:w-4/12 mt-10 mb-6"},c.a.createElement("div",{className:"flex items-start space-x-2 text-sm font-sm text-gray-500"},c.a.createElement("i",{className:"fa fa-qrcode fa-2x text-red"}),c.a.createElement("div",{className:"mx-4 text-justify"},c.a.createElement("h5",null,"Asset Scanning"),c.a.createElement("p",{className:"mt-2 mr-5 font-sm text-bl"},"Easy and cost effective asset data tagging and scanning")))),c.a.createElement("div",{className:"w-full sm:w-10/12 md:w-6/12 lg:w-4/12 mt-10 mb-6"},c.a.createElement("div",{className:"flex items-start space-x-2 text-sm font-sm text-gray-500"},c.a.createElement("i",{className:"fa fa-retweet fa-2x text-red"}),c.a.createElement("div",{className:"mx-4 text-justify"},c.a.createElement("h5",null,"Asset data Flow"),c.a.createElement("p",{className:"mt-2 mr-5 font-sm text-bl"},"Seamless asset data flow throughout the project lifecycle"))))))),c.a.createElement("section",{id:"benefits",className:"services_area pt-150 pb-120 bg-gray"},c.a.createElement("div",{className:"container"},c.a.createElement("div",{className:"row justify-center"},c.a.createElement("div",{className:"w-full lg:w-1/2"},c.a.createElement("div",{className:"section_title text-center pb-6"},c.a.createElement("h5",{className:"sub_title"},"What to Expect"),c.a.createElement("h4",{className:"main_title"},"Potential Benefits")))),c.a.createElement("div",{className:"row justify-between"},c.a.createElement("div",{className:"w-full sm:w-10/12 md:w-6/12 lg:w-4/12 mt-10 mb-6 pr-2 pt-4 shadow-lg"},c.a.createElement("div",{className:"flex items-center text-sm font-medium text-gray-500 text-center"},c.a.createElement("div",{className:"flex-1 py-5"}," ",c.a.createElement("i",{className:"fa fa-chart-line fa-2x text-red"}),c.a.createElement("div",{className:"mx-4 text-justify"},c.a.createElement("h5",{className:"text-center mt-2"},"Better Productivity"),c.a.createElement("h1",{className:"text-center lg:text-5xl text-4xl text-red"},"+50%"))))),c.a.createElement("div",{className:"w-full sm:w-10/12 md:w-6/12 lg:w-4/12 mt-10 mb-6  pr-2 pt-4 shadow-lg"},c.a.createElement("div",{className:"flex items-center text-sm font-medium text-gray-500 text-center"},c.a.createElement("div",{className:"flex-1 py-5"}," ",c.a.createElement("i",{className:"fa fa-gas-pump fa-2x text-red"}),c.a.createElement("div",{className:"mx-4 text-justify"},c.a.createElement("h5",{className:"text-center mt-2"},"Fuel Emmissions"),c.a.createElement("h1",{className:"text-center text-5xl text-red"},"-20%"))))),c.a.createElement("div",{className:"w-full sm:w-10/12 md:w-6/12 lg:w-4/12 mt-10 mb-6 pr-2 pt-4 shadow-lg"},c.a.createElement("div",{className:"flex items-center text-sm font-medium text-gray-500 text-center"},c.a.createElement("div",{className:"flex-1 py-5"}," ",c.a.createElement("i",{className:"fa fa-money-check fa-2x text-red"}),c.a.createElement("div",{className:"mx-4 text-justify"},c.a.createElement("h5",{className:"text-center mt-2"},"Asset Operating Cost"),c.a.createElement("h1",{className:"text-center text-5xl text-red"},"-20%")))))),c.a.createElement("div",{className:"row justify-center"},c.a.createElement("div",{className:"w-full sm:w-10/12 md:w-6/12 lg:w-4/12 mt-10 mb-6 pr-2 pt-4 shadow-lg"},c.a.createElement("div",{className:"flex flex-col items-center text-sm font-medium text-gray-500 text-center"},c.a.createElement("div",null," ",c.a.createElement("i",{className:"fa fa-money-bill-wave fa-2x text-red"}),c.a.createElement("div",{className:"mx-4 text-justify"},c.a.createElement("h5",{className:"text-center mt-2"},"Project Cost"),c.a.createElement("h1",{className:"text-center text-5xl text-red"},"-10%"))))),c.a.createElement("div",{className:"w-full sm:w-10/12 md:w-6/12 lg:w-8/12 mt-10 mb-6 pr-2 pt-4 shadow-lg"},c.a.createElement("div",{className:"flex items-center text-sm font-medium text-gray-500 text-center"},c.a.createElement("div",{className:"flex-1"}," ",c.a.createElement("i",{className:"fa fa-hourglass fa-2x text-red"}),c.a.createElement("div",{className:"mx-4 text-justify"},c.a.createElement("h5",{className:"text-center mt-2"},"Time Saving"))),c.a.createElement("div",{className:"flex-1 items-center text-sm font-bold text-lg  text-gray-500"},c.a.createElement("ul",{className:"text-justify"},c.a.createElement("li",null,c.a.createElement("i",{className:"fa fa-check pr-2 text-red"})," -22% pre-project planning"),c.a.createElement("li",null,c.a.createElement("i",{className:"fa fa-check pr-2 text-red"})," -75% generating reports"),c.a.createElement("li",null,c.a.createElement("i",{className:"fa fa-check pr-2 text-red"})," -90% document transmittals"),c.a.createElement("li",null,c.a.createElement("i",{className:"fa fa-check pr-2 text-red"})," +50% productivity gains")))))))),c.a.createElement("section",{id:"video",className:"about_area pb-120 pt-120 relative"},c.a.createElement("div",{className:"container"},c.a.createElement("iframe",{width:"100%",height:"500",style:{border:"5px solid rgba(251, 251, 255, var(--tw-bg-opacity)",borderRadius:"5px"},src:"https://www.youtube.com/embed/HyX210K6LVc"}))),c.a.createElement(i.a,null),c.a.createElement("a",{href:"#",className:"scroll-top"},c.a.createElement("i",{className:"fa fa-chevron-up"})))}},912:function(e,x,N){"use strict";!function(t){N.d(x,"k",function(){return s}),N.d(x,"h",function(){return o}),N.d(x,"d",function(){return i}),N.d(x,"l",function(){return m}),N.d(x,"g",function(){return d}),N.d(x,"i",function(){return u}),N.d(x,"a",function(){return f}),N.d(x,"c",function(){return p}),N.d(x,"j",function(){return g}),N.d(x,"f",function(){return h}),N.d(x,"e",function(){return E}),N.d(x,"b",function(){return b}),N.d(x,"m",function(){return y}),N.d(x,"n",function(){return v});var e=N(916),n=N.n(e),r=N(244),e=N(922),a=N(936),c=N(5),l=e.a.BASE_API_URL;function s(e){return{type:c.mb,user:e}}function o(t){return function(e){localStorage.removeItem("x-access-token"),localStorage.removeItem("user"),Object(a.a)(!1),e(s({})),t.push("/login"),r.b.success("You have logged out successfully")}}function i(e){return function(t){return n.a.get(l+"/model-components/model/"+e).then(function(e){return t((e=e.data.data,{type:c.M,data:e}))}).catch(function(e){t({type:c.N,message:e})})}}function m(e,a,s){return function(t){return t({type:c.rb}),n.a.put(l+"/model-components/".concat(s),a).then(function(e){r.b.success("Update completely successfully"),t((e=e.data.message,{type:c.tb,message:e,data:a,id:s}))}).catch(function(e){e=e.response.data.errors?e.response.data.errors.message:e.response.data.error;t({type:c.sb,error:e}),r.b.error(e)})}}function d(e){return function(a){return a({type:c.db}),n.a.post(l+"/invite-user",e).then(function(e){var t;r.b.success("Invite sent successfully"),a((t="Invite sent successfully",e=e.data.data,{type:c.fb,message:t,data:e}))}).catch(function(e){e=(e.response.data.errors||e.response.data).message;a({type:c.eb,error:e}),r.b.error(e)})}}function u(e){return function(a){return a({type:c.gb}),n.a.post(l+"/remove-user",e).then(function(e){var t;r.b.success("User removed from project successfully"),a((t="User removed from project successfully",e=e.data.data,{type:c.ib,message:t,data:e}))}).catch(function(e){e=(e.response.data.errors||e.response.data).message;a({type:c.hb,error:e}),r.b.error(e)})}}function f(e){return function(t){return t({type:c.j}),n.a.put(l+"/users/password",e).then(function(e){204===e.status&&(r.b.success("Password changed successfully"),t({type:c.l,message:"Password changed successfully"}))}).catch(function(e){e=(e.response.data.errors||e.response.data).message;t({type:c.k,error:e}),r.b.error(e)})}}function p(e){return function(t){return t({type:c.E}),n.a.post(l+"/password/request-reset",e).then(function(e){r.b.success(e.data.message),t((e=e.data.message,{type:c.G,message:e}))}).catch(function(e){e.response.data.errors,e=e.response.data.message;t({type:c.F,error:e}),r.b.error(e)})}}function g(e,a){return function(t){return t({type:c.jb}),n.a.post(l+"/reset-password",e).then(function(e){r.b.success("Password reset successful"),t({type:c.lb,message:"Password reset successful"}),a.push("/login")}).catch(function(e){e.response.data.errors,e=e.response.data.message;t({type:c.kb,error:e}),r.b.error(e)})}}function h(){return function(a){return a({type:c.X}),n.a.get(l+"/users").then(function(e){var t;a((t=e.data.data,e=e.data.message,{type:c.Z,data:t,message:e}))}).catch(function(e){e.response.data.errors,e=e.response.data.message;a({type:c.Y,error:e})})}}function E(e){return function(a){return a({type:c.ab}),n.a.get(l+"/user/"+e).then(function(e){var t;a((t=e.data.data,e=e.data.message,{type:c.cb,data:t,message:e}))}).catch(function(e){e.response.data.errors,e=e.response.data.message;a({type:c.bb,error:e})})}}function b(s){return function(a){return a({type:c.v}),n.a.delete(l+"/user/".concat(s)).then(function(e){var t;a((t="User deleted successfully",{type:c.x,id:s,message:t})),r.b.success("User deleted successfully")}).catch(function(e){t.log(e.response);e.response.data.errors,e=e.response.data.message;a({type:c.w,error:e}),r.b.error(e)})}}function y(e,s){return function(a){return a({type:c.Db}),n.a.put(l+"/user/".concat(s),e).then(function(e){var t;a((t="User updated successfully",e=e.data.data,{type:c.Ib,message:t,data:e,id:s})),r.b.success("User updated successfully")}).catch(function(e){e.response.data.errors,e=e.response.data.message;a({type:c.Eb,error:e}),r.b.error(e)})}}function v(e,s){return function(a){return a({type:c.Fb}),n.a.put(l+"/user/".concat(s),e).then(function(e){var t;a((t="User updated successfully",e=e.data.data,{type:c.Hb,message:t,data:e,id:s})),r.b.success("User updated successfully")}).catch(function(e){e.response.data.errors,e=e.response.data.message;a({type:c.Gb,error:e}),r.b.error(e)})}}}.call(this,N(43))},922:function(e,t,a){"use strict";t.a={BASE_API_URL:"https://firebimapi.herokuapp.com/api/"}},929:function(e,p,g){"use strict";!function(n){g.d(p,"e",function(){return t}),g.d(p,"a",function(){return a}),g.d(p,"g",function(){return s}),g.d(p,"b",function(){return i}),g.d(p,"h",function(){return m}),g.d(p,"f",function(){return d}),g.d(p,"c",function(){return u}),g.d(p,"d",function(){return f});var e=g(916),r=g.n(e),c=g(244),e=g(922),l=g(5),o=e.a.BASE_API_URL;function t(){return function(a){return a({type:l.R}),r.a.get(o+"/project/aspec/models").then(function(e){var t;n.log(e),a((t=e.data.data.models,e=e.data.message,{type:l.T,projects:t,message:e}))}).catch(function(e){n.log(e.response),a((e=e.message,{type:l.S,error:e}))})}}function a(e){return function(a){return a({type:l.g}),r.a.post(o+"/projects",JSON.stringify(e),{headers:{"Content-Type":"application/json"}}).then(function(e){var t;a((t=e.data.data,e="Project created successfully",{type:l.i,project:t,message:e})),c.b.success("Project created successfully")}).catch(function(e){e=e.response.data.error||e.response.data.message;a({type:l.h,error:e}),c.b.error(e)})}}function s(s,e){return function(a){return a({type:l.xb}),r.a.put(o+"/project/"+s,e,{headers:{"Content-Type":"application/json"}}).then(function(e){var t;a((t=e.data.data.project,e="Project updated successfully",{type:l.Cb,project:t,id:s,message:e})),c.b.success("Project updated successfully")}).catch(function(e){e=e.response.data.error||e.response.data.message;a({type:l.yb,error:e}),c.b.error(e)})}}function i(s){return function(a){return a({type:l.s}),r.a.delete(o+"/project/".concat(s)).then(function(e){var t;a((t="Project deleted successfully",{type:l.u,message:t,id:s})),c.b.success("Project deleted successfully")}).catch(function(e){e=(e.response.data.errors||e.response.data).message;a({type:l.t,error:e}),c.b.error(e)})}}function m(e){return function(t){return t({type:l.Jb}),r.a.post(o+"/models",e,{headers:{"Content-Type":"multipart/form-data"}}).then(function(e){t({type:l.Ob,message:"Model uploaded successfully"}),c.b.success("Model uploaded successfully")}).catch(function(e){e.response.data.errors,e=e.response.data.message;t({type:l.Nb,error:e}),c.b.error(e)})}}function d(e,a){return function(t){return t({type:l.zb}),r.a.put(o+"/model/"+e,a,{headers:{"Content-Type":"multipart/form-data"}}).then(function(e){t({type:l.Bb,message:"Updated completed successfully"}),c.b.success("Updated completed successfully")}).catch(function(e){e.response.data.errors,e=e.response.data.message;t({type:l.Ab,error:e}),c.b.error(e)})}}function u(e,s){return function(a){return a({type:l.y}),c.b.success("Download started! Please wait..."),r.a.get(o+"/model/download/"+e).then(function(e){c.b.success("Downloading file..");var t=document.createElement("a");t.target="_blank",t.download=s,t.href=URL.createObjectURL(new Blob([e.data,{type:"octet/stream"}])),t.click(),c.b.success("Download successful"),a({type:l.D,message:"Download successful"})}).catch(function(e){e.response.data.errors,e=e.response.data.message;a({type:l.C,error:e}),c.b.error("download failed")})}}function f(s){return function(a){return a({type:l.U}),r.a.get(o+"/project/".concat(s,"/users")).then(function(e){var t;n.log(e.data.data.length),e&&e.data.data&&1<e.data.data.length&&a((t=e.data.data,e="Project users fetched successfully",{type:l.W,users:t,id:s,message:e}))}).catch(function(e){e=(e.response.data&&e.response.data.message?e.response.data.errors:e.response.data).message;n.log(e),c.b.error(e)})}}}.call(this,g(43))},936:function(e,t,a){"use strict";var s=a(916),n=a.n(s);t.a=function(e){e?n.a.defaults.headers.common["x-access-token"]=e:delete n.a.defaults.headers.common["x-access-token"]}},937:function(e,t,a){"use strict";var s=a(1),n=a.n(s),r=a(76),s=function(e){e=e.embedId;return n.a.createElement("div",{className:"video-responsive"},n.a.createElement("iframe",{src:"https://www.youtube.com/embed/".concat(e),frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0,title:"Embedded youtube"}))};s.propTypes={embedId:a.n(r).a.string.isRequired},t.a=s}}]);