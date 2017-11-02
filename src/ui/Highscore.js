/**
 * Created by BK on 06.06.17.
 */
export default class Highscore extends Phaser.Text {

    constructor(game, x, y) {
       super(game, x, y, '', {
           font: "32px Arial",
           fill: "#ffffff",
           align: "right",
           boundsAlignH: 'right',
           boundsAlignV: 'top',
           wordWrap: true, wordWrapWidth: 300
       });
       this.game = game;
       this.text = 'derp';
       this.setTextBounds(20, 20, this.game.world.width - 20, this.game.world.height -20);
       this.anchor.setTo(0,0.5);
    }

    setText(text) {
        console.log('ooohhhhh')
        this.text = text;
    }
}
