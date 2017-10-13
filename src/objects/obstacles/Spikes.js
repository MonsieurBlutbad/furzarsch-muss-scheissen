import Obstacle from './Obstacle';

/**
 * Class Spikes.
 */
export default class Spikes extends Obstacle {

    /**
     * @param game
     * @param x
     * @param y
     */
    constructor(game, x, y) {
		super(game, x, y, 'spikes');
        this.killsPlayerOnHit = true;
    }
}