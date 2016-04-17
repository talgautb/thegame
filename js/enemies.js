function createEnemy(type) {
  var lvl = (type) ? type : 3;
  if (lvl === 3) {
    var enemy = game.add.sprite(game.world.randomX, game.world.randomY, 'enemyTriangle');
    game.physics.arcade.enable(enemy, Phaser.Physics.ARCADE);
    game.add.tween(enemy.body).to( center, 10000, Phaser.Easing.Linear.None, true);
    enemies.push(enemy);
  }
}


function generateEnemies(level) {
  var lvl = (level) ? level : 3;

  for (var i = 0; i < 10; i++) {
    createEnemy(lvl);
  }
}

function moveEnemies() {
  // go go
}