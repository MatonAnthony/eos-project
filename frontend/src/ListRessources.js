import React from 'react';
import Api from './Api';
import {Table, Column, Cell} from 'fixed-data-table';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import 'fixed-data-table/dist/fixed-data-table.min.css';

const URL = Api.getUrl();

const ListRessources = React.createClass({
    getInitialState(){
        return {
            ressources: []
        };
    },

    componentDidMount(){
        /* TODO: Fetch call to get Ressources */
        let options = {
            method: 'GET',
            mode: 'cors',
        };

        fetch(URL + '/Ressources?access_token=' + Api.isAuthenticated(), options).then((response) => {
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
    },

    render(){
        return(
            <Table
              rowsCount={this.state.ressources.length}
              rowHeight={50}
              headerHeight={50}
              width={750}
              height={500}
              {...this.props}
              >
              <Column
                header={<Cell>#</Cell>}
                fixed={true}
                cell={props => (
                    <Cell {...props}>
                      {this.state.ressources[props.rowIndex].id}
                    </Cell>
                )}
            width={50}
                />
                <Column
            header={<Cell>Nom</Cell>}
            fixed={true}
            cell={props => (
                <Cell {...props}>
                  {this.state.ressources[props.rowIndex].name}
                </Cell>
            )}
            width={200} />
                <Column
            header={<Cell>Template de commande</Cell>}
            fixed={true}
            cell={props => (
                <Cell {...props}>
                  {this.state.ressources[props.rowIndex].script_template}
                </Cell>
            )}
            width={300} />

                <Column
            header={<Cell>Extension</Cell>}
            fixed={true}
            cell={props => (
                <Cell {...props}>
                  {this.state.ressources[props.rowIndex].export_format}
                </Cell>
            )}
            width={100} />
                <Column
            header={<Cell>Options</Cell>}
            fixed={true}
            cell={props => (<Cell {...props}>
                   <LinkContainer
                            to={{pathname: 'secure/edit/ressources/'
                                 + this.state.ressources[props.rowIndex].id}}>
                            <Button bsStyle="link">
                            <i className="fa fa-pencil" aria-hidden="true"></i>
                            </Button>
                   </LinkContainer>
                  </Cell>
            )}
            width={100} />
            </Table>
        );
    }

});

export default ListRessources;
