import React from 'react';
import {Panel, FormGroup, ControlLabel} from 'react-bootstrap';
import {FormControl, Button} from 'react-bootstrap';
import './Login.css';
import './Api';

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
        return true;
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

export default Login;
