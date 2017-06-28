import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import avatar from '../img/avatar.svg'
import axios from 'axios'
import './css/profil.css'

class Profil extends Component {
  constructor (props) {
    super(props)

    this.state = {
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
        avatar,
        avatar,
        avatar,
        avatar,
        avatar
      ]
    }

    /**
     * Bind this for funcs
     */
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  componentWillMount () {
    /**
     * Get all data from user and put it into state
     */
    this.props.axios.get('/user/me').then((result) => {
      /**
       * Get data from profil
       */
      this.props.axios.get('/profil/me').then((res) => {
        this.setState({
          name: result.data.user.name,
          birthday: res.data.user.birthday,
          bio: res.data.user.bio,
          popularity: res.data.user.popularity,
          genre: (res.data.user.genre === 'M') ? 'Men' : (res.data.user.genre === 'F') ? 'Women' : 'All',
          type: (res.data.user.type === 'M') ? 'Men' : (res.data.user.type === 'F') ? 'Women' : 'All',
          tags: res.data.user.tags,
          location: res.data.user.location
        })
      }).catch((err) => {
        console.log(new Error(err))
      })
    }).catch((err) => {
      console.log(new Error(err))
    })
  }

  /**
   * Update state from Handled event
   * @param {object} event
   */
  handleChange (event) {
    this.setState({[event.target.name]: event.target.value})
  }

  onDrop1 (acceptedFiles) {
    let self = this
    acceptedFiles.forEach(file => {
      var reader = new global.FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        let img = self.state.img
        img[0] = reader.result
        self.setState({
          img: img
        })
      }
      reader.onerror = function (error) {
        console.log('Error: ', error)
      }
    })
  }

  onDrop2 (acceptedFiles) {
    let self = this
    acceptedFiles.forEach(file => {
      var reader = new global.FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        let img = self.state.img
        img[1] = reader.result
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
        self.setState({
          img: img
        })
      }
      reader.onerror = function (error) {
        console.log('Error: ', error)
      }
    })
  }

  handleKeyPress (event) {
    if (event.key === 'Enter' || event.target.value === 'Next') {
      /**
       * Get adress data from google geocode API
       */
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.location.replace(' ', '+')}&key=AIzaSyBO1ucGtsgt5eRvN1TQg4SIbquDHrQBosk`).then((res) => {
        /**
         * Update profil from data input
         */
        this.props.axios.patch('/profil', {
          name: this.state.name,
          birthday: this.state.birthday,
          bio: this.state.bio,
          genre: (this.state.genre === 'Men') ? 'M' : 'F',
          type: (this.state.type === 'M') ? 'Men' : (this.state.type === 'Women') ? 'F' : 'B',
          tags: this.state.tags,
          location: res.data.results[0].formatted_address,
          password: this.state.password
        }).then((res) => {
          console.log(res)
        }).catch((err) => {
          if (err.response) {
            this.setState({error: err.response.data.error})
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
        <span className='error'>{this.state.error}</span>
        <div id='profilForm'>
          <div className='dropzoneView'>
            <Dropzone className='dropzone' disablePreview accept='image/jpeg, image/png' maxSize={8000000} onDrop={this.onDrop1.bind(this)}>
              <img className='pictureView' src={this.state.img[0]} alt='Profil 1' />
            </Dropzone>
            <Dropzone className='dropzone' disablePreview accept='image/jpeg, image/png' maxSize={8000000} onDrop={this.onDrop2.bind(this)}>
              <img className='pictureView' src={this.state.img[1]} alt='Profil 2' />
            </Dropzone>
            <Dropzone className='dropzone' disablePreview accept='image/jpeg, image/png' maxSize={8000000} onDrop={this.onDrop3.bind(this)}>
              <img className='pictureView' src={this.state.img[2]} alt='Profil 3' />
            </Dropzone>
            <Dropzone className='dropzone' disablePreview accept='image/jpeg, image/png' maxSize={8000000} onDrop={this.onDrop4.bind(this)}>
              <img className='pictureView' src={this.state.img[3]} alt='Profil 4' />
            </Dropzone>
            <Dropzone className='dropzone' disablePreview accept='image/jpeg, image/png' maxSize={8000000} onDrop={this.onDrop5.bind(this)}>
              <img className='pictureView' src={this.state.img[4]} alt='Profil 5' />
            </Dropzone>
          </div>
          <p>Popularity : {this.state.popularity}</p>
          Birthday :
          <input type='date' name='birthday' placeholder='yyyy-dd-mm' value={this.state.birthday} onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
          Bio :
          <textarea type='text' name='bio' value={this.state.bio} placeholder='Bio' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
          Genre :
          <select name='genre' onChange={this.handleChange} >
            <option value='M' defaultValue>Men</option>
            <option value='F'>Woman</option>
          </select>
          Type :
          <select name='type' onChange={this.handleChange} >
            <option value='M' defaultValue>Men</option>
            <option value='F'>Woman</option>
            <option value='B'>All</option>
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
