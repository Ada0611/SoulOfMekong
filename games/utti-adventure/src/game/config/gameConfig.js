import Phaser from 'phaser';
import { W, H, PHYSICS } from './constants.js';
import BootScene from '../scenes/BootScene.js';
import PreloadScene from '../scenes/PreloadScene.js';
import MainMenuScene from '../scenes/MainMenuScene.js';
import GameScene from '../scenes/GameScene.js';
import QuizScene from '../scenes/QuizScene.js';
import GameOverScene from '../scenes/GameOverScene.js';
import BadgeCollectionScene from '../scenes/BadgeCollectionScene.js';
import HowToPlayScene from '../scenes/HowToPlayScene.js';

export default {
  type: Phaser.AUTO,
  parent: 'game',
  width: W, height: H,
  backgroundColor: '#1c2b1e',
  physics: { default: 'arcade', arcade: { gravity: { y: PHYSICS.gravity }, debug: false } },
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
  input: { activePointers: 3 },
  render: { antialias: true, roundPixels: false },
  scene: [BootScene, PreloadScene, MainMenuScene, GameScene, QuizScene, GameOverScene, BadgeCollectionScene, HowToPlayScene]
};
