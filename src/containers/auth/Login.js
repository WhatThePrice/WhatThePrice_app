import React, { Component } from "react";

import { connect } from "react-redux";
import Actions from "../../actions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailInput: "",
      passwordInput: ""
    };

    this.onSubmitPressed = this.onSubmitPressed.bind(this);
  }

  onSubmitPressed() {
    const data = {
      email: this.state.emailInput,
      password: this.state.passwordInput
    };

    this.props.onLogin(data);
  }
  render() {
    console.log("DATA", this.props.getLoginData);
    return (
      <div>
        <h1>this is login screen</h1>
        <input
          type="text"
          placeholder="email"
          onChange={email => {
            this.setState({ emailInput: email.target.value });
          }}
        />
        <input
          type="text"
          placeholder="password"
          onChange={password => {
            this.setState({ passwordInput: password.target.value });
          }}
        />

        <button onClick={this.onSubmitPressed}>Login</button>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  getLoginData: Actions.getLoginData(store)
});
const mapDispatchToProps = {
  onLogin: Actions.login
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
