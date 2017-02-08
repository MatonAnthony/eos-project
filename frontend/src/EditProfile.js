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
const RessourceSelector = React.createClass({
    propTypes: {
        onDeleteClick: React.PropTypes.func.isRequired,
        uuid: React.PropTypes.string.isRequired
    },

    getInitialState() {
        return {
            ressources: [],
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

    remove() {
        this.props.onDeleteClick(this.props.uuid);
    },

    render() {
        return(
            <div>
              <Select
                name="ressource-select"
                options={this.state.ressources}
                onChange={this.handleChange}
                />
              <Button
                type="button"
                bsStle="default"
                onClick={this.remove}
                className="pull-right"
                ><i className="fa fa-minus"
                    aria-hidden="true"></i>
              </Button>
            </div>
        );
    }
});

const EditProfile = React.createClass({
    getInitialState() {
        return {
            acronym: '',
            fullname: '',
            ressources: [],
            selectors: [
               <RessourceSelector
                onDeleteClick={this.deleteSelector}
                uuid={uuid.v4()}
               />
            ]
        };
    },

    deleteSelector(uuid) {
        console.log(uuid);
        let selectors = this.state.selectors;
        this.setState({
            selectors: selectors.filter((element) => {
                return element.props.uuid != uuid;
            })
        })
    },

    addLine() {
        let selectors = this.state.selectors;
        this.setState({
            selectors: selectors.concat(<RessourceSelector
                                        onDeleteClick={this.deleteSelector}
                                        uuid={uuid.v4()} />)
        })
    },

    componentDidMount() {
        /* TODO: Fetch call fill the profile */
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
                        placeholder="NDA"
                        />

                      <ControlLabel>Nom : </ControlLabel>
                      <FormControl
                        type="text"
                        placeholder="Non Directory Active"
                        />
                    </FormGroup>

                    <h2>Modifier les ressources de ce profil :
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
                      >Modifier</Button>
                  </form>
                </div>

        );
    }
});

export default EditProfile;
