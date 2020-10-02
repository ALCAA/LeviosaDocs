import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import '../App.css'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch'
    }
  },
  margin: {
    margin: theme.spacing(1)
  }
}))

class Login extends React.Component {
  constructor () {
    super()

    this.state = {
      username: ''
    }
  }

  render () {
    const { classes } = this.props

    return (
      <div className='Login'>
        <header className='App-header' />
        <div className='App-body'>
          <form className={classes.root} autoComplete='off' noValidate>
            <div className='login-items'>
              <TextField
                id='outlined-basic'
                label='Username'
                variant='outlined'
                value={this.state.username}
                onChange={(e) => { this.setState({ username: e.target.value }) }}
                required
              />
              <Link to={{
                pathname: '/documents',
                username: this.state.username
              }}
              >
                <Button id='submit-login' variant='contained' color='primary' className={classes.submit}>
                                    Continuer
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default withStyles(useStyles)(Login)
