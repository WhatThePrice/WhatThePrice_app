import React from "react";
import { Link } from "react-router-dom"
import { connect } from "react-redux";
import Actions from "actions";

// Style
import "./header.css";

// Components
import Login from "components/login";
import Modal from "components/modal";

class Header extends React.Component{
    constructor(props){
        super(props)
        this.state={
            showLogin:false,
            userLoggedIn:false,

            // user info
            username:"",

             // Auth status
            showModal: false,
            isLoading: true,
            authStatus:"" ,
            description:""
        }
    }

    componentDidMount() {
        const { getUserSession } = this.props;

        if(getUserSession && getUserSession.data.status === "success") {
            this.setState({
                userLoggedIn:true,
                username:getUserSession.data.user.name,
            })
            
            console.log("user Header", getUserSession)
        }
    }

    onLogoutPressed(){    
        this.setState({showModal:!this.state.showBox});    
        this.props.onResetUserSession();

        this.setState({
            isLoading:!this.state.isLoading,
            authStatus: "Logout Successful",
            description: "You will redirect to homepage"
        })
    }

    render() {
        return(
            <div className="headerContainer">
                <div className="logoHolder">
                    <Link to="/"><h1><b>WhatThePrice</b></h1></Link>
                </div>
                <div>
                    <ul className="headerMenu">
                        {this.state.userLoggedIn && <li>Hi {this.state.username}</li>}
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
                {this.state.showModal && <Modal 
                    isLoading={this.state.isLoading}
                    modalTitle="Auth"
                    status={this.state.authStatus}
                    description={this.state.description}
                    onClick={() => window.location = "/"}
                />}
            </div> 
        )
    }
}

const mapStateToProps = (store) => ({
    getUserSession: Actions.getUserSession(store),
});
const mapDispatchToProps = {onResetUserSession:Actions.resetUserSession};

export default connect(mapStateToProps, mapDispatchToProps)(Header);