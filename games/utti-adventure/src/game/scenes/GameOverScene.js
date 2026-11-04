import Phaser from 'phaser';
import { W, H, GROUND_Y, CORRECT_PER_BADGE } from '../config/constants.js';
import { getProvince } from '../data/provinces.js';
import { badgeTextureKey } from '../data/badges.js';
import Backdrop from '../ui/backdrop.js';
import gm from '../managers/GameManager.js';
import { txt, button, panel, fadeTo, progressBar, pips } from '../ui/widgets.js';
export default class GameOverScene extends Phaser.Scene {
  constructor() { super('GameOverScene'); }
  init(d) { this.d = d; }
  create() {
    gm.state = 'GAME_OVER'; const { score, provinceId } = this.d, p = getProvince(provinceId), best = gm.storage.getBestScore(), prog = gm.badges.getCollectionProgress(provinceId), target = gm.badges.getTargetBadge(provinceId);
    this.cameras.main.fadeIn(400, 0, 0, 0);
    new Backdrop(this, provinceId, { clouds: false, depth: -20 });
    this.add.rectangle(W / 2, H / 2, W, H, 0x000000, .45);
    panel(this, W / 2, H / 2, 920, 650);
    txt(this, W / 2, 112, 40, '#6a3f12', { align: 'center' }).setText('ÚT TÍ ĐÃ THẤM MỆT RỒI!');
    this.add.image(W / 2 - 330, 215, 'utti_dead_0').setScale(.62).setOrigin(.5, 1);
    txt(this, W / 2 + 40, 175, 30, '#3a2410').setText('ĐIỂM: ' + score); txt(this, W / 2 + 40, 218, 24, '#8a5a2b').setText('KỶ LỤC: ' + best + (score >= best && score > 0 ? '  ★ MỚI!' : ''));
    txt(this, W / 2 + 40, 252, 20, '#4a3018', { fontStyle: 'normal' }).setText(`Câu trả lời: ${gm.correct} đúng · ${gm.wrong} sai`);
    txt(this, W / 2, 300, 22, '#4a3018').setText(`Bộ sưu tập ${p.name}: ${prog.count}/${prog.total} huy hiệu`); progressBar(this, W / 2, 334, 560, 24, prog.count / prog.total, p.color);
    if (target) { txt(this, W / 2, 378, 20, '#6a3f12', { fontStyle: 'normal' }).setText(`Đang chinh phục: ${target.name}`); pips(this, W / 2, 406, gm.badges.getBadgeProgress(target.id), CORRECT_PER_BADGE, 11, 8); }
    const nb = gm.newBadges;
    if (nb.length) { txt(this, W / 2, 448, 20, '#2f7a2a').setText('Huy hiệu mới trong lượt chơi này:'); nb.slice(0, 6).forEach((id, i) => this.add.image(W / 2 + (i - (Math.min(nb.length, 6) - 1) / 2) * 80, 510, badgeTextureKey(id, false)).setScale(.38)); }
    else txt(this, W / 2, 470, 20, '#8a5a2b', { fontStyle: 'normal', align: 'center', wordWrap: { width: 760 } }).setText(`Mỗi huy hiệu cần ${CORRECT_PER_BADGE} câu trả lời đúng. Chơi đến mốc 200 điểm để gặp thử thách nhé!`);
    if (gm.unlockedProvince) txt(this, W / 2, 556, 24, '#b3262e', { stroke: '#fff', strokeThickness: 3 }).setText('Chương mới đã mở: ' + getProvince(gm.unlockedProvince).name.toUpperCase() + '!');
    button(this, W / 2 - 290, 600, 250, 58, 'CHƠI LẠI', () => fadeTo(this, 'GameScene', { provinceId }), { size: 24 });
    button(this, W / 2, 600, 290, 58, 'XEM BỘ SƯU TẬP', () => fadeTo(this, 'BadgeCollectionScene', { provinceId, back: 'MainMenuScene' }), { color: 0xc8821f, size: 22 });
    button(this, W / 2 + 290, 600, 250, 58, 'VỀ TRANG CHỦ', () => fadeTo(this, 'MainMenuScene'), { color: 0x8a4a2a, size: 22 });
  }
}
