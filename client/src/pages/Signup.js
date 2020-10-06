import React from 'react'
import signup from "../actions/signup";
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import '../App.css'


class Signup extends React.Component {
  constructor () {
    super()

    this.state = {
      firstname: '',
      name: '',
      email: '',
      password: '',
      cpassword: ''
    }
  }


  signup = async (e) => {
    e.preventDefault();
    const { firstname, name, email, password, cpassword } = this.state;
    try {
      const { data } = await signup.signup({ firstname, name, email, password, cpassword });
      localStorage.setItem('token', data.token);
      window.location = '/login';
    } catch (error) {
      console.error(error);
    }
  };

  render () {
    return (
      <div className='Login'>
        <header className='App-header' />
        <div className='App-body'>
          <h1>Sign up page</h1>
          <form autoComplete='off' noValidate>
            <div className='login-items'>
              <div className='login-textfield'>
                <TextField
                  id='firstname'
                  label='Firstname'
                  variant='outlined'
                  value={this.state.firstname}
                  onChange={(e) => { this.setState({ firstname: e.target.value }) }}
                  required
                />
              </div>
              <div className='mt-14'>
                <TextField
                  id='Lastname'
                  label='Lastname'
                  variant='outlined'
                  value={this.state.name}
                  onChange={(e) => { this.setState({ name: e.target.value }) }}
                  required
                />
              </div>
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
                  label='Password (7 char min.)'
                  variant='outlined'
                  value={this.state.password}
                  onChange={(e) => { this.setState({ password: e.target.value }) }}
                  required
                />
              </div>
              <div className='mt-14'>
                <TextField
                  id='cpassword'
                  label='Confirm your password'
                  variant='outlined'
                  value={this.state.cpassword}
                  onChange={(e) => { this.setState({ cpassword: e.target.value }) }}
                  required
                />
              </div>
              <Button id='submit-login' variant='contained' color='primary' onClick={this.signup}>
                Sign up 
              </Button>
              <div>
                <Button id='got-account' variant='contained' color='secondary' href='/login'>
                  I already got an account
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Signup