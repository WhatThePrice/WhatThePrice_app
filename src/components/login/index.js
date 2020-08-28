import React from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Actions from "actions";

// Style
import "./login.css";

// Components
import Modal from "components/modal";


class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email: "",
            name: "",
            isShowing: this.props.showBox,

            // Auth status
            showModal: false,
            isLoading: true,
            authStatus:"" ,
            description:""
        }
    }

    componentDidMount() {
        const { getUserSession } = this.props;
        if(Object.keys(getUserSession.data).length !== 0) {
            console.log("user", getUserSession.data)
        }
    }

    componentDidUpdate(prevProps) {
        const { getLoginData } = this.props;

        if(prevProps.getLoginData.isLoading && !getLoginData.isLoading) {
            console.log("Login Data", getLoginData);
            if(getLoginData && getLoginData.data.status === "success"){
                this.setState({
                    isLoading:!this.state.isLoading,
                    authStatus: "Success",
                    description: "You will redirect to homepage"
                }, ()  => window.location = "/")
                //alert("Success");
                console.log("login success");
            } else if(getLoginData.error) {
                this.setState({
                    isLoading:!this.state.isLoading,
                    authStatus: "Failed",
                    description: "Please try again"
                })
                //alert("Failed", "Login failed");
            }
        }
    }
    
    onLoginPressed(){
        const data = {
            email: this.state.email,
            password: this.state.password,
        }
        this.props.onLogin(data);
        this.setState({
            showModal:!this.state.showBox,
            isShowing:!this.state.isShowing
        })
    }

    render() {
        return(
            <div>
                <div className={`loginContainer ${this.state.isShowing ? "active" : "hideBox"}`}>
                    <div className="loginHeader">
                        <p>Start tracking your favourite item</p>
                        <p onClick={() => this.setState({isShowing:!this.state.isShowing})}><i className="fa fa-times"></i></p>
                    </div>
                    <h1 className="loginTitle">Sign In</h1>
                    <div className="loginInputHolder">
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
                        
                        <div className="rememberPwdHolder">
                            <input type="checkbox" />
                            <p className="subtitleText">remember password</p>
                        </div>

                        <button className="authButton" onClick={() => this.onLoginPressed()}>SIGN IN</button>
                        <Link to="/"><p className="subtitleText">forgot username or password?</p></Link>
                    </div>
                    <div className="loginFooter">
                        <p className="subtitleText">Don't have account?</p> 
                        <p className="subtitleText">Sign up <Link to="/register" onClick={this.props.onHideBox}>here</Link> to start tracking your price</p>
                    </div>
                </div>
                {this.state.showModal && <Modal 
                    isLoading={this.state.isLoading}
                    modalTitle="Auth"
                    status={this.state.authStatus}
                    showModalButton={this.state.showModalButton}
                    description={this.state.description}
                    onClick={() => window.location = "/"}
                />}
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