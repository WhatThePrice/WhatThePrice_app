import React from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Actions from "actions";

import "./login.css";

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email: "",
            name: "",
        }
    }

    componentDidMount() {
        console.log("DID MOUNT", this.props.getUserSession);
        const { getUserSession } = this.props;
        if(Object.keys(getUserSession.data).length != 0) {
            this.props.navigation.navigate("BottomTab");
        }
    }

    componentDidUpdate(prevProps) {
        const { getLoginData } = this.props;

        if(prevProps.getLoginData.isLoading && !getLoginData.isLoading) {
            console.log("Login Data", getLoginData);
            if(
                Object.keys(getLoginData.data).length != 0 &&
                getLoginData.data != null
            ) {
                alert("Success", "Login successful");
            } else if(getLoginData.error != null) {
                alert("Failed", "Login failed");
            }
        }
    }

    
    onLoginPressed(){
        const data = {
            email: this.state.email,
            password: this.state.password,
        }
        console.log("data to dispatch" , data)
        this.props.onLogin(data);
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
                    <input 
                        name="email" 
                        placeholder="email" 
                        onChange={(email) => this.setState({email:email.target.value})}
                    />

                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="password" 
                        onChange={(password) => this.setState({password:password.target.value})}
                    />
                    
                    <div className="rememberPwdHolder">
                        <input type="checkbox" />
                        <p>remember password</p>
                    </div>

                    <button onClick={() => this.onLoginPressed()}>SIGN IN</button>
                    <a><p>forgot username or password?</p></a>
                </div>
                <p>Don't have account? Sign up <Link to="/register" onClick={this.props.onHideBox}>here</Link> to start tracking your price</p>
            </div>
        )
    }
}

const mapStateToProps = (store) => ({
    getUserSession: Actions.getUserSession(store),
    getLoginData: Actions.getLoginData(store),
});
const mapDispatchToProps = {
    onLogin: Actions.login,
};

export default connect(mapStateToProps,mapDispatchToProps)(Login);