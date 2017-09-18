import React, { Component } from 'react'
import axios from 'axios'

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
    this.search = this.search.bind(this)
    this.onChange = this.onChange.bind(this)
    this.updateResults = this.updateResults.bind(this)
  }

  componentWillMount () {
    this.updateResults()
  }

  orderBy (event) {
    console.log(event.target.id)
    if (event.target.id === 'age') {
      this.setState({orderBy: event.target.id})
    } else if (event.target.id === 'distance') {
      this.setState({orderBy: event.target.id})
    } else if (event.target.id === 'popularity') {
      this.setState({orderBy: event.target.id})
    } else if (event.target.id === 'tags') {
      this.setState({orderBy: event.target.id})
    }
  }

  updateResults () {
    if (this.state.filterByLocation !== '') {
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.filterByLocation.replace(' ', '+')}&key=AIzaSyBO1ucGtsgt5eRvN1TQg4SIbquDHrQBosk`).then((res) => {
        axiosInst().post('/find', {
          isLoc: true,
          latLocation: res.data.results[0].geometry.location.lat,
          lngLocation: res.data.results[0].geometry.location.lng,
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
      }).catch((err) => console.log(err.response))
    } else {
      axiosInst().post('/find', {
        isLoc: false,
        latLocation: -1000,
        lngLocation: -1000,
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
  }

  search (event) {
    if (event.key === 'Enter') {
      this.updateResults()
    }
  }

  onChange (event) {
    console.log(event.target.name)
    this.setState({[event.target.name]: event.target.value})
  }

  render () {
    return (
      <div className='body flex-start'>
        <div id='params'>
          <div>

            <input name='filterByLocation' type='text' value={this.state.filterByLocation} placeholder='Find by localisation' onChange={this.onChange} onKeyPress={this.search} />
            <input name='filterByTags' type='text' value={this.state.filterByTags} placeholder='Find by tags' onChange={this.onChange} onKeyPress={this.search} />
            <input name='minPop' type='number' min='0' step='1' max='100' placeholder='Min popularity' />
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
