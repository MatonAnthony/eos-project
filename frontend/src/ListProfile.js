import React from 'react';
import Api from './Api';
import {Table, Column, Cell} from 'fixed-data-table';
import { Button } from 'react-bootstrap';
import { LinkContainer} from 'react-router-bootstrap';
import 'fixed-data-table/dist/fixed-data-table.min.css';

const URL = Api.getUrl();

const ListProfile = React.createClass({
    getInitialState(){
        return {
            profiles: []
        }
    },

    componentDidMount(){
        let headers = {
            'Authorization': 'Bearer ' + Api.isAuthenticated()
        }
        console.log(headers);
        let options = {
            method: 'GET',
            mode: 'cors',
        };

        fetch(URL + '/Profiles?access_token=' + Api.isAuthenticated(), options).then((response) => {
            return response.json().then((json) => {
                let profiles = [];
                json.forEach((element) => {
                    profiles.push(element);
                });
                this.setState({
                    profiles: profiles
                });
            });
        });
    },

    render(){
        return(
            <div className="container">
            <Table
              rowsCount={this.state.profiles.length}
              rowHeight={50}
              headerHeight={50}
              width={400}
              height={750}
              {...this.props}
              >
              <Column
                header={<Cell>#</Cell>}
                fixed={true}
                width={50}
                cell={props => (
                    <Cell {...props}>
                      {this.state.profiles[props.rowIndex].acronyme}
                    </Cell>
                )} />
                <Column
            header={<Cell>Nom du profil</Cell>}
            fixed={true}
            width={250}
            cell={props => (
                <Cell {...props}>
                  {this.state.profiles[props.rowIndex].full_name}
                </Cell>
            )} />
                 <Column
            header={<Cell>Options</Cell>}
            fixed={true}
            cell={props => (<Cell {...props}>
                   <LinkContainer
                            to={{pathname: 'secure/profile/'
                                 + this.state.profiles[props.rowIndex].acronyme}}>
                            <Button bsStyle="link">
                            <i className="fa fa-pencil" aria-hidden="true"></i>
                            </Button>
                   </LinkContainer>
                  </Cell>
            )}
            width={100} />
                </Table>
                </div>
        )
    }
})

export default ListProfile;
