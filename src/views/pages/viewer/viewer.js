import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ModelViewer from './modelViewer';
import axios from "axios";
import CIcon from '@coreui/icons-react'
import { useHistory } from 'react-router-dom';
import Collapsible from 'react-collapsible';
import { CRow, CCol, CCard, CLabel, CButton } from '@coreui/react';
import Config from '../../../config';
import { getForgeToken } from '../../../actions/projectActions';

const Autodesk = window.Autodesk;
const fireRatingClasses = ['30 mins', '60 mins', '90 mins', '120 mins'];

const  Viewer = (props) => {
  const urn = props.match.params.urn
  
  const [view, setViewable] = useState(null);
  const [project, setProject] = useState(props.location.state.project)
  const [token, setToken] = useState({});
  const [viewer, setViewer] = useState(null);
  const [trigger, setTrigger] = useState(false);
  const [modelProperties, setModelProperties] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriesValues, setCategoriesValues] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();


  //
  // console.log(access_token)

  const categoryData = {
    labels: categories,
    datasets: [
      {
        label: '# of Votes',
        data: categoriesValues,
        backgroundColor: [
          'rgba(223, 80, 112)',
          'rgba(54, 142, 205)',
          'rgba(255, 206, 86)',
          'rgba(75, 192, 192)',
          'rgba(153, 102, 255)',
          'rgba(255, 159, 64)',
          'rgba(45, 220, 56)',
          'rgba(54, 162, 235)', 
          'rgba(165, 100, 56)', 
          'rgba(65, 190, 30)',
          'rgba(255, 99, 132)'

        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  async function getToken(){
    return axios.get( Config.BASE_API_URL+  '/forge/token')
    .then((response) => {
      setToken(response.data.data.token);
      dispatch(getForgeToken(response.data.data.token))
    })
    .catch((error) =>
      error
    );
  }

  useEffect( () => {
    
    async function getToken(){
      return axios.get( Config.BASE_API_URL+  '/forge/token')
      .then((response) => {
        setToken(response.data.data.token);
        dispatch(getForgeToken(response.data.data.token))
        localStorage.setItem('token',JSON.stringify(response.data.data.token) )
      })
      .catch((error) =>
        error
      );
    }
    getToken();
 
  }, [dispatch]);
  

  const handleViewerError = (error) => {
    console.log('Error loading viewer.', error);
    
  }

  /* after the viewer loads a document, we need to select which viewable to
  display in our component */
  const handleDocumentLoaded = (doc, viewables) => {
    if (viewables.length === 0) {
     
      console.error('Document contains no viewables.');
      // viewer.addEventListener('')
    }
    else{
      //Select the first viewable in the list to use in our viewer component
      Autodesk.Viewing.theExtensionManager.registerExtension('FIREBIMExtension', FIREBIMExtension)
      setViewable(viewables[0]);
      
    }
  }

  // Extension
  function FIREBIMExtension(viewer, options) {
    console.log('FIREBIM extension');
    Autodesk.Viewing.Extension.call(this, viewer, options);
  }
  
  FIREBIMExtension.prototype.load = function() {

    if (this.viewer.toolbar) {
      // Toolbar is already available, create the UI
      // console.log('inside toolbar')
      this.createUI();
      this.onSelectionBinded = this.onSelectionEvent.bind(this);
      this.viewer.addEventListener(
        Autodesk.Viewing.SELECTION_CHANGED_EVENT,
        this.onSelectionBinded
      );
    } else {
      // Toolbar hasn't been created yet, wait until we get notification of its creation
      this.onToolbarCreatedBinded = this.onToolbarCreated.bind(this);
      this.viewer.addEventListener(
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

  FIREBIMExtension.prototype.createUI = function() {
  //  console.log('here in create i')

   let buttonRefresh = new Autodesk.Viewing.UI.Button('reload-button');
    buttonRefresh.addClass('refresh');
    buttonRefresh.setToolTip('Reload Model');
    buttonRefresh.onClick = function (e) {
        window.location.reload();
        return false;
    }
    let buttonReport = new Autodesk.Viewing.UI.Button('report-button');
    buttonReport.addClass('report');
    buttonReport.setToolTip('Generate Report');

    let buttonBack = new Autodesk.Viewing.UI.Button('back-button');
    buttonBack.addClass('goBack');
    buttonBack.setToolTip('Go back');
    buttonBack.onClick = function (e) {
      history.goBack();
      return false;
  }

    this.subToolbarRefresh = new Autodesk.Viewing.UI.ControlGroup('my-refresh-toolbar');
    this.subToolbarRefresh.addControl(buttonRefresh);
    this.subToolbarRefresh.addControl(buttonReport);
    this.subToolbarRefresh.addControl(buttonBack);

    this.viewer.toolbar.addControl(this.subToolbarRefresh);
  }

  FIREBIMExtension.prototype.unload = function() {
    alert('FIREBIMExtension is now unloaded!');
    return true;
  };
  
  
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

  const handleDocumentError = (viewer, error) => {
    console.log('Error loading a document', viewer, error); 
  
  }

  const handleModelLoaded = (viewer, model) => {
    // console.log(viewer, '...viewer')
    setViewer(viewer);
    viewer.addEventListener(
      Autodesk.Viewing.GEOMETRY_LOADED_EVENT, () => {
        
        viewer.loadExtension('FIREBIMExtension')
      })
    const properties = [];
    viewer.addEventListener( Autodesk.Viewing.SELECTION_CHANGED_EVENT, event=>{
      viewer.getPropertyPanel(true).setVisible(true);
     })


    getAllLeafComponents(viewer, function (dbIds) {
      viewer.model.getBulkProperties(dbIds, ['Category','Fire Rating'],
      function(elements){
        for(let i=0; i< elements.length; i++) {
          const random = Math.floor(Math.random() * fireRatingClasses.length);
          let nodeName = viewer.model.getInstanceTree().getNodeName(elements[i].dbId);
          let category = elements[i].properties[0]!== undefined ? elements[i].properties[0].displayValue.replace("Revit", "").trim(): '';
          // let rating =  elements[i].properties[1] !== undefined ? elements[i].properties[1].displayValue: '';
          let rating = fireRatingClasses[random]
          if(elements[i].properties[0]!== undefined && !categories.includes(category) ){
            categories.push(category);
        
          }
          properties.push({id: i+1, component: nodeName, category: category, rating: rating, dbId: elements[i].dbId})
        }
      
        setModelProperties(properties)
        const categ = properties.reduce((acc, cur) => {
          acc[cur.category] = (acc[cur.category] || 0) + 1
          return acc;
       }, {})
       setCategories(Object.keys(categ));
       setCategoriesValues(Object.values(categ));
    
      })
    })
    
  }


  const handleModelError = (viewer, error) => {
    console.log('Error loading the model.', error, viewer);
    
    
  }

  const options=  [{name: '1(a) Flat', id: 1, category: 'Residential (Dwellings)'},
    {name: '1(b) Terraced Building', id: 2, category: 'Residential (Dwellings)'},
    {name: '1(c) Semi-Detached', id: 3, category: 'Residential (Dwellings)'},
    {name: '2(a) Office Building', id: 4, category: 'Residential (Institutional)'},
  ]

  const getPurposeGroups = (groupIds) => {
    let groups = groupIds.split(',');
    const groupNames  = groups.map((item) => {
      let option = options.find(i => i.id === parseInt(item))
      if(option){
        return option.name
      }
      return null
    });
    return groupNames.toString()
  }

  const getForgeTokenn = () => {
    return {
      access_token: token.access_token,
      expires_in: token.expires_in,
      token_type: "Bearer"
    };

}

  /* Once the viewer has initialized, it will ask us for a forge token so it can
  access the specified document. */
  const handleTokenRequested = async (onAccessToken) => {

    if (onAccessToken) {
      let tokenn = getForgeTokenn();
     
      if(tokenn.access_token === undefined){
        let b = JSON.parse(localStorage.getItem('token'))
        onAccessToken(
          b.access_token, b.expires_in)
        this.forceUpdate()
       
      }
      if (tokenn)
        onAccessToken(
          tokenn.access_token, tokenn.expires_in);
    }

  }
  

  return  (
    <>
    <CRow style={{height: '85vh', marginTop: '-30px'}}>
      <CCol xs="7" xl="7">
        <span style={{position: 'absolute', zIndex: 50}} className="shadow p-2">{project.title} ({project.modelStorageId})</span>
         <ModelViewer 
          urn={urn}
          view={view}
          handleDocumentError={handleDocumentError}
          handleDocumentLoaded={handleDocumentLoaded}
          handleModelError={handleModelError}
          handleModelLoaded={handleModelLoaded}
          handleTokenRequested={handleTokenRequested}
          handleViewerError={handleViewerError}
          trigger={trigger}
          setTrigger={setTrigger}
        /> 
      </CCol>
      <CCol xs="5" xl="5" className="pb-2" style={{borderLeft: '3px solid'}}>
     
        <CCard className="shadow-lg py-3 px-3 border-left" style={{background: '#eff2f5', overflow: 'scroll'}}>
       
          <Collapsible trigger={"Project Information"} key={1} triggerOpenedClassName="open-collapsible" triggerTagName='button' triggerStyle={{padding: '5px', borderRadius: '5px', marginTop: '15px', fontWeight: 'bold', fontSize: 'large'}} className="firebim-collapsible-available" >
            <hr/>
            <div className={"px-2 my-4"}>
              <CRow>
                <CCol><CLabel className="font-bold">Project Title:</CLabel></CCol>
                <CCol>{project.title}</CCol>
              </CRow>
              <CRow>
                <CCol><CLabel className="font-bold">Description:</CLabel></CCol>
                <CCol>{project.description}</CCol>
              </CRow>
              <CRow>
                <CCol><CLabel className="font-bold">Address:</CLabel></CCol>
                <CCol>{project.address}</CCol>
              </CRow>
              <CRow>
                <CCol><CLabel className="font-bold">Client:</CLabel></CCol>
                <CCol>{project.client}</CCol>
              </CRow>
              <CRow>
                <CCol><CLabel className="font-bold">Agent:</CLabel></CCol>
                <CCol>{project.agent}</CCol>
              </CRow>
              <CRow>
                <CCol><CLabel className="font-bold">Purpose Group:</CLabel></CCol>
                <CCol>{getPurposeGroups(project.purposeGroup)}</CCol>
              </CRow>
            </div>
           
          </Collapsible>
          <hr/>
          <Collapsible trigger={"Fire Rating (for structure)"} key={1} triggerOpenedClassName="open-collapsible" triggerTagName='button' triggerStyle={{padding: '5px', borderRadius: '5px', marginTop: '15px', fontWeight: 'bold', fontSize: 'large'}} className="firebim-collapsible-available">
            <div className={"px-5 mb-4"}>
             Fire Rating
            
            </div>
          </Collapsible>
          <hr/>
         
          <Collapsible trigger={"Sprinkler"} key={1} triggerTagName='button' triggerOpenedClassName="open-collapsible" triggerStyle={{padding: '5px', borderRadius: '5px', marginTop: '15px', fontWeight: 'bold', fontSize: 'large'}} className="firebim-collapsible-available">
            <div className={"px-5 mb-4"}>
            </div>
          </Collapsible>

          <hr/>
          <Collapsible trigger={"Compartmentation"} key={1} triggerTagName='button' triggerStyle={{padding: '5px', borderRadius: '5px', marginTop: '15px', fontWeight: 'bold', fontSize: 'large'}} className="firebim-collapsible">
            <div className={"px-5 mb-4"}>
            <span class="tooltiptext">Insufficient information</span>
            </div>
          </Collapsible>
          <hr/>
          <Collapsible trigger={"Fire doors"} key={1} triggerTagName='button' triggerStyle={{padding: '5px', borderRadius: '5px', marginTop: '15px', fontWeight: 'bold', fontSize: 'large'}} className="firebim-collapsible">
            <div className={"px-5 mb-4"}>
            <span class="tooltiptext">Insufficient information</span>
            </div>
          </Collapsible>
          <hr/>
          <Collapsible trigger={"Distance (to exit, etc.)"} key={1} triggerTagName='button' triggerStyle={{padding: '5px', borderRadius: '5px', marginTop: '15px', fontWeight: 'bold', fontSize: 'large'}} className="firebim-collapsible">
         
            <div className={"px-5 mb-4"}>
             <span class="tooltiptext">Insufficient information</span>
            </div>
          </Collapsible>
          <hr/>
          <Collapsible trigger={"Number of stair and protection"} key={1} triggerTagName='button' triggerStyle={{padding: '5px', borderRadius: '5px', marginTop: '15px', fontWeight: 'bold', fontSize: 'large'}} className="firebim-collapsible">
            <div className={"px-5 mb-4"}>
            <span class="tooltiptext">Insufficient information</span>
            </div>
          </Collapsible>
          <hr/>
          <Collapsible trigger={"Means of warning"} key={1} triggerTagName='button' triggerStyle={{padding: '5px', borderRadius: '5px', marginTop: '15px', fontWeight: 'bold', fontSize: 'large'}} className="firebim-collapsible">
            <div className={"px-5 mb-4"}>
              <span class="tooltiptext">Insufficient information</span>
            </div>
          </Collapsible>
          <hr/>
          <Collapsible trigger={"Fire services and access"} key={1} triggerTagName='button' triggerStyle={{padding: '5px', borderRadius: '5px', marginTop: '15px', fontWeight: 'bold', fontSize: 'large'}} className="firebim-collapsible">
            <div className={"px-5 mb-4"}>
            <span class="tooltiptext">Insufficient information</span>
            </div>
          </Collapsible>
          <hr/>
        </CCard>
      </CCol>
      </CRow>
      </>
    );

}

export default Viewer;
