import React from 'react';
import {Panel, FormGroup, ControlLabel} from 'react-bootstrap';
import {FormControl, Button, Form} from 'react-bootstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './AddProfile.css';
import Api from './Api';
const uuid = require('react-native-uuid');

const URL = Api.getUrl();
const AddProfile = React.createClass({
    getInitialState() {
        return {
            acronym: '',
            fullname: '',
            ressources: [],
            selected: []
        };
    },

    componentDidMount(){
        let options = {
            method: 'GET',
            mode: 'cors',
        };
        fetch(URL + '/Ressources?access_token=' + Api.isAuthenticated(), options)
            .then((response) => {
            return response.json().then((json) => {
                json.forEach((element) => {
                    this.state.ressources.push(
                        {
                            value: element.id,
                            label: element.name + ' --- ' + element.export_format,
                        }
                    );
                });
            });
        });
    },

    submitForm() {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        let body = {
            acronyme: this.state.acronym,
            full_name: this.state.fullname,
        };
        let options = {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(body),
            headers: headers
        };

        fetch(URL + '/Profiles?access_token=' + Api.isAuthenticated(), options).then((response) => {
            if(response.ok) {
                let options = {
                    method: 'PUT',
                    mode: 'cors',
                    headers: headers
                };
                this.state.selected.forEach((element) => {
                    fetch(URL + '/Profiles/'
                          + this.state.acronym
                          + '/ressources/rel/'
                          + element.value
                          + '?access_token='
                          + Api.isAuthenticated()
                          , options)
                        .then((response) => {
                            if(response.ok) {
                                console.log('Added ressources to profile');
                            }
                        });
                });
            }
        });
    },

    handleSelectionChange(selectedRessources) {
        let values = selectedRessources.map(element => element.value);
        console.log(values);
        this.setState({
            selected: selectedRessources
        });
    },

    handleAcronymChange(event) {
        this.setState({acronym: event.target.value});
    },

    handleNameChange(event) {
        this.setState({fullname: event.target.value});
    },

    render() {

        return(
            <div className="container">
                  <h1 className="title">Ajouter un profil</h1>
                  <form>
                    <FormGroup>
                      <ControlLabel>Acronyme :</ControlLabel>
                      <FormControl
                        type="text"
                        placeholder="NDA"
                        onChange={this.handleAcronymChange}
                        />

                      <ControlLabel>Nom : </ControlLabel>
                      <FormControl
                        type="text"
                        placeholder="Non Directory Active"
                        onChange={this.handleNameChange}
                        />
                    </FormGroup>

                    <h2>Ajouter des ressources à ce profil :</h2>

                    <Select
                      name="selectors"
                      multi
                      value={this.state.selected}
                      placeholder="Choissisez vos ressources"
                      options={this.state.ressources}
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

export default AddProfile;
