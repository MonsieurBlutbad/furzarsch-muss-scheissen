import FartEmitter from './../../emitter/FartEmitter';
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

        this.game = game;
        this.level = level;
        this.controls = controls;

        this.game.stage.addChild(this);

        this.bullets = new Bullets(this.game, this);

        this.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enable(this);
        this.body.gravity.y = GRAVITY;
        this.body.collideWorldBounds = true;
        this.body.bounce.y = 0.2;

        // Add Emitter
        this.fartEmitter = new FartEmitter(game, 0, this.height / 2, 50);
        this.addChild(this.fartEmitter);

        // Add Sounds
        this.jumpSound = this.game.add.audio('jump');

        // Add Signals
        this.shitTakenEvent = new Phaser.Signal();
        this.amountOfShitsChangedEvent = new Phaser.Signal();
        this.footEatenEvent = new Phaser.Signal();
        this.amountOfFoodChangedEvent = new Phaser.Signal();
        this.fartometerChangedEvent = new Phaser.Signal();
        this.successfulShitsChangedEvent = new Phaser.Signal();
        this.deathEvent = new Phaser.Signal();

        // Set starting values
        this.amountOfShits;
        this.amountOfFood;
        this.fartometer;
        this.pressingSince = null;
        this.lastFart = 0;
        this.fartingSince = null;
        this.rotatingSince = null;
        this.rotationDirection = null;
        this.lastShit = 0;
    }

    init() {
        this.setAmountOfShits(5);
        this.setAmountOfFood(0.25);
        this.setFartometer(100);
        this.setSuccessfulShits(0);
    }

    addEventListener() {
        this.level.toilets.shitHitTheBowlEvent.add(this.shitHitTheBowl, this)
    }

    shitHitTheBowl() {
        this.setSuccessfulShits(this.successfulShits + 1);
    }

    /**
     * Update function. Called once per render cylce.
     */
    update() {
        this.handleInput();

	    this.fartEmitter.update();

        if (this.game.time.now - this.lastFart > FART_COOLDOWN) {
            this.setFartometer(Math.min(100, this.fartometer + 1));
        }

        if (this.y < 0 || this.y > this.game.height) {
            this.die();
        }
    }

    /**
     *
     */
    handleInput() {
        if (this.controls.rotateLeftKey.isDown) {
            this.rotate(-1);
        } else if (this.controls.rotateRightKey.isDown) {
            this.rotate(1);
        } else {
            this.rotatingSince = null;
        }

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
    fart() {
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
    shit() {
        if (!this.amountOfShits > 0) {
            return;
        }

        this.lastShit = this.game.time.now;

        const pressingSinceInMilliseconds = Math.min(PRESSING_TIME_MAX, this.game.time.now - this.pressingSince);
        const easingFactor = EasingFunctions.easeOutCubic(
            Math.min(1, pressingSinceInMilliseconds / PRESSING_TIME_MAX)
        );
        const speed = SHIT_SPEED_MIN + ((SHIT_SPEED_MAX - SHIT_SPEED_MIN) * easingFactor);

        this.bullets.createBullet(speed);
        this.setAmountOfShits(this.amountOfShits - 1);
        this.pressingSince = null;
        this.shitTakenEvent.dispatch(this, this.amountOfShits);
    }

    /**
     * Rotate the player.
     * @param direction
     */
    rotate(direction) {
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
     * @param amountOfShits
     */
    setAmountOfShits(amountOfShits) {
        if (this.amountOfShits !== amountOfShits) {
            this.amountOfShits = amountOfShits;
            this.amountOfShitsChangedEvent.dispatch(this, this.amountOfShits)
        }
    }

    /**
     * @param amountOfFood
     */
    setAmountOfFood(amountOfFood) {
        if (this.amountOfFood !== amountOfFood) {
            this.amountOfFood = amountOfFood;
            this.amountOfFoodChangedEvent.dispatch(this, this.amountOfFood)
        }
    }

    /**
     * @param successfulShits
     */
    setSuccessfulShits(successfulShits) {
        if (this.successfulShits !== successfulShits) {
            this.successfulShits = successfulShits;
            console.log(this.successfulShits);
            this.successfulShitsChangedEvent.dispatch(this, this.successfulShits)
        }
    }

    /**
     * @param fartometer
     */
    setFartometer(fartometer) {
        if (this.fartometer !== fartometer) {
            this.fartometer = fartometer;
            this.fartometerChangedEvent.dispatch(this, this.fartometer)
        }
    }

    /**
     * @param item
     */
    collectItem(item) {
        this.setAmountOfFood(this.amountOfFood + item.givesFood);
        while (this.amountOfFood >= 1) {
            this.setAmountOfShits(this.amountOfShits + 1);
            this.setAmountOfFood(Math.max(0, this.amountOfFood - 1));
        }
    }

    /**
     * Slow down the horizontal movement upon hitting a platform.
     * @param platform
     */
    hitPlatform(platform) {
        this.body.velocity.x *= 0.92;
    }

    /**
     * Clean up when the player dies. :-(
     */
    die() {
        this.deathEvent.dispatch(this);
        this.shitTakenEvent.removeAll();
        this.amountOfShitsChangedEvent.removeAll();
        this.footEatenEvent.removeAll();
        this.amountOfFoodChangedEvent.removeAll();
        this.fartometerChangedEvent.removeAll();
        this.deathEvent.removeAll();
        this.game.stage.removeChild(this);
    }

}