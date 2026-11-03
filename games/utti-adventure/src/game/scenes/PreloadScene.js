import Phaser from 'phaser';
import { W, H, FONT } from '../config/constants.js';
import { drawHeart, drawSpark, drawDust, drawCloud } from '../art/props.js';
import { THEMES, drawSkyTheme, drawGroundTheme, drawShimmer } from '../art/backgrounds.js';
import { drawLocked, drawPlaceholder } from '../art/badgeFallback.js';
import { BADGES, badgeTextureKey, badgeFile } from '../data/badges.js';
import { PROVINCES } from '../data/provinces.js';

const FRAMES = { idle: 5, run: 5, jump: 6, crouch: 4, hit: 1, dead: 1 };
const OBSTACLES = ['log', 'basket', 'chicken', 'buffalo', 'boat', 'branch'];
const ITEMS = ['shield', 'boots', 'nonla', 'fruit'];
// Characters, obstacles, items, badges and painted backgrounds are real image files in public/assets.
// Only procedural parts: small UI textures + backgrounds of chapters that have no painted image yet.
export default class PreloadScene extends Phaser.Scene {
  constructor() { super('PreloadScene'); }
  preload() {
    this.cameras.main.setBackgroundColor('#2a4a2a');
    this.add.text(W / 2, H / 2 - 70, 'ÚT TÍ PHIÊU LƯU KÝ', { fontFamily: FONT, fontSize: '48px', color: '#ffe9a8', fontStyle: 'bold' }).setOrigin(.5);
    this.add.text(W / 2, H / 2 - 20, 'Đang chuẩn bị hành trang...', { fontFamily: FONT, fontSize: '24px', color: '#ffffff' }).setOrigin(.5);
    const bar = this.add.graphics();
    this.load.on('progress', v => bar.clear().fillStyle(0x1a2e1a).fillRoundedRect(W / 2 - 250, H / 2 + 30, 500, 26, 13).fillStyle(0xf2c230).fillRoundedRect(W / 2 - 247, H / 2 + 33, Math.max(20, 494 * v), 20, 10));
    this.load.on('loaderror', f => console.warn('Missing asset (placeholder will be used):', f.key));
    this.load.setPath('assets/');
    Object.entries(FRAMES).forEach(([k, n]) => { for (let i = 0; i < n; i++) this.load.image(`utti_${k}_${i}`, `characters/utti_${k}_${i}.png`); });
    OBSTACLES.forEach(k => this.load.image('ob_' + k, `obstacles/${k}.png`));
    ITEMS.forEach(k => this.load.image('it_' + k, `items/${k}.png`));
    BADGES.forEach(b => this.load.image(badgeTextureKey(b.id, false), badgeFile(b.id)));
    PROVINCES.forEach(p => { if (p.backdrop) { this.load.image('bd_' + p.id, 'backgrounds/' + p.backdrop.bg); this.load.image('bdg_' + p.id, 'backgrounds/' + p.backdrop.ground); } });
  }
  mk(key, w, h, fn) {
    if (this.textures.exists(key)) return;
    try { const t = this.textures.createCanvas(key, w, h); fn(t.getContext('2d'), t); t.refresh(); } catch (e) { console.warn('Texture fallback for', key, e); }
  }
  ensure(key, w, h, color) { if (!this.textures.exists(key)) this.mk(key, w, h, c => { c.fillStyle = color; c.fillRect(0, 0, w, h); }); }
  create() {
    Object.entries(FRAMES).forEach(([k, n]) => { for (let i = 0; i < n; i++) this.ensure(`utti_${k}_${i}`, 160, 200, '#6bc13a'); });
    OBSTACLES.forEach(k => this.ensure('ob_' + k, 120, 80, '#8a5a2b')); ITEMS.forEach(k => this.ensure('it_' + k, 90, 90, '#f2c230'));
    this.makeAnims();
    const steps = [];
    steps.push(() => { this.mk('heart', 48, 44, c => drawHeart(c, true)); this.mk('heart_off', 48, 44, c => drawHeart(c, false)); this.mk('spark', 16, 16, drawSpark); this.mk('dust', 16, 16, drawDust); this.mk('cloud', 200, 80, c => drawCloud(c)); this.mk('shimmer', 512, 128, drawShimmer); });
    PROVINCES.forEach(p => { if (this.textures.exists('bd_' + p.id)) return; steps.push(() => { const t = THEMES[p.id]; this.mk(`bg_sky_${p.id}`, W, H, c => drawSkyTheme(c, W, H, t)); this.mk(`bg_far_${p.id}`, 1024, 256, t.far); this.mk(`bg_river_${p.id}`, 1024, 128, t.river); this.mk(`bg_plants_${p.id}`, 1024, 128, t.plants); this.mk(`bg_ground_${p.id}`, 128, 128, c => drawGroundTheme(c, t.ground)); }); });
    for (let i = 0; i < BADGES.length; i += 15) steps.push(() => BADGES.slice(i, i + 15).forEach(b => {
      const key = badgeTextureKey(b.id, false);
      if (!this.textures.exists(key)) this.mk(key, 192, 192, c => drawPlaceholder(c, 192, b.name));
      const img = this.textures.get(key).getSourceImage(); this.mk(badgeTextureKey(b.id, true), 192, 192, c => drawLocked(c, 192, img));
    }));
    const bar = this.add.graphics(); let i = 0;
    const next = () => { bar.clear().fillStyle(0x1a2e1a).fillRoundedRect(W / 2 - 250, H / 2 + 30, 500, 26, 13).fillStyle(0x8fd05a).fillRoundedRect(W / 2 - 247, H / 2 + 33, Math.max(20, 494 * i / steps.length), 20, 10); if (i >= steps.length) { this.scene.start('MainMenuScene'); return; } steps[i++](); this.time.delayedCall(16, next); };
    next();
  }
  makeAnims() {
    const seq = (prefix, idx) => idx.map(i => ({ key: `utti_${prefix}_${i}` }));
    const a = (key, frames, fps, repeat) => this.anims.create({ key, frames, frameRate: fps, repeat });
    a('run', seq('run', [0, 1, 2, 3, 4]), 11, -1); a('idle', seq('idle', [0, 1, 2, 3, 4]), 6, -1);
    a('jump', seq('jump', [1, 2, 3, 4]), 5, 0);         // lift-off, two mid-air frames, descent (≈0.8s = air time)
    a('crouch', seq('crouch', [1, 2]), 12, 0);           // half-way, then holds the lowest pose
    a('hit', seq('hit', [0]), 1, -1); a('dead', seq('dead', [0]), 1, 0);
  }
}
