import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import avatar from './img/avatar.svg'
import './navbar.css'

class Navbar extends Component {
  render () {
    let profilPic

    if (global.localStorage.getItem('Token') !== undefined) {
      let url = `http://localhost:3005/picture/${global.localStorage.getItem('Token')}/0`
      profilPic = <img className='pictureProfil' src={url} alt='Profil' />
    } else {
      profilPic = <img className='pictureProfil' src={avatar} alt='Profil' />
    }

    return (
      <div id='navbar'>
        <div id='imgContainer'>
          {profilPic}
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
