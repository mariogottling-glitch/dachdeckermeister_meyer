(() => {
  const header = document.querySelector('.site-header');
  const button = header?.querySelector('.menu-toggle');
  const navigation = header?.querySelector('nav');
  if (!header) return;

  let lastY = window.scrollY;
  let ticking = false;

  const closeMenu = () => {
    navigation?.classList.remove('open');
    document.body.classList.remove('menu-open');
    button?.setAttribute('aria-expanded', 'false');
    button?.setAttribute('aria-label', 'Menü öffnen');
  };

  const updateHeader = (forceVisible = false) => {
    const currentY = Math.max(0, window.scrollY);
    const movingUp = currentY < lastY - 3;
    const movingDown = currentY > lastY + 3;
    const menuOpen = document.body.classList.contains('menu-open');

    header.classList.toggle('is-scrolled', currentY > 12);
    if (forceVisible || menuOpen || currentY < 96 || movingUp) {
      header.classList.remove('is-hidden');
      header.classList.add('is-visible');
    } else if (movingDown && currentY > 140) {
      header.classList.add('is-hidden');
      header.classList.remove('is-visible');
    }
    lastY = currentY;
  };

  button?.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    navigation?.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
    updateHeader(true);
  });

  navigation?.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });
  addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
  addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      updateHeader();
      ticking = false;
    });
  }, { passive:true });
  addEventListener('resize', () => {
    if (innerWidth > 900) closeMenu();
    updateHeader(true);
  });
  updateHeader(true);
})();
