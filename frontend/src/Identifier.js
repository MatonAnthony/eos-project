import React from 'react';
import {Panel, FormGroup, ControlLabel} from 'react-bootstrap';
import {FormControl, Button} from 'react-bootstrap';
import {withRouter} from 'react-router';
import './Identifier.css';
import Api from './Api';

const URL = Api.getUrl();

const Identifier = React.createClass({
    getInitialState() {
        return {
            identifier: ''
        };
    },

    getValidationState() {
        const identifier = this.state.identifier;

        if(identifier.length > 7) return 'error';

        return 'success';
    },

    handleIdentifierChange(event) {
        this.setState({identifier: event.target.value}, () => {
            this.getValidationState();
        });
    },

    submitForm() {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = {
            method: 'GET',
            mode: 'cors',
            headers: headers
        };

        fetch(URL + '/Clients/' + this.state.identifier + '/exists',
              options).then((response) => {
                  return response.json().then((json) => {
                      if(json.exists) {
                          Api.identifyStudent(this.state.identifier);
                          this.props.router.push({
                              pathname: 'client/' + this.state.identifier
                          });
                      }else{
                          /* TODO: Put an error mechanism */
                      }
                  })
         });

    },

    render() {
        let title = 'Récupération des informations de connexion';
        let panelColor = 'primary';

        return (
             <div className="container center-box vertical-centering">
                <div>
                    <Panel header={title} bsStyle={panelColor}>
                        <form>
                            <FormGroup
                                validationState={this.getValidationState()}
                            >
                                <ControlLabel>Matricule :</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.identifier}
                                    placeholder="Matricule"
                                    onChange={this.handleIdentifierChange}
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

export default withRouter(Identifier);
