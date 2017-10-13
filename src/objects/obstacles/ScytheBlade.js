import Obstacle from './Obstacle';

/**
 * Class Box.
 */
export default class ScytheBlade extends Obstacle {

    /**
     * @param game
     * @param x
     * @param y
     */
    constructor(game, x, y) {
		super(game, x, y, 'scythe_blade');
        this.killsPlayerOnHit = true;
        this.events.onOutOfBounds.removeAll();
    }
}