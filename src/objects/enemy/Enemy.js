export default class Enemy extends Phaser.Sprite
{
    constructor(game, x, y, key)
    {
		super(game, x, y, key);
        this.game = game;
        this.game.physics.arcade.enable(this);
        this.anchor.setTo(0.5, 0.5);
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
        this.health = 100;
        this.killsPlayerOnHit = true;
    }

    isHit(bullet)
    {
        this.health -= bullet.damage;
        if (this.health <= 0) {
            //this.destroy();
        }
    }


}