import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Login from './login.js'
import Signin from './signup.js'
import Forgot from './forget.js'
import Profile from './profile.js'

class Index extends Component {
  componentWillMount () {
    if (global.localStorage.getItem('token')) {
      return this.props.history.push('/profile')
    }
  }
  
  render () {
    return (
      <div className='router'>
        <Switch>
          <Route exact path='/auth/login' component={Login} />
          <Route exact path='/auth/signup' component={Signin} />
          <Route exact path='/auth/profile' component={Profile} />
          <Route exact path='/auth/forgot' component={Forgot} />
          <Redirect to='/auth/login' />
        </Switch>
      </div>
    )
  }
}

export default Index
