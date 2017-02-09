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
const EditProfile = React.createClass({
    getInitialState() {
        return {
            acronym: '',
            fullname: '',
            ressources: [],
            selected: []
        };
    },

    componentDidMount() {
        /* TODO: Fetch call fill the profile */
        let options = {
            method: 'GET',
            mode: 'cors'
        };

        fetch(URL + '/Ressources', options).then((response) => {
            return response.json().then((json) => {
                let ressources = this.state.ressources;
                json.forEach((element) => {
                    ressources.push(
                        {
                            value: element.id,
                            label: element.name + ' --- ' + element.export_format,
                        }
                    );
                });

                this.setState({
                    ressources: ressources
                })

                fetch(URL + '/Profiles/' + this.props.params.profileId, options)
                    .then((response) => {
                        return response.json().then((json) => {
                            let selected = this.state.selected;
                            json.ressources.forEach((element) => {
                                selected.push(element.id)
                            });
                            this.setState({
                                acronym: json.acronyme,
                                fullname: json.full_name,
                                selected: selected
                            });
                        });
                    });
            });
        });
    },

    submitForm(){
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify({
                'acronyme': this.state.acronym,
                'full_name': this.state.fullname
            }),
            headers: headers
        };
        fetch(URL + '/Profiles/' + this.state.acronym, options)
            .then((response) => {
                if(response.ok) {
                    let options = {
                        method: 'DELETE',
                        mode: 'cors',
                    };
                    fetch(URL + '/Profiles/' + this.state.acronym + '/ressources', options)
                        .then((response) => {
                            if(response.ok) {
                                this.state.selected.forEach((element) => {
                                    let options = {
                                        method: 'PUT',
                                        mode: 'cors',
                                        headers: headers
                                    };
                                    fetch(URL + '/Profiles/'
                                          + this.state.acronym
                                          + '/ressources/rel/'
                                          + element.value
                                          , options).then((response) => {
                                             if(response.ok) {
                                                 /* TODO : Retour UI */
                                             }
                                         })
                                });
                            } else {
                            }
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
        return (
            <div className="container">
              <h1 className="title">Editer un profil</h1>
              <form>
                <FormGroup>
                  <ControlLabel>Acronyme :</ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.acronym}
                    onChange={this.handleAcronymChange}
                    />

                  <ControlLabel>Nom : </ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.fullname}
                    onChange={this.handleNameChange}
                    />
                </FormGroup>

                <h2>Modifier les ressources de ce profil :</h2>

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
                  >Modifier</Button>
              </form>
            </div>

        );
    }
});

export default EditProfile;
