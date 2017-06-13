export default class Penis extends Phaser.Group {
    constructor(game, x, y) {
		super(game);
        this.x = x;
        this.y = y;
        this.game = game;

        this.shaft = this.game.add.sprite(0, 0, 'penis');
        this.leftTesticle = this.game.add.sprite(-8, 40, 'testicle');
        this.rightTesticle = this.game.add.sprite(8, 40, 'testicle');

        this.add(this.shaft);
        this.add(this.leftTesticle);
        this.add(this.rightTesticle);

        this.game.physics.arcade.enable(this);
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
        this.health = 100;
    }

    isHit(bullet) {
        this.health -= bullet.damage;
        if (this.health <= 0) {
            this.kill();
        }
    }

}