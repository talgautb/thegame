function createEnemy(type) {
	if (type == 3) {

	}
}


function generateEnemies(level, enemies) {
	for (var i = 0; i < 30; i++)
    {
        var s = enemies.create(game.world.randomX, game.world.randomY, 'enemyTriangle');
        s.name = 'enemy' + s;
        s.body.collideWorldBounds = true;
        s.body.bounce.setTo(0.8, 0.8);
        s.scale.setTo(0.3,0.3);
        
    }
}