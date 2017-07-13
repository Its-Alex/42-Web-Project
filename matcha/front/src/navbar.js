import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'
import axios from './axios.js'

class Navbar extends Component {
  render () {
    return (
      <div id='navbar'>
        <div id='imgContainer'>
          <img className='pictureProfil' src='http://localhost:3005/picture/0' alt='Profil' />
          <div id='imgButtonContainer'>
            <Link to='/notifications'><div id='notifications' className='imgButton' alt='Notifications' /></Link>
            <Link to='/settings'><div id='settings' className='imgButton' alt='Settings' /></Link>
          </div>
        </div>
        <ul>
          <li><Link to='/search'>Search</Link></li>
          <li><Link to='/profil'>Profil</Link></li>
        </ul>
      </div>
    )
  }
}

export default Navbar
