/* ───────────────────────────────────────────────────────────────
   Site behaviour. Nothing here is required to read the page.
   ─────────────────────────────────────────────────────────────── */

/* Links: every button reads from LINKS in links.js. A value still
   containing "PASTE" hides its link, and its row, rather than
   showing a professor a dead end. */
document.querySelectorAll('[data-link]').forEach(el => {
  const key = el.dataset.link;
  const value = (typeof LINKS === 'object' && LINKS) ? LINKS[key] : null;
  if (!value || /PASTE/i.test(value)) { (el.closest('.row') || el).style.display = 'none'; return; }
  el.href = key === 'email'
    ? 'mailto:' + value + '?subject=' + encodeURIComponent('Ph.D. opportunity: Nasib Asgar')
    : value;
});
document.querySelectorAll('[data-link-text]').forEach(el => { el.textContent = LINKS.email; });

/* ── Theme ── */
(function () {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  const root = document.documentElement;
  const label = () => {
    const dark = root.dataset.theme === 'dark' ||
      (!root.dataset.theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    btn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  };
  label();
  btn.addEventListener('click', () => {
    const dark = root.dataset.theme === 'dark' ||
      (!root.dataset.theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    root.dataset.theme = dark ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
    label();
  });
})();

/* ── Mobile menu ── */
(function () {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Close' : 'Menu';
  });
  links.addEventListener('click', e => {
    if (e.target.closest('a') && links.classList.contains('open')) {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = 'Menu';
    }
  });
})();

/* ── How far down the page the reader is, drawn as a waterline
      across the lower edge of the nav. ── */
(function () {
  const nav = document.querySelector('nav');
  if (!nav) return;
  let queued = false;
  const mark = () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const pct = h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 0;
    nav.style.setProperty('--read', pct.toFixed(2) + '%');
    queued = false;
  };
  window.addEventListener('scroll', () => {
    if (!queued) { queued = true; requestAnimationFrame(mark); }
  }, { passive: true });
  mark();
})();

/* ── Toast ── */
const toast = (function () {
  let el, timer;
  return function (msg) {
    if (!el) {
      el = document.createElement('div');
      el.className = 'toast';
      el.setAttribute('role', 'status');
      document.body.appendChild(el);
    }
    el.textContent = msg;
    requestAnimationFrame(() => el.classList.add('shown'));
    clearTimeout(timer);
    timer = setTimeout(() => el.classList.remove('shown'), 2200);
  };
})();

/* ── Copy citation ── */
document.querySelectorAll('.cite-btn').forEach(btn => {
  btn.addEventListener('click', async () => {
    const text = btn.dataset.cite;
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch (_) {}
      document.body.removeChild(ta);
    }
    toast('Citation copied');
  });
});

/* ── Figures open full size ── */
(function () {
  const zoomable = document.querySelectorAll('.zoomable');
  if (!zoomable.length) return;

  const box = document.createElement('div');
  box.className = 'lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.innerHTML = '<button type="button" class="lightbox-close">Close</button><img alt="" />';
  document.body.appendChild(box);
  const img = box.querySelector('img');
  const closeBtn = box.querySelector('.lightbox-close');
  let opener = null;

  function open(src, alt, from) {
    img.src = src; img.alt = alt || '';
    opener = from;
    box.classList.add('open');
    requestAnimationFrame(() => box.classList.add('shown'));
    closeBtn.focus();
  }
  function close() {
    box.classList.remove('shown');
    setTimeout(() => { box.classList.remove('open'); img.src = ''; }, 200);
    if (opener) opener.focus();
  }

  zoomable.forEach(btn => {
    btn.addEventListener('click', () => {
      const i = btn.querySelector('img');
      if (i) open(i.currentSrc || i.src, i.alt, btn);
    });
  });
  closeBtn.addEventListener('click', close);
  box.addEventListener('click', e => { if (e.target === box || e.target === img) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && box.classList.contains('open')) close(); });
})();

/* ── Sentiment shares, raw against weighted.
      Switching the view animates the shift the weighting produced,
      which is the point of the figure. ── */
(function () {
  const card = document.getElementById('mfsChart');
  if (!card) return;
  const data = {
    raw:      { positive: 55.8, neutral: 14.3, negative: 29.8 },
    weighted: { positive: 70.2, neutral: 12.8, negative: 17.0 }
  };
  const rows = card.querySelectorAll('.bar-row');
  const buttons = card.querySelectorAll('.seg button');

  function show(view) {
    rows.forEach(row => {
      const key = row.dataset.class;
      const v = data[view][key];
      row.querySelector('.bar-fill').style.width = v + '%';
      row.querySelector('.bar-val').textContent = v.toFixed(1) + '%';
    });
    buttons.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.view === view)));
  }

  buttons.forEach(b => b.addEventListener('click', () => show(b.dataset.view)));

  requestAnimationFrame(() => show('raw'));
})();
