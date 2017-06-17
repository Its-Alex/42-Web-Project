import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'

class Navbar extends Component {
  render () {
    return (
      <div className='navbar'>
        <ul>
          <li><Link to='/home'>Home</Link></li>
          <li><Link to='/Profil'>Profil</Link></li>
          <li><Link to='/Profil'>Home</Link></li>
          <li><Link to='/home'>Search</Link></li>
        </ul>
      </div>
    )
  }
}

export default Navbar
