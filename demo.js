/**
 * An example file, first to describe how a game
 * within this framework can be composed, later
 * to serve as a functioning demo.
 */
const config = {
    width: 480,
    height: 640
};

const game = new Jstg.Game(config);

function create() {
    this.add.stage(function(stage) {
        stage.add.wave();
        stage.add.wave();
    });
}

function update() {

}

let stage1wave1 = new game.Wave();


let player = new Jstg.Entity();

let enemy = new Jstg.Entity();