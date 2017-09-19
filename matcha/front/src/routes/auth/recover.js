import React, { Component } from 'react'
import axios from 'axios'
import './form.css'

class Login extends Component {
  constructor (props) {
    super(props)

    this.state = {
      error: null,
      newPwd: '',
      confirmNewPwd: '',
      mail: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  handleChange (event) {
    this.setState({[event.target.className]: event.target.value})
  }

  handleKeyPress (event) {
    if (event.key === 'Enter' || event.target.className === 'submit') {
      axios.patch(`http://localhost:3005/user/forgetPwd/${this.props.match.params.hash}`, {
        mail: this.state.mail,
        newPassword: this.state.newPwd,
        confirmNewPassword: this.state.confirmNewPwd
      }).then((res) => {
        if (res.data.success === true) {
          this.props.history.push('/auth/login')
        } else {
          this.setState({error: res.data.error})
        }
      }).catch((err) => {
        if (err.response) {
          this.setState({error: err.response.data.error})
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
            <input type='mail' className='mail' value={this.state.mail} placeholder='Mail' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
            <input type='password' className='newPwd' value={this.state.newPwd} placeholder='New password' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
            <input type='password' className='confirmNewPwd' value={this.state.confirmNewPwd} placeholder='Confirm password' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
            <input type='submit' className='submit' value='Submit' onClick={this.handleKeyPress} />
          </div>
        </div>
      </div>
    )
  }
}

export default Login
