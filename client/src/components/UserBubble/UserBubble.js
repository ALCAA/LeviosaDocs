import React, { Component } from 'react'
import Identicon from 'react-identicons';
import Tooltip from '@material-ui/core/Tooltip';
import './UserBubble.css'


class UserBubble extends Component {
  constructor (props) {
    super(props)

    this.state = {
      firstname: 'Hagrid',
      name: 'LeBoss',
      email:'xx@xx.com',
      currentusers: [
        {firstname: 'Harry', name: 'Potter', email:'xx@xx.com'},
        {firstname: 'Hagrid', name: 'LeBoss', email:'xx@xx.com'},
      ]
    }
  }

  render () {
    return (
      <div className="users-div">
        <h2>List of collaborator</h2>
        <div className="usersroles">
            {this.state.currentusers.map(user => (
              <React.Fragment>
              <Tooltip title={user.firstname}>
                <span id={user.firstname} className="userinfo" key={user.firstname}>
                  <Identicon className="accountavatar" style={{ backgroundColor: user.randomcolor }} size={40} string={user.firstname} />
                </span>
              </Tooltip>
              </React.Fragment>
            ))}
          </div>
        </div>
    )
  }
}

export default UserBubble





