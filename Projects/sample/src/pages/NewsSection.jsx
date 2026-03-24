/**
 * CombinedLayout — Embeddable Section Version
 * ─────────────────────────────────────────────
 * Designed to live inside any scrollable page (e.g. HomePage).
 * Does NOT touch html/body overflow or height — parent scrolls freely.
 *
 * Desktop (≥ md): side-by-side carousel + modal grid, 100vh tall
 * Mobile  (< md): stacked carousel / modal grid, each with fixed px height
 *
 * Modal containment: overflow:clip + isolation:isolate + contain:layout
 * guarantee the popup never bleeds outside the right panel or over the header.
 */

import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";

/* ── responsive hook ─────────────────────────────────────── */
function useWindowWidth() {
  const [w, setW] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return w;
}

/* ── carousel data ───────────────────────────────────────── */
const slides = [
  { id: 1, gradient: "linear-gradient(135deg,#667eea 0%,#764ba2 100%)", accent: "#a78bfa", tag: "Design",     icon: "✦", title: "Creative Studio",  sub: "Where ideas take shape",    desc: "Craft immersive digital experiences that captivate and convert.",                             stat: "320+",   statLabel: "Projects"    },
  { id: 2, gradient: "linear-gradient(135deg,#f093fb 0%,#f5576c 100%)", accent: "#f472b6", tag: "Product",    icon: "◈", title: "User First",       sub: "Empathy at every pixel",    desc: "Build products people genuinely love, backed by research and clarity.",                       stat: "98%",    statLabel: "Satisfaction"},
  { id: 3, gradient: "linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)", accent: "#38bdf8", tag: "Technology", icon: "⬡", title: "Engineered Fast",  sub: "Speed as a feature",        desc: "Performance-first architecture with sub-100ms response times at scale.",                      stat: "< 80ms", statLabel: "Latency"     },
  { id: 4, gradient: "linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)", accent: "#34d399", tag: "Growth",     icon: "⬟", title: "Scale Freely",     sub: "Infrastructure that grows", desc: "From zero to millions of users without a single sleepless night.",                            stat: "10×",    statLabel: "Scale"       },
  { id: 5, gradient: "linear-gradient(135deg,#fa709a 0%,#fee140 100%)", accent: "#fbbf24", tag: "Vision",     icon: "◉", title: "Bold Future",      sub: "Think in decades",          desc: "Long-term thinking meets relentless iteration. Build what matters.",                          stat: "2040",   statLabel: "Horizon"     },
];

/* ── modal data & spring ─────────────────────────────────── */
const MSPRING = { type: "spring", stiffness: 380, damping: 38, mass: 0.9 };

