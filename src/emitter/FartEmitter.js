const PARTICLE_BOUNCE = 0.3;
const FART_PARTICLE_MIN_SPEED = 120;
const FART_PARTICLE_MAX_SPEED = 160;

export default class FartEmitter extends Phaser.Particles.Arcade.Emitter {

	constructor(game, x = null, y = null, maxParticles = null)
    {
        super(game, x, y, maxParticles);
        this.bounce.setTo(PARTICLE_BOUNCE, PARTICLE_BOUNCE);
        this.setXSpeed(-60, 60);
        this.setYSpeed(FART_PARTICLE_MIN_SPEED, FART_PARTICLE_MAX_SPEED);
        this.makeParticles('fart_particle', 0, 200, 0, false);
        // explode, lifespan, frequency, quantity
        this.start(false, 400, 10, 1);
        this.on = false;
        this.setAlpha(0.3, 1);
        this.lifespan = 500;
    }

    update()
    {
	    super.update();
        this.forEachAlive( function(p) {
            p.alpha= p.lifespan / this.lifespan * 4;
        }.bind(this));
    }
}