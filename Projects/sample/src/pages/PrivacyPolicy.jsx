import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaShieldAlt } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const LAST_UPDATED = 'August 2026';

const SECTIONS = [
  {
    title: '1. Who We Are',
    body: [
      `Sri Easwari Scientific Solution Pvt Ltd ("SESS", "we", "us") is a manufacturer of environmental test chambers and laboratory equipment, located at Door No 2/298, ANE Garden, Perumal Kovil Street, Srinivasapuram, Paraniputhur Post, Iyyappanthangal, Chennai — 600 122, India.`,
      `This Privacy Policy explains what information we collect through this website, how we use it, and the choices you have.`,
    ],
  },
  {
    title: '2. Information We Collect',
    body: [
      `Information you give us directly — when you submit an enquiry, request a quote, download our brochure, subscribe to updates, or apply for a job, we collect the details you enter, such as your name, email address, phone number, company name, location, industry, role, product interests and message.`,
      `Career applications may additionally include your resume/CV and any documents you choose to upload.`,
      `Information collected automatically — like most websites, basic technical information (browser type, device, pages visited) may be processed by our hosting provider and embedded services to keep the site working and secure. We do not use this to personally identify you.`,
    ],
  },
  {
    title: '3. How We Use Your Information',
    body: [
      `To respond to your enquiries and quote requests, and to share product specifications and pricing you asked for.`,
      `To send you the brochure or other resources you requested.`,
      `To process job applications.`,
      `To improve our website, products and services.`,
      `We do not sell or rent your personal information to anyone.`,
    ],
  },
  {
    title: '4. How Your Data Is Processed',
    body: [
      `Form submissions on this website are delivered to our team as email via EmailJS, a third-party email delivery service. Your submitted details are transmitted through their systems solely to deliver your message to us.`,
      `This website embeds content from third-party platforms — including Facebook (page feed), YouTube and Google Maps. When those sections load, the respective platform may set cookies or collect usage data under its own privacy policy. We encourage you to review the privacy policies of Meta, Google and any other platform you interact with.`,
    ],
  },
  {
    title: '5. Cookies & Local Storage',
    body: [
      `We use minimal browser storage — for example, remembering your light/dark theme preference. Third-party embeds (Facebook, YouTube, Google Maps) may set their own cookies as described above.`,
    ],
  },
  {
    title: '6. Data Retention',
    body: [
      `We keep enquiry and lead details only as long as needed to respond to you and maintain our business relationship. You may ask us to delete your details at any time using the contact information below.`,
    ],
  },
  {
    title: '7. Your Rights',
    body: [
      `You may request access to, correction of, or deletion of the personal information you have shared with us. To exercise any of these rights, write to us at easwari.kjsb@gmail.com or call +91 94444 27748.`,
    ],
  },
  {
    title: '8. Security',
    body: [
      `We take reasonable technical and organisational measures to protect the information you share with us. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.`,
    ],
  },
  {
    title: '9. Children’s Privacy',
    body: [
      `This website is intended for business audiences and is not directed at children under 18. We do not knowingly collect personal information from children.`,
    ],
  },
  {
    title: '10. Changes to This Policy',
    body: [
      `We may update this Privacy Policy from time to time. The “Last updated” date at the top of this page shows when it was most recently revised. Continued use of the website after changes means you accept the updated policy.`,
    ],
  },
  {
    title: '11. Contact Us',
    body: [
      `For any privacy-related questions or requests: Sri Easwari Scientific Solution Pvt Ltd, Iyyappanthangal, Chennai — 600 122. Email: easwari.kjsb@gmail.com · Phone: +91 94444 27748.`,
    ],
  },
];

const PrivacyPolicy = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Hero */}
      <section
        className="relative overflow-hidden py-16 text-center text-white"
        style={{ background: 'linear-gradient(135deg, #00b3b3 0%, #2a56a6 100%)' }}
      >
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-1.5 text-sm backdrop-blur-md">
            <FaShieldAlt /> Your data, protected
          </span>
          <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="mt-3 text-white/85">Last updated: {LAST_UPDATED}</p>
        </motion.div>
      </section>

      {/* Body */}
      <section className="mx-auto max-w-3xl px-4 py-14 lg:px-0">
        {SECTIONS.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: Math.min(i * 0.04, 0.3), duration: 0.45 }}
            className="mb-8 rounded-2xl p-6"
            style={{
              background: isDark ? 'rgba(255,255,255,0.04)' : '#ffffff',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.08)'}`,
            }}
          >
            <h2 className="mb-3 text-lg font-bold" style={{ color: '#00b3b3' }}>{s.title}</h2>
            {s.body.map((p, pi) => (
              <p key={pi} className="mb-3 text-sm leading-relaxed last:mb-0" style={{ color: isDark ? '#cbd5e1' : '#334155' }}>
                {p}
              </p>
            ))}
          </motion.div>
        ))}

        <p className="text-center text-sm" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
          See also our{' '}
          <Link to="/terms-and-conditions" style={{ color: '#00b3b3' }}>Terms &amp; Conditions</Link>
          {' '}·{' '}
          <Link to="/contact" style={{ color: '#00b3b3' }}>Contact Us</Link>
        </p>
      </section>
    </motion.div>
  );
};

export default PrivacyPolicy;
