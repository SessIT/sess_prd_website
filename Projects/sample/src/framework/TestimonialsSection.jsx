import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// ── Only 5 review records ──────────────────────────────────────────────────
const testimonials = [
  {
    name: 'Thanigaivel Adhikesavan',
    role: 'QA Engineer',
    text: 'Excellent technical knowledge and outstanding service. The team resolved our chamber calibration issues within hours.',
    avatar: 'TA',
    color: 'var(--color-primary-400)',
  },
  {
    name: 'Vetrivel K',
    role: 'Lab Manager',
    text: 'People are very competent to resolve all types of issues in environment chambers. Very committed.',
    avatar: 'VK',
    color: 'var(--color-primary-400)',
  },
  {
    name: 'Srini Vashan',
    role: 'R&D Director',
    text: 'Good manufacturer for climatic chambers and service support is exceptional.',
    avatar: 'SV',
    color: 'var(--color-primary-400)',
  },
  {
    name: 'Chetan Anand',
    role: 'Testing Specialist',
    text: 'Performance and quality is excellent. Service support is amazing.',
    avatar: 'CA',
    color: 'var(--color-primary-400)',
  },
  {
    name: 'Priya Ramesh',
    role: 'Product Engineer',
    text: 'Delivered precise results. Zero downtime in 18 months of continuous operation.',
    avatar: 'PR',
    color: 'var(--color-primary-400)',
  },
];

/* ── Card ─────────────────────────────────────────────────────────────────── */
const TestimonialCard = ({ t }) => (
  <div
    className="flex-shrink-0 w-72 mx-3 rounded-2xl p-6 flex flex-col"
    style={{
      background: 'rgba(15, 15, 25, 0.78)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: '1px solid rgba(255,255,255,0.09)',
    }}
  >
    {/* Stars */}
    {/* <div className="flex gap-0.5 mb-3">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill={t.color}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div> */}

    {/* Quote */}
    <p className="text-sm text-gray-300 leading-relaxed italic flex-1">
      "{t.text}"
    </p>

    {/* Author */}
    <div className="flex items-center gap-3 mt-5 pt-4 border-t border-white/10">
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
        style={{
          background: `linear-gradient(135deg, ${t.color}, ${t.color}88)`,
        }}
      >
        {t.avatar}
      </div>
      <div>
        <div className="text-sm text-white font-semibold leading-tight">{t.name}</div>
        <div className="text-xs mt-0.5 font-medium" style={{ color: t.color }}>
          {t.role}
        </div>
      </div>
    </div>
  </div>
);

/* ── Single Marquee Row (right → left only) ──────────────────────────────── */
const MarqueeRow = ({ items }) => {
  const trackRef = useRef(null);

  // Duplicate enough times for a seamless infinite loop
  const looped = [...items, ...items, ...items, ...items];

  return (
    <div
      className="overflow-hidden w-full"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      }}
      onMouseEnter={() => {
        if (trackRef.current) trackRef.current.style.animationPlayState = 'paused';
      }}
      onMouseLeave={() => {
        if (trackRef.current) trackRef.current.style.animationPlayState = 'running';
      }}
    >
      <div
        ref={trackRef}
        className="flex"
        style={{
          width: 'max-content',
          animation: 'marquee-ltr 35s linear infinite',
        }}
      >
        {looped.map((t, i) => (
          <TestimonialCard key={i} t={t} />
        ))}
      </div>
    </div>
  );
};

/* ── Main Section ────────────────────────────────────────────────────────── */
const TestimonialsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      ref={ref}
      className="relative py-24 overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, var(--color-secondary-950) 0%, var(--color-primary-900) 55%, var(--color-secondary-900) 100%)',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10">

        {/* Header — padded container so the heading never touches the viewport
            edges; the marquee below stays intentionally full-bleed */}
        <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6 }}
                  style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}
                >
                  <span style={{
                    display: 'block',
                    color: 'var(--color-primary-500)',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 'var(--font-weight-semibold)',
                    fontSize: 'var(--text-sm)',
                    letterSpacing: 'var(--tracking-wider)',
                    textTransform: 'uppercase',
                    marginBottom: 'var(--space-2)',
                  }}>
                    Client Reviews
                  </span>
                  <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 'var(--font-weight-bold)',
                    fontSize: 'clamp(var(--text-2xl), 3vw, var(--text-2xl))',
                    lineHeight: 'var(--leading-tight)',
                    color: 'var(--color-neutral-0)',
                    margin: 0,
                  }}>
                    What Our Clients Say
                  </h2>
                </motion.div>
        </div>

        {/* Single scrolling row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <MarqueeRow items={testimonials} />
        </motion.div>

      </div>

      {/* Keyframe: right → left only */}
      <style>{`
        @keyframes marquee-ltr {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;