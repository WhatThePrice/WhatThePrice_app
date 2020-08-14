import React from "react";
import "./header.css";

class Header extends React.Component{
    render() {
        return(
            <div className="headerContainer">
                <div className="logoHolder">
                    <h1><b>WhatThePrice</b></h1>
                </div>
                <div>
                    <ul className="headerMenu">
                        <li><i className="fa fa-heart" aria-hidden="true"></i>Track</li>
                        <li><i className="fa fa-user" aria-hidden="true"></i>Login</li>
                    </ul>
                </div>
            </div> 
        )
    }
}

export default Header;