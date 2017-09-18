import React, { Component } from 'react'
import axios from 'axios'

import axiosInst from '../utils/axios.js'
import './css/find.css'

let sortByAgeAsc = (a, b) => {
  if (a.birthday < b.birthday) return -1
  else if (a.birthday > b.birthday) return 1
  else if (a.birthday === b.birthday) return 0
}

let sortByPopAsc = (a, b) => {
  if (a.popularity < b.popularity) return -1
  else if (a.popularity > b.popularity) return 1
  else if (a.popularity === b.popularity) return 0
}

let sortByDistAsc = (a, b) => {
  if (a.dist < b.dist) return -1
  else if (a.dist > b.dist) return 1
  else if (a.dist === b.dist) return 0
}

class Find extends Component {
  constructor (props) {
    super(props)

    this.state = {
      filterByLocation: '',
      filterByTags: '',
      orderBy: 'popularity',
      minAge: '18',
      maxAge: '99',
      dist: '100000',
      minPop: '0',
      maxPop: '100',
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

  onChange (event) {
    let name = event.target.name
    if (name === 'maxPop' || name === 'minPop' ||
    name === 'minAge' || name === 'maxAge') {
      if (event.target.value > 100) event.target.value = 100
      if (event.target.value < 0) event.target.value = 0
    }
    if (name === 'dist') {
      if (event.target.value > 100000) event.target.value = 100000
      if (event.target.value < 0) event.target.value = 0
    }
    this.setState({[event.target.name]: event.target.value})
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
          dist: this.state.dist,
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
        dist: this.state.dist,
        minPop: this.state.minPop,
        maxPop: this.state.maxPop
      }).then(res => {
        if (res.data.results !== undefined && res.data.results !== null &&
        res.data.user !== undefined && res.data.user !== null) {
          this.setState({
            results: res.data.results,
            currentUser: res.data.user
          })
        } else {
          this.setState({
            results: [],
            currentUser: []
          })
        }
      }).catch((err) => console.log(err.response))
    }
  }

  sortByTags (a, b) {
    let nA = 0
    let nB = 0

    this.state.currentUser.tags.split(' ').forEach(element => {
      a.tags.split(' ').forEach(elemA => {
        if (elemA === element) nA++
      })
      b.tags.split(' ').forEach(elemB => {
        if (elemB === element) nB++
      })
    })
    if (nA < nB) return 1
    else if (nA > nB) return -1
    else if (nA === nB) return 0
  }

  orderBy (event) {
    document.getElementById('distance').classList.remove('active')
    document.getElementById('tags').classList.remove('active')
    document.getElementById('popularity').classList.remove('active')
    document.getElementById('age').classList.remove('active')

    if (event.target.id === 'age') {
      this.setState((state) => {
        if (state.orderBy === 'age') {
          return this.setState({
            results: this.state.results.reverse(),
            orderBy: 'ageDesc'
          })
        } else {
          return this.setState({
            results: this.state.results.sort(sortByAgeAsc),
            orderBy: 'age'
          })
        }
      })
      event.target.classList.toggle('active')
    } else if (event.target.id === 'distance') {
      this.setState((state) => {
        if (state.orderBy === 'distance') {
          return this.setState({
            results: this.state.results.reverse(),
            orderBy: 'distanceDesc'
          })
        } else {
          return this.setState({
            results: this.state.results.sort(sortByDistAsc),
            orderBy: 'distance'
          })
        }
      })
      event.target.classList.toggle('active')
    } else if (event.target.id === 'popularity') {
      event.target.classList.toggle('active')
      this.setState((state) => {
        if (state.orderBy === 'popularity') {
          return this.setState({
            results: this.state.results.reverse(),
            orderBy: 'popularityDesc'
          })
        } else {
          return this.setState({
            results: this.state.results.sort(sortByPopAsc),
            orderBy: 'popularity'
          })
        }
      })
    } else if (event.target.id === 'tags') {
      event.target.classList.toggle('active')
      this.setState((state) => {
        if (state.orderBy === 'tags') {
          return this.setState({
            results: this.state.results.reverse(),
            orderBy: 'tagsDesc'
          })
        } else {
          return this.setState({
            results: this.state.results.sort(this.sortByTags.bind(this)),
            orderBy: 'tags'
          })
        }
      })
    }
  }

  search (event) {
    if (event.key === 'Enter') {
      this.updateResults()
    }
  }

  render () {
    return (
      <div className='custom-body'>
        <div id='params'>
          <div>
            <p><input name='filterByLocation' type='text' value={this.state.filterByLocation} placeholder='Find by localisation' onChange={this.onChange} onKeyPress={this.search} /></p>
            <p><input name='filterByTags' type='text' value={this.state.filterByTags} placeholder='Find by tags' onChange={this.onChange} onKeyPress={this.search} /></p>
            <p><b>Minimum popularity: </b><input name='minPop' type='number' value={this.state.minPop} min='0' step='1' max='100' placeholder='Min popularity' onChange={this.onChange} onKeyPress={this.search} /></p>
            <p><b>Maximum popularity: </b><input name='maxPop' type='number' value={this.state.maxPop} min='0' step='1' max='100' placeholder='Max popularity' onChange={this.onChange} onKeyPress={this.search} /></p>
            <p><b>Minimum age: </b><input name='minAge' type='number' value={this.state.minAge} min='18' step='1' max='100' placeholder='Min age' onChange={this.onChange} onKeyPress={this.search} /></p>
            <p><b>Maximum age: </b><input name='maxAge' type='number' value={this.state.maxAge} min='0' step='1' max='100' placeholder='Max age' onChange={this.onChange} onKeyPress={this.search} /></p>
            <p><b>Maximum distance: </b><input name='dist' type='number' value={this.state.dist} min='0' step='1' max='100000' placeholder='Max distance' onChange={this.onChange} onKeyPress={this.search} /></p>
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
              <div key={elem.id} id={elem.id} onClick={(event) => {
                event.preventDefault()
                this.props.history.push(`/profile/${elem.id}`)
              }}>
                <img className='searchImg' src={`http://localhost:3005/picture/${elem.id}/0`} alt='Main' />
                <p><b>Firstname:</b> {elem.firstName}</p>
                <p><b>Lastname:</b> {elem.lastName}</p>
                <p><b>Popularity:</b> {elem.popularity}</p>
                <p><b>Age:</b> {elem.birthday}</p>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default Find
