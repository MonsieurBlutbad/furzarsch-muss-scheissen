import Bullet from './Bullet';


export default class Shit extends Bullet {

    constructor(game, x, y) {
        super(game, x, y, 'shit', 100);
    }

    hitSomething(something) {
        super.hitSomething(something);

        console.log(something);

        let shitFlat = this.game.add.sprite(this.x, something.top, 'shit_flat');
        shitFlat.anchor.setTo(0.5, 0.9);
    }



}