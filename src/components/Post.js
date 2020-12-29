import React, { useState } from 'react'
import "./Post.css";
import FeatherIcon from "feather-icons-react";
import { Link } from 'react-router-dom';

export const Post = ({data,setcopied,fullview}) => {
    var [showcontact,setshowcontact]=useState(false)
    function copylink(){
        if(window.location.port){
        var text=window.location.hostname+":"+window.location.port+"/post/"+data._id}
        else{
        var text=window.location.hostname+"/post/"+data._id}
        var input=document.querySelector("#forcopytext")
        input.value=text
        console.log(input.value)
        input.select()
        document.execCommand("copy")
        setcopied(input.value)
        //console.log(text)
    }
    return (
        <div className="post-div" >
           
            <Link to={"/profile/"+data.userid._id} >
            <span className="h5 d-inline-block text-truncate m-0 truncate2 text-black" >
            <img src={data.userid.profilepic} className="post-dp mr-2 "  />
            <b> {data.userid.name}</b>        
            </span>
            </Link>
           
            <FeatherIcon icon="chevron-down" className="float-right mt-2"  ></FeatherIcon>
            { !fullview?  <Link to={"/post/"+data._id} >
           { data.photo &&  <img src={data.photo} className="post-pic" />}
           <div>
           {data.title && <span className="d-inline-block text-truncate h4 font-weight-bold mt-2 truncate mb-0 text-black"  > {data.title}</span> }
           {data.description && <span className="d-inline-block text-truncate truncate text-muted"  > {data.description}</span> }
           </div>
            </Link>
          :
        <>
          { data.photo &&  <img src={data.photo} className="post-pic" />}
          <div>
          {data.title && <span className="d-inline-block  h4 font-weight-bold mt-2 mb-0 text-black"  > {data.title}</span> }
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

           <div className="row text-primary mt-3 fs16 " >
               <div className="col text-center px-0" onClick={()=>setshowcontact(true)} >
                   <span><b>
                   <FeatherIcon  icon="phone" size={15} ></FeatherIcon> Contact
                   </b></span>
               </div>
               <div className="col text-center px-0"  >
                   <span><b>
                   <FeatherIcon  icon="message-circle" size={15} ></FeatherIcon> Comment
                   </b></span>
               </div>              
               <div className="col text-center px-0" onClick={()=>{copylink()}} >
                   <span><b>
                   <FeatherIcon  icon="share-2" size={15} ></FeatherIcon> Share
                   </b></span>
              
               </div>
           </div>
        </div>
    )
}
