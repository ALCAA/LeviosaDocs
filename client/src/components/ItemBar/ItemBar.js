import React from 'react'
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles'
import { Button, FormControl, Select, InputLabel, MenuItem, TextField, Grid, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core/';
import UndoIcon from "@material-ui/icons/Undo";
import RedoIcon from "@material-ui/icons/Redo";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ImageIcon from '@material-ui/icons/Image';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import { add_user } from "../../actions/docs";
import { logoutUser } from "../../actions/login";
import { connect } from "react-redux";
import './ItemBar.css'

const useStyles = (theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridGap: theme.spacing(3),
    },
})

 class ItemBar extends React.Component {
     constructor(props) {
         super(props);
         this.state = {
             color: "black",
             backColor: "white",
             fontName: "arial",
             fontSize: 5,
             newEmail: '',
             open: false,
             url:"",
            
         }
     }

   


    toggleImage = (photo) => {
         document.execCommand('image', false, photo);
    }

    
    handleSelectColorChange = (event) => {
        this.setState( {color: event.target.value} );
    }
    handleSelectBackColorChange = (event) => {
        this.setState( {backColor: event.target.value} );
    }

    handleSelectNameChange = (event) => {
        this.setState( {fontName: event.target.value} );
    }

    setOpen = (arg) => {
        this.setState({open: arg})
    }

    handleClickOpen = () => {
      this.setOpen(true);
    }

    handleClose = () => {
      this.setOpen(false);
      this.setState({newEmail: ''});
    }

    
    handleAddEmail = () => {
        if (this.props.onAddEmail){
            this.props.onAddEmail(this.state.newEmail)
        }
        this.handleClose()
    }

    
    handleImage = ( target ) => {

        if(target.files[0] !== null &&  target.files[0] !== undefined)
        {
            var fReader = new FileReader();
            fReader.readAsDataURL(target.files[0]);
            fReader.onloadend = (event) => 
            {
                if (event) {
                    this.setState({url:event?.target?.result});                    
                }
            }
        }
    }
    setwidthImage = (val) => {
        this.setState({widthpx: val})
    }

    setheightImage = (val) => {
        this.setState({heightpx: val})
    }


    render () {
        const { classes } = this.props
        return(
            <div id="items-bar">
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <div id="items-bar-1">
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
                            <Button id="justify-center-btn"
                                    onClick={() => (document.execCommand('justifyCenter'))} startIcon={<FormatAlignCenterIcon />}
                            />
                            <Button id="justify-left-btn"
                                    onClick={() => (document.execCommand('justifyLeft'))} startIcon={<FormatAlignLeftIcon />}
                            />
                            <Button id="justify-right-btn"
                                    onClick={() => (document.execCommand('justifyRight'))} startIcon={<FormatAlignRightIcon />}
                            />
                            <Button  id="image-btn"                     
                                    onClick={() =>  (document.execCommand('insertimage', 0, this.state.url))} startIcon={<ImageIcon/>}
                            />

                            <Button variant="outlined" color="primary" size="small" onClick={this.handleClickOpen}>
                                Invite
                            </Button>
                            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title">Invite with email</DialogTitle>
                                <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="title"
                                    label="Email"
                                    type="text"
                                    value={this.state.newEmail}
                                    onChange={(e) => { this.setState({ newEmail: e.target.value }) }}
                                    required
                                    fullWidth
                                  />
                                </DialogContent>
                                <DialogActions>
                                    <Button variant="contained" color="secondary" onClick={this.handleClose} >
                                        Cancel
                                    </Button>
                                  <Button variant="contained" color="primary" onClick={this.handleAddEmail}>
                                    Give access
                                  </Button>
                                </DialogActions>
                            </Dialog>
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
                                        onClick={() => document.execCommand('foreColor', false, "white")} value="white">White
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
                                <InputLabel id="select-font-color">Background color</InputLabel>
                                <Select
                                    labelId="select-color-label"
                                    id="select-color"
                                    value={this.state.backColor}
                                    onChange={this.handleSelectBackColorChange}
                                >
                                    <MenuItem
                                        onClick={() => document.execCommand('hiliteColor', false, "white")} value="white">White
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => document.execCommand('hiliteColor', false, "black")} value="black">Black
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => document.execCommand('hiliteColor', false, "red")} value="red">Red
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => document.execCommand('hiliteColor', false, "blue")} value="blue">Blue
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => document.execCommand('hiliteColor', false, "yellow")} value="yellow">Yellow
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => document.execCommand('hiliteColor', false, "green")} value="green">Green
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
                            <div>
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
                                    label={"Font size 1-7"}
                                    value={this.state.fontSize}
                                    size={"small"} />
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
                                    id="myfile" 
                                    name="myfile"
                                    accept="image/"
                                    onChange={() => {
                                        if ("myfile" !== null && "myfile" !== undefined)
                                        {
                                            this.handleImage(document.getElementById('myfile'))
                                        }
                                    } }
                                />
                            </div>
                        </div>        
                    </Grid>
                </Grid>
            </div>
        )
    }
 }

ItemBar.propTypes = {
    classes: PropTypes.object.isRequired,
    add_user: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {
    logoutUser,
    add_user,
  }
) (withStyles(useStyles)(ItemBar))

