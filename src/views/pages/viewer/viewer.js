import React, { useEffect, useState, } from 'react';
import { useDispatch } from 'react-redux';
import ForgeViewer from 'react-forge-viewer';
import Helpers from './viewerHelpers';
import axios from "axios";
import { Doughnut, Bar } from 'react-chartjs-2';
import FireBIMBarChart from './barChart';
import Collapsible from 'react-collapsible';
import { CRow, CCol, CNav, CNavItem, CNavLink, CDataTable, CTabContent, CCard } from '@coreui/react';

const Autodesk = window.Autodesk;
const fireRatingClasses = ['Class A1', 'Class A2', 'Class B', 'Class C', 'Class D', 'Class E', 'Class F'];

const  Viewer = (props) => {

  const [view, setViewable] = useState(null);
  const [urn, setUrn] = useState(props.match.params.urn);
  const [token, setToken] = useState({});
  const [viewer, setViewer] = useState(null);
  const [modelProperties, setModelProperties] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriesValues, setCategoriesValues] = useState([]);
  const [activeKey, setActiveKey] = useState(1)
  const dispatch = useDispatch();

 
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
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'BIM Elements Distribution',
      },
    },
  };

  const labels = categories;
  const barData = {
    labels,
    datasets: [
      {
        label: 'Elements Distribution',
        data: categoriesValues,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };

  useEffect( () => {

    async function getToken(){
      return axios.get(  'https://firebimapi.herokuapp.com/api/forge/token')
      .then((response) => {
     
        setToken(response.data.data.token);
      })
      .catch((error) =>
        error
      );
    }
    getToken();
    setUrn(props.match.params.urn)

 
  }, [dispatch, props]);
  
  useEffect(() => {
    Helpers.launchViewer('viewerDiv', urn, setModelProperties)
  }, [urn]);

  const handleViewerError = (error) => {
    console.log('Error loading viewer.');
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
      Autodesk.Viewing.theExtensionManager.registerExtension('FIREBIMExtension', FIREBIMExtension);
      // doc.registerExtension("FIREBIM", FIREBIMExtension)
      setViewable(viewables[0]);
    }
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
    console.log('Error loading a document', viewer);
  }

  const handleModelLoaded = (viewer, model) => {
   
    // viewer.registerExtension
    setViewer(viewer);
    viewer.loadExtension(FIREBIMExtension);
    const properties = [];
    viewer.addEventListener( Autodesk.Viewing.SELECTION_CHANGED_EVENT, event=>{
      viewer.getPropertyPanel(true).setVisible(true);
      // const panel  = viewer.getPropertyPanel()
      // panel.setCategoryCollapsed({name: "IFC Parameters", type: "category"}, true);
      // panel.setCategoryCollapsed({name: "Text", type: "category"}, true);
      // panel.setCategoryCollapsed("Text", true);
      // panel.setVisible(true);
 })
 viewer.addEventListener( Autodesk.Viewing.TOOLBAR_CREATED_EVENT, event =>{
  let buttonRefresh = new Autodesk.Viewing.UI.Button('report-button');
  buttonRefresh.addClass('report');
  buttonRefresh.setToolTip('Generate Report');
  buttonRefresh.onClick = function (e) {
    return false;
  }
  let subToolbarUpdate = new Autodesk.Viewing.UI.ControlGroup('firebim-toolbar');
  subToolbarUpdate.addControl(buttonRefresh);
  viewer.toolbar.addControl(subToolbarUpdate);

 });

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
    console.log('Error loading the model.');
  }

  const getForgeToken = () => {
       
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
      let token = await getForgeToken();
      if (token)
        onAccessToken(
          token.access_token, token.expires_in);
    }
    

  }

  const openPropertiesPanel = (item) =>{
      viewer.select(item.dbId);
      const panel  = viewer.getPropertyPanel()
      panel.setCategoryCollapsed({name: "IFC Parameters", type: "category"});
      panel.setCategoryCollapsed({name: "Text", type: "category"}, false);
  }


  return  (
    <>
    <CRow style={{height: '85vh', marginTop: '-30px'}}>
      <CCol xs="7" xl="7">
      {/* <div className="fixed bg-fixed left-2 top-2 font-medium text-black z-10 shadow-md p-4"><button className="bg-gray-400 bg-hover-primary" onClick={()=>alert('dhdh')}> Back</button></div> */}
        <ForgeViewer
          version="7.0"
          urn={urn}
          view={view}
          headless={false}
          onViewerError={handleViewerError}
          onTokenRequest={handleTokenRequested}
          onDocumentLoad={handleDocumentLoaded}
          onDocumentError={handleDocumentError}
          onModelLoad={handleModelLoaded}
          onModelError={handleModelError}
          />
        
      </CCol>
      <CCol xs="5" xl="5" className="pb-2" style={{borderLeft: '3px solid'}}>
     
        <CCard className="shadow-lg py-3 px-3 border-left" style={{background: '#eff2f5', overflow: 'scroll'}}>
        <CNav variant="tabs" role="tablist">
          <CNavItem>
            <CNavLink
              href="#"
              data-tab="home"
              active={activeKey === 1}
              onClick={() => setActiveKey(1)}
            >
              Elements Distribution
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              href="#"
              active={activeKey === 2}
              onClick={() => setActiveKey(2)}
            >
              Fire Rating
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              href="#"
              active={activeKey === 3}
              onClick={() => setActiveKey(3)}
            >
              All Components
            </CNavLink>
          </CNavItem>
    </CNav>
    <CTabContent>
      {activeKey === 1 ?
        <div>
          <div className='pt-4 py-4' style={{minHeight: '350px'}}>
            <Doughnut data={categoryData} />
          </div>
          <hr/>
          <div className='py-4 h-1/2'>
            <FireBIMBarChart title="Elements Distribution" categories={categories} data={categoriesValues} />
          </div>
        </div>
       : <div></div>}
     {activeKey === 2 ? <div>
       {categories && categories.length > 0 }{
         categories.map((item, index) =>{
           const categoryItems = modelProperties.filter(mprop => mprop.category === item);
           const categoryRatings = categoryItems.map(catItem => catItem.rating)
           const classA1Ratings = categoryRatings.filter(x => x === "Class A1").length;
           const classA2Ratings = categoryRatings.filter(x => x === "Class A2").length;
           const classBRatings = categoryRatings.filter(x => x === "Class B").length;
           const classCRatings = categoryRatings.filter(x => x === "Class C").length;
           const classDRatings = categoryRatings.filter(x => x === "Class D").length;
           const classERatings = categoryRatings.filter(x => x === "Class E").length;
           const classFRatings = categoryRatings.filter(x => x === "Class F").length;
           
           return (
             <>
          <Collapsible trigger={item + " ("+ categoryItems.length+")"} key={index} triggerTagName='button' triggerStyle={{padding: '5px', borderRadius: '5px', marginTop: '15px', fontWeight: 'bold'}}>
          <div className={"px-5 mb-4"}>
            <FireBIMBarChart 
                title="Fire Rating Distribution" 
                categories={['Class A1', 'Class A2', 'Class B', 'Class C', 'Class D', 'Class E', 'Class F']} 
                data={[classA1Ratings, classA2Ratings, classBRatings, classCRatings, classDRatings, classERatings, classFRatings]}
            />
          </div>
          {/* <Doughnut data={{
              labels: ['Class A1', 'Class A2', 'Class B', 'Class C', 'Class D', 'Class E', 'Class F'],
              datasets: [
                {
                  label: '# of Ratings',
                  data: [classA1Ratings, classA2Ratings, classBRatings, classCRatings, classDRatings, classERatings, classFRatings],
                  backgroundColor: [
                    'rgba(255, 99, 132)',
                    'rgba(54, 162, 235)',
                    'rgba(255, 206, 86)',
                    'rgba(75, 192, 192)',
                    'rgba(153, 102, 255)',
                    'rgba(255, 159, 64)',
                    'rgba(45, 220, 56)',
                    'rgba(54, 162, 235)', 
                    'rgba(255, 205, 86)', 
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
            
          }} /> */}
          <CDataTable
                    items={categoryItems}
                    fields={['id','category', 'component', 'fire rating']}
                    itemsPerPage={10}
                    pagination
                    tableFilter
                    sorter
                    size={400}
                    color={'#fff'}
                    style={{height: '100%', overflowY: 'scroll'}}
                    hover
                    scopedSlots = {{
                      'component':
                        (item)=>(
                         <td style={{width: '40%'}} onClick={() => openPropertiesPanel(item)}>
                            <div >{item.component}</div>
                          </td>
                        ),
                      'fire rating': 
                      (item) => (
                        <td style={{width: '35%'}}>{item.rating}</td>
                      ),
                      'id': 
                      (item) => (
                        <td style={{width: '5%'}}>{item.id}</td>
                      ),
                      'category': (item) => (
                        <td style={{width: '20%'}}>{item.category}</td>
                      )
                    }}
                    /> 
        </Collapsible>
        <hr/></>
           )
         })
       }
          
      </div>
      : <div></div>} 
      {activeKey === 3 ? <div>
        {modelProperties.length > 0 ?  
        <CDataTable
                    items={modelProperties}
                    fields={['id','category', 'component', 'fire rating']}
                    itemsPerPage={10}
                    pagination
                    tableFilter
                    sorter
                    color={'#fff'}
                    style={{height: '100%', overflowY: 'scroll'}}
                    hover
                    scopedSlots = {{
                      'component':
                        (item)=>(
                         <td style={{width: '40%'}} onClick={() => openPropertiesPanel(item)}>
                            {item.component}
                          </td>
                        ),
                      'fire rating': 
                      (item) => (
                        <td style={{width: '35%'}}>{item.rating}</td>
                      ),
                      'category': (item) => (
                        <td style={{width: '20%'}}>{item.category}</td>
                      )
                    }}
                    /> : <div>loading</div>}
                    
      </div> : <div></div>}
    </CTabContent>
         
            </CCard>
      </CCol>
      </CRow>
      </>
    );

}

export default Viewer;
