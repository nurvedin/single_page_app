const template = document.createElement('template')
template.innerHTML = `
<style>

</style>

<div class="windowStyle" id="myForm">
  <form class="form-container">

    <textarea name="pop-up" required></textarea>

    <button type="button" class="btnCancel" onclick="closeForm()">Close</button>
  </form>
</div>
`
export default class news extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('news-style', news)
