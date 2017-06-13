import Bean from './Bean';

export default class Collectables extends Phaser.Group {

    constructor(game, level) {
		super(game);
        this.game = game;
        this.level = level;
    }

    createCollectable() {
        let sprite = new Bean(this.game, Math.random() * this.game.width, Math.random() * this.game.height);
        this.add(sprite);
    }
}