import React from 'react'
import './ItemBar.css'
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles'
import { Button, FormControl, Select, InputLabel, MenuItem, TextField } from '@material-ui/core/';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import UndoIcon from "@material-ui/icons/Undo";
import RedoIcon from "@material-ui/icons/Redo";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ImageIcon from '@material-ui/icons/Image';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';

const useStyles = (theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
})

function getDataUrl(img) {

    const canvas = document.getElementById('myfile');
    const ctx = canvas.getContext('2d');
    
    canvas.width = img.width;
    canvas.height = img.height;
    
    ctx.drawImage(img, 0, 0);
    return canvas.toDataURL('image/jpeg');
 }
 
 const img = document.querySelector('myfile');
 if(img)
 {
 img.addEventListener('load', function (event) {
    const dataUrl = getDataUrl(event.currentTarget);
    console.log(dataUrl);
 });
}

 class ItemBar extends React.Component {
     constructor(props) {
         super(props);
         this.state = {
             color: "black",
             fontName: "arial",
             fontSize: 4
         }
     }
     /*
     formatDoc = (cmd) => {
         document.execCommand(cmd, false, "");
     }
     */

     toggleImage = (photo) => {
         document.execCommand('image', false, photo);
     }

     handleSelectColorChange = (event) => {
         this.setState( {color: event.target.value} );
     }

     handleSelectNameChange = (event, fontName) => {
         console.log(event.target.value)
         this.setState( {fontName: event.target.value} );
         document.execCommand('fontName', false, fontName)

     }

    render () {
        const { classes } = this.props
        return(
            <div id="items-bar">
                <div id="items-bar-1" >
                    <Button id="bold-btn"
                            onClick={() => (document.execCommand('bold'))}><b>B</b>
                    </Button>
                    <Button id="italic-btn"
                            onClick={() => (document.execCommand('italic'))}><em>I</em>
                    </Button>
                    <Button id="underline-btn"
                            onClick={() => (document.execCommand('underline'))}><u>U</u>
                    </Button>
                    <Button id="undo-btn"
                            onClick={() => (document.execCommand('undo'))} startIcon={<UndoIcon />}
                            />
                    <Button id="redo-btn"
                            onClick={() => (document.execCommand('redo'))} startIcon={<RedoIcon />}
                            />
                    <Button id="ol-btn"
                            onClick={() => (document.execCommand('insertOrderedList'))} startIcon={<FormatListNumberedIcon />}
                    />
                    <Button id="ul-btn"
                            onClick={() => (document.execCommand('insertUnorderedList'))} startIcon={<FormatListBulletedIcon />}
                    />
                    <Button id="justify-btn"
                            onClick={() => (document.execCommand('justifyFull'))} startIcon={<FormatAlignJustifyIcon />}
                    />
                    <Button id="img-btn" startIcon={<CloudUploadIcon />}/>
                    <Button  id="image-btn"                       
                            onClick={() => (document.execCommand('insertimage', 0, "https://statics.lesinrocks.com/content/thumbs/uploads/2019/12/07/1448140/width-1125-height-612-quality-10/avatar.jpg"))} startIcon={<ImageIcon/>}
                    />

                </div>
                <div id="items-bar-2">
                    <FormControl className={classes.formControl}>
                        <InputLabel id="select-font-color">Font color</InputLabel>
                        <Select
                            labelId="select-color-label"
                            id="select-color"
                            value={this.state.color}
                            onChange={this.handleSelectColorChange}
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
                    <FormControl className={classes.formControl}>
                        <InputLabel id="select-font-type">Font type</InputLabel>
                        <Select
                            labelId="select-font-label"
                            id="select-font"
                            value={this.state.fontName}
                            onChange={this.handleSelectNameChange}
                        >
                            <MenuItem
                                onClick={() => document.execCommand('fontName', false, "arial")} value="arial">Arial
                            </MenuItem>
                            <MenuItem
                                onClick={() => document.execCommand('fontName', false, "calibri")} value="calibri">Calibri
                            </MenuItem>
                            <MenuItem
                                onClick={() => document.execCommand('fontName', false, "comic sans ms")} value="comic sans ms">Comic Sans MS
                            </MenuItem>
                            <MenuItem
                                onClick={() => document.execCommand('fontName', false, "times new roman")} value="times new roman">Times New Roman
                            </MenuItem>
                            <MenuItem
                                onClick={() => document.execCommand('fontName', false, "ms gothic")} value="ms gothic">MS Gothic
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <Button id="sizeFontLess-btn" onClick={() => {
                            if (this.state.fontSize >= 2) {
                                const newSize = this.state.fontSize - 1
                                this.setState({fontSize: newSize})
                                document.execCommand('fontSize', false, newSize.toString());
                            }
                            else {
                                document.execCommand('fontSize', false, "1");
                            }
                        }
                    } startIcon={<RemoveIcon />}/>
                    <TextField
                        id="fontSize-textField"
                        InputLabelProps={{ readOnly: true }}
                        label="Font size 1-7"
                        value={this.state.fontSize}
                        size="small" />
                    <Button id="sizeFontPlus-btn" onClick={() => {
                            if (this.state.fontSize <= 6) {
                                const newSize = this.state.fontSize + 1
                                this.setState({fontSize: newSize})
                                document.execCommand('fontSize', false, newSize.toString());
                            }
                            else {
                                document.execCommand('fontSize', false, "7");
                            }
                        }
                    } startIcon={<AddIcon />}/>
                    <input type="file"
                        id="myfile" name="myfile"
                        accept="image/">
                            
                    </input>
                    <Button  id="image-btn"                       
                            onClick={() => getDataUrl(document.getElementById('myfile'))} startIcon={<ImageIcon/>}
                    />  
                    
                </div>
                <div id="items-bar-3">
                </div>
            </div>
        )
    }
 }

ItemBar.propTypes = {
    classes: PropTypes.object.isRequired
}

 export default withStyles(useStyles)(ItemBar)
