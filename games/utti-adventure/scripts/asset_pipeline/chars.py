import numpy as np, os, pickle
from PIL import Image, ImageFilter
from scipy import ndimage as ndi
U='/mnt/user-data/uploads/'
anim=Image.open(U+'animation.png').convert('RGBA'); run=Image.open(U+'chạy.png').convert('RGBA')

def shadow_free(img, y_from=0):
    a=np.asarray(img).copy(); rgb=a[:,:,:3].astype(int); V=rgb.max(2)
    sh=(V<95)&((rgb[:,:,2]-rgb[:,:,0])>=9)&((rgb[:,:,1]-rgb[:,:,0])>=6)   # dark teal drop shadow
    sh[:y_from]=False; a[:,:,3]=np.where(sh,0,a[:,:,3]); return Image.fromarray(a)

def comps(img, box, min_area=900, join=2):
    sub=img.crop(box); a=np.asarray(sub)[:,:,3]>40
    lab,n=ndi.label(ndi.binary_dilation(a,iterations=join)); out=[]
    for i in range(1,n+1):
        m=(lab==i)&a
        if m.sum()<min_area: continue
        ys,xs=np.where(m); out.append((xs.min(),ys.min(),xs.max()+1,ys.max()+1,int(m.sum()),m))
    out.sort(key=lambda t:t[0]); return sub,out

def cut(sub,c,clean_feet=True):
    x0,y0,x1,y1,_,m=c; m=ndi.binary_fill_holes(m)
    if clean_feet:   # drop the thin remnant ring of the drop shadow around the feet
        yb=np.where(m)[0].max(); o=ndi.binary_opening(m,structure=np.ones((3,3)),iterations=2)
        band=np.zeros_like(m); band[max(0,yb-34):yb+1,:]=True; m=np.where(band,o,m)
        lab,n=ndi.label(m)
        if n>1: sizes=ndi.sum(m,lab,range(1,n+1)); m=lab==(1+int(np.argmax(sizes)))
        ys,xs=np.where(m); x0,x1,y0,y1=xs.min(),xs.max()+1,ys.min(),ys.max()+1
    rgba=np.asarray(sub).copy(); rgba[:,:,3]=np.where(m,rgba[:,:,3],0); return Image.fromarray(rgba).crop((x0,y0,x1,y1))

def hat_w(f):
    a=np.asarray(f)[:,:,3]>128; h=a.shape[0]; best=0
    for y in range(0,int(h*.4)):
        xs=np.where(a[y])[0]
        if len(xs): best=max(best,xs.max()-xs.min())
    return int(best)

frames={}
A=shadow_free(anim,495)
for name,box,n in [('idle',(20,300,560,530),5),('jump',(580,290,1245,530),6),('crouch',(1275,300,1760,530),4)]:
    sub,cs=comps(A,box); cs=sorted(cs,key=lambda t:-t[4])[:n]; cs.sort(key=lambda t:t[0])
    frames[name]=[cut(sub,c) for c in cs]; print(name,len(frames[name]),[f.size for f in frames[name]])
sub,cs=comps(run,(0,300,1536,740),min_area=5000); cs.sort(key=lambda t:t[0]); frames['run']=[cut(sub,c,False) for c in cs]; print('run',len(frames['run']),[f.size for f in frames['run']])
for k,v in frames.items(): print(k,'hat widths',[hat_w(f) for f in v])
pickle.dump({k:[(f.size,f.tobytes()) for f in v] for k,v in frames.items()},open('frames_new.pkl','wb'))
old=Image.open('old/utti_idle_0.png'); print('old idle hat',hat_w(old),old.size)
