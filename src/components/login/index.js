import React from "react";

class Login extends React.Component{
    render() {
        return(
            <div className="loginContainer">
                <h1>Sign In</h1>
                <label htmlFor="email">Email</label>
                <input name="email" placeholder="email" />

                <label htmlFor="password">password</label>
                <input type="password" name="password" placeholder="password" />

                <p>forgot username or password?</p>

                <button>Sign In</button>

                <p>Don't have account? Sign up here to start tracking your price</p>
            </div>
        )
    }
}