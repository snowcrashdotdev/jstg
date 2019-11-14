export default class Ship {
    constructor(ctx) {
        this.posX = ctx.canvas.width / 2
        this.posY = ctx.canvas.height / 2
        this.requestsDraw = true
    }

    draw(ctx) {
        ctx.arc(this.posX, this.posY, 3, 0, 2 * Math.PI, false)
        ctx.strokeStyle = '#0000FF'
        ctx.stroke()
    }

    handleInput(ctrl) {
        if (ctrl.pressedUp) {
            this.posY--
        }

        if (ctrl.pressedDown) {
            this.posY++
        }

        if (ctrl.pressedLeft) {
            this.posX--
        }

        if (ctrl.pressedRight) {
            this.posX++
        }

        this.requestsDraw = true
    }
}