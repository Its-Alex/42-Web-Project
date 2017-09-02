import React, { Component } from 'react'
import axiosInst from '../utils/axios.js'
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
    axiosInst().get('/user/me').then((res) => {
      this.setState({
        error: false,
        status: '',
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
    if (event.key === 'Enter' || event.target.value === 'Save') {
      axiosInst().patch('user/me', {
        name: this.state.name,
        mail: this.state.mail
      }).then((res) => {
        this.setState({
          error: false,
          status: 'Change applied'
        })
      }).catch((err) => {
        console.log(err.response)
        if (err.response) {
          this.setState({
            error: true,
            status: err.response.data.error
          })
        }
      })
    }
  }

  render () {
    return (
      <div className='body flex-center'>
        <div className='resize'>
          <div id='profilForm'>
            { this.state.error
              ? <span className='error'>{this.state.status}</span>
              : <span className='status'>{this.state.status}</span>
            }
            Name :
            <input type='text' name='name' value={this.state.name} onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
            Mail :
            <input type='text' name='mail' value={this.state.mail} onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
            <input type='submit' value='Save' onClick={this.handleKeyPress} />
            <input type='submit' value='Logout' onClick={() => {
              global.localStorage.removeItem('token')
              global.localStorage.removeItem('id')
              
              this.props.history.push('/auth/login')
            }} />
          </div>
        </div>
      </div>
    )
  }
}

export default Settings
