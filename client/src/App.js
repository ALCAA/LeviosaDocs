import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import Login from './pages/Login'
import Signup from './pages/Signup'
import Documents from './pages/Documents'
import Dashboard from './pages/Dashboard'

import { Provider } from 'react-redux'
import store from './store'
import jwt_decode from 'jwt-decode'

import { setCurrentUser, logoutUser } from './actions/login'
import setAuthToken from './utils/setAuthToken'

import PrivateRoute from './components/Private-route/PrivateRoute'

if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken
  setAuthToken(token)
  // Decode token and get user info and exp
  const decoded = jwt_decode(token)
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded))
  // Check for expired token
  const currentTime = Date.now() / 1000 // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser())

    // Redirect to login
    window.location.href = './login'
  }
}

function App () {
  return (
  	<Provider store={store}>
    	<Router>
      		<Switch>
      		  <Route exact path='/' render={() => <Redirect to='/login' />} />
        		<Route exact path='/login' component={Login} />
        		<Route exact path='/signup' component={Signup} />
            <PrivateRoute path='/dashboard' component={Dashboard} />
        		<PrivateRoute path='/documents' component={Documents} />
      		</Switch>
    	</Router>
    </Provider>
  )
}

export default App
