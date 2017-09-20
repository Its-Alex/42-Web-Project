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
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  handleChange (event) {
    this.setState({[event.target.className]: event.target.value})
  }

  handleKeyPress (event) {
    if (event.key === 'Enter' || event.target.className === 'submit') {
      axios.post('http://localhost:3005/user/forgetPwd', {
        mail: this.state.email
      }).then((res) => {
        if (res.data.success === true) {
          this.setState({error: 'Mail was send please check your mail'})
        } else {
          this.setState({error: res.data.error})
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
            <input type='email' className='email' value={this.state.email} placeholder='Mail' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
            <input type='submit' className='submit' value='Submit' onClick={this.handleKeyPress} />
          </div>
          <div className='divLink'>
            <Link to='/auth/signup' className='link'>Sign up</Link>
            <Link to='/auth/login' className='link'>Log in</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
