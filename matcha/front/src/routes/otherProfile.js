import React from 'react'
import {observer} from 'mobx-react';
import Moment from 'react-moment'

import axiosInst from '../utils/axios.js'
import Store from '../utils/store.js'
import ws from '../utils/ws.js'

import './css/otherProfile.css'

@observer
class OtherProfile extends React.Component {
  _isMounted = false

  constructor (props) {
    super(props)

    this.state = {
      isLike: false,
      isReport: false,
      likeBack: false,
      username: '',
      birthday: '',
      bio: '',
      popularity: '',
      genre: '',
      type: '',
      tags: '',
      location: '',
      lastConnect: '',
      password: '',
      img: [
        '',
        '',
        '',
        '',
        ''
      ]
    }

    this.handleAction = this.handleAction.bind(this)
  }

  /**
   * Get user's datas
   */
  componentWillMount () {
    axiosInst().get(`/otherProfile/${this.props.match.params.user}`).then(res => {
      if (res.data.success === true) {
        if (res.data.block === true) {
          this.props.history.push('/profile')
        }
        if (this._isMounted === true) {
          this.setState({
            isReport: res.data.report,
            likeBack: res.data.likeBack,
            username: res.data.name,
            birthday: res.data.profile[0].birthday,
            bio: res.data.profile[0].bio,
            firstName: res.data.profile[0].firstName,
            lastName: res.data.profile[0].lastName,
            popularity: res.data.profile[0].popularity,
            genre: (res.data.profile[0].genre === 'M') ? 'Man' : 'Woman',
            type: (res.data.profile[0].type === 'M') ? 'Mens' : (res.data.profile[0].type === 'F') ? 'Womens' : 'Mens and Womans',
            tags: res.data.profile[0].tags,
            location: res.data.profile[0].location,
            lastConnect: res.data.profile[0].lastConnect,
            img: [
              `http://localhost:3005/picture/${res.data.id}/0`,
              `http://localhost:3005/picture/${res.data.id}/1`,
              `http://localhost:3005/picture/${res.data.id}/2`,
              `http://localhost:3005/picture/${res.data.id}/3`,
              `http://localhost:3005/picture/${res.data.id}/4`
            ]
          })
        }
      } else {
        if (this._isMounted === true) {
          this.setState({
            error: res.data.error
          })
        }
      }
    }).catch(err => console.log(err.response))
    axiosInst().get(`/like/${this.props.match.params.user}`).then(res => {
      if (res.data.success === true && this._isMounted === true) {
        this.setState({isLike: true})
      }
    }).catch(err => console.log(err))
  }

  componentDidMount () {
    this._isMounted = true
    if (this.props.match.params.user === global.localStorage.getItem('id')) {
      return this.props.history.push('/profile')
    } else {
      ws.send({
        method: 'viewProfile',
        to: this.props.match.params.user
      })
    }
  }  
  
  componentWillUnmount () {
    this._isMounted = false
  }
  

