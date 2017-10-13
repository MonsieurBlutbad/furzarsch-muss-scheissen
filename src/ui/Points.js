/**
 * Created by BK on 06.06.17.
 */

const DURATION = 1000;

export default class Points extends Phaser.Text {

    constructor(game, x, y, points) {
        super(game, x, y, points, { font: "32px Arial", fill: "#00ff00", align: "left" });
        this.game = game;
        this.anchor.setTo(0.5,0.5);
        this.game.add.tween(this).to({y: this.y - 100}, DURATION, "Linear", true);
        this.game.add.tween(this).to({alpha: 0}, DURATION, "Linear", true);
        this.game.time.events.add(DURATION, function() {
            this.destroy.bind(this);
        }.bind(this), this);
    }


}
