import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './css/navbar.css'

class Navbar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      profilPic: <img className='pictureProfil' alt='Profil' />
    }
  }

  componentDidMount () {
    if (global.localStorage.getItem('token') !== undefined) {
      let url = `http://localhost:3005/picture/${global.localStorage.getItem('token')}/0`
      document.getElementById('pictureProfil').style.backgroundImage = `url('${url}')`
    }
  }

  render () {
    return (
      <div id='navbar'>
        <div id='imgContainer'>
          <div className='pictureProfil' id='pictureProfil' alt='Profil' />
          <div id='imgButtonContainer'>
            <Link to='/notifications'><div id='notifications' className='imgButton' alt='Notifications' /></Link>
            <Link to='/settings'><div id='settings' className='imgButton' alt='Settings' /></Link>
          </div>
        </div>
        <ul>
          <li><Link to='/search'>Search</Link></li>
          <li><Link to='/profile'>Profile</Link></li>
          <li><Link to='/chat'>Chat</Link></li>
        </ul>
      </div>
    )
  }
}

export default Navbar
