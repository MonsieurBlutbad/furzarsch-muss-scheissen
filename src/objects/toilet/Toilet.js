export default class Toilet extends Phaser.Sprite {
    constructor(game, x, y) {
        super(game, x, y, 'toilet');
        this.game = game;
        this.game.physics.arcade.enable(this);
        this.game.add.sprite(this);

        this.enableBody = true;
        this.body.immovable = true;

        // Create different hitBoxes, so we can check if the shit landed in the bowl.
        this.hitBoxTank = this.createHitBox('tank', this.width * 0.33, this.height, -this.width, -this.height);
        this.hitBoxBody = this.createHitBox('body', this.width * 0.67, this.height * 0.45 - 5, -this.width * 0.67, - this.height * 0.45 + 5);
        this.hitBoxLidClosed = this.createHitBox('lid closed', this.width * 0.67, 20, -this.width * 0.67, - this.height * 0.50 - 15);
        this.hitBoxLidOpened = this.createHitBox('lid opened', 10, this.height * 0.5, -this.width * 0.67, -this.height);
        this.hitBoxBowl = this.createHitBox('bowl', this.width * 0.5, 5, -this.width * 0.58, - this.height * 0.45);

        this.hitBoxesOpen = this.game.add.group();
        this.hitBoxesClosed = this.game.add.group();
        this.hitBoxesOpen.addMultiple([this.hitBoxTank, this.hitBoxBody, this.hitBoxLidOpened, this.hitBoxBowl]);
        this.hitBoxesClosed.addMultiple([this.hitBoxTank, this.hitBoxBody, this.hitBoxLidClosed]);

        this.addChild(this.hitBoxesOpen);
        this.addChild(this.hitBoxesClosed);

        this.setClosed(false);

        this.shitHitTheBowlEvent = new Phaser.Signal();
    }

    /**
     * @param name
     * @param width
     * @param height
     * @param offsetX
     * @param offsetY
     * @returns {Phaser.Sprite|*}
     */
    createHitBox(name, width, height, offsetX, offsetY) {
        let hitBox = this.game.add.sprite(0, 0);
        hitBox.name = name;
        this.game.physics.arcade.enable(hitBox);
        hitBox.enableBody = true;
        hitBox.body.setSize(width, height, offsetX, offsetY);
        hitBox.body.immovable = true;
        hitBox.isHit = this.isHit;
        return hitBox;
    }

    setClosed(closed) {
        this.closed = closed;
        this.frame = this.closed? 1: 0;
    }

    /**
     * @returns {*}
     */
    getHitBox() {
        if (this.closed) {
            return this.hitBoxesClosed;
        } else {
            return this.hitBoxesOpen;
        }
    }

    isHit(bullet, hitBox) {
        if (hitBox === this.hitBoxBowl) {
            this.shitHitTheBowlEvent.dispatch(this, bullet);
        }
    }

    debug() {
        //this.game.debug.body(this.hitBoxTank);
        //this.game.debug.body(this.hitBoxBody);
        //this.game.debug.body(this.hitBoxLidClosed);
        //this.game.debug.body(this.hitBoxLidOpened);
        //this.game.debug.body(this.hitBoxBowl, '#ff0000');
    }

}