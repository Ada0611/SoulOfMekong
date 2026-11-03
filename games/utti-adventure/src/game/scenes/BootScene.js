import Phaser from 'phaser';
export default class BootScene extends Phaser.Scene {
  constructor() { super('BootScene'); }
  create() {
    this.input.mouse?.disableContextMenu();
    this.scene.start('PreloadScene');
  }
}
