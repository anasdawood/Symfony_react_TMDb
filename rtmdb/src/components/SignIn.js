import React, { Component } from 'react';
import { logIn } from '../serverCalls/userActions';
import { browserHistory } from 'react-router';


class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value
    });
  }

  handlePasswordChange(e) {

    this.setState({
      password: e.target.value
    });

  }

  handleButtonClicked(e) {
    var component = this;
    e.preventDefault();
    let userData = {
      userName: this.state.email,
      userPassword: this.state.password
    };
    logIn(userData).
      then((res) => {
        if (res.status === 200) {
          this.saveUserData({id:res.data.id,userName: res.data.userName});
          browserHistory.push("/app");
        }
        if (res.status === 404) {
          alert("User Not Found ");
        }
      }).catch((err) => {
        console.log(err)
      });
  }

  saveUserData(userResponse) {
    if (userResponse.id != null && userResponse.userName != null)
      localStorage.setItem("userData", JSON.stringify({ id: userResponse.id, userName: userResponse.userName }));
  }

  render() {

    return (
      <div className="form-inline">
        <h2>Sign In</h2>
        <div className="form-group">
          <input
            value={this.state.email}
            className="form-control" type="email" placeholder="E-mail" onChange={this.handleEmailChange.bind(this)} />
          <input
            value={this.state.password}
            className="form-control" type="password" placeholder="Password" onChange={this.handlePasswordChange.bind(this)} />
          <button
            className="btn btn-primary" type="button" onClick={this.handleButtonClicked.bind(this)}> Sign In </button>
        </div>
      </div>
    );
  }
}


export default SignIn;
