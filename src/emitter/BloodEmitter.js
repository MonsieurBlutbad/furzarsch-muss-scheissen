export default class BloodEmitter extends Phaser.Particles.Arcade.Emitter {
    /**
     * @param game
     * @param x
     * @param y
     */
	constructor(game, x = null, y = null)
    {
        super(game, x, y);
        this.makeParticles([
            'ass_blood_01', 'ass_blood_01','ass_blood_01', 'ass_blood_01',
            'blood_particle', 'blood_particle', 'blood_particle', 'blood_particle',
            'diarrhea', 'diarrhea',
            'shit'
        ], 0, 20, 0, false);
        // explode, lifespan, frequency, quantity
        this.setScale(0.5, 1);
        this.start(true, 0, null, 20);
    }
}