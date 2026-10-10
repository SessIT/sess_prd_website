import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { getRelatedChambers } from '../../data/relatedChambers';
import BackToRelatedChamber from '../../component/BackToRelatedChamber';
import DustStandards from '../../component/DustStandards';
import { openEnquiry, openBrochure } from '../../framework/openEnquiry';
import { ArrowRight, ChevronLeft, ChevronRight, CheckCircle2, Layers, Gauge, Zap, Shield, Thermometer, Wind, Activity, Settings2, Monitor, Wifi, Lock, BarChart3, ChevronDown, Share2, Mail, Facebook, Link2, X as CloseIcon, AlertTriangle, Flame, } from 'lucide-react';
//ImageCarousel import function

import DustFrontView from '../../assets/product/DustChamber.webp';
import DustSide from '../../assets/product/Dustchamber-Sideview.webp';
import DustRear from '../../assets/product/Dustchamber-Rearview.webp';
import Dustdrawing from '../../assets/product/Dustchamber-drawing.webp';

// Related Product Images
import relatedBattery1 from '../../assets/product/Salt Spray.webp';
import prd2 from '../../assets/product/CO2 Test Chamber.webp';
import prd3 from '../../assets/product/Environmetal.webp';
import prd4 from '../../assets/product/Flame-Proof Hot Air Oven.webp';

// Controller touch screen image
import prd5 from '../../assets/product/controller.webp';
import prd6 from '../../assets/product/Manual mode.webp';
import prd7 from '../../assets/product/Refrigeration.webp';
import prd8 from '../../assets/product/User Login.webp';
import prd9 from '../../assets/product/graph.webp';
import prd10 from '../../assets/product/DataLog.webp'

import batteryHeroBg from '../../assets/product/DustChamber1Bg.webp';

// Product Data
// Dust Chamber — Product Data
// Drop this into the same product-data shape used by WalkInChamberProduct.
// Update the image imports at the top of your component file to point to
// your actual Dust Chamber assets, then swap this object in.

