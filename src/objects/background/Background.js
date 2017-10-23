import Sky from './Sky'
import Mountains from './Mountains'
import Clouds from './Clouds'

export default class Background extends Phaser.Group {

    constructor(game)
    {
        super(game);
        this.game = game;
        this.sky = new Sky(this.game);
        this.add(this.sky);
        this.mountains = new Mountains(this.game);
        this.add(this.mountains);
        this.clouds = new Clouds(this.game);
        this.add(this.clouds);
    }


    /**
     *
     */
    update()
    {
        this.mountains.update();
        this.clouds.update();
    }

    /**
     *
     */
    onPlayerDeathStart()
    {
        this.mountains.move = false;
        this.clouds.move = false;
    }

}
