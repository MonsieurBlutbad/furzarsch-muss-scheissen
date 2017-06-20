import RainbowText from './../text/RainbowText';
import Fartometer from './Fartometer';
import ShitCounter from './ShitCounter';

export default class LevelUI extends Phaser.Group {
    constructor(game, level) {
		super(game);
		this.game = game;
		this.level = level;
        this.fixedToCamera = true;
        this.fartometer = new Fartometer(this.game, 0, 20, 20, 250, 20);
        this.add(this.fartometer);
        this.shitCounter = new ShitCounter(this.game, 20, 50, 0, this.level.player.amountOfFood);
        this.add(this.shitCounter);
        this.successfulShitsText = this.game.add.text(20, 80, '', { font: "32px Arial", fill: "#ffffff", align: "left" });
        this.add(this.successfulShitsText);
    }

    addEventListener() {
        this.level.player.amountOfShitsChangedEvent.add(this.updateAmountOfShitsListener, this);
        this.level.player.amountOfFoodChangedEvent.add(this.updateAmountOfFoodListener, this);
        this.level.player.fartometerChangedEvent.add(this.updateFartometerListener, this);
        this.level.player.successfulShitsChangedEvent.add(this.updateSuccessfulShitsListener, this);
    }

    updateAmountOfShitsListener(context, amountOfShits) {
        this.shitCounter.draw(amountOfShits, context.amountOfFood);
    }

    updateAmountOfFoodListener(context, amountOfFood) {
        this.shitCounter.draw(context.amountOfShits, amountOfFood);
    }

    updateFartometerListener(context, fartometer) {
        this.fartometer.draw(fartometer);
    }

    updateSuccessfulShitsListener(context, successfulShits) {
        this.successfulShitsText.text = successfulShits;
    }

}