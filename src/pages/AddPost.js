import React, { useEffect, useState } from 'react'
import {Header_two} from "../components/Header_two"
import FeatherIcon from "feather-icons-react"
import imageCompression from 'browser-image-compression';
import  axios from "../api";
var worldMapData = require('city-state-country')

export const AddPost = () => {
    var formData_form= new FormData()
    var[postsuccess,setpostsuccess]=useState(false)
    var [formData, updateFormData] = useState([]);
    var [loading,setloading]=useState(false);
    var [loadingpreview,setloadingpreview]=useState(false);
    var [err,seterr]=useState(false);
    var [Country, updateCountry] = useState([]);
    var [States, updateStates] = useState([]);
    var [imgURL,updateimgURL]=useState(null)
    async function uploadpost() {
      for ( var key in formData ) {
        formData_form.append(key, formData[key]);
    }
         //console.log(formData)
         setloading(true)
         seterr(false)
         try {           
           const response = await axios.post('/posts',formData_form);         
           if(response){
             setloading(false)
            setpostsuccess(true)
            window.scrollTo(0, 0)
           }
          
         } catch (error) {
           seterr(error);
           setloading(false)
         }
       }
     
    const handleChange = (e) => {
        updateFormData({
          ...formData,
          [e.target.name]: e.target.value.trim()
        });
        //formData_form.append( e.target.name,e.target.value.trim())
      };
      function handleAdd(event){
          event.preventDefault();
            uploadpost()
          //formData_form.map((i)=>console.log(i))
      }
      async function imgurlupd(file){
        let imageDataUrl = await URL.createObjectURL(file)
        updateimgURL(imageDataUrl)
      }
      const handlePhoto = (event) => {
        setloadingpreview(true)
        if(event.target.files[0]){
        imageCompression(event.target.files[0], {maxSizeMB:2,maxWidthOrHeight:1080})
        .then((file)=> {
          //formData_form.append("avatar",file,event.target.files[0].name)
          updateFormData({
            ...formData,
            avatar: file
          });
            imgurlupd(file)
            .then(setloadingpreview(false))
            
        });
      }
      };
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
    useEffect(()=>{
      updateFormData({
        ...formData,
        type: "requirement",
        category: "food",
        avatar:null
      });
    },[])
    return (
        <div className="mt60  pb-5">
            <Header_two name="Add Post" ></Header_two>
           {postsuccess?<div className="text-center " >
             <h1>Upload Successfull.</h1>
           </div>:<>
            <form className="pt-1 px-2" onSubmit={(event) => handleAdd(event)}>
           
  <div className="form-group ">
<span ><b>Type</b></span>
    <select className="form-control" required  name="type"  onChange={handleChange}>
        <option value="requirement" >Requirement</option>
        <option value="donation" >Donation</option>
    </select>
  </div>
  <div className="form-group ">
<span ><b>Category</b></span>
    <select className="form-control" required  name="category"  onChange={handleChange}>
        <option value="food" >Food</option>
        <option value="blood" >Blood</option>
        <option value="clothes" >Clothes</option>
        <option value="books" >Books</option>
        <option value="Money" >Money</option>
        <option value="Others" >Others</option>
    </select>
  </div>
<div className="form-group ">
<span ><b>Title</b></span>
    <input type="text" className="form-control" required  name="title"  onChange={handleChange}/>
  </div>
  <div className="form-group ">
<span ><b>Description</b></span>
    <textarea type="text" className="form-control" required  name="description"  onChange={handleChange}></textarea>
  </div>
  <div className="form-group ">  
<span ><b>Address</b></span>
    <input type="text" className="form-control" required  name="address"  onChange={handleChange}/>
  </div>
  <div className="form-group ">  
<span ><b>Phone</b></span><span className="text-muted text-small"> (Optional)</span>
    <input type="text" className="form-control" name="phone"  onChange={handleChange}/>
  </div>
  <div className="form-group ">  
<span ><b>Email</b></span><span className="text-muted text-small"> (Optional)</span>
    <input type="email" className="form-control" name="mail"  onChange={handleChange}/>
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
    <input  type="text" list="statelist" className="form-control" required name="state" onChange={handleChange}/>
    <datalist id="statelist">
        {States.map(country =>{
          return <option key={country.id} value={country.name}></option>  
        })}
    </datalist>
  </div>
  <input hidden  id="postphotoinput" name="avatar" type="file" accept="image/*" onChange={handlePhoto} />

  <button type="submit" id="submitpost" hidden className="mt-3 btn  btn-primary">
  {loading? <>Loading...</>:<>Post</> } 
  </button>
</form>

{
    imgURL && <img className="img-preview  mb-2" src={imgURL} />
}

<button  onClick={()=>{document.getElementById('postphotoinput').click()}} className="btn btn-light btn-block mt-2" >
 {loadingpreview? <>Loading...</>:<><FeatherIcon icon="image" ></FeatherIcon> Add Photo</>} </button>

{err &&
  <span className="text-danger font-weight-bold">Error <br/></span>
}

<button  onClick={()=>{document.getElementById('submitpost').click()}}  className="mt-3 btn  btn-primary">
  {loading? <>Loading...</>:<>Upload</> } 
  </button></>}
  {/* <button onClick={uploadpost} >test</button> */}
        </div>
    )
}
