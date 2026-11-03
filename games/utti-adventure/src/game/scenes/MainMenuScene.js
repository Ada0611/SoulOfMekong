import Phaser from 'phaser';
import { W, H, GROUND_Y, STATE, CORRECT_PER_BADGE } from '../config/constants.js';
import { PROVINCES, getProvince, provinceIndex } from '../data/provinces.js';
import Backdrop from '../ui/backdrop.js';
import gm from '../managers/GameManager.js';
import { txt, button, panel, fadeTo } from '../ui/widgets.js';
export default class MainMenuScene extends Phaser.Scene {
  constructor() { super('MainMenuScene'); }
  create() {
    gm.state = STATE.MENU; this.cameras.main.fadeIn(300, 0, 0, 0); const pid = gm.provinceId;
    this.bg = new Backdrop(this, pid, { depth: -20 });
    this.utti = this.add.sprite(250, 650, 'utti_idle_0').setOrigin(.5, 1).setScale(1.3).setDepth(10).play('idle');
    this.tweens.add({ targets: this.utti, y: 644, yoyo: true, repeat: -1, duration: 900, ease: 'Sine.InOut' });
    const t1 = txt(this, W / 2 + 120, 96, 64, '#fff3c8', { stroke: '#6a3f12', strokeThickness: 10 }).setText('ÚT TÍ PHIÊU LƯU KÝ'); this.tweens.add({ targets: t1, scale: 1.03, yoyo: true, repeat: -1, duration: 1600, ease: 'Sine.InOut' });
    txt(this, W / 2 + 120, 156, 26, '#fff', { stroke: '#2f6a2a', strokeThickness: 6 }).setText('HÀNH TRÌNH KHÁM PHÁ MIỀN TÂY');
    this.buildProvincePicker(W / 2 + 330, 238);
    this.startBtn = button(this, W / 2 + 330, 334, 360, 64, 'BẮT ĐẦU CHƠI', () => fadeTo(this, 'GameScene', { provinceId: gm.provinceId }), { size: 28 });
    button(this, W / 2 + 330, 412, 360, 58, 'BỘ SƯU TẬP', () => fadeTo(this, 'BadgeCollectionScene', { provinceId: gm.provinceId, back: 'MainMenuScene' }), { color: 0xc8821f, size: 24 });
    button(this, W / 2 + 330, 482, 360, 58, 'HƯỚNG DẪN', () => fadeTo(this, 'HowToPlayScene'), { color: 0x2f7aa8, size: 24 });
    button(this, W / 2 + 330, 552, 360, 58, 'CÀI ĐẶT', () => this.settings(), { color: 0x8a4a2a, size: 24 });
    this.best = txt(this, W / 2 + 330, 614, 20, '#fff3c8', { stroke: '#4a3018', strokeThickness: 5 });
    txt(this, W - 20, H - 14, 14, '#ffffffcc').setText('SoulOfMekong · v2.1 · Đợt 2 (bản chỉn chu)').setOrigin(1, .5);
    this.updatePicker(); this.input.once('pointerdown', () => gm.audio.unlock());
  }
  applyTheme(pid) { if (this.bg.pid !== pid) this.bg.rebuild(pid); }
  buildProvincePicker(x, y) {
    this.add.graphics().fillStyle(0x5a3a1e, .9).fillRoundedRect(x - 190, y - 40, 380, 80, 18).lineStyle(2, 0xe8c27a).strokeRoundedRect(x - 190, y - 40, 380, 80, 18);
    this.pName = txt(this, x, y - 14, 30, '#fff3c8'); this.pSub = txt(this, x, y + 20, 16, '#ffd98a', { fontStyle: 'normal', align: 'center', wordWrap: { width: 290 } });
    const arrow = (ax, dir, label) => { const c = this.add.container(ax, y).setSize(60, 80).setInteractive({ useHandCursor: true }); c.add(txt(this, 0, 0, 36, '#ffe9a8').setText(label)); c.on('pointerup', () => { gm.audio.unlock(); gm.audio.sfx('button_click'); const i = (provinceIndex(gm.storage.getSettings().selectedProvince) + dir + PROVINCES.length) % PROVINCES.length; gm.storage.saveSettings({ selectedProvince: PROVINCES[i].id }); this.updatePicker(); }); };
    arrow(x - 165, -1, '◀'); arrow(x + 165, 1, '▶');
  }
  updatePicker() {
    const id = gm.storage.getSettings().selectedProvince, p = getProvince(id), i = provinceIndex(id), open = gm.badges.isProvinceUnlocked(id), done = gm.badges.isProvinceCompleted(id);
    this.applyTheme(id); this.pName.setText(`${i + 1}. ${p.name.toUpperCase()}` + (done ? ' ★' : ''));
    this.pSub.setText(open ? p.tagline : `[KHÓA] Hoàn thành ${PROVINCES[i - 1].name} để mở`).setColor(open ? '#ffd98a' : '#ff9a9a');
    this.startBtn.setEnabled(open);
    const pr = gm.badges.getCollectionProgress(id), t = gm.badges.getTargetBadge(id);
    this.best.setText(open ? `KỶ LỤC ${String(gm.storage.getBestScore()).padStart(6, '0')} · Huy hiệu ${pr.count}/${pr.total}` + (t ? ` · ${t.name}: ${gm.badges.getBadgeProgress(t.id)}/${CORRECT_PER_BADGE}` : '') : 'Chương này chưa mở khóa');
  }
  settings() {
    const s = gm.audio.s, c = this.add.container(0, 0).setDepth(40);
    c.add([this.add.rectangle(W / 2, H / 2, W, H, 0, .6).setInteractive(), panel(this, W / 2, H / 2, 640, 460), txt(this, W / 2, 190, 40, '#6a3f12').setText('CÀI ĐẶT')]);
    const mk = () => { c.list.filter(o => o.tag === 'dyn').forEach(o => o.destroy()); const add = o => { o.tag = 'dyn'; c.add(o); return o; };
      add(button(this, W / 2, 280, 440, 56, 'Nhạc nền: ' + (s.musicEnabled ? 'BẬT' : 'TẮT'), () => { s.musicEnabled = !s.musicEnabled; gm.storage.saveSettings({ musicEnabled: s.musicEnabled }); mk(); }, { color: s.musicEnabled ? 0x3f8f3a : 0x777777, size: 24 }));
      add(button(this, W / 2, 352, 440, 56, 'Hiệu ứng âm thanh: ' + (s.soundEnabled ? 'BẬT' : 'TẮT'), () => { s.soundEnabled = !s.soundEnabled; gm.storage.saveSettings({ soundEnabled: s.soundEnabled }); mk(); }, { color: s.soundEnabled ? 0x3f8f3a : 0x777777, size: 24 }));
      add(button(this, W / 2 - 150, 430, 80, 56, '−', () => { gm.audio.setVolume(s.volume - .1); gm.storage.saveSettings({ volume: s.volume }); mk(); }, { color: 0xc8821f, size: 34 }));
      add(txt(this, W / 2, 430, 26, '#3a2410').setText('Âm lượng: ' + Math.round(s.volume * 100) + '%'));
      add(button(this, W / 2 + 150, 430, 80, 56, '+', () => { gm.audio.setVolume(s.volume + .1); gm.storage.saveSettings({ volume: s.volume }); mk(); }, { color: 0xc8821f, size: 34 })); };
    mk(); c.add(button(this, W / 2, 520, 220, 56, 'ĐÓNG', () => c.destroy(true), { size: 24 }));
  }
  update(t, d) { this.bg.update(d / 1000, 40); }
}
