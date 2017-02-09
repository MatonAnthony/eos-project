import React from 'react';
import ReactDOM from 'react-dom';
import {Panel, FormGroup, ControlLabel} from 'react-bootstrap';
import {FormControl, Button, Form} from 'react-bootstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './AddProfile.css';
import Api from './Api';
const uuid = require('react-native-uuid');


const URL = Api.getUrl();
const EditClient = React.createClass({
    getInitialState() {
        return {
            identifier: '',
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            profileId: '',
            profileName: '',

            profileList: [],
            selectedProfile: ''
        };
    },

    componentDidMount() {
        let options = {
            method: 'GET',
            mode: 'cors'
        };

        fetch(URL + '/Clients/' + this.props.params.clientId, options).then((response) => {
            return response.json().then((json) => {
                this.setState({
                    identifier: json.identifier,
                    firstname: json.first_name,
                    lastname: json.last_name,
                    email: json.email,
                    password: json.password,
                    profileId: json.profileId,
                    selectedProfile: json.profileId,
                    profileName: json.profile.full_name
                });

                fetch(URL + '/Profiles', options).then((response) => {
                    return response.json().then((json) => {
                        let profileList = this.state.profileList;
                        json.forEach((element) => {
                            profileList.push({
                                value: element.acronyme,
                                label: element.full_name
                            });
                        });
                        this.setState({profileList: profileList });
                    });
                });
            });
        });
    },

    submitForm() {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify({
                'identifier': this.state.identifier,
                'first_name': this.state.firstname,
                'last_name': this.state.lastname,
                'email': this.state.email,
                'password': this.state.password,
                'profileId': this.state.selectedProfile.value
            }),
            headers: headers
        };

        fetch(URL + '/Clients', options)
            .then((response) => {
                if(response.ok) {
                    console.log("Client edited");
                }else{
                    console.log(response);
                    /* TODO : Add an error handler */
                }
            });
    },

    handleSelectionChange(selectedProfile) {
        this.setState({
            selectedProfile: selectedProfile
        });
    },

    handleIdentifierChange(event) {
        this.setState({identifier: event.target.value});
    },

    handleFirstnameChange(event) {
        this.setState({firstname: event.target.value});
    },

    handleLastnameChange(event) {
        this.setState({lastname: event.target.value});
    },

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    },

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    },

    render() {
        return (
 <div className="container">
                  <h1 className="title">Editer un utilisateur</h1>
                  <form>
                    <FormGroup>
                      <ControlLabel>Identifier :</ControlLabel>
                      <FormControl
                        type="text"
                        value={this.state.identifier}
                        onChange={this.handleIdentifierChange}
                        />

                      <ControlLabel>Nom : </ControlLabel>
                      <FormControl
                        type="text"
                        value={this.state.lastname}
                        onChange={this.handleLastnameChange}
                        />
                      <ControlLabel>Prénom : </ControlLabel>
                      <FormControl
                        type="text"
                        value={this.state.firstname}
                        onChange={this.handleFirstnameChange}
                        />
                      <ControlLabel>Adresse email : </ControlLabel>
                      <FormControl
                        type="text"
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                        />
                      <ControlLabel>Mot de passe : </ControlLabel>
                      <FormControl
                        type="text"
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                        />


                    </FormGroup>

                    <h2>Modifier le profil de cet utilisateur :</h2>

                      <Select
                        name="selectors"
                        value={this.state.selectedProfile}
                        placeholder="Choissisez vos ressources"
                        options={this.state.profileList}
                        onChange={this.handleSelectionChange}

                        />

                      <br/>

                    <Button
                      type="button"
                      bsStyle="success"
                      onClick={this.submitForm}
                      >Modifier</Button>
                  </form>
                </div>

        );
    }
});

export default EditClient;
