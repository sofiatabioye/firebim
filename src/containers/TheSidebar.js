import React, {useEffect, useState} from 'react'
import { useDispatch,useSelector } from 'react-redux';

import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'
import CIcon from "@coreui/icons-react";


const _navAdmin =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,

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

  {
    _tag: 'CSidebarNavTitle',
    _children: ['Projects']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Projects',
    to: '/projects',
    icon: 'cil-list'
  },

 
  


];


const TheSidebar = (props) => {
  const dispatch = useDispatch();
  const show = useSelector(state => state.initial.sidebarShow);
  const [nav, setNav] = useState([]);
  const {user, projects} = props;

  
  useEffect(() => {


    let nav = user && user.role === 'admin' ? _navAdmin  : _navAdmin;
    setNav(nav)

  }, [projects, user])

  return (
    <CSidebar
      className="sidebar-dark"
      show={show}
      onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none my-4 text-decoration-none text-center pr-2" to="/dashbaord">
        {/* <img src={Logo} alt="logo" /> */}
        <h4 style={{color: "#ede6e6"}}>Fire BIM</h4>
      </CSidebarBrand>
      <CSidebarNav>

        <CCreateElement
          className="sidebar-links"
          items={nav}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />

      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none"/>
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
