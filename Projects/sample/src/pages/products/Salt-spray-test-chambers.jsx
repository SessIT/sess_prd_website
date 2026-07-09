import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {ArrowRight,ChevronLeft, ChevronRight, CheckCircle2,  Layers, Gauge, Zap, Shield,  Thermometer, Wind,  Activity,  Settings2,  Monitor, Wifi,Lock, BarChart3,ChevronDown,} from 'lucide-react';

// Product Images
import prd1 from '../../assets/product/Climatic Test Chamber.png';
import prd2 from '../../assets/product/CO2 Test Chamber.png';
import prd3 from '../../assets/product/Environmetal.png';
import prd4 from '../../assets/product/Flame-Proof Hot Air Oven.png';
import saltSprayImage from '../../assets/product/Salt Spray.png';

// Product Data
const SaltSprayTestChamberProduct = {
  id: 'salt-spray-test-chamber',
  title: 'Salt Spray Test Chamber',
  subtitle: 'For Corrosion Resistance Testing',
  description: 'The Salt Spray Test Chamber is designed for rigorous corrosion testing under controlled environmental conditions. It provides accurate simulation of marine and industrial atmospheric exposure, ensuring reliable results for material evaluation.',

  // Hero Section
  hero: {
    backgroundGradient: 'linear-gradient(135deg, rgb(34, 229, 245, 0.95) 0%, rgb(59, 91, 255, 0.95) 100%)',
    tagline: 'Precision-Engineered for Performance',
    mainTitle: 'Salt Spray Test Chamber',
    subtitle: 'For Corrosion Resistance Testing',
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
      'The Salt Spray Test Chamber is specifically designed to simulate highly corrosive environments by generating a controlled and uniform salt fog atmosphere for accelerated corrosion testing.',
      'It is ideal for evaluating the corrosion resistance and durability of metals, coatings, paints, electroplated components, fasteners, and surface-treated materials under harsh environmental conditions.',
      'Built with corrosion-resistant construction and an intelligent control system, the chamber ensures reliable, repeatable, and long-duration testing while complying with international corrosion testing standards.',
    ],
    keyFeatures: [
      {
        title: 'Temperature Range',
        description: 'Ambient +5°C to 55°C with precise temperature control for stable corrosion testing.',
      },
      {
        title: 'Uniform Salt Fog Distribution',
        description: 'Advanced atomization system ensures consistent and uniform salt spray throughout the test chamber.',
      },
      {
        title: 'Programmable Controller',
        description: 'Intelligent microprocessor-based controller with programmable test cycles and real-time parameter monitoring.',
      },
      {
        title: 'Safety Features',
        description: 'Equipped with low water level protection, over-temperature protection, and alarm indication systems for safe operation.',
      },

    ],
  },

  // Section 2: Benefits Section
  benefits: {
  title: 'With This Salt Spray Test Chamber, You Can Improve Product Reliability and Reduce Corrosion Failures',
  subtitle: 'Accelerated corrosion testing for better product quality and durability',

  benefitsList: [
    {
      id: 1,
      title: 'Accelerated Corrosion Testing',
      description: 'Simulates years of natural corrosion exposure in a significantly shorter testing period.',
    },
    {
      id: 2,
      title: 'Improved Product Reliability',
      description: 'Identifies potential corrosion issues early, helping manufacturers improve product performance and service life.',
    },
    {
      id: 3,
      title: 'Coating Performance Validation',
      description: 'Evaluates the effectiveness of paints, coatings, plating, and surface treatments under corrosive conditions.',
    },
    {
      id: 4,
      title: 'Reduced Product Failures',
      description: 'Detects material weaknesses before products reach the market, minimizing warranty claims and field failures.',
    },
    {
      id: 5,
      title: 'Standards Compliance',
      description: 'Supports testing according to international corrosion standards such as ASTM, ISO, IEC, and JIS.',
    },
    {
      id: 6,
      title: 'Repeatable and Reliable Results',
      description: 'Provides controlled and uniform salt fog conditions for accurate, consistent, and repeatable testing.',
    },
  ],
},
  // Section 3: Technical Specifications - Models Complete Table
  specifications: {
  title: 'Technical Specifications',
  isTable: true,

  models: [
    '120L',
    '270L',
    '450L',
    '800L',
    '1000L',
    'Custom Sizes',
  ],

  specs: [
    {
      category: 'CHAMBER SPECIFICATIONS',
      items: [
        {
          label: 'Chamber Capacity',
          unit: 'L',
          values: ['120', '270', '450', '800', '1000', 'Custom'],
        },
        {
          label: 'Test Temperature Range',
          unit: '°C',
          values: [
            'Ambient +5 to 55',
            'Ambient +5 to 55',
            'Ambient +5 to 55',
            'Ambient +5 to 55',
            'Ambient +5 to 55',
            'As Required',
          ],
        },
        {
          label: 'Temperature Uniformity',
          unit: '°C',
          values: [
            '±2',
            '±2',
            '±2',
            '±2',
            '±2',
            'As Required',
          ],
        },
      ],
    },

    {
      category: 'SALT SPRAY SYSTEM',
      items: [
        {
          label: 'Salt Solution Concentration',
          unit: '%',
          values: ['5', '5', '5', '5', '5', 'As Required'],
        },
        {
          label: 'Spray Collection Rate',
          unit: 'ml/80cm²/hr',
          values: [
            '1-2',
            '1-2',
            '1-2',
            '1-2',
            '1-2',
            'As Required',
          ],
        },
        {
          label: 'Salt Fog Distribution',
          unit: '',
          values: [
            'Uniform',
            'Uniform',
            'Uniform',
            'Uniform',
            'Uniform',
            'Uniform',
          ],
        },
      ],
    },

    {
      category: 'CONTROL SYSTEM',
      items: [
        {
          label: 'Controller Type',
          unit: '',
          values: [
            'Digital PID',
            'Digital PID',
            'Digital PID',
            'Digital PID',
            'Digital PID',
            'Custom',
          ],
        },
        {
          label: 'Display',
          unit: '',
          values: [
            'Touchscreen',
            'Touchscreen',
            'Touchscreen',
            'Touchscreen',
            'Touchscreen',
            'Touchscreen',
          ],
        },
        {
          label: 'Programming Capability',
          unit: '',
          values: [
            'Available',
            'Available',
            'Available',
            'Available',
            'Available',
            'Available',
          ],
        },
      ],
    },

    {
      category: 'POWER REQUIREMENTS',
      items: [
        {
          label: 'Voltage Rating',
          unit: 'V',
          values: [
            '230V AC',
            '230V AC',
            '415V AC',
            '415V AC',
            '415V AC',
            'As Required',
          ],
        },
        {
          label: 'Frequency',
          unit: 'Hz',
          values: ['50', '50', '50', '50', '50', '50'],
        },
      ],
    },

    {
      category: 'TEST STANDARDS',
      items: [
        {
          label: 'Compliance Standards',
          unit: '',
          values: [
            'ASTM B117, ISO 9227, IEC 60068',
            'ASTM B117, ISO 9227, IEC 60068',
            'ASTM B117, ISO 9227, IEC 60068',
            'ASTM B117, ISO 9227, IEC 60068',
            'ASTM B117, ISO 9227, IEC 60068',
            'As Required',
          ],
        },
      ],
    },
  ],
},

  // Section 4: Controller Features
  controller: {
  title: 'Touchscreen Intelligent Controller',
  subtitle: 'Advanced control system for precise corrosion testing',
  image:prd1,

  features: [
    {
      id: 1,
      title: 'Intuitive Touchscreen Interface',
      description:
        'User-friendly touchscreen interface enables quick setup, operation, and monitoring of all test parameters.',
      icon: '📱',
    },
    {
      id: 2,
      title: 'Programmable Test Cycles',
      description:
        'Create and store customized continuous or cyclic salt spray test programs for repeatable and automated testing.',
      icon: '⚙️',
    },
    {
      id: 3,
      title: 'Real-Time Monitoring',
      description:
        'Continuously monitors chamber temperature, spray conditions, and operating status with high accuracy.',
      icon: '📊',
    },
    {
      id: 4,
      title: 'Data Logging & Export',
      description:
        'Records test parameters and historical data for analysis, documentation, and quality reporting.',
      icon: '💾',
    },
    {
      id: 5,
      title: 'Alarm & Safety Management',
      description:
        'Provides visual and audible alarms for low water level, over-temperature conditions, and system abnormalities.',
      icon: '🚨',
    },
    {
      id: 6,
      title: 'Remote Connectivity',
      description:
        'Supports communication interfaces for remote monitoring, data access, and efficient test management.',
      icon: '🌐',
    },
  ],
},

  // Section 5: Related Products
  relatedProducts: [
    {
      id: 1,
      name: '32,000L Packaging Simulation Chamber',
      image: prd1,
      description: 'Large-scale chamber for packaging testing and simulation',
      link: '#',
    },
    {
      id: 2,
      name: '4500L Conditioning Chamber for Food Process',
      image: prd2,
      description: 'Specialized chamber for food industry testing and conditioning',
      link: '#',
    },
    {
      id: 3,
      name: '2340L Television Testing Climatic Chamber',
      image: prd3,
      description: 'Optimized for electronics and television product testing',
      link: '#',
    },
    {
      id: 4,
      name: 'High-Temperature N2 Purging Test Chamber',
      image: prd4,
      description: 'Advanced nitrogen purging system for extreme temperature testing',
      link: '#',
    },
  ],

  // Compliance & Standards
  standards: [
  {
    title: 'IEC Standards',
    items: [
      'IEC 60068-2-11: Environmental Testing – Salt Mist Test',
      'IEC 60068-2-52: Environmental Testing – Cyclic Salt Mist Test',
      'IEC 60068 Series: Environmental Testing Procedures',
      'IEC 60529: Degrees of Protection Provided by Enclosures (IP Code)',
    ],
  },
  {
    title: 'International Standards',
    items: [
      'ASTM B117: Standard Practice for Operating Salt Spray (Fog) Apparatus',
      'ISO 9227: Corrosion Tests in Artificial Atmospheres – Salt Spray Tests',
      'JIS Z 2371: Methods of Salt Spray Testing',
      'DIN EN ISO 9227: Corrosion Tests in Artificial Atmospheres',
      'MIL-STD-810H: Environmental Engineering Considerations and Laboratory Tests',
    ],
  },
]
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
          {eyebrow}
        </span>
        <span className="block w-5 h-px bg-cyan-500 opacity-70 rounded-full" />
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
  return (
    <FadeIn delay={index * 0.06} dir="up" className="h-full">
      <div className="group relative p-5 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-900 hover:border-cyan-500/40 transition-all duration-300 overflow-hidden h-full">
        {/* Hover glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 transition-all duration-300 rounded-xl" />
        <div className="relative">
          <div className="mb-3 flex items-center justify-center w-10 h-10 rounded-lg bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors">
            <Icon size={18} className="text-cyan-500 group-hover:text-cyan-400" />
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
  return (
    <FadeIn delay={index * 0.065} dir="up">
      <div className="group relative h-full p-8 sm:p-10 rounded-2xl border border-white/8 bg-white/[0.03] hover:bg-white/[0.07] hover:border-cyan-500/30 transition-all duration-300 overflow-hidden cursor-default">
        {/* Top accent line */}
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="mb-5 flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/20 group-hover:from-cyan-500/30 group-hover:to-blue-600/30 transition-all duration-300">
          <Icon size={20} className="text-cyan-400" />
        </div>
        <h3 className="mb-3 text-lg text-white font-sans-serif">{benefit.title}</h3>
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
        <div className="overflow-hidden bg-white h-44 relative">
          <img
            src={product.image}
            alt={product.name}
            className="objecover w-full h-full transition-transform duration-500 group-hover:scale-105"
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
          <button
            type="button"
            onClick={() => navigate(product.link)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 group-hover:text-cyan-400 transition-colors"
          >
            Learn More
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1 duration-200" />
          </button>
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
function SaltSprayProduct() {
  const product = SaltSprayTestChamberProduct;
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
        Layout:
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
          <div className="space-y-10 lg:space-y-12">

            {/* Overview — full width, on top */}
            <FadeIn dir="up" delay={0.05}>
              <div className="w-full">
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
                      Built for reliable and repeatable corrosion testing in demanding laboratory conditions.
                    </p>
                  </div>
                  <div className="grid flex-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    {product.productDetails.keyFeatures.map((feature, i) => (
                      <FeatureCard key={i} index={i} {...feature} />
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

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
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Technical Data"
            title={product.specifications.title}
            subtitle="Comprehensive technical details of your testing solution"
          />

          {product.specifications.isTable && (
            <FadeIn dir="up" delay={0.1}>
              <div className="mt-12 overflow-x-auto sm:mt-16 rounded-2xl border border-slate-200 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] overflow-hidden">
                <table className="w-full border-collapse bg-white text-xs md:text-sm">
                  <thead>
                    <tr style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }} className="text-white sticky top-0">
                      <th className="border-b border-slate-700 px-4 py-3 text-left font-bold min-w-32">Specification</th>
                      <th className="border-b border-slate-700 px-3 py-3 text-center font-bold min-w-12">Unit</th>
                      {product.specifications.models.map((model, i) => (
                        <th key={i} className="border-b border-slate-700 px-2 py-3 text-center font-bold text-xs min-w-20 whitespace-nowrap">
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
                        {category.items.map((item, itemIdx) => (
                          <tr
                            key={`${category.category}-${itemIdx}`}
                            className={`transition-colors ${itemIdx % 2 === 0 ? 'bg-white hover:bg-cyan-50/50' : 'bg-slate-50/70 hover:bg-cyan-50/50'}`}
                          >
                            <td className="border-b border-slate-100 px-4 py-2.5 font-bold text-slate-800 text-xs min-w-32 align-top">{item.label}</td>
                            <td className="border-b border-slate-100 px-3 py-2.5 text-center text-slate-500 text-xs font-semibold min-w-12 align-top">{item.unit || ''}</td>
                            {product.specifications.models.map((model, modelIdx) => {
                              const val = item.values ? item.values[modelIdx] : '';
                              return (
                                <td key={`${item.label}-${modelIdx}`} className="border-b border-slate-100 px-2 py-2.5 text-center text-slate-700 font-medium align-top min-w-20 break-words text-xs">
                                  {val || '—'}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
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
              <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.5)]">
                <img
                  src={product.controller.image}
                  alt="Touchscreen Controller"
                  className="objecover w-full h-72 sm:h-96"
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

            <div className="space-y-4">
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

export default SaltSprayProduct;