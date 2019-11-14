import Canvas from "./Canvas";
import Controller from "./Controller";

export default class Game {
    constructor() {
        this.canvas = new Canvas()
        this.controller = new Controller()
        this.entities = []
        this.then = -1
    }

    add(entity) {
        this.entities.push(entity)
        return entity
    }

    handleInput() {
        this.entities.forEach(function(e) {
            if (typeof e.handleInput === 'function') {
                e.handleInput(this.controller)
            }
        }.bind(this))
    }

    draw() {
        this.canvas.clear()
        this.entities.forEach(function(e) {
            if (e.requestsDraw === true) {
                e.draw(this.canvas.getContext())
                e.requestsDraw = false
            }
        }.bind(this))
    }

    now() {
        return window.performance.now()
    }

    loop() {
        this.handleInput()
        this.draw()
        window.requestAnimationFrame(this.loop.bind(this))
    }
}