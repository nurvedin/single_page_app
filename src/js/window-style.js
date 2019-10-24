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
}

.btnCancel {
  padding: 5px;
  cursor: pointer;
  width: 25%;
  background-color: transparent;
  color: red;
  border-radius: 10px;
}

.btnSet {
  padding: 5px;
  cursor: pointer;
  width: 25%;
  background-color: transparent;
  color: blue;
  border-radius: 10px;
}
</style>

<div class="windowStyle" id="myForm">
  <form class="form-container">
    <div id="pop-up" required></div>
    <button type="button" class="btnCancel">Close</button>
    <button type="settings" class="btnSet">Settings</button>
  </form>
</div>
`
export default class windowStyle extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('window-style', windowStyle)
