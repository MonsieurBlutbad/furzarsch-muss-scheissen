import Bullet from './Bullet';

/**
 *
 */
export default class Shit extends Bullet {
    /**
     * @param game
     * @param x
     * @param y
     * @param velocity
     */
    constructor(game, x, y, velocity)
    {
        super(game, x, y, 'shit', 100, velocity);
        let tween = this.game.add.tween(this).to( { angle: 360 }, 5000, "Linear", true).loop(true);
    }
}