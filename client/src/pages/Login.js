import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../actions/login';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import '../App.css'


class Login extends React.Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: '',
      username: '', 
    }
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      window.location.href = '/dashboard';
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      window.location.href = '/dashboard';
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  login = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render () {
    return (
      <div className='Login'>
        <header className='App-header' />
        <div className='App-body-login'>
          <h1>Welcome to LeviosaDocs</h1>
          <a href='https://github.com/ALCAA/LeviosaDocs'>
            <img width='36' height='36' alt='' src='GitHub.png' target="_blank"/>
          </a>
          <form autoComplete='off' noValidate>
            <div className='login-items'>
              <div className='mt-14'>
                <TextField
                  id='email'
                  label='Email address'
                  variant='outlined'
                  value={this.state.email}
                  onChange={(e) => { this.setState({ email: e.target.value }) }}
                  required
                />
              </div>
              <div className='mt-14'>
                <TextField
                  id='password'
                  type='password'
                  label='Password'
                  variant='outlined'
                  value={this.state.password}
                  onChange={(e) => { this.setState({ password: e.target.value }) }}
                  required
                />
              </div>
              <Button id='submit-login' variant='contained' color='primary' onClick={this.login}>
                Login
              </Button>
              <div>
                <Button id='no-account' variant='contained' color='secondary' href='/signup'>
                  I don't have an account
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
