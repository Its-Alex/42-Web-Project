import React, { Component } from 'react'
import ws from '../ws.js'
import axiosInst from '../axios.js'
// import Moment from 'react-moment'
import './css/profil.css'

// class Talks extends Component {
//   constructor (props) {
//     super(props)

//     this.state = {
//       name: this.props.name,
//       image: `http://localhost:3005/picture/${this.props.id}/0`
//     }
//   }

//   render () {
//     return (
//       <div className='talks'>
//         {this.state.name}
//       </div>
//     )
//   }
// }

class Chat extends Component {
  constructor (props) {
    super(props)

    this.state = {
      chat: []
    }
    this.handleChange = this.handleChange.bind(this)
  }

  /**
   * Get user's datas
   */
  componentWillMount () {
    let self = this
    console.log(self.props)
    axiosInst.get('/chat').then(res => {
      if (res.data.success !== true) return
      console.log(res.data.chat)
      self.setState = {
        chat: res.data.chat
      }
    }).catch(err => console.log(err.response))
    ws.onmessage(this.props.history, () => {})
  }

  /**
   * Handle when a key is pressed
   * @param {object} event
   */
  handleChange (event) {
    console.log(this.state)
  }

  render () {
    return (
      <div className='body'>
        <button onClick={this.handleChange} />
      </div>
    )
  }
}
// <Talks name={this.state.chat[0].name} id={this.state.chat[0].id} />

export default Chat
