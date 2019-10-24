const template = document.createElement('template')
template.innerHTML = `
<style>
.chatStyle {
  padding: 10px 10px 0 10px;
}

#chatpop-up {
  width: 28%;
  background: blue;
  min-height: 310px;
}

.btnSend {
  padding: 5px;
  cursor: pointer;
  width: 7%;
  background-color: transparent;
  color: green;
  border-radius: 10px;
}
</style>

<div class="chatStyle" id="chatForm">
  <form class="form-container">
    <div id="chatpop-up" required></div>
    <button type="button" class="btnSend">Send</button>
  </form>
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
