import React from "react";
import { Link } from "react-router-dom"
import { connect } from "react-redux";
import Actions from "actions";

// Style
import "./header.css";

// Components
import Login from "components/login";

class Header extends React.Component{
    constructor(props){
        super(props)
        this.state={
            showLogin:false,
            userLoggedIn:false
        }
    }

    componentDidMount() {
        const { getUserSession } = this.props;

        if(getUserSession && getUserSession.data.status === "success") {
            this.setState({userLoggedIn:true})
            
            console.log("user Header", getUserSession)
        }
    }

    onLogoutPressed(){        
        this.props.onResetUserSession();
        
        alert("logout succsesful");
        window.location= "/";
    }

    render() {
        return(
            <div className="headerContainer">
                <div className="logoHolder">
                    <Link to="/"><h1><b>WhatThePrice</b></h1></Link>
                </div>
                <div>
                    <ul className="headerMenu">
                        {this.state.userLoggedIn && <li>Hi user</li>}
                        <li><Link to="/dashboard"><i className="fa fa-heart"></i>Track</Link></li>
                        {this.state.userLoggedIn ? (
                            <li onClick={()=> this.onLogoutPressed()}><i className="fa fa-user"></i>Logout</li>
                        ) : (
                            <li onClick={() => this.setState({showLogin:!this.state.showLogin})}><i className="fa fa-user"></i>Login</li>
                        )}
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

const mapStateToProps = (store) => ({
    getUserSession: Actions.getUserSession(store),
});
const mapDispatchToProps = {onResetUserSession:Actions.resetUserSession};

export default connect(mapStateToProps, mapDispatchToProps)(Header);