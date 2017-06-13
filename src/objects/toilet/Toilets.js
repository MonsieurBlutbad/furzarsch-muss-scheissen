import Toilet from './Toilet';

export default class Toilets extends Phaser.Group {

    constructor(game, level) {
        super(game);
        this.game = game;
        this.level = level;
        this.addToilet();

        this.shitHitTheBowlEvent = new Phaser.Signal();
    }

    debug() {
        this.forEachAlive(
            function(toilet) {
                toilet.debug();
            }
        )
    }

    addToilet(){
        this.toilet = new Toilet(this.game, Math.random() * this.game.width, this.game.height - this.level.platforms.floor.height);
        this.toilet.anchor.setTo(1,1);
        this.add(this.toilet);
        this.toilet.shitHitTheBowlEvent.add(this.shitHitTheBowl, this);
    }

    shitHitTheBowl(toilet, bullet) {
        this.shitHitTheBowlEvent.dispatch(toilet, bullet);
    }
}
