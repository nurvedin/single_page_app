import './chat-style.js'
import './news-style.js'

const template = document.createElement('template')
template.innerHTML = `

<link rel="stylesheet" href="css/window.css">

<div class="windowStyle" id="myForm">
  <div id="pop-up"></div>
  <div id="divBtn">
    <button type="button" class="btnCancel">Close</button>
    <button type="settings" class="btnSet">Settings</button>
  </div>
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

    divBtn(this.shadowRoot.querySelector('#divBtn'))

    function divBtn (elmnt) {
      let pos1 = 0
      let pos2 = 0
      let pos3 = 0
      let pos4 = 0

      elmnt.onmousedown = dragMouseDown

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
