/**
 * CombinedLayout — Updated
 * LEFT  : News section  — carousel with images + "Learn More" hover button
 * RIGHT : Gallery section — compact 3×3 grid matching center-card height,
 *         thumbnail hover effect, click → full-grid zoom (no scroll)
 */

import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";

/* ─── Image imports ──────────────────────────────────────── */
import image1 from "../assets/clients/guideline1.jpg";
import image2 from "../assets/clients/guideline2.jpg";
import image3 from "../assets/clients/guideline3.jpg";
import image4 from "../assets/clients/guideline4.jpg";
import image5 from "../assets/clients/guideline6.jpg";
import img1 from "../assets/Website_Gallery_img/img1.jpg";
import img2 from "../assets/Website_Gallery_img/img2.jpg";
import img3 from "../assets/Website_Gallery_img/img3.jpg";
import img4 from "../assets/Website_Gallery_img/img4.jpeg";
import img5 from "../assets/Website_Gallery_img/img5.jpeg";
import img6 from "../assets/Website_Gallery_img/img6.jpeg";
import img7 from "../assets/Website_Gallery_img/img7.png";
import img8 from "../assets/Website_Gallery_img/img8.jpeg";
import img9 from "../assets/Website_Gallery_img/img9.jpeg";

/* ─── Responsive hook ────────────────────────────────────── */
function useWindowWidth() {
  const [w, setW] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1024,
  );
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return w;
}

/* ─── Carousel (News) data ───────────────────────────────── */
const slides = [
  {
    id: 1,
    img: image1,
    accent: "#a78bfa",
    url: "https://sesschennai.blogspot.com/2024/08/ensuring-safe-operation-of-test.html",
  },
  {
    id: 2,
    img: image2,
    accent: "#f472b6",
    url: "https://sesschennai.blogspot.com/2024/08/www.html",
  },
  {
    id: 3,
    img: image3,
    accent: "#38bdf8",
    url: "https://sesschennai.blogspot.com/2024/08/cutting-edge-solar-test-chamber-for.html",
  },
  {
    id: 4,
    img: image4,
    accent: "#34d399",
    url: "https://sesschennai.blogspot.com/2024/08/service-planning-oem-vs-local-rewinding.html",
  },
  {
    id: 5,
    img: image5,
    accent: "#fbbf24",
    url: "https://sesschennai.blogspot.com/2024/08/expert-solutions-for-refrigerant.html",
  },
];

/* ─── Spring config ──────────────────────────────────────── */
const MSPRING = { type: "spring", stiffness: 380, damping: 38, mass: 0.9 };

/* ─── Gallery grid data (3 × 3 = 9 items) ───────────────── */
const items = [
  { id: "img-1", img: img1, title: "Frame One" },
  { id: "img-2", img: img2, title: "Frame Two" },
  { id: "img-3", img: img3, title: "Frame Three" },
  { id: "img-4", img: img4, title: "Frame Four" },
  { id: "img-5", img: img5, title: "Frame Five" },
  { id: "img-6", img: img6, title: "Frame Six" },
  { id: "img-7", img: img7, title: "Frame Seven" },
  { id: "img-8", img: img8, title: "Frame Eight" },
  { id: "img-9", img: img9, title: "Frame Nine" },
];

