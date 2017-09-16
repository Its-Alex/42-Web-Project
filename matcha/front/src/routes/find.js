import React, { Component } from 'react'

import axiosInst from '../utils/axios.js'
import './css/find.css'

class Find extends Component {
  constructor (props) {
    super(props)

    this.state = {
      filterByLocation: '',
      filterByTags: '',
      orderBy: 'popularity',
      minAge: 0,
      maxAge: 99,
      minDist: 0,
      maxDist: 100,
      minPop: 0,
      maxPop: 100,
      results: []
    }
    this.orderBy = this.orderBy.bind(this)
    this.updateResults = this.updateResults.bind(this)
  }

  componentWillMount () {
    this.updateResults()
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

  updateResults () {
    axiosInst().post('/find', {
      filterByLocation: this.state.filterByLocation,
      filterByTags: this.state.filterByTags,
      orderBy: this.state.orderBy,
      minAge: this.state.minAge,
      maxAge: this.state.maxAge,
      minDist: this.state.minDist,
      maxDist: this.state.maxDist,
      minPop: this.state.minPop,
      maxPop: this.state.maxPop
    }).then(res => {
      console.log(res)
    }).catch((err) => console.log(err.response))
  }

  render () {
    return (
      <div className='body flex-start'>
        <div id='params'>
          <div>

            <input name='findLocalisation' type='text' placeholder='Find by localisation' />
            <input name='findTags' type='text' placeholder='Find by tags' />
            <input name='minPop' type='number' min='0' step='1' max='100' placeholder='Min popularity'/>
            <input name='maxPop' type='number' min='0' step='1' max='100' placeholder='Max popularity' />
            <input name='minAge' type='number' min='0' step='1' max='100' placeholder='Min age' />
            <input name='maxAge' type='number' min='0' step='1' max='100' placeholder='Max age' />
            <input name='minDist' type='number' min='0' step='1' max='100' placeholder='Min distance' />
            <input name='maxDist' type='number' min='0' step='1' max='100' placeholder='Max distance' />
          </div>
          <div id='orderBy'>
            <div id='age' onClick={this.orderBy} >Age</div>
            <div id='distance' onClick={this.orderBy} >Distance</div>
            <div id='popularity' onClick={this.orderBy} >Popularity</div>
            <div id='tags' onClick={this.orderBy} >Tags</div>
          </div>
        </div>
        <div id='results'>
          {this.state.results}
        </div>
      </div>
    )
  }
}

export default Find
