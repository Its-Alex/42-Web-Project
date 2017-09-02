import React from 'react'

import axiosInst from '../utils/axios.js'
import store from '../utils/store.js'
// import Moment from 'react-moment'

import {observer} from 'mobx-react'

/**
 * Component to show the list of user
 */
@observer class Talks extends React.Component {
  render () {
    return (
      <div id={'talks ' + this.props.userID} onClick={this.props.onClick} style={{width: '100%'}} >
        <img src={`http://localhost:3005/picture/${this.props.userID}/0`} alt='Main' style={{pointerEvents: 'none'}}/>
        <p style={{pointerEvents: 'none'}}>{this.props.name}</p>
      </div>
    )
  }
}

@observer class ChatList extends React.Component {
  constructor (props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }

  /**
   * Get user's datas
   */
  componentWillMount () {
    axiosInst().get('/chat').then(res => {
      if (res.data.success !== true) return
      store.setChat(res.data.chat)
    }).catch(err => console.log(err.response))
  }

  /**
   * Handle when a key is pressed
   * @param {object} event
   */
  handleChange (event) {
  }

  render () {
    return (
      <div className='body flex-start'>
      {store.chat.map(elem => {
        return <Talks key={elem.id} name={elem.name} userID={elem.id} onClick={(event, data) => {
          console.log(event.target)
        }} />
      })}
      </div>
    )
  }
}

export default ChatList
