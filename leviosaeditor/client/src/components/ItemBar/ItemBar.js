import React from 'react'
import './ItemBar.css'
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import UndoIcon from "@material-ui/icons/Undo";
import RedoIcon from "@material-ui/icons/Redo";


 class ItemBar extends React.Component {
    /*selectText = () => {
        const input = document.getElementById('input');
        input.focus();
        input.setSelectionRange(2, 5);
    }

     formatDoc = (cmd) => {
         document.execCommand(cmd, false, "");
     }*/

     toggleBold = () => {
         document.execCommand('bold', false, "");

     }
     toggleItalic = () => {
         document.execCommand('italic', false, "");
     }
     toggleUnderline = () => {
         document.execCommand('underline', false, "");
     }
     /*toggleUndo = () => {
         document.execCommand('undo');
     }*/

    render () {

        return(
            <div>
                <div id="items-bar" >
                    <Button id="button" onClick={this.toggleBold}><b>B</b></Button>
                    <Button onClick={this.toggleItalic}><em>I</em></Button>
                    <Button onClick={this.toggleUnderline}><u>U</u></Button>
                    <Button onClick={() => (document.execCommand('undo'))} startIcon={<UndoIcon />}/>
                    <Button onClick={() => (document.execCommand('redo'))} startIcon={<RedoIcon />}/>
                    <Button startIcon={<CloudUploadIcon />}/>
                </div>
            </div>
        )
    }
 }
 export default ItemBar
