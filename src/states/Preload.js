export default class Preload extends Phaser.State {
	preload() {
        this.game.load.image('player', 'image/ass.png');
        this.game.load.image('fart_particle', 'image/farticle.png');
        this.game.load.image('bean', 'image/bean.png');
        this.game.load.image('shit', 'image/shit.png');
        this.game.load.image('shit_flat', 'image/shit_flat.png');
        this.game.load.image('ass', 'image/ass.png');
        this.game.load.image('grass', 'image/grass.png');
        this.game.load.image('box', 'image/box.png');
        this.game.load.image('spikes', 'image/spikes.png');
        this.game.load.image('testicle', 'image/testicle.png');
        this.game.load.image('penis', 'image/penis.png');

        this.game.load.spritesheet('toilet', 'image/toilet.png', 98, 122, 2);

        this.game.load.audio('jump', 'audio/jump.wav');
	}

	create() {
	    this.game.state.start('Level01');
    }
}