const items = [
  { id: "aurora",  category: "Nature",    title: "Aurora Borealis",  subtitle: "Northern Lights, Iceland",        year: "2024", color: "#0ea5e9", accent: "#38bdf8", bg: "linear-gradient(160deg,#0c1445 0%,#0a2a4a 40%,#0d3b6e 70%,#065f46 100%)", pattern: "radial-gradient(ellipse 80% 50% at 30% 30%,rgba(56,189,248,.25) 0%,transparent 60%),radial-gradient(ellipse 60% 70% at 70% 60%,rgba(16,185,129,.2) 0%,transparent 50%)", tags: ["Photography","Long Exposure","Arctic"],     body: "Dancing curtains of green and blue light cascade across the Icelandic sky — charged solar particles colliding with Earth's upper atmosphere. Captured at 2am, 200km from Reykjavik.", stat1:{v:"−18°C",l:"Temperature"}, stat2:{v:"3hrs",l:"Exposure"}   },
  { id: "desert",  category: "Landscape", title: "Saharan Dunes",    subtitle: "Erg Chebbi, Morocco",             year: "2023", color: "#f59e0b", accent: "#fcd34d", bg: "linear-gradient(160deg,#1c0a00 0%,#3d1a00 40%,#78350f 70%,#92400e 100%)", pattern: "radial-gradient(ellipse 90% 40% at 60% 70%,rgba(251,191,36,.2) 0%,transparent 60%),radial-gradient(ellipse 50% 60% at 20% 30%,rgba(245,158,11,.15) 0%,transparent 50%)", tags: ["Desert","Golden Hour","Minimalism"],       body: "Wind sculpts an infinite ocean of rust-orange sand into razor-sharp ridgelines. The silence here is total — only the occasional whisper of sand grains cascading down a slip face.", stat1:{v:"52°C",l:"Peak Temp"}, stat2:{v:"180m",l:"Dune Height"} },
  { id: "deep",    category: "Ocean",     title: "Bioluminescence",  subtitle: "Maldives Atoll, Indian Ocean",    year: "2024", color: "#6366f1", accent: "#a5b4fc", bg: "linear-gradient(160deg,#030712 0%,#0c0a2e 40%,#1e1b4b 70%,#0f172a 100%)", pattern: "radial-gradient(ellipse 70% 50% at 50% 60%,rgba(99,102,241,.3) 0%,transparent 55%),radial-gradient(ellipse 40% 40% at 20% 30%,rgba(165,180,252,.15) 0%,transparent 40%)", tags: ["Underwater","Bioluminescence","Night"],    body: "Dinoflagellates transform every breaking wave into liquid light. A phenomenon lasting only three nights a year — when phytoplankton bloom in such density the ocean glows electric blue.", stat1:{v:"28°C",l:"Water Temp"}, stat2:{v:"3 nights",l:"Season"} },
  { id: "forest",  category: "Wilderness",title: "Misty Canopy",     subtitle: "Daintree Rainforest, Australia", year: "2023", color: "#10b981", accent: "#6ee7b7", bg: "linear-gradient(160deg,#022c22 0%,#064e3b 40%,#065f46 70%,#0d4429 100%)", pattern: "radial-gradient(ellipse 80% 60% at 40% 40%,rgba(16,185,129,.2) 0%,transparent 55%),radial-gradient(ellipse 50% 50% at 70% 70%,rgba(110,231,183,.1) 0%,transparent 45%)", tags: ["Rainforest","Fog","Biodiversity"],         body: "135 million years old. The Daintree is the world's oldest surviving tropical rainforest — home to 30% of Australia's frog, reptile and marsupial species. Mist rolls through its canopy at dawn like breath.", stat1:{v:"135M yrs",l:"Age"}, stat2:{v:"1200mm",l:"Annual Rain"} },
  { id: "glacier", category: "Arctic",    title: "Ice Caverns",      subtitle: "Vatnajökull, Iceland",           year: "2024", color: "#06b6d4", accent: "#67e8f9", bg: "linear-gradient(160deg,#0a0f1e 0%,#0c2340 40%,#0e3a5c 70%,#083344 100%)", pattern: "radial-gradient(ellipse 75% 55% at 35% 45%,rgba(6,182,212,.22) 0%,transparent 55%),radial-gradient(ellipse 55% 45% at 65% 65%,rgba(103,232,249,.12) 0%,transparent 45%)", tags: ["Glacier","Ice Cave","Blue Hour"],          body: "Thousands of years of compressed snowfall form cathedral vaults of translucent blue ice. The colour comes from the complete absorption of long-wavelength red light — only blue survives this deep.", stat1:{v:"8,100 km²",l:"Area"}, stat2:{v:"400m",l:"Depth"} },
  { id: "volcano", category: "Geology",   title: "Lava Fields",      subtitle: "Kīlauea, Hawai'i",              year: "2023", color: "#ef4444", accent: "#fca5a5", bg: "linear-gradient(160deg,#0f0000 0%,#2d0000 40%,#4c0519 70%,#7f1d1d 100%)", pattern: "radial-gradient(ellipse 70% 50% at 50% 60%,rgba(239,68,68,.25) 0%,transparent 55%),radial-gradient(ellipse 45% 45% at 25% 35%,rgba(252,165,165,.1) 0%,transparent 45%)", tags: ["Volcano","Lava","Formation"],              body: "Molten rock at 1,170°C meets the Pacific Ocean in a violent hiss of steam and creation. Every second, Kīlauea adds new land to the Big Island — the planet actively building itself before your eyes.", stat1:{v:"1,170°C",l:"Lava Temp"}, stat2:{v:"35 yrs",l:"Active"} },
];

