// Chapter backgrounds: each province has its own sky, far scenery, river, foreground and ground (all seamless 1024px tiles).
const OUT = '#2a3a22', TAU = Math.PI * 2, W = 1024;
const R = (c, f, s, lw = 2) => { c.fillStyle = f; c.fill(); if (s) { c.strokeStyle = s; c.lineWidth = lw; c.lineJoin = 'round'; c.stroke(); } };
const ell = (c, x, y, rx, ry, f, s = OUT, lw = 1.6, rot = 0) => { c.beginPath(); c.ellipse(x, y, rx, ry, rot, 0, TAU); R(c, f, s, lw); };
const rr = (c, x, y, w, h, r, f, s = OUT, lw = 1.8) => { c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); R(c, f, s, lw); };
const grad = (c, y0, y1, a, b) => { const g = c.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, a); g.addColorStop(1, b); return g; };
let CTX = null;
const wrap = fn => { for (const o of [0, -W, W]) { CTX.save(); CTX.translate(o, 0); fn(); CTX.restore(); } };

function hills(c, base, amp, col, k1 = 2, k2 = 7, ph = 0, bottom = 256) {
  c.beginPath(); c.moveTo(0, bottom); for (let x = 0; x <= W; x += 8) c.lineTo(x, base + Math.sin(x / W * TAU * k1 + ph) * amp + Math.sin(x / W * TAU * k2 + ph * 2) * amp * .35); c.lineTo(W, bottom); c.closePath(); c.fillStyle = col; c.fill();
}
function palm(c, x, base, h, lean, l1 = '#3f9a3a', l2 = '#52b046', nuts = '#7a5a2a') {
  c.strokeStyle = OUT; c.lineWidth = 9; c.lineCap = 'round'; c.beginPath(); c.moveTo(x, base); c.quadraticCurveTo(x + lean * .4, base - h * .5, x + lean, base - h); c.stroke();
  c.strokeStyle = '#7a5a34'; c.lineWidth = 6; c.stroke();
  const tx = x + lean, ty = base - h;
  for (let i = 0; i < 9; i++) { const a = -Math.PI + i * Math.PI / 8, ex = tx + Math.cos(a) * 50, ey = ty + Math.sin(a) * 24 + 22; c.beginPath(); c.moveTo(tx, ty); c.quadraticCurveTo(tx + Math.cos(a) * 28, ty + Math.sin(a) * 36, ex, ey); c.quadraticCurveTo(tx + Math.cos(a) * 26, ty + Math.sin(a) * 14, tx, ty); R(c, i % 2 ? l1 : l2, '#2a6a28', 1.6); }
  ell(c, tx - 3, ty + 6, 4.5, 4.5, nuts, null); ell(c, tx + 5, ty + 8, 4.5, 4.5, nuts, null);
}
function thotnot(c, x, base, h) {
  c.strokeStyle = OUT; c.lineWidth = 9; c.lineCap = 'round'; c.beginPath(); c.moveTo(x, base); c.lineTo(x, base - h); c.stroke(); c.strokeStyle = '#8a6a3a'; c.lineWidth = 6; c.stroke();
  for (let k = 0; k < 11; k++) { const a = -Math.PI + k * Math.PI / 10; c.save(); c.translate(x, base - h); c.rotate(a); c.beginPath(); c.ellipse(20, 0, 22, 5.5, 0, 0, TAU); R(c, k % 2 ? '#4a9a3a' : '#62b64e', '#2a6a28', 1.4); c.restore(); }
  ell(c, x, base - h + 3, 5, 5, '#6a4a2a', null);
}
function tram(c, x, base, h) { c.strokeStyle = '#6a5a3a'; c.lineWidth = 4; c.beginPath(); c.moveTo(x, base); c.lineTo(x + 2, base - h); c.stroke(); for (let i = 0; i < 6; i++) ell(c, x + 2 + Math.sin(i * 2) * 8, base - h + i * 7, 13 - i, 6, i % 2 ? '#8ab86a' : '#9ac878', '#4a7a3a', 1.2); }
function kiln(c, x, base, s) {
  rr(c, x - 24 * s, base - 28 * s, 48 * s, 28 * s, 6 * s, '#c0603a', '#5a2a18', 2); c.beginPath(); c.arc(x, base - 28 * s, 24 * s, Math.PI, 0); R(c, '#b0502e', '#5a2a18', 2);
  rr(c, x - 6 * s, base - 80 * s, 12 * s, 56 * s, 2, '#a8482a', '#5a2a18', 2); rr(c, x - 9 * s, base - 84 * s, 18 * s, 6 * s, 2, '#7a3018', '#3a1a10', 1.6);
  c.fillStyle = '#3a1a10'; c.beginPath(); c.arc(x, base - 8 * s, 8 * s, Math.PI, 0); c.fill(); ell(c, x + 5 * s, base - 96 * s, 10 * s, 7 * s, 'rgba(240,240,240,.55)', null);
}
function pagoda(c, x0, base, s) {
  c.save(); c.translate(x0, 0); const x = 0;
  rr(c, x - 30 * s, base - 30 * s, 60 * s, 30 * s, 2, '#e8c46a', '#6a4a18', 2);
  [[-46, -30, 46, 14, '#d9453a'], [-36, -48, 36, 12, '#e0603a'], [-24, -64, 24, 12, '#e8783a']].forEach(([a, y, b, h, col]) => { c.beginPath(); c.moveTo(a * s, base + y * s + 6 * s); c.quadraticCurveTo((a + 4) * s, base + y * s, (a + 16) * s, base + (y - h) * s); c.lineTo((b - 16) * s, base + (y - h) * s); c.quadraticCurveTo((b - 4) * s, base + y * s, b * s, base + y * s + 6 * s); c.closePath(); R(c, col, '#6a2a18', 2); });
  c.strokeStyle = '#6a2a18'; c.lineWidth = 2; c.beginPath(); c.moveTo(0, base - 76 * s); c.lineTo(0, base - 90 * s); c.stroke(); ell(c, 0, base - 92 * s, 3 * s, 3 * s, '#ffe27a');
  rr(c, x - 7 * s, base - 22 * s, 14 * s, 22 * s, 3, '#7a3a1a', '#3a1a10', 1.6);
  c.restore();
}
function tower(c, x, base, h, deckY, span) {
  c.beginPath(); c.moveTo(x - 7, base); c.lineTo(x - 2.5, base - h); c.lineTo(x + 2.5, base - h); c.lineTo(x + 7, base); c.closePath(); R(c, '#e8e8f0', '#5a5a6a', 1.6);
  c.strokeStyle = 'rgba(240,240,250,.9)'; c.lineWidth = 1.3; for (let i = 1; i <= 6; i++) { const y = base - h + i * 7; c.beginPath(); c.moveTo(x, y); c.lineTo(x - i * span / 6, deckY); c.moveTo(x, y); c.lineTo(x + i * span / 6, deckY); c.stroke(); }
}
function mountain(c, x, base, w, h, col, snow) { c.beginPath(); c.moveTo(x - w / 2, base); c.lineTo(x - w * .1, base - h); c.lineTo(x + w * .06, base - h * .9); c.lineTo(x + w / 2, base); c.closePath(); R(c, col, null); c.fillStyle = 'rgba(255,255,255,.14)'; c.beginPath(); c.moveTo(x - w * .1, base - h); c.lineTo(x - w * .3, base - h * .45); c.lineTo(x - w * .05, base - h * .5); c.closePath(); c.fill(); }
function stilt(c, x, base, w, roof = '#8a6a3a') {
  c.strokeStyle = '#4a3018'; c.lineWidth = 3; [0.1, 0.5, 0.9].forEach(t => { c.beginPath(); c.moveTo(x + t * w, base); c.lineTo(x + t * w, base - 18); c.stroke(); });
  rr(c, x, base - 46, w, 28, 2, '#a07a4a', '#4a3018', 1.8); c.beginPath(); c.moveTo(x - 8, base - 44); c.lineTo(x + w / 2, base - 70); c.lineTo(x + w + 8, base - 44); c.closePath(); R(c, roof, '#4a3018', 1.8); rr(c, x + w / 2 - 6, base - 38, 12, 20, 2, '#5a3a1e', '#2a1a0e', 1.2);
}
function houseG(c, x, base, w, roof = '#8a6a3a') { rr(c, x, base - 34, w, 34, 2, '#a07a4a', '#4a3018', 1.8); c.beginPath(); c.moveTo(x - 7, base - 32); c.lineTo(x + w / 2, base - 58); c.lineTo(x + w + 7, base - 32); c.closePath(); R(c, roof, '#4a3018', 1.8); rr(c, x + w / 2 - 6, base - 22, 12, 22, 2, '#5a3a1e', '#2a1a0e', 1.2); }
function fruitTree(c, x, base, s, leaf, fruit) { c.strokeStyle = '#5a3a1e'; c.lineWidth = 6 * s; c.beginPath(); c.moveTo(x, base); c.lineTo(x, base - 26 * s); c.stroke(); ell(c, x, base - 40 * s, 26 * s, 22 * s, leaf, '#2a5a28', 1.8); ell(c, x - 8 * s, base - 46 * s, 14 * s, 11 * s, 'rgba(255,255,255,.14)', null); [[-12, -34], [10, -44], [4, -28], [-4, -52]].forEach(([a, b]) => ell(c, x + a * s, base + b * s, 3.6 * s, 3.6 * s, fruit, '#5a2a10', 1)); }
function lotus(c, x, y, s, col = '#ff8fb8') { for (let i = -2; i <= 2; i++) { c.save(); c.translate(x, y); c.rotate(i * .38); c.beginPath(); c.ellipse(0, -9 * s, 4.5 * s, 11 * s, 0, 0, TAU); R(c, i % 2 ? '#ffd0e4' : col, '#a8406a', 1.3); c.restore(); } ell(c, x, y - 2 * s, 3 * s, 2.5 * s, '#ffe27a', null); }
function pad(c, x, y, r) { ell(c, x, y, r, r * .38, '#4ab04a', '#2a7a2a', 1.4); c.strokeStyle = '#2a7a2a'; c.lineWidth = 1; c.beginPath(); c.moveTo(x, y); c.lineTo(x + r * .8, y - r * .15); c.stroke(); }
function ghe(c, x, y, dir, load) { c.save(); c.translate(x, y); c.scale(dir, 1); c.beginPath(); c.moveTo(-36, 0); c.quadraticCurveTo(0, 17, 36, 0); c.quadraticCurveTo(0, 8, -36, 0); R(c, '#8a5a2b', OUT, 1.8);
  if (load === 'fruit') { c.strokeStyle = '#6a4a2a'; c.lineWidth = 2; c.beginPath(); c.moveTo(-20, -2); c.lineTo(-20, -34); c.stroke(); ell(c, -20, -36, 5, 4, '#ff9a1f'); [[-6, -6, '#ff9a1f'], [4, -8, '#f2c230'], [14, -6, '#e5493a'], [24, -4, '#7bc043']].forEach(([a, b, f]) => ell(c, a, b, 6, 6, f, '#5a2a10', 1)); }
  else if (load === 'jar') [[-14, -9], [2, -11], [18, -8]].forEach(([a, b]) => { c.beginPath(); c.ellipse(a, b, 7, 9, 0, 0, TAU); R(c, '#c8643a', '#5a2a18', 1.4); });
  else if (load === 'coco') [[-16, -6], [-4, -8], [10, -6], [22, -4], [-9, -15], [4, -16], [15, -14]].forEach(([a, b]) => ell(c, a, b, 6, 6, '#8a6a32', '#4a3418', 1.2));
  else { c.beginPath(); c.moveTo(-6, -2); c.lineTo(0, -22); c.lineTo(8, -2); c.closePath(); R(c, '#ebc983', '#7a4e1d', 1.4); }
  c.restore(); }