const DustChamberProduct = {
  id: 'dust-chamber',
  title: 'Dust Chamber',
  subtitle: 'For Sand & Dust Ingress Testing of Automotive and Electronic Components',
  description:
    'SESS Technologies Sand and Dust Test Chambers provide a controlled environment to test the exposure of automotive and electronic components to concentrated levels of dust. Fully programmable control systems ensure a precise test environment, with full measurement systems to record sand & dust fallout rates and air-flow rate. Also known as the Sand Test Chamber or Dust Test Chamber.',

  // Hero Section
  hero: {
    backgroundGradient:
      'linear-gradient(135deg, rgba(0,25,55,0.70) 0%, rgba(1,7,14,0.60) 100%)',
    image: batteryHeroBg,
    tagline: 'Simulating Real-World Sand & Dust Exposure',
    mainTitle: 'Dust Chamber',
    subtitle: 'For Sand & Dust Ingress Testing of Automotive and Electronic Components',
    ctaText: 'Request Quote',
  },

  // Section 1: Product Details with Images
  productDetails: {
    images: [
      {
        id: 1,
        src: DustFrontView,
        alt: 'Dust Chamber Front View',
        title: 'Front View',
      },
      {
        id: 2,
        src: DustSide,
        alt: 'Full View of Dust Chamber',
        title: 'Complete Chamber View',
      },
      {
        id: 3,
        src: DustRear,
        alt: 'Dust Chamber',
        title: 'Chamber View',
      },
      {
        id: 4,
        src: Dustdrawing,
        alt: 'Dust Chamber Engineering Drawing',
        title: 'Engineering Drawing',
      },
    ],
    overview: [
      'SESS Sand and Dust Test Chambers are utilized across several industries and applications, including Military & Defense, Automotive, Computer Systems, Optics and Displays, Materials, Coatings, and Solar Energy. Equipment is supplied with fully programmable control systems to ensure the perfect test environment for every cycle.',
      'Each chamber is fitted with full measurement systems to measure the sand & dust fallout rates as well as the air-flow rate, giving reliable, repeatable results for particulate ingress and durability testing.',
    ],
    keyFeatures: [
      {
        title: 'Programmable Control System',
        description: 'Fully programmable, PLC-based control system ensures a precise, repeatable dust test environment across every cycle.',
      },
      {
        title: 'Dust Agitator Mechanism',
        description: 'Conforms to IS 9000 / JSS 55555, delivering a dust fallout rate of 25 grams ± 5 grams in 5 minutes.',
      },
      {
        title: 'High-Pressure Blower',
        description: 'Generates circulating dust test velocities of 5 m/s and 10 m/s in compliance with JIS D 0207 Test C.',
      },
      {
        title: 'Fallout & Airflow Measurement',
        description: 'Full measurement systems record sand & dust fallout rates and air-flow rate for verifiable, repeatable test data.',
      },
    ],
  },

  // Section 2: Benefits / Applications Section
  benefits: {
    title: 'Trusted Across Critical Sand & Dust Ingress Testing Applications',
    subtitle: 'Serving industries where reliable protection against particulate ingress is essential',

    benefitsList: [
      {
        id: 1,
        title: 'Military & Defense',
        description: 'Validates equipment ruggedness against sand and dust exposure requirements for defense applications.',
      },
      {
        id: 2,
        title: 'Automotive',
        description: 'Tests dust ingress resistance for automotive components, sensors, and sub-assemblies.',
      },
      {
        id: 3,
        title: 'Computer Systems',
        description: 'Assesses dust exposure risk for electronic enclosures, connectors, and computer systems.',
      },
      {
        id: 4,
        title: 'Optics & Displays',
        description: 'Evaluates the effect of dust contamination on optical surfaces and display assemblies.',
      },
      {
        id: 5,
        title: 'Materials & Coatings',
        description: 'Tests the durability of materials and protective coatings under sustained dust exposure.',
      },
      {
        id: 6,
        title: 'Solar Energy',
        description: 'Simulates dust accumulation effects on solar panels and photovoltaic components.',
      },
    ],
  },

  // Section 3: Technical Specifications
  specifications: {
    title: 'Technical Specifications',
    isTable: true,
    tableCaption: 'Model-wise work space volume, test space dimensions, and control system for the Dust Chamber. Test space can be provided as per customer requirement; appearance and design may vary depending on internal dimensions.',
    columns: ['Specification', 'DUST-450', 'DUST-1000'],
    rows: [
      { spec: 'Dust Test Modes', dust450: 'Fallout, circulating (Type C) & floating dust (Type F)', dust1000: 'Fallout, circulating (Type C) & floating dust (Type F)' },
      { spec: 'Dust Fallout Rate', dust450: '25 g ± 5 g in 5 minutes', dust1000: '25 g ± 5 g in 5 minutes' },
      { spec: 'Circulating Dust Air Velocity', dust450: '5 m/s and 10 m/s', dust1000: '5 m/s and 10 m/s' },
      { spec: 'Floating Dust System', dust450: 'Pneumatic nozzle with timer control', dust1000: 'Pneumatic nozzle with timer control' },
      { spec: 'Measurement System', dust450: 'Dust fallout rate and airflow measurement', dust1000: 'Dust fallout rate and airflow measurement' },
      { spec: 'Ingress Protection Test', dust450: 'IEC 60529 / ISO 12063', dust1000: 'IEC 60529 / ISO 12063' },
      { spec: 'Work Space Volume (L)', dust450: '450', dust1000: '1000' },
      { spec: 'Test Space Dimensions (W×D×H) (mm)', dust450: '750 × 750 × 750 mm', dust1000: '1000 × 1000 × 1000 mm' },
      { spec: 'Temperature Range (°C)', dust450: '5°C above ambient to +80°C', dust1000: '5°C above ambient to +80°C' },
      { spec: 'Temperature Fluctuation', dust450: '±1°C', dust1000: '±1°C' },
      { spec: 'Electrical Supply', dust450: '3Ø/N/E 415VAC ±10% 50Hz', dust1000: '3Ø/N/E 415VAC ±10% 50Hz' },
      { spec: 'Type of Controller', dust450: 'PLC based control system', dust1000: 'PLC based control system' },
    ],
  },

  // Section 3b: Dust Standards — IP5X / IP6X test programmes
  dustStandards: {
    eyebrow: 'Choose the Test Programme',
    title: 'Understand IP5X and IP6X',
    subtitle: 'Select the IEC 60529 ingress protection programme your device under test (DUT) must be evaluated against.',
    programmes: [
      {
        id: 'ip5x',
        code: 'IP5X',
        name: 'Dust Protected',
        standard: 'IEC 60529',
        level: 1,
        summary: 'Evaluates protection against dust ingress under the selected IEC 60529 procedure.',
        heading: 'Protection judged by the DUT criteria',
        points: [
          'The agreed acceptance criteria determine whether dust ingress affects operation or safety.',
          'Specimen category and procedure determine whether vacuum extraction is used.',
          'Dust charge, exposure conditions and duration must be defined before testing.',
        ],
      },
      {
        id: 'ip6x',
        code: 'IP6X',
        name: 'Dust Tight',
        standard: 'IEC 60529',
        level: 2,
        summary: 'Evaluates dust-tight performance under the selected IEC 60529 procedure.',
        heading: 'Vacuum configuration needs careful selection',
        points: [
          'The test evaluates the DUT against dust-tight acceptance criteria.',
          'Where required, the selected pump and instruments must provide the specified extraction and pressure conditions.',
          'Pump capacity depends on the specimen and test protocol; connection fittings alone do not establish capability.',
        ],
      },
    ],
    additional: {
      title: 'Other Dust Standards on Request',
      items: ['IEC 60068-2-68 (La2)', 'ISO 20653 IP5KX / IP6KX'],
      note: 'IEC 60529 IP5X / IP6X is the primary design basis. Other methods can be considered after a method-specific capability review and written scope agreement.',
    },
    note: 'The chamber supports testing; it does not certify a product’s IP rating. Final capability and acceptance are defined by the agreed standard edition, DUT category, test method and FAT/SAT protocol.',
  },

  // Section 4: Controller / Test Mode Features
  controller: {
    title: 'PLC-Based Programmable Control System',
    subtitle: 'Precision-controlled dust and sand exposure testing across every standard test mode',
    image: prd5,
    features: [
      {
        id: 1,
        title: 'Fully Programmable Control',
        description: 'PLC-based control system ensures a precise, repeatable dust test environment across every cycle',
        icon: '📱',
      },
      {
        id: 2,
        title: 'Dust Agitator (IS 9000 / JSS 55555)',
        description: 'Delivers a dust fallout rate of 25 grams ± 5 grams in 5 minutes, per IS 9000 / JSS 55555',
        icon: '⚙️',
      },
      {
        id: 3,
        title: 'Circulating Dust Test — Type C (JIS D 0207)',
        description: 'High-pressure blower generates circulating dust velocities of 5 m/s and 10 m/s',
        icon: '💨',
      },
      {
        id: 4,
        title: 'Floating Dust Test — Type F',
        description: 'Dust suspension using pneumatic nozzles with a timer for floating dust conditions',
        icon: '🌫️',
      },
      {
        id: 5,
        title: 'IP Rating Verification',
        description: 'Chamber testing conforms to ISO 12063 / IEC 60529 ingress protection standards',
        icon: '🔒',
      },
      {
        id: 6,
        title: 'Dust Measuring Device',
        description: 'Fallout & airflow measurement device conforming to JSS 55555 for verifiable, repeatable data',
        icon: '📊',
      },
    ],
  },

  // Section 5: Related Products
  relatedProducts: [
    {
      id: 1,
      name: 'Walk-in Chamber',
      image: relatedBattery1,
      description: 'Modular chamber for simulating and controlling temperature & humidity conditions',
      link: '/walkin-chamber',
    },
    {
      id: 2,
      name: 'Thermal Shock Chamber',
      image: prd2,
      description: 'Rapid temperature-transition chamber for accelerated reliability testing',
      link: '/thermal-shock-chamber',
    },
    {
      id: 3,
      name: 'Environmental Test Chamber',
      image: prd3,
      description: 'Compact bench-top chamber for temperature and humidity conditioning of smaller samples',
      link: '',
    },
    {
      id: 4,
      name: 'Flame-Proof Hot Air Oven',
      image: prd4,
      description: 'Safety-engineered oven for high-flammable product testing and drying applications',
      link: '#',
    },
  ],

  // Compliance & Standards
  /* standards: [
    {
      title: 'Standards Conformance',
      items: [
        'IS 9000',
        'JSS 55555',
        'IS 12063',
        'IEC 60529 (IP Rating)',
        'JIS D 0207 (Circulating & Floating Dust, C&F)',
      ],
    },
    {
      title: 'Test Modes Supported',
      items: [
        'ISO 9000 / JSS 55555 — Dust agitator: 25g ± 5g fallout in 5 minutes',
        'ISO 12063 / IEC 60529 (IP) — Ingress protection rating verification',
        'JIS D 0207 — Circulating dust test "C" at 5 m/s and 10 m/s',
        'Floating Dust Test (F) — Pneumatic nozzle dust suspension with timer',
      ],
    },
  ], */
};
/* ─────────────────────────────────────────────
   Corner-pulse keyframes (used by Standards cards)
───────────────────────────────────────────── */
function BorderBeamKeyframes() {
  return (
    <style>{`
      @keyframes corner-pulse {
        0%, 100% { opacity: 0.35; transform: scale(0.9); }
        50% { opacity: 1; transform: scale(1.15); }
      }
    `}</style>
  );
}

