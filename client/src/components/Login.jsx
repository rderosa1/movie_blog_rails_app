import React from 'react';
import { Link } from 'react-router-dom';


// This component handles our login form and has a link to the register form
const Login = (props) => {

  return (
    <div className = "login-page">
      <h2>login Page</h2>
      <hr />
      <form onSubmit={(e) => {
        e.preventDefault();
        props.handleLogin();}} >
        <input name="username" type="text" value={props.formData.username} onChange={props.handleChange} placeholder="username"/>
        <input name="password" type="password" value={props.formData.password} onChange={props.handleChange} placeholder= "password"/>
        <button>Login</button>
        <br/>
        <h3>Don't have an account?</h3>
        <Link to="/register"><span className = "register">Register</span></Link>
      </form>
    </div>
  );
}

export default Login;