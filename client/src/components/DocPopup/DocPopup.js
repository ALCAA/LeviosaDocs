import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/login";
import { create_docs } from '../../actions/docs';
import { add_user } from '../../actions/docs';


class DocPopup extends Component {
  constructor (props) {
    super(props)

    this.state = {
      open: true, 
      doctitle: '',
      newEmail: '',
    }
  }

  add_user = e => {
    let id = window.location.pathname;
    id = id.substring(1, id.length)
    id = id.substring(0, id.length - 5)
    const body = {
      email: this.state.newEmail,
      id: id
    }
    this.props.add_user(body);
  }

  onNameChange = (evt) => {
    this.props.onNameChange(this.state.doctitle)
  }

  handleClickOpen = () => {
    this.setState({open: true})
  };

  handleClose = () => {
    this.setState({open: false})
  };

  render () {
    const msg = this.props.msg
    const title = this.props.title
    const label = this.props.label
    const validate = this.props.validate
    const usage = this.props.usage
    
    return (
      <div style={{margin:'10px'}}>
        {usage === "document" &&
            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">{title}</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="title"
                  label={label}
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
                <Button variant="contained" color="primary" onClick={this.handleClose && this.onNameChange} >
                  {msg}
                </Button>
              </DialogActions>
            </Dialog>
          }
          {usage === "email" && 
            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">{title}</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="title"
                  label={label}
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
                <Button variant="contained" color="primary" onClick={this.handleClose && this.add_user}>
                  {msg}
                </Button>
              </DialogActions>
            </Dialog>
          }
      </div>
    );
  }
}

DocPopup.propTypes = {
  create_docs: PropTypes.func.isRequired,
  add_user: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  doc: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  doc: state.doc,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {
    logoutUser,
    create_docs,
    add_user
  }
)(DocPopup)