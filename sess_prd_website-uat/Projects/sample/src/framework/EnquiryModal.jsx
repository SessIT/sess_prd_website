import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
// import axios from 'axios';
import { useTheme } from '../context/ThemeContext';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID =
  import.meta.env.VITE_EMAILJS_SERVICE_ID;

const EMAILJS_TEMPLATE_ID =
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

const EMAILJS_PUBLIC_KEY =
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const MotionDiv = motion.div;
const MotionP = motion.p;
const MotionButton = motion.button;

const EnquiryModal = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '',
    country: '', state: '', city: '', website: '', message: '',
    role: '', role_other: '', industry: '', industry_other: '',
    segment: [], interested_in: []
  });
  const [isSubmitting, setIsSubmitting]   = useState(false);
  const [submitStatus, setSubmitStatus]   = useState(null);

  /* ── Theme-aware values ───────────────────────────────── */
  const modalBg = isDark ? '#111827' : 'var(--color-neutral-0)';
  const panelBg = isDark ? '#0f172a' : 'linear-gradient(180deg, #f8feff 0%, #eef7fb 100%)';
  const formBg = isDark ? '#111827' : '#ffffff';
  const textColor = isDark ? 'var(--text-heading)' : 'var(--color-neutral-900)';
  const mutedColor = isDark ? '#9aa7b8' : 'var(--color-neutral-500)';
  const labelColor = isDark ? '#d6dde8' : 'var(--color-neutral-700)';
  const borderColor = isDark ? 'rgba(255,255,255,0.10)' : 'rgba(15,23,42,0.10)';
  const strongBorder = isDark ? 'rgba(0,179,179,0.28)' : 'rgba(0,179,179,0.22)';
  const inputBg = isDark ? 'rgba(255,255,255,0.045)' : '#fbfdff';
  const inputFocusBg = isDark ? 'rgba(0,179,179,0.08)' : '#ffffff';
  const inputColor = isDark ? 'var(--text-heading)' : 'var(--color-neutral-900)';
  const closeColor = isDark ? '#d6dde8' : 'var(--color-neutral-600)';
  const closeHover = isDark ? '#ffffff' : 'var(--color-neutral-900)';
  const softSurface = isDark ? 'rgba(255,255,255,0.055)' : 'rgba(255,255,255,0.72)';
  const selectedChipBg = isDark ? 'rgba(0,179,179,0.18)' : 'rgba(230,247,247,0.95)';
  const chipBg = isDark ? 'rgba(255,255,255,0.045)' : '#ffffff';

  /* ── Shared input style ───────────────────────────────── */
  const overlayStyle = {
    position: 'fixed',
    inset: 0,
    zIndex: 'var(--z-modal)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: isDark ? 'rgba(2, 6, 23, 0.78)' : 'rgba(8, 18, 32, 0.54)',
    backdropFilter: 'blur(10px)',
  };

  const modalStyle = {
    width: 'min(96vw, 980px)',
    maxHeight: '92vh',
    overflowY: 'auto',
    background: modalBg,
    border: `1px solid ${strongBorder}`,
    borderRadius: 'var(--border-radius-xl)',
    boxShadow: isDark
      ? '0 28px 80px rgba(0,0,0,0.66), 0 0 0 1px rgba(255,255,255,0.04)'
      : '0 28px 80px rgba(15,23,42,0.24), 0 0 0 1px rgba(255,255,255,0.95)',
  };

  const introPanelStyle = {
    position: 'relative',
    overflow: 'hidden',
    background: panelBg,
    borderRight: `1px solid ${borderColor}`,
  };

  const introAccentStyle = {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    background: isDark
      ? 'linear-gradient(145deg, rgba(0,179,179,0.28), transparent 45%), linear-gradient(315deg, rgba(42,86,166,0.30), transparent 45%)'
      : 'linear-gradient(145deg, rgba(0,179,179,0.13), transparent 48%), linear-gradient(315deg, rgba(42,86,166,0.14), transparent 48%)',
  };

  const sectionLabelStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
    color: 'var(--color-primary-500)',
    fontSize: 'var(--text-xs)',
    fontWeight: 'var(--font-weight-bold)',
    letterSpacing: 0,
    textTransform: 'uppercase',
    margin: 0,
  };

  const inputStyle = {
    width: '100%',
    height: '48px',
    padding: '0 var(--space-4)',
    background: inputBg,
    border: `1.5px solid ${borderColor}`,
    borderRadius: 'var(--border-radius-md)',
    color: inputColor,
    fontSize: 'var(--text-sm)',
    fontFamily: 'var(--font-body)',
    outline: 'none',
    transition: 'border-color var(--transition-base), box-shadow var(--transition-base), background var(--transition-base)',
    boxShadow: isDark ? 'inset 0 1px 0 rgba(255,255,255,0.04)' : 'inset 0 1px 0 rgba(255,255,255,0.90)',
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '112px',
    height: 'auto',
    paddingTop: 'var(--space-3)',
    paddingBottom: 'var(--space-3)',
    resize: 'vertical',
    lineHeight: 'var(--leading-relaxed)',
  };

  const labelStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 'var(--space-2)',
    marginBottom: 'var(--space-2)',
    color: labelColor,
    fontSize: 'var(--text-xs)',
    fontWeight: 'var(--font-weight-semibold)',
    letterSpacing: 0,
  };

  const requiredStyle = {
    color: 'var(--color-error)',
    marginLeft: 3,
  };

  const hintStyle = {
    color: mutedColor,
    fontSize: 'var(--text-xs)',
    fontWeight: 'var(--font-weight-medium)',
    letterSpacing: 0,
  };

  const chipStyle = (active) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
    minHeight: '42px',
    padding: '0.62rem 0.9rem',
    background: active ? selectedChipBg : chipBg,
    border: `1.5px solid ${active ? 'var(--color-primary-400)' : borderColor}`,
    borderRadius: 'var(--border-radius-md)',
    color: active ? (isDark ? '#e8feff' : 'var(--color-primary-800)') : labelColor,
    boxShadow: active ? '0 8px 22px rgba(0,179,179,0.16)' : 'none',
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'border-color var(--transition-base), background var(--transition-base), box-shadow var(--transition-base)',
  });

  const checkboxStyle = {
    width: 16,
    height: 16,
    flexShrink: 0,
    cursor: 'pointer',
    accentColor: 'var(--color-primary-500)',
  };

  const inputFocus = e => {
    e.target.style.borderColor = 'var(--color-primary-500)';
    e.target.style.boxShadow = 'var(--input-shadow-focus)';
    e.target.style.background = inputFocusBg;
  };
  const inputBlur = e => {
    e.target.style.borderColor = borderColor;
    e.target.style.boxShadow = isDark ? 'inset 0 1px 0 rgba(255,255,255,0.04)' : 'inset 0 1px 0 rgba(255,255,255,0.90)';
    e.target.style.background = inputBg;
  };

  /* ── Handlers ─────────────────────────────────────────── */
  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      // Special handling for Products (segment) - max 3 selections
      if (name === 'segment') {
        if (checked && formData[name].length >= 3) {
          alert('You can select a maximum of 3 products.');
          return; // Don't add more
        }
      }
      
      setFormData(prev => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter(v => v !== value)
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

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

//   const handleSubmit = async (e) => {
//   e.preventDefault();
  
//   // Validation: Check if Products (segment) is selected
//   if (formData.segment.length === 0) {
//     alert('Please select at least one Product.');
//     return;
//   }
  
//   // Validation: Check if Interested In is selected
//   if (formData.interested_in.length === 0) {
//     alert('Please select at least one option for "Interested In".');
//     return;
//   }
  
//   setIsSubmitting(true);

//   try {
//     // Format data for email with human-readable selected items
//     const emailData = {
//       ...formData,
//       segment: formData.segment.join(', ') || 'Not specified',
//       interested_in: formData.interested_in.join(', ') || 'Not specified'
//     };
    
//     await emailjs.send(
//       'service_zn4c4ej',   // replace
//       'template_xv44i0b',  // replace
//       emailData,
//       '4Kmy8AeCLSCskdNlt'    // replace
//     );

//     setSubmitStatus('success');

//     // reset form
//     setFormData({
//       name: '', email: '', phone: '', company: '',
//       country: '', state: '', city: '', website: '', message: '',
//       role: '', role_other: '', industry: '', industry_other: '',
//       segment: [], interested_in: []
//     });

//     setTimeout(() => {
//       onClose();
//       setSubmitStatus(null);
//     }, 2000);

//   } catch (error) {
//     console.error(error);
//     setSubmitStatus('error');
//   } finally {
//     setIsSubmitting(false);
//   }
// };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // Validation: Check if Products is selected
  if (formData.segment.length === 0) {
    alert('Please select at least one Product.');
    return;
  }

  // Validation: Check if Interested In is selected
  if (formData.interested_in.length === 0) {
    alert('Please select at least one option for "Interested In".');
    return;
  }

  setIsSubmitting(true);

  try {
    const selectedRole =
      formData.role === 'Other' ? formData.role_other : formData.role;

    const selectedIndustry =
      formData.industry === 'Other' ? formData.industry_other : formData.industry;

    const emailData = {
      name: formData.name || 'Not specified',
      email: formData.email || 'Not specified',
      phone: formData.phone || 'Not specified',
      company: formData.company || 'Not specified',

      country: formData.country || 'Not specified',
      state: formData.state || 'Not specified',
      city: formData.city || 'Not specified',
      website: formData.website || 'Not specified',
      message: formData.message || 'Not specified',

      role: selectedRole || 'Not specified',
      industry: selectedIndustry || 'Not specified',
      products: formData.segment.join(', ') || 'Not specified',
      interested_in: formData.interested_in.join(', ') || 'Not specified',
    };

    if (
  !EMAILJS_SERVICE_ID ||
  !EMAILJS_TEMPLATE_ID ||
  !EMAILJS_PUBLIC_KEY
) {
  throw new Error(
    'EmailJS environment variables are missing'
  );
}

await emailjs.send(
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  emailData,
  EMAILJS_PUBLIC_KEY
);

    setSubmitStatus('success');

    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      country: '',
      state: '',
      city: '',
      website: '',
      message: '',
      role: '',
      role_other: '',
      industry: '',
      industry_other: '',
      segment: [],
      interested_in: []
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
    { name: 'name', type: 'text', label: 'Name', placeholder: 'Enter full name', required: true },
    { name: 'email', type: 'email', label: 'Email', placeholder: 'name@company.com', required: true },
    { name: 'phone', type: 'tel', label: 'Phone', placeholder: '+91 98765 43210', required: true },
    { name: 'company', type: 'text', label: 'Company', placeholder: 'Company name', required: true },
    { name: 'country', type: 'text', label: 'Country', placeholder: 'Country', required: true },
    { name: 'state', type: 'text', label: 'State', placeholder: 'State', required: true },
    { name: 'city', type: 'text', label: 'City', placeholder: 'City', required: true },
    { name: 'website', type: 'url', label: 'Website', placeholder: 'https://example.com', required: false },
  ];

  const roleOptions = [
    'Administrator', 'Director', 'Engineer', 'Manager', 'Pharmacist',
    'Procurement', 'Quality', 'R&D', 'Researcher', 'Sales', 'Other'
  ];

  const industryOptions = [
    'Aeronautics', 'Automotive', 'Calibration', 'Construction', 'Cosmetics',
    'Defense', 'Electronics', 'HVAC', 'Indoor Farming', 'Industry', 'Pharmaceutical',
    'Railway', 'Research', 'Other'
  ];

  const segmentOptions = ['Environmental', 'Vibration', 'Salt Spray', 'Thermal Shock', 'Rain', 'Other'];
  const interestedOptions = ['Rental', 'Purchase', 'AMC'];

  const renderField = (field) => (
    <div key={field.name}>
      <label htmlFor={`enquiry-${field.name}`} style={labelStyle}>
        <span>
          {field.label}
          {field.required && <span style={requiredStyle}>*</span>}
        </span>
      </label>
      <input
        id={`enquiry-${field.name}`}
        type={field.type}
        name={field.name}
        placeholder={field.placeholder}
        required={field.required}
        value={formData[field.name]}
        onChange={handleChange}
        onFocus={inputFocus}
        onBlur={inputBlur}
        style={inputStyle}
      />
    </div>
  );

  const renderOptionChips = (name, options) => (
    <div className="flex flex-wrap gap-2.5">
      {options.map(opt => {
        const active = formData[name].includes(opt);
        return (
          <label key={opt} style={chipStyle(active)}>
            <input
              type="checkbox"
              name={name}
              value={opt}
              checked={active}
              onChange={handleChange}
              style={checkboxStyle}
            />
            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>{opt}</span>
          </label>
        );
      })}
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <MotionDiv
          className="p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={overlayStyle}
        >
          <MotionDiv
            initial={{ scale: 0.96, opacity: 0, y: 18 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0, y: 18 }}
            transition={{ type: 'spring', damping: 24, stiffness: 220 }}
            style={modalStyle}
          >
            {/* ── Header ──────────────────────────────────── */}
            <div
              className="relative p-5 sm:p-6"
              style={{
                ...introPanelStyle,
                borderRight: 'none',
                borderBottom: `1px solid ${borderColor}`,
              }}
            >
              <div style={introAccentStyle} />
              <div className="relative flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div
                    className="items-center justify-center hidden h-11 w-11 shrink-0 sm:inline-flex"
                    style={{
                      borderRadius: 'var(--border-radius-md)',
                      background: 'var(--gradient-brand)',
                      color: 'white',
                      boxShadow: 'var(--shadow-brand-md)',
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M4 7.5h16M7 4h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      <path d="m7 9 4.25 3.2a1.25 1.25 0 0 0 1.5 0L17 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    {/* <p style={sectionLabelStyle}>Enquiry form</p> */}
                    <h2
                      className="text-2xl font-bold sm:text-3xl"
                      style={{
                        marginBottom: 'var(--space-2)',
                        color: textColor,
                        fontFamily: 'var(--font-display)',
                        // fontWeight: 'var(--font-weight-extrabold)',
                        lineHeight: 'var(--leading-tight)',
                        letterSpacing: 0,
                      }}
                    >
                      Enquiry Now
                    </h2>
                    <p
                      style={{
                        maxWidth: 620,
                        color: mutedColor,
                        fontSize: 'var(--text-sm)',
                        lineHeight: 'var(--leading-relaxed)',
                        margin: 0,
                      }}
                    >
                      Share your requirement details and our team will route your request to the right specialist.
                    </p>
                  </div>
                </div>
                <MotionButton
                type="button"
                onClick={onClose}
                aria-label="Close enquiry modal"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                style={{
                    width: 42,
                    height: 42,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `1px solid ${borderColor}`,
                    borderRadius: 'var(--border-radius-md)',
                    background: isDark ? 'rgba(255,255,255,0.055)' : '#ffffff',
                    color: closeColor,
                    cursor: 'pointer',
                    boxShadow: isDark ? 'none' : 'var(--shadow-sm)',
                    transition: 'color var(--transition-fast), border-color var(--transition-fast), background var(--transition-fast)',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = closeHover;
                    e.currentTarget.style.borderColor = 'var(--color-primary-300)';
                    e.currentTarget.style.background = isDark ? 'rgba(0,179,179,0.12)' : 'var(--color-primary-50)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = closeColor;
                    e.currentTarget.style.borderColor = borderColor;
                    e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.055)' : '#ffffff';
                  }}
              >
                  <FaTimes size={18} />
                </MotionButton>
              </div>
            </div>

            {/* ── Form ────────────────────────────────────── */}
            <form onSubmit={handleSubmit} style={{ padding: 'var(--space-6)', background: formBg, color: textColor }}>
              <div className="grid grid-cols-1 gap-3 mb-5 sm:grid-cols-3">
                {[
                  ['Product', 'Select up to 3'],
                  ['Interest', 'Rental or purchase or AMC'],
                  ['Response', 'Mail notification'],
                ].map(([title, text]) => (
                  <div
                    key={title}
                    style={{
                      padding: 'var(--space-3)',
                      border: `1px solid ${borderColor}`,
                      borderRadius: 'var(--border-radius-md)',
                      background: softSurface,
                    }}
                  >
                    <p style={{ margin: '0 0 0.15rem', color: textColor, fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-bold)', letterSpacing: 0 }}>{title}</p>
                    <p style={{ margin: 0, color: mutedColor, fontSize: 'var(--text-xs)', lineHeight: 'var(--leading-normal)' }}>{text}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 'var(--space-4)' }}>

                {fields.map(renderField)}

                <div>
                  <label htmlFor="enquiry-role" style={labelStyle}>Role</label>
                  <select
                    id="enquiry-role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                    style={inputStyle}
                  >
                    <option value="">Select Role *</option>
                    {roleOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Role Other (conditional) */}
                {formData.role === 'Other' && (
                  <div>
                    <label htmlFor="enquiry-role-other" style={labelStyle}>
                      Specify role<span style={requiredStyle}>*</span>
                    </label>
                    <input
                      id="enquiry-role-other"
                      type="text"
                      name="role_other"
                      placeholder="Please specify role"
                      required
                      value={formData.role_other}
                      onChange={handleChange}
                      onFocus={inputFocus}
                      onBlur={inputBlur}
                      style={inputStyle}
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="enquiry-industry" style={labelStyle}>Industry</label>
                  <select
                    id="enquiry-industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                    style={inputStyle}
                  >
                    <option value="">Select Industry *</option>
                    {industryOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Industry Other (conditional) */}
                {formData.industry === 'Other' && (
                  <div>
                    <label htmlFor="enquiry-industry-other" style={labelStyle}>
                      Specify industry<span style={requiredStyle}>*</span>
                    </label>
                    <input
                      id="enquiry-industry-other"
                      type="text"
                      name="industry_other"
                      placeholder="Please specify industry"
                      required
                      value={formData.industry_other}
                      onChange={handleChange}
                      onFocus={inputFocus}
                      onBlur={inputBlur}
                      style={inputStyle}
                    />
                  </div>
                )}

                <fieldset
                  className="sm:col-span-2"
                  style={{
                    border: `1px solid ${borderColor}`,
                    borderRadius: 'var(--border-radius-md)',
                    padding: 'var(--space-4)',
                    background: isDark ? 'rgba(255,255,255,0.025)' : '#fbfdff',
                  }}
                >
                  <legend style={{ ...labelStyle, padding: '0 var(--space-2)', marginBottom: 0 }}>
                    <span>
                      Products<span style={requiredStyle}>*</span>
                    </span>
                    <span style={hintStyle}>Select up to 3</span>
                  </legend>
                  {renderOptionChips('segment', segmentOptions)}
                </fieldset>

                <fieldset
                  className="sm:col-span-2"
                  style={{
                    border: `1px solid ${borderColor}`,
                    borderRadius: 'var(--border-radius-md)',
                    padding: 'var(--space-4)',
                    background: isDark ? 'rgba(255,255,255,0.025)' : '#fbfdff',
                  }}
                >
                  <legend style={{ ...labelStyle, padding: '0 var(--space-2)', marginBottom: 0 }}>
                    <span>
                      Interested In<span style={requiredStyle}>*</span>
                    </span>
                  </legend>
                  {renderOptionChips('interested_in', interestedOptions)}
                </fieldset>

                {/* Textarea — full width */}
                <div className="sm:col-span-2">
                  <label htmlFor="enquiry-message" style={labelStyle}>Message</label>
                  <textarea
                    id="enquiry-message"
                    name="message"
                    placeholder="Tell us about chamber size, test conditions, timeline, or any specific requirement."
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                    style={textareaStyle}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div style={{ marginTop: 'var(--space-6)' }}>
                <MotionButton
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={isSubmitting ? undefined : { y: -1 }}
                  whileTap={isSubmitting ? undefined : { scale: 0.98 }}
                  style={{
                    width: '100%',
                    minHeight: '52px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 'var(--space-2)',
                    background: isSubmitting
                      ? 'var(--btn-primary-bg-disabled)'
                      : 'linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-500))',
                    color: isSubmitting ? 'var(--btn-primary-text-disabled)' : 'white',
                    border: 'none',
                    borderRadius: 'var(--border-radius-md)',
                    fontSize: 'var(--text-base)',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 'var(--font-weight-bold)',
                    letterSpacing: 0,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    boxShadow: isSubmitting ? 'none' : '0 14px 32px rgba(0,179,179,0.28)',
                    transition: 'box-shadow var(--transition-base), filter var(--transition-base), background var(--transition-base)',
                  }}
                  onMouseEnter={e => {
                    if (!isSubmitting) {
                      e.currentTarget.style.filter = 'brightness(1.04)';
                      e.currentTarget.style.boxShadow = '0 18px 42px rgba(0,179,179,0.34)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isSubmitting) {
                      e.currentTarget.style.filter = 'brightness(1)';
                      e.currentTarget.style.boxShadow = '0 14px 32px rgba(0,179,179,0.28)';
                    }
                  }}
                >
                  {isSubmitting ? 'Sending...' : (
                    <>
                      Send Message
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M5 12h14m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </>
                  )}
                </MotionButton>
              </div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <MotionP initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  style={{
                    marginTop: 'var(--space-4)',
                    padding: 'var(--space-3) var(--space-4)',
                    borderRadius: 'var(--border-radius-md)',
                    background: isDark ? 'rgba(22,163,74,0.12)' : 'var(--color-success-light)',
                    color: isDark ? '#86efac' : 'var(--color-success-dark)',
                    border: `1px solid ${isDark ? 'rgba(134,239,172,0.18)' : 'rgba(22,163,74,0.18)'}`,
                    textAlign: 'center',
                    fontSize: 'var(--text-sm)',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 'var(--font-weight-semibold)',
                  }}
                >
                  Thank you! Your enquiry has been sent successfully.
                </MotionP>
              )}
              {submitStatus === 'error' && (
                <MotionP initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  style={{
                    marginTop: 'var(--space-4)',
                    padding: 'var(--space-3) var(--space-4)',
                    borderRadius: 'var(--border-radius-md)',
                    background: isDark ? 'rgba(220,38,38,0.12)' : 'var(--color-error-light)',
                    color: isDark ? '#fca5a5' : 'var(--color-error-dark)',
                    border: `1px solid ${isDark ? 'rgba(252,165,165,0.18)' : 'rgba(220,38,38,0.18)'}`,
                    textAlign: 'center',
                    fontSize: 'var(--text-sm)',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 'var(--font-weight-semibold)',
                  }}
                >
                  Something went wrong. Please try again later.
                </MotionP>
              )}
            </form>

          </MotionDiv>
        </MotionDiv>
      )}
    </AnimatePresence>
  );
};

export default EnquiryModal;
