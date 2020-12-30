import React from 'react'
import { useHistory } from 'react-router-dom';
import { Header_two } from "../components/Header_two";
export const SettingsPage = () => {
    const ls= require("local-storage")
    const history=useHistory()
    function logout(){
        ls("accessToken",null)
        ls("user_id",null)
        history.replace('/signup')
    }
    return (
        <div>
            <Header_two name="Settings" ></Header_two>
            <div className="mt60" >
                <button className="btn btn-block btn-danger" onClick={logout} > Log Out </button>
            </div>
        </div>
    )
}
