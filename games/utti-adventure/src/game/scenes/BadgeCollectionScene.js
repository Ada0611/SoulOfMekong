import Phaser from 'phaser';
import { W, H, CORRECT_PER_BADGE } from '../config/constants.js';
import { PROVINCES, getProvince, provinceIndex } from '../data/provinces.js';
import { badgeTextureKey } from '../data/badges.js';
import Backdrop from '../ui/backdrop.js';
import gm from '../managers/GameManager.js';
import { txt, button, panel, fadeTo, progressBar, pips } from '../ui/widgets.js';
export default class BadgeCollectionScene extends Phaser.Scene {
  constructor() { super('BadgeCollectionScene'); }
  init(d) { const id = d?.provinceId || gm.provinceId; this.pid = gm.badges.isProvinceUnlocked(id) ? id : gm.badges.firstUnlockedProvince(); this.back = d?.back || 'MainMenuScene'; }
  create() {
    this.cameras.main.fadeIn(250, 0, 0, 0);
    this.bg = new Backdrop(this, this.pid, { clouds: false }); this.add.rectangle(W / 2, H / 2, W, H, 0xf6e7c1, .88).setDepth(1);
    this.render();
  }
  toast(msg) { this.toastTxt?.destroy(); const t = this.toastTxt = txt(this, W / 2, 150, 22, '#fff', { backgroundColor: '#b3262e', padding: { x: 14, y: 6 } }).setDepth(40).setText(msg); this.tweens.add({ targets: t, alpha: 0, delay: 1800, duration: 500, onComplete: () => t.destroy() }); }
  render() {
    this.layer?.destroy(true); const L = this.layer = this.add.container(0, 0), p = getProvince(this.pid), prog = gm.badges.getCollectionProgress(this.pid);
    L.add(txt(this, W / 2, 34, 38, '#2f6a2a').setText('BỘ SƯU TẬP MIỀN TÂY'));
    PROVINCES.forEach((pr, i) => {
      const open = gm.badges.isProvinceUnlocked(pr.id), done = gm.badges.isProvinceCompleted(pr.id);
      L.add(button(this, W / 2 + (i - 2.5) * 205, 92, 195, 46, (open ? '' : '[KHÓA] ') + pr.name.toUpperCase() + (done ? ' ★' : ''), () => { if (!open) { this.toast(`Hoàn thành ${PROVINCES[i - 1].name} để mở khóa ${pr.name}`); return; } this.pid = pr.id; gm.setProvince(pr.id); this.bg.rebuild(pr.id); this.render(); }, { color: !open ? 0x77716a : pr.id === this.pid ? pr.color : 0xa89868, size: 17 }));
    });
    L.add(txt(this, W / 2, 142, 22, '#6a3f12').setText(p.section)); L.add(txt(this, W / 2 - 330, 176, 20, '#4a3018').setText(`ĐÃ KHÁM PHÁ: ${prog.count}/${prog.total}`)); L.add(progressBar(this, W / 2 + 40, 176, 560, 22, prog.count / prog.total, p.color));
    if (gm.badges.isProvinceCompleted(this.pid)) L.add(txt(this, W / 2, 208, 20, '#b3641a').setText('★ DANH HIỆU: ' + p.title + ' ★'));
    else L.add(txt(this, W / 2, 208, 17, '#8a5a2b', { fontStyle: 'normal' }).setText(`Mỗi huy hiệu cần ${CORRECT_PER_BADGE} câu trả lời đúng · hoàn thành đủ 10 huy hiệu để mở chương tiếp theo`));
    const target = gm.badges.getTargetBadge(this.pid);
    gm.badges.getAllBadges(this.pid).forEach((b, i) => {
      const col = i % 5, row = Math.floor(i / 5), x = 140 + col * 250, y = 340 + row * 196, un = gm.badges.isBadgeUnlocked(b.id), isT = target && target.id === b.id;
      L.add(this.add.graphics().fillStyle(0xffffff, un ? .8 : .5).fillRoundedRect(x - 110, y - 92, 220, 184, 16).lineStyle(isT ? 4 : 2, un ? 0xd9a23a : isT ? 0x3f8f3a : 0xb0a080).strokeRoundedRect(x - 110, y - 92, 220, 184, 16));
      const img = this.add.image(x, y - 28, badgeTextureKey(b.id, !un)).setScale(.5); L.add(img);
      if (un) this.tweens.add({ targets: img, scale: .54, yoyo: true, repeat: -1, duration: 1400 + i * 70, ease: 'Sine.InOut' });
      L.add(txt(this, x, y + 38, 16, un ? '#3a2410' : '#6a6a6a', { align: 'center', wordWrap: { width: 205 } }).setText(un ? b.name : isT ? 'Đang chinh phục' : 'Huy hiệu bí ẩn'));
      if (un) L.add(txt(this, x, y + 72, 15, '#2f7a2a').setText('ĐÃ MỞ'));
      else if (isT) L.add(pips(this, x, y + 72, gm.badges.getBadgeProgress(b.id), CORRECT_PER_BADGE, 8, 6));
      else L.add(txt(this, x, y + 72, 15, '#9a8a6a', { fontStyle: 'normal' }).setText('0/' + CORRECT_PER_BADGE));
      L.add(this.add.rectangle(x, y, 220, 184, 0, 0).setInteractive({ useHandCursor: true }).on('pointerup', () => { gm.audio.sfx('button_click'); this.detail(b); }));
    });
    L.add(button(this, 130, 686, 200, 50, '◀ QUAY LẠI', () => fadeTo(this, this.back), { color: 0x8a4a2a, size: 22 }));
  }
  detail(b) {
    const un = gm.badges.isBadgeUnlocked(b.id), p = getProvince(b.provinceId), c = this.add.container(0, 0).setDepth(30), n = gm.badges.getBadgeProgress(b.id);
    c.add([this.add.rectangle(W / 2, H / 2, W, H, 0, .6).setInteractive().on('pointerup', () => c.destroy(true)), panel(this, W / 2, H / 2, 820, 520), this.add.image(W / 2 - 250, H / 2 - 10, badgeTextureKey(b.id, !un)).setScale(1.1)]);
    const x = W / 2 + 120, d = un ? new Date(gm.badges.unlockedAt(b.id)).toLocaleDateString('vi-VN') : '';
    c.add(txt(this, x, 200, 30, '#6a3f12', { align: 'center', wordWrap: { width: 400 } }).setText(un ? b.name : 'Huy hiệu bí ẩn'));
    c.add(txt(this, x, 320, 20, '#3a2410', { fontStyle: 'normal', align: 'center', wordWrap: { width: 400 } }).setText(un ? b.description : `Chơi ${p.name}, đạt mốc 200 điểm và trả lời đúng ${CORRECT_PER_BADGE} câu hỏi để mở khóa huy hiệu này (huy hiệu được mở lần lượt).`));
    if (!un) c.add(pips(this, x, 410, n, CORRECT_PER_BADGE, 12, 8));
    if (un) { c.add(txt(this, x, 430, 18, '#2f7a2a', { fontStyle: 'normal', align: 'center', wordWrap: { width: 400 } }).setText('Bạn có biết? ' + b.fact)); c.add(txt(this, x, 504, 18, '#8a5a2b').setText('Mở khóa ngày ' + d)); }
    c.add(button(this, W / 2, 580, 200, 50, 'ĐÓNG', () => c.destroy(true), { size: 22 }));
  }
}
