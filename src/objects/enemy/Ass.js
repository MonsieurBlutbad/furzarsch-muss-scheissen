export default class Ass extends Phaser.Sprite
{
    constructor(game, x, y)
    {
		super(game, x, y, 'ass');
        this.game = game;
        this.game.physics.arcade.enable(this);
        this.anchor.setTo(1,1);
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
        this.health = 100;
    }

    isHit(bullet)
    {
        this.health -= bullet.damage;
        if (this.health <= 0) {
            this.kill();
        }
    }

}