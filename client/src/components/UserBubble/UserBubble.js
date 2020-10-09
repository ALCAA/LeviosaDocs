import React, { Component } from 'react'
import Identicon from 'react-identicons';
import { withStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import './UserBubble.css'


const useStyles = (theme) => ({
    tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
})

class UserBubble extends Component {
  constructor (props) {
    super(props)

    this.state = {
      currentusers: [
        {firstname: 'Harry', name: 'Potter', email:'xx@xx.com'},
        {firstname: 'Ron', name: 'Potter', email:'xx@xx.com'}
      ]
    }
  }

  render () {
    const { classes } = this.props
    return (
      <div className="users-div">
        <h2>List of collaborator</h2>
        <div className="usersroles">
            {this.state.currentusers.map(user => (
              <React.Fragment>
              <Tooltip  title={user.firstname}>
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

export default withStyles(useStyles)(UserBubble)





