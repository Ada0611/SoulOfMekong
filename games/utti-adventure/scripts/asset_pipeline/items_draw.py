import math
from PIL import Image, ImageDraw, ImageFilter
A='/home/claude/utti-adventure/public/assets/items/'; S=4
def canvas(w,h): return Image.new('RGBA',(w*S,h*S),(0,0,0,0))
def vg(w,h,c1,c2):
    g=Image.new('RGBA',(w*S,h*S)); px=g.load()
    for y in range(h*S):
        t=y/(h*S); col=tuple(int(c1[i]*(1-t)+c2[i]*t) for i in range(3))+(255,)
        for x in range(w*S): px[x,y]=col
    return g
def glow(img,color,rad=24):
    a=img.getchannel('A').filter(ImageFilter.GaussianBlur(rad*S/4)); g=Image.new('RGBA',img.size,color+(0,)); g.putalpha(a.point(lambda v:int(v*.75))); out=Image.new('RGBA',img.size,(0,0,0,0)); out.alpha_composite(g); out.alpha_composite(img); return out
def finish(img,name,size):
    bb=img.getchannel('A').point(lambda v:255 if v>12 else 0).getbbox(); img=img.crop(bb); k=size/max(img.size); img=img.resize((max(1,round(img.width*k)),max(1,round(img.height*k))),Image.LANCZOS); img.save(A+name); print(name,img.size)
def paste_poly(base,pts,fill,outline=None,lw=0):
    m=Image.new('L',base.size,0); d=ImageDraw.Draw(m); d.polygon(pts,fill=255); layer=fill if isinstance(fill,Image.Image) else Image.new('RGBA',base.size,fill); base.paste(layer,(0,0),m)
    if outline: d2=ImageDraw.Draw(base); d2.line(pts+[pts[0]],fill=outline,width=lw*S,joint='curve')
# ---- nón lá ----
W,H=220,190; im=canvas(W,H); d=ImageDraw.Draw(im)
def arc_pts(cx,cy,rx,ry,a0,a1,n=40): return [((cx+rx*math.cos(math.radians(a0+(a1-a0)*i/n)))*S,(cy+ry*math.sin(math.radians(a0+(a1-a0)*i/n)))*S) for i in range(n+1)]
strap=arc_pts(110,128,62,46,20,160); d.line(strap,fill=(120,30,24,255),width=11*S,joint='curve'); d.line(strap,fill=(222,64,52,255),width=7*S,joint='curve')
cone=[(110*S,18*S)]+arc_pts(110,126,96,26,180,0)[::-1]+[(110*S,18*S)]
cone=[(110*S,18*S),(14*S,124*S)]+arc_pts(110,126,96,28,180,360)[1:-1]+[(206*S,124*S)]
d.ellipse((14*S,98*S,206*S,154*S),fill=(176,122,58,255),outline=(120,76,28,255),width=3*S)
paste_poly(im,cone,vg(W,H,(250,222,150),(214,160,84)),(120,76,28,255),3)
d=ImageDraw.Draw(im)
for i in range(1,9):
    ang=180+i*20; x=110+96*math.cos(math.radians(ang)); y=126+28*math.sin(math.radians(ang)); d.line([(110*S,18*S),(x*S,y*S)],fill=(176,120,52,150),width=2*S)
for t in (.38,.62,.82):
    pts=[]
    for i in range(41):
        ang=180+180*i/40; rr=t; x=110+96*rr*math.cos(math.radians(ang)); y=18+(126-18)*rr+28*rr*math.sin(math.radians(ang)); pts.append((x*S,y*S))
    d.line(pts,fill=(176,120,52,120),width=2*S)
rim=arc_pts(110,126,96,28,0,180); d.line(rim,fill=(120,76,28,255),width=3*S)
hl=Image.new('L',im.size,0); ImageDraw.Draw(hl).polygon([(100*S,30*S),(70*S,95*S),(86*S,98*S),(112*S,38*S)],fill=80); im.paste(Image.new('RGBA',im.size,(255,255,255,255)),(0,0),hl.filter(ImageFilter.GaussianBlur(6)))
finish(glow(im,(255,214,90)),'nonla.png',210)
# ---- dép thần tốc ----
W,H=240,200; im=canvas(W,H)
def sandal(cx,cy,ang):
    L=Image.new('RGBA',im.size,(0,0,0,0)); d=ImageDraw.Draw(L)
    d.ellipse(((cx-40)*S,(cy-84)*S,(cx+40)*S,(cy+84)*S),fill=(110,70,26,255)); d.ellipse(((cx-36)*S,(cy-80)*S,(cx+36)*S,(cy+80)*S),fill=(244,200,120,255)); d.ellipse(((cx-27)*S,(cy-70)*S,(cx+27)*S,(cy+66)*S),fill=(252,224,160,255))
    d.line([((cx-26)*S,(cy+8)*S),((cx)*S,(cy-52)*S),((cx+26)*S,(cy+8)*S)],fill=(14,50,120,255),width=15*S,joint='curve'); d.line([((cx-26)*S,(cy+8)*S),((cx)*S,(cy-52)*S),((cx+26)*S,(cy+8)*S)],fill=(54,140,236,255),width=10*S,joint='curve')
    d.ellipse(((cx-8)*S,(cy-60)*S,(cx+8)*S,(cy-44)*S),fill=(255,255,255,255)); d.line([((cx-26)*S,(cy+8)*S),((cx)*S,(cy-52)*S)],fill=(150,205,255,200),width=3*S)
    L=L.rotate(ang,resample=Image.BICUBIC,center=(cx*S,cy*S)); im.alpha_composite(L)
sandal(78,100,-14); sandal(160,100,12)
finish(glow(im,(255,214,90)),'boots.png',190)
# ---- trái cây hồi sức ----
W,H=240,200; im=canvas(W,H); d=ImageDraw.Draw(im)
g=Image.new('L',im.size,0); ImageDraw.Draw(g).ellipse((120*S,22*S,214*S,176*S),fill=255); im.paste(vg(W,H,(150,196,70),(70,120,34)),(0,0),g); d=ImageDraw.Draw(im); d.ellipse((120*S,22*S,214*S,176*S),outline=(36,70,20,255),width=4*S)
import random; random.seed(3)
for _ in range(16): x=random.randint(138,196); y=random.randint(50,156); d.ellipse((x*S,y*S,(x+5)*S,(y+4)*S),fill=(60,92,28,170))
m=Image.new('L',im.size,0); ImageDraw.Draw(m).ellipse((30*S,48*S,160*S,184*S),fill=255); im.paste(vg(W,H,(255,226,96),(238,128,20)),(0,0),m); d=ImageDraw.Draw(im); d.ellipse((30*S,48*S,160*S,184*S),outline=(140,70,10,255),width=4*S)
hl=Image.new('L',im.size,0); ImageDraw.Draw(hl).ellipse((52*S,68*S,98*S,112*S),fill=130); im.paste(Image.new('RGBA',im.size,(255,255,255,255)),(0,0),hl.filter(ImageFilter.GaussianBlur(7)))
d=ImageDraw.Draw(im); d.polygon([(100*S,52*S),(138*S,20*S),(168*S,34*S),(132*S,62*S)],fill=(88,168,52,255),outline=(36,90,24,255)); d.line([(104*S,52*S),(150*S,30*S)],fill=(190,238,130,255),width=2*S)
finish(glow(im,(255,150,70)),'fruit.png',170)
