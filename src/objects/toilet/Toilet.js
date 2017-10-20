import WaterEmitter from './../../emitter/WaterEmitter'

const MIN_TIME_TO_TOGGLE_LID = 3000;
const MAX_TIME_TO_TOGGLE_LID = 8000;

/**
 *
 */
export default class Toilet extends Phaser.Sprite
{
    /**
     * @param game
     * @param shitHitTheBowlEvent
     * @param missedToiletEvent
     * @param x
     * @param y
     */
    constructor(game, shitHitTheBowlEvent, missedToiletEvent, x, y)
    {
        super(game, x, y, 'toilet');
        this.game = game;
        this.shitHitTheBowlEvent = shitHitTheBowlEvent;
        this.missedToiletEvent = missedToiletEvent;
        this.killsPlayerOnHit = false;
        this.game.physics.arcade.enable(this);
        this.enableBody = true;
        this.anchor.setTo(0.5,0.5);
        this.body.immovable = true;

        this.shits = 0;

        const anchorOffsetX = this.anchor.x * this.width;
        const anchorOffsetY = this.anchor.y * this.height;

        // Create different hitBoxes, so we can check if the shit landed in the bowl.
        this.hitBoxTank = this.createHitBox('tank', this.width * 0.33, this.height * 0.66, -this.width + anchorOffsetX, -this.height + anchorOffsetY);
        this.hitBoxBody = this.createHitBox('body', this.width * 0.76, this.height * 0.40 - 5, -this.width * 0.86 + anchorOffsetX, -this.height * 0.4 + anchorOffsetY);
        this.hitBoxLidClosed = this.createHitBox('lid closed', this.width * 0.67, 20, -this.width * 0.67 + anchorOffsetX, -this.height * 0.50 - 15 + anchorOffsetY);
        this.hitBoxLidOpened = this.createHitBox('lid opened', 10, this.height * 0.5, -this.width * 0.67 + anchorOffsetX, -this.height + anchorOffsetY);
        this.hitBoxBowl = this.createHitBox('bowl', this.width * 0.6, 20, - this.width * 0.65 + anchorOffsetX, - this.height * 0.5 + anchorOffsetY);

        this.hitBoxes = this.game.add.group();
        this.hitBoxesOpen = this.game.add.group();
        this.hitBoxesClosed = this.game.add.group();
        this.hitBoxes.addMultiple([this.hitBoxTank, this.hitBoxBody]);
        this.hitBoxesOpen.addMultiple([this.hitBoxLidOpened, this.hitBoxBowl]);
        this.hitBoxesClosed.addMultiple([this.hitBoxLidClosed]);

        this.addChild(this.hitBoxes);
        this.addChild(this.hitBoxesOpen);
        this.addChild(this.hitBoxesClosed);

        this.setClosed(false);

        this.waterEmitter = new WaterEmitter(this.game);
        this.hitBoxBowl.addChild(this.waterEmitter);

        this.checkWorldBounds = true;
        this.events.onOutOfBounds.add(function() {
            if (this.shits === 0) {
                this.missedToiletEvent.dispatch(this);
            }
            this.destroy.bind(this)
        }.bind(this));
    }

    /**
     * @param name
     * @param width
     * @param height
     * @param offsetX
     * @param offsetY
     * @returns {Phaser.Sprite|*}
     */
    createHitBox(name, width, height, offsetX, offsetY)
    {
        let hitBox = this.game.add.sprite(0, 0);
        hitBox.name = name;
        this.game.physics.arcade.enable(hitBox);
        hitBox.enableBody = true;
        hitBox.body.setSize(width, height, offsetX, offsetY);
        hitBox.body.immovable = true;
        hitBox.isHit = this.isHit;
        return hitBox;
    }

    /**
     *
     */
    createToggleLidEvent()
    {
        this.game.time.events.add(
            MIN_TIME_TO_TOGGLE_LID + (Math.random() * (MAX_TIME_TO_TOGGLE_LID - MIN_TIME_TO_TOGGLE_LID)),
            this.toggleLid,
            this
        );
    }

    /**
     *
     */
    toggleLid()
    {
        this.setClosed(!this.closed);
        this.createToggleLidEvent();
    }

    /**
     * @param closed
     */
    setClosed(closed)
    {
        this.closed = closed;
        this.frame = this.closed? 1: 0;
    }

    /**
     * @returns {*}
     */
    getHitBox()
    {
        if (this.closed) {
            return [this.hitBoxes, this.hitBoxesClosed];
        } else {
            return [this.hitBoxes, this.hitBoxesOpen];
        }
    }

    /**
     * @param bullet
     * @param hitBox
     */
     isHit(bullet, hitBox)
    {
        console.log(this);
         if (hitBox === this.hitBoxBowl) {
            this.shits ++;
            let waterEmitter = new WaterEmitter(this.game);
            this.hitBoxBowl.addChild(waterEmitter);
            waterEmitter.start();
            this.shitHitTheBowlEvent.dispatch(this, bullet);
            console.log('It\'s a shit in the bowl!!!!');
        } else {
            console.log(this, this.x, hitBox.x, bullet.x);
            let shitFlat = this.game.make.sprite(bullet.x - hitBox.x, 0, 'shit_flat');
            shitFlat.anchor.setTo(0.5, 0.9);
            hitBox.addChild(shitFlat);
        }
    }


    /**
     *
     */
    debug() {
        this.game.debug.body(this.hitBoxTank);
        this.game.debug.body(this.hitBoxBody);
        this.game.debug.body(this.hitBoxLidClosed);
        this.game.debug.body(this.hitBoxLidOpened);
        this.game.debug.body(this.hitBoxBowl, '#ff0000');
    }

}