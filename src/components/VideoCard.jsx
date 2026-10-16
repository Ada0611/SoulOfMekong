import { Icon } from './Layout.jsx';
export default function VideoCard({ v, onOpen }) {
  return (<button onClick={() => onOpen(v)} className="group relative rounded-xl overflow-hidden bg-primary shadow-md flex flex-col h-[440px] text-left w-full">
    {v.thumbnail && <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url('${v.thumbnail}')` }} />}
    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
    <div className="relative p-4 flex items-center justify-between w-full">
      <div className={`flex items-center gap-2 bg-primary/80 backdrop-blur-sm px-2.5 py-1 rounded text-white font-label-stamp text-label-stamp`}><Icon n="music_note" c="text-sm" /><span>TikTok</span></div>
      {v.duration && <span className="font-label-stamp text-label-stamp bg-black/60 text-white px-2 py-0.5 rounded">{v.duration}</span>}
    </div>
    <div className="relative flex-1 flex items-center justify-center"><div className="w-14 h-14 rounded-full bg-white/25 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-secondary transition-all"><Icon n="play_arrow" c="text-2xl" /></div></div>
    <div className="relative p-5 flex flex-col gap-2"><h3 className="font-headline-sm text-headline-sm text-white font-bold">{v.title}</h3><p className="text-body-sm text-surface-container-highest line-clamp-2">{v.description}</p>
      <div className="pt-2 text-surface-container-high font-label-stamp text-label-stamp">TikTok{v.date ? ` • ${v.date}` : ''}</div></div>
  </button>);
}
