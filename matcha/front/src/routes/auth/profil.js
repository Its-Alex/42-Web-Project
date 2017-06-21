import React, { Component } from 'react'
import axios from 'axios'
import './form.css'

class Login extends Component {
  constructor (props) {
    super(props)

    this.state = {
      error: null,
      birthday: '',
      bio: '',
      genre: 'M',
      type: 'M',
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
    if (global.localStorage.getItem('Token')) {
      this.props.history.push('/')
    }
    if (!global.localStorage.getItem('signToken')) {
      this.props.history.push('/login')
    }
  }

  handleChange (event) {
    console.log()
    this.setState({[event.target.name]: event.target.value})
  }

  handleKeyPress (event) {
    if (event.key === 'Enter' || event.target.value === 'Next') {
      if (event.target.name === 'bio') return
      this.state.axios.post('profil', {
        birthday: this.state.birthday,
        bio: this.state.bio,
        genre: this.state.genre,
        type: this.state.type,
        tags: this.state.tags
      }).then((res) => {
        if (res.status === 201) {
          global.localStorage.removeItem('signToken')
          this.props.history.push('/')
        }
      }).catch((err) => {
        if (err.response) {
          console.log(err.response)
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
      <div className='resize'>
        <div className='login'>
          <span className='error'>{this.state.error}</span>
          <div className='divForm'>
            <input type='date' name='birthday' placeholder='yyyy-dd-mm' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
            <textarea type='text' name='bio' value={this.state.email} placeholder='Bio' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
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
            <input type='text' name='tags' value={this.state.email} placeholder='Related tags' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
            <input type='submit' value='Next' onClick={this.handleKeyPress} />
          </div>
        </div>
      </div>
    )
  }
}

export default Login
