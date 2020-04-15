import React from 'react';

// This component handles our register form
const Register = (props) => {

  return (
    <div className="register-page">
      <h2>Sign Up</h2>
      <hr />
      <form onSubmit={props.handleRegister} >
        <input name="username" type="text" value={props.username} onChange={props.handleChange} placeholder="username"/>
        <input name="email" type="text" value={props.email} onChange={props.handleChange} placeholder="email"/>
        <input name="password" type="password" value={props.password} onChange={props.handleChange} placeholder="password"/>
        <button>Register</button>
      </form>
    </div>
  );
}

export default Register;