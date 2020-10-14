import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/login";
import { load_docs, save_doc, add_user } from '../../actions/docs';
import UserBubble from '../UserBubble/UserBubble'
import TopBar from '../TopBar/TopBar'
import ItemBar from '../ItemBar/ItemBar'
import '../../App.css'

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
      input_mail: [],
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
    this.setState({text: this.props.doc.content})
  }

  // after event of typing in div-editor, set text with the new value
  // and send it by socket message, found in server.js

  // SOCKET : asynchronous so can't send this.state.text (or there is a character missing)
  handleSendingToSocket () {
    const id = this.state.document_id
    const doc = document.getElementById(`div-editor-${this.state.document_id}`).innerHTML
    const data = {'id': id,'doc': doc}
    this.setState({text: doc})
    socket.send(data)
    this.save_doc()
  }

  // SOCKET : Listen on messages incoming from socket and set text with data from Socket if current document match
  setTextFromSocket () {
    socket.on('message', (data) => {
      if (data.id === this.state.document_id)
        document.getElementById(`div-editor-${this.state.document_id}`).innerHTML = data.doc
      this.setState({ text: data.doc })
    })
  }

  // BACK : Add user on collaborator list of the current document
  add_user = e => {
    var length = this.state.input_mail.length
    const body = {
      email: this.state.input_mail[length-1],
      _id: this.state.document_id,
    }
    this.props.add_user(body);
    window.location.reload(true);
  }

  // BACK : Update content attribute on current document with this.state.text
  save_doc = e => {
    const SavedData = {
      _id: this.state.document_id,
      name: this.props.doc.name,
      content: this.state.text
    }
    this.props.save_doc(SavedData);
  }

  handleChangeName = (newDocName) => {
    this.setState ({name: newDocName});
    const body = {
      _id: this.state.document_id,
      name: newDocName,
      content: this.state.text,
    }
    this.props.save_doc(body)
    window.location.reload(true)
  }

  // FRONT : Push data from invite popup on state array input_mail and call add_user
  handleAddEmail = (newCollab) => {
    this.state.input_mail.push(newCollab);
    this.add_user()
  }

  // FRONT : Set current div with doc.content save in database
  handleContent = () => {
    document.getElementById(`div-editor-${this.state.document_id}`).innerHTML = this.props.doc.content
  }

  render () {
    const { user } = this.props.auth;
    const completeName = user.firstname + ' ' + user.name;
    
    if (this.props.doc.content !== undefined && document.getElementById(`div-editor-${this.state.document_id}`).innerHTML === "<div></div>") {
      this.handleContent()
    }
    return (
      <div className='App'>
        <header className='App-header'>
          <TopBar completeName={completeName} docName={this.props.doc.name} onChangeName={this.handleChangeName} document_id={this.state.document_id}/>
          <ItemBar onAddEmail={this.handleAddEmail} />
        </header>
        <div className='App-body-doc'>
          <div 
          style={{
            border: '1px solid gray',
            display: 'flex',
            flexDirection: 'column',
            width: '600px',
            height: '750px',
            overflow: 'auto',
            padding: '2px',
            resize: 'both',

            backgroundColor: 'white',
            color: 'black'
          }}
          suppressContentEditableWarning={true}
          id={`div-editor-${this.state.document_id}`}
          className="div-editor"
          contentEditable='true'
          spellCheck="true"
          onInput={this.handleSendingToSocket}>

            <div></div>
          </div>
          <UserBubble list_users={this.props.doc.list_users}/>
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
