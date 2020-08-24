import React from "react";

class Register extends React.Component{
    render() {
        return(
            <div className="registerContainer">
                <h1>Sign Up</h1>
                <label htmlFor="name">Name</label>
                <input name="name" placeholder="name" />

                <label htmlFor="email">Email</label>
                <input name="email" placeholder="email" />

                <label htmlFor="password">password</label>
                <input type="password" name="password" placeholder="password" />

                <label htmlFor="password">confirm password</label>
                <input type="password" name="password" placeholder="confirm password" />

                <button>Sign Up</button>
            </div>
        )
    }
}

export default Register;
