import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import img1 from '../assets/clients/guideline1.jpg';
import img2 from '../assets/clients/guideline2.jpg';
import img3 from '../assets/clients/guideline3.jpg';
import img4 from '../assets/clients/guideline4.jpg';
import img5 from '../assets/clients/guideline6.jpg';

const ITEMS = [
  { image: img1, url: "https://sesschennai.blogspot.com/2024/08/ensuring-safe-operation-of-test.html" },
  { image: img2, url: "https://sesschennai.blogspot.com/2024/08/www.html" },
  { image: img3, url: "https://sesschennai.blogspot.com/2024/08/cutting-edge-solar-test-chamber-for.html" },
  { image: img4, url: "https://sesschennai.blogspot.com/2024/08/service-planning-oem-vs-local-rewinding.html" },
  { image: img5, url: "https://sesschennai.blogspot.com/2024/08/expert-solutions-for-refrigerant.html" },
  { image: img1, url: "https://sesschennai.blogspot.com/2024/08/ensuring-safe-operation-of-test.html" },
  { image: img2, url: "https://sesschennai.blogspot.com/2024/08/www.html" },
  { image: img3, url: "https://sesschennai.blogspot.com/2024/08/cutting-edge-solar-test-chamber-for.html" },
];

const VISIBLE = 4;
const GAP = 20;
const SLIDE_DURATION = 3000;

const Particle = ({ x, y, size, delay, color }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      width: size,
      height: size,
      background: color,
      opacity: 0.15
    }}
    animate={{
      y: [0, -30, 0],
      opacity: [0.1, 0.25, 0.1],
      scale: [1, 1.3, 1]
    }}
    transition={{
      duration: 4 + delay,
      repeat: Infinity,
      ease: 'easeInOut',
      delay
    }}
  />
);


const NewsBlogs = () => {
  const total = ITEMS.length;
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);

  const startTimeRef = useRef(null);
  const rafRef = useRef(null);
  const pausedRef = useRef(false);
  const progressRef = useRef(0);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
      const heroRef = useRef(null);
      
        useEffect(() => {
          const handle = (e) => {
            setMousePos({
              x: e.clientX / window.innerWidth,
              y: e.clientY / window.innerHeight
            });
          };
          window.addEventListener('mousemove', handle);
          return () => window.removeEventListener('mousemove', handle);
        }, []);
      
        const particles = [
          { x: 10, y: 20, size: 60, delay: 0, color: 'rgb(2 174 178)' },
          { x: 80, y: 10, size: 90, delay: 1.5, color: '#3b82f6' },
          { x: 50, y: 70, size: 50, delay: 0.8, color: 'rgb(2 174 178)' },
          { x: 90, y: 60, size: 70, delay: 2.2, color: '#60a5fa' },
          { x: 20, y: 85, size: 40, delay: 1, color: '#0ea5e9' },
          { x: 65, y: 40, size: 55, delay: 3, color: 'rgb(2 174 178)' }
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

      {/* ── Hero section ── */}
                                     <section
                                       ref={heroRef}
                                       className="relative text-white overflow-hidden"
                                       style={{ background: 'var(--gradient-brand)', minHeight: '340px', display: 'flex', alignItems: 'center' }}
                                     >
                                       {[
                                         { color: '#0284c7', top: '-15%', right: '-10%', w: 420 },
                                         { color: '#06b6d4', bottom: '-20%', left: '-8%', w: 380 },
                                         { color: 'rgb(2,174,178)', top: '30%', left: '40%', w: 260 },
                                       ].map((b, i) => (
                                         <motion.div
                                           key={i}
                                           className="absolute rounded-full mix-blend-multiply filter blur-3xl"
                                           style={{
                                             width: b.w, height: b.w,
                                             background: b.color,
                                             top: b.top, bottom: b.bottom, left: b.left, right: b.right,
                                             opacity: 0.18,
                                           }}
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
                               
                                       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
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
                                             className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-5 py-2 text-sm font-medium mb-8 border border-white/25"
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
                                             className="text-4xl sm:text-5xl md:text-4xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                                             News & Blogs
                                           </motion.h1>
                               
                                           <motion.p
                                             initial={{ opacity: 0 }}
                                             animate={{ opacity: 1 }}
                                             transition={{ delay: 0.45, duration: 0.6 }}
                                             className="text-base sm:text-lg md:text-lg text-gray-200 leading-relaxed px-4">
                                             Stay updated on latest innovations, product launches, and industry events in climatic testing solutions.
                                           </motion.p>
                                         </motion.div>
                                       </div>
                                     </section>

      {/* ── Carousel Section ── */}
      <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16">

        {/* Header row */}
        <div className="flex items-end justify-between mb-8">          
          <div className="flex items-center gap-3">            
            <button
              onClick={() => goTo(current - 1)}
              className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-white bg-cyan-300 hover:bg-cyan-500 hover:border-black hover:text-white transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={() => goTo(current + 1)}
              className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-white bg-cyan-300 hover:bg-cyan-500 hover:border-black hover:text-white transition-all duration-200"
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
        >
          <motion.div
            className="flex"
            animate={{
              // Each card width = (100% - gaps) / VISIBLE
              // So shift by current * (cardWidth + gap)
              x: `calc(${current} * (-1 * ((100%) / ${VISIBLE}) - ${GAP / VISIBLE}px))`,
            }}
            transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
            style={{ gap: `${GAP}px` }}
          >
            {Array.from({ length: total + VISIBLE }).map((_, i) => {
              const item = getItem(i);
              return (
                <div
                  key={i}
                  className="flex-shrink-0"
                  style={{
                    width: `calc((100% - ${GAP * (VISIBLE - 1)}px) / ${VISIBLE})`,
                  }}
                >
                  {/* Full image card */}
                  <div
                    className="
                      rounded-2xl overflow-hidden border border-cyan-700
                      shadow-[0_10px_30px_rgba(0,0,0,0.08)]
                      hover:shadow-[0_20px_50px_rgba(0,0,0,0.18)]
                      transition-all duration-300
                    "
                  >
                    <div className="w-full h-full overflow-hidden p-2">
                      <img
                        src={item.image}
                        alt="news"
                        className="w-full h-full object-cover rounded-xl hover:rounded-2xl hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  {/* 10px gap then Learn more button */}
                  <div style={{ marginTop: '10px' }}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        flex items-center justify-center gap-2 w-full
                        text-sm font-semibold
                        px-4 py-2.5 rounded-xl
                        text-cyan-500 bg-blue-50 border border-blue-100
                        hover:bg-cyan-500 hover:text-white hover:border-cyan-500
                        transition-all duration-200 group/btn
                      "
                    >
                      Learn more
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

        {/* Timer bar */}
        <div className="flex items-center justify-left gap-4 mt-8">
          <div className="w-40 h-1 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.08, ease: 'linear' }}
            />
          </div>

          {/* {paused && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-gray-400 flex items-center gap-1.5"
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
              Paused
            </motion.span>
          )} */}
        </div>
      </section>
    </div>
  );
};

export default NewsBlogs;