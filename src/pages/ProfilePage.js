import React, { useEffect,useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import axios from '../api'
import { Header_two } from "../components/Header_two";
import { Post } from "../components/Post";
import { Loading } from "../components/Loading";
import FeatherIcon from 'feather-icons-react'
import './ProfilePage.css'
import userdp from '../assets/images/user.png'
import { useInView,InView } from 'react-intersection-observer';
import { data } from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ls=require("local-storage")

export const ProfilePage = ({match}) => {
    var [user,setuser]=useState([])
    var [loading,setloading]=useState(true);
    var [err,seterr]=useState(false);
    var [skip,setskip]=useState(0)
    var [stopfetch,setstopfetch]=useState(true)
    var [posts,setposts]=useState([])
    var [copied, setcopied]=useState("")
    const history=useHistory()
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
    async function Getuser() {
        setloading(true)
        seterr(false)
        try {       
          let {id}=match.params
          var url= id=='me'?'/users':'/users/'+id
          const response = await axios.get(url);         
          console.log(response.data);
          setuser(response.data)
          setloading(false)
        } catch (error) {
          seterr(error);
          setloading(false)
        }
      }
      async function Getposts() {
        try {       
          let {id}=match.params
          //console.log(id)
          id=id=="me"? ls("user_id") :id
          var url="/posts/userposts?userid="+id+"&skip="+skip
          const response = await axios.get(url);         
          console.log(response.data);
          setposts( posts.concat(response.data))
          setskip(skip+10)
          if(!response.data[0] || response.data.length <10){setstopfetch(true);console.log("stoped");}
        } catch (error) {
          seterr(error)
        }
      }
    useEffect(()=>{
        console.log("effect")
        Getuser().then(()=>setstopfetch(false))
    },[])
    return (
        <div > 
           <ToastContainer></ToastContainer>
          <Header_two name="Profile" ></Header_two>
          {!loading &&
          <div className="mt60">
            <div className="row" >
              <div className="col-8">
              <h2 className="mb-0 text-break" >
                {user.name}
              </h2>
              {user.description &&
              <>
              <span className="font-weight-bold text-muted" >{user.description}</span>
             <br></br></>}
             <span className="text-muted location-text"> <FeatherIcon icon="map-pin" size={14} ></FeatherIcon> {user.country}, {user.state} </span><br/>
             {user._id==ls("user_id")?
             <Link to={"/editprofile"} >
             <button className="btn btn-primary mt-2" >Edit Profile</button>
             </Link> 
            : null }
              </div>
              <div className="col-4 ">
                  <img className="userdp" src={ user.profilepic!=null?user.profilepic:userdp}  />
              </div>
             
            </div><br></br>
            { posts.map((post)=> <Post key={post._id} data={post}  setcopied={setcopied} ></Post> )  }
            {!stopfetch &&
            <InView as="div" onChange={(inView, entry) =>{if(inView){Getposts()}}}>
             <div className="container mb-4 text-center"  >
              <div className="spinner-border text-primary" role="status"  ></div> 
              </div>
              </InView>}
          </div>
        }
          {loading && <Loading></Loading> }
        </div>
    )
}
