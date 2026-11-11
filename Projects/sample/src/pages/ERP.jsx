import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  ArrowRight, Maximize2, X, Mail, MessageCircle, Phone, Rocket,
  ShoppingCart, Boxes, Factory, IndianRupee, Users, Award, Headset, ShieldCheck,
  ClipboardList, CalendarRange, PackageCheck, Hammer, FlaskConical, Wrench, LineChart, FileText,
  Building2, Code2, CheckCircle2, Sparkles, ChevronDown, Map,
} from 'lucide-react';
import { SectionHeader } from '../framework/SharedUI';
import { useTheme } from '../context/ThemeContext';

import mgmtImg from '../assets/erp/SESS_erpmanagementdashboard_ERPPage.webp';
import mgmtThumb from '../assets/erp/SESS_erpmanagementdashboard_ERPPage_thumb.webp';
import purchaseImg from '../assets/erp/SESS_erppurchasedashboard_ERPPage.webp';
import purchaseThumb from '../assets/erp/SESS_erppurchasedashboard_ERPPage_thumb.webp';
import storesImg from '../assets/erp/SESS_erpstoresdashboard_ERPPage.webp';
import storesThumb from '../assets/erp/SESS_erpstoresdashboard_ERPPage_thumb.webp';
import employeeImg from '../assets/erp/SESS_erpemployeedashboard_ERPPage.webp';
import employeeThumb from '../assets/erp/SESS_erpemployeedashboard_ERPPage_thumb.webp';
import darkImg from '../assets/erp/SESS_erpdarkdashboard_ERPPage.webp';
import darkThumb from '../assets/erp/SESS_erpdarkdashboard_ERPPage_thumb.webp';

const EASE = [0.22, 1, 0.36, 1];
const CONTAINER = 'max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8';
const ERP_EMAIL = 'easwari.kjsb@gmail.com';
const ERP_PHONE = '+917548873688';
const MAIL_HREF = `mailto:${ERP_EMAIL}?subject=${encodeURIComponent('SESS ERP requirements enquiry')}`;
const WA_HREF = `https://wa.me/917548873688?text=${encodeURIComponent('Hello SESS, I would like to discuss ERP for our manufacturing business.')}`;

/* ─── Content ─────────────────────────────────────────────────────────── */
const problems = [
  { icon: ShoppingCart, title: 'Purchase follow-up', text: 'Which requirements are waiting for quotations, approval or delivery?' },
  { icon: Boxes, title: 'Stock availability', text: 'What has arrived, passed QC, been issued or needs to be returned?' },
  { icon: Factory, title: 'Production visibility', text: 'Who owns the next activity, and what is holding the project back?' },
  { icon: IndianRupee, title: 'Project cost', text: 'Have material, labour, travel, service and other project costs been recorded?' },
];

const stages = [
  { n: '01', icon: ClipboardList, label: 'Customer order', title: 'Define the project', text: 'Capture the customer requirement and establish the project reference, ownership and expected delivery.', why: 'A shared project reference gives later work a common context.' },
  { n: '02', icon: CalendarRange, label: 'Planning', title: 'Plan the work and materials', text: 'Break the project into stages and requirements, with responsible teams and target dates.', why: 'Teams can see what needs to happen before the next stage.' },
  { n: '03', icon: ShoppingCart, label: 'Purchase', title: 'Raise PRs and follow procurement', text: 'Connect material requirements with PRs, supplier quotations, comparison, configured approvals and purchase orders.', why: 'Pending requisitions and delivery commitments become visible.' },
  { n: '04', icon: PackageCheck, label: 'Stores & QC', title: 'Receive, inspect and issue', text: 'Record goods receipt and QC status, then issue approved material against the relevant project or job.', why: 'Stock movement and project consumption stay connected.' },
  { n: '05', icon: Hammer, label: 'Production', title: 'Record progress and effort', text: 'Follow production stages, task completion and project labour inputs as the work progresses.', why: 'Managers can review delays, responsibility and cost inputs together.' },
  { n: '06', icon: FlaskConical, label: 'Testing & delivery', title: 'Keep the completion evidence', text: 'Maintain inspection and testing records, review completion and follow dispatch and installation activity.', why: 'Supporting records help teams verify that required work is complete.' },
  { n: '07', icon: Wrench, label: 'Service', title: 'Continue the equipment history', text: 'Follow complaints, visits, warranty activity and AMC follow-ups after delivery.', why: 'The customer relationship continues beyond dispatch.' },
  { n: '08', icon: LineChart, label: 'Project review', title: 'Review cost and profit', text: 'Compare revenue with recorded direct costs and allocated common expenses. Review direct contribution and net project result separately.', why: 'Project outcomes can inform future estimates and operational improvements.' },
];

