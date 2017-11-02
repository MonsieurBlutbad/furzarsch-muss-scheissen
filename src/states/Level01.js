import Player from './../objects/player/Player';
import DeadPlayer from './../objects/player/DeadPlayer';
import Background from './../objects/background/Background';
import Collectables from './../objects/collectable/Collectables';
import Enemies from './../objects/enemy/Enemies';
import Obstacles from './../objects/obstacles/Obstacles';
import Toilets from './../objects/toilet/Toilets';
import LevelUI from './../ui/LevelUI';
import Controls from './../input/Controls';
import {WIDTH, HEIGHT, CAMERA_SPEED} from 'settings/Settings';
import Repository from './../persistance/Repository';

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
        console.log('Level create');

        this.currentScreen = 0;
        this.enteredNewScreenEvent = new Phaser.Signal();
        this.repository = new Repository();

        this.moveCamera = true;

        this.game.world.width = WIDTH * 2  ;
        this.game.world.height = HEIGHT;

        this.game.stage.backgroundColor = '#71c5cf';

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.controls = new Controls(this.game);

        this.worldObjects = this.game.add.group();

        this.game.world.setBounds(0, 0, this.game.world.width, this.game.world.height);

        this.background = new Background(this.game);
        this.worldObjects.add(this.background);

        this.player = new Player(this.game, this, this.controls, 400, this.game.world.height * 0.5);
        this.worldObjects.add(this.player);

        this.collectables =  new Collectables(this.game, this);
        this.worldObjects.add(this.collectables);

        this.obstacles = new Obstacles(this.game, this);
        this.worldObjects.add(this.obstacles);

        this.enemies = new Enemies(this.game, this, this.player);
        this.worldObjects.add(this.enemies);

        this.toilets = new Toilets(this.game, this);
        this.worldObjects.add(this.toilets);

        this.levelUI = new LevelUI(this.game, this);

        this.repository.getHighscore(1, this.levelUI.highscore.setText.bind(this.levelUI.highscore));

        this.addEventListener();

        this.player.init();

        this.game.camera.x = 0;
        this.game.camera.y = this.game.world.height * 0.9;

        this.addNewObjects(this.currentScreen);
        this.addNewObjects(this.currentScreen + 1);
    }

    /**
     * @param targetScreen
     */
    addNewObjects(targetScreen)
    {
        const gridWidth = 16;
        const gridHeight = 12;
        const gridFactorX = WIDTH / gridWidth;
        const gridFactorY = HEIGHT / gridHeight;

        let grid = [];

        for (let y = 0; y < gridHeight; y++) {
            for (let x = 0; x < gridWidth; x++) {
                grid.push([x * gridFactorX + 32, y * gridFactorY + 32]);
            }
        }

        const offsetX = targetScreen * WIDTH;

        for (let i = grid.length - gridWidth; i < grid.length; i++) {
            this.obstacles.addBox(offsetX + grid[i][0],  grid[i][1]);
        }

        grid.splice(grid.length - gridWidth, gridWidth);

        // Evil Ass
        for (let i = 0; i < 1; i++) {
            let gridIndex = grid.length - (Math.floor(Math.random() * (gridWidth - 2)) + 1);
            this.enemies.addEvilAss(offsetX + grid[gridIndex][0], grid[gridIndex][1]);
            if (gridIndex > -1) {
                grid.splice(gridIndex -1 , 3);
            }
        }

        // Box
        for (let i = 0; i < 8; i++) {
            let gridIndex = Math.floor(Math.random() * grid.length);
            this.obstacles.addBox(offsetX + grid[gridIndex][0],  grid[gridIndex][1]);
            if (gridIndex > -1) {
                grid.splice(gridIndex, 1);
            }
        }

        // Spikes
        for (let i = 0; i < 2; i++) {
            let gridIndex = Math.floor(Math.random() * grid.length);
            this.obstacles.addSpikes(offsetX + grid[gridIndex][0],  grid[gridIndex][1]);
            if (gridIndex > -1) {
                grid.splice(gridIndex, 1);
            }
        }

        // Dick
      /*  for (let i = 0; i < 1; i++) {
            let gridIndex = Math.floor(Math.random() * grid.length);
            this.enemies.addDick(offsetX + grid[gridIndex][0],  grid[gridIndex][1]);
            if (gridIndex > -1) {
                grid.splice(gridIndex, 1);
            }
        }*/
      // Woman
        for (let i = 0; i < 1; i++) {
            let gridIndex = Math.floor(Math.random() * grid.length);
            this.enemies.addMultiAss(offsetX + grid[gridIndex][0],  grid[gridIndex][1]);
            if (gridIndex > -1) {
                grid.splice(gridIndex, 1);
            }
        }

        // Burger
        for (let i = 0; i < 4; i++) {
            let gridIndex = Math.floor(Math.random() * grid.length);
            this.collectables.addBurger(offsetX + grid[gridIndex][0],  grid[gridIndex][1]);
            if (gridIndex > -1) {
                grid.splice(gridIndex, 1);
            }
        }
        // Sauerkraut
        for (let i = 0; i < 2; i++) {
            let gridIndex = Math.floor(Math.random() * grid.length);
            this.collectables.addSauerkraut(offsetX + grid[gridIndex][0],  grid[gridIndex][1]);
            if (gridIndex > -1) {
                grid.splice(gridIndex, 1);
            }
        }
        // Chili
        for (let i = 0; i < 2; i++) {
            let gridIndex = Math.floor(Math.random() * grid.length);
            this.collectables.addChili(offsetX + grid[gridIndex][0],  grid[gridIndex][1]);
            if (gridIndex > -1) {
                grid.splice(gridIndex, 1);
            }
        }

        // Toilet
        for (let i = 0; i < 2; i++) {
            let gridIndex = Math.floor(Math.random() * grid.length);
            this.toilets.addToilet(offsetX + grid[gridIndex][0], grid[gridIndex][1]);
            if (gridIndex > -1) {
                grid.splice(gridIndex, 1);
            }
        }
    }


    /**
     *
     */
    addEventListener()
    {
	    this.levelUI.addEventListener();
	    this.player.addEventListener();
        this.player.deathStartEvent.add(this.onPlayerDeathStart, this);
        this.player.deathStartEvent.add(this.background.onPlayerDeathStart, this.background);
        this.player.deathEvent.add(this.onPlayerDeath, this);
        this.player.deathStartEvent.add(this.repository.saveScore.bind(this.repository, 'test', this.player.getScore.bind(this.player)), this.repository);
        this.enteredNewScreenEvent.add(this.addNewObjects , this);
    }


    /**
     * This function is called 60 times per second.
     * It contains the game's logic.
     */
    update() {
        this.handleCollisions();
        this.handleInput();
        this.updateCamera();
        this.worldObjects.forEachExists(
            function(child) {
                if (typeof child.update !== 'undefined') {
                    child.update();
                }
            }
        );

        this.debug();
    }

    /**
     *
     */
    debug()
    {
       /* this.toilets.forEach(function(toilet) {
            toilet.debug();
        })*/
    }

    /**
     *
     */
    updateCamera()
    {
        if (this.moveCamera) {
            this.game.camera.x += CAMERA_SPEED;
            this.game.world.setBounds(this.game.camera.x, 0, this.game.world.width + CAMERA_SPEED, this.game.world.height);
            if (Math.floor(this.game.camera.x / WIDTH) > this.currentScreen) {
                this.currentScreen = Math.floor(this.game.camera.x / WIDTH);
                this.enteredNewScreenEvent.dispatch(this.currentScreen + 1);
            }
        }
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
     * TODO: CLEAN THIS UP
     */
    handleCollisions()
    {
        // Check if player is pushed offscreen... AND KILL HIM FOR IT!
        if (this.player.x < this.game.camera.x) {
            this.player.die();
        }

        const playerHitsObject = function(player, object) {
            if (object.alive) {
                player.hitsObject(object);
            }
        };

        const enemyBullets = [];

        this.enemies.forEachExists(function(child) {
            if (child.bullets) {
                enemyBullets.push(child.bullets);
            }
        });

        // Player & Toilets
        this.toilets.forEachExists(
            function(child) {
                this.game.physics.arcade.collide(
                    this.player,
                    [...child.getHitBox()],
                    playerHitsObject, null, this
                );
            }, this
        );
        // Player & Obstacles
        this.obstacles.forEachExists(
            function(child) {
                this.game.physics.arcade.collide(
                    this.player,
                    child.getHitBox(),
                    playerHitsObject, null, this
                );
            }, this
        );
        // Player & Enemies
        this.game.physics.arcade.overlap(
            this.player,
            this.enemies,
            playerHitsObject,
            function(player, enemy) {
                return enemy.alive;
            }, this
        );

        // Player & Items
        this.game.physics.arcade.overlap(
            this.player, this.collectables,
            function(player, item) {
                player.collectItem(item);
                item.isCollected();
            }, null, this
        );

        const somethingIsHitByBullet = function(something, bullet) {
            if (bullet.isArmed) {
                bullet.hitSomething(bullet, something);
                something.isHit.call(something, bullet, something);
            }
        };

        // Bullets & Obstacles
        this.obstacles.forEachExists(
            function(child) {
                this.game.physics.arcade.collide(
                    [
                        this.player.bullets,
                        ...enemyBullets
                    ],
                    child.getHitBox(),
                    somethingIsHitByBullet, null, this
                );
            }, this
        );

        // Enemy Bullets & Player
        this.game.physics.arcade.overlap(
            this.player,
            [...enemyBullets],
            function(player, bullet) {
                bullet.hitSomething(bullet, player);
                player.die();
            }
        );

        // Bullets & Enemies
        this.game.physics.arcade.overlap(
            [this.player.bullets, ...enemyBullets],
            this.enemies,
            function(bullet, enemy) {
                if (bullet.isArmed && enemy.alive) {
                    bullet.hitSomething(bullet, enemy);
                    enemy.isHit.call(enemy, bullet, enemy);
                }
            },
            function(bullet, enemy) {
                return bullet.isArmed && enemy.alive && bullet.shooter !== enemy;
            }, this
        );

        // Enemies & Obstacles
        this.game.physics.arcade.collide(
            this.obstacles, this.enemies,
            function(obstacle, enemy) {
                enemy.speed *= -1;
            },
            function(obstacle, enemy) {
                return enemy.alive;
            }, this
        );

        // Bullets & Toilets
        this.toilets.forEachExists(
            function(child) {
                this.game.physics.arcade.overlap(
                    [this.player.bullets, ...enemyBullets],
                    [...child.getHitBox()],
                    function(bullet, something) {
                        if (bullet.isArmed) {
                            bullet.hitSomething(bullet, something);
                            something.isHit.call(child, bullet, something);
                        }
                    }, null, this
                );
            }, this
        );
    }

    /**
     *
     */
    togglePause()
    {
        this.game.physics.arcade.isPaused = !this.game.physics.arcade.isPaused;
    }

    /**
     *
     */
    onPlayerDeathStart()
    {
        let deadPlayer = new DeadPlayer(this.game, this.player);
        this.worldObjects.add(deadPlayer);
        this.moveCamera = false;
    }

    /**
     *
     */
    onPlayerDeath()
    {
        this.restart();
    }

    /**
     *
     */
    restart()
    {
        this.game.state.start('Level01');
    }

}
