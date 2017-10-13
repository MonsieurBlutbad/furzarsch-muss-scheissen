export default class Preload extends Phaser.State {
	preload() {
        this.game.load.image('player', 'image/ass.png');
        this.game.load.image('fart_particle', 'image/farticle.png');
        this.game.load.image('bean', 'image/bean.png');
        this.game.load.image('shit', 'image/shit.png');
        this.game.load.image('diarrhea', 'image/diarrhea.png');
        this.game.load.image('shit_flat', 'image/shit_flat.png');
        this.game.load.image('ass', 'image/ass.png');
        this.game.load.image('grass', 'image/grass.png');
        this.game.load.image('box', 'image/box.png');
        this.game.load.image('spikes', 'image/spikes.png');
        this.game.load.image('scythe_box', 'image/scythe_box.png');
        this.game.load.image('scythe_stick', 'image/scythe_stick.png');
        this.game.load.image('scythe_blade', 'image/scythe_blade.png');
        this.game.load.image('testicle', 'image/testicle.png');
        this.game.load.image('penis', 'image/penis.png');
        this.game.load.image('burger', 'image/burger.png');
        this.game.load.image('chili', 'image/chili.png');

        this.game.load.image('background_sky', 'image/background_sky.jpg');
        this.game.load.image('background_mountains', 'image/background_mountains_1024.png');

        this.game.load.image('toilet', 'image/toilet_96x120.png');
        this.game.load.image('toilet_tank', 'image/toilet_tank.png');
        this.game.load.image('toilet_bowl', 'image/toilet_bowl.png');

        this.game.load.audio('jump', 'audio/jump.wav');
	}

	create() {
	    this.game.state.start('Level01');
    }
}
