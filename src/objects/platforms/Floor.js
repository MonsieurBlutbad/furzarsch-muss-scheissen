/**
 *
 */
export default class Floor extends Phaser.Sprite
{
    /**
     * @param game
     */
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


}