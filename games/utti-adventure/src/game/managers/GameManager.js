import { STATE, MAX_LIVES } from '../config/constants.js';
import StorageService from '../services/StorageService.js';
import GameIntegrationService from '../services/GameIntegrationService.js';
import BadgeManager from './BadgeManager.js';
import QuizManager from './QuizManager.js';
import AudioManager from './AudioManager.js';
const storage = new StorageService();
const unlockAll = typeof location !== 'undefined' && /[?&]unlockall(=1)?(&|$)/.test(location.search || '');
const badges = new BadgeManager(storage, { unlockAll });
class GameManager {
  constructor() {
    this.storage = storage; this.badges = badges; this.quiz = new QuizManager(badges, storage);
    this.integration = new GameIntegrationService(storage); this.audio = new AudioManager();
    this.audio.init(storage.getSettings()); this.state = STATE.MENU; this.resetRun();
  }
  get provinceId() { const id = this.storage.getSettings().selectedProvince; return this.badges.isProvinceUnlocked(id) ? id : this.badges.firstUnlockedProvince(); }
  setProvince(id) { this.storage.saveSettings({ selectedProvince: id }); }
  resetRun() { this.lives = MAX_LIVES; this.asked = new Set(); this.newBadges = []; this.correct = 0; this.wrong = 0; this.unlockedProvince = null; }
}
export default new GameManager();
