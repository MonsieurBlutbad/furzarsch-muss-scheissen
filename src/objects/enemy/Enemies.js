import Penis from './Penis';
import Ass from './Ass';

export default class Enemies extends Phaser.Group
{
    constructor(game, level)
    {
		super(game);
        this.game = game;
        this.level = level;
        this.createAss();
        for (let i = 0; i < 10; i++) {
       //     this.createEnemy();
        }
    }

    createAss()
    {
        let ass = new Ass(this.game, Math.random() * this.game.width, this.game.world.height - this.level.platforms.floor.height);
        this.add(ass);
    }

    createPenis()
    {
        let enemy = new Penis(this.game, Math.random() * this.game.width, Math.random() * this.game.height);
        this.add(enemy);
    }
}