import FartEmitter from './../../emitter/FartEmitter';
import Shit from './../bullet/Shit';
import Diarrhea from './../bullet/Diarrhea';
import Bullets from './../bullet/Bullets';
import {
    GRAVITY,
    FART_COOLDOWN,
    JUMP_SPEED_MIN,
    JUMP_SPEED_MAX,
    JUMP_SPEED_TIME_TO_MAX,
    ROTATION_SPEED_MIN,
    ROTATION_SPEED_MAX,
    ROTATION_SPEED_TIME_TO_MAX,
    SHIT_COOLDOWN,
    POINTS_FOR_SHIT_IN_TOILET,
    DIARRHEA_DURATION,
    DIARRHEA_SHIT_FREQUENCE,
    PRESSING_TIME_MAX,
    SHIT_SPEED_MIN,
    SHIT_SPEED_MAX
} from './../../settings/Settings';
import { remap, EasingFunctions } from './../../helper/Functions';

/**
 * Player Sprite
 */
export default class Player extends Phaser.Sprite {
    /**
     * Player Constructor.
     *
     * @param game
     * @param level
     * @param controls
     * @param x
     * @param y
     */
    constructor(game, level, controls, x, y) {
		super(game, x, y, 'player');
        console.log('New Player', x, y);
        this.frame = 0;
        this.game = game;
        this.level = level;
        this.controls = controls;

        this.bullets = new Bullets(this.game, this);

        this.game.physics.arcade.enable(this);
        this.body.collideWorldBounds = true;
        this.body.gravity.y = GRAVITY;
        this.body.bounce.y = 0.2;
        this.anchor.setTo(0.5, 0.5);

        // Add Emitter
        this.fartEmitter = new FartEmitter(game, 0, this.height / 2);
        this.addChild(this.fartEmitter);

        // Add Sounds
        this.jumpSound = this.game.add.audio('jump');

        // Add Signals
        this.shitTakenEvent = new Phaser.Signal();
        this.amountOfShitsChangedEvent = new Phaser.Signal();
        this.foodEatenEvent = new Phaser.Signal();
        this.amountOfFoodChangedEvent = new Phaser.Signal();
        this.fartometerChangedEvent = new Phaser.Signal();
        this.scoreChangedEvent = new Phaser.Signal();
        this.deathEvent = new Phaser.Signal();
        this.deathStartEvent = new Phaser.Signal();

        // Set starting values
        this.amountOfShits;
        this.amountOfFood;
        this.fartometer;
        this.fartometerMax;
        this.pressingSince = null;
        this.lastFart = 0;
        this.fartingSince = null;
        this.rotatingSince = null;
        this.rotationDirection = null;
        this.hasDiarrhea = false;
        this.hasDiarrheaSince = null;
        this.lastShit = 0;
        this.combo = 0;
        this.score = 0;
        this.lastShittedToilet = null;
    }

    /**
     *
     */
    init()
    {
        this.setAmountOfShits(5);
        this.setAmountOfFood(0);
        this.setFartometerMax(200);
        this.setFartometer(200);
        this.setSuccessfulShits(0);
    }

    /**
     *
     */
    addEventListener()
    {
        this.level.toilets.shitHitTheBowlEvent.add(this.shitHitTheBowl, this);
        this.level.toilets.missedToiletEvent.add(this.missedToilet, this);
        this.deathStartEvent.add(this.onDeath, this);
    }

    /**
     *
     */
    shitHitTheBowl(toilet)
    {
        this.lastShittedToilet = toilet;
        if (toilet.shits === 1) {
            this.setCombo(this.combo + 1);
        }
        this.setSuccessfulShits(this.successfulShits + 1);
        this.addPoints(POINTS_FOR_SHIT_IN_TOILET * this.combo);
    }

    /**
     *
     */
    missedToilet() {
        this.setCombo(0);
    }

