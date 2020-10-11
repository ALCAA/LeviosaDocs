import React from 'react'
import TopBar from '../components/TopBar/TopBar'
import ItemBar from '../components/ItemBar/ItemBar'
import Editor from '../components/Editor/Editor'
import UserBubble from '../components/UserBubble/UserBubble'
import '../App.css'
import { logoutUser } from "../actions/login";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Documents extends React.Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render () {
    const { user } = this.props.auth;
        return (
      <div className='App'>
        
      </div>
    )
  }
}

Documents.propTypes = {
  logoutUser: PropTypes.func.isRequired,
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
  }
)(Documents)
