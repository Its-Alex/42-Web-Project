import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'

class Navbar extends Component {
        // <input className='searchInput' type='text' placeholder='Search' />
  render () {
    return (
      <div id='navbar'>
        <div id='imgContainer'>
          <div className='pictureProfil' src='//:0' alt='Profil' />
          <div id='imgButtonContainer'>
            <Link to='/notifications'><div id='notifications' className='imgButton' src='//:0' alt='Notifications' /></Link>
            <Link to='/settings'><div id='settings' src='//:0' className='imgButton' alt='Settings' /></Link>
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
