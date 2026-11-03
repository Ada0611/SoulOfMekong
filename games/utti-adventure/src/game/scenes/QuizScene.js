import Phaser from 'phaser';
import { W, H, CORRECT_PER_BADGE } from '../config/constants.js';
import { getProvince } from '../data/provinces.js';
import { TOPIC_LABEL } from '../data/questions.js';
import { badgeTextureKey } from '../data/badges.js';
import gm from '../managers/GameManager.js';
import { txt, button, panel, pips } from '../ui/widgets.js';

const LETTERS = ['A', 'B', 'C', 'D'];
export default class QuizScene extends Phaser.Scene {
  constructor() { super('QuizScene'); }
  init(d) { this.q = d.question; this.pid = d.provinceId; this.sel = -1; this.answered = false; this.layer = null; this.res = null; }
  create() {
    this.add.rectangle(W / 2, H / 2, W, H, 0x000000, .6).setInteractive();      // blocks input to the game underneath
    this.burst = this.add.particles(0, 0, 'spark', { lifespan: 900, speed: { min: 80, max: 320 }, scale: { start: 1.4, end: 0 }, alpha: { start: 1, end: 0 }, gravityY: 200, emitting: false }).setDepth(100);
    this.showQuestion();
  }
  reset() { this.layer?.destroy(true); this.layer = this.add.container(0, 0); return this.layer; }
  progressHeader(L, y) {
    const t = gm.badges.getTargetBadge(this.pid);
    if (!t) { L.add(txt(this, W / 2, y, 18, '#2f7a2a').setText('Bạn đã sưu tầm đủ huy hiệu của tỉnh này. Cứ chơi cho vui nhé!')); return; }
    L.add(txt(this, W / 2, y, 18, '#6a3f12', { fontStyle: 'normal' }).setText(`Đang chinh phục huy hiệu: ${t.name}  (${gm.badges.getBadgeProgress(t.id)}/${CORRECT_PER_BADGE} câu đúng)`));
    L.add(pips(this, W / 2, y + 26, gm.badges.getBadgeProgress(t.id), CORRECT_PER_BADGE, 9, 8));
  }
  showQuestion() {
    const L = this.reset(); L.add(panel(this, W / 2, H / 2, 1000, 660));
    L.add(txt(this, W / 2, 78, 34, '#6a3f12').setText('THỬ THÁCH KHÁM PHÁ'));
    L.add(txt(this, W / 2, 112, 19, '#8a5a2b', { fontStyle: 'normal' }).setText(`Út Tí vừa khám phá một điều thú vị!  ·  ${TOPIC_LABEL[this.q.topic] || 'Văn hóa'} · ${getProvince(this.pid).name}`));
    this.progressHeader(L, 146);
    L.add(txt(this, W / 2, 245, 27, '#3a2410', { align: 'center', wordWrap: { width: 880 } }).setText(this.q.question));
    this.q.options.forEach((o, i) => { const on = this.sel === i; L.add(button(this, W / 2, 322 + i * 64, 880, 56, `${LETTERS[i]}.  ${o}`, () => { if (!this.answered) { this.sel = i; this.showQuestion(); } }, { color: on ? 0x3f8f3a : 0xb57a3a, size: 22 })); });
    L.add(button(this, W / 2, 602, 300, 60, 'XÁC NHẬN', () => this.confirm(), { color: this.sel >= 0 ? 0xd9822b : 0x777777 }));
  }
  confirm() {
    if (this.sel < 0 || this.answered) return; this.answered = true;
    const ok = this.sel === this.q.correctAnswer; let res = null;
    if (ok) {
      res = gm.badges.addCorrect(this.pid); gm.correct++; gm.audio.sfx('correct');
      if (res.newlyUnlocked) { gm.newBadges.push(res.badge.id); this.time.delayedCall(450, () => gm.audio.sfx('badge_unlock')); }
      if (res.unlockedProvince) gm.unlockedProvince = res.unlockedProvince.id;
    } else { gm.wrong++; gm.audio.sfx('incorrect'); }
    this.res = res; this.showResult(ok, res);
  }
  showResult(ok, res) {
    const L = this.reset(); L.add(panel(this, W / 2, H / 2, 1000, 660));
    L.add(txt(this, W / 2, 90, 46, ok ? '#2f7a2a' : '#b3262e').setText(ok ? 'CHÍNH XÁC!' : 'CHƯA CHÍNH XÁC!'));
    let y = 150;
    if (!ok) { L.add(txt(this, W / 2, y + 12, 24, '#3a2410', { align: 'center', wordWrap: { width: 860 } }).setText('Đáp án đúng: ' + this.q.options[this.q.correctAnswer])); y += 62; }
    L.add(txt(this, W / 2, y + 40, 22, '#4a3018', { align: 'center', wordWrap: { width: 860 }, fontStyle: 'normal' }).setText(this.q.explanation));
    const target = ok ? res.badge : gm.badges.getTargetBadge(this.pid);
    if (ok && res.newlyUnlocked) {
      const by = 410, glow = this.add.image(W / 2, by, 'spark').setScale(16).setAlpha(.5).setBlendMode(Phaser.BlendModes.ADD), img = this.add.image(W / 2, by, badgeTextureKey(res.badge.id, false)).setScale(.1); L.add([glow, img]);
      this.tweens.add({ targets: img, scale: .85, duration: 600, ease: 'Back.Out' }); this.tweens.add({ targets: glow, alpha: .15, yoyo: true, repeat: -1, duration: 700 }); this.burst.emitParticleAt(W / 2, by, 40);
      const pr = gm.badges.getCollectionProgress(this.pid);
      L.add(txt(this, W / 2, 506, 26, '#6a3f12').setText('Huy hiệu mới: ' + res.badge.name)); L.add(txt(this, W / 2, 540, 18, '#8a5a2b', { fontStyle: 'normal' }).setText(`${pr.count}/${pr.total} huy hiệu ${getProvince(this.pid).name}`));
    } else if (target) {
      const n = ok ? res.count : gm.badges.getBadgeProgress(target.id), cy = 420;
      L.add(txt(this, W / 2, cy - 40, 22, '#6a3f12').setText('Huy hiệu đang chinh phục: ' + target.name)); L.add(pips(this, W / 2, cy, n, CORRECT_PER_BADGE, 14, 10));
      L.add(txt(this, W / 2, cy + 40, 20, ok ? '#2f7a2a' : '#8a5a2b', { fontStyle: 'normal' }).setText(ok ? `+1 câu đúng!  Còn ${CORRECT_PER_BADGE - n} câu nữa để nhận huy hiệu.` : `Câu này chưa được tính. Cần thêm ${CORRECT_PER_BADGE - n} câu đúng. Cố lên!`));
      if (ok) { const w = CORRECT_PER_BADGE * 28 + (CORRECT_PER_BADGE - 1) * 10; this.burst.emitParticleAt(W / 2 - w / 2 + 14 + (n - 1) * 38, cy, 14); }
    } else L.add(txt(this, W / 2, 430, 22, '#2f7a2a').setText('Bạn đã sưu tầm đủ huy hiệu của tỉnh này. Giỏi quá!'));
    L.add(button(this, W / 2, 602, 300, 60, 'TIẾP TỤC', () => (res?.newlyCompleted ? this.showCompletion(res) : this.finish()), { color: 0x3f8f3a }));
  }
  showCompletion(res) {
    const L = this.reset(), p = getProvince(this.pid); L.add(panel(this, W / 2, H / 2, 1040, 680, { fill: 0xfff1bf, edge: 0xd9a23a }));
    L.add(txt(this, W / 2, 84, 54, '#b3641a', { stroke: '#fff', strokeThickness: 4 }).setText('CHÚC MỪNG!'));
    L.add(txt(this, W / 2, 142, 28, '#4a3018', { align: 'center', wordWrap: { width: 900 } }).setText(`BẠN ĐÃ HOÀN THÀNH BỘ SƯU TẬP ${p.name.toUpperCase()}!`));
    L.add(this.add.graphics().fillStyle(0xd9a23a).fillRoundedRect(W / 2 - 360, 178, 720, 62, 20).fillStyle(0xb3262e).fillRoundedRect(W / 2 - 352, 184, 704, 50, 16));
    L.add(txt(this, W / 2, 209, 28, '#ffe9a8', { stroke: '#00000066', strokeThickness: 3 }).setText(p.title));
    gm.badges.getAllBadges(this.pid).forEach((b, i) => L.add(this.add.image(W / 2 - 400 + (i % 5) * 200, 330 + Math.floor(i / 5) * 140, badgeTextureKey(b.id, false)).setScale(.6)));
    const nxt = res.unlockedProvince; if (nxt) L.add(txt(this, W / 2, 540, 26, '#2f7a2a', { stroke: '#fff', strokeThickness: 3 }).setText(`Chương mới đã mở khóa: ${nxt.name.toUpperCase()}!`)); else L.add(txt(this, W / 2, 540, 24, '#2f7a2a').setText('Bạn đã hoàn thành toàn bộ hành trình miền Tây!'));
    L.add(button(this, W / 2, 616, 300, 58, 'TIẾP TỤC', () => this.finish(), { color: 0x3f8f3a }));
    gm.audio.sfx('badge_unlock'); this.time.addEvent({ delay: 450, repeat: 8, callback: () => this.burst.emitParticleAt(Phaser.Math.Between(150, W - 150), Phaser.Math.Between(120, 400), 24) });
  }
  finish() { const g = this.scene.get('GameScene'); this.scene.stop(); g.resumeFromQuiz(); }
}
