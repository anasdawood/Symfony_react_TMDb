import React, { Component } from 'react';
import { logIn } from '../serverCalls/userActions';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { logUser } from '../actions';


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
          component.props.dispatch(logUser(res.data));
          browserHistory.push("/app");
        }
        if (res.status === 404) {
          alert("User Not Found ");
        }
      }).catch((err) => {
        console.log(err)
      });

  }

  render() {

    return (
      <div className="form-inline">
        <h2>Sign In</h2>
        <div className="form-group">
          <input
            value={this.state.email}
            className="form-control" type="text" placeholder="E-mail" onChange={this.handleEmailChange.bind(this)} />
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

function mapStateToProps(state) {

  const { email } = state;
  return { email }
}

export default connect(mapStateToProps, null)(SignIn);
