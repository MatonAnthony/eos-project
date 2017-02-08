import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router'
import App from './App';
import Login from './Login';
import Identifier from './Identifier';
import AddProfile from './AddProfile';
import EditProfile from './EditProfile';
import ListClient from './ListClient';
import ListProfile from './ListProfile';
import ViewClient from './ViewClient';
import './index.css';

ReactDOM.render((
    <Router history={browserHistory}>
      <Route path="/" component={Identifier} />
        <Route path="client" component={ListClient} />
        <Route path="profile/:profileId" component={EditProfile} />
        <Route path="profile/add" component={AddProfile} />
        <Route path="admin" component={Login} />
        <Route path="profile" component={ListProfile} />
        <Route path="client/:clientId" component={ViewClient} />
    </Router>),
  document.getElementById('root')
);