function waves(c, col, rows = 4, ph = 0) { c.strokeStyle = col; c.lineWidth = 2; for (let r = 0; r < rows; r++) for (let k = 0; k < 8; k++) { const x0 = k * 128 + (r % 2) * 40, y = 24 + r * 26; c.beginPath(); for (let x = 0; x <= 70; x += 5) { const yy = y + Math.sin((x0 + x) / 128 * TAU * 2 + ph) * 3; x === 0 ? c.moveTo(x0 + x, yy) : c.lineTo(x0 + x, yy); } c.stroke(); } }
function blade(c, x, s, a, b, h = 70) { c.save(); c.translate(x, 128); c.scale(s, s); for (let i = 0; i < 5; i++) { const an = -Math.PI / 2 + (i - 2) * 0.5; c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(Math.cos(an) * 30, Math.sin(an) * 40, Math.cos(an) * 44, Math.sin(an) * h); c.quadraticCurveTo(Math.cos(an) * 12 + 10, Math.sin(an) * 40, 0, 0); R(c, i % 2 ? a : b, '#2a6a28', 1.6); } c.restore(); }

export const THEMES = {
  'can-tho': {
    sky: ['#4aa6e8', '#9fd8f5', '#ffeec2'], sun: [1060, 130, 'rgba(255,248,200,.95)'], bank: '#5fa84e',
    far(c) { hills(c, 196, 16, '#8cc874', 2, 6); hills(c, 218, 9, '#62ac50', 3, 5, 1); c.fillStyle = '#7a7a8a'; c.fillRect(0, 134, W, 7); c.strokeStyle = '#4a4a5a'; c.lineWidth = 1.5; c.strokeRect(0, 134, W, 7); tower(c, 256, 140, 112, 138, 150); tower(c, 768, 140, 112, 138, 150); [[40, 212, 118, 16], [150, 214, 140, -20], [480, 213, 124, 18], [640, 214, 136, -16], [930, 213, 120, 18]].forEach(p => wrap(() => palm(c, p[0], p[1], p[2], p[3]))); wrap(() => { stilt(c, 340, 222, 54); stilt(c, 560, 224, 50); stilt(c, 880, 222, 56); }); },
    river(c) { c.fillStyle = grad(c, 0, 128, '#6bc0e8', '#2f86b8'); c.fillRect(0, 0, W, 128); waves(c, 'rgba(255,255,255,.45)'); [[110, 44, 1, 'fruit'], [300, 70, -1, 'fruit'], [470, 40, 1, 'fruit'], [640, 78, 1, 'hat'], [790, 50, -1, 'fruit'], [940, 72, 1, 'fruit']].forEach(b => wrap(() => ghe(c, b[0], b[1], b[2], b[3]))); },
    plants(c) { [60, 190, 330, 480, 610, 760, 900].forEach((x, i) => wrap(() => blade(c, x, .8 + (i % 3) * .15, '#3f9a3a', '#58b64a'))); [[120, 112], [420, 114], [700, 110], [960, 113]].forEach(([x, y]) => wrap(() => { ell(c, x, y, 9, 5, '#9a5ac8', '#5a2a88', 1.2); ell(c, x + 12, y - 4, 7, 4, '#b07ae0', '#5a2a88', 1.2); })); },
    ground: ['#c89a5e', '#8a6030', '#5fb04a', '#4a9a3a']
  },
  'vinh-long': {
    sky: ['#6cc0e0', '#c4ecd8', '#fff4d0'], sun: [980, 120, 'rgba(255,250,210,.9)'], bank: '#7ab04e',
    far(c) { hills(c, 198, 14, '#9ad07a', 2, 5); hills(c, 220, 8, '#70b45a', 3, 7, 2); [[90, 232, 1.1], [330, 234, 1.3], [560, 232, 1.15], [830, 234, 1.25]].forEach(k => wrap(() => kiln(c, k[0], k[1], k[2]))); [[200, 232, 1, '#4a9a3a', '#ff9a1f'], [450, 234, 1.1, '#3f8a3a', '#f2c230'], [700, 232, 1, '#4a9a3a', '#ff9a1f'], [960, 234, 1.1, '#3f8a3a', '#ff9a1f']].forEach(t => wrap(() => fruitTree(c, t[0], t[1], t[2], t[3], t[4]))); wrap(() => { houseG(c, 380, 238, 50, '#b0502e'); houseG(c, 760, 238, 54, '#b0502e'); }); },
    river(c) { c.fillStyle = grad(c, 0, 128, '#5cc0b8', '#2a8a88'); c.fillRect(0, 0, W, 128); waves(c, 'rgba(255,255,255,.4)'); [[150, 50, 1, 'jar'], [360, 76, -1, 'jar'], [560, 44, 1, 'hat'], [760, 72, 1, 'jar'], [940, 48, -1, 'hat']].forEach(b => wrap(() => ghe(c, b[0], b[1], b[2], b[3]))); },
    plants(c) { [[50, 1], [210, .9], [380, 1.1], [540, .95], [700, 1.05], [880, .9]].forEach(([x, s]) => wrap(() => { fruitTree(c, x, 126, s * 1.25, '#4a9a3a', '#ff9a1f'); })); [[130, 124], [450, 124], [800, 124]].forEach(([x, y]) => wrap(() => { c.beginPath(); c.ellipse(x, y - 9, 9, 11, 0, 0, TAU); R(c, '#c8643a', '#5a2a18', 1.4); ell(c, x, y - 19, 6, 2.5, '#7a2a10', null); })); },
    ground: ['#c8703e', '#8a3c1e', '#6ab04a', '#559a3a']
  },
  'tien-giang': {
    sky: ['#5aa0d8', '#ffd0a0', '#ffe9c0'], sun: [900, 150, 'rgba(255,236,170,.95)'], bank: '#6aa84e',
    far(c) { hills(c, 200, 14, '#9ac870', 2, 6); hills(c, 220, 8, '#6aae52', 3, 5, 1); wrap(() => pagoda(c, 470, 236, 1)); wrap(() => { tower(c, 130, 150, 100, 150, 120); c.fillStyle = '#8a8a9a'; c.fillRect(-30, 148, 320, 5); }); [[260, 236, 1.2, '#4a9a3a', '#f2b020'], [640, 236, 1.1, '#3f8a3a', '#f2b020'], [800, 234, 1.25, '#4a9a3a', '#f2b020'], [940, 236, 1, '#3f8a3a', '#f2b020']].forEach(t => wrap(() => fruitTree(c, t[0], t[1], t[2], t[3], t[4]))); [[40, 228, 105, 14], [600, 230, 112, -14], [990, 228, 100, 12]].forEach(p => wrap(() => palm(c, p[0], p[1], p[2], p[3]))); },
    river(c) { c.fillStyle = grad(c, 0, 128, '#6ab0d0', '#3a82a8'); c.fillRect(0, 0, W, 128); waves(c, 'rgba(255,255,255,.4)'); [[140, 48, 1, 'fruit'], [350, 76, -1, 'hat'], [540, 44, 1, 'fruit'], [740, 70, -1, 'fruit'], [920, 48, 1, 'hat']].forEach(b => wrap(() => ghe(c, b[0], b[1], b[2], b[3]))); },
    plants(c) { [40, 160, 300, 440, 580, 720, 860, 980].forEach((x, i) => wrap(() => blade(c, x, .9 + (i % 3) * .12, i % 2 ? '#58b64a' : '#7ac84a', '#3f9a3a', 86))); [[240, 116], [680, 116]].forEach(([x, y]) => wrap(() => { ell(c, x, y, 7, 7, '#f2c230', '#8a5a10', 1.4); ell(c, x + 11, y + 2, 7, 7, '#ffb02e', '#8a5a10', 1.4); })); },
    ground: ['#d9a35e', '#9a6a30', '#6ab04a', '#559a3a']
  },
  'ben-tre': {
    sky: ['#2fb8e0', '#a4ecf0', '#f4ffe4'], sun: [200, 120, 'rgba(255,255,210,.85)'], bank: '#3f9a4a',
    far(c) { hills(c, 196, 14, '#5aa850', 2, 6); hills(c, 216, 9, '#3f8f40', 3, 5, 1); for (let i = 0; i < 12; i++) wrap(() => palm(c, 30 + i * 85, 232 - (i % 3) * 8, 108 + (i * 37) % 44, ((i * 53) % 40) - 20, '#2f8a3a', '#46a844', '#8a6a32')); wrap(() => { stilt(c, 420, 240, 46, '#6a8a3a'); stilt(c, 860, 240, 44, '#6a8a3a'); }); },
    river(c) { c.fillStyle = grad(c, 0, 128, '#4ab8a0', '#2a8a78'); c.fillRect(0, 0, W, 128); waves(c, 'rgba(255,255,255,.38)'); [[160, 50, 1, 'coco'], [380, 78, -1, 'coco'], [590, 44, 1, 'coco'], [780, 72, 1, 'hat'], [940, 48, -1, 'coco']].forEach(b => wrap(() => ghe(c, b[0], b[1], b[2], b[3]))); },
    plants(c) { [30, 150, 270, 400, 520, 650, 780, 910].forEach((x, i) => wrap(() => blade(c, x, 1 + (i % 3) * .15, '#2f8a3a', '#4aa83e', 96))); [[200, 124], [560, 124], [880, 124]].forEach(([x, y]) => wrap(() => { [[0, 0], [11, 1], [5, -9]].forEach(([a, b]) => ell(c, x + a, y + b - 6, 7, 7, '#8a6a32', '#4a3418', 1.3)); })); },
    ground: ['#a88458', '#6a4a2a', '#4aa84a', '#388a3a']
  },
  'dong-thap': {
    sky: ['#a77ad6', '#ffb8d4', '#ffe6cf'], sun: [820, 170, 'rgba(255,214,190,.95)'], bank: '#6aa86a',
    far(c) { hills(c, 204, 10, '#9ac08a', 2, 5); hills(c, 222, 7, '#7aae6e', 3, 6, 1); [[60, 3], [130, 2], [210, 3], [300, 2], [380, 3], [470, 2], [560, 3], [650, 2], [740, 3], [830, 2], [920, 3], [990, 2]].forEach(([x, k], i) => wrap(() => tram(c, x, 236, 70 + (i * 29) % 40))); wrap(() => { stilt(c, 250, 242, 46, '#9a7a4a'); stilt(c, 690, 242, 44, '#9a7a4a'); }); [[160, 226], [520, 228], [860, 226]].forEach(([x, y]) => wrap(() => { c.strokeStyle = '#555'; c.lineWidth = 2; c.beginPath(); c.moveTo(x, y); c.lineTo(x, y - 22); c.moveTo(x + 3, y); c.lineTo(x + 3, y - 22); c.stroke(); ell(c, x + 2, y - 30, 7, 5, '#fff', '#777', 1.2); c.beginPath(); c.moveTo(x + 8, y - 31); c.lineTo(x + 16, y - 30); c.lineTo(x + 8, y - 28); c.closePath(); R(c, '#e8a020', '#8a5a10', 1); ell(c, x - 2, y - 33, 3, 2.4, '#e0342a', null); })); },
    river(c) { c.fillStyle = grad(c, 0, 128, '#74c0b8', '#3a948c'); c.fillRect(0, 0, W, 128); waves(c, 'rgba(255,255,255,.35)', 3); for (let i = 0; i < 20; i++) wrap(() => pad(c, 30 + i * 51, 24 + (i * 37) % 90, 20 + (i % 3) * 4)); for (let i = 0; i < 12; i++) wrap(() => lotus(c, 60 + i * 83, 30 + (i * 53) % 84, 1.1 + (i % 3) * .2, i % 2 ? '#ff8fb8' : '#ff6aa0')); },
    plants(c) { [[70, 1.1], [200, .9], [340, 1.2], [470, 1], [620, 1.15], [760, .95], [900, 1.1]].forEach(([x, s]) => wrap(() => { c.strokeStyle = '#3a8a3a'; c.lineWidth = 3; c.beginPath(); c.moveTo(x, 128); c.quadraticCurveTo(x + 6, 90, x, 128 - 78 * s); c.stroke(); lotus(c, x, 128 - 78 * s, 1.5 * s, '#ff8fb8'); ell(c, x + 26, 118, 14, 5, '#4ab04a', '#2a7a2a', 1.2); })); },
    ground: ['#9a7448', '#5a3e22', '#5ab04e', '#46983e']
  },
  'an-giang': {
    sky: ['#e8923e', '#ffd080', '#fff0c4'], sun: [760, 180, 'rgba(255,225,150,.95)'], bank: '#c8a850',
    far(c) { mountain(c, 160, 214, 300, 130, '#6f9a86'); mountain(c, 470, 214, 380, 160, '#5a8a78'); mountain(c, 800, 214, 320, 120, '#7aa68f'); hills(c, 214, 6, '#d4b44a', 3, 8, 0.5); hills(c, 230, 5, '#e0c050', 4, 9, 1.5); wrap(() => { rr(c, 505, 196, 26, 14, 2, '#e8c46a', '#6a4a18', 1.4); c.beginPath(); c.moveTo(500, 198); c.lineTo(518, 184); c.lineTo(536, 198); c.closePath(); R(c, '#d9453a', '#6a2a18', 1.6); }); [[40, 236, 100], [250, 238, 112], [620, 236, 96], [900, 238, 108], [1000, 236, 92]].forEach(([x, b, h]) => wrap(() => thotnot(c, x, b, h))); },
    river(c) { c.fillStyle = grad(c, 0, 128, '#dcb870', '#a8844a'); c.fillRect(0, 0, W, 128); waves(c, 'rgba(255,245,200,.5)'); [[160, 52, 1, 'hat'], [400, 78, -1, 'hat'], [640, 48, 1, 'hat'], [880, 74, -1, 'hat']].forEach(b => wrap(() => ghe(c, b[0], b[1], b[2], b[3]))); },
    plants(c) { for (let i = 0; i < 18; i++) wrap(() => { const x = 20 + i * 58; c.strokeStyle = '#a88a20'; c.lineWidth = 2; for (let k = 0; k < 4; k++) { c.beginPath(); c.moveTo(x + k * 4, 128); c.quadraticCurveTo(x + k * 4 + 8, 90, x + k * 4 + 14, 70 + (i % 3) * 6); c.stroke(); ell(c, x + k * 4 + 14, 70 + (i % 3) * 6, 3, 8, '#e8c24a', '#8a6a10', 1, .6); } }); [[220, 112], [700, 112]].forEach(([x, y]) => wrap(() => thotnot(c, x, 128, 80))); },
    ground: ['#d0a050', '#92642a', '#a8b848', '#8aa238']
  }
};