/* ════════════════════════════════════════════════════════════
   CAROUSEL CARD
════════════════════════════════════════════════════════════ */
function CarouselCard({ slide, index, x, CARD_W, CARD_H, STEP, onCardClick }) {
  const offset   = useTransform(x, v => index + v / STEP);
  const scale    = useTransform(offset, [-2.5,-1,0,1,2.5],   [0.65,0.82,1,0.82,0.65]);
  const opacity  = useTransform(offset, [-2.5,-1.5,-0.5,0,0.5,1.5,2.5], [0,0.25,0.75,1,0.75,0.25,0]);
  const rotateY  = useTransform(offset, [-2,-1,0,1,2],        [40,20,0,-20,-40]);
  const zIndex   = useTransform(offset, v => Math.round(100 - Math.abs(v) * 20));
  const cardY    = useTransform(offset, [-2,-1,0,1,2],        [40,14,0,14,40]);
  const contentX = useTransform(offset, [-1,0,1],             [18,0,-18]);

  return (
    <motion.div
      className="absolute top-0 cursor-grab active:cursor-grabbing select-none"
      style={{ width:CARD_W, height:CARD_H, left:index*STEP, scale, opacity, rotateY, y:cardY, zIndex, transformPerspective:1400, transformOrigin:"center center" }}
      onClick={() => onCardClick(index)}
    >
      <div className="relative w-full h-full rounded-[22px] overflow-hidden shadow-2xl" style={{ background:slide.gradient }}>
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize:"120px" }} />
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full opacity-30" style={{ background:"radial-gradient(circle,rgba(255,255,255,.5) 0%,transparent 70%)" }} />
        <motion.div className="relative flex flex-col justify-between h-full p-5" style={{ x:contentX }}>
          <div className="flex justify-between items-start">
            <span className="inline-block px-2.5 py-1 rounded-full text-[9px] font-semibold tracking-widest uppercase" style={{ background:"rgba(255,255,255,.18)", backdropFilter:"blur(8px)", color:"rgba(255,255,255,.95)" }}>{slide.tag}</span>
            <span className="text-xl opacity-60" style={{ color:"rgba(255,255,255,.8)" }}>{slide.icon}</span>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black mb-1" style={{ color:"rgba(255,255,255,.95)", fontFamily:"'Sora',sans-serif", textShadow:"0 4px 24px rgba(0,0,0,.2)" }}>{slide.stat}</div>
            <div className="text-[10px] tracking-[.2em] uppercase" style={{ color:"rgba(255,255,255,.55)" }}>{slide.statLabel}</div>
          </div>
          <div>
            <p className="text-[10px] mb-1" style={{ color:"rgba(255,255,255,.55)", fontFamily:"'DM Sans',sans-serif" }}>{slide.sub}</p>
            <h3 className="text-base font-bold mb-1.5 leading-tight" style={{ color:"#fff", fontFamily:"'Sora',sans-serif" }}>{slide.title}</h3>
            <p className="text-[10px] leading-relaxed" style={{ color:"rgba(255,255,255,.65)", fontFamily:"'DM Sans',sans-serif" }}>{slide.desc}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════
   CAROUSEL PANEL
