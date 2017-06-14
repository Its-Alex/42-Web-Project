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
      genre: '',
      type: '',
      tags: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  componentWillMount () {
    if (!global.localStorage.getItem('signToken')) {
      this.props.history.push('/auth/login')
    }
  }

  handleChange (event) {
    let target = event.target
    let value

    if (target.value === 'Submit') {
      return
    }
    if (target.type === 'radio') {
      if (target.id.search('Men') !== -1) {
        value = 'M'
      }
      if (target.id.search('Women') !== -1) {
        value = 'F'
      }
      if (target.id.search('All') !== -1) {
        value = 'B'
      }
    } else {
      value = target.value
    }

    this.setState({
      [target.name]: value
    })
  }

  handleKeyPress (event) {
    if (event.key === 'Enter' || event.target.value === 'Submit') {
      if (event.target.name === 'bio') return
      axios.post('http://localhost:3005/profil', {
        birthday: this.state.birthday,
        bio: this.state.bio,
        genre: this.state.genre,
        type: this.state.type,
        tags: this.state.tags
      }).then((results) => {
        console.log(results)
      }).catch((err) => {
        console.log(new Error(err))
      })
    }
  }

  render () {
    return (
      <div className='login'>
        <span className='error'>{this.state.error}</span>
        <div className='divForm'>
          <input type='date' name='birthday' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
          <textarea type='text' name='bio' value={this.state.email} placeholder='Bio' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
          <select className='genre' name='genre' >
            <option value='M' selected>Men</option>
            <option value='F'>Woman</option>
            <option value='B'>All</option>
          </select>
          <select className='type' name='type' >
            <option value='M' selected>Men</option>
            <option value='F'>Woman</option>
            <option value='B'>All</option>
          </select>
          <input type='text' name='tags' value={this.state.email} placeholder='Related tags' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
          <input type='submit' value='Submit' onClick={this.handleKeyPress} />
        </div>
      </div>
    )
  }
}

export default Login
