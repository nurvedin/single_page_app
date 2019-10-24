import './window-style.js'
import './chat-style.js'

export default class SinglePage {
  constructor () {
    const wFrame = document.createElement('window-style')
    const singleTag = document.querySelector('body')
    singleTag.appendChild(wFrame)

    const chatFrame = document.createElement('chat-style')
    const chatTag = document.querySelector('body')
    chatTag.appendChild(chatFrame)
  }
}