    /**
     * Update function. Called once per render cylce.
     */
    update()
    {
        this.handleInput();

	    this.fartEmitter.update();

        // Fartometer Handling
        if (this.game.time.now - this.lastFart > FART_COOLDOWN) {
            this.setFartometer(Math.min(this.fartometerMax, this.fartometer + 1));
        }

        // Diarrhea Handling
        if (this.hasDiarrhea) {
            const now = this.game.time.now;
            if (this.hasDiarrheaSince +  DIARRHEA_DURATION > now) {
                if (!this.lastShit || this.lastShit + DIARRHEA_SHIT_FREQUENCE <= now ) {
                    this.shit();
                }
            } else {
                this.setHasDiarrhea(false);
            }
        }
    }

    /**
     *
     */
    handleInput()
    {
        if (this.controls.rotateLeftKey.isDown) {
            this.rotate(-1);
        } else if (this.controls.rotateRightKey.isDown) {
            this.rotate(1);
        } else {
            this.rotatingSince = null;
        }


      //  this.rotation = this.game.physics.arcade.angleToPointer(this) + 90;

        if (this.controls.fartKey.isDown) {
            this.fart();
        } else {
            this.fartingSince = null;
        }

        this.controls.shitKey.onDown.add(function() {
            this.pressingSince = this.game.time.now;
        }, this);
        this.controls.shitKey.onUp.add(this.shit, this);
    }

    /**
     * Make the player fart.
     */
    fart()
    {
        // TODO: apply gravity to downward jumps
        if (this.alive === false) {
            return;
        }

        if (!this.fartometer > 0) {
            this.fartingSince = null;
            return;
        }

        if (!this.fartingSince) {
            this.fartingSince = this.game.time.now;
        }

        const fartingSinceInMilliseconds = this.game.time.now - this.fartingSince;

        const easingFactor = EasingFunctions.linear(
            Math.min(1, fartingSinceInMilliseconds / JUMP_SPEED_TIME_TO_MAX)
        );

        const speed = JUMP_SPEED_MIN + ((JUMP_SPEED_MAX - JUMP_SPEED_MIN) * easingFactor);

        //   this.jumpSound.play();
        this.fartEmitter.on = true;

        // Add a vertical velocity to the player
        this.body.velocity.y = -speed * Math.cos(this.angle * Math.PI / 180);
        this.body.velocity.x = speed / 2 * Math.sin(this.angle * Math.PI / 180);

        this.setFartometer(this.fartometer - 1);
        this.lastFart = this.game.time.now;
    }

    /**
     * Drop a shit.
     */
    shit()
    {
        if (!this.hasDiarrhea && !this.amountOfShits > 0) {
            return;
        }

        this.lastShit = this.game.time.now;

        const pressingSinceInMilliseconds = Math.min(PRESSING_TIME_MAX, this.game.time.now - this.pressingSince);
        const easingFactor = EasingFunctions.easeOutCubic(
            Math.min(1, pressingSinceInMilliseconds / PRESSING_TIME_MAX)
        );
        const speed = SHIT_SPEED_MIN + ((SHIT_SPEED_MAX - SHIT_SPEED_MIN) * easingFactor);

        const velocity = {
            x: -0.66 * speed * Math.sin(this.angle * Math.PI / 180),
            y: speed * Math.cos(this.angle * Math.PI / 180),
        };

        this.bullets.createBullet(this.x, this.y, velocity, this.hasDiarrhea ? Diarrhea : Shit);

        if (!this.hasDiarrhea) {
            this.setAmountOfShits(this.amountOfShits - 1);
        }
        this.pressingSince = null;
        this.shitTakenEvent.dispatch(this, this.amountOfShits);
    }

