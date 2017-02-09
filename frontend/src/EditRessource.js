import React from 'react';
import {FormGroup, ControlLabel} from 'react-bootstrap';
import {FormControl, Button, Form} from 'react-bootstrap';
import {withRouter} from 'react-router';
import Api from './Api';

const URL = Api.getUrl();
const EditRessource = React.createClass({
    getInitialState(){
        return {
            id: '',
            name: '',
            script_template: '',
            export_format: ''
        };
    },

    componentDidMount() {
        let options = {
            method: 'GET',
            mode: 'cors'
        };

        fetch(URL + '/Ressources/' + this.props.params.ressourceId, options)
            .then((response) => {
                return response.json().then((json) => {
                    this.setState({
                        id: json.id,
                        name: json.name,
                        script_template: json.script_template,
                        export_format: json.export_format
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
                'id': this.state.id,
                'name': this.state.name,
                'script_template': this.state.script_template,
                'export_format': this.state.export_format
            }),
            headers: headers
        };

        fetch(URL + '/Ressources', options)
            .then((response) => {
                if(response.ok) {
                    console.log("Ressource edited");
                    this.props.router.push({
                        pathname: 'secure/ressources'
                    });
                }
            });
    },

    handleNameChange(event) {
        this.setState({
            name: event.target.value
        });
    },

    handleScriptTemplateChange(event) {
        this.setState({
            script_template: event.target.value
        });
    },

    handleExportFormatChange(event) {
        this.setState({
            export_format: event.target.value
        });
    },

    render() {
        return(
            <div className="container">
            <h1 className="title">Editer une Ressource</h1>
            <form>
            <FormGroup>
            <ControlLabel>Nom du script :</ControlLabel>
            <FormControl
               type="text"
               value={this.state.name}
        onChange={this.handleNameChange} />

            <ControlLabel>Template du script :</ControlLabel>
            <FormControl
              type="text"
              value={this.state.script_template}
              onChange={this.handleScriptTemplateChange} />

            <ControlLabel>Type du script :</ControlLabel>
            <FormControl
        type="text"
        value={this.state.export_format}
        onChange={this.handleExportFormatChange} />
            </FormGroup>

            <Button
        type="button"
        bsStyle="success"
        onClick={this.submitForm}>Modifier</Button>
          </form>
            </div>
        );
    }
})

export default withRouter(EditRessource);
