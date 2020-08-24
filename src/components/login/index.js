import React from "react";
import "./login.css";

import { Link } from "react-router-dom";

class Login extends React.Component{
    constructor(props){
        super(props)
    }

    render() {
        return(
            <div className="loginContainer" style={{animation: this.props.showBox && "loginBoxIn 1s linear"}}>
                <div className="loginHeader">
                    <p>Start tracking your favourite item</p>
                    <p onClick={this.props.onHideBox}><i className="fa fa-times"></i></p>
                </div>
                <h1 className="loginTitle">Sign In</h1>
                <div className="loginInputHolder">
                    <label htmlFor="email">Email</label>
                    <input name="email" placeholder="email" />

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="password" />
                    
                    <div className="rememberPwdHolder">
                        <input type="checkbox" />
                        <p>remember password</p>
                    </div>

                    <button>SIGN IN</button>
                    <a><p>forgot username or password?</p></a>
                </div>
                <p>Don't have account? Sign up <Link to="/register">here</Link> to start tracking your price</p>
            </div>
        )
    }
}

export default Login;