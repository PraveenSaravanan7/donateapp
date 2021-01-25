import React, { useState } from 'react'
import userdp from '../assets/images/user.png'
import "./Post.css";
import FeatherIcon from "feather-icons-react";
import { Link } from 'react-router-dom';
import  axios from "../api";
const copy = require('clipboard-copy')
const ls=require("local-storage")
export const Post = ({data,setcopied,fullview}) => {
    var [showcontact,setshowcontact]=useState(false)
    var [deleted,setdeleted]=useState(false)
    function copylink(){
        if(window.location.port){
        var text=window.location.hostname+":"+window.location.port+"/post/"+data._id}
        else{
        var text=window.location.hostname+"#/post/"+data._id}
        // var input=document.querySelector("#forcopytext")
        // input.value=text
        // console.log(input.value)
        // input.select()
        // document.execCommand("copy")
        copy(text)
        setcopied(text)
        //console.log(text)
    }
    
    async function DeletePost(pid,photo) {
        try {   
            var url="/posts?pid="+pid    
          
          const response = await axios.delete(url);         
          console.log(response.data);
          setdeleted(true)
        } catch (error) {
          console.log(error)
        }
      }
    return (<>
    {!deleted &&
        <div className="post-div shadow-sm" >
           
            <Link to={"/profile/"+data.userid._id} >
            <span className="h5 d-inline-block text-truncate m-0 truncate2 text-black" >
            <img src={data.userid.profilepic?data.userid.profilepic:userdp} className="post-dp mr-2 "  />
            <b> {data.userid.name}</b>        
            </span>
            </Link>
           
          
            <div className="dropdown float-right">
  <button className="btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  <FeatherIcon icon="chevron-down"   ></FeatherIcon>
  </button>
  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
      {ls("user_id")==data.userid._id?
    <a className="dropdown-item text-danger" onClick={()=>DeletePost(data._id,data.photo)} >Delete</a> :
    <a className="dropdown-item text-dark"  >Report  </a>
}
  </div>
</div>
            { !fullview?  <Link to={"/post/"+data._id} >
           { data.photo &&  <img src={data.photo} className="post-pic" />}
           <div>
           {data.title && <span className="d-inline-block text-truncate h5 font-weight-bold mt-2 truncate mb-0 text-black"  > {data.title}</span> }
           {data.description && <span className="d-inline-block text-truncate truncate text-muted text-small"  > {data.description}</span> }
           </div>
            </Link>
          :
        <>
          { data.photo &&  <img src={data.photo} className="post-pic" />}
          <div>
          {data.title && <span className="d-inline-block  h4 font-weight-bold mt-2 mb-0 text-black"  > {data.title}</span> }<br></br>
          {data.description && <span className="d-inline-block text-muted font-weight-bold"  > {data.description}</span> }
          </div>
         </>
          }
          
          <span className="badge badge-pill badge-light"> {data.category} </span>
           <span className="badge badge-pill badge-light ml-2"> {data.country}</span>
           <span className="badge badge-pill badge-light ml-2"> {data.state}</span>
           {showcontact &&
           <div className="contact-info p-3 mt-3 mb-3" >
               <h4><b>Contact Info</b> <span onClick={()=>setshowcontact(false)} className="float-right" ><FeatherIcon icon="x"  ></FeatherIcon></span> </h4>
                {data.phone && <> <span><b>Phone:</b> {data.phone} </span><br></br></>}
                {data.mail && <> <span><b>Email:</b> {data.mail} </span><br></br></>}
               <span><b>Address:</b> {data.address}, {data.state}, {data.country} </span>
           </div>}

           <div className="row text-primary mt-2 fs16 " >
               <div className="col text-center px-0 unselectable" onClick={()=>setshowcontact(true)} >
                   <span className="btn p-0 m-0 text-primary " ><b>
                   <FeatherIcon  icon="phone" size={15} ></FeatherIcon> Contact
                   </b></span>
               </div>
               <Link to={"/post/"+data._id} >
               <div className="col text-center px-0 unselectable"  >
                   <span className="btn p-0 m-0 text-primary " ><b>
                   <FeatherIcon  icon="message-circle" size={15} ></FeatherIcon> Comment
                   </b></span>
               </div>      
                </Link>  
            <div className="col text-center px-0 unselectable" onClick={()=>{copylink()}} >
                   <span className="btn p-0 m-0 text-primary " ><b>
                   <FeatherIcon  icon="share-2" size={15} ></FeatherIcon> Share
                   </b></span>
              
               </div>
           </div>
        </div>
    }</>
    )
}
