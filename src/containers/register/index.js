import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Actions from "actions";

import "./register.css";

class Register extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email: "",
            name: "",
            password: "",
            password_confirmation: "",
        }
    }

    componentDidMount() {
        console.log("DID MOUNT", this.props.getUserSession);
        const { getUserSession } = this.props;
        if(Object.keys(getUserSession.data).length !== 0) {
            console.log("no user")
        }
    }

    componentDidUpdate(prevProps){
        const { getRegisterData } = this.props;

        if(prevProps.getRegisterData.isLoading && !getRegisterData.isLoading) {
            console.log("Register Data", getRegisterData);
            if(
                Object.keys(getRegisterData.data).length !== 0 &&
                getRegisterData.data != null
            ) {
                alert("Success", "Register successful");
            } else if(getRegisterData.error != null) {
                alert("Failed", "Register failed");
            }
        }
    }

    onRegisterPressed(){
        const data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation,
        }
        console.log("data to dispatch" , data)
        this.props.onRegister(data);
    }

    render() {
        return(
            <div className="registerContainer">
                <h1 className="registerTitle">Sign Up</h1>
                <div className="registerInputHolder">
                    <label htmlFor="name">Name</label>
                    <input
                        className="authInput"
                        name="name" 
                        placeholder="name"
                        onChange={(name) => this.setState({name:name.target.value})}
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        className="authInput"
                        name="email" 
                        placeholder="email" 
                        onChange={(email) => this.setState({email:email.target.value})}
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        className="authInput"
                        type="password" 
                        name="password" 
                        placeholder="password"
                        onChange={(password) => this.setState({password:password.target.value})}
                    />

                    <label htmlFor="password">Confirm Password</label>
                    <input
                        className="authInput"
                        type="password" 
                        name="password_confirmation" 
                        placeholder="confirm password" 
                        onChange={(password_confirmation) => this.setState({password_confirmation:password_confirmation.target.value})}
                    />
                </div>

                <button className="authButton" onClick={() => this.onRegisterPressed()}>SIGN UP</button>
                <p>Already registered? Go to <Link to="/">homepage</Link> to sign in</p>
            </div>
        )
    }
}

const mapStateToProps = (store) => ({
    getUserSession: Actions.getUserSession(store),
    getRegisterData: Actions.getRegisterData(store),
});
const mapDispatchToProps = {
    onRegister: Actions.register,
};


export default connect(mapStateToProps,mapDispatchToProps)(Register);
