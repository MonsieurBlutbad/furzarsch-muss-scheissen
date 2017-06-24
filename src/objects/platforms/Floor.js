
export default class Floor extends Phaser.Sprite {

    constructor(game) {
		super(game, 0, game.height - 40, 'grass');
        this.game = game;
        this.game.physics.arcade.enable(this);
        this.scale.setTo(game.width / this.width, 1);
        this.anchor.setTo(0,1);
        this.enableBody = true;
        this.body.immovable = true;
        this.game.add.sprite(this);
    }

    isHit(bullet, floor) {
        let shitFlat = this.game.make.sprite(bullet.x - floor.x,  0, 'shit_flat');
        shitFlat.anchor.setTo(0.5, 0.9);
        floor.addChild(shitFlat)
    }

}