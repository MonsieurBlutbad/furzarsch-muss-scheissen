
export default class Controls {
    constructor(game) {
        this.game = game;
        this.fartKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.shitKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.rotateLeftKey = this.cursors.left;
        this.rotateRightKey = this.cursors.right;
        this.pauseKey = this.game.input.keyboard.addKey(Phaser.Keyboard.P);
    }
}