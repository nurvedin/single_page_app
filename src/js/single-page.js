import './window-style.js'
import './chat-style.js'
import './news-style.js'

export default class SinglePage {
  constructor () {
    // if any of the application buttons are clicked, create a window frame
    // and send to the right event listener in window-style
    const gameButton = document.querySelector('#gameButton')
    const newsButton = document.querySelector('#newsButton')
    const chatButton = document.querySelector('#chatButton')

    gameButton.addEventListener('click', event => {
      event.preventDefault()
      const windowFrame = document.createElement('window-style')
      windowFrame.setAttribute('application', 'memory')
      const singleTag = document.querySelector('body')
      singleTag.appendChild(windowFrame)
    })

    newsButton.addEventListener('click', event => {
      event.preventDefault()
      const windowFrame = document.createElement('window-style')
      windowFrame.setAttribute('application', 'news')
      const singleTag = document.querySelector('body')
      singleTag.appendChild(windowFrame)
    })

    chatButton.addEventListener('click', event => {
      event.preventDefault()
      const windowFrame = document.createElement('window-style')
      windowFrame.setAttribute('application', 'chat')
      const singleTag = document.querySelector('body')
      singleTag.appendChild(windowFrame)
    })
  }
}
