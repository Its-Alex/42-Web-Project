import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import axiosInst from '../axios.js'
import './css/profil.css'
class Profil extends Component {
  constructor (props) {
    super(props)

    this.state = {
      error: '',
      status: '',
      name: '',
      birthday: '',
      bio: '',
      popularity: '',
      genre: '',
      type: '',
      tags: '',
      location: '',
      password: '',
      img: [
        `http://localhost:3005/picture/${global.localStorage.getItem('Token')}/0`,
        `http://localhost:3005/picture/${global.localStorage.getItem('Token')}/1`,
        `http://localhost:3005/picture/${global.localStorage.getItem('Token')}/2`,
        `http://localhost:3005/picture/${global.localStorage.getItem('Token')}/3`,
        `http://localhost:3005/picture/${global.localStorage.getItem('Token')}/4`
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
     * Get all data from user and put it into state
     */
    axiosInst.get('/user/me').then((result) => {
      /**
       * Get data from profil
       */
      axiosInst.get('/profil/me').then((res) => {
        this.setState({
          name: result.data.user.name,
          birthday: res.data.user.birthday,
          bio: res.data.user.bio,
          popularity: res.data.user.popularity,
          genre: (res.data.user.genre === 'M') ? 'M' : 'F',
          type: (res.data.user.type === 'M') ? 'M' : (res.data.user.type === 'F') ? 'F' : 'B',
          tags: res.data.user.tags,
          location: res.data.user.location
        })
      }).catch((err) => {
        console.log(err)
      })
    }).catch((err) => {
      console.log(err)
    })
  }

  /**
   * Update state from Handled event
   * @param {object} event
   */
  handleChange (event) {
    this.setState({[event.target.name]: event.target.value})
  }

  sendPicture (pic, index) {
    axiosInst.put('/picture/' + index, {pic: pic}).then((res) => {
      this.setState({
        error: '',
        status: 'Picture uploded'
      })
    }).catch((err) => {
      if (err) console.log(err.response)
      this.setState({
        error: 'Failed upload picture',
        status: ''
      })
    })
  }

  onDropReject () {
    this.setState({
      error: 'Invalid image',
      status: ''
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
      let url = `http://localhost:3005/picture/${global.localStorage.getItem('Token')}/0?${new Date().getTime()}`
      document.getElementById('pictureProfil').style.backgroundImage = `url('${url}')`
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
    if (event.key === 'Enter' || event.target.value === 'Next') {
      /**
       * Get adress data from google geocode API
       */
      let location = this.state.location
      if (location === '') {
        location = 'Paris, France'
      }
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location.replace(' ', '+')}&key=AIzaSyBO1ucGtsgt5eRvN1TQg4SIbquDHrQBosk`).then((res) => {
        /**
         * Update profil from data input
         */
        axiosInst.patch('/profil', {
          name: this.state.name,
          birthday: this.state.birthday,
          bio: this.state.bio,
          genre: (this.state.genre === 'M') ? 'M' : 'F',
          type: (this.state.type === 'M') ? 'M' : (this.state.type === 'F') ? 'F' : 'B',
          tags: this.state.tags,
          location: res.data.results[0].formatted_address,
          password: this.state.password
        }).then((res) => {
          this.setState({
            error: '',
            status: 'Changes made',
            birthday: res.data.profil.birthday,
            bio: res.data.profil.bio,
            genre: res.data.profil.genre,
            type: res.data.profil.type,
            tags: res.data.profil.tags,
            location: res.data.profil.location,
            password: ''
          })
        }).catch((err) => {
          if (err.response) {
            this.setState({
              error: err.response.data.error,
              status: ''
            })
          } else if (err.request) {
            console.log(err.request)
          } else {
            console.log(new Error(err.message))
          }
        })
      }).catch((err) => {
        if (err.response) {
          this.setState({error: 'Google API Error'})
        } else if (err.request) {
          console.log(err.request)
        } else {
          console.log(new Error(err.message))
        }
      })
    }
  }

  render () {
    return (
      <div className='body'>
        <div id='profilForm'>
          {
            this.state.error
            ? <span className='error' >{this.state.error}</span>
            : null
          }
          {
            this.state.status
            ? <span className='status'>{this.state.status}</span>
            : null
          }
          <div className='dropzoneView'>
            <Dropzone className='dropzone' disablePreview accept='image/png' maxSize={512000} onDrop={this.onDrop1.bind(this)} onDropRejected={this.onDropReject}>
              <img className='pictureView' src={this.state.img[0]} alt='Profil 1' />
            </Dropzone>
            <Dropzone className='dropzone' disablePreview accept='image/png' maxSize={512000} onDrop={this.onDrop2.bind(this)} onDropRejected={this.onDropReject}>
              <img className='pictureView' src={this.state.img[1]} alt='Profil 2' />
            </Dropzone>
            <Dropzone className='dropzone' disablePreview accept='image/png' maxSize={512000} onDrop={this.onDrop3.bind(this)} onDropRejected={this.onDropReject}>
              <img className='pictureView' src={this.state.img[2]} alt='Profil 3' />
            </Dropzone>
            <Dropzone className='dropzone' disablePreview accept='image/png' maxSize={512000} onDrop={this.onDrop4.bind(this)} onDropRejected={this.onDropReject}>
              <img className='pictureView' src={this.state.img[3]} alt='Profil 4' />
            </Dropzone>
            <Dropzone className='dropzone' disablePreview accept='image/png' maxSize={512000} onDrop={this.onDrop5.bind(this)} onDropRejected={this.onDropReject}>
              <img className='pictureView' src={this.state.img[4]} alt='Profil 5' />
            </Dropzone>
          </div>
          <p>Popularity : {this.state.popularity}</p>
          Birthday :
          <input type='date' name='birthday' placeholder='yyyy-dd-mm' value={this.state.birthday} onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
          Bio :
          <textarea type='text' name='bio' value={this.state.bio} placeholder='Bio' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
          Genre :
          <select name='genre' value={this.state.genre === 'M' ? 'M' : 'F'} onChange={this.handleChange} >
            <option value='M'>Man</option>
            <option value='F'>Woman</option>
          </select>
          Type :
          <select name='type' value={(this.state.type === 'M') ? 'M' : (this.state.type === 'F') ? 'F' : 'B'} onChange={this.handleChange} >
            <option value='M'>Men</option>
            <option value='F'>Woman</option>
            <option value='B'>Bisexual</option>
          </select>
          Tags :
          <input type='text' name='tags' value={this.state.tags} placeholder='Related tags' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
          Location :
          <input type='text' name='location' value={this.state.location} placeholder='Related tags' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
          Confirm password :
          <input type='password' name='password' value={this.state.password} placeholder='Password' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
          <input type='submit' value='Next' onClick={this.handleKeyPress} />
        </div>
      </div>
    )
  }
}

export default Profil
