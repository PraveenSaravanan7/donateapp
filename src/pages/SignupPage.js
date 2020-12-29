import React, { useEffect } from 'react'
import {Header} from '../components/Header'
import axios from '../api'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
var worldMapData = require('city-state-country')
const ls=require('local-storage')
export const SignupPage = () => {
    const history=useHistory()
    var [formData, updateFormData] = useState([]);
    var [loading,setloading]=useState(false);
    var [err,seterr]=useState(false);
    var [Country, updateCountry] = useState([]);
    var [States, updateStates] = useState([]);
    async function signup() {
        console.log(formData)
        setloading(true)
        seterr(false)
        try {           
          const response = await axios.post('/users',formData);         
          if(response.data){
            return response.data
          }
          setloading(false)
        } catch (error) {
          seterr(error);
          setloading(false)
        }
      }
  
    function gotologin(){
        history.replace('/login')
    }
    const handleChange = (e) => {
      updateFormData({
        ...formData,
        [e.target.name]: e.target.value.trim()
      });
    };
    function handleSignup(event){
        event.preventDefault();
        signup().then(data =>{
          if(data.accessToken){
          ls("accessToken",data.accessToken);
          ls("user_id",data.user_id);
          history.replace('/');
          }
        })
    }
    
    useEffect(() => {
        if(formData.country){
        updateCountry(worldMapData.searchCountry(formData.country));          
        }
    }, [formData.country])
    useEffect(() => {
        if(formData.state){       
    updateStates(worldMapData.getAllStatesFromCountry(formData.country));          
        }
    }, [formData.state])
    return (
        <div>
            <Header home={false}></Header>
            <div className="mt60 pt-5" >
                <h2>Welcome to Donate</h2>
                <span>Donate and get donated.</span>
        <form className="mt-4 px-2" onSubmit={(event) => handleSignup(event)}>
        <div className="form-group ">
<span ><b>Name</b></span>
    <input type="text" className="form-control" required  name="name"  onChange={handleChange}/>
  </div>
<div className="form-group ">
<span><b>Email</b></span>
    <input type="email" className="form-control" required  name="email"  onChange={handleChange}/>
  </div>
  <div className="form-group">
    <span  ><b>Password</b></span>
    <input type="password" className="form-control" required name="password" onChange={handleChange}/>
  </div>
  
  <div className="form-group">
    <span><b>Country</b></span>
    <input list="countrylist" type="text" className="form-control" required name="country" onChange={handleChange}/>
    <datalist id="countrylist">
        {Country.map(country =>{
          return <option key={country.id} value={country.name}></option>  
        })}
    </datalist>
  </div>

  <div className="form-group">
    <span><b>State</b></span>
    <input type="text" list="statelist" className="form-control" required name="state" onChange={handleChange}/>
    <datalist id="statelist">
        {States.map(country =>{
          return <option key={country.id} value={country.name}></option>  
        })}
    </datalist>
  </div>
  {err &&
  <span className="text-danger font-weight-bold">Email already exists try to log in. <br/></span>
}
  <button type="submit" className="mt-2 btn  btn-primary">
  {loading? <>Loading...</>:<>SignUp</> } 
  </button>
</form>
<br></br>
<span className="text-muted" onClick={gotologin}><b>Already have an account? <a>LogIn</a> </b></span>
            </div>
        </div>
    )
}
