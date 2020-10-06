import React, { Component } from 'react';
import { logoutUser } from "../actions/login";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Button from '@material-ui/core/Button'

class Logged extends Component {
    onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render () {
  const { user } = this.props.auth;
  return (
  	<div className='Login'>
      <header className='App-header' />
      <div className='App-body'>
        <h1>Glad to see you {user.firstname} !</h1>
        <div className='login-items'>
          <Button id='logout' variant='contained' color='secondary' onClick={this.onLogoutClick}> Logout </Button>
        </div>
      </div>
    </div>
  );
};
}

Logged.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Logged); 