/**
 * Created by BK on 06.06.17.
 */
const MIN_SCALE = 1.1;
const MAX_SCALE = 1.8;
const MAX_INCREMENT = 2000;

export default class Score extends Phaser.Text {

    constructor(game, x, y) {
       super(game, x, y, '', { font: "32px Arial", fill: "#ffffff", align: "left" });
       this.game = game;
       this.text = 0;
       this.anchor.setTo(0,0.5);
    }

    updateScoreListener(player, score, increment) {
        let newPoints = this.game.add.text(player.lastShittedToilet.x, player.lastShittedToilet.y, increment, { font: "32px Arial", fill: "#00ff00", align: "left"});
        this.game.add.tween(newPoints).to({y: newPoints.y - 100}, 1000, "Linear", true);
        this.game.add.tween(newPoints).to({alpha: 0}, 1000, "Linear", true);
        this.text = score;
        this.tweenTint(this, 0x00ff00, 0xffffff, 800);
        const scale = increment / MAX_INCREMENT * (MAX_SCALE - MIN_SCALE) + MIN_SCALE;
        const scaleTween = this.game.add.tween(this.scale).to( {x: scale, y: scale }, 100, "Linear", true);
        scaleTween.onComplete.add(function() {
            this.game.add.tween(this.scale).to( {x: 1, y: 1 }, 300, "Linear", true);
        }, this);
    }

    tweenTint(obj, startColor, endColor, time) {
        // create an object to tween with our step value at 0
        let colorBlend = {step: 0};
        // create the tween on this object and tween its step property to 100
        let colorTween = this.game.add.tween(colorBlend).to({step: 100}, time);
        // run the interpolateColor function every time the tween updates, feeding it the
        // updated value of our tween each time, and set the result as our tint
        colorTween.onUpdateCallback(function() {
            obj.tint = Phaser.Color.interpolateColor(startColor, endColor, 100, colorBlend.step);
        });
        // set the object to the start color straight away
        obj.tint = startColor;
        // start the tween
        colorTween.start();
    }

}
