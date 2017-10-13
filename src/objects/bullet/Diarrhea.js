import Bullet from './Bullet';

/**
 *
 */
export default class Diarrhea extends Bullet {
    /**
     * @param game
     * @param x
     * @param y
     * @param velocity
     */
    constructor(game, x, y, velocity)
    {
        super(game, x, y, 'diarrhea', 100, velocity);
    }
}