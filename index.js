/**
 * The game - index.js
 */

var game = new Phaser.Game(1500, 600, Phaser.AUTO, 'phaser-example',
  {
    preload: preload,
    create: create,
    update: update,
    render: render
  });
var sprite;
var enemyTriangle;
var baseLevel = 3; // 3 == triangle
var enemies = [];

var center = {
	x: 750,
	y: 300
}

function preload() {
  //  You can fill the preloader with as many assets as your game requires
	game.load.image('enemyTriangle', 'assets/enemies/triangle.png');    
	game.load.image('hero', 'assets/hero/hero.png');
  game.load.image('bullet', 'assets/hero/tomato.png');
}

function create() {
  //  To make the sprite move we need to enable Arcade Physics
  game.physics.startSystem(Phaser.Physics.ARCADE);
	// generate 10 enemies
  generateEnemies(baseLevel);
	// Create our hero here
	createHero();
	//  And enable the Sprite to have a physics body:
	game.physics.arcade.enable(sprite, Phaser.Physics.ARCADE);
 }

function update () {
  moveEnemies();
	updateHero();
  game.physics.arcade.collide(bullets, enemies, killEnemy, null, this);
}

function killEnemy(enemy, bullet) {
  enemy.kill();
  bullet.kill();
  createEnemy(baseLevel);
}

function render () {
  renderHero();
}