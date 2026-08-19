import React, { useId } from "react";
import { FaAws, FaReact } from "react-icons/fa";
import {
  SiDocker,
  SiExpress,
  SiFirebase,
  SiGit,
  SiGithub,
  SiGraphql,
  SiKubernetes,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
} from "react-icons/si";

const DEFAULT_TECH_STACK = [
  {
    id: "react",
    name: "React",
    category: "Frontend",
    icon: FaReact,
    color: "#61DAFB",
    glow: "rgba(97, 218, 251, 0.34)",
  },
  {
    id: "next",
    name: "Next.js",
    category: "Framework",
    icon: SiNextdotjs,
    color: "#f8fafc",
    glow: "rgba(248, 250, 252, 0.2)",
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Language",
    icon: SiTypescript,
    color: "#3178C6",
    glow: "rgba(49, 120, 198, 0.36)",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "Styling",
    icon: SiTailwindcss,
    color: "#38BDF8",
    glow: "rgba(56, 189, 248, 0.34)",
  },
  {
    id: "node",
    name: "Node.js",
    category: "Runtime",
    icon: SiNodedotjs,
    color: "#5FA04E",
    glow: "rgba(95, 160, 78, 0.34)",
  },
  {
    id: "express",
    name: "Express",
    category: "Backend",
    icon: SiExpress,
    color: "#e5e7eb",
    glow: "rgba(229, 231, 235, 0.22)",
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "Database",
    icon: SiMongodb,
    color: "#47A248",
    glow: "rgba(71, 162, 72, 0.34)",
  },
  {
    id: "postgres",
    name: "PostgreSQL",
    category: "Database",
    icon: SiPostgresql,
    color: "#4169E1",
    glow: "rgba(65, 105, 225, 0.36)",
  },
  {
    id: "graphql",
    name: "GraphQL",
    category: "API",
    icon: SiGraphql,
    color: "#E10098",
    glow: "rgba(225, 0, 152, 0.32)",
  },
  {
    id: "redux",
    name: "Redux",
    category: "State",
    icon: SiRedux,
    color: "#764ABC",
    glow: "rgba(118, 74, 188, 0.34)",
  },
  {
    id: "docker",
    name: "Docker",
    category: "DevOps",
    icon: SiDocker,
    color: "#2496ED",
    glow: "rgba(36, 150, 237, 0.36)",
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    category: "Cloud",
    icon: SiKubernetes,
    color: "#326CE5",
    glow: "rgba(50, 108, 229, 0.34)",
  },
  {
    id: "aws",
    name: "AWS",
    category: "Cloud",
    icon: FaAws,
    color: "#FF9900",
    glow: "rgba(255, 153, 0, 0.34)",
  },
  {
    id: "firebase",
    name: "Firebase",
    category: "Platform",
    icon: SiFirebase,
    color: "#FFCA28",
    glow: "rgba(255, 202, 40, 0.34)",
  },
  {
    id: "vercel",
    name: "Vercel",
    category: "Deploy",
    icon: SiVercel,
    color: "#f8fafc",
    glow: "rgba(248, 250, 252, 0.2)",
  },
  {
    id: "vite",
    name: "Vite",
    category: "Build",
    icon: SiVite,
    color: "#A855F7",
    glow: "rgba(168, 85, 247, 0.34)",
  },
  {
    id: "git",
    name: "Git",
    category: "Versioning",
    icon: SiGit,
    color: "#F05032",
    glow: "rgba(240, 80, 50, 0.34)",
  },
  {
    id: "github",
    name: "GitHub",
    category: "Workflow",
    icon: SiGithub,
    color: "#f8fafc",
    glow: "rgba(248, 250, 252, 0.2)",
  },
];

