import React from 'react'
import './Header.css'
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';
export const Header = (props) => {
    return (
        <>
        <div className="header p-2 px-2" >
            <div className="px-2" >
            <span className="logo text-primary">DonateApp
            {props.home?
            <span className="float-right" >
            <Link to={"/profile/me"}>
            <FeatherIcon icon="user"  className="icon mr-4" ></FeatherIcon>
            </Link>
            
            <FeatherIcon icon="bell" className="icon mr-4" ></FeatherIcon>
            
            <Link to={"/settings"}>
            <FeatherIcon icon="settings" className="icon" ></FeatherIcon>
            </Link>
            </span>:
             <span className="float-right" >
             <FeatherIcon icon="info"  className="icon" ></FeatherIcon>
             </span>
            }
            </span>
            </div>
            {props.home && 
            <>
            <div className="mt-2" >
                <div className="togglerbg bg-light" >
                <button className={props.type=="requirement"?" btn btn-sm  btn-primary":" btn btn-sm  btn-light" }  onClick={()=>props.settype("requirement")} >Requirements</button>
                <button  className={props.type!="requirement"?" btn btn-sm ml-2 btn-primary":" btn btn-sm ml-2  btn-light" } onClick={()=>props.settype("donation")} >Donation</button>
                </div>
                <div className="filterbtnbg bg-light" >
                <button className="btn btn-sm btn-light  " >  Filter</button>
                </div>
            </div>
            {/* <div className="filterdiv mt-3" ><h3> Apply Filter</h3>
            <div class="form-check mb-2">
        <input class="form-check-input" type="checkbox" id="autoSizingCheck" />
        <span class="form-check-label" for="autoSizingCheck">
          Remember me
        </span>
      </div><div class="form-check mb-2">
        <input class="form-check-input" type="checkbox" id="autoSizingCheck" />
        <label class="form-check-label" for="autoSizingCheck">
          Remember me
        </label>
      </div>
            </div>
            */}
            </>
}
        </div>  
        {props.home &&
        <Link to={'/addpost'} >
        <div className="add-btn"  >
            <FeatherIcon className="add-icon" icon="plus" size={40} color="#007bff" ></FeatherIcon>
        </div>
        </Link>
        }
        
        </>
    )
}
