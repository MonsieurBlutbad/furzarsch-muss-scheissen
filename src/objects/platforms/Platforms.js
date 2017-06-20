import Floor from './Floor';
import Box from './Box';

export default class Platforms extends Phaser.Group {

    constructor(game, level) {
        super(game);
        this.game = game;
        this.level = level;
        this.floor = new Floor(this.game);
        this.add(this.floor);
        for (let i = 0; i < 3; i++) {
            let box = new Box(this.game, this.game.world.randomX, this.game.world.randomY);
            this.add(box);
        }
    }
}
