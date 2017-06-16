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
      this.state.axios.get('profil/me').then((res) => {

      }).catch((err) => {
        if (err) {
          let token = global.localStorage.getItem('Token')
          console.log(token)
          global.localStorage.removeItem('Token')
          global.localStorage.setItem('signToken', token)
          this.props.history.push('/auth/profil')
        }
      })
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        axios.post(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.coords.latitude},${pos.coords.longitude}&sensor=true`)
        .then((res) => {
          console.log(res.data.results[0].formatted_address)
        }).catch((err) => {
          console.log(err)
        })
      })
    }
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
