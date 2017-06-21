import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from './routes/app.js'
import Auth from './routes/auth/index.js'
import notFound from './routes/notFound.js'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

class Index extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route path='/auth' component={Auth} />
          <Route path='/' component={App} />
          <Route component={notFound} />
        </Switch>
      </Router>
    )
  }
}

ReactDOM.render(<Index />, document.getElementById('root'))
registerServiceWorker()
