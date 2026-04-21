import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FaArrowRight } from "react-icons/fa";
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import AboutImage from '../assets/login-bg.jpeg';

/* ─── Timeline data (top = latest) ───────────────────────────────── */
const MILESTONES = [
  { year: '2026', tag: 'Present', label: 'Tech Upgrading...',    desc: 'Serving 500+ clients worldwide with advanced R&D and cutting-edge environmental test chambers.',    side: 'right' },
  { year: '2025', tag: 'Recent',  label: 'New Product House', desc: 'Renewed ISO 9001 certification and launched next-generation climatic & thermal chamber lineup.',     side: 'left'  },
  { year: '2020', tag: '10 Yrs',  label: 'Product Development',   desc: 'Expanded service network across 20+ states — 300+ satisfied industrial and pharma clients.',           side: 'right' },
  { year: '2015', tag: '5 Yrs',   label: 'Expansion Phase',       desc: 'Achieved ISO 9001 quality certification; crossed 100 clients with a dedicated after-sales team.',       side: 'left'  },
  { year: '2010', tag: 'Founded', label: 'Initial Growth',  desc: 'Sri Easwari Scientific Solutions Pvt Ltd incorporated in Chennai — beginning 15+ years of excellence.', side: 'right' },
];

const startYear = 2010;
const currentYear = new Date().getFullYear();
const yearsOfExperience = currentYear - startYear;
const STATS = [
  { value: `${yearsOfExperience}+`,  label: 'Years' },
  { value: '250+', label: 'Clients'       },
  { value: 'ISO',  label: 'Certified'       },
];

/* ─── SVG zigzag path builder ─────────────────────────────────────── */
const W = 200, DY = 100, TOP = 36, xR = 152, xL = 48;
const dotPos = MILESTONES.map((m, i) => ({ x: m.side === 'right' ? xR : xL, y: TOP + i * DY }));
const SVG_H  = TOP + (MILESTONES.length - 1) * DY + TOP;

function buildPath(pts) {
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const { x: ax, y: ay } = pts[i], { x: bx, y: by } = pts[i + 1];
    const my = (ay + by) / 2;
    d += ` C ${ax} ${my}, ${bx} ${my}, ${bx} ${by}`;
  }
  return d;
}
const ZIGZAG = buildPath(dotPos);

