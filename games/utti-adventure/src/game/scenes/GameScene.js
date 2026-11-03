import Phaser from 'phaser';
import { W, H, GROUND_Y, STATE, LEVELS, MAX_LIVES, INVULN_SECONDS, ITEMS } from '../config/constants.js';
import Backdrop from '../ui/backdrop.js';
import { getProvince } from '../data/provinces.js';
import Player from '../entities/Player.js';
import ScoreManager from '../managers/ScoreManager.js';
import gm from '../managers/GameManager.js';
import { txt, button, panel, fadeTo } from '../ui/widgets.js';

const POOLS = [['log', 'basket'], ['log', 'basket', 'chicken', 'branch'], ['log', 'basket', 'chicken', 'branch', 'boat'], ['log', 'basket', 'chicken', 'branch', 'boat', 'buffalo']];
// s = display scale, hw/hh = hitbox in texture px (centered, bottom aligned), drop = px sunk into the ground, flip = sprite faces right in the art
const OB = {
  log: { s: .55, hw: 180, hh: 85, drop: 6 }, basket: { s: .5, hw: 120, hh: 100, drop: 4 }, chicken: { s: .42, hw: 100, hh: 120, drop: 2, flip: true, extra: 90 },
  buffalo: { s: .5, hw: 260, hh: 150, drop: 4, flip: true }, boat: { s: .55, hw: 210, hh: 80, drop: 2 }, branch: { s: .6, hw: 190, hh: 80, drop: 0, air: 64 }
};
// sc = display scale; tint = glow colour; w = spawn weight
const IT = { shield: { sc: .32, tint: 0x6fd0ff, w: 3 }, boots: { sc: .32, tint: 0xffe27a, w: 2.5 }, nonla: { sc: .32, tint: 0xffd27a, w: 2.5 }, fruit: { sc: .38, tint: 0xff9a5a, w: 2 } };

