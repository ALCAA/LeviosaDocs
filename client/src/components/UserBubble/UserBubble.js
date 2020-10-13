import React, { Component } from 'react'
import Identicon from 'react-identicons';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import './UserBubble.css'


class UserBubble extends Component {
  render () {
    return (
      <div className="users">
        <div className="creator-div">
          <h2>Creator</h2>
          <div className="usersicons">
            <Tooltip title={this.props.doc.creator}>
              <span id={this.props.doc.creator} className="userinfo">
                <Identicon className="accountavatar" style={{ backgroundColor: this.props.doc.randomcolor }} size={40} string={this.props.doc.creator} />
              </span>
            </Tooltip>
            
          </div>
        </div>
        <div className="users-div">
          <h2>Collaborators</h2>
          <div className="usersicons">
              {
                React.Children.map(this.props.list_users, (id) => (      
                  <div>
                    <React.Fragment key={id}>
                      <Tooltip title={id}>
                        <span id={id} className="userinfo">
                          <Identicon className="accountavatar" style={{ backgroundColor: id.randomcolor }} size={40} string={id} />
                        </span>
                      </Tooltip>
                    </React.Fragment>
                  </div>
                ))
              }
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





