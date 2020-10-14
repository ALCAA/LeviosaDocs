import React from 'react'
import PropTypes from 'prop-types'
import { Toolbar, AppBar, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles'
import { logoutUser } from "../../actions/login";
import { connect } from "react-redux";
import { delete_docs } from "../../actions/docs";
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = (theme) => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
})

class TopBar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      newName: '',
      open: false,
    }
  }
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  setOpen = (arg) => {
    this.setState({open: arg})
  }

  handleClickOpen = () => {
    this.setOpen(true);
  }

  handleClose = () => {
    this.setOpen(false);
  }

  handleChangeName = () => {
    if (this.props.onChangeName){
        this.props.onChangeName(this.state.newName)
    }
    this.handleClose()
  }

  delete = e => {
    e.preventDefault()
    const datatosubmit = {
      _id : this.props.document_id
    }
    this.props.delete_docs(datatosubmit)
  }

  render () {
    const { classes } = this.props
    return (
      <div id='top-bar'>
        <div className={classes.root}>
          <AppBar position='static'>
            <Toolbar>
              <Button style={{color: 'white'} } onClick={this.handleClickOpen} className={classes.title}> {this.props.docName}
              </Button>
              <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Change document name</DialogTitle>
                <DialogContent>
                  <TextField
                      autoFocus
                      margin="dense"
                      id="title"
                      label="New document name"
                      type="text"
                      value={this.state.newName}
                      onChange={(e) => { this.setState({ newName: e.target.value }) }}
                      required
                      fullWidth
                    />
                </DialogContent>
                <DialogActions>
                  <Button variant="contained" color="secondary" onClick={this.handleClose} >
                      Cancel
                  </Button>
                  <Button variant="contained" color="primary" onClick={this.handleChangeName}>
                  Change name
                  </Button>
                </DialogActions>
              </Dialog>
              <Button color='inherit'>{this.props.completeName}</Button>
              <Button onClick={this.delete} startIcon={<DeleteIcon />}/>
              <Button id='dashboard-top-bar' variant='contained'color='default' href='/dashboard'>Dashboard</Button>
              <Button id='logout-top-bar' variant='contained' color='secondary' onClick={this.onLogoutClick}>Logout</Button>
            </Toolbar>
          </AppBar>
        </div>
      </div>
    )
  }
}

TopBar.propTypes = {
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  doc: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
  auth: state.auth,
  doc: state.doc,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {
    logoutUser,
    delete_docs
  }
) (withStyles(useStyles)(TopBar)); 
