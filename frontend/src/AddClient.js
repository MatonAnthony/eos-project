import React from 'react';
import {Panel, FormGroup, ControlLabel} from 'react-bootstrap';
import {FormControl, Button, Form} from 'react-bootstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './AddProfile.css';
import Api from './Api';
const uuid = require('react-native-uuid');

const URL = Api.getUrl();
const AddClient = React.createClass({
    getInitialState() {
        return {
            identifier: '',
            profile: '',
            firstname: '',
            lastname: '',
            email: '',
            profileId: '',

            profileList: []
        };
    },

    componentDidMount(){
        let options = {
            method: 'GET',
            mode: 'cors',
        };
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
    },

    submitForm() {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        let options = {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                'identifier': this.state.identifier,
                'first_name': this.state.firstname,
                'last_name': this.state.lastname,
                'email': this.state.email,
                'profileId': this.state.selectedProfile.value
            }),
            headers: headers
        };

        fetch(URL + '/Clients', options).then((response) => {
            if(response.ok) {
                console.log("Success");
            }
        });
    },

    handleSelectionChange(selectedProfile) {
        this.setState({
            profileId: selectedProfile.value
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

    render() {

        return(
            <div className="container">
              <h1 className="title">Ajouter un Client</h1>
              <form>
                <FormGroup>
                  <ControlLabel>Matricule :</ControlLabel>
                  <FormControl
                    type="text"
                    placeholder="Matricule"
                    onChange={this.handleIdentifierChange}
                    />

                  <ControlLabel>Prénom : </ControlLabel>
                  <FormControl
                    type="text"
                    placeholder="Anthony"
                    onChange={this.handleFirstnameChange}
                    />

                  <ControlLabel>Nom : </ControlLabel>
                  <FormControl
                    type="text"
                    placeholder="Maton"
                    onChange={this.handleLastnameChange}
                    />

                  <ControlLabel>Email : </ControlLabel>
                  <FormControl
                    type="email"
                    placeholder="Email"
                    onChange={this.handleEmailChange}
                    />
                </FormGroup>

                <h2>Choissisez le profil de l'utilisateur :</h2>

                <Select
                  name="selectors"
                  placeholder="Séléctionner un profil"
                  value={this.state.profileId}
                  options={this.state.profileList}
                  onChange={this.handleSelectionChange}
                  />

                <br/>
                <Button
                  type="button"
                  bsStyle="success"
                  onClick={this.submitForm}
                  >Ajouter</Button>
              </form>
            </div>
        );
    }
});

export default AddClient;
