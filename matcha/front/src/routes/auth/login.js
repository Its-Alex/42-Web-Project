import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'

import './form.css'

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

  componentWillMount () {
    if (global.localStorage.getItem('signToken')) {
      axios.get('http://localhost:3005/profile/me', {
        headers: {'Authorization': `Bearer ${global.localStorage.getItem('signToken')}`}
      }).then((res) => {
        if (res.success === true) {
          let token = global.localStorage.getItem('signToken')
          global.localStorage.removeItem('signToken')
          global.localStorage.setItem('token', token)
          return this.props.history.push('/')
        } else if (res.data.msg === 'False token') {
          global.localStorage.removeItem('signToken')
          global.localStorage.removeItem('token')
          global.localStorage.removeItem('id')
          return this.props.history.push('/auth/login')
        } else {
          return this.props.history.push('/auth/profile')
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  handleChange (event) {
    this.setState({[event.target.className]: event.target.value})
  }

  handleKeyPress (event) {
    if (event.key === 'Enter' || event.target.className === 'submit') {
      axios.post('http://localhost:3005/user/signin', {
        mail: this.state.email,
        password: this.state.password
      }).then((res) => {
        if (res.data.success === true) {
          global.localStorage.setItem('token', res.data.token)
          global.localStorage.setItem('id', res.data.id)
          this.props.history.push('/profile')
        } else {
          this.setState({error: res.data.msg})
        }
      }).catch((err) => {
        if (err.response) {
          console.log(err.request)
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
            <input type='email' className='email' value={this.state.email} placeholder='Mail' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
            <input type='password' className='password' value={this.state.password} placeholder='Password' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
            <input type='submit' className='submit' value='Next' onClick={this.handleKeyPress} />
          </div>
          <div className='divLink'>
            <Link to='/auth/signup' className='link'>Sign up</Link>
            <Link to='/auth/forget' className='link'>Forgot your password ?</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
