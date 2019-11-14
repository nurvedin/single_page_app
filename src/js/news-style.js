const template = document.createElement('template')
template.innerHTML = `

<link rel="stylesheet" href="css/news.css">

<div class="newsStyle">
  <div id="news-pop-up"></div>
</div>
`
export default class news extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this._getNewsApi()
  }

  _getNewsApi () {
    const apiKey = '70de23976ca14990ac88a3473a4affe9'
    const topHeadLines = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=' + apiKey
    const shadow = this.shadowRoot

    async function fetchNews (shadow) {
      const result = await fetch(topHeadLines)
      const response = await result.json()
      const main = shadow.querySelector('#news-pop-up')

      main.innerHTML = response.articles.map(createArticle).join('\n')
    }

    function createArticle (article) {
      return `
      <a href="${article.url}">
       <h2>${article.title}</h2>
        <img src="${article.urlToImage || ''}">
        <p>${article.description || ''}</p>
      </a>`
    }

    fetchNews(shadow)
  }
}

window.customElements.define('news-style', news)
