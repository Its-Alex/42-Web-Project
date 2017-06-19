import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'

class Navbar extends Component {
  render () {
    return (
      <div className='navbar'>
        <ul>
          <li><input className='searchInput' type='text' placeholder='Search' /></li>
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
