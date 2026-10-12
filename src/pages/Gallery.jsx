import { useState, useEffect } from 'react';
import Page from '../components/Section.jsx';
import { Icon } from '../components/Layout.jsx';
import { stories } from '../data/stories.js';
import { upcoming } from '../data/upcoming.js';
import { videos } from '../data/videos.js';
import { img } from '../data/project.js';
const photos = [, ...[...stories].filter(s => s.image).map(s => ({ src: s.image, alt: s.title })), ...videos.filter(v => v.thumbnail).map(v => ({ src: v.thumbnail, alt: v.title }))];
export default function Gallery() {
  const [i, setI] = useState(null);
  const go = d => setI(x => (x + d + photos.length) % photos.length);
  useEffect(() => { if (i === null) return; const k = e => { if (e.key === 'Escape') setI(null); if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1); }; window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k); }, [i]);
  return (<Page kicker="Thư viện ảnh" title="Khoảnh khắc miền Tây" sub="Nhấn vào ảnh để xem lớn">
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">{photos.map((p, n) => <button key={n} onClick={() => setI(n)} className="aspect-square rounded-lg overflow-hidden group"><div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url('${p.src}')` }} role="img" aria-label={p.alt} /></button>)}</div>
    {i !== null && <div className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4" onClick={() => setI(null)}>
      <button className="absolute top-4 right-4 text-white" aria-label="Đóng"><Icon n="close" c="text-3xl" /></button>
      <button className="absolute left-2 sm:left-6 text-white" aria-label="Ảnh trước" onClick={e => { e.stopPropagation(); go(-1); }}><Icon n="chevron_left" c="text-4xl" /></button>
      <figure className="max-w-5xl w-full" onClick={e => e.stopPropagation()}><img src={photos[i].src} alt={photos[i].alt} className="max-h-[80vh] w-full object-contain rounded" /><figcaption className="text-center text-white/80 text-body-sm mt-3">{photos[i].alt} — {i + 1}/{photos.length}</figcaption></figure>
      <button className="absolute right-2 sm:right-6 text-white" aria-label="Ảnh sau" onClick={e => { e.stopPropagation(); go(1); }}><Icon n="chevron_right" c="text-4xl" /></button></div>}
  </Page>);
}
