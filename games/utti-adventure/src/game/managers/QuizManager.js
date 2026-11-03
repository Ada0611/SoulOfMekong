import { QUESTIONS } from '../data/questions.js';
import { MILESTONE_STEP } from '../config/constants.js';
export default class QuizManager {
  constructor(badgeManager, storage) { this.badges = badgeManager; this.storage = storage; this.lastTopic = null; }
  shuffle(arr, rng) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  prepare(q, rng) { const correct = q.options[q.correctAnswer], options = this.shuffle(q.options, rng); return { ...q, options, correctAnswer: options.indexOf(correct) }; }
  // Difficulty ramps with the milestone number (200 -> easy, later -> harder).
  pickDifficulty(milestone, available, rng) {
    const k = Math.max(1, Math.round(milestone / MILESTONE_STEP));
    const w = { easy: Math.max(0.15, 0.6 - 0.1 * k), hard: Math.min(0.4, 0.05 + 0.07 * k) }; w.medium = 1 - w.easy - w.hard;
    const keys = ['easy', 'medium', 'hard'].filter(d => available.includes(d)); const sum = keys.reduce((s, d) => s + w[d], 0); let r = rng() * sum;
    for (const d of keys) { r -= w[d]; if (r <= 0) return d; } return keys[keys.length - 1];
  }
  // Never repeats a question within a run, nor across runs until the province's whole pool has been seen.
  pick(provinceId, askedRun = new Set(), rng = Math.random, milestone = MILESTONE_STEP) {
    const all = QUESTIONS.filter(q => q.provinceId === provinceId);
    let seen = new Set(this.storage ? this.storage.getSeen(provinceId) : []);
    let pool = all.filter(q => !seen.has(q.id) && !askedRun.has(q.id));
    if (!pool.length) { if (this.storage) this.storage.resetSeen(provinceId); seen = new Set(); pool = all.filter(q => !askedRun.has(q.id)); }
    if (!pool.length) { askedRun.clear(); pool = all; }
    const noRepeatTopic = pool.filter(q => q.topic !== this.lastTopic); if (noRepeatTopic.length) pool = noRepeatTopic;
    const d = this.pickDifficulty(milestone, [...new Set(pool.map(q => q.difficulty))], rng);
    const bucket = pool.filter(q => q.difficulty === d), q = (bucket.length ? bucket : pool)[Math.floor(rng() * (bucket.length || pool.length))];
    askedRun.add(q.id); this.lastTopic = q.topic; if (this.storage) this.storage.markSeen(provinceId, q.id);
    return this.prepare(q, rng);
  }
}
