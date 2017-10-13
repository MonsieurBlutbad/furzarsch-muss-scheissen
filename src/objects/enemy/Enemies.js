import Penis from './Penis';
import Ass from './Ass';

export default class Enemies extends Phaser.Group
{
    constructor(game, level)
    {
		super(game);
        this.game = game;
        this.level = level;
        for (let i = 0; i < 10; i++) {
       //     this.createEnemy();
        }
    }

    createPenis()
    {
        let enemy = new Penis(this.game, Math.random() * this.game.width, Math.random() * this.game.height);
        this.add(enemy);
    }
}