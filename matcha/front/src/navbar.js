import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'
import avatar from './img/avatar.svg'

class Navbar extends Component {
  render () {
    return (
      <div id='navbar'>      
        <img className='pictureProfil' src='//:0' />
        <input className='searchInput' type='text' placeholder='Search' />
        <ul>
          <li><Link to='/notification'>Notification</Link></li>
          <li><Link to='/home'>Home</Link></li>
          <li><Link to='/Profil'>Profil</Link></li>
          <li><Link to='/settings'>Settings</Link></li>
        </ul>
      </div>
    )
  }
}

export default Navbar
