import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import axios from 'axios'

import axiosInst from '../utils/axios.js'
import './css/profile.css'

class Profile extends Component {
  constructor (props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      birthday: '',
      bio: '',
      popularity: '',
      genre: '',
      type: '',
      tags: '',
      location: '',
      password: '',
      img: [
        `http://localhost:3005/picture/${global.localStorage.getItem('token')}/0`,
        `http://localhost:3005/picture/${global.localStorage.getItem('token')}/1`,
        `http://localhost:3005/picture/${global.localStorage.getItem('token')}/2`,
        `http://localhost:3005/picture/${global.localStorage.getItem('token')}/3`,
        `http://localhost:3005/picture/${global.localStorage.getItem('token')}/4`
      ]
    }

    /**
     * Bind this for funcs
     */
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.sendPicture = this.sendPicture.bind(this)
    this.onDropReject = this.onDropReject.bind(this)
  }

  componentWillMount () {
    /**
     * Get data from profile
     */
    axiosInst().get('/profile/me').then((res) => {
      let location
      if (res.data.user.location === null) {
        location = ''
      } else {
        location = res.data.user.location
      }
      this.setState({
        birthday: res.data.user.birthday,
        bio: res.data.user.bio,
        firstName: res.data.user.firstName,
        lastName: res.data.user.lastName,
        popularity: res.data.user.popularity,
        genre: (res.data.user.genre === 'M') ? 'M' : 'F',
        type: (res.data.user.type === 'M') ? 'M' : (res.data.user.type === 'F') ? 'F' : 'B',
        tags: res.data.user.tags,
        location: location
      })
    }).catch((err) => console.log(err.response))
  }

  /**
   * Update state from Handled event
   * @param {object} event
   */
  handleChange (event) {
    this.setState({[event.target.name]: event.target.value})
  }

  sendPicture (pic, index) {
    axiosInst().put('/picture/' + index, {pic: pic}).then((res) => {
      if (res.data.success === true) {
        this.props.notification.addNotification({
          level: 'success',
          title: 'Picture upload :',
          message: 'Done'
        })
      } else {
        this.props.notification.addNotification({
          level: 'error',
          title: 'Picture upload :',
          message: res.data.error
        })
      }
    }).catch((err) => {
      if (err) {
        console.log(err.response)
      }
    })
  }

  onDropReject () {
    this.setState({
      error: true,
      status: 'Invalid image'
    })
  }

  onDrop1 (acceptedFiles) {
    let self = this
    acceptedFiles.forEach(file => {
      var reader = new global.FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        let img = self.state.img
        img[0] = reader.result
        self.sendPicture(img[0], 0)
        self.setState({
          img: img
        })
      }
      reader.onerror = function (error) {
        console.log('Error: ', error)
      }
    })
    setTimeout(() => {
      let url = `http://localhost:3005/picture/${global.localStorage.getItem('token')}/0?${new Date().getTime()}`
      document.getElementById('pictureProfile').style.backgroundImage = `url('${url}')`
    }, 50)
  }

  onDrop2 (acceptedFiles) {
    let self = this
    acceptedFiles.forEach(file => {
      var reader = new global.FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        let img = self.state.img
        img[1] = reader.result
        self.sendPicture(img[1], 1)
        self.setState({
          img: img
        })
      }
      reader.onerror = function (error) {
        console.log('Error: ', error)
      }
    })
  }

  onDrop3 (acceptedFiles) {
    let self = this
    acceptedFiles.forEach(file => {
      var reader = new global.FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        let img = self.state.img
        img[2] = reader.result
        self.sendPicture(img[2], 2)
        self.setState({
          img: img
        })
      }
      reader.onerror = function (error) {
        console.log('Error: ', error)
      }
    })
  }

  onDrop4 (acceptedFiles) {
    let self = this
    acceptedFiles.forEach(file => {
      var reader = new global.FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        let img = self.state.img
        img[3] = reader.result
        self.sendPicture(img[3], 3)
        self.setState({
          img: img
        })
      }
      reader.onerror = function (error) {
        console.log('Error: ', error)
      }
    })
  }

  onDrop5 (acceptedFiles) {
    let self = this
    acceptedFiles.forEach(file => {
      var reader = new global.FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        let img = self.state.img
        img[4] = reader.result
        self.sendPicture(img[4], 4)
        self.setState({
          img: img
        })
      }
      reader.onerror = function (error) {
        console.log('Error: ', error)
      }
    })
  }

  /**
   * Handle when a key is pressed
   * @param {object} event
   */
  handleKeyPress (event) {
    if ((event.key === 'Enter' || event.target.value === 'Save') && event.target.name !== 'bio') {
      /**
       * Get adress data from google geocode API
       */
      let location = this.state.location
      if (location === '') {
        location = 'Paris, France'
      }
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location.replace(' ', '+')}&key=AIzaSyBO1ucGtsgt5eRvN1TQg4SIbquDHrQBosk`).then((res) => {
        /**
         * Update profile from data input
         */
        if (res.data.results.length === 0) {
          return this.props.notification.addNotification({
            level: 'error',
            title: 'Action unsuccessful',
            message: 'Adress not found'
          })
        }
        axiosInst().patch('/profile', {
          birthday: this.state.birthday,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          bio: this.state.bio,
          genre: (this.state.genre === 'M') ? 'M' : 'F',
          type: (this.state.type === 'M') ? 'M' : (this.state.type === 'F') ? 'F' : 'B',
          tags: this.state.tags,
          location: res.data.results[0].formatted_address,
          lat: res.data.results[0].geometry.location.lat,
          lng: res.data.results[0].geometry.location.lng,
          password: this.state.password
        }).then((res) => {
          if (res.data.success === true) {
            this.setState({
              birthday: res.data.profile.birthday,
              bio: res.data.profile.bio,
              firstName: res.data.profile.firstName,
              lastName: res.data.profile.lastName,
              genre: res.data.profile.genre,
              type: res.data.profile.type,
              tags: res.data.profile.tags,
              location: res.data.profile.location,
              password: ''
            })
            this.props.notification.addNotification({
              level: 'success',
              title: 'Modify data:',
              message: 'Done'
            })
          } else {
            this.props.notification.addNotification({
              level: 'error',
              title: 'Modify data:',
              message: res.data.error
            })
          }
        }).catch((err) => {
          if (err.response) {
            console.log(err.response)
          }
        })
      }).catch((err) => {
        if (err.response) {
          this.props.notification.addNotification({
            level: 'error',
            title: 'Action unsuccessful',
            message: 'Google API Error'
          })
        } else if (err.request) {
          console.log(err.request)
        } else {
          console.log(err.message)
        }
      })
    }
  }

  render () {
    return (
      <div className='body flex-center'>
        <div id='profileForm'>
          <div id='dropzoneView'>
            <Dropzone className='dropzone' disablePreview accept='image/png' maxSize={2000000} onDrop={this.onDrop1.bind(this)} onDropRejected={this.onDropReject}>
              <img className='pictureView' src={this.state.img[0]} alt='Profile 1' />
            </Dropzone>
            <Dropzone className='dropzone' disablePreview accept='image/png' maxSize={2000000} onDrop={this.onDrop2.bind(this)} onDropRejected={this.onDropReject}>
              <img className='pictureView' src={this.state.img[1]} alt='Profile 2' />
            </Dropzone>
            <Dropzone className='dropzone' disablePreview accept='image/png' maxSize={2000000} onDrop={this.onDrop3.bind(this)} onDropRejected={this.onDropReject}>
              <img className='pictureView' src={this.state.img[2]} alt='Profile 3' />
            </Dropzone>
            <Dropzone className='dropzone' disablePreview accept='image/png' maxSize={2000000} onDrop={this.onDrop4.bind(this)} onDropRejected={this.onDropReject}>
              <img className='pictureView' src={this.state.img[3]} alt='Profile 4' />
            </Dropzone>
            <Dropzone className='dropzone' disablePreview accept='image/png' maxSize={2000000} onDrop={this.onDrop5.bind(this)} onDropRejected={this.onDropReject}>
              <img className='pictureView' src={this.state.img[4]} alt='Profile 5' />
            </Dropzone>
          </div>
          <p>Popularity : {this.state.popularity}</p>
          <div>
            <label>First name :</label>
            <input type='text' name='firstName' value={this.state.firstName} placeholder='First name' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
          </div>
          <div>
            <label>Last name :</label>
            <input type='text' name='lastName' value={this.state.lastName} placeholder='Last name' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
          </div>
          <div>
            <label>Birthday :</label>
            <input type='date' name='birthday' placeholder='yyyy-dd-mm' value={this.state.birthday} onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
          </div>
          <div>
            <label>Bio :</label>
            <textarea name='bio' value={this.state.bio} placeholder='Bio' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
          </div>
          <div>
            <label>Genre :</label>
            <select name='genre' value={this.state.genre === 'M' ? 'M' : 'F'} onChange={this.handleChange} >
            <option value='M'>Man</option>
            <option value='F'>Woman</option>
            </select>
          </div>
          <div>
            <label>Type :</label>
            <select name='type' value={(this.state.type === 'M') ? 'M' : (this.state.type === 'F') ? 'F' : 'B'} onChange={this.handleChange} >
              <option value='M'>Men</option>
              <option value='F'>Woman</option>
              <option value='B'>Bisexual</option>
            </select>
          </div>
          <div>
            <label>Tags :</label>
            <input type='text' name='tags' value={this.state.tags} placeholder='Related tags' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
          </div>
          <div>
            <label>Location :</label>
            <input type='text' name='location' value={this.state.location} placeholder='Related tags' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
          </div>
          <div>
            <input type='password' name='password' value={this.state.password} placeholder='Confirm password' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
          </div>
          <div>
            <input type='submit' value='Save' onClick={this.handleKeyPress} />
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
