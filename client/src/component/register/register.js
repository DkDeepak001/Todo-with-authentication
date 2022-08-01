import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../login/login.css';
import axios from "axios";

function Register(){
 const [userName, setUsername] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");

  function changeUsername (e) {
    setUsername(e.target.value);
  };
  function changeEmail (e) {
    setEmail(e.target.value);
  };
  function changePassword (e) {
    setPassword(e.target.value);
  };

 
  const submitForm = async(e) => {
    e.preventDefault();
    const data = {
      form_userName : userName,
      form_password : password,
      form_email : email
    }
    const request = await axios.post("http://localhost:5000/register", data);
    console.log(request.data);
    
  }
  
    return (
      <div className="App">
        <h2> Register Form</h2>
        <form className="form_login">
        <TextField
            label="Username"
            type="text"
            variant="filled"
            onChange={changeUsername}
            value={userName}
          />
          <TextField
            label="Email"
            type="email"
            variant="filled"
            onChange={changeEmail}
            value={email}
          />
          <TextField
            label="Password"
            variant="filled"
            type="password"
            onChange={changePassword}
            value={password}
          />

          <Button type="button" color="primary"  variant="contained" onClick={submitForm}>
            Register
          </Button>
        </form>
      </div>
    );

}

export default Register;