════════════════════════════════════════════════════════════ */
function CarouselPanel({ height }) {
  const winW = useWindowWidth();
  const isMd = winW >= 768;

  const CARD_W    = isMd ? 240 : Math.min(185, winW * 0.44);
  const CARD_H    = isMd ? 340 : 260;
  const GAP       = isMd ? 18 : 12;
  const STEP      = CARD_W + GAP;
  const VPORT_W   = CARD_W + STEP * (isMd ? 1.32 : 1.1);

  const [active, setActive] = useState(0);
  const N = slides.length;
  const x = useMotionValue(0);
  const dragging = useRef(false);

  const snapTo = idx => {
    const c = Math.max(0, Math.min(N - 1, idx));
    setActive(c);
    animate(x, -c * STEP, { type:"spring", stiffness:320, damping:38, mass:.9 });
  };

  useEffect(() => {
    animate(x, -active * STEP, { type:"spring", stiffness:320, damping:38, mass:.9 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [STEP]);

  return (
    <div className="relative flex flex-col items-center justify-center w-full overflow-hidden" style={{ height, background:"#080a12" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background:"radial-gradient(ellipse 70% 50% at 30% 50%,rgba(102,126,234,.09) 0%,transparent 60%),radial-gradient(ellipse 60% 40% at 70% 50%,rgba(244,114,182,.07) 0%,transparent 60%)" }} />
      <div className="absolute inset-0 pointer-events-none opacity-[.03]" style={{ backgroundImage:"linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)", backgroundSize:"60px 60px" }} />

      {/* header */}
      <div className="relative z-10 mb-5 md:mb-7 text-center px-4">
        <p className="text-[9px] tracking-[.35em] uppercase mb-1" style={{ color:"rgba(255,255,255,.3)", fontFamily:"'DM Sans',sans-serif" }}>Explore our work</p>
        <h2 className="text-xl md:text-2xl font-black tracking-tight" style={{ color:"rgba(255,255,255,.92)", fontFamily:"'Sora',sans-serif" }}>What we build</h2>
      </div>

      {/* viewport */}
      <div className="relative" style={{ width:VPORT_W, height:CARD_H, perspective:1400 }}>
        <motion.div
          className="absolute top-0 h-full cursor-grab active:cursor-grabbing"
          style={{ x, left:(VPORT_W-CARD_W)/2, width:N*STEP }}
          drag="x"
          dragConstraints={{ left:-(N-1)*STEP, right:0 }}
          dragElastic={.08}
          dragTransition={{ bounceStiffness:280, bounceDamping:36 }}
          onDragStart={() => { dragging.current = true; }}
          onDragEnd={(_, info) => {
            dragging.current = false;
            if (info.offset.x < -60 || info.velocity.x < -600) snapTo(active+1);
            else if (info.offset.x > 60 || info.velocity.x > 600) snapTo(active-1);
            else snapTo(active);
          }}
        >
          {slides.map((s,i) => (
            <CarouselCard key={s.id} slide={s} index={i} x={x} CARD_W={CARD_W} CARD_H={CARD_H} STEP={STEP}
              onCardClick={idx => { if (!dragging.current && idx !== active) snapTo(idx); }} />
          ))}
        </motion.div>
        <div className="absolute inset-y-0 left-0 w-12 pointer-events-none z-20" style={{ background:"linear-gradient(to right,#080a12,transparent)" }} />
        <div className="absolute inset-y-0 right-0 w-12 pointer-events-none z-20" style={{ background:"linear-gradient(to left,#080a12,transparent)" }} />
      </div>

      {/* controls */}
      <div className="relative z-10 flex flex-col items-center gap-3 mt-5 md:mt-6">
        <div className="flex items-center gap-4">
          {/* prev */}
          <motion.button whileHover={{scale:1.08}} whileTap={{scale:.93}} onClick={()=>snapTo(active-1)} disabled={active===0}
            className="flex items-center justify-center w-8 h-8 rounded-full"
            style={{ background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.1)", color:active===0?"rgba(255,255,255,.2)":"rgba(255,255,255,.75)", cursor:active===0?"default":"pointer" }}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </motion.button>
          {/* dots */}
          <div className="flex items-center gap-1.5">
            {slides.map((_,i) => (
              <motion.button key={i} onClick={()=>snapTo(i)}
                animate={{ width:i===active?22:5, opacity:i===active?1:.3 }}
                transition={{ type:"spring", stiffness:400, damping:30 }}
                className="h-[5px] rounded-full"
                style={{ background:i===active?slides[active].accent:"rgba(255,255,255,.4)" }}
              />
            ))}
          </div>
          {/* next */}
          <motion.button whileHover={{scale:1.08}} whileTap={{scale:.93}} onClick={()=>snapTo(active+1)} disabled={active===N-1}
            className="flex items-center justify-center w-8 h-8 rounded-full"
            style={{ background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.1)", color:active===N-1?"rgba(255,255,255,.2)":"rgba(255,255,255,.75)", cursor:active===N-1?"default":"pointer" }}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </motion.button>
        </div>
        <motion.div key={active} initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} transition={{duration:.35}}>
          <p className="text-[11px] tracking-wider text-center" style={{ color:"rgba(255,255,255,.35)", fontFamily:"'DM Sans',sans-serif" }}>{active+1} / {N} — {slides[active].title}</p>
        </motion.div>
      </div>

      <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.2}}
        className="absolute bottom-4 text-[9px] tracking-[.2em] uppercase"
        style={{ color:"rgba(255,255,255,.18)", fontFamily:"'DM Sans',sans-serif" }}>drag to explore</motion.p>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   MODAL GRID CARD
════════════════════════════════════════════════════════════ */
function GridCard({ item, onClick }) {
  return (
    <motion.div layoutId={`card-${item.id}`} onClick={onClick}
      className="relative overflow-hidden rounded-xl cursor-pointer group"
      style={{ background:item.bg }} transition={MSPRING}
      whileHover={{scale:1.025}} whileTap={{scale:.97}}>
      <div className="absolute inset-0" style={{ background:item.pattern }} />
      <div className="absolute inset-0 opacity-[.06]" style={{ backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize:"100px" }} />
      <div className="absolute inset-x-0 bottom-0 h-2/3" style={{ background:"linear-gradient(to top,rgba(0,0,0,.72),transparent)" }} />
      <div className="relative z-10 p-3 md:p-4 flex flex-col justify-between h-full min-h-[148px] md:min-h-[175px]">
        <div className="flex justify-between items-start">
          <motion.span layoutId={`cat-${item.id}`} className="text-[8px] font-semibold tracking-[.15em] uppercase px-2 py-0.5 rounded-full"
            style={{ background:"rgba(255,255,255,.1)", backdropFilter:"blur(8px)", color:item.accent, border:`1px solid ${item.color}30` }}>{item.category}</motion.span>
          <span className="text-[9px]" style={{ color:"rgba(255,255,255,.35)", fontFamily:"'DM Mono',monospace" }}>{item.year}</span>
        </div>
        <div>
          <motion.h3 layoutId={`title-${item.id}`} className="font-black text-xs md:text-sm leading-tight mb-0.5" style={{ color:"rgba(255,255,255,.95)", fontFamily:"'Sora',sans-serif" }}>{item.title}</motion.h3>
          <motion.p layoutId={`sub-${item.id}`} className="text-[9px]" style={{ color:"rgba(255,255,255,.45)", fontFamily:"'DM Sans',sans-serif" }}>{item.subtitle}</motion.p>
        </div>
      </div>
      <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background:"rgba(255,255,255,.12)", backdropFilter:"blur(8px)" }}>
        <svg width="9" height="9" viewBox="0 0 13 13" fill="none"><path d="M2 11L11 2M11 2H4M11 2V9" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════
   MODAL EXPANDED
   absolute positioning — stays inside ModalPanel boundary
════════════════════════════════════════════════════════════ */
function ModalExpanded({ item, onClose }) {
  return (
    <>
      <motion.div className="absolute inset-0 z-40"
        style={{ background:"rgba(4,6,16,.88)", backdropFilter:"blur(12px)" }}
        initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.25}}
        onClick={onClose} />

      <div className="absolute inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <motion.div layoutId={`card-${item.id}`}
          className="relative w-full rounded-2xl overflow-hidden pointer-events-auto"
          style={{ background:item.bg, maxWidth:"360px", maxHeight:"calc(100% - 32px)", overflowY:"auto" }}
          transition={MSPRING}>
          <div className="absolute inset-0" style={{ background:item.pattern }} />
          <div className="absolute inset-0 opacity-[.05]" style={{ backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize:"100px" }} />
          <div className="absolute inset-x-0 bottom-0 h-3/4 pointer-events-none" style={{ background:"linear-gradient(to top,rgba(0,0,0,.78),transparent)" }} />

          {/* hero */}
          <div className="relative z-10 p-5 pb-2">
            <div className="flex justify-between items-start mb-8">
              <motion.span layoutId={`cat-${item.id}`} className="text-[9px] font-semibold tracking-[.18em] uppercase px-2.5 py-1 rounded-full"
                style={{ background:"rgba(255,255,255,.1)", backdropFilter:"blur(8px)", color:item.accent, border:`1px solid ${item.color}30` }}>{item.category}</motion.span>
              <motion.button initial={{opacity:0,scale:.7}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:.7}} transition={{delay:.15,duration:.2}}
                onClick={onClose} className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background:"rgba(255,255,255,.1)", backdropFilter:"blur(8px)" }}
                whileHover={{scale:1.1}} whileTap={{scale:.92}}>
                <svg width="10" height="10" viewBox="0 0 13 13" fill="none"><path d="M1.5 1.5l10 10M11.5 1.5l-10 10" stroke="white" strokeWidth="1.7" strokeLinecap="round"/></svg>
              </motion.button>
            </div>
            <motion.h2 layoutId={`title-${item.id}`} className="font-black text-2xl leading-none mb-1.5" style={{ color:"rgba(255,255,255,.97)", fontFamily:"'Sora',sans-serif" }} />
            <motion.p layoutId={`sub-${item.id}`} className="text-[10px]" style={{ color:"rgba(255,255,255,.45)", fontFamily:"'DM Sans',sans-serif" }} />
          </div>

          {/* detail */}
          <motion.div className="relative z-10 px-5 pb-5"
            initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:8}} transition={{delay:.18,duration:.3}}>
            <div className="flex gap-2.5 mb-3">
              {[item.stat1,item.stat2].map(s => (
                <div key={s.l} className="flex-1 rounded-xl px-3 py-2.5" style={{ background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.08)", backdropFilter:"blur(6px)" }}>
                  <div className="text-lg font-black leading-none mb-1" style={{ color:item.accent, fontFamily:"'Sora',sans-serif" }}>{s.v}</div>
                  <div className="text-[9px] tracking-widest uppercase" style={{ color:"rgba(255,255,255,.35)", fontFamily:"'DM Sans',sans-serif" }}>{s.l}</div>
                </div>
              ))}
            </div>
            <p className="text-[11px] leading-relaxed mb-3" style={{ color:"rgba(255,255,255,.62)", fontFamily:"'DM Sans',sans-serif" }}>{item.body}</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {item.tags.map(tag => (
                <span key={tag} className="text-[9px] tracking-wider uppercase px-2.5 py-1 rounded-full"
                  style={{ background:`${item.color}18`, border:`1px solid ${item.color}35`, color:item.accent, fontFamily:"'DM Sans',sans-serif" }}>{tag}</span>
              ))}
            </div>
            <motion.button className="w-full py-2.5 rounded-xl text-xs font-semibold tracking-wide"
              style={{ background:`linear-gradient(135deg,${item.color}55 0%,${item.color}22 100%)`, border:`1px solid ${item.color}50`, color:item.accent, fontFamily:"'Sora',sans-serif", backdropFilter:"blur(8px)" }}
              whileHover={{scale:1.02}} whileTap={{scale:.98}}>Explore Full Story →</motion.button>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

/* ════════════════════════════════════════════════════════════
   MODAL PANEL
   overflow:clip + isolation:isolate + contain:layout
   → popup NEVER bleeds outside this div or over the page header
════════════════════════════════════════════════════════════ */
function ModalPanel({ height }) {
  const [selected, setSelected] = useState(null);
  const active = items.find(i => i.id === selected) ?? null;

  return (
    <MotionConfig transition={MSPRING}>
      <div className="relative w-full" style={{
        height,
        background:"#060810",
        /* ── containment: modal stays inside this box ── */
        overflow:"clip",        /* clips backdrop-filter bleed */
        isolation:"isolate",    /* own stacking context        */
        contain:"layout",       /* layout containment          */
      }}>
        {/* grid texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[.025]"
          style={{ backgroundImage:"linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)", backgroundSize:"64px 64px" }} />

        {/* scrollable cards */}
        <div className="relative z-10 h-full overflow-y-auto combined-scroll">
          <div className="px-4 md:px-5 py-6 md:py-10 max-w-xl mx-auto">
            <motion.div className="mb-5 md:mb-7" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.5,ease:"easeOut"}}>
              <p className="text-[9px] tracking-[.35em] uppercase mb-1" style={{ color:"rgba(255,255,255,.28)", fontFamily:"'DM Sans',sans-serif" }}>Visual Journal</p>
              <h2 className="text-xl md:text-2xl font-black tracking-tight" style={{ color:"rgba(255,255,255,.93)", fontFamily:"'Sora',sans-serif" }}>Earth in Focus</h2>
              <p className="mt-1 text-xs" style={{ color:"rgba(255,255,255,.38)", fontFamily:"'DM Sans',sans-serif" }}>Six encounters with a planet in motion. Click any card.</p>
            </motion.div>

            <motion.div className="grid grid-cols-3 gap-2 md:gap-2"
              initial="hidden" animate="show"
              variants={{ hidden:{}, show:{ transition:{ staggerChildren:.07 } } }}>
              {items.map(item => (
                <motion.div key={item.id} variants={{ hidden:{opacity:0,y:20}, show:{opacity:1,y:0,transition:{duration:.4,ease:"easeOut"}} }}>
                  <GridCard item={item} onClick={() => setSelected(item.id)} />
                </motion.div>
              ))}
            </motion.div>

            <motion.p className="mt-5 text-center text-[9px] tracking-[.2em] uppercase"
              style={{ color:"rgba(255,255,255,.14)", fontFamily:"'DM Sans',sans-serif" }}
              initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.9}}>
              Click a card · backdrop to close
            </motion.p>
          </div>
        </div>

        {/* modal popup — absolutely inside this panel */}
        <AnimatePresence>
          {active && <ModalExpanded key={active.id} item={active} onClose={() => setSelected(null)} />}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}

