// Adapter layer for future SoulOfMekong website integration.
// V1 uses LocalStorage. A future API adapter can implement the same methods.
// SECURITY: local achievements are demo-only; a real backend must validate scores and rewards.
export default class GameIntegrationService {
  constructor(storage, adapter = null) { this.storage = storage; this.adapter = adapter; }
  getPlayerProfile() { return { bestScore: this.getBestScore(), unlockedBadges: this.getUnlockedBadges(), completed: this.storage.getCompleted() }; }
  getUnlockedBadges() { return this.adapter?.getUnlockedBadges?.() ?? this.storage.getBadges(); }
  saveUnlockedBadge(id) { this.adapter?.saveUnlockedBadge?.(id); return this.storage.saveBadge(id); }
  saveGameResult({ score, provinceId }) { this.adapter?.saveGameResult?.({ score, provinceId }); return this.storage.saveBestScore(score); }
  getBestScore() { return this.adapter?.getBestScore?.() ?? this.storage.getBestScore(); }
  async syncAchievements() { if (this.adapter?.syncAchievements) return this.adapter.syncAchievements(this.getPlayerProfile()); return { synced: false, reason: 'no-adapter' }; }
}
