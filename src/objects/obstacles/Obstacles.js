import Spikes from './Spikes';


export default class Obstacles extends Phaser.Group {

    constructor(game, level) {
        super(game);
        this.game = game;
        this.level = level;
        for (let i = 0; i < 3; i++) {
            let spikes = new Spikes(this.game, this.game.world.randomX, this.game.world.randomY);
            this.add(spikes);
        }
    }
}
