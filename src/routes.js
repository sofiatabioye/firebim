import React from 'react';


const Project = React.lazy(() => import('./views/pages/project/Project'));
const Dashboard = React.lazy(() => import('./views/pages/Dashboard/dashboard'));
const Projects = React.lazy(() => import('./views/pages/projects/Projects'));
const Users = React.lazy(() => import('./views/pages/users/Users'));
const Viewer = React.lazy( ()=> import('./views/pages/viewer/viewer'));
const ChangePassword = React.lazy( ()=> import('./views/pages/changePassword/changePassword'));
const ResetPassword = React.lazy( ()=> import('./views/pages/resetpassword/resetpassword'));
const userProfile = React.lazy( ()=> import('./views/pages/user/profile'));



const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/projects', exact: true, name: 'Projects', component: Projects },
  { path: '/users', exact: true, name: 'Users', component: Users },
  { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
  { path: '/viewer/:urn', exact: true, name: 'Model Viewer', component: Viewer },
  { path: '/project/:projectId', exact: true, name: 'Project', component: Project },
  { path: '/change-password', exact: true, name: 'Change Password', component: ChangePassword },
  { path: '/resetpassword/:resetToken:/id', exact: true, name: 'Reset Password', component: ResetPassword },
  { path: '/userprofile', exact: true, name: 'Profile', component: userProfile },
];

export default routes;
