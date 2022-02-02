import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useHistory } from "react-router";
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'
import {logout} from '../actions/authActions';



const TheLayout = () => {

  const history = useHistory()
  const loggedInUser = useSelector(state => state.auth.user);
  const loggedIn = useSelector(state => state.auth.profile);
  const projects = useSelector(state => state.project.projects);
  const dispatch = useDispatch();



  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logout(history));
  }


  return (
    <div className="c-app c-default-layout">
      <TheSidebar user={loggedInUser} projects={projects} />
      <div className="c-wrapper">
        <TheHeader handleLogout={handleLogout} user={loggedIn}/>
        <div className="c-body">
          <TheContent/>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default TheLayout
