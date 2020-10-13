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
    const creator = this.props.doc.creator
    let test = []
    if (this.props.list_users !== undefined)
    {
      this.props.list_users.forEach(elt => 
        test.push(elt.firstname + ' ' + elt.name))
    }
    return (
      <div className='users'>
        <div className='creator-div'>
          <h2>Creator</h2>
          <div className='usersicons'>
            {creator !== undefined
              ? <Tooltip title={creator}>
                <span id='cretor' className='userinfo'>
                  <Identicon className='accountavatar' style={{ backgroundColor: this.props.doc.randomcolor }} size={40} string={this.props.doc.creator} />
                </span>
                </Tooltip>
              : ''}

          </div>
        </div>
        <div className='users-div'>
          <h2>Collaborators</h2>
          <div className='usersicons'>
            {test}
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
