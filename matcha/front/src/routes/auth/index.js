import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Login from './login.js'
import Signin from './signup.js'
import Forgot from './forget.js'
import Profile from './profile.js'
import Recover from './recover.js'

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
          <Route exact path='/auth/login' render={({history, match, location}) => {
            return <Login history={this.props.history} match={match} location={location} />
          }} />
          <Route exact path='/auth/signup' render={({history, match, location}) => {
            return <Signin history={this.props.history} match={match} location={location} />
          }} />
          <Route exact path='/auth/profile' render={({history, match, location}) => {
            return <Profile history={this.props.history} match={match} location={location} />
          }} />
          <Route exact path='/auth/forget' render={({history, match, location}) => {
            return <Forgot history={this.props.history} match={match} location={location} />
          }} />
          <Route exact path='/auth/forget/:hash' render={({history, match, location}) => {
            return <Recover history={this.props.history} match={match} location={location} />
          }} />
          <Redirect to='/auth/login' />
        </Switch>
      </div>
    )
  }
}

export default Index
