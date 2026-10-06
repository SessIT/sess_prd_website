import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, ShieldCheck, CheckCircle2, Info, FileCheck2 } from 'lucide-react';

/* ─────────────────────────────────────────────
   Dust Standards — IP5X / IP6X test programme selector
   Data shape (see DustChamber.jsx → dustStandards):
   { eyebrow, title, subtitle, programmes: [{ id, code, name, standard,
     summary, heading, points[] }], additional: { title, items[], note }, note }
───────────────────────────────────────────── */

const PROGRAMME_ICONS = [Shield, ShieldCheck];

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

export default function DustStandards({ data, id = 'dust-standards' }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);
  const [ref, inView] = useInView();
  const { programmes } = data;
  const current = programmes[active];
  const Icon = PROGRAMME_ICONS[active % PROGRAMME_ICONS.length];

  const handleKeyDown = (e, i) => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) return;
    e.preventDefault();
    let next = i;
    if (e.key === 'ArrowRight') next = (i + 1) % programmes.length;
    if (e.key === 'ArrowLeft') next = (i - 1 + programmes.length) % programmes.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = programmes.length - 1;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id={id} className="relative px-5 py-16 bg-slate-50 sm:py-20 md:py-24 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle dot texture + glows, matching the site's section backgrounds */}
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(148,163,184,0.35) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
        }}
      />
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

      <div
        ref={ref}
        className="relative mx-auto max-w-7xl 2xl:max-w-[1440px]"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'none' : 'translateY(40px)',
          transition: 'opacity 0.8s cubic-bezier(.4,0,.2,1), transform 0.8s cubic-bezier(.4,0,.2,1)',
        }}
      >
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="block w-5 h-px opacity-70 rounded-full bg-cyan-500" />
            <span
              style={{
                color: 'var(--color-primary-500)',
                fontFamily: 'var(--font-body)',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--text-sm)',
                letterSpacing: 'var(--tracking-wider)',
                textTransform: 'uppercase',
              }}
            >
              {data.eyebrow}
            </span>
            <span className="block w-5 h-px opacity-70 rounded-full bg-cyan-500" />
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 'var(--font-weight-bold)',
              fontSize: 'clamp(var(--text-2xl), 3vw, var(--text-3xl))',
              lineHeight: 'var(--leading-tight)',
              color: 'var(--color-neutral-900)',
              margin: 0,
            }}
          >
            {data.title}
          </h2>
          {data.subtitle && (
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed sm:text-base text-slate-500">{data.subtitle}</p>
          )}
        </div>

        {/* Tabs */}
        <div className="mt-10 flex justify-center sm:mt-12">
          <div
            role="tablist"
            aria-label="Ingress protection test programmes"
            className="inline-flex w-full max-w-xl gap-1 p-1.5 rounded-full border border-slate-200 bg-white shadow-sm"
          >
            {programmes.map((p, i) => {
              const selected = i === active;
              return (
                <button
                  key={p.id}
                  ref={(el) => { tabRefs.current[i] = el; }}
                  id={`${id}-tab-${p.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`${id}-panel-${p.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className={`relative flex-1 rounded-full px-3 py-2.5 text-sm font-semibold transition-colors duration-300 sm:px-5 sm:text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${selected ? 'text-white' : 'text-slate-600 hover:text-cyan-600'}`}
                >
                  {selected && (
                    <motion.span
                      layoutId={`${id}-pill`}
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'linear-gradient(135deg, #00b3b3 0%, #2a56a6 100%)',
                        boxShadow: '0 8px 22px rgba(0,179,179,0.3)',
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">
                    {p.code}
                    <span className="hidden sm:inline"> — {p.name}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Panel */}
        <div className="mt-8 sm:mt-10">
          <motion.div
              key={current.id}
              id={`${id}-panel-${current.id}`}
              role="tabpanel"
              aria-labelledby={`${id}-tab-${current.id}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_64px_-16px_rgba(0,0,0,0.12)] lg:grid-cols-[0.9fr_1.1fr]"
            >
              {/* Rating summary — dark brand block */}
              <div
                className="relative p-7 text-white sm:p-10 overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}
              >
                <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />
                <div
                  className="absolute inset-0 opacity-[0.04] pointer-events-none"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                  }}
                />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 shadow-lg shadow-cyan-500/25">
                      <Icon size={22} className="text-white" />
                    </div>
                    <span className="inline-flex items-center px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full border border-white/15 bg-white/10 text-cyan-200">
                      {current.standard}
                    </span>
                  </div>

                  <div className="mt-8 text-6xl font-bold tracking-tight text-transparent sm:text-7xl bg-clip-text bg-gradient-to-r from-white to-cyan-300">
                    {current.code}
                  </div>
                  <div className="mt-2 text-lg font-semibold text-white sm:text-xl">{current.name}</div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">{current.summary}</p>

                  {/* Protection level indicator */}
                  <div className="mt-8">
                    <div className="flex justify-between mb-2 text-[11px] font-bold tracking-wider uppercase text-white/60">
                      <span>Protection level</span>
                      <span>{current.level} / {programmes.length}</span>
                    </div>
                    <div className="flex gap-1.5">
                      {programmes.map((_, i) => (
                        <div key={i} className="h-1.5 flex-1 rounded-full bg-white/10 overflow-hidden">
                          {i < current.level && (
                            <motion.div
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
                              className="h-full origin-left rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Test criteria */}
              <div className="p-7 sm:p-10">
                <h3 className="text-xl font-bold leading-snug text-slate-900 sm:text-2xl">{current.heading}</h3>
                <div className="mt-3 w-12 h-0.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
                <ul className="mt-6 space-y-3">
                  {current.points.map((point, i) => (
                    <motion.li
                      key={point}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: 0.08 + i * 0.07 }}
                      className="flex items-start gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 text-sm leading-relaxed text-slate-600 sm:text-base"
                    >
                      <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0 text-cyan-500" />
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
        </div>

        {/* Additional standards + disclaimer */}
        <div className="grid gap-5 mt-6 lg:grid-cols-2">
          {data.additional && (
            <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#2a56a6]/10">
                  <FileCheck2 size={18} className="text-[#2a56a6]" />
                </div>
                <h3 className="text-base font-bold text-slate-900">{data.additional.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.additional.items.map((item) => (
                  <span key={item} className="px-3 py-1.5 text-xs font-semibold rounded-full border border-cyan-500/25 bg-cyan-50 text-cyan-700">
                    {item}
                  </span>
                ))}
              </div>
              {data.additional.note && (
                <p className="mt-4 text-xs leading-relaxed text-slate-500 sm:text-sm">{data.additional.note}</p>
              )}
            </div>
          )}

          {data.note && (
            <div className="flex gap-4 p-6 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-50 to-blue-50">
              <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-lg bg-cyan-500/15">
                <Info size={18} className="text-cyan-600" />
              </div>
              <p className="text-sm leading-relaxed text-slate-600">{data.note}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
