import { STORAGE_KEY } from '../config/constants.js';
const defaults = () => ({
  version: 2, bestScore: 0, unlockedBadges: {}, badgeProgress: {}, seenQuestions: {}, completedCollections: [],
  settings: { musicEnabled: true, soundEnabled: true, volume: 0.7, selectedProvince: 'can-tho' }
});
const isObj = o => o && typeof o === 'object' && !Array.isArray(o);
export default class StorageService {
  constructor(store) { this.store = store || (typeof localStorage !== 'undefined' ? localStorage : null); this.data = null; }
  // Loads (and migrates v1 saves — achievements are never reset). Corrupted data falls back to defaults.
  load() {
    if (this.data) return this.data;
    const d = defaults();
    try {
      const raw = this.store && this.store.getItem(STORAGE_KEY);
      if (raw) {
        const p = JSON.parse(raw);
        if (isObj(p)) {
          d.bestScore = Number.isFinite(p.bestScore) ? p.bestScore : 0;
          if (isObj(p.unlockedBadges)) d.unlockedBadges = p.unlockedBadges;
          if (isObj(p.badgeProgress)) d.badgeProgress = p.badgeProgress;
          if (isObj(p.seenQuestions)) d.seenQuestions = p.seenQuestions;
          if (Array.isArray(p.completedCollections)) d.completedCollections = p.completedCollections;
          if (isObj(p.settings)) d.settings = { ...d.settings, ...p.settings };
        }
      }
    } catch (e) { console.warn('Save data corrupted, using defaults', e); }
    this.data = d; return d;
  }
  save() { try { if (this.store) this.store.setItem(STORAGE_KEY, JSON.stringify(this.load())); } catch (e) { console.warn('Cannot save', e); } }
  getBestScore() { return this.load().bestScore; }
  saveBestScore(s) { const d = this.load(); if (s > d.bestScore) { d.bestScore = Math.floor(s); this.save(); return true; } return false; }
  getBadges() { return this.load().unlockedBadges; }
  saveBadge(id, whenISO) { const d = this.load(); if (d.unlockedBadges[id]) return false; d.unlockedBadges[id] = { unlockedAt: whenISO || new Date().toISOString() }; this.save(); return true; }
  getProgress(id) { const v = this.load().badgeProgress[id]; return Number.isFinite(v) ? v : 0; }
  setProgress(id, n) { this.load().badgeProgress[id] = n; this.save(); }
  getSeen(pid) { const v = this.load().seenQuestions[pid]; return Array.isArray(v) ? v : []; }
  markSeen(pid, qid) { const d = this.load(); const a = this.getSeen(pid); if (!a.includes(qid)) a.push(qid); d.seenQuestions[pid] = a; this.save(); }
  resetSeen(pid) { this.load().seenQuestions[pid] = []; this.save(); }
  getCompleted() { return this.load().completedCollections; }
  saveCompleted(pid) { const d = this.load(); if (d.completedCollections.includes(pid)) return false; d.completedCollections.push(pid); this.save(); return true; }
  getSettings() { return this.load().settings; }
  saveSettings(s) { const d = this.load(); d.settings = { ...d.settings, ...s }; this.save(); }
}
