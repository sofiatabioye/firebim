import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {useHistory } from "react-router";
import validate from 'validate.js';
import {login} from '../../../actions/authActions';


const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  }
};

const Login = props => {

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });
  const dispatch = useDispatch();
  const history = useHistory()

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // dispatch(login({email: formState.values.email, password: formState.values.password}, history));
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;
  
 
  return (

    <div className="px-5">
        <p className="text-center text-xl">Welcome.</p>
        <form className="flex flex-col pt-3 md:pt-8">
            <div className="flex flex-col pt-4">
                <label htmlFor="email" className="text-lg">Email</label>
                <input type="email" id="email" name="email" placeholder="your@email.com" defaultValue={"omolola.arawomo@firebim.com"} className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" name="email" autoComplete="email address" onChange={handleChange} value={formState.email} />
                <span>{hasError && hasError['email']? formState.errors.email[0] : null} </span>
            </div>

            <div className="flex flex-col pt-4">
                <label htmlFor="password" className="text-lg">Password</label>
                <input type="password" id="password" placeholder="Password" name="password" defaultValue={"firebim"} className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" autoComplete="current-password"  onChange={handleChange} value={formState.password}/>
                <span>{hasError && hasError('password')? formState.errors.password[0] : null} </span>
            </div>
            <Link to="/"><div className="loginButton text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8">Login</div></Link>
           
           
        </form>
        <div className="text-center pt-5 pb-12">
            <p>Forgot your password ? <Link to={"/forgotpassword"} className="underline font-semibold">Click here</Link></p>
        </div>
    </div>

  )
}

export default Login
