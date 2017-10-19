import Flesh from './Flesh';
import AssCheekLeft from './AssCheekLeft';
import AssCheekRight from './AssCheekRight';

/**
 * DeadPlayer Group
 */
export default class DeadPlayer extends Phaser.Group {
    /**
     * DeadPlayer Constructor.
     *
     * @param game
     * @param player
     */
    constructor(game, player) {
		super(game);
		this.player = player;
		this.x = player.body.x;
		this.y = player.body.y;


		for (let i = 0; i < 5; i++) {
		    let flesh = new Flesh(this.game, this.player, this.getFleshKey());
            this.add(flesh);
        }

        let assCheekLeft = new AssCheekLeft(this.game, this.player);
		this.add(assCheekLeft);
        let assCheekRight = new AssCheekRight(this.game, this.player);
		this.add(assCheekRight);
   }

    getFleshKey()
    {
        switch (Math.floor(Math.random() * 2)) {
            case 0:
                return 'ass_flesh_01';
                break;
            case 1:
                return 'ass_blood_01';
                break;
        }
    }

}