/* ─────────────────────────────────────────────
   Grain overlay for premium texture
───────────────────────────────────────────── */
function GrainOverlay() {
  return (
    <svg
      className="pointer-events-none fixed inset-0 z-[999] opacity-[0.028] mix-blend-overlay"
      style={{ width: '100%', height: '100vh' }}
      aria-hidden="true"
    >
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Ambient orb background blob
───────────────────────────────────────────── */
function AmbientBlob({ color, style, mouseX = 0, mouseY = 0, depth = 1 }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        background: color,
        filter: 'blur(80px)',
        opacity: 0.22,
        ...style,
      }}
      animate={{
        x: mouseX * depth * 28,
        y: mouseY * depth * 20,
        scale: [1, 1.08, 1],
      }}
      transition={{
        x: { type: 'spring', stiffness: 22, damping: 18 },
        y: { type: 'spring', stiffness: 22, damping: 18 },
        scale: { duration: 7 + depth, repeat: Infinity, ease: 'easeInOut' },
      }}
    />
  );
}

/* ─────────────────────────────────────────────
   Floating particle dot
───────────────────────────────────────────── */
function Particle({ x, y, size, delay, color }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, background: color, opacity: 0.12 }}
      animate={{ y: [0, -28, 0], opacity: [0.08, 0.22, 0.08], scale: [1, 1.25, 1] }}
      transition={{ duration: 4.5 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  );
}

