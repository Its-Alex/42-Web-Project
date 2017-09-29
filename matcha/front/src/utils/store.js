import { observable, action, useStrict } from 'mobx'

useStrict(true)
class Store {
  @observable chat = []
  @observable userChat = {
      user: null,
      text: []
    }
  @observable conUserList = []

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