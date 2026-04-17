// PDFFlipbook.jsx — Premium Ultra-Smooth Flipbook
// ═══════════════════════════════════════════════════════════════
//  PRODUCTION FIX  ▸ Worker uses .mjs extension (pdfjs-dist v5)
//  3D CLIP FIX     ▸ Flying page is OUTSIDE overflow:hidden
//  GPU FIX         ▸ will-change: transform on rotating card
//  PREMIUM UPGRADE ▸ Page edges, corner curl, gloss sweep, swipe
// ═══════════════════════════════════════════════════════════════

import { useEffect, useRef, useState, useCallback } from "react";
import samplePDF from "../assets/Website_Gallery_img/Profile_SESS.pdf";
import * as pdfjsLib from "pdfjs-dist";

// ─────────────────────────────────────────────────────────────
//  PRODUCTION FIX — Worker URL
//  pdfjs-dist v5 ships .mjs files.
//  Old code: "pdf.worker.min?url"  (no extension) → 404 in prod
//  Fix:      "pdf.worker.min.mjs?url" → Vite hashes + serves correctly
// ─────────────────────────────────────────────────────────────
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

// ───────────────────────────────────────────────import { useEffect, useRef, useState, useCallback } from "react";
// import samplePDF from "../assets/Website_Gallery_img/Profile_SESS.pdf";
// import * as pdfjsLib from "pdfjs-dist";

// Tell PDF.js to load the ESM worker from jsDelivr instead of cdnjs.
// cdnjs does not host a .js worker for v5, but jsDelivr serves the
// `.mjs` build reliably for every published version:contentReference[oaicite:4]{index=4}:contentReference[oaicite:5]{index=5}.
// pdfjsLib.GlobalWorkerOptions.workerSrc =
//   `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
// // Because the worker is an ES module, you must also set the workerType:
// pdfjsLib.GlobalWorkerOptions.workerType = "module";
// ─────────────────────────────────────────────────────────────
const FLIP_MS     = 960;
const FLIP_EASE   = "cubic-bezier(0.76, 0, 0.24, 1)";
const SPINE_W     = 7;
const EDGE_COUNT  = 7;
const RENDER_PXDP = typeof window !== "undefined" ? Math.min(window.devicePixelRatio ?? 1, 2) : 1;

// ─────────────────────────────────────────────────────────────
//  ICONS
// ─────────────────────────────────────────────────────────────
const I = {
  prev:  <svg viewBox="0 0 24 24" style={{width:15,height:15}} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>,
  next:  <svg viewBox="0 0 24 24" style={{width:15,height:15}} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>,
  first: <svg viewBox="0 0 24 24" style={{width:15,height:15}} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M11 17l-5-5 5-5M18 17l-5-5 5-5"/></svg>,
  last:  <svg viewBox="0 0 24 24" style={{width:15,height:15}} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M13 7l5 5-5 5M6 7l5 5-5 5"/></svg>,
  fs:    <svg viewBox="0 0 24 24" style={{width:15,height:15}} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M4 8V4h4M16 4h4v4M4 16v4h4M16 20h4v-4"/></svg>,
  zIn:   <svg viewBox="0 0 24 24" style={{width:15,height:15}} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4M11 8v6M8 11h6"/></svg>,
  zOut:  <svg viewBox="0 0 24 24" style={{width:15,height:15}} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4M8 11h6"/></svg>,
  sOn:   <svg viewBox="0 0 24 24" style={{width:15,height:15}} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/></svg>,
  sOff:  <svg viewBox="0 0 24 24" style={{width:15,height:15}} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>,
  th:    <svg viewBox="0 0 24 24" style={{width:15,height:15}} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
};

// ─────────────────────────────────────────────────────────────
//  HELPERS
// ─────────────────────────────────────────────────────────────
async function renderPage(pdf, pageNum, scale) {
  const page   = await pdf.getPage(pageNum);
  const vp     = page.getViewport({ scale });
  const canvas = document.createElement("canvas");
  canvas.width  = Math.floor(vp.width);
  canvas.height = Math.floor(vp.height);
  await page.render({ canvasContext: canvas.getContext("2d"), viewport: vp }).promise;
  return canvas.toDataURL("image/jpeg", 0.93);
}

function playFlipSound() {
  try {
    const ctx  = new (window.AudioContext || window.webkitAudioContext)();
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(500, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.2);
    gain.gain.setValueAtTime(0.07, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2);
    osc.start(); osc.stop(ctx.currentTime + 0.22);
  } catch (_) {}
}

function getSpreadPages(spreadIdx, totalPages) {
  if (spreadIdx === 0) return [null, 0];
  const l = spreadIdx * 2 - 1;
  const r = spreadIdx * 2;
  return [l < totalPages ? l : null, r < totalPages ? r : null];
}

