import { Icon } from './Layout.jsx';
// Ảnh bìa: dùng ảnh thật nếu có (s.image), nếu chưa có thì hiện ô màu + biểu tượng của điểm đến.
const tones = ['from-[#123F38] to-[#2d6951]', 'from-[#582e00] to-[#a8641f]', 'from-[#7a2e1d] to-[#c4623a]', 'from-[#1c4f6b] to-[#4c93b5]'];
export default function Cover({ s, className = '', big = false }) {
  if (s.image) return <div className={`bg-cover bg-center ${className}`} style={{ backgroundImage: `url('${s.image}')` }} role="img" aria-label={s.short} />;
  return (<div className={`bg-gradient-to-br ${tones[(s.order - 1) % tones.length]} flex flex-col items-center justify-center gap-2 text-white/90 ${className}`} role="img" aria-label={s.short}>
    <Icon n={s.icon} c={big ? 'text-7xl' : 'text-5xl'} />
    <span className="font-label-stamp text-label-stamp uppercase tracking-widest text-white/80">{s.short}</span>
  </div>);
}
