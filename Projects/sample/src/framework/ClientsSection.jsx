import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

import Client1  from '../assets/clients/client9.jpg';
import Client2  from '../assets/clients/client10.jpg';
import Client3  from '../assets/clients/client11.jpg';
import Client4  from '../assets/clients/client13.jpg';
import Client5  from '../assets/clients/client12.jpg';
import Client6  from '../assets/clients/client14.jpg';
import Client7  from '../assets/clients/client15.jpg';
import Client8  from '../assets/clients/client16.jpg';
import Client9  from '../assets/clients/client17.jpg';
import Client10 from '../assets/clients/client18.jpg';
import Client11 from '../assets/clients/client19.jpg';
import Client12 from '../assets/clients/client20.jpg';
import Client13 from '../assets/clients/client21.jpg';
import Client14 from '../assets/clients/client22.jpg';
import Client15 from '../assets/clients/client23.jpg';
import Client16 from '../assets/clients/client24.jpg';
import Client17 from '../assets/clients/client25.jpg';
import Client18 from '../assets/clients/client26.jpg';
import Client19 from '../assets/clients/client27.jpg';
import Client20 from '../assets/clients/client28.jpg';
import Client21 from '../assets/clients/client29.jpg';
import Client22 from '../assets/clients/client30.jpg';
import Client23 from '../assets/clients/client31.jpg';
import Client24 from '../assets/clients/client32.jpg';
import Client25 from '../assets/clients/client33.jpg';
import Client26 from '../assets/clients/client34.jpg';
import Client27 from '../assets/clients/client35.jpg';
import Client28 from '../assets/clients/client1.jpg';
import Client29 from '../assets/clients/client2.jpg';
import Client30 from '../assets/clients/client3.jpg';

const clients = [
  Client1,  Client2,  Client3,  Client4,  Client5,
  Client6,  Client7,  Client8,  Client9,  Client10,
  Client11, Client12, Client13, Client14, Client15,
  Client16, Client17, Client18
];

const ClientsSection = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const cardBg     = isDark ? 'var(--surface-raised)'      : 'var(--color-neutral-0)';
  const cardBorder = isDark ? 'rgba(255,255,255,0.07)'     : 'var(--color-neutral-200)';
  const cardShadow = isDark ? 'var(--shadow-md)'           : 'var(--shadow-sm)';
  const cardHover  = isDark ? 'var(--shadow-brand-sm)'     : 'var(--shadow-lg)';

  return (
    <section
      ref={ref}
      style={{
        padding: 'var(--space-20) 0',
        background: isDark ? 'var(--bg-subtle)' : 'var(--surface-default)',
        transition: 'background var(--transition-slow)',
      }}
    >
      <div className="container mx-auto px-4">

        {/* Section Header */}
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
            Our Clients
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 'var(--font-weight-bold)',
            fontSize: 'clamp(var(--text-2xl), 3vw, var(--text-2xl))',
            lineHeight: 'var(--leading-tight)',
            color: isDark ? 'var(--text-heading)' : 'var(--color-neutral-900)',
            margin: 0,
          }}>
            Trusted By Industry Leaders
          </h2>
        </motion.div>

        {/* Clients Grid */}
        <div className="grid grid-cols-3 md:grid-cols-6" style={{ gap: 'var(--space-5)' }}>
          {clients.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.07, y: -3 }}
              style={{
                background: cardBg,
                border: `1px solid ${cardBorder}`,
                borderRadius: 'var(--border-radius-lg)',
                boxShadow: cardShadow,
                padding: 'var(--space-4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'box-shadow var(--transition-base), border-color var(--transition-base)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = cardHover;
                e.currentTarget.style.borderColor = 'var(--color-primary-300)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = cardShadow;
                e.currentTarget.style.borderColor = cardBorder;
              }}
            >
              <img
                src={client}
                alt={`Trusted client ${index + 1} of Sri Easwari Scientific Solutions`}
                loading="lazy"
                style={{
                  maxHeight: '64px',
                  width: 'auto',
                  filter: isDark ? ' brightness(1.4)' : '',
                  transition: 'filter var(--transition-base)',
                }}
                onMouseEnter={e => e.currentTarget.style.filter = 'grayscale(0)'}
                onMouseLeave={e => e.currentTarget.style.filter = isDark ? ' brightness(1.4)' : ''}
              />
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ textAlign: 'center', marginTop: 'var(--space-12)' }}
        >
          <Link to="/news" className="btn btn-primary inline-flex items-center" style={{ gap: 'var(--space-2)' }}>
            View More Clients
            <i className="ti-arrow-right" />
          </Link>
        </motion.div> */}

      </div>
    </section>
  );
};

export default ClientsSection;