    /**
     * Rotate the player.
     * @param direction
     */
    rotate(direction)
    {
        if (!this.rotatingSince || this.rotationDirection !== direction) {
            this.rotatingSince = this.game.time.now;
            this.rotationDirection =  direction
        }

        let rotatingSinceInMilliseconds = this.game.time.now - this.rotatingSince;

        let easingFactor = EasingFunctions.linear(
            Math.min(1, rotatingSinceInMilliseconds / ROTATION_SPEED_TIME_TO_MAX)
        );

        const speed = ROTATION_SPEED_MIN + ((ROTATION_SPEED_MAX - ROTATION_SPEED_MIN) * easingFactor);

		this.angle += direction * speed;
    }

    /**
     *
     */
    setHasDiarrhea(hasDiarrhea)
    {
        const now = this.game.time.now;

        // Diarrhea cannot be stopped!!!
        if (this.hasDiarrhea && !hasDiarrhea && this.hasDiarrheaSince + DIARRHEA_DURATION > now) {
            return;
        }

        this.hasDiarrhea = hasDiarrhea;
        if (this.hasDiarrhea) {
            this.hasDiarrheaSince = this.game.time.now;
        } else {
            this.hasDiarrheaSince = null;
        }
    }

    /**
     * @param amountOfShits
     */
    setAmountOfShits(amountOfShits)
    {
        if (this.amountOfShits !== amountOfShits) {
            this.amountOfShits = amountOfShits;
            this.amountOfShitsChangedEvent.dispatch(this, this.amountOfShits)
        }
    }

    /**
     * @param amountOfFood
     */
    setAmountOfFood(amountOfFood)
    {
        if (this.amountOfFood !== amountOfFood) {
            this.amountOfFood = amountOfFood;
            this.amountOfFoodChangedEvent.dispatch(this, this.amountOfFood)
        }
    }

    /**
     * @param successfulShits
     */
    setSuccessfulShits(successfulShits)
    {
        if (this.successfulShits !== successfulShits) {
            this.successfulShits = successfulShits;
        }
    }

    /**
     * @param points
     */
    addPoints(points)
    {
        this.score += points;
        this.scoreChangedEvent.dispatch(this, this.score, points)
    }

    /**
     * @param fartometer
     */
    setFartometer(fartometer) {
        if (this.fartometer !== fartometer) {
            this.fartometer = Math.min(this.fartometerMax, Math.max(0, fartometer));
            this.fartometerChangedEvent.dispatch(this, this.fartometer, this.fartometerMax)
        }
    }

    /**
     * @param fartometerMax
     */
    setFartometerMax(fartometerMax) {
        if (this.fartometerMax !== fartometerMax) {
            const difference = fartometerMax - this.fartometerMax;
            this.fartometerMax = fartometerMax;
            this.setFartometer(this.fartometer + difference);
            this.fartometerChangedEvent.dispatch(this, this.fartometer, this.fartometerMax)
        }
    }

    setCombo(combo) {
        this.combo = combo;
    }

    /**
     * @param item
     */
    collectItem(item)
    {
        this.setAmountOfFood(this.amountOfFood + item.givesFood);
        this.setFartometer(this.fartometer + item.givesFarts);
        this.setHasDiarrhea(item.givesDiarrhea);

        while (this.amountOfFood >= 100) {
            this.setAmountOfShits(this.amountOfShits + 1);
            this.setAmountOfFood(Math.max(0, this.amountOfFood - 100));
        }
    }

    /**
     * @param object
     */
    hitsObject(object)
    {
        this.body.velocity.x *= 0.92;
        if (object.killsPlayerOnHit) {
            this.die();
        }
    }

    /**
     * Clean up when the player dies. :-(
     */
    die()
    {
        console.log(':(');
        if (this.alive) {
            console.log('Player die');
            this.alive = false;
            this.deathStartEvent.dispatch(this);
        }
    }

    onDeath()
    {
        this.visible = false;
        this.body.moves = false;
        this.game.time.events.add(3000, function() {
            this.deathEvent.dispatch(this);
            this.destroy();
        }.bind(this), this);

    }

}