const Jstg = {
  Game: function () {
    const game = this
    this.canvas = document.createElement('canvas')
    this.canvas.height = 480
    this.canvas.width = game.canvas.height * 3 / 4
    this.ctx = game.canvas.getContext('2d')

    this.entities = []

    this.Entity = function (width, height, posX, posY, color) {
      this.width = width
      this.height = height
      this.posX = posX
      this.posY = posY
      this.color = color
      this.boundsX = game.canvas.width - this.width
      this.boundsY = game.canvas.height - this.height
      game.entities.push(this)
    }

    this.Entity.prototype.render = function () {
      game.ctx.fillStyle = this.color
      game.ctx.fillRect(this.posX, this.posY, this.width, this.height)
    }

    this.keys = {}
    this.updateInputs = function (e) {
      const allowedKeys = [
        'ArrowLeft',
        'ArrowRight',
        'ArrowUp',
        'ArrowDown'
      ]
      if (allowedKeys.includes(e.key)) {
        if (e.type === 'keydown') {
          game.keys[e.key] = true
        } else {
          game.keys[e.key] = false
        }
      }
    }

    this.frameEnd = window.performance.now()
    this.loop = function (frameStart) {
      window.requestAnimationFrame(game.loop)
      let dt = frameStart - game.frameEnd
      game.update(dt)
      game.render()
    }

    this.update = function (dt) {
      game.entities.forEach(e => { e.handleInput(dt) })
    }

    this.render = function () {
      game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height)
      game.entities.forEach(e => { e.render() })
      game.frameEnd = window.performance.now()
    }

    this.start = function () {
      document.addEventListener('keydown', game.updateInputs)
      document.addEventListener('keyup', game.updateInputs)

      document.addEventListener('DOMContentLoaded', function () {
        document.body.appendChild(game.canvas)
        window.requestAnimationFrame(game.loop)
      })
    }
  }
}

stg = new Jstg.Game()

let player = new stg.Entity(20, 30, stg.canvas.width / 2 - 20, stg.canvas.height - 40, 'blue')
player.speed = 100
player.stayInBounds = function () {
  if (this.posX < 0) this.posX = 0
  if (this.posX > this.boundsX) this.posX = this.boundsX
  if (this.posY < 0) this.posY = 0
  if (this.posY > this.boundsY) this.posY = this.boundsY
}

player.handleInput = function (dt) {
  let speed = this.speed / dt
  if (stg.keys['ArrowLeft']) this.posX -= speed
  if (stg.keys['ArrowRight']) this.posX += speed
  if (stg.keys['ArrowUp']) this.posY -= speed
  if (stg.keys['ArrowDown']) this.posY += speed
  this.stayInBounds()
}

stg.start()
