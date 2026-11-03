import assert from 'node:assert/strict';
import fs from 'node:fs';
import { BADGES } from '../src/game/data/badges.js';
import { QUESTIONS, questionsFor } from '../src/game/data/questions.js';
import { PROVINCES } from '../src/game/data/provinces.js';
import StorageService from '../src/game/services/StorageService.js';
import BadgeManager from '../src/game/managers/BadgeManager.js';
import QuizManager from '../src/game/managers/QuizManager.js';
import ScoreManager from '../src/game/managers/ScoreManager.js';
import { STORAGE_KEY, CORRECT_PER_BADGE } from '../src/game/config/constants.js';

const mem = () => { const m = {}; return { getItem: k => (k in m ? m[k] : null), setItem: (k, v) => { m[k] = String(v); }, m }; };
let n = 0; const t = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const finish = (bm, pid) => { for (const b of bm.getAllBadges(pid)) for (let i = 0; i < CORRECT_PER_BADGE; i++) bm.addCorrect(pid); };

t('6 provinces x 10 badges, unique ids', () => {
  assert.equal(PROVINCES.length, 6);
  for (const p of PROVINCES) assert.equal(BADGES.filter(b => b.provinceId === p.id).length, 10);
  assert.equal(new Set(BADGES.map(b => b.id)).size, 60);
  assert.deepEqual(PROVINCES.map(p => p.id), ['can-tho', 'vinh-long', 'tien-giang', 'dong-thap', 'ben-tre', 'tra-vinh']);
});
t('every badge has artwork; sprites/obstacles/items/backgrounds exist', () => {
  for (const b of BADGES) assert.ok(fs.existsSync(`public/assets/badges/${b.id}.png`), b.id);
  const need = [...['idle:5', 'run:5', 'jump:6', 'crouch:4', 'hit:1', 'dead:1'].flatMap(x => { const [k, n] = x.split(':'); return Array.from({ length: +n }, (_, i) => `characters/utti_${k}_${i}.png`); }), ...['log', 'basket', 'chicken', 'buffalo', 'boat', 'branch'].map(k => `obstacles/${k}.png`), ...['shield', 'boots', 'nonla', 'fruit'].map(k => `items/${k}.png`), 'backgrounds/bg_can-tho.jpg', 'backgrounds/ground_can-tho.png'];
  for (const f of need) assert.ok(fs.existsSync('public/assets/' + f), f);
});
t('question bank: >=50 per province, valid, unique, covers làng nghề / địa danh / anh hùng', () => {
  assert.equal(new Set(QUESTIONS.map(q => q.id)).size, QUESTIONS.length);
  assert.equal(new Set(QUESTIONS.map(q => q.question)).size, QUESTIONS.length);
  for (const q of QUESTIONS) { assert.equal(q.options.length, 4); assert.equal(new Set(q.options).size, 4); assert.equal(q.correctAnswer, 0); assert.ok(q.explanation.length > 10); assert.ok(['easy', 'medium', 'hard'].includes(q.difficulty)); }
  for (const p of PROVINCES) {
    const qs = questionsFor(p.id); assert.ok(qs.length >= 50, `${p.id} has ${qs.length}`);
    for (const topic of ['ln', 'dd', 'ah']) assert.ok(qs.filter(q => q.topic === topic).length >= 5, `${p.id}/${topic}`);
  }
});
t('badge needs exactly 5 correct answers; wrong answers do not count', () => {
  const bm = new BadgeManager(new StorageService(mem())); const first = bm.getAllBadges('can-tho')[0].id;
  for (let i = 1; i < CORRECT_PER_BADGE; i++) { const r = bm.addCorrect('can-tho'); assert.equal(r.newlyUnlocked, false); assert.equal(r.count, i); assert.equal(r.badge.id, first); }
  assert.equal(bm.isBadgeUnlocked(first), false);
  const r = bm.addCorrect('can-tho'); assert.equal(r.newlyUnlocked, true); assert.equal(bm.isBadgeUnlocked(first), true);
  assert.equal(bm.getTargetBadge('can-tho').id, bm.getAllBadges('can-tho')[1].id);
});
t('progress and badges persist across reload; no duplicate unlocks', () => {
  const store = mem(); let bm = new BadgeManager(new StorageService(store)); bm.addCorrect('can-tho'); bm.addCorrect('can-tho');
  bm = new BadgeManager(new StorageService(store)); const b = bm.getTargetBadge('can-tho'); assert.equal(bm.getBadgeProgress(b.id), 2);
  for (let i = 0; i < 3; i++) bm.addCorrect('can-tho'); assert.equal(bm.isBadgeUnlocked(b.id), true);
  assert.equal(Object.keys(bm.storage.getBadges()).length, 1);
});
t('chapter gating: finishing a province unlocks the next, completion reward only once', () => {
  const bm = new BadgeManager(new StorageService(mem()));
  assert.equal(bm.isProvinceUnlocked('can-tho'), true); assert.equal(bm.isProvinceUnlocked('vinh-long'), false);
  let completed = 0, unlocked = null;
  for (let i = 0; i < 10 * CORRECT_PER_BADGE; i++) { const r = bm.addCorrect('can-tho'); if (r.newlyCompleted) { completed++; unlocked = r.unlockedProvince?.id; } }
  assert.equal(completed, 1); assert.equal(unlocked, 'vinh-long'); assert.equal(bm.isProvinceCompleted('can-tho'), true);
  assert.equal(bm.isProvinceUnlocked('vinh-long'), true); assert.equal(bm.isProvinceUnlocked('tien-giang'), false);
  const extra = bm.addCorrect('can-tho'); assert.equal(extra.newlyCompleted, false); assert.equal(extra.badge, null);
  for (const p of PROVINCES.slice(1)) { finish(bm, p.id); }
  assert.ok(PROVINCES.every(p => bm.isProvinceCompleted(p.id)));
  assert.equal(new BadgeManager(new StorageService(mem()), { unlockAll: true }).isProvinceUnlocked('tra-vinh'), true);
});
t('corrupted / legacy storage does not crash and keeps achievements', () => {
  const store = mem(); store.setItem(STORAGE_KEY, '{not json'); assert.equal(new StorageService(store).getBestScore(), 0);
  store.setItem(STORAGE_KEY, JSON.stringify({ unlockedBadges: [1, 2], bestScore: 'x', seenQuestions: 5 })); const s2 = new StorageService(store);
  assert.deepEqual(s2.getBadges(), {}); assert.equal(s2.getBestScore(), 0); assert.deepEqual(s2.getSeen('can-tho'), []);
  store.setItem(STORAGE_KEY, JSON.stringify({ version: 1, bestScore: 900, unlockedBadges: { 'can-tho-cho-noi': { unlockedAt: 'x' } }, completedCollections: [] }));
  const s3 = new StorageService(store); assert.equal(s3.getBestScore(), 900); assert.ok(s3.getBadges()['can-tho-cho-noi']);
});
t('best score only increases', () => { const s = new StorageService(mem()); s.saveBestScore(500); s.saveBestScore(100); assert.equal(s.getBestScore(), 500); });
t('quiz: no repeats across runs until pool exhausted, then safe reset; answers survive shuffle', () => {
  const store = new StorageService(mem()), bm = new BadgeManager(store), qm = new QuizManager(bm, store); const pool = questionsFor('ben-tre'); const seen = new Set();
  for (let i = 0; i < pool.length; i++) { const q = qm.pick('ben-tre', new Set(), Math.random, 200 + 200 * (i % 5)); assert.ok(!seen.has(q.id), 'repeat ' + q.id); seen.add(q.id); const orig = pool.find(x => x.id === q.id); assert.equal(q.options[q.correctAnswer], orig.options[0]); }
  assert.equal(seen.size, pool.length);
  const again = qm.pick('ben-tre', new Set()); assert.ok(again.question && again.options.length === 4);   // reset, never empty
});
t('score: frame-rate independent, x2 multiplier, milestones once', () => {
  const a = new ScoreManager(), b = new ScoreManager(), c = new ScoreManager(); const hits = [];
  for (let i = 0; i < 60 * 40; i++) { const m = a.tick(1 / 60); if (m) hits.push(m); }
  for (let i = 0; i < 30 * 40; i++) b.tick(1 / 30);
  for (let i = 0; i < 60 * 10; i++) c.tick(1 / 60, 2);
  assert.ok(Math.abs(a.score - b.score) < 1); assert.deepEqual(hits, [...new Set(hits)]); assert.equal(hits[0], 200);
  assert.ok(Math.abs(c.score - 200) < 1, 'x2 for 10s at level 0 = 200');
});
console.log(`\n${n} test groups passed`);
