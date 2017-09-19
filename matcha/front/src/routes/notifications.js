import React from 'react'
import Moment from 'react-moment'
import axiosInst from '../utils/axios.js'

class Notifications extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      notifications: []
    }
  }

  componentWillMount () {
    axiosInst().get('/notifications').then((result) => {
      this.setState({
        notifications: result.data.notifications
      })
    }).catch((err) => {
      console.log(err.response)
    })
  }

  componentDidMount () {
    setTimeout(() => {
      document.getElementById('notificationsButton').classList.remove('active')
    }, 500)
    axiosInst().post('/notification').then((result) => {
      if (result.data.success !== true) console.log(result.data)
    }).catch((err) => {
      console.log(err.response)
    })
  }

  handleClick (event) {
    this.props.history.push('/profile/' + event.target.id)
  }

  render () {
    return (
      <div className='body flex-start'>
        <p>Notifications :</p>
        {this.state.notifications.map(notif => {
          if (global.localStorage.getItem('id') !== notif.performUser) {
            switch (notif.type) {
              case 'like':
                return (
                  <p key={Math.random()} id={notif.performUser} onClick={this.handleClick.bind(this)} style={{cursor: 'pointer'}}>
                    <b style={{pointerEvents: 'none'}}>{notif.performName}</b> likes you <Moment style={{pointerEvents: 'none'}} fromNow date={new Date(notif.date)} />
                  </p>
                )
              case 'likeback':
                return (
                  <p key={Math.random()} id={notif.performUser} onClick={this.handleClick.bind(this)} style={{cursor: 'pointer'}}>
                    <b style={{pointerEvents: 'none'}}>{notif.performName}</b> likes you too <Moment style={{pointerEvents: 'none'}} fromNow date={new Date(notif.date)} />
                  </p>
                )
              case 'dislike':
                return (
                  <p key={Math.random()} id={notif.performUser} onClick={this.handleClick.bind(this)} style={{cursor: 'pointer'}}>
                    <b style={{pointerEvents: 'none'}}>{notif.performName}</b> dislikes you <Moment style={{pointerEvents: 'none'}} fromNow date={new Date(notif.date)} />
                  </p>
                )
              case 'view':
                return (
                  <p key={Math.random()} id={notif.performUser} onClick={this.handleClick.bind(this)} style={{cursor: 'pointer'}}>
                    <b style={{pointerEvents: 'none'}}>{notif.performName}</b> views your profile <Moment style={{pointerEvents: 'none'}} fromNow date={new Date(notif.date)} />
                  </p>
                )
              default:
                break
            }
          } else {
            switch (notif.type) {
              case 'like':
                return (
                  <p key={Math.random()} id={notif.concernUser} onClick={this.handleClick.bind(this)} style={{cursor: 'pointer'}}>
                    You liked <b style={{pointerEvents: 'none'}}>{notif.concernName}</b> <Moment style={{pointerEvents: 'none'}} fromNow date={new Date(notif.date)} />
                  </p>
                )
              case 'likeback':
                return (
                  <p key={Math.random()} id={notif.concernUser} onClick={this.handleClick.bind(this)} style={{cursor: 'pointer'}}>
                    You liked <b style={{pointerEvents: 'none'}}>{notif.concernName}</b> too <Moment style={{pointerEvents: 'none'}} fromNow date={new Date(notif.date)} />
                  </p>
                )
              case 'dislike':
                return (
                  <p key={Math.random()} id={notif.concernUser} onClick={this.handleClick.bind(this)} style={{cursor: 'pointer'}}>
                    You disliked <b style={{pointerEvents: 'none'}}>{notif.concernName}</b> <Moment style={{pointerEvents: 'none'}} fromNow date={new Date(notif.date)} />
                  </p>
                )
              case 'view':
                return (
                  <p key={Math.random()} id={notif.concernUser} onClick={this.handleClick.bind(this)} style={{cursor: 'pointer'}}>
                    You've seen the profile of <b style={{pointerEvents: 'none'}}>{notif.concernName}</b> <Moment style={{pointerEvents: 'none'}} fromNow date={new Date(notif.date)} />
                  </p>
                )
              default:
                break
            }
          }
          return null
        })}
      </div>
    )
  }
}

export default Notifications
