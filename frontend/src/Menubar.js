import React from 'react';
import {Navbar, Nav, Button, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import './Menubar.css';
import Api from './Api';

const Menubar = React.createClass({
    getInitialState(){
        return null;
    },

    disconnect() {
        Api.deauthenticate();
    },

    render(){
        return(
            <div>
            <Navbar>
             <Navbar.Header>
              <Navbar.Brand>
                <LinkContainer to={{pathname : '/secure/client'}}>
                <a>Softwarify</a>
               </LinkContainer>
              </Navbar.Brand>
              <Navbar.Toggle/>
             </Navbar.Header>
            <Navbar.Collapse>
            <Nav>
              <LinkContainer to={{pathname: '/secure/profil'}}>
             <NavItem>Profil</NavItem>
            </LinkContainer>
              <LinkContainer to={{pathname: '/secure/client'}}>
             <NavItem>Utilisateurs</NavItem>
            </LinkContainer>
              <LinkContainer to={{pathname: '/secure/ressource'}}>
             <NavItem>Ressources</NavItem>
              </LinkContainer>
              <LinkContainer to={{pathname: '/secure/profile/add'}}>
                <NavItem>Ajouter un utilisateur</NavItem>
              </LinkContainer>
                </Nav>
            <Nav pullRight>
              <NavItem onClick={this.disconnect}>Déconnexion</NavItem>
              </Nav>
            </Navbar.Collapse>
            </Navbar>

            <div class="container">
              {this.props.children}
            </div>
            </div>
        );
    }
});

export default Menubar;
