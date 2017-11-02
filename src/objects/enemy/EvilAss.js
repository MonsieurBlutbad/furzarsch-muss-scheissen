import EvilShit from './../bullet/EvilShit';
import Bullets from './../bullet/Bullets';
import Enemy from './Enemy';
import FartEmitter from './../../emitter/FartEmitter';
import Splatter from './../bullet/Splatter';

export default class EvilAss extends Enemy
{
    constructor(game, x, y)
    {
		super(game, x, y, 'evil_ass');
        this.angle = 180;
        this.health = 200;
        this.bullets = new Bullets(this.game, this);
        this.shitEvent = this.game.time.events.loop(1200, this.startShaking, this);
        this.speed = -0.5;
        this.isFarting = false;
        this.isPulsing = false;
        this.fartEmitter = new FartEmitter(this.game, 0, 0);
        this.addChild(this.fartEmitter);
        this.body.offset.setTo(this.body.width * 0.1, this.body.height * 0.25);
            this.body.width *= 0.8;
        this.body.height *= 0.75;
    }

    update()
    {
        this.x += this.speed;
        this.updateFartEmitter();
    }

    isHit(bullet, enemy)
    {
        let x = -(bullet.x - enemy.x);
        let y = -(bullet.y - enemy.y);

        let splatter = new Splatter(
            this.game,
            Math.max(-enemy.body.width/2, Math.min(x, enemy.body.width/2)),
            Math.max(-enemy.body.height/2, Math.min(y, enemy.body.height/2))
        );

        enemy.addChild(splatter);
        this.health -= bullet.damage;
        if (this.health <= 0) {
            this.die();
        }
    }


    updateFartEmitter()
    {
        this.fartEmitter.update();
        if (this.isPulsing) {
            this.angle = 175 + (Math.random() * 10);
        }
        if (this.isFarting) {
            this.fartEmitter.on = true;
        } else {
            this.fartEmitter.on = false;
        }

    }

    startShit()
    {
            this.isFarting = true;
        this.game.time.events.add(100, this.shit, this);
    }

    startShaking()
    {
        this.isPulsing = true;
        this.game.time.events.add(400, this.startShit, this);
    }

    shit()
    {
        this.isFarting = false;
        this.isPulsing = false;
        this.angle = 180;
        const speed = 820;

        const velocity = {
            x: speed * Math.sin(this.angle * Math.PI / 180),
            y: speed * Math.cos(this.angle * Math.PI / 180)
        };

        this.bullets.createBullet(this.x - 6, this.y + this.height/4, velocity, EvilShit);
    }

    die()
    {
        this.game.time.events.remove(this.shitEvent);
        super.die();
    }

}