import Toilet from './Toilet';

/**
 *
 */
export default class Toilets extends Phaser.Group
{
    /**
     * @param game
     * @param level
     */
    constructor(game, level)
    {
        super(game);
        this.game = game;
        this.level = level;
        this.shitHitTheBowlEvent = new Phaser.Signal();
        this.missedToiletEvent = new Phaser.Signal();
    }

    /**
     * @param x
     * @param y
     */
    addToilet(x, y)
    {
        let toilet = new Toilet(this.game, this.shitHitTheBowlEvent, this.missedToiletEvent, x, y);
        this.add(toilet)
    }

}
