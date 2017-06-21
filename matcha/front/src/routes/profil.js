import React, { Component } from 'react'
import './css/profil.css'

class Profil extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      birthday: '',
      bio: '',
      popularity: '',
      gender: '',
      type: '',
      tags: '',
      location: '',
      axios: this.props.axios
    }
  }

  componentWillMount () {
    this.state.axios.get('/user/me').then((result) => {
      this.state.axios.get('/profil/me').then((res) => {
        this.setState({
          name: result.data.user.name,
          birthday: res.data.user.birthday,
          bio: res.data.user.bio,
          popularity: res.data.user.popularity,
          gender: (res.data.user.genre === 'M') ? 'Men' : (res.data.user.genre === 'F') ? 'Women' : 'All',
          type: (res.data.user.type === 'M') ? 'Men' : (res.data.user.type === 'F') ? 'Women' : 'All',
          tags: res.data.user.tags,
          location: res.data.user.location
        })
      }).catch((err) => {
        console.log(new Error(err))
      })
    }).catch((err) => {
      console.log(new Error(err))
    })
  }

  render () {
    return (
      <div className='body'>
        <p>{this.state.name}</p>
        <p>{this.state.birthday}</p>
        <p>{this.state.bio}</p>
        <p>{this.state.popularity}</p>
        <p>{this.state.gender}</p>
        <p>{this.state.type}</p>
        <p>{this.state.tags}</p>
        <p>{this.state.location}</p>
      </div>
    )
  }
}

export default Profil
