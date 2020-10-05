import React, { Component } from 'react'
import './Editor.css'
import '../ItemBar/ItemBar.css'
import socketIOClient from 'socket.io-client'

// construct socket
const socket = socketIOClient('http://localhost:8000')

class Editor extends Component {
  constructor (props) {
    super(props)

    this.state = {
      text: ''
    }
    this.setTextFromSocket()
    this.handleSendingToSocket = this.handleSendingToSocket.bind(this)
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
    return (
      <div>
        <div>
          <div
            id='div-editor'
            contentEditable='true'
            spellCheck="true"
            onInput={this.handleSendingToSocket}>
            <div><br/></div>
          </div>
        </div>
      </div>
    )
  }
}

export default Editor
