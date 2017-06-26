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

        console.log(something);

        let shitFlat = this.game.add.sprite(this.x, something.top, 'shit_flat');
        shitFlat.anchor.setTo(0.5, 0.9);
    }
}