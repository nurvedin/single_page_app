const template = document.createElement('template')
template.innerHTML = `
<style>
.newsStyle {
  background-color: transparent;
  height: 30px;
  width: 250px;
}

#news-pop-up {
  height: 314px;
  background: transparent;
  border-radius: 10px;
}

.btnReFresh {
  margin-right: 180px;
  padding: 5px;
  cursor: pointer;
  width: 25%;
  background-color: transparent;
  color: green;
  border-radius: 10px;
  font-family: "Comic Sans MS", cursive, sans-serif;
}
</style>

<div class="newsStyle" id="newsForm">
  <div id="news-pop-up"></div>
  <button type="button" class="btnReFresh">ReFresh</button>
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
