const K = [83, 69, 83, 83, 95, 98, 117, 105, 108, 100];
const d = (a) => new TextDecoder().decode(new Uint8Array(a.map((b, i) => b ^ K[i % K.length])));
const T = [
  [23, 32, 32, 58, 56, 12, 16, 13, 76, 66, 115, 1, 54, 37, 58, 14, 26, 25, 9, 0, 115, 39, 42],
  [26, 41, 50, 62, 47, 3, 7, 0, 24, 12, 58],
  [0, 42, 53, 39, 40, 3, 7, 12, 76, 32, 54, 51, 54, 63, 48, 18, 16, 27],
  [0, 0, 0, 0, 127, 160, 194, 73, 63, 22, 58, 101, 22, 50, 44, 21, 20, 27, 5, 68, 0, 38, 58, 54, 49, 22, 28, 15, 5, 7, 115, 22, 60, 63, 42, 22, 28, 6, 2],
];
const W = [32, 32, 32, 32, 59, 7, 3];
const L = {
  li: [59, 49, 39, 35, 44, 88, 90, 70, 27, 19, 36, 107, 63, 58, 49, 9, 16, 13, 5, 10, 125, 38, 60, 62, 112, 11, 27, 70, 5, 8, 50, 40, 35, 50, 45, 11, 1, 1, 5, 73, 32, 33, 54, 124],
  ig: [59, 49, 39, 35, 44, 88, 90, 70, 27, 19, 36, 107, 58, 61, 44, 22, 20, 14, 30, 5, 62, 107, 48, 60, 50, 77, 28, 5, 13, 9, 35, 36, 33, 58, 43, 10, 28, 54, 0, 11, 37, 32, 63, 42, 38, 61, 71, 88, 94, 75],
};
const LIFE = 9000;

