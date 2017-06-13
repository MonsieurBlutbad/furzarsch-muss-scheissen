/**
 * Created by BK on 06.06.17.
 */

export default class Fartometer extends Phaser.Graphics {

    constructor(game, fartometer, x, y, width, height) {
        super(game, x, y);
        this.game = game;
        this.fartometerWidth = width;
        this.fartometerHeight = height;
        this.lineWidth = 2;
        this.draw(fartometer);
    }

    draw(fartometer) {
        const progressX = this.fartometerWidth * fartometer/100;
        this.lineStyle(this.lineWidth, 0xFFFFFF);
        this.drawRect(0, 0, this.fartometerWidth, this.fartometerHeight);
        this.lineStyle(0);
        this.beginFill(0x44cc44);
        this.drawRect(0, 0, progressX, this.fartometerHeight);
        this.endFill();
        this.beginFill(0xCCCCCC);
        this.drawRect(progressX, 0, this.fartometerWidth - progressX, this.fartometerHeight);
        this.endFill();
    }

}
