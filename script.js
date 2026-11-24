(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  /* ---------- Mobile navigation ---------- */
  const toggle = $('.mobile-toggle');
  const menu = $('.mobile-nav');
  const setMenu = (open) => {
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    document.body.classList.toggle('nav-open', open);
  };
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  $$('a', menu).forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) { setMenu(false); toggle.focus(); } });
  matchMedia('(min-width: 761px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });

  /* ---------- Header shadow once scrolled ---------- */
  const topbar = $('.topbar');
  const onScroll = () => topbar.classList.toggle('scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Scroll-spy for the desktop nav ---------- */
  const navLinks = $$('.desktop-nav a');
  const spyTargets = navLinks.map((a) => $(a.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((a) => {
          if (a.getAttribute('href') === `#${entry.target.id}`) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-30% 0px -65% 0px' });
    spyTargets.forEach((s) => spy.observe(s));
  }

  /* ---------- Reveal on scroll ---------- */
  const revealEls = $$('.reveal');
  if ('IntersectionObserver' in window && matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }

  /* ---------- Project filter (counts computed from the cards) ---------- */
  const filters = $$('[data-filter]');
  const cards = $$('[data-category]');
  filters.forEach((btn) => {
    const f = btn.dataset.filter;
    const n = f === 'all' ? cards.length : cards.filter((c) => c.dataset.category === f).length;
    $('span', btn).textContent = String(n).padStart(2, '0');
    btn.addEventListener('click', () => {
      filters.forEach((b) => { const on = b === btn; b.classList.toggle('active', on); b.setAttribute('aria-pressed', String(on)); });
      cards.forEach((card) => {
        card.hidden = f !== 'all' && card.dataset.category !== f;
        card.classList.add('in');
      });
    });
  });

  /* ---------- Screenshot lightbox ---------- */
  const box = $('.lightbox');
  if (box && typeof box.showModal === 'function') {
    const boxImg = $('img', box);
    $$('[data-full]').forEach((btn) => btn.addEventListener('click', () => {
      boxImg.src = btn.dataset.full;
      boxImg.alt = btn.dataset.alt || ($('img', btn) || {}).alt || '';
      box.showModal();
    }));
    $('.lightbox-close', box).addEventListener('click', () => box.close());
    box.addEventListener('click', (e) => { if (e.target === box) box.close(); });
  } else {
    // Old browsers: just open the image
    $$('[data-full]').forEach((btn) => btn.addEventListener('click', () => window.open(btn.dataset.full, '_blank', 'noopener')));
  }

  /* ---------- Copy email ---------- */
  const copyBtn = $('.copy-email');
  if (copyBtn && navigator.clipboard) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(copyBtn.dataset.copy);
        copyBtn.textContent = 'Copied ✓';
      } catch { copyBtn.textContent = 'Copy failed'; }
      setTimeout(() => { copyBtn.textContent = 'Copy'; }, 2000);
    });
  } else if (copyBtn) {
    copyBtn.hidden = true;
  }

  $('#year').textContent = new Date().getFullYear();
})();
