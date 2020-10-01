import React from 'react'
import './ItemBar.css'
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import UndoIcon from "@material-ui/icons/Undo";


 class ItemBar extends React.Component {
     constructor() {
         super();
     }

    selectText = () => {
        const input = document.getElementById('input');
        input.focus();
        input.setSelectionRange(2, 5);
    }

     toggleBold = () => {
         document.execCommand('bold');

     }
     toggleItalic = () => {
         document.execCommand('italic', false, "");
     }
     toggleUnderline = () => {
         document.execCommand('underline');
     }
     toggleUndo = () => {
         document.execCommand('undo');
     }

    render () {

        return(
            <div>
                <div id="items-bar" >
                    <Button id="button" onClick={this.toggleBold()}><b>B</b></Button>
                    <Button onClick={this.toggleItalic}><em>I</em></Button>
                    <Button onClick={this.toggleUnderline}><u>U</u></Button>
                    <Button onClick={() => (document.execCommand('undo'))} startIcon={<UndoIcon />}/>
                    <Button startIcon={<CloudUploadIcon />}/>
                </div>
            </div>
        )
    }
 }
 export default ItemBar
