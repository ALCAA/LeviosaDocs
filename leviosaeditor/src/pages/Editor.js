import React, { Component } from 'react';
import './Editor.css';
import socketIOClient from "socket.io-client";

//construct socket
const socket = socketIOClient('http://localhost:8000');

class Editor extends Component {
	constructor(){
		super();

		this.state = {
			text : ''
		}
		this.setTextFromSocket();
	}

	//after event of typing in textbox, set text with the new value
	//and send it by socket message, found in server.js

	//asynchronous so can't send this.state.text (or there is a character missing)
	sendToSocket = (event) => {
		this.setState({text : event.target.value});
		socket.send(event.target.value);
	}

	//Listen on messages incoming from socket and set text with data from Socket
	setTextFromSocket = () => {
		socket.on('message', (data) => {
			this.setState({text : data});
		})
	}
	
	render = () => {
		return (
			<div>
    			<h3>Realtime Editor/Collaboration</h3>
    			<div>
        			<textarea onChange={this.sendToSocket} value={this.state.text} id='editor' placeholder="Type Your Text..."></textarea>
    			</div>
			</div>
		)
	}

}

export default Editor;