import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './login.css';
import axios from 'axios';


function Register(){
 const [userName, setUsername] = useState("");
 const [password, setPassword] = useState("");

  function changeUsername (e) {
    setUsername(e.target.value);
  };

  function changePassword (e) {
    setPassword(e.target.value);
  };

  
 async function submitForm(e){
    e.preventDefault();
    const data = {
      from_name: userName,
      from_password: password
    };
    const request = await axios.post("http://localhost:5000/login", data);
    
  }

  
    return (
      <div className="App">
        <h2> Login Form</h2>
        <form className="form_login">
        <TextField
            label="Username"
            type="text"
            variant="filled"
            onChange={changeUsername}
            value={userName}
          />
          <TextField
            label="Password"
            variant="filled"
            type="password"
            onChange={changePassword}
            value={password}
          />

          <Button type="button" color="primary"  variant="contained" onClick={submitForm}>
            Login
          </Button>
        </form>
      </div>
    );

}

export default Register;
