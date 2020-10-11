import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const users = [
  {firstname : 'Harry', name: 'Potter', email: 'harry@grifondor.express'},
  {firstname : 'Hagrid', name: 'LeBoss', email: 'hagrid.leboss@podlard.express'}
]
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

export default class CollabList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      newEmail: '',
      open: false,
      selectedValue: users[0].email,
    }
  }

  setOpen = (arg) => {
    this.setState({open: arg})
  }

  setSelectedValue = (value) => {
    this.setState({selectedValue: value})
  }

  handleClickOpen = () => {
    this.setOpen(true);
  };

  handleClose = (value) => {
    this.setOpen(false);
    this.setSelectedValue(value);
  };

  render () {
    return (
    <div style={{margin:'10px'}}>
      <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
        Invite people
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
          <Button variant="contained" color="primary" onClick={this.handleClose} >
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={this.handleClose}>
            Send invitation
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
  }
}