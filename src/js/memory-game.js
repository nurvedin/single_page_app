const template = document.createElement('template')
template.innerHTML = `



<div id="memoryContainer">
  <div class="memory">
    <a href="#"><img src="image/0.png" alt="A memory brick" /></a>
  </div>
</div>
`
export default class memoryGame extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('memory-game', memoryGame)
