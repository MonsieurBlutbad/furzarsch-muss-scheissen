import Collectable from './Collectable';

/**
 * Class Chili.
 */
export default class Chili extends Collectable {

    /**
     * @param game
     * @param x
     * @param y
     */
    constructor(game, x, y) {
        super(game, x, y, 'chili');
        this.givesFood = 15;
        this.givesDiarrhea = true;
    }
}