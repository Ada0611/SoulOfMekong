import { useState, useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { project } from '../data/project.js';
const Icon = ({ n, c = '' }) => <span className={`material-symbols-outlined ${c}`}>{n}</span>;
export { Icon };
export default function Layout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); window.scrollTo(0, 0); }, [pathname]);
  const cls = ({ isActive }) => `font-label-ui text-label-ui transition-colors ${isActive ? 'bg-primary-container text-on-primary font-bold rounded-lg px-3 py-1.5' : 'text-on-surface-variant hover:text-on-surface'}`;
  return (<>
    <header className="fixed top-0 w-full z-50 bg-[#F7F3E9] shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-6">
        <Link to="/" className="flex flex-col">
          <div className="flex items-center gap-2"><img src="/logo.png" alt="Soulofmekong" className="h-12 w-12 object-contain -my-1" /><span className="font-headline-sm text-headline-sm text-primary tracking-tight font-bold">SoulOfMekong</span></div>
        </Link>
        <nav className="hidden lg:flex items-center gap-6">{project.nav.map(n => <NavLink key={n.to} to={n.to} end={n.to === '/'} className={cls}>{n.label}</NavLink>)}</nav>
        <button className="lg:hidden w-10 h-10 flex items-center justify-center" aria-label="Mở menu" onClick={() => setOpen(!open)}><Icon n={open ? 'close' : 'menu'} c="text-primary" /></button>
      </div>
      {open && <nav className="lg:hidden bg-[#F7F3E9] border-t border-surface-container-high px-6 py-4 flex flex-col gap-3">{project.nav.map(n => <NavLink key={n.to} to={n.to} end={n.to === '/'} className={cls}>{n.label}</NavLink>)}</nav>}
    </header>
    <main className="w-full pt-20 bg-surface min-h-screen"><Outlet /></main>
    <Footer />
  </>);
}
function Footer() {
  return (<footer className="w-full bg-[#123F38] text-on-primary py-16"><div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-12">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 flex flex-col gap-4">
        <div className="flex items-center gap-2"><img src="/logo.png" alt="Soulofmekong" className="h-14 w-14 object-contain bg-white/90 rounded-full p-0.5" /><span className="font-headline-sm text-headline-sm text-white font-bold">SoulOfMekong</span></div>
        <p className="text-body-md text-surface-container-highest max-w-md">SoulOfMekong — Preserving the lifestyle and culture of the people in Southwestern Vietnam.</p>
        <div className="flex items-center gap-3 pt-2"><span className="font-label-stamp text-label-stamp bg-tertiary-container/60 text-tertiary-fixed px-2.5 py-1 rounded">CAN THO // 10.033°N</span><span className="font-label-stamp text-label-stamp bg-secondary-container/20 text-secondary-fixed px-2.5 py-1 rounded">STUDENT ARCHIVE</span></div>
      </div>
      <div className="lg:col-span-4 flex flex-col gap-3">
        <h4 className="font-label-stamp text-label-stamp text-tertiary-fixed tracking-wider uppercase">Academic Project Identity</h4>
        <p className="text-body-sm text-surface-container-highest">Group Project [SSG105] | Group-Class: {project.className}<br />{project.university}</p>
        <p className="font-annotation-note text-annotation-note text-secondary-fixed-dim italic">Student Project: Creating Social Solutions</p>
      </div>
      <div className="lg:col-span-3 flex flex-col gap-3">
        <h4 className="font-label-stamp text-label-stamp text-tertiary-fixed tracking-wider uppercase">Mạng Xã Hội</h4>
        <span className="flex items-center gap-2 text-body-sm text-surface-container-highest"><Icon n="public" c="text-base" />Facebook: /SoulOfMekong.Official</span>
        <span className="flex items-center gap-2 text-body-sm text-surface-container-highest"><Icon n="video_camera_front" c="text-base" />TikTok: @soulofmekong.zine</span>
      </div>
    </div>
    <div className="flex flex-col gap-4">
      <h4 className="font-label-stamp text-label-stamp text-tertiary-fixed tracking-wider uppercase">Thành viên &amp; Tỷ lệ đóng góp (Team Members &amp; Contributions)</h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">{project.members.map(m => <div key={m.name} className="bg-primary/40 rounded-lg p-3"><p className="font-label-ui text-label-ui text-white">{m.name}</p><p className="font-label-stamp text-label-stamp text-secondary-fixed-dim">{m.share}% Contribution</p></div>)}</div>
    </div>
    <div className="flex flex-col sm:flex-row items-center justify-between pt-6 text-surface-container-high text-body-sm gap-4">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">{project.nav.map(n => <Link key={n.to} to={n.to} className="hover:text-white transition-colors">{n.label}</Link>)}</div>
      <div className="font-label-stamp text-label-stamp text-secondary-fixed-dim tracking-wider">© Cần Thơ, 2026. All Rights Reserved.</div>
    </div>
  </div></footer>);
}
