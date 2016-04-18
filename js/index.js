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
var explosions = [];
var stateText;
var center = {
	x: 480,
	y: 300
}
var spaceBtn;
var score;

var music;
var blaster;
var explosion;

function preload() {
  //  You can fill the preloader with as many assets as your game requires
	game.load.image('enemyTriangle', 'assets/enemies/triangle.png');    
  game.load.image('enemySquare', 'assets/enemies/square.png');    
  game.load.image('enemyPentagon', 'assets/enemies/pentagon.png');    
  game.load.image('enemyHexagon', 'assets/enemies/hexagon.png');    

	game.load.image('hero', 'assets/hero/hero.png');
  game.load.image('bullet', 'assets/hero/tomato.png');
  game.load.image('space', 'assets/common/deep-space.jpg');


  game.load.audio('theme', 'assets/audio/oedipus_ark_pandora.mp3');
  game.load.audio('explosion', 'assets/audio/explosion.mp3');
  game.load.audio('blaster', 'assets/audio/blaster.mp3');


  game.load.spritesheet('explode', 'assets/common/explosion.png', 64, 64, 23);
}

function create() {
  game.add.tileSprite(0, 0, game.width, game.height, 'space');

  music = game.add.audio('theme');
  blaster = game.add.audio('blaster');
  explosion = game.add.audio('explosion');

  music.play();

  game.input.mouse.capture = true;

  showPreview();
  resetScore();
  //  To make the sprite move we need to enable Arcade Physics
  game.physics.startSystem(Phaser.Physics.ARCADE);
	// generate 10 enemies
  generateEnemies(baseLevel);
  explosions = game.add.group();
  createExplosions();
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

  if ((spaceBtn.isDown || game.input.activePointer.leftButton.isDown) && stateText.visible) {
    restart();
  }
}

function showPreview() {
  stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
  stateText.anchor.setTo(0.5, 0.5);
  stateText.visible = false;
}

function killEnemy(enemy, bullet) {
  if (enemy.lives > 0) {
    enemy.lives = enemy.lives - 1;

    if (enemy.lives == 0) {
      enemy.kill();

      generateEnemy();
      
      updateScore();  

      explosion.play();
      var explosionAnimation = explosions.getFirstExists(false);
        explosionAnimation.reset(enemy.x, enemy.y);
        explosionAnimation.play('explode', 30, false, true);
    } else {

      if (enemy.lives == 1) {
        enemy.loadTexture('enemyTriangle', 0);  
      } else if (enemy.lives == 2) {
        enemy.loadTexture('enemySquare', 0);  
      } else if (enemy.lives == 3) {
        enemy.loadTexture('enemyPentagon', 0);  
      }
      

    }

    bullet.kill();
      
  } 
  
}

function gameOver(hero, enemy) {
  game.stage.backgroundColor = '#992d2d';
  killEnemies();
  sprite.kill();
  stateText.text=" GAME OVER \n Press SPACE or CLICK \n to restart";
  stateText.visible = true;

  music.stop();
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