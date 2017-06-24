import Bullet from './Bullet';


export default class Shit extends Bullet {

    constructor(game, x, y, velocity) {
        super(game, x, y, 'shit', 100, velocity);
    }

    hitSomething(something) {
        super.hitSomething(something);
    }



}