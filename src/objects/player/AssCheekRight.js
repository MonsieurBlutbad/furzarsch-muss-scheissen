import BloodEmitter from './../../emitter/BloodEmitter';

import {
    GRAVITY,
} from './../../settings/Settings';

/**
 * Flesh Sprite for death animation.
 */
export default class AssCheekRight extends Phaser.Sprite {
    /**
     * Flesh Constructor.
     *
     * @param game
     */
    constructor(game, player) {
		super(game,
            30,
            0,
            'ass_cheek_right'
        );
        console.log('create flesh');

        this.game = game;
        this.game.physics.arcade.enable(this);
        this.body.gravity.y = GRAVITY;
        this.body.bounce.y = 0.2;
        this.anchor.setTo(0.5, 0.5);
        this.angle = player.angle;

        const speed = 100;
        this.body.velocity.x = player.body.velocity.x + speed / 2 * Math.sin(this.angle * Math.PI / 180);
        this.body.velocity.y = player.body.velocity.y - speed * Math.cos(this.angle * Math.PI / 180);

        this.bloodEmitter = new BloodEmitter(this.game, 0, 0);
        this.addChild(this.bloodEmitter);
    }
}