import React from 'react';
import Api from './Api';

const URL = Api.getUrl();
const ViewClient = React.createClass({
    getInitialState() {
        return {
            identifier: '',
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            profile: '',
            ressources: []
        };
    },

    componentDidMount() {
        let options = {
            method: 'GET',
            mode: 'cors',
        };
        fetch(URL + '/Clients/' + this.props.params.clientId, options).then((response) => {
            return response.json().then((json) => {
                this.setState({
                    identifier: json.identifier,
                    first_name: json.first_name,
                    last_name:  json.last_name,
                    email: json.email,
                    password: json.password,
                    profile: json.profileId,
                });

                fetch(URL + '/Profiles/' + this.state.profile + '/ressources/', options).then((response) => {
                    return response.json().then((json) => {
                        let ressources = [];
                        json.forEach((element) => {
                            ressources.push(element);
                        });
                        this.setState({
                            ressources: ressources
                        });
                    });
                });
            });
        });
    },

    render() {
        return(
            <div className="container">
              <h1 className="title">
                Profil de {this.state.last_name} {this.state.first_name} <small>{this.state.identifier}</small>
              </h1>
              <hr/>
              <h2> Mot de passe : <small>{this.state.password}</small></h2>
              <hr/>
              <h2> Ressources accessibles par ce client </h2>
              <ul className="list-group">
                { this.state.ressources.map((element) => { return <li className="list-group-item">{element.name}</li>; })}
              </ul>
            </div>

        );
    }
})

export default ViewClient;
