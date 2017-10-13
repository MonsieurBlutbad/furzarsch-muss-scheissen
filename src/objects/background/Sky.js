import {WIDTH, HEIGHT} from './../../settings/Settings';

/**
 *
 */
export default class Sky extends Phaser.TileSprite
{
    /**
     * @param game
     */
    constructor(game)
    {
        super(game, 0, 0, WIDTH, WIDTH, 'background_sky');
        this.fixedToCamera = true;
    }

}