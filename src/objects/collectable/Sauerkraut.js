import Collectable from './Collectable';

export default class Sauerkraut extends Collectable {

    constructor(game, x, y) {
		super(game, x, y, 'sauerkraut');
        this.givesFood = 25;
        this.givesFarts = 100;
    }

}