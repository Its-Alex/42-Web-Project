import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLogged: false
    }
  }

  render () {
    return (
      <div className='App'>
        hello
      </div>
    )
  }
}

App.PropTypes = {
  name: PropTypes.any.isRequired
}

export default App
