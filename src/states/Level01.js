import Player from './../objects/player/Player';
import Collectables from './../objects/collectable/Collectables';
import Enemies from './../objects/enemy/Enemies';
import Platforms from './../objects/platforms/Platforms';
import Obstacles from './../objects/obstacles/Obstacles';
import Toilets from './../objects/toilet/Toilets';
import LevelUI from './../ui/LevelUI';
import Controls from './../input/Controls';

export default class GameState extends Phaser.State {

	create() {
        this.game.stage.backgroundColor = '#71c5cf';

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.world.setBounds(0, 0,  2000, this.game.height * 1.2);

        this.controls = new Controls(this.game);
        
        this.player = new Player(this.game, this, this.controls, 100, 245);

        this.collectables =  new Collectables(this.game, this);
        this.timer = this.game.time.events.loop(1500, this.collectables.createCollectable, this.collectables);

        this.items = this.game.add.group();
        this.enemies = new Enemies(this.game, this);
        this.platforms = new Platforms(this.game, this);
        this.obstacles = new Obstacles(this.game, this);
        this.toilets = new Toilets(this.game, this);

        this.levelUI = new LevelUI(this.game, this);

        this.addEventListener();

        this.player.init();

        this.playerGroup = this.game.add.group();
        this.playerGroup.add(this.player);

        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON);
    }

    addEventListener() {
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

    debug() {
        this.toilets.debug();
    }


    handleInput() {
        this.controls.pauseKey.onDown.add(this.togglePause, this);
    }

    /**
     * Check for collisions.
     */
    handleCollisions() {
        // Player & Platforms (including Toilets)
        this.game.physics.arcade.collide(this.player, [...this.toilets.toilet.getHitBox(), this.platforms], function(player, platform) {
                this.player.hitPlatform(platform);
            }, null,  this
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
            this.player.bullets, ...this.toilets.toilet.getHitBox(), function(bullet, toilet) {
                toilet.isHit.call(this.toilets.toilet, bullet, toilet);
                bullet.hitSomething.call(bullet, toilet);
            }, null, this
        );
    }

    togglePause() {
        this.game.physics.arcade.isPaused = !this.game.physics.arcade.isPaused;

    }
    // Restart the game
    restart() {
        this.game.state.restart(true);
    }

}
