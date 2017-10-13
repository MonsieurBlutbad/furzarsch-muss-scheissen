import Spikes from './Spikes';
import Box from './Box';
import Scythe from './Scythe';

export default class Obstacles extends Phaser.Group {

    constructor(game, level) {
        super(game);
        this.game = game;
        this.level = level;
        this.groups = [];
    }

    /**
     * @param x
     * @param y
     * @returns {Box}
     */
    addBox(x, y)
    {
        let box = new Box(this.game, this.level, x, y);
        this.add(box);

        return box;
    }

    /**
     * @param x
     * @param y
     * @returns {Spikes}
     */
    addSpikes(x, y)
    {
        let spikes = new Spikes(this.game, x, y);
        this.add(spikes);

        return spikes;
    }

    /**
     * @param x
     * @param y
     * @returns {Scythe}
     */
    addScythe(x, y)
    {
        let scythe = new Scythe(this.game, x, y);
        this.add(scythe);
        this.game.add.group(scythe);
        this.groups.push(scythe);
        return scythe;
    }

    /**
     *
     */
    update()
    {
        this.forEachExists(
            function(child) {
                if (typeof child.update !== 'undefined') {
                    child.update();
                }
            }
        )
    }
}
