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
import { is_creator, is_collaborator } from '../actions/docs';

class Logged extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false, 
      docName: '',
      docContent: ''
    }
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

  componentDidMount() {
    const { user } = this.props.auth;
    const data = {
      user : user.id
    }
    this.props.is_creator(data);
    this.props.is_collaborator(data);
  }

  render () {
    const { user } = this.props.auth;
    const createddoc = this.props.createddoc
    const shareddoc = this.props.shareddoc

    let created_docs = [];
    if (createddoc !== undefined)
    {
      for (var item in createddoc)
      {
        created_docs.push(<li><a href={`${createddoc[item]._id}/edit`}> {createddoc[item].name} - {`${createddoc[item].date_modif}`}</a></li>);
      }
    }

    let shared_docs = [];
    if (shareddoc !== undefined)
    {
      for (var item2 in shareddoc)
      {
        shared_docs.push(<li><a href={`${shareddoc[item2]._id}/edit`}> {shareddoc[item2].name} - {`${shareddoc[item2].date_modif}`}</a></li>);
      }
    }
    else if (shareddoc === undefined)
    {
      shared_docs.push('No shared documents')
    }

    return (
  	 <div className='Dashboard'>
       <header className='App-header' />
        <div className='App-body-dash'>
          <h1>Glad to see you {user.firstname} !</h1>
          <h2 id="created">Documents you created</h2>
            <ul align="center">{created_docs}</ul>
          <h2>Documents shared with you</h2>
            <ul>{shared_docs}</ul>
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
  createddoc: PropTypes.object.isRequired,
  shareddoc: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  doc: state.doc,
  errors: state.errors,
  createddoc: state.createddoc,
  shareddoc: state.shareddoc,

});

export default connect(
  mapStateToProps,
  {
    logoutUser,
    is_creator,
    is_collaborator,
    create_docs
  }
)(Logged); 