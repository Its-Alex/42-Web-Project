import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Navbar from '../navbar.js'
import NotFound from './notFound.js'
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

class App extends Component {
  componentWillMount () {
    if (!global.localStorage.getItem('token')) {
      this.props.history.push('/auth/login')
    }
  }

  render () {
      // <Router history={history}>
      //   <Switch>
      //     <Route exact path='/' component='Home' />
      //   </Switch>
      // </Router>
    return (
      <div className='router'>
        <Navbar />
        <Switch>
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

export default App
