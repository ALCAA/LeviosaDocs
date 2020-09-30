import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login'
import Documents from './pages/Documents'

function App () {
  return (
      <Router>
          <Switch>
              <Route exact path='/login' component={Login} />
              <Route path='/documents' component={Documents} />
              <Route exact path='/' render={() => <Redirect to='/login' />} />
          </Switch>
      </Router>
  )
}

export default App
