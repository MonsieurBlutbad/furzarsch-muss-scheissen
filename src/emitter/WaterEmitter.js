export default class WaterEmitter extends Phaser.Particles.Arcade.Emitter {
    /**
     * @param game
     * @param x
     * @param y
     */
	constructor(game, x = null, y = null)
    {
        super(game, x, y);
        this.setXSpeed(-80, 80);
        this.setYSpeed(0,-100);
        this.makeParticles('water_particle', 0, 12, 0, false);
        this.gravity = 300;
        this.setAlpha(0.3, 1);
        this.setScale(0.3, 1);
    }

    /**
     *
     */
    start() {
        // explode, lifespan, frequency, quantity
        super.start(true, 500, null, 20);
    }

    update()
    {
        super.update();
        this.forEachAlive( function(p) {
            p.alpha= p.lifespan / this.lifespan * 4;
        }.bind(this));
    }
}