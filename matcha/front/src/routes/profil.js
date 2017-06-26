import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
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
      axios: this.props.axios
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    this.setState({[event.target.name]: event.target.value})
  }

  onDrop (accepted, rejected) {
    console.log(accepted)
    console.log(rejected)
  }

  componentWillMount () {
    /**
     * Get all data from user and put it into state
     */
    this.state.axios.get('/user/me').then((result) => {
      this.state.axios.get('/profil/me').then((res) => {
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

  render () {
    return (
      <div className='body'>
        <span className='error'>{this.state.error}</span>
        <div id='profilForm'>
          <Dropzone className='dropzone' onDrop={this.onDrop.bind(this)} />
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
