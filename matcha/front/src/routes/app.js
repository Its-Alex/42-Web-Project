import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import axios from 'axios'
import axiosInst from '../utils/axios.js'
import ws from '../utils/ws.js'

import Navbar from './navbar.js'
import Search from './search.js'
import Notifications from './notifications.js'
import Settings from './settings.js'
import Profile from './profile.js'
import OtherProfile from './otherProfile.js'
import ChatList from './chatList.js'

class App extends React.Component {
  componentWillMount () {
    /**
     * Check if user is connected adn exist
     */
    if (!global.localStorage.getItem('token')) {
      return this.props.history.push('/auth/login')
    } else {
      /**
       * Check if user has a profile if not he will be redirect
       */
      axiosInst().get('profile/me').then((res) => {
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

  componentWillUnmount () {
    ws.close()
  }

  componentDidMount () {
    ws.init()
    ws.onmessage(this.props.history, () => {})
  }

  render () {
    return (
      <div className='router'>
        <Navbar />
        <Switch>
          <Route exact path='/search' component={Search} />
          <Route exact path='/profile/:user' component={OtherProfile} />
          <Route exact path='/profile' component={Profile} />
          <Route exact path='/notifications' component={Notifications} />
          <Route exact path='/settings' component={Settings} />
          <Route exact path='/chat' component={ChatList} />
          {(global.localStorage.getItem('token'))
          ? <Redirect to='/profile' />
          : null}
        </Switch>
      </div>
    )
  }
}

export default App
