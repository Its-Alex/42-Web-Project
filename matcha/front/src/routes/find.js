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
      Dist: 100000,
      minPop: 0,
      maxPop: 100,
      results: [],
      currentUser: {}
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
          Dist: this.state.Dist,
          minPop: this.state.minPop,
          maxPop: this.state.maxPop
        }).then(res => {
          this.setState({
            results: res.data.results,
            currentUser: res.data.user
          })
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
        Dist: this.state.Dist,
        minPop: this.state.minPop,
        maxPop: this.state.maxPop
      }).then(res => {
        this.setState({
          results: res.data.results,
          currentUser: res.data.user
        })
      }).catch((err) => console.log(err.response))
    }
  }

  search (event) {
    if (event.key === 'Enter') {
      this.updateResults()
    }
  }

  onChange (event) {
    let name = event.target.name
    if (name === 'maxPop' || name === 'minPop' ||
    name === 'minAge' || name === 'maxAge') {
      if (event.target.value > 100) event.target.value = 100
      if (event.target.value < 0) event.target.value = 0
    }
    this.setState({[event.target.name]: event.target.value})
  }

  render () {
    return (
      <div className='body flex-start'>
        <div id='params'>
          <div>

            <input name='filterByLocation' type='text' value={this.state.filterByLocation} placeholder='Find by localisation' onChange={this.onChange} onKeyPress={this.search} />
            <input name='filterByTags' type='text' value={this.state.filterByTags} placeholder='Find by tags' onChange={this.onChange} onKeyPress={this.search} />
            <input name='minPop' type='number' min='0' step='1' max='100' placeholder='Min popularity' onChange={this.onChange} />
            <input name='maxPop' type='number' min='0' step='1' max='100' placeholder='Max popularity' onChange={this.onChange} />
            <input name='minAge' type='number' min='0' step='1' max='100' placeholder='Min age' onChange={this.onChange} />
            <input name='maxAge' type='number' min='0' step='1' max='100' placeholder='Max age' onChange={this.onChange} />
            <input name='Dist' type='number' min='0' step='1' max='100000' placeholder='Max distance' onChange={this.onChange} />
          </div>
          <div id='orderBy'>
            <div id='age' onClick={this.orderBy} >Age</div>
            <div id='distance' onClick={this.orderBy} >Distance</div>
            <div id='popularity' onClick={this.orderBy} >Popularity</div>
            <div id='tags' onClick={this.orderBy} >Tags</div>
          </div>
        </div>
        <div id='searchResult'>
          {this.state.results.map((elem) => {
            return (
              <div key={elem.id} id={elem.id}>
                <img className='searchImg' src={`http://localhost:3005/picture/${this.props.userID}/0`} alt='Main' />
                {elem.firstName}
                {elem.lastName}
                {elem.birthday}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default Find
