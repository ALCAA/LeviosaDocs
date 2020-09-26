import React, { Component } from 'react';
import './Editor.css';

class Editor extends Component {

	render() {
		return (
			<div>
    			<h3>Realtime Editor/Collaboration</h3>
    			<div>
        			<textarea id='editor' placeholder="Type Your Text..."></textarea>
    			</div>
			<script src="../../node_modules/socket.io-client/dist/socket.io.js"></script>
			<script src="../client.js"></script>
			</div>
		)
	}

}

export default Editor;