/**
 * The game - index.js
 */

var game = new Phaser.Game(1500, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });
var sprite;
var enemyTriangle;
var currentLevel = 1;
var enemies;

function preload() {
  //  You can fill the preloader with as many assets as your game requires

	game.load.image('enemyTriangle', 'assets/enemies/triangle.png');    
	game.load.image('hero', 'assets/hero/hero.png');
  	game.load.image('bullet', 'assets/hero/tomato.png');
}


function create() {
    //  To make the sprite move we need to enable Arcade Physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    enemies = game.add.group();
    enemies.enableBody = true;

    generateEnemies(currentLevel, enemies);

  	// Create our hero here
  	createHero();

  	//  And enable the Sprite to have a physics body:
  	game.physics.arcade.enable(sprite, Phaser.Physics.ARCADE);
    
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
    
  	updateHero();

}

function render () {
  renderHero();
}