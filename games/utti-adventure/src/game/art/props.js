// Obstacle, UI and background drawing (all procedural, hand-painted cartoon look: outlines + soft shading)
const OUT = '#2b1d12';
const R = (c, f, s, lw = 2.5) => { c.fillStyle = f; c.fill(); if (s) { c.strokeStyle = s; c.lineWidth = lw; c.lineJoin = 'round'; c.stroke(); } };
function ell(c, x, y, rx, ry, f, s = OUT, lw = 2, rot = 0) { c.beginPath(); c.ellipse(x, y, rx, ry, rot, 0, 7); R(c, f, s, lw); }
function rr(c, x, y, w, h, r, f, s = OUT, lw = 2.5) { c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); R(c, f, s, lw); }
const grad = (c, y0, y1, a, b, x0 = 0, x1 = 0) => { const g = c.createLinearGradient(x0, y0, x1, y1); g.addColorStop(0, a); g.addColorStop(1, b); return g; };

export function drawHeart(c, on) { c.clearRect(0, 0, 48, 44); c.beginPath(); c.moveTo(24, 40); c.bezierCurveTo(0, 24, 2, 4, 15, 4); c.bezierCurveTo(21, 4, 24, 9, 24, 12); c.bezierCurveTo(24, 9, 27, 4, 33, 4); c.bezierCurveTo(46, 4, 48, 24, 24, 40); c.closePath(); R(c, on ? grad(c, 4, 40, '#ff6b6b', '#c81e3a') : '#5a5a5a', on ? '#6b0f1e' : '#333', 3); if (on) ell(c, 14, 14, 4, 3, 'rgba(255,255,255,.7)', null, 0, -0.6); }
export function drawSpark(c) { const g = c.createRadialGradient(8, 8, 0, 8, 8, 8); g.addColorStop(0, '#fff'); g.addColorStop(.4, '#ffe27a'); g.addColorStop(1, 'rgba(255,200,60,0)'); c.fillStyle = g; c.fillRect(0, 0, 16, 16); }
export function drawDust(c) { const g = c.createRadialGradient(8, 8, 0, 8, 8, 8); g.addColorStop(0, 'rgba(230,205,160,.9)'); g.addColorStop(1, 'rgba(230,205,160,0)'); c.fillStyle = g; c.fillRect(0, 0, 16, 16); }
export function drawCloud(c, w = 200, h = 80) { c.fillStyle = 'rgba(255,255,255,.95)'; [[50, 52, 34], [88, 40, 40], [130, 50, 34], [160, 56, 24], [24, 58, 20]].forEach(a => { c.beginPath(); c.arc(a[0], a[1], a[2], 0, 7); c.fill(); }); c.fillStyle = 'rgba(190,215,240,.5)'; c.fillRect(10, 62, 170, 14); }