/* ─── Animated background lines (behind image) ──────────────────────
   A grid of diagonal lines that drift slowly — pure CSS-in-JS/SVG, no library.
────────────────────────────────────────────────────────────────────── */
const BgLines = ({ isDark }) => {
  const lines = Array.from({ length: 8 }, (_, i) => i);
  const color = isDark ? 'rgba(0,179,179,0.12)' : 'rgba(0,179,179,0.10)';
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 'var(--border-radius-xl)', zIndex: 0, pointerEvents: 'none' }}>
      {/* Drifting diagonal lines */}
      {lines.map(i => (
        <motion.div
          key={i}
          animate={{ x: [0, 18, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4 + i * 0.7, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
          style={{
            position: 'absolute',
            top: `${-10 + i * 14}%`,
            left: '-10%',
            width: '120%',
            height: '1.5px',
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            transform: `rotate(${-18 + i * 1.5}deg)`,
          }}
        />
      ))}
      {/* Subtle corner glow */}
      <motion.div
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', bottom: '-20%', right: '-10%',
          width: '220px', height: '220px', borderRadius: '50%',
          background: 'radial-gradient(circle, var(--color-primary-400), transparent 70%)',
          opacity: 0.15, filter: 'blur(30px)',
        }}
      />
      <motion.div
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        style={{
          position: 'absolute', top: '-10%', left: '-10%',
          width: '160px', height: '160px', borderRadius: '50%',
          background: 'radial-gradient(circle, var(--color-secondary-400), transparent 70%)',
          opacity: 0.12, filter: 'blur(24px)',
        }}
      />
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════ */
const AboutSection = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const sectionVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

  const randomRotation = useRef(Math.random() * 20 - 10); // Random between -10deg to 10deg

  const sectionRef = useRef(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [activeIdx,  setActiveIdx]  = useState(-1);

  /* scroll-driven progress */
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start 75%', 'end 25%'] });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => scrollYProgress.on('change', v => {
    setActiveIdx(Math.min(Math.floor(v * MILESTONES.length) - 1, MILESTONES.length - 1));
  }), [scrollYProgress]);

  /* inView for entry animation */
  const [inViewRef, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

  /* combine refs */
  const setRefs = node => { sectionRef.current = node; inViewRef(node); };

  /* tokens */
  const trackColor    = isDark ? 'rgba(255,255,255,0.07)' : 'var(--color-neutral-200)';
  const tooltipBg     = isDark ? '#1c2230'                : 'var(--color-neutral-0)';
  const tooltipBorder = isDark ? 'rgba(0,179,179,0.4)'   : 'var(--color-primary-300)';
  const yearInactive  = isDark ? 'var(--text-muted)'      : 'var(--color-neutral-400)';
  const dotInactive   = isDark ? '#2e3a4a'                : '#d4d8e0';

  const fadeUp = { hidden: { opacity: 0, y: 44 }, visible: { opacity: 1, y: 0 } };

  return (
    <section
      ref={setRefs}
      aria-label="About Sri Easwari Scientific Solutions"
      style={{
        padding: 'var(--space-20) 0',
        background: isDark ? 'var(--bg-base)' : 'var(--surface-default)',
        transition: 'background var(--transition-slow)',
        overflow: 'visible',
      }}
    >
      <div className="container px-4 mx-auto">
        <div
          className="flex flex-col lg:flex-row"
          style={{ gap: 'var(--space-8)', alignItems: 'stretch' }}  /* equal height */
        >

          {/* ══ COL 1: Image + Stats (equal height stretch) ══════════ */}
          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            transition={{ duration: 0.6 }}
            className="lg:w-[38%] w-full"
            style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}
          >
            {/* Image wrapper with animated bg lines and gradient background */}
<div style={{ position: 'relative', borderRadius: 'var(--border-radius-xl)', flex: 1 }}>
  {/* Gradient background div - exact style from your example */}
  {/* <div 
    className="absolute rounded-full -inset-1 bg-gradient-to-r from-sky-500 to-blue-600 opacity-60"
    style={{ transform: `rotate(${randomRotation.current}deg) translateZ(0px)` }}
  /> */}
  <BgLines isDark={isDark} />
  <img
    src={AboutImage}
    alt="Sri Easwari Scientific Solutions — Environmental Test Chamber Manufacturer in Chennai"
    loading="lazy"
    style={{
      position: 'relative', zIndex: 1,
      borderRadius: 'var(--border-radius-xl)',
      boxShadow: isDark ? 'var(--shadow-brand-md)' : 'var(--shadow-2xl)',
      width: '100%', height: '100%',
      objectFit: 'cover', display: 'block',
      minHeight: '300px', maxHeight: '420px',
    }}
  />
  {/* Brand tint */}
  <div style={{
    position: 'absolute', inset: 0, zIndex: 2,
    background: 'var(--color-primary-500)', opacity: 0.06,
    borderRadius: 'var(--border-radius-xl)', pointerEvents: 'none',
  }} />
</div>

            {/* Stats */}
            <div className="grid grid-cols-3" style={{ gap: 'var(--space-3)' }}>
              {STATS.map((s, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -2 }}
                  style={{
                    textAlign: 'center', padding: 'var(--space-3)',
                    background: isDark ? 'var(--surface-raised)' : 'var(--color-primary-50)',
                    borderRadius: 'var(--border-radius-lg)',
                    border: `1px solid ${isDark ? 'rgba(0,179,179,0.15)' : 'var(--color-primary-100)'}`,
                    transition: 'var(--transition-base)',
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--font-weight-extrabold)', fontSize: 'var(--text-lg)', color: 'var(--color-primary-500)', lineHeight: 'var(--leading-none)' }}>{s.value}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-2xs)', color: isDark ? 'var(--text-muted)' : 'var(--color-neutral-500)', marginTop: 'var(--space-1)', letterSpacing: 'var(--tracking-wide)' }}>{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          

          {/* ══ COL 3: Text Content (equal height, flex column) ══════ */}
          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="lg:w-[42%] w-full"
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div>
              {/* SEO: eyebrow */}
              <p style={{ color: 'var(--color-primary-500)', fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-semibold)', fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-wider)', textTransform: 'uppercase', marginBottom: 'var(--space-3)', margin: '0 0 var(--space-3)' }}>
                Precision in Testing. Excellence in Solutions.
              </p>

              {/* SEO: H2 */}
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--font-weight-bold)', fontSize: 'clamp(var(--text-2xl), 3vw, var(--text-3xl))', lineHeight: 'var(--leading-tight)', color: isDark ? 'var(--text-heading)' : 'var(--color-neutral-900)', margin: '0 0 var(--space-5)' }}>
                Trusted Testing Solutions
              </h3>

              {/* SEO: Supporting paragraph */}
              <p style={{ color: isDark ? 'var(--text-muted)' : 'var(--color-neutral-500)', textAlign:"justify", fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)', margin: '0 0 var(--space-6)' }}>
Sri Easwari Scientific Solution Pvt Ltd is a leading provider of environmental testing solutions and laboratory equipment in Chennai, India. We specialize in the manufacturing, supply, installation, and service of advanced environmental test chambers. Our solutions ensure high accuracy, reliability, and compliance for industries including pharmaceuticals, research laboratories and industrial manufacturing. With strong technical expertise and a customer-focused approach, we deliver customized testing solutions tailored to specific requirements.              </p>
             
            </div>

            {/* CTA — end anchor of timeline visually */}
            {/* <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} style={{ alignSelf: 'flex-start' }}>
              <Link to="/about" className="inline-flex items-center btn btn-outline">
                <i className="fas fa-play-circle" style={{ marginRight: 'var(--space-2)' }} />
                Discover Our Story
              </Link>
            </motion.div> */}
                    <motion.div
                      // variants={sectionVariants}
                      initial="hidden"
                      animate={inView ? 'visible' : 'hidden'}
                      transition={{ delay: 0.3 }}
                      className="text-center"
                    >
                      <motion.a
                                            href="/#/about"
                                            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                                            style={{
                                              display: "inline-flex",
                                              alignItems: "center",
                                              gap: "var(--space-3)",
                                              padding: "var(--space-3) var(--space-5)",
                                              borderRadius: "var(--border-radius-full)",
                                              background: "var(--color-primary-500)",
                                              color: "var(--color-neutral-0)",
                                              fontSize: "var(--text-xs)",
                                              fontWeight: "var(--font-weight-semibold)",
                                              textTransform: "uppercase",
                                              letterSpacing: "var(--tracking-widest)",
                                              textDecoration: "none",
                                              transition: "var(--transition-base)",
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.background = "var(--color-primary-700)"}
                                            onMouseLeave={e => e.currentTarget.style.background = "var(--color-primary-500)"}
                                          >
                                            Discover Our Story
                                            <FaArrowRight style={{ fontSize: "12px" }} />
                                          </motion.a>
                    </motion.div>
          </motion.div>
          
          {/* ══ COL 2: Zigzag Timeline ════════════════════════════════ */}
          <motion.div
  variants={fadeUp}
  initial="hidden"
  animate={inView ? "visible" : "hidden"}
  transition={{ duration: 0.6, delay: 0.18 }}
  className="lg:w-[20%] w-full"
  style={{ display: "flex", justifyContent: "center", alignItems: "stretch", marginLeft: "25px" }}
>
  <div
    style={{
      position: "relative",
      width: "100%",
      maxWidth: `${W}px`,
      minHeight: `${SVG_H}px`,
    }}
  >
    {/* SVG track + animated fill */}
    <svg
      viewBox={`0 0 ${W} ${SVG_H}`}
      fill="none"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "visible",
      }}
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Grey track */}
      <path
        d={ZIGZAG}
        stroke={trackColor}
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* 🔥 Continuous animated progress */}
      <motion.path
        d={ZIGZAG}
        stroke="var(--color-primary-500)"
        strokeWidth="2.5"
        strokeLinecap="round"
        filter="url(#glow)"
        animate={{ pathLength: [0, 1, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </svg>

    {/* Dots + Always Visible Tooltips */}
    {MILESTONES.map((m, i) => {
      const { x, y } = dotPos[i];
      const tipLeft = m.side === "right";

      return (
        <div
          key={m.year}
          style={{
            position: "absolute",
            left: `${(x / W) * 100}%`,
            top: `${(y / SVG_H) * 100}%`,
            transform: "translate(-50%, -50%)",
            zIndex: 10,
          }}
        >
          {/* Pulse ring (always active animation) */}
          <motion.div
            animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeOut",
              delay: i * 0.3,
            }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: "var(--color-primary-500)",
              pointerEvents: "none",
            }}
          />

          {/* Dot */}
          <div
            style={{
              width: 13,
              height: 13,
              borderRadius: "50%",
              background: "var(--color-primary-500)",
              border: `2px solid var(--color-primary-400)`,
              boxShadow: "0 0 0 3px rgba(0,179,179,0.22)",
              position: "relative",
              zIndex: 2,
            }}
          />

          {/* Year */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              [m.side === "right" ? "left" : "right"]: 18,
              whiteSpace: "nowrap",
              fontFamily: "var(--font-display)",
              fontWeight: "var(--font-weight-bold)",
              fontSize: "var(--text-sm)",
              color: "var(--color-primary-500)",
            }}
          >
            {m.year}
          </div>

          {/* 🔥 Always Visible Tooltip */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.2 }}
            style={{
              position: "absolute",
              top: "-75%",
              transform: "translateY(-50%)",
              [tipLeft ? "right" : "left"]: 26,
              width: 150,
              background: tooltipBg,
              border: `1.5px solid ${tooltipBorder}`,
              borderRadius: "var(--border-radius-lg)",
              padding: "var(--space-1-5)",
              boxShadow: "var(--shadow-xl)",
              zIndex: 50,
              marginBottom: "3rem"
            }}
          >
            {/* Arrow */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                [tipLeft ? "right" : "left"]: -7,
                borderTop: "6px solid transparent",
                borderBottom: "6px solid transparent",
                [tipLeft ? "borderLeft" : "borderRight"]: `7px solid ${tooltipBorder}`,
              }}
            />

            <div
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: "var(--font-weight-semibold)",
                fontSize: "var(--text-xs)",
                textAlign: "center",
                color: isDark
                  ? "var(--text-heading)"
                  : "var(--color-neutral-800)",
              }}
            >
              {m.label}
            </div>
          </motion.div>
        </div>
      );
    })}
  </div>
</motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;