
export default class Spikes extends Phaser.Sprite {

    constructor(game, x, y) {
		super(game, x, y, 'spikes');
        this.game = game;
        this.game.physics.arcade.enable(this);
        this.enableBody = true;
        this.body.immovable = true;
        this.game.add.sprite(this);
    }


}