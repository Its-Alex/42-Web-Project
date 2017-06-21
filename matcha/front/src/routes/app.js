import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Navbar from '../navbar.js'
import Search from './search.js'
import Notifications from './notifications.js'
import Settings from './settings.js'
import Profil from './profil.js'
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
      }),
      ws: null
    }
  }

  componentWillMount () {
    if (this.props.location.pathname === '/') {
      this.props.history.push('/profil')
    } else {
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
        }).catch((error) => {
          if (error.response) {
            let token = global.localStorage.getItem('Token')
            global.localStorage.removeItem('Token')
            global.localStorage.setItem('signToken', token)
            this.props.history.push('/auth/profil')
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request)
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message)
          }
          console.log(error.config)
        })
      }
      let ws = new global.WebSocket('ws://localhost:3002/')
      ws.onopen = (event) => {
        ws.send(JSON.stringify({
          method: 'connect',
          token: global.localStorage.getItem('Token')
        }))
      }
      this.setState({
        ws: ws
      })
    }
  }

  render () {
    return (
      <div className='router'>
        <Navbar />
        <Switch>
          <Route exact path='/search'>
            <Search axios={this.state.axios} />
          </Route>
          <Route exact path='/profil'>
            <Profil axios={this.state.axios} />
          </Route>
          <Route exact path='/notifications'>
            <Notifications axios={this.state.axios} />
          </Route>
          <Route exact path='/settings'>
            <Settings axios={this.state.axios} />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

export default App
