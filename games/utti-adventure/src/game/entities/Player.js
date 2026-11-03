import Phaser from 'phaser';
import { GROUND_Y, PHYSICS } from '../config/constants.js';
import gm from '../managers/GameManager.js';
export const PLAYER_SCALE = 0.54;
// Hitbox (texture px) covers body + legs only: the wide nón lá and head never create unfair hits.
// Frame canvas is 260x264 with the hat apex centered at x=130 and the feet at y=262.
const STAND = { w: 70, h: 150 }, CROUCH = { w: 92, h: 96 }, CX = 124, FEET = 262;
export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x) {
    super(scene, x, GROUND_Y + 2 * PLAYER_SCALE, 'utti_run_0');
    scene.add.existing(this); scene.physics.add.existing(this);
    this.setOrigin(.5, 1).setScale(PLAYER_SCALE).setDepth(7);
    this.reset();
  }
  reset() {
    this.dead = false; this.crouching = false; this.hitTimer = 0; this.coyote = 0; this.buffer = 0; this.wasGround = true;
    this.clearTint(); this.setAlpha(1).setAngle(0); this.applyBox(false); this.play('run', true);
  }
  applyBox(crouch) { const b = crouch ? CROUCH : STAND; this.body.setSize(b.w, b.h, false); this.body.setOffset(CX - b.w / 2, FEET - b.h); }
  get onGround() { return this.body.blocked.down || this.body.touching.down; }
  requestJump() { this.buffer = 0.12; }
  hit() { this.hitTimer = 0.4; this.setTint(0xff8080); this.scene.time.delayedCall(200, () => !this.dead && this.clearTint()); }
  die() { this.dead = true; this.crouching = false; this.applyBox(false); this.body.setVelocityX(0); this.clearTint(); this.play('dead', true); }
  update(dt, wantsCrouch, ceilingBlocked) {
    if (this.dead) return;
    const g = this.onGround;
    this.coyote = g ? 0.1 : this.coyote - dt; this.buffer -= dt; this.hitTimer -= dt;
    if (this.buffer > 0 && this.coyote > 0) { this.body.setVelocityY(PHYSICS.jumpVelocity); this.buffer = 0; this.coyote = 0; this.crouching = false; this.applyBox(false); gm.audio.sfx('jump'); this.scene.puff(this.x - 10, GROUND_Y, 6); this.play('jump', true); }
    if (g && !this.wasGround) this.scene.puff(this.x, GROUND_Y, 4);   // landing dust
    this.wasGround = g;
    const c = (g && wantsCrouch) || (this.crouching && g && ceilingBlocked);   // never stand up inside an overhead obstacle
    if (c !== this.crouching) { this.crouching = c; this.applyBox(c); }
    const key = this.hitTimer > 0 ? 'hit' : !g ? 'jump' : this.crouching ? 'crouch' : 'run';
    if (this.anims.currentAnim?.key !== key) this.play(key, true);
  }
}
