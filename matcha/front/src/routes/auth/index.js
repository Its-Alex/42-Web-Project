import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './login.js'
import Signin from './signup.js'
import Forgot from './forget.js'
import notFound from '../notFound.js'

class Index extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route exact path='/auth/login' component={Login} />
          <Route exact path='/auth/signup' component={Signin} />
          <Route exact path='/auth/forgot' component={Forgot} />
          <Route component={notFound} />
        </Switch>
      </Router>
    )
  }
}

export default Index
