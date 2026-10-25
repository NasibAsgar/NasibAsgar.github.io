/* ───────────────────────────────────────────────────────────────
   Visit log.

   Records which network a visitor came from (a university shows up
   by name; a home connection shows up as its ISP), roughly where
   they are, which page they read, how long they stayed and how far
   they scrolled. Everything lands in your Google Sheet.

   It does not store IP addresses, set cookies, or identify people.
   The endpoint lives in ENDPOINT below; see the README for setup.
   ─────────────────────────────────────────────────────────────── */
(function () {
  var ENDPOINT = 'https://script.google.com/macros/s/AKfycbxovTQPXebHcY91MpD_K04JRFFj0qTjBCdW8f1aaU9wGsQT32rTwD-4nQBfM6y9WVet/exec';

  if (ENDPOINT.indexOf('PASTE') !== -1) return;              // not set up yet
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') return;
  if (navigator.doNotTrack === '1' || window.doNotTrack === '1') return;
  if (navigator.webdriver) return;
  if (/bot|crawl|spider|slurp|headless|lighthouse|pingdom|gtmetrix|facebookexternalhit|preview|monitor/i
      .test(navigator.userAgent)) return;

  var id = 'v' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  var started = Date.now();
  var visible = document.visibilityState === 'visible';
  var activeMs = 0, lastResume = started, deepest = 0, lastSent = 0;

  function send(payload) {
    var body = JSON.stringify(payload);
    try {
      if (navigator.sendBeacon &&
          navigator.sendBeacon(ENDPOINT, new Blob([body], { type: 'text/plain;charset=utf-8' }))) return;
    } catch (e) {}
    try {
      fetch(ENDPOINT, {
        method: 'POST', mode: 'no-cors', keepalive: true,
        headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: body
      });
    } catch (e) {}
  }

  function scrolled() {
    var h = document.documentElement;
    var reach = window.scrollY + window.innerHeight;
    var full = Math.max(h.scrollHeight, document.body ? document.body.scrollHeight : 0);
    return full <= window.innerHeight ? 100 : Math.min(100, Math.round((reach / full) * 100));
  }

  window.addEventListener('scroll', function () {
    var d = scrolled();
    if (d > deepest) deepest = d;
  }, { passive: true });

  /* The network lookup is cached for the session, so moving between
     pages costs one request, not one per page. */
  function network() {
    var cached = null;
    try { cached = sessionStorage.getItem('visit-net'); } catch (e) {}
    if (cached) { try { return Promise.resolve(JSON.parse(cached)); } catch (e) {} }
    return fetch('https://ipapi.co/json/', { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : {}; })
      .then(function (d) {
        var net = {
          network: d.org || '', asn: d.asn || '', city: d.city || '',
          region: d.region || '', country: d.country_name || ''
        };
        try { sessionStorage.setItem('visit-net', JSON.stringify(net)); } catch (e) {}
        return net;
      })
      .catch(function () { return { network: '', asn: '', city: '', region: '', country: '' }; });
  }

  /* The arrival is logged straight away, so a visit is never lost if
     the browser closes before the second message goes out. */
  network().then(function (net) {
    send({
      t: 'visit', id: id,
      network: net.network, asn: net.asn, city: net.city,
      region: net.region, country: net.country,
      page: location.pathname + location.hash,
      referrer: document.referrer || 'direct',
      device: window.innerWidth < 760 ? 'phone' : (window.innerWidth < 1100 ? 'tablet' : 'desktop'),
      language: navigator.language || ''
    });
  });

  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') { visible = true; lastResume = Date.now(); }
    else if (visible) { activeMs += Date.now() - lastResume; visible = false; close(); }
  });

  /* Sent whenever the reader leaves or switches away. A reader who
     comes back and leaves again simply updates the same row. */
  function close() {
    var now = Date.now();
    if (now - lastSent < 1000) return;
    lastSent = now;
    var total = activeMs + (visible ? now - lastResume : 0);
    send({ t: 'end', id: id, seconds: Math.round(total / 1000), scrolled: Math.max(deepest, scrolled()) });
  }
  window.addEventListener('pagehide', close);
})();
