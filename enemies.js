function createEnemy(type) {
	if (type == 3) {

	}
}


function generateEnemies(level) {



	for (var i = 0; i < 10; i++)
    {
        var enemy = game.add.sprite(game.world.randomX, game.world.randomY, 'enemyTriangle');
        game.physics.arcade.enable(enemy, Phaser.Physics.ARCADE);
        game.add.tween(enemy.body).to( center, 10000, Phaser.Easing.Linear.None, true);


        enemies.push(enemy);


        
    }
}

function moveEnemies() {

	
}