import React from 'react'
import './ItemBar.css'
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles'
import { Button, FormControl, Select, InputLabel, InputBase, NativeSelect, MenuItem } from '@material-ui/core/';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import UndoIcon from "@material-ui/icons/Undo";
import RedoIcon from "@material-ui/icons/Redo";

const useStyles = (theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
})

 class ItemBar extends React.Component {
     constructor(props) {
         super(props);
         this.state = {
             color: ''
         }
     }
     formatDoc = (cmd) => {
         document.execCommand(cmd, false, "");
     }

     toggleImage = (photo) => {
         document.execCommand('image', false, photo);
     }
     toggleRed = () => {
         document.execCommand('foreColor', false, "red");
     }
     toggleBlack = () => {
         document.execCommand('foreColor', false, "black");
     }
     toggleBlue = () => {
         document.execCommand('foreColor', false, "blue");
     }
     toggleYellow = () => {
         document.execCommand('foreColor', false, "yellow");
     }
     toggleGreen = () => {
         document.execCommand('foreColor', false, "green");
     }

     handleSelectChange = (event) => {
         this.setState( {color: event.target.value} );
     }

    render () {
        const { classes } = this.props
        return(
            <div id="items-bar">
                <div id="items-bar-1" >
                    <Button id="bold-btn"
                            onClick={() => (document.execCommand('bold'))}><b>B</b>
                    </Button>
                    <Button id="italic"
                            onClick={() => (document.execCommand('italic'))}><em>I</em>
                    </Button>
                    <Button id="underline"
                            onClick={() => (document.execCommand('underline'))}><u>U</u>
                    </Button>
                    <Button id="undo"
                            onClick={() => (document.execCommand('undo'))} startIcon={<UndoIcon />}
                            />
                    <Button id="redo"
                            onClick={() => (document.execCommand('redo'))} startIcon={<RedoIcon />}
                            />
                    <Button id="img" startIcon={<CloudUploadIcon />}/>
                </div>
                <div id="items-bar-2">
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-helper-label">Color Font</InputLabel>
                        <Select
                            labelId="simple-select-helper-label"
                            id="simple-select-helper"
                            value={this.props.color}
                            onChange={this.handleSelectChange}
                        >
                            <MenuItem
                                onClick={() => document.execCommand('foreColor', false, "black")} value="black">Black
                            </MenuItem>
                            <MenuItem
                                onClick={() => document.execCommand('foreColor', false, "red")} value="red">Red
                            </MenuItem>
                            <MenuItem
                                onClick={() => document.execCommand('foreColor', false, "blue")} value="blue">Blue
                            </MenuItem>
                            <MenuItem
                                onClick={() => document.execCommand('foreColor', false, "yellow")} value="yellow">Yellow
                            </MenuItem>
                            <MenuItem
                                onClick={() => document.execCommand('foreColor', false, "green")} value="green">Green
                            </MenuItem>
                        </Select>
                    </FormControl>

                </div>
            </div>
        )
    }
 }

ItemBar.propTypes = {
    classes: PropTypes.object.isRequired
}

 export default withStyles(useStyles)(ItemBar)
