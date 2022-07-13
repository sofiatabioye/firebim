import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import ModelViewer from './modelViewer';
import axios from "axios";
import { useHistory } from 'react-router-dom';
import Collapsible from 'react-collapsible';
import { CRow, CCol, CCard, CLabel, CSelect, CInput} from '@coreui/react';
import Config from '../../../config';
import { getForgeToken } from '../../../actions/projectActions';
import { calculateFireRating } from './fireRating';
import FBIMJSON from './fiBIM.json';


// const els = Object.values(FBIMJSON);
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
  const [modelFloor, setModelFloors] = useState([]);
  const [identifiedFloors, setIdentifiedFloors] = useState([]);
  const [floors, setFloors]= useState([]);
  const [walls, setWalls]= useState([]);
  const [compartments, setCompartments] = useState([]);
  const [selectedDbId, setSelectedDbId] = useState([]);
  const [lowestFloor, setLowestFloor] = useState('');
  const [highestFloor, setHighestFloor] = useState('');
  const [topfloorHieght, setTopfloorHeight] = useState(0);
  const [fireRating, setFireRating] = useState({});
  const [viewerWidth, setViewerWidth] = useState(9);
  const [sidebarWidth, setSidebarWidth] = useState(3);
  const [selectedElement, setSelectedElement] = useState({});
  const [structuralElements, setStructuralElements] = useState({
    floors: [],
    walls: [],
    columns: [],
    beams: []
  })
  const [sidebarPropertiesWidth, setSidebarPropertiesWidth] = useState(2);
  const pageRef = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();

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
    }
    else{
      //Select the master viewable in the list to use in our viewer component
      Autodesk.Viewing.theExtensionManager.registerExtension('FIREBIMExtension', FIREBIMExtension)
      setViewable(viewables[1]);
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

  FIREBIMExtension.prototype.onSelectionEvent = async function(event) {

    let currSelection = viewer.getSelection();
    console.log(event);

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
  const displayElData = (element, type) => {
    const elementName = type === 'Floor' ? 'Floor ['+ element.element_id+']' : 'Basic Wall ['+ element.element_id+']'
    let item = type === 'Floor' && floors.length >0 ? floors.find((item) => item.nodeName === elementName): walls.find((item) => item.nodeName === elementName);
    setSelectedElement({...element, type});
    viewer.select(item.dbId);
    viewer.fitToView([item.dbId], viewer.model);
    var selection = viewer.getSelection();
    console.log(selection);
    viewer.getProperties( selection[0], function( result ) {
        const props = result.properties;
        console.log(result)
        for( let i = 0; i < props .length; i++ ) {
            const property = props[i];
            if( property.hidden) return;

            const category = props[i].displayCategory;
            if( category && typeof category === 'string' && category !== '' ) {
                // The property group you want
                console.log( category );
            }
        }
    });
  }
  const handleModelLoaded = (viewer, model) => {
    setViewer(viewer);
    viewer.fitToView();
    viewer.addEventListener(
      Autodesk.Viewing.GEOMETRY_LOADED_EVENT, () => {
        
        viewer.loadExtension('FIREBIMExtension');

      })
    const properties = [];
    viewer.addEventListener( Autodesk.Viewing.SELECTION_CHANGED_EVENT, event=>{
      viewer.getPropertyPanel(true).setVisible(false);
     })

    viewer.addEventListener( Autodesk.Viewing.OBJECT_TREE_CREATED_EVENT, async function () {
      

    })
    
    const modelFloors = [];
    let lowest;
    let highest;
    const allFloors = [];
    const allWalls = [];
    const allBeam = [];
    const allColumn = [];
    const others = [];
    const compartments = [];
    let instanceTree = viewer.model.getData();
    // .then(items => {
    //   console.log(items)
    // }).catch(err => console.log(err));
    // console.log(a, '...dstau')
    // console.log(a);
    // const its = viewer.model.getData().instanceTree;
    // console.log(viewer.model.getProperties(), '...djdj')
    getAllLeafComponents(viewer, async function (dbIds) {
      
      viewer.model.getBulkProperties(dbIds, ['Category','Fire Rating', 'Level', 'Height Offset From Level', 'Elevation at Top', 'Area'],
      function(elements){
       
        for(let i=0; i< elements.length; i++) {
          const random = Math.floor(Math.random() * fireRatingClasses.length);
          let nodeName = viewer.model.getInstanceTree().getNodeName(elements[i].dbId);
          let category = elements[i].properties[0]!== undefined ? elements[i].properties[0].displayValue.replace("Revit", "").trim(): '';
          if(nodeName.includes('Floor')){
            allFloors.push({nodeName: nodeName, dbId:elements[i].dbId, elevation: elements[i].properties[5].displayValue, area: elements[i].properties[4].displayValue, heightOffset:elements[i].properties[3].displayValue })
          } 
          else if (nodeName.includes('Wall')){
            allWalls.push({nodeName: nodeName, dbId:elements[i].dbId})
          } 
          else if (nodeName.includes('Beam')){
            allBeam.push({nodeName: nodeName, dbId:elements[i].dbId})
          } else if (nodeName.includes('Column')){
            allColumn.push({nodeName: nodeName, dbId:elements[i].dbId})
          } else if (category === 'Rooms'){
            compartments.push({nodeName: nodeName, dbId:elements[i].dbId});
          } else{
            others.push({nodeName: nodeName, dbId:elements[i].dbId})
          } 
          if(nodeName.includes('Floor') && elements[i].properties[3].displayValue === 0){
            modelFloors.push({nodeName: nodeName, dbId:elements[i].dbId, elevation: elements[i].properties[5].displayValue, area: elements[i].properties[4].displayValue})
          }
         
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
       const sortedModelFloors = modelFloors.sort((a,b)=> a.elevation - b.elevation)
       setFloors(allFloors);
       setWalls(allWalls);
       setCompartments(compartments);
       setIdentifiedFloors(sortedModelFloors);
       setStructuralElements({
         floors: allFloors,
         walls: allWalls,
         columns: allColumn,
         beams: allBeam,
       })
       console.log(compartments);
       // set Lowest floors
       if(Math.abs(sortedModelFloors[0].area - sortedModelFloors[1].area) > 500
         &&  sortedModelFloors[1].area > sortedModelFloors[0].area){
          lowest = sortedModelFloors[1];
      }else{
        lowest = sortedModelFloors[0]
      }
      // set Highest Floor
      if(Math.abs(sortedModelFloors[sortedModelFloors.length-1].area - sortedModelFloors[sortedModelFloors.length-2].area) > 500
        && sortedModelFloors[sortedModelFloors.length-2].area > sortedModelFloors[sortedModelFloors.length-1].area){
          highest = sortedModelFloors[sortedModelFloors.length-2];
      }else{
        highest = sortedModelFloors[sortedModelFloors.length-1]
      }
      setLowestFloor(lowest.nodeName);
      setHighestFloor(highest.nodeName);
      calculateTopFloorHeight(lowest, highest);
      })
     
    });
    
    
  }
  const calculateTopFloorHeight = (lowestFloor, highestFloor) => {
    const height = highestFloor.elevation - lowestFloor.elevation
    setTopfloorHeight((height/1000).toFixed(2));
    setFireRating(calculateFireRating((height/1000).toFixed(2)));
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
  const selectViewerElement = (type) => {
    let selected = highestFloor.dbId;
    if(type === 'ground') {
      selected = lowestFloor.dbId 
    }
    viewer.select(selected);

    // console.log(viewer.model.getProperties(selected));
    viewer.fitToView([selected], viewer.model);
  }

  const triggerSidebar = (event) => {
     event.preventDefault();
     const sidebarSelection = pageRef.current.querySelector("#sidebar");
     sidebarSelection.style.display = 'none';
     setViewerWidth(12);
  }
  
  const handleChange = (event) => {
     event.preventDefault();
     if(event.target.name === 'groundfloor'){
      setLowestFloor(event.target.value);
     } else{
      setHighestFloor(event.target.value);
     }
  }

  useEffect (() => {
     
     const highest = floors.length > 0 ? floors.find((item) => item.nodeName === highestFloor): null;
     const lowest = floors.length > 0 ? floors.find((item) => item.nodeName === lowestFloor): null;
    if(!!highest && !!lowest && Object.keys(highest).length > 0 && Object.keys(lowest).length >  0){
      var selections = [
        {
           model: viewer.model,
           ids: [lowest.dbId, highest.dbId]
        }
    ];
      viewer.impl.selector.setAggregateSelection( selections );
      viewer.fitToView([lowest.dbId, highest.dbId], viewer.model);
      const height = highest.elevation - (lowest.elevation+lowest.heightOffset)
      setTopfloorHeight(height.toFixed(2));
    } 
   
  }, [highestFloor, lowestFloor, floors, viewer]);

  return  (
    <>
    <CRow style={{height: '85vh', marginTop: '-30px', marginLeft: '-30px'}} innerRef={el => {pageRef.current = el} }>
      {/* <div onClick={triggerSidebar} className="absolute z-5000" style={{bottom: '10%', left: '80%'}}><FontAwesomeIcon icon={faArrowRight} /></div> */}
      <CCol xs={sidebarWidth} xl={sidebarWidth} className="pb-2" style={{borderRight: '3px solid'}} id="sidebar">
       
        <CCard className="shadow-lg py-3 px-3 border-left" style={{background: '#eff2f5', overflow: 'scroll'}}>
       
          <Collapsible trigger={"Project Information"} key={1} triggerOpenedClassName="open-collapsible" triggerTagName='button' triggerStyle={{padding: '5px', borderRadius: '5px', marginTop: '15px', fontWeight: 'bold', fontSize: 'medium'}} className="firebim-collapsible-available" >
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
               <hr/>
              
            </div>
            <div></div>
           
          </Collapsible>
          <hr/>
          <Collapsible trigger={"Fire Rating (for structure)"} key={1} triggerOpenedClassName="open-collapsible" triggerTagName='button' triggerStyle={{padding: '5px', borderRadius: '5px', marginTop: '15px', fontWeight: 'bold', fontSize: 'medium'}} className="firebim-collapsible-available">
            <CRow className={"px-5 mb-4 mt-4 w-full"}>
            <CRow className="mt-2">
                <CCol><CLabel className="font-bold">Ground floor:</CLabel></CCol>
                <CCol onClick={() => selectViewerElement('ground')}>      
                  <CSelect
                    custom
                    name="groundfloor"
                    id="groundfloor"
                    onChange={handleChange}
                    value={lowestFloor.nodeName}
                    required
                  >
                <option value={lowestFloor}> {identifiedFloors.length > 0 ? lowestFloor: 'Please Select'}</option>
                {structuralElements.floors &&  structuralElements.floors.length > 0 ? 
                 structuralElements.floors.map(floor => <option value={floor.nodeName}>{floor.nodeName}</option>)
                 : null
                 } 
              </CSelect>
        
                  </CCol>
              </CRow>
              <CRow className="mt-2">
                <CCol><CLabel className="font-bold">Top floor:</CLabel></CCol>
                <CCol onClick={() => selectViewerElement('top')}>
                  <CSelect
                    custom
                    name="topfloor"
                    id="topfloor"
                    value={highestFloor.nodeName}
                    onChange={handleChange}
                    required
                  >
                <option value={highestFloor}> {identifiedFloors.length > 0 ? highestFloor: 'Please Select'}</option>
                {structuralElements.floors &&  structuralElements.floors.length > 0 ? 
                 structuralElements.floors.map(floor => <option value={floor.nodeName}>{floor.nodeName}</option>)
                 : null  
                 } 
              </CSelect>
                </CCol>
              </CRow>
              <CRow className="mt-2">
                <CCol><CLabel className="font-bold">Ground Floor Offset:</CLabel></CCol>
                <CCol><CInput name="groundfloor"></CInput></CCol>
              </CRow>
              <CRow className="mt-2">
                <CCol><CLabel className="font-bold">Top Floor Height:</CLabel></CCol>
                <CCol>{identifiedFloors.length > 0 ? topfloorHieght + 'm': null}</CCol>
              </CRow>
            
              {/* {fireRating?
                 <CRow > 
                  <CRow style={{width: '100%'}} >
                    <CCol><CLabel className="font-bold">Rating:</CLabel></CCol>
                    <CCol>{fireRating.rating} </CCol>
                  </CRow>
                  <CRow style={{width: '100%'}}>
                    <CCol>
                      <CLabel className="font-bold">Description:</CLabel>
                      <div className='text-justify'>{fireRating.description}</div>
                    </CCol>
                  </CRow>
                  <CRow style={{width: '100%'}} className="mt-2">
                    <CCol><CLabel className="font-bold">DSS Display:</CLabel></CCol>
                    <CCol>{fireRating.dssDisplay}</CCol>
                  </CRow>
                 </CRow>
              : 'N/A'} */}
            </CRow>
          </Collapsible>
          <hr/>
         
          <Collapsible trigger={"Sprinkler"} key={1} triggerTagName='button' triggerOpenedClassName="open-collapsible" triggerStyle={{padding: '5px', borderRadius: '5px', marginTop: '15px', fontWeight: 'bold', fontSize: 'medium'}} className="firebim-collapsible-available">
            <div className={"px-5 mb-4 mt-4"}>
              {fireRating ? 
              <CRow>
                <CRow>{fireRating?.sprinkler === 'Yes' ? 'Sprinkler protection is required' :  'No sprinkler protection is required'}</CRow>
                <CRow>{fireRating?.sprinklerText !== '' ?  fireRating.sprinklerText: ''}</CRow>
              </CRow>
              : 'N/A'}
            </div>
          </Collapsible>
          <hr/>
          <Collapsible trigger={"Properties"} key={1} triggerTagName='button' triggerOpenedClassName="open-collapsible" triggerStyle={{padding: '5px', borderRadius: '5px', marginTop: '15px', fontWeight: 'bold', fontSize: 'medium'}} className="firebim-collapsible-available">
            <div className={"px-2 mb-4 mt-4"}>
              {/* <h5>Floors</h5> */}
              <Collapsible trigger="Floors" triggerStyle={{padding: '4px', marginTop: '10px', fontWeight: 'bold', fontSize: 'medium'}}>
                <ul>
                  {FBIMJSON.Floors.map(item => <li key={item.id} className={item.result==="Pass"? "mb-2 mt-2 pass": "mb-2 mt-2 fail"} onClick={() => displayElData(item, 'Floor')}>Floor [{item.element_id}]</li>)}
                </ul>
              </Collapsible>
              <hr className='pb-2'/>
              <Collapsible trigger="Walls" triggerStyle={{padding: '4px', marginTop: '10px', fontWeight: 'bold', fontSize: 'medium'}}>
                <ul>
                  {FBIMJSON.Walls.map(item => <li key={item.id} className={item.result==="Pass"? "mb-2 mt-2 pass": "mb-2 mt-2 fail"} onClick={() => displayElData(item, 'Wall')}>Wall [{item.element_id}]</li>)}
                 </ul>
              </Collapsible>
              <hr className='pb-2'/>
              <Collapsible trigger="Columns" triggerStyle={{padding: '4px', marginTop: '10px', fontWeight: 'bold', fontSize: 'medium'}}>
                
              </Collapsible>
              <hr className='pb-2'/>
              <Collapsible trigger="Beams" triggerStyle={{padding: '4px', marginTop: '10px', fontWeight: 'bold', fontSize: 'medium'}}>
                 
              </Collapsible>
              <hr/>
              {/* {structuralElements.floors.map(item => (<li className= "mb-2 mt-2">{ item.nodeName }</li>))} */}
              {/* <h5>Walls</h5> */}
              
              {/* {structuralElements.walls.map(item => (<li className= "mb-2 mt-2">{ item.nodeName}</li>))} */}
            </div>
          </Collapsible>
          <hr/>
          <Collapsible trigger={"Compartmentation"} key={1} triggerOpenedClassName="open-collapsible2" triggerTagName='button' triggerStyle={{padding: '5px', borderRadius: '5px', marginTop: '15px', fontWeight: 'bold', fontSize: 'medium'}} className="firebim-collapsible">
            <div className={"px-5 mb-4 mt-4"}>
            {/* <span class="tooltiptext">Insufficient information</span> */}
            <ul>
                {compartments && Object.keys(compartments).length > 0 ? compartments.map(item => <li key={item.dbId} className={"mb-2 mt-2 pass"} onClick={() => displayElData(item, 'Compartment')}>{item.nodeName}</li>): null}
                </ul>
            </div>
          </Collapsible>
          <hr/>
          <Collapsible trigger={"Fire doors"} key={1} triggerTagName='button' triggerOpenedClassName="open-collapsible2" triggerStyle={{padding: '5px', borderRadius: '5px', marginTop: '15px', fontWeight: 'bold', fontSize: 'medium'}} className="firebim-collapsible">
            <div className={"px-5 mb-4 mt-4"}>
            <span class="tooltiptext">Insufficient information</span>
            </div>
          </Collapsible>
          <hr/>
          <Collapsible trigger={"Distance (to exit, etc.)"} key={1} triggerTagName='button' triggerOpenedClassName="open-collapsible2" triggerStyle={{padding: '5px', borderRadius: '5px', marginTop: '15px', fontWeight: 'bold', fontSize: 'medium'}} className="firebim-collapsible">
         
            <div className={"px-5 mb-4 mt-4"}>
             <span class="tooltiptext">Insufficient information</span>
            </div>
          </Collapsible>
          <hr/>
          <Collapsible trigger={"Number of stair and protection"} key={1} triggerTagName='button' triggerOpenedClassName="open-collapsible2" triggerStyle={{padding: '5px', borderRadius: '5px', marginTop: '15px', fontWeight: 'bold', fontSize: 'medium'}} className="firebim-collapsible">
            <div className={"px-5 mb-4 mt-4"}>
            <span class="tooltiptext">Insufficient information</span>
            </div>
          </Collapsible>
          <hr/>
          <Collapsible trigger={"Means of warning"} key={1} triggerTagName='button' triggerOpenedClassName="open-collapsible2" triggerStyle={{padding: '5px', borderRadius: '5px', marginTop: '15px', fontWeight: 'bold', fontSize: 'medium'}} className="firebim-collapsible">
            <div className={"px-5 mb-4 mt-4"}>
              <span class="tooltiptext">Insufficient information</span>
            </div>
          </Collapsible>
          <hr/>
          <Collapsible trigger={"Fire services and access"} key={1} triggerTagName='button' triggerOpenedClassName="open-collapsible2" triggerStyle={{padding: '5px', borderRadius: '5px', marginTop: '15px', fontWeight: 'bold', fontSize: 'medium'}} className="firebim-collapsible">
            <div className={"px-5 mb-4 mt-4"}>
            <span class="tooltiptext">Insufficient information</span>
            </div>
          </Collapsible>
          <hr/>
        </CCard>
      </CCol>
      <CCol xs={viewerWidth} xl={viewerWidth} style={{height: '60vh'}} id="viewer">
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
        <CRow>
          <CCol xs={8} className="border border-light p-4">
            <h5>Elements</h5>
            {selectedElement && Object.keys(selectedElement).length > 0 ?
             <div className="ratingresults">
              <div className="py-2"><b>Element:</b> {selectedElement.type} [{selectedElement.element_id}]</div>
              <div className="py-2"><b>{selectedElement.property}</b></div>
              <div className="py-2"><b>Remark:</b> {selectedElement.remark}</div>
              <div className="py-2"><b>Result:</b> {selectedElement.result}</div>

             </div>
            : null
          }
          </CCol>
          <CCol xs={4} className="border border-info h-100 d-inline-block text-center text-white p-4 bg-info bg-gradient">
            <div className="text-md px-4"><b>{fireRating.dssDisplay}</b></div>
          </CCol>
        </CRow>
      </CCol>
   
      
      </CRow>
      </>
    );

}

export default Viewer;
