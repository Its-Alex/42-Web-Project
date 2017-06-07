import React, { Component } from 'react'
import axios from 'axios'
import './login.css'

class Login extends Component {
  constructor (props) {
    super(props)

    this.state = {
      error: null,
      mail: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  handleChange (event) {
    if (event.target.className === 'mail') this.setState({mail: event.target.value})
    if (event.target.className === 'password') this.setState({password: event.target.value})
  }

  handleKeyPress (event) {
    event.preventDefault()
    axios.post('http://localhost:3002/user/signin', {
      mail: this.state.mail,
      password: this.state.password
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(new Error(err))
    })
  }

  render () {
    return (
      <div>
        <span>{this.state.error}</span>
        <input type='text' className='name' value={this.state.mail} placeholder='Mail' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
        <input type='password' className='password' value={this.state.password} placeholder='Password' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
        <input type='submit' className='submit' value='Submit' onClick={this.handleKeyPress} />
      </div>
    )
  }
}

export default Login
