import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {useHistory } from "react-router";
import queryString from 'query-string';
import validate from 'validate.js';
import {signup} from '../../../actions/authActions';


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
  },
  confirmpassword: {
    presence: { allowEmpty: false, message: 'is required'},
    length: {
        maximum: 128
    },
    equality: 'password'
  }
};

const Signup = props => {
  const params = queryString.parse(props.location.search);
  let token = params.token;
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

  const handleSignUp = (e) => {
    e.preventDefault();
    dispatch(signup({
        firstName: formState.values.firstName, 
        lastName: formState.values.lastName,
        userName: formState.values.userName,
        password: formState.values.password
    }, token, history));
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;
  
 
  return (
    <div className="px-5">
        <p className="text-center text-xl">Signup</p>
        <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleSignUp}>
            <div className="flex flex-col pt-4">
                {/* <label htmlFor="firstName" className="text-lg">First Name</label> */}
                <input type="text" id="firstName" name="firstName" placeholder="First Name" className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" onChange={handleChange} value={formState.firstName} />
                <span>{hasError && hasError['firstName']? formState.errors.firstName[0] : null} </span>
            </div>
            <div className="flex flex-col pt-4">
                {/* <label htmlFor="lastName" className="text-lg">Last Name</label> */}
                <input type="text" id="lastName" name="lastName" placeholder="Last Name" className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" onChange={handleChange} value={formState.lastName} />
                <span>{hasError && hasError['lastName']? formState.errors.lastName[0] : null} </span>
            </div>
            <div className="flex flex-col pt-4">
                {/* <label htmlFor="lastName" className="text-lg">Last Name</label> */}
                <input type="text" id="userName" name="userName" placeholder="User Name" className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" onChange={handleChange} value={formState.userName} />
                <span>{hasError && hasError['userName']? formState.errors.userName[0] : null} </span>
            </div>
            <div className="flex flex-col pt-4">
                {/* <label htmlFor="password" className="text-lg">Password</label> */}
                <input type="password" id="password" placeholder="Password" name="password" className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" autoComplete="current-password"  onChange={handleChange} value={formState.password}/>
                <span>{hasError && hasError('password')? formState.errors.password[0] : null} </span>
            </div>
            <div className="flex flex-col pt-4">
                {/* <label htmlFor="confirmpassword" className="text-lg">Confirm Password</label> */}
                <input type="password" id="confirmpassword" placeholder="Confirm Password" name="confirmpassword" className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" autoComplete="current-password"  onChange={handleChange} value={formState.confirmpassword}/>
                <span>{hasError && hasError('confirmpassword')? formState.errors.confirmpassword[0] : null} </span>
            </div>
            <button><div className="loginButton text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8">Create Acount</div></button>
        </form>
        <div className="text-center pt-5 pb-12">
            <p>Have an account ? <Link to={"/login"} className="underline font-semibold">Login here</Link></p>
        </div>
    </div>

  )
}

export default Signup