/* ════════════════════════════════════════════════════════════
   DIVIDER
════════════════════════════════════════════════════════════ */
function Divider({ vertical }) {
  return vertical ? (
    <div className="relative flex-shrink-0 w-px self-stretch" style={{ background:"rgba(255,255,255,.07)" }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full" style={{ background:"rgba(255,255,255,.5)", boxShadow:"0 0 12px 4px rgba(167,139,250,.3)" }} />
      <div className="absolute inset-x-0 top-0 h-24" style={{ background:"linear-gradient(to bottom,#060810,transparent)" }} />
      <div className="absolute inset-x-0 bottom-0 h-24" style={{ background:"linear-gradient(to top,#060810,transparent)" }} />
    </div>
  ) : (
    <div className="relative w-full flex-shrink-0" style={{ height:1, background:"rgba(255,255,255,.07)" }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full" style={{ background:"rgba(255,255,255,.5)", boxShadow:"0 0 12px 4px rgba(167,139,250,.3)" }} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   COMBINED LAYOUT — default export
   ─────────────────────────────────────────────────────────
   ✅ This is a SECTION component — NOT a full-page takeover.
   ✅ Does NOT set overflow/height on html or body.
   ✅ Parent page (HomePage) scrolls freely above and below.
   ✅ Desktop: side-by-side, 100vh tall.
   ✅ Mobile:  stacked, each panel has its own fixed px height.
════════════════════════════════════════════════════════════ */

// Tweak these heights to match your design:
const DESKTOP_SECTION_H  = "100vh";   // desktop: fills viewport height
const MOBILE_CAROUSEL_H  = 460;       // px — carousel panel on mobile
const MOBILE_MODAL_H     = 510;       // px — modal panel on mobile

export default function CombinedLayout() {
  const winW = useWindowWidth();
  const isMd = winW >= 768;

  // Pass string "100%" on desktop so panels fill the flex row;
  // pass a px number on mobile so panels have explicit height.
  const cH = isMd ? "100%" : MOBILE_CAROUSEL_H;
  const mH = isMd ? "100%" : MOBILE_MODAL_H;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=DM+Mono:wght@400;500&display=swap');
        /* scoped scrollbar — only affects elements with .combined-scroll */
        .combined-scroll::-webkit-scrollbar { width: 4px; }
        .combined-scroll::-webkit-scrollbar-track { background: transparent; }
        .combined-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,.08); border-radius: 99px; }
        .combined-scroll::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,.16); }
      `}</style>

      {/*
        ─── Outer wrapper rules ──────────────────────────────────
        • width: 100%          — fills its parent column/section
        • height: fixed        — desktop 100vh, mobile: auto (panels
                                 supply their own px heights)
        • overflow: hidden     — no internal element escapes
        • display: flex        — row on desktop, column on mobile
        • NO position:fixed
        • NO html/body style changes
        ──────────────────────────────────────────────────────────
      */}
      <div style={{
        width: "100%",
        height: isMd ? DESKTOP_SECTION_H : "auto",
        background: "#060810",
        overflow: "hidden",
        display: "flex",
        flexDirection: isMd ? "row" : "column",
      }}>
        {/* Carousel — left on desktop, top on mobile */}
        <div style={{ flex: isMd ? 1 : "none", minWidth: 0, height: cH }}>
          <CarouselPanel height={cH} />
        </div>

        {/* Divider */}
        <Divider vertical={isMd} />

        {/* Modal grid — right on desktop, bottom on mobile */}
        <div style={{ flex: isMd ? 1 : "none", minWidth: 0, height: mH }}>
          <ModalPanel height={mH} />
        </div>
      </div>
    </>
  );
}