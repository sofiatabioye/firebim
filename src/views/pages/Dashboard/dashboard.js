import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CSelect,
  CRow,
  CDataTable, CSpinner,
  CBadge
} from '@coreui/react'
import { Bar} from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faTh, faThList, faUsers } from "@fortawesome/free-solid-svg-icons";
import {getModelAssetsData} from "../../../actions/authActions";


function dateCheck(date, category) {

   if( !!date && date !== "N/A" && !isNaN(Date.parse(date))){
    //  let dateDiff = moment().diff(date, 'days');  // breaks in production
    var date1 = new Date();
    var date2 = new Date(date);

      // To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime();

      // To calculate the no. of days between two dates
    let dateDiff = Difference_In_Time / (1000 * 3600 * 24);

    if(dateDiff > 0) {
      return ["pastDueDate", category]
    } else if(dateDiff < 0 && dateDiff >= -7){
      return ["dueSoon", category];
    }
    else {
      return ["inTime", category];
    }
  }
}
const formatChartData =  (assets) => {
  let preManufactured  = 0;
  let manufactured=0;
  let inStorage = 0;
  let inTransit = 0;
  let installedOnsite = 0;
  let offloadedOnsite = 0;
  let na = 0;
  let dueSoon = [];
  let inTime = [];
  let pastDueDate = [];

  let dateDataset = {
    "Pre-manufactured": {
      dueSoon: 0,
      pastDueDate: 0,
      inTime: 0
    },
    "Manufactured": {
      dueSoon: 0,
      pastDueDate: 0,
      inTime: 0
    },
    "In storage": {
      dueSoon: 0,
      pastDueDate: 0,
      inTime: 0
    },
    "In transit": {
      dueSoon: 0,
      pastDueDate: 0,
      inTime: 0
    },
    "Offloaded onsite": {
      dueSoon: 0,
      pastDueDate: 0,
      inTime: 0
    },
    "Installed onsite": {
      dueSoon: 0,
      pastDueDate: 0,
      inTime: 0
    }
  }

  Array.isArray(assets) && assets.length > 0 && assets.map(item => {

    switch (item["TIES_0116_DesPh_Status"]) {
      case "Pre-manufactured":
        let result = dateCheck(item["TIES_0113_DesPh_PlannedManufacturingDate"], item["TIES_0116_DesPh_Status"]);
        if(result) dateDataset[result[1]][result[0]]++ ;
        preManufactured++;
        break;
      case "Manufactured":
        let resulta = dateCheck(item["TIES_0206_ManPh_ManufacturingDate"], item["TIES_0116_DesPh_Status"]);
        if(resulta)  dateDataset[resulta[1]][resulta[0]]++
        manufactured++;
        break;
      case "In storage":
        let resultb = dateCheck(item["TIES_0228_ManPh_StorageDate"], item["TIES_0116_DesPh_Status"]);
        if (resultb) dateDataset[resultb[1]][resultb[0]]++;
        inStorage++;
        break;
      case "In transit":
        let resultc = dateCheck(item["TIES_0304_DelPh_CollectionDate"], item["TIES_0116_DesPh_Status"]);
        if(resultc) dateDataset[resultc[1]][resultc[0]]++;
        inTransit++;
        break;
      case "Offloaded onsite":
        let resulte = dateCheck(item["TIES_0403_InsPh_OnsiteDeliveryDate"], item["TIES_0116_DesPh_Status"]);
        if(resulte) dateDataset[resulte[1]][resulte[0]]++;
        offloadedOnsite++;
        break;
      case "Installed onsite":
        let resultd = dateCheck(item["TIES_0425_InsPh_InstallationDate"], item["TIES_0116_DesPh_Status"]);
        if(resultd) dateDataset[resultd[1]][resultd[0]]++;
        installedOnsite++;
        break;
     
      default:
        na++;
        break;
    }

  });

  let results = [[preManufactured, manufactured, inStorage, inTransit, offloadedOnsite, installedOnsite], dateDataset];

  return results;
}


