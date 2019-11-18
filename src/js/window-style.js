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
  </div>
</div>

`

let zCounter = 0
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
    this._getFocusOnWindow()
  }

  _getFocusOnWindow () {
    const myWindows = this.shadowRoot.querySelector('.windowStyle')
    myWindows.focus()
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
      div.parentNode.style.zIndex = ++zCounter
      const windowStyle = this.shadowRoot.querySelector('.windowStyle')
      this.mousestartX = e.clientX - windowStyle.getBoundingClientRect().left
      this.mousestartY = e.clientY - windowStyle.getBoundingClientRect().top
      document.addEventListener('mousemove', e => {
        if (this.mouseisdown) {
          windowStyle.setAttribute('style', 'left: ' + (e.pageX - this.mousestartX) + 'px; ' + 'top: ' + (e.pageY - this.mousestartY) + 'px;' + 'z-index:' + zCounter + ';')
        }
      })
      document.addEventListener('mouseup', e => {
        div.parentNode.style.zIndex = ++zCounter
        this.mouseisdown = false
      })
    })
  }
}

window.customElements.define('window-style', windowStyle)
