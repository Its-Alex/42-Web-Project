import React, { Component } from 'react'
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

class App extends Component {
  componentWillMount () {
    if (!global.localStorage.getItem('token')) {
      this.props.history.push('/login')
    }
  }
  render () {
      // <Router history={history}>
      //   <Switch>
      //     <Route exact path='/' component='Home' />
      //   </Switch>
      // </Router>
    return (
      <div>
        {}
      </div>
    )
  }
}

export default App
