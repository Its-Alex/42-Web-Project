import React from 'react'
import axiosInst from '../utils/axios.js'
import Moment from 'react-moment'
import ws from '../utils/ws.js'

class OtherProfile extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      error: '',
      username: '',
      birthday: '',
      bio: '',
      popularity: '',
      genre: '',
      type: '',
      tags: '',
      location: '',
      lastConnect: '',
      password: '',
      img: [
        '',
        '',
        '',
        '',
        ''
      ]
    }
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  /**
   * Get user's datas
   */
  componentWillMount () {
    if (this.props.match.params.user === global.localStorage.getItem('id')) {
      return this.props.history.push('/profil')
    }
    axiosInst().get(`/otherProfile/${this.props.match.params.user}`).then(res => {
      if (res.data.success === true) {
        this.setState({
          username: res.data.name,
          birthday: res.data.profil[0].birthday,
          bio: res.data.profil[0].bio,
          firstName: res.data.profil[0].firstName,
          lastName: res.data.profil[0].lastName,
          popularity: res.data.profil[0].popularity,
          genre: (res.data.profil[0].genre === 'M') ? 'Man' : 'Woman',
          type: (res.data.profil[0].type === 'M') ? 'Mens' : (res.data.profil[0].type === 'F') ? 'Womens' : 'Mens and Womans',
          tags: res.data.profil[0].tags,
          location: res.data.profil[0].location,
          lastConnect: res.data.profil[0].lastConnect,
          img: [
            `http://localhost:3005/picture/${res.data.id}/0`,
            `http://localhost:3005/picture/${res.data.id}/1`,
            `http://localhost:3005/picture/${res.data.id}/2`,
            `http://localhost:3005/picture/${res.data.id}/3`,
            `http://localhost:3005/picture/${res.data.id}/4`
          ]
        })
      } else {
        this.setState({
          error: res.data.error
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }

  componentDidMount () {
    ws.send({
      method: 'viewProfile',
      to: this.props.match.params.user
    })
  }

  /**
   * Handle when a key is pressed
   * @param {object} event
   */
  handleKeyPress (event) {
    if (event.target.value === 'Like') {
    }
  }

  render () {
    return (
      <div className='body flex-start'>
        {
          this.state.error
            ? <span className='error'>{this.state.error}</span>
            : null
        }
        <img src={this.state.img[0]} alt='First' height='50px' width='50px' />
        <img src={this.state.img[1]} alt='Second' height='50px' width='50px' />
        <img src={this.state.img[2]} alt='Third' height='50px' width='50px' />
        <img src={this.state.img[3]} alt='Four' height='50px' width='50px' />
        <img src={this.state.img[4]} alt='Five' height='50px' width='50px' />
        <p><b>Popularity : </b>{this.state.popularity}</p>
        <p><b>Username : </b>{this.state.username}</p>
        <p><b>First name : </b>{this.state.firstName}</p>
        <p><b>Last name : </b>{this.state.lastName}</p>
        <p><b>Is : </b>{this.state.genre}</p>
        <p><b>Birthday : </b>{this.state.birthday}</p>
        <p><b>Looking for : </b>{this.state.type}</p>
        <p><b>Bio : </b>{this.state.bio}</p>
        <p><b>Last location : </b>{this.state.location}</p>
        <p><b>Tags : </b>{this.state.tags}</p>
        <p><b>Connected : </b><Moment fromNow date={new Date(this.state.lastConnect)} /></p>
      </div>
    )
  }
}

export default OtherProfile
