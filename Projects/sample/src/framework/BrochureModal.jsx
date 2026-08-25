import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { FaTimes, FaFilePdf, FaDownload, FaCheckCircle, FaLock } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { useTheme } from '../context/ThemeContext';
import brochurePdf from '../assets/Website_Gallery_img/Profile_SESS.pdf';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const EMPTY = { name: '', email: '', phone: '', company: '' };

/* Lead-capture gate shown before the brochure PDF opens.
   Sends the lead through the existing EmailJS setup, then starts the download. */
const BrochureModal = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  useEffect(() => {
    if (isOpen) {
      setForm(EMPTY);
      setErrors({});
      setStatus('idle');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const validate = () => {
    const next = {};
    if (!/^[A-Za-z\s.]{2,50}$/.test(form.name.trim())) next.name = 'Enter your name (alphabets only, 2–50 characters)';
    if (!/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/.test(form.email.trim())) next.email = 'Enter a valid email address';
    if (!/^[+]?[\d\s-]{10,15}$/.test(form.phone.trim())) next.phone = 'Enter a valid phone number (10–15 digits)';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const openPdf = () => window.open(brochurePdf, '_blank');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('submitting');
    try {
      if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
        throw new Error('EmailJS environment variables are missing');
      }
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company || 'Not specified',
          message: '📄 Brochure download request from the website (lead-capture form).',
          interested_in: 'Company Brochure',
          products: 'Brochure Download',
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      setTimeout(openPdf, 700);
    } catch (err) {
      console.error(err);
      // Lead capture failed — never block the visitor from the brochure itself.
      setStatus('error');
    }
  };

  const surface = isDark ? '#0f172a' : '#ffffff';
  const border = isDark ? 'rgba(255,255,255,0.10)' : 'rgba(15,23,42,0.10)';
  const textMain = isDark ? '#e2e8f0' : '#0f172a';
  const textMuted = isDark ? '#94a3b8' : '#64748b';
  const inputBg = isDark ? 'rgba(255,255,255,0.05)' : '#fbfdff';

  const inputStyle = (hasError) => ({
    width: '100%', height: 46, padding: '0 14px',
    background: inputBg,
    border: `1.5px solid ${hasError ? '#ef4444' : border}`,
    borderRadius: 10, outline: 'none',
    color: textMain, fontSize: 14, fontFamily: 'var(--font-body)',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  });

  const focusIn = (e) => { e.target.style.borderColor = '#00b3b3'; e.target.style.boxShadow = '0 0 0 3px rgba(0,179,179,0.12)'; };
  const focusOut = (e, hasError) => { e.target.style.borderColor = hasError ? '#ef4444' : border; e.target.style.boxShadow = 'none'; };

  const field = (name, label, type = 'text', required = true, placeholder = '') => (
    <div>
      <label style={{ display: 'block', marginBottom: 6, fontSize: 12, fontWeight: 600, color: isDark ? '#d6dde8' : '#334155' }}>
        {label}{required && <span style={{ color: '#ef4444', marginLeft: 3 }}>*</span>}
      </label>
      <input
        type={type}
        value={form[name]}
        placeholder={placeholder}
        onChange={e => { setForm({ ...form, [name]: e.target.value }); if (errors[name]) setErrors({ ...errors, [name]: undefined }); }}
        onFocus={focusIn}
        onBlur={e => focusOut(e, !!errors[name])}
        style={inputStyle(!!errors[name])}
      />
      {errors[name] && <p style={{ margin: '5px 0 0', fontSize: 11.5, color: '#ef4444' }}>{errors[name]}</p>}
    </div>
  );

  // NOTE: no AnimatePresence here — with React StrictMode + portals its exit
  // phase can leave an invisible fixed overlay that blocks clicks. Conditional
  // rendering guarantees the node is removed; entry animations still play.
  if (!isOpen) return null;

  return createPortal(
    (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 100,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: isDark ? 'rgba(2,6,23,0.82)' : 'rgba(8,18,32,0.55)',
            backdropFilter: 'blur(10px)', padding: 16,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            onClick={e => e.stopPropagation()}
            role="dialog" aria-modal="true" aria-label="Download brochure"
            style={{
              width: 'min(440px, 100%)', maxHeight: '92vh', overflowY: 'auto',
              background: surface,
              border: `1px solid ${isDark ? 'rgba(0,179,179,0.28)' : 'rgba(0,179,179,0.22)'}`,
              borderRadius: 20,
              boxShadow: isDark
                ? '0 28px 80px rgba(0,0,0,0.66), 0 0 40px rgba(0,179,179,0.08)'
                : '0 28px 80px rgba(15,23,42,0.28)',
              overflow: 'hidden',
            }}
          >
            {/* Header banner */}
            <div style={{
              position: 'relative', padding: '26px 24px 22px',
              background: 'linear-gradient(135deg, rgba(0,179,179,0.16) 0%, rgba(42,86,166,0.16) 100%)',
              borderBottom: `1px solid ${border}`,
            }}>
              <button
                onClick={onClose}
                aria-label="Close"
                style={{
                  position: 'absolute', top: 14, right: 14, width: 34, height: 34,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '50%', border: 'none', cursor: 'pointer',
                  background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(15,23,42,0.06)',
                  color: textMuted,
                }}
              >
                <FaTimes size={14} />
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'linear-gradient(135deg, #00b3b3, #2a56a6)',
                  boxShadow: '0 10px 24px rgba(0,179,179,0.35)',
                }}>
                  <FaFilePdf style={{ color: '#fff', fontSize: 22 }} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: textMain, fontFamily: 'var(--font-display)' }}>
                    Company Brochure
                  </h3>
                  <p style={{ margin: '3px 0 0', fontSize: 12.5, color: textMuted }}>
                    SESS profile, products &amp; capabilities — PDF
                  </p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: '22px 24px 26px' }}>
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: 'center', padding: '18px 0 8px' }}
                >
                  <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
                  >
                    <FaCheckCircle style={{ fontSize: 46, color: '#00b3b3', marginBottom: 14 }} />
                  </motion.div>
                  <h4 style={{ margin: '0 0 6px', fontSize: 17, color: textMain }}>Thank you, {form.name.split(' ')[0]}!</h4>
                  <p style={{ margin: '0 0 18px', fontSize: 13.5, color: textMuted }}>
                    Your brochure is opening in a new tab.
                  </p>
                  <button
                    onClick={openPdf}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      padding: '11px 22px', borderRadius: 999, border: 'none', cursor: 'pointer',
                      background: 'linear-gradient(135deg, #00b3b3, #2a56a6)', color: '#fff',
                      fontSize: 14, fontWeight: 600, fontFamily: 'var(--font-body)',
                      boxShadow: '0 10px 24px rgba(0,179,179,0.35)',
                    }}
                  >
                    <FaDownload size={13} /> Open Brochure Again
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, color: textMuted }}>
                    Fill in your details and the brochure will open instantly — our team can then
                    share the right chamber specifications with you.
                  </p>
                  {field('name', 'Full Name', 'text', true, 'e.g. Ramesh Kumar')}
                  {field('email', 'Work Email', 'email', true, 'name@company.com')}
                  {field('phone', 'Phone Number', 'tel', true, '+91 98765 43210')}
                  {field('company', 'Company', 'text', false, 'Company name (optional)')}

                  {status === 'error' && (
                    <div style={{
                      padding: '10px 14px', borderRadius: 10, fontSize: 12.5,
                      background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', color: '#ef4444',
                    }}>
                      We couldn’t record your details right now — you can still{' '}
                      <button
                        type="button"
                        onClick={openPdf}
                        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#00b3b3', fontWeight: 600, fontSize: 12.5, textDecoration: 'underline' }}
                      >
                        download the brochure here
                      </button>.
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={status === 'submitting'}
                    whileHover={{ scale: status === 'submitting' ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
                      width: '100%', padding: '13px 0', marginTop: 2,
                      borderRadius: 12, border: 'none',
                      cursor: status === 'submitting' ? 'wait' : 'pointer',
                      background: 'linear-gradient(135deg, #00b3b3, #2a56a6)',
                      color: '#fff', fontSize: 14.5, fontWeight: 700, fontFamily: 'var(--font-body)',
                      boxShadow: '0 10px 24px rgba(0,179,179,0.30)',
                      opacity: status === 'submitting' ? 0.75 : 1,
                    }}
                  >
                    {status === 'submitting'
                      ? (<><motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                            style={{ display: 'inline-flex' }}
                          ><FaDownload size={14} /></motion.span> Preparing download…</>)
                      : (<><FaDownload size={14} /> Get the Brochure</>)}
                  </motion.button>

                  <p style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                    margin: 0, fontSize: 11, color: textMuted,
                  }}>
                    <FaLock size={9} /> Your details stay with SESS — see our{' '}
                    <a href="#/privacy-policy" onClick={onClose} style={{ color: '#00b3b3', textDecoration: 'none' }}>Privacy Policy</a>
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
    ),
    document.body
  );
};

export default BrochureModal;
