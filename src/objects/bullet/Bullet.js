import {GRAVITY} from './../../settings/Settings';

export default class Bullet extends Phaser.Sprite {
    constructor(game, x, y, key, damage) {
        super(game, x, y, key);
        this.game = game;
        this.game.physics.arcade.enable(this);
        this.damage = damage;
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
        this.birthtime = this.game.time.now;
        this.body.gravity.y = GRAVITY;
        this.body.velocity.x = this.body.velocity.x / 2;
        this.body.velocity.y = this.body.velocity.y / 2;
        this.anchor.setTo(0.5, 0.5);
        this.game.add.sprite(this);
    }

    hitSomething(something) {
        this.kill();
    }
}