function khmer(c, x0, base, s) {
  c.save(); c.translate(x0, 0);
  rr(c, -44 * s, base - 34 * s, 88 * s, 34 * s, 3, '#f6e8c2', '#7a5a20', 2);
  [-30, -10, 10, 30].forEach(a => rr(c, (a - 3) * s, base - 30 * s, 6 * s, 30 * s, 1, '#e8c46a', '#7a5a20', 1.2));
  [[-58, -34, 58, 16, '#e0a530'], [-44, -52, 44, 14, '#e8b43a'], [-28, -68, 28, 13, '#f0c24a']].forEach(([a, y, b, h, col]) => {
    c.beginPath(); c.moveTo(a * s, base + y * s + 8 * s); c.quadraticCurveTo((a + 2) * s, base + y * s + 2 * s, (a + 18) * s, base + (y - h) * s); c.lineTo((b - 18) * s, base + (y - h) * s);
    c.quadraticCurveTo((b - 2) * s, base + y * s + 2 * s, b * s, base + y * s + 8 * s); c.quadraticCurveTo(0, base + y * s + 16 * s, a * s, base + y * s + 8 * s); c.closePath(); R(c, col, '#8a3a10', 2);
    c.strokeStyle = '#d9453a'; c.lineWidth = 3 * s; c.beginPath(); c.moveTo((a + 6) * s, base + y * s + 10 * s); c.quadraticCurveTo(0, base + y * s + 18 * s, (b - 6) * s, base + y * s + 10 * s); c.stroke();
  });
  c.beginPath(); c.moveTo(-5 * s, base - 80 * s); c.lineTo(0, base - 108 * s); c.lineTo(5 * s, base - 80 * s); c.closePath(); R(c, '#f6d25a', '#8a3a10', 1.6);
  rr(c, -8 * s, base - 24 * s, 16 * s, 24 * s, 3, '#8a3a1a', '#3a1a10', 1.4);
  c.restore();
}
function mangrove(c, x, base, s) {
  c.strokeStyle = '#5a3a1e'; c.lineWidth = 2.5 * s; c.lineCap = 'round';
  [-14, -6, 4, 12].forEach(a => { c.beginPath(); c.moveTo(x + a * .5 * s, base - 26 * s); c.quadraticCurveTo(x + a * s, base - 12 * s, x + a * 1.4 * s, base); c.stroke(); });
  ell(c, x, base - 36 * s, 26 * s, 16 * s, '#3f8a3a', '#2a5a28', 1.6); ell(c, x + 14 * s, base - 42 * s, 17 * s, 12 * s, '#58a848', '#2a5a28', 1.4); ell(c, x - 12 * s, base - 44 * s, 13 * s, 9 * s, '#6cba58', null);
}
function gheNgo(c, x, y, dir) {
  c.save(); c.translate(x, y); c.scale(dir, 1);
  c.beginPath(); c.moveTo(-58, -8); c.quadraticCurveTo(-60, -2, -52, 4); c.quadraticCurveTo(0, 16, 52, 4); c.quadraticCurveTo(62, -2, 58, -16); c.quadraticCurveTo(52, -4, 44, -2); c.quadraticCurveTo(0, 6, -44, -2); c.quadraticCurveTo(-52, -4, -58, -8); c.closePath(); R(c, '#d9453a', OUT, 1.6);
  c.fillStyle = '#f3c63a'; c.fillRect(-40, 0, 80, 3);
  for (let i = 0; i < 9; i++) { const px = -38 + i * 9.5; ell(c, px, -9, 3.2, 3.6, i % 2 ? '#f3c63a' : '#7a48c8', OUT, 1); ell(c, px, -14, 2.6, 2.6, '#f1c27d', OUT, .8); c.strokeStyle = '#6a4a2a'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(px, -10); c.lineTo(px + 7, 3); c.stroke(); }
  c.restore();
}
THEMES['tra-vinh'] = {
  sky: ['#3fb0d8', '#b8ece4', '#fff0c0'], sun: [880, 150, 'rgba(255,246,200,.95)'], bank: '#6ab050',
  far(c) { hills(c, 198, 14, '#8cc874', 2, 6); hills(c, 220, 8, '#62ac50', 3, 5, 1); wrap(() => khmer(c, 300, 238, 1.15)); wrap(() => khmer(c, 780, 240, .95)); [[60, 232, 112, 14], [170, 234, 100, -12], [520, 232, 108, 12], [640, 234, 96, -10], [940, 232, 110, 14]].forEach(p => wrap(() => palm(c, p[0], p[1], p[2], p[3]))); [[430, 246, 1], [880, 246, 1.1], [30, 246, .9]].forEach(m => wrap(() => mangrove(c, m[0], m[1], m[2]))); },
  river(c) { c.fillStyle = grad(c, 0, 128, '#58c0b0', '#2a8a80'); c.fillRect(0, 0, W, 128); waves(c, 'rgba(255,255,255,.4)'); [[180, 46, 1], [560, 74, -1], [880, 50, 1]].forEach(b => wrap(() => gheNgo(c, b[0], b[1], b[2]))); [[380, 80, 1, 'hat'], [740, 44, -1, 'hat']].forEach(b => wrap(() => ghe(c, b[0], b[1], b[2], b[3]))); },
  plants(c) { [30, 140, 260, 390, 520, 650, 780, 910].forEach((x, i) => wrap(() => blade(c, x, .9 + (i % 3) * .14, '#3f9a3a', '#58b64a', 80))); [[200, 126, .8], [600, 126, .9], [930, 126, .8]].forEach(m => wrap(() => mangrove(c, m[0], m[1], m[2]))); },
  ground: ['#d7b878', '#9a7a44', '#6ab050', '#559a3a']
};
export function drawShimmer(c) {   // 512x128 sparkle strip laid over painted water
  c.clearRect(0, 0, 512, 128); c.strokeStyle = 'rgba(255,255,255,.75)'; c.lineCap = 'round';
  for (let i = 0; i < 46; i++) { const x = (i * 97) % 512, y = 6 + (i * 53) % 116, l = 8 + (i * 7) % 18; c.lineWidth = 1.5 + (i % 3) * .6; [-512, 0].forEach(o => { c.beginPath(); c.moveTo(x + o, y); c.lineTo(x + o + l, y + (i % 2 ? .6 : -.6)); c.stroke(); }); }
}

