import Shit from './Shit';

export default class Bullets extends Phaser.Group {

    constructor(game, player) {
		super(game);
        this.game = game;
        this.player = player;
    }

    createBullet(speed) {
        const velocity = {
            x: -0.66 * speed * Math.sin(this.player.angle * Math.PI / 180),
            y: speed * Math.cos(this.player.angle * Math.PI / 180),
        };
        let sprite = new Shit(this.game, this.player.x, this.player.y, velocity);
        this.add(sprite);
    }
}