import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import {Redirect} from 'react-router';
import history from './history';
import jwt from 'jsonwebtoken';
import {Toaster} from 'react-hot-toast';
import AuthLayout from './views/pages/layouts/authPages';
import HomePageLayout from './views/pages/layouts/homepage';
import './scss/style.scss';

const isAuthenticated = () => {
  const token = localStorage.getItem("x-access-token");
  return !!token && !(jwt.decode(token).exp < Date.now() / 1000);
}


const UnauthenticatedRoute = ({ component: Component, ...rest }) => 
  
  (
  <Route {...rest} render={(props) => (
    !isAuthenticated()
     ? <AuthLayout><Component {...props} /></AuthLayout>
      : <Redirect to='/' />
  )} />
  );


const AuthenticatedRoute = ({ component: Component, ...rest }) => 
  {
 return (
   isAuthenticated() ?
  <Route {...rest} render={(props) => (
    <Component {...props} />
  )} /> : 
  <Redirect to='/login' /> 
 )
  };

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)
// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
// const Register = React.lazy(() => import('./views/pages/signup/signup'));
const ForgotPassword = React.lazy(() => import('./views/pages/forgotpassword/forgotpassword'));
const ResetPassword = React.lazy(() => import('./views/pages/resetpassword/resetpassword'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));
const Signup = React.lazy( ()=> import('./views/pages/signup/Signup'));

class App extends Component {

  render() {
    return (
      <BrowserRouter history={history}>
          <React.Suspense fallback={loading}>
            <Toaster />
            <Switch >
              <UnauthenticatedRoute exact path="/login" name="Login Page" component={withRouter(Login)} />
              <UnauthenticatedRoute exact path="/forgotpassword" name="Forgot Password Page" component={withRouter(ForgotPassword)} />
              <UnauthenticatedRoute exact path="/password-reset" name="Reset Password Page" component={withRouter(ResetPassword)} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              <UnauthenticatedRoute exact path="/sign-up" name="Sign up" component={withRouter(Signup)} />
              <AuthenticatedRoute path="/" name="Home"> <TheLayout /></AuthenticatedRoute>

            </Switch>
          </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
