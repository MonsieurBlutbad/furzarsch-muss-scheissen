import Sauerkraut from './Sauerkraut';
import Burger from './Burger';
import Chili from './Chili';

/**
 *
 */
export default class Collectables extends Phaser.Group {

    /**
     * @param game
     * @param level
     */
    constructor(game, level) {
		super(game);
        this.game = game;
        this.level = level;
    }

    /**
     * @param x
     * @param y
     */
    addBurger(x, y)
    {
        this.addCollectable(Burger, x, y);
    }

    /**
     * @param x
     * @param y
     */
    addSauerkraut(x, y)
    {
        this.addCollectable(Sauerkraut, x, y);
    }

    /**
     * @param x
     * @param y
     */
    addChili(x, y)
    {
        this.addCollectable(Chili, x, y);
    }

    /**
     * @param Collectable
     * @param x
     * @param y
     */
    addCollectable(Collectable, x, y)
    {
        let collectable = new Collectable(this.game, x, y);
        this.add(collectable);

    }
}