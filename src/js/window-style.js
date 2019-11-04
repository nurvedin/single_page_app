import './chat-style.js'
import './news-style.js'

const template = document.createElement('template')
template.innerHTML = `
<style>
#myForm {
  position: absolute;
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
    const chatFrame = document.createElement('chat-style')
    const popUp = this.shadowRoot.querySelector('#pop-up')
    popUp.appendChild(chatFrame)

    myForm(this.shadowRoot.querySelector('#myForm'))

    function myForm (elmnt) {
      let pos1 = 0
      let pos2 = 0
      let pos3 = 0
      let pos4 = 0

      if (document.getElementById(elmnt.id + 'header')) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + 'header').onmousedown = dragMouseDown
      } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown
      }
      function dragMouseDown (e) {
        e = e || window.event
        e.preventDefault()
        // get the mouse cursor position at startup:
        pos3 = e.clientX
        pos4 = e.clientY
        document.onmouseup = closeDragElement
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag
      }

      function elementDrag (e) {
        e = e || window.event
        e.preventDefault()
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX
        pos2 = pos4 - e.clientY
        pos3 = e.clientX
        pos4 = e.clientY
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + 'px'
        elmnt.style.left = (elmnt.offsetLeft - pos1) + 'px'
      }

      function closeDragElement () {
        // stop moving when mouse button is released:
        document.onmouseup = null
        document.onmousemove = null
      }
    }
    // const newsFrame = document.createElement('news-style')
    // const newsPopUp = this.shadowRoot.querySelector('#pop-up')
    // newsPopUp.appendChild(newsFrame)
  }
}

window.customElements.define('window-style', windowStyle)
