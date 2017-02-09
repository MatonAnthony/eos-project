import React from 'react';
import Api from './Api';
import {Table, Column, Cell} from 'fixed-data-table';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import 'fixed-data-table/dist/fixed-data-table.min.css';

const URL = Api.getUrl();

const ListClient = React.createClass({
    getInitialState(){
        return {
            clients: []
        };
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
                    clients.push(element);
                });

                this.setState({
                    clients: clients
                });

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
            width={150} />
                <Column
            header={<Cell>Options</Cell>}
            fixed={true}
            cell={props => (<Cell {...props}>
                  <LinkContainer
                  to={{pathname: '/client/' + this.state.clients[props.rowIndex].identifier }}>
                  <Button bsStyle="link"><i className="fa fa-eye" aria-hidden="true"></i></Button>
                  </LinkContainer>
                   <Button bsStyle="link">
                            <a href={URL + '/pdf/' + this.state.clients[props.rowIndex].identifier}>
                            <i className="fa fa-print" aria-hidden="true"></i>
                    </a>
                   </Button>
                  </Cell>
            )}
            width={100} />
            </Table>
        );
    }

});

export default ListClient;
