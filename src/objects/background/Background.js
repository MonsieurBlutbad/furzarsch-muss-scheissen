import Sky from './Sky'
import Mountains from './Mountains'

export default class Background extends Phaser.Group {

    constructor(game)
    {
        super(game);
        this.game = game;
        this.sky = new Sky(this.game);
        this.add(this.sky);
        this.mountains = new Mountains(this.game);
        this.add(this.mountains);

        this.moveMountains = true;
    }


    /**
     *
     */
    update()
    {
        this.mountains.update();
    }

    /**
     *
     */
    onPlayerDeathStart()
    {
        this.mountains.move = false;
    }

}
