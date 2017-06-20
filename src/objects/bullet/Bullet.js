import {GRAVITY} from './../../settings/Settings';

export default class Bullet extends Phaser.Sprite {
    constructor(game, x, y, key, damage, velocity) {
        super(game, x, y, key);

        this.game = game;
        this.game.physics.arcade.enable(this);
        this.damage = damage;
        this.birthtime = this.game.time.now;
        this.body.gravity.y = GRAVITY;
        this.body.velocity.x = velocity.x;
        this.body.velocity.y = velocity.y;

        this.anchor.setTo(0.5, 0.5);
        this.game.add.sprite(this);
    }

    hitSomething(something) {
        this.kill();
    }
}