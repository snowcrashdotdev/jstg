(function () {
  const canvas = document.createElement('canvas')
  canvas.width = 480
  canvas.height = canvas.width * 4 / 3
  const ctx = canvas.getContext('2d')

  const Entity = function (width, height, posX, posY, color) {
    this.width = width
    this.height = height
    this.posX = posX
    this.posY = posY
    this.color = color
    this.boundsX = canvas.width - this.width
    this.boundsY = canvas.height - this.height
  }

  Entity.prototype.render = function () {
    ctx.fillStyle = this.color
    ctx.fillRect(this.posX, this.posY, this.width, this.height)
  }

  let player = new Entity(20, 30, canvas.width / 2 - 20, canvas.height - 40, 'blue')
  player.speed = 50
  player.stayInBounds = function () {
    if (this.posX < 0) this.posX = 0
    if (this.posX > this.boundsX) this.posX = this.boundsX
    if (this.posY < 0) this.posY = 0
    if (this.posY > this.boundsY) this.posY = this.boundsY
  }

  let keys = {}
  player.handleInput = function (dt) {
    let speed = this.speed / dt
    if (keys['ArrowLeft']) this.posX -= speed
    if (keys['ArrowRight']) this.posX += speed
    if (keys['ArrowUp']) this.posY -= speed
    if (keys['ArrowDown']) this.posY += speed
    this.stayInBounds()
  }

  /*
  * Main game engine loop
  *
  * dt refers to elapsed time between now and end of previous paint.
  * best case scenario: ~16ms
  */
  let frameEnd = window.performance.now()
  function main (frameStart) {
    window.requestAnimationFrame(main)
    let dt = frameStart - frameEnd
    update(dt)
    render()
  }

  function update (dt) {
    player.handleInput(dt)
  }

  function render () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    player.render()
    frameEnd = window.performance.now()
  }

  function updateInputs (e) {
    const allowedKeys = [
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown'
    ]
    if (allowedKeys.includes(e.key)) {
      if (e.type === 'keydown') {
        keys[e.key] = true
      } else {
        keys[e.key] = false
      }
    }
  }
  document.addEventListener('keydown', updateInputs)
  document.addEventListener('keyup', updateInputs)

  document.addEventListener('DOMContentLoaded', function () {
    document.body.appendChild(canvas)
    window.requestAnimationFrame(main)
  })
})()
