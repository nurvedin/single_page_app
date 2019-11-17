import './chat-style.js'
import './news-style.js'
import './memory-game.js'

const template = document.createElement('template')
template.innerHTML = `

<link rel="stylesheet" href="css/window.css">


<div class="windowStyle" id="myForm">
  <div id="pop-up"></div>
  <div id="divBtn">
    <button type="close" class="btnCancel">Close</button>
    <button type="settings" class="btnSet">Set</button>
    <div id="myDropdown" > </div>
  </div>
</div>

`
export default class windowStyle extends window.HTMLElement {
  constructor (application = 'default') {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.mouseisdown = false
    this.mousestartX = 0
    this.mousestartY = 0
  }

  connectedCallback () {
    const app = this.getAttribute('application')

    if (app === 'news') {
      this._news()
    } else if (app === 'chat') {
      this._chat()
    } else if (app === 'memory') {
      this._memoryGame()
    }

    this._removeButton()
    this._moveWindowFrame()
    this._settingsBtn()
  }

  _settingsBtn () {
    const settingsButton = this.shadowRoot.querySelector('.btnSet')
    settingsButton.addEventListener('click', event => {
      // add functionality for different things, for example add memory game sizes'
      const dropDown = this.shadowRoot.querySelector('#myDropdown')
      dropDown.createElement('h2')
    })
  }

  _removeButton () {
    const cancelButton = this.shadowRoot.querySelector('.btnCancel')
    cancelButton.addEventListener('click', event => {
      const windowFrame = this.shadowRoot.querySelector('.windowStyle')
      windowFrame.remove()
    })
  }

  _memoryGame () {
    const chatFrame = document.createElement('memory-game')
    const popUp = this.shadowRoot.querySelector('#pop-up')
    popUp.appendChild(chatFrame)
  }

  _chat () {
    const chatFrame = document.createElement('chat-style')
    const popUp = this.shadowRoot.querySelector('#pop-up')
    popUp.appendChild(chatFrame)
  }

  _news () {
    const newsFrame = document.createElement('news-style')
    const newsPopUp = this.shadowRoot.querySelector('#pop-up')
    newsPopUp.appendChild(newsFrame)
  }

  _moveWindowFrame () {
    const div = this.shadowRoot.querySelector('#divBtn')
    div.addEventListener('mousedown', e => {
      this.mouseisdown = true
      const windowStyle = this.shadowRoot.querySelector('.windowStyle')
      this.mousestartX = e.clientX - windowStyle.getBoundingClientRect().left
      this.mousestartY = e.clientY - windowStyle.getBoundingClientRect().top
      document.addEventListener('mousemove', e => {
        if (this.mouseisdown) {
          windowStyle.setAttribute('style', 'left: ' + (e.pageX - this.mousestartX) + 'px; ' + 'top: ' + (e.pageY - this.mousestartY) + 'px;')
        }
      })
      document.addEventListener('mouseup', e => {
        this.mouseisdown = false
      })
    })
    divBtn(this.shadowRoot.querySelector('#divBtn'))

    function divBtn (elmnt) {
      let pos1 = 0
      let pos2 = 0
      let pos3 = 0
      let pos4 = 0

      elmnt.onmousedown = dragMouseDown

      function dragMouseDown (e) {
        e = e || this.shadowRoot.event
        // get the mouse cursor position at startup:
        pos3 = e.clientX
        pos4 = e.clientY
        document.onmouseup = closeDragElement
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag
      }

      function elementDrag (e) {
        e = e || this.shadowRoot.event
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
  }
}

window.customElements.define('window-style', windowStyle)
