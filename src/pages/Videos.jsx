import { useState } from 'react';
import Page from '../components/Section.jsx';
import VideoCard from '../components/VideoCard.jsx';
import VideoModal from '../components/VideoModal.jsx';
import { videos } from '../data/videos.js';
export default function Videos() {
  const [vid, setVid] = useState(null); const [p, setP] = useState('Tất cả');
  const list = videos.filter(v => p === 'Tất cả' || v.platform === p);
  return (<Page kicker="Video tài liệu & Reels" title="Xem miền Tây qua ống kính tụi mình" sub={`Thư viện ${videos.length} video tài liệu ngắn (các video mẫu sẽ được thay khi nhóm cập nhật nội dung thật)`}>
    <div className="flex gap-2">{['Tất cả', 'TikTok', 'Facebook'].map(x => <button key={x} onClick={() => setP(x)} className={`px-4 py-1.5 rounded-lg font-label-ui text-label-ui ${p === x ? 'bg-primary-container text-on-primary' : 'bg-surface-container-low text-on-surface-variant'}`}>{x}</button>)}</div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{list.map(v => <VideoCard key={v.id} v={v} onOpen={setVid} />)}</div>
    <VideoModal v={vid} onClose={() => setVid(null)} /></Page>);
}
