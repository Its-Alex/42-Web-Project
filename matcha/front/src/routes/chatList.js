import React from 'react'

import {observer} from 'mobx-react'

import axiosInst from '../utils/axios.js'
import store from '../utils/store.js'
import './css/chatList.css'

/**
 * Component to show the list of user
 */
@observer
class Talks extends React.Component {
  render () {
    return (
      <div id={this.props.userID} className='talks' onClick={this.props.onClick}>
        <img className='talksImg' src={`http://localhost:3005/picture/${this.props.userID}/0`} alt='Main'/>
        <p className='talksName'>{this.props.name}</p>
        {(store.conUserList.indexOf(this.props.userID) === -1)
          ? <div className='userDisconnected' ></div>
          : <div className='userConnected' ></div>}
      </div>
    )
  }
}

@observer
class ChatList extends React.Component {
  /**
   * Get user's datas
   */
  componentWillMount () {
    axiosInst().get('/chats').then(res => {
      if (res.data.success !== true) return
      store.setChat(res.data.chat)
    }).catch(err => console.log(err))
  }

  render () {
    return (
      <div className='body flex-mosaique'>
        {store.chat.map(elem => {
          return <Talks key={elem.id} name={elem.name} userID={elem.id} onClick={(event, data) => {
            this.props.history.push(`/chat/${elem.id}`)
          }} />
        })}
      </div>
    )
  }
}

export default ChatList