const MARQUEE_STYLES = `
  @keyframes tech-stack-marquee-ltr {
    from { transform: translate3d(-50%, 0, 0); }
    to { transform: translate3d(0, 0, 0); }
  }

  @keyframes tech-stack-marquee-rtl {
    from { transform: translate3d(0, 0, 0); }
    to { transform: translate3d(-50%, 0, 0); }
  }

  .tech-stack-marquee[data-pausable="true"]:hover .tech-stack-track,
  .tech-stack-marquee[data-pausable="true"]:focus-within .tech-stack-track {
    animation-play-state: paused;
  }

  @media (prefers-reduced-motion: reduce) {
    .tech-stack-track {
      animation: none !important;
      transform: none !important;
    }

    .tech-stack-copy {
      display: none !important;
    }

    .tech-stack-marquee {
      overflow-x: auto;
      scrollbar-width: none;
    }

    .tech-stack-marquee::-webkit-scrollbar {
      display: none;
    }
  }
`;

const cx = (...classes) => classes.filter(Boolean).join(" ");

const getInitials = (name = "") =>
  name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const TechLogo = ({ item }) => {
  const iconColor = item.color || "#f8fafc";

  if (item.logo) {
    return (
      <img
        src={item.logo}
        alt=""
        loading="lazy"
        className="object-contain h-9 w-9 sm:h-10 sm:w-10 lg:h-11 lg:w-11"
      />
    );
  }

  if (React.isValidElement(item.icon)) {
    return React.cloneElement(item.icon, {
      "aria-hidden": true,
      className: cx("h-9 w-9 sm:h-10 sm:w-10 lg:h-11 lg:w-11", item.icon.props.className),
      style: { color: iconColor, ...item.icon.props.style },
    });
  }

  if (typeof item.icon === "function") {
    const Icon = item.icon;
    return (
      <Icon
        aria-hidden="true"
        className="h-9 w-9 sm:h-10 sm:w-10 lg:h-11 lg:w-11"
        style={{ color: iconColor }}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className="grid h-9 w-9 place-items-center rounded-[8px] text-xs font-bold text-white sm:h-10 sm:w-10 lg:h-11 lg:w-11"
      style={{ backgroundColor: iconColor }}
    >
      {getInitials(item.name)}
    </span>
  );
};

const TechPill = ({ item, isDuplicate = false }) => (
  <div
    role={isDuplicate ? undefined : "listitem"}
    aria-label={isDuplicate ? undefined : `${item.name} technology logo`}
    className="relative list-none group/tech shrink-0"
    style={{
      "--tech-glow": item.glow || "rgba(0, 179, 179, 0.25)",
      "--tech-color": item.color || "#00b3b3",
    }}
  >
    <div
      className="relative flex h-24 w-24 flex-col items-center justify-center overflow-hidden rounded-[8px] px-3 py-4 shadow-[0_18px_45px_rgba(2,6,23,0.18)] backdrop-blur-md transition duration-300 ease-out hover:-translate-y-1.5 hover:bg-white/[0.12] hover:shadow-[0_26px_60px_var(--tech-glow)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300/80 sm:h-28 sm:w-28 lg:h-32 lg:w-32"
      tabIndex={isDuplicate ? -1 : 0}
    >
      <div
        className="absolute w-20 h-20 transition duration-500 rounded-full opacity-25 blur-2xl group-hover/tech:opacity-80"
        style={{ background: "var(--tech-glow)" }}
      />
      <div
        className="absolute inset-1 rounded-[8px] bg-gradient-to-br from-white/[0.1] via-transparent to-white/[0.03] opacity-80 transition duration-300 group-hover/tech:opacity-100"
      />
      <div
        className="relative grid h-14 w-14 place-items-center rounded-[8px] bg-slate-950/75 shadow-inner transition duration-300 group-hover/tech:-translate-y-1 group-hover/tech:scale-105 sm:h-16 sm:w-16 lg:h-[72px] lg:w-[72px]"
        style={{ boxShadow: `inset 0 0 22px ${item.glow || "rgba(0, 179, 179, 0.2)"}` }}
      >
        <TechLogo item={item} />
      </div>
      <p className="relative mt-3 max-w-full truncate text-center text-[11px] font-semibold leading-none text-slate-950 transition duration-300 group-hover/tech:text-black sm:mt-3.5 sm:text-xs">
        {item.name}
      </p>
    </div>
  </div>
);

const MarqueeRow = ({ items, duration, direction, pauseOnHover }) => {
  const animationName =
    direction === "rtl" ? "tech-stack-marquee-rtl" : "tech-stack-marquee-ltr";

  return (
    <div
      className="relative py-3 overflow-hidden tech-stack-marquee sm:py-4"
      data-pausable={pauseOnHover ? "true" : "false"}
    >
      <div
        className="flex gap-4 tech-stack-track w-max will-change-transform sm:gap-5"
        style={{
          animation: `${animationName} ${duration}s linear infinite`,
        }}
      >
        <div className="flex gap-4 pr-4 sm:gap-5 sm:pr-5">
          {items.map((item, index) => (
            <TechPill
              key={`${item.id || item.name}-${index}`}
              item={item}
            />
          ))}
        </div>
        <div
          className="flex gap-4 pr-4 tech-stack-copy sm:gap-5 sm:pr-5"
          aria-hidden="true"
        >
          {items.map((item, index) => (
            <TechPill
              key={`${item.id || item.name}-copy-${index}`}
              item={item}
              isDuplicate
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const TechStackSkeleton = ({ itemsPerRow = 8 }) => (
  <div
    className="flex gap-4 py-3 overflow-hidden sm:gap-5 sm:py-4"
    role="status"
    aria-label="Loading technology stack"
  >
    {Array.from({ length: itemsPerRow }, (_, itemIndex) => (
      <div
        key={`skeleton-${itemIndex}`}
        className="flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-[8px] bg-white/[0.06] px-3 py-4 sm:h-28 sm:w-28 lg:h-32 lg:w-32"
      >
        <div className="h-12 w-12 animate-pulse rounded-[8px] bg-white/[0.12] sm:h-14 sm:w-14 lg:h-16 lg:w-16" />
        <div className="mt-3 h-2.5 w-14 animate-pulse rounded-[8px] bg-white/[0.12] sm:mt-3.5 sm:w-16" />
      </div>
    ))}
    <span className="sr-only">Loading technology stack...</span>
  </div>
);

const TechStack = ({
  items = DEFAULT_TECH_STACK,
  title = "Technology Stack",
  eyebrow = "Built with production-grade tools",
  description = "A polished ecosystem of modern frameworks, cloud platforms, databases, and delivery tools trusted across enterprise-grade digital products.",
  loading = false,
  duration = 36,
  direction = "ltr",
  pauseOnHover = true,
  showHeader = false,
  className = "",
}) => {
  const headingId = useId();
  const safeItems = Array.isArray(items) && items.length > 0 ? items : DEFAULT_TECH_STACK;
  const normalizedDuration = Math.max(12, Number(duration) || 36);
  const normalizedDirection = ["rtl", "right", "right-to-left"].includes(direction)
    ? "rtl"
    : "ltr";

  return (
    <section
      className={cx("relative isolate mt-2 overflow-hidden py-4 sm:mt-2", className)}
      aria-labelledby={showHeader ? headingId : undefined}
      aria-label={showHeader ? undefined : title}
      aria-busy={loading}
    >
      <style>{MARQUEE_STYLES}</style>

      <div className="mx-auto max-w-7xl">
        {showHeader && (
          <div className="flex flex-col gap-3 px-1 mb-2 sm:mb-2 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="mb-2 text-xs font-bold uppercase text-primary-600">
                {eyebrow}
              </p>
              <h2
                id={headingId}
                className="text-2xl font-extrabold tracking-normal text-slate-950 sm:text-3xl"
              >
                {title}
              </h2>
            </div>
            {description && (
              <p className="max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
                {description}
              </p>
            )}
          </div>
        )}

        <div className="relative px-0 py-3 overflow-hidden sm:py-5">
          <div className="relative z-10">
            {loading ? (
              <div className="px-4 sm:px-6">
                <TechStackSkeleton />
              </div>
            ) : (
              <div role="list" aria-label="Technology stack logos">
                <MarqueeRow
                  items={safeItems}
                  duration={normalizedDuration}
                  direction={normalizedDirection}
                  pauseOnHover={pauseOnHover}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
