import Bullet from './Bullet';

/**
 *
 */
export default class EvilShit extends Bullet {
    /**
     * @param game
     * @param x
     * @param y
     * @param velocity
     */
    constructor(game, x, y, velocity, shooter)
    {
        super(game, x, y, 'evil_shit', 100, velocity, shooter);
        this.shooter = shooter;
        let tween = this.game.add.tween(this).to( { angle: 360 }, 1000, "Linear", true).loop(true);
        this.scale.setTo(0.5, 0.5);
        tween = this.game.add.tween(this.scale).to( { x: 1, y: 1 }, 300, "Linear", true);
    }
}