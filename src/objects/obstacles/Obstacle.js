
export default class Obstacle extends Phaser.Sprite {

    constructor(game, x, y, key) {
		super(game, x, y, key);
        this.game = game;
        this.game.physics.arcade.enable(this);
        this.enableBody = true;
        this.body.immovable = true;
        this.game.add.sprite(this);
        this.checkWorldBounds = true;
        this.killsPlayerOnHit = false;
        this.anchor.setTo(0.5, 0.5);
        this.events.onOutOfBounds.add(this.destroy.bind(this));
    }

    isHit(bullet, obstacle) {
        let x = bullet.x - obstacle.x;
        let y = bullet.y - obstacle.y;
        let shitFlat = this.game.make.sprite(
            Math.max(-obstacle.width/2, Math.min(x, obstacle.width/2)),
            Math.max(-obstacle.height/2, Math.min(y, obstacle.height/2)),
            'shit_flat'
        );

        shitFlat.anchor.setTo(0.5,0.5);

        obstacle.addChild(shitFlat);
    }

    getHitBox()
    {
        return this;
    }

}