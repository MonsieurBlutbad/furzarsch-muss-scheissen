import {WIDTH, HEIGHT, BACKGROUND_CLOUDS_SPEED} from './../../settings/Settings';

/**
 *
 */
export default class Clouds extends Phaser.TileSprite
{
    /**
     * @param game
     */
    constructor(game)
    {
        super(game, 0, 0, WIDTH, HEIGHT, 'background_clouds');

        this.tileScale.x = 1;
        this.tileScale.y = HEIGHT / WIDTH;

        this.fixedToCamera = true;
        this.move = true;
    }

    /**
     *
     */
    update()
    {
        if (this.move) {
            this.tilePosition.x += BACKGROUND_CLOUDS_SPEED;
        }
    }

}