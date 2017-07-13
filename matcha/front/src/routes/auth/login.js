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
    if (global.localStorage.getItem('Token')) {
      this.props.history.push('/profil')
    }
    if (global.localStorage.getItem('signToken')) {
      this.props.history.push('/auth/profil')
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
          global.localStorage.setItem('Token', res.data.token)
          this.props.history.push('/')
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
            <input type='email' className='email' value={this.state.email} placeholder='Mail' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
            <input type='password' className='password' value={this.state.password} placeholder='Password' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
            <input type='submit' className='submit' value='Next' onClick={this.handleKeyPress} />
          </div>
          <div className='divLink'>
            <Link to='/auth/signup' className='link'>Sign up</Link>
            <Link to='/auth/forgot' className='link'>Forgot your password ?</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
