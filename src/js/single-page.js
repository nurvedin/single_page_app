import './window-style.js'
import './chat-style.js'
import './news-style.js'

export default class SinglePage {
  constructor () {
    this.sockethandler()

    // if any of the application buttons are clicked, create a window frame
    // and send to the right event listener in window-style
    const gameButton = document.querySelector('#gameButton')
    const newsButton = document.querySelector('#newsButton')
    const chatButton = document.querySelector('#chatButton')

    gameButton.addEventListener('click', event => {
      event.preventDefault()
      const windowFrame = document.createElement('window-style')
      windowFrame.setAttribute('application', 'memory')
      const singleTag = document.querySelector('body')
      singleTag.appendChild(windowFrame)
    })

    newsButton.addEventListener('click', event => {
      event.preventDefault()
      const windowFrame = document.createElement('window-style')
      windowFrame.setAttribute('application', 'news')
      const singleTag = document.querySelector('body')
      singleTag.appendChild(windowFrame)
    })

    chatButton.addEventListener('click', event => {
      event.preventDefault()
      const windowFrame = document.createElement('window-style')
      windowFrame.setAttribute('application', 'chat')
      const singleTag = document.querySelector('body')
      singleTag.appendChild(windowFrame)
    })
  }

  sockethandler () {
    this.apiKey = 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
    const url = 'ws://vhost3.lnu.se:20080/socket/'
    this.webSocket = new WebSocket(url)
    this.webSocket.addEventListener('message', event => {
      this._receiveMsg(event)
    })
  }

  _sendMsg () {
    // Construct a message object containing the data the server needs to process the message from the chat client.
    var msg = {
      type: 'message',
      data: input.value,
      username: JSON.parse(getName).name,
      key: this.apiKey,
      fromMySelf: true
    }

    // Send the msg object as a JSON-formatted string.
    this.webSocket.send(JSON.stringify(msg))

    input.value = ''
  }

  _receiveMsg (event) {
    const message = JSON.parse(event.data)
    if (message.username !== 'The Server') {
      this._saveMsg(message)
    }

    if (message.username !== 'The Server') {
      var windows = document.querySelectorAll('window-style')
      windows = Array.from(windows).filter(elem => elem.getAttribute('application') === 'chat')
      windows.forEach(elem => {
        elem.shadowRoot.querySelector('chat-style').setAttribute('message', JSON.stringify(message))
      })
    }
  }

  _saveMsg (message) {
    const msgArr = []

    const messageStorage = {
      message: msgArr
    }

    const messageInfo = JSON.parse(localStorage.getItem('message-info'))
    if (messageInfo === null) {
      msgArr.push(message)
      localStorage.setItem('message-info', JSON.stringify(messageStorage))
    } else if (messageInfo.message.length <= 20) {
      messageInfo.message.push(message)
      localStorage.setItem('message-info', JSON.stringify(messageInfo))
    } else if (messageInfo.message.length > 20) {
      messageInfo.message = messageInfo.message.slice(1, 19)
      messageInfo.message.push(message)
      localStorage.setItem('message-info', JSON.stringify(messageInfo))
    }
  }
}