/* ════════════════════════════════════════════════════════════
   NEWS CAROUSEL CARD
   — image-only background, "Learn More" appears on hover
════════════════════════════════════════════════════════════ */
function CarouselCard({ slide, index, x, CARD_W, CARD_H, STEP, onCardClick }) {
  const offset = useTransform(x, (v) => index + v / STEP);
  const scale = useTransform(
    offset,
    [-2.5, -1, 0, 1, 2.5],
    [0.65, 0.82, 1, 0.82, 0.65],
  );
  const opacity = useTransform(
    offset,
    [-2.5, -1.5, -0.5, 0, 0.5, 1.5, 2.5],
    [0, 0.25, 0.75, 1, 0.75, 0.25, 0],
  );
  const rotateY = useTransform(
    offset,
    [-2, -1, 0, 1, 2],
    [40, 20, 0, -20, -40],
  );
  const zIndex = useTransform(offset, (v) =>
    Math.round(100 - Math.abs(v) * 20),
  );
  const cardY = useTransform(offset, [-2, -1, 0, 1, 2], [40, 14, 0, 14, 40]);

  const handleLearnMore = (e) => {
    e.stopPropagation();
    window.open(slide.url || "#", "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      className="absolute top-0 select-none"
      style={{
        width: CARD_W,
        height: CARD_H,
        left: index * STEP,
        scale,
        opacity,
        rotateY,
        y: cardY,
        zIndex,
        transformPerspective: 1400,
        transformOrigin: "center center",
      }}
      onClick={() => onCardClick(index)}
    >
      <div
        className="relative w-full h-full rounded-[22px] overflow-hidden shadow-2xl group cursor-grab active:cursor-grabbing"
        style={{
          backgroundImage: `url(${slide.img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Bottom vignette */}
        <div
          className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none"
          style={{
            background: "linear-gradient(to top,rgba(0,0,0,0.6),transparent)",
          }}
        />

        {/* Hover overlay + Learn More */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          style={{
            background: "rgba(0,0,0,0.44)",
            backdropFilter: "blur(3px)",
          }}
        >
          <motion.button
            onClick={handleLearnMore}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-semibold tracking-widest uppercase pointer-events-auto"
            style={{
              background: "rgba(255,255,255,0.13)",
              border: "1px solid rgba(255,255,255,0.45)",
              color: "#fff",
              backdropFilter: "blur(10px)",
              fontFamily: "'Sora',sans-serif",
              letterSpacing: "0.12em",
            }}
            whileHover={{ scale: 1.06, background: "rgba(255,255,255,0.22)" }}
            whileTap={{ scale: 0.94 }}
          >
            Learn More
            <svg width="9" height="9" viewBox="0 0 13 13" fill="none">
              <path
                d="M2 11L11 2M11 2H4M11 2V9"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════
   NEWS CAROUSEL PANEL  (left side)
════════════════════════════════════════════════════════════ */
function CarouselPanel() {
  const winW = useWindowWidth();
  const isMd = winW >= 768;

  const CARD_W = isMd ? 240 : Math.min(185, winW * 0.44);
  const CARD_H = isMd ? 340 : 260;
  const GAP = isMd ? 18 : 12;
  const STEP = CARD_W + GAP;
  const VPORT_W = CARD_W + STEP * (isMd ? 1.32 : 1.1);

  const [active, setActive] = useState(1);
  const N = slides.length;
  const x = useMotionValue(0);
  const dragging = useRef(false);

  const snapTo = (idx) => {
    const c = Math.max(0, Math.min(N - 1, idx));
    setActive(c);
    animate(x, -c * STEP, {
      type: "spring",
      stiffness: 320,
      damping: 38,
      mass: 0.9,
    });
  };

  useEffect(() => {
    animate(x, -active * STEP, {
      type: "spring",
      stiffness: 320,
      damping: 38,
      mass: 0.9,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [STEP]);

  return (
    <div
      className="relative flex flex-col items-center justify-center w-full overflow-hidden mt-6"
      style={{ background: "#080a12" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 30% 50%,rgba(102,126,234,.09) 0%,transparent 60%),radial-gradient(ellipse 60% 40% at 70% 50%,rgba(244,114,182,.07) 0%,transparent 60%)",
        }}
      />
      {/* Dot-grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── News section heading — subtitle + title on SAME LINE ── */}
      <div className="relative z-10 mb-10 md:mb-7 text-center px-4">
        {/* Single row: subtitle label + title together */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center" }}
        >
          <span
            style={{
              display: "block",
              color: "var(--color-primary-500)",
              fontFamily: "var(--font-body)",
              fontWeight: "var(--font-weight-semibold)",
              fontSize: "var(--text-sm)",
              letterSpacing: "var(--tracking-wider)",
              textTransform: "uppercase",
              marginBottom: "var(--space-2)",
            }}
          >
            Latest Updates
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "var(--font-weight-bold)",
              fontSize: "clamp(var(--text-2xl), 3vw, var(--text-2xl))",
              lineHeight: "var(--leading-tight)",
              color: "var(--color-neutral-0)",
              margin: 0,
            }}
          >
            News & Insights
          </h2>
        </motion.div>
      </div>

      {/* Carousel viewport */}
      <div
        className="relative w-full"
        style={{ height: CARD_H, perspective: 1400 }}
      >
        <motion.div
          className="absolute top-0 h-full cursor-grab active:cursor-grabbing"
          style={{ x, left: "33%", width: N * STEP }}
          drag="x"
          dragConstraints={{ left: -(N - 1) * STEP, right: 0 }}
          dragElastic={0.08}
          dragTransition={{ bounceStiffness: 280, bounceDamping: 36 }}
          onDragStart={() => {
            dragging.current = true;
          }}
          onDragEnd={(_, info) => {
            dragging.current = false;
            if (info.offset.x < -60 || info.velocity.x < -600)
              snapTo(active + 1);
            else if (info.offset.x > 60 || info.velocity.x > 600)
              snapTo(active - 1);
            else snapTo(active);
          }}
        >
          {slides.map((s, i) => (
            <CarouselCard
              key={s.id}
              slide={s}
              index={i}
              x={x}
              CARD_W={CARD_W}
              CARD_H={CARD_H}
              STEP={STEP}
              onCardClick={(idx) => {
                if (!dragging.current && idx !== active) snapTo(idx);
              }}
            />
          ))}
        </motion.div>

        {/* Edge fade masks */}
        <div
          className="absolute inset-y-0 left-0 w-16 pointer-events-none z-20"
          style={{
            background: "linear-gradient(to right,#080a12,transparent)",
          }}
        />
        <div
          className="absolute inset-y-0 right-0 w-16 pointer-events-none z-20"
          style={{ background: "linear-gradient(to left,#080a12,transparent)" }}
        />
      </div>

      {/* Dot + arrow controls */}
      <div className="relative z-10 flex flex-col items-center gap-3 mt-5 md:mt-6">
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            onClick={() => snapTo(active - 1)}
            disabled={active === 0}
            className="flex items-center justify-center w-8 h-8 rounded-full"
            style={{
              background: "rgba(255,255,255,.06)",
              border: "1px solid rgba(255,255,255,.1)",
              color:
                active === 0 ? "rgba(255,255,255,.2)" : "rgba(255,255,255,.75)",
              cursor: active === 0 ? "default" : "pointer",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 3L5 8l5 5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>

          <div className="flex items-center gap-1.5">
            {slides.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => snapTo(i)}
                animate={{
                  width: i === active ? 22 : 5,
                  opacity: i === active ? 1 : 0.3,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="h-[5px] rounded-full"
                style={{
                  background:
                    i === active
                      ? slides[active].accent
                      : "rgba(255,255,255,.4)",
                }}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            onClick={() => snapTo(active + 1)}
            disabled={active === N - 1}
            className="flex items-center justify-center w-8 h-8 rounded-full"
            style={{
              background: "rgba(255,255,255,.06)",
              border: "1px solid rgba(255,255,255,.1)",
              color:
                active === N - 1
                  ? "rgba(255,255,255,.2)"
                  : "rgba(255,255,255,.75)",
              cursor: active === N - 1 ? "default" : "pointer",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path
                d="M6 3l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   GALLERY GRID CARD
   — pure image tile with thumbnail hover effect (scale + overlay + expand icon)
════════════════════════════════════════════════════════════ */
function GridCard({ item, onClick }) {
  return (
    <motion.div
      layoutId={`card-${item.id}`}
      onClick={onClick}
      className="relative overflow-hidden cursor-pointer"
      style={{
        aspectRatio: "1 / 1",
        borderRadius: "6px",
      }}
      transition={MSPRING}
      /* Thumbnail hover effect: scale up + brightness boost */
      whileHover={{ scale: 1.06, zIndex: 2 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Full-bleed image */}
      <img
        src={item.img}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transition: "filter 0.25s ease" }}
        draggable={false}
      />

      {/* Thumbnail hover overlay — dark tint + slight brightness */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        style={{
          background:
            "linear-gradient(135deg, rgba(167,139,250,0.18) 0%, rgba(0,0,0,0.38) 100%)",
          backdropFilter: "brightness(1.08)",
        }}
      />

      {/* Thumbnail border glow on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        style={{
          borderRadius: "6px",
          boxShadow: "inset 0 0 0 1.5px rgba(167,139,250,0.55)",
        }}
      />

      {/* Expand icon — bottom-right, appears on hover */}
      <motion.div
        className="absolute bottom-1.5 right-1.5 w-5 h-5 rounded-full flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.5, y: 4 }}
        whileHover={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.18 }}
        style={{ background: "rgba(0,0,0,0.62)", backdropFilter: "blur(6px)" }}
      >
        <svg width="8" height="8" viewBox="0 0 13 13" fill="none">
          <path
            d="M2 11L11 2M11 2H4M11 2V9"
            stroke="white"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      {/* Title tooltip at bottom on hover */}
      <motion.div
        className="absolute inset-x-0 bottom-0 flex items-end px-1.5 pb-1"
        initial={{ opacity: 0, y: 6 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)",
        }}
      >
        <span
          style={{
            color: "#fff",
            fontSize: "0.55rem",
            fontFamily: "'Sora', sans-serif",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            lineHeight: 1,
          }}
        >
          {item.title}
        </span>
      </motion.div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════
   IMAGE LIGHTBOX
   — expands to fill the ENTIRE 9-image grid area (absolute inset-0)
   — NO scroll — the expanded image sits within the fixed grid container
════════════════════════════════════════════════════════════ */
function ImageLightbox({ item, onClose }) {
  return (
    <>
      {/* Backdrop — scoped to grid wrapper, clicking closes lightbox */}
      <motion.div
        className="absolute inset-0 z-40"
        style={{
          background: "rgba(4,6,16,0.96)",
          backdropFilter: "blur(18px)",
          borderRadius: "8px",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      />

      {/*
       * Expanded image — fills full grid wrapper via absolute inset-0.
       * layoutId matches the clicked card → smooth shared-layout zoom.
       * overflow:hidden ensures no scroll leakage.
       */}
      <motion.div
        layoutId={`card-${item.id}`}
        className="absolute inset-0 z-50"
        style={{ borderRadius: "8px", overflow: "hidden" }}
        transition={MSPRING}
      >
        {/* Full-bleed image */}
        <img
          src={item.img}
          alt={item.title}
          className="w-full h-full object-cover"
          draggable={false}
        />

        {/* Bottom title bar */}
        {/* <div
          className="absolute inset-x-0 bottom-0 px-4 py-3"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
          }}
        >
          <span
            style={{
              color: "#fff",
              fontSize: "0.75rem",
              fontFamily: "'Sora', sans-serif",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            {item.title}
          </span>
        </div> */}

        {/* Close button — top-right corner */}
        <motion.button
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center z-10"
          style={{
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.18)",
          }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          transition={{ delay: 0.12, duration: 0.18 }}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          whileHover={{ scale: 1.12, background: "rgba(0,0,0,0.82)" }}
          whileTap={{ scale: 0.9 }}
        >
          <svg width="10" height="10" viewBox="0 0 13 13" fill="none">
            <path
              d="M1.5 1.5l10 10M11.5 1.5l-10 10"
              stroke="white"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
        </motion.button>
      </motion.div>
    </>
  );
}

/* ════════════════════════════════════════════════════════════
   GALLERY PANEL  (right side)

   Key changes vs original:
   • Grid height is fixed = CARD_H (matches left center card exactly)
   • NO overflow / scroll on the grid area or panel
   • Heading uses same inline layout as left side
   • Zoom/lightbox is absolute inset-0 inside grid wrapper — no scroll
════════════════════════════════════════════════════════════ */

/* CARD_H must match CarouselPanel's CARD_H for desktop */
const DESKTOP_CARD_H = 340;
const MOBILE_CARD_H = 260;

function GalleryPanel({ height }) {
  const winW = useWindowWidth();
  const isMd = winW >= 768;
  const CARD_H = isMd ? DESKTOP_CARD_H : MOBILE_CARD_H;

  const [selected, setSelected] = useState(null);
  const active = items.find((i) => i.id === selected) ?? null;

  return (
    <MotionConfig transition={MSPRING}>
      {/*
       * Panel root — flex-col, vertically centers the content,
       * NO overflow so the zoom card never causes a scrollbar.
       */}
      <div
        className="relative w-full flex flex-col items-center justify-center"
        style={{ height: "90%", background: "#060810", overflow: "hidden" }}
      >
        {/* Dot-grid texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* ── Gallery heading — subtitle + title on SAME LINE ── */}
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "var(--space-4)" }}
        >
          <span
            style={{
              display: "block",
              color: "var(--color-primary-500)",
              fontFamily: "var(--font-body)",
              fontWeight: "var(--font-weight-semibold)",
              fontSize: "var(--text-sm)",
              letterSpacing: "var(--tracking-wider)",
              textTransform: "uppercase",
              marginBottom: "var(--space-2)",
            }}
          >
            Our Portfolio
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "var(--font-weight-bold)",
              fontSize: "clamp(var(--text-2xl), 3vw, var(--text-2xl))",
              lineHeight: "var(--leading-tight)",
              color: "var(--color-neutral-0)",
              margin: 0,
            }}
          >
            Visual Gallery
          </h2>
        </motion.div>

        {/*
         * ── Fixed-height grid wrapper ────────────────────────
         * Height = CARD_H (same as carousel center card).
         * position:relative + overflow:hidden so the lightbox
         * (absolute inset-0) is clipped here — zero scroll.
         */}
        <div
          className="relative z-10 flex-shrink-0 px-4 md:px-6"
          style={{
            height: CARD_H,
            width: "100%",
            maxWidth: CARD_H + 40 /* keep grid roughly square */,
          }}
        >
          {/* 3 × 3 image grid — fills the fixed-height box */}
          <motion.div
            className="grid grid-cols-3"
            style={{
              gap: "4px",
              height: "100%",
              borderRadius: "8px",
              overflow: "hidden",
            }}
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.05 } },
            }}
          >
            {items.map((item) => (
              <motion.div
                key={item.id}
                style={{ height: "100%", minHeight: 0 }}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.32, ease: "easeOut" },
                  },
                }}
              >
                <GridCard item={item} onClick={() => setSelected(item.id)} />
              </motion.div>
            ))}
          </motion.div>

          {/*
           * Lightbox — absolute inset-0 covers the entire CARD_H box.
           * No scrolling: overflow:hidden on the parent clips it.
           */}
          <AnimatePresence>
            {active && (
              <ImageLightbox
                key={active.id}
                item={active}
                onClose={() => setSelected(null)}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </MotionConfig>
  );
}

/* ════════════════════════════════════════════════════════════
   DIVIDER
════════════════════════════════════════════════════════════ */
function Divider({ vertical }) {
  return vertical ? (
    <div
      className="relative flex-shrink-0 w-px self-stretch"
      style={{ background: "rgba(255,255,255,.07)" }}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
        style={{
          background: "rgba(255,255,255,.5)",
          boxShadow: "0 0 12px 4px rgba(167,139,250,.3)",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-24"
        style={{ background: "linear-gradient(to bottom,#060810,transparent)" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-24"
        style={{ background: "linear-gradient(to top,#060810,transparent)" }}
      />
    </div>
  ) : (
    <div
      className="relative w-full flex-shrink-0"
      style={{ height: 1, background: "rgba(255,255,255,.07)" }}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
        style={{
          background: "rgba(255,255,255,.5)",
          boxShadow: "0 0 12px 4px rgba(167,139,250,.3)",
        }}
      />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   COMBINED LAYOUT — default export
════════════════════════════════════════════════════════════ */
const DESKTOP_SECTION_H = "90vh";
const MOBILE_CAROUSEL_H = 460;
const MOBILE_GALLERY_H = 480;

export default function CombinedLayout() {
  const winW = useWindowWidth();
  const isMd = winW >= 768;

  const cH = isMd ? "100%" : MOBILE_CAROUSEL_H;
  const gH = isMd ? "100%" : MOBILE_GALLERY_H;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=DM+Mono:wght@400;500&display=swap');
      `}</style>

      <div
        style={{
          width: "100%",
          height: isMd ? DESKTOP_SECTION_H : "auto",
          background: "#060810",
          overflow: "hidden",
          display: "flex",
          flexDirection: isMd ? "row" : "column",
        }}
      >
        {/* LEFT — News carousel */}
        <div style={{ flex: isMd ? 1 : "none", minWidth: 0, height: cH }}>
          <CarouselPanel height={cH} />
        </div>

        <Divider vertical={isMd} />

        {/* RIGHT — Visual Gallery */}
        <div style={{ flex: isMd ? 1 : "none", minWidth: 0, height: gH }}>
          <GalleryPanel height={gH} />
        </div>
      </div>
    </>
  );
}
