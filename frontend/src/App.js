import React, { Component } from 'react';
import { Router, Route, Link, browserHistory, withRouter } from 'react-router'
import './App.css';
import Login from './Login';
import Identifier from './Identifier';
import AddProfile from './AddProfile';
import EditProfile from './EditProfile';
import ListClient from './ListClient';
import ListProfile from './ListProfile';
import ViewClient from './ViewClient';
import Menubar from './Menubar';
import './index.css';
import Api from './Api';

const App = React.createClass({

    getInitialState() {
        return {
            auth_token: undefined
        };
    },

    requireAuth(nextState, replace) {
        if(!Api.isAuthenticated()){
            replace({
                pathname: '/login',
                state: { nextPathname: nextState.location.pathname }
            });
        }
    },

    requireIdentifier(nextState, replace) {
        if(!Api.isStudentIdentified()){
            replace({
                pathname: '/',
                state: { nextPathname: nextState.location.pathname }
            });
        }
    },

    render() {
        return (
            <Router history={browserHistory}>
              <Route path="/" component={Identifier} />
              <Route path="/login" component={Login} />
              {/* <Route path="/menubar" component={Menubar} /> */}
              <Route path="/secure" component={Menubar}>
                <Route path="client" component={ListClient} onEnter={this.requireAuth}/>
                <Route path="profile/:profileId" component={EditProfile} onEnter={this.requireAuth}/>
                <Route path="profile/add" component={AddProfile} onEnter={this.requireAuth}/>
                <Route path="admin" component={Login} />
                <Route path="profile" component={ListProfile} onEnter={this.requireAuth}/>
                <Route path="client/:clientId" component={ViewClient} onEnter={this.requireAuth}/>
              </Route>
              <Route path="client/:clientId" component={ViewClient} />
            </Router>

        );
    }
});

export default App;
