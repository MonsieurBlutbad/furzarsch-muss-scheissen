export default class Bean extends Phaser.Sprite {

    constructor(game, x, y) {
		super(game, x, y, 'bean');

        this.game = game;
        this.game.physics.arcade.enable(this);

        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;

        this.givesFood = 0.25;
        this.game.add.sprite(this);
    }

    isCollected() {
        this.kill();
    }

}