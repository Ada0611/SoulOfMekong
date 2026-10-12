export default function Page({ kicker, title, sub, children, tone = '' }) {
  return (<section className={`w-full ${tone}`}><div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-16 flex flex-col gap-8">
    <div className="pb-6 border-b border-surface-container-high"><div className="flex items-center gap-2 mb-2"><span className="w-1.5 h-6 bg-secondary rounded-full" /><span className="font-label-stamp text-label-stamp text-tertiary-container uppercase tracking-wider">{kicker}</span></div>
      <h1 className="font-headline-lg text-headline-lg text-primary font-bold">{title}</h1>{sub && <p className="text-body-md text-on-surface-variant mt-1">{sub}</p>}</div>{children}
  </div></section>);
}
