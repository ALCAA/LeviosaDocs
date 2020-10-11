import React from 'react'
import PropTypes from 'prop-types'
import { AppBar, Toolbar, IconButton, Button, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import { logoutUser } from "../../actions/login";
import { connect } from "react-redux";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
})

class TopBar extends React.Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render () {
    const { classes } = this.props
    return (
      <div id='top-bar'>
        <div className={classes.root}>
          <AppBar position='static'>
            <Toolbar>
              <IconButton edge='start' className={classes.menuButton} color='inherit' aria-label='menu'>
                <MenuIcon />
              </IconButton>
              <Typography variant='h6' className={classes.title}>
                                {this.props.docName}
              </Typography>
              <Button color='inherit'>{this.props.completeName}</Button>
              <Button id='logout' variant='contained' color='secondary' onClick={this.onLogoutClick}>
                Logout
              </Button>
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
  }
) (withStyles(useStyles)(TopBar)); 
