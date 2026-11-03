import { useRef } from 'react';
import Page from '../components/Section.jsx';
import { Icon } from '../components/Layout.jsx';
const src = `${process.env.PUBLIC_URL || ''}/game/index.html`;
export default function Game() {
  const frame = useRef(null);
  const fullscreen = () => frame.current?.requestFullscreen?.();
  return (<Page kicker="Trò chơi" title="Út Tí Phiêu Lưu Ký" sub="Chạy, nhảy, trả lời câu hỏi văn hóa và sưu tầm huy hiệu của các tỉnh miền Tây.">
    <div className="flex flex-col gap-4">
      <div className="w-full bg-[#1c2b1e] rounded-xl overflow-hidden shadow-lg" style={{ aspectRatio: '16 / 9', maxHeight: 'calc(100vh - 8rem)', margin: '0 auto' }}>
        <iframe ref={frame} src={src} title="Út Tí Phiêu Lưu Ký" className="w-full h-full border-0" allow="fullscreen; autoplay" />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button onClick={fullscreen} className="bg-primary text-on-primary px-5 py-2.5 rounded-lg font-label-ui text-label-ui inline-flex items-center gap-2"><Icon n="fullscreen" />Toàn màn hình</button>
        <a href={src} target="_blank" rel="noreferrer" className="border border-primary text-primary px-5 py-2.5 rounded-lg font-label-ui text-label-ui inline-flex items-center gap-2"><Icon n="open_in_new" />Mở trong tab mới</a>
        <span className="text-body-sm text-on-surface-variant">Space/↑ nhảy · ↓ cúi · P tạm dừng · M tắt/bật âm. Trên điện thoại: chạm bên phải để nhảy.</span>
      </div>
    </div>
  </Page>);
}
