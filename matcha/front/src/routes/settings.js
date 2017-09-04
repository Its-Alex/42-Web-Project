import React from 'react'

import axiosInst from '../utils/axios.js'
let zxcvbn = require('zxcvbn')

class Settings extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      mail: '',
      newPassword: '',
      oldPassword: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  componentWillMount () {
    axiosInst().get('/user/me').then((res) => {
      this.setState({
        name: res.data.user.name,
        mail: res.data.user.mail
      })
    }).catch(() => {})
  }

  handleChange (event) {
    if (event.target.name === 'newPassword') {
      console.log(zxcvbn(event.target.value))
    }
    this.setState({[event.target.name]: event.target.value})
  }

    /**
   * Handle when a key is pressed
   * @param {object} event
   */
  handleKeyPress (event) {
    if (event.key === 'Enter' || event.target.value === 'Save') {
      axiosInst().patch('user/me', {
        name: this.state.name,
        mail: this.state.mail,
        newPassword: this.state.newPassword,
        oldPassword: this.state.oldPassword
      }).then((res) => {
        this.props.notification.addNotification({
          level: 'success',
          title: 'Modify data:',
          message: 'Done'
        })
      }).catch((err) => {
        if (err.response) {
          this.props.notification.addNotification({
            level: 'error',
            title: 'Modify data:',
            message: err.response.data.error
          })
        }
      })
    }
  }

  render () {
    return (
      <div className='body flex-center'>
        <div className='resize'>
          <div id='profileForm'>
            Username :
            <input type='text' name='name' value={this.state.name} onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
            Mail :
            <input type='text' name='mail' value={this.state.mail} onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
            <input type='password' name='newPassword' value={this.state.newPassword} placeholder='New password' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
            <input type='password' name='oldPassword' value={this.state.oldPassword} placeholder='Old password' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
            <input type='submit' value='Save' onClick={this.handleKeyPress} />
          </div>
        </div>
      </div>
    )
  }
}

export default Settings
