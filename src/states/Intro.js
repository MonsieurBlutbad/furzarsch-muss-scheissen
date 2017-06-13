import RainbowText from './../text/RainbowText';

export default class Intro extends Phaser.State {

	create() {
        this.game.stage.backgroundColor = '#71c5cf';

        let textGroup = this.game.add.group();

        let heading = new RainbowText(this.game, this.game.world.centerX, this.game.world.height * 0.4, 'FURZARSCH', '120px Helvetica');
        heading.anchor.set(0.5);
        let subHeading = new RainbowText(this.game, this.game.world.centerX, this.game.world.height * 0.4 + 120, 'MUSS SCHEISSEN', '45px Helvetica');
        subHeading.anchor.set(0.5, 1);
        let text = this.game.add.text(this.game.world.centerX, this.game.world.height * 0.85, '- PRESS ANY KEY -',  { font: '32px Helvetica', fill: '#fff'});
        text.anchor.set(0.5);
        textGroup.add(heading);
        textGroup.add(subHeading);
        textGroup.add(text);

        this.onDownCallback = this.game.input.keyboard.onDownCallback = function(e) {
            this.onDownCallback = null;
            this.game.state.start('Level01', true);
        }
    }

}
