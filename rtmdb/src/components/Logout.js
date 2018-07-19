import React, { Component } from 'react';
import { browserHistory } from 'react-router';
class Logout extends React.Component {
    // This syntax ensures `this` is bound within handleClick.
    // Warning: this is *experimental* syntax.

    componentDidMount() {
        localStorage.clear();
        browserHistory.push('/signin');
    }

    render() {
        return (
            <div></div>
        );
    }
}

export default Logout;