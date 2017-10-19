import EvilShit from './../bullet/EvilShit';
import Bullets from './../bullet/Bullets';
import Enemy from './Enemy';

export default class EvilAss extends Enemy
{
    constructor(game, x, y)
    {
		super(game, x, y, 'evil_ass');
        this.body.immovable = true;
        this.health = 100;
        this.killsPlayerOnHit = false;
        this.bullets = new Bullets(this.game, this);
        this.game.time.events.loop(1200, this.shit, this);
        this.speed = -0.5;
    }

    update() {
        this.x += this.speed;
    }

    shit()
    {
        const speed = 820;

        const velocity = {
            x: speed * Math.sin(180 * Math.PI / 180),
            y: speed * Math.cos(180 * Math.PI / 180)
        };

        this.bullets.createBullet(this.x, this.y, velocity, EvilShit);
    }

}