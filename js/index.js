/**
 * The game - index.js
 */

var game = new Phaser.Game(960, 600, Phaser.AUTO, 'phaser-example',
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
var stateText;
var center = {
	x: 480,
	y: 300
}
var spaceBtn;
var score;

function preload() {
  //  You can fill the preloader with as many assets as your game requires
	game.load.image('enemyTriangle', 'assets/enemies/triangle.png');    
	game.load.image('hero', 'assets/hero/hero.png');
  game.load.image('bullet', 'assets/hero/tomato.png');
}

function create() {
  showPreview();
  resetScore();
  //  To make the sprite move we need to enable Arcade Physics
  game.physics.startSystem(Phaser.Physics.ARCADE);
	// generate 10 enemies
  generateEnemies(baseLevel);
	// Create our hero here
	createHero();
	//  And enable the Sprite to have a physics body:
	game.physics.arcade.enable(sprite, Phaser.Physics.ARCADE);
  spaceBtn = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
 }

function update () {
  moveEnemies();
	updateHero();
  game.physics.arcade.collide(bullets, enemies, killEnemy, null, this);
  game.physics.arcade.overlap(enemies, sprite, gameOver, null, this);

  if (spaceBtn.isDown && stateText.visible) {
    restart();
  }
}

function showPreview() {
  stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
  stateText.anchor.setTo(0.5, 0.5);
  stateText.visible = false;
}

function killEnemy(enemy, bullet) {
  enemy.kill();
  bullet.kill();
  createEnemy(baseLevel);
  updateScore();
}

function gameOver(hero, enemy) {
  game.stage.backgroundColor = '#992d2d';
  killEnemies();
  sprite.kill();
  stateText.text=" GAME OVER \n Press SPACE to restart";
  stateText.visible = true;
}

function render () {
  renderScore();
}

function killEnemies() {
  for (var i = 0; i < enemies.length; i++) {
    enemies[i].kill();
  }
}

function restart() {
  stateText.visible = false;
  game.stage.backgroundColor = '#000';
  create();
}

function updateScore() {
  score = score + 1;
}

function resetScore() {
  score = 0;
}

function renderScore() {
  game.debug.text('Current score: ' + score, 32, 32);
}