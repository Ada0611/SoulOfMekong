"""Extracts the Út Tí sprites, obstacles and items from the animation reference sheet.
Usage: python3 scripts/extract_sprites.py <utti-animation-reference.png> <public/assets dir>
Pipeline: flat-panel background removal (outlines block the flood fill) -> split frames -> align by hat apex / feet
-> unsharp -> export PNGs, then a clean-up pass for stray dots and glow halos on items.
Requires: pillow, numpy, scipy."""
import sys
REF_SHEET_PATH = sys.argv[1] if len(sys.argv) > 1 else 'utti-animation-reference.png'
OUT_DIR = sys.argv[2] if len(sys.argv) > 2 else 'public/assets'
import numpy as np, os, json
from PIL import Image, ImageFilter
from scipy import ndimage as ndi
im = Image.open('REF_SHEET_PATH').convert('RGB')
A = np.asarray(im).astype(np.int16)

def fg_mask(box):
    x0,y0,x1,y1 = box
    c = A[y0:y1, x0:x1]
    V = c.max(2); S = c.max(2)-c.min(2)
    Vg = ndi.gaussian_filter(V.astype(float), 0.8)
    gx = ndi.sobel(Vg, axis=1); gy = ndi.sobel(Vg, axis=0); grad = np.hypot(gx, gy)/8.0
    cand = (V < 70) & (S < 36) & (grad < 9.0)   # flat dark panel; sprite outlines (high gradient) block the flood
    lab, n = ndi.label(cand)
    border = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:,0], lab[:,-1]]))) - {0}
    bg = np.isin(lab, list(border))
    fg = ~bg
    fg = ndi.binary_opening(fg, iterations=1)
    fg = ndi.binary_fill_holes(fg)
    fg = ndi.binary_erosion(fg, iterations=1)     # trim 1px dark fringe
    return fg

def components(fg, min_area, join=5):
    d = ndi.binary_dilation(fg, iterations=join)
    lab, n = ndi.label(d)
    comps = []
    for i in range(1, n+1):
        m = (lab == i) & fg
        if m.sum() >= min_area:
            ys, xs = np.where(m); comps.append((xs.min(), ys.min(), xs.max()+1, ys.max()+1, m))
    comps.sort(key=lambda t: t[0])
    return comps

def cut(box, comp, scale):
    x0,y0,_,_ = box
    bx0,by0,bx1,by1,m = comp
    pad = 3
    xa,ya,xb,yb = max(bx0-pad,0), max(by0-pad,0), min(bx1+pad,m.shape[1]), min(by1+pad,m.shape[0])
    rgb = im.crop((x0+xa, y0+ya, x0+xb, y0+yb))
    full = np.zeros(m.shape, bool); full[:] = m
    mm = ndi.binary_fill_holes(full)[ya:yb, xa:xb]
    # soft alpha with 1px feather
    alpha = Image.fromarray((mm*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.8))
    out = rgb.convert('RGBA'); out.putalpha(alpha)
    out = out.resize((int(out.width*scale), int(out.height*scale)), Image.LANCZOS)
    return out

SETS = {
 'idle':   ((500,112,1016,256), 6, 400),
 'run':    ((1034,112,1512,256), 5, 400),
 'jump':   ((505,284,968,458), 5, 300),
 'crouch': ((1034,352,1500,458), 4, 300),
 'speed':  ((870,552,1062,700), 1, 600),
 'hit':    ((1115,552,1292,700), 1, 600),
 'dead':   ((1340,585,1492,692), 1, 500),
 'ob_log':    ((38,806,160,905), 1, 600),
 'ob_basket': ((168,806,262,905), 1, 600),
 'ob_chicken':((282,806,392,905), 1, 600),
 'ob_buffalo':((392,796,550,905), 1, 800),
 'ob_boat':   ((548,806,692,905), 1, 800),
 'ob_branch': ((690,796,815,905), 1, 600),
 'it_shield': ((852,800,968,908), 1, 400),
 'it_boots':  ((996,800,1094,908), 1, 400),
 'it_fruit':  ((1124,800,1236,908), 1, 400),
}
SCALE = 2.0
res = {}
for k,(box,n,minarea) in SETS.items():
    fg = fg_mask(box)
    comps = components(fg, minarea)
    comps.sort(key=lambda t: -(t[4].sum()))
    comps = comps[:n]; comps.sort(key=lambda t: t[0])
    res[k] = [cut(box, c, SCALE) for c in comps]
    print(k, 'expected', n, 'got', len(res[k]), [r.size for r in res[k]])

