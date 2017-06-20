import Bean from './Bean';

export default class Collectables extends Phaser.Group {

    constructor(game, level) {
		super(game);
        this.game = game;
        this.level = level;
    }

    createCollectable() {
        let sprite = new Bean(this.game, this.game.world.randomX, this.game.world.randomY);
        this.add(sprite);
    }
}