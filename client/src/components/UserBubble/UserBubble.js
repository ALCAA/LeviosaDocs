import React, { Component } from 'react'
import Identicon from 'react-identicons';
import Tooltip from '@material-ui/core/Tooltip';
import './UserBubble.css'
import PropTypes from "prop-types";
import { connect } from "react-redux";


class UserBubble extends Component {
  constructor (props) {
    super(props)

    this.state = {
      creator: {
        firstname: 'Hagrid',
        name: 'LeBoss',
        email:'xx@xx.com',
      },
         
      currentusers: [
        {firstname: 'Harry', name: 'Potter', email:'xx@xx.com'},
        {firstname: 'Hagrid', name: 'LeBoss', email:'xx@xx.com'},
      ]
    }
  }

  render () {
    return (
      <div className="users">
        <div className="creator-div">
          <h2>Creator</h2>
          <div className="usersicons">
          <React.Fragment>
            <Tooltip title="creator">
              <span id={this.props.doc.creator} className="userinfo">
                <Identicon className="accountavatar" style={{ backgroundColor: this.state.creator.randomcolor }} size={40} string={this.props.doc.creator} />
              </span>
            </Tooltip>
          </React.Fragment>
          </div>
        </div>
        <div className="users-div">
          <h2>List of collaborator</h2>
          <div className="usersicons">
              {this.state.currentusers.map(user => (
                <React.Fragment key={user.firstname}>
                <Tooltip title={user.firstname}>
                  <span id={user.firstname} className="userinfo">
                    <Identicon className="accountavatar" style={{ backgroundColor: user.randomcolor }} size={40} string={user.firstname} />
                  </span>
                </Tooltip>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
    )
  }
}

UserBubble.propTypes = {
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
)(UserBubble)





