/**
 * Hero.js - 16/04/2016
 */
var bullets;
var fireRate = 100;
var nextFire = 0;

// Initialization our hero
function createHero() {
  bullets = game.add.group();
  bullets.enableBody = true;
  bullets.physicsBodyType = Phaser.Physics.ARCADE;

  bullets.createMultiple(50, 'bullet');
  bullets.setAll('checkWorldBounds', true);
  bullets.setAll('outOfBoundsKill', true);
  
  sprite = game.add.sprite(center.x, center.y, 'hero');
  sprite.anchor.set(0.5);
}

function updateHero() {
  sprite.rotation = game.physics.arcade.angleToPointer(sprite);

  if (game.input.activePointer.isDown && !stateText.visible) {
    fire();
  }
}

function fire() {
  blaster.play();
  if (game.time.now > nextFire && bullets.countDead() > 0) {
    nextFire = game.time.now + fireRate;

    var bullet = bullets.getFirstDead();

    bullet.reset(sprite.x - 8, sprite.y - 8);

    game.physics.arcade.moveToPointer(bullet, 300);
  }
}