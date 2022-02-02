import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router";
import validate from "validate.js";
import {forgotPassword} from "../../../actions/authActions";



const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  }
};

const ForgotPassword = props => {


  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });
  const dispatch = useDispatch();
  const history = useHistory();

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


  const handleForgotPassword = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(formState.values));
    setFormState({
      isValid: false,
      values: {},
      touched: {},
      errors: {}
    });
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

return (
  <div className="px-5">
      <p className="text-center text-xl">Forgot Password ?</p>
      <p className="text-center text-md">Please provide your email</p>
      <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleForgotPassword}>
          <div className="flex flex-col pt-4">
              <label htmlFor="email" className="text-lg">Email</label>
              <input type="email" id="email" name="email" placeholder="your@email.com" className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" name="email" autoComplete="email address" onChange={handleChange} value={formState.email} />
              <span>{hasError && hasError['email']? formState.errors.email[0] : null} </span>
          </div>

          <input type="submit" value="Submit" className="loginButton text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8" disabled={!formState.isValid} />
      </form>
      <div className="text-center pt-5 pb-12">
          <p>Remember your password ? <Link to={"/login"} className="underline font-semibold">Login</Link></p>
      </div>
  </div>
)};

export default ForgotPassword
