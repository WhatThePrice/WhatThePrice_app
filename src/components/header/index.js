import React from "react";
import { Link } from "react-router-dom"

import "./header.css";

import Login from "components/login";

class Header extends React.Component{
    constructor(props){
        super(props)
        this.state={
            showLogin:false
        }
    }


    render() {
        return(
            <div className="headerContainer">
                <div className="logoHolder">
                    <Link to="/"><h1><b>WhatThePrice</b></h1></Link>
                </div>
                <div>
                    <ul className="headerMenu">
                        <li><Link to="/dashboard"><i className="fa fa-heart" aria-hidden="true"></i>Track</Link></li>
                        <li onClick={() => this.setState({showLogin:!this.state.showLogin})}><i className="fa fa-user" aria-hidden="true"></i>Login</li>
                    </ul>
                </div>
                {this.state.showLogin && 
                    <Login
                        showBox={this.state.showLogin}
                        onHideBox={() => this.setState({showLogin:!this.state.showLogin})}
                    />
                }
            </div> 
        )
    }
}

export default Header;