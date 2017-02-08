import React from 'react';
import Api from './Api';
import {Table, Column, Cell} from 'fixed-data-table';
import 'fixed-data-table/dist/fixed-data-table.min.css';

const URL = Api.getUrl();

const ListClient = React.createClass({
    getInitialState(){
        return {
            clients: []
        }
    },

    componentDidMount(){
        /* TODO: Fetch call to get Clients */
        let options = {
            method: 'GET',
            mode: 'cors',
        };

        fetch(URL + '/Clients', options).then((response) => {
            return response.json().then((json) => {
                let clients = [];
                json.forEach((element) => {
                    clients.push({
                        identifier: element.identifier,
                        first_name: element.first_name,
                        last_name: element.last_name,
                        email: element.email,
                        password: element.password,
                    });
                });

                this.setState({
                    clients: clients
                });

                console.log(clients);
            });
        });
    },

    render(){
        return(
            <Table
              rowsCount={this.state.clients.length}
              rowHeight={50}
              headerHeight={50}
              width={1000}
              height={500}
              {...this.props}
              >
              <Column
                header={<Cell>#</Cell>}
                fixed={true}
                cell={props => (
                    <Cell {...props}>
                      {this.state.clients[props.rowIndex].identifier}
                    </Cell>
                )}
            width={50}
                />
                <Column
            header={<Cell>Prénom</Cell>}
            fixed={true}
            cell={props => (
                <Cell {...props}>
                  {this.state.clients[props.rowIndex].first_name}
                </Cell>
            )}
            width={200} />
                <Column
            header={<Cell>Nom</Cell>}
            fixed={true}
            cell={props => (
                <Cell {...props}>
                  {this.state.clients[props.rowIndex].last_name}
                </Cell>
            )}
            width={200} />

                <Column
            header={<Cell>Adresse email</Cell>}
            fixed={true}
            cell={props => (
                <Cell {...props}>
                  {this.state.clients[props.rowIndex].email}
                </Cell>
            )}
            width={300} />

                <Column
            header={<Cell>Mot de passe</Cell>}
            fixed={true}
            cell={props => (
                <Cell {...props}>
                  {this.state.clients[props.rowIndex].password}
                </Cell>
            )}
            width={250} />

            </Table>
        );
    }

});

export default ListClient;
