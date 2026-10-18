// Apply the LINKS list to every element tagged with data-link.
// A link that is missing or still contains "PASTE" is hidden, with its row.
document.querySelectorAll('[data-link]').forEach(el => {
  const key = el.dataset.link;
  const value = LINKS[key];
  if (!value || /PASTE/i.test(value)) { (el.closest('.row') || el).style.display = 'none'; return; }
  el.href = key === 'email'
    ? 'mailto:' + value + '?subject=' + encodeURIComponent('Ph.D. opportunity: Nasib Asgar')
    : value;
});
document.querySelectorAll('[data-link-text]').forEach(el => { el.textContent = LINKS.email; });

// Mobile menu
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
  navToggle.textContent = open ? 'Close' : 'Menu';
});

// Copy citation
document.querySelectorAll('.cite-btn').forEach(btn => {
  btn.addEventListener('click', async () => {
    const text = btn.dataset.cite;
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch (_) {}
      document.body.removeChild(ta);
    }
    const old = btn.textContent;
    btn.textContent = 'Copied';
    setTimeout(() => { btn.textContent = old; }, 1600);
  });
});
