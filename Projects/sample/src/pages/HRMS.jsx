import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Mail, MessageCircle, Phone, Smartphone, Monitor, Users, UserPlus, UserMinus,
  ShieldCheck, Fingerprint, CalendarDays, CalendarCheck, Clock, MapPin, Wallet, FileText,
  Receipt, Briefcase, ChevronDown, CheckCircle2, Sparkles, Code2, Building2, Lock, Bell,
  LogIn, LogOut, BarChart3, Cake, Award, UserCheck, AlertTriangle, Timer, IndianRupee,
  ClipboardCheck, Landmark, IdCard, HeartPulse, ScanFace, MessagesSquare, MessageSquare, ListTodo,
  CalendarClock, Send, Hash, Paperclip, XCircle, Crosshair,
} from 'lucide-react';
import { SectionHeader } from '../framework/SharedUI';
import { useTheme } from '../context/ThemeContext';

const EASE = [0.22, 1, 0.36, 1];
const CONTAINER = 'max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8';
const CONTACT_EMAIL = 'easwari.kjsb@gmail.com';
const CONTACT_PHONE = '+917548873688';
const MAIL_HREF = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('SESS HRMS enquiry')}`;
const WA_HREF = `https://wa.me/917548873688?text=${encodeURIComponent('Hello SESS, I would like to know more about SESS HRMS.')}`;
const APP_BLUE = '#1f3fbf';

/* ─── Content (from the SESS HRMS requirements) ───────────────────────── */
const trust = [
  { icon: Monitor, label: 'Web app for HR, admin & managers' },
  { icon: Smartphone, label: 'Mobile app for every employee' },
  { icon: ScanFace, label: 'Fingerprint + face-verified, on-site punch-in' },
  { icon: Code2, label: 'Built in-house by the SESS IT team' },
];

const roles = [
  {
    key: 'hr', icon: ShieldCheck, label: 'HR / Admin', color: '#00b3b3',
    summary: 'Full control of people data, attendance and payroll inputs.',
    items: [
      'View and update attendance, personal, master, employment and payroll data',
      'Manage user permissions for every role',
      'Regularise and approve leave requests and attendance corrections',
      'Maintain the company holiday list',
    ],
  },
  {
    key: 'manager', icon: Briefcase, label: 'Department Manager', color: '#2a56a6',
    summary: 'A clear view of the team, with first-level approvals.',
    items: [
      'View attendance of direct reports',
      'Approve leave requests of direct reports — 1st level',
      'Approve reimbursement requests of direct reports — 1st level',
    ],
  },
  {
    key: 'employee', icon: Smartphone, label: 'Employee', color: '#8b5cf6',
    summary: 'Self-service from the mobile app — no paperwork, no chasing.',
    items: [
      'View own attendance and edit own personal data',
      'Raise leave, attendance-correction and reimbursement requests',
      'View job profiles of colleagues',
      'View the company holidays for the year',
    ],
  },
  {
    key: 'accounts', icon: Wallet, label: 'Accounts Team', color: '#f59e0b',
    summary: 'Claims reach accounts already approved by the manager.',
    items: [
      'Approve claim and reimbursement requests',
      'Work from payroll reports — LOP, salary sheet, payslips, ESI & EPF',
    ],
  },
];

const views = [
  { key: 'live', tab: 'Live attendance', icon: Fingerprint,
    title: 'Who is in, right now', text: 'Every verified punch from the mobile app appears instantly — fingerprint and face checked, recorded at the work site — filtered by branch, department or shift.',
    qa: [['Who has not punched in yet?', 'Status chips separate In, Out, No punch-in, Break, Late and Early leaving at a glance.'],
         ['Can someone punch in for a colleague?', "No. Each punch needs the employee's fingerprint and a face match, and is accepted only inside the site boundary."]] },
  { key: 'daily', tab: 'Daily attendance', icon: CalendarCheck,
    title: 'The whole day, one table', text: 'In and out times, working hours and status for every employee, for any chosen date.',
    qa: [['Who came in late today?', 'Late arrivals and early exits are flagged automatically against the shift.'],
         ['Can a missed punch be fixed?', 'Employees raise an attendance-correction request; HR regularises it with a full record.']] },
  { key: 'monthly', tab: 'Monthly dashboard', icon: CalendarDays,
    title: 'A month per employee, colour-coded', text: 'Present, absent, half day, paid leave and week-offs summarised — the inputs payroll needs.',
    qa: [['How many paid days this month?', 'Summary tiles total each status, ready for LOP and salary calculation.'],
         ['What happened on a specific day?', 'Open any date to see its punches and mark present, half day, leave or holiday.']] },
  { key: 'team', tab: 'My Team', icon: Users,
    title: 'Every employee record in one place', text: 'Staff details, bank, salary, leave balances, penalties, overtime and permissions — tabbed per employee.',
    qa: [['Who reports to whom?', 'Reporting managers drive approvals, so requests reach the right person automatically.'],
         ['Can we filter the list?', 'Search by name and filter by branch, department or employment type.']] },
];

const addFields = [
  { icon: IdCard, group: 'Employment', fields: ['Employee ID', 'Date of Joining', 'Designation', 'Department', 'Employment type', 'Reporting manager'] },
  { icon: HeartPulse, group: 'Personal', fields: ['Name', 'Date of Birth', 'Blood group', 'Mobile number', 'Address', 'Emergency contact'] },
  { icon: Landmark, group: 'Statutory & pay', fields: ['ESI number', 'EPF number', 'PAN number', 'Salary / CTC'] },
  { icon: Wallet, group: 'Bank', fields: ['Bank name', 'Account number', 'IFSC code'] },
];
const employmentTypes = ['Permanent', 'Temporary', 'Intern', 'Contract', 'Consultant'];

const exitFields = [
  ['Exit date', 'Recorded on the employee profile'],
  ['Exit reason', 'Resigned · Abscond · Termination'],
  ['Notice period', 'Served · Not served'],
  ['Exit formalities', 'Completed · Not completed'],
];

const requestFlows = [
  { icon: CalendarDays, title: 'Leave request', steps: ['Employee', 'Manager · 1st level', 'HR approves'] },
  { icon: Clock, title: 'Attendance correction', steps: ['Employee', 'HR regularises', 'Attendance updated'] },
  { icon: Receipt, title: 'Reimbursement', steps: ['Employee', 'Manager · 1st level', 'Accounts approves'] },
];

const reports = [
  { icon: CalendarCheck, title: 'Attendance', color: '#00b3b3', items: [['Monthly attendance', CalendarDays], ['Late', Timer], ['Leave', CalendarCheck], ['Overtime (OT)', Clock], ['Mis-punch', AlertTriangle]] },
  { icon: Users, title: 'Employee list', color: '#2a56a6', items: [['Active list', UserCheck], ['Exit list', UserMinus], ['Birthday', Cake], ['Work anniversary', Award], ['Headcount', BarChart3]] },
  { icon: IndianRupee, title: 'Payroll', color: '#8b5cf6', items: [['Loss of Pay (LOP)', AlertTriangle], ['Payslips', FileText], ['Salary sheet', ClipboardCheck], ['ESI & EPF', Landmark]] },
];

const appScreens = ['login', 'verify', 'home', 'chat', 'tasks', 'events', 'leave', 'payslip'];
const appScreenLabels = { login: 'Secure login', verify: 'Verified punch-in', home: 'My day', chat: 'Team chat', tasks: 'My tasks', events: 'Events', leave: 'Raise a request', payslip: 'Payslips' };
const appScreenIcons = { login: Lock, verify: ScanFace, home: Fingerprint, chat: MessagesSquare, tasks: ListTodo, events: CalendarClock, leave: CalendarDays, payslip: FileText };

const faqs = [
  ['Is SESS HRMS a web app or a mobile app?', 'Both. HR, admin, managers and accounts work from the web application; every employee uses the SESS Employee mobile app for punching attendance and raising requests. Both read and write the same records.'],
  ['How is a punch verified?', "Every punch-in on the SESS Employee app passes three checks: the employee's fingerprint, a live face verification and their location. The punch is accepted only when they are inside the work-site boundary; a punch from anywhere else is blocked."],
  ['Is there chat and task management inside the app?', 'Yes. Employees can message colleagues one-to-one or in team chats, see scheduled events and track the tasks assigned to them — alongside attendance and leave, in the same app.'],
  ['Who can see salary and bank details?', 'Access is role-based. HR / Admin manage payroll and bank data; employees see and edit only their own personal data; managers see attendance of their direct reports.'],
  ['How do approvals work?', 'Leave and reimbursement requests go to the reporting manager for first-level approval, then to HR (leave) or the Accounts team (claims). Attendance corrections are regularised by HR.'],
  ['Which reports are available?', 'Attendance (monthly, late, leave, overtime, mis-punch), employee lists (active, exit, birthday, work anniversary, headcount) and payroll (LOP, payslips, salary sheet, ESI & EPF).'],
  ['Can it be set up for our company?', 'Speak with SESS about your team size, shifts, branches and payroll structure. We will discuss the setup and scope that fits your organisation.'],
];

/* Fictional sample data for the illustrative mock-ups. */
const sampleStaff = [
  { n: 'Ilamparithi D', role: 'Accounts Executive', id: 'EMP-1012', st: 'In', t: '09:12 AM', late: false },
  { n: 'Surendar', role: 'Design Engineer', id: 'EMP-1027', st: 'In', t: '09:41 AM', late: true },
  { n: 'Mageshwari', role: 'HR Executive', id: 'EMP-1004', st: 'In', t: '08:58 AM', late: false },
  { n: 'Aishu', role: 'Service Engineer', id: 'EMP-1033', st: 'Out', t: '05:46 PM', late: false },
  { n: 'Divya N', role: 'Software Developer', id: 'EMP-1045', st: 'No punch', t: '—', late: false },
  { n: 'Rahul P', role: 'Production Supervisor', id: 'EMP-1019', st: 'In', t: '09:03 AM', late: false },
];
const avatarColors = ['#00b3b3', '#2a56a6', '#8b5cf6', '#f59e0b', '#ec4899', '#10b981'];
const initials = (n) => n.split(' ').map((p) => p[0]).join('').slice(0, 2);

/* ─── Shared bits ─────────────────────────────────────────────────────── */
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease: EASE },
});

const Avatar = ({ name, i, size = 28 }) => (
  <span
    className="flex items-center justify-center flex-shrink-0 font-bold text-white rounded-full"
    style={{ width: size, height: size, fontSize: size * 0.36, background: avatarColors[i % avatarColors.length] }}
  >
    {initials(name)}
  </span>
);

const statusStyle = {
  In: { bg: '#dcfce7', fg: '#15803d' },
  Out: { bg: '#e0e7ff', fg: '#3730a3' },
  'No punch': { bg: '#fee2e2', fg: '#b91c1c' },
};