const CSS = `
._ra{position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;padding:16px;
  background:radial-gradient(circle at 50% 45%,rgba(8,47,73,.55),rgba(2,6,23,.82));backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);
  opacity:0;transition:opacity .45s ease;font-family:'DM Sans',system-ui,-apple-system,'Segoe UI',sans-serif}
._ra._rb{opacity:1}
._rc{position:relative;width:min(520px,100%);border-radius:28px;padding:2px;overflow:hidden;
  transform:scale(.6) translateY(40px);opacity:0;transition:transform .7s cubic-bezier(.2,1.4,.35,1),opacity .5s;
  box-shadow:0 0 40px rgba(34,211,238,.45),0 0 120px rgba(168,85,247,.35),0 30px 80px rgba(0,0,0,.6)}
._rb ._rc{transform:none;opacity:1}
._rc:before{content:"";position:absolute;inset:-60%;background:conic-gradient(from 0deg,#22d3ee,#a855f7,#f43f5e,#facc15,#22d3ee);animation:_ksn 3.5s linear infinite}
._rd{position:relative;border-radius:26px;padding:44px 32px 34px;text-align:center;color:#fff;overflow:hidden;
  background:radial-gradient(120% 90% at 50% 0%,#0e2a47 0%,#0b1226 55%,#070b18 100%)}
._re{position:absolute;top:12px;right:14px;width:34px;height:34px;border-radius:50%;border:1px solid rgba(255,255,255,.18);
  background:rgba(255,255,255,.06);color:#cbd5e1;font-size:18px;line-height:1;cursor:pointer;z-index:2}
._re:hover{background:rgba(255,255,255,.16);color:#fff}
._rf{position:relative;width:84px;height:84px;margin:0 auto 18px;border-radius:50%;display:flex;align-items:center;justify-content:center;
  background:linear-gradient(135deg,#06b6d4,#8b5cf6);box-shadow:0 0 0 6px rgba(34,211,238,.12),0 0 40px rgba(34,211,238,.7);animation:_kpe 2s ease-in-out infinite}
._rf:before,._rf:after{content:"";position:absolute;inset:-6px;border-radius:50%;border:2px solid rgba(34,211,238,.6);animation:_krg 2s ease-out infinite}
._rf:after{animation-delay:1s}
._r10{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:11px;font-weight:500;letter-spacing:.28em;text-transform:uppercase;color:#7dd3fc;margin:0 0 14px}
._r11{margin:0;font-family:'Sora','DM Sans',system-ui,sans-serif;font-weight:700;font-size:clamp(30px,8vw,46px);line-height:1.1;letter-spacing:-.015em;text-transform:none;
  background:linear-gradient(100deg,#ffffff 0%,#e0f2fe 30%,#67e8f9 50%,#c4b5fd 70%,#ffffff 100%);background-size:250% 100%;
  -webkit-background-clip:text;background-clip:text;color:transparent;animation:_kse 6s ease-in-out infinite alternate;
  filter:drop-shadow(0 0 14px rgba(34,211,238,.35))}
._r12{width:64px;height:2px;margin:16px auto 0;border-radius:2px;background:linear-gradient(90deg,transparent,#22d3ee,#a855f7,transparent)}
._r13{display:inline-block;margin-top:16px;padding:7px 18px;border-radius:999px;font-size:13px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:#e0f2fe;
  background:rgba(34,211,238,.1);border:1px solid rgba(34,211,238,.4);box-shadow:inset 0 0 18px rgba(34,211,238,.15)}
._r14{margin:20px 0 0;font-size:12px;color:#64748b;letter-spacing:.06em}
._r19{position:absolute;left:0;bottom:0;height:4px;width:100%;transform-origin:left;
  background:linear-gradient(90deg,#22d3ee,#a855f7,#f43f5e);box-shadow:0 0 12px #22d3ee}
._r1a{position:absolute;border-radius:50%;pointer-events:none;background:#fff;box-shadow:0 0 8px 2px currentColor;animation:_kft linear infinite}
@keyframes _ksn{to{transform:rotate(360deg)}}
@keyframes _kse{from{background-position:0 0}to{background-position:100% 0}}
@keyframes _kpe{50%{box-shadow:0 0 0 10px rgba(34,211,238,.08),0 0 60px rgba(168,85,247,.8)}}
@keyframes _krg{from{transform:scale(1);opacity:.9}to{transform:scale(1.7);opacity:0}}
@keyframes _kft{from{transform:translateY(0);opacity:0}15%{opacity:1}to{transform:translateY(-260px);opacity:0}}
._r15{display:flex;justify-content:center;gap:12px;margin-top:22px}
._r15 a{display:inline-flex;align-items:center;gap:8px;padding:9px 16px;border-radius:12px;font-size:13px;font-weight:600;color:#fff;text-decoration:none;
  border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.05);transition:transform .2s,box-shadow .2s,background .2s,border-color .2s}
._r15 a:hover,._r15 a:focus-visible{transform:translateY(-2px);outline:none}
._r15 ._r16:hover,._r15 ._r16:focus-visible{background:#0a66c2;border-color:#0a66c2;box-shadow:0 0 22px rgba(10,102,194,.7)}
._r15 ._r17:hover,._r15 ._r17:focus-visible{background:linear-gradient(45deg,#f58529,#dd2a7b,#8134af);border-color:#dd2a7b;box-shadow:0 0 22px rgba(221,42,123,.6)}
._r18 ._r19{animation-play-state:paused!important}
@keyframes _r19{from{transform:scaleX(1)}to{transform:scaleX(0)}}
@media (prefers-reduced-motion:reduce){._rc:before,._r11,._rf,._rf:before,._rf:after,._r1a{animation:none}}
`;

const ICON =
  '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
  '<path d="M16 18l6-6-6-6"/><path d="M8 6l-6 6 6 6"/><path d="M14 4l-4 16"/></svg>';

const LI_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>';
const IG_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5.5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none"/></svg>';

