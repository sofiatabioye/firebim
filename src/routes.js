import React from 'react';


const AssetCategory = React.lazy(() => import('./views/pages/assetCategory/AssetCategory'));
const AssetDataPoint = React.lazy(() => import('./views/pages/assetDataPoint/AssetDataPoint'));
const Project = React.lazy(() => import('./views/pages/project/Project'));
const Dashboard = React.lazy(() => import('./views/pages/Dashboard/dashboard'));
const Projects = React.lazy(() => import('./views/pages/projects/Projects'));
const ProjectDataPoint = React.lazy(() => import('./views/pages/projectDatapoints/projectDatapoint'));
const Users = React.lazy(() => import('./views/pages/users/Users'));
const Assets = React.lazy( ()=> import('./views/pages/modelAsset/ModelAsset'));
const Viewer = React.lazy( ()=> import('./views/pages/viewer/viewer'));
const ChangePassword = React.lazy( ()=> import('./views/pages/changePassword/changePassword'));
const ResetPassword = React.lazy( ()=> import('./views/pages/resetpassword/resetpassword'));
const userProfile = React.lazy( ()=> import('./views/pages/user/profile'));
const BATutorial = React.lazy(()=> import('./views/pages/Tutorials/tutorial'));
const MobileTutorial = React.lazy(()=> import('./views/pages/Tutorials/tutorialMobile'));
const WebTutorial = React.lazy(()=> import('./views/pages/Tutorials/tutorialweb'));


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/assets/categories', exact: true, name: 'Asset Categories', component: AssetCategory },
  { path: '/assets/datapoints', exact: true, name: 'Asset Datapoints', component: AssetDataPoint },
  { path: '/projects', exact: true, name: 'Projects', component: Projects },
  { path: '/project/:projectId/datapoints', exact: true, name: 'Project Datapoints', component: ProjectDataPoint },
  { path: '/users', exact: true, name: 'Users', component: Users },
  { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
  { path: '/project/model/:modelId/assets', exact: true, name: 'Asset Data Points', component: Assets },
  { path: '/viewer/:urn', exact: true, name: 'Model Viewer', component: Viewer },
  { path: '/project/:projectId/:modelId', exact: true, name: 'Project', component: Project },
  { path: '/change-password', exact: true, name: 'Change Password', component: ChangePassword },
  { path: '/resetpassword/:resetToken:/id', exact: true, name: 'Reset Password', component: ResetPassword },
  { path: '/userprofile', exact: true, name: 'Profile', component: userProfile },
  {path: '/bat-tutorial', exact: true, name: 'BIM Asset Tagging Tutorial', component: BATutorial },
  {path: '/mobile-app-tutorial', exact: true, name: 'Mobile App Tutorial', component: MobileTutorial },
  {path: '/cloud-logistics-tutorial', exact: true, name: 'Web-based Cloud Logistics Tutorial', component: WebTutorial },
];

export default routes;
