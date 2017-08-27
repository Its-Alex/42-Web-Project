import React, { Component } from 'react'
import ws from '../ws.js'
import axiosInst from '../axios.js'
// import Moment from 'react-moment'
import './css/profil.css'

class Chat extends Component {
  constructor (props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }

  /**
   * Get user's datas
   */
  componentDidMount () {
    axiosInst.get('/chat').then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
    ws.onmessage(this.props.history, (event) => {

    })
  }

  /**
   * Change websocket's onmessage callback
   */
  componentWillUnmount () {
    ws.onmessage(this.props.history, (event) => {})
  }

  /**
   * Handle when a key is pressed
   * @param {object} event
   */
  handleChange (event) {
    console.log(event)
  }

  render () {
    return (
      <div className='body'>
        <button onClick={this.handleChange} />
      </div>
    )
  }
}

export default Chat
