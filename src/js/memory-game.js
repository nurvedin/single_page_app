const template = document.createElement('template')
template.innerHTML = `

<link rel="stylesheet" href="css/game.css">

<div id="memoryContainer">
  <template>
    <div class="memory">
      <a href="#"><img src="image/0.png" alt="A memory brick" /></a>
    </div>
  </template>
</div>
`
export default class memoryGame extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this.tiles = [false]
    this.rows = null
    this.cols = null
    this.turn1 = null
    this.turn2 = null
    this.tries = 0
    this.pairs = 0
    this.lastTile = null
  }

  connectedCallback () {
    this._playGame()
  }

  _cleanUpMemory () {
    const memory = this.shadowRoot.querySelector('.memory')
    memory.parentNode.removeChild(memory)
  }

  _playGame () {
    const div = this.shadowRoot.querySelector('#memoryContainer')
    const h2 = document.createElement('h2')
    h2.innerText = 'Choose game size'
    div.appendChild(h2)
    const twoBytwo = document.createElement('button')
    const twoByfour = document.createElement('button')
    const fourByfour = document.createElement('button')
    twoBytwo.innerText = '2 by 2'
    twoByfour.innerText = '4 by 2'
    fourByfour.innerText = '4 by 4'

    div.appendChild(twoBytwo)
    div.appendChild(twoByfour)
    div.appendChild(fourByfour)

    twoBytwo.addEventListener('click', e => {
      div.removeChild(h2)
      div.removeChild(twoBytwo)
      div.removeChild(twoByfour)
      div.removeChild(fourByfour)
      this._printCards(2, 2, 'memoryContainer')
    })

    twoByfour.addEventListener('click', e => {
      div.removeChild(h2)
      div.removeChild(twoBytwo)
      div.removeChild(twoByfour)
      div.removeChild(fourByfour)
      this._printCards(4, 2, 'memoryContainer')
    })

    fourByfour.addEventListener('click', e => {
      div.removeChild(h2)
      div.removeChild(twoBytwo)
      div.removeChild(twoByfour)
      div.removeChild(fourByfour)
      this._printCards(4, 4, 'memoryContainer')
    })
  }

  _wonGame () {
    const div = this.shadowRoot.querySelector('#memoryContainer')
    const h2 = document.createElement('h2')
    h2.setAttribute('id', 'h2-tag')
    h2.innerText = 'You won on ' + this.tries + ' number of tries!'
    div.appendChild(h2)
    const playAgainBtn = document.createElement('button')
    playAgainBtn.setAttribute('id', 'playAgain')
    playAgainBtn.innerText = 'Play Again'
    div.appendChild(playAgainBtn)
    playAgainBtn.addEventListener('click', e => {
      div.removeChild(h2)
      div.removeChild(playAgainBtn)
      this._playGame()
    })
  }

  _printCards (numRows, numCols, container) {
    let a
    this.rows = numRows
    this.cols = numCols
    this.tiles = this._getPictureArray(this.rows, this.cols)
    container = this.shadowRoot.getElementById(container)
    var templateDiv = this.shadowRoot.querySelectorAll('#memoryContainer template')[0].content.firstElementChild

    var div = document.importNode(templateDiv, false)

    this.tiles.forEach(function (tile, index) {
      a = document.importNode(templateDiv.firstElementChild, true)
      a.firstElementChild.setAttribute('data-bricknumber', index)
      div.appendChild(a)

      if ((index + 1) % numCols === 0) {
        div.appendChild(document.createElement('br'))
      }
    })

    div.addEventListener('mouseover', event => {
      event.preventDefault()
      var img = event.target.nodeName === 'IMG' ? event.target : event.target.firstElementChild
      var index = parseInt(img.getAttribute('data-bricknumber'))
      this._hoverBrick(this.tiles[index], index, img, true)
      setTimeout(e => {
        this._hoverBrick(this.tiles[index], index, img, false)
      }, 500)
    })

    div.addEventListener('click', event => {
      event.preventDefault()
      var img = event.target.nodeName === 'IMG' ? event.target : event.target.firstElementChild
      var index = parseInt(img.getAttribute('data-bricknumber'))
      this._turnBrick(this.tiles[index], index, img)
    })
    container.appendChild(div)
  }

  _hoverBrick (tile, index, img, peak = null) {
    img.src = peak ? 'image/' + tile + '.png' : 'image/0.png'
  }

  _turnBrick (tile, index, img) {
    if (this.turn2) { return }

    img.src = 'image/' + tile + '.png'

    if (!this.turn1) {
      this.turn1 = img
      this.lastTile = tile
    } else {
      if (img === this.turn1) { return }

      this.tries += 1

      this.turn2 = img

      if (tile === this.lastTile) {
        this.pairs += 1

        if (this.pairs === (this.cols * this.rows) / 2) {
          this._wonGame()
          this._cleanUpMemory()
          this.pairs = 0
          this.tries = 0
        }

        setTimeout(e => {
          this.turn1.parentNode.classList.add('removed')
          this.turn2.parentNode.classList.add('removed')
          this.turn1 = null
          this.turn2 = null
        }, 300)
      } else {
        setTimeout(e => {
          this.turn1.src = 'image/0.png'
          this.turn2.src = 'image/0.png'
          this.turn1 = null
          this.turn2 = null
        }, 500)
      }
    }
  }

  _getPictureArray (rows, cols) {
    let i
    const arr = []

    for (i = 1; i <= (rows * cols) / 2; i += 1) {
      arr.push(i)
      arr.push(i)
    }

    for (i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1))
      var temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
    }
    return arr
  }
}

window.customElements.define('memory-game', memoryGame)
