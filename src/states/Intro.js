import {WIDTH, HEIGHT} from './../settings/Settings';

export default class Intro extends Phaser.State {

    preload()
    {
        this.game.load.image('splash_screen', 'image/splash_screen.jpg');
    }


	create() {
        this.game.add.tileSprite(0, 0, WIDTH, HEIGHT, 'splash_screen');
        this.onDownCallback = this.game.input.keyboard.onDownCallback = function(e) {
            this.onDownCallback = null;
            this.game.state.start('Preload', true);
        }
    }

}