const dashboards = [
  { key: 'management', tab: 'Management', src: mgmtImg, thumb: mgmtThumb, w: 1193, h: 1319,
    title: 'A shared view of the business', text: 'Managers can review orders, stock, receivables, project contribution and decisions waiting for attention.',
    qa: [['What needs attention today?', 'Pending actions and exception indicators help managers focus their review.'],
         ['How is each project performing?', 'Illustrative contribution comparisons help explain project-level financial visibility. Direct contribution and net profit must be reviewed separately.']] },
  { key: 'purchase', tab: 'Purchase', src: purchaseImg, thumb: purchaseThumb, w: 1324, h: 1188,
    title: 'From a material requirement to a purchase order', text: 'A project requirement starts the purchasing workflow. Teams can follow requisitions, quotations, approvals, orders and delivery commitments.',
    qa: [['What is still waiting?', 'Review open PRs, requisition ageing and orders awaiting approval.'],
         ['Which supplier needs follow-up?', 'Delivery indicators and previous-price comparisons support a documented purchasing decision.']] },
  { key: 'stores', tab: 'Stores', src: storesImg, thumb: storesThumb, w: 1203, h: 1308,
    title: 'From incoming material to project consumption', text: 'Stores activity connects received materials with QC status, available stock, project issues, returns and custody records.',
    qa: [['Can production get the material?', 'Receipt, QC and issue status help the team understand what is available and what is pending.'],
         ['Where did the material go?', 'Project issues, returnable challans and custody records support traceability. Barcode workflows are part of the platform scope under validation.']] },
  { key: 'employee', tab: 'Employee', src: employeeImg, thumb: employeeThumb, w: 1326, h: 1187,
    title: 'Daily work with reviewable records', text: 'Employees and supervisors can follow assigned work, task completion and recorded performance indicators.',
    qa: [['What should I do next?', 'The task view brings pending work and priorities together.'],
         ['How can performance be reviewed?', 'Documented timeliness, quality, attendance and feedback support management review. Scores are illustrative and are not automatic employment decisions.']] },
  { key: 'dark', tab: 'Management · Dark', src: darkImg, thumb: darkThumb, w: 1190, h: 1322,
    title: 'An alternative management view', text: 'The dark dashboard presents a role-based overview of business activity and items requiring follow-up.',
    qa: [['How are departments progressing?', 'Department activity and recent transactions provide context for management discussions.'],
         ['Which issues need escalation?', 'Risk, service and renewal indicators help highlight work that needs attention.']] },
];

const features = [
  { icon: IndianRupee, color: '#00b3b3', title: 'Project cost & profit', text: 'Material, labour, design, testing, transport, installation and warranty inputs, with common-expense allocation for net project review.' },
  { icon: Factory, color: '#2a56a6', title: 'Production management', text: 'Project stages, owners, departmental work, due dates and pending actions.' },
  { icon: ShoppingCart, color: '#0ea5e9', title: 'Purchase management', text: 'Project-linked PRs, RFQs, quotation comparison, approvals, POs and supplier follow-up.' },
  { icon: Boxes, color: '#8b5cf6', title: 'Stores & barcode', text: 'Receipts, QC status, stock balances, material issues, returns, challans and tool custody.' },
  { icon: Users, color: '#f59e0b', title: 'HR & payroll', text: 'Employee records, attendance and payroll workflows, with authorised access.' },
  { icon: Award, color: '#ec4899', title: 'Performance records', text: 'Task completion, timeliness, quality and feedback to support reviews and recognition.' },
  { icon: Headset, color: '#10b981', title: 'Service coordination', text: 'Complaints, engineer assignments, visits, warranty activities and AMC follow-ups.' },
  { icon: ShieldCheck, color: '#ef4444', title: 'Quality & KPIs', text: 'Inspection information, approvals, responsibilities, evidence and records supporting quality management.' },
];

const exampleSteps = [
  ['Production identifies a material requirement.', 'The requirement connects to the project and moves through the purchasing workflow.'],
  ['Purchase follows quotations and approval.', 'The team can review pending PRs, issue the PO and follow the supplier commitment.'],
  ['Stores receives and issues the material.', 'Receipt, QC and issue records connect availability with project consumption.'],
  ['Teams record execution and completion.', 'Progress, labour inputs and inspection evidence support project review.'],
  ['Management reviews the result.', 'Recorded costs, revenue and allocated overheads help explain the direct and net project outcome.'],
];

const faqs = [
  ['Is this suitable for a small manufacturing company?', 'The platform is intended for manufacturing and service businesses, including smaller teams seeking connected project, purchase and stores workflows. Suitability, implementation scope and commercial terms should be discussed with SESS for your specific requirements.'],
  ['Is SESS ERP available now?', 'Development is nearing completion and validation is in progress. The planned commercial introduction is April 2027, following completion of validation.'],
  ['Do these previews show every module?', 'No. The previews illustrate management, purchase, stores and employee views. HR, payroll, service, barcode and quality workflows are explained as platform scope under validation. Their final screens are not all shown here.'],
  ['Does the software guarantee profit or error-free operations?', 'No. The goal is clearer workflow control, traceability and cost visibility. Outcomes depend on correct records, configuration, adoption and management review.'],
  ['What should we share when contacting SESS?', 'Your industry, approximate team size, project types, current tools and the operational problems you want to address. This helps us discuss an appropriate scope.'],
];

const trust = [
  { icon: Factory, label: 'Manufacturing experience' },
  { icon: Code2, label: 'In-house software development' },
  { icon: CheckCircle2, label: 'Practical operational validation' },
  { icon: Building2, label: 'Designed for manufacturing & service teams' },
];

/* ─── Small building blocks ───────────────────────────────────────────── */
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease: EASE },
});

const PrimaryBtn = ({ href, children, external, onDark, onClick }) => (
  <motion.a
    href={href}
    onClick={onClick}
    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    whileHover={{ scale: 1.04 }}
    whileTap={{ scale: 0.98 }}
    className={`group inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-xl shadow-lg transition-shadow duration-300 hover:shadow-xl ${
      onDark ? 'bg-white text-[#1d4f8f] hover:shadow-white/20' : 'text-white'
    }`}
    style={onDark ? undefined : { background: 'var(--gradient-brand)', boxShadow: 'var(--shadow-brand-md)' }}
  >
    {children}
    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
  </motion.a>
);

const GhostBtn = ({ href, children, external, onClick }) => (
  <motion.a
    href={href}
    onClick={onClick}
    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white transition-colors duration-300 border rounded-xl border-white/40 bg-white/5 backdrop-blur-sm hover:bg-white/15 hover:border-white/70"
  >
    {children}
  </motion.a>
);

