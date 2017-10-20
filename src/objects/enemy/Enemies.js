import EvilAss from './EvilAss';
import Dick from './Dick';

export default class Enemies extends Phaser.Group
{
    constructor(game, level, player)
    {
		super(game);
        this.game = game;
        this.level = level;
        this.player = player;
    }

    addEvilAss(x, y)
    {
        let evilAss = new EvilAss(this.game, x, y);
        this.add(evilAss);
    }

    addDick(x, y)
    {
        let dick = new Dick(this.game, this.player, x, y);
        this.add(dick);
    }

    update()
    {
        this.forEachExists(
            function(child)
            {
                child.update();
            }
        );
    }
}