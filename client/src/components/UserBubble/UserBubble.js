import React, { Component } from 'react'
import Identicon from 'react-identicons';
import Tooltip from '@material-ui/core/Tooltip';
import './UserBubble.css'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { info_user } from '../../actions/docs';


class UserBubble extends Component {
  constructor (props) {
    super(props)

    this.state = {
      collaborators: this.props.list_users,
    }
  }

  render () {
    console.log(this.props.list_users)
    return (
      <div className="users">
        <div className="creator-div">
          <h2>Creator</h2>
          <div className="usersicons">
          <React.Fragment>
            <Tooltip title={this.props.doc.creator}>
              <span id={this.props.doc.creator} className="userinfo">
                <Identicon className="accountavatar" style={{ backgroundColor: this.props.doc.randomcolor }} size={40} string={this.props.doc.creator} />
              </span>
            </Tooltip>
          </React.Fragment>
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
  username: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  doc: state.doc,
  username: state.username,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {
    info_user
  }
)(UserBubble)





