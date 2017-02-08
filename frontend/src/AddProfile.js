import React from 'react';
import {Panel, FormGroup, ControlLabel} from 'react-bootstrap';
import {FormControl, Button, Form} from 'react-bootstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './AddProfile.css';
import Api from './Api';

const URL = Api.getUrl();
const RessourceSelector = React.createClass({
    getInitialState() {
        return {
            ressources: []
        };
    },

    componentDidMount(){
        /* TODO: Fetch call to get Ressources
           Blocked by bug #15 waiting for data
        */
        let options = {
            method: 'GET',
            mode: 'cors',
        };
        fetch(URL + '/Ressources', options).then((response) => {
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

    handleChange() {
        return true;
    },

    render() {
        return(
            <Select
              name="ressource-select"
              options={this.state.ressources}
              onChange={this.handleChange}
             />
        );
    }
});

const AddProfile = React.createClass({
    getInitialState() {
        return {
            acronym: '',
            fullname: '',
            ressources: [],
            selectors: [
                  <RessourceSelector />
            ]
        };
    },

    submitForm() {
        return true;
    },

    addLine() {
        console.log('+ click triggered');
        let selectors = this.state.selectors;
        this.setState({
            selectors: selectors.concat(<RessourceSelector />)
        })
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
                        />

                      <ControlLabel>Nom : </ControlLabel>
                      <FormControl
                        type="text"
                        placeholder="Non Directory Active"
                        />
                    </FormGroup>

                    <h2>Ajouter des ressources à ce profil :
                      <Button
                        type="button"
                        bsStle="default"
                        onClick={this.addLine}
                        className="pull-right"
                        ><i className="fa fa-plus"
                         onClick={this.addLine}
                            aria-hidden="true"></i>
                      </Button>
                    </h2>

                    {this.state.selectors}

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