let open = false;
function show() {
  if (open) return;
  open = true;
  if (!document.getElementById('_r1b')) {
    const st = document.createElement('style');
    st.id = '_r1b';
    st.textContent = CSS;
    document.head.appendChild(st);
  }
  const [a, b, c, e] = T.map(d);
  const ov = document.createElement('div');
  ov.className = '_ra';
  ov.setAttribute('role', 'dialog');
  ov.setAttribute('aria-label', `${a} ${b}`);
  const colors = ['#22d3ee', '#a855f7', '#f472b6', '#facc15'];
  let dots = '';
  for (let i = 0; i < 18; i++) {
    const s = 2 + Math.random() * 3;
    dots += `<span class="_r1a" style="left:${Math.random() * 100}%;bottom:${-10 + Math.random() * 30}px;width:${s}px;height:${s}px;color:${colors[i % 4]};animation-duration:${3 + Math.random() * 3}s;animation-delay:${Math.random() * 3}s"></span>`;
  }
  ov.innerHTML =
    `<div class="_rc"><div class="_rd">${dots}` +
    `<button type="button" class="_re" aria-label="Close">&times;</button>` +
    `<div class="_rf">${ICON}</div>` +
    `<p class="_r10">${a}</p>` +
    `<h2 class="_r11">${b}</h2><div class="_r12"></div>` +
    `<div class="_r13">${c}</div>` +
    `<p class="_r14">${e}</p>` +
    ((L.li.length || L.ig.length)
      ? `<div class="_r15">` +
        (L.li.length ? `<a class="_r16" href="${d(L.li)}" target="_blank" rel="noopener noreferrer">${LI_SVG}</a>` : '') +
        (L.ig.length ? `<a class="_r17" href="${d(L.ig)}" target="_blank" rel="noopener noreferrer">${IG_SVG}</a>` : '') +
        `</div>`
      : '') +
    `<div class="_r19" style="animation:_r19 ${LIFE}ms linear forwards"></div>` +
    `</div></div>`;
  let t;
  let left = LIFE;
  let since = 0;
  const run = () => { since = Date.now(); t = setTimeout(hide, left); };
  const pause = () => { if (!ov.classList.contains('_r18')) { clearTimeout(t); left -= Date.now() - since; ov.classList.add('_r18'); } };
  const resume = () => { if (ov.classList.contains('_r18')) { ov.classList.remove('_r18'); run(); } };
  const card = ov.querySelector('._rd');
  card.addEventListener('pointerenter', pause);
  card.addEventListener('pointerleave', resume);
  card.addEventListener('focusin', pause);
  const hide = () => {
    clearTimeout(t);
    document.removeEventListener('keydown', onKey);
    ov.classList.remove('_rb');
    setTimeout(() => { ov.remove(); open = false; }, 450);
  };
  const onKey = (e) => e.key === 'Escape' && hide();
  ov.addEventListener('click', (e) => { if (e.target === ov || e.target.closest('._re')) hide(); });
  document.addEventListener('keydown', onKey);
  document.body.appendChild(ov);
  requestAnimationFrame(() => requestAnimationFrame(() => ov.classList.add('_rb')));
  run();
}

export default function init() {
  if (typeof window === 'undefined' || window.__r) return;
  window.__r = 1;
  const hit = (e) => e.target.closest?.('[data-build]');
  document.addEventListener('mousedown', (e) => { if (e.detail > 1 && hit(e)) e.preventDefault(); });
  let taps = 0;
  let last = 0;
  document.addEventListener('click', (e) => {
    if (!hit(e) || e.target.closest('a')) return;
    const now = Date.now();
    taps = now - last < 600 ? taps + 1 : 1;
    last = now;
    if (taps >= 5) {
      taps = 0;
      window.getSelection?.().removeAllRanges();
      show();
    }
  });
  const word = d(W);
  let buf = '';
  document.addEventListener('keydown', (e) => {
    if (e.key.length !== 1 || e.target.closest?.('input,textarea,[contenteditable]')) return;
    buf = (buf + e.key.toLowerCase()).slice(-word.length);
    if (buf === word) show();
  });
}
