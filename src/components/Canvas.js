export default class Canvas {
    bind() {
        let canvas = document.createElement('canvas')
        this.setCanvas(canvas).setContext(canvas.getContext('2d'))
        this.size()
        document.body.appendChild(this.canvas)
        window.addEventListener('resize', this.size.bind(this))
    }

    size() {
        this.height = window.innerHeight
        this.width = this.height * 3 / 4
        this.canvas.width = this.width
        this.canvas.height = this.height
    }

    getCanvas() {
        return this.canvas
    }

    setCanvas(canvas) {
        this.canvas = canvas
        return this
    }

    getContext() {
        return this.ctx
    }

    setContext(ctx) {
        this.ctx = ctx
        return this
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.beginPath()
    }
}