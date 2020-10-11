import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { create_docs } from '../../actions/docs';


class DocPopup extends Component {
  constructor (props) {
    super(props)

    this.state = {
      open: false, 
      doctitle: ''
    }
  }

  handleClickOpen = () => {
    this.setState({open: true})
  };

  handleClose = () => {
    this.setState({open: false})
  };

  create_docs = e => {
    const { user } = this.props.auth;
    const docsData = {
      name: this.state.doctitle,
      creator : user.id,
      content: ''
    }
    this.props.create_docs(docsData);
  }

  handleTitle = () => {
    this.setState({open: false})
  }

  render () {
    const msg = this.props.msg
    const title = this.props.title
    const label = this.props.label
    
    return (
      <div style={{margin:'10px'}}>
        <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
          {msg}
        </Button>
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
            <Button variant="contained" color="primary" onClick={this.handleTitle && this.create_docs} >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

DocPopup.propTypes = {
  create_docs: PropTypes.func.isRequired,
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
    create_docs
  }
)(DocPopup)