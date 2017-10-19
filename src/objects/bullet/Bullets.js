import Shit from './Shit';
import EvilShit from './EvilShit';
import Diarrhea from './Diarrhea';

export default class Bullets extends Phaser.Group
{

    constructor(game, shooter)
    {
		super(game);
		this.shooter = shooter;
    }

    createBullet(x, y, velocity, Bullet = Shit)
    {
        let sprite = new Bullet(this.game, x, y, velocity);
        this.add(sprite);
    }
}