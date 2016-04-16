/**
 * The game - index.js
 */

 var game = new Phaser.Game(1800, 800, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

	game.load.image('enemyTriangle', 'assets/enemies/triangle.png');    

}

var enemyTriangle;


var currentLevel = 1;
var enemies;


function create() {
    //  To make the sprite move we need to enable Arcade Physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    enemies = game.add.group();
    enemies.enableBody = true;

    generateEnemies(currentLevel, enemies);

     
 }

function update () {

	if (game.input.mousePointer.isDown)
    {
        //  First is the callback
        //  Second is the context in which the callback runs, in this case game.physics.arcade
        //  Third is the parameter the callback expects - it is always sent the Group child as the first parameter
        enemies.forEach(game.physics.arcade.moveToPointer, game.physics.arcade, false, 200);
    }
    else
    {
        enemies.setAll('body.velocity.x', 0);
        enemies.setAll('body.velocity.y', 0);
    }
    

}

function render () {

	game.debug.inputInfo(32, 32);

}