/**
 * Created by BK on 06.06.17.
 */

export default class Fartometer extends Phaser.Graphics {

    constructor(game, fartometer, x, y, width, height, player) {
        super(game, x, y);
        this.game = game;
        this.fartometerFactor = 2.5;
        this.fartometerHeight = height;
        this.lineWidth = 2;
        this.player = player;
        this.draw(fartometer);
    }

    draw(fartometer, fartometerMax) {
        const fartometerWidth = fartometerMax * this.fartometerFactor;
        const progressX = fartometerWidth * (fartometer / fartometerMax);
        this.lineStyle(this.lineWidth, 0xFFFFFF);
        this.drawRect(0, 0, fartometerWidth, this.fartometerHeight);
        this.lineStyle(0);
        this.beginFill(0x44cc44);
        this.drawRect(0, 0, progressX, this.fartometerHeight);
        this.endFill();
        this.beginFill(0xCCCCCC);
        this.drawRect(progressX, 0, fartometerWidth - progressX, this.fartometerHeight);
        this.endFill();
    }

}
