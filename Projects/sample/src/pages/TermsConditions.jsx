import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFileContract } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const LAST_UPDATED = 'August 2026';

const SECTIONS = [
  {
    title: '1. Acceptance of Terms',
    body: [
      `By accessing and using this website, operated by Sri Easwari Scientific Solution Pvt Ltd ("SESS", "we", "us"), you agree to these Terms & Conditions. If you do not agree, please do not use the website.`,
    ],
  },
  {
    title: '2. Website Content',
    body: [
      `The content on this website — product descriptions, specifications, images and documents — is provided for general information only. While we work to keep it accurate and up to date, specifications may change without notice as we improve our products.`,
      `Final product specifications, pricing, delivery timelines and warranty terms are those stated in a formal written quotation or purchase agreement, not on this website.`,
    ],
  },
  {
    title: '3. Quotations & Enquiries',
    body: [
      `Submitting an enquiry or quote request through this website does not create a contract. All quotations issued by SESS are valid only for the period stated on the quotation and are subject to our standard terms of sale.`,
    ],
  },
  {
    title: '4. Intellectual Property',
    body: [
      `All trademarks, logos, product designs, text, graphics and downloadable documents (including our brochure) on this website are the property of SESS or their respective owners. You may not reproduce, distribute or use them for commercial purposes without our prior written consent.`,
    ],
  },
  {
    title: '5. Acceptable Use',
    body: [
      `You agree not to misuse this website — including attempting to gain unauthorised access, submitting false or misleading information through our forms, transmitting malware, or scraping content in bulk.`,
    ],
  },
  {
    title: '6. Third-Party Links & Embeds',
    body: [
      `This website contains links to and embedded content from third-party platforms (such as Facebook, YouTube and Google Maps). We are not responsible for the content, availability or privacy practices of those platforms.`,
    ],
  },
  {
    title: '7. Limitation of Liability',
    body: [
      `To the maximum extent permitted by law, SESS is not liable for any indirect, incidental or consequential loss arising from your use of, or inability to use, this website or the information on it.`,
    ],
  },
  {
    title: '8. Governing Law',
    body: [
      `These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of Chennai, Tamil Nadu.`,
    ],
  },
  {
    title: '9. Changes to These Terms',
    body: [
      `We may revise these Terms & Conditions at any time. The “Last updated” date shows the latest revision. Continued use of the website after changes constitutes acceptance of the revised terms.`,
    ],
  },
  {
    title: '10. Contact',
    body: [
      `Questions about these terms: Sri Easwari Scientific Solution Pvt Ltd, Iyyappanthangal, Chennai — 600 122. Email: easwari.kjsb@gmail.com · Phone: +91 94444 27748.`,
    ],
  },
];

const TermsConditions = () => {
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
        style={{ background: 'linear-gradient(135deg, #2a56a6 0%, #00b3b3 100%)' }}
      >
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-1.5 text-sm backdrop-blur-md">
            <FaFileContract /> Please read carefully
          </span>
          <h1 className="text-4xl font-bold tracking-tight">Terms &amp; Conditions</h1>
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
          <Link to="/privacy-policy" style={{ color: '#00b3b3' }}>Privacy Policy</Link>
          {' '}·{' '}
          <Link to="/contact" style={{ color: '#00b3b3' }}>Contact Us</Link>
        </p>
      </section>
    </motion.div>
  );
};

export default TermsConditions;
