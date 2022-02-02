import React from 'react'
// import { useSelector, useDispatch } from 'react-redux';
import CIcon from '@coreui/icons-react'


const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '#',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,

  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Asset Data Fields']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Asset Tagging Categories',
    to: '/assets/categories',
    icon: <CIcon name="cil-list-rich" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Asset Tagging Fields',
    to: '/assets/datapoints',
    icon: 'cil-list',
  },

  {
    _tag: 'CSidebarNavTitle',
    _children: ['Projects']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Project Dashboard',
    to: '/projects',
    icon: 'cil-pencil'
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Project A',
    route: '/base',
    icon: 'cil-notes',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Model',
        to: '/project',
        icon: 'cil-layers'
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Asset DataPoints',
        to: '/project/model/asset',
        icon: 'cil-list'
      }
    ],
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Users']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Users',
    to: '/users',
    icon: 'cil-user',
  },
]

export default _nav
