import React, { Component } from 'react'
import './Editor.css'
import '../ItemBar/ItemBar.css'
import socketIOClient from 'socket.io-client'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/login";
import { load_docs, save_doc } from '../../actions/docs';

// construct socket
const socket = socketIOClient('http://localhost:8000')

class Editor extends Component {
  constructor (props) {
    super(props)

    this.state = {
      document_id: '',
      name: '',
      creator: '',
      text: '',
      list_users: [{}]
    }
    this.setTextFromSocket()
    this.handleSendingToSocket = this.handleSendingToSocket.bind(this)
  }

  componentDidMount() {
    let id = window.location.pathname;
    id = id.substring(1, id.length)
    id = id.substring(0, id.length - 5)
    const body = {
      id: id
    }
    this.props.load_docs(body);
  }

 save_doc = e => {
    e.preventDefault();
    const SavedData = {
      _id: this.props.doc._id,
      name: '/TODO',
      content: '/TODO'
    }
    this.props.save_doc(SavedData);
  }

  // after event of typing in textbox, set text with the new value
  // and send it by socket message, found in server.js

  // asynchronous so can't send this.state.text (or there is a character missing)
  handleSendingToSocket () {
    var doc = document.getElementById('div-editor').innerHTML
    socket.send(doc)
  }

  // Listen on messages incoming from socket and set text with data from Socket
  setTextFromSocket () {
    socket.on('message', (data) => {
      document.getElementById('div-editor').innerHTML = data
      this.setState({ text: data })
    })
  }

  render () {
    console.log(this.props.auth.user);
    console.log(this.props.doc)
    return (
      <div>
        <div>
          <div suppressContentEditableWarning={true}
            id='div-editor'
            contentEditable='true'
            spellCheck="true"
            onInput={this.handleSendingToSocket}>
            <div>{this.props.doc.creator}<br/></div>
          </div>
        </div>
      </div>
    )
  }
}

Editor.propTypes = {
  auth: PropTypes.object.isRequired,
  doc: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  doc: state.doc
});

export default connect(
  mapStateToProps,
  {
    logoutUser,
    load_docs,
    save_doc
  }
)(Editor);
