import Phaser from 'phaser';
import config from './game/config/gameConfig.js';
const game = new Phaser.Game(config);
window.__uttiGame = game; // handy for debugging / e2e tests
