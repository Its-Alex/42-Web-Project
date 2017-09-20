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
          <Route exact path='/auth/login' render={() => {
            return <Login history={this.props.history} match={this.props.match} location={this.props.location} />
          }} />
          <Route exact path='/auth/signup' render={() => {
            return <Signin history={this.props.history} match={this.props.match} location={this.props.location} />
          }} />
          <Route exact path='/auth/profile' render={() => {
            return <Profile history={this.props.history} match={this.props.match} location={this.props.location} />
          }} />
          <Route exact path='/auth/forget' render={() => {
            return <Forgot history={this.props.history} match={this.props.match} location={this.props.location} />
          }} />
          <Route exact path='/auth/forget/:hash' render={() => {
            return <Recover history={this.props.history} match={this.props.match} location={this.props.location} />
          }} />
          <Redirect to='/auth/login' />
        </Switch>
      </div>
    )
  }
}

export default Index
