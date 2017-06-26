import Player from './../objects/player/Player';
import Collectables from './../objects/collectable/Collectables';
import Enemies from './../objects/enemy/Enemies';
import Platforms from './../objects/platforms/Platforms';
import Obstacles from './../objects/obstacles/Obstacles';
import Toilet from './../objects/toilet/Toilet';
import LevelUI from './../ui/LevelUI';
import Controls from './../input/Controls';

/**
 *
 */
export default class GameState extends Phaser.State
{
    /**
     *
     */
	create()
    {
        this.game.stage.backgroundColor = '#71c5cf';

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.world.setBounds(0, 0,  2000, this.game.height * 1.2);

        this.controls = new Controls(this.game);

        this.worldObjects = this.game.add.group();

        this.player = new Player(this.game, this, this.controls, 100, this.game.world.height * 0.9);
        this.worldObjects.add(this.player);

        this.collectables =  new Collectables(this.game, this);
        this.worldObjects.add(this.collectables);

        this.timer = this.game.time.events.loop(1500, this.collectables.createCollectable, this.collectables);

<<<<<<< HEAD
        this.enemies = new Enemies(this.game, this);
        this.worldObjects.add(this.enemies);

        this.platforms = new Platforms(this.game, this);
        this.worldObjects.add(this.platforms);

=======
        this.items = this.game.add.group();
        this.platforms = new Platforms(this.game, this);
        this.enemies = new Enemies(this.game, this);
>>>>>>> 1fb547308f7266dda81eca1c0e9792191408ea17
        this.obstacles = new Obstacles(this.game, this);
        this.worldObjects.add(this.obstacles);

        this.toilet = new Toilet(this.game, Math.random() * this.game.width, this.game.world.height - this.platforms.floor.height);
        this.worldObjects.add(this.toilet);

        this.levelUI = new LevelUI(this.game, this);

        this.addEventListener();

        this.player.init();

        this.game.camera.y = this.game.world.height * 0.9;
        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON);
        this.game.camera.deadzone =new Phaser.Rectangle(this.game.width * 0.4, - (this.game.world.height - this.game.height), this.game.width * 0.2, (this.game.world.height - this.game.height) + this.game.height * 0.4);
    }

    /**
     *
     */
    addEventListener()
    {
	    this.levelUI.addEventListener();
	    this.player.addEventListener();
        this.player.deathEvent.add(this.restart, this);
    }


    /**
     * This function is called 60 times per second.
     * It contains the game's logic.
     */
    update() {
        this.handleCollisions();
        this.handleInput();
        this.player.update();
        this.debug();
    }

    /**
     *
     */
    debug()
    {
        this.toilet.debug();
    }


    /**
     *
     */
    handleInput()
    {
        this.controls.pauseKey.onDown.add(this.togglePause, this);
    }

    /**
     * Check for collisions.
     */
    handleCollisions()
    {
        // Player & Platforms (including Toilets)
        this.game.physics.arcade.collide(
            this.player,
            [...this.toilet.getHitBox(), this.platforms],
            function(player, platform) {
                this.player.hitPlatform(platform);
            }, null, this
        );
        // Player & Obstacles
        this.game.physics.arcade.overlap(
            this.player, this.obstacles, function(player, obstacle) {
                player.die();
            }, null, this
        );
        // Player & Items
        this.game.physics.arcade.overlap(
            this.player, this.collectables, function(player, item) {
                player.collectItem(item);
                item.isCollected();
            }, null, this
        );

        // Bullets & Platforms & Obstacles
<<<<<<< HEAD
        this.game.physics.arcade.collide(this.player.bullets, [this.platforms, this.obstacles], function(bullet, platform) {
            bullet.hitSomething(platform);
        }, null, this);
        // Bullets & Enemies
        this.game.physics.arcade.overlap(
            this.player.bullets, this.enemies, function(bullet, enemy) {
                enemy.isHit(bullet);
                bullet.hitSomething(enemy);
            }, null, this
        );
        // Bullets & Toilets
        this.game.physics.arcade.overlap(
            this.player.bullets,
            [...this.toilet.getHitBox()],
            function(bullet, hitbox) {
                hitbox.isHit.call(this.toilet, bullet, hitbox);
                bullet.hitSomething(hitbox);
            }.bind(this), null, this
        );
    }

    /**
     *
     */
=======
        this.game.physics.arcade.overlap(this.player.bullets,
            [this.platforms, this.obstacles, this.toilets.toilet.getHitBox(), this.enemies],
            function(bullet, something) {
                bullet.hitSomething(bullet, something);
                something.isHit.call(something, bullet, something);
            }, null, this);
    }

>>>>>>> 1fb547308f7266dda81eca1c0e9792191408ea17
    togglePause()
    {
        this.game.physics.arcade.isPaused = !this.game.physics.arcade.isPaused;
    }
<<<<<<< HEAD

    /**
     *
     */
=======
    // Restart the game
>>>>>>> 1fb547308f7266dda81eca1c0e9792191408ea17
    restart()
    {
        this.game.state.restart(true);
    }

}
