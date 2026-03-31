import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
// import axios from 'axios';
import { useTheme } from '../context/ThemeContext';
import emailjs from '@emailjs/browser';

const EnquiryModal = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '',
    country: '', state: '', city: '', website: '', message: ''
  });
  const [isSubmitting, setIsSubmitting]   = useState(false);
  const [submitStatus, setSubmitStatus]   = useState(null);

  /* ── Theme-aware values ───────────────────────────────── */
  const modalBg      = isDark ? '#161b22'                     : 'var(--surface-default)';
  const headerBorder = isDark ? 'var(--border-default)'       : 'var(--color-neutral-200)';
  const headingColor = isDark ? 'var(--text-heading)'         : 'var(--color-neutral-900)';
  const closeColor   = isDark ? 'var(--text-muted)'           : 'var(--color-neutral-500)';
  const closeHover   = isDark ? 'var(--text-heading)'         : 'var(--color-neutral-800)';
  const inputBg      = isDark ? 'var(--surface-overlay)'      : 'var(--color-neutral-0)';
  const inputBorder  = isDark ? 'rgba(255,255,255,0.10)'      : 'var(--color-neutral-300)';
  const inputColor   = isDark ? 'var(--text-heading)'         : 'var(--color-neutral-900)';
  const placeholderStyle = isDark ? 'rgba(255,255,255,0.30)'  : 'var(--color-neutral-400)';

  /* ── Shared input style ───────────────────────────────── */
  const inputStyle = {
    width: '100%',
    padding: 'var(--space-2) var(--space-4)',
    background: inputBg,
    border: `1px solid ${inputBorder}`,
    borderRadius: 'var(--border-radius-md)',
    color: inputColor,
    fontSize: 'var(--text-sm)',
    fontFamily: 'var(--font-body)',
    outline: 'none',
    transition: 'var(--transition-base)',
  };

  const inputFocus = e => {
    e.target.style.borderColor = 'var(--color-primary-500)';
    e.target.style.boxShadow   = 'var(--input-shadow-focus)';
  };
  const inputBlur = e => {
    e.target.style.borderColor = inputBorder;
    e.target.style.boxShadow   = 'none';
  };

  /* ── Handlers ─────────────────────────────────────────── */
  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  // const handleSubmit = async e => {
  //   e.preventDefault();
  //   setIsSubmitting(true);
  //   try {
  //     await axios.post('/api/enquiry', formData);
  //     setSubmitStatus('success');
  //     setTimeout(() => { onClose(); setSubmitStatus(null); }, 2000);
  //   } catch {
  //     setSubmitStatus('error');
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    await emailjs.send(
      'service_zn4c4ej',   // replace
      'template_xv44i0b',  // replace
      formData,
      '4Kmy8AeCLSCskdNlt'    // replace
    );

    setSubmitStatus('success');

    // reset form
    setFormData({
      name: '', email: '', phone: '', company: '',
      country: '', state: '', city: '', website: '', message: ''
    });

    setTimeout(() => {
      onClose();
      setSubmitStatus(null);
    }, 2000);

  } catch (error) {
    console.error(error);
    setSubmitStatus('error');
  } finally {
    setIsSubmitting(false);
  }
};

  /* ── Field config ─────────────────────────────────────── */
  const fields = [
    { name: 'name',    type: 'text',  placeholder: 'Name *',         required: true  },
    { name: 'email',   type: 'email', placeholder: 'Email *',        required: true  },
    { name: 'phone',   type: 'tel',   placeholder: 'Phone *',        required: true  },
    { name: 'company', type: 'text',  placeholder: 'Company Name *', required: true  },
    { name: 'country', type: 'text',  placeholder: 'Country *',      required: true  },
    { name: 'state',   type: 'text',  placeholder: 'State *',        required: true  },
    { name: 'city',    type: 'text',  placeholder: 'City *',         required: true  },
    { name: 'website', type: 'url',   placeholder: 'Website',        required: false },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 'var(--z-modal)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 'var(--space-4)',
            background: 'var(--bg-overlay)',
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
            style={{
              background: modalBg,
              borderRadius: 'var(--border-radius-xl)',
              boxShadow: 'var(--shadow-2xl)',
              width: '100%',
              maxWidth: '48rem',
              maxHeight: '90vh',
              overflowY: 'auto',
              transition: 'background var(--transition-slow)',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* ── Header ──────────────────────────────────── */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: 'var(--space-6)',
              borderBottom: `1px solid ${headerBorder}`,
            }}>
              <h2 style={{
                fontSize: 'var(--text-2xl)',
                fontFamily: 'var(--font-display)',
                fontWeight: 'var(--font-weight-bold)',
                color: headingColor,
                margin: 0,
              }}>
                Enquiry Now
              </h2>
              <button
                onClick={onClose}
                style={{
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  color: closeColor, padding: 'var(--space-1)',
                  borderRadius: 'var(--border-radius-sm)',
                  transition: 'var(--transition-fast)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
                onMouseEnter={e => e.currentTarget.style.color = closeHover}
                onMouseLeave={e => e.currentTarget.style.color = closeColor}
              >
                <FaTimes size={22} />
              </button>
            </div>

            {/* ── Form ────────────────────────────────────── */}
            <form onSubmit={handleSubmit} style={{ padding: 'var(--space-6)' }}>
              <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 'var(--space-4)' }}>

                {/* Text / email / tel / url inputs */}
                {fields.map(f => (
                  <input
                    key={f.name}
                    type={f.type}
                    name={f.name}
                    placeholder={f.placeholder}
                    required={f.required}
                    value={formData[f.name]}
                    onChange={handleChange}
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                    style={{ ...inputStyle, height: 'var(--input-height-md)' }}
                  />
                ))}

                {/* Textarea — full width */}
                <textarea
                  name="message"
                  placeholder="Message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                  style={{ ...inputStyle, gridColumn: '1 / -1', resize: 'vertical', paddingTop: 'var(--space-3)' }}
                />
              </div>

              {/* Submit Button */}
              <div style={{ marginTop: 'var(--space-6)' }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    height: 'var(--btn-height-md)',
                    background: isSubmitting ? 'var(--btn-primary-bg-disabled)' : 'var(--btn-primary-bg)',
                    color: isSubmitting ? 'var(--btn-primary-text-disabled)' : 'var(--btn-primary-text)',
                    border: 'none',
                    borderRadius: 'var(--btn-radius)',
                    fontSize: 'var(--btn-font-size-md)',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 'var(--btn-font-weight)',
                    letterSpacing: 'var(--tracking-wide)',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    boxShadow: isSubmitting ? 'none' : 'var(--btn-primary-shadow)',
                    transition: 'var(--btn-transition)',
                  }}
                  onMouseEnter={e => { if (!isSubmitting) { e.currentTarget.style.background = 'var(--btn-primary-bg-hover)'; e.currentTarget.style.boxShadow = 'var(--btn-primary-shadow-hover)'; }}}
                  onMouseLeave={e => { if (!isSubmitting) { e.currentTarget.style.background = 'var(--btn-primary-bg)'; e.currentTarget.style.boxShadow = 'var(--btn-primary-shadow)'; }}}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  style={{ marginTop: 'var(--space-4)', textAlign: 'center', color: 'var(--color-success)', fontSize: 'var(--text-sm)', fontFamily: 'var(--font-body)' }}
                >
                  Thank you! Your enquiry has been sent successfully.
                </motion.p>
              )}
              {submitStatus === 'error' && (
                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  style={{ marginTop: 'var(--space-4)', textAlign: 'center', color: 'var(--color-error)', fontSize: 'var(--text-sm)', fontFamily: 'var(--font-body)' }}
                >
                  Something went wrong. Please try again later.
                </motion.p>
              )}
            </form>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnquiryModal;