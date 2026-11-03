// Badges are PNG artwork. These helpers only (a) build the grayscale "locked" variant and (b) draw a placeholder if a PNG is missing.
const star = (c, cx, cy, ro, ri) => { c.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? ri : ro; c.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); } c.closePath(); };
function lock(c, S) {
  const s = S / 192; c.save(); c.translate(S / 2, S * .46); c.scale(s, s); c.fillStyle = 'rgba(0,0,0,.5)'; c.beginPath(); c.arc(0, 0, 40, 0, 7); c.fill();
  c.strokeStyle = '#f2f2f2'; c.lineWidth = 8; c.beginPath(); c.arc(0, -8, 14, Math.PI, 0); c.stroke();
  c.fillStyle = '#e8c24a'; c.strokeStyle = '#2b1d12'; c.lineWidth = 3; c.beginPath(); c.rect(-18, -8, 36, 28); c.fill(); c.stroke(); c.fillStyle = '#2b1d12'; c.beginPath(); c.arc(0, 4, 4, 0, 7); c.fill(); c.fillRect(-1.6, 4, 3.2, 9); c.restore();
}
export function drawLocked(c, S, img) {
  c.clearRect(0, 0, S, S); c.drawImage(img, 0, 0, S, S);
  const d = c.getImageData(0, 0, S, S), a = d.data;
  for (let i = 0; i < a.length; i += 4) { const g = a[i] * .3 + a[i + 1] * .59 + a[i + 2] * .11, v = g * .62 + 26; a[i] = a[i + 1] = a[i + 2] = v; }
  c.putImageData(d, 0, 0); lock(c, S);
}
export function drawPlaceholder(c, S, name) {
  c.clearRect(0, 0, S, S); star(c, S / 2, S * .52, S * .46, S * .26); c.fillStyle = '#f2b020'; c.fill(); c.strokeStyle = '#7a4a10'; c.lineWidth = 5; c.stroke();
  c.fillStyle = '#fff'; c.strokeStyle = 'rgba(0,0,0,.5)'; c.lineWidth = 3; c.textAlign = 'center'; c.font = `800 ${Math.round(S * .09)}px sans-serif`; c.strokeText(name, S / 2, S * .9); c.fillText(name, S / 2, S * .9);
}
