import { Link } from 'react-router-dom';
import { Icon } from './Layout.jsx';
import Cover from './Cover.jsx';
export default function StoryCard({ s }) {
  return (<Link to={`/cau-chuyen/${s.slug}`} className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col group">
    <div className="relative w-full h-48 overflow-hidden"><Cover s={s} className="w-full h-full transition-transform duration-500 group-hover:scale-105" /><span className="absolute top-3 left-3 font-label-stamp text-label-stamp bg-primary/90 text-white px-2.5 py-0.5 rounded uppercase">{s.province}</span></div>
    <div className="p-5 flex flex-col flex-1 justify-between gap-4"><div className="flex flex-col gap-2">
      <span className="text-body-sm text-outline flex items-center gap-1"><Icon n="location_on" c="text-sm" />{s.place.split('(')[0].trim()}</span>
      <h3 className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors line-clamp-3">{s.title}</h3>
      <p className="text-body-sm text-on-surface-variant line-clamp-3">{s.excerpt}</p></div>
      <div className="pt-2 border-t border-surface-container flex items-center justify-between text-secondary font-label-ui text-label-ui"><span>Đọc tiếp</span><Icon n="arrow_forward" c="text-base group-hover:translate-x-1 transition-transform" /></div></div>
  </Link>);
}