/* ─────────────────────────────────────────────
   Scroll-triggered fade-in
───────────────────────────────────────────── */
function FadeIn({ children, delay = 0, dir = 'up', className = '', style = {} }) {
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

  const transforms = { up: 'translateY(40px)', left: 'translateX(-40px)', right: 'translateX(40px)', none: 'none' };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : transforms[dir],
        transition: `opacity 0.8s cubic-bezier(.4,0,.2,1) ${delay}s, transform 0.8s cubic-bezier(.4,0,.2,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Section header
───────────────────────────────────────────── */
function SectionHeader({ eyebrow, title, subtitle, dark = false }) {
  return (
    <FadeIn dir="up" className="text-center">
      <div className="inline-flex items-center gap-2 mb-3">
        <span className={`block w-5 h-px opacity-70 rounded-full ${dark ? 'bg-cyan-300' : 'bg-cyan-500'}`} />
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
          {eyebrow}
        </span>
        <span className={`block w-5 h-px opacity-70 rounded-full ${dark ? 'bg-cyan-300' : 'bg-cyan-500'}`} />
      </div>
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 'var(--font-weight-bold)',
          fontSize: 'clamp(var(--text-2xl), 3vw, var(--text-3xl))',
          lineHeight: 'var(--leading-tight)',
          color: dark ? 'var(--color-neutral-0)' : 'var(--color-neutral-900)',
          margin: 0,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mx-auto mt-4 max-w-2xl text-sm leading-relaxed sm:text-base ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
          {subtitle}
        </p>
      )}
    </FadeIn>
  );
}

/* ─────────────────────────────────────────────
   Scroll progress bar
───────────────────────────────────────────── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-[2px] origin-left"
      style={{ scaleX, background: 'linear-gradient(90deg, #06b6d4, #3b82f6)' }}
    />
  );
}

/* ─────────────────────────────────────────────
   Share popup button
───────────────────────────────────────────── */
function ShareButton() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
  const pageTitle = 'Battery Test Chamber | SESS Engineering';

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const shareLinks = [
    {
      name: 'Email',
      icon: Mail,
      color: 'text-slate-600',
      href: `mailto:?subject=${encodeURIComponent(pageTitle)}&body=${encodeURIComponent(pageUrl)}`,
    },
    {
      name: 'Pinterest',
      icon: null,
      color: 'text-red-600',
      href: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(pageUrl)}&description=${encodeURIComponent(pageTitle)}`,
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'text-blue-600',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
    },
  ];

  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setOpen(false);
      }, 1200);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Share this product"
        aria-expanded={open}
        className="flex items-center justify-center w-9 h-9 rounded-full bg-white/90 text-slate-800 shadow-lg hover:bg-cyan-500 hover:text-white transition-all duration-200"
      >
        <Share2 size={18} strokeWidth={2.5} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-11 z-50 w-48 rounded-xl border border-slate-200 bg-white shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100">
              <span className="text-sm font-semibold text-slate-800">Share</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center w-6 h-6 rounded-full text-slate-900 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
              >
                <CloseIcon size={16} strokeWidth={2.5} />
              </button>
            </div>

            {shareLinks.map((link) => (

              <a key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
              >
                {link.icon ? (
                  <link.icon size={16} className={link.color} />
                ) : (
                  <span className={`flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold ${link.color}`}>P</span>
                )}
                {link.name}
              </a>
            ))}

            <button
              type="button"
              onClick={handleCopyLink}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors border-t border-slate-100"
            >
              <Link2 size={16} className={copied ? 'text-emerald-500' : 'text-slate-500'} />
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Image carousel
───────────────────────────────────────────── */
function ImageCarousel({ images }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [lensStyle, setLensStyle] = useState({ left: 0, top: 0 });
  const [panelStyle, setPanelStyle] = useState({ left: 0, top: 0, width: 420, height: 500 });
  const [naturalSize, setNaturalSize] = useState({ w: 0, h: 0 });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const imgContainerRef = useRef(null);
  const imgRef = useRef(null);
  const LENS_SIZE = 160;
  const ZOOM_LEVEL = 2.2;
  const PANEL_GAP = 16;
  const PANEL_MAX_WIDTH = 760;

  const handleImageLoad = (e) => {
    setNaturalSize({ w: e.target.naturalWidth, h: e.target.naturalHeight });
  };

  useEffect(() => {
    setNaturalSize({ w: 0, h: 0 });
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth) {
      setNaturalSize({ w: el.naturalWidth, h: el.naturalHeight });
    }
  }, [current]);

  const getVisibleImageRect = (containerW, containerH) => {
    if (!naturalSize.w || !naturalSize.h) {
      return { offsetX: 0, offsetY: 0, renderW: containerW, renderH: containerH };
    }
    const containerRatio = containerW / containerH;
    const imageRatio = naturalSize.w / naturalSize.h;
    let renderW, renderH;
    if (imageRatio > containerRatio) {
      renderW = containerW;
      renderH = containerW / imageRatio;
    } else {
      renderH = containerH;
      renderW = containerH * imageRatio;
    }
    return {
      offsetX: (containerW - renderW) / 2,
      offsetY: (containerH - renderH) / 2,
      renderW,
      renderH,
    };
  };

  const handleMouseMove = (e) => {
    if (!naturalSize.w || !naturalSize.h) {
      setIsZoomed(false);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const { offsetX, offsetY, renderW, renderH } = getVisibleImageRect(rect.width, rect.height);

    if (x < offsetX || x > offsetX + renderW || y < offsetY || y > offsetY + renderH) {
      setIsZoomed(false);
      return;
    }
    setIsZoomed(true);

    const clampedX = Math.max(offsetX + LENS_SIZE / 2, Math.min(x, offsetX + renderW - LENS_SIZE / 2));
    const clampedY = Math.max(offsetY + LENS_SIZE / 2, Math.min(y, offsetY + renderH - LENS_SIZE / 2));
    setLensStyle({ left: clampedX - LENS_SIZE / 2, top: clampedY - LENS_SIZE / 2 });

    const percentX = Math.max(0, Math.min(100, ((x - offsetX) / renderW) * 100));
    const percentY = Math.max(0, Math.min(100, ((y - offsetY) / renderH) * 100));
    setZoomPos({ x: percentX, y: percentY });

    const spaceRight = window.innerWidth - rect.right - PANEL_GAP - 16;
    const width = Math.max(260, Math.min(PANEL_MAX_WIDTH, spaceRight));
    setPanelStyle({ left: rect.right + PANEL_GAP, top: rect.top, width, height: rect.height });
  };

  const go = (nextIndex, dir) => {
    setDirection(dir);
    setCurrent(nextIndex);
  };
  const prev = () => go((current - 1 + images.length) % images.length, -1);
  const next = () => go((current + 1) % images.length, 1);

  const variants = {
    enter: (d) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row h-full w-full shadow-[0_24px_64px_-16px_rgba(0,0,0,0.12)] rounded-3xl">
        <div className="relative flex-1">
          <div
            ref={imgContainerRef}
            className="relative h-[400px] sm:h-[600px] w-full overflow-hidden rounded-t-3xl sm:rounded-tr-none sm:rounded-l-3xl border border-b-0 sm:border-b sm:border-r-0 border-slate-100/80 bg-slate-50"
            style={{ cursor: isZoomed ? 'zoom-in' : 'default' }}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
          >
            <AnimatePresence custom={direction} mode="wait">
              <motion.img
                key={images[current].id}
                ref={imgRef}
                src={images[current].src}
                alt={images[current].alt}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                draggable={false}
                onLoad={handleImageLoad}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="h-full w-full bg-white object-contain select-none"
              />
            </AnimatePresence>

            <div
              onMouseEnter={() => setIsZoomed(false)}
              className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/75 backdrop-blur-md border border-white/10"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-semibold text-white tracking-wide">{images[current].title}</span>
            </div>

            <div className="absolute top-4 right-4" onMouseEnter={() => setIsZoomed(false)}>
              <ShareButton />
            </div>

            <div
              onMouseEnter={() => setIsZoomed(false)}
              className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs text-white/80 font-medium tabular-nums"
            >
              {current + 1} / {images.length}
            </div>

            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              onMouseEnter={() => setIsZoomed(false)}
              className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-xs font-medium text-white/90 hover:bg-cyan-600 hover:text-white transition-colors"
            >
              Click here to view full image
            </button>

            {isZoomed && (
              <div
                className="hidden lg:block absolute pointer-events-none rounded-md border-2 border-cyan-400/80 bg-cyan-100/25 shadow-[0_0_0_1px_rgba(255,255,255,0.6)]"
                style={{
                  width: LENS_SIZE,
                  height: LENS_SIZE,
                  left: lensStyle.left,
                  top: lensStyle.top,
                  zIndex: 10,
                }}
              />
            )}

            {[
              { action: prev, icon: <ChevronLeft size={18} />, side: 'left-4' },
              { action: next, icon: <ChevronRight size={18} />, side: 'right-4' },
            ].map(({ action, icon, side }) => (
              <button
                key={side}
                type="button"
                onClick={action}
                aria-label={side.startsWith("left") ? "Previous image" : "Next image"}
                onMouseEnter={() => setIsZoomed(false)}
                className={`absolute ${side} top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-lg hover:bg-cyan-500 hover:text-white transition-all duration-200 hover:scale-110`}
              >
                {icon}
              </button>
            ))}
          </div>

          <AnimatePresence>
            {isZoomed && (
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.18 }}
                className="hidden lg:block fixed rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden"
                style={{
                  left: panelStyle.left,
                  top: panelStyle.top,
                  width: panelStyle.width,
                  height: panelStyle.height,
                  zIndex: 9999,
                  backgroundImage: `url(${images[current].src})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: `${ZOOM_LEVEL * 100}%`,
                  backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                  backgroundColor: 'white',
                }}
              />
            )}
          </AnimatePresence>
        </div>

        <div className="flex w-full flex-row sm:w-[150px] sm:flex-col flex-shrink-0 overflow-hidden rounded-b-3xl sm:rounded-b-none sm:rounded-r-3xl border border-t-0 sm:border-t sm:border-l-0 border-slate-100/80 divide-x sm:divide-x-0 sm:divide-y divide-slate-100/80">
          {images.map((img, i) => (
            <button
              key={img.id}
              type="button"
              onMouseEnter={() => go(i, i > current ? 1 : -1)}
              onClick={() => go(i, i > current ? 1 : -1)}
              className="relative flex aspect-square flex-1 sm:flex-none sm:w-full items-center justify-center overflow-hidden transition-colors duration-200"
            >
              <img src={img.src} alt={img.alt} className="h-[90%] w-[90%] object-contain m-auto" loading="lazy" decoding="async" />
              {i === current && (
                <div className="absolute inset-0 bg-cyan-500/10 ring-2 ring-inset ring-cyan-500" />
              )}
            </button>
          ))}
        </div>
      </div >

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/85 backdrop-blur-sm p-6 sm:p-10"
            onClick={() => setLightboxOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="absolute -top-12 right-0 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white hover:text-slate-900 transition-colors"
              >
                <CloseIcon size={20} strokeWidth={2.5} />
              </button>

              <div className="relative flex items-center justify-center rounded-2xl bg-white overflow-hidden" style={{ maxHeight: '85vh' }}>
                <img
                  src={images[current].src}
                  alt={images[current].alt}
                  className="w-full h-full max-h-[85vh] object-contain select-none"
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                />

                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-lg hover:bg-cyan-500 hover:text-white transition-all duration-200"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-lg hover:bg-cyan-500 hover:text-white transition-all duration-200"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              <div className="mt-4 flex items-center justify-between px-1">
                <span className="text-sm font-semibold text-white/90">{images[current].title}</span>
                <span className="text-xs text-white/60 font-medium tabular-nums">{current + 1} / {images.length}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─────────────────────────────────────────────
   AutoPlayCarousel
───────────────────────────────────────────── */
function AutoPlayCarousel({ images, titles }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length, isPaused]);
  useEffect(() => {
    images.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  }, [images]);
  if (!images || images.length === 0) {
    return null;
  }
  const prevIndex = (activeIndex - 1 + images.length) % images.length;
  const nextIndex = (activeIndex + 1) % images.length;
  const changeImage = (index) => {
    setActiveIndex(index);
  };
  const goPrev = () => setActiveIndex(prevIndex);
  const goNext = () => setActiveIndex(nextIndex);
  const currentTitle = titles && titles[activeIndex] ? titles[activeIndex] : null;

  return (
    <div className="relative w-full h-[400px] sm:h-full overflow-hidden rounded-3xl bg-slate-100 flex items-center justify-center select-none cursor-pointer"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute w-[70%] h-[70%] rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />

      <img
        src={images[prevIndex]}
        onClick={() => changeImage(prevIndex)}
        alt=""
        className="absolute left-0 w-16 h-24 sm:w-32 sm:h-40 object-contain rounded-xl border border-slate-300 shadow-md bg-white opacity-50 sm:opacity-60 hover:opacity-90 -translate-x-4 sm:-translate-x-8 scale-75 transition-all duration-700 cursor-pointer"
        draggable={false}
        loading="lazy"
        decoding="async"
      />

      <motion.img
        key={activeIndex}
        src={images[activeIndex]}
        alt="Controller Preview"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-h-[92%] max-w-[92%] sm:max-h-[95%] sm:max-w-[80%] object-contain drop-shadow-2xl rounded-xl"
        draggable={false}
        loading="lazy"
        decoding="async"
      />

      <img
        src={images[nextIndex]}
        onClick={() => changeImage(nextIndex)}
        alt=""
        className="absolute right-0 w-16 h-24 sm:w-32 sm:h-40 object-contain rounded-xl border border-slate-300 shadow-md bg-white opacity-50 sm:opacity-60 hover:opacity-90 translate-x-4 sm:translate-x-8 scale-75 transition-all duration-700 select-none cursor-pointer"
        draggable={false}
        loading="lazy"
        decoding="async"
      />
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); goPrev(); }}
        aria-label="Previous image"
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white border border-white/20 backdrop-blur-sm hover:bg-cyan-500 hover:border-cyan-400 transition-all duration-200"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); goNext(); }}
        aria-label="Next image"
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white border border-white/20 backdrop-blur-sm hover:bg-cyan-500 hover:border-cyan-400 transition-all duration-200"
      >
        <ChevronRight size={18} />
      </button>

      {currentTitle && (
        <div className="absolute top-1 left-4 z-20 px-3 py-1.5 rounded-full bg-slate-900/70 backdrop-blur-md border border-white/10">
          <span className="text-xs font-semibold text-white tracking-wide">{currentTitle}</span>
        </div>
      )}

      <div className="absolute bottom-3 sm:bottom-4 flex gap-2 z-20">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => changeImage(index)}
            className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${activeIndex === index
              ? "bg-cyan-500"
              : "bg-slate-400"
              }`}
          />
        ))}
      </div>

    </div>
  );
}

