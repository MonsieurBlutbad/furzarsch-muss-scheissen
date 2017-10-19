export default class WaterEmitter extends Phaser.Particles.Arcade.Emitter {
    /**
     * @param game
     * @param x
     * @param y
     */
	constructor(game, x = null, y = null)
    {
        super(game, x, y);
        this.makeParticles('water_particle', 0, 4, 0, false);
        this.gravity = 300;
    }

    /**
     *
     */
    start() {
        // explode, lifespan, frequency, quantity
        super.start(true, 1000, null, 20);
    }
}