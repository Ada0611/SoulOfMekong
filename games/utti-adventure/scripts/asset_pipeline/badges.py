import numpy as np, collections
from PIL import Image, ImageFilter
from scipy import ndimage as ndi
im=Image.open('/mnt/user-data/uploads/huy_hiệu_v2.png').convert('RGB'); A=np.asarray(im).astype(int)
nonwhite=A.min(2)<238
lab,n=ndi.label(ndi.binary_dilation(nonwhite,iterations=2)); items=[]
for i in range(1,n+1):
    m=(lab==i)&nonwhite; ys,xs=np.where(m)
    if m.sum()<1500: continue
    x0,y0,x1,y1=xs.min(),ys.min(),xs.max()+1,ys.max()+1
    if x0<110: continue            # province label boxes on the left
    items.append(dict(x0=x0,y0=y0,x1=x1,y1=y1,i=i,cy=(y0+y1)/2))
items.sort(key=lambda r:r['cy']); rows=[]; 
for r in items:
    if rows and abs(r['cy']-np.mean([q['cy'] for q in rows[-1]]))<45: rows[-1].append(r)
    else: rows.append([r])
print('rows',len(rows),[len(r) for r in rows])
SIZE=192
def export(r,name):
    m=(lab==r['i'])&nonwhite; m=ndi.binary_fill_holes(m)
    xa,ya,xb,yb=max(0,r['x0']-2),max(0,r['y0']-2),min(im.width,r['x1']+2),min(im.height,r['y1']+2)
    sub=np.asarray(im.crop((xa,ya,xb,yb))).copy(); mm=m[ya:yb,xa:xb]
    mm=ndi.binary_erosion(mm,iterations=1)
    al=Image.fromarray((mm*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(.8))
    f=Image.fromarray(sub).convert('RGBA'); f.putalpha(al)
    k=min((SIZE-6)/f.width,(SIZE-6)/f.height); f=f.resize((round(f.width*k),round(f.height*k)),Image.LANCZOS)
    R,G,B,Aa=f.split(); rgb=Image.merge('RGB',(R,G,B)).filter(ImageFilter.UnsharpMask(radius=1.0,percent=45,threshold=2)); f=rgb.convert('RGBA'); f.putalpha(Aa)
    cv=Image.new('RGBA',(SIZE,SIZE),(0,0,0,0)); cv.alpha_composite(f,((SIZE-f.width)//2,SIZE-f.height-3)); cv.save(name)
for ri,row in enumerate(rows):
    row.sort(key=lambda r:r['x0'])
    for ci,r in enumerate(row): export(r,f'badges/r{ri}_c{ci}.png')
# contact sheet for reading labels
sh=Image.new('RGBA',(10*150,8*150),(246,238,215,255))
for ri in range(len(rows)):
    for ci in range(10):
        f=Image.open(f'badges/r{ri}_c{ci}.png').resize((150,150),Image.LANCZOS); sh.alpha_composite(f,(ci*150,ri*150))
sh.convert('RGB').save('badges_contact.png')
