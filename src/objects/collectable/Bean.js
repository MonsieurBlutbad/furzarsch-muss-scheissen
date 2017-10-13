import Collectable from './Collectable';

export default class Bean extends Collectable {

    constructor(game, x, y) {
		super(game, x, y, 'bean');
        this.givesFood = 25;
        this.givesFarts = 100;
        this.scale.setTo(0.5, 0.5);
        this.x += (0.5 * 64) / 2;
        this.y += (0.5 * 64) / 2;
    }

}