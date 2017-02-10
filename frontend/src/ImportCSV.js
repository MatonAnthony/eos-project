import React from 'react';
import Api from './Api';
import {Button} from 'react-bootstrap';
import {withRouter} from 'react-router';
const Dropzone = require('react-dropzone');

const URL = Api.getUrl();

const ImportCSV = React.createClass({
    getInitialState: function () {
        return {
            files: []
        };
    },

    onDrop: function (acceptedFiles) {
        this.setState({
            files: acceptedFiles
        });

        let file = new FormData();
        file.append('file', acceptedFiles[0]);
        let options = {
            method: 'POST',
            mode: 'cors',
            body: file,
        };

        fetch(URL + '/import', options).then((response) => {
            if(response.ok){
                console.log('CHAMPAGNE !!');
            }
        });

    },

    onOpenClick: function () {
        this.dropzone.open();
    },

    render: function () {
        return (
            <div>
              <Dropzone ref={(node) => { this.dropzone = node; }} onDrop={this.onDrop}>
                <div>Try dropping some files here, or click to select files to upload.</div>
              </Dropzone>
              <button type="button" onClick={this.onOpenClick}>
                Open Dropzone
              </button>
              {this.state.files.length > 0 ? <div>
                    <h2>Uploading {this.state.files.length} files...</h2>
              </div> : null}
            </div>
        );
    }
});

export default withRouter(ImportCSV);
