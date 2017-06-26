<<<<<<< HEAD
/**
 *
 */
export default class Floor extends Phaser.Sprite
{
    /**
     * @param game
     */
=======

export default class Floor extends Phaser.Sprite
{

>>>>>>> 1fb547308f7266dda81eca1c0e9792191408ea17
    constructor(game)
    {
		super(game, 0, game.world.height, 'grass');
        this.game = game;
        this.game.physics.arcade.enable(this);
        this.scale.setTo(this.game.world.width / this.width * 2, 1);
        this.anchor.setTo(0,1);
        this.enableBody = true;
        this.body.immovable = true;
        this.game.add.sprite(this);
    }

    isHit(bullet, floor)
    {
        let shitFlat = this.game.make.sprite(bullet.x - floor.x,  0, 'shit_flat');
        shitFlat.anchor.setTo(0.5, 0.9);
        floor.addChild(shitFlat)
    }

}