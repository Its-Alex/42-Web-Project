import React from 'react'

import {observer} from 'mobx-react'

import axiosInst from '../utils/axios.js'
import store from '../utils/store.js'
import './css/chat.css'

@observer
class Chat extends React.Component {
  constructor (props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }

  /**
   * Get chat data's
   */
  componentWillMount () {
    // axiosInst().get()
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
        salut
      </div>
    )
  }
}

export default Chat
