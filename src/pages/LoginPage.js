import React from 'react'
import {Header} from '../components/Header'
import axios from '../api'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
const ls=require('local-storage')
export const LoginPage = () => {
    const history=useHistory()
    var [formData, updateFormData] = useState([]);
    var [loading,setloading]=useState(false);
    var [err,seterr]=useState(false);
    async function login() {
        setloading(true)
        seterr(false)
        try {           
          const response = await axios.post('/users/login',formData);         
          if(response.data.accessToken){
           
            return response.data
          }
          setloading(false)
        } catch (error) {
          seterr(error);
          setloading(false)
        }
      }
   
    function gotosignup(){
        history.replace('/signup')
    }
    const handleChange = (e) => {
      updateFormData({
        ...formData,
        [e.target.name]: e.target.value.trim()
      });
    };
    function handleLogin(event){
        event.preventDefault();
        login().then(data=>{
          if(data.accessToken){
          ls("accessToken",data.accessToken);
          ls("user_id",data.user_id);
          history.replace('/#/')
          }
        })
    }
    return (
        <div>
            <Header home={false}></Header>
            <div className="mt60 pt-5" >
                <h2>Welcome Back</h2>
                <span>Donate and get donated.</span>
        <form className="mt-4 px-2" onSubmit={(event) => handleLogin(event)}>
<div className="form-group ">
<span ><b>Email</b></span>
    <input type="email" className="form-control" required  name="email"  onChange={handleChange}/>
  </div>
  <div className="form-group">
    <span ><b>Password</b></span>
    <input type="password" className="form-control" required name="password" onChange={handleChange}/>
  </div>
  {err &&
  <span className="text-danger font-weight-bold">Incorrect email and password combination. <br/></span>
}
  <button type="submit" className="mt-2 btn  btn-primary">
  {loading? <>Loading...</>:<>Login</> } 
  </button>
</form>
<br></br>
<span className="text-muted" onClick={gotosignup}><b>Don't have an account? <a>SignUp</a> </b></span>
            </div>
        </div>
    )
}