/* Lightbox — rendered inline (no portal); see sess-modal-patterns. */
function Lightbox({ item, onClose }) {
  const closeRef = useRef(null);
  useEffect(() => {
    if (!item) return undefined;
    const prev = document.activeElement;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      prev?.focus?.();
    };
  }, [item, onClose]);

  if (!item) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${item.tab} dashboard — full preview`}
      className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-6 erp-fade-in"
      style={{ background: 'rgba(7, 18, 38, 0.92)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close preview"
        className="absolute flex items-center justify-center text-white transition-colors rounded-full top-3 right-3 sm:top-5 sm:right-5 w-11 h-11 bg-white/10 hover:bg-white/25"
      >
        <X className="w-5 h-5" />
      </button>
      <figure className="flex flex-col items-center w-full h-full max-w-6xl erp-zoom-in" onClick={(e) => e.stopPropagation()}>
        <img
          src={item.src}
          alt={`${item.tab} dashboard using illustrative demo data`}
          width={item.w}
          height={item.h}
          className="flex-1 object-contain w-full min-h-0 rounded-lg shadow-2xl"
        />
        <figcaption className="mt-3 text-xs text-center text-slate-300">
          {item.tab} dashboard · All data shown is illustrative.
        </figcaption>
      </figure>
    </div>
  );
}

/* ─── Workflow (interactive stages, auto-advances while visible) ─────── */
function Workflow({ isDark }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const [ref, inView] = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (paused || reduce || !inView) return undefined;
    const t = setInterval(() => setActive((a) => (a + 1) % stages.length), 4500);
    return () => clearInterval(t);
  }, [paused, reduce, inView]);

  const select = (i) => { setActive(i); setPaused(true); };
  const s = stages[active];
  const Icon = s.icon;

  return (
    <div ref={ref}>
      {/* Progress rail */}
      <div className="relative h-1 mb-6 overflow-hidden rounded-full" style={{ background: 'var(--border-default)' }}>
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: 'var(--gradient-brand)' }}
          animate={{ width: `${((active + 1) / stages.length) * 100}%` }}
          transition={{ duration: 0.6, ease: EASE }}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4" role="group" aria-label="Project workflow stages">
        {stages.map((st, i) => {
          const on = i === active;
          const done = i < active;
          const StIcon = st.icon;
          return (
            <motion.button
              key={st.n}
              type="button"
              aria-pressed={on}
              onClick={() => select(i)}
              {...reveal(i * 0.05)}
              whileHover={{ y: -3 }}
              className="relative flex items-center gap-3 p-3 overflow-hidden text-left border sm:p-4 rounded-xl"
              style={{
                background: on ? 'var(--gradient-brand)' : 'var(--surface-default)',
                borderColor: on ? 'transparent' : done ? 'var(--color-primary-300)' : 'var(--border-default)',
                color: on ? '#fff' : 'var(--text-heading)',
                boxShadow: on ? 'var(--shadow-brand-md)' : 'none',
                transition: 'background .35s, border-color .35s, box-shadow .35s, color .35s',
              }}
            >
              <span
                className="flex items-center justify-center flex-shrink-0 rounded-lg w-9 h-9"
                style={{
                  background: on ? 'rgba(255,255,255,0.18)' : isDark ? 'rgba(0,179,179,0.12)' : 'var(--color-primary-50)',
                  color: on ? '#fff' : 'var(--color-primary-500)',
                }}
              >
                <StIcon className="w-[18px] h-[18px]" strokeWidth={1.8} />
              </span>
              <span className="min-w-0">
                <span className="block text-[11px] font-bold tracking-wider" style={{ color: on ? 'rgba(255,255,255,0.8)' : 'var(--color-primary-500)' }}>
                  STAGE {st.n}
                </span>
                <span className="block text-sm font-semibold leading-tight truncate sm:text-[15px]">{st.label}</span>
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Detail */}
      <div
        className="relative mt-6 overflow-hidden border rounded-2xl"
        style={{ background: 'var(--surface-default)', borderColor: 'var(--border-default)' }}
        aria-live="polite"
      >
        <div className="absolute inset-y-0 left-0 w-1" style={{ background: 'var(--gradient-brand)' }} />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.3fr_1fr] lg:gap-10"
          >
            <div className="flex gap-4">
              <span className="items-center justify-center flex-shrink-0 hidden text-white sm:flex w-14 h-14 rounded-2xl" style={{ background: 'var(--gradient-brand)' }}>
                <Icon className="w-7 h-7" strokeWidth={1.6} />
              </span>
              <div>
                <span className="block mb-1 text-xs font-bold tracking-wider uppercase" style={{ color: 'var(--color-primary-500)' }}>
                  Stage {s.n} · {s.label}
                </span>
                <h3 className="mb-2 text-xl font-bold sm:text-2xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-heading)' }}>{s.title}</h3>
                <p className="m-0 text-sm leading-relaxed sm:text-base" style={{ color: 'var(--text-body)' }}>{s.text}</p>
              </div>
            </div>
            <div className="pt-5 border-t lg:pt-0 lg:pl-8 lg:border-t-0 lg:border-l" style={{ borderColor: 'var(--border-default)' }}>
              <span className="flex items-center gap-2 mb-2 text-xs font-bold tracking-wider uppercase" style={{ color: 'var(--color-secondary-500)' }}>
                <Sparkles className="w-4 h-4" /> Why it matters
              </span>
              <p className="m-0 text-sm leading-relaxed sm:text-base" style={{ color: 'var(--text-body)' }}>{s.why}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Dashboard gallery ───────────────────────────────────────────────── */
function DashboardGallery({ onOpen }) {
  const [idx, setIdx] = useState(0);
  const d = dashboards[idx];

  return (
    <motion.div
      {...reveal()}
      className="relative p-4 overflow-hidden text-white sm:p-6 lg:p-8 rounded-3xl"
      style={{ background: 'linear-gradient(145deg, #0f1f3a 0%, #112442 55%, #0b3a4a 100%)' }}
    >
      <div className="absolute rounded-full pointer-events-none w-72 h-72 -top-24 -right-20 blur-3xl sess-glow" style={{ background: 'rgba(0,179,179,0.35)' }} />
      <div className="absolute rounded-full pointer-events-none w-72 h-72 -bottom-24 -left-20 blur-3xl sess-glow" style={{ background: 'rgba(42,86,166,0.45)', animationDelay: '1.5s' }} />

      {/* Tabs */}
      <div className="relative flex gap-2 pb-1 mb-6 -mx-1 overflow-x-auto erp-no-scrollbar" role="tablist" aria-label="Dashboard selection">
        {dashboards.map((db, i) => (
          <button
            key={db.key}
            type="button"
            role="tab"
            aria-selected={i === idx}
            onClick={() => setIdx(i)}
            className="relative flex-shrink-0 px-4 py-2 mx-1 text-sm font-semibold rounded-lg whitespace-nowrap"
            style={{ color: i === idx ? '#0f1f3a' : '#d6dfec' }}
          >
            {i === idx && (
              <motion.span
                layoutId="erp-tab-pill"
                className="absolute inset-0 rounded-lg"
                style={{ background: 'linear-gradient(135deg, #71e6c3, #22d3ee)' }}
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            {i !== idx && <span className="absolute inset-0 border rounded-lg border-white/20" />}
            <span className="relative">{db.tab}</span>
          </button>
        ))}
      </div>

      <div className="relative grid items-center gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
        {/* Image stage */}
        <button
          type="button"
          onClick={() => onOpen(d)}
          aria-label={`Open complete ${d.tab} dashboard image`}
          className="relative block w-full overflow-hidden text-left group rounded-2xl bg-[#eaf0f8] h-[380px] sm:h-[480px] lg:h-[560px] cursor-zoom-in ring-1 ring-white/10"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={d.key}
              src={d.src}
              srcSet={`${d.thumb} 640w, ${d.src} 1200w`}
              sizes="(max-width: 1023px) calc(100vw - 4rem), 680px"
              alt={`${d.tab} dashboard using illustrative demo data`}
              width={d.w}
              height={d.h}
              loading="lazy"
              decoding="async"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="absolute inset-0 object-contain w-full h-full"
            />
          </AnimatePresence>
          <span className="absolute flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white transition-opacity duration-300 rounded-full opacity-90 bottom-3 right-3 bg-slate-900/75 backdrop-blur group-hover:opacity-100">
            <Maximize2 className="w-3.5 h-3.5" /> Click to enlarge
          </span>
        </button>

        {/* Copy */}
        <div aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={d.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <span className="block mb-3 text-xs font-bold tracking-[0.15em] uppercase text-[#71e6c3]">Role-based dashboard preview</span>
              <h3 className="mb-3 text-2xl font-bold leading-tight sm:text-3xl" style={{ fontFamily: 'var(--font-display)', color: '#fff' }}>{d.title}</h3>
              <p className="mb-5 text-sm leading-relaxed sm:text-base text-[#c5d1e3]">{d.text}</p>
              {d.qa.map(([q, a], i) => (
                <motion.div
                  key={q}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.4 }}
                  className="py-4 border-t border-white/15"
                >
                  <strong className="flex items-center gap-2 mb-1 text-sm text-white sm:text-base">
                    <CheckCircle2 className="flex-shrink-0 w-4 h-4 text-[#71e6c3]" /> {q}
                  </strong>
                  <p className="m-0 text-sm text-[#b9c7db] pl-6">{a}</p>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
          <motion.button
            type="button"
            onClick={() => onOpen(d)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-5 py-3 mt-4 text-sm font-semibold text-white transition-colors border rounded-xl border-white/30 hover:bg-white/10"
          >
            <Maximize2 className="w-4 h-4" /> Open full dashboard
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── FAQ item ────────────────────────────────────────────────────────── */
function FaqItem({ q, a, open, onToggle, idx }) {
  return (
    <motion.div {...reveal(idx * 0.06)} className="border-b" style={{ borderColor: 'var(--border-default)' }}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex items-center justify-between w-full gap-4 py-5 text-left"
      >
        <span className="text-sm font-semibold sm:text-base" style={{ color: open ? 'var(--color-primary-500)' : 'var(--text-heading)', transition: 'color .3s' }}>{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} className="flex-shrink-0" style={{ color: 'var(--color-primary-500)' }}>
          <ChevronDown className="w-5 h-5" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="pb-5 m-0 text-sm leading-relaxed" style={{ color: 'var(--text-body)' }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────── */
export default function ERP() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [lightbox, setLightbox] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const sectionBg = { background: 'var(--bg-base)' };
  const softBg = { background: 'var(--bg-subtle)' };

  return (
    <div className="overflow-x-hidden" style={{ color: 'var(--text-body)' }}>
      <style>{ERP_CSS}</style>

      {/* ══ Hero ══ */}
      <section className="relative overflow-hidden text-white" style={{ background: 'var(--gradient-brand)' }}>
        <div className="absolute rounded-full pointer-events-none w-[420px] h-[420px] -top-32 -right-24 blur-3xl sess-orb-a" style={{ background: '#0284c7', opacity: 0.35 }} />
        <div className="absolute rounded-full pointer-events-none w-[380px] h-[380px] -bottom-40 -left-24 blur-3xl sess-orb-b" style={{ background: '#06b6d4', opacity: 0.3 }} />
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className={`relative grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.05fr_1fr] ${CONTAINER}`}>
          <motion.div className="min-w-0" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', delay: 0.15, stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 text-xs font-semibold border rounded-full sm:text-sm bg-white/10 backdrop-blur-md border-white/25"
            >
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-emerald-300" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-300" />
              </span>
              Planned launch · April 2027
            </motion.div>

            <span className="block mb-3 text-xs font-bold tracking-[0.15em] uppercase text-cyan-100">ERP for manufacturing & service businesses</span>
            <h1 className="mb-5 text-[2rem] min-[400px]:text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl xl:text-6xl" style={{ fontFamily: 'var(--font-display)', color: '#fff' }}>
              Built around the work of{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a7f3d0] via-white to-[#bae6fd] erp-shine">manufacturing.</span>
            </h1>
            <p className="max-w-xl mb-8 text-base leading-relaxed sm:text-lg text-white/85">
              SESS ERP connects project activity, purchasing, stock, people and service — with a clearer view of progress and project cost.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <PrimaryBtn href="#erp-process" onDark onClick={scrollTo('erp-process')}>
                See how the process works
              </PrimaryBtn>
              <GhostBtn href="#erp-dashboards" onClick={scrollTo('erp-dashboards')}>
                Explore demo dashboards
              </GhostBtn>
            </div>
            <p className="mt-5 text-xs text-white/70">Developed by our IT team. Validation in SESS operations is in progress.</p>
          </motion.div>

          {/* Device preview */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: 8 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            className="relative min-w-0"
            style={{ perspective: 1200 }}
          >
            <div className="erp-float">
              <div className="p-2.5 border shadow-2xl rounded-2xl bg-[#1b2f4f]/90 border-white/20 shadow-black/30">
                <div className="flex items-center gap-1.5 px-1 pb-2.5">
                  <i className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <i className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <i className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  <span className="ml-auto text-[11px] text-white/70">SESS ERP · Management preview</span>
                </div>
                <button
                  type="button"
                  onClick={() => setLightbox(dashboards[0])}
                  aria-label="Open complete management dashboard image"
                  className="relative block w-full overflow-hidden rounded-lg bg-[#eff3fa] h-[300px] sm:h-[400px] lg:h-[430px] cursor-zoom-in"
                >
                  <img
                    src={mgmtImg}
                    srcSet={`${mgmtThumb} 640w, ${mgmtImg} 1200w`}
                    sizes="(max-width: 1023px) calc(100vw - 3rem), 600px"
                    alt="Management dashboard with fictional demonstration data"
                    width={1193}
                    height={1319}
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-auto erp-pan"
                  />
                  <span className="absolute inset-x-0 h-16 pointer-events-none erp-scan" style={{ background: 'linear-gradient(180deg, transparent, rgba(0,179,179,0.18), transparent)' }} />
                </button>
                <p className="px-1 pt-2 m-0 text-[11px] text-white/70">Full dashboard preview. Select to enlarge. All data shown is illustrative.</p>
              </div>
            </div>

            {/* Floating chips */}
            <div className="absolute items-center hidden gap-2 px-3 py-2 text-xs font-semibold bg-white shadow-xl sm:flex -left-6 top-16 rounded-xl text-slate-800 erp-chip">
              <span className="flex items-center justify-center rounded-lg w-7 h-7 bg-cyan-50 text-cyan-600"><ShoppingCart className="w-4 h-4" /></span>
              PR → PO approvals
            </div>
            <div className="absolute items-center hidden gap-2 px-3 py-2 text-xs font-semibold bg-white shadow-xl sm:flex -right-4 bottom-20 rounded-xl text-slate-800 erp-chip" style={{ animationDelay: '1.8s' }}>
              <span className="flex items-center justify-center rounded-lg w-7 h-7 bg-emerald-50 text-emerald-600"><IndianRupee className="w-4 h-4" /></span>
              Project cost visibility
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ Trust strip ══ */}
      <div className="border-b" style={{ ...sectionBg, borderColor: 'var(--border-default)' }}>
        <div className={`grid grid-cols-2 gap-4 py-6 lg:grid-cols-4 ${CONTAINER}`}>
          {trust.map(({ icon: TIcon, label }, i) => (
            <motion.div key={label} {...reveal(i * 0.08)} className="flex items-center gap-3">
              <span className="flex items-center justify-center flex-shrink-0 rounded-lg w-9 h-9" style={{ background: isDark ? 'rgba(0,179,179,0.12)' : 'var(--color-primary-50)', color: 'var(--color-primary-500)' }}>
                <TIcon className="w-[18px] h-[18px]" />
              </span>
              <span className="text-xs font-semibold sm:text-sm" style={{ color: 'var(--text-heading)' }}>{label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ══ Problem ══ */}
      <section className="py-16 sm:py-20" style={sectionBg}>
        <div className={`grid gap-12 lg:grid-cols-2 lg:gap-16 ${CONTAINER}`}>
          <motion.div {...reveal()}>
            <SectionHeader eyebrow="For growing manufacturing businesses" title="When work is spread out, important details get missed." isDark={isDark} />
            <p className="mt-5 text-lg leading-relaxed sm:text-xl" style={{ color: 'var(--text-heading)', opacity: 0.85 }}>
              A project can look on track while a material shortage, pending approval or unrecorded cost changes the outcome.
            </p>
            <p className="mt-4 leading-relaxed" style={{ color: 'var(--text-body)' }}>
              SESS ERP is being developed to bring related activities into connected workflows, with responsibility and supporting records at each stage.
            </p>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2">
            {problems.map(({ icon: PIcon, title, text }, i) => (
              <motion.article
                key={title}
                {...reveal(i * 0.1)}
                whileHover={{ y: -6 }}
                className="relative p-5 overflow-hidden border group rounded-2xl"
                style={{ background: 'var(--surface-default)', borderColor: 'var(--border-default)', boxShadow: 'var(--shadow-sm)' }}
              >
                <span className="absolute top-0 left-0 w-0 h-1 transition-all duration-500 group-hover:w-full" style={{ background: 'var(--gradient-brand)' }} />
                <span className="flex items-center justify-center mb-4 text-white transition-transform duration-300 w-11 h-11 rounded-xl group-hover:scale-110 group-hover:-rotate-6" style={{ background: 'var(--gradient-brand)' }}>
                  <PIcon className="w-5 h-5" strokeWidth={1.8} />
                </span>
                <h3 className="mb-1.5 text-base font-bold" style={{ color: 'var(--text-heading)' }}>{title}</h3>
                <p className="m-0 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Process ══ */}
      <section id="erp-process" className="py-16 sm:py-20 scroll-mt-28" style={softBg}>
        <div className={CONTAINER}>
          <motion.div {...reveal()} className="flex flex-col gap-4 mb-10 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader eyebrow="How the process connects" title="From customer order to project review." isDark={isDark} />
            <p className="max-w-sm m-0 text-sm" style={{ color: 'var(--text-muted)' }}>Select a stage to see the work involved and why its record matters.</p>
          </motion.div>
          <Workflow isDark={isDark} />
          <p className="mt-5 text-xs" style={{ color: 'var(--text-muted)' }}>
            This is an overview of the intended connected workflow. Specific features and final release scope remain subject to validation.
          </p>
        </div>
      </section>

      {/* ══ Dashboards ══ */}
      <section id="erp-dashboards" className="py-16 sm:py-20 scroll-mt-28" style={sectionBg}>
        <div className={CONTAINER}>
          <motion.div {...reveal()} className="flex flex-col gap-4 mb-10 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader eyebrow="Explore the product preview" title="See the dashboard. Understand its purpose." isDark={isDark} />
            <p className="max-w-sm m-0 text-sm" style={{ color: 'var(--text-muted)' }}>Each role needs a different view. Explore the previews and open the complete image for a closer look.</p>
          </motion.div>
          <DashboardGallery onOpen={setLightbox} />
          <p className="mt-5 text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            <strong style={{ color: 'var(--text-body)' }}>Illustrative demo data only.</strong> All names, figures, document references and performance scores shown are fictional or sample values. They do not represent actual customer records, employee performance or company financial results. ₹10 crore in the management preview is a demonstration value, not a SESS revenue claim. These are illustrative dashboard images, not access to a live ERP account.
          </p>
        </div>
      </section>

      {/* ══ Capabilities ══ */}
      <section id="erp-scope" className="py-16 sm:py-20" style={softBg}>
        <div className={CONTAINER}>
          <motion.div {...reveal()} className="mb-10 text-center">
            <SectionHeader eyebrow="Platform scope under validation" title="The connected activities behind the dashboards." isDark={isDark} />
          </motion.div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: FIcon, color, title, text }, i) => (
              <motion.article
                key={title}
                {...reveal((i % 4) * 0.08)}
                whileHover={{ y: -8 }}
                className="relative p-6 overflow-hidden border group rounded-2xl"
                style={{ background: 'var(--surface-default)', borderColor: 'var(--border-default)', boxShadow: 'var(--shadow-sm)' }}
              >
                <span className="absolute w-32 h-32 transition-opacity duration-500 rounded-full opacity-0 pointer-events-none -top-12 -right-12 blur-2xl group-hover:opacity-40" style={{ background: color }} />
                <span className="relative flex items-center justify-center w-12 h-12 mb-4 transition-transform duration-300 rounded-xl group-hover:scale-110" style={{ background: `${color}1a`, color }}>
                  <FIcon className="w-6 h-6" strokeWidth={1.7} />
                </span>
                <h3 className="relative mb-2 text-base font-bold" style={{ color: 'var(--text-heading)' }}>{title}</h3>
                <p className="relative m-0 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{text}</p>
                <span className="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-500 group-hover:w-full" style={{ background: color }} />
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Practical example ══ */}
      <section className="py-16 sm:py-20" style={sectionBg}>
        <div className={CONTAINER}>
          <motion.div {...reveal()} className="flex flex-col gap-4 mb-10 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader eyebrow="A practical example" title="A custom machine order." isDark={isDark} />
            <p className="max-w-sm m-0 text-sm" style={{ color: 'var(--text-muted)' }}>An illustrative process example for a small manufacturing team. It describes the workflow, not a measured customer result.</p>
          </motion.div>

          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
            <ol className="relative p-0 m-0 list-none">
              <motion.span
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 1.4, ease: EASE }}
                className="absolute w-0.5 origin-top left-5 top-5 bottom-5"
                style={{ background: 'var(--gradient-brand)' }}
              />
              {exampleSteps.map(([head, body], i) => (
                <motion.li key={head} {...reveal(0.15 + i * 0.12)} className="relative flex gap-5 pb-7 last:pb-0">
                  <span className="relative z-10 flex items-center justify-center flex-shrink-0 w-10 h-10 text-sm font-bold text-white rounded-full shadow-lg" style={{ background: 'var(--gradient-brand)' }}>
                    <span className="absolute inset-0 rounded-full sess-pulse-ring" style={{ background: 'var(--color-primary-400)', animationDelay: `${i * 0.4}s` }} />
                    <span className="relative">{i + 1}</span>
                  </span>
                  <div className="pt-1.5">
                    <strong className="block mb-1 text-base" style={{ color: 'var(--text-heading)' }}>{head}</strong>
                    <p className="m-0 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{body}</p>
                  </div>
                </motion.li>
              ))}
            </ol>

            <motion.aside
              {...reveal(0.2)}
              className="relative self-start overflow-hidden text-white p-7 sm:p-9 rounded-3xl"
              style={{ background: 'linear-gradient(145deg, #0f1f3a 0%, #112442 60%, #0b3a4a 100%)' }}
            >
              <div className="absolute w-56 h-56 rounded-full pointer-events-none -top-16 -right-16 blur-3xl sess-glow" style={{ background: 'rgba(0,179,179,0.4)' }} />
              <div className="relative">
                <span className="inline-flex items-center gap-2 px-3 py-1 mb-5 text-xs font-semibold border rounded-full bg-cyan-500/15 border-cyan-400/40 text-cyan-200">
                  <Rocket className="w-3.5 h-3.5" /> Development status
                </span>
                <h3 className="mb-3 text-2xl font-bold leading-tight sm:text-3xl" style={{ fontFamily: 'var(--font-display)', color: '#fff' }}>Practical validation before release.</h3>
                <p className="mb-6 text-sm leading-relaxed text-[#c9d5e5]">
                  Our IT team is developing the platform with input from our own manufacturing and service teams. We are checking workflows in SESS operations and refining the software before commercial introduction.
                </p>
                {/* Timeline */}
                <div className="mb-5 space-y-3">
                  {[['Development', 'Nearing completion', true], ['Validation in SESS operations', 'In progress', true], ['Commercial launch', 'Planned · April 2027', false]].map(([k, v, done], i) => (
                    <div key={k} className="flex items-center gap-3">
                      <span className={`flex items-center justify-center w-6 h-6 rounded-full flex-shrink-0 ${done ? 'bg-[#71e6c3] text-[#0f1f3a]' : 'border-2 border-dashed border-[#71e6c3]/60'}`}>
                        {done && <CheckCircle2 className="w-4 h-4" />}
                        {!done && <span className="w-1.5 h-1.5 rounded-full bg-[#71e6c3] animate-pulse" />}
                      </span>
                      <span className="text-sm"><strong className="font-semibold">{k}</strong> <span className="text-[#9fb2c9]">— {v}</span></span>
                      {i === 1 && <span className="ml-auto hidden sm:block w-16 h-1.5 rounded-full overflow-hidden bg-white/10"><span className="block h-full erp-progress" style={{ background: '#71e6c3' }} /></span>}
                    </div>
                  ))}
                </div>
                <p className="m-0 text-xs text-[#9fb2c9]">Subject to completion of validation. This preview does not constitute a final feature or delivery commitment.</p>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* ══ Approach + FAQ ══ */}
      <section className="py-16 sm:py-20" style={softBg}>
        <div className={`grid gap-12 lg:grid-cols-2 lg:gap-16 ${CONTAINER}`}>
          <motion.div {...reveal()}>
            <SectionHeader eyebrow="Our approach" title="Explain the work. Keep the records." isDark={isDark} />
            <p className="mt-5 leading-relaxed" style={{ color: 'var(--text-body)' }}>
              Our manufacturing, service, calibration and testing experience informs development. The aim is clearer coordination and reviewable records across the project lifecycle.
            </p>
            <p className="mt-4 leading-relaxed" style={{ color: 'var(--text-body)' }}>
              Quality workflows are designed to support inspection information, approvals, responsibilities and evidence within our ISO 9001 quality management processes. ERP software does not itself provide ISO certification.
            </p>
            <motion.div
              {...reveal(0.15)}
              className="flex gap-4 p-5 mt-6 border rounded-2xl"
              style={{ background: 'var(--surface-default)', borderColor: 'var(--border-default)' }}
            >
              <span className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white rounded-xl" style={{ background: 'var(--gradient-brand)' }}>
                <Map className="w-5 h-5" />
              </span>
              <div>
                <strong className="block mb-1" style={{ color: 'var(--text-heading)' }}>Future roadmap</strong>
                <p className="m-0 text-sm" style={{ color: 'var(--text-muted)' }}>
                  Machine connectivity and consolidated equipment reporting are future development plans. Availability and scope will be announced separately.
                </p>
              </div>
            </motion.div>
          </motion.div>

          <div>
            <motion.span {...reveal()} className="block mb-2 text-sm font-semibold tracking-wider uppercase" style={{ color: 'var(--color-primary-500)' }}>
              Questions before you enquire
            </motion.span>
            {faqs.map(([q, a], i) => (
              <FaqItem key={q} q={q} a={a} idx={i} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? -1 : i)} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ Contact CTA ══ */}
      {/* <section id="erp-contact" className="py-16 sm:py-20" style={sectionBg}>
        <div className={CONTAINER}>
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="relative grid gap-10 p-7 overflow-hidden text-white border shadow-2xl sm:p-12 lg:grid-cols-[1.3fr_1fr] rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 border-slate-700/50"
          >
            <div className="absolute rounded-full pointer-events-none -top-20 -right-20 w-60 h-60 bg-cyan-500 blur-3xl sess-glow" />
            <div className="absolute bg-blue-500 rounded-full pointer-events-none -bottom-20 -left-20 w-60 h-60 blur-3xl sess-glow" style={{ animationDelay: '1.2s' }} />

            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 text-xs font-semibold border rounded-full bg-cyan-500/20 border-cyan-400/40 text-cyan-300">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-flex w-full h-full rounded-full animate-ping bg-cyan-400" />
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-cyan-400" />
                </span>
                Discuss your requirements
              </span>
              <h2 className="mb-4 text-3xl font-black tracking-tight text-transparent sm:text-4xl bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-blue-200" style={{ fontFamily: 'var(--font-display)' }}>
                Tell us how your factory works.
              </h2>
              <p className="mb-8 text-sm sm:text-base text-slate-300">
                Exploring ERP for your manufacturing or service business? Speak with SESS about your workflows and receive launch updates.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <motion.a
                  href={MAIL_HREF}
                  whileHover={{ scale: 1.04, boxShadow: '0 20px 40px rgba(6, 182, 212, 0.4)' }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 font-bold text-white shadow-xl rounded-2xl bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-500"
                >
                  <Mail className="w-5 h-5" /> Email an enquiry
                </motion.a>
                <motion.a
                  href={WA_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 font-semibold transition-colors border rounded-2xl border-slate-600 text-slate-200 hover:border-emerald-400/60 hover:text-emerald-300"
                >
                  <MessageCircle className="w-5 h-5" /> Enquire on WhatsApp
                </motion.a>
              </div>
            </div>

            <div className="relative z-10 pt-8 border-t lg:pt-0 lg:pl-10 lg:border-t-0 lg:border-l border-slate-700">
              <strong className="block mb-1 text-lg text-white">Sri Easwari Scientific Solution Pvt Ltd</strong>
              <p className="mb-6 text-sm text-slate-400">Manufacturing experience. In-house software development. Chennai, India.</p>
              <ul className="p-0 m-0 space-y-4 list-none">
                <li>
                  <a href={`mailto:${ERP_EMAIL}`} className="flex items-center gap-3 group">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 text-cyan-300 group-hover:bg-cyan-500/20"><Mail className="w-5 h-5" /></span>
                    <span><small className="block text-[11px] tracking-wider text-slate-400">EMAIL</small><span className="text-sm break-all group-hover:text-cyan-300">{ERP_EMAIL}</span></span>
                  </a>
                </li>
                <li>
                  <a href={`tel:${ERP_PHONE}`} className="flex items-center gap-3 group">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 text-cyan-300 group-hover:bg-cyan-500/20"><Phone className="w-5 h-5" /></span>
                    <span><small className="block text-[11px] tracking-wider text-slate-400">PHONE</small><span className="text-sm group-hover:text-cyan-300">+91 75488 73688</span></span>
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 text-cyan-300"><FileText className="w-5 h-5" /></span>
                  <span><small className="block text-[11px] tracking-wider text-slate-400">PLANNED LAUNCH</small><span className="text-sm">April 2027 · Following completion of validation</span></span>
                </li>
              </ul>
            </div>
          </motion.div>
          <p className="mt-5 text-xs text-center" style={{ color: 'var(--text-muted)' }}>SESS ERP product introduction · All dashboard data is illustrative.</p>
        </div>
      </section> */}

      <Lightbox item={lightbox} onClose={closeLightbox} />
    </div>
  );
}

/* Page-local CSS loops (compositor-only, per perf conventions). */
const ERP_CSS = `
@keyframes erp-float { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(0,-10px,0); } }
.erp-float { will-change: transform; animation: erp-float 6s ease-in-out infinite; }
@keyframes erp-chip { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(0,-8px,0); } }
.erp-chip { animation: erp-chip 4.5s ease-in-out infinite; }
@keyframes erp-pan { 0%,12% { transform: translate3d(0,0,0); } 50%,62% { transform: translate3d(0,calc(-100% + 300px),0); } 100% { transform: translate3d(0,0,0); } }
.erp-pan { will-change: transform; animation: erp-pan 18s ease-in-out infinite; }
@media (min-width: 640px) { @keyframes erp-pan-sm { 0%,12% { transform: translate3d(0,0,0); } 50%,62% { transform: translate3d(0,calc(-100% + 400px),0); } 100% { transform: translate3d(0,0,0); } } .erp-pan { animation-name: erp-pan-sm; } }
@media (min-width: 1024px) { @keyframes erp-pan-lg { 0%,12% { transform: translate3d(0,0,0); } 50%,62% { transform: translate3d(0,calc(-100% + 430px),0); } 100% { transform: translate3d(0,0,0); } } .erp-pan { animation-name: erp-pan-lg; } }
@keyframes erp-scan { 0% { transform: translate3d(0,-64px,0); } 100% { transform: translate3d(0,480px,0); } }
.erp-scan { top: 0; animation: erp-scan 4s linear infinite; }
@keyframes erp-shine { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
.erp-shine { background-size: 200% 200%; animation: erp-shine 6s ease-in-out infinite; }
@keyframes erp-progress { 0% { transform: scaleX(0.2); } 100% { transform: scaleX(0.85); } }
.erp-progress { transform-origin: left; animation: erp-progress 2.4s ease-in-out infinite alternate; }
@keyframes erp-fade-in { from { opacity: 0; } to { opacity: 1; } }
.erp-fade-in { animation: erp-fade-in .25s ease-out both; }
@keyframes erp-zoom-in { from { opacity: 0; transform: scale(.96); } to { opacity: 1; transform: scale(1); } }
.erp-zoom-in { animation: erp-zoom-in .3s cubic-bezier(.22,1,.36,1) both; }
.erp-no-scrollbar { scrollbar-width: none; } .erp-no-scrollbar::-webkit-scrollbar { display: none; }
@media (prefers-reduced-motion: reduce) {
  .erp-float, .erp-chip, .erp-pan, .erp-scan, .erp-shine, .erp-progress, .erp-fade-in, .erp-zoom-in { animation: none; }
  .erp-scan { display: none; }
}
`;
