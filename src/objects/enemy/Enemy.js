import Splatter from './../bullet/Splatter';
import {GRAVITY} from './../../settings/Settings';

export default class Enemy extends Phaser.Sprite
{
    constructor(game, x, y, key)
    {
		super(game, x, y, key);
        this.game = game;
        this.game.physics.arcade.enable(this);
        this.anchor.setTo(0.5, 0.5);
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
        this.health = 100;
        this.killsPlayerOnHit = true;
    }

    isHit(bullet, enemy)
    {
        let x = bullet.x - enemy.x;
        let y = bullet.y - enemy.y;

        let splatter = new Splatter(
            this.game,
            Math.max(-enemy.body.width/2, Math.min(x, enemy.body.width/2)),
            Math.max(-enemy.body.height/2, Math.min(y, enemy.body.height/2))
        );

        splatter.scale.setTo(1/this.scale,1/this.scale);
        enemy.addChild(splatter);
        this.health -= bullet.damage;
        if (this.health <= 0) {
            this.die();
        }
    }

    die()
    {
        this.alive = false;
        this.body.gravity.y = GRAVITY;
    }


}