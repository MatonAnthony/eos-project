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
import Menubar from './Menubar';
import './index.css';

ReactDOM.render((
    <App />
  ),
  document.getElementById('root')
);
