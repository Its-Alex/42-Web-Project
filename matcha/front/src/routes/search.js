import React, { Component } from 'react'
import axiosInst from '../utils/axios.js'
import './css/search.css'

class Search extends Component {
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
      location: ''
    }
    this.onKeyPress = this.onKeyPress.bind(this)
  }

  componentWillMount () {
    axiosInst.get('/user/me').then((result) => {
      axiosInst.get('/profil/me').then((res) => {
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

  onKeyPress () {
    this.props.ws.send(JSON.stringify({
      method: 'send',
      to: 'eb48d994-5dcf-41b4-93e4-e70c76b15cdd',
      msg: 'Salut !'
    }))
  }

  render () {
    return (
      <div className='body'>
        <input className='searchInput' type='text' placeholder='Search' />
      </div>
    )
  }
}

export default Search
