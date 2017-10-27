import {GRAVITY} from './../../settings/Settings';

/**
 *
 */
export default class Bullet extends Phaser.Sprite
{
    /**
     * @param game
     * @param x
     * @param y
     * @param key
     * @param damage
     * @param velocity
     */
    constructor(game, x, y, key, damage, velocity, shooter)
    {
        super(game, x, y, key);
        this.shooter = shooter;
        this.game = game;
        this.game.physics.arcade.enable(this);
        this.damage = damage;
        this.birthtime = this.game.time.now;
        this.body.gravity.y = GRAVITY;
        this.body.velocity.x = velocity.x;
        this.body.velocity.y = velocity.y;
        this.isArmed = false;
            this.isArmed = true;
        this.anchor.setTo(0.5, 0.5);
        this.game.add.sprite(this);
    }

    /**
     * @param bullet
     * @param something
     */
    hitSomething(bullet, something)
    {
        bullet.kill();
    }
}