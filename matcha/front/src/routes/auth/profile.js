import React, { Component } from 'react'
import axios from 'axios'
import './form.css'

class Profile extends Component {
  constructor (props) {
    super(props)

    this.state = {
      error: null,
      firstName: '',
      lastName: '',
      birthday: '',
      bio: '',
      genre: 'M',
      type: 'B',
      tags: '',
      axios: axios.create({
        baseURL: 'http://localhost:3005/',
        timeout: 1000,
        headers: {'Authorization': `Bearer ${global.localStorage.getItem('signToken')}`}
      })
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  componentWillMount () {
    if (global.localStorage.getItem('token')) {
      this.props.history.push('/')
    }
  }

  handleChange (event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleKeyPress (event) {
    if (event.key === 'Enter' || event.target.value === 'Next') {
      if (event.target.name === 'bio') return
      this.state.axios.post('profile', {
        birthday: this.state.birthday,
        bio: this.state.bio,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        genre: this.state.genre,
        type: this.state.type,
        tags: this.state.tags
      }).then((res) => {
        if (res.status === 201) {
          global.localStorage.removeItem('signToken')
          global.localStorage.removeItem('token')
          this.props.history.push('/auth/login')
        } else {
          this.setState({error: res.data.msg})
        }
      }).catch((err) => {
        if (err.response) {
          console.log(err.response)
        }
      })
    }
  }

  render () {
    return (
      <div className='resize'>
        <div className='login'>
          <span className='error'>{this.state.error}</span>
          <div className='divForm'>
            <input type='date' name='birthday' placeholder='yyyy-dd-mm' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
            <input type='text' name='firstName' value={this.state.firstName} placeholder='First name' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
            <input type='text' name='lastName' value={this.state.lastName} placeholder='Last name' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
            <textarea type='text' name='bio' value={this.state.bio} placeholder='Bio' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
            Genre :
            <select name='genre' onChange={this.handleChange} >
              <option value='M' defaultValue>Man</option>
              <option value='F'>Woman</option>
            </select>
            Type :
            <select name='type' value={this.state.type} onChange={this.handleChange} >
              <option value='M'>Men</option>
              <option value='F'>Women</option>
              <option value='B'>Bisexual</option>
            </select>
            <input type='text' name='tags' value={this.state.tags} placeholder='Related tags' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
            <input type='submit' value='Next' onClick={this.handleKeyPress} />
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
