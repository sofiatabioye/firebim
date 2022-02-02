import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import {useHistory } from "react-router";
import queryString from 'query-string';
import {useDispatch} from "react-redux";
import validate from "validate.js";
import {resetPassword} from "../../../actions/authActions";

const schema = {
  password: {
    presence: {allowEmpty: false, message: 'is required'},
    length: {
      minimum: 6,
      maximum: 32
    }
  },
  confirmPassword: {
    presence: {allowEmpty: false, message: 'is required'},
    length: {
      maximum: 32,
      minimum: 6,
      message: "must be at least 6 characters"
    },
    equality: 'password'
  }
};

const ResetPassword = props => {

  const params = queryString.parse(props.location.search);
  let token = params.resetToken;
  let userId = params.id;
  const history = useHistory();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  const dispatch = useDispatch();

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


  const handleResetPassword = (e) => {
    e.preventDefault();
    dispatch(resetPassword({password: formState.values.password, resetToken: token, userId: userId}, history));
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
      <p className="text-center text-xl">Reset Password</p>
      
      <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleResetPassword}>
        <div className="flex flex-col pt-4">
            <label htmlFor="password" className="text-lg">New Password</label>
            <input type="password" id="password" placeholder="Password" name="password" className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"  onChange={handleChange} value={formState.values.password || ''} required/>
            <span className="text-danger py-2">{hasError && hasError('password')? formState.errors.password[0] : null} </span>
        </div>
        <div className="flex flex-col pt-4">
            <label htmlFor="password" className="text-lg">Confirm Password</label>
            <input type="password" id="confirmPassword" placeholder="Confirm Password" name="confirmPassword" className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" onChange={handleChange} value={formState.values.confirmPassword || ''} required/>
            <span className="text-danger py-2">{hasError && hasError('confirmPassword')? formState.errors.confirmPassword[0] : null} </span>
        </div>

        <input type="submit" value="Submit" className="loginButton text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8" disabled={!formState.isValid} />
      </form>
      <div className="text-center pt-5 pb-12">
          <p>Remember your password ? <Link to={"/login"} className="underline font-semibold">Login</Link></p>
      </div>
</div>
)};


export default ResetPassword;
