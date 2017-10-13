import Shit from './Shit';
import Diarrhea from './Diarrhea';

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
        let Bullet = Shit;
        if (this.player.hasDiarrhea) {
            Bullet = Diarrhea;
        }
        let sprite = new Bullet(this.game, this.player.x, this.player.y, velocity);
        this.add(sprite);
    }
}