export default class GameScene extends Phaser.Scene {
  constructor() { super('GameScene'); }
  init(d) { const id = d?.provinceId || gm.provinceId; this.provinceId = gm.badges.isProvinceUnlocked(id) ? id : gm.badges.firstUnlockedProvince(); }
  create() {
    gm.resetRun(); gm.state = STATE.PLAYING; this.score = new ScoreManager(); this.province = getProvince(this.provinceId); const pid = this.provinceId;
    this.invul = 0; this.spawnGrace = 1.2; this.dist = 0; this.nextGap = 760; this.touchCrouch = false; this.ending = false; this.itemCd = 6; this.trailT = 0;
    this.buff = { shield: 0, boots: 0, nonla: 0 }; this.speed = LEVELS[0].speed;
    this.cameras.main.fadeIn(250, 0, 0, 0);
    // --- chapter background (painted image if available, otherwise procedural parallax) ---
    this.bg = new Backdrop(this, pid);
    const floor = this.add.rectangle(W / 2, GROUND_Y + 50, W * 2, 100, 0, 0); this.physics.add.existing(floor, true);
    // --- entities ---
    this.player = new Player(this, 210); this.physics.add.collider(this.player, floor);
    this.obstacles = this.physics.add.group({ allowGravity: false, immovable: true });
    this.items = this.physics.add.group({ allowGravity: false, immovable: true });
    this.physics.add.overlap(this.player, this.obstacles, () => this.onHit(), () => this.invul <= 0 && this.buff.boots <= 0 && !this.player.dead && gm.state === STATE.PLAYING);
    this.physics.add.overlap(this.player, this.items, (p, it) => this.collect(it), () => gm.state === STATE.PLAYING && !this.player.dead);
    this.dust = this.add.particles(0, 0, 'dust', { lifespan: 420, speed: { min: 30, max: 90 }, angle: { min: 200, max: 340 }, scale: { start: 1.1, end: 0 }, alpha: { start: .8, end: 0 }, emitting: false }).setDepth(8);
    this.burst = this.add.particles(0, 0, 'spark', { lifespan: 700, speed: { min: 60, max: 240 }, scale: { start: 1.2, end: 0 }, alpha: { start: 1, end: 0 }, emitting: false }).setDepth(9);
    this.shieldFx = this.add.graphics().setDepth(9);
    // --- input ---
    const kb = this.input.keyboard;
    this.keys = kb.addKeys({ up: 'UP', w: 'W', space: 'SPACE', down: 'DOWN', s: 'S', p: 'P', esc: 'ESC', m: 'M' });
    ['space', 'up', 'w'].forEach(k => this.keys[k].on('down', () => { if (gm.state === STATE.PLAYING) this.player.requestJump(); }));
    ['p', 'esc'].forEach(k => this.keys[k].on('down', () => this.togglePause()));
    this.keys.m.on('down', () => { gm.audio.toggleMute(); gm.storage.saveSettings({ musicEnabled: gm.audio.s.musicEnabled, soundEnabled: gm.audio.s.soundEnabled }); });
    this.input.on('pointerdown', (p, over) => { gm.audio.unlock(); if (!over.length && p.x > 360 && gm.state === STATE.PLAYING) this.player.requestJump(); });
    this.buildHUD(); this.buildPause(); this.buildTouch();
    gm.audio.unlock();
  }
  buildHUD() {
    this.hearts = Array.from({ length: MAX_LIVES }, (_, i) => this.add.image(58 + i * 56, 48, 'heart').setDepth(20));
    const tag = (x, w) => this.add.graphics().setDepth(19).fillStyle(0x5a3a1e, .85).fillRoundedRect(x - w / 2, 18, w, 62, 16).lineStyle(2, 0xe8c27a).strokeRoundedRect(x - w / 2, 18, w, 62, 16);
    tag(640, 300); tag(1000, 260);
    this.scoreTxt = txt(this, 640, 49, 34, '#fff3c8').setDepth(21); this.bestTxt = txt(this, 1000, 49, 26, '#ffd98a').setDepth(21);
    this.lvlTxt = txt(this, 640, 98, 18, '#ffffff', { stroke: '#00000088', strokeThickness: 4 }).setDepth(21);
    const pb = this.add.container(1210, 48).setDepth(21); const g = this.add.graphics().fillStyle(0x5a3a1e).fillCircle(0, 0, 28).lineStyle(3, 0xe8c27a).strokeCircle(0, 0, 28).fillStyle(0xfff3c8).fillRect(-9, -11, 6, 22).fillRect(3, -11, 6, 22);
    pb.add(g); pb.setSize(60, 60).setInteractive({ useHandCursor: true }).on('pointerup', () => { gm.audio.sfx('button_click'); this.togglePause(); });
    // buff indicators (under the hearts)
    this.buffUI = {};
    [['shield', 58], ['boots', 190], ['nonla', 322]].forEach(([k, x]) => { const c = this.add.container(x, 114).setDepth(21).setVisible(false); const bg = this.add.graphics().fillStyle(0x5a3a1e, .85).fillRoundedRect(-44, -24, 124, 48, 12).lineStyle(2, 0xe8c27a).strokeRoundedRect(-44, -24, 124, 48, 12); const ic = this.add.image(-18, 0, 'it_' + k).setScale(.2); const t = txt(this, 36, 0, 22, '#fff3c8'); c.add([bg, ic, t]); this.buffUI[k] = { c, t }; });
    this.refreshHUD();
  }
  refreshHUD() {
    this.hearts.forEach((h, i) => h.setTexture(i < gm.lives ? 'heart' : 'heart_off'));
    this.scoreTxt.setText('ĐIỂM: ' + String(this.score.display).padStart(6, '0'));
    this.bestTxt.setText('KỶ LỤC: ' + String(Math.max(gm.storage.getBestScore(), this.score.display)).padStart(6, '0'));
    this.lvlTxt.setText(`${this.province.name} · ${LEVELS[this.score.level].name}`);
    for (const k of ['shield', 'boots', 'nonla']) { this.buffUI[k].c.setVisible(this.buff[k] > 0); this.buffUI[k].t.setText(Math.ceil(this.buff[k]) + 's'); }
  }
  buildTouch() {
    if (!this.sys.game.device.input.touch) return;
    const c = this.add.container(110, 600).setDepth(21).setAlpha(.8); const g = this.add.graphics().fillStyle(0x5a3a1e, .85).fillCircle(0, 0, 62).lineStyle(4, 0xe8c27a).strokeCircle(0, 0, 62);
    c.add([g, txt(this, 0, 0, 26, '#fff3c8').setText('CÚI')]); c.setSize(124, 124).setInteractive();
    c.on('pointerdown', () => { this.touchCrouch = true; }); c.on('pointerup', () => { this.touchCrouch = false; }); c.on('pointerout', () => { this.touchCrouch = false; });
    txt(this, W - 130, 690, 20, '#ffffffcc', { stroke: '#00000088', strokeThickness: 4 }).setDepth(21).setText('Chạm bên phải để NHẢY');
  }
  buildPause() {
    const c = this.add.container(0, 0).setDepth(50).setVisible(false); this.pauseUI = c;
    const dim = this.add.rectangle(W / 2, H / 2, W, H, 0x000000, .55).setInteractive(), p = panel(this, W / 2, H / 2, 520, 460);
    c.add([dim, p, txt(this, W / 2, 210, 44, '#6a3f12').setText('TẠM DỪNG'),
      button(this, W / 2, 320, 360, 66, 'TIẾP TỤC', () => this.togglePause()),
      button(this, W / 2, 410, 360, 66, 'CHƠI LẠI', () => { gm.state = STATE.MENU; this.scene.restart({ provinceId: this.provinceId }); }, { color: 0xc8821f }),
      button(this, W / 2, 500, 360, 66, 'VỀ MENU', () => { this.saveBest(); this.physics.resume(); this.anims.resumeAll(); gm.state = STATE.MENU; fadeTo(this, 'MainMenuScene'); }, { color: 0x8a4a2a })]);
  }
  togglePause() {
    if (gm.state === STATE.PLAYING) { gm.state = STATE.PAUSED; this.physics.pause(); this.anims.pauseAll(); this.pauseUI.setVisible(true); }
    else if (gm.state === STATE.PAUSED) { gm.state = STATE.PLAYING; this.physics.resume(); this.anims.resumeAll(); this.pauseUI.setVisible(false); }
  }
  puff(x, y, n) { this.dust.emitParticleAt(x, y, n); }
  saveBest() { gm.integration.saveGameResult({ score: this.score.display, provinceId: this.provinceId }); }
  float(x, y, text, color = '#fff3c8') { const t = txt(this, x, y, 28, color, { stroke: '#3a2410', strokeThickness: 6 }).setDepth(30).setText(text); this.tweens.add({ targets: t, y: y - 70, alpha: 0, duration: 1100, onComplete: () => t.destroy() }); }
  // ---------- spawning ----------
  spawn() {
    const lvl = this.score.level, pool = POOLS[Math.min(lvl, 3)], type = pool[Math.floor(Math.random() * pool.length)], d = OB[type], tex = this.textures.get('ob_' + type).getSourceImage();
    const y = d.air ? GROUND_Y - d.air : GROUND_Y + d.drop;
    let o = this.obstacles.getFirstDead(false);
    if (!o) { o = this.obstacles.create(W + 200, y, 'ob_' + type); o.body.allowGravity = false; o.body.immovable = true; } else o.enableBody(true, W + 200, y, true, true);
    o.setTexture('ob_' + type).setOrigin(.5, 1).setScale(d.s).setFlipX(!!d.flip).setDepth(6).setPosition(W + 200, y).setActive(true).setVisible(true);
    o.body.setSize(d.hw, d.hh, false); o.body.setOffset((tex.width - d.hw) / 2, tex.height - d.hh);
    o.type = type; o.body.setVelocityX(-(this.speed + (d.extra || 0)));
  }
  spawnItem(x) {
    const full = gm.lives >= MAX_LIVES, bag = Object.entries(IT).filter(([k]) => !(k === 'fruit' && full && Math.random() < .7)); let r = Math.random() * bag.reduce((n, [, v]) => n + v.w, 0), type = bag[0][0];
    for (const [k, v] of bag) { r -= v.w; if (r <= 0) { type = k; break; } }
    const d = IT[type], it = this.items.create(x, GROUND_Y - 135, 'it_' + type); it.body.allowGravity = false; it.setScale(d.sc).setDepth(7); it.type = type; it.body.setVelocityX(-this.speed);
    it.glow = this.add.image(x, it.y, 'spark').setScale(7).setAlpha(.55).setTint(d.tint).setBlendMode(Phaser.BlendModes.ADD).setDepth(6);
  }
  killItem(it) { it.glow?.destroy(); it.glow = null; it.destroy(); }
  collect(it) {
    const type = it.type, x = it.x, y = it.y; this.killItem(it); gm.audio.sfx('correct'); this.burst.emitParticleAt(x, y, 18);
    if (type === 'shield') { this.buff.shield = ITEMS.shield.duration; this.float(x, y, 'LÁ CHẮN!', '#9fe0ff'); }
    else if (type === 'boots') { this.buff.boots = ITEMS.boots.duration; this.float(x, y, 'DÉP THẦN TỐC!', '#ffe27a'); }
    else if (type === 'nonla') { this.buff.nonla = ITEMS.nonla.duration; this.float(x, y, 'NÓN LÁ MAY MẮN! x2 ĐIỂM', '#ffd27a'); }
    else if (gm.lives < MAX_LIVES) { gm.lives++; this.float(x, y, '+1 MẠNG', '#ff9a9a'); }
    else { this.score.add(30); this.float(x, y, '+30 ĐIỂM', '#ffe27a'); }
    this.refreshHUD();
  }
  onHit() {
    if (this.buff.shield > 0) { this.buff.shield = 0; this.invul = 1; this.cameras.main.flash(160, 120, 200, 255); gm.audio.sfx('hit'); this.float(this.player.x, this.player.y - 150, 'LÁ CHẮN ĐỠ ĐÒN!', '#9fe0ff'); this.refreshHUD(); return; }
    gm.lives--; this.invul = INVULN_SECONDS; this.player.hit(); gm.audio.sfx('hit');
    this.cameras.main.shake(220, 0.012); this.cameras.main.flash(140, 255, 70, 70); this.refreshHUD();
    if (gm.lives <= 0) this.gameOver();
  }
  gameOver() {
    if (this.ending) return; this.ending = true; gm.state = STATE.GAME_OVER; this.player.die(); this.physics.pause(); this.saveBest(); gm.audio.sfx('game_over');
    this.tweens.add({ targets: this.player, angle: -8, duration: 500 });
    this.time.delayedCall(1500, () => this.scene.start('GameOverScene', { score: this.score.display, provinceId: this.provinceId }));
  }
  triggerQuiz(m) {
    gm.state = STATE.QUIZ; this.physics.pause(); this.anims.pauseAll();
    if (this.scene.isActive('QuizScene')) return;     // never stack two quiz overlays
    const question = gm.quiz.pick(this.provinceId, gm.asked, Math.random, m);
    this.scene.launch('QuizScene', { question, provinceId: this.provinceId, milestone: m });
  }
  resumeFromQuiz() {
    // Safe resume: clear nearby hazards, add spawn grace + invulnerability.
    this.obstacles.children.each(o => { if (o.active && o.x < 900) o.disableBody(true, true); });
    this.items.getChildren().slice().forEach(it => { if (it.x < 500) this.killItem(it); });
    this.spawnGrace = 1.2; this.dist = 0; this.invul = INVULN_SECONDS;
    gm.state = STATE.PLAYING; this.physics.resume(); this.anims.resumeAll(); this.refreshHUD();
  }
  update(t, delta) {
    if (gm.state !== STATE.PLAYING) return;
    const dt = Math.min(delta, 50) / 1000, lvl = this.score.level, boosted = this.buff.boots > 0;
    this.speed = LEVELS[lvl].speed * (boosted ? ITEMS.boots.speedMult : 1);
    this.bg.update(dt, this.speed);
    // buffs
    const prevBoots = this.buff.boots; for (const k of ['shield', 'boots', 'nonla']) this.buff[k] = Math.max(0, this.buff[k] - dt);
    if (prevBoots > 0 && this.buff.boots <= 0) this.invul = Math.max(this.invul, .8);     // grace right after the boots wear off
    this.player.anims.timeScale = boosted ? 1.6 : 1;
    const m = this.score.tick(dt, this.buff.nonla > 0 ? ITEMS.nonla.scoreMult : 1); this.refreshHUD();
    if (m) { this.triggerQuiz(m); return; }
    const ceiling = this.obstacles.getChildren().some(o => o.active && o.type === 'branch' && Math.abs(o.x - this.player.x) < 120);
    this.player.update(dt, this.keys.down.isDown || this.keys.s.isDown || this.touchCrouch, ceiling);
    if (this.invul > 0) { this.invul -= dt; this.player.setAlpha(boosted ? 1 : Math.floor(this.invul * 12) % 2 ? .35 : 1); } else this.player.setAlpha(1);
    // visual effects for buffs
    this.shieldFx.clear(); if (this.buff.shield > 0) { const r = 78 + Math.sin(t / 120) * 3; this.shieldFx.lineStyle(4, 0x6fd0ff, this.buff.shield < 3 && Math.floor(t / 150) % 2 ? .3 : .85).strokeCircle(this.player.x, this.player.y - 68, r).fillStyle(0x6fd0ff, .13).fillCircle(this.player.x, this.player.y - 68, r); }
    if (boosted) { this.player.setTint(0xfff0a0); this.trailT -= dt; if (this.trailT <= 0) { this.trailT = .06; const p = this.player, g = this.add.image(p.x, p.y, p.texture.key).setOrigin(.5, 1).setScale(p.scale).setAlpha(.45).setTint(0xffe27a).setDepth(6); this.tweens.add({ targets: g, alpha: 0, x: g.x - 70, duration: 300, onComplete: () => g.destroy() }); } }
    else if (this.player.hitTimer <= 0 && !this.player.dead) this.player.clearTint();
    // spawning
    this.spawnGrace -= dt; this.itemCd -= dt;
    if (this.spawnGrace <= 0) {
      this.dist += this.speed * dt;
      if (this.dist >= this.nextGap) {
        this.spawn(); this.dist = 0; this.nextGap = this.speed + 240 + Math.random() * (320 - lvl * 40);
        if (this.itemCd <= 0 && Math.random() < .5) { this.spawnItem(W + 200 + this.nextGap * .5); this.itemCd = 9 + Math.random() * 7; }   // items float midway between two obstacles
      }
    }
    this.obstacles.children.each(o => { if (!o.active) return; if (o.x < -300) o.disableBody(true, true); else o.body.setVelocityX(-(this.speed + (OB[o.type]?.extra || 0))); });
    this.items.getChildren().slice().forEach(it => { if (it.x < -120) this.killItem(it); else { it.body.setVelocityX(-this.speed); if (it.glow) { it.glow.x = it.x; it.glow.y = it.y; it.glow.setAlpha(.4 + .2 * Math.sin(t / 160)); } } });
  }
}
