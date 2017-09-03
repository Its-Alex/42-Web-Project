const store = require('./store.js')
let ws = null

let sendNotif = (title, option, onclick) => {
  if (!('Notification' in window)) {
    global.alert('Ce navigateur ne supporte pas les notifications desktop')
  } else if (global.Notification.permission === 'granted') {
    let notif = new global.Notification(title, option)
    notif.onclick = onclick
  } else if (global.Notification.permission !== 'denied') {
    global.Notification.requestPermission(function (permission) {
      if (!('permission' in global.Notification)) {
        global.Notification.permission = permission
      }
      if (permission === "granted") {
        let notif = new global.Notification(title, option)
        notif.onclick = onclick
      }
    })
  }
}

module.exports = {
  init: () => {
    ws = new global.WebSocket('ws://localhost:3004/')

    ws.onopen = (event) => {
      ws.send(JSON.stringify({
        method: 'connect',
        token: global.localStorage.getItem('token')
      }))
    }
  },
  close: () => {
    ws.close()
  },
  send: (data) => {
    if (ws.readyState === 1) {
      ws.send(JSON.stringify(data))
    }
  },
  onmessage: (history, cb) => {
    ws.onmessage = (event) => {
      if (typeof event.data === 'string') {
        try {
          var data = JSON.parse(event.data)
        } catch (err) {
          console.log('Receive invalid WS data:' + err)
          return
        }
      } else {
        return
      }

      if (typeof data === 'object' && data !== null) {
        switch (data.method) {
          case 'notification':
            switch (data.type) {
              case 'like':
                sendNotif('Like', {
                  body: 'Someone like you!',
                  icon: 'https://maxcdn.icons8.com/Share/icon/nolan/User_Interface//like_it1600.png'
                }, () => {
                  history.push(`/profile/${data.user}`)
                })
                break
              case 'likeback':
                sendNotif('Like back', {
                  body: 'Someone you like, likes you too!',
                  icon: 'https://maxcdn.icons8.com/Share/icon/nolan/User_Interface//like_it1600.png'
                }, () => {
                  history.push(`/profile/${data.user}`)
                })
                break
              case 'view':
                sendNotif('View', {
                  body: 'Someone is currently viewing your profile!',
                  icon: 'https://maxcdn.icons8.com/Share/icon/nolan/User_Interface//like_it1600.png'
                }, () => {
                  history.push(`/profile/${data.user}`)
                })
                break
              case 'dislike':
                sendNotif('Dislike', {
                  body: 'Someone dislike you just now!',
                  icon: 'https://maxcdn.icons8.com/Share/icon/nolan/User_Interface//like_it1600.png'
                }, () => {
                  history.push(`/profile/${data.user}`)
                })
                break
              default:
                break
            }
            break
          case 'chat':
            switch (data.type) {
              case 'receive':
                if (data.from !== data.for && history.location.indexOf(data.from) === -1) {
                  sendNotif('New chat', {
                    body: `You receive a new chat!`,
                    icon: ''
                  }, () => {
                    history.push(`/chat/${data.from}`)
                  })
                }
                break
              default:
                break
            }
            break
          case 'conUserList':
            store.default.setConUserList(data.conUserList)
            break
          default:
            break
        }
      }
      cb(event)
    }
  }
}