const labels = ['Pre-manufactured', 'Manufactured',  'In Storage','In Transit', 'Offloaded onsite', 'Installed onsite'];

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const [modelId, setModelId] = useState(null);
  const [projecti, setProject] = useState({});
  const [projectsWithModel, setProjectsWithModels] = useState([]);
  const [projectModal, setProjectModal] = useState(false);
  const [assets, setAssets] = useState([]);
  const history = useHistory();
  const categories = useSelector(state => state.assetCategory.assetCategories);
  const projects = useSelector(state => state.project.projects);
  const datapoints = useSelector(state => state.assetField.assetFields);
  const loggedInUser = useSelector(state => state.auth.user);
  const users = useSelector(state => state.user.users);
  const [update, setUpdated] = useState(false);
  const [selectedOption, setSelected] = useState(null);

   
  const data = {
    labels: labels,
    datasets: [{
      label: projecti ? projecti.title : 'Model 1',
      data: assets && assets.length > 0 ? formatChartData(assets)[0]  : [],
      backgroundColor: [
        'rgba(255, 205, 86, 0.7)',
        'rgba(255, 159, 64, 0.7)',
        'rgba(255, 0, 0, 0.7)',
        'rgba(139, 0, 139, 0.7)',
        'rgba(50, 205, 50, 0.7)',
        'rgba(0, 100, 0, 0.7)',
      ],
      borderColor: [
        'rgb(255, 205, 86)',
        'rgb(255, 159, 64)',
        'rgb(255, 0, 0)',
        'rgb(139, 0, 139)',
        'rgb(50, 205, 50)',
        'rgb(0, 100, 0)',
      ],
      borderWidth: 1
    }]
  };
  const options = {
    responsive: true,
    onClick: function(evt, element) {
      if(element.length > 0)
      {
        history.push(`/project/model/${projecti.model.id}/assets`);
        }
    },
  };

  const data2 = {
    labels: [
      'Pre-manufactured',
      'Manufactured',
      'In Storage',
      'In Transit',
      'Offloaded on site',
      'Installed on site'
    ],
      datasets: [ 
      {
        label: "In Time",
        backgroundColor: "rgba(73,181,255)",
        borderColor: "rgba(73,181,255,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: assets && assets.length > 0 ? Object.values(formatChartData(assets)[1]).map(item => item.inTime): []
      },

      {
        label: "Due Soon (< 7 days)",
        backgroundColor: "rgba(231,159,93)",
        borderColor: "rgb(255,203,95)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: assets && assets.length > 0 ? Object.values(formatChartData(assets)[1]).map(item => item.dueSoon): []
      },
        {
          label: "Past Due Date",
          backgroundColor: "rgb(231,110,110)",
          borderColor: "rgba(231,110,110,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: assets && assets.length > 0 ? Object.values(formatChartData(assets)[1]).map(item => item.pastDueDate): []
        },
        
    ],
    
  }
  const options2 = {
    responsive: true,
    legend: {
      display: true
    },
    events: ['click'],
    scales: {
        xAxes: [{
          minBarLength: 2,
          grid: {
            offset: true
          }
         
        }
      ]
    }

  };

  const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async() => {

    const projectsWithModel = projects && projects.length > 0 ? projects.filter (item => item.model !== null): [];
    setProjectsWithModels(projectsWithModel)
  
    if(projects && projects.length > 0 && modelId === null){
      const getmodelProject = projects.find(proj =>  proj.model !== null )
      const assetsData = (await dispatch(getModelAssetsData(getmodelProject.model.id))).data
      setProject(getmodelProject);
      if(assetsData && assetsData.length > 0){
        setAssets(assetsData)
      }else{
        setAssets([])
      }
    } 
    else if(projects && projects.length >0 && modelId !== null){
       const getmodelProject = projectsWithModel.find(proj => proj.model.id === parseInt(modelId));
       setProject(getmodelProject);
       const assetsData = (await dispatch(getModelAssetsData(modelId))).data;
       setAssets(assetsData);
    } else{
     return
    }
  },[dispatch,projects, modelId]);


  const handleChange = (event) => {
    event.preventDefault();
    setModelId(event.target.value);
    
  }

 

  return (
    <>
     <CRow>
       <CCol xs="6" lg={'6'} className="h-50">
         <CCard accentColor="primary" textColor="primary">
           <CCardBody>
             <CRow style={{textAlign:"center"}}>
               <CCol lg="3" md="3" sm="12"> <FontAwesomeIcon icon={faBuilding} size="2x" /></CCol>
               <CCol lg="9" md="9" sm="12"> <span className="text-lg text-lg-center"> {projects ? projects.length: 'Loading...'} </span>
                 <span className="d-block text-uppercase text-muted font-weight-bold text-sm-start">Project</span></CCol>
             </CRow>

           </CCardBody>
         </CCard>
       </CCol>
       <CCol xs="6" lg={'6'} className="h-50">
         <CCard accentColor="info" textColor="info">
           <CCardBody>
           <CRow style={{textAlign:"center"}}>
             <CCol lg="3" md="3" sm="12"><FontAwesomeIcon icon={faUsers} size="2x"/> </CCol>
             <CCol lg="9" md="9" sm="12">
                 <span className="text-lg text-lg-center"> 6 </span>
                 <span className="d-block text-uppercase text-muted font-weight-bold text-sm-start"> Users</span>
             </CCol>
           </CRow>
           </CCardBody>
         </CCard>
       </CCol>
       <CCol xs="12" lg={'12'} className="h-50">
         <CCard accentColor="success" textColor="info">
             <CCardHeader>
               <h2>FIRE BIM</h2>
             </CCardHeader>
           <CCardBody>
             About us
           </CCardBody>
         </CCard>
       </CCol>
      
       {/* {loggedInUser && loggedInUser.role === 'admin' ? <CCol xs="6" lg="3">
         <CCard accentColor="danger" textColor="danger">
           <CCardBody>
             <CRow style={{textAlign:"center"}}>
             <CCol lg="3" md="3" sm="12"> <FontAwesomeIcon icon={faUsers} size="2x"/></CCol>
             <CCol lg="9" md="9" sm="12">
                 <span className="text-lg text-lg-center"> {users ? users.length : 'Loading...'} </span>
                 <span className="d-block text-uppercase text-muted font-weight-bold text-sm-start"> Users</span>
             </CCol>
            </CRow>
           </CCardBody>
         </CCard>
       </CCol>: null } */}
     </CRow>
    </>
  )
}


export default Dashboard;
