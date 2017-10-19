import FartEmitter from './../../emitter/FartEmitter';
import Bullets from './../bullet/Bullets';
import {
    GRAVITY,
    FART_COOLDOWN,
    JUMP_SPEED_MIN,
    JUMP_SPEED_MAX,
    JUMP_SPEED_TIME_TO_MAX,
    ROTATION_SPEED_MIN,
    ROTATION_SPEED_MAX,
    ROTATION_SPEED_TIME_TO_MAX,
    SHIT_COOLDOWN,
    POINTS_FOR_SHIT_IN_TOILET,
    DIARRHEA_DURATION,
    DIARRHEA_SHIT_FREQUENCE,
    PRESSING_TIME_MAX,
    SHIT_SPEED_MIN,
    SHIT_SPEED_MAX
} from './../../settings/Settings';
import { remap, EasingFunctions } from './../../helper/Functions';

/**
 * Flesh Sprite for death animation.
 */
export default class Flesh extends Phaser.Sprite {
    /**
     * Flesh Constructor.
     *
     * @param game
     */
    constructor(game, player, key) {
		super(game,
            -player.body.width/2 + Math.random() * player.body.width,
            -player.body.height/2 + Math.random() * player.body.height,
            key
        );
        console.log('create flesh');

        this.game = game;
        this.game.physics.arcade.enable(this);
        this.body.gravity.y = GRAVITY;
        this.body.bounce.y = 0.2;
        this.anchor.setTo(0.5, 0.5);
        this.angle = Math.random()* 180;
        this.rotate = Math.random()* 360;
        const scaleFactor = 0.33 + Math.random() * 0.66;
        this.scale.setTo(scaleFactor, scaleFactor);
        const speed = 100;
        this.body.velocity.x = player.body.velocity.x + speed / 2 * Math.sin(this.angle * Math.PI / 180);
        this.body.velocity.y = player.body.velocity.y - speed * Math.cos(this.angle * Math.PI / 180);
    }
}