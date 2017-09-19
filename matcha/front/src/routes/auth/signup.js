import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './form.css'

let zxcvbn = require('zxcvbn')

class Login extends Component {
  constructor (props) {
    super(props)

    this.state = {
      error: null,
      name: '',
      email: '',
      password: '',
      validPwd: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  componentWillMount () {
    if (global.localStorage.getItem('token')) {
      this.props.history.push('/')
    }
    if (global.localStorage.getItem('signToken')) {
      this.props.history.push('/profile')
    }
  }

  handleChange (event) {
    this.setState({[event.target.className]: event.target.value})
  }

  handleKeyPress (event) {
    if (event.key === 'Enter' || event.target.className === 'submit') {
      let zxcvbnScore = zxcvbn(this.state.newPassword).score
      
      if (zxcvbnScore < 4 || this.state.newPassword.length < 8) {
        return this.setState({error: 'Password too weak or too small (8 char min)'})
      }
      axios.post('http://localhost:3005/user/signup', {
        name: this.state.name,
        mail: this.state.email,
        password: this.state.password,
        validPwd: this.state.validPwd
      }).then((res) => {
        if (res.data.success === true && res.status === 201) {
          global.localStorage.setItem('signToken', res.data.token)
          this.props.history.push('/auth/profile')
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
      <div className='resize'>
        <div className='login'>
          <span className='error'>{this.state.error}</span>
          <div className='divForm'>
            <input type='text' className='name' value={this.state.name} placeholder='Name' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
            <input type='email' className='email' value={this.state.email} placeholder='Mail' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
            <input type='password' className='password' value={this.state.password} placeholder='Password' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
            <input type='password' className='validPwd' value={this.state.validPwd} placeholder='Confirm password' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
            <input type='submit' className='submit' value='Next' onClick={this.handleKeyPress} />
          </div>
          <div className='divLink'>
            <Link to='/auth/Login' className='link'>Login</Link>
            <Link to='/auth/forget' className='link'>Forgot your password ?</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