// ─────────────────────────────────────────────────────────────
//  PAGE CELL
// ─────────────────────────────────────────────────────────────
function PageCell({ dataUrl, pageNum, side, zoom }) {
  return (
    <div style={{
      position: "absolute", inset: 0,
      background: "#faf7f2",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      {/* Binding depression shadow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2,
        boxShadow: side === "left"
          ? "inset -12px 0 32px -10px rgba(0,0,0,0.2), inset 1px 0 4px rgba(0,0,0,0.06)"
          : "inset  12px 0 32px -10px rgba(0,0,0,0.2), inset -1px 0 4px rgba(0,0,0,0.06)",
      }} />

      {dataUrl ? (
        <img
          src={dataUrl}
          alt={pageNum != null ? `Page ${pageNum}` : "blank"}
          draggable={false}
          style={{
            maxWidth: "100%", maxHeight: "100%",
            objectFit: "contain",
            transform: `scale(${zoom})`,
            transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
            userSelect: "none",
            display: "block",
            position: "relative", zIndex: 1,
          }}
        />
      ) : (
        <div style={{
          width: "100%", height: "100%",
          background: "linear-gradient(160deg, #f5f1eb 0%, #ece6db 100%)",
        }} />
      )}

      {pageNum != null && (
        <span style={{
          position: "absolute", bottom: 8, left: 0, right: 0, zIndex: 3,
          textAlign: "center", fontSize: 8,
          color: "rgba(0,0,0,0.18)",
          fontFamily: "'Courier New', monospace",
          letterSpacing: "0.2em",
          userSelect: "none",
        }}>
          {pageNum}
        </span>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  TOOLBAR BUTTON
// ─────────────────────────────────────────────────────────────
function TB({ onClick, disabled, active, title, children }) {
  const base = {
    width: 30, height: 30,
    display: "flex", alignItems: "center", justifyContent: "center",
    borderRadius: "50%",
    border: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.18 : 1,
    transition: "background 0.15s, color 0.15s",
    outline: "none",
    background: active ? "rgba(56,189,248,0.18)" : "transparent",
    color:      active ? "#38bdf8" : "rgba(255,255,255,0.48)",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      style={base}
      onMouseEnter={e => {
        if (disabled) return;
        e.currentTarget.style.background = active ? "rgba(56,189,248,0.28)" : "rgba(255,255,255,0.1)";
        e.currentTarget.style.color = "#fff";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = active ? "rgba(56,189,248,0.18)" : "transparent";
        e.currentTarget.style.color = active ? "#38bdf8" : "rgba(255,255,255,0.48)";
      }}
    >
      {children}
    </button>
  );
}

function TBDivider() {
  return <div style={{ width: 1, height: 14, background: "rgba(255,255,255,0.09)", margin: "0 3px", flexShrink: 0 }} />;
}

// ─────────────────────────────────────────────────────────────
//  ARROW BUTTON STYLE (shared)
// ─────────────────────────────────────────────────────────────
const arrowBtn = {
  flexShrink: 0,
  width: 42, height: 42,
  borderRadius: "50%",
  border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(255,255,255,0.03)",
  color: "rgba(255,255,255,0.4)",
  cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center",
  transition: "all 0.18s ease",
  outline: "none",
};

// ═════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ═════════════════════════════════════════════════════════════
export default function PDFFlipbook() {
  const [pages,       setPages]       = useState([]);
  const [thumbs,      setThumbs]      = useState([]);
  const [total,       setTotal]       = useState(0);
  const [totalSpr,    setTotalSpr]    = useState(0);
  const [spread,      setSpread]      = useState(0);
  const [loading,     setLoading]     = useState(true);
  const [progress,    setProgress]    = useState(0);
  const [loadMsg,     setLoadMsg]     = useState("Loading PDF…");
  const [flipState,   setFlipState]   = useState(null); // { dir, from, to }
  const [zoom,        setZoom]        = useState(1);
  const [sound,       setSound]       = useState(true);
  const [showThumbs,  setShowThumbs]  = useState(false);
  const [isFull,      setIsFull]      = useState(false);
  const [hoverCurl,   setHoverCurl]   = useState(false); // right corner curl

  const wrapRef     = useRef(null);
  const touchStartX = useRef(null);

  // ── Load PDF ────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        setLoadMsg("Loading PDF…");
        const pdf = await pdfjsLib.getDocument(samplePDF).promise;
        const n   = pdf.numPages;
        setTotal(n);
        setTotalSpr(Math.ceil((n + 1) / 2));

        // Phase 1: thumbnails
        const tArr = Array(n).fill(null);
        setLoadMsg("Building page previews…");
        for (let i = 1; i <= n; i++) {
          tArr[i - 1] = await renderPage(pdf, i, 0.3);
          setThumbs([...tArr]);
          setProgress(Math.round((i / n) * 28));
        }

        // Phase 2: full pages
        const pArr = Array(n).fill(null);
        setLoadMsg("Rendering high-res pages…");
        for (let i = 1; i <= n; i++) {
          pArr[i - 1] = await renderPage(pdf, i, 1.8 * RENDER_PXDP);
          setPages([...pArr]);
          setProgress(28 + Math.round((i / n) * 72));
        }

        setLoading(false);
      } catch (err) {
        console.error("PDFFlipbook load error:", err);
        setLoading(false);
      }
    })();
  }, []);

  // ── Navigation ──────────────────────────────────────────────
  const isFlipping = !!flipState;

  const goTo = useCallback((idx) => {
    if (isFlipping || idx === spread || idx < 0 || idx >= totalSpr) return;
    if (sound) playFlipSound();
    setFlipState({ dir: idx > spread ? "next" : "prev", from: spread, to: idx });
  }, [isFlipping, spread, totalSpr, sound]);

  const onFlipDone = useCallback(() => {
    if (!flipState) return;
    setSpread(flipState.to);
    setFlipState(null);
  }, [flipState]);

  const next  = useCallback(() => goTo(spread + 1),      [goTo, spread]);
  const prev  = useCallback(() => goTo(spread - 1),      [goTo, spread]);
  const first = useCallback(() => goTo(0),                [goTo]);
  const last  = useCallback(() => goTo(totalSpr - 1),    [goTo, totalSpr]);

  // Keyboard
  useEffect(() => {
    const h = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft")  prev();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  });

  // Fullscreen
  useEffect(() => {
    const h = () => setIsFull(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", h);
    return () => document.removeEventListener("fullscreenchange", h);
  }, []);

  function toggleFS() {
    if (!document.fullscreenElement) wrapRef.current?.requestFullscreen();
    else document.exitFullscreen();
  }

  // Touch / swipe
  function onTouchStart(e) { touchStartX.current = e.touches[0].clientX; }
  function onTouchEnd(e) {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < 50) return;
    if (dx < 0) next(); else prev();
  }

  // ── Spread data ─────────────────────────────────────────────
  const [curL, curR]   = getSpreadPages(spread, total);
  const sliderMax      = Math.max(1, totalSpr - 1);
  const fromPages      = flipState ? getSpreadPages(flipState.from, total) : [curL, curR];
  const toPages        = flipState ? getSpreadPages(flipState.to,   total) : [curL, curR];
  const [fromL, fromR] = fromPages;
  const [toL,   toR  ] = toPages;

  const isCover     = !isFlipping && spread === 0;
  const isLastAlone = !isFlipping && spread === totalSpr - 1 && curR === null;
  const isSingle    = isCover || isLastAlone;

  const img  = (idx) => (idx != null ? pages[idx] ?? null : null);
  const cell = (idx, side) => (
    <PageCell dataUrl={img(idx)} pageNum={idx != null ? idx + 1 : null} side={side} zoom={zoom} />
  );

  // ── LOADING SCREEN ──────────────────────────────────────────
  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: 22,
        background: "radial-gradient(ellipse at 50% 40%, #1b2645 0%, #0b1020 100%)",
      }}>
        {/* Animated book */}
        <div style={{ position: "relative", width: 60, height: 76 }}>
          <div style={{
            width: 60, height: 76,
            background: "linear-gradient(145deg, #1e3975, #2a5fbc)",
            borderRadius: "2px 8px 8px 2px",
            boxShadow: "6px 6px 24px rgba(0,0,0,0.55), inset -2px 0 0 rgba(255,255,255,0.06)",
            animation: "bookBounce 1.8s ease-in-out infinite",
            position: "relative",
          }}>
            <div style={{
              position: "absolute", left: 0, top: 6, bottom: 6, width: 7,
              background: "linear-gradient(to right, #0f2050, #193580)",
              borderRadius: "2px 0 0 2px",
            }} />
            {[14, 26, 38, 50].map((top, i) => (
              <div key={i} style={{
                position: "absolute", left: 13, right: 7, top,
                height: 2, borderRadius: 2,
                background: `rgba(255,255,255,${0.07 + i * 0.04})`,
                animation: `lineFlash 1.8s ease-in-out ${i * 0.12}s infinite`,
              }} />
            ))}
          </div>
        </div>

        <div style={{
          color: "rgba(255,255,255,0.45)", fontSize: 10,
          letterSpacing: "0.26em", textTransform: "uppercase",
          fontWeight: 300, fontFamily: "system-ui, sans-serif",
        }}>
          {loadMsg}
        </div>

        {/* Progress bar */}
        <div style={{
          position: "relative", width: 230, height: 3,
          borderRadius: 99, background: "rgba(255,255,255,0.07)",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: "0 auto 0 0",
            width: `${progress}%`,
            background: "linear-gradient(to right, #38bdf8, #6366f1)",
            borderRadius: 99,
            transition: "width 0.25s ease",
          }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
            animation: "shimmer 1.8s linear infinite",
          }} />
        </div>

        <div style={{ color: "rgba(255,255,255,0.18)", fontSize: 10, fontFamily: "monospace" }}>
          {progress}%
        </div>

        <style>{`
          @keyframes bookBounce {
            0%,100% { transform: translateY(0) rotate(-1deg); }
            50%      { transform: translateY(-6px) rotate(1deg); }
          }
          @keyframes lineFlash {
            0%,100% { opacity:0.5; }
            50%      { opacity:1; }
          }
          @keyframes shimmer {
            0%   { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </div>
    );
  }

  // ── MAIN RENDER ─────────────────────────────────────────────
  return (
    <div
      ref={wrapRef}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{
        minHeight: "100vh",
        display: "flex", flexDirection: "column",
        overflow: "hidden", position: "relative",
        background: "radial-gradient(ellipse at 55% 35%, #1c2640 0%, #0b1020 100%)",
      }}
    >
      {/* Grid texture */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.022,
        backgroundImage: "linear-gradient(rgba(255,255,255,.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.8) 1px,transparent 1px)",
        backgroundSize: "44px 44px",
      }} />

      {/* Ambient glows */}
      <div style={{
        position: "absolute", top: "18%", left: "18%",
        width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, #3b82f6, transparent 70%)",
        filter: "blur(70px)", opacity: 0.07, pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "18%", right: "18%",
        width: 380, height: 380, borderRadius: "50%",
        background: "radial-gradient(circle, #0ea5e9, transparent 70%)",
        filter: "blur(70px)", opacity: 0.045, pointerEvents: "none",
      }} />

      {/* ── Thumbnail sidebar ── */}
      <div style={{
        position: "absolute", top: 0, left: 0, bottom: 0, zIndex: 30,
        display: "flex", flexDirection: "column",
        background: "rgba(10,15,30,0.97)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        width: showThumbs ? 214 : 0,
        overflow: "hidden",
        transition: `width 0.38s ${FLIP_EASE}`,
        flexShrink: 0,
      }}>
        {showThumbs && (
          <>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "11px 12px 9px",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              flexShrink: 0,
            }}>
              <span style={{
                color: "rgba(255,255,255,0.3)", fontSize: 9,
                letterSpacing: "0.26em", textTransform: "uppercase",
                fontFamily: "system-ui, sans-serif",
              }}>
                Pages
              </span>
              <button
                onClick={() => setShowThumbs(false)}
                style={{
                  background: "none", border: "none",
                  color: "rgba(255,255,255,0.28)", cursor: "pointer",
                  fontSize: 18, lineHeight: 1, padding: "0 2px",
                  transition: "color 0.15s",
                }}
                onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.8)"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.28)"}
              >×</button>
            </div>
            <div style={{
              flex: 1, overflowY: "auto", padding: 8,
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6,
              alignContent: "start",
              scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.08) transparent",
            }}>
              {thumbs.map((src, i) => {
                const sp = i === 0 ? 0 : Math.ceil((i + 1) / 2);
                const active = sp === spread;
                return (
                  <button
                    key={i}
                    onClick={() => goTo(sp)}
                    style={{
                      position: "relative", borderRadius: 4,
                      overflow: "hidden", padding: 0,
                      border: `2px solid ${active ? "#38bdf8" : "transparent"}`,
                      boxShadow: active ? "0 0 14px rgba(56,189,248,0.38)" : "none",
                      cursor: "pointer",
                      background: "rgba(255,255,255,0.05)",
                      transition: "border-color 0.18s, box-shadow 0.18s",
                    }}
                    onMouseEnter={e => { if (!active) e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
                    onMouseLeave={e => { if (!active) e.currentTarget.style.borderColor = "transparent"; }}
                  >
                    {src
                      ? <img src={src} alt={`p${i + 1}`} style={{ width: "100%", height: "auto", display: "block", background: "#fff" }} />
                      : <div style={{ width: "100%", aspectRatio: "3/4", background: "rgba(255,255,255,0.05)" }} />
                    }
                    <span style={{
                      position: "absolute", bottom: 2, right: 3,
                      fontSize: 7, color: "rgba(255,255,255,0.32)",
                      fontFamily: "monospace",
                    }}>
                      {i + 1}
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* ── Book stage ── */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: 18, padding: "28px 16px",
        marginLeft: showThumbs ? 214 : 0,
        transition: `margin 0.38s ${FLIP_EASE}`,
      }}>

        {/* Navigation row + book */}
        <div style={{ display: "flex", alignItems: "center", gap: 18, width: "100%", justifyContent: "center" }}>

          {/* LEFT arrow */}
          <button
            onClick={prev}
            disabled={spread === 0 || isFlipping}
            style={{ ...arrowBtn, opacity: spread === 0 || isFlipping ? 0.18 : 1 }}
            onMouseEnter={e => { if (!(spread === 0 || isFlipping)) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
          >
            {I.prev}
          </button>

          {/* ════════════════════ BOOK ════════════════════ */}
          <div style={{
            position: "relative",
            flexShrink: 0,
            width: isSingle
              ? "min(340px, calc((100vw - 200px) / 2))"
              : "min(730px, calc(100vw - 200px))",
            height: "min(530px, calc((100vw - 200px) * 0.726))",
            transition: `width ${Math.round(FLIP_MS * 0.6)}ms ${FLIP_EASE}`,
          }}>

            {/* Realistic drop shadow */}
            <div style={{
              position: "absolute",
              left: "6%", right: "6%", bottom: -18, height: 28,
              background: "rgba(0,0,0,0.72)",
              filter: "blur(22px)",
              borderRadius: "50%",
              pointerEvents: "none",
              zIndex: 0,
            }} />

            {/* Page edges — right side (book thickness) */}
            {!isSingle && (
              <div style={{
                position: "absolute", right: -12, top: 5, bottom: 5,
                zIndex: 1, display: "flex", gap: 1.5,
              }}>
                {[...Array(EDGE_COUNT)].map((_, i) => (
                  <div key={i} style={{
                    width: i === 0 ? 3 : 2,
                    background: `rgba(238,222,198,${0.6 - i * 0.07})`,
                    borderRadius: "0 1px 1px 0",
                  }} />
                ))}
              </div>
            )}

            {/* Page edges — left side */}
            {!isSingle && (
              <div style={{
                position: "absolute", left: -12, top: 5, bottom: 5,
                zIndex: 1, display: "flex", flexDirection: "row-reverse", gap: 1.5,
              }}>
                {[...Array(EDGE_COUNT)].map((_, i) => (
                  <div key={i} style={{
                    width: i === 0 ? 3 : 2,
                    background: `rgba(238,222,198,${0.6 - i * 0.07})`,
                    borderRadius: "1px 0 0 1px",
                  }} />
                ))}
              </div>
            )}

            {/*
              ╔══════════════════════════════════════════════════╗
              ║  BOOK PERSPECTIVE CONTAINER                      ║
              ║  ─────────────────────────────────────────────   ║
              ║  ⚠️  NO overflow:hidden here!                    ║
              ║  The flying page rotates OUTSIDE its own bounds. ║
              ║  overflow:hidden + rotateY = visual 3D clipping. ║
              ╚══════════════════════════════════════════════════╝
            */}
            <div style={{
              position: "absolute", inset: 0, zIndex: 2,
              perspective: "2600px",
              perspectiveOrigin: "50% 50%",
              /* NO overflow:hidden */
            }}>

              {/*
                STATIC BOOK BODY
                overflow:hidden clips only the static pages — correct.
                The flying page is a SIBLING div, not a child.
              */}
              <div style={{
                position: "absolute", inset: 0, zIndex: 1,
                display: "flex",
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: "0 36px 100px rgba(0,0,0,0.78), 0 0 0 1px rgba(255,255,255,0.05)",
              }}>
                {/* Left page */}
                {!isCover && (
                  <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>
                    {isFlipping
                      ? cell(flipState.dir === "next" ? toL : fromL, "left")
                      : cell(curL, "left")}
                    {isFlipping && flipState.dir === "next" && (
                      <div style={{
                        position: "absolute", inset: 0, pointerEvents: "none",
                        background: "linear-gradient(to left, rgba(0,0,0,0.48) 0%, rgba(0,0,0,0) 68%)",
                        animation: `castShadow ${FLIP_MS}ms ${FLIP_EASE} forwards`,
                      }} />
                    )}
                    {isFlipping && flipState.dir === "prev" && (
                      <div style={{
                        position: "absolute", inset: 0, pointerEvents: "none",
                        background: "linear-gradient(to left, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0) 68%)",
                        animation: `castShadowFade ${FLIP_MS}ms ${FLIP_EASE} forwards`,
                      }} />
                    )}
                  </div>
                )}

                {/* Spine */}
                {!isCover && !isLastAlone && (
                  <div style={{
                    flexShrink: 0, width: SPINE_W, zIndex: 2, position: "relative",
                    background: "linear-gradient(to right,#050a18 0%,#122256 40%,#1b3980 50%,#122256 60%,#050a18 100%)",
                    boxShadow: "0 0 22px rgba(0,0,0,0.65)",
                  }}>
                    <div style={{ position: "absolute", inset: "0 auto 0 0", width: 1, background: "rgba(255,255,255,0.09)" }} />
                    <div style={{ position: "absolute", inset: "0 0 0 auto", width: 1, background: "rgba(0,0,0,0.65)" }} />
                  </div>
                )}

                {/* Right page */}
                {!isLastAlone && (
                  <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>
                    {isFlipping
                      ? cell(flipState.dir === "next" ? toR : fromR, "right")
                      : cell(curR, "right")}
                    {isFlipping && flipState.dir === "prev" && (
                      <div style={{
                        position: "absolute", inset: 0, pointerEvents: "none",
                        background: "linear-gradient(to right, rgba(0,0,0,0.48) 0%, rgba(0,0,0,0) 68%)",
                        animation: `castShadow ${FLIP_MS}ms ${FLIP_EASE} forwards`,
                      }} />
                    )}
                    {isFlipping && flipState.dir === "next" && (
                      <div style={{
                        position: "absolute", inset: 0, pointerEvents: "none",
                        background: "linear-gradient(to right, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0) 68%)",
                        animation: `castShadowFade ${FLIP_MS}ms ${FLIP_EASE} forwards`,
                      }} />
                    )}
                  </div>
                )}
              </div>

              {/*
                ════════════════════════════════════════════════
                FLYING PAGE  —  sibling of static body
                ════════════════════════════════════════════════
                Lives OUTSIDE any overflow:hidden container so
                the 3D rotation is never clipped at page edges.

                HOW THE BACK FACE WORKS:
                  At 0°:    front face visible → page being turned
                  At -90°:  edge-on, neither face visible
                  At -180°: back face visible (now over opposite half)

                  back face has transform: rotateY(180deg)
                  parent at -180° → net = -180+180 = 0° → faces viewer
                  NO scaleX(-1) needed — content renders normally.
              */}
              {isFlipping && (() => {
                const isNext = flipState.dir === "next";
                return (
                  <div style={{
                    position: "absolute", inset: 0, zIndex: 10,
                    pointerEvents: "none",
                  }}>
                    {/* Container sized to one half, starting over the source page */}
                    <div style={{
                      position: "absolute", top: 0, bottom: 0,
                      ...(isNext
                        ? { left: `calc(50% + ${SPINE_W / 2}px)`, right: 0 }
                        : { left: 0, right: `calc(50% + ${SPINE_W / 2}px)` }
                      ),
                    }}>
                      {/* THE ROTATING CARD */}
                      <div
                        style={{
                          position: "absolute", inset: 0,
                          transformStyle: "preserve-3d",
                          transformOrigin: isNext ? "0% 50%" : "100% 50%",
                          willChange: "transform",            // ← GPU layer
                          animation: isNext
                            ? `flipNext ${FLIP_MS}ms ${FLIP_EASE} forwards`
                            : `flipPrev ${FLIP_MS}ms ${FLIP_EASE} forwards`,
                        }}
                        onAnimationEnd={onFlipDone}
                      >
                        {/* ── FRONT FACE: page being turned away ── */}
                        <div style={{
                          position: "absolute", inset: 0,
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden",
                          overflow: "hidden",
                        }}>
                          {isNext ? cell(fromR, "right") : cell(fromL, "left")}

                          {/* Lift/peel gradient */}
                          <div style={{
                            position: "absolute", inset: 0, pointerEvents: "none",
                            background: isNext
                              ? "linear-gradient(to left, rgba(0,0,0,0) 25%, rgba(0,0,0,0.25) 100%)"
                              : "linear-gradient(to right, rgba(0,0,0,0) 25%, rgba(0,0,0,0.25) 100%)",
                            animation: `liftGrad ${FLIP_MS}ms ${FLIP_EASE} forwards`,
                          }} />

                          {/* Gloss light sweep — simulates light catching the page */}
                          <div style={{
                            position: "absolute", top: 0, bottom: 0,
                            width: "35%", pointerEvents: "none",
                            background: "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)",
                            animation: `glossSweep ${FLIP_MS}ms ${FLIP_EASE} forwards`,
                          }} />
                        </div>

                        {/* ── BACK FACE: page revealed after turn ── */}
                        <div style={{
                          position: "absolute", inset: 0,
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden",
                          transform: "rotateY(180deg)",
                          overflow: "hidden",
                        }}>
                          {/* ✅ No scaleX(-1) — content renders correctly */}
                          {isNext ? cell(toL, "left") : cell(toR, "right")}

                          {/* Spine-edge shadow on back face */}
                          <div style={{
                            position: "absolute", inset: 0, pointerEvents: "none",
                            background: isNext
                              ? "linear-gradient(to right, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0) 58%)"
                              : "linear-gradient(to left,  rgba(0,0,0,0.32) 0%, rgba(0,0,0,0) 58%)",
                          }} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* ── Right corner curl hint (interactive) ── */}
              {!isFlipping && !isCover && !isLastAlone && spread < totalSpr - 1 && (
                <div
                  onMouseEnter={() => setHoverCurl(true)}
                  onMouseLeave={() => setHoverCurl(false)}
                  onClick={next}
                  style={{
                    position: "absolute", bottom: 0, right: 0,
                    width: hoverCurl ? 56 : 38,
                    height: hoverCurl ? 56 : 38,
                    cursor: "pointer", zIndex: 15,
                    transition: "width 0.22s ease, height 0.22s ease",
                  }}
                >
                  <div style={{
                    position: "absolute", inset: 0,
                    background: `linear-gradient(135deg, transparent 50%, rgba(0,0,0,${hoverCurl ? 0.24 : 0.12}) 50%)`,
                    transition: "background 0.22s ease",
                  }} />
                  <div style={{
                    position: "absolute", bottom: 0, right: 0,
                    width: hoverCurl ? 34 : 20,
                    height: hoverCurl ? 34 : 20,
                    background: "linear-gradient(135deg, #f0eade 50%, transparent 50%)",
                    boxShadow: hoverCurl ? "-4px -4px 10px rgba(0,0,0,0.22)" : "-2px -2px 5px rgba(0,0,0,0.1)",
                    transition: "all 0.22s ease",
                  }} />
                </div>
              )}

              {/* ── Left corner curl hint ── */}
              {!isFlipping && !isCover && !isLastAlone && spread > 0 && (
                <div
                  onClick={prev}
                  style={{
                    position: "absolute", bottom: 0, left: 0,
                    width: 36, height: 36,
                    cursor: "pointer", zIndex: 15,
                  }}
                >
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(225deg, transparent 50%, rgba(0,0,0,0.09) 50%)",
                  }} />
                  <div style={{
                    position: "absolute", bottom: 0, left: 0,
                    width: 18, height: 18,
                    background: "linear-gradient(225deg, #f0eade 50%, transparent 50%)",
                    boxShadow: "3px -3px 5px rgba(0,0,0,0.08)",
                  }} />
                </div>
              )}

            </div>{/* end perspective container */}

            {/* ── Click zones (positioned on the outer book div, not inside perspective) ── */}
            {!isCover && !isLastAlone && (
              <button
                onClick={prev}
                disabled={spread === 0 || isFlipping}
                aria-label="Previous page"
                style={{
                  position: "absolute", left: 0, top: 0,
                  width: "50%", height: "100%",
                  zIndex: 20, opacity: 0, background: "none", border: "none",
                  cursor: spread === 0 || isFlipping ? "default" : "pointer",
                }}
              />
            )}
            {!isLastAlone && (
              <button
                onClick={next}
                disabled={spread >= totalSpr - 1 || isFlipping}
                aria-label="Next page"
                style={{
                  position: "absolute",
                  ...(isCover ? { inset: 0 } : { right: 0, top: 0, width: "50%", height: "100%" }),
                  zIndex: 20, opacity: 0, background: "none", border: "none",
                  cursor: (spread >= totalSpr - 1 || isFlipping) ? "default" : "pointer",
                }}
              />
            )}

          </div>
          {/* END BOOK */}

          {/* RIGHT arrow */}
          <button
            onClick={next}
            disabled={spread >= totalSpr - 1 || isFlipping}
            style={{ ...arrowBtn, opacity: spread >= totalSpr - 1 || isFlipping ? 0.18 : 1 }}
            onMouseEnter={e => { if (!(spread >= totalSpr - 1 || isFlipping)) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
          >
            {I.next}
          </button>

        </div>{/* end navigation row */}

        {/* ── Page counter + slider ── */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, width: "100%" }}>
          {/* Page numbers */}
          <div style={{
            display: "flex", alignItems: "center", gap: 5,
            fontFamily: "'Courier New', monospace",
            fontSize: 10, letterSpacing: "0.14em",
            color: "rgba(255,255,255,0.2)",
          }}>
            {curL != null && <span>{curL + 1}</span>}
            {curL != null && curR != null && (
              <span style={{ color: "rgba(255,255,255,0.1)", margin: "0 1px" }}>–</span>
            )}
            {curR != null && <span>{curR + 1}</span>}
            <span style={{ color: "rgba(255,255,255,0.1)", margin: "0 5px" }}>/</span>
            <span style={{ color: "rgba(255,255,255,0.32)" }}>{total}</span>
          </div>

          {/* Slider */}
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            width: "100%", maxWidth: 300,
          }}>
            <span style={{ color: "rgba(255,255,255,0.14)", fontSize: 9, fontFamily: "monospace", minWidth: 14, textAlign: "right" }}>1</span>
            <div style={{
              position: "relative", flex: 1,
              height: 3, borderRadius: 99,
              background: "rgba(255,255,255,0.08)",
            }}>
              {/* Fill */}
              <div style={{
                position: "absolute", inset: "0 auto 0 0",
                width: `${(spread / sliderMax) * 100}%`,
                background: "linear-gradient(to right, #38bdf8, #6366f1)",
                borderRadius: 99,
                transition: "width 0.2s ease",
              }} />
              {/* Range input (invisible, interactive) */}
              <input
                type="range" min={0} max={sliderMax} step={1} value={spread}
                onChange={e => goTo(Number(e.target.value))}
                style={{
                  position: "absolute", inset: 0,
                  width: "100%", height: "100%",
                  opacity: 0, cursor: "pointer", margin: 0,
                }}
              />
              {/* Thumb dot */}
              <div style={{
                position: "absolute", top: "50%",
                left: `calc(${(spread / sliderMax) * 100}% - 7px)`,
                transform: "translateY(-50%)",
                width: 14, height: 14, borderRadius: "50%",
                background: "linear-gradient(135deg, #38bdf8, #6366f1)",
                boxShadow: "0 0 12px rgba(56,189,248,0.55), 0 0 0 2px rgba(255,255,255,0.14)",
                pointerEvents: "none",
                transition: "left 0.2s ease",
              }} />
            </div>
            <span style={{ color: "rgba(255,255,255,0.14)", fontSize: 9, fontFamily: "monospace", minWidth: 14 }}>{totalSpr}</span>
          </div>
        </div>

      </div>{/* end book stage */}

      {/* ── Bottom toolbar ── */}
      <div style={{
        position: "relative", zIndex: 20,
        display: "flex", justifyContent: "center",
        padding: "0 16px 22px",
      }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 1,
          background: "rgba(0,0,0,0.48)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 999,
          padding: "5px 8px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.022)",
        }}>
          <TB onClick={first} disabled={spread === 0}           title="First page">{I.first}</TB>
          <TB onClick={prev}  disabled={spread === 0}           title="Previous"  >{I.prev }</TB>
          <TBDivider />
          <TB onClick={() => setShowThumbs(v => !v)} active={showThumbs} title="Page thumbnails">{I.th}</TB>
          <TBDivider />
          <TB onClick={() => setZoom(z => Math.max(0.5, +(z - 0.15).toFixed(2)))} title="Zoom out">{I.zOut}</TB>
          <button
            onClick={() => setZoom(1)}
            title="Reset zoom"
            style={{
              padding: "0 6px", background: "none", border: "none",
              color: "rgba(255,255,255,0.3)", fontSize: 9,
              fontFamily: "'Courier New', monospace", letterSpacing: "0.08em",
              cursor: "pointer", minWidth: 38, textAlign: "center",
              transition: "color 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.color = "#fff"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}
          >
            {Math.round(zoom * 100)}%
          </button>
          <TB onClick={() => setZoom(z => Math.min(3, +(z + 0.15).toFixed(2)))} title="Zoom in">{I.zIn}</TB>
          <TBDivider />
          <TB onClick={() => setSound(v => !v)} active={sound} title="Flip sound">{sound ? I.sOn : I.sOff}</TB>
          <TB onClick={toggleFS} title="Fullscreen">{I.fs}</TB>
          <TBDivider />
          <TB onClick={next} disabled={spread >= totalSpr - 1} title="Next"     >{I.next}</TB>
          <TB onClick={last} disabled={spread >= totalSpr - 1} title="Last page">{I.last}</TB>
        </div>
      </div>

      {/* ── Keyframes ── */}
      <style>{`
        /* Next: right page sweeps left across spine  0° → -180° */
        @keyframes flipNext {
          from { transform: rotateY(0deg); }
          to   { transform: rotateY(-180deg); }
        }

        /* Prev: left page sweeps right across spine  0° → +180° */
        @keyframes flipPrev {
          from { transform: rotateY(0deg); }
          to   { transform: rotateY(180deg); }
        }

        /* Shadow arcs onto the receiving (static) page */
        @keyframes castShadow {
          0%   { opacity: 0; }
          18%  { opacity: 1; }
          72%  { opacity: 1; }
          100% { opacity: 0; }
        }

        /* Shadow fades off the page being uncovered */
        @keyframes castShadowFade {
          0%   { opacity: 0.65; }
          100% { opacity: 0; }
        }

        /* Peel/lift gradient on front face */
        @keyframes liftGrad {
          0%   { opacity: 0; }
          14%  { opacity: 1; }
          86%  { opacity: 1; }
          100% { opacity: 0; }
        }

        /* Light gloss sweeps across the turning page */
        @keyframes glossSweep {
          0%   { left: -35%; opacity: 0; }
          22%  { opacity: 1; }
          78%  { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}