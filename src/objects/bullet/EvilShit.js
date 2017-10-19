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
    constructor(game, x, y, velocity)
    {
        super(game, x, y, 'evil_shit', 100, velocity);
        let tween = this.game.add.tween(this).to( { angle: 360 }, 1000, "Linear", true).loop(true);
    }
}