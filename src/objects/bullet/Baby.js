import Bullet from './Bullet';

/**
 *
 */
export default class Baby extends Bullet {
    /**
     * @param game
     * @param x
     * @param y
     * @param velocity
     */
    constructor(game, x, y, velocity, shooter)
    {
        super(game, x, y, 'baby', 100, velocity, shooter);
    }
}