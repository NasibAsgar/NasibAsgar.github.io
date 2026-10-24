/* ───────────────────────────────────────────────────────────────
   The hero drawing: a sheer plan: the profile of an inland
   container vessel, floating on the brass load line that divides
   the hero from the page. Drawn once, on load, then still.
   ─────────────────────────────────────────────────────────────── */
(function () {
  const canvas = document.getElementById('lines');
  const hero = document.querySelector('.hero');
  const rule = document.querySelector('.waterline');
  if (!canvas || !hero || !rule) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const DURATION = 1500;
  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let g = null;

  /* The hull in its own units: x runs 0 (transom) to 1 (stem head),
     y is measured from the design waterline, down positive. */
  const DRAFT = 0.085, FREEBOARD = 0.072;

  function sheerY(x) {               // deck edge, with sheer rising at both ends
    const t = (x - 0.46) / 0.54;
    return -(FREEBOARD * (1 + 0.3 * t * t));
  }
  function outline() {
    const p = [];
    for (let i = 0; i <= 70; i++) {  // deck, transom to stem head
      const x = 0.02 + (0.98 * i) / 70;
      p.push([x, sheerY(x)]);
    }
    for (let i = 1; i <= 26; i++) {  // stem, raked and curving into the forefoot
      const t = i / 26;
      const x = 1.0 + (0.845 - 1.0) * t;
      const y = sheerY(1.0) + (DRAFT - sheerY(1.0)) * Math.pow(t, 1.9);
      p.push([x, y]);
    }
    for (let i = 1; i <= 24; i++) p.push([0.845 + (0.075 - 0.845) * (i / 24), DRAFT]);
    for (let i = 1; i <= 12; i++) { // transom, raked aft
      const t = i / 12;
      p.push([0.075 + (0.02 - 0.075) * t, DRAFT + (sheerY(0.02) - DRAFT) * t]);
    }
    return p;
  }
  const HULL = outline();

  function build() {
    const hr = hero.getBoundingClientRect();
    const rr = rule.getBoundingClientRect();
    const w = canvas.clientWidth, h = canvas.clientHeight;
    const narrow = w < 900;
    const len = narrow ? Math.min(w * 0.86, 460) : Math.min(w * 0.44, 580);
    const right = narrow ? (w + len) / 2 : Math.min(w - 20, (w + 1040) / 2);
    g = { w, h, len, x0: right - len, y0: rr.top - hr.top + 1 };
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(canvas.clientWidth * dpr);
    canvas.height = Math.round(canvas.clientHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    build();
  }

  const px = x => g.x0 + x * g.len;
  const py = y => g.y0 + y * g.len;

  function draw(p) {
    ctx.clearRect(0, 0, g.w, g.h);
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    // Hull outline, drawn stem to stern as one line.
    const n = Math.max(2, Math.round((HULL.length - 1) * Math.min(1, p / 0.62)));
    ctx.lineWidth = 1.4;
    ctx.strokeStyle = 'rgba(206, 226, 233, 0.5)';
    ctx.beginPath();
    for (let i = 0; i <= n; i++) {
      const [x, y] = HULL[i];
      if (i === 0) ctx.moveTo(px(x), py(y)); else ctx.lineTo(px(x), py(y));
    }
    ctx.stroke();

    // Stations and the deckhouse: the drawing's interior.
    const inner = Math.min(1, Math.max(0, (p - 0.5) / 0.35));
    if (inner > 0) {
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(173, 192, 200, ' + (0.2 * inner).toFixed(3) + ')';
      for (let i = 1; i <= 9; i++) {
        const x = 0.09 + (0.76 * i) / 10;
        ctx.beginPath();
        ctx.moveTo(px(x), py(DRAFT - 0.004));
        ctx.lineTo(px(x), py(sheerY(x)));
        ctx.stroke();
      }
      // Deckhouse aft, and the container tiers it looks over.
      ctx.strokeStyle = 'rgba(206, 226, 233, ' + (0.4 * inner).toFixed(3) + ')';
      ctx.beginPath();
      ctx.rect(px(0.07), py(sheerY(0.12) - 0.062), 0.14 * g.len, 0.062 * g.len);
      ctx.stroke();
      ctx.strokeStyle = 'rgba(173, 192, 200, ' + (0.26 * inner).toFixed(3) + ')';
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.rect(px(0.26 + i * 0.125), py(sheerY(0.5) - 0.042), 0.105 * g.len, 0.042 * g.len);
        ctx.stroke();
      }
    }

    // The load line itself, running aft along the hull.
    const sweep = Math.min(1, Math.max(0, (p - 0.66) / 0.34));
    if (sweep > 0) {
      ctx.lineWidth = 1.3;
      ctx.strokeStyle = 'rgba(220, 197, 143, 0.6)';
      ctx.beginPath();
      ctx.moveTo(px(0.97), py(0));
      ctx.lineTo(px(0.97 - 0.93 * (1 - Math.pow(1 - sweep, 2))), py(0));
      ctx.stroke();
    }
  }

  let start = null;
  function frame(now) {
    if (start === null) start = now;
    const p = Math.min(1, (now - start) / DURATION);
    draw(p);
    if (p < 1) requestAnimationFrame(frame);
  }

  resize();
  if (still) draw(1); else requestAnimationFrame(frame);

  let t;
  window.addEventListener('resize', () => {
    clearTimeout(t);
    t = setTimeout(() => { resize(); draw(1); }, 140);
  });
})();
