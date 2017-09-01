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
    // Need to perform seen request
  }

  handleClick (event) {
    this.props.history.push('/profil/' + event.target.id)
  }

  render () {
    return (
      <div className='body flex-start'>
        <p>Notifications :</p>
        {this.state.notifications.map(notif => {
          if (global.localStorage.getItem('id') !== notif.performUser) {
            switch (notif.type) {
              case 'like':
                return <p key={Math.random()} id={notif.performUser} onClick={this.handleClick.bind(this)} style={{cursor: 'pointer'}}><b style={{pointerEvents: 'none'}}>{notif.performName}</b> like you <Moment style={{pointerEvents: 'none'}} fromNow date={new Date(notif.date)} /></p>
              case 'likeback':
                return <p key={Math.random()} id={notif.performUser} onClick={this.handleClick.bind(this)} style={{cursor: 'pointer'}}><b style={{pointerEvents: 'none'}}>{notif.performName}</b> like you too <Moment style={{pointerEvents: 'none'}} fromNow date={new Date(notif.date)} /></p>
              case 'dislike':
                return <p key={Math.random()} id={notif.performUser} onClick={this.handleClick.bind(this)} style={{cursor: 'pointer'}}><b style={{pointerEvents: 'none'}}>{notif.performName}</b> dislike you <Moment style={{pointerEvents: 'none'}} fromNow date={new Date(notif.date)} /></p>
              case 'view':
                return <p key={Math.random()} id={notif.performUser} onClick={this.handleClick.bind(this)} style={{cursor: 'pointer'}}><b style={{pointerEvents: 'none'}}>{notif.performName}</b> view your profil <Moment style={{pointerEvents: 'none'}} fromNow date={new Date(notif.date)} /></p>
              default:
                break
            }
          } else {
            switch (notif.type) {
              case 'like':
                return <p key={Math.random()} id={notif.concernUser} onClick={this.handleClick.bind(this)} style={{cursor: 'pointer'}}>You have like <b style={{pointerEvents: 'none'}}>{notif.concernName}</b> <Moment style={{pointerEvents: 'none'}} fromNow date={new Date(notif.date)} /></p>
              case 'likeback':
                return <p key={Math.random()} id={notif.concernUser} onClick={this.handleClick.bind(this)} style={{cursor: 'pointer'}}>You like <b style={{pointerEvents: 'none'}}>{notif.concernName}</b> too <Moment style={{pointerEvents: 'none'}} fromNow date={new Date(notif.date)} /></p>
              case 'dislike':
                return <p key={Math.random()} id={notif.concernUser} onClick={this.handleClick.bind(this)} style={{cursor: 'pointer'}}>You have dislike <b style={{pointerEvents: 'none'}}>{notif.concernName}</b> <Moment style={{pointerEvents: 'none'}} fromNow date={new Date(notif.date)} /></p>
              case 'view':
                return <p key={Math.random()} id={notif.concernUser} onClick={this.handleClick.bind(this)} style={{cursor: 'pointer'}}>You have view <b style={{pointerEvents: 'none'}}>{notif.concernName}</b> profil's <Moment style={{pointerEvents: 'none'}} fromNow date={new Date(notif.date)} /></p>
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
