import React from 'react'
import PropTypes from 'prop-types'
import { AppBar, Toolbar, IconButton, Button, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'

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
                                Documents - PMS
              </Typography>
              <Button color='inherit'>{this.props.username}</Button>
            </Toolbar>
          </AppBar>
        </div>
      </div>
    )
  }
}

TopBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(useStyles)(TopBar)
