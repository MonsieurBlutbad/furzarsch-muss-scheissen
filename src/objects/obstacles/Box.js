import Obstacle from './Obstacle';

/**
 * Class Box.
 */
export default class Box extends Obstacle {

    /**
     * @param game
     * @param x
     * @param y
     */
    constructor(game, level, x, y) {
		super(game, x, y, 'box');
		this.level = level;
    }
}