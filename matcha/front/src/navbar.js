import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'

class Navbar extends Component {
        // <input className='searchInput' type='text' placeholder='Search' />
  render () {
    return (
      <div id='navbar'>
        <img className='pictureProfil' src='//:0' alt='Profil' />
        <ul>
          <li><Link to='/search'>Search</Link></li>
          <li><Link to='/profil'>Profil</Link></li>
          <li><Link to='/notifications'>Notifications</Link></li>
          <li><Link to='/settings'>Settings</Link></li>
        </ul>
      </div>
    )
  }
}

export default Navbar
