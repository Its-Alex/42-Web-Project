import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import ws from '../utils/ws.js'
import axios from 'axios'
import axiosInst from '../utils/axios.js'
import {observable} from 'mobx'
// https://developers.google.com/maps/documentation/static-maps/?hl=fr

import Navbar from './navbar.js'
import Search from './search.js'
import Notifications from './notifications.js'
import Settings from './settings.js'
import Profil from './profil.js'
import OtherProfil from './otherProfil.js'
import ChatList from './chatList.js'
import NotFound from './notFound.js'

const chatStore = observable({
  chat: []
})

class App extends Component {
  componentWillMount () {
    ws.connect()
    ws.onmessage(this.props.history, () => {})
    /**
     * Check if user is connected adn exist
     */
    if (!global.localStorage.getItem('Token')) {
      this.props.history.push('/auth/login')
    } else {
      /**
       * Redirect user if his path is equal to '/'
       */
      if (this.props.location.pathname === '/') {
        this.props.history.push('/profil')
      } else {
        /**
         * Check if user has a profil if not he will be redirect
         */
        axiosInst.get('profil/me').then((res) => {
          /**
           * Get latitude and longitude of user and send it to API to get his current position
           */
          axios.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBO1ucGtsgt5eRvN1TQg4SIbquDHrQBosk').then((res) => {
            /**
             * Send latitude and longitude to server
             */
            axiosInst.post('geoloc', {
              lat: res.data.location.lat,
              lng: res.data.location.lng
            }).catch((err) => console.log(err))
          }).catch((err) => console.log(err))
        }).catch((error) => {
          if (error.response) {
            let token = global.localStorage.getItem('Token')
            global.localStorage.removeItem('Token')
            global.localStorage.setItem('signToken', token)
            this.props.history.push('/auth/login')
          }
        })
      }
    }
  }

  render () {
    return (
      <div className='router'>
        <Navbar />
        <Switch>
          <Route exact path='/search'>
            <Search />
          </Route>
          <Route exact path='/profil/:user' component={OtherProfil} />
          <Route exact path='/profil'>
            <Profil />
          </Route>
          <Route exact path='/notifications'>
            <Notifications />
          </Route>
          <Route exact path='/settings'>
            <Settings history={this.props.history} />
          </Route>
          <Route exact path='/chat'>
            <ChatList history={this.props.history} store={chatStore} />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

export default App
