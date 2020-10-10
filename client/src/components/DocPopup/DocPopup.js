import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link } from 'react-router-dom'

class DocPopup extends React.Component {
  constructor () {
    super()

    this.state = {
      open: false, 
      doctitle: ''
    }
  }

  handleClickOpen = () => {
    this.setState({open: true})
    console.log(this.props.username)
  };

  handleClose = () => {
    this.setState({open: false})
  };

  handleTitle = () => {
    console.log(this.state.doctitle)
    this.setState({open: false})
  }

  render () {
    return (
      <div style={{margin:'10px'}}>
        <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
          Create document
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Choose document name</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Title"
              type="text"
              value={this.state.doctitle}
              onChange={(e) => { this.setState({ doctitle: e.target.value }) }}
              required
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" onClick={this.handleClose} >
              Cancel
            </Button>
            <Link to={{
                pathname: '/documents',
                username: this.props.username,
                doctitle: this.state.doctitle,
              }}
              >
              <Button variant="contained" color="primary" onClick={this.handleTitle} >
                Subscribe
              </Button>
            </Link>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default DocPopup