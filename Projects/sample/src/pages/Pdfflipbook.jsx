// PDFFlipbook.jsx — Heyzine-accurate smooth flip (back-face position fixed)
// ─────────────────────────────────────────────────────────────────────────────
// SETUP:  npm install pdfjs-dist
// Place your PDF at: src/assets/Website_Gallery_img/Profile_SESS.pdf
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef, useState, useCallback } from "react";
import samplePDF from "../assets/Website_Gallery_img/Profile_SESS.pdf";
import * as pdfjsLib from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.min?url";
pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

// ─────────────────────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────────────────────
const Ico = {
  prev:  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>,
  next:  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>,
  first: <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M11 17l-5-5 5-5M18 17l-5-5 5-5"/></svg>,
  last:  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M13 7l5 5-5 5M6 7l5 5-5 5"/></svg>,
  fs:    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M4 8V4h4M16 4h4v4M4 16v4h4M16 20h4v-4"/></svg>,
  zIn:   <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4M11 8v6M8 11h6"/></svg>,
  zOut:  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4M8 11h6"/></svg>,
  sOn:   <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/></svg>,
  sOff:  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>,
  th:    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
async function renderPage(pdf, pageNum, scale = 1.6) {
  const page = await pdf.getPage(pageNum);
  const vp   = page.getViewport({ scale });
  const canvas = document.createElement("canvas");
  canvas.width  = vp.width;
  canvas.height = vp.height;
  await page.render({ canvasContext: canvas.getContext("2d"), viewport: vp }).promise;
  return canvas.toDataURL("image/jpeg", 0.92);
}

function playFlipSound() {
  try {
    const ctx  = new (window.AudioContext || window.webkitAudioContext)();
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(520, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);
    osc.start(); osc.stop(ctx.currentTime + 0.16);
  } catch (_) {}
}

// spread 0 → cover only on right [null, 0]
// spread 1 → [1, 2], spread N → [2N-1, 2N]
function getSpreadPages(spreadIdx, totalPages) {
  if (spreadIdx === 0) return [null, 0];
  const l = spreadIdx * 2 - 1;
  const r = spreadIdx * 2;
  return [l < totalPages ? l : null, r < totalPages ? r : null];
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE CELL
// ─────────────────────────────────────────────────────────────────────────────
function PageCell({ dataUrl, pageNum, side, zoom }) {
  return (
    <div
      className="absolute inset-0 bg-white overflow-hidden flex items-center justify-center"
      style={{
        boxShadow: side === "left"
          ? "inset -6px 0 20px -4px rgba(0,0,0,0.12)"
          : "inset  6px 0 20px -4px rgba(0,0,0,0.12)",
      }}
    >
      {dataUrl ? (
        <img
          src={dataUrl}
          alt={`Page ${pageNum}`}
          draggable={false}
          style={{
            maxWidth: "100%", maxHeight: "100%",
            objectFit: "contain",
            transform: `scale(${zoom})`,
            transition: "transform .2s ease",
            userSelect: "none",
          }}
        />
      ) : (
        <div className="w-full h-full" style={{ background: "#f5f1eb" }} />
      )}
      {pageNum != null && (
        <span className="absolute bottom-2 left-0 right-0 text-center text-[9px] text-gray-300 select-none tracking-widest font-mono">
          {pageNum}
        </span>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TOOLBAR
// ─────────────────────────────────────────────────────────────────────────────
function TB({ onClick, disabled, active, title, children }) {
  return (
    <button onClick={onClick} disabled={disabled} title={title}
      className={[
        "w-7 h-7 flex items-center justify-center rounded-full transition-all duration-150",
        active ? "text-sky-400 bg-sky-400/20" : "text-white/50 hover:text-white hover:bg-white/10",
        "disabled:opacity-20 disabled:cursor-not-allowed",
      ].join(" ")}
    >{children}</button>
  );
}
function TBDiv() { return <div className="w-px h-3.5 bg-white/10 mx-1 flex-shrink-0" />; }

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function PDFFlipbook() {
  const [pages,      setPages]      = useState([]);
  const [thumbs,     setThumbs]     = useState([]);
  const [total,      setTotal]      = useState(0);
  const [totalSpr,   setTotalSpr]   = useState(0);
  const [spread,     setSpread]     = useState(0);
  const [loading,    setLoading]    = useState(true);
  const [progress,   setProgress]   = useState(0);
  const [flipState,  setFlipState]  = useState(null); // { dir, from, to } | null
  const [zoom,       setZoom]       = useState(1);
  const [sound,      setSound]      = useState(true);
  const [showThumbs, setShowThumbs] = useState(false);
  const [isFull,     setIsFull]     = useState(false);
  const wrapRef = useRef(null);

  // ── Load PDF ──────────────────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        const pdf = await pdfjsLib.getDocument(samplePDF).promise;
        const n = pdf.numPages;
        setTotal(n);
        setTotalSpr(Math.ceil((n + 1) / 2));
        const pArr = Array(n).fill(null);
        const tArr = Array(n).fill(null);
        for (let i = 1; i <= n; i++) {
          tArr[i - 1] = await renderPage(pdf, i, 0.28);
          setThumbs([...tArr]);
          setProgress(Math.round((i / n) * 35));
        }
        for (let i = 1; i <= n; i++) {
          pArr[i - 1] = await renderPage(pdf, i, 1.6);
          setPages([...pArr]);
          setProgress(35 + Math.round((i / n) * 65));
        }
        setLoading(false);
      } catch (err) { console.error(err); setLoading(false); }
    })();
  }, []);

  // ── Navigation ────────────────────────────────────────────────────────────
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

  const next  = () => goTo(spread + 1);
  const prev  = () => goTo(spread - 1);
  const first = () => goTo(0);
  const last  = () => goTo(totalSpr - 1);

  useEffect(() => {
    const h = (e) => { if (e.key === "ArrowRight") next(); if (e.key === "ArrowLeft") prev(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  });

  useEffect(() => {
    const h = () => setIsFull(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", h);
    return () => document.removeEventListener("fullscreenchange", h);
  }, []);

  function toggleFS() {
    if (!document.fullscreenElement) { wrapRef.current?.requestFullscreen(); setIsFull(true); }
    else { document.exitFullscreen(); setIsFull(false); }
  }

  // ── Spread pages ──────────────────────────────────────────────────────────
  const [curL, curR] = getSpreadPages(spread, total);
  const sliderMax    = Math.max(1, totalSpr - 1);

  const fromPages = flipState ? getSpreadPages(flipState.from, total) : [curL, curR];
  const toPages   = flipState ? getSpreadPages(flipState.to,   total) : [curL, curR];
  const [fromL, fromR] = fromPages;
  const [toL,   toR  ] = toPages;

  const isCover     = !isFlipping && spread === 0;
  const isLastAlone = !isFlipping && spread === totalSpr - 1 && curR === null;

  const img  = (idx) => (idx != null ? pages[idx] ?? null : null);
  const cell = (idx, side) => (
    <PageCell dataUrl={img(idx)} pageNum={idx != null ? idx + 1 : null} side={side} zoom={zoom} />
  );

  // ─────────────────────────────────────────────────────────────────────────
  // LOADING
  // ─────────────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-5"
        style={{ background: "radial-gradient(ellipse at 55% 35%, #192038 0%, #0b1020 100%)" }}>
        <div className="text-white/60 text-xs tracking-[0.25em] uppercase font-light animate-pulse">Rendering pages…</div>
        <div className="relative w-52 h-[3px] rounded-full bg-white/10 overflow-hidden">
          <div className="absolute inset-y-0 left-0 bg-sky-400 rounded-full transition-all duration-200" style={{ width: `${progress}%` }} />
        </div>
        <div className="text-white/25 text-[11px] font-mono">{progress}%</div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div ref={wrapRef} className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 55% 35%, #192038 0%, #0b1020 100%)" }}>

      {/* Grid texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,.7) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.7) 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }} />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none opacity-[0.07]"
        style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)", filter: "blur(40px)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none opacity-[0.05]"
        style={{ background: "radial-gradient(circle, #0ea5e9 0%, transparent 70%)", filter: "blur(40px)" }} />

      {/* ── Thumbnail sidebar ── */}
      <div className="absolute top-0 left-0 bottom-0 z-30 flex flex-col bg-[#0b1020]/96 backdrop-blur-md border-r border-white/[0.07] transition-all duration-300 overflow-hidden"
        style={{ width: showThumbs ? 208 : 0 }}>
        {showThumbs && (
          <>
            <div className="flex items-center justify-between px-3 pt-3 pb-2 border-b border-white/[0.07] flex-shrink-0">
              <span className="text-white/40 text-[10px] tracking-[0.22em] uppercase font-light">Pages</span>
              <button onClick={() => setShowThumbs(false)}
                className="text-white/30 hover:text-white/70 text-xl leading-none transition-colors w-6 h-6 flex items-center justify-center">×</button>
            </div>
            <div className="flex-1 overflow-y-auto p-2 grid grid-cols-2 gap-1.5 content-start"
              style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,.1) transparent" }}>
              {thumbs.map((src, i) => {
                const sp = i === 0 ? 0 : Math.ceil((i + 1) / 2);
                const active = sp === spread;
                return (
                  <button key={i} onClick={() => goTo(sp)}
                    className={`relative rounded overflow-hidden transition-all duration-150 border-2 ${active ? "border-sky-400 shadow-[0_0_10px_rgba(56,189,248,.35)]" : "border-transparent hover:border-white/20"}`}>
                    {src
                      ? <img src={src} alt={`p${i + 1}`} className="w-full h-auto block bg-white" />
                      : <div className="w-full aspect-[3/4] bg-white/5" />}
                    <span className="absolute bottom-0.5 right-1 text-[8px] text-white/40 font-mono">{i + 1}</span>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* ── Book stage ── */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4 py-6 px-4"
        style={{ marginLeft: showThumbs ? 208 : 0, transition: "margin .3s ease" }}>
        <div className="flex items-center gap-4 md:gap-6 w-full justify-center">

          <button onClick={prev} disabled={spread === 0 || isFlipping}
            className="flex-shrink-0 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 hover:bg-white/5 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-150">
            {Ico.prev}
          </button>

          {/* ════════════════ BOOK ════════════════ */}
          <div className="relative flex-shrink-0"
            style={{
              width:  (isCover || isLastAlone)
                ? "min(350px, calc((100vw - 160px) / 2))"
                : "min(700px, calc(100vw - 160px))",
              height: "min(500px, calc((100vw - 160px) * 0.715))",
              transition: "width 0.5s cubic-bezier(0.23,1,0.32,1)",
            }}>

            {/* Drop shadow */}
            <div className="absolute left-4 right-4 -bottom-3 h-5 blur-2xl rounded-full pointer-events-none"
              style={{ background: "rgba(0,0,0,0.8)" }} />

            {/* Book body — perspective lives here */}
            <div className="relative w-full h-full rounded-[2px] overflow-hidden"
              style={{
                boxShadow: "0 28px 80px rgba(0,0,0,.7), 0 0 0 1px rgba(255,255,255,.04)",
                perspective: "2000px",
                perspectiveOrigin: "50% 50%",
              }}>

              {/* ── STATIC BACKGROUND LAYER ── */}
              <div className="absolute inset-0 flex">

                {/* Left half */}
                {!isCover && (
                  <div className="relative flex-1 overflow-hidden">
                    {isFlipping
                      ? cell(flipState.dir === "next" ? toL : fromL, "left")
                      : cell(curL, "left")}
                    {/* Shadow sweeps over left page as right page flips across */}
                    {isFlipping && flipState.dir === "next" && (
                      <div className="absolute inset-0 pointer-events-none"
                        style={{
                          background: "linear-gradient(to left, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 70%)",
                          animation: "castShadow 0.82s cubic-bezier(0.645,0.045,0.355,1.000) forwards",
                        }} />
                    )}
                    {isFlipping && flipState.dir === "prev" && (
                      <div className="absolute inset-0 pointer-events-none"
                        style={{
                          background: "linear-gradient(to left, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 70%)",
                          animation: "castShadowFadeOut 0.82s cubic-bezier(0.645,0.045,0.355,1.000) forwards",
                        }} />
                    )}
                  </div>
                )}

                {/* Spine */}
                {!isCover && !isLastAlone && (
                  <div className="relative flex-shrink-0 z-10"
                    style={{
                      width: "6px",
                      background: "linear-gradient(to right, #080c18 0%, #1a2f5e 45%, #1a2f5e 55%, #080c18 100%)",
                      boxShadow: "0 0 18px rgba(0,0,0,.7)",
                    }}>
                    <div className="absolute inset-y-0 left-0 w-px bg-white/[0.06]" />
                    <div className="absolute inset-y-0 right-0 w-px bg-black/60" />
                  </div>
                )}

                {/* Right half */}
                {!isLastAlone && (
                  <div className="relative flex-1 overflow-hidden">
                    {isFlipping
                      ? cell(flipState.dir === "next" ? toR : fromR, "right")
                      : cell(curR, "right")}
                    {isFlipping && flipState.dir === "prev" && (
                      <div className="absolute inset-0 pointer-events-none"
                        style={{
                          background: "linear-gradient(to right, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 70%)",
                          animation: "castShadow 0.82s cubic-bezier(0.645,0.045,0.355,1.000) forwards",
                        }} />
                    )}
                    {isFlipping && flipState.dir === "next" && (
                      <div className="absolute inset-0 pointer-events-none"
                        style={{
                          background: "linear-gradient(to right, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 70%)",
                          animation: "castShadowFadeOut 0.82s cubic-bezier(0.645,0.045,0.355,1.000) forwards",
                        }} />
                    )}
                  </div>
                )}
              </div>

              {/* ── FLYING PAGE LAYER ── */}
              {/*
                HOW THE BACK FACE WORKS (the fix):
                ─────────────────────────────────────────────────────────
                The rotating card starts on the RIGHT half and pivots from
                its LEFT edge (transformOrigin "0% 50%").

                At 0°:   front face visible → shows fromR (current right page) ✓
                At 90°:  edge-on, neither face visible
                At 180°: back face visible

                When the card is at 180°, the entire card has physically
                moved to sit OVER the LEFT half of the book (it rotated
                across the spine). The back face is now facing the viewer.

                CSS rotateY(180deg) on the back face div means it faces
                backward relative to its parent. Combined with the parent's
                -180° rotation, the net is 0° → it faces the viewer correctly.

                The back face content (toL) should render NORMALLY — no
                scaleX(-1) needed. The content just needs to be positioned
                so it fills the card naturally (absolute inset-0).

                The ONLY thing that matters for correct appearance is:
                  • backfaceVisibility: "hidden" on both faces
                  • The back face has transform: rotateY(180deg)
                  • Content inside back face has NO additional transforms

                The previous bug was adding scaleX(-1) which double-mirrored
                the content, making it appear reversed at the start of the
                animation before the page crossed 90°.
                ─────────────────────────────────────────────────────────
              */}
              {isFlipping && (() => {
                const isNext = flipState.dir === "next";
                return (
                  <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 20 }}>
                    {/* Flying page container — covers the starting half only */}
                    <div style={{
                      position: "absolute",
                      top: 0, bottom: 0,
                      // NEXT: starts on right half, pivots from its left edge (spine)
                      // PREV: starts on left half, pivots from its right edge (spine)
                      ...(isNext
                        ? { left: "calc(50% + 3px)", right: 0 }
                        : { left: 0, right: "calc(50% + 3px)" }
                      ),
                    }}>
                      {/* The rotating card */}
                      <div
                        style={{
                          position: "absolute", inset: 0,
                          transformStyle: "preserve-3d",
                          // Pivot from the spine edge
                          transformOrigin: isNext ? "0% 50%" : "100% 50%",
                          animation: isNext
                            ? "flipNext 0.82s cubic-bezier(0.645,0.045,0.355,1.000) forwards"
                            : "flipPrev 0.82s cubic-bezier(0.645,0.045,0.355,1.000) forwards",
                        }}
                        onAnimationEnd={onFlipDone}
                      >
                        {/* ── FRONT FACE: the page being turned away ── */}
                        <div style={{
                          position: "absolute", inset: 0,
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden",
                        }}>
                          {isNext ? cell(fromR, "right") : cell(fromL, "left")}
                          {/* Lift gradient — page peeling off surface */}
                          <div style={{
                            position: "absolute", inset: 0, pointerEvents: "none",
                            background: isNext
                              ? "linear-gradient(to left, rgba(0,0,0,0) 40%, rgba(0,0,0,0.18) 100%)"
                              : "linear-gradient(to right, rgba(0,0,0,0) 40%, rgba(0,0,0,0.18) 100%)",
                            animation: "liftShadow 0.82s cubic-bezier(0.645,0.045,0.355,1.000) forwards",
                          }} />
                        </div>

                        {/* ── BACK FACE: the page revealed after the turn ── */}
                        {/*
                          transform: rotateY(180deg) makes this face backward.
                          When the parent rotates to -180° (flipNext), the net
                          rotation of this face = -180 + 180 = 0° → faces viewer.

                          Content renders NORMALLY here — NO scaleX(-1).
                          The card is now physically over the LEFT half of the book,
                          so toL (the new left page) fills it correctly.
                        */}
                        <div style={{
                          position: "absolute", inset: 0,
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden",
                          transform: "rotateY(180deg)",
                        }}>
                          {/* ✅ No scaleX(-1) — content renders correctly as-is */}
                          {isNext ? cell(toL, "left") : cell(toR, "right")}
                          {/* Spine shadow on the back face near the fold */}
                          <div style={{
                            position: "absolute", inset: 0, pointerEvents: "none",
                            background: isNext
                              ? "linear-gradient(to right, rgba(0,0,0,0.26) 0%, rgba(0,0,0,0) 52%)"
                              : "linear-gradient(to left,  rgba(0,0,0,0.26) 0%, rgba(0,0,0,0) 52%)",
                          }} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Page-curl corner hint */}
              {!isFlipping && !isCover && !isLastAlone && (
                <div className="absolute bottom-0 right-0 w-10 h-10 pointer-events-none z-10"
                  style={{ background: "linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.15) 50%)" }} />
              )}
            </div>

            {/* ── Click zones ── */}
            {!isCover && !isLastAlone && (
              <button onClick={prev} disabled={spread === 0 || isFlipping} aria-label="Previous page"
                className="absolute left-0 top-0 w-1/2 h-full z-20 opacity-0 cursor-pointer disabled:cursor-default" />
            )}
            {!isLastAlone && (
              <button onClick={next} disabled={spread >= totalSpr - 1 || isFlipping} aria-label="Next page"
                className={`absolute ${isCover ? "inset-0" : "right-0 top-0 w-1/2 h-full"} z-20 opacity-0 cursor-pointer disabled:cursor-default`} />
            )}
          </div>

          <button onClick={next} disabled={spread >= totalSpr - 1 || isFlipping}
            className="flex-shrink-0 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 hover:bg-white/5 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-150">
            {Ico.next}
          </button>
        </div>

        {/* Page counter */}
        {/* <div className="flex items-center gap-1.5 text-white/25 text-[11px] font-mono tracking-wider">
          {curL != null && <span>{curL + 1}</span>}
          {curL != null && curR != null && <span className="text-white/15 mx-0.5">–</span>}
          {curR != null && <span>{curR + 1}</span>}
          <span className="text-white/15 mx-1">/</span>
          <span className="text-white/35">{total}</span>
        </div> */}

        {/* Slider */}
        {/* <div className="flex items-center gap-3 w-full max-w-sm">
          <span className="text-white/20 text-[10px] font-mono w-3 text-right">1</span>
          <div className="relative flex-1 h-[3px] rounded-full bg-white/10">
            <div className="absolute inset-y-0 left-0 rounded-full transition-all duration-150"
              style={{ width: `${(spread / sliderMax) * 100}%`, background: "linear-gradient(to right,#38bdf8,#60a5fa)" }} />
            <input type="range" min={0} max={sliderMax} step={1} value={spread}
              onChange={(e) => goTo(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            <div className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full pointer-events-none transition-all duration-150"
              style={{
                left: `calc(${(spread / sliderMax) * 100}% - 7px)`,
                background: "linear-gradient(135deg,#38bdf8,#6366f1)",
                boxShadow: "0 0 10px rgba(56,189,248,.5), 0 0 0 2px rgba(255,255,255,.15)",
              }} />
          </div>
          <span className="text-white/20 text-[10px] font-mono w-3">{totalSpr}</span>
        </div> */}
      </div>

      {/* ── Bottom toolbar ── */}
      <div className="relative z-20 flex justify-center pb-5 px-4">
        <div className="flex items-center gap-0.5 bg-black/40 backdrop-blur-xl border border-white/[0.08] rounded-full px-2 py-1.5"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,.4),0 0 0 1px rgba(255,255,255,.025)" }}>
          <TB onClick={first} disabled={spread === 0}              title="First page" >{Ico.first}</TB>
          <TB onClick={prev}  disabled={spread === 0}              title="Previous"   >{Ico.prev }</TB>
          <TBDiv />
          <TB onClick={() => setShowThumbs(v => !v)} active={showThumbs} title="Thumbnails">{Ico.th}</TB>
          <TBDiv />
          <TB onClick={() => setZoom(z => Math.max(0.5, +(z - 0.1).toFixed(1)))} title="Zoom out">{Ico.zOut}</TB>
          <button onClick={() => setZoom(1)} title="Reset zoom"
            className="px-1.5 text-white/35 hover:text-white text-[10px] font-mono tracking-wide transition-colors min-w-[36px] text-center">
            {Math.round(zoom * 100)}%
          </button>
          <TB onClick={() => setZoom(z => Math.min(2.5, +(z + 0.1).toFixed(1)))} title="Zoom in">{Ico.zIn}</TB>
          <TBDiv />
          <TB onClick={() => setSound(v => !v)} active={sound} title="Flip sound">{sound ? Ico.sOn : Ico.sOff}</TB>
          <TB onClick={toggleFS} title="Fullscreen">{Ico.fs}</TB>
          <TBDiv />
          <TB onClick={next} disabled={spread >= totalSpr - 1} title="Next"      >{Ico.next}</TB>
          <TB onClick={last} disabled={spread >= totalSpr - 1} title="Last page" >{Ico.last}</TB>
        </div>
      </div>

      {/* ── Keyframes ── */}
      <style>{`
        /* NEXT: right page sweeps left across spine → 0° to -180° */
        @keyframes flipNext {
          from { transform: rotateY(0deg); }
          to   { transform: rotateY(-180deg); }
        }

        /* PREV: left page sweeps right across spine → 0° to +180° */
        @keyframes flipPrev {
          from { transform: rotateY(0deg); }
          to   { transform: rotateY(180deg); }
        }

        /* Shadow arcs onto the static receiving page during the flip */
        @keyframes castShadow {
          0%   { opacity: 0; }
          25%  { opacity: 1; }
          65%  { opacity: 1; }
          100% { opacity: 0; }
        }

        /* Shadow fades off the page being uncovered */
        @keyframes castShadowFadeOut {
          0%   { opacity: 0.5; }
          100% { opacity: 0; }
        }

        /* Gradient on flying page front-face — simulates peel/lift */
        @keyframes liftShadow {
          0%   { opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}