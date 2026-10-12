import { useState, useMemo } from 'react';
import Page from '../components/Section.jsx';
import StoryCard from '../components/StoryCard.jsx';
import { stories, categories } from '../data/stories.js';
import { Icon } from '../components/Layout.jsx';
const norm = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').toLowerCase();
export default function Archive() {
  const [q, setQ] = useState(''); const [cat, setCat] = useState('Tất cả');
  const list = useMemo(() => stories.filter(s => (cat === 'Tất cả' || s.province === cat) && norm(s.title + ' ' + s.excerpt + ' ' + s.place).includes(norm(q))), [q, cat]);
  return (<Page kicker="Kho câu chuyện" title="4 điểm đến, 4 câu chuyện" sub="Tân Châu · Châu Phong (An Giang) — Mang Thít · Cù lao Mây (Vĩnh Long)">
    <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
      <div className="flex flex-wrap gap-2">{categories.map(c => <button key={c} onClick={() => setCat(c)} className={`px-4 py-1.5 rounded-lg font-label-ui text-label-ui ${cat === c ? 'bg-primary-container text-on-primary' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'}`}>{c}</button>)}</div>
      <div className="relative w-full md:w-72"><Icon n="search" c="absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg" /><input value={q} onChange={e => setQ(e.target.value)} placeholder="Tìm kiếm câu chuyện..." className="w-full pl-9 pr-3 py-2 rounded-lg bg-surface-container-low text-body-sm focus:outline-none focus:ring-1 focus:ring-tertiary-container" /></div></div>
    {list.length ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">{list.map(s => <StoryCard key={s.slug} s={s} />)}</div>
      : <p className="text-on-surface-variant py-12 text-center">Không có câu chuyện phù hợp với tìm kiếm của bạn.</p>}
  </Page>);
}
