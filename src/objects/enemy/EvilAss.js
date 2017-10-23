import EvilShit from './../bullet/EvilShit';
import Bullets from './../bullet/Bullets';
import Enemy from './Enemy';
import FartEmitter from './../../emitter/FartEmitter';

export default class EvilAss extends Enemy
{
    constructor(game, x, y)
    {
		super(game, x, y, 'evil_ass');
        this.body.immovable = true;
        this.angle = 180;
        this.health = 300;
        this.bullets = new Bullets(this.game, this);
        this.shitEvent = this.game.time.events.loop(1200, this.startShaking, this);
        this.speed = -0.5;
        this.isFarting = false;
        this.isShaking = false;
        this.fartEmitter = new FartEmitter(this.game, 0, 0);
        this.addChild(this.fartEmitter);
    }

    update()
    {
        this.x += this.speed;
        this.updateFartEmitter();
    }

    updateFartEmitter()
    {
        this.fartEmitter.update();
        if (this.isShaking) {
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
        console.log('erstma furze');
        this.isFarting = true;
        this.game.time.events.add(100, this.shit, this);
    }

    startShaking()
    {
        this.isShaking = true;
        this.game.time.events.add(400, this.startShit, this);
    }

    shit()
    {
        this.isFarting = false;
        this.isShaking = false;
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
    }

}