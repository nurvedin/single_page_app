const template = document.createElement('template')
template.innerHTML = `

<link rel="stylesheet" href="css/chat.css">

<div class="username">
  <label>Add a username:</label><br> 
  <input type="text" placeholder="userName" id="userInput"><br>
  <button type="button" id="userBtn">Add</button>
</div>
`

const hasUsername = document.createElement('template')
hasUsername.innerHTML = `
<div class="chatStyle" id="chatForm">
  <div id="chat-pop-up">
    <div id="msgWindow">
    </div>
  </div>
  <textarea id="textarea" placeholder="Type message.." name="msg" required></textarea>
  <button type="button" class="btnSend">Send</button>
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
  }

  _checkUsername () {
    const button = this.shadowRoot.querySelector('#userBtn')
    // const input = this.shadowRoot.querySelector('#userInput')

    button.addEventListener('click', event => {
      this._startChat()
    })
  }

  _startChat () {
    const usernameDiv = this.shadowRoot.querySelector('.username')
    // const container = usernameDiv.parentElement
    usernameDiv.remove()
    const chat = hasUsername.content.cloneNode(true)
    this.shadowRoot.appendChild(chat)
  }
}

window.customElements.define('chat-style', chat)
