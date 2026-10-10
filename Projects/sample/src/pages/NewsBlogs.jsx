import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import img1 from '../assets/clients/guideline1.webp';
import img2 from '../assets/clients/guideline2.webp';
import img3 from '../assets/clients/guideline3.webp';
import img4 from '../assets/clients/guideline4.webp';
import img5 from '../assets/clients/guideline6.webp';

const ITEMS = [
  { image: img1, url: "https://sesschennai.blogspot.com/2024/08/ensuring-safe-operation-of-test.html", title: "Safe Operation of Test Chambers" },
  { image: img2, url: "https://sesschennai.blogspot.com/2024/08/www.html", title: "SESS Test Chamber Maintenance: Key Service Guidelines" },
  { image: img3, url: "https://sesschennai.blogspot.com/2024/08/cutting-edge-solar-test-chamber-for.html", title: "Cutting-Edge Solar Test Chamber for Isolator Testing" },
  { image: img4, url: "https://sesschennai.blogspot.com/2024/08/service-planning-oem-vs-local-rewinding.html", title: "Service Planning: OEM vs. Local Rewinding for Test Chamber Fan Motors" },
  { image: img5, url: "https://sesschennai.blogspot.com/2024/08/expert-solutions-for-refrigerant.html", title: "Expert Solutions for Refrigerant Leakage in Climatic Test Chambers" },
  { image: img1, url: "https://sesschennai.blogspot.com/2024/08/ensuring-safe-operation-of-test.html", title: "Safe Operation of Test Chambers" },
  { image: img2, url: "https://sesschennai.blogspot.com/2024/08/www.html", title: "SESS Test Chamber Maintenance: Key Service Guidelines" },
  { image: img3, url: "https://sesschennai.blogspot.com/2024/08/cutting-edge-solar-test-chamber-for.html", title: "Cutting-Edge Solar Test Chamber for Isolator Testing" },
];

const GAP = 20;
const SLIDE_DURATION = 3000;

/* ── Responsive visible count based on viewport width ── */
const getVisible = () => {
  if (typeof window === 'undefined') return 4;
  if (window.innerWidth < 640) return 1;
  if (window.innerWidth < 1024) return 2;
  return 4;
};

const Particle = ({ x, y, size, delay, color }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, background: color, opacity: 0.15 }}
    animate={{ y: [0, -30, 0], opacity: [0.1, 0.25, 0.1], scale: [1, 1.3, 1] }}
    transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
  />
);

