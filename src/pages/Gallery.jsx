import { useState, useEffect } from 'react';
import Page from '../components/Section.jsx';
import { Icon } from '../components/Layout.jsx';
import { photos } from '../data/photos.js';
export default function Gallery() {
  const [i, setI] = useState(null);
  const go = d => setI(x => (x + d + photos.length) % photos.length);
  useEffect(() => { if (i === null) return; const k = e => { if (e.key === 'Escape') setI(null); if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1); }; window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k); }, [i]);
  return (<Page kicker="Thư viện ảnh trên Facebook" title="Khoảnh khắc miền Tây" sub="Hình ảnh đăng trên Facebook SoulOfMekong — nhấn vào ảnh để xem lớn">
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">{photos.map((p, n) => <button key={p.id} onClick={() => setI(n)} className="relative aspect-square rounded-lg overflow-hidden group">
      <div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url('${p.src}')` }} role="img" aria-label={p.title} />
      <span className="absolute top-2 left-2 flex items-center gap-1 bg-primary/80 backdrop-blur-sm px-2 py-0.5 rounded text-white font-label-stamp text-label-stamp"><Icon n="public" c="text-sm" />Facebook</span>
    </button>)}</div>
    {i !== null && <div className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4" onClick={() => setI(null)}>
      <button className="absolute top-4 right-4 text-white" aria-label="Đóng"><Icon n="close" c="text-3xl" /></button>
      <button className="absolute left-2 sm:left-6 text-white" aria-label="Ảnh trước" onClick={e => { e.stopPropagation(); go(-1); }}><Icon n="chevron_left" c="text-4xl" /></button>
      <figure className="max-w-5xl w-full" onClick={e => e.stopPropagation()}><img src={photos[i].src} alt={photos[i].title} className="max-h-[80vh] w-full object-contain rounded" />
        <figcaption className="text-center text-white/80 text-body-sm mt-3 flex flex-col items-center gap-2"><span>{photos[i].title} — {i + 1}/{photos.length}</span>
          {photos[i].url && <a href={photos[i].url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-white/15 text-white px-4 py-2 rounded-lg font-label-ui text-label-ui">Xem bài trên Facebook <Icon n="open_in_new" c="text-base" /></a>}
        </figcaption></figure>
      <button className="absolute right-2 sm:right-6 text-white" aria-label="Ảnh sau" onClick={e => { e.stopPropagation(); go(1); }}><Icon n="chevron_right" c="text-4xl" /></button></div>}
  </Page>);
}
