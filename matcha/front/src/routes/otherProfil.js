import React, { Component } from 'react'
import './css/profil.css'

class OtherProfil extends Component {
  constructor (props) {
    super(props)

    this.state = {
      error: '',
      status: '',
      username: this.props.match.params.user,
      birthday: '',
      bio: '',
      popularity: '',
      genre: '',
      type: '',
      tags: '',
      location: '',
      password: '',
      img: [
        `http://localhost:3005/picture/${global.localStorage.getItem('Token')}/0`,
        `http://localhost:3005/picture/${global.localStorage.getItem('Token')}/1`,
        `http://localhost:3005/picture/${global.localStorage.getItem('Token')}/2`,
        `http://localhost:3005/picture/${global.localStorage.getItem('Token')}/3`,
        `http://localhost:3005/picture/${global.localStorage.getItem('Token')}/4`
      ]
    }
  }

  componentWillMount () {
  }

  /**
   * Handle when a key is pressed
   * @param {object} event
   */
  handleKeyPress (event) {
    if (event.key === 'Enter' || event.target.value === 'Save') {
    }
  }

  render () {
    return (
      <div className='body'>
        {this.state.username}
      </div>
    )
  }
}

export default OtherProfil
