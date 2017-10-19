import {WIDTH, HEIGHT, BACKGROUND_MOUNTAINS_SPEED} from './../../settings/Settings';

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
        this.move = true;
    }

    /**
     *
     */
    update()
    {
        if (this.move) {
            this.tilePosition.x += BACKGROUND_MOUNTAINS_SPEED;
        }
    }

}