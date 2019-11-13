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
    <div id="userInfo"></div>
    <div id="myMsg"></div>
    <div id="receivedMsg"></div>
  </div>
  <div id="textarea">
    <input type="text" placeholder="Type message.." id="msgInput">
    <button type="button" class="btnSend">Send</button>
  </div>
</div>
`

export default class chat extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }

  connectedCallback () {
    this._checkUsername()
    this.apiKey = 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
    const url = 'ws://vhost3.lnu.se:20080/socket/'
    this.webSocket = new WebSocket(url)

    this.webSocket.addEventListener('message', event => {
      this._receiveMsg(event)
    })
  }

  _checkUsername () {
    const userInfo = {
      name: null,
      time: null
    }

    var date = new Date()

    const button = this.shadowRoot.querySelector('#userBtn')

    button.addEventListener('click', event => {
      const userInput = this.shadowRoot.querySelector('#userInput')
      const userInfoItem = localStorage.getItem('user info')
      // getting the name and time to put in the localstorage
      userInfo.name = userInput.value
      userInfo.time = `${date.getHours()} : ${date.getMinutes()}`

      let itemArr = []
      if (userInfoItem) {
        itemArr = JSON.parse(userInfoItem)
      }

      itemArr.push(userInfo)
      localStorage.setItem('user info', JSON.stringify(itemArr))
      console.log(userInfo.name)
      this._startChat()
    })
  }

  _startChat () {
    const usernameDiv = this.shadowRoot.querySelector('.username')
    usernameDiv.remove()
    const chat = hasUsername.content.cloneNode(true)
    this.shadowRoot.appendChild(chat)

    const button = this.shadowRoot.querySelector('.btnSend')
    button.addEventListener('click', event => {
      this._sendMsg()
    })
  }

  _sendMsg () {
    // creating a div where the information is going to be inside
    const user = this.shadowRoot.querySelector('#userInfo')
    const userDiv = document.createElement('div')
    const userspan = document.createElement('SPAN')
    userDiv.appendChild(userspan)
    userDiv.setAttribute('id', 'user')
    this.userInfo = this.userInfo.name
    console.log(this.userInfo)
    userDiv.innerText = `${this.userInfo.name} ' ' ${this.userInfo.time}`
    user.appendChild(userDiv)

    const sendmessage = this.shadowRoot.querySelector('#myMsg')
    const senddiv = document.createElement('div')
    const span = document.createElement('SPAN')
    senddiv.appendChild(span)
    senddiv.setAttribute('id', 'sendMessages')
    const input = this.shadowRoot.querySelector('#msgInput')
    span.innerText = input.value
    sendmessage.append(senddiv)
    // Construct a message object containing the data the server needs to process the message from the chat client.
    var msg = {
      type: 'message',
      data: input.value,
      username: 'My name',
      key: this.apiKey,
      fromMySelf: true
    }

    // Send the msg object as a JSON-formatted string.
    this.webSocket.send(JSON.stringify(msg))

    input.value = ''
  }

  _receiveMsg (event) {
    const message = JSON.parse(event.data)
    if (message.fromMySelf !== true && message.username !== 'The Server') {
      const recmessage = this.shadowRoot.querySelector('#receivedMsg')
      const recdiv = document.createElement('div')
      const span = document.createElement('SPAN')
      recdiv.appendChild(span)
      recdiv.setAttribute('id', 'receiveMessages')
      span.innerText = message.data
      recmessage.append(recdiv)
    }
  }
}

window.customElements.define('chat-style', chat)
