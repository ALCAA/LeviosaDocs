import React, { Component } from 'react'
import './Editor.css'
import socketIOClient from 'socket.io-client'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/login";
import { load_docs, save_doc, add_user } from '../../actions/docs';
import UserBubble from '../UserBubble/UserBubble'
import TopBar from '../TopBar/TopBar'
import ItemBar from '../ItemBar/ItemBar'

// construct socket
const socket = socketIOClient('http://localhost:8000');


class Editor extends Component {
  constructor (props) {
    super(props)

    this.state = {
      document_id: '',
      name: '',
      creator: '',
      text: '',
      list_users: [],
      input_mail: []
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
    this.setState({document_id: id});
    this.props.load_docs(body);
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
      this.save_doc()
    })
  }

  handleAddEmail = (newCollab) => {
    this.state.input_mail.push(newCollab);
    console.log(this.state.input_mail)
    if(this.add_user() !== undefined) {
      this.state.list_users.push(newCollab);
    }
    console.log(this.state.list_users)
  }

  add_user = e => {
    var length = this.state.input_mail.length
    console.log(length)
    let id = window.location.pathname;
      id = id.substring(1, id.length)
      id = id.substring(0, id.length - 5)
      const body = {
        email: this.state.input_mail[length-1],
        id: id,
      }
      this.props.add_user(body);
  }

 save_doc = e => {
    console.log(this.props.doc._id);
    const SavedData = {
      _id: this.state.document_id,
      name: this.props.doc.name,
      content: this.state.text
    }
    this.props.save_doc(SavedData);
  }

  

    stripHtml = (html) => {
        // Create a new div element
        const temporalDivElement = document.createElement("div");
        // Set the HTML content with the providen
        temporalDivElement.innerHTML = html;
        // Retrieve the text property of the element (cross-browser support)
        return temporalDivElement.innerText
    }

    

  render () {
    const { user } = this.props.auth;
    console.log(this.props.auth);
    const completeName = user.firstname + ' ' + user.name;
    console.log(this.props.doc);

    return (
      <div className='App'>
        <header className='App-header'>
          <TopBar completeName={completeName} docName={this.props.doc.name} />
          <ItemBar onAddEmail={this.handleAddEmail}/>
        </header>
        <div className='App-body-doc'>
          <div suppressContentEditableWarning={true}
          id='div-editor'
          contentEditable='true'
          spellCheck="true"
          ref={this.myRef}
          onInput={this.handleSendingToSocket}>
            <div>
              {this.props.doc.name}<br/>
              {this.stripHtml(this.props.doc.content)}
              {this.props.doc.list_users}
            </div>
          </div>
          <UserBubble doc={this.doc}/>
        </div>
      </div>
    )
  }
}

Editor.propTypes = {
  auth: PropTypes.object.isRequired,
  doc: PropTypes.object.isRequired,
  add_user: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  doc: state.doc
});

export default connect(
  mapStateToProps,
  {
    add_user,
    logoutUser,
    load_docs,
    save_doc
  }
)(Editor);