# ---------- export normalized assets ----------
from PIL import ImageFilter
OUTDIR=OUT_DIR
for d in ['characters','obstacles','items']: os.makedirs(f'{OUTDIR}/{d}', exist_ok=True)
def sharpen(f):
    r,g,b,a = f.split(); rgb = Image.merge('RGB',(r,g,b)).filter(ImageFilter.UnsharpMask(radius=1.4, percent=70, threshold=2))
    out = rgb.convert('RGBA'); out.putalpha(a); return out
def apex_x(f):
    a = np.asarray(f.split()[3]); ys,xs = np.where(a>128); top = ys.min(); sel = xs[ys<top+6]; return float(sel.mean())
CW, CH = 320, 268
info = {}
def put_char(name, f, mode='apex'):
    f = sharpen(f); cv = Image.new('RGBA',(CW,CH),(0,0,0,0))
    ax = apex_x(f) if mode=='apex' else f.width/2
    x = int(round(CW/2 - ax)); y = CH - f.height - 2
    cv.alpha_composite(f,(x,y)); cv.save(f'{OUTDIR}/characters/{name}.png'); return cv.size
for k in ['idle','run','jump','crouch']:
    for i,f in enumerate(res[k]): put_char(f'utti_{k}_{i}', f)
put_char('utti_hit_0', res['hit'][0]); put_char('utti_speed_0', res['speed'][0]); put_char('utti_dead_0', res['dead'][0], mode='center')
for k in ['log','basket','chicken','buffalo','boat','branch']:
    f = sharpen(res['ob_'+k][0]); f.save(f'{OUTDIR}/obstacles/{k}.png'); info[k]=f.size
for k in ['shield','boots','fruit']:
    f = sharpen(res['it_'+k][0]); f.save(f'{OUTDIR}/items/{k}.png'); info[k]=f.size
print(info)

# ---------- clean-up pass (stray dots, glow halo on items) ----------
def clean(path, item=False):
    im2 = Image.open(path).convert('RGBA'); a = np.asarray(im2).copy(); rgb = a[:,:,:3].astype(int); alpha = a[:,:,3] > 100
    V = rgb.max(2); S = rgb.max(2) - rgb.min(2); m = alpha.copy()
    if item:
        core = alpha & ((V >= 105) | (S > 95)); closed = ndi.binary_closing(core, iterations=2); lab, n = ndi.label(closed)
        if n: core = (lab == (1 + int(np.argmax(ndi.sum(core, lab, range(1, n+1)))))) & closed
        m = ndi.binary_fill_holes(ndi.binary_dilation(core, iterations=3) & alpha)
    lab, n = ndi.label(m)
    if n > 1:
        sizes = ndi.sum(m, lab, range(1, n+1)); m = np.isin(lab, [i+1 for i, s in enumerate(sizes) if s >= 0.02*sizes.max()])
    m = ndi.binary_fill_holes(m); al = Image.fromarray((m*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.7))
    out = Image.fromarray(a[:,:,:3]).convert('RGBA'); out.putalpha(al); out = out.crop(out.getchannel('A').point(lambda v: 255 if v > 20 else 0).getbbox()); out.save(path)
for k in ['log','basket','chicken','buffalo','boat','branch']: clean(f'{OUTDIR}/obstacles/{k}.png')
for k in ['shield','boots','fruit']: clean(f'{OUTDIR}/items/{k}.png', True)
