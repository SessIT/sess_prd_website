import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '../context/ThemeContext';
import { SectionHeader } from './SharedUI';

import Client1  from '../assets/clients/client9.webp';
import Client2  from '../assets/clients/client10.webp';
import Client3  from '../assets/clients/client11.webp';
import Client4  from '../assets/clients/client13.webp';
import Client5  from '../assets/clients/client12.webp';
import Client6  from '../assets/clients/client14.webp';
import Client7  from '../assets/clients/client15.webp';
import Client8  from '../assets/clients/client16.webp';
import Client9  from '../assets/clients/client17.webp';
import Client10 from '../assets/clients/client18.webp';
import Client11 from '../assets/clients/client19.webp';
import Client12 from '../assets/clients/client20.webp';
import Client13 from '../assets/clients/client21.webp';
import Client14 from '../assets/clients/client22.webp';
import Client15 from '../assets/clients/client23.webp';
import Client16 from '../assets/clients/client24.webp';
import Client17 from '../assets/clients/client25.webp';
import Client18 from '../assets/clients/client26.webp';
import Client19 from '../assets/clients/client27.webp';
import Client20 from '../assets/clients/client28.webp';
import Client21 from '../assets/clients/client29.webp';
import Client22 from '../assets/clients/client30.webp';
import Client23 from '../assets/clients/client31.webp';
import Client24 from '../assets/clients/client32.webp';
import Client25 from '../assets/clients/client33.webp';
import Client26 from '../assets/clients/client34.webp';
import Client27 from '../assets/clients/client35.webp';
import Client28 from '../assets/clients/client1.webp';
import Client29 from '../assets/clients/client2.webp';
import Client30 from '../assets/clients/client3.webp';
import Client31 from '../assets/clients/client4.webp';
import Client32 from '../assets/clients/client5.webp';
import Client33 from '../assets/clients/client6.webp';
import Client34 from '../assets/clients/client7.webp';
import Client35 from '../assets/clients/client8.webp';
import Client36 from '../assets/clients/client36.webp';
import Client37 from '../assets/clients/client37.webp';

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
          <SectionHeader eyebrow="Our Clients" title="Trusted By Industry Leaders" isDark={isDark} />
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