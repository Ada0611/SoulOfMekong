import numpy as np, cv2, os
from PIL import Image, ImageDraw, ImageFont, ImageFilter
exec(open('badges.py').read().split("for ri,row in enumerate(rows):")[0])   # reuse extraction helpers (rows/export/lab/...)
OUT='/home/claude/utti-adventure/public/assets/badges/'; os.makedirs(OUT,exist_ok=True)
IDS={
 0:['can-tho-cho-noi','can-tho-ninh-kieu','can-tho-phong-dien','can-tho-chua-ong','can-tho-am-thuc','can-tho-cau-can-tho','can-tho-nha-co','can-tho-truc-lam','can-tho-vuon-co','can-tho-don-ca'],
 1:['vinh-long-cu-lao','vinh-long-cho-noi-tra-on','vinh-long-cau-my-thuan','vinh-long-gom-do','vinh-long-van-thanh','vinh-long-buoi','vinh-long-khoai-lang','vinh-long-song-tien-hau','vinh-long-cam-sanh','vinh-long-mien-vuon'],
 2:['tien-giang-vinh-trang','tien-giang-cho-noi-cai-be','tien-giang-con-thoi-son','tien-giang-rach-mieu','tien-giang-hu-tieu','tien-giang-xoai','tien-giang-vu-sua','tien-giang-rach-gam','tien-giang-lang-nghe','tien-giang-ban-do'],
 3:['dong-thap-vuon-quoc-gia','dong-thap-lang-hoa','dong-thap-tram-chim','dong-thap-xeo-quyt','dong-thap-nha-co','dong-thap-banh-xeo','dong-thap-nem-lai-vung','dong-thap-ca-linh','dong-thap-gao','dong-thap-sen-hong'],
 4:['ben-tre-keo-dua','ben-tre-chua-dua','ben-tre-con-phung','ben-tre-vien-minh','ben-tre-lang-nghe-dua','ben-tre-banh-trang','ben-tre-mut-dua','ben-tre-cau-ham-luong','ben-tre-rach','ben-tre-don-ca'],
 5:['tra-vinh-ao-ba-om','tra-vinh-chua-ang','tra-vinh-chua-hang','tra-vinh-ba-dong','tra-vinh-banh-tet','tra-vinh-dua-sap','tra-vinh-rung-ngap-man','tra-vinh-bao-tang-khmer','tra-vinh-cau-co-chien','tra-vinh-ok-om-bok']}
RELABEL={'dong-thap-nha-co':'Nhà Cổ Sa Đéc','dong-thap-gao':'Gạo Đồng Tháp','ben-tre-keo-dua':'Kẹo Dừa','ben-tre-chua-dua':'Chùa Dừa','tra-vinh-chua-ang':'Chùa Âng','tra-vinh-banh-tet':'Bánh Tét Trà Cuôn','tra-vinh-bao-tang-khmer':'Bảo Tàng Khmer','tra-vinh-cau-co-chien':'Cầu Cổ Chiên'}
FONT='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
def relabel(path,text):
    im=Image.open(path).convert('RGBA'); a=np.asarray(im).copy(); H,W=a.shape[:2]; rgb=a[:,:,:3].copy()
    y0,y1,x0,x1=int(.62*H),int(.97*H),int(.12*W),int(.88*W)
    zone=np.zeros((H,W),bool); zone[y0:y1,x0:x1]=True
    white=(rgb.min(2)>205)&zone&(a[:,:,3]>200)
    ys,xs=np.where(white); tb=(xs.min(),ys.min(),xs.max()+1,ys.max()+1)
    mask=ndi.binary_dilation(white,iterations=3)&zone; mask=ndi.binary_closing(mask,iterations=3)
    bgr=cv2.cvtColor(rgb,cv2.COLOR_RGB2BGR); inp=cv2.inpaint(bgr,(mask*255).astype(np.uint8),4,cv2.INPAINT_TELEA); rgb2=cv2.cvtColor(inp,cv2.COLOR_BGR2RGB)
    a[:,:,:3]=np.where(mask[:,:,None],rgb2,rgb); out=Image.fromarray(a)
    ring=a[y0:y1,x0:x1][~mask[y0:y1,x0:x1]]; col=np.median(ring[:,:3],axis=0)*.32
    cx,cy=(tb[0]+tb[2])/2,(tb[1]+tb[3])/2; maxw=(tb[2]-tb[0])*1.0 if (tb[2]-tb[0])>.5*W else .56*W
    size=17
    while size>8:
        f=ImageFont.truetype(FONT,size*4); w=f.getbbox(text)[2]-f.getbbox(text)[0]
        if w/4<=maxw: break
        size-=1
    S=4; layer=Image.new('RGBA',(W*S,H*S),(0,0,0,0)); d=ImageDraw.Draw(layer); f=ImageFont.truetype(FONT,size*S)
    bb=d.textbbox((0,0),text,font=f,anchor='lt'); tw,th=bb[2]-bb[0],bb[3]-bb[1]
    pos=(cx*S-tw/2-bb[0],cy*S-th/2-bb[1])
    d.text(pos,text,font=f,fill=(255,255,255,255),stroke_width=int(1.6*S),stroke_fill=tuple(int(v) for v in col)+(255,))
    layer=layer.resize((W,H),Image.LANCZOS); out.alpha_composite(layer); out.save(path); return size
for ri,row in enumerate(rows[:6]):
    row.sort(key=lambda r:r['x0'])
    for ci,r in enumerate(row): export(r,OUT+IDS[ri][ci]+'.png')
for bid,text in RELABEL.items(): print(bid,'->',text,'font',relabel(OUT+bid+'.png',text))
print(len(os.listdir(OUT)),'badge files')
sh=Image.new('RGBA',(8*210,2*210),(246,238,215,255))
for i,bid in enumerate(RELABEL): f=Image.open(OUT+bid+'.png').resize((200,200),Image.LANCZOS); sh.alpha_composite(f,((i%8)*210+5,(i//8)*210+5))
sh.convert('RGB').crop((0,0,8*210,210)).save('relabel_check.png')
