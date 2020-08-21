import React from "react";
import { Link } from "react-router-dom"

import "./header.css";

class Header extends React.Component{
    render() {
        return(
            <div className="headerContainer">
                <div className="logoHolder">
                    <Link to="/"><h1><b>WhatThePrice</b></h1></Link>
                </div>
                <div>
                    <ul className="headerMenu">
                        <li><Link to="/dashboard"><i className="fa fa-heart" aria-hidden="true"></i>Track</Link></li>
                        <li><i className="fa fa-user" aria-hidden="true"></i>Login</li>
                    </ul>
                </div>
            </div> 
        )
    }
}

export default Header;