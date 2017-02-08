import React from 'react';
import {Navbar, Nav, Button, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import './Menubar.css';


const Menubar = React.createClass({
    getInitialState(){
        return null;
    },

    render(){
        return(
            <Navbar>
             <Navbar.Header>
              <Navbar.Brand>
                <LinkContainer to={{pathname : '/client'}}>
                <a>Softwarify</a>
               </LinkContainer>
              </Navbar.Brand>
              <Navbar.Toggle/>
             </Navbar.Header>
            <Navbar.Collapse>
            <Nav>
              <LinkContainer to={{pathname: '/profil'}}>
             <NavItem>Profil</NavItem>
            </LinkContainer>
              <LinkContainer to={{pathname: '/client'}}>
             <NavItem>Utilisateurs</NavItem>
            </LinkContainer>
              <LinkContainer to={{pathname: '/ressource'}}>
             <NavItem>Ressources</NavItem>
            </LinkContainer>
            </Nav>
            </Navbar.Collapse>
            </Navbar>
        );
    }
});

export default Menubar;
