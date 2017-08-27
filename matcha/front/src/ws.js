/**
 * Init WebSocket
 */
const ws = new global.WebSocket('ws://localhost:3004/')
let available = false

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
  connect: () => {
    ws.onopen = (event) => {
      ws.send(JSON.stringify({
        method: 'connect',
        token: global.localStorage.getItem('Token')
      }))
    }
  },
  msg: (to, msg) => {
    if (available === false) return
    ws.send(JSON.stringify({
      method: 'send',
      to: to,
      msg: msg
    }))
  },
  onmessage: (history, cb) => {
    ws.onmessage = (event) => {
      if (event.data === 'Connected') {
        available = true
        return
      }

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
          case 'like':
            sendNotif('Like', {
              body: 'Someone like you!',
              icon: 'https://maxcdn.icons8.com/Share/icon/nolan/User_Interface//like_it1600.png'
            }, () => {
              history.push(`/profil/${data.from}`)
            })
            break
          case 'liked':
            sendNotif('Like back', {
              body: 'Someone you like, likes you too!',
              icon: 'https://maxcdn.icons8.com/Share/icon/nolan/User_Interface//like_it1600.png'
            }, () => {
              history.push(`/profil/${data.from}`)
            })
            break
          case 'view':
            sendNotif('View', {
              body: 'Someone is currently viewing your profile!',
              icon: 'https://maxcdn.icons8.com/Share/icon/nolan/User_Interface//like_it1600.png'
            }, () => {
              history.push(`/profil/${data.from}`)
            })
            break
          case 'dislike':
            sendNotif('Dislike', {
              body: 'Someone dislike you just now!',
              icon: 'https://maxcdn.icons8.com/Share/icon/nolan/User_Interface//like_it1600.png'
            }, () => {
              history.push(`/profil/${data.from}`)
            })
            break
          default:
            break
        }
      }
      cb(event)
    }
  }
}
