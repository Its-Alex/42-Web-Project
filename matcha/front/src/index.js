import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from './routes/app.js'
import Auth from './routes/auth/index.js'
import notFound from './routes/notFound.js'
import registerServiceWorker from './registerServiceWorker'
import './index.css'
// const ws = new global.WebSocket('ws://localhost:3002')

// ws.onopen = (event) => {
//   ws.send('Salut')
// }

// ws.onmessage = (msg) => {
//   ws.send('Receive msg')
// }

// ws.onclose = (event) => {
//   ws.send('Close connection')
// }

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