/* ─────────────────────────────────────────────
   Stat chip (hero area quick stats)
───────────────────────────────────────────── */
function StatChip({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/8 backdrop-blur-sm border border-white/12">
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/20">
        <Icon size={15} className="text-cyan-300" />
      </div>
      <div>
        <div className="text-[11px] text-white/80 font-bold uppercase tracking-wider leading-none mb-0.5">{label}</div>
        <div className="text-sm font-bold text-white leading-none">{value}</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Feature card (overview section)
───────────────────────────────────────────── */
function FeatureCard({ icon, title, description, index }) {
  const iconComponents = [Thermometer, AlertTriangle, Flame, Settings2, Shield, Layers, Zap, Gauge];
  const Icon = iconComponents[index % iconComponents.length];

  const isNavy = index % 2 === 1;
  const accentBorder = isNavy ? 'hover:border-[#2a56a6]/40' : 'hover:border-cyan-500/40';
  const iconBg = isNavy ? 'bg-[#2a56a6]/10 group-hover:bg-[#2a56a6]/20' : 'bg-cyan-500/10 group-hover:bg-cyan-500/20';
  const iconColor = isNavy ? 'text-[#2a56a6] group-hover:text-[#5b83c9]' : 'text-cyan-500 group-hover:text-cyan-400';
  const glowGradient = isNavy
    ? 'group-hover:from-[#2a56a6]/8 group-hover:to-blue-900/10'
    : 'group-hover:from-cyan-500/5 group-hover:to-blue-500/5';

  return (
    <FadeIn delay={index * 0.06} dir="up" className="h-full">
      <div className={`group relative p-5 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-900 ${accentBorder} transition-all duration-300 overflow-hidden h-full`}>
        <div className={`absolute inset-0 bg-gradient-to-br from-transparent to-transparent ${glowGradient} transition-all duration-300 rounded-xl`} />
        <div className="relative">
          <div className={`mb-3 flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${iconBg}`}>
            <Icon size={18} className={iconColor} />
          </div>
          <h3 className="mb-1.5 text-sm font-semibold text-slate-900 group-hover:text-white transition-colors">
            {title}
          </h3>
          <p className="text-xs leading-relaxed text-slate-500 group-hover:text-slate-300 transition-colors">
            {description}
          </p>
        </div>
      </div>
    </FadeIn>
  );
}

/* ─────────────────────────────────────────────
   Benefit card (dark section)
───────────────────────────────────────────── */
function BenefitCard({ benefit, index }) {
  const icons = [Flame, Shield, BarChart3, AlertTriangle, Activity, Wind, Gauge, Layers];
  const Icon = icons[index % icons.length];

  const palette = [
    { border: 'hover:border-cyan-500/30', accent: 'via-cyan-500/40', iconBg: 'from-cyan-500/20 to-blue-600/20 group-hover:from-cyan-500/30 group-hover:to-blue-600/30 border-cyan-500/20', iconColor: 'text-cyan-400' },
    { border: 'hover:border-[#5b83c9]/40', accent: 'via-[#5b83c9]/40', iconBg: 'from-[#2a56a6]/25 to-[#0b1f4d]/25 group-hover:from-[#2a56a6]/35 group-hover:to-[#0b1f4d]/35 border-[#5b83c9]/25', iconColor: 'text-[#7fa0e0]' },
    { border: 'hover:border-[#f5b800]/30', accent: 'via-[#f5b800]/40', iconBg: 'from-[#f5b800]/20 to-[#b38500]/20 group-hover:from-[#f5b800]/30 group-hover:to-[#b38500]/30 border-[#f5b800]/25', iconColor: 'text-[#ffc91a]' },
  ];
  const c = palette[index % palette.length];

  return (
    <FadeIn delay={index * 0.065} dir="up">
      <div className={`group relative h-full p-6 sm:p-7 rounded-2xl border border-white/8 bg-white/[0.03] hover:bg-white/[0.07] ${c.border} transition-all duration-300 overflow-hidden cursor-default`}>
        <div className={`absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent ${c.accent} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

        <div className="mb-3 flex items-center gap-4">
          <div className={`flex items-center justify-center w-12 h-12 flex-shrink-0 rounded-xl bg-gradient-to-br border transition-all duration-300 ${c.iconBg}`}>
            <Icon size={20} className={c.iconColor} />
          </div>
          <h3 className="text-lg font-bold leading-tight tracking-tight text-white">{benefit.title}</h3>
        </div>
        <p className="text-sm leading-relaxed text-slate-400 group-hover:text-slate-300 transition-colors">{benefit.description}</p>
      </div>
    </FadeIn>
  );
}

/* ─────────────────────────────────────────────
   Controller feature row
───────────────────────────────────────────── */
function ControllerFeature({ feature, index }) {
  const icons = [Monitor, Wifi, BarChart3, Lock, AlertTriangle, Activity, Layers, Zap];
  const Icon = icons[index % icons.length];
  return (
    <FadeIn delay={index * 0.06} dir="right">
      <div className="group flex h-full gap-4 p-4 rounded-xl border border-white/8 bg-white/[0.03] hover:bg-white/[0.07] hover:border-cyan-500/30 transition-all duration-300 cursor-default">
        <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 shadow-lg shadow-cyan-500/25 group-hover:shadow-cyan-500/40 group-hover:rotate-3 transition-all duration-300">
          <Icon size={18} className="text-white" />
        </div>
        <div className="pt-0.5">
          <h3 className="mb-1 text-base font-bold text-white">{feature.title}</h3>
          <p className="text-sm leading-relaxed text-slate-400 group-hover:text-slate-300 transition-colors">{feature.description}</p>
        </div>
      </div>
    </FadeIn>
  );
}

/* ─────────────────────────────────────────────
   Related product card
───────────────────────────────────────────── */
function RelatedCard({ product, index }) {
  return (
    <FadeIn delay={index * 0.07} dir="up">
      <div className="group h-full overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 hover:border-cyan-500/40 hover:bg-slate-900 transition-all duration-300">
        <div className="relative h-48 overflow-hidden bg-white p-6">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-5">
          <h3 className="mb-2 text-base font-bold text-slate-900 group-hover:text-white transition-colors">
            {product.name}
          </h3>
          <p className="mb-5 text-sm leading-relaxed text-slate-500 group-hover:text-slate-300 transition-colors">
            {product.description}
          </p>
          <Link
            to={product.link}
            state={{ from: "/dust-chamber" }}
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 group-hover:text-cyan-400 transition-colors"
          >
            Learn More<span className="sr-only"> about the {product.name}</span>
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-1 duration-200"
            />
          </Link>
        </div>
      </div>
    </FadeIn>
  );
}

/* ─────────────────────────────────────────────
   Sticky section nav
───────────────────────────────────────────── */
function SectionNav() {
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "benefits", label: "Benefits" },
    { id: "specifications", label: "Specifications" },
    { id: "dust-standards", label: "Dust Standards" },
    { id: "controller", label: "Controller" },
    { id: "related-products", label: "Related Products" },
  ];

  // Overview is active by default
  const [active, setActive] = useState("overview");

  useEffect(() => {
    const sections = tabs
      .map((tab) => document.getElementById(tab.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting);

        if (visibleSection) {
          setActive(visibleSection.target.id);
        }
      },
      {
        rootMargin: "-30% 0px -50% 0px",
        threshold: 0.25,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleClick = (e, id) => {
    e.preventDefault();

    setActive(id);

    const section = document.getElementById(id);

    if (section) {
      const y =
        section.getBoundingClientRect().top +
        window.pageYOffset -
        300;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="sticky top-0 z-10 border-b border-slate-200 bg-white shadow-sm">
      <div
        className="mx-auto flex max-w-7xl 2xl:max-w-[1440px] items-center justify-start md:justify-center gap-4 md:gap-8 overflow-x-auto px-5"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >

        {tabs.map((tab) => (

          <a key={tab.id}
            href={`#${tab.id}`}
            onClick={(e) => handleClick(e, tab.id)}
            className={`relative py-5 text-base font-semibold transition-all duration-300 ${active === tab.id
              ? "text-cyan-700"
              : "text-black hover:text-cyan-700"
              }`}
          >
            {tab.label}

            {active === tab.id && (
              <motion.span
                layoutId="underline"
                className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-cyan-600 rounded-full"
              />
            )}
          </a>
        ))}

      </div>
    </nav>
  );
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
function ProductDetail() {
  const product = DustChamberProduct;
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product.title]);

  useEffect(() => {
    const handler = (e) => setMousePos({ x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 });
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  const particles = [
    { x: 8, y: 18, size: 56, delay: 0, color: 'rgb(6 182 212)' },
    { x: 82, y: 12, size: 80, delay: 1.4, color: '#3b82f6' },
    { x: 52, y: 68, size: 44, delay: 0.7, color: 'rgb(6 182 212)' },
    { x: 92, y: 58, size: 64, delay: 2.1, color: '#60a5fa' },
    { x: 18, y: 82, size: 36, delay: 0.9, color: '#0ea5e9' },
    { x: 65, y: 30, size: 28, delay: 1.8, color: '#06b6d4' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="overflow-x-hidden font-sans text-slate-800 bg-white"
    >
      <GrainOverlay />
      <BorderBeamKeyframes />
      <ScrollProgress />

      {/* ── HERO ─────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden text-white"
        style={{ background: 'var(--gradient-brand)', minHeight: '450px', display: 'flex', alignItems: 'center' }}
      >
        {/* Machine photo — plain <img> tag, always renders reliably */}
        <img
          src={batteryHeroBg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-[30%_center] lg:object-right pointer-events-none select-none"
        />
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '52px 52px',
          }}
        />

        {/* Ambient blobs */}
        <AmbientBlob color="#0284c7" style={{ width: 440, height: 440, top: '-18%', right: '-8%' }} mouseX={mousePos.x} mouseY={mousePos.y} depth={1} />
        <AmbientBlob color="#06b6d4" style={{ width: 380, height: 380, bottom: '-22%', left: '-6%' }} mouseX={mousePos.x} mouseY={mousePos.y} depth={0.7} />
        <AmbientBlob color="rgb(2,174,178)" style={{ width: 260, height: 260, top: '28%', left: '38%' }} mouseX={mousePos.x} mouseY={mousePos.y} depth={1.3} />

        {particles.map((p, i) => <Particle key={i} {...p} />)}

        {/* Center darkening so the text stays readable over bright clouds,
    while both edges (mountains left, machine right) stay natural */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 55% 90% at 42% 50%, rgba(6,30,22,0.6) 0%, rgba(6,30,22,0.35) 45%, transparent 75%)' }} />

        {/* Subtle bottom fade for overall polish */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0.2) 100%)' }} />
        <div className="relative w-full px-4 py-20 mx-auto max-w-7xl 2xl:max-w-[1440px] sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 44 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mx-auto text-center lg:mx-0 lg:max-w-2xl lg:text-left"
          >
            {/* Live badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', delay: 0.2, stiffness: 200 }}
              className="inline-flex items-center gap-2 px-5 py-2 mb-8 text-sm font-medium border rounded-full bg-white/10 backdrop-blur-md border-white/20"
              style={{ letterSpacing: '0.03em' }}
            >
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-emerald-400" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-400" />
              </span>
              {product.hero.tagline}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6 text-4xl font-bold tracking-tight text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-white to-blue-200"
            >
              {product.hero.mainTitle}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="px-4 lg:px-0 text-base leading-relaxed text-slate-300 sm:text-lg md:text-lg mb-10"
            >
              {product.hero.subtitle}
            </motion.p>
            
            {/* Request Quote + Download Brochure CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openEnquiry(product.hero.mainTitle)}
                className="inline-flex items-center gap-2 px-8 py-3 text-base font-semibold text-white rounded-full transition-colors duration-200"
                style={{
                  background: 'linear-gradient(135deg, #00b3b3 0%, #2a56a6 100%)',
                  boxShadow: '0 10px 28px rgba(0,179,179,0.35)',
                }}
              >
                {product.hero.ctaText || 'Request Quote'}
                <span className="text-lg">→</span>
              </motion.button>

              {/* Product brochure — opens the lead-capture BrochureModal with this product's PDF */}
              <motion.button
                type="button"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.62, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openBrochure(product.hero.mainTitle)}
                className="inline-flex items-center gap-2 px-7 py-3 text-base font-semibold text-white rounded-full transition-colors duration-200 hover:bg-white/10"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1.5px solid rgba(0,179,179,0.7)',
                  backdropFilter: 'blur(6px)',
                }}
                aria-label={`Download Brochure – ${product.hero.mainTitle}`}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                  <path d="M12 18v-6" />
                  <path d="m9 15 3 3 3-3" />
                </svg>
                Download Brochure
              </motion.button>
            </div>

            {/* Quick stat chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap justify-center lg:justify-start gap-3"
            >
              <StatChip icon={Layers} label="Capacity" value="1000 Liters" />
              <StatChip icon={AlertTriangle} label="Hazard Rating" value="Up to EUCAR L7" />
              <StatChip icon={Shield} label="Sound Level" value="< 70 dB(A)" />
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.04))' }} />
      </section>

      {/* ── SECTION NAV ──────────────────────────── */}
      <SectionNav />

      {/* ── OVERVIEW + IMAGE ─────────────────────── */}
      <section id="overview" className="px-5 pt-6 pb-16 bg-white sm:pt-8 sm:pb-20 md:pt-10 md:pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl 2xl:max-w-[1440px]">

          {/* Overview — full width, on top */}
          <FadeIn dir="up" delay={0.05}>
            <div className="w-full mb-10 lg:mb-12">
              <div className="mb-5 text-center">
                <div className="inline-flex items-center justify-center gap-2 mb-3">
                  <span className="block w-5 h-px bg-cyan-500 opacity-70 rounded-full" />
                  <span
                    style={{
                      color: 'var(--color-primary-700)',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 'var(--font-weight-semibold)',
                      fontSize: 'var(--text-sm)',
                      letterSpacing: 'var(--tracking-wider)',
                      textTransform: 'uppercase',
                    }}
                  >
                    Product Overview
                  </span>
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
                  {product.title}
                </h2>
                <div className="mt-4 mx-auto w-12 h-0.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
              </div>

              {product.productDetails.overview.map((text, i) => (
                <p key={i} className="mb-4 text-justify text-sm leading-relaxed text-slate-600 sm:text-base">{text}</p>
              ))}
            </div>
          </FadeIn>

          {/* 2-column row: image + thumbnails (left) / key features (right) */}
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
            <FadeIn dir="left" delay={0.12} className="h-full">
              <ImageCarousel images={product.productDetails.images} />
            </FadeIn>

            <FadeIn dir="right" delay={0.2} className="h-full">
              <div className="flex h-full flex-col border border-slate-200/80 bg-slate-50/70 p-5 shadow-sm sm:p-6">
                <div className="mb-5">
                  <h3 className="text-lg font-semibold text-slate-900">Key Specifications</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    Engineered for safe, reliable battery testing with heavy-duty construction throughout.
                  </p>
                </div>
                <div className="grid flex-1 gap-3 sm:grid-cols-2">
                  {product.productDetails.keyFeatures.map((feature, i) => (
                    <FeatureCard key={i} index={i} {...feature} />
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

        </div>
      </section>

      {/* ── BENEFITS ─────────────────────────────── */}
      <section
        id="benefits"
        className="relative px-5 py-16 sm:py-20 md:py-24 sm:px-6 lg:px-8 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}
      >
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <div className="relative mx-auto max-w-7xl 2xl:max-w-[1440px]">
          <SectionHeader eyebrow="Safety Benefits" title={product.benefits.title} subtitle={product.benefits.subtitle} dark />
          <div className="grid gap-4 mt-12 sm:grid-cols-2 lg:grid-cols-3 sm:mt-16">
            {product.benefits.benefitsList.map((benefit, i) => (
              <BenefitCard key={benefit.id} benefit={benefit} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SPECIFICATIONS ───────────────────────── */}
      <section id="specifications" className="px-5 py-16 bg-white sm:py-20 md:py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl 2xl:max-w-[1440px]">
          <SectionHeader
            eyebrow="Technical Data"
            title={product.specifications.title}
            subtitle="Comprehensive technical details of your testing solution"
          />

          {product.specifications.isTable && (
            <FadeIn dir="up" delay={0.1}>
              <p className="mt-10 text-center text-xs sm:text-sm text-slate-500 max-w-4xl mx-auto">
                {product.specifications.tableCaption}
              </p>

              <div className="mt-8">
                <div className="overflow-x-auto border border-slate-200 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)]">
                  <table className="w-full min-w-[900px] table-fixed border-collapse bg-white text-xs md:text-sm">
                    <thead>
                      <tr style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }} className="text-white">
                        {product.specifications.columns.map((col, i) => (
                          <th key={i} className="border-b border-slate-700 px-3 py-3 text-center font-bold leading-snug break-words">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {product.specifications.rows.map((row, i) => (
                        <tr key={`${row.spec}-${i}`} className={`transition-colors ${i % 2 === 0 ? 'bg-white hover:bg-cyan-50/50' : 'bg-slate-50/70 hover:bg-cyan-50/50'}`}>
                          <td className="border-b border-slate-100 px-4 py-3 text-left font-semibold text-slate-800 leading-snug break-words">{row.spec}</td>
                          <td className="border-b border-slate-100 px-4 py-3 text-center text-slate-700 leading-relaxed break-words">{row.dust450}</td>
                          <td className="border-b border-slate-100 px-4 py-3 text-center text-slate-700 leading-relaxed break-words">{row.dust1000}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </FadeIn>
          )}

          {/* Standards temporarily hidden for the Dust Chamber page. */}
          {product.standards?.length > 0 && (
            <div className="pt-14 mt-14 border-t border-slate-100">
              <SectionHeader eyebrow="Compliance" title="Standards Supported" />
              <div className="grid gap-5 mt-10 md:grid-cols-2">
                {product.standards.map((standard, i) => (
                  <FadeIn key={standard.title} delay={i * 0.1} dir="up">
                    <div className="group relative h-full rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg">
                      {/* Dark base border ring — always visible */}
                      <div className="absolute inset-0 rounded-2xl ring-1 ring-slate-300 group-hover:ring-slate-400 pointer-events-none transition-colors duration-300" />

                      {/* Corner glow layer — 4 pulsing glows, one per corner, only on hover */}
                      <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
                        {[
                          { top: -10, left: -10 },
                          { top: -10, right: -10 },
                          { bottom: -10, left: -10 },
                          { bottom: -10, right: -10 },
                        ].map((pos, ci) => (
                          <div
                            key={ci}
                            className="absolute w-16 h-16 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                              ...pos,
                              background: 'radial-gradient(circle, #0891b2 0%, #1e40af 55%, transparent 75%)',
                              filter: 'blur(6px)',
                              animation: `corner-pulse 1.6s ease-in-out infinite`,
                              animationDelay: `${ci * 0.2}s`,
                            }}
                          />
                        ))}
                      </div>

                      {/* Card content — sits above the beam, keeps light background */}
                      <div className="relative z-10 h-full p-6 rounded-2xl border border-slate-100 bg-slate-50 m-[2px] group-hover:m-[2px]">
                        <h3 className="mb-4 text-lg font-bold text-slate-900 transition-colors">{standard.title}</h3>
                        <ul className="space-y-2.5">
                          {standard.items.map((item) => (
                            <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-slate-600 transition-colors">
                              <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0 text-cyan-500" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── DUST STANDARDS (IP5X / IP6X) ─────────── */}
      <DustStandards data={product.dustStandards} />

      {/* ── CONTROLLER ───────────────────────────── */}
      <section
        id="controller"
        className="relative px-5 py-16 sm:py-20 md:py-24 sm:px-6 lg:px-8 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl 2xl:max-w-[1440px]">
          <SectionHeader eyebrow="Controller System" title={product.controller.title} subtitle={product.controller.subtitle} dark />

          <div className="grid items-center gap-12 mt-12 lg:grid-cols-2 sm:mt-16">
            <FadeIn dir="left">
              <div className="flex items-center justify-start h-[400px] sm:h-[420px]">
                <AutoPlayCarousel
                  images={[prd5, prd6, prd7, prd8, prd9, prd10]}
                />
              </div>
            </FadeIn>

            <div className="grid items-stretch gap-4 lg:grid-cols-2">
              {product.controller.features.map((feature, i) => (
                <ControllerFeature key={feature.id} feature={feature} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── RELATED PRODUCTS ─────────────────────── */}
      <section id="related-products" className="px-5 py-16 bg-white sm:py-20 md:py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl 2xl:max-w-[1440px]">
          <SectionHeader
            eyebrow="More Solutions"
            title="Related Products"
            subtitle="Explore our complete range of testing and conditioning solutions"
          />
          <div className="grid gap-6 mt-12 sm:grid-cols-2 lg:grid-cols-4 sm:mt-16">
            {getRelatedChambers('dust').map((rp, i) => (
              <RelatedCard key={rp.id} product={rp} index={i} />
            ))}
          </div>
          <BackToRelatedChamber />
        </div>
      </section>
    </motion.div>
  );
}

export default ProductDetail;
