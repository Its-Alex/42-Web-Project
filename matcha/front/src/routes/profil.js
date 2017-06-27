import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import avatar from '../img/avatar.svg'
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
      img1: avatar,
      img2: avatar,
      img3: avatar,
      img4: avatar,
      img5: avatar
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  componentWillMount () {
    /**
     * Get all data from user and put it into state
     */
    this.props.axios.get('/user/me').then((result) => {
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

  handleChange (event) {
    this.setState({[event.target.name]: event.target.value})
  }

  onDrop1 (acceptedFiles) {
    let self = this
    acceptedFiles.forEach(file => {
      var reader = new global.FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        self.setState({
          img1: reader.result
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
        self.setState({
          img2: reader.result
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
        self.setState({
          img3: reader.result
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
        self.setState({
          img4: reader.result
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
        self.setState({
          img5: reader.result
        })
      }
      reader.onerror = function (error) {
        console.log('Error: ', error)
      }
    })
  }

  handleKeyPress (event) {
    if (event.key === 'Enter' || event.target.className === 'submit') {
      this.props.axios.post('/profil/me', {
        name: this.state.name,
        birthday: this.state.birthday,
        bio: this.state.bio,
        genre: this.state.genre,
        type: this.state.type,
        tags: this.state.tags,
        location: this.state.location,
        password: this.state.password,
        img1: this.state.img1,
        img2: this.state.img2,
        img3: this.state.img3,
        img4: this.state.img4,
        img5: this.state.img5
      }).then((res) => {
        console.log(res)
      }).catch((err) => {
        if (err.response) {
          this.setState({error: err.response.data.msg})
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
            <Dropzone className='dropzone' name='1' disablePreview accept='image/jpeg, image/png' maxSize={16000000} onDrop={this.onDrop1.bind(this)}>
              <img className='pictureView' src={this.state.img1} alt='Profil 1' />
            </Dropzone>
            <Dropzone className='dropzone' name='2' disablePreview accept='image/jpeg, image/png' maxSize={16000000} onDrop={this.onDrop2.bind(this)}>
              <img className='pictureView' src={this.state.img2} alt='Profil 2' />
            </Dropzone>
            <Dropzone className='dropzone' name='3' disablePreview accept='image/jpeg, image/png' maxSize={16000000} onDrop={this.onDrop3.bind(this)}>
              <img className='pictureView' src={this.state.img3} alt='Profil 3' />
            </Dropzone>
            <Dropzone className='dropzone' name='4' disablePreview accept='image/jpeg, image/png' maxSize={16000000} onDrop={this.onDrop4.bind(this)}>
              <img className='pictureView' src={this.state.img4} alt='Profil 4' />
            </Dropzone>
            <Dropzone className='dropzone' name='5' disablePreview accept='image/jpeg, image/png' maxSize={16000000} onDrop={this.onDrop5.bind(this)}>
              <img className='pictureView' src={this.state.img5} alt='Profil 5' />
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
