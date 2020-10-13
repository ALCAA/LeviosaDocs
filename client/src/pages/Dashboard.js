import React, { Component } from 'react';
import { logoutUser } from "../actions/login";
import { create_docs } from '../actions/docs';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class Logged extends Component {
  state = {
      open: false, 
      docName: '',
      docContent: ''
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  create_docs = e => {
    const { user } = this.props.auth;
    const docsData = {
      name: this.state.docName,
      creator : user.id,
      content: this.state.docContent
    }
    this.props.create_docs(docsData);
    console.log(this.props.create_docs);
  }

  handleClickOpen = () => {
    this.setState({open: true})
  };

  handleClose = () => {
    this.setState({open: false})
  };

  render () {
    const { user } = this.props.auth;
    return (
  	 <div className='Dashboard'>
       <header className='App-header' />
        <div className='App-body-dash'>
          <h1>Glad to see you {user.firstname} !</h1>
          <div className='login-items'>
            <Button id='create_docs' variant="contained" color="primary" onClick={this.handleClickOpen}>
            Create new document
            </Button>
            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Choose document name</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="title"
                  label="Name"
                  type="text"
                  value={this.state.docName}
                  onChange={(e) => { this.setState({ docName: e.target.value }) }}
                  required
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button variant="contained" color="primary" onClick={this.handleClose} >
                  Cancel
                </Button>
                <Button variant="contained" color="primary" onClick={this.handleClose && this.create_docs} >
                  Create new document
                </Button>
              </DialogActions>
            </Dialog>
          <div>
              <Button id='logout' variant='contained' color='secondary' onClick={this.onLogoutClick}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

Logged.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  create_docs: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  doc: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  doc: state.doc,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {
    logoutUser,
    create_docs
  }
)(Logged); 