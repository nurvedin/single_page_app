const template = document.createElement('template')
template.innerHTML = `
<style>
.chatStyle {
  background-color: transparent;
  height: 30px;
  width: 250px;
}

#chat-pop-up {
  height: 274px;
  background: transparent;
}

#textarea {
  height: 30px;
  width: 244px;
  background: whitesmoke !important;
  border-radius: 10px;
}

.btnSend {
  margin-right: 180px;
  padding: 5px;
  cursor: pointer;
  width: 25%;
  background-color: transparent;
  color: green;
  border-radius: 10px;
  font-family: "Comic Sans MS", cursive, sans-serif;
}
</style>

<div class="chatStyle" id="chatForm">
  <div id="chat-pop-up"></div>
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
}

window.customElements.define('chat-style', chat)
