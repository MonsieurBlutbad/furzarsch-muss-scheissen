import Obstacle from './Obstacle';

/**
 * Class Box.
 */
export default class ScytheBox extends Obstacle {

    /**
     * @param game
     * @param x
     * @param y
     */
    constructor(game, x, y) {
		super(game, x, y, 'scythe_box');
    }
}