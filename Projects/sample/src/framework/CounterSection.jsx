import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { useTheme } from '../context/ThemeContext';
import { FaHeart, FaLeaf, FaSeedling, FaPagelines } from 'react-icons/fa';

const counters = [
  { icon: FaHeart, value: 1008, label: 'Happy Clients', color: 'text-red-500' },
  { icon: FaLeaf, value: 28, label: 'Ongoing Projects', color: 'text-green-500' },
  { icon: FaSeedling, value: 1052, label: 'Work Completed', color: 'text-pink-500' },
  { icon: FaPagelines, value: 1080, label: 'Projects', color: 'text-green-700' },
];

const CounterSection = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      ref={ref}
      className="relative py-20 overflow-hidden"
      style={{
        backgroundColor: isDark ? '#050505' : '#f9fafb',
      }}
    >
      {/* ================= PREMIUM BACKGROUND ================= */}

      {/* Aurora Gradient Layer */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            width: '200%',
            height: '200%',
            background: isDark
              ? 'radial-gradient(circle at 30% 30%, rgba(0,255,255,0.15), transparent 40%), radial-gradient(circle at 70% 70%, rgba(255,0,150,0.12), transparent 40%)'
              : 'radial-gradient(circle at 30% 30%, rgba(0,150,255,0.12), transparent 40%), radial-gradient(circle at 70% 70%, rgba(255,0,120,0.10), transparent 40%)',
            backgroundSize: '200% 200%',
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* Floating Light Waves */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, 100, -100, 0],
              y: [0, -50, 50, 0],
            }}
            transition={{
              duration: 12 + i * 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: isDark
                ? 'rgba(0,255,255,0.08)'
                : 'rgba(0,150,255,0.06)',
              filter: 'blur(100px)',
              top: `${20 + i * 20}%`,
              left: `${10 + i * 25}%`,
            }}
          />
        ))}
      </div>

      {/* ================= CONTENT ================= */}

      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">        
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
            Projects and Testimonial
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 'var(--font-weight-bold)',
            fontSize: 'clamp(var(--text-2xl), 3vw, var(--text-2xl))',
            lineHeight: 'var(--leading-tight)',
            color: isDark ? 'var(--text-heading)' : 'var(--color-neutral-900)',
            margin: 0,
          }}>
            Our Achievements
          </h2>
        </motion.div>

        {/* Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {counters.map((counter, index) => {
            const Icon = counter.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                }}
                className="relative backdrop-blur-xl bg-white/60 dark:bg-white/5 border border-white/20 rounded-xl p-8 text-center transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,150,255,0.2)]"
              >
                <Icon className={`text-2xl ${counter.color} mx-auto mb-4`} />

                <div className="text-xl text-gray-900 dark:text-white mb-2">
                  {inView && (
                    <CountUp end={counter.value} duration={2.5} separator="," />
                  )}
                </div>

                <span className="text-gray-600 text-sm dark:text-gray-300">
                  {counter.label}
                </span>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default CounterSection;