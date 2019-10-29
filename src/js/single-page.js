import './window-style.js'
import './chat-style.js'
import './news-style.js'

export default class SinglePage {
  constructor () {
    const wFrame = document.createElement('window-style')
    const singleTag = document.querySelector('body')
    singleTag.appendChild(wFrame)
  }
}
