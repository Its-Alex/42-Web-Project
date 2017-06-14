import React, { Component } from 'react'
import axios from 'axios'
import './form.css'

class Login extends Component {
  constructor (props) {
    super(props)

    this.state = {
      error: null,
      age: '',
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
    // let value = target.type === 'checkbox' ? target.checked : target.value
    if (target.value === 'Submit') {
      return
    }
    this.setState({
      [target.name]: target.value
    })
  }

  handleKeyPress (event) {
    if (event.key === 'Enter' || event.target.value === 'Submit') {
      if (event.target.name === 'bio') return
      console.log(this.state.birthday)
    }
  }

  render () {
    return (
      <div className='login'>
        <span className='error'>{this.state.error}</span>
        <div className='divForm'>
          <input type='text' name='age' value={this.state.email} placeholder='Age' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
          <input type='date' name='birthday' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
          <textarea type='text' name='bio' value={this.state.email} placeholder='Bio' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
          Genre:
          <div className='radioContainer'>
            <label htmlFor='genreMen'>
              <input type='radio' name='genre' id='genreMen' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
              <p>Men</p>
            </label>
            <label htmlFor='genreWomen'>
              <input type='radio' name='genre' id='genreWomen' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
              <p>Women</p>
            </label>
            <label htmlFor='genreAll'>
              <input type='radio' name='genre' id='genreAll' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
              <p>All</p>
            </label>
          </div>
          Type:
          <div className='radioContainer'>
            <label htmlFor='typeMen'>
              <input type='radio' name='type' id='typeMen' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
              <p>Men</p>
            </label>
            <label htmlFor='typeWomen'>
              <input type='radio' name='type' id='typeWomen' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
              <p>Women</p>
            </label>
            <label htmlFor='typeAll'>
              <input type='radio' name='type' id='typeAll' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
              <p>All</p>
            </label>
          </div>
          <input type='text' name='tags' value={this.state.email} placeholder='Related tags' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
          <input type='submit' value='Submit' onClick={this.handleKeyPress} />
        </div>
      </div>
    )
  }
}

export default Login
