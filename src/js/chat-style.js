const template = document.createElement('template')
template.innerHTML = `
<style>

</style>
`
export default class chat extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('chat-style', chat)
