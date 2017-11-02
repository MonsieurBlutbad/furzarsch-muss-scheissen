import Fartometer from './Fartometer';
import ShitCounter from './ShitCounter';
import Score from './Score';
import Highscore from './Highscore';

export default class LevelUI extends Phaser.Group {
    constructor(game, level) {
		super(game);
		this.game = game;
		this.level = level;
        this.fixedToCamera = true;
        this.fartometer = new Fartometer(this.game, 0, 20, 20, this.level.player.fartometer, 20, this.level.player);
        this.add(this.fartometer);
        this.shitCounter = new ShitCounter(this.game, 20, 50, 0, this.level.player.amountOfFood);
        this.add(this.shitCounter);
        this.score = new Score(this.game, 20, 100);
        this.add(this.score);
        this.highscore = new Highscore(this.game, 0, 0);
        this.add(this.highscore);
    }

    addEventListener() {
        this.level.player.amountOfShitsChangedEvent.add(this.updateAmountOfShitsListener, this);
        this.level.player.amountOfFoodChangedEvent.add(this.updateAmountOfFoodListener, this);
        this.level.player.fartometerChangedEvent.add(this.updateFartometerListener, this);
        this.level.player.scoreChangedEvent.add(this.score.updateScoreListener, this.score);
    }

    updateAmountOfShitsListener(context, amountOfShits) {
        this.shitCounter.draw(amountOfShits, context.amountOfFood);
    }

    updateAmountOfFoodListener(context, amountOfFood) {
        this.shitCounter.draw(context.amountOfShits, amountOfFood);
    }

    updateFartometerListener(context, fartometer, fartometerMax) {
        this.fartometer.draw(fartometer, fartometerMax);
    }

}