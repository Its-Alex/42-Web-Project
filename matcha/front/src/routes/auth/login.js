import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './login.css'

class Login extends Component {
  constructor (props) {
    super(props)

    this.state = {
      error: null,
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  handleChange (event) {
    if (event.target.className === 'email') this.setState({email: event.target.value})
    if (event.target.className === 'password') this.setState({password: event.target.value})
  }

  handleKeyPress (event) {
    if (event.key === 'Enter' || event.target.className === 'submit') {
      axios.post('http://localhost:3005/user/signin', {
        mail: this.state.email,
        password: this.state.password
      }).then((res) => {
        console.log(res)
        if (res.data.success === true) {
          global.localStorage.setItem('token', res.data.token)
        } else {
          this.setState({error: res.data.msg})
        }
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
      <div className='login'>
        <span className='error'>{this.state.error}</span>
        <input type='email' className='email' value={this.state.email} placeholder='Mail' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
        <input type='password' className='password' value={this.state.password} placeholder='Password' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
        <input type='submit' className='submit' value='Submit' onClick={this.handleKeyPress} />
        <Link to='/auth/signup'>Sign up</Link>
        <Link to='/auth/forgot'>Forgot your password ?</Link>
      </div>
    )
  }
}

export default Login
