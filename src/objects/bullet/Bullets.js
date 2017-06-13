import Shit from './Shit';

export default class Bullets extends Phaser.Group {

    constructor(game, player) {
		super(game);
        this.game = game;
        this.player = player;
    }

    createBullet() {
        let sprite = new Shit(this.game, this.player.x, this.player.y);
        this.add(sprite);
    }
}