  /**
   * Handle when a key is pressed
   * @param {object} event
   */
  handleAction (event) {
    if (event.target.id === 'likeButton') {
      axiosInst().post(`/like/${this.props.match.params.user}`).then(res => {
        if (res.data.success === false) {
          this.props.notification.addNotification({
            level: 'error',
            title: 'Action successful',
            message: res.data.error
          })
        } else if (res.data.success === true) {
          this.setState({isLike: true})
          this.props.notification.addNotification({
            level: 'success',
            title: 'Action unsuccessful',
            message: 'User liked'
          })
        }
      }).catch(err => console.log(err.response))
    } else if (event.target.id === 'dislikeButton') {
      axiosInst().delete(`/like/${this.props.match.params.user}`).then(res => {
        if (res.data.success === false) {
          this.props.notification.addNotification({
            level: 'error',
            title: 'Action successful',
            message: res.data.error
          })
        } else if (res.data.success === true) {
          this.setState({isLike: false})
          this.props.notification.addNotification({
            level: 'success',
            title: 'Action unsuccessful',
            message: 'User disliked'
          })
        }
      }).catch(err => {console.log(err.response)})
    } else if (event.target.id === 'blockButton') {
      axiosInst().post('/block', {id: this.props.match.params.user}).then(res => {
        if (res.data.success === false) {
          this.props.notification.addNotification({
            level: 'error',
            title: 'Action unsuccessful',
            message: res.data.error
          })
        } else if (res.data.success === true) {
          this.props.notification.addNotification({
            level: 'success',
            title: 'Action successful',
            message: 'User blocked'
          })
          this.props.history.push('/profil')
        }
      }).catch(err => {console.log(err.response)})
    } else if (event.target.id === 'fakeButton') {
      axiosInst().post('/fake', {id: this.props.match.params.user}).then(res => {
        if (res.data.success === false) {
          this.props.notification.addNotification({
            level: 'error',
            title: 'Action unsuccessful',
            message: res.data.error
          })
        } else if (res.data.success === true) {
          this.props.notification.addNotification({
            level: 'success',
            title: 'Action successful',
            message: 'User was reported like a fake'
          })
        }
      }).catch(err => {console.log(err.response)})
    }
  }

  /**
   * Update when websocket receive new user connect/disconnect
   */
  updateLastConnect() {
    if (this.state.lastConnect + 5000 < Date.now() && this._isMounted === true) {
      axiosInst().get(`/otherProfile/${this.props.match.params.user}`).then(res => {
        if (res.data.success === true && this._isMounted === true) {
          this.setState({
            lastConnect: res.data.profile[0].lastConnect,
          })
        } else if (this._isMounted === true) {
          this.setState({
            error: res.data.error
          })
        }
      }).catch(err => console.log(err.response))
    }
    return (<p><b>Last connect : </b><Moment fromNow date={new Date(this.state.lastConnect)} /></p>)
  }

  render () {
    return (
      <div className='body flex-start'>
        <div id='profile-container'>
          <div id='profile-img'>
            <div style={{'backgroundImage': `url(${this.state.img[0]})`}} />
            <div style={{'backgroundImage': `url(${this.state.img[1]})`}} />
            <div style={{'backgroundImage': `url(${this.state.img[2]})`}} />
            <div style={{'backgroundImage': `url(${this.state.img[3]})`}} />
            <div style={{'backgroundImage': `url(${this.state.img[4]})`}} />
          </div>
          <div id='profile-data'>
            <p><b>Popularity : </b>{this.state.popularity}</p>
            <p><b>Username : </b>{this.state.username}</p>
            <p><b>First name : </b>{this.state.firstName}</p>
            <p><b>Last name : </b>{this.state.lastName}</p>
            <p><b>Is : </b>{this.state.genre}</p>
            <p><b>Birthday : </b>{this.state.birthday}</p>
            <p><b>Looking for : </b>{this.state.type}</p>
            <p><b>Bio : </b>{this.state.bio}</p>
            <p><b>Last location : </b>{this.state.location}</p>
            <p><b>Tags : </b>{this.state.tags}</p>
            {(Store.conUserList.indexOf(this.props.match.params.user) === -1)
            ? this.updateLastConnect()
            : <p><b>Connected</b></p>}
            {this.state.likeBack ? (
              <p><b>This user like you</b></p>
            ) : null}
            {this.state.isReport ? (
              <p><b>User was reported like a fake account by you</b></p>
            ) : null}
          </div>
          <div id='profile-btn'>
            {!this.state.isLike ? (
              <button id='likeButton' onClick={this.handleAction}>Like</button>
            ) : (
              <button id='dislikeButton' onClick={this.handleAction}>Dislike</button>
            )}
            <button id='fakeButton' onClick={this.handleAction}>Fake account</button>
            <button id='blockButton' onClick={this.handleAction}>Block</button>
          </div>
        </div>
      </div>
    )
  }
}

export default OtherProfile
