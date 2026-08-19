import React from "react";
import { motion } from 'framer-motion';
import {
  Palette,
  Terminal,
  ArrowRight,
  ComputerIcon,
} from "lucide-react";
import dsteam from "../assets/clients/design-team.jpg";
import bgImage from "../assets/clients/bg-square.jpeg";
import labview from "../assets/clients/labview.svg";
import bgplc from '../assets/Website_Gallery_img/labview.png';
import bgit from '../assets/Website_Gallery_img/ITbg.png';
import labimg from '../assets/clients/labview.png';

/* ═══════════════════════════════════════════════════════════
   SOCIAL ICON SVGs
═══════════════════════════════════════════════════════════ */
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

/* ═══════════════════════════════════════════════════════════
   TOOL ICON SVGs — SolidWorks, AutoCAD, LabVIEW
   All inline, zero CDN, brand-accurate colours
═══════════════════════════════════════════════════════════ */

/** SolidWorks — red "S" shield mark */
const SolidWorksIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48">
    <path fill="#dd2c00" d="M24,44L5,36V10l19,6V44z"></path><path fill="#a52005" d="M24,44l19-8V10l-19,6V44z"></path><path fill="#ff3d00" d="M5,10l19-6l19,6l-19,6L5,10z"></path><path fill="#fff" d="M36.538 29.214l1.645-12.583L40 16l-2.438 16.738-1.787.737-2.078-10.928-2.159 12.676L29.653 36 27 20.516l1.987-.69 1.763 11.661 2.135-13.015 1.604-.557L36.538 29.214zM16.855 31.103c0-.324-.036-.626-.109-.905-.073-.279-.206-.56-.399-.841-.193-.281-.458-.577-.794-.889-.336-.311-.766-.664-1.29-1.057-.572-.424-1.097-.864-1.577-1.319-.478-.454-.889-.931-1.232-1.431-.342-.499-.61-1.029-.803-1.59-.193-.561-.289-1.161-.289-1.801 0-.633.1-1.182.301-1.649.201-.468.485-.838.852-1.111.368-.273.809-.438 1.326-.492.519-.055 1.094.017 1.728.215.68.213 1.295.536 1.842.969.549.434 1.014.937 1.395 1.508.382.573.675 1.19.88 1.852.205.663.307 1.332.307 2.007l-2.137-.707c0-.39-.046-.764-.139-1.122-.092-.357-.234-.686-.424-.987-.19-.3-.43-.563-.719-.788-.289-.225-.629-.4-1.022-.526-.369-.119-.688-.167-.957-.144-.268.023-.491.103-.668.242-.177.138-.308.328-.392.569-.084.24-.126.516-.126.828 0 .587.208 1.145.625 1.676.418.533 1.059 1.112 1.925 1.741.682.495 1.276.99 1.779 1.485.505.497.926 1.009 1.263 1.534.337.527.588 1.077.753 1.649C18.917 30.592 19 31.201 19 31.846c0 .682-.104 1.258-.312 1.727-.207.469-.502.823-.884 1.063-.381.24-.84.36-1.378.363-.536.003-1.131-.118-1.784-.361-.579-.215-1.147-.531-1.704-.945-.555-.413-1.051-.907-1.489-1.484-.436-.575-.787-1.22-1.052-1.935C10.132 29.562 10 28.789 10 27.956l2.041.723c0 .499.066.951.199 1.357.133.406.315.765.546 1.077.232.313.506.579.824.8.318.221.662.4 1.032.534.731.266 1.283.271 1.654.014C16.668 32.204 16.855 31.75 16.855 31.103z"></path>
  </svg>
);

/** AutoCAD — red square with white "A" */
const AutoCADIcon = () => (
  <svg viewBox="0 0 48 48" className="w-7 h-7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="#E51837" />
    {/* Classic AutoCAD "A" mark */}
    <path
      d="M24 9L35 39H28.5L26.5 33H21.5L19.5 39H13L24 9Z M24 17L22 29H26L24 17Z"
      fill="white"
    />
  </svg>
);

/** LabVIEW — NI yellow/white diamond logo */
const LabVIEWIcon = () => (
  <img 
    src={labimg} 
    alt="LabVIEW" 
    className="object-contain w-7 h-7"
    loading="lazy"
    decoding="async"
  />
);

/* ═══════════════════════════════════════════════════════════
   TOOL BADGE CHIP  (name + icon, brand-coloured)
═══════════════════════════════════════════════════════════ */
const ToolChip = ({ icon, name, color }) => (
  <span
    title={name}
    className="flex items-center gap-1.5 pl-1 pr-1.5 py-1 rounded-lg"
    style={{
      background: `${color}12`,
      // borderColor: `${color}35`,
      color,
      height: '40px',
      width: '40px',
    }}
  >
    {icon}
  </span>
);

