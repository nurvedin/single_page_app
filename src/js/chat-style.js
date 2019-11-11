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
    const apiKey = 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
  }

  _checkUsername () {
    const userInfoItem = localStorage.getItem('user info')
    var date = new Date()

    const userInfo = {
      name: null,
      time: null
    }
    // getting the name and time to put in the localstorage
    // const userName = template.content.cloneNode(true)
    // this.shadowRoot.appendChild(userName)
    // userInfo.name = userName.value
    // console.log(userName.name)
    // userInfo.time = `${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}`

    let itemArr = []
    if (userInfoItem) {
      itemArr = JSON.parse(userInfoItem)
    }

    itemArr.push(userInfo)
    localStorage.setItem('user info', JSON.stringify(itemArr))

    const button = this.shadowRoot.querySelector('#userBtn')
    button.addEventListener('click', event => {
      // creating a div where the information is going to be inside
      const user = this.shadowRoot.querySelector('#userInfo')
      const userDiv = document.createElement('div')
      userDiv.setAttribute('id', 'user')
      // userDiv.textContent = userName.value
      userDiv.innerText = `${userInfo.name} : ${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}`
      console.log(userDiv.name)
      console.log(userDiv.value)
      user.appendChild(userDiv)
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
    const message = this.shadowRoot.querySelector('#myMsg')
    const div = document.createElement('div')
    div.setAttribute('id', 'sendMessages')
    const input = this.shadowRoot.querySelector('#msgInput')
    div.textContent = input.value
    message.append(div)
    input.value = ''
  }

  _receiveMsg () {
    const message = this.shadowRoot.querySelector('#receivedMsg')
    const div = document.createElement('div')
    div.setAttribute('id', 'receiveMessages')
    // message that comes frome the server, not finished yet
    const input = this.shadowRoot.querySelector('#msgInput')
    div.textContent = input.value
    message.append(div)
  }

  _websocket () {
    const url = 'ws://vhost3.lnu.se:20080/socket/'
    const webSocket = new WebSocket(url)
  }
}

window.customElements.define('chat-style', chat)
