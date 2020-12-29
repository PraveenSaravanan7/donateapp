import React, { useState } from 'react'
import { useEffect } from 'react'
import { NavLink} from 'react-router-dom'
import {Header} from '../components/Header'
import { Post } from "../components/Post";
import FeatherIcon from "feather-icons-react"
import axios from "../api";
import { useInView,InView } from 'react-intersection-observer';
import { data } from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  
export const HomePage = () => {
    var [loading,setloading]=useState(true);
    var [err,seterr]=useState(false);
    var [type,settype]=useState('requirement')
    var [category,setcategory]=useState([null])
    var [tab1post,settab1post]=useState([])
    var [skip1,setskip1]=useState(0)
    var [stopfetch1,setstopfetch1]=useState(false)
    var [tab2post,settab2post]=useState([])
    var [skip2,setskip2]=useState(0)
    var [stopfetch2,setstopfetch2]=useState(false)
    var [collapse1,setcollapse1]=useState("null")
    var [collapse2,setcollapse2]=useState("collaspe")
    var [copied, setcopied]=useState("")
    async function Getposts() {
        setloading(true)
        seterr(false)
        try {      
          var queryparams=""
          var url= "/posts?"
          var x=type=="requirement"?skip1:skip2
          if(type){
              queryparams+="skip="+ x +"&type="+type
            }
            if(category[0]){
                queryparams+= "&" + "category="+category
              }
          const response = await axios.get(url+queryparams);
          console.log(response.data)
          if(type=="requirement"){
          settab1post( tab1post.concat(response.data))
          setskip1(skip1+10)       
          if(!response.data[0] || response.data.length <10){setstopfetch1(true);console.log("stoped");}
        }
          else{
            settab2post( tab2post.concat(response.data))
            setskip2(skip2+10)
            if(!response.data[0] || response.data.length <10 ){setstopfetch2(true);console.log("stoped");}
          }
          //setloading(false)
        } catch (error) {
          seterr(error);
          //setloading(false)
        }
      }
    useEffect(()=>{
      if(type=="requirement"){
        setcollapse2("collaspe")
        setcollapse1("null")
      }else{
        setcollapse1("collaspe")
        setcollapse2("null")
      }
    },[type])
    useEffect(()=>{
      if(copied){
      toast.info('Link copied !!!', {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });}
    },[copied])
    return (
        <div>
           <ToastContainer />
          <input id="forcopytext"  value=""  />
            <Header home={true} settype={settype} type={type} ></Header>
            <div >
            <div className={"tab1 pt120 tabdiv "+ collapse1 }  >
              { tab1post.map((post)=> <Post key={post._id} data={post} setcopied={setcopied} ></Post> )  }
          {!stopfetch1 &&
            <InView as="div" onChange={(inView, entry) =>{if(inView){Getposts()}}}>
             <div className="container mb-4 text-center"  >
              <button className=" btn btn-light " ><div className="spinner-border text-dark" role="status"  ></div> </button>
              </div>
              </InView>}
            </div>
  
            <div className={"tab2 pt120 tabdiv " + collapse2 }  >
              { tab2post.map((post)=> <Post key={post._id} data={post}  setcopied={setcopied} ></Post> )  }
          {!stopfetch2 &&
            <InView as="div" onChange={(inView, entry) =>{if(inView){Getposts()}}}>
             <div className="container mb-4 text-center"  >
              <button className=" btn btn-light " ><div className="spinner-border text-dark" role="status"  ></div> </button>
              </div>
              </InView>}
            </div>
            </div>
        </div>
    )
}
