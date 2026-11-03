import Phaser from 'phaser';
import { FONT } from '../config/constants.js';
import gm from '../managers/GameManager.js';
export const txt = (s, x, y, size, color = '#fff', extra = {}) => s.add.text(x, y, '', { fontFamily: FONT, fontSize: size + 'px', color, fontStyle: 'bold', ...extra }).setOrigin(0.5);
export function panel(s, x, y, w, h, opts = {}) {
  const g = s.add.graphics(); const fill = opts.fill ?? 0xf6e7c1, edge = opts.edge ?? 0x8a5a2b;
  g.fillStyle(0x000000, .25).fillRoundedRect(x - w / 2 + 6, y - h / 2 + 8, w, h, 24);
  g.fillStyle(edge).fillRoundedRect(x - w / 2, y - h / 2, w, h, 24);
  g.fillStyle(fill).fillRoundedRect(x - w / 2 + 10, y - h / 2 + 10, w - 20, h - 20, 18);
  g.lineStyle(2, 0xc9a25a, .8).strokeRoundedRect(x - w / 2 + 18, y - h / 2 + 18, w - 36, h - 36, 12);
  return g;
}
// Container-based button with hover/press feedback + click sound.
export function button(s, x, y, w, h, label, cb, o = {}) {
  const c = s.add.container(x, y), baseCol = o.color ?? 0x3f8f3a, g = s.add.graphics(); let enabled = true; const colNow = () => (enabled ? baseCol : 0x77716a);
  const draw = (hover) => { const col = colNow(); g.clear(); g.fillStyle(0x000000, .3).fillRoundedRect(-w / 2 + 3, -h / 2 + 5, w, h, h / 3); g.fillStyle(Phaser.Display.Color.ValueToColor(col).darken(25).color).fillRoundedRect(-w / 2, -h / 2, w, h, h / 3); g.fillStyle(hover ? Phaser.Display.Color.ValueToColor(col).lighten(12).color : col).fillRoundedRect(-w / 2 + 3, -h / 2 + 3, w - 6, h - 9, h / 3 - 2); g.lineStyle(2, 0xffe9a8, .7).strokeRoundedRect(-w / 2 + 3, -h / 2 + 3, w - 6, h - 9, h / 3 - 2); };
  draw(false);
  const t = txt(s, 0, -2, o.size ?? Math.round(h * .42), o.textColor ?? '#fff', { align: 'center', wordWrap: { width: w - 24 } }); t.setText(label); t.setStroke('#00000066', 3);
  c.add([g, t]); c.setSize(w, h).setInteractive({ useHandCursor: true });
  c.on('pointerover', () => draw(true)); c.on('pointerout', () => { draw(false); c.setScale(1); });
  c.on('pointerdown', () => c.setScale(.96));
  c.on('pointerup', () => { c.setScale(1); gm.audio.unlock(); gm.audio.sfx('button_click'); if (!c.disabledBtn) cb(); });
  c.setText = v => t.setText(v); c.setEnabled = v => { enabled = v; c.disabledBtn = !v; draw(false); }; return c;
}
export function fadeTo(scene, key, data) { scene.cameras.main.fadeOut(220, 0, 0, 0); scene.cameras.main.once('camerafadeoutcomplete', () => scene.scene.start(key, data)); }
export function progressBar(s, x, y, w, h, ratio, color = 0x3f8f3a) { const g = s.add.graphics(); g.fillStyle(0x3a2a18).fillRoundedRect(x - w / 2, y - h / 2, w, h, h / 2); if (ratio > 0) g.fillStyle(color).fillRoundedRect(x - w / 2 + 3, y - h / 2 + 3, Math.max(h - 6, (w - 6) * ratio), h - 6, (h - 6) / 2); return g; }

// Row of small circles showing x/total progress (used for the 5-correct-answers-per-badge rule).
export function pips(s, x, y, count, total, size = 11, gap = 8, on = 0xf2b020, off = 0x5a4630) {
  const g = s.add.graphics(), w = total * size * 2 + (total - 1) * gap; let px = x - w / 2 + size;
  for (let i = 0; i < total; i++) { g.fillStyle(i < count ? on : off).fillCircle(px, y, size).lineStyle(2, 0x3a2a18).strokeCircle(px, y, size); if (i < count) g.fillStyle(0xffffff, .5).fillCircle(px - 3, y - 3, 3); px += size * 2 + gap; }
  return g;
}
