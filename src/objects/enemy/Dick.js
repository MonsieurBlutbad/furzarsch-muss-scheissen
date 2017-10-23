import Enemy from './Enemy';

export default class Dick extends Enemy {
    constructor(game, player, x, y) {
		super(game, x, y, 'penis');
        this.player = player;
        this.game = game;

        this.game.physics.arcade.enable(this);

        this.anchor.setTo(0.5, 0.5);

        this.leftTesticle = this.game.add.sprite(-8, this.height/2, 'testicle');
        this.leftTesticle.anchor.setTo(0.5, 0.5);
        this.leftTesticle.angle = Math.random() * 360;
        this.addChild(this.leftTesticle);

        this.rightTesticle = this.game.add.sprite(8, this.height/2, 'testicle');
        this.rightTesticle.anchor.setTo(0.5, 0.5);
        this.rightTesticle.angle = Math.random() * 360;
        this.addChild(this.rightTesticle);

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

    update()
    {
        const desiredAngle = Math.atan2(this.y - this.player.y, this.x - this.player.x) / (Math.PI / 180) - 90;

        this.angle += Math.max(-1, Math.min(1, (desiredAngle + 360) - (this.angle + 360)));

        const speed = 300;

        this.body.velocity.y = -speed * Math.cos(this.angle * Math.PI / 180);
        this.body.velocity.x = speed / 2 * Math.sin(this.angle * Math.PI / 180);

    }

}