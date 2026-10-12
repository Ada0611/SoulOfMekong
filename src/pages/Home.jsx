import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../components/Layout.jsx';
import StoryCard from '../components/StoryCard.jsx';
import VideoCard from '../components/VideoCard.jsx';
import VideoModal from '../components/VideoModal.jsx';
import Cover from '../components/Cover.jsx';
import { stories } from '../data/stories.js';
import { videos } from '../data/videos.js';
import { img } from '../data/project.js';
export default function Home() {
  const [vid, setVid] = useState(null);
  const f = stories.find(s => s.featured) || stories[0];
  const side = stories.filter(s => s !== f);
  const provinces = [...new Set(stories.map(s => s.province))];
  const [bm, setBm] = useState(false);
  return (<div className="flex flex-col w-full">
    <section className="relative w-full overflow-hidden bg-primary text-on-primary">
      <div className="relative w-full h-[580px] lg:h-[640px] flex items-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${img.hero}')` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent" />
        <div className="absolute top-8 right-8 lg:right-16 hidden sm:flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/15">
          <Icon n="verified" c="text-secondary-fixed text-sm" />
          <span className="font-label-stamp text-label-stamp text-secondary-fixed uppercase tracking-widest">
            Số phát hành #01 — Cần Thơ 2026
          </span>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <div className="max-w-2xl flex flex-col gap-5">
            <div className="inline-flex items-center gap-2.5">
              <span className="font-label-stamp text-label-stamp px-3 py-1 bg-tertiary-container/80 text-tertiary-fixed rounded-full tracking-wider uppercase">Independent Zine</span><span className="font-label-stamp text-label-stamp text-secondary-fixed">10.033°N // 105.787°E</span></div>
            <div>
              <h1 className="font-display-hero text-[38px] leading-[44px] sm:text-display-hero text-white tracking-tight">
                SoulOfMekong
              </h1>
              <p className="font-headline-sm text-headline-sm text-secondary-fixed-dim italic mt-1">
                Giữ hồn miền Tây, kể chuyện hôm nay.
              </p>
            </div>
            <p className="font-body-lead text-body-lead text-surface-container-high max-w-xl">
              Một góc nhìn trẻ về nếp sống, con người và những giá trị văn hóa đang chảy cùng dòng Mekong — được ghi chép, lắng nghe và lưu trữ bởi những người trẻ bản địa.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Link to="/cau-chuyen" className="inline-flex items-center gap-2 bg-secondary text-on-secondary px-6 py-3.5 rounded-lg font-label-ui text-label-ui shadow-md hover:bg-secondary/90 transition-all hover:-translate-y-0.5">
                <span>Khám phá câu chuyện</span>
                <Icon n="arrow_forward" c="text-base" />
              </Link>
              <a href="#video-dispatches" className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md text-white px-5 py-3.5 rounded-lg font-label-ui text-label-ui border border-white/25 hover:bg-white/25 transition-all">
                <Icon n="play_circle" c="text-tertiary-fixed-dim text-xl" />
                <span>Xem video mới nhất</span>
              </a>
            </div>
            <div className="pt-4 flex items-center gap-3 text-tertiary-fixed opacity-90">
              <Icon n="favorite" c="text-sm" />
              <span className="font-annotation-note text-annotation-note italic">
                "Small actions for a lasting cultural value ♡"
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-16 w-full">
      <div className="flex items-center justify-between pb-6 border-b border-surface-container-high mb-8">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-7 bg-secondary rounded-full" />
          <h2 className="font-headline-md text-headline-md text-primary font-bold">
            Bài viết nổi bật
          </h2>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <span className="font-label-stamp text-label-stamp text-on-surface-variant uppercase">
            Mục tiêu văn hóa
          </span>
          <span className="w-2 h-2 rounded-full bg-secondary" />
          <span className="font-label-stamp text-label-stamp text-tertiary-container">
            TẠP CHÍ KỲ 1
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <article className="lg:col-span-8 bg-surface-container-lowest rounded-xl p-5 sm:p-6 shadow-sm border border-surface-container flex flex-col gap-6">
          <Link to={`/cau-chuyen/${f.slug}`} className="relative block w-full h-[320px] sm:h-[400px] rounded-lg overflow-hidden group">
            <Cover s={f} big className="w-full h-full transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="font-label-stamp text-label-stamp bg-primary text-white px-3 py-1 rounded-full uppercase">
                {f.category}
              </span>
              <span className="font-label-stamp text-label-stamp bg-white/90 px-2.5 py-1 rounded-full">
                {f.read}
              </span>
            </div>
                      </Link>
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-4 text-on-surface-variant text-body-sm">
              <span className="flex items-center gap-1.5">
                <Icon n="location_on" c="text-base text-secondary" />
                {f.place}
              </span>
            </div>
            <h3 className="font-headline-lg text-[28px] sm:text-headline-lg text-primary leading-tight">
              <Link to={`/cau-chuyen/${f.slug}`} className="hover:text-secondary transition-colors">
                {f.title}
              </Link>
            </h3>
            <p className="font-body-lead text-body-lead text-on-surface-variant">
              {f.excerpt}
            </p>
            <div className="pt-2 flex items-center justify-between">
              <Link to={`/cau-chuyen/${f.slug}`} className="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-lg font-label-ui text-label-ui hover:bg-secondary transition-colors">
                <span>Đọc câu chuyện</span>
                <Icon n="arrow_forward" c="text-base" />
              </Link>
              <div className="flex gap-2">
                <button title="Lưu bài viết" onClick={() => setBm(!bm)} className={`w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-low hover:bg-surface-container ${bm ? 'text-secondary' : ''}`}>
                  <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: `'FILL' ${bm ? 1 : 0}` }}>
                    {bm ? 'bookmark' : 'bookmark_border'}
                  </span>
                </button>
                <button title="Sao chép liên kết" onClick={() => navigator.clipboard?.writeText(location.origin + `/cau-chuyen/${f.slug}`)} className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-low hover:bg-surface-container">
                  <Icon n="share" c="text-lg" />
                </button>
              </div>
            </div>
          </div>
        </article>
        <aside className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-surface-container-low rounded-xl p-6 border border-surface-container-high flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="font-label-stamp text-label-stamp text-tertiary-container uppercase tracking-widest font-bold">
                Về dự án
              </span>
              <Icon n="auto_stories" c="text-secondary text-xl" />
            </div>
            <p className="text-body-md">
              <strong className="font-semibold text-primary">SoulOfMekong</strong> là dự án truyền thông độc lập nhằm bảo tồn và lan tỏa những giá trị văn hóa, lối sống đặc trưng của người dân vùng Tây Nam Bộ, góp phần gìn giữ bản sắc và phát triển cộng đồng địa phương.
            </p>
            <Link to="/ve-du-an" className="inline-flex items-center gap-2 text-primary font-label-ui text-label-ui font-bold hover:text-secondary group">
              <span>Tìm hiểu thêm về dự án</span>
              <Icon n="arrow_forward" c="text-base group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="border-t border-surface-container pt-4 flex flex-col gap-3">
              <span className="font-label-stamp text-label-stamp text-on-surface-variant uppercase">
                Theo dõi chúng mình
              </span>
              <div className="flex gap-3">{[['video_camera_front', 'TikTok'], ['public', 'Facebook'], ['play_arrow', 'YouTube'], ['photo_camera', 'Instagram']].map(([i, t]) => <span key={t} title={`${t} (sắp ra mắt)`} className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                <Icon n={i} c="text-base" />
              </span>)}
              </div>
            </div>
            <div className="text-right font-annotation-note text-annotation-note italic text-secondary">
              Cùng lan tỏa giá trị Mekong! ♡
            </div>
          </div>
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-surface-container flex flex-col gap-5">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container">
              <h4 className="font-headline-sm text-headline-sm text-primary font-bold">
                Các điểm đến khác
              </h4>
              <Link to="/cau-chuyen" className="text-secondary font-label-stamp text-label-stamp hover:underline">
                XEM TẤT CẢ
              </Link>
            </div>
            {side.map((s, i) =>
              <Link key={s.slug} to={`/cau-chuyen/${s.slug}`} className={`flex gap-4 group ${i ? 'border-t border-surface-container-low pt-4' : ''}`}>
                <Cover s={s} className="w-20 h-20 rounded-lg flex-shrink-0 group-hover:opacity-90 [&_span]:hidden [&_.material-symbols-outlined]:text-3xl" />
                <div className="flex flex-col justify-between flex-1 min-w-0">
                  <span className="font-label-stamp text-label-stamp text-secondary uppercase">
                    {s.province}
                  </span>
                  <h5 className="text-body-md font-semibold text-primary group-hover:text-secondary line-clamp-2">
                    {s.title}
                  </h5>
                  <span className="text-body-sm text-outline">{s.place.split('(')[0].trim()}</span>
                </div>
              </Link>)}
          </div>
        </aside>
      </div>
    </section>

    <section id="diem-den" className="w-full bg-surface-container-low py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-6 bg-secondary rounded-full" />
              <span className="font-label-stamp text-label-stamp text-tertiary-container uppercase tracking-wider">Tài liệu thực địa</span>
            </div>
            <h2 className="font-headline-lg text-[28px] sm:text-headline-lg text-primary font-bold">4 điểm đến, 4 câu chuyện</h2>
            <p className="text-body-md text-on-surface-variant mt-1">Hành trình nhóm đã đi qua ở An Giang và Vĩnh Long</p>
          </div>
          <Link to="/cau-chuyen" className="inline-flex items-center gap-1.5 text-secondary font-label-ui text-label-ui hover:text-primary">
            <span>Xem tất cả câu chuyện</span>
            <Icon n="arrow_forward" c="text-base" />
          </Link>
        </div>
        {provinces.map(pv => <div key={pv} className="flex flex-col gap-4">
          <h3 className="font-headline-sm text-headline-sm text-primary flex items-center gap-2"><Icon n="location_on" c="text-secondary" />{pv}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">{stories.filter(s => s.province === pv).map(s => <StoryCard key={s.slug} s={s} />)}</div>
        </div>)}
      </div>
    </section>

    <section id="video-dispatches" className="max-w-7xl mx-auto px-6 lg:px-12 py-16 w-full flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-surface-container-high">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-6 bg-tertiary-container rounded-full" />
            <span className="font-label-stamp text-label-stamp text-secondary uppercase tracking-wider">
              Video tài liệu &amp; Reels
            </span>
          </div>
          <h2 className="font-headline-lg text-[28px] sm:text-headline-lg text-primary font-bold">
            Xem miền Tây qua ống kính tụi mình
          </h2>
          <p className="text-body-md text-on-surface-variant mt-1">
            Những thước phim tài liệu ngắn ghi lại thanh âm rộn rã và nhịp đập thực tế
          </p>
        </div>
        <Link to="/video" className="inline-flex items-center gap-2 bg-primary text-on-primary px-5 py-2.5 rounded-lg font-label-ui text-label-ui hover:bg-secondary transition-colors">
          <span>Xem tất cả {videos.length} video tài liệu ngắn</span>
          <Icon n="arrow_forward" c="text-base" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{videos.slice(0, 3).map(v =>
        <VideoCard key={v.id} v={v} onOpen={setVid} />)}
      </div>
    </section>

    <section className="w-full bg-[#123F38] text-white py-14">
      <div className="max-w-5xl mx-auto px-6 text-center flex flex-col items-center gap-6">
        <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full border border-white/15">
          <Icon n="format_quote" c="text-secondary-fixed text-base" />
          <span className="font-label-stamp text-label-stamp text-secondary-fixed uppercase tracking-wider">
            SoulOfMekong Manifesto
          </span>
        </div>
        <blockquote className="font-annotation-note text-[28px] sm:text-headline-lg leading-relaxed italic text-white">
          "Không chỉ là những gì thuộc về quá khứ. Văn hóa miền Tây vẫn đang sống mãnh liệt trong cách người ta làm nghề, nấu ăn, gặp nhau và kể chuyện mỗi ngày."
        </blockquote>
        <div className="flex flex-col items-center gap-1">
          <p className="font-label-ui text-label-ui text-tertiary-fixed uppercase tracking-wide">
            Dự án sinh viên ĐH FPT Phân hiệu Cần Thơ — Lớp TM2001
          </p>
          <p className="text-body-sm text-secondary-fixed-dim">
            Môn học SSG105 | Student Project: Creating Social Solutions
          </p>
        </div>
      </div>
    </section>
    <VideoModal v={vid} onClose={() => setVid(null)} />
  </div>);
}
