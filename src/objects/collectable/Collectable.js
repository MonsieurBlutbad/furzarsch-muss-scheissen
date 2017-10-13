/**
 *
 */
export default class Bean extends Phaser.Sprite {

    /**
     * @param game
     * @param x
     * @param y
     * @param key
     */
    constructor(game, x, y, key) {
		super(game, x, y, key);

        this.game = game;
        this.game.physics.arcade.enable(this);

        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
        this.givesFood = 0;
        this.givesFarts = 0;
        this.givesDiarrhea = false;

        this.anchor.setTo(0.5, 0.5);

        this.game.add.sprite(this);
    }

    /**
     *
     */
    isCollected() {
        this.kill();
    }

}