import React, { Component } from 'react'
import Identicon from 'react-identicons'
import Tooltip from '@material-ui/core/Tooltip'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import './UserBubble.css'

class UserBubble extends Component {
  constructor (props) {
    super(props)
    this.state = {
      creator: [],
    }
  }

  componentDidMount() {
    this.getCreatorData()
  }

  getCreatorData = async () => {
    try {
      let id = window.location.pathname;
      id = id.substring(1, id.length)
      id = id.substring(0, id.length - 5)
      const docs = await axios.post('/docs/get_info', {'id': id})
      const response = await axios.post('/users/find_name', {'id': docs.data[0].creator});
      this.setState({creator: response.data});
    }
    catch (err) {
      console.log(err)
    }
  }

  render () {
    let completename = ''
    completename = this.state.creator.firstname + ' ' + this.state.creator.name
    //collaborators users get informations
    let test = []
    if (this.props.list_users !== undefined)
    {
      this.props.list_users.forEach(elt => 
        test.push(elt.firstname + ' ' + elt.name))
    }
    return (
      <div className='div-users'>
        <div className='creator-div'>
          <h2>Creator</h2>
          <div className='usersicons'>
            {this.state.creator !== undefined
              ? <Tooltip title={completename}>
                <span id='creator' className='userinfo'>
                  <Identicon className='accountavatar' style={{ backgroundColor: this.state.creator.randomcolor }} size={40} string={this.state.creator.name} />
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
