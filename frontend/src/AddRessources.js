import React from 'react';
import {FormGroup, ControlLabel} from 'react-bootstrap';
import {FormControl, Button} from 'react-bootstrap';
import 'react-select/dist/react-select.css';
import './AddProfile.css';
import Api from './Api';

const URL = Api.getUrl();
const AddRessource = React.createClass({
    getInitialState() {
        return {
            name: '',
            script_template: '',
            export_format: '',
        };
    },

    submitForm() {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        let body = {
            name: this.state.name,
            script_template: this.state.script_template,
            export_format: this.state.export_format,
        };

        let options = {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(body),
            headers: headers
        };

        fetch(URL + '/ressources?access_token=' + Api.isAuthenticated(), options).catch( function(error)  {
                console.log('adding a ressource on /Ressources failed');
        });
    },


handleNameChange(event) {
        this.setState({name: event.target.value});
    },

    handleScriptTemplateChange(event) {
        this.setState({script_template: event.target.value});
    },

    handleExportFormatChange(event) {
        this.setState({export_format: event.target.value});
    },

    render() {

        return (
            <div className="container">
                <h1 className="title">Ajouter une ressource</h1>
                <form>
                    <FormGroup>
                        <ControlLabel>Nom de la ressource :</ControlLabel>
                        <FormControl
                            type="text"
                            placeholder="Nom de la ressource"
                            onChange={this.handleNameChange}
                        />

                        <ControlLabel>Template du script de génération pour la ressource: </ControlLabel>
                        format (1..* params qui suivent):
                        $NomEtudiant;$PrenomEtudiant;$motDePasse;$idEtudiant;$emailEtudiant
                        <FormControl
                            type="text"
                            placeholder=""
                            onChange={this.handleScriptTemplateChange}
                        />

                        <ControlLabel>Format d'export pour la ressource: </ControlLabel>
                        <FormControl
                            type="text"
                            placeholder=".csv"
                            onChange={this.handleExportFormatChange}
                        />
                    </FormGroup>

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

export default AddRessource;
