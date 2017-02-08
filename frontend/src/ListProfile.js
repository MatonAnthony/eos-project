import React from 'react';
import Api from './Api';
import {Table, Column, Cell} from 'fixed-data-table';
import 'fixed-data-table/dist/fixed-data-table.min.css';

const URL = Api.getUrl();

const ListProfile = React.createClass({
    getInitialState(){
        return {
            profiles: []
        }
    },

    componentDidMount(){
        let options = {
            method: 'GET',
            mode: 'cors',
        };

        fetch(URL + '/Profiles', options).then((response) => {
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
            <Table
              rowsCount={this.state.profiles.length}
              rowHeight={50}
              headerHeight={50}
              width={300}
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
            </Table>
        )
    }
})

export default ListProfile;
