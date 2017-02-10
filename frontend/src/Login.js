import React from 'react';
import {Panel, FormGroup, ControlLabel} from 'react-bootstrap';
import {FormControl, Button} from 'react-bootstrap';
import {withRouter} from 'react-router';
import './Login.css';
import Api from './Api';

const URL = Api.getUrl();

const Login = React.createClass({
    getInitialState() {
        return {
            pseudo: '',
            password: ''
        };
    },

    getValidationState() {
        const pseudo = this.state.pseudo;
        const password = this.state.password;

        if(pseudo.length < 0 || password.length < 0) return 'error';

        return 'success';
    },

    handleLoginChange(event) {
        this.setState({pseudo: event.target.value}, () => {
            this.getValidationState();
        });
    },

    handlePasswordChange(event) {
        this.setState({password: event.target.value}, () => {
            this.getValidationState();
        });
    },

    submitForm() {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                'username': this.state.pseudo,
                'password': this.state.password
            }),
            headers: headers
        };

        fetch(URL + '/Users/login', options).then((response) => {
            return response.json().then((json) => {
                Api.authenticate(json.id);
                if(response.ok) {
                    this.props.router.push({
                        pathname: 'secure/client'
                    })
                }
            });
        });
    },

    render() {
        let title = 'Partie securisée - Connexion';
        let panelColor = 'primary';

        return (
                <div className="container center-box vertical-centering">
                <div>
                    <Panel header={title} bsStyle={panelColor}>
                        <form>
                            <FormGroup
                                validationState={this.getValidationState()}
                            >
                                <ControlLabel>Username :</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.pseudo}
                                    placeholder="Pseudo"
                                    onChange={this.handleLoginChange}
                                />

                                <ControlLabel>Password :</ControlLabel>
                                <FormControl
                                    type="password"
                                    value={this.state.password}
                                    placeholder="Password"
                                    onChange={this.handlePasswordChange}
                                />
                            </FormGroup>

                            <Button
                                type="button"
                                bsStyle="success"
                                className="login-btn"
                                onClick={this.submitForm}
                            > Submit </Button>
                        </form>
                    </Panel>
                </div>
            </div>
        );
    },
})

export default withRouter(Login);
