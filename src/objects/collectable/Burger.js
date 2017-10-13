import Collectable from './Collectable';

/**
 * Class Burger.
 */
export default class Burger extends Collectable {

    /**
     * @param game
     * @param x
     * @param y
     */
    constructor(game, x, y) {
        super(game, x, y, 'burger');
        this.scale.setTo(0.66, 0.66);
        this.x += (0.34 * 64) / 2;
        this.y += (0.34 * 64) / 2;
        this.givesFood = 75;
    }
}