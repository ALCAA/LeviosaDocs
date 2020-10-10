import React, { Component } from 'react';
import { logoutUser } from "../actions/login";
import { create_docs } from '../actions/docs';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import DocPopup from '../components/DocPopup/DocPopup'

class Logged extends Component {
    onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render () {
    const { user } = this.props.auth;
    return (
  	 <div className='Dashboard'>
       <header className='App-header' />
        <div className='App-body-dash'>
          <h1>Glad to see you {user.firstname} !</h1>
          <div className='login-items'>
            <Button id='create_docs' variant='contained' color='primary'>
              Create new document
            </Button>
            <DocPopup msg="Create new document" title="Choose document name" label="Name"/>
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