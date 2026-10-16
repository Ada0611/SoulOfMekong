import { useState } from 'react';
import Page from '../components/Section.jsx';
import VideoCard from '../components/VideoCard.jsx';
import VideoModal from '../components/VideoModal.jsx';
import { videos } from '../data/videos.js';
export default function Videos() {
  const [vid, setVid] = useState(null);
  const list = videos.filter(v => v.platform === 'TikTok');
  return (<Page kicker="Video tài liệu trên TikTok" title="Xem miền Tây qua ống kính tụi mình" sub={`Thư viện ${list.length} video tài liệu ngắn đăng trên TikTok @soulofmekong0`}>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{list.map(v => <VideoCard key={v.id} v={v} onOpen={setVid} />)}</div>
    <VideoModal v={vid} onClose={() => setVid(null)} /></Page>);
}
