import React, { Component } from 'react'
// import Moment from 'react-moment'
import axiosInst from '../utils/axios.js'

class Notifications extends Component {
  constructor (props) {
    super(props)

    this.state = {
      notifications: []
    }
  }

  componentWillMount () {
    let self = this
    axiosInst.get('/notifications').then((result) => {
      console.log(result.data.notifications)
      self.setState = {
        notifications: result.data.notifications
      }
    }).catch((err) => {
      console.log(err.response)
    })
  }

  handleClick () {
    console.log(this.state.notifications)
  }

  render () {
    return (
      <div className='body flex-start' onClick={this.handleClick.bind(this)}>
        <p>Notifications :</p>
      </div>
    )
  }
}
        // {this.state.notifications.map(notif => {
        //   return <p>Salut</p>
        // })}

export default Notifications
