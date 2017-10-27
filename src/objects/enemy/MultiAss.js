import Diarrhea from './../bullet/Diarrhea';
import Shit from './../bullet/Shit';
import Bullets from './../bullet/Bullets';
import Enemy from './Enemy';
import FartEmitter from './../../emitter/FartEmitter';

export default class MultiAss extends Enemy
{
    constructor(game, x, y)
    {
		super(game, x, y, 'multi_ass');
		console.log('create MultiAss');
        this.health = 300;
        this.bullets = new Bullets(this.game, this);
        this.scale.setTo(1.25, 1.25);
        this.shitEvent = this.game.time.events.loop(1000, this.startShit, this);
        this.rotationSpeed = 0.5;
        this.body.setSize(this.body.width * 0.66, this.body.height * 0.66, this.body.width * 0.17, this.body.height * 0.17);
        this.targetAngle = 0;

        this.pulseAnimation = this.animations.add('pulse');
        this.animations.play('pulse', 15, true);
        this.move();
        this.moveTween = null;
    }

    move()
    {
        const angle = Math.random() * 360;
        const speed = 100;
        const target = {
            x: Math.max(this.game.camera.x + this.game.width / 10, Math.min(this.game.camera.x + this.game.width, this.x + speed * Math.sin(angle * Math.PI / 180))),
            y:Math.max(this.game.height / 5, Math.min(this.game.height, this.y + speed * Math.cos(angle * Math.PI / 180)))
        };
        this.moveTween = this.game.add.tween(this).to(target, 3000, "Linear", true);
        this.moveTween.onComplete.add(this.move, this);
    }

    update()
    {
        //this.game.debug.body(this);
        this.angle += this.rotationSpeed;
        if (this.isPulsing) {
            this.scale.setTo(0.9 + Math.random() * 0.1, 0.9 + Math.random() * 0.1)
        }
    }


    startShit()
    {
        this.game.time.events.add(100, this.shit, this);
    }

    shit()
    {
        this.isPulsing = false;

        this.targetAngle = Math.random() * 360;

        for (let i = 0; i < 6; i++) {

            let newAngle = this.targetAngle - (15 + Math.random() * 30);

            const speed = 200 + Math.random() * 300;

            const velocity = {
                x: speed * Math.sin(newAngle * Math.PI / 180),
                y: speed * Math.cos(newAngle * Math.PI / 180)
            };

            this.bullets.createBullet(this.x, this.y, velocity, Math.random() > 0.66 ? Shit : Diarrhea);
        }
    }

    die()
    {
        this.game.time.events.remove(this.shitEvent);
        if (this.moveTween) {
            this.moveTween.stop();
        }
        super.die();
    }

}