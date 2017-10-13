import Obstacle from './Obstacle';

/**
 * Class Box.
 */
export default class ScytheStick extends Obstacle {

    /**
     * @param game
     * @param x
     * @param y
     */
    constructor(game, x, y) {
		super(game, x, y, 'scythe_stick');
        this.events.onOutOfBounds.removeAll();
    }
}