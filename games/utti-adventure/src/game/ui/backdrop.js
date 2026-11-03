import Phaser from 'phaser';
import { W, H, GROUND_Y } from '../config/constants.js';
import { getProvince } from '../data/provinces.js';
import { THEMES } from '../art/backgrounds.js';
// Chapter background. Uses the painted image when the province has one (static scenery + scrolling road + water shimmer),
// otherwise the procedural multi-layer parallax. Call update(dt, speed) every frame (speed = world px/s).
export default class Backdrop {
  constructor(scene, pid, opts = {}) { this.scene = scene; this.opts = { depth: 0, clouds: true, ...opts }; this.objs = []; this.layers = []; this.build(pid); }
  add(o) { this.objs.push(o); return o; }
  build(pid) {
    const s = this.scene, d = this.opts.depth, cfg = getProvince(pid).backdrop; this.pid = pid;
    if (cfg && s.textures.exists('bd_' + pid) && s.textures.exists('bdg_' + pid)) {
      this.mode = 'image';
      this.add(s.add.image(0, 0, 'bd_' + pid).setOrigin(0).setScale(cfg.scale).setDepth(d));
      const sh = this.add(s.add.tileSprite(0, cfg.water[0], W, cfg.water[1] - cfg.water[0], 'shimmer').setOrigin(0).setAlpha(.55).setDepth(d + 1)); this.layers.push({ o: sh, k: .12 });
      const g = this.add(s.add.tileSprite(0, cfg.groundTop, W, H - cfg.groundTop, 'bdg_' + pid).setOrigin(0).setTileScale(cfg.scale).setDepth(d + 5)); this.layers.push({ o: g, k: 1 });
      return;
    }
    this.mode = 'tiles';
    this.add(s.add.image(0, 0, `bg_sky_${pid}`).setOrigin(0).setDepth(d));
    this.clouds = this.opts.clouds ? [0, 1, 2, 3].map(i => this.add(s.add.image(150 + i * 340, 70 + (i % 3) * 55, 'cloud').setDepth(d + 1).setAlpha(.85).setScale(.8 + (i % 2) * .4))) : [];
    const mk = (y, h, key, dd, k) => { const t = this.add(s.add.tileSprite(0, y, W, h, key).setOrigin(0).setDepth(d + dd)); this.layers.push({ o: t, k }); return t; };
    mk(470 - 256, 256, `bg_far_${pid}`, 2, .15); mk(470, 128, `bg_river_${pid}`, 3, .3);
    this.add(s.add.rectangle(0, 596, W, 40, Phaser.Display.Color.HexStringToColor(THEMES[pid].bank).color).setOrigin(0).setDepth(d + 3));
    mk(GROUND_Y - 112, 128, `bg_plants_${pid}`, 4, .6); mk(GROUND_Y, H - GROUND_Y, `bg_ground_${pid}`, 5, 1);
  }
  update(dt, speed) {
    for (const { o, k } of this.layers) o.tilePositionX += (speed * dt * k) / (o.tileScaleX || 1);
    if (this.clouds) for (const c of this.clouds) { c.x -= speed * dt * .05 + 6 * dt; if (c.x < -150) c.x = W + 150; }
  }
  rebuild(pid) { this.objs.forEach(o => o.destroy()); this.objs = []; this.layers = []; this.clouds = null; this.build(pid); }
}
