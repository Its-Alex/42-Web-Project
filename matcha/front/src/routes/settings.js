import React, { Component } from 'react'
import axiosInst from '../axios.js'
import './css/profil.css'

class Settings extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      mail: '',
      password: '',
      confirmPwd: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  componentWillMount () {
    axiosInst.get('/user/me').then((res) => {
      this.setState({
        name: res.data.user.name,
        mail: res.data.user.mail
      })
    }).catch(() => {})
  }

  handleChange (event) {
    this.setState({[event.target.name]: event.target.value})
  }

    /**
   * Handle when a key is pressed
   * @param {object} event
   */
  handleKeyPress (event) {
    
  }

  render () {
    return (
      <div className='body'>
        <div id='profilForm'>
          <input type='submit' value='Logout' onClick={() => {
            global.localStorage.removeItem('Token')
            this.props.history.push('/auth/login')
          }} />
          Name :
          <input type='text' name='name' value={this.state.name} onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
          Mail :
          <input type='text' name='mail' value={this.state.mail} onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
          Password :
          <input type='password' name='password' value={this.state.password} onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
          Confirm password :
          <input type='password' name='confirmPwd' value={this.state.confirmPwd} onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
          <input type='submit' value='Next' onClick={this.handleKeyPress} />
        </div>
      </div>
    )
  }
}

export default Settings
