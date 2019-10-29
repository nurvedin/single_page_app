import './chat-style.js'
import './news-style.js'

const template = document.createElement('template')
template.innerHTML = `
<style>
#myForm {
  background-color: yellow;
  height: 350px;
  right: 70px;
  width: 250px;
  padding: 10px 10px 0 10px;
  border-radius: 5px;
  text-align: center;
}

#pop-up {
  width: 100%;
  background: #5B2E48;
  min-height: 310px;
  border-radius: 10px;
}

.btnCancel {
  margin-top: 4px;
  margin-left: 90px;
  margin-right: 20px;
  padding: 5px;
  cursor: pointer;
  width: 25%;
  background-color: transparent;
  color: red;
  border-radius: 10px;
  font-family: "Comic Sans MS", cursive, sans-serif;
}

.btnSet {
  margin-top: 4px;
  padding: 5px;
  cursor: pointer;
  width: 25%;
  background-color: transparent;
  color: blue;
  border-radius: 10px;
  font-family: "Comic Sans MS", cursive, sans-serif;
}
</style>

<div class="windowStyle" id="myForm">
  <div id="pop-up"></div>
  <button type="button" class="btnCancel">Close</button>
  <button type="settings" class="btnSet">Settings</button>
</div>
`
export default class windowStyle extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }

  connectedCallback () {
    // const chatFrame = document.createElement('chat-style')
    // const popUp = this.shadowRoot.querySelector('#pop-up')
    // popUp.appendChild(chatFrame)

    const newsFrame = document.querySelector('news-style')
    const popUp = this.shadowRoot.querySelector('#pop-up')
    popUp.appendChild(newsFrame)
  }
}

window.customElements.define('window-style', windowStyle)
