import numpy as np, os, math
from PIL import Image, ImageFilter, ImageDraw
U='/mnt/user-data/uploads/'; A='/home/claude/utti-adventure/public/assets/'
for d in ['obstacles','items','backgrounds']: os.makedirs(A+d,exist_ok=True)
# ---- buffalo (hi-res, hand drawn) ----
b=Image.open(U+'trâu.png').convert('RGBA'); b=b.crop(b.getchannel('A').point(lambda v:255 if v>20 else 0).getbbox())
k=380/b.width; b=b.resize((380,round(b.height*k)),Image.LANCZOS); b.save(A+'obstacles/buffalo.png'); print('buffalo',b.size)
# ---- items: hat is now its own item; draw a smooth shield ----
if os.path.exists(A+'items/shield.png') and not os.path.exists(A+'items/nonla.png'): os.rename(A+'items/shield.png',A+'items/nonla.png')
S=4; W,H=200*S,224*S
def bez(p0,p1,p2,n=24): return [((1-t)**2*p0[0]+2*(1-t)*t*p1[0]+t*t*p2[0],(1-t)**2*p0[1]+2*(1-t)*t*p1[1]+t*t*p2[1]) for t in [i/n for i in range(n+1)]]
def shield_pts(inset=0):
    cx=50; l,r,t=12+inset,88-inset,14+inset
    pts=bez((l,t+2),(cx,t-10),(r,t+2))+[(r,52-inset*.4)]+bez((r,52-inset*.4),(r-4,82),(cx,97-inset*1.6))+bez((cx,97-inset*1.6),(l+4,82),(l,52-inset*.4))
    return [(x*W/100,y*H/100) for x,y in pts]
def poly_mask(pts): m=Image.new('L',(W,H),0); ImageDraw.Draw(m).polygon(pts,fill=255); return m
glow=Image.new('RGBA',(W,H),(0,0,0,0)); gm=poly_mask(shield_pts(-6)).filter(ImageFilter.GaussianBlur(26)); glow.paste(Image.new('RGBA',(W,H),(80,190,255,170)),(0,0),gm)
img=glow.copy()
def gradient(c1,c2): g=Image.new('RGBA',(W,H)); d=ImageDraw.Draw(g); 
for_ = None
def vgrad(c1,c2):
    g=Image.new('RGBA',(W,H)); px=g.load()
    for y in range(H):
        t=y/H; col=tuple(int(c1[i]*(1-t)+c2[i]*t) for i in range(3))+(255,)
        for x in range(W): px[x,y]=col
    return g
for inset,c1,c2 in [(-2,(40,28,18),(40,28,18)),(0,(255,214,90),(214,140,30)),(4,(66,40,20),(66,40,20)),(6,(110,214,255),(22,92,214))]:
    m=poly_mask(shield_pts(inset)); layer=vgrad(c1,c2); img.paste(layer,(0,0),m)
cross=Image.new('L',(W,H),0); d=ImageDraw.Draw(cross); cx,cy=W*.5,H*.50
d.rounded_rectangle((cx-W*.075,cy-H*.22,cx+W*.075,cy+H*.22),radius=W*.03,fill=255); d.rounded_rectangle((cx-W*.2,cy-H*.075,cx+W*.2,cy+H*.075),radius=W*.03,fill=255)
sh=cross.filter(ImageFilter.GaussianBlur(5)); img.paste(Image.new('RGBA',(W,H),(10,40,110,150)),(int(W*.01),int(H*.015)),sh); img.paste(Image.new('RGBA',(W,H),(255,255,255,255)),(0,0),cross)
hi=Image.new('L',(W,H),0); ImageDraw.Draw(hi).ellipse((W*.2,H*.12,W*.55,H*.42),fill=90); hi=hi.filter(ImageFilter.GaussianBlur(14)); inner=poly_mask(shield_pts(6)); hi=Image.composite(hi,Image.new('L',(W,H),0),inner)
img.paste(Image.new('RGBA',(W,H),(255,255,255,255)),(0,0),hi)
img=img.resize((200,224),Image.LANCZOS); img.save(A+'items/shield.png'); print('shield',img.size)
# ---- Can Tho background ----
bg=Image.open(U+'bg_CT.png').convert('RGB'); crop=bg.crop((99,0,99+1576,887)); crop.save(A+'backgrounds/bg_can-tho.jpg',quality=90,optimize=True); print('bg',crop.size,os.path.getsize(A+'backgrounds/bg_can-tho.jpg')//1024,'KB')
# seamless road/grass/soil tile from the bottom strip of the same painting
arr=np.asarray(bg).astype(float); strip=arr[722:887,560:1200]   # 165 x 640
out=strip[:, :512].copy()
for x in range(128):
    w=x/127.0; out[:,x]=w*strip[:,x]+(1-w)*strip[:,x+512]
tile=Image.new('RGB',(512,256)); tile.paste(Image.fromarray(out.astype(np.uint8)),(0,0)); last=Image.fromarray(out[-1:].astype(np.uint8)).resize((512,91)); tile.paste(last,(0,165))
tile.save(A+'backgrounds/ground_can-tho.png'); print('ground tile ok')
