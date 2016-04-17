
function createEnemy(type) {

  var lvl = (type) ? type : 3;

  var x = game.world.randomX;
  var y = game.world.randomY;

  var width = game.world.width;
  var height = game.world.height;

  var min = Math.min(Math.min(x, width - x), Math.min(y, height - y));
  if (min == x) {
    x = -10;
  } else 
  if (min == (width - x)) {
    x = width + 10;
  } else 
  if (min == y) {
    y = -10;
  } else 
  if (min == (height - y)) {
    y = height + 10;
  }

  if (lvl === 3) {
    var enemy = game.add.sprite(x, y, 'enemyTriangle');
    enemy.scale.x = 0.2;
    enemy.scale.y = 0.2;
    enemy.lives = 1;
    game.physics.arcade.enable(enemy, Phaser.Physics.ARCADE);
    game.add.tween(enemy.body).to( center, 10000, Phaser.Easing.Linear.None, true);
    enemies.push(enemy);
  } else 
  if (lvl === 4) {
    var enemy = game.add.sprite(x, y, 'enemySquare');
    enemy.scale.x = 0.2;
    enemy.scale.y = 0.2;
    enemy.lives = 2;
    game.physics.arcade.enable(enemy, Phaser.Physics.ARCADE);
    game.add.tween(enemy.body).to( center, 8000, Phaser.Easing.Linear.None, true);
    enemies.push(enemy);
  } else 
  if (lvl === 5) {
    var enemy = game.add.sprite(x, y, 'enemyPentagon');
    enemy.scale.x = 0.2;
    enemy.scale.y = 0.2;
    enemy.lives = 3;
    game.physics.arcade.enable(enemy, Phaser.Physics.ARCADE);
    game.add.tween(enemy.body).to( center, 4000, Phaser.Easing.Linear.None, true);
    enemies.push(enemy);
  }
}


function generateEnemies(level) {
  var lvl = (level) ? level : 3;

  for (var i = 0; i < 10; i++) {
    var probability = parseInt(Math.random() * 100.0);
    if (probability < 20) {
      createEnemy(5);  
    } else 
    if (probability < 50) {
      createEnemy(4);  
    } else {
      createEnemy(3);
    }
    
  }
}

function moveEnemies() {
  // go go
}


function createExplosions() {
    for (var i = 0; i < 10; i++)
    {
        var explosionAnimation = explosions.create(0, 0, 'explode', [0], false);
        explosionAnimation.anchor.setTo(0.5, 0.5);
        explosionAnimation.animations.add('explode');
    }
}