import { useEffect } from 'react';
import { Icon } from './Layout.jsx';
export default function VideoModal({ v, onClose }) {
  useEffect(() => { const k = e => e.key === 'Escape' && onClose(); window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k); }, [onClose]);
  if (!v) return null;
  return (<div className="fixed inset-0 z-[60] bg-black/70 flex items-center justify-center p-4" onClick={onClose}>
    <div className="bg-surface-container-lowest rounded-xl max-w-lg w-full overflow-hidden" onClick={e => e.stopPropagation()}>
      <div className="h-56 bg-primary bg-cover bg-center" style={v.thumbnail ? { backgroundImage: `url('${v.thumbnail}')` } : {}} />
      <div className="p-6 flex flex-col gap-3">
        <span className="font-label-stamp text-label-stamp text-secondary uppercase">TikTok{v.date ? ` • ${v.date}` : ''}</span>
        <h3 className="font-headline-md text-headline-md text-primary">{v.title}</h3>
        <p className="text-body-md text-on-surface-variant">{v.description}</p>
        {v.url ? <a href={v.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-primary text-on-primary px-5 py-3 rounded-lg font-label-ui text-label-ui self-start">Xem video trên TikTok <Icon n="open_in_new" c="text-base" /></a>
          : <p className="text-body-sm text-outline italic">Liên kết video gốc sẽ được cập nhật.</p>}
        <button onClick={onClose} className="self-end text-secondary font-label-ui text-label-ui">Đóng</button>
      </div></div></div>);
}
