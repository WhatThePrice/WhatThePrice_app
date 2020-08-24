import React from "react";
import { Link } from "react-router-dom";

import "./register.css";

class Register extends React.Component{
    render() {
        return(
            <div className="registerContainer">
                <h1 className="registerTitle">Sign Up</h1>
                <div className="registerInputHolder">
                    <label htmlFor="name">Name</label>
                    <input name="name" placeholder="name" />

                    <label htmlFor="email">Email</label>
                    <input name="email" placeholder="email" />

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="password" />

                    <label htmlFor="password">Confirm Password</label>
                    <input type="password" name="password" placeholder="confirm password" />
                </div>

                <button>SIGN UP</button>
                <p>Already registered? Go to <Link to="/">homepage</Link> to sign in</p>
            </div>
        )
    }
}

export default Register;
