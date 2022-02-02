import React, { Suspense, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'

// routes config
import routes from '../routes'
import jwt from "jsonwebtoken";
import {setCurrentUser, getUsers, getModelAssetsData, getUser} from "../actions/authActions";
import { getProjects } from "../actions/projectActions";
import {getAssetCategories, getAssetFields} from "../actions/assetActions";
import setAuthorizationToken from "../utils/setAuthToken";



const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)
const isAuthenticated = () => {
  const token = localStorage.getItem("x-access-token");
  return !!token && !(jwt.decode(token).exp < Date.now() / 1000);
}


const TheContent = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.auth.user);
  const projects = useSelector(state => state.project.projects);


  useEffect(() => {
      const loggedInUser = localStorage.getItem("user");
      const token = localStorage.getItem("x-access-token");
      if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser);
        setAuthorizationToken(token);
        dispatch(setCurrentUser( foundUser));
      }
      dispatch(getProjects());
      dispatch(getAssetFields());
      dispatch(getAssetCategories());
      dispatch(getModelAssetsData(1));
      dispatch(getUser(loggedIn.id));
    
      if ( loggedInUser && JSON.parse(loggedInUser).role === 'admin') {
      dispatch(getUsers());
      }


  }, []);
  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              return route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  project={projects}
                  name={route.name}
                  render={props => (
                    <CFade>
                      <route.component {...props} />
                    </CFade>
                  )} />  
              )
            })}
            <Redirect from="/" to="/dashboard" />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(TheContent)
