// /////////////////////////////////////////////////////////////////////
// // Copyright (c) Autodesk, Inc. All rights reserved
//
// let viewer;
//
// function showModel(urn, dataset, dataset2) {
//   const options = {
//     env: 'AutodeskProduction',
//     getAccessToken: getForgeToken
//   };
//
//   Autodesk.Viewing.HTTP_REQUEST_HEADERS = {
//     "If-Modified-Since": moment().subtract('1', 'minutes')._d //"Sat, 29 Oct 1994 19:43:31 GMT"
//   };
//   console.log(moment().subtract('2', 'minutes')._d);
//   Autodesk.Viewing.Initializer(options, function () {
//     viewer = new Autodesk.Viewing.Private.GuiViewer3D(document.getElementById('forgeViewer'), {});
//     viewer.start();
//     Autodesk.Viewing.theExtensionManager.registerExtension('TIESExtension', TIESExtension);
//     Autodesk.Viewing.Document.load('urn:' + urn, onSuccess(dataset, dataset2), onDocumentLoadFailure);
//   });
// }
//
// function changeColor(result, dataset, dbId) {
//   let result3 = dataset.find(e => e["TIES_0105_DesPh_UniqueAssetID"] === result.displayValue);
//   const color = getElementColor(result3['TIES_0116_DesPh_Status']);
//   viewer.setThemingColor(dbId, color);
//
// }
//
// function getParentProperties(dbId, parentId, dataset2){
//   let instanceTree = viewer.model.getData().instanceTree;
//
//   viewer.getProperties(parentId, (objProps) => {
//
//     let result = objProps.properties.find(x => x.displayName === "TIES_0116_DesPh_Status");
//     if(result === undefined){
//       let gParentId = instanceTree.getNodeParentId(parentId);
//       viewer.getProperties(gParentId, (objProps) => {
//         let result = objProps.properties.find(x => x.displayName === "TIES_0116_DesPh_Status");
//         if(result === undefined){
//           return
//         } else{
//           let checkUnique = objProps.properties.find(x => x.displayName === "TIES_0105_DesPh_UniqueAssetID");
//           changeColor(checkUnique, dataset2, dbId);
//           // updateComponent(checkUnique.displayValue, "viewer_id"+'=\"'+ dbId+ '\"');
//         }
//
//       })
//     } else{
//       let checkUnique = objProps.properties.find(x => x.displayName === "TIES_0105_DesPh_UniqueAssetID");
//       changeColor(checkUnique, dataset2, dbId);
//       // updateComponent(checkUnique.displayValue, "viewer_id"+'=\"'+ dbId+ '\"');
//     }
//   })
//   return;
// }
//
// function onSuccess(dataset, dataset2){
//
//   function onDocumentLoadSuccess(doc) {
//
//     const node = doc.getRoot().getDefaultGeometry();
//     if (node) {
//       viewer.setSelectionMode(Autodesk.Viewing.SelectionMode.LAST_OBJECT);
//       viewer.loadDocumentNode(doc, node);
//       viewer.loadExtension('TIESExtension');
//       viewer.impl.sceneUpdated(true);
//       viewer.addEventListener(Autodesk.Viewing.OBJECT_TREE_CREATED_EVENT, async function () {
//
//         let instanceTree = viewer.model.getData().instanceTree;
//
//
//         viewer.setThemingColor(925, new THREE.Vector4(1.000, 0.255, 0.212,1));
//         let result = [];
//         dataset.map((item => {
//
//           let dbId  = item.objectid;
//
//           //[TODO] to be deleted if not needed
//           let re = new RegExp("^IFC.*Schedule$", "i");
//           // console.log(dbId, item.properties);
//           for (let prop in item.properties){
//             if(re.test(prop)){
//
//               let result3 = dataset2.find(e => e["TIES_0105_DesPh_UniqueAssetID"] === item.properties[prop]['TIES_0105_DesPh_UniqueAssetID']);
//               // if(!!result3){
//               // console.log(true, result3['TIES_0105_DesPh_UniqueAssetID']);
//               // updateComponent(result3['TIES_0105_DesPh_UniqueAssetID'], "viewer_id"+'=\"'+ dbId+ '\"')
//               // }
//               if(!!item.properties[prop]['TIES_0105_DesPh_UniqueAssetID']){
//
//                 // result.push({"viewerId": dbId, "assetId": item.properties[prop]['TIES_0105_DesPh_UniqueAssetID']});
//                 const color = getElementColor(result3['TIES_0116_DesPh_Status']);
//                 if(color !== 'N/A'){
//                   viewer.setThemingColor(dbId, color);
//                 }
//               }
//             }
//             else{
//               let parentId = instanceTree.getNodeParentId(dbId);
//               getParentProperties(dbId, parentId, dataset2);
//
//             }
//           }
//
//         }));
//         // console.log(result);
//         // updateModelDB(result).then(res => {
//         //   console.log(res);
//         // });
//       });
//
//
//     } else {
//       console.warn('No viewable found');
//     }
//
//   }
//   return onDocumentLoadSuccess;
//
// }
//
//
// function getElementColor(displayValue) {
//   let displayColor;
//   switch (displayValue) {
//     case "N/A":
//       displayColor = null;
//       break;
//     case "Manufactured":
//       displayColor = new THREE.Vector4(1.000, 0.522, 0.106, 1);
//       break;
//     case  "In storage":
//       displayColor = new THREE.Vector4(1.000, 0.255, 0.212,1);
//       break;
//     case "In transit":
//       displayColor = new THREE.Vector4(0.694, 0.051, 0.788,1);
//       break;
//     case "Pre-manufactured":
//       displayColor = new THREE.Vector4(1.000, 0.863, 0.000, 1);
//       break;
//     case "Offloaded onsite":
//       displayColor = new THREE.Vector4(0.004, 1.000, 0.439,1);
//       break;
//     case "Installed onsite":
//       displayColor = new THREE.Vector4(0,0.5,0,1);
//   }
//   return displayColor;
// }
//
// function onDocumentLoadFailure(err) {
//   console.error('Could not load document: ' + err);
// }
//
//
// //////////////////////////////////////////////////////////////////////////
// // TIES Extension
// //////////////////////////////////////////////////////////////////////////
//
// function TIESExtension(viewer, options) {
//   console.log('loading ties extension');
//   Autodesk.Viewing.Extension.call(this, viewer, options);
// }
//
// TIESExtension.prototype.load = function() {
//
//   if (viewer.toolbar) {
//     // Toolbar is already available, create the UI
//     console.log("bind selecton");
//     this.createUI();
//     this.onSelectionBinded = this.onSelectionEvent.bind(this);
//     viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, this.onSelectionBinded);
//
//   } else {
//     // Toolbar hasn't been created yet, wait until we get notification of its creation
//     this.onToolbarCreatedBinded = this.onToolbarCreated.bind(this);
//     viewer.addEventListener(Autodesk.Viewing.TOOLBAR_CREATED_EVENT, this.onToolbarCreatedBinded);
//     this.onSelectionBinded = this.onSelectionEvent.bind(this);
//     viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, this.onSelectionBinded);
//   }
//   return true;
//
// };
//
// TIESExtension.prototype.onToolbarCreated = function() {
//
//   this.viewer.removeEventListener(Autodesk.Viewing.TOOLBAR_CREATED_EVENT, this.onToolbarCreatedBinded);
//   this.onToolbarCreatedBinded = null;
//   this.createUI();
//   eventFire(document.getElementById('color-button'), 'click');
// };
//
// function search(nameKey, myArray){
//   for (let i=0; i < myArray.length; i++) {
//     if (myArray[i].displayName === nameKey) {
//       return myArray[i].displayValue;
//     }
//   }
// }
//
// function createPropertyPanel(viewer, container, id, title){
//
//   class CustomPropertyPanel extends Autodesk.Viewing.UI.PropertyPanel {
//     constructor(viewer, container, id, title, options) {
//       super(container, id, title, options);
//       this.viewer = viewer;
//       // this.container.style.top = "10px";
//       // this.container.style.left = "10px";
//       // this.container.style.width = "100%";
//       // this.container.style.height = "50%";
//       // this.container.style.resize = "auto";
//     }
//   }
//   let panel = new CustomPropertyPanel(viewer, container, id, title);
//
//   return panel;
//
// }
//
// function createPanel(components, uniqueId, dbId){
//   // console.log(components, '..components');
//   const panel2 = createPropertyPanel(viewer, viewer.container, 'propertyPanel', 'Properties');
//   for (let item in components){
//     let re2 = new RegExp("^https", "i");
//
//     if(re2.test(components[item])){
//       panel2.addProperty(item, '<span id="'+ item +'">'+ components[item]+' </span><img src="../images/edit1.png" class="edit" onclick="showEdit(\'' + item +','+ components[item]+ '\');" />' , components["TIES_0101_DesPh_Category"]);
//     } else{
//       panel2.addProperty(item, '<span id="'+ item +'">'+ components[item]+' </span><img src="../images/edit1.png" class="edit" onclick="showEditInput(\'' + item +','+ components[item]+ '\');" />', components["TIES_0101_DesPh_Category"]);
//     }
//   }
//   panel2.addProperty('', '<button class="viewerSubmit" type="submit" onclick="submitForm(\'' + uniqueId +','+ dbId +'\')">Submit</button>', '');
//   viewer.setPropertyPanel(panel2);
//   panel2.setVisible(true);
//
// }
//
// TIESExtension.prototype.onSelectionEvent = async function(event) {
//
//   let currSelection = viewer.getSelection();
//   console.log(currSelection[0]);
//
//   viewer.getProperties(currSelection[0], async function (obj) {
//
//     let uniqueId = obj.properties.find(x=> x.displayName === 'TIES_0105_DesPh_UniqueAssetID');
//
//     if(!!uniqueId){
//       let components = await getComponent(uniqueId.displayValue);
//       createPanel(components[0], uniqueId.displayValue, currSelection[0]);
//     } else{
//       console.log("use default panel");
//       // viewer.removePropertyPanel()
//       console.log(viewer.getPropertyPanel());
//
//     }
//
//   });
//
// };
//
//
// function showEditInput(displayVal) {
//
//   let display = displayVal.split(',');
//
//   if(document.getElementById(display[0]).firstChild.nodeType === 3){
//     document.getElementById(display[0]).innerHTML = '<input class="viewerInput" id='+ display[0] +' value='+display[1]+' />';
//   } else{
//     document.getElementById(display[0]).innerHTML = display[1];
//   }
//   return;
// }
// function showEdit(displayVal){
//
//   let display = displayVal.split(',');
//   if(document.getElementById(display[0]).firstChild.nodeType === 3) {
//     document.getElementById(display[0]).innerHTML = '<textarea class="viewerInput" id=' + display[0]+'>'+display[1]+'</textarea>';
//   } else {
//     document.getElementById(display[0]).innerHTML = display[1];
//   }
//   return
// }
//
//
// async function submitForm(id) {
//   let ids = id.split(',');
//   let el = document.getElementsByClassName('viewerInput');
//   let results = [];
//   let results2 = [];
//   if(el.length > 0){
//     for (let element in el){
//       if(el[element].id !== undefined){
//         let result = el[element].id+ '=\"'+el[element].value + '\"';
//         results2.push(el[element].id+ ','+ el[element].value);
//         results.push(result);
//       }
//
//     }
//
//     updateComponent(ids[0], results.toString()).then(async (res) => {
//
//       let components = await getComponent(ids[0]);
//       createPanel(components[0], ids[0]);
//       if(results2.length > 0){
//         for(let item in results2){
//           showEditInput(results2[item]);
//         }
//       }
//       // [TODO!!] the color to be set when state is managament is handling component selection
//       // if(!!components["TIES_0116_DesPh_Status"] && components["TIES_0116_DesPh_Status"] !== "undefined"){
//       //   viewer.setThemingColor(ids[1] ,getElementColor(components["TIES_0116_DesPh_Status"]))
//       // }
//       $.notify(res.data, 'success');
//     }).catch(err =>{
//       console.log(err);
//     });
//
//   }
//   return
//
// }
//
//
//
// function extractComponentName (name){
//   let submatch;
//   // eslint-disable-next-line no-useless-escape
//   const matches = name.split(/[\[\]]+/);
//   if (matches) {
//     submatch = matches[0];
//   }
//
//   return submatch;
// }
//
// TIESExtension.prototype.unload = function() {
//   alert('MyTIESExtension is now unloaded!');
//   return true;
// };
//
// function TIESPanel(viewer, container, id, title, options) {
//   this.viewer = viewer;
//   Autodesk.Viewing.UI.DockingPanel.call(this, container, id, title, options);
//
//   // the style of the docking panel
//   // use this built-in style to support Themes on Viewer 4+
//   this.container.classList.add('docking-panel-container-solid-color-a');
//   this.container.style.top = "10px";
//   this.container.style.left = "10px";
//   this.container.style.width = "auto";
//   this.container.style.height = "auto";
//   this.container.style.resize = "auto";
//
//   // this is where we should place the content of our panel
//   var div = document.createElement('div');
//   div.style.margin = '20px';
//   div.innerText = "My content here";
//   this.container.appendChild(div);
//   // and may also append child elements...
//
// }
//
//
// TIESExtension.prototype.createUI = function() {
//   // create color panel
//   class ColorCodePanel extends Autodesk.Viewing.UI.PropertyPanel {
//     constructor(viewer, container, id, title, options) {
//       super(container, id, title, options);
//       this.viewer = viewer;
//
//       this.createTextBox = function () {
//         let textBox = document.createElement('div');
//         textBox.setAttribute("id", "colorForm");
//         textBox.innerHTML = 'hello';
//         // let table = generateTable();
//         return textBox;
//       };
//       const colorBox = this.createTextBox();
//       this.container.appendChild(colorBox);
//       this.container.style.height = '350px';
//
//     }
//   }
//
//
//   let button = new Autodesk.Viewing.UI.Button('color-button');
//   button.addClass('pallete');
//   // button.id = 'palette';
//   button.setToolTip('Color Pallete');
//   button.onClick = function (e) {
//
//     if (this._panel == null) {
//       this._panel = new ColorCodePanel(viewer, viewer.container, 'ColorCodePanel', 'Color Code');
//       this._panel.addProperty('Pre-manufactured', '<div class="box yellow"></div>', 'Category');
//       this._panel.addProperty('Manufactured', '<div class="box orange"></div>', 'Category');
//       this._panel.addProperty('In Storage', '<div class="box red"></div>', 'Category');
//       this._panel.addProperty('In Transit', '<div class="box purple"></div>', 'Category');
//       this._panel.addProperty('Offloaded Onsite', '<div class="box lime"></div>', 'Category');
//       this._panel.addProperty('Installed Onsite', '<div class="box green"></div>', 'Category');
//     }
//     // viewer.setPropertyPanel(this._panel);
//     // Show/hide docking panel
//     this._panel.setVisible(!this._panel.isVisible());
//     // If panel is NOT visible, exit the function
//     if (!this._panel.isVisible())
//       return;
//
//
//   }
//
//   let buttonRefresh = new Autodesk.Viewing.UI.Button('reload-button');
//   buttonRefresh.addClass('reload');
//   buttonRefresh.setToolTip('Reload Model');
//   buttonRefresh.onClick = function (e) {
//     location.reload();
//     return false;
//   }
//
//   this.subToolbarUpdate = new Autodesk.Viewing.UI.ControlGroup('my-update-toolbar');
//   this.subToolbarUpdate.addControl(button);
//
//   this.subToolbarRefresh = new Autodesk.Viewing.UI.ControlGroup('my-refresh-toolbar');
//   this.subToolbarRefresh.addControl(buttonRefresh);
//
//
//   viewer.toolbar.addControl(this.subToolbarUpdate);
//   viewer.toolbar.addControl(this.subToolbarRefresh);
//
//
// };
//
// function eventFire(el, etype){
//   if (el.fireEvent) {
//     el.fireEvent('on' + etype);
//   } else {
//     let evObj = document.createEvent('Events');
//     evObj.initEvent(etype, true, false);
//     el.dispatchEvent(evObj);
//   }
// }
//
// function generateTable() {
//
//   const values = {
//     "Pre-manufactured": "#F9E79F",
//     "Manufactured": "#F39C12",
//     "In Storage": "#E74C3C",
//     "In Transit": "#6C3483",
//     "Offloaded Onsite": "#3EBB20",
//     "Installed Onsite": "#1E8449"
//   };
//   let table = createTableHead();
//   table.id = 'colorTable'
//   let tbody = table.createTBody();
//   for (let element in values) {
//     let row = tbody.insertRow();
//     let cell = row.insertCell();
//     let cell2 = row.insertCell();
//     let text1 = document.createTextNode(element)
//     let text = document.createTextNode(values[element]);
//     cell.appendChild(text1);
//     cell2.appendChild(text);
//   }
//   return table;
//
// }
//
// function createTableHead() {
//   let table = document.createElement('table');
//   table.id = "colorTable";
//   let thead = table.createTHead();
//   let row = thead.insertRow();
//   let th = document.createElement('th');
//   let node = document.createTextNode("Category");
//   let th2 = document.createElement('th');
//   let node2 = document.createTextNode("Pattern");
//   th.appendChild(node);
//   th2.appendChild(node2);
//   row.appendChild(th);
//   row.appendChild(th2);
//   return table;
// }
//
// function statusCallback(completed, message) {
//   console.log(message);
//
// }
//