const NewsBlogs = () => {
  const total = ITEMS.length;
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(getVisible);

  const startTimeRef = useRef(null);
  const rafRef = useRef(null);
  const pausedRef = useRef(false);
  const progressRef = useRef(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  /* ── Update visible count on window resize ── */
  useEffect(() => {
    const onResize = () => setVisibleCount(getVisible());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const handle = (e) => setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
  }, []);

  const particles = [
    { x: 10, y: 20, size: 60, delay: 0,   color: 'rgb(2,174,178)' },
    { x: 80, y: 10, size: 90, delay: 1.5, color: '#3b82f6' },
    { x: 50, y: 70, size: 50, delay: 0.8, color: 'rgb(2,174,178)' },
    { x: 90, y: 60, size: 70, delay: 2.2, color: '#60a5fa' },
    { x: 20, y: 85, size: 40, delay: 1,   color: '#0ea5e9' },
    { x: 65, y: 40, size: 55, delay: 3,   color: 'rgb(2,174,178)' },
  ];

  pausedRef.current = paused;
  progressRef.current = progress;

  const getItem = (i) => ITEMS[((i % total) + total) % total];

  const goTo = useCallback((i) => {
    setCurrent(((i % total) + total) % total);
    setProgress(0);
    startTimeRef.current = performance.now();
  }, [total]);

  useEffect(() => {
    startTimeRef.current = performance.now();
    const tick = (now) => {
      if (!pausedRef.current) {
        const elapsed = now - startTimeRef.current;
        const pct = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
        setProgress(pct);
        if (pct >= 100) {
          setCurrent((prev) => (prev + 1) % total);
          setProgress(0);
          startTimeRef.current = performance.now();
          rafRef.current = requestAnimationFrame(tick);
          return;
        }
      } else {
        startTimeRef.current = performance.now() - (progressRef.current / 100) * SLIDE_DURATION;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [current, total]);

  return (
    <div className="w-full bg-white">

      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative text-white overflow-hidden"
        style={{ background: 'var(--gradient-brand)', minHeight: '300px', display: 'flex', alignItems: 'center' }}
      >
        {[
          { color: '#0284c7', top: '-15%', right: '-10%', w: 420 },
          { color: '#06b6d4', bottom: '-20%', left: '-8%', w: 380 },
          { color: 'rgb(2,174,178)', top: '30%', left: '40%', w: 260 },
        ].map((b, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full mix-blend-multiply filter blur-3xl"
            style={{ width: b.w, height: b.w, background: b.color, top: b.top, bottom: b.bottom, left: b.left, right: b.right, opacity: 0.18 }}
            animate={{
              x: (mousePos.x - 0.5) * (20 + i * 10),
              y: (mousePos.y - 0.5) * (15 + i * 8),
              scale: [1, 1.12, 1],
            }}
            transition={{
              x: { type: 'spring', stiffness: 30, damping: 20 },
              y: { type: 'spring', stiffness: 30, damping: 20 },
              scale: { duration: 6 + i * 2, repeat: Infinity, ease: 'easeInOut' },
            }}
          />
        ))}

        {particles.map((p, i) => <Particle key={i} {...p} />)}

        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="relative max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', delay: 0.2, stiffness: 200 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 text-sm font-medium mb-5 sm:mb-8 border border-white/25"
              style={{ letterSpacing: '0.03em' }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              Stay Updated. Stay Ahead.
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200"
            >
              News &amp; Blogs
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed px-2 sm:px-4"
            >
              Stay updated on latest innovations, product launches, and industry events in climatic testing solutions.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Carousel Section ── */}
      <section className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">

        {/* Navigation row */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <p className="text-xs sm:text-sm text-slate-500 font-medium tracking-wide uppercase">
            Latest Articles
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => goTo(current - 1)}
              aria-label="Previous slide"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-200 flex items-center justify-center text-white bg-cyan-300 hover:bg-cyan-500 hover:border-cyan-500 transition-all duration-200 shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={() => goTo(current + 1)}
              aria-label="Next slide"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-200 flex items-center justify-center text-white bg-cyan-300 hover:bg-cyan-500 hover:border-cyan-500 transition-all duration-200 shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Sliding Track ── */}
        <div
          className="overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          <motion.div
            className="flex"
            animate={{
              x: `calc(${current} * (-1 * ((100%) / ${visibleCount}) - ${GAP / visibleCount}px))`,
            }}
            transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
            style={{ gap: `${GAP}px` }}
          >
            {Array.from({ length: total + visibleCount }).map((_, i) => {
              const item = getItem(i);
              return (
                <div
                  key={i}
                  className="flex-shrink-0"
                  style={{ width: `calc((100% - ${GAP * (visibleCount - 1)}px) / ${visibleCount})` }}
                >
                  {/* Image card */}
                  <div className="rounded-2xl overflow-hidden border border-cyan-700 shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.18)] transition-all duration-300">
                    <div className="w-full overflow-hidden p-2">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-xl hover:rounded-2xl hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Learn more button */}
                  <div className="mt-2.5">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full text-sm font-semibold px-4 py-2.5 rounded-xl text-cyan-700 bg-blue-50 border border-blue-100 hover:bg-cyan-500 hover:text-white hover:border-cyan-500 transition-all duration-200 group/btn"
                    >
                      Learn more<span className="sr-only">: {item.title}</span>
                      <svg
                        className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1"
                        fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* ── Timer bar + dot indicators ── */}
        <div className="flex flex-col sm:flex-row items-start gap-4 mt-6 sm:mt-8">
          {/* Progress bar */}
          <div className="w-32 sm:w-40 h-1 bg-gray-200 rounded-full overflow-hidden left-0">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.08, ease: 'linear' }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsBlogs;