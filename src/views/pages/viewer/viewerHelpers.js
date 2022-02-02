import $ from 'jquery';
import { CDataTable } from '@coreui/react';
import Client from './Client';
window.$ = $;
const Autodesk = window.Autodesk;
/////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
/////////////////////////////////////////////////////////////////////


let viewer;

let getToken = { accessToken: Client.getaccesstoken() };
export const properties = {};


function launchViewer(div, urn, setModelProperties) {
  getToken.accessToken.then(token => {
   
    const options = {
      document: 'urn:' + urn,
      env: 'AutodeskProduction',
      accessToken: token.access_token,
      refreshToken: getToken
    };

    const viewerElement = document.getElementById(div);
    viewer = new Autodesk.Viewing.Private.GuiViewer3D(viewerElement, {});
    Autodesk.Viewing.theExtensionManager.registerExtension('FIREBIMExtension', FIREBIMExtension);
    Autodesk.Viewing.Initializer(options, function() {
      viewer.initialize();
      viewer.prefs.tag('ignore-producer');
      loadDocument(options.document, setModelProperties);
    });
  });
}

function loadDocument(documentId,  setModelProperties) {
  const properties = [];
  Autodesk.Viewing.Document.load(
    documentId,
    function(doc) {
      // onLoadSuccessCallback
      let geometryItems = Autodesk.Viewing.Document.getSubItemsWithProperties(
        doc.getRootItem(),
        { type: 'geometry' },
        true
      );
      if (geometryItems.length > 0) {
        viewer.load(doc.getViewablePath(geometryItems[0])); // show 1st view on this document...
      }
      viewer.loadExtension('FIREBIMExtension');
      viewer.addEventListener(Autodesk.Viewing.OBJECT_TREE_CREATED_EVENT, function () {
        // console.log("loaded successfully");
      
        getAllLeafComponents(viewer, function (dbIds) {
          viewer.model.getBulkProperties(dbIds, ['Category','Fire Rating'],
          function(elements){
            for(let i=0; i< elements.length; i++) {
              let nodeName = viewer.model.getInstanceTree().getNodeName(elements[i].dbId);
              properties.push({id: i+1, component: nodeName, category: elements[i].properties[0]!== undefined ? elements[i].properties[0].displayValue.replace('Revit', '').replace(/\s/g,''): '', rating: elements[i].properties[1] !== undefined ? elements[i].properties[1].displayValue: ''})
              setModelProperties(properties);
             
              
            }
            createTable(properties);
            // setModelProperties(properties)
            // return properties
          })
         
          // virtual project community center
          // warick street, newcastle upon tyne, ne2 1aq, united kingdom
          // client saiwill
        })
    
      });
    },
    function(errorMsg) {
      console.log(errorMsg);
    }
  );
}


function createTable (properties){
  let table1 = document.createElement("table");
  generateTableHead(table1, "id", "Category", "Component", "Fire Rating");
  let tbody1 = table1.createTBody();
  addTableData(tbody1, properties);
  document.getElementById("table").appendChild(table1);
}

function generateTableHead(table, tH1, tH2, tH3, tH4) {
  // console.log(tH4 === undefined);
  let thead = table.createTHead();
  let row = thead.insertRow();
  row.className = "ecHead";
  let th = document.createElement("th");

  let th2 = document.createElement("th");
  let th3 = document.createElement("th");
  let th4 = document.createElement("th");
  let text = document.createTextNode(tH1);
  let text2 = document.createTextNode(tH2);
  let text3 = document.createTextNode(tH3);
  let text4 = document.createTextNode(tH4);
  th.appendChild(text);
  th2.appendChild(text2);
  th3.appendChild(text3);
  th4.appendChild(text4);
  row.appendChild(th);
  row.appendChild(th2);
  row.appendChild(th3);
  if(tH4 !== undefined && tH4 !== undefined){
    row.appendChild(th4);
  }
}

function addTableData(tbody, data){

  for (var i=0; i <data.length; i++){
    console.log(data[i])
    let tr = document.createElement("tr");
    tr.className = "ecRow";
    let td = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let text = document.createTextNode(data[i].id);
    let text2 = document.createTextNode(data[i].category);
    let text3 = document.createTextNode(data[i].component);
    let text4 = document.createTextNode(data[i].rating);
    td.appendChild(text);
    td.id = data[i].id;
    td2.appendChild(text2);
    td3.appendChild(text3);
    td4.appendChild(text4);
    tr.appendChild(td);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    const viewerId = "[" + data[i].component.split('[')[1];
    tr.onclick = function() {
      viewer.select([378747]);
    }
    tbody.appendChild(tr);
  }
 
}


function getAllLeafComponents(viewer, callback) {
  let cbCount = 0; // count pending callbacks
  let components = []; // store the results
  let tree; // the instance tree

  function getLeafComponentsRec(parent) {
    cbCount++;
    if (tree.getChildCount(parent) != 0) {
      tree.enumNodeChildren(parent, function (children) {
        getLeafComponentsRec(children);
      }, false);
    } else {
      components.push(parent);
    }

    if (--cbCount == 0) callback(components);
  }
  viewer.getObjectTree(function (objectTree) {
    tree = objectTree;
    let allLeafComponents = getLeafComponentsRec(tree.getRootId());
  });
}


function statusCallback(completed, message) {
  console.log(message);
  // $.notify(message, { className: "info", position:"bottom right" });
}



function FIREBIMExtension(viewer, options) {
  console.log('FIREBIM extension');
  Autodesk.Viewing.Extension.call(this, viewer, options);
}

FIREBIMExtension.prototype.load = function() {
  if (viewer.toolbar) {
    // Toolbar is already available, create the UI
    this.createUI();
    this.onSelectionBinded = this.onSelectionEvent.bind(this);
    viewer.addEventListener(
      Autodesk.Viewing.SELECTION_CHANGED_EVENT,
      this.onSelectionBinded
    );
  } else {
    // Toolbar hasn't been created yet, wait until we get notification of its creation
    this.onToolbarCreatedBinded = this.onToolbarCreated.bind(this);
    viewer.addEventListener(
      Autodesk.Viewing.TOOLBAR_CREATED_EVENT,
      this.onToolbarCreatedBinded
    );
  }
  return true;
};

FIREBIMExtension.prototype.onToolbarCreated = function() {
  this.viewer.removeEventListener(
    Autodesk.Viewing.TOOLBAR_CREATED_EVENT,
    this.onToolbarCreatedBinded
  );
  this.onToolbarCreatedBinded = null;
  this.createUI();
};


function onSuccessCallback(response){
   console.log(response);
}
function onErrorCallback(error){
  console.log(error);
}

FIREBIMExtension.prototype.onSelectionEvent = function(event) {
  let currSelection = viewer.getSelection();
  this.viewer.fitToView(true);
  // let instanceTree = this.viewer.model.getData().instanceTree;
  // console.log(currSelection);

  // let rootId = instanceTree.getRootId();
  this.viewer.getProperties(currSelection[0], function (objProps) {
    if(objProps){
      console.log(objProps.properties)
    }
  });
};



function extractComponentName(name) {
  let submatch;
  const matches = name.split(/[\[\]]+/);
  if (matches) {
    submatch = matches[0];
  }

  return submatch;
}
FIREBIMExtension.prototype.unload = function() {
  alert('FIREBIMExtension is now unloaded!');
  return true;
};

FIREBIMExtension.prototype.createUI = function() {
  // alert('TODO: Create Toolbar!');

  class ChatHistoryPanel extends Autodesk.Viewing.UI.PropertyPanel {
    constructor(viewer, container, id, title, options) {
      super(container, id, title, options);
      this.viewer = viewer;

      this.createTextBox = function() {
        let textBox = document.createElement('div');
        textBox.setAttribute('id', 'chatForm');
        let textInput = document.createElement('input');
        textInput.type = 'text';
        textInput.className = 'form-control chat-text'; // set the CSS class]
        textInput.id = 'chatText';
        textBox.appendChild(textInput);
        textInput.addEventListener('keyup', function(event) {
          // Number 13 is the "Enter" key on the keyboard
          if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            let chatText = document.getElementById('chatText').value;
            // Bot.getLexResponse(chatText, viewer);
            document.getElementById('chatText').value = '';
          }
        });
        return textBox;
      };
      const inputBox = this.createTextBox();
      this.container.appendChild(inputBox);
    }
  }


};



const Helpers = {
  launchViewer,
  loadDocument,
};

export default Helpers;
