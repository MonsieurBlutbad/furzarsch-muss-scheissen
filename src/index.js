import Intro from 'states/Intro';
import Preload from 'states/Preload';
import Level01 from 'states/Level01';

class Game extends Phaser.Game {
	constructor() {
		super(1024, 768, Phaser.AUTO, 'content', null);
		this.state.add('Preload', Preload, false);
		this.state.add('Intro', Intro, false);
		this.state.add('Level01', Level01, false);
		this.state.start('Preload');
	}
}

new Game();
