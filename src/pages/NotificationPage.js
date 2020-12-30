import React from 'react'
import { Header_two } from "../components/Header_two";
import FeatherIcon from "feather-icons-react";
export const NotificationPage = () => {
    return (
        <div>
            <Header_two name="Notification" ></Header_two>
            <div className="mt60" >
                    <br/>
                    <div className="text-center" >
                    <h3>Under Developement</h3>
                    <br/>
                    <FeatherIcon icon="github" size={100} ></FeatherIcon>
                    <br/>
                    <br/>
                    <a className="text-break" target="blank" href="https://github.com/PraveenSaravanan7/donateapp_frontend" ><b>https://github.com/PraveenSaravanan7/donateapp_frontend</b></a>
                    <h4>Contribute on GitHub  </h4>
                </div>
            </div>
        </div>
    )
}
