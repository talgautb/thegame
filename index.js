/**
 * The game - index.js
 */

 var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });
var sprite;

function preload() {
  //  You can fill the preloader with as many assets as your game requires

  //  Here we are loading an image. The first parameter is the unique
  //  string by which we'll identify the image later in our code.

  //  The second parameter is the URL of the image (relative)
  // game.load.image('arrow', 'assets/sprites/arrow.png');
  game.load.image('hero', 'assets/hero/hero.png');
  game.load.image('bullet', 'assets/hero/tomato.png');

}

function create() {
  //  To make the sprite move we need to enable Arcade Physics
  game.physics.startSystem(Phaser.Physics.ARCADE);

  sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'phaser');
  sprite.anchor.set(0.5);

  // Create our hero here
  createHero();

  //  And enable the Sprite to have a physics body:
  game.physics.arcade.enable(sprite, Phaser.Physics.ARCADE);

}

function update () {
  updateHero();
}

function render () {
  renderHero();
}