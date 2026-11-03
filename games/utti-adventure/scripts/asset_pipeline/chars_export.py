import numpy as np, pickle, os
from PIL import Image, ImageFilter
from scipy import ndimage as ndi
exec(open('chars.py').read().split("frames={}")[0])   # reuse helpers
fr={k:[Image.frombytes('RGBA',s,b) for s,b in v] for k,v in pickle.load(open('frames_new.pkl','rb')).items()}
OUT='/home/claude/utti-adventure/public/assets/characters/'; os.makedirs(OUT,exist_ok=True)
CW,CH=260,264; F=1.55; RUNK=76/203*F
def sharpen(f,r=1.1,p=55):
    R,G,B,A=f.split(); rgb=Image.merge('RGB',(R,G,B)).filter(ImageFilter.UnsharpMask(radius=r,percent=p,threshold=2)); o=rgb.convert('RGBA'); o.putalpha(A); return o
def scale(f,k): return f.resize((max(1,round(f.width*k)),max(1,round(f.height*k))),Image.LANCZOS)
def apex(f):
    a=np.asarray(f)[:,:,3]>128; ys,xs=np.where(a); top=ys.min(); return float(xs[ys<top+6].mean())
def put(name,f,mode='apex'):
    ax=apex(f) if mode=='apex' else f.width/2; cv=Image.new('RGBA',(CW,CH),(0,0,0,0)); x=int(round(CW/2-ax)); y=CH-f.height-2
    assert x>=0 and x+f.width<=CW and y>=0,(name,x,f.width,y); cv.alpha_composite(f,(x,y)); cv.save(OUT+name+'.png')
for k in ['idle','jump','crouch']:
    for i,f in enumerate(fr[k]): put(f'utti_{k}_{i}',sharpen(scale(f,F)))
for i,f in enumerate(fr['run']): put(f'utti_run_{i}',sharpen(scale(f,RUNK),0.8,40))
# hit / dead come from the first reference sheet: trim and match the hat size
def trimmed(p):
    im=Image.open(p).convert('RGBA'); return im.crop(im.getchannel('A').point(lambda v:255 if v>20 else 0).getbbox())
k_old=76*F/117
put('utti_hit_0',scale(trimmed('old/utti_hit_0.png'),k_old),'center'); put('utti_dead_0',scale(trimmed('old/utti_dead_0.png'),k_old*0.85),'center')
# contact sheet
names=[f'utti_{k}_{i}' for k,n in [('idle',5),('run',5),('jump',6),('crouch',4),('hit',1),('dead',1)] for i in range(n)]
sh=Image.new('RGBA',(CW*8//2+20,CH*3//2+20),(120,170,210,255)); x=y=6
for n in names:
    f=Image.open(OUT+n+'.png'); f=f.resize((f.width//2,f.height//2))
    if x+f.width>sh.width-6: x=6; y+=f.height+4
    sh.alpha_composite(f,(x,y)); x+=f.width+2
sh.convert('RGB').save('chars_sheet.png'); print(len(names),'frames',sh.size)
