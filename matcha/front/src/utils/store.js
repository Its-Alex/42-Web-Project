import { observable, action, useStrict } from 'mobx'

useStrict(true)
class Store {
  @observable chat
  @observable conUserList

  constructor (props) {
    this.chat = []
    this.conUserList = []
  }

  @action
  setConUserList(list) {
    this.conUserList = list
  }
  
  @action
  setChat(chat) {
    this.chat = chat
  }
}

const store = new Store()
export default store
export { Store }