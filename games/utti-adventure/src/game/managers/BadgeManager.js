import { BADGES } from '../data/badges.js';
import { PROVINCES } from '../data/provinces.js';
import { CORRECT_PER_BADGE } from '../config/constants.js';
export default class BadgeManager {
  // opts.unlockAll: debug switch (?unlockall=1) that opens every chapter for testing.
  constructor(storage, opts = {}) { this.storage = storage; this.unlockAll = !!opts.unlockAll; }
  getAllBadges(provinceId) { return provinceId ? BADGES.filter(b => b.provinceId === provinceId) : BADGES.slice(); }
  getBadge(id) { return BADGES.find(b => b.id === id); }
  getUnlockedBadges(provinceId) { return this.getAllBadges(provinceId).filter(b => this.isBadgeUnlocked(b.id)); }
  isBadgeUnlocked(id) { return !!this.storage.getBadges()[id]; }
  unlockedAt(id) { return this.storage.getBadges()[id]?.unlockedAt || null; }
  getBadgeProgress(id) { return this.isBadgeUnlocked(id) ? CORRECT_PER_BADGE : Math.min(CORRECT_PER_BADGE, this.storage.getProgress(id)); }
  // The badge currently being earned: first locked badge of the province, in order.
  getTargetBadge(provinceId) { return this.getAllBadges(provinceId).find(b => !this.isBadgeUnlocked(b.id)) || null; }
  // Called for each correct answer. 5 correct answers = 1 badge. Never duplicates a badge or a completion reward.
  addCorrect(provinceId) {
    const b = this.getTargetBadge(provinceId);
    if (!b) return { badge: null, count: CORRECT_PER_BADGE, needed: CORRECT_PER_BADGE, newlyUnlocked: false, newlyCompleted: false, unlockedProvince: null };
    const count = this.storage.getProgress(b.id) + 1;
    this.storage.setProgress(b.id, count);
    let newlyUnlocked = false, newlyCompleted = false, unlockedProvince = null;
    if (count >= CORRECT_PER_BADGE) {
      newlyUnlocked = this.storage.saveBadge(b.id);
      if (newlyUnlocked && this.isProvinceCompleted(provinceId)) {
        newlyCompleted = this.storage.saveCompleted(provinceId);
        const i = PROVINCES.findIndex(p => p.id === provinceId); unlockedProvince = PROVINCES[i + 1] || null;
      }
    }
    return { badge: b, count: Math.min(count, CORRECT_PER_BADGE), needed: CORRECT_PER_BADGE, newlyUnlocked, newlyCompleted, unlockedProvince };
  }
  getCollectionProgress(provinceId) { const all = this.getAllBadges(provinceId); return { count: all.filter(b => this.isBadgeUnlocked(b.id)).length, total: all.length }; }
  isProvinceCompleted(provinceId) { const p = this.getCollectionProgress(provinceId); return p.total > 0 && p.count === p.total; }
  // Chapter gating: province N+1 opens when province N is fully completed.
  isProvinceUnlocked(provinceId) {
    if (this.unlockAll) return true;
    const i = PROVINCES.findIndex(p => p.id === provinceId); if (i <= 0) return i === 0;
    return this.isProvinceCompleted(PROVINCES[i - 1].id);
  }
  firstUnlockedProvince() { return (PROVINCES.find(p => this.isProvinceUnlocked(p.id)) || PROVINCES[0]).id; }
}
