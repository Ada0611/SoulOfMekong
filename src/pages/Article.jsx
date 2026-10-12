import { Link, useParams } from 'react-router-dom';
import { stories } from '../data/stories.js';
import { Icon } from '../components/Layout.jsx';
import StoryCard from '../components/StoryCard.jsx';
import Cover from '../components/Cover.jsx';
export default function Article() {
  const { slug } = useParams();
  const s = stories.find(x => x.slug === slug);
  if (!s)
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center flex flex-col items-center gap-4">
        <h1 className="font-headline-lg text-headline-lg text-primary">Không tìm thấy bài viết</h1>
        <Link to="/cau-chuyen" className="bg-primary text-on-primary px-6 py-3 rounded-lg font-label-ui text-label-ui">Xem tất cả câu chuyện</Link>
      </div>
    );
  const idx = stories.indexOf(s);
  const more = [1, 2, 3].map(k => stories[(idx + k) % stories.length]).slice(0, 2);
  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-12 py-12 flex flex-col gap-8">
      <Link to="/cau-chuyen" className="inline-flex items-center gap-1 text-secondary font-label-ui text-label-ui">
        <Icon n="arrow_back" c="text-base" />Tất cả câu chuyện
      </Link>
      <div className="flex flex-col gap-4">
        <span className="font-label-stamp text-label-stamp bg-primary text-white px-3 py-1 rounded-full uppercase self-start">{s.category} · {s.province}</span>
        <h1 className="font-headline-lg text-[28px] sm:text-headline-lg text-primary leading-tight">{s.title}</h1>
        <div className="flex flex-wrap gap-4 text-on-surface-variant text-body-sm">
          {s.date && <span className="flex items-center gap-1.5"><Icon n="calendar_today" c="text-base text-secondary" />{s.date}</span>}
          <span className="flex items-center gap-1.5"><Icon n="location_on" c="text-base text-secondary" />{s.place}</span>
          <span>{s.read}</span>
        </div>
      </div>
      <Cover s={s} big className="w-full h-[240px] sm:h-[360px] rounded-xl" />
      <p className="font-body-lead text-body-lead text-on-surface-variant">{s.excerpt}</p>
      <Body blocks={s.body} />
      <div className="bg-surface-container-low border border-surface-container-high rounded-xl p-6 flex flex-col gap-3">
        <span className="font-label-stamp text-label-stamp text-tertiary-container uppercase">Nguồn tham khảo</span>
        <ol className="list-decimal pl-5 flex flex-col gap-2 text-body-sm text-on-surface-variant marker:text-secondary">
          {s.refs.map(([outlet, title, domain], i) => <li key={i}><strong className="text-primary font-semibold">{outlet}:</strong> <em>{title}</em> (<a href={`https://${domain}`} target="_blank" rel="noreferrer" className="text-secondary underline">{domain}</a>)</li>)}
        </ol>
      </div>
      <div className="pt-8 border-t border-surface-container-high flex flex-col gap-6">
        <h2 className="font-headline-md text-headline-md text-primary">Đọc thêm</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">{more.map(m => <StoryCard key={m.slug} s={m} />)}</div>
      </div>
    </div>);
}
function Body({ blocks }) {
  return (<div className="flex flex-col gap-5 text-body-md text-on-surface-variant">{blocks.map((b, i) => {
    if (b.type === 'h') return <h2 key={i} className="font-headline-md text-headline-md text-primary pt-4">{b.text}</h2>;
    if (b.type === 'ul') return <ul key={i} className="flex flex-col gap-3 list-disc pl-6 marker:text-secondary">{b.items.map(([k, t], j) => <li key={j}>{k && <strong className="text-primary font-semibold">{k}: </strong>}{t}</li>)}</ul>;
    return <p key={i}>{b.text}</p>;
  })}</div>);
}
