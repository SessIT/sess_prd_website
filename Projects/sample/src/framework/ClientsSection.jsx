import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
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
import Client31 from '../assets/clients/client4.jpg';
import Client32 from '../assets/clients/client5.jpg';
import Client33 from '../assets/clients/client6.jpg';
import Client34 from '../assets/clients/client7.jpg';
import Client35 from '../assets/clients/client8.jpg';
import Client36 from '../assets/clients/client36.png';
import Client37 from '../assets/clients/client37.png';

const clients = [
  Client1,  Client2,  Client3,  Client4,  Client5,
  Client6,  Client7,  Client8,  Client9,  Client10,
  Client11, Client12, Client13, Client14, Client15,
  Client16, Client17, Client18, Client19, Client20,
  Client21, Client22, Client23, Client24, Client25,
  Client26, Client27, Client28, Client29, Client30,
  Client31, Client32, Client33, Client34, Client35,
  Client36, Client37,
];

// Split 35 clients into 2 rows
const row1 = clients.slice(0, 18);
const row2 = clients.slice(18); // 17 items

const CARD_WIDTH = 160;
const CARD_GAP   = 20;

const MarqueeRow = ({ items, isDark, cardBg, cardBorder, cardShadow, cardHover, speed }) => {
  const doubled  = [...items, ...items];
  const totalPx  = items.length * (CARD_WIDTH + CARD_GAP);
  const duration = totalPx / speed; // seconds

  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      <div
        style={{
          display: 'flex',
          gap: `${CARD_GAP}px`,
          width: 'max-content',
          animation: `marquee ${duration}s linear infinite`,
        }}
      >
        {doubled.map((client, i) => (
          <div
            key={i}
            style={{
              flexShrink: 0,
              width: `${CARD_WIDTH}px`,
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
              e.currentTarget.style.boxShadow    = cardHover;
              e.currentTarget.style.borderColor  = 'var(--color-primary-300)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow    = cardShadow;
              e.currentTarget.style.borderColor  = cardBorder;
            }}
          >
            <img
              src={client}
              alt="Trusted client of Sri Easwari Scientific Solutions"
              loading="lazy"
              style={{
                maxHeight: '52px',
                width: 'auto',
                filter: isDark ? 'brightness(1.4)' : '',
                transition: 'filter var(--transition-base)',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const ClientsSection = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const cardBg     = isDark ? 'var(--surface-raised)'  : 'var(--color-neutral-0)';
  const cardBorder = isDark ? 'rgba(255,255,255,0.07)' : 'var(--color-neutral-200)';
  const cardShadow = isDark ? 'var(--shadow-md)'       : 'var(--shadow-sm)';
  const cardHover  = isDark ? 'var(--shadow-brand-sm)' : 'var(--shadow-lg)';

  return (
    <section
      ref={ref}
      style={{
        padding: 'var(--space-20) 0',
        background: isDark ? 'var(--bg-subtle)' : 'var(--surface-default)',
        transition: 'background var(--transition-slow)',
      }}
    >
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header — unchanged */}
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

        {/* Two auto-scrolling rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: `${CARD_GAP}px` }}>
          <MarqueeRow
            items={row1}
            isDark={isDark}
            cardBg={cardBg}
            cardBorder={cardBorder}
            cardShadow={cardShadow}
            cardHover={cardHover}
            speed={28}
          />
          <MarqueeRow
            items={row2}
            isDark={isDark}
            cardBg={cardBg}
            cardBorder={cardBorder}
            cardShadow={cardShadow}
            cardHover={cardHover}
            speed={22}
          />
        </div>

      </div>
    </section>
  );
};

export default ClientsSection;