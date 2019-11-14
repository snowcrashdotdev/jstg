export default class Controller {
    constructor() {
        this.pressedUp = false
        this.pressedDown = false
        this.pressedLeft = false
        this.pressedRight = false
        this.bindings = {
            'UP': 'ArrowUp',
            'DOWN': 'ArrowDown',
            'LEFT': 'ArrowLeft',
            'RIGHT': 'ArrowRight'
        }
    }

    bind() {
        window.addEventListener('keydown', this.processInputDown.bind(this))
        window.addEventListener('keyup', this.processInputUp.bind(this))
    }

    processInputDown(e) {
        if (Object.values(this.bindings).includes(e.key)) { e.preventDefault() }
        if (e.key === this.bindings.UP && ! this.pressedDown) {
            this.pressedUp = true
        } else if (e.key === this.bindings.DOWN && ! this.pressedUp) {
            this.pressedDown = true
        } else if (e.key === this.bindings.LEFT && ! this.pressedRight) {
            this.pressedLeft = true
        } else if (e.key === this.bindings.RIGHT && ! this.pressedLeft) {
            this.pressedRight = true
        }
    }

    processInputUp(e) {
        if (e.key === this.bindings.UP && this.pressedUp) {
            this.pressedUp = false
        } else if (e.key === this.bindings.DOWN && this.pressedDown) {
            this.pressedDown = false
        } else if (e.key === this.bindings.LEFT && this.pressedLeft) {
            this.pressedLeft = false
        } else if (e.key === this.bindings.RIGHT && this.pressedRight) {
            this.pressedRight = false
        }
    }
}