import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Navbar from '../navbar.js'
import NotFound from './notFound.js'
import axios from 'axios'

// https://developers.google.com/maps/documentation/static-maps/?hl=fr

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
        axios.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBO1ucGtsgt5eRvN1TQg4SIbquDHrQBosk').then((res) => {
          this.state.axios.post('geoloc', {
            lat: res.data.location.lat,
            lng: res.data.location.lng
          }).catch((err) => {
            console.log(new Error(err))
          })
        }).catch((err) => {
          console.log(new Error(err))
        })
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
