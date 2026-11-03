// Procedural audio via Web Audio API (no external files): pentatonic scale, plucked strings + flute-like lead + soft drum.
const SCALE = [261.63, 293.66, 349.23, 392.0, 440.0, 523.25, 587.33];
const MELODY = [4, 3, 2, 3, 4, 5, 4, 3, 2, 1, 2, 3, 4, 3, 1, 0];
export default class AudioManager {
  constructor() { this.ctx = null; this.master = null; this.s = { musicEnabled: true, soundEnabled: true, volume: 0.7 }; this.timer = null; this.step = 0; }
  init(settings) { this.s = { ...this.s, ...settings }; }
  unlock() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
      this.ctx = new AC(); this.master = this.ctx.createGain(); this.master.connect(this.ctx.destination); this.master.gain.value = this.s.volume;
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
    if (!this.timer) this.timer = setInterval(() => this.musicTick(), 380);
  }
  setVolume(v) { this.s.volume = Math.max(0, Math.min(1, v)); if (this.master) this.master.gain.value = this.s.volume; }
  tone(f, t, d, { type = 'sine', gain = 0.25, slide = 0, vib = 0 } = {}) {
    if (!this.ctx) return; const c = this.ctx, o = c.createOscillator(), g = c.createGain();
    o.type = type; o.frequency.setValueAtTime(f, t); if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(30, f + slide), t + d);
    if (vib) { const l = c.createOscillator(), lg = c.createGain(); l.frequency.value = 5.5; lg.gain.value = vib; l.connect(lg); lg.connect(o.frequency); l.start(t); l.stop(t + d + 0.1); }
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(gain, t + 0.015); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    o.connect(g); g.connect(this.master); o.start(t); o.stop(t + d + 0.05);
  }
  sfx(name) {
    if (!this.ctx || !this.s.soundEnabled) return; const t = this.ctx.currentTime;
    switch (name) {
      case 'jump': this.tone(380, t, 0.18, { type: 'square', gain: 0.12, slide: 320 }); break;
      case 'hit': this.tone(180, t, 0.3, { type: 'sawtooth', gain: 0.2, slide: -120 }); break;
      case 'correct': [523, 659, 784, 1047].forEach((f, i) => this.tone(f, t + i * 0.09, 0.25, { type: 'triangle', gain: 0.22 })); break;
      case 'incorrect': this.tone(300, t, 0.2, { type: 'square', gain: 0.12 }); this.tone(220, t + 0.2, 0.3, { type: 'square', gain: 0.12 }); break;
      case 'badge_unlock': [392, 523, 659, 784, 1047, 1319].forEach((f, i) => this.tone(f, t + i * 0.08, 0.4, { type: 'triangle', gain: 0.22 })); break;
      case 'game_over': [392, 330, 262, 196].forEach((f, i) => this.tone(f, t + i * 0.22, 0.45, { type: 'sine', gain: 0.25 })); break;
      case 'button_click': this.tone(660, t, 0.07, { type: 'triangle', gain: 0.15 }); break;
    }
  }
  musicTick() {
    if (!this.ctx || !this.s.musicEnabled || this.ctx.state !== 'running') return;
    const t = this.ctx.currentTime + 0.02, f = SCALE[MELODY[this.step % MELODY.length]];
    this.tone(f, t, 0.5, { type: 'triangle', gain: 0.09 });
    if (this.step % 4 === 0) this.tone(f * 2, t, 1.4, { type: 'sine', gain: 0.05, vib: 4 });
    if (this.step % 2 === 0) this.tone(70, t, 0.15, { type: 'sine', gain: 0.12, slide: -20 });
    this.step++;
  }
  toggleMute() { const on = !(this.s.musicEnabled || this.s.soundEnabled); this.s.musicEnabled = on; this.s.soundEnabled = on; return on; }
}
