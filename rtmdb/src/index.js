import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import Logout from './components/Logout';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Details from './components/Details';
import NotFoundPage from './components/NotFoundPage'
import { Router, browserHistory, Route, withRouter, IndexRedirect } from 'react-router';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/">
            <IndexRedirect to="/signin" />
        </Route>
        <Route path="/app" component={App} />
        <Route path="/signup" component={withRouter(SignUp)} />
        <Route path="/signin" component={withRouter(SignIn)} />
        <Route path="/logout" component={Logout} />
        <Route path="/movie/details/:dashId" component={withRouter(Details)} />
        <Route path="*" component={NotFoundPage} />
    </Router>
    , document.getElementById('root'));
registerServiceWorker();
