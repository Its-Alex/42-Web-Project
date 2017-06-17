import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Navbar from '../navbar.js'
import NotFound from './notFound.js'
import axios from 'axios'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      axios: axios.create({
        baseURL: 'http://localhost:3005/',
        timeout: 1000,
        headers: {'Authorization': `Bearer ${global.localStorage.getItem('Token')}`}
      })
    }
  }

  componentWillMount () {
    if (!global.localStorage.getItem('Token')) {
      this.props.history.push('/auth/login')
    } else {
      this.state.axios.get('profil/me').catch((err) => {
        if (err) {
          let token = global.localStorage.getItem('Token')
          console.log(token)
          global.localStorage.removeItem('Token')
          global.localStorage.setItem('signToken', token)
          this.props.history.push('/auth/profil')
        }
      })
    }

    this.state.axios.get('geoloc')
  }

  render () {
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
