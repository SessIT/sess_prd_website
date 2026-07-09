import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {ArrowRight,ChevronLeft, ChevronRight, CheckCircle2,  Layers, Gauge, Zap, Shield,  Thermometer, Wind,  Activity,  Settings2,  Monitor, Wifi,Lock, BarChart3,ChevronDown,} from 'lucide-react';

// Product Images
import prd1 from '../../assets/product/Climatic Test Chamber.png';
import prd2 from '../../assets/product/CO2 Test Chamber.png';
import prd3 from '../../assets/product/Environmetal.png';
import prd4 from '../../assets/product/Flame-Proof Hot Air Oven.png';
import prd5 from '../../assets/product/controller.jpeg';
// Product Data
const climaticTestChamberProduct = {
  id: 'climatic-test-chamber',
  title: 'Climatic Test Chamber',
  subtitle: 'For Temperature & Humidity Simulations',
  description: 'The Climatic Test Chamber range accurately simulates temperature and humidity conditions within its test space. With its redesigned structure, enhanced refrigeration system, and intelligent controller, this chamber now delivers even greater efficiency and ensures uninterrupted testing.',
  
  // Hero Section
  hero: {
    backgroundGradient: 'linear-gradient(135deg, rgb(34, 229, 245, 0.95) 0%, rgb(59, 91, 255, 0.95) 100%)',
    tagline: 'Precision-Engineered for Performance',
    mainTitle: 'Climatic Test Chamber',
    subtitle: 'For Temperature & Humidity Simulations',
    ctaText: 'Request Quote',
  },

  // Section 1: Product Details with Images
  productDetails: {
    images: [
      {
        id: 1,
        src: 'https://hiaccengineering.com/wp-content/uploads/2022/11/Hiacc_Climatic_Test_Chamber.png',
        alt: 'Climatic Test Chamber Front View',
        title: 'Front View',
      },
      {
        id: 2,
        src: 'https://hiaccengineering.com/wp-content/uploads/2022/11/Hiacc_Climatic_Test_Chamber_thump1.png',
        alt: 'Cross-section showing internal components',
        title: 'Internal Components',
      },
      {
        id: 3,
        src: 'https://hiaccengineering.com/wp-content/uploads/2022/11/Hiacc_Climatic_test_Chamber_thump2.png',
        alt: 'Side View',
        title: 'Side View',
      },
      {
        id: 4,
        src: 'https://hiaccengineering.com/wp-content/uploads/2022/11/Temperature-Chart.jpg',
        alt: 'Temperature Control Chart',
        title: 'Temperature Chart',
      },
      {
        id: 5,
        src: 'https://hiaccengineering.com/wp-content/uploads/2022/11/Temperature-Humidity-Chart.jpg',
        alt: 'Temperature and Humidity Chart',
        title: 'Temperature-Humidity Chart',
      },
    ],
    overview: [
      'Featuring an optimized heating and cooling system, this chamber offers superior performance and energy efficiency.',
      'The chamber can be tailored to meet various test standards, providing versatility for diverse testing needs.',
      'It boasts a larger viewing window, ports for live specimen testing, a visual alarm system for added safety, improved mobility, and a compact footprint for space-saving convenience.',
    ],
    keyFeatures: [
      {
        // icon: '🌡️',
        title: 'Temperature Range',
        description: '-70°C to +180°C (Cascade) & -40°C to +180°C (Single)',
      },
      {
        // icon: '💧',
        title: 'Humidity Range',
        description: '10% RH to 98% RH',
      },
      {
        // icon: '📊',
        title: 'Advanced Control',
        description: 'Intelligent controller with TCP/IP and Serial Communication',
      },
      {
        // icon: '🔒',
        title: 'Safety Features',
        description: 'Lockable one-handed door latch with visual alarm system',
      },
    ],
  },

  // Section 2: Benefits Section
  benefits: {
    title: 'With This Climatic Chamber, You Can Save Both Time and Money',
    subtitle: 'Maximize efficiency while minimizing operational costs',
    benefitsList: [
      {
        id: 1,
        title: 'Energy Efficiency',
        description: 'Energy saving refrigerants R404A and R23 reduce operational costs',
        // icon: '⚡',
      },
      {
        id: 2,
        title: 'Frost-Free Operation',
        description: 'Automatic frost removal system ensures continuous testing without interruptions',
        // icon: '❄️',
      },
      {
        id: 3,
        title: 'Enhanced Performance',
        description: 'Optimized heating and cooling system delivers superior test results faster',
        // icon: '🚀',
      },
      {
        id: 4,
        title: 'Reduced Maintenance',
        description: 'Three-sided component access and easy maintenance design',
        // icon: '🔧',
      },
      {
        id: 5,
        title: 'Space Saving',
        description: 'Compact footprint design fits seamlessly in any laboratory',
        // icon: '📐',
      },
      {
        id: 6,
        title: 'Superior Durability',
        description: 'Non-settling rigid stone wool insulation and heavy-duty construction',
        // icon: '💪',
      },
    ],
  },

  // Section 3: Technical Specifications - Models Complete Table
  specifications: {
    title: 'Technical Specifications',
    isTable: true,
    models: [
      '120/-40C/3K',
      '120/-70C/3K',
      '225/-40C/3K',
      '225/-70C/3K',
      '340/-40C/3K',
      '340/-70C/3K',
      '450/-40C/3K',
      '450/-70C/3K',
      '600/-40C/3K',
      '600/-70C/3K',
      '1000/-40C/3K',
      '1000/-70C/3K',
      '1500/-40C/3K',
      '1500/-70C/3K',
    ],
    specs: [
      {
        category: 'TEST SPACE DIMENSIONS',
        items: [
          {
            label: 'Test space volume',
            unit: 'L',
            values: ['120', '120', '225', '225', '340', '340', '448', '448', '612', '612', '1000', '1000', '1500', '1500'],
          },
          {
            label: 'Width',
            unit: 'mm',
            values: ['500', '500', '600', '600', '700', '700', '700', '700', '800', '800', '1000', '1000', '1000', '1000'],
          },
          {
            label: 'Depth',
            unit: 'mm',
            values: ['400', '400', '500', '500', '600', '600', '800', '800', '850', '850', '1000', '1000', '1500', '1500'],
          },
          {
            label: 'Height',
            unit: 'mm',
            values: ['600', '600', '750', '750', '800', '800', '800', '800', '900', '900', '1000', '1000', '1000', '1000'],
          },
        ],
      },
      {
        category: 'PERFORMANCE DATA FOR TEMPERATURE TESTS',
        items: [
          {
            label: 'Maximum temperature',
            unit: '°C',
            values: ['180', '180', '180', '180', '180', '180', '180', '180', '180', '180', '180', '180', '180', '180'],
          },
          {
            label: 'Minimum temperature discontinuous',
            unit: '°C',
            values: ['-40', '-70', '-40', '-70', '-40', '-70', '-40', '-70', '-40', '-70', '-40', '-70', '-40', '-70'],
          },
          {
            label: 'Rate of temperature change, cooling',
            unit: '°C/min',
            values: ['3', '3', '3', '3', '3', '3', '3', '3', '3', '3', '3', '3', '3', '3'],
          },
          {
            label: 'Rate of temperature change, heating',
            unit: '°C/min',
            values: ['3.5', '3.5', '3.5', '3.5', '3.5', '3.5', '3.5', '3.5', '3.5', '3.5', '3.5', '3.5', '3.5', '3.5'],
          },
          {
            label: 'Temperature control accuracy, in time',
            unit: '°C',
            values: ['±0.5 … ±1', '±0.5 … ±1', '±0.5 … ±1', '±0.5 … ±1', '±0.5 … ±1', '±0.5 … ±1', '±0.5 … ±1', '±0.5 … ±1', '±0.5 … ±1', '±0.5 … ±1', '±0.5 … ±1', '±0.5 … ±1', '±0.5 … ±1', '±0.5 … ±1'],
          },
          {
            label: 'Heat compensation, max. at +20°C',
            unit: 'W',
            values: ['850', '1000', '850', '1000', '900', '1100', '900', '1100', '1000', '1200', '1000', '1200', '1000', '1200'],
          },
        ],
      },
      {
        category: 'PERFORMANCE DATA FOR CLIMATE TESTS',
        items: [
          {
            label: 'Maximum temperature',
            unit: '°C',
            values: ['85', '85', '85', '85', '85', '85', '85', '85', '85', '85', '85', '85', '85', '85'],
          },
          {
            label: 'Minimum temperature',
            unit: '°C',
            values: ['10', '10', '10', '10', '10', '10', '10', '10', '10', '10', '10', '10', '10', '10'],
          },
          {
            label: 'Humidity range',
            unit: '%RH',
            values: ['10…98', '10…98', '10…98', '10…98', '10…98', '10…98', '10…98', '10…98', '10…98', '10…98', '10…98', '10…98', '10…98', '10…98'],
          },
          {
            label: 'Humidity deviation, in time',
            unit: '%RH',
            values: ['±1…±3', '±1…±3', '±1…±3', '±1…±3', '±1…±3', '±1…±3', '±1…±3', '±1…±3', '±1…±3', '±1…±3', '±1…±3', '±1…±3', '±1…±3', '±1…±3'],
          },
          {
            label: 'Temperature deviation, in time',
            unit: '%RH',
            values: ['±0.1 … ±0.3', '±0.1 … ±0.3', '±0.1 … ±0.3', '±0.1 … ±0.3', '±0.1 … ±0.3', '±0.1 … ±0.3', '±0.1 … ±0.3', '±0.1 … ±0.3', '±0.1 … ±0.3', '±0.1 … ±0.3', '±0.1 … ±0.3', '±0.1 … ±0.3', '±0.1 … ±0.3', '±0.1 … ±0.3'],
          },
          {
            label: 'Test Standard Compliance',
            unit: '',
            values: ['IEC-60068, IEC-60749, IEC-61747, MIL-STD, ISO16750, ASTM, SAE, BIS & 50 other standards', 'IEC-60068, IEC-60749, IEC-61747, MIL-STD, ISO16750, ASTM, SAE, BIS & 50 other standards', 'IEC-60068, IEC-60749, IEC-61747, MIL-STD, ISO16750, ASTM, SAE, BIS & 50 other standards', 'IEC-60068, IEC-60749, IEC-61747, MIL-STD, ISO16750, ASTM, SAE, BIS & 50 other standards', 'IEC-60068, IEC-60749, IEC-61747, MIL-STD, ISO16750, ASTM, SAE, BIS & 50 other standards', 'IEC-60068, IEC-60749, IEC-61747, MIL-STD, ISO16750, ASTM, SAE, BIS & 50 other standards', 'IEC-60068, IEC-60749, IEC-61747, MIL-STD, ISO16750, ASTM, SAE, BIS & 50 other standards', 'IEC-60068, IEC-60749, IEC-61747, MIL-STD, ISO16750, ASTM, SAE, BIS & 50 other standards', 'IEC-60068, IEC-60749, IEC-61747, MIL-STD, ISO16750, ASTM, SAE, BIS & 50 other standards', 'IEC-60068, IEC-60749, IEC-61747, MIL-STD, ISO16750, ASTM, SAE, BIS & 50 other standards', 'IEC-60068, IEC-60749, IEC-61747, MIL-STD, ISO16750, ASTM, SAE, BIS & 50 other standards', 'IEC-60068, IEC-60749, IEC-61747, MIL-STD, ISO16750, ASTM, SAE, BIS & 50 other standards', 'IEC-60068, IEC-60749, IEC-61747, MIL-STD, ISO16750, ASTM, SAE, BIS & 50 other standards', 'IEC-60068, IEC-60749, IEC-61747, MIL-STD, ISO16750, ASTM, SAE, BIS & 50 other standards'],
          },
        ],
      },
      {
        category: 'TEST SPACE LOADING CAPACITY',
        items: [
          {
            label: 'Load, max.',
            unit: 'kg',
            values: ['80', '80', '100', '100', '100', '100', '100', '100', '100', '100', '100', '100', '100', '100'],
          },
          {
            label: 'Load per grid',
            unit: 'kg',
            values: ['20', '20', '20', '20', '25', '25', '25', '25', '30', '30', '30', '30', '30', '30'],
          },
          {
            label: 'Possible number of insert grids',
            unit: 'piece',
            values: ['4', '4', '5', '5', '6', '6', '6', '6', '7', '7', '7', '7', '7', '7'],
          },
        ],
      },
      {
        category: 'POWER/CONNECTION DATA',
        items: [
          {
            label: 'Voltage rating',
            unit: 'V',
            values: ['3/N/PE AC 415V±10% 50Hz', '3/N/PE AC 415V±10% 50Hz', '3/N/PE AC 415V±10% 50Hz', '3/N/PE AC 415V±10% 50Hz', '3/N/PE AC 415V±10% 50Hz', '3/N/PE AC 415V±10% 50Hz', '3/N/PE AC 415V±10% 50Hz', '3/N/PE AC 415V±10% 50Hz', '3/N/PE AC 415V±10% 50Hz', '3/N/PE AC 415V±10% 50Hz', '3/N/PE AC 415V±10% 50Hz', '3/N/PE AC 415V±10% 50Hz', '3/N/PE AC 415V±10% 50Hz', '3/N/PE AC 415V±10% 50Hz'],
          },
          {
            label: 'Connected Load',
            unit: 'kW',
            values: ['8.5', '11', '9.5', '12', '10', '13', '11.5', '14', '14.5', '17', '16', '19.5', '17', '20'],
          },
          {
            label: 'Sound pressure level',
            unit: 'dB(A)',
            values: ['72', '74', '72', '74', '72', '74', '73', '74', '73', '74', '73', '74', '73', '74'],
          },
          {
            label: 'Total weight',
            unit: 'kg',
            values: ['450', '500', '490', '540', '540', '600', '600', '680', '720', '780', '820', '900', '900', '1000'],
          },
          {
            label: 'Refrigerant System',
            unit: 'type',
            values: ['R404A', 'R23', 'R404A', 'R23', 'R404A', 'R23', 'R404A', 'R23', 'R404A', 'R23', 'R404A', 'R23', 'R404A', 'R23'],
          },
        ],
      },
    ],
  },

  // Section 4: Controller Features
  controller: {
    title: 'Touchscreen Intelligent Controller',
    subtitle: 'Advanced control system for precision testing',
    image: prd5,
    features: [
      {
        id: 1,
        title: 'Intuitive Touchscreen Interface',
        description: 'User-friendly design makes setup and operation simple for technicians of all levels',
        icon: '📱',
      },
      {
        id: 2,
        title: 'Real-time Data Logging',
        description: 'Continuous monitoring and recording of all chamber parameters with high precision',
        icon: '📊',
      },
      {
        id: 3,
        title: 'Programmable Test Cycles',
        description: 'Create and save custom test profiles for repeatability and consistency',
        icon: '⚙️',
      },
      {
        id: 4,
        title: 'Remote Monitoring',
        description: 'TCP/IP connectivity enables remote access and control from anywhere',
        icon: '🌐',
      },
      {
        id: 5,
        title: 'Advanced Alarms',
        description: 'Visual and audible alarms alert operators to any deviations or issues',
        icon: '🚨',
      },
      {
        id: 6,
        title: 'Data Export',
        description: 'Export test data in multiple formats for analysis and compliance reporting',
        icon: '💾',
      },
    ],
  },

  // Section 5: Related Products
  relatedProducts: [
    {
      id: 1,
      name: '450L Climatic Test Chamber',
      image: prd1,
      description: 'Mid-capacity chamber for standard product and component testing',
      link: '1',
    },
    {
      id: 2,
      name: '600L Climatic Test Chamber',
      image: prd2,
      description: 'Larger test space for bigger assemblies and multi-unit batches',
      link: '#',
    },
    {
      id: 3,
      name: '1000L Climatic Test Chamber',
      image: prd3,
      description: 'High-capacity chamber built for industrial-scale testing',
      link: '#',
    },
    {
      id: 4,
      name: '1500L Climatic Test Chamber',
      image: prd4,
      description: 'Our largest capacity, for full-scale product and bulk testing',
      link: '#',
    },
  ],

  // Compliance & Standards
  standards: [
    {
      title: 'IEC Standards',
      items: [
        'IEC 60068-2-30: Environmental testing Part 2-30',
        'IEC 60068-2-78: Environmental testing Part 2-78',
        'IEC 60068-2-1: Cold test',
        'IEC 60068-2-2: Dry heat test',
        'IEC 60068-2-14: Change of temperature test',
      ],
    },
    {
      title: 'ISO Standards',
      items: [
        'ISO 9000 Part II Sec. 1 to 4, 1977',
        'ISO 9000 Part IV, 2008',
        'ISO 9000 Part V Sec. 1 & 2, 1981',
        'ISO 9000 Part VI, 1978',
      ],
    },
  ],
};

