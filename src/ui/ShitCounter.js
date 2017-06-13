/**
 * Created by BK on 06.06.17.
 */

export default class ShitCounter extends Phaser.Group {

    constructor(game, x, y, amountOfShits, amountOfFood ) {
        super(game);
        this.game = game;
        this.x = x;
        this.y = y;
        this.draw(amountOfShits, amountOfFood);
    }

    draw(amountOfShits, amountOfFood) {
        this.reset();
        for (let i = 0; i < amountOfShits; i++) {
            let shit = this.game.add.sprite(i * 22, 0, 'shit');
            this.add(shit);
        }
        if (amountOfFood > 0) {
            let hollowShit = this.game.add.sprite(amountOfShits * 22, 0, 'shit');
            hollowShit.alpha = 0.2;
            let fillerShit = this.game.add.sprite(amountOfShits * 22, 0, 'shit');
            const fillerShitHeight = amountOfFood * fillerShit.height;
            let cropRect = new Phaser.Rectangle(0, fillerShit.height, fillerShit.width, -fillerShitHeight);
            fillerShit.y = fillerShit.height;
            fillerShit.crop(cropRect);
            this.add(fillerShit);
            this.add(hollowShit);
        }
    }

    reset() {
        this.forEach(function (shit) {
            shit.kill();
        });
    }

}
