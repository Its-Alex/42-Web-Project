import { observable, action } from 'mobx'

class Store {
  @observable chat

  constructor (props) {
    this.chat = []
  }

  @action setChat(chat) {
    this.chat = chat
  }
}

const store = new Store()
export default store
export { Store }