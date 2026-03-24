import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import TestimonialBg from '../assets/clients/home_services_bg.jpg';

const testimonials = [
  {
    name: 'Thanigaivel Adhikesavan',
    role: 'QA Engineer',
    text: 'Excellent technical knowledge and outstanding service. The team resolved our chamber calibration issues within hours.',
    avatar: 'TA',
    color: '#7c3aed',
  },
  {
    name: 'Vetrivel K',
    role: 'Lab Manager',
    text: 'People are very competent to resolve all types of issues in environment chambers. Very committed.',
    avatar: 'VK',
    color: '#0ea5e9',
  },
  {
    name: 'Srini Vashan',
    role: 'R&D Director',
    text: 'Good manufacturer for climatic chambers and service support is exceptional.',
    avatar: 'SV',
    color: '#10b981',
  },
  {
    name: 'Chetan Anand',
    role: 'Testing Specialist',
    text: 'Performance and quality is excellent. Service support is amazing.',
    avatar: 'CA',
    color: '#f59e0b',
  },
  {
    name: 'Priya Ramesh',
    role: 'Product Engineer',
    text: 'Delivered precise results. Zero downtime in 18 months.',
    avatar: 'PR',
    color: '#ec4899',
  },
  {
    name: 'Arun Krishnamurthy',
    role: 'Reliability Engineer',
    text: 'Outstanding build quality and exceptional after-sales support.',
    avatar: 'AK',
    color: '#14b8a6',
  },
  {
    name: 'Deepika Subramaniam',
    role: 'Quality Manager',
    text: 'Best-in-class temperature uniformity across entire test volume.',
    avatar: 'DS',
    color: '#f97316',
  },
  {
    name: 'Rajesh Pandian',
    role: 'Senior Technologist',
    text: 'Entire experience was seamless. Equipment exceeds standards.',
    avatar: 'RP',
    color: '#6366f1',
  },
  {
    name: 'Meena Venkatesh',
    role: 'Process Engineer',
    text: 'Humidity precision is remarkable. Very responsive team.',
    avatar: 'MV',
    color: '#84cc16',
  },
  {
    name: 'Karthik Balaji',
    role: 'CTO',
    text: 'Reliability, precision, and unmatched service define this company.',
    avatar: 'KB',
    color: '#e11d48',
  },
];

const row1 = testimonials;
const row2 = [...testimonials].reverse();

/* ================= CARD ================= */
const TestimonialCard = ({ t }) => (
  <div
    className="flex-shrink-0 w-60 mx-2 rounded-2xl p-5 flex flex-col"
    style={{
      background: 'rgba(15, 15, 25, 0.75)',
      backdropFilter: 'blur(14px)',
      border: '1px solid rgba(255,255,255,0.08)',
      transition: 'all 0.3s ease',
    }}
  >
    <p className="text-sm text-gray-300 mb-4 italic leading-relaxed">
      "{t.text}"
    </p>

    <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/10">
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold"
        style={{
          background: `linear-gradient(135deg, ${t.color}, ${t.color}88)`,
        }}
      >
        {t.avatar}
      </div>
      <div>
        <div className="text-sm text-white font-semibold">{t.name}</div>
        <div className="text-xs opacity-70" style={{ color: t.color }}>
          {t.role}
        </div>
      </div>
    </div>
  </div>
);

/* ================= MARQUEE ================= */
const MarqueeRow = ({ items, direction = 'left' }) => {
  const rowRef = useRef(null);

  // 🔥 TRUE INFINITE LOOP
  const loopItems = [...items, ...items, ...items, ...items];

  const animName = direction === 'left' ? 'marquee-left' : 'marquee-right';

  return (
    <div
      className="overflow-hidden w-full"
      style={{
        maskImage:
          'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
      }}
      onMouseEnter={() => {
        if (rowRef.current) rowRef.current.style.animationPlayState = 'paused';
      }}
      onMouseLeave={() => {
        if (rowRef.current) rowRef.current.style.animationPlayState = 'running';
      }}
    >
      <div
        ref={rowRef}
        className="flex"
        style={{
          width: 'max-content',
          animation: `${animName} 40s linear infinite`,
        }}
      >
        {loopItems.map((t, i) => (
          <TestimonialCard key={i} t={t} />
        ))}
      </div>
    </div>
  );
};

/* ================= MAIN ================= */
const TestimonialsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <section
      ref={ref}
      className="relative py-24 overflow-hidden"
      style={{
        backgroundImage: `url(${TestimonialBg})`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80" />

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <h2 className="text-4xl text-white font-bold">
            What Our Clients Say
          </h2>
        </motion.div>

        {/* Row 1 */}
        <div className="mb-6">
          <MarqueeRow items={row1} direction="left" />
        </div>

        {/* Row 2 */}
        <MarqueeRow items={row2} direction="right" />
      </div>

      {/* KEYFRAMES */}
      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes marquee-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;