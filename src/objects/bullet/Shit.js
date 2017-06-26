import Bullet from './Bullet';

/**
 *
 */
export default class Shit extends Bullet {
    /**
     * @param game
     * @param x
     * @param y
     * @param velocity
     */
    constructor(game, x, y, velocity)
    {
        super(game, x, y, 'shit', 100, velocity);
    }

    /**
     * @param something
     */
    hitSomething(something)
    {
        super.hitSomething(something);
    }
}