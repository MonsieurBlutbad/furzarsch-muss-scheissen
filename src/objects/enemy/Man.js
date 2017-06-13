export default class Man extends Phaser.Sprite {

    constructor(game, x, y) {
		super(game, x, y, 'man');

        this.game = game;
        this.game.physics.arcade.enable(this);

        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
        this.health = 100;
    }

    isHit(bullet) {
        this.health -= bullet.damage;
        if (this.health <= 0) {
            this.kill();
        }
    }

}