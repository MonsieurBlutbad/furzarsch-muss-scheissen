const WIDTH = 1024;
const HEIGHT = 800;

const GRAVITY = 1500;
const JUMP_SPEED = 400;
const ROTATION_SPEED = 5;
const PARTICLE_BOUNCE = 0.3;

const FART_PARTICLE_MIN_SPEED = 120;
const FART_PARTICLE_MAX_SPEED = 160;

// Create our 'main' state that will contain the game
var mainState = {
    preload: function() {
        // This function will be executed at the beginning
        // That's where we load the images and sounds

        // Load the bird sprite
        game.load.image('bird', 'assets/bird.png');

        game.load.image('fart_particle', 'assets/fart-particle.png');

        game.load.image('bean', 'assets/bean.png');

        game.load.audio('jump', 'assets/jump.wav');
    },

    create: function() {
        // This function is called after the preload function
        // Here we set up the game, display sprites, etc.

        game.stage.backgroundColor = '#71c5cf';

        // Set the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Display the bird at the position x=100 and y=245
        this.bird = game.add.sprite(100, 245, 'bird');
        this.bird.anchor.setTo(0.5, 0.5);

        // Add physics to the bird
        // Needed for: movements, gravity, collisions, etc.
        game.physics.arcade.enable(this.bird);

        // Add gravity to the bird to make it fall
        this.bird.body.gravity.y = GRAVITY;

        // Call the 'jump' function when the spacekey is hit
        this.spaceKey = game.input.keyboard.addKey(
            Phaser.Keyboard.SPACEBAR);

        this.cursors = game.input.keyboard.createCursorKeys();

        this.fartoMeter = 1000;
        this.fartoMeterText = game.add.text(20, 20, this.fartoMeter, { font: "30px Arial", fill: "#ffffff" });

        this.jumpSound = game.add.audio('jump');

        this.fartEmitter = game.add.emitter(0, 0, 1000);
        this.fartEmitter.bounce.setTo(PARTICLE_BOUNCE, PARTICLE_BOUNCE);
        this.fartEmitter.setXSpeed(-40, 40);
        this.fartEmitter.setYSpeed(FART_PARTICLE_MIN_SPEED, FART_PARTICLE_MAX_SPEED);
        this.fartEmitter.makeParticles('fart_particle', 0, 200, 0, false);
        // explode, lifespan, frequency, quantity
        this.fartEmitter.start(false, 400, 10, 1);
        this.fartEmitter.on = false;

        this.bird.addChild(this.fartEmitter);
        this.fartEmitter.y = this.bird.height / 2;
        this.fartEmitter.lifespan = 500;

        this.items = game.add.group();

        this.timer = game.time.events.loop(1500, this.dropItem, this);
    },

    dropItem: function() {
        // Create a pipe at the position x and y
        var item = game.add.sprite(Math.random() * WIDTH, 0, 'bean');

        // Add the pipe to our previously created group
        this.items.add(item);

        // Enable physics on the pipe
        game.physics.arcade.enable(item);

       item.body.gravity.y = GRAVITY / 2;

        // Automatically kill the pipe when it's no longer visible
        item.checkWorldBounds = true;
        item.outOfBoundsKill = true;
    },

    /**
     * This function is called 60 times per second.
     * It contains the game's logic.
     */
    update: function() {
        this.handleInput();

        // If the bird is out of the screen (too high or too low)
        // Call the 'restartGame' function
        if (this.bird.y < 0 || this.bird.y > HEIGHT)
            this.restartGame();

        game.physics.arcade.overlap(
            this.bird, this.items, this.collectItem, null, this
        );
    },

    collectItem: function(player, item) {
        this.fartoMeter += 200;
        this.fartoMeterText.setText(this.fartoMeter);
        item.kill();
    },

    handleInput: function() {
        if (this.cursors.down.isDown || this.cursors.left.isDown) {
            this.bird.angle -= ROTATION_SPEED;
        }
        if (this.cursors.up.isDown || this.cursors.right.isDown) {
            this.bird.angle += ROTATION_SPEED;
        }

        if (this.spaceKey.isDown) {
            this.jump();
        }

        this.fartEmitter.forEachAlive( function(p) {
            p.alpha= p.lifespan / this.fartEmitter.lifespan * 4;
        }.bind(this));
    },

    // Make the bird jump
    jump: function() {
        if (this.bird.alive == false) {
            return;
        }

        if (!this.fartoMeter > 0) {
            return;
        }

     //   this.jumpSound.play();
        this.fartEmitter.on = true;

        // Add a vertical velocity to the bird
        this.bird.body.velocity.y = -JUMP_SPEED * Math.cos(this.bird.angle * Math.PI / 180);
        this.bird.body.velocity.x = JUMP_SPEED * Math.sin(this.bird.angle * Math.PI / 180);

        this.fartoMeter --;
        this.fartoMeterText.setText(this.fartoMeter);
    },

    // Restart the game
    restartGame: function() {
        // Start the 'main' state, which restarts the game
        game.state.start('main');
    }
};

// Initialize Phaser, and create a 400px by 490px game
var game = new Phaser.Game(WIDTH, HEIGHT);

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState);

// Start the state to actually start the game
game.state.start('main');