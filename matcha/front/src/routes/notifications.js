import React, { Component } from 'react'
import axiosInst from '../axios.js'
import './css/profil.css'

class Notifications extends Component {
  constructor (props) {
    super(props)

    this.state = {
      notifications: []
    }
  }

  componentWillMount () {
    axiosInst.get('/notifications').then((result) => {
      console.log(result.data)
      this.setState = {
        notifications: result.data.notifications
      }
    }).catch((err) => {
      console.log(err.response)
    })
  }

  render () {
    return (
      <div className='body'>
        <p>Notifications :</p>
        {this.state.notifications.map(notif => <p>{notif}</p>)}
      </div>
    )
  }
}

export default Notifications
