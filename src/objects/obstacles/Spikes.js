
export default class Spikes extends Phaser.Sprite {

    constructor(game, x, y) {
		super(game, x, y, 'spikes');
        this.game = game;
        this.game.physics.arcade.enable(this);
        this.enableBody = true;
        this.body.immovable = true;
        this.game.add.sprite(this);
    }

    isHit(bullet, object) {
        let shitFlat = this.game.make.sprite(bullet.x - object.x, 0, 'shit_flat');
        shitFlat.anchor.setTo(0.5, 0.9);
        object.addChild(shitFlat);
    }

}