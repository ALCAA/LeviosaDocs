import React, { Component } from 'react'
import Identicon from 'react-identicons'
import Tooltip from '@material-ui/core/Tooltip'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './UserBubble.css'

class UserBubble extends Component {
  constructor (props) {
    super(props)
    this.state = {
      creator: ''
    }
  }

  render () {
    let completename = ''
    const { user } = this.props.auth
    let test = []
    if (this.props.list_users !== undefined)
    {
      this.props.list_users.forEach(elt => 
        test.push(elt.firstname + ' ' + elt.name))
    }
    if (user !== undefined) {
      completename = user.firstname + ' ' + user.name
    }
    return (
      <div className='div-users'>
        <div className='creator-div'>
          <h2>Creator</h2>
          <div className='usersicons'>
            {user !== undefined
              ? <Tooltip title={completename}>
                <span id='creator' className='userinfo'>
                  <Identicon className='accountavatar' style={{ backgroundColor: user.randomcolor }} size={40} string={user} />
                </span>
                </Tooltip>
              : ''}

          </div>
        </div>
        <div className='users-div'>
          <h2>Collaborators</h2>
          <div className='usersicons'>
           {
            test.map( user =>
              <Tooltip title={user} key={user}>
                <span id={user} className="userinfo">
                  <Identicon className="accountavatar" style={{ backgroundColor: user.randomcolor }} size={40} string={user} />
                </span>
              </Tooltip>
              )
           } 
          </div>
        </div>
      </div>
    )
  }
}

UserBubble.propTypes = {
  auth: PropTypes.object.isRequired,
  doc: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  doc: state.doc,
  errors: state.errors
})

export default connect(
  mapStateToProps
)(UserBubble)
