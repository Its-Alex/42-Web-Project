import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import App from './routes/app.js'
import Auth from './routes/auth/index.js'

import registerServiceWorker from './utils/registerServiceWorker'
import './index.css'

ReactDOM.render((
  <Router>
    <Switch>
      <Route path='/auth' component={Auth} />
      <Route path='/' component={App} />
    </Switch>
  </Router>
), document.getElementById('root'))

registerServiceWorker()
