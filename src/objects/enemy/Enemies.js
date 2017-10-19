import EvilAss from './EvilAss';

export default class Enemies extends Phaser.Group
{
    constructor(game, level)
    {
		super(game);
        this.game = game;
        this.level = level;
    }

    addEvilAss(x, y)
    {
        let evilAss = new EvilAss(this.game, x, y);
        this.add(evilAss);
    }
}