/* ═══════════════════════════════════════════════════════════
   CARD FOOTER
   • hasSocials  → socials left  | button right  (original layout)
   • !hasSocials → button centre | tool chips right
═══════════════════════════════════════════════════════════ */
const CardFooter = ({ dept }) => {
  const hasSocials = dept.socials && dept.socials.length > 0;

  if (hasSocials) {
    /* ── original layout: socials left, button right ── */
    return (
      <div className="flex items-center justify-between gap-3 mt-7">
        <a
          href={dept.teamUrl}
          // target="_blank"          
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:gap-2.5 hover:shadow-lg flex-shrink-0 ${dept.color}`}
        >
          Meet the Team
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </a>
        <div className="flex items-center gap-2">
          {dept.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="flex items-center justify-center w-8 h-8 transition-all duration-200 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 hover:scale-110"
            >
              {social.icon}
            </a>
          ))}
        </div>
        
      </div>
    );
  }

  /* ── no-social layout: button centred left, tool chips right ── */
  return (
    <div className="flex items-center justify-between gap-3 mt-7">
      {/* Centred "Meet the Team" button */}
      <a
        href={dept.teamUrl}
        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:gap-2.5 hover:shadow-lg flex-shrink-0 ${dept.color}`}
      >
        Meet the Team
        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
      </a>

      {/* Tool chips — unique per department */}
      {dept.toolChips && (
        <div className="flex items-center gap-1.5 flex-wrap justify-end">
          {dept.toolChips.map((chip, i) => (
            <ToolChip key={chip.name ?? i} icon={chip.icon} name={chip.name} color={chip.color} />
          ))}
        </div>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   DEPARTMENT DATA
═══════════════════════════════════════════════════════════ */
const departments = [
  {
    id: "design",
    name: "Product Design",
    description:
      "We provide professional product design services using SolidWorks and AutoCAD, delivering accurate and innovative solutions for industrial and engineering applications. We specialize in creating detailed 2D drawings and precise 3D models tailored to your requirements. Our services include product design, mechanical drafting, assembly design and etc...",
    icon: <Palette className="w-7 h-7" />,
    color: "bg-indigo-600",
    image: dsteam,
    stats: "12 Designers",
    teamUrl: "/#/design",
    socials: [], // no socials → alternate footer
    toolChips: [
      { icon: <SolidWorksIcon />, color: "#CC0000" },
      { icon: <AutoCADIcon />, color: "#E51837" },
    ],
  },
  {
    id: "it",
    name: "IT & Infrastructure",
    description:
      "We provide reliable IT and software development services tailored to meet modern business needs. We specialize in developing custom software applications, web applications, and automation solutions that improve efficiency and streamline operations. Our services include software design, development, testing, deployment, and maintenance.",
    icon: <Terminal className="w-7 h-7" />,
    color: "bg-emerald-600",
    image: bgit,
    stats: "24 Engineers",
    teamUrl: "/#/it",
    socials: [
      { icon: <LinkedInIcon />, href: "https://linkedin.com/in/sess-chennai/", label: "LinkedIn" },
      { icon: <GitHubIcon />,   href: "https://github.com",   label: "GitHub"   },
      { icon: <TwitterIcon />,  href: "https://twitter.com/sesschennai",  label: "Twitter"  },
    ],
    // no toolChips — footer uses original social layout
  },
  {
    id: "plc",
    name: "PLC Programming",
    description:
      "We provide expert PLC and LabVIEW solutions for industrial automation, control systems, and testing applications. We specialize in PLC programming, HMI/SCADA integration, control panel design, and system troubleshooting, along with custom LabVIEW development for data acquisition, instrument control, and real-time monitoring.",
    icon: <ComputerIcon className="w-7 h-7" />,
    color: "bg-blue-600",
    image: bgplc ,
    stats: "15 Automation Engineers",
    teamUrl: "/#/labview-plc",
    socials: [], // no socials → alternate footer
    toolChips: [
      { icon: <LabVIEWIcon />, color: "#1A2B5C" },
    ],
  },
  
];

/* ═══════════════════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════════════════ */
const DepartmentSection = () => {
  return (
    <section
      className="relative py-20 bg-fixed-desktop"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/75" />

      {/* Content */}
      <div className="relative px-6 mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-12" style={{textAlign:'center'}}>
          <span className="text-4xl font-bold text-white" style={{display: 'block', color: 'var(--color-primary-400)', fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-semibold)', fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-wider)', textTransform: 'uppercase', marginBottom: 'var(--space-2)'}}>Our Departments</span>
          <h2 className="mt-4 text-gray-300" style={{fontFamily: 'var(--font-display)', fontWeight: 'var(--font-weight-bold)', fontSize: 'clamp(var(--text-2xl), 3vw, var(--text-3xl))', lineHeight: 'var(--leading-tight)', color: 'var(--color-neutral-0)', margin: '0px'}}>
            Powered by elite minds. Perfected by technology.
          </h2>
        </div>

        {/* Cards — 1 col → 2 col → 3 col */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {departments.map((dept) => (
            <div
              key={dept.id}
              className="relative flex flex-col overflow-hidden transition-all duration-500 bg-white shadow-xl group rounded-3xl hover:-translate-y-2"
            >
              {/* Image */}
              <div className="flex-shrink-0 h-56 overflow-hidden">
                <img
                  src={dept.image}
                  alt={dept.name}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
              </div>

             {/* Icon Badge */}
              {/* <div className={`absolute top-6 left-6 p-3.5 rounded-2xl text-white shadow-lg ${dept.color}`}>
                {dept.icon}
              </div> */}

              {/* Card Body */}
              <div className="flex flex-col flex-grow p-7">
                <h3 className="mt-2 text-xl font-bold text-slate-900">{dept.name}</h3>

                <p
                  className="flex-grow mt-3 text-sm leading-relaxed text-slate-600"
                  style={{ textAlign: "justify" }}
                >
                  {dept.description}
                </p>

                {/* Conditional footer */}
                <CardFooter dept={dept} />
              </div>

              {/* Hover bottom border */}
              <div className={`absolute bottom-0 left-0 h-1 w-0 transition-all duration-500 group-hover:w-full ${dept.color}`} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default DepartmentSection;