/* ─────────────────────────────────────────────
   Grain overlay for premium texture
───────────────────────────────────────────── */
function GrainOverlay() {
  return (
    <svg
      className="pointer-events-none fixed inset-0 z-[999] opacity-[0.028] mix-blend-overlay"
      style={{ width: '100vw', height: '100vh' }}
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
            color: dark ? 'var(--color-primary-300)' : 'var(--color-primary-400)',
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
          color: dark ? 'white' : '#0f172a',
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
   Image carousel
   Main image on the left, thumbnails as a vertical
   strip beside it on the right (not below).
───────────────────────────────────────────── */
function ImageCarousel({ images }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = (next) => {
    setDirection(next > current ? 1 : -1);
    setCurrent(next);
  };
  const prev = () => go((current - 1 + images.length) % images.length);
  const next = () => go((current + 1) % images.length);

  const variants = {
    enter: (d) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <div className="flex h-full w-full gap-3 sm:gap-4">
      {/* Main image */}
      <div className="relative min-h-[420px] flex-1 overflow-hidden rounded-3xl border border-slate-100/80 bg-slate-50 shadow-[0_24px_64px_-16px_rgba(0,0,0,0.12)] sm:min-h-[540px]">
        <AnimatePresence custom={direction} mode="wait">
          <motion.img
            key={images[current].id}
            src={images[current].src}
            alt={images[current].alt}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-full bg-white object-contain"
          />
        </AnimatePresence>

        {/* Image title badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/75 backdrop-blur-md border border-white/10">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-semibold text-white tracking-wide">{images[current].title}</span>
        </div>

        {/* Image counter */}
        <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs text-white/80 font-medium tabular-nums">
          {current + 1} / {images.length}
        </div>

        {/* Nav arrows */}
        {[
          { action: prev, icon: <ChevronLeft size={18} />, side: 'left-4' },
          { action: next, icon: <ChevronRight size={18} />, side: 'right-4' },
        ].map(({ action, icon, side }) => (
          <button
            key={side}
            type="button"
            onClick={action}
            className={`absolute ${side} top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-lg hover:bg-cyan-500 hover:text-white transition-all duration-200 hover:scale-110`}
          >
            {icon}
          </button>
        ))}
      </div>

      {/* Thumbnails — vertical strip beside the image */}
      <div className="flex w-16 flex-shrink-0 flex-col gap-2 sm:w-20">
        {images.map((img, i) => (
          <button
            key={img.id}
            type="button"
            onClick={() => go(i)}
            className="relative flex-1 overflow-hidden rounded-xl border transition-all duration-200"
            style={{
              borderColor: i === current ? 'rgb(6 182 212)' : 'rgb(241 245 249)',
              boxShadow: i === current ? '0 0 0 2px rgba(6,182,212,0.25)' : 'none',
            }}
          >
            <img src={img.src} alt={img.alt} className="h-full w-full object-cover" />
            {i === current && (
              <div className="absolute inset-0 bg-cyan-500/10" />
            )}
          </button>
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
        <div className="text-[11px] text-white/50 font-medium uppercase tracking-wider leading-none mb-0.5">{label}</div>
        <div className="text-sm font-bold text-white leading-none">{value}</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Feature card (overview section)
───────────────────────────────────────────── */
function FeatureCard({ icon, title, description, index }) {
  const iconComponents = [Thermometer, Wind, Activity, Gauge, Shield, Layers, Zap, Settings2];
  const Icon = iconComponents[index % iconComponents.length];

  // Alternate between the brand teal/cyan and the secondary navy
  // (--color-secondary-500: #2a56a6) so the four cards read as a
  // deliberate pair-wise rhythm rather than four identical clones.
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
        {/* Hover glow */}
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
  const icons = [Zap, Shield, BarChart3, Thermometer, Activity, Wind, Gauge, Layers];
  const Icon = icons[index % icons.length];

  // 3-color rotation (teal → navy → amber, repeating) so the 6 cards
  // read as two intentional sets of three rather than one flat block
  // of identical cyan icons.
  const palette = [
    { border: 'hover:border-cyan-500/30', accent: 'via-cyan-500/40', iconBg: 'from-cyan-500/20 to-blue-600/20 group-hover:from-cyan-500/30 group-hover:to-blue-600/30 border-cyan-500/20', iconColor: 'text-cyan-400' },
    { border: 'hover:border-[#5b83c9]/40', accent: 'via-[#5b83c9]/40', iconBg: 'from-[#2a56a6]/25 to-[#0b1f4d]/25 group-hover:from-[#2a56a6]/35 group-hover:to-[#0b1f4d]/35 border-[#5b83c9]/25', iconColor: 'text-[#7fa0e0]' },
    { border: 'hover:border-[#f5b800]/30', accent: 'via-[#f5b800]/40', iconBg: 'from-[#f5b800]/20 to-[#b38500]/20 group-hover:from-[#f5b800]/30 group-hover:to-[#b38500]/30 border-[#f5b800]/25', iconColor: 'text-[#ffc91a]' },
  ];
  const c = palette[index % palette.length];

  return (
    <FadeIn delay={index * 0.065} dir="up">
      <div className={`group relative h-full p-8 sm:p-10 rounded-2xl border border-white/8 bg-white/[0.03] hover:bg-white/[0.07] ${c.border} transition-all duration-300 overflow-hidden cursor-default`}>
        {/* Top accent line */}
        <div className={`absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent ${c.accent} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

        <div className={`mb-5 flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br border transition-all duration-300 ${c.iconBg}`}>
          <Icon size={20} className={c.iconColor} />
        </div>
        <h3 className="mb-3 text-xl font-bold tracking-tight text-white">{benefit.title}</h3>
        <p className="text-sm leading-relaxed text-slate-400 group-hover:text-slate-300 transition-colors">{benefit.description}</p>
      </div>
    </FadeIn>
  );
}

/* ─────────────────────────────────────────────
   Controller feature row
───────────────────────────────────────────── */
function ControllerFeature({ feature, index }) {
  const icons = [Monitor, Wifi, BarChart3, Lock, Settings2, Activity, Layers, Zap];
  const Icon = icons[index % icons.length];
  return (
    <FadeIn delay={index * 0.06} dir="right">
      <div className="group flex gap-4 p-4 rounded-xl border border-white/8 bg-white/[0.03] hover:bg-white/[0.07] hover:border-cyan-500/30 transition-all duration-300 cursor-default">
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
          {/* <button
            type="button"
            onClick={() => navigate(product.link)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 group-hover:text-cyan-400 transition-colors"
          >
            Learn More
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1 duration-200" />
          </button> */}
          <Link
            to={product.link}
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 group-hover:text-cyan-400 transition-colors"
          >
            Learn More
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
   Jumps to Overview / Benefits / Specifications /
   Controller / Related Products. Stays fixed to the
   top of the viewport while scrolling.
───────────────────────────────────────────── */
function SectionNav() {
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "benefits", label: "Benefits" },
    { id: "specifications", label: "Specifications" },
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

    // Change color immediately
    setActive(id);

    const section = document.getElementById(id);

    if (section) {
      const y =
        section.getBoundingClientRect().top +
        window.pageYOffset -
        70;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="sticky top-0 z-40 border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-8 overflow-x-auto px-5 scrollbar-none">

        {tabs.map((tab) => (
          <a
            key={tab.id}
            href={`#${tab.id}`}
            onClick={(e) => handleClick(e, tab.id)}
            className={`relative py-5 text-base font-semibold transition-all duration-300 ${
              active === tab.id
                ? "text-cyan-600"
                : "text-black hover:text-cyan-600"
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
  const product = climaticTestChamberProduct;
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${product.title} | SESS Engineering`;
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
      <ScrollProgress />

      {/* ── HERO ─────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden text-white"
        style={{ background: 'var(--gradient-brand)', minHeight: '380px', display: 'flex', alignItems: 'center' }}
      >
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

        {/* Radial vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.25) 100%)' }} />

        <div className="relative w-full px-4 py-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 44 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mx-auto text-center"
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
              className="mb-6 text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-4xl bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-300"
            >
              {product.hero.mainTitle}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="px-4 text-base leading-relaxed text-slate-300 sm:text-lg md:text-lg mb-10"
            >
              {product.hero.subtitle}
            </motion.p>

            {/* Quick stat chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap justify-center gap-3"
            >
              <StatChip icon={Thermometer} label="Temp Range" value="-70°C to +180°C" />
              <StatChip icon={Gauge} label="Humidity" value="10% – 98% RH" />
              <StatChip icon={Shield} label="Standards" value="IEC / ISO / MIL" />
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.04))' }} />
      </section>

      {/* ── SECTION NAV ──────────────────────────── */}
      <SectionNav />

      {/* ── OVERVIEW + IMAGE ─────────────────────── */}
      {/*
        New layout:
        1) Overview (title + description) — full width, on top.
        2) Below it, a 2-column row:
           - Column 1: main image with a vertical thumbnail
             strip beside it (ImageCarousel handles this).
           - Column 2: Key Features.
        Both columns stretch to the same height (items-stretch)
        so they end at the same point regardless of content length.
      */}
      <section id="overview" className="px-5 py-16 bg-white sm:py-20 md:py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          {/* Overview — full width, on top */}
          <FadeIn dir="up" delay={0.05}>
            <div className="w-full mb-10 lg:mb-12">
              <div className="mb-5">
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="block w-5 h-px bg-cyan-500 opacity-70 rounded-full" />
                  <span
                    style={{
                      color: 'var(--color-primary-400)',
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
                    color: '#0f172a',
                    margin: 0,
                  }}
                >
                  {product.title}
                </h2>
                <div className="mt-4 w-12 h-0.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
              </div>

              <p className="mb-4 text-justify text-sm leading-relaxed text-slate-600 sm:text-base">
                {product.description}
              </p>
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
              <div className="flex h-full flex-col rounded-2xl border border-slate-200/80 bg-slate-50/70 p-5 shadow-sm sm:p-6">
                <div className="mb-5">
                  <h3 className="text-lg font-semibold text-slate-900">Key Features</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    Built for reliable and repeatable testing in demanding laboratory conditions.
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
        {/* Ambient */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <div className="relative mx-auto max-w-7xl">
          <SectionHeader eyebrow="Efficiency Benefits" title={product.benefits.title} subtitle={product.benefits.subtitle} dark />
          <div className="grid gap-4 mt-12 sm:grid-cols-2 lg:grid-cols-3 sm:mt-16">
            {product.benefits.benefitsList.map((benefit, i) => (
              <BenefitCard key={benefit.id} benefit={benefit} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SPECIFICATIONS ───────────────────────── */}
      <section id="specifications" className="px-5 py-16 bg-white sm:py-20 md:py-24 sm:px-6 lg:px-8">
        <div className="mx-auto w-[88vw] max-w-[1550px]">
          <SectionHeader
            eyebrow="Technical Data"
            title={product.specifications.title}
            subtitle="Comprehensive technical details of your testing solution"
          />

          {product.specifications.isTable && (
            <FadeIn dir="up" delay={0.1}>
              <div className="spec-table-scroll mt-12 sm:mt-16 max-h-[600px] overflow-x-auto overflow-y-auto border border-slate-200 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)]">
                <table className="w-full border-collapse bg-white text-xs md:text-sm">
                  <thead>
                    <tr style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }} className="text-white">
                      <th
                        className="sticky top-0 left-0 z-30 border-b border-r border-slate-700 px-4 py-3 text-left font-bold min-w-[160px]"
                        style={{ background: '#0f172a' }}
                      >
                        Specification
                      </th>
                      <th className="sticky top-0 z-20 border-b border-slate-700 px-3 py-3 text-center font-bold min-w-14" style={{ background: '#0f172a' }}>Unit</th>
                      {product.specifications.models.map((model, i) => (
                        <th key={i} className="sticky top-0 z-20 border-b border-slate-700 px-3 py-3 text-center font-bold text-xs min-w-[100px] whitespace-nowrap" style={{ background: '#0f172a' }}>
                          {model}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {product.specifications.specs.map((category) => (
                      <React.Fragment key={category.category}>
                        <tr className="bg-slate-800 text-white">
                          <td colSpan={product.specifications.models.length + 2} className="px-5 py-2.5 font-bold text-sm border-b border-slate-700">
                            {category.category}
                          </td>
                        </tr>
                        {category.items.map((item, itemIdx) => {
                          const rowBg = itemIdx % 2 === 0 ? '#ffffff' : '#f8fafc';
                          const rowBgClass = itemIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/70';

                          return (
                            <tr
                              key={`${category.category}-${itemIdx}`}
                              className={`transition-colors ${rowBgClass} hover:bg-cyan-50/50`}
                            >
                              <td
                                className="sticky left-0 z-10 border-b border-r border-slate-200 px-4 py-2.5 font-bold text-slate-800 text-xs align-top"
                                style={{ background: rowBg }}
                              >
                                {item.label}
                              </td>
                              <td className="border-b border-slate-100 px-3 py-2.5 text-center text-slate-500 text-xs font-semibold align-top">{item.unit || ''}</td>
                              {product.specifications.models.map((model, modelIdx) => {
                                const val = item.values ? item.values[modelIdx] : '';
                                return (
                                  <td key={`${item.label}-${modelIdx}`} className="border-b border-slate-100 px-3 py-2.5 text-center text-slate-700 font-medium align-top min-w-[100px] text-xs">
                                    {val || '—'}
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 space-y-2 text-xs text-slate-500 border-t border-slate-100 pt-6 max-w-4xl">
                {[
                  'Upon customer request, customized sizes are also available.',
                  'Low GWP refrigerants of R449a, R448a, and R508B are available upon request.',
                  'The performance data refer to an operating room (ambient) temperature of +26°C, 415 V/50 Hz nominal voltage, without test specimen and without accessories.',
                  'Sound Pressure Level: Using a calibrated instrument, the weighted sound pressure level was measured in free-field environments at a height of 1 meter from the floor and a distance of 1 meter from the equipment surface.',
                ].map((note, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-cyan-500 mt-0.5"><CheckCircle2 size={12} /></span>
                    <p><strong>(*)</strong> {note}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          )}

          {/* Standards */}
          {product.standards?.length > 0 && (
            <div className="pt-14 mt-14 border-t border-slate-100">
              <SectionHeader eyebrow="Compliance" title="Standards Supported" />
              <div className="grid gap-5 mt-10 md:grid-cols-2">
                {product.standards.map((standard, i) => (
                  <FadeIn key={standard.title} delay={i * 0.1} dir="up">
                    <div className="group h-full p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-slate-900 hover:border-cyan-500/30 transition-all duration-300">
                      <h3 className="mb-4 text-lg font-bold text-slate-900 group-hover:text-white transition-colors">{standard.title}</h3>
                      <ul className="space-y-2.5">
                        {standard.items.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-slate-600 group-hover:text-slate-300 transition-colors">
                            <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0 text-cyan-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── CONTROLLER ───────────────────────────── */}
      <section
        id="controller"
        className="relative px-5 py-16 sm:py-20 md:py-24 sm:px-6 lg:px-8 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl">
          <SectionHeader eyebrow="Controller System" title={product.controller.title} subtitle={product.controller.subtitle} dark />

          <div className="grid items-center gap-12 mt-12 lg:grid-cols-2 sm:mt-16">
            <FadeIn dir="left">
              <div className="relative overflow-hidden border border-white/100 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.5)]">
                <img
                  src={product.controller.image}
                  alt="Touchscreen Controller"
                  className="object-cover w-full h-72 sm:h-96"
                />
                {/* Glass overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-slate-900/80 backdrop-blur-md border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-cyan-500/20 border border-cyan-500/30">
                      <Monitor size={16} className="text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-white leading-none mb-0.5">Intuitive Design</p>
                      <p className="text-xs text-slate-400">Easy to use interface</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <div className="grid gap-4 lg:grid-cols-2">
              {product.controller.features.map((feature, i) => (
                <ControllerFeature key={feature.id} feature={feature} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── RELATED PRODUCTS ─────────────────────── */}
      <section id="related-products" className="px-5 py-16 bg-white sm:py-20 md:py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="More Solutions"
            title="Related Products"
            subtitle="Explore our complete range of testing and conditioning solutions"
          />
          <div className="grid gap-6 mt-12 sm:grid-cols-2 lg:grid-cols-4 sm:mt-16">
            {product.relatedProducts.map((rp, i) => (
              <RelatedCard key={rp.id} product={rp} index={i} />
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}

export default ProductDetail;