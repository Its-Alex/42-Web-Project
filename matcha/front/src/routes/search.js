import React, { Component } from 'react'

import axiosInst from '../utils/axios.js'
import './css/search.css'

class Search extends Component {
  constructor (props) {
    super(props)

    this.state = {
      location: '',
      tags: '',
      orderBy: 'popularity',
      minAge: 0,
      maxAge: 99,
      minDist: 0,
      maxDist: 100,
      maxPop: 0,
      minPop: 100,
    }
    this.orderBy = this.orderBy.bind(this)
  }

  componentWillMount () {
    axiosInst().get('/search').then((result) => {
     
    }).catch((err) => console.log(err.response))
  }

  componentDidUpdate (prevProps, prevState) {
    axiosInst().get('/search').then((result) => {
      
     }).catch((err) => console.log(err.response))
  }
  

  orderBy (event) {
    console.log(event.target.id)
    if (event.target.id === 'age') {
      this.setState({orderBy: event.target.id})
    } else if (event.target.id ===  'distance') {
      this.setState({orderBy: event.target.id})
    } else if (event.target.id === 'popularity') {
      this.setState({orderBy: event.target.id})
    } else if (event.target.id === 'tags') {
      this.setState({orderBy: event.target.id})
    }
  }

  render () {
    return (
      <div className='body flex-start'>
        <div id='params'>
          <input name='searchLocalisation' type='text' placeholder='Search by localisation' />
          <input name='searchTags' type='text' placeholder='Search by tags' />
          <div id='orderBy'>
            <div id='age' onClick={this.orderBy} >Age</div>
            <div id='distance' onClick={this.orderBy} >Distance</div>
            <div id='popularity' onClick={this.orderBy} >Popularity</div>
            <div id='tags' onClick={this.orderBy} >Tags</div>
          </div>
          <div>
            <input name='minPop' type='number' min='0' step='1' max='100' placeholder='Min popularity'/>
            <input name='maxPop' type='number' min='0' step='1' max='100' placeholder='Max popularity' />
            <input name='minAge' type='number' min='0' step='1' max='100' placeholder='Min age' />
            <input name='maxAge' type='number' min='0' step='1' max='100' placeholder='Max age' />
            <input name='minDist' type='number' min='0' step='1' max='100' placeholder='Min distance' />
            <input name='maxDist' type='number' min='0' step='1' max='100' placeholder='Max distance' />
          </div>
        </div>
        <div id='results'>
        </div>
      </div>
    )
  }
}

export default Search
