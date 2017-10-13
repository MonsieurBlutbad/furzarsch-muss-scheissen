
export default class BowlShitArea extends Phaser.Sprite {

    constructor(game, x, y) {
		super(game, x, y, 'box');
        this.game = game;
        this.game.physics.arcade.enable(this);
        this.enableBody = true;
        this.body.immovable = true;
        this.game.add.sprite(this);
        this.checkWorldBounds = true;
        this.events.onOutOfBounds.add(this.destroy.bind(this));
    }

    isHit(bullet, box) {
        let shitFlat = this.game.make.sprite(bullet.x - box.x, 0, 'shit_flat');
        shitFlat.anchor.setTo(0.5, 0.9);
        box.addChild(shitFlat);
    }

}