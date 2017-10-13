import ScytheBox from './ScytheBox';
import ScytheStick from './ScytheStick';
import ScytheBlade from './ScytheBlade';

/**
 * Class Box.
 */
export default class Scythe extends Phaser.Group {

    /**
     * @param game
     * @param x
     * @param y
     */
    constructor(game, x, y) {
		super(game);
		this.game = game;
		this.box = new ScytheBox(this.game, x, y);
		this.add(this.box);
		this.stick = new ScytheStick(this.game, 0, -112);
        this.box.addChild(this.stick);
		this.blade = new ScytheBlade(this.game, 32, -208);
        this.box.addChild(this.blade);
    }

    update()
	{
		this.box.angle += 1;
	}
}