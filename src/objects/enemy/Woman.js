import Enemy from './Enemy';
import Bullets from './../bullet/Bullets';
import Baby from './../bullet/Baby';

export default class Woman extends Enemy {
    constructor(game, player, x, y) {
		super(game, x, y, 'woman');
        this.player = player;
        this.game = game;

        this.game.physics.arcade.enable(this);

        this.anchor.setTo(0.5, 0.5);

        this.bullets = new Bullets(this.game, this);

        this.shootEvent = this.game.time.events.loop(1000, this.shoot, this);
    }

    shoot()
    {
        const speed = 220;

        const velocity = {
            x: speed * Math.sin(this.angle * Math.PI / 180),
            y: speed * Math.cos(this.angle * Math.PI / 180)
        };

        this.bullets.createBullet(this.x - 6, this.y + this.height/4, velocity, Baby);
    }

    update()
    {

    }

}