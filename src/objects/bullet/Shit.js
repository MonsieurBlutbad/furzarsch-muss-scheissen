import Bullet from './Bullet';


export default class Shit extends Bullet {

    constructor(game, x, y) {
        super(game, x, y, 'shit', 100);
    }

    hitSomething(something) {
        super.hitSomething(something);
    }



}