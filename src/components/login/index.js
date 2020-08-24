import React from "react";
import "./login.css";

import { Link } from "react-router-dom";

class Login extends React.Component{
    render() {
        return(
            <div className="loginContainer" >
                <h1 className="loginTitle">Sign In</h1>
                <p>Start tracking your favourite item</p>
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