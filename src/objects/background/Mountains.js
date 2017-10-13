import {WIDTH, HEIGHT} from './../../settings/Settings';

/**
 *
 */
export default class Mountains extends Phaser.TileSprite
{
    /**
     * @param game
     */
    constructor(game)
    {
        super(game, 0, 0, WIDTH, HEIGHT, 'background_mountains');

        this.tileScale.x = 1;
        this.tileScale.y = HEIGHT / WIDTH;

        this.fixedToCamera = true;
    }

}