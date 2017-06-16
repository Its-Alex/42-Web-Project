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
        <div className='divForm'>
          <input type='email' className='email' value={this.state.email} placeholder='Mail' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
          <input type='submit' className='submit' value='Submit' onClick={this.handleKeyPress} />
        </div>
        <div className='divLink'>
          <Link to='/auth/signup'>Sign up</Link>
          <Link to='/auth/login'>Log in</Link>
        </div>
      </div>
    )
  }
}

export default Login
