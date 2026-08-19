import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import {
  FaHandshake, FaHeadset, FaRobot, FaChalkboardTeacher,
  FaLaptopCode, FaTools, FaMicroscope, FaUsers,
} from 'react-icons/fa';
import { ArrowRight } from 'lucide-react';
import ServicesBg from '../assets/clients/home_services_bg.jpg';

const services = [
  { icon: FaHandshake,        title: 'Customer Support'   },
  { icon: FaHeadset,          title: '24/7 Services'      },
  { icon: FaRobot,            title: 'Emergency'          },
  { icon: FaChalkboardTeacher,title: 'Training'           },
  { icon: FaLaptopCode,       title: 'Software Updation'  },
  { icon: FaTools,            title: 'Machine Support'    },
  { icon: FaMicroscope,       title: 'Testing Support'    },
  { icon: FaUsers,            title: 'Installation'       },
];

const ServicesSection = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const isDark = theme === 'dark';

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  /* Overlay opacity — slightly lighter in light mode so the bg image breathes */
  const overlayBg = isDark ? 'rgba(0, 0, 0, 0.66)' : 'rgba(0, 0, 0, 0.5)';

  return (
    <section
      ref={ref}
      className="bg-fixed-desktop"
      style={{
        position: 'relative',
        padding: 'var(--space-20) 0',
        backgroundImage: `url(${ServicesBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: overlayBg,
        transition: 'background var(--transition-slow)',
      }} />

      <div className="container mx-auto px-4" style={{ position: 'relative', zIndex: 1 }}>
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
            Our Services
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 'var(--font-weight-bold)',
            fontSize: 'clamp(var(--text-2xl), 3vw, var(--text-2xl))',
            lineHeight: 'var(--leading-tight)',
            color: 'var(--color-neutral-0)',
            margin: 0,
          }}>
            What We Offer
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: 'var(--space-6)' }}>
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group"
                style={{ textAlign: 'center', cursor: 'pointer' }}
              >
                <div
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    borderRadius: 'var(--border-radius-xl)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    padding: 'var(--space-6)',
                    transition: 'background var(--transition-base), border-color var(--transition-base), box-shadow var(--transition-base)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background    = 'rgba(255,255,255,0.15)';
                    e.currentTarget.style.borderColor   = 'rgba(0,179,179,0.40)';
                    e.currentTarget.style.boxShadow     = 'var(--shadow-brand-md)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background    = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.borderColor   = 'rgba(255,255,255,0.12)';
                    e.currentTarget.style.boxShadow     = 'none';
                  }}
                >
                  {/* Icon */}
                  <div style={{ marginBottom: 'var(--space-4)' }}>
                    <Icon
                      style={{
                        fontSize: '2rem',
                        color: 'var(--color-primary-400)',
                        transition: 'transform var(--transition-base)',
                        display: 'inline-block',
                      }}
                      className="group-hover:scale-110"
                    />
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 'var(--font-weight-medium)',
                    fontSize: 'var(--text-base)',
                    color: 'var(--color-neutral-0)',
                    margin: '0 0 var(--space-2)',
                  }}>
                    {service.title}
                  </h3>                  

                  {/* Animated underline */}
                  {/* <div
                    className="group-hover:w-12"
                    style={{
                      height: '2px',
                      width: 0,
                      background: 'var(--color-primary-400)',
                      margin: '0 auto',
                      transition: 'width var(--transition-slow)',
                      borderRadius: 'var(--border-radius-full)',
                    }}
                  /> */}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{ textAlign: 'center', marginTop: 'var(--space-12)' }}
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: 'var(--shadow-brand-lg)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/services')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: 'var(--space-3) var(--space-8)',
              background: 'linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-primary-600) 100%)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--border-radius-lg)',
              fontFamily: 'var(--font-body)',
              fontWeight: 'var(--font-weight-semibold)',
              fontSize: 'var(--text-base)',
              cursor: 'pointer',
              transition: 'all var(--transition-base)',
              boxShadow: 'var(--shadow-brand-md)',
            }}
          >
            Explore All Services
            <ArrowRight style={{ width: '1.25rem', height: '1.25rem' }} />
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
};

export default ServicesSection;