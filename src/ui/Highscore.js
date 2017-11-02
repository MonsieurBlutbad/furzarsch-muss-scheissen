/**
 * Created by BK on 06.06.17.
 */

import {WIDTH, HEIGHT} from './../settings/Settings';

export default class Highscore extends Phaser.Text {

    constructor(game, x, y) {
       super(game, x, y, '', {
           font: "32px Arial",
           fill: "#ffffff",
           align: "right",
           boundsAlignH: 'right',
           boundsAlignV: 'top'
       });
       this.game = game;
       this.setTextBounds(20, 20, WIDTH - 20, HEIGHT - 20);
       this.anchor.setTo(0, 0.5);
    }

    setText(text) {
        this.text = text;
    }
}