for (const t of Object.values(THEMES)) for (const k of ['far', 'river', 'plants']) { const f = t[k]; t[k] = c => { CTX = c; f(c); }; }

export function drawSkyTheme(c, w, h, t) {
  const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, t.sky[0]); g.addColorStop(.55, t.sky[1]); g.addColorStop(1, t.sky[2]); c.fillStyle = g; c.fillRect(0, 0, w, h);
  const [sx, sy, col] = t.sun, s = c.createRadialGradient(sx, sy, 8, sx, sy, 170); s.addColorStop(0, col); s.addColorStop(1, 'rgba(255,240,200,0)'); c.fillStyle = s; c.fillRect(0, 0, w, h);
}
export function drawGroundTheme(c, [top, bot, g1, g2]) { // 128x128 horizontally seamless
  c.fillStyle = top; c.fillRect(0, 0, 128, 128); c.fillStyle = grad(c, 10, 128, top, bot); c.fillRect(0, 10, 128, 118);
  c.fillStyle = g1; c.fillRect(0, 0, 128, 12); c.fillStyle = g2; for (let x = 0; x < 128; x += 8) { c.beginPath(); c.moveTo(x, 10); c.lineTo(x + 3, 2 + (x % 3) * 2); c.lineTo(x + 6, 10); c.fill(); }
  [[14, 40, 6], [60, 70, 8], [100, 34, 5], [36, 100, 7], [90, 96, 6]].forEach(s => ell(c, s[0], s[1], s[2], s[2] * .6, 'rgba(150,140,125,.9)', 'rgba(70,56,40,.8)', 1.5));
  c.fillStyle = 'rgba(217,162,56,.8)'; [[30, 24], [84, 52], [116, 84]].forEach(l => { c.beginPath(); c.ellipse(l[0], l[1], 6, 2.5, .5, 0, TAU); c.fill(); });
}
