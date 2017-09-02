import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import axios from 'axios'
import axiosInst from '../utils/axios.js'
import ws from '../utils/ws.js'
import {observable} from 'mobx'

import Navbar from './navbar.js'
import Search from './search.js'
import Notifications from './notifications.js'
import Settings from './settings.js'
import Profil from './profil.js'
import OtherProfil from './otherProfil.js'
import ChatList from './chatList.js'

const chatStore = observable({
  chat: []
})

class App extends React.Component {
  componentWillMount () {
    ws.connect()
    ws.onmessage(this.props.history, () => {})
    /**
     * Check if user is connected adn exist
     */
    if (!global.localStorage.getItem('token')) {
      return this.props.history.push('/auth/login')
    } else {
      /**
       * Check if user has a profil if not he will be redirect
       */
      axiosInst().get('profil/me').then((res) => {
        /**
         * Get latitude and longitude of user and send it to API to get his current position
         */
        axios.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBO1ucGtsgt5eRvN1TQg4SIbquDHrQBosk').then((res) => {
          /**
           * Send latitude and longitude to server
           */
          axiosInst().post('geoloc', {
            lat: res.data.location.lat,
            lng: res.data.location.lng
          }).catch((err) => console.log(err.response))
        }).catch((err) => console.log(err.response))
      }).catch((err) => {
        if (err.response) {
          let token = global.localStorage.getItem('token')
          global.localStorage.removeItem('token')
          global.localStorage.setItem('signToken', token)
          return this.props.history.push('/auth/login')
        }
      })
    }
  }

  render () {
    return (
      <div className='router'>
        <Navbar />
        <Switch>
          <Route exact path='/search' component={Search} />
          <Route exact path='/profil/:user' component={OtherProfil} />
          <Route exact path='/profil' component={Profil} />
          <Route exact path='/notifications' component={Notifications} />
          <Route exact path='/settings' component={Settings} />
          <Route exact path='/chat'>
            <ChatList history={this.props.history} store={chatStore} />
          </Route>
          <Redirect to='/profil' />
        </Switch>
      </div>
    )
  }
}

export default App