/* ─── Mock-up panels (illustrative, fictional data) ───────────────────── */
function MockFrame({ title, children, compact }) {
  return (
    <div className="overflow-hidden text-left bg-white shadow-2xl rounded-xl ring-1 ring-black/5 text-slate-800">
      <div className="flex items-center gap-1.5 px-3 py-2 border-b bg-slate-50 border-slate-200">
        <i className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <i className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <i className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[11px] text-slate-500 truncate">SESS HRMS · {title}</span>
      </div>
      <div className={compact ? 'p-3' : 'p-3 sm:p-4'}>{children}</div>
    </div>
  );
}

function LiveMock({ compact }) {
  const chips = [['In', 37, '#16a34a'], ['Out', 1, '#4f46e5'], ['No punch-in', 4, '#dc2626'], ['Break', 0, '#64748b'], ['Late', 17, '#d97706'], ['Early leaving', 3, '#db2777']];
  return (
    <MockFrame title="Live attendance" compact={compact}>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {chips.map(([k, v, c], i) => (
          <span key={k} className={`px-2 py-1 text-[10px] sm:text-[11px] font-semibold border rounded-md ${compact && i > 3 ? 'hidden sm:inline' : ''}`} style={{ color: c, borderColor: `${c}55`, background: `${c}0f` }}>
            {k} ({v})
          </span>
        ))}
      </div>
      <div className="divide-y divide-slate-100">
        {sampleStaff.slice(0, compact ? 4 : 6).map((s, i) => (
          <div key={s.id} className="flex items-center gap-2.5 py-2 hrms-row" style={{ animationDelay: `${i * 0.12}s` }}>
            <span className="relative">
              <Avatar name={s.n} i={i} />
              {s.st === 'In' && <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-500 ring-2 ring-white" />}
            </span>
            <span className="flex-1 min-w-0">
              <span className="block text-xs font-semibold truncate">{s.n}</span>
              <span className="flex items-center gap-1 text-[10px] text-slate-400 truncate"><MapPin className="w-2.5 h-2.5 flex-shrink-0" />Chennai, India</span>
            </span>
            <span className="text-right">
              <span className="block px-2 py-0.5 text-[10px] font-bold rounded" style={{ background: statusStyle[s.st].bg, color: statusStyle[s.st].fg }}>{s.st}</span>
              <span className="block text-[10px] text-slate-400 mt-0.5">{s.t}</span>
            </span>
          </div>
        ))}
      </div>
    </MockFrame>
  );
}

function DailyMock() {
  return (
    <MockFrame title="Daily attendance">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold">Sample day · Monday</span>
        <span className="text-[10px] px-2 py-1 rounded bg-slate-100 text-slate-500">General shift 09:00 – 18:00</span>
      </div>
      <div className="grid grid-cols-[1.4fr_.8fr_.8fr_.7fr] gap-x-2 text-[10px] font-semibold text-slate-400 uppercase pb-1.5 border-b border-slate-100">
        <span>Employee</span><span>In</span><span>Out</span><span>Status</span>
      </div>
      {sampleStaff.map((s, i) => {
        const tag = s.st === 'No punch' ? ['Absent', '#fee2e2', '#b91c1c'] : s.late ? ['Late', '#fef3c7', '#b45309'] : ['Present', '#dcfce7', '#15803d'];
        return (
          <div key={s.id} className="grid grid-cols-[1.4fr_.8fr_.8fr_.7fr] gap-x-2 items-center py-2 border-b border-slate-50 text-[11px] hrms-row" style={{ animationDelay: `${i * 0.1}s` }}>
            <span className="flex items-center min-w-0 gap-2"><Avatar name={s.n} i={i} size={22} /><span className="truncate">{s.n}</span></span>
            <span>{s.st === 'No punch' ? '—' : s.st === 'Out' ? '09:05 AM' : s.t}</span>
            <span>{s.st === 'Out' ? s.t : '—'}</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold text-center" style={{ background: tag[1], color: tag[2] }}>{tag[0]}</span>
          </div>
        );
      })}
    </MockFrame>
  );
}

const monthPattern = 'xxxPPPLWPPLPPHWPPPPLWPPPPLWPPxx'.split('');
function MonthlyMock() {
  const style = {
    P: ['#22c55e', '#fff'], L: ['#f59e0b', '#fff'], W: ['#64748b', '#fff'], H: ['#a855f7', '#fff'],
  };
  const tiles = [['Present', 16, '#22c55e'], ['Absent', 0, '#ef4444'], ['Half day', 2, '#f59e0b'], ['Paid leave', 1, '#a855f7'], ['Week off', 4, '#64748b']];
  let day = 0;
  return (
    <MockFrame title="Monthly attendance · sample employee">
      <div className="grid grid-cols-5 gap-1.5 mb-3">
        {tiles.map(([k, v, c]) => (
          <div key={k} className="px-2 py-1.5 rounded-md border-l-[3px] bg-slate-50" style={{ borderColor: c }}>
            <span className="block text-[9px] sm:text-[10px] text-slate-500 truncate">{k}</span>
            <span className="block text-sm font-bold">{v}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <span key={i} className="text-[10px] font-semibold text-slate-400">{d}</span>)}
        {monthPattern.map((c, i) => {
          if (c === 'x') return <span key={i} />;
          day += 1;
          const [bg, fg] = style[c];
          return (
            <span key={i} className="flex flex-col items-center justify-center rounded aspect-square text-[10px] font-bold hrms-pop" style={{ background: bg, color: fg, animationDelay: `${i * 0.025}s` }}>
              {String(day).padStart(2, '0')}
              {c === 'L' && <span className="text-[6px] leading-none">LATE</span>}
            </span>
          );
        })}
      </div>
    </MockFrame>
  );
}

function TeamMock() {
  const types = ['Permanent', 'Permanent', 'Contract', 'Permanent', 'Intern', 'Permanent'];
  return (
    <MockFrame title="My Team">
      <div className="flex gap-3 mb-3 overflow-hidden text-[10px] font-semibold border-b border-slate-100">
        {['Staff details', 'Attendance', 'Bank', 'Salary', 'Leave balances', 'Permissions'].map((t, i) => (
          <span key={t} className={`pb-1.5 whitespace-nowrap ${i === 0 ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-400'}`}>{t}</span>
        ))}
      </div>
      <div className="flex items-center gap-2 mb-2">
        <span className="flex-1 px-2 py-1 text-[10px] border rounded text-slate-400 border-slate-200">Search staff…</span>
        <span className="px-2 py-1 text-[10px] font-semibold text-white rounded" style={{ background: APP_BLUE }}>+ Add staff</span>
      </div>
      {sampleStaff.map((s, i) => (
        <div key={s.id} className="grid grid-cols-[1.5fr_1fr_.8fr] gap-2 items-center py-1.5 border-b border-slate-50 text-[11px] hrms-row" style={{ animationDelay: `${i * 0.1}s` }}>
          <span className="flex items-center min-w-0 gap-2"><Avatar name={s.n} i={i} size={22} /><span className="min-w-0"><span className="block font-semibold text-blue-700 truncate">{s.n}</span><span className="block text-[9px] text-slate-400 truncate">{s.role}</span></span></span>
          <span className="text-slate-500">{s.id}</span>
          <span className="text-slate-500">{types[i]}</span>
        </div>
      ))}
    </MockFrame>
  );
}

const viewMocks = { live: LiveMock, daily: DailyMock, monthly: MonthlyMock, team: TeamMock };

/* Phone mock-up of the SESS Employee app. */
function PhoneScreen({ screen }) {
  if (screen === 'login') {
    return (
      <div className="flex flex-col items-center h-full px-4 pt-10 text-white" style={{ background: `linear-gradient(160deg, ${APP_BLUE}, #142c8a)` }}>
        <span className="flex items-center justify-center mb-3 bg-white rounded-full shadow-lg w-14 h-14">
          <Fingerprint className="w-7 h-7" style={{ color: APP_BLUE }} />
        </span>
        <span className="text-base font-bold">SESS Employee</span>
        <span className="text-[8px] tracking-[0.2em] opacity-80 mb-5">SRI EASWARI SCIENTIFIC SOLUTION</span>
        <div className="w-full p-3 bg-white shadow-xl text-slate-800 rounded-xl">
          <span className="flex items-center gap-1 mb-0.5 text-xs font-bold"><Lock className="w-3 h-3" /> Sign in</span>
          <span className="block mb-2 text-[9px] text-slate-400">Username & password, or PIN</span>
          <span className="block px-2 py-1.5 mb-1.5 text-[9px] rounded bg-slate-100 text-slate-400">Username</span>
          <span className="block px-2 py-1.5 mb-2 text-[9px] rounded bg-slate-100 text-slate-400">••••••••</span>
          <span className="block py-1.5 text-[10px] font-bold text-center text-white rounded-md" style={{ background: APP_BLUE }}>Sign In</span>
          <span className="block mt-1.5 text-[9px] text-center font-semibold" style={{ color: APP_BLUE }}>Login with PIN instead</span>
        </div>
      </div>
    );
  }
  if (screen === 'home') {
    return (
      <div className="h-full bg-slate-50">
        <div className="px-4 pb-8 text-white pt-7 rounded-b-3xl" style={{ background: APP_BLUE }}>
          <span className="block text-[10px] opacity-80">Good morning,</span>
          <span className="block text-sm font-bold">Ilamparithi D</span>
          <span className="block text-[9px] opacity-80">General shift · 09:00 – 18:00</span>
        </div>
        <div className="flex flex-col items-center -mt-6">
          <span className="relative flex items-center justify-center w-24 h-24 text-white rounded-full shadow-xl" style={{ background: 'linear-gradient(135deg,#22c55e,#15803d)' }}>
            <span className="absolute inset-0 rounded-full sess-pulse-ring" style={{ background: '#22c55e' }} />
            <span className="relative flex flex-col items-center"><LogIn className="w-6 h-6" /><span className="text-[10px] font-bold mt-0.5">PUNCH IN</span></span>
          </span>
          <span className="flex items-center gap-1 mt-2 text-[9px] text-slate-500"><ScanFace className="w-2.5 h-2.5" /> Fingerprint · face · on-site only</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 px-3 mt-3">
          {[['Present', '16'], ['Leave', '1'], ['Late', '2']].map(([k, v]) => (
            <span key={k} className="py-1.5 text-center bg-white rounded-lg shadow-sm"><span className="block text-sm font-bold" style={{ color: APP_BLUE }}>{v}</span><span className="block text-[8px] text-slate-400">{k}</span></span>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-1.5 px-3 mt-2">
          {[[MessagesSquare, 'Chat'], [ListTodo, 'Tasks'], [CalendarClock, 'Events'], [CalendarDays, 'Leave']].map(([I, k]) => (
            <span key={k} className="flex items-center gap-1.5 px-2 py-1.5 bg-white rounded-lg shadow-sm text-[9px] font-semibold text-slate-600"><I className="w-3 h-3" style={{ color: APP_BLUE }} />{k}</span>
          ))}
        </div>
      </div>
    );
  }
  if (screen === 'verify') {
    return (
      <div className="flex flex-col items-center h-full px-4 text-white pt-7" style={{ background: 'linear-gradient(180deg,#0b1430,#13286b)' }}>
        <span className="mb-2 text-[11px] font-bold tracking-wide">Verify to punch in</span>
        <div className="relative h-32 overflow-hidden w-28 rounded-2xl bg-white/5">
          {['top-0 left-0 border-t-2 border-l-2 rounded-tl-xl', 'top-0 right-0 border-t-2 border-r-2 rounded-tr-xl', 'bottom-0 left-0 border-b-2 border-l-2 rounded-bl-xl', 'bottom-0 right-0 border-b-2 border-r-2 rounded-br-xl'].map((c) => (
            <span key={c} className={`absolute w-5 h-5 border-[#71e6c3] ${c}`} />
          ))}
          <ScanFace className="absolute w-16 h-16 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 text-white/70" strokeWidth={1.2} />
          <span className="absolute inset-x-2 h-0.5 hrms-scan" style={{ background: '#71e6c3', boxShadow: '0 0 12px #71e6c3' }} />
        </div>
        <div className="w-full mt-4 space-y-1.5">
          {[[Fingerprint, 'Fingerprint matched'], [ScanFace, 'Face verified'], [Crosshair, 'Inside work site']].map(([I, k], i) => (
            <span key={k} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/10 text-[10px] hrms-row" style={{ animationDelay: `${0.3 + i * 0.35}s` }}>
              <I className="w-3.5 h-3.5 text-[#71e6c3]" />{k}<CheckCircle2 className="w-3.5 h-3.5 ml-auto text-green-400" />
            </span>
          ))}
        </div>
        <span className="block w-full py-2 mt-3 text-[10px] font-bold text-center rounded-lg hrms-row" style={{ background: '#22c55e', animationDelay: '1.4s' }}>Punch in · 09:12 AM</span>
      </div>
    );
  }
  if (screen === 'chat') {
    const msgs = [['Meena S', 'Safety audit moved to 3 PM today.', false], ['You', 'Noted — I will update the team.', true], ['Arun M', 'Drawings shared in the group 📎', false], ['You', 'Thanks! Reviewing now.', true]];
    return (
      <div className="flex flex-col h-full bg-slate-50">
        <div className="flex items-center gap-2 px-3 pb-2 text-white pt-7" style={{ background: APP_BLUE }}>
          <Hash className="w-3.5 h-3.5" /><span className="text-[11px] font-bold">production-team</span><span className="ml-auto text-[8px] opacity-80">12 members</span>
        </div>
        <div className="flex-1 px-2.5 py-2 space-y-1.5">
          {msgs.map(([who, t, me], i) => (
            <div key={i} className={`flex ${me ? 'justify-end' : 'justify-start'} hrms-row`} style={{ animationDelay: `${i * 0.3}s` }}>
              <span className={`max-w-[80%] px-2 py-1.5 rounded-xl text-[9px] leading-snug ${me ? 'text-white rounded-br-sm' : 'bg-white text-slate-700 shadow-sm rounded-bl-sm'}`} style={me ? { background: APP_BLUE } : undefined}>
                {!me && <span className="block text-[8px] font-bold" style={{ color: avatarColors[i] }}>{who}</span>}{t}
              </span>
            </div>
          ))}
          <span className="flex gap-1 px-2 py-1.5 bg-white rounded-xl shadow-sm w-10 hrms-row" style={{ animationDelay: '1.3s' }}>
            {[0, 1, 2].map((d) => <i key={d} className="w-1.5 h-1.5 rounded-full bg-slate-400 hrms-typing" style={{ animationDelay: `${d * 0.15}s` }} />)}
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 pb-3">
          <span className="flex-1 px-2 py-1.5 text-[9px] bg-white rounded-full shadow-sm text-slate-400">Message…</span>
          <span className="flex items-center justify-center w-6 h-6 text-white rounded-full" style={{ background: APP_BLUE }}><Send className="w-3 h-3" /></span>
        </div>
      </div>
    );
  }
  if (screen === 'tasks') {
    const tasks = [['Submit inspection report', 'Today', true], ['Calibrate chamber #4', 'Today', false], ['Update BOM for order', 'Tomorrow', false], ['Customer site visit', 'Fri', false]];
    return (
      <div className="h-full px-3 pt-7 bg-slate-50">
        <span className="block text-sm font-bold text-slate-800">My tasks</span>
        <span className="block mb-2 text-[9px] text-slate-400">4 assigned · 1 done</span>
        <div className="h-1.5 mb-3 overflow-hidden rounded-full bg-slate-200"><span className="block h-full rounded-full hrms-progress-25" style={{ background: APP_BLUE }} /></div>
        {tasks.map(([t, due, done], i) => (
          <span key={t} className="flex items-center gap-2 px-2.5 py-2 mb-1.5 bg-white rounded-lg shadow-sm hrms-row" style={{ animationDelay: `${i * 0.15}s` }}>
            <span className={`w-3.5 h-3.5 rounded flex items-center justify-center flex-shrink-0 ${done ? 'bg-green-500' : 'border border-slate-300'}`}>{done && <CheckCircle2 className="w-3 h-3 text-white" />}</span>
            <span className={`flex-1 text-[9px] font-semibold ${done ? 'line-through text-slate-400' : 'text-slate-700'}`}>{t}</span>
            <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${due === 'Today' ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-500'}`}>{due}</span>
          </span>
        ))}
      </div>
    );
  }
  if (screen === 'events') {
    const evs = [['10:00', 'Safety training', 'Training hall', '#00b3b3'], ['15:00', 'Monthly review', 'Conference room', '#2a56a6'], ['17:30', 'Birthday celebration', 'Cafeteria', '#ec4899']];
    return (
      <div className="h-full px-3 pt-7 bg-slate-50">
        <span className="block mb-2 text-sm font-bold text-slate-800">Events</span>
        <div className="grid grid-cols-5 gap-1 mb-3">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((d, i) => (
            <span key={d} className={`py-1 text-center rounded-lg text-[8px] font-semibold ${i === 2 ? 'text-white' : 'bg-white text-slate-500 shadow-sm'}`} style={i === 2 ? { background: APP_BLUE } : undefined}>{d}<span className="block text-[10px] font-bold">{12 + i}</span></span>
          ))}
        </div>
        {evs.map(([t, k, where, c], i) => (
          <span key={k} className="flex gap-2 p-2 mb-1.5 bg-white rounded-lg shadow-sm hrms-row" style={{ animationDelay: `${i * 0.2}s`, borderLeft: `3px solid ${c}` }}>
            <span className="text-[9px] font-bold text-slate-500 w-8">{t}</span>
            <span className="flex-1"><span className="block text-[10px] font-semibold text-slate-700">{k}</span><span className="block text-[8px] text-slate-400">{where}</span></span>
          </span>
        ))}
        <span className="flex items-center justify-center gap-1 py-2 mt-2 text-[9px] font-bold rounded-lg" style={{ color: APP_BLUE, background: '#e0e7ff' }}><Bell className="w-3 h-3" /> Reminder 15 min before</span>
      </div>
    );
  }
  if (screen === 'leave') {
    return (
      <div className="h-full px-3 pt-7 bg-slate-50">
        <span className="block mb-3 text-sm font-bold text-slate-800">New leave request</span>
        {[['Leave type', 'Paid leave'], ['From', 'Mon, sample date'], ['To', 'Tue, sample date'], ['Reason', 'Family function']].map(([k, v]) => (
          <span key={k} className="block px-2.5 py-1.5 mb-1.5 bg-white rounded-lg shadow-sm"><span className="block text-[8px] text-slate-400">{k}</span><span className="block text-[10px] font-semibold text-slate-700">{v}</span></span>
        ))}
        <span className="block py-2 mt-2 text-[10px] font-bold text-center text-white rounded-lg" style={{ background: APP_BLUE }}>Submit request</span>
        <div className="p-2 mt-3 bg-white rounded-lg shadow-sm">
          <span className="block mb-1.5 text-[9px] font-bold text-slate-600">Approval status</span>
          {[['Manager · 1st level', true], ['HR', false]].map(([k, done]) => (
            <span key={k} className="flex items-center gap-1.5 mb-1 text-[9px] text-slate-600">
              <span className={`w-3 h-3 rounded-full flex items-center justify-center ${done ? 'bg-green-500' : 'border border-dashed border-amber-500'}`}>{done && <CheckCircle2 className="w-2.5 h-2.5 text-white" />}</span>
              {k} <span className={`ml-auto font-semibold ${done ? 'text-green-600' : 'text-amber-600'}`}>{done ? 'Approved' : 'Pending'}</span>
            </span>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="h-full px-3 pt-7 bg-slate-50">
      <span className="block mb-3 text-sm font-bold text-slate-800">Payslips</span>
      <div className="p-3 mb-2 text-white shadow-lg rounded-xl" style={{ background: `linear-gradient(135deg, ${APP_BLUE}, #00b3b3)` }}>
        <span className="block text-[9px] opacity-80">Net pay · sample month</span>
        <span className="block text-lg font-bold">₹ ••,•••</span>
        <span className="block text-[8px] opacity-80">Sample values for illustration</span>
      </div>
      {['Earnings', 'Deductions · ESI & EPF', 'Loss of pay (LOP)'].map((k, i) => (
        <span key={k} className="flex items-center justify-between px-2.5 py-2 mb-1.5 bg-white rounded-lg shadow-sm text-[10px] text-slate-600">
          {k}<span className="h-1.5 rounded-full bg-slate-200" style={{ width: 40 - i * 10 }} />
        </span>
      ))}
      <span className="flex items-center justify-center gap-1 py-2 mt-2 text-[10px] font-bold rounded-lg" style={{ color: APP_BLUE, background: '#e0e7ff' }}><FileText className="w-3 h-3" /> Download PDF</span>
    </div>
  );
}

function PhoneMock({ screen, className = '' }) {
  return (
    <div className={`relative w-[200px] h-[410px] rounded-[2.2rem] p-2 bg-slate-900 shadow-2xl ring-1 ring-white/10 ${className}`}>
      <span className="absolute z-20 w-16 h-4 -translate-x-1/2 bg-black rounded-full top-3 left-1/2" />
      <div className="relative w-full h-full overflow-hidden rounded-[1.7rem] bg-white">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={screen}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="absolute inset-0"
          >
            <PhoneScreen screen={screen} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* Cycles phone screens while visible; stops when the visitor picks one. */
function usePhoneCycle(inView) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (paused || reduce || !inView) return undefined;
    const t = setInterval(() => setIdx((i) => (i + 1) % appScreens.length), 3200);
    return () => clearInterval(t);
  }, [paused, reduce, inView]);
  return [idx, (i) => { setIdx(i); setPaused(true); }];
}

/* ─── Verified punch-in ───────────────────────────────────────────────── */
const punchChecks = [
  { icon: Fingerprint, title: 'Biometric fingerprint', text: 'The employee confirms the punch with their own fingerprint on the phone.', color: '#00b3b3' },
  { icon: ScanFace, title: 'Face verification', text: 'A live face check confirms the person punching is the registered employee.', color: '#2a56a6' },
  { icon: Crosshair, title: 'On-site location only', text: 'The punch is accepted only inside the work-site boundary — never from home or on the way.', color: '#8b5cf6' },
];

function PunchVisual({ step }) {
  return (
    <div className="relative flex items-center justify-center w-full h-72 sm:h-80">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={step} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.4, ease: EASE }} className="absolute inset-0 flex flex-col items-center justify-center">
          {step === 0 && (
            <>
              <span className="relative flex items-center justify-center overflow-hidden rounded-full w-36 h-36" style={{ background: 'rgba(0,179,179,0.12)' }}>
                <span className="absolute inset-0 rounded-full sess-pulse-ring" style={{ background: 'rgba(0,179,179,0.35)' }} />
                <Fingerprint className="w-20 h-20 text-[#00b3b3]" strokeWidth={1.2} />
                <span className="absolute inset-x-6 h-0.5 hrms-scan" style={{ background: '#00b3b3', boxShadow: '0 0 12px #00b3b3' }} />
              </span>
              <span className="mt-5 text-sm font-semibold" style={{ color: 'var(--text-heading)' }}>Reading fingerprint…</span>
            </>
          )}
          {step === 1 && (
            <>
              <span className="relative overflow-hidden w-36 h-44 rounded-3xl" style={{ background: 'rgba(42,86,166,0.1)' }}>
                {['top-0 left-0 border-t-[3px] border-l-[3px] rounded-tl-2xl', 'top-0 right-0 border-t-[3px] border-r-[3px] rounded-tr-2xl', 'bottom-0 left-0 border-b-[3px] border-l-[3px] rounded-bl-2xl', 'bottom-0 right-0 border-b-[3px] border-r-[3px] rounded-br-2xl'].map((c) => (
                  <span key={c} className={`absolute w-8 h-8 border-[#2a56a6] ${c}`} />
                ))}
                <ScanFace className="absolute w-24 h-24 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 text-[#2a56a6]" strokeWidth={1} />
                <span className="absolute h-0.5 inset-x-3 hrms-scan" style={{ background: '#2a56a6', boxShadow: '0 0 12px #2a56a6' }} />
              </span>
              <span className="mt-5 text-sm font-semibold" style={{ color: 'var(--text-heading)' }}>Matching face…</span>
            </>
          )}
          {step === 2 && (
            <>
              <span className="relative flex items-center justify-center w-48 h-48">
                <span className="absolute inset-0 border-2 border-dashed rounded-full border-[#8b5cf6]" style={{ background: 'rgba(139,92,246,0.08)' }} />
                <span className="absolute inset-0 rounded-full hrms-radar" style={{ background: 'conic-gradient(from 0deg, rgba(139,92,246,0.35), transparent 30%)' }} />
                <span className="absolute flex flex-col items-center -translate-x-1/2 left-1/2 top-[30%]">
                  <Building2 className="w-7 h-7 text-[#8b5cf6]" />
                  <span className="text-[10px] font-bold text-[#8b5cf6]">WORK SITE</span>
                </span>
                <span className="absolute w-4 h-4 bg-green-500 rounded-full left-[40%] top-[64%] ring-4 ring-green-500/30" />
                <span className="absolute px-2 py-0.5 text-[10px] font-bold text-white bg-green-500 rounded-full left-[50%] top-[63%]">Inside ✓</span>
                <span className="absolute top-0 w-3 h-3 rounded-full bg-rose-500 -right-4" />
                <span className="absolute -right-12 top-4 px-2 py-0.5 text-[10px] font-bold text-white bg-rose-500 rounded-full">Blocked</span>
              </span>
              <span className="mt-5 text-sm font-semibold" style={{ color: 'var(--text-heading)' }}>Checking site boundary…</span>
            </>
          )}
          {step === 3 && (
            <>
              <span className="relative flex items-center justify-center text-white rounded-full shadow-xl w-28 h-28" style={{ background: 'linear-gradient(135deg,#22c55e,#15803d)' }}>
                <span className="absolute inset-0 rounded-full sess-pulse-ring" style={{ background: '#22c55e' }} />
                <CheckCircle2 className="relative w-14 h-14" />
              </span>
              <span className="mt-5 text-base font-bold" style={{ color: 'var(--text-heading)' }}>Punch accepted · 09:12 AM</span>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Verified employee · at the work site</span>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function VerifiedPunch() {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.3 });
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!inView || reduce || paused) return undefined;
    const t = setInterval(() => setStep((s) => (s + 1) % 4), 2200);
    return () => clearInterval(t);
  }, [inView, reduce, paused]);
  return (
    <div ref={ref} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
      <div className="space-y-4">
        {punchChecks.map((c, i) => {
          const I = c.icon;
          const done = step > i;
          const active = step === i;
          return (
            <motion.button
              key={c.title}
              type="button"
              {...reveal(i * 0.1)}
              onClick={() => { setStep(i); setPaused(true); }}
              aria-pressed={active}
              className="relative flex items-start w-full gap-4 p-5 overflow-hidden text-left border rounded-2xl"
              style={{
                background: 'var(--surface-default)',
                borderColor: active ? c.color : 'var(--border-default)',
                boxShadow: active ? `0 12px 30px ${c.color}33` : 'var(--shadow-sm)',
                transition: 'border-color .35s, box-shadow .35s',
              }}
            >
              <span className="relative flex items-center justify-center flex-shrink-0 w-12 h-12 text-white rounded-xl" style={{ background: c.color }}>
                <I className="w-6 h-6" strokeWidth={1.7} />
              </span>
              <span className="flex-1 min-w-0">
                <span className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-bold tracking-wider" style={{ color: c.color }}>CHECK {i + 1}</span>
                  {done && <span className="flex items-center gap-1 text-[11px] font-bold text-green-600"><CheckCircle2 className="w-3.5 h-3.5" /> Passed</span>}
                </span>
                <span className="block mb-1 text-base font-bold" style={{ color: 'var(--text-heading)' }}>{c.title}</span>
                <span className="block text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{c.text}</span>
              </span>
              {active && !paused && <span key={`p-${step}`} className="absolute bottom-0 left-0 h-1 hrms-progress-fast" style={{ background: c.color }} />}
            </motion.button>
          );
        })}
        <motion.div {...reveal(0.35)} className="flex items-center gap-3 p-4 border border-dashed rounded-2xl" style={{ borderColor: 'var(--border-strong)' }}>
          <XCircle className="flex-shrink-0 w-6 h-6 text-rose-500" />
          <span className="text-sm" style={{ color: 'var(--text-body)' }}><strong style={{ color: 'var(--text-heading)' }}>No proxy punches.</strong> If any check fails — wrong finger, a different face or outside the site — the punch is not recorded.</span>
        </motion.div>
      </div>
      <motion.div {...reveal(0.15)} className="relative p-6 overflow-hidden border rounded-3xl" style={{ background: 'var(--surface-default)', borderColor: 'var(--border-default)', boxShadow: 'var(--shadow-md)' }}>
        <div className="absolute w-64 h-64 rounded-full pointer-events-none -top-20 -right-20 blur-3xl sess-glow" style={{ background: 'rgba(0,179,179,0.25)' }} />
        <div className="relative flex justify-center gap-2 mb-2">
          {[0, 1, 2, 3].map((d) => (
            <span key={d} className="h-1.5 rounded-full transition-all duration-500" style={{ width: step === d ? 28 : 10, background: step >= d ? 'var(--color-primary-500)' : 'var(--border-default)' }} />
          ))}
        </div>
        <PunchVisual step={step} />
      </motion.div>
    </div>
  );
}

/* ─── Collaboration: chat, events, tasks ──────────────────────────────── */
function PersonalChatMock() {
  const msgs = [['Hi Arjun, can you share the June claim receipts?', false], ['Sure — uploading them now.', true], ['receipts_june.pdf', true, true], ['Got it, approving today 👍', false]];
  return (
    <MockFrame title="Chat · Ranjeeth B (HR)">
      <div className="flex items-center gap-2 pb-2 mb-2 border-b border-slate-100">
        <span className="relative"><Avatar name="Meena S" i={2} size={30} /><span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-500 ring-2 ring-white" /></span>
        <span><span className="block text-xs font-bold">Ranjeeth B</span><span className="block text-[10px] text-green-600">Online</span></span>
      </div>
      <div className="space-y-2 min-h-[220px]">
        {msgs.map(([t, me, file], i) => (
          <div key={i} className={`flex ${me ? 'justify-end' : 'justify-start'} hrms-row`} style={{ animationDelay: `${i * 0.35}s` }}>
            <span className={`max-w-[75%] px-3 py-2 rounded-2xl text-xs ${me ? 'text-white rounded-br-md' : 'bg-slate-100 text-slate-700 rounded-bl-md'}`} style={me ? { background: APP_BLUE } : undefined}>
              {file ? <span className="flex items-center gap-1.5"><Paperclip className="w-3.5 h-3.5" />{t}</span> : t}
            </span>
          </div>
        ))}
        <span className="flex gap-1 px-3 py-2.5 rounded-2xl bg-slate-100 w-14 hrms-row" style={{ animationDelay: '1.5s' }}>
          {[0, 1, 2].map((d) => <i key={d} className="w-1.5 h-1.5 rounded-full bg-slate-400 hrms-typing" style={{ animationDelay: `${d * 0.15}s` }} />)}
        </span>
      </div>
    </MockFrame>
  );
}

function TeamChatMock() {
  const channels = [['production-team', 3], ['service-field', 0], ['design', 1], ['announcements', 0]];
  const msgs = [['Rahul P', 'Batch 2 assembly done, moving to testing.'], ['Arun M', 'Updated drawings attached for the walk-in chamber.'], ['Vignesh T', 'Reached customer site, starting installation.']];
  return (
    <MockFrame title="Team chat">
      <div className="grid grid-cols-[0.8fr_1.6fr] gap-3 min-h-[250px]">
        <div className="pr-2 space-y-1 border-r border-slate-100">
          <span className="block mb-1 text-[10px] font-bold text-slate-400 uppercase">Channels</span>
          {channels.map(([c, n], i) => (
            <span key={c} className={`flex items-center gap-1 px-2 py-1.5 rounded-md text-[11px] ${i === 0 ? 'font-bold text-white' : 'text-slate-600'}`} style={i === 0 ? { background: APP_BLUE } : undefined}>
              <Hash className="flex-shrink-0 w-3 h-3" /><span className="truncate">{c}</span>
              {n > 0 && <span className={`ml-auto px-1.5 rounded-full text-[9px] font-bold ${i === 0 ? 'bg-white/25' : 'bg-rose-500 text-white'}`}>{n}</span>}
            </span>
          ))}
        </div>
        <div className="min-w-0 space-y-2.5">
          {msgs.map(([who, t], i) => (
            <div key={who} className="flex gap-2 hrms-row" style={{ animationDelay: `${i * 0.35}s` }}>
              <Avatar name={who} i={i + 3} size={26} />
              <span className="min-w-0"><span className="block text-[11px] font-bold">{who} <span className="font-normal text-slate-400">· 10:{12 + i * 7}</span></span><span className="block text-xs text-slate-600">{t}</span></span>
            </div>
          ))}
          <span className="flex items-center gap-2 px-2 py-1.5 mt-2 text-[11px] border rounded-lg border-slate-200 text-slate-400"><span className="truncate">Message #production-team</span><Send className="flex-shrink-0 w-3.5 h-3.5 ml-auto" style={{ color: APP_BLUE }} /></span>
        </div>
      </div>
    </MockFrame>
  );
}

function EventsMock() {
  const events = [['Mon', '10:00', 'Safety training', 'All production staff', '#00b3b3'], ['Wed', '15:00', 'Monthly review meeting', 'Department heads', '#2a56a6'], ['Thu', '11:00', 'Customer site visit', 'Service team', '#f59e0b'], ['Fri', '17:30', 'Birthday celebration', 'Everyone', '#ec4899']];
  return (
    <MockFrame title="Events">
      <div className="grid grid-cols-5 gap-1.5 mb-3">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((d, i) => (
          <span key={d} className="py-1.5 text-center rounded-lg text-[10px] font-semibold bg-slate-50 text-slate-500">
            {d}<span className="block text-sm font-bold text-slate-700">{10 + i}</span>
            <span className="flex justify-center gap-0.5 mt-0.5 h-1.5">{events.filter((e) => e[0] === d).map((e) => <i key={e[2]} className="w-1.5 h-1.5 rounded-full" style={{ background: e[4] }} />)}</span>
          </span>
        ))}
      </div>
      <div className="space-y-2">
        {events.map(([d, t, k, who, c], i) => (
          <div key={k} className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-50 hrms-row" style={{ animationDelay: `${i * 0.2}s`, borderLeft: `3px solid ${c}` }}>
            <span className="w-14 text-[10px] font-bold text-slate-500">{d} {t}</span>
            <span className="flex-1 min-w-0"><span className="block text-xs font-bold truncate">{k}</span><span className="block text-[10px] text-slate-400 truncate">{who}</span></span>
            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold" style={{ background: `${c}1a`, color: c }}>Invited</span>
          </div>
        ))}
      </div>
    </MockFrame>
  );
}

function TasksMock() {
  const cols = [
    ['To do', '#64748b', [['Prepare test report', 'High', 0], ['Order spare heaters', 'Med', 1]]],
    ['In progress', '#2a56a6', [['Calibrate chamber #4', 'High', 2], ['Update BOM', 'Low', 3]]],
    ['Done', '#16a34a', [['Site installation', 'Med', 4]]],
  ];
  const pr = { High: ['#fee2e2', '#b91c1c'], Med: ['#fef3c7', '#b45309'], Low: ['#e0f2fe', '#0369a1'] };
  return (
    <MockFrame title="Tasks · Production team">
      <div className="grid grid-cols-3 gap-2 min-h-[240px]">
        {cols.map(([name, c, items], ci) => (
          <div key={name} className="min-w-0 p-2 rounded-lg bg-slate-50">
            <span className="flex items-center gap-1.5 mb-2 text-[10px] font-bold uppercase" style={{ color: c }}><i className="w-2 h-2 rounded-full" style={{ background: c }} />{name} <span className="text-slate-400">{items.length}</span></span>
            {items.map(([t, p, ai], i) => (
              <div key={t} className="p-2 mb-1.5 bg-white rounded-md shadow-sm hrms-row" style={{ animationDelay: `${ci * 0.25 + i * 0.15}s` }}>
                <span className={`block text-[10px] sm:text-[11px] font-semibold leading-tight mb-1.5 ${name === 'Done' ? 'line-through text-slate-400' : ''}`}>{t}</span>
                <span className="flex items-center justify-between">
                  <span className="px-1.5 py-0.5 rounded text-[8px] font-bold" style={{ background: pr[p][0], color: pr[p][1] }}>{p}</span>
                  <Avatar name={sampleStaff[ai].n} i={ai} size={18} />
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </MockFrame>
  );
}

const collabTabs = [
  { key: 'personal', icon: MessageSquare, tab: 'Personal chat', Mock: PersonalChatMock,
    title: 'One-to-one, right where work happens', text: 'Employees message HR, their manager or any colleague directly — and share files — without leaving the HRMS app.',
    points: ['Direct messages between any two employees', 'Share documents, photos and receipts', 'Online status and typing indicator'] },
  { key: 'team', icon: MessagesSquare, tab: 'Team chat', Mock: TeamChatMock,
    title: 'Every team gets its own space', text: 'Department and project groups keep production, service and design conversations organised — and announcements reach everyone.',
    points: ['Group chats per team or department', 'Unread counts so nothing gets missed', 'Company-wide announcements'] },
  { key: 'events', icon: CalendarClock, tab: 'Event scheduling', Mock: EventsMock,
    title: 'Schedule it once, everyone knows', text: "Trainings, reviews, site visits and celebrations are scheduled in the app and appear on each invited employee's phone.",
    points: ['Create events and invite people or teams', 'Week view of what is coming up', 'Reminders before the event starts'] },
  { key: 'tasks', icon: ListTodo, tab: 'Task management', Mock: TasksMock,
    title: 'Assign work and see it move', text: 'Managers assign tasks with priority and due dates; employees update progress from their phone; the board shows where everything stands.',
    points: ['Assign tasks with priority and due date', 'To do · In progress · Done board', 'Progress visible to the whole team'] },
];

function Collaboration() {
  const [idx, setIdx] = useState(0);
  const t = collabTabs[idx];
  const Mock = t.Mock;
  return (
    <div>
      <div className="flex gap-2 pb-1 mb-8 -mx-1 overflow-x-auto hrms-no-scrollbar lg:justify-center" role="tablist" aria-label="Collaboration features">
        {collabTabs.map((c, i) => {
          const I = c.icon;
          return (
            <button key={c.key} type="button" role="tab" aria-selected={i === idx} onClick={() => setIdx(i)} className="relative flex items-center flex-shrink-0 gap-2 px-4 py-2.5 mx-1 text-sm font-semibold rounded-xl whitespace-nowrap" style={{ color: i === idx ? '#0f1f3a' : '#d6dfec' }}>
              {i === idx && <motion.span layoutId="hrms-collab-pill" className="absolute inset-0 rounded-xl" style={{ background: 'linear-gradient(135deg, #71e6c3, #22d3ee)' }} transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
              {i !== idx && <span className="absolute inset-0 border rounded-xl border-white/20" />}
              <I className="relative w-4 h-4" /><span className="relative">{c.tab}</span>
            </button>
          );
        })}
      </div>
      <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
        <div className="min-h-[340px] flex items-center min-w-0">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={t.key} initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4, ease: EASE }} className="w-full">
              <Mock />
            </motion.div>
          </AnimatePresence>
        </div>
        <div aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={t.key} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35, ease: EASE }}>
              <h3 className="mb-3 text-2xl font-bold leading-tight sm:text-3xl" style={{ fontFamily: 'var(--font-display)', color: '#fff' }}>{t.title}</h3>
              <p className="mb-6 text-sm leading-relaxed sm:text-base text-[#c5d1e3]">{t.text}</p>
              <ul className="p-0 m-0 space-y-3 list-none">
                {t.points.map((pt, i) => (
                  <motion.li key={pt} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 + i * 0.08 }} className="flex items-center gap-3 p-3 text-sm text-white border rounded-xl border-white/10 bg-white/5">
                    <CheckCircle2 className="flex-shrink-0 w-5 h-5 text-[#71e6c3]" />{pt}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ─── Sections ────────────────────────────────────────────────────────── */
function Roles({ isDark }) {
  const [active, setActive] = useState(0);
  const r = roles[active];
  const RIcon = r.icon;
  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-1" role="tablist" aria-label="HRMS roles">
        {roles.map((ro, i) => {
          const on = i === active;
          const I = ro.icon;
          return (
            <motion.button
              key={ro.key}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setActive(i)}
              {...reveal(i * 0.06)}
              whileHover={{ x: on ? 0 : 4 }}
              className="relative flex items-center gap-3 p-3 overflow-hidden text-left border sm:p-4 rounded-xl"
              style={{
                background: on ? 'var(--gradient-brand)' : 'var(--surface-default)',
                borderColor: on ? 'transparent' : 'var(--border-default)',
                color: on ? '#fff' : 'var(--text-heading)',
                boxShadow: on ? 'var(--shadow-brand-md)' : 'none',
                transition: 'background .35s, box-shadow .35s, color .35s',
              }}
            >
              <span className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-lg" style={{ background: on ? 'rgba(255,255,255,0.18)' : `${ro.color}1a`, color: on ? '#fff' : ro.color }}>
                <I className="w-5 h-5" strokeWidth={1.8} />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-bold sm:text-base">{ro.label}</span>
                <span className="hidden text-xs truncate sm:block" style={{ opacity: on ? 0.85 : 0.6 }}>{ro.items.length} permissions</span>
              </span>
            </motion.button>
          );
        })}
      </div>

      <div className="relative overflow-hidden border rounded-2xl" style={{ background: 'var(--surface-default)', borderColor: 'var(--border-default)' }} aria-live="polite">
        <div className="absolute inset-y-0 left-0 w-1" style={{ background: r.color, transition: 'background .35s' }} />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={r.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="p-6 sm:p-8"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="flex items-center justify-center text-white w-14 h-14 rounded-2xl" style={{ background: r.color }}>
                <RIcon className="w-7 h-7" strokeWidth={1.6} />
              </span>
              <div>
                <h3 className="m-0 text-xl font-bold sm:text-2xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-heading)' }}>{r.label}</h3>
                <p className="m-0 text-sm" style={{ color: 'var(--text-muted)' }}>{r.summary}</p>
              </div>
            </div>
            <ul className="p-0 m-0 space-y-2.5 list-none">
              {r.items.map((it, i) => (
                <motion.li
                  key={it}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.35 }}
                  className="flex items-start gap-3 p-3 rounded-xl"
                  style={{ background: isDark ? 'rgba(255,255,255,0.03)' : 'var(--bg-subtle)' }}
                >
                  <CheckCircle2 className="flex-shrink-0 w-5 h-5 mt-0.5" style={{ color: r.color }} />
                  <span className="text-sm leading-relaxed" style={{ color: 'var(--text-body)' }}>{it}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function ViewsGallery() {
  const [idx, setIdx] = useState(0);
  const v = views[idx];
  const Mock = viewMocks[v.key];
  return (
    <motion.div
      {...reveal()}
      className="relative p-4 overflow-hidden text-white sm:p-6 lg:p-8 rounded-3xl"
      style={{ background: 'linear-gradient(145deg, #0f1f3a 0%, #13286b 55%, #0b3a4a 100%)' }}
    >
      <div className="absolute rounded-full pointer-events-none w-72 h-72 -top-24 -right-20 blur-3xl sess-glow" style={{ background: 'rgba(0,179,179,0.35)' }} />
      <div className="absolute rounded-full pointer-events-none w-72 h-72 -bottom-24 -left-20 blur-3xl sess-glow" style={{ background: 'rgba(31,63,191,0.5)', animationDelay: '1.5s' }} />

      <div className="relative flex gap-2 pb-1 mb-6 -mx-1 overflow-x-auto hrms-no-scrollbar" role="tablist" aria-label="Attendance and team views">
        {views.map((vw, i) => {
          const I = vw.icon;
          return (
            <button
              key={vw.key}
              type="button"
              role="tab"
              aria-selected={i === idx}
              onClick={() => setIdx(i)}
              className="relative flex items-center flex-shrink-0 gap-2 px-4 py-2 mx-1 text-sm font-semibold rounded-lg whitespace-nowrap"
              style={{ color: i === idx ? '#0f1f3a' : '#d6dfec' }}
            >
              {i === idx && (
                <motion.span layoutId="hrms-tab-pill" className="absolute inset-0 rounded-lg" style={{ background: 'linear-gradient(135deg, #71e6c3, #22d3ee)' }} transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
              )}
              {i !== idx && <span className="absolute inset-0 border rounded-lg border-white/20" />}
              <I className="relative w-4 h-4" />
              <span className="relative">{vw.tab}</span>
            </button>
          );
        })}
      </div>

      <div className="relative grid items-center gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
        <div className="min-h-[360px] sm:min-h-[400px] flex items-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={v.key} initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4, ease: EASE }} className="w-full">
              <Mock />
            </motion.div>
          </AnimatePresence>
        </div>

        <div aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={v.key} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35, ease: EASE }}>
              <span className="block mb-3 text-xs font-bold tracking-[0.15em] uppercase text-[#71e6c3]">Web application</span>
              <h3 className="mb-3 text-2xl font-bold leading-tight sm:text-3xl" style={{ fontFamily: 'var(--font-display)', color: '#fff' }}>{v.title}</h3>
              <p className="mb-5 text-sm leading-relaxed sm:text-base text-[#c5d1e3]">{v.text}</p>
              {v.qa.map(([q, a], i) => (
                <motion.div key={q} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.1, duration: 0.4 }} className="py-4 border-t border-white/15">
                  <strong className="flex items-center gap-2 mb-1 text-sm text-white sm:text-base"><CheckCircle2 className="flex-shrink-0 w-4 h-4 text-[#71e6c3]" /> {q}</strong>
                  <p className="m-0 text-sm text-[#b9c7db] pl-6">{a}</p>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

function FaqItem({ q, a, open, onToggle, idx }) {
  return (
    <motion.div {...reveal(idx * 0.06)} className="border-b" style={{ borderColor: 'var(--border-default)' }}>
      <button type="button" onClick={onToggle} aria-expanded={open} className="flex items-center justify-between w-full gap-4 py-5 text-left">
        <span className="text-sm font-semibold sm:text-base" style={{ color: open ? 'var(--color-primary-500)' : 'var(--text-heading)', transition: 'color .3s' }}>{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} className="flex-shrink-0" style={{ color: 'var(--color-primary-500)' }}>
          <ChevronDown className="w-5 h-5" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: EASE }} className="overflow-hidden">
            <p className="pb-5 m-0 text-sm leading-relaxed" style={{ color: 'var(--text-body)' }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────── */
export default function HRMS() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [openFaq, setOpenFaq] = useState(0);
  const [heroRef, heroInView] = useInView({ threshold: 0.2 });
  const [appRef, appInView] = useInView({ threshold: 0.3 });
  const [heroScreen] = usePhoneCycle(heroInView);
  const [appScreen, pickAppScreen] = usePhoneCycle(appInView);

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const sectionBg = { background: 'var(--bg-base)' };
  const softBg = { background: 'var(--bg-subtle)' };
  const iconTint = isDark ? 'rgba(0,179,179,0.12)' : 'var(--color-primary-50)';

  return (
    <div className="overflow-x-hidden" style={{ color: 'var(--text-body)' }}>
      <style>{HRMS_CSS}</style>

      {/* ══ Hero ══ */}
      <section ref={heroRef} className="relative overflow-hidden text-white" style={{ background: 'var(--gradient-brand)' }}>
        <div className="absolute rounded-full pointer-events-none w-[420px] h-[420px] -top-32 -right-24 blur-3xl sess-orb-a" style={{ background: APP_BLUE, opacity: 0.35 }} />
        <div className="absolute rounded-full pointer-events-none w-[380px] h-[380px] -bottom-40 -left-24 blur-3xl sess-orb-b" style={{ background: '#06b6d4', opacity: 0.3 }} />
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

        <div className={`relative grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1fr_1.05fr] ${CONTAINER}`}>
          <motion.div className="min-w-0" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', delay: 0.15, stiffness: 200 }} className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 text-xs font-semibold border rounded-full sm:text-sm bg-white/10 backdrop-blur-md border-white/25">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-emerald-300" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-300" />
              </span>
              Web app + SESS Employee mobile app
            </motion.div>
            <span className="block mb-3 text-xs font-bold tracking-[0.15em] uppercase text-cyan-100">SESS HRMS · Human resource management</span>
            <h1 className="mb-5 text-[2rem] min-[400px]:text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl xl:text-6xl" style={{ fontFamily: 'var(--font-display)', color: '#fff' }}>
              Your people, attendance & payroll —{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a7f3d0] via-white to-[#bae6fd] hrms-shine">in one place.</span>
            </h1>
            <p className="max-w-xl mb-8 text-base leading-relaxed sm:text-lg text-white/85">
              Fingerprint- and face-verified punch-in that works only at the work site. Personal and team chat, event scheduling and task management. Leave, claims and payroll reports — HR on the web, every employee on their phone.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <motion.a href="#hrms-views" onClick={scrollTo('hrms-views')} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }} className="group inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold bg-white shadow-lg rounded-xl text-[#1d4f8f]">
                Explore the web app <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
              </motion.a>
              <motion.a href="#hrms-mobile" onClick={scrollTo('hrms-mobile')} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white transition-colors duration-300 border rounded-xl border-white/40 bg-white/5 backdrop-blur-sm hover:bg-white/15">
                <Smartphone className="w-4 h-4" /> See the mobile app
              </motion.a>
            </div>
            <p className="mt-5 text-xs text-white/70">Built by the SESS IT team. Screens on this page are illustrative mock-ups with sample data.</p>
          </motion.div>

          {/* Devices */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2, ease: EASE }} className="relative min-w-0 pb-10 sm:pb-0 sm:pr-24 lg:pr-28">
            <div className="hrms-float">
              <LiveMock compact />
            </div>
            <div className="absolute right-0 hidden sm:block -bottom-10 lg:-right-2 hrms-float-alt">
              <PhoneMock screen={appScreens[heroScreen]} className="scale-[0.82] origin-bottom-right" />
            </div>
            <div className="absolute items-center hidden gap-2 px-3 py-2 text-xs font-semibold bg-white shadow-xl sm:flex -left-5 -top-4 rounded-xl text-slate-800 hrms-chip">
              <span className="flex items-center justify-center rounded-lg w-7 h-7 bg-emerald-50 text-emerald-600"><ScanFace className="w-4 h-4" /></span>
              Face + fingerprint verified · on-site
            </div>
            <div className="absolute flex items-center gap-2 px-3 py-2 text-xs font-semibold bg-white shadow-xl -left-3 sm:left-6 -bottom-2 sm:bottom-6 rounded-xl text-slate-800 hrms-chip" style={{ animationDelay: '1.6s' }}>
              <span className="flex items-center justify-center text-indigo-600 rounded-lg w-7 h-7 bg-indigo-50"><MessagesSquare className="w-4 h-4" /></span>
              3 new messages in #production-team
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ Trust strip ══ */}
      <div className="border-b" style={{ ...sectionBg, borderColor: 'var(--border-default)' }}>
        <div className={`grid grid-cols-2 gap-4 py-6 lg:grid-cols-4 ${CONTAINER}`}>
          {trust.map(({ icon: TIcon, label }, i) => (
            <motion.div key={label} {...reveal(i * 0.08)} className="flex items-center gap-3">
              <span className="flex items-center justify-center flex-shrink-0 rounded-lg w-9 h-9" style={{ background: iconTint, color: 'var(--color-primary-500)' }}><TIcon className="w-[18px] h-[18px]" /></span>
              <span className="text-xs font-semibold sm:text-sm" style={{ color: 'var(--text-heading)' }}>{label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ══ Two apps, one record ══ */}
      <section className="py-16 sm:py-20" style={sectionBg}>
        <div className={CONTAINER}>
          <motion.div {...reveal()} className="max-w-2xl mx-auto mb-12 text-center">
            <SectionHeader eyebrow="Two apps, one record" title="HR works on the web. Employees work from their phone." isDark={isDark} />
          </motion.div>
          <div className="relative grid gap-6 lg:grid-cols-2">
            {/* connector */}
            <div className="absolute z-10 items-center justify-center hidden -translate-x-1/2 -translate-y-1/2 lg:flex left-1/2 top-1/2">
              <span className="relative flex items-center justify-center text-white rounded-full shadow-xl w-14 h-14" style={{ background: 'var(--gradient-brand)' }}>
                <span className="absolute inset-0 rounded-full sess-pulse-ring" style={{ background: 'var(--color-primary-400)' }} />
                <Sparkles className="relative w-6 h-6" />
              </span>
            </div>
            {[
              { icon: Monitor, title: 'Web application', who: 'HR · Admin · Managers · Accounts', color: '#2a56a6',
                points: ['Live, daily and monthly attendance dashboards', 'Add, update and exit employee records', 'Approve leave, corrections and reimbursements', 'Payroll, attendance and employee reports', 'Schedule events and assign tasks to teams', 'Team chat, user permissions and holiday list'] },
              { icon: Smartphone, title: 'SESS Employee mobile app', who: 'Every employee', color: '#00b3b3',
                points: ['Secure login with username & password or PIN', 'Punch in with fingerprint + face — accepted on-site only', 'Personal and team chat', 'Events, reminders and assigned tasks', 'Leave, corrections, claims and payslips'] },
            ].map((c, i) => {
              const I = c.icon;
              return (
                <motion.article key={c.title} {...reveal(i * 0.12)} whileHover={{ y: -6 }} className="relative p-6 overflow-hidden border group sm:p-8 rounded-3xl" style={{ background: 'var(--surface-default)', borderColor: 'var(--border-default)', boxShadow: 'var(--shadow-sm)' }}>
                  <span className="absolute w-40 h-40 transition-opacity duration-500 rounded-full opacity-0 pointer-events-none -top-16 -right-16 blur-3xl group-hover:opacity-40" style={{ background: c.color }} />
                  <span className="relative flex items-center justify-center mb-5 text-white transition-transform duration-300 w-14 h-14 rounded-2xl group-hover:scale-110 group-hover:-rotate-6" style={{ background: c.color }}><I className="w-7 h-7" strokeWidth={1.6} /></span>
                  <h3 className="relative mb-1 text-xl font-bold sm:text-2xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-heading)' }}>{c.title}</h3>
                  <span className="relative block mb-5 text-xs font-bold tracking-wider uppercase" style={{ color: c.color }}>{c.who}</span>
                  <ul className="relative p-0 m-0 space-y-2.5 list-none">
                    {c.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--text-body)' }}><CheckCircle2 className="flex-shrink-0 w-4 h-4 mt-0.5" style={{ color: c.color }} />{p}</li>
                    ))}
                  </ul>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ Verified punch-in ══ */}
      <section id="hrms-punch" className="py-16 sm:py-20 scroll-mt-28" style={softBg}>
        <div className={CONTAINER}>
          <motion.div {...reveal()} className="flex flex-col gap-4 mb-10 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader eyebrow="Verified punch-in" title="Three checks. Only the real employee, only at the site." isDark={isDark} />
            <p className="max-w-sm m-0 text-sm" style={{ color: 'var(--text-muted)' }}>Fingerprint, face and location are checked on every punch, so attendance is something HR can trust.</p>
          </motion.div>
          <VerifiedPunch />
        </div>
      </section>

      {/* ══ Attendance & team views ══ */}
      <section id="hrms-views" className="py-16 sm:py-20 scroll-mt-28" style={sectionBg}>
        <div className={CONTAINER}>
          <motion.div {...reveal()} className="flex flex-col gap-4 mb-10 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader eyebrow="Inside the web app" title="Attendance you can see, not chase." isDark={isDark} />
            <p className="max-w-sm m-0 text-sm" style={{ color: 'var(--text-muted)' }}>Four views HR uses every day. Select one to explore it.</p>
          </motion.div>
          <ViewsGallery />
          <p className="mt-5 text-xs" style={{ color: 'var(--text-muted)' }}>
            <strong style={{ color: 'var(--text-body)' }}>Illustrative mock-ups.</strong> Names, IDs, times, locations and counts are fictional sample data, not records of any real employee.
          </p>
        </div>
      </section>

      {/* ══ Collaboration ══ */}
      <section id="hrms-collab" className="relative py-16 overflow-hidden text-white sm:py-20 scroll-mt-28" style={{ background: 'linear-gradient(145deg, #0f1f3a 0%, #13286b 55%, #0b3a4a 100%)' }}>
        <div className="absolute rounded-full pointer-events-none w-96 h-96 -top-32 -left-24 blur-3xl sess-glow" style={{ background: 'rgba(0,179,179,0.3)' }} />
        <div className="absolute rounded-full pointer-events-none w-96 h-96 -bottom-32 -right-24 blur-3xl sess-glow" style={{ background: 'rgba(139,92,246,0.3)', animationDelay: '1.5s' }} />
        <div className={`relative ${CONTAINER}`}>
          <motion.div {...reveal()} className="max-w-2xl mx-auto mb-8 text-center">
            <SectionHeader eyebrow="Work together" title="Chat, events and tasks — built into HRMS." onDark />
            <p className="mt-4 mb-0 text-sm sm:text-base text-[#c5d1e3]">No separate messaging app, no groups to chase. Conversations, schedules and work live next to attendance and leave.</p>
          </motion.div>
          <Collaboration />
          <p className="mt-6 mb-0 text-xs text-center text-[#9fb2c9]">Illustrative mock-ups with fictional names and messages.</p>
        </div>
      </section>

      {/* ══ Roles ══ */}
      <section className="py-16 sm:py-20" style={sectionBg}>
        <div className={CONTAINER}>
          <motion.div {...reveal()} className="flex flex-col gap-4 mb-10 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader eyebrow="Roles & access" title="Everyone sees exactly what they need." isDark={isDark} />
            <p className="max-w-sm m-0 text-sm" style={{ color: 'var(--text-muted)' }}>Permissions follow the role, so salary and bank data stay with the people authorised to see them.</p>
          </motion.div>
          <Roles isDark={isDark} />
        </div>
      </section>

      {/* ══ Approval flows ══ */}
      <section className="py-16 sm:py-20" style={softBg}>
        <div className={CONTAINER}>
          <motion.div {...reveal()} className="mb-10 text-center">
            <SectionHeader eyebrow="Requests & approvals" title="Every request reaches the right person." isDark={isDark} />
          </motion.div>
          <div className="grid gap-5 lg:grid-cols-3">
            {requestFlows.map((f, fi) => {
              const I = f.icon;
              return (
                <motion.div key={f.title} {...reveal(fi * 0.1)} className="p-6 border rounded-2xl" style={{ background: 'var(--surface-default)', borderColor: 'var(--border-default)', boxShadow: 'var(--shadow-sm)' }}>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="flex items-center justify-center text-white w-11 h-11 rounded-xl" style={{ background: 'var(--gradient-brand)' }}><I className="w-5 h-5" /></span>
                    <h3 className="m-0 text-base font-bold" style={{ color: 'var(--text-heading)' }}>{f.title}</h3>
                  </div>
                  <ol className="relative p-0 m-0 list-none">
                    <motion.span initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 + fi * 0.15, ease: EASE }} className="absolute w-0.5 origin-top left-[15px] top-4 bottom-4" style={{ background: 'var(--gradient-brand)' }} />
                    {f.steps.map((s, si) => (
                      <motion.li key={s} {...reveal(0.3 + fi * 0.15 + si * 0.15)} className="relative flex items-center gap-3 pb-4 last:pb-0">
                        <span className="relative z-10 flex items-center justify-center flex-shrink-0 w-8 h-8 text-xs font-bold text-white rounded-full" style={{ background: si === f.steps.length - 1 ? '#16a34a' : 'var(--gradient-brand)' }}>
                          {si === f.steps.length - 1 ? <CheckCircle2 className="w-4 h-4" /> : si + 1}
                        </span>
                        <span className="flex-1 px-3 py-2 text-sm font-medium rounded-lg" style={{ background: 'var(--bg-subtle)', color: 'var(--text-heading)' }}>{s}</span>
                      </motion.li>
                    ))}
                  </ol>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ Employee lifecycle ══ */}
      <section className="py-16 sm:py-20" style={sectionBg}>
        <div className={CONTAINER}>
          <motion.div {...reveal()} className="flex flex-col gap-4 mb-10 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader eyebrow="Employee lifecycle" title="From the first day to the last, on record." isDark={isDark} />
            <p className="max-w-sm m-0 text-sm" style={{ color: 'var(--text-muted)' }}>A complete profile at joining, and a documented exit when someone leaves.</p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            <motion.div {...reveal()} className="p-6 border sm:p-8 rounded-3xl" style={{ background: 'var(--surface-default)', borderColor: 'var(--border-default)' }}>
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center text-white w-11 h-11 rounded-xl bg-emerald-500"><UserPlus className="w-5 h-5" /></span>
                <div>
                  <h3 className="m-0 text-lg font-bold" style={{ color: 'var(--text-heading)' }}>Add staff</h3>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Fields captured when an employee joins</span>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {addFields.map((g, gi) => {
                  const G = g.icon;
                  return (
                    <motion.div key={g.group} {...reveal(gi * 0.08)} className="p-4 rounded-2xl" style={{ background: 'var(--bg-subtle)' }}>
                      <span className="flex items-center gap-2 mb-3 text-xs font-bold tracking-wider uppercase" style={{ color: 'var(--color-primary-500)' }}><G className="w-4 h-4" /> {g.group}</span>
                      <div className="flex flex-wrap gap-1.5">
                        {g.fields.map((f) => (
                          <span key={f} className="px-2.5 py-1 text-xs font-medium border rounded-full transition-colors duration-300 hover:border-[var(--color-primary-400)]" style={{ background: 'var(--surface-default)', borderColor: 'var(--border-default)', color: 'var(--text-body)' }}>{f}</span>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-5 mt-5 border-t" style={{ borderColor: 'var(--border-default)' }}>
                <span className="mr-1 text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Employment types:</span>
                {employmentTypes.map((t, i) => (
                  <motion.span key={t} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.06 }} className="px-3 py-1 text-xs font-semibold text-white rounded-full" style={{ background: avatarColors[i] }}>{t}</motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div {...reveal(0.12)} className="relative p-6 overflow-hidden text-white sm:p-8 rounded-3xl" style={{ background: 'linear-gradient(145deg, #0f1f3a 0%, #112442 60%, #0b3a4a 100%)' }}>
              <div className="absolute w-56 h-56 rounded-full pointer-events-none -top-16 -right-16 blur-3xl sess-glow" style={{ background: 'rgba(236,72,153,0.3)' }} />
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-rose-500"><UserMinus className="w-5 h-5" /></span>
                  <div>
                    <h3 className="m-0 text-lg font-bold" style={{ color: '#fff' }}>Employee exit</h3>
                    <span className="text-xs text-[#9fb2c9]">Recorded when someone leaves</span>
                  </div>
                </div>
                <ul className="p-0 m-0 space-y-3 list-none">
                  {exitFields.map(([k, v], i) => (
                    <motion.li key={k} {...reveal(0.2 + i * 0.1)} className="p-3 border rounded-xl border-white/10 bg-white/5">
                      <span className="block text-sm font-semibold">{k}</span>
                      <span className="block text-xs text-[#9fb2c9]">{v}</span>
                    </motion.li>
                  ))}
                </ul>
                <p className="mt-5 mb-0 text-xs text-[#9fb2c9]">Exited employees move to the exit list, so headcount and history stay accurate.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ Mobile app ══ */}
      <section id="hrms-mobile" ref={appRef} className="relative py-16 overflow-hidden sm:py-20 scroll-mt-28" style={softBg}>
        <div className={`grid items-center gap-12 lg:grid-cols-2 ${CONTAINER}`}>
          <motion.div {...reveal()}>
            <SectionHeader eyebrow="SESS Employee mobile app" title="HR in every employee's pocket." isDark={isDark} />
            <p className="mt-5 mb-6 leading-relaxed" style={{ color: 'var(--text-body)' }}>
              Verified attendance, conversations, schedules and work — the everyday things that used to mean registers, phone calls and follow-ups, now in one app.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {appScreens.map((s, i) => {
                const on = appScreen === i;
                const I = appScreenIcons[s];
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => pickAppScreen(i)}
                    aria-pressed={on}
                    className="relative flex items-center gap-2 p-3 overflow-hidden text-left border sm:gap-3 sm:p-4 rounded-xl"
                    style={{
                      background: on ? 'var(--gradient-brand)' : 'var(--surface-default)',
                      borderColor: on ? 'transparent' : 'var(--border-default)',
                      color: on ? '#fff' : 'var(--text-heading)',
                      transition: 'background .35s, color .35s',
                    }}
                  >
                    <span className="flex items-center justify-center flex-shrink-0 rounded-lg w-9 h-9" style={{ background: on ? 'rgba(255,255,255,0.2)' : iconTint, color: on ? '#fff' : 'var(--color-primary-500)' }}><I className="w-[18px] h-[18px]" /></span>
                    <span className="text-sm font-semibold">{appScreenLabels[s]}</span>
                    {on && <span key={`bar-${i}`} className="absolute bottom-0 left-0 h-0.5 bg-white/80 hrms-progress" />}
                  </button>
                );
              })}
            </div>
          </motion.div>

          <motion.div {...reveal(0.15)} className="relative flex justify-center py-6">
            <div className="absolute rounded-full w-80 h-80 blur-3xl sess-glow" style={{ background: 'rgba(31,63,191,0.25)' }} />
            <div className="relative hrms-float">
              <PhoneMock screen={appScreens[appScreen]} className="scale-110 sm:scale-125" />
            </div>
            <div className="absolute left-0 flex items-center gap-2 px-3 py-2 text-xs font-semibold bg-white shadow-xl sm:left-6 top-16 rounded-xl text-slate-800 hrms-chip">
              <ScanFace className="w-4 h-4 text-emerald-600" /> Face + fingerprint punch-in
            </div>
            <div className="absolute right-0 flex items-center gap-2 px-3 py-2 text-xs font-semibold bg-white shadow-xl sm:right-6 bottom-16 rounded-xl text-slate-800 hrms-chip" style={{ animationDelay: '1.4s' }}>
              <Crosshair className="w-4 h-4 text-indigo-600" /> Accepted on-site only
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ Reports ══ */}
      <section className="py-16 sm:py-20" style={sectionBg}>
        <div className={CONTAINER}>
          <motion.div {...reveal()} className="mb-10 text-center">
            <SectionHeader eyebrow="Reports" title="The numbers HR and accounts ask for." isDark={isDark} />
          </motion.div>
          <div className="grid gap-5 md:grid-cols-3">
            {reports.map((r, ri) => {
              const R = r.icon;
              return (
                <motion.article key={r.title} {...reveal(ri * 0.1)} whileHover={{ y: -8 }} className="relative p-6 overflow-hidden border group rounded-2xl" style={{ background: 'var(--surface-default)', borderColor: 'var(--border-default)', boxShadow: 'var(--shadow-sm)' }}>
                  <span className="absolute top-0 left-0 w-full h-1" style={{ background: r.color }} />
                  <div className="flex items-center gap-3 mb-5">
                    <span className="flex items-center justify-center w-12 h-12 transition-transform duration-300 rounded-xl group-hover:scale-110" style={{ background: `${r.color}1a`, color: r.color }}><R className="w-6 h-6" /></span>
                    <div>
                      <h3 className="m-0 text-lg font-bold" style={{ color: 'var(--text-heading)' }}>{r.title}</h3>
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{r.items.length} reports</span>
                    </div>
                  </div>
                  <ul className="p-0 m-0 space-y-2 list-none">
                    {r.items.map(([label, Ico], i) => (
                      <motion.li key={label} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 + ri * 0.1 + i * 0.05 }} className="flex items-center gap-3 px-3 py-2 text-sm transition-transform duration-300 rounded-lg hover:translate-x-1" style={{ background: 'var(--bg-subtle)', color: 'var(--text-body)' }}>
                        <Ico className="flex-shrink-0 w-4 h-4" style={{ color: r.color }} /> {label}
                      </motion.li>
                    ))}
                  </ul>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="py-16 sm:py-20" style={softBg}>
        <div className={`grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 ${CONTAINER}`}>
          <motion.div {...reveal()}>
            <SectionHeader eyebrow="Questions" title="Before you enquire." isDark={isDark} />
            <p className="mt-5 leading-relaxed" style={{ color: 'var(--text-body)' }}>
              SESS HRMS was built by our IT team around how a manufacturing and service company actually runs — shifts, field staff, approvals and payroll inputs.
            </p>
            <div className="flex gap-4 p-5 mt-6 border rounded-2xl" style={{ background: 'var(--surface-default)', borderColor: 'var(--border-default)' }}>
              <span className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white rounded-xl" style={{ background: 'var(--gradient-brand)' }}><Building2 className="w-5 h-5" /></span>
              <div>
                <strong className="block mb-1" style={{ color: 'var(--text-heading)' }}>Also from SESS</strong>
                <p className="m-0 text-sm" style={{ color: 'var(--text-muted)' }}>
                  Running projects, purchase and stores too? See <Link to="/erp" className="font-semibold underline" style={{ color: 'var(--color-primary-500)' }}>SESS ERP</Link>.
                </p>
              </div>
            </div>
          </motion.div>
          <div>
            {faqs.map(([q, a], i) => (
              <FaqItem key={q} q={q} a={a} idx={i} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? -1 : i)} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ Contact CTA ══ */}
      {/* <section id="hrms-contact" className="py-16 sm:py-20" style={sectionBg}>
        <div className={CONTAINER}>
          <motion.div initial={{ opacity: 0, scale: 0.96, y: 30 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE }} className="relative grid gap-10 p-7 overflow-hidden text-white border shadow-2xl sm:p-12 lg:grid-cols-[1.3fr_1fr] rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 border-slate-700/50">
            <div className="absolute rounded-full pointer-events-none -top-20 -right-20 w-60 h-60 bg-cyan-500 blur-3xl sess-glow" />
            <div className="absolute rounded-full pointer-events-none -bottom-20 -left-20 w-60 h-60 blur-3xl sess-glow" style={{ background: APP_BLUE, animationDelay: '1.2s' }} />
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 text-xs font-semibold border rounded-full bg-cyan-500/20 border-cyan-400/40 text-cyan-300">
                <span className="relative flex w-2 h-2"><span className="absolute inline-flex w-full h-full rounded-full animate-ping bg-cyan-400" /><span className="relative inline-flex w-2 h-2 rounded-full bg-cyan-400" /></span>
                Talk to the team that built it
              </span>
              <h2 className="mb-4 text-3xl font-black tracking-tight text-transparent sm:text-4xl bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-blue-200" style={{ fontFamily: 'var(--font-display)' }}>
                Bring HR, attendance and payroll together.
              </h2>
              <p className="mb-8 text-sm sm:text-base text-slate-300">Tell us your team size, shifts and branches. We will walk you through SESS HRMS — web and mobile — for your organisation.</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <motion.a href={MAIL_HREF} whileHover={{ scale: 1.04, boxShadow: '0 20px 40px rgba(6, 182, 212, 0.4)' }} whileTap={{ scale: 0.98 }} className="inline-flex items-center justify-center gap-2 px-6 py-3.5 font-bold text-white shadow-xl rounded-2xl bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-500">
                  <Mail className="w-5 h-5" /> Email an enquiry
                </motion.a>
                <motion.a href={WA_HREF} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center justify-center gap-2 px-6 py-3.5 font-semibold transition-colors border rounded-2xl border-slate-600 text-slate-200 hover:border-emerald-400/60 hover:text-emerald-300">
                  <MessageCircle className="w-5 h-5" /> Enquire on WhatsApp
                </motion.a>
              </div>
            </div>
            <div className="relative z-10 pt-8 border-t lg:pt-0 lg:pl-10 lg:border-t-0 lg:border-l border-slate-700">
              <strong className="block mb-1 text-lg text-white">Sri Easwari Scientific Solution Pvt Ltd</strong>
              <p className="mb-6 text-sm text-slate-400">In-house software development. Chennai, India.</p>
              <ul className="p-0 m-0 space-y-4 list-none">
                <li>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-3 group">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 text-cyan-300 group-hover:bg-cyan-500/20"><Mail className="w-5 h-5" /></span>
                    <span><small className="block text-[11px] tracking-wider text-slate-400">EMAIL</small><span className="text-sm break-all group-hover:text-cyan-300">{CONTACT_EMAIL}</span></span>
                  </a>
                </li>
                <li>
                  <a href={`tel:${CONTACT_PHONE}`} className="flex items-center gap-3 group">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 text-cyan-300 group-hover:bg-cyan-500/20"><Phone className="w-5 h-5" /></span>
                    <span><small className="block text-[11px] tracking-wider text-slate-400">PHONE</small><span className="text-sm group-hover:text-cyan-300">+91 75488 73688</span></span>
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 text-cyan-300"><Smartphone className="w-5 h-5" /></span>
                  <span><small className="block text-[11px] tracking-wider text-slate-400">PLATFORMS</small><span className="text-sm">Web application · SESS Employee mobile app</span></span>
                </li>
              </ul>
            </div>
          </motion.div>
          <p className="mt-5 text-xs text-center" style={{ color: 'var(--text-muted)' }}>SESS HRMS product introduction · All screens are illustrative mock-ups with fictional data.</p>
        </div>
      </section> */}
    </div>
  );
}

/* Page-local CSS loops (compositor-only, per perf conventions). */
const HRMS_CSS = `
@keyframes hrms-float { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(0,-10px,0); } }
.hrms-float { will-change: transform; animation: hrms-float 6s ease-in-out infinite; }
.hrms-float-alt { will-change: transform; animation: hrms-float 7s ease-in-out infinite; animation-delay: -3s; }
@keyframes hrms-chip { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(0,-8px,0); } }
.hrms-chip { animation: hrms-chip 4.5s ease-in-out infinite; }
@keyframes hrms-shine { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
.hrms-shine { background-size: 200% 200%; animation: hrms-shine 6s ease-in-out infinite; }
@keyframes hrms-row { from { opacity: 0; transform: translate3d(-10px,0,0); } to { opacity: 1; transform: none; } }
.hrms-row { animation: hrms-row .5s cubic-bezier(.22,1,.36,1) both; }
@keyframes hrms-pop { from { opacity: 0; transform: scale(.6); } to { opacity: 1; transform: none; } }
.hrms-pop { animation: hrms-pop .35s cubic-bezier(.22,1,.36,1) both; }
@keyframes hrms-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
.hrms-progress { width: 100%; transform-origin: left; animation: hrms-progress 3.2s linear both; }
@keyframes hrms-scan { 0%,100% { top: 8%; } 50% { top: 90%; } }
.hrms-scan { position: absolute; animation: hrms-scan 2s ease-in-out infinite; }
@keyframes hrms-radar { to { transform: rotate(360deg); } }
.hrms-radar { animation: hrms-radar 3s linear infinite; }
@keyframes hrms-typing { 0%,60%,100% { transform: translateY(0); opacity: .4; } 30% { transform: translateY(-3px); opacity: 1; } }
.hrms-typing { animation: hrms-typing 1.1s ease-in-out infinite; }
.hrms-progress-fast { width: 100%; transform-origin: left; animation: hrms-progress 2.2s linear both; }
@keyframes hrms-progress-25 { from { width: 0; } to { width: 25%; } }
.hrms-progress-25 { animation: hrms-progress-25 1s ease-out .3s both; }
.hrms-no-scrollbar { scrollbar-width: none; } .hrms-no-scrollbar::-webkit-scrollbar { display: none; }
@media (prefers-reduced-motion: reduce) {
  .hrms-float, .hrms-float-alt, .hrms-chip, .hrms-shine, .hrms-row, .hrms-pop, .hrms-progress, .hrms-progress-fast, .hrms-scan, .hrms-radar, .hrms-typing, .hrms-progress-25 { animation: none; }
}
`;
