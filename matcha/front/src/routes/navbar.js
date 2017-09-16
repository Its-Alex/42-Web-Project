import React from 'react'
import { Link } from 'react-router-dom'
import './css/navbar.css'

class Navbar extends React.Component {
  constructor (props) {
    super(props)
    
    this.handleShowNav = this.handleShowNav.bind(this)
  }
  
  componentDidMount () {
    if (global.localStorage.getItem('token') !== undefined) {
      let url = `http://localhost:3005/picture/${global.localStorage.getItem('token')}/0`
      document.getElementById('pictureProfile').style.backgroundImage = `url('${url}')`
    }
  }

  handleShowNav (event) {
    const sidebar = document.getElementById('navbar')
    const sidebarBtn = document.getElementById('showNavBtn')

    sidebar.classList.toggle('hidden')
    sidebarBtn.classList.toggle('active');
  }  

  render () {
    return (
      <div id='navbar' className='hidden' >
        <div id='imgContainer'>
          <div id='pictureProfile' />
          <div id='imgButtonContainer'>
            <Link to='/notifications' id='notificationsButton' onClick={this.handleShowNav} />
            <Link to='/settings' id='settingsButton' onClick={this.handleShowNav} />
          </div>
        </div>
        <ul>
          <li><Link to='/find' alt='Find' onClick={this.handleShowNav}>Find</Link></li>
          <li><Link to='/search' alt='Search' onClick={this.handleShowNav}>Search</Link></li>
          <li><Link to='/profile' onClick={this.handleShowNav}>Profile</Link></li>
          <li><Link to='/chat' onClick={this.handleShowNav}>Chat</Link></li>
          <li><Link to='/auth/login' onClick={() => {
            global.localStorage.removeItem('token')
            global.localStorage.removeItem('id')
          }}>Logout</Link></li>
        </ul>
      </div>
    )
  }
}

export default Navbar
