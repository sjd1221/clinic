import { Outlet, Link } from "react-router-dom";
import 'bulma/css/bulma.css';
// import './src/css/login.css';
import axios from "axios";
import React, { useState } from "react";


const Login = () => {
  const [state, setState] = useState({
    Username: "",
    Password: ""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8000/', state)
  .then(res => {
    console.log(res.data);
  });
  };

  
  return (
    <form onSubmit={handleSubmit} style={{marginTop: '50px'}} className="column is-half">
      <div className="box is-flex is-flex-direction-column is-justify-content-center is-align-items-center ">
      <figure class="image is-128x128">
        <img className="is-one-third" src="https://east.nikan.hospital/wp-content/uploads/sites/7/2023/03/Logo-1.png"/>
      </figure>
        <label className="label ">Username</label>
          <input name='Username' className="input column is-one-third" placeholder="Username" value={state.Username} onChange={handleInputChange}/>
        <label className="label mt-4">Password</label>
          <input name='Password' className="input column is-one-third" placeholder="Password" value={state.Password} onChange={handleInputChange}/>
          <button type='submit' className="button mt-4 is-link is-rounded">
              Login
          </button>
      </div>
    </form>  
  )
};

export default Login;