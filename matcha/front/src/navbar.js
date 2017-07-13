import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import avatar from './img/avatar.svg'
import axios from 'axios'
import './navbar.css'

class Navbar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      profilPic: <img className='pictureProfil' src={avatar} alt='Profil' />
    }
  }

  componentWillMount () {
    if (global.localStorage.getItem('Token') !== undefined) {
      let url = `http://localhost:3005/picture/${global.localStorage.getItem('Token')}/0`
      axios.get(url).then((res) => {        
        this.setState({
          profilPic: <img className='pictureProfil' src={url} alt='Profil' />
        })
      }).catch((err) => {
        if (err) console.log(err)
      })
    }
  }

  render () {
    return (
      <div id='navbar'>
        <div id='imgContainer'>
          {this.state.profilPic}
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
