/**
 *
 */
export default class Splatter extends Phaser.Sprite {
    /**
     * @param game
     * @param x
     * @param y
     */
    constructor(game, x, y)
    {
        super(game, x, y, 'shit_flat');
        this.anchor.setTo(0.5, 0.5);
        this.scale.setTo(0.5 + Math.random(), 0.5 + Math.random());
        this.angle = - 10 + Math.random() * 20;
    }
}