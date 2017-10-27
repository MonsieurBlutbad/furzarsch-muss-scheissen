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
        this.body.height = this.height * 0.66;
        this.body.width = this.width * 0.66;
        this.body.offset.setTo(this.width * 0.17, this.height * 0.17);
    }
}