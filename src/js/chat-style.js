const template = document.createElement('template')
template.innerHTML = `

<link rel="stylesheet" href="css/chat.css">

<div class="username">
  <label>Add a username:</label><br> 
  <input type="text" placeholder="Username.." id="userInput"><br>
  <button type="button" id="userBtn">Add</button>
</div>
`

const hasUsername = document.createElement('template')
hasUsername.innerHTML = `
<div class="chatStyle" id="chatForm">
  <div id="chat-pop-up">
    <div id="myMsg"></div>
    <div id="receivedMsg"></div>
  </div>
  <div id="textarea">
    <input type="text" placeholder="Type message.." id="msgInput">
    <div id="emoji">⬇️</div>
      <div id="myBox">
        <div id="box-content">
          <div id="smiley">🌝</div>
          <div id="laughing">😂</div>
          <div id="thumbs-up">👍</div>
          <div id="joga-bonito">🤙</div>
        </div>
      </div>
    <button type="button" class="btnSend">Send</button>
  </div>
</div>
`

export default class chat extends window.HTMLElement {
  constructor (message = 'default') {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this.emojiMenyOpen = false
  }

  static get observedAttributes () {
    return ['message']
  }

  attributeChangedCallback (name, oldValue, newValue) {
    this._receiveMsg(newValue)
  }

  connectedCallback () {
    // const app = this.getAttribute('message')

    this.apiKey = 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
    const url = 'ws://vhost3.lnu.se:20080/socket/'
    this.webSocket = new WebSocket(url)

    this.userInfo = {
      name: null
    }
    const checkStorage = localStorage.getItem('user-info')
    if (checkStorage === null) {
      this._checkUsername()
    } else {
      this._startChat()
    }

    const emoji = this.shadowRoot.querySelector('#emoji')
    emoji.addEventListener('click', e => {
      this.emojiMenyOpen = !this.emojiMenyOpen
      const getBox = this.shadowRoot.querySelector('#myBox')
      if (this.emojiMenyOpen) {
        console.log('Open')
        getBox.style.display = 'block'
        // const input = this.shadowRoot.querySelector('#msgInput')
        const smiley = this.shadowRoot.querySelector('#smiley')
        smiley.addEventListener('click', this._onClickFunction)
        const laughing = this.shadowRoot.querySelector('#laughing')
        laughing.addEventListener('click', this._onClickFunction)
        const thumbsUp = this.shadowRoot.querySelector('#thumbs-up')
        thumbsUp.addEventListener('click', this._onClickFunction)
        const jogaBonito = this.shadowRoot.querySelector('#joga-bonito')
        jogaBonito.addEventListener('click', this._onClickFunction)
      } else {
        console.log('Close')
        getBox.style.display = 'none'
      }
    })
  }

  _onClickFunction () {
    const input = this.parentNode.parentNode.parentNode.children[0]
    input.value += this.innerText
  }

  _checkUsername () {
    const button = this.shadowRoot.querySelector('#userBtn')

    button.addEventListener('click', event => {
      const userInput = this.shadowRoot.querySelector('#userInput')
      this.userInfo.name = userInput.value
      localStorage.setItem('user-info', JSON.stringify(this.userInfo))
      const usernameDiv = this.shadowRoot.querySelector('.username')
      usernameDiv.remove()
      this._startChat()
    })
  }

  _startChat () {
    const usernameDiv = this.shadowRoot.querySelector('.username')
    if (usernameDiv) {
      usernameDiv.remove()
    }
    const chat = hasUsername.content.cloneNode(true)
    this.shadowRoot.appendChild(chat)

    const button = this.shadowRoot.querySelector('.btnSend')
    button.addEventListener('click', event => {
      this._sendMsg()
    })
  }

  _sendMsg () {
    const input = this.shadowRoot.querySelector('#msgInput')
    const getName = localStorage.getItem('user-info')
    // console.log('🌝')
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
    const message = JSON.parse(event)
    console.log(message)

    if (message.username !== 'The Server') {
      if (message.fromMySelf === true) {
        const sendmessage = this.shadowRoot.querySelector('#myMsg')
        const senddiv = document.createElement('div')
        const span = document.createElement('SPAN')
        senddiv.appendChild(span)
        senddiv.setAttribute('id', 'sendMessages')
        span.innerText = message.data
        sendmessage.append(senddiv)

        // creating a div where the information is going to be inside
        const userDiv = document.createElement('div')
        userDiv.setAttribute('id', 'user')
        userDiv.innerText = `${message.username}`
        sendmessage.appendChild(userDiv)
      } else {
        const recmessage = this.shadowRoot.querySelector('#receivedMsg')
        const recdiv = document.createElement('div')
        const span = document.createElement('SPAN')
        recdiv.appendChild(span)
        recdiv.setAttribute('id', 'receiveMessages')
        span.innerText = message.data
        recmessage.append(recdiv)

        // creating a div where the information is going to be inside
        const userDiv = document.createElement('div')
        userDiv.setAttribute('id', 'fromServer')
        userDiv.innerText = `${message.username}`
        recmessage.appendChild(userDiv)
      }
    }
  }
}

window.customElements.define('chat-style', chat)
