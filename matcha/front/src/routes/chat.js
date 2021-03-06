import React from 'react'

import Moment from 'react-moment'
import {observer} from 'mobx-react'

import axiosInst from '../utils/axios.js'
import store from '../utils/store.js'
import ws from '../utils/ws.js'
import './css/chat.css'

@observer
class Chat extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      chatInput: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
  }

  /**
   * Get chat data's
   */
  componentWillMount () {
    axiosInst().get(`/chat/${this.props.match.params.id}`).then(res => {
      let chat
      if (res.data.success === true) {
        chat = {
          user: this.props.match.params.id,
          text: res.data.texts
        }
      } else {
        chat = {
          user: this.props.match.params.id,
          text: []
        }
      }
      store.setUserChat(chat)
    }).catch(err => {
      console.log(err.response)
      store.setUserChat({
        user: this.props.match.params.id,
        text: []
      })
    })
  }

  componentWillUnmount () {
    store.setUserChat({
      user: '',
      text: []
    })
  }

  componentDidMount () {
    let img = document.getElementById('chat-userImg')
    let url = `http://localhost:3005/picture/${this.props.match.params.id}/0`
    img.style.backgroundImage = `url('${url}')`

  }
  

  componentDidUpdate (prevProps, prevState) {
    if (this.state.chatInput === '') {
      let div = document.getElementById('chat-message')
      div.scrollTop = div.scrollHeight
    }
  }
  
  /**
   * Handle when a key is pressed
   * @param {object} event
   */
  handleChange (event) {
    event.preventDefault()
    this.setState({[event.target.name]: event.target.value})
  }

  handleConfirm (event) {
    let chat = this.state.chatInput.trim()
    if (event.key === 'Enter' && chat !== '') {
      ws.send({
        method: 'sendChat',
        to: this.props.match.params.id,
        msg: chat
      })
      store.addUserChat({
        date: Date.now(),
        sender: global.localStorage.getItem('id'),
        receiver: this.props.match.params.id,
        text: chat
      })
      this.setState({'chatInput': ''})
    }
  }

  render () {
    return (
      <div className='body flex-start'>
        <div id='chat-userData'>
          <div id='chat-userImg'/>
        </div>
        <div id='chat-message'>
          {store.userChat.text.map(elem => {
            let text

            if (elem.sender === this.props.match.params.id) {
              text = (
                <div key={Math.random()} className='chat-text-receive'>
                  <p className='chat-text chat-left'>{elem.text}</p><br />
                  <span className='chat-date'>
                    <Moment fromNow date={elem.date} />
                  </span>
                </div>
              )
            } else {
              text = (
                <div key={Math.random()} className='chat-text-send'>
                  <p className='chat-text chat-rigth'>{elem.text}</p><br />
                  <span className='chat-date'>
                    <Moment fromNow date={elem.date} />
                  </span>
                </div>
              )
            }
            return text
          })}
        </div>
        <input id='chat-input' value={this.state.chatInput} name='chatInput'
          onChange={this.handleChange} placeholder='Type your message here' onKeyPress={this.handleConfirm} />
      </div>
    )
  }
}

export default Chat
