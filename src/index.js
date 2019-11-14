import Game from "./components/Game"
import Ship from "./components/Ship"

const game = new Game()

document.addEventListener('DOMContentLoaded', function(e) {
    game.controller.bind()
    game.canvas.bind()
    game.add(new Ship(game.canvas.getContext()))
    game.loop()
})