import { observable, action, useStrict } from 'mobx'

useStrict(true)
class Store {
  @observable chat
  @observable userChat
  @observable conUserList

  constructor (props) {
    this.chat = []
    this.userChat = {
      user: null,
      text: []
    }
    this.conUserList = []
  }

  @action
  setUserChat (chat) {
    this.userChat = {
      user: chat.user,
      text: chat.text
    }
  }

  @action
  addUserChat (chat) {
    this.userChat.text.push(chat)
  }

  @action
  setConUserList (list) {
    this.conUserList = list
  }

  @action
  setChat (chat) {
    this.chat = chat
  }
}

const store = new Store()
export default store
export { Store }