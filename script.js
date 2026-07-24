const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
const siteHeader = document.querySelector('.site-header');
const reducedHeaderMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
let previousHeaderScroll = Math.max(0, scrollY);
let headerFramePending = false;

function updateFloatingHeader(forceVisible = false) {
  if (!siteHeader) return;
  const currentScroll = Math.max(0, scrollY);
  const scrollDelta = currentScroll - previousHeaderScroll;
  const atPageTop = currentScroll <= 24;
  const menuIsOpen = document.body.classList.contains('menu-open');

  siteHeader.classList.toggle('is-scrolled', !atPageTop);

  if (atPageTop) {
    siteHeader.classList.remove('is-hidden', 'is-visible');
  } else if (reducedHeaderMotion || menuIsOpen || forceVisible || scrollDelta < -5) {
    siteHeader.classList.remove('is-hidden');
    siteHeader.classList.add('is-visible');
  } else if (scrollDelta > 8) {
    siteHeader.classList.remove('is-visible');
    siteHeader.classList.add('is-hidden');
  }

  previousHeaderScroll = currentScroll;
  headerFramePending = false;
}

addEventListener('scroll', () => {
  if (headerFramePending) return;
  headerFramePending = true;
  requestAnimationFrame(() => updateFloatingHeader());
}, { passive: true });

updateFloatingHeader(true);

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open', !open);
  document.body.classList.toggle('menu-open', !open);
  updateFloatingHeader(!open);
  const menuLabel = menuButton.querySelector('.sr-only');
  if (menuLabel) menuLabel.textContent = open ? 'Menü öffnen' : 'Menü schließen';
});
nav?.addEventListener('click', event => {
  if (event.target.matches('a')) {
    nav.classList.remove('open');
    document.body.classList.remove('menu-open');
    menuButton.setAttribute('aria-expanded', 'false');
  }
});
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape' || menuButton?.getAttribute('aria-expanded') !== 'true') return;
  nav?.classList.remove('open');
  document.body.classList.remove('menu-open');
  menuButton.setAttribute('aria-expanded', 'false');
  const menuLabel = menuButton.querySelector('.sr-only');
  if (menuLabel) menuLabel.textContent = 'Menü öffnen';
  menuButton.focus();
});

/* Die mobile Anfrageleiste erscheint erst nach dem Startscreen. So konkurriert
   sie im Hero nicht mit dem dortigen Hauptbutton. */
const stickyCta = document.querySelector('.mobile-actions');
const heroCover = document.querySelector('.hero-cover');
const inquirySection = document.querySelector('#anfrage');
if (stickyCta && heroCover && inquirySection && 'IntersectionObserver' in window) {
  document.body.classList.add('sticky-cta-managed');
  const visibleCtaSections = new Set();
  const stickyCtaBlockers = [
    heroCover,
    inquirySection,
    ...document.querySelectorAll('.quick-access, .assembly, .concepts, .faq')
  ];
  const stickyCtaObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) visibleCtaSections.add(entry.target);
      else visibleCtaSections.delete(entry.target);
    });
    document.body.classList.toggle('sticky-cta-visible', visibleCtaSections.size === 0);
  }, { threshold: 0.12 });
  stickyCtaBlockers.forEach(section => stickyCtaObserver.observe(section));
}

/* Interne Hauptnavigation: Die angeheftete Tour wird als geschlossener Block
   übersprungen. Erst ab der ersten Inhaltssektion läuft der weiche Seitenweg. */
const sectionJumpVeil = document.querySelector('.section-jump-veil');
const firstSectionAfterTour = document.querySelector('#anfrage');
const tourSection = document.querySelector('#gebaeude-erleben');
const sectionJumpLinks = document.querySelectorAll('.site-header a[href^="#"]:not(.brand), [data-direct-step]');
let sectionJumpTimer;

sectionJumpLinks.forEach(link => link.addEventListener('click', event => {
  const hash = link.getAttribute('href');
  const target = hash ? document.querySelector(hash) : null;
  if (!target || !firstSectionAfterTour || !tourSection) return;

  const firstContentTop = firstSectionAfterTour.getBoundingClientRect().top + scrollY;
  if (scrollY >= firstContentTop - 4) return;

  event.preventDefault();
  clearTimeout(sectionJumpTimer);
  document.body.classList.add('section-jump-active');
  sectionJumpVeil?.setAttribute('aria-hidden', 'false');

  sectionJumpTimer = setTimeout(() => {
    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    const isDirectJump = link.hasAttribute('data-direct-step');
    (isDirectJump ? target : firstSectionAfterTour).scrollIntoView({ block: 'start', behavior: 'auto' });
    window.ScrollTrigger?.update();
    root.style.scrollBehavior = previousBehavior;
    history.pushState(null, '', hash);

    requestAnimationFrame(() => {
      document.body.classList.remove('section-jump-active');
      sectionJumpVeil?.setAttribute('aria-hidden', 'true');
      if (!isDirectJump && target !== firstSectionAfterTour) {
        target.scrollIntoView({ block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      }
    });
  }, 280);
}));

function initHeroBridge() {
  const cover = document.querySelector('.hero-cover');
  const coverStage = cover?.querySelector('.hero-cover-stage');
  const baseImage = coverStage?.querySelector('img');
  const shade = cover?.querySelector('.hero-shade');
  const coverVeil = cover?.querySelector('.hero-cover-veil');
  const coverContent = cover?.querySelectorAll('.hero-grid, .cover-scroll');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!cover || !coverStage || !baseImage || !coverVeil || reducedMotion || !window.gsap || !window.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);
  gsap.set(coverVeil, { autoAlpha: 0 });

  const bridge = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: cover,
      start: '16% top',
      end: '34% top',
      scrub: .72,
      invalidateOnRefresh: true
    }
  });

  bridge
    .to(coverContent, { autoAlpha: 0, y: -20, duration: .28 }, 0)
    .to(baseImage, { scale: 1.018, yPercent: -.35, duration: .72, ease: 'power1.inOut' }, 0)
    .to(shade, { opacity: .84, duration: .46 }, .1)
    .to(coverVeil, { autoAlpha: .32, duration: .24, ease: 'power2.inOut' }, .34)
    .to(coverStage, { autoAlpha: 0, duration: .38, ease: 'power2.inOut' }, .58);
}

function initCinematicHero() {
  const hero = document.querySelector('.cinematic-hero');
  if (!hero) return;

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion || !window.gsap || !window.ScrollTrigger) {
    hero.classList.add('is-static');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  const frames = [...hero.querySelectorAll('.hero-frame')];
  const scenes = [...hero.querySelectorAll('.hero-scene')];
  const progressItems = [...hero.querySelectorAll('.cinematic-progress span')];
  const markers = hero.querySelector('.overview-markers');
  const frameVeil = hero.querySelector('.frame-transition-veil');
  const flatLayers = [...hero.querySelectorAll('.flat-exploded i')];
  const facadeLayers = [...hero.querySelectorAll('.facade-layers i')];
  const flatBuildOrder = [...flatLayers].reverse();
  const facadeBuildOrder = [...facadeLayers].reverse();
  const flatMeta = [...hero.querySelectorAll('.flat-exploded .build-meta')];
  const facadeMeta = [...hero.querySelectorAll('.facade-layers .build-meta')];
  const flatRail = hero.querySelector('.flat-exploded .build-rail');
  const facadeRail = hero.querySelector('.facade-layers .build-rail');
  const systemSteps = [...hero.querySelectorAll('.system-chain span')];
  const scrollLabel = hero.querySelector('.cinematic-scroll span');
  let activeScene = -1;

  function setActiveScene(index) {
    if (index === activeScene) return;
    activeScene = index;
    hero.dataset.activeScene = String(index);
    scenes.forEach((scene, i) => {
      scene.classList.toggle('is-visible', i === index);
      scene.setAttribute('aria-hidden', String(i !== index));
    });
    progressItems.forEach((item, i) => item.classList.toggle('active', i === index));
    if (scrollLabel) scrollLabel.textContent = index === 5 ? 'Tour abgeschlossen' : 'Scrollen, um das Gebäude zu erkunden';
  }

  gsap.set(scenes, { autoAlpha: 0, y: 28 });
  gsap.set(scenes[0], { autoAlpha: 1, y: 0 });
  gsap.set(frames, { autoAlpha: 0, scale: 1.025 });
  gsap.set(frames[1], { autoAlpha: 1, scale: 1 });
  gsap.set(markers, { autoAlpha: 0 });
  gsap.set(frameVeil, { autoAlpha: 0 });
  gsap.set(flatLayers, { autoAlpha: 0, y: 14 });
  gsap.set(facadeLayers, { autoAlpha: 0, x: -18 });
  gsap.set([...flatMeta, ...facadeMeta], { autoAlpha: 0, y: 8 });
  gsap.set([flatRail, facadeRail], { scaleY: 0, transformOrigin: 'bottom center' });
  gsap.set(systemSteps, { autoAlpha: 0, y: 10 });
  setActiveScene(0);

  const timeline = gsap.timeline({
    defaults: { ease: 'power2.inOut' },
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: () => {
        const viewportFactor = matchMedia('(max-width: 640px)').matches
          ? 2.75
          : matchMedia('(max-width: 900px)').matches
            ? 3.5
            : 4.5;
        return `+=${innerHeight * viewportFactor}`;
      },
      pin: true,
      scrub: matchMedia('(max-width: 640px)').matches ? .55 : .78,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      /* Sechs gleich getaktete Szenen: Bildgradierung, Fortschritt und Text
         wechseln dadurch am selben Scrollpunkt. */
      onUpdate: self => setActiveScene(Math.min(5, Math.floor(self.progress * 6))),
      onLeave: () => closeCinematicTour()
    }
  });

  function transitionFrame(from, to, at, direction = 1) {
    timeline
      .to(frames[from], { scale: 1.035, xPercent: -.45 * direction, duration: .34, ease: 'power1.inOut' }, at)
      .to(frameVeil, { autoAlpha: 1, duration: .24, ease: 'power2.inOut' }, at + .08)
      .set(frames[from], { autoAlpha: 0, scale: 1, xPercent: 0 }, at + .32)
      .set(frames[to], { autoAlpha: 1, scale: 1.025, xPercent: .65 * direction }, at + .32)
      .to(frameVeil, { autoAlpha: 0, duration: .36, ease: 'power2.out' }, at + .33)
      .to(frames[to], { scale: 1, xPercent: 0, duration: .42, ease: 'power2.out' }, at + .33);
  }

  timeline.to(scenes[0], { autoAlpha: 0, y: -20, duration: .22 }, .48);
  transitionFrame(1, 2, .59);
  timeline.fromTo(scenes[1], { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: .26 }, 1.04);

  timeline.to(scenes[1], { autoAlpha: 0, y: -20, duration: .22 }, 1.48);
  transitionFrame(2, 3, 1.59);
  timeline.fromTo(scenes[2], { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: .26 }, 2.04);
  timeline.to(flatMeta, { autoAlpha: 1, y: 0, stagger: .04, duration: .16 }, 2.06);
  timeline.to(flatRail, { scaleY: 1, duration: .32, ease: 'power1.out' }, 2.06);
  timeline.to(flatBuildOrder, { autoAlpha: 1, y: 0, stagger: .035, duration: .13 }, 2.08);
  timeline.to(flatLayers, { autoAlpha: 0, y: -8, stagger: .015, duration: .16 }, 2.43);
  timeline.to(flatMeta, { autoAlpha: 0, y: -5, duration: .12 }, 2.43);
  timeline.to(flatRail, { scaleY: 0, duration: .14, transformOrigin: 'top center' }, 2.43);

  timeline.to(scenes[2], { autoAlpha: 0, y: -20, duration: .22 }, 2.48);
  transitionFrame(3, 4, 2.59, -1);
  timeline.fromTo(scenes[3], { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: .26 }, 3.04);
  timeline.to(facadeMeta, { autoAlpha: 1, y: 0, stagger: .04, duration: .16 }, 3.06);
  timeline.to(facadeRail, { scaleY: 1, duration: .32, ease: 'power1.out' }, 3.06);
  timeline.to(facadeBuildOrder, { autoAlpha: 1, x: 0, stagger: .035, duration: .13 }, 3.08);
  timeline.to(facadeLayers, { autoAlpha: 0, x: 10, stagger: .015, duration: .16 }, 3.43);
  timeline.to(facadeMeta, { autoAlpha: 0, y: -5, duration: .12 }, 3.43);
  timeline.to(facadeRail, { scaleY: 0, duration: .14, transformOrigin: 'top center' }, 3.43);

  timeline.to(scenes[3], { autoAlpha: 0, y: -20, duration: .22 }, 3.48);
  transitionFrame(4, 5, 3.59, -1);
  timeline.fromTo(scenes[4], { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: .26 }, 4.04);
  timeline.to(systemSteps, { autoAlpha: 1, y: 0, stagger: .035, duration: .12 }, 4.08);

  timeline.to(scenes[4], { autoAlpha: 0, y: -20, duration: .22 }, 4.48);
  transitionFrame(5, 0, 4.59, 0);
  timeline.fromTo(scenes[5], { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: .3 }, 5.04);
  timeline.to(markers, { autoAlpha: 1, duration: .35 }, 5.08);
  timeline.to({ hold: 0 }, { hold: 1, duration: .65, ease: 'none' }, 5.43);
  return timeline;
}

const tourLaunch = document.querySelector('[data-tour-launch]');
const tourExit = document.querySelector('[data-tour-exit]');
let heroTourStarted = false;
let heroTourTimeline = null;
let tourClosing = false;

function openCinematicTour(event) {
  event?.preventDefault();
  if (!tourSection) return;

  tourSection.hidden = false;
  tourSection.setAttribute('aria-hidden', 'false');
  tourSection.classList.add('tour-open');
  tourLaunch?.setAttribute('aria-expanded', 'true');

  requestAnimationFrame(() => {
    if (!heroTourStarted) {
      heroTourTimeline = initCinematicHero();
      heroTourStarted = true;
    }
    window.ScrollTrigger?.refresh();
    tourSection.scrollIntoView({
      block: 'start',
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    });
  });
}

function closeCinematicTour(event) {
  event?.preventDefault();
  if (!tourSection || tourSection.hidden || tourClosing) return;
  tourClosing = true;
  document.body.classList.add('section-jump-active');
  sectionJumpVeil?.setAttribute('aria-hidden', 'false');

  setTimeout(() => {
    heroTourTimeline?.scrollTrigger?.kill(true);
    heroTourTimeline?.kill();
    heroTourTimeline = null;
    heroTourStarted = false;
    tourSection.classList.remove('tour-open', 'is-static');
    tourSection.hidden = true;
    tourSection.setAttribute('aria-hidden', 'true');
    tourLaunch?.setAttribute('aria-expanded', 'false');
    window.ScrollTrigger?.refresh();
    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    firstSectionAfterTour?.scrollIntoView({ block: 'start', behavior: 'auto' });
    root.style.scrollBehavior = previousBehavior;
    history.replaceState(null, '', '#anfrage');

    requestAnimationFrame(() => {
      document.body.classList.remove('section-jump-active');
      sectionJumpVeil?.setAttribute('aria-hidden', 'true');
      tourClosing = false;
    });
  }, 220);
}

tourLaunch?.addEventListener('click', openCinematicTour);
tourExit?.addEventListener('click', closeCinematicTour);

const layerData = [
  ['Tragwerk', 'Lasten sicher aufnehmen und präzise in das Gebäude ableiten.'],
  ['Dämmung', 'Wärme im Haus halten, sommerliche Hitze und Schall draußen lassen.'],
  ['Unterdach', 'Feuchtigkeit kontrolliert abführen und die Konstruktion dauerhaft schützen.'],
  ['Eindeckung', 'Witterung zuverlässig abhalten und die Architektur sichtbar prägen.']
];
const layerButtons = [...document.querySelectorAll('.layer')];
const roofLayers = [...document.querySelectorAll('.roof-layer')];
function setLayer(index) {
  layerButtons.forEach((button, i) => {
    const selected = i === index;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  roofLayers.forEach((layer, i) => {
    layer.classList.toggle('active', i === index);
    layer.classList.toggle('complete', i < index);
  });
  document.querySelector('#layer-name').textContent = layerData[index][0];
  document.querySelector('#layer-detail').textContent = layerData[index][1];
}
layerButtons.forEach((button, index) => button.addEventListener('click', () => setLayer(index)));

const assembly = document.querySelector('.assembly');
function updateAssembly() {
  if (!assembly) return;
  const rect = assembly.getBoundingClientRect();
  const travel = assembly.offsetHeight - innerHeight;
  if (travel <= 0) return;
  const progress = Math.min(1, Math.max(0, -rect.top / travel));
  setLayer(Math.min(3, Math.floor(progress * 4)));
}
addEventListener('scroll', updateAssembly, { passive: true });
addEventListener('resize', updateAssembly, { passive: true });
updateAssembly();

const conceptData = {
  basis: {
    name: 'Basisdämmung',
    targetU: 0.24
  },
  premium: {
    name: 'Premiumdämmung',
    targetU: 0.18
  },
  exklusiv: {
    name: 'Exklusivdämmung',
    targetU: 0.14
  }
};
const conceptsSection = document.querySelector('.concepts');
const conceptTabs = [...document.querySelectorAll('[data-concept-select]')];
let activeConcept = 'premium';

function activateConcept(key, moveFocus = false) {
  const data = conceptData[key];
  if (!data || !conceptsSection) return;
  activeConcept = key;
  conceptsSection.dataset.concept = key;
  conceptTabs.forEach(tab => {
    const selected = tab.dataset.conceptSelect === key;
    tab.setAttribute('aria-checked', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    tab.textContent = selected ? 'Ausgewählt' : 'Für Vergleich wählen';
    if (selected && moveFocus) tab.focus();
  });
  document.querySelectorAll('[data-concept-card]').forEach(card => {
    card.classList.toggle('is-selected', card.dataset.conceptCard === key);
  });
  const preferredConcept = document.querySelector('input[name="preferred_concept"]');
  if (preferredConcept) preferredConcept.value = data.name;
}

conceptTabs.forEach(tab => tab.addEventListener('click', () => activateConcept(tab.dataset.conceptSelect)));
conceptTabs.forEach((tab, index) => tab.addEventListener('keydown', event => {
  let nextIndex;
  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % conceptTabs.length;
  if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + conceptTabs.length) % conceptTabs.length;
  if (event.key === 'Home') nextIndex = 0;
  if (event.key === 'End') nextIndex = conceptTabs.length - 1;
  if (nextIndex === undefined) return;
  event.preventDefault();
  activateConcept(conceptTabs[nextIndex].dataset.conceptSelect, true);
}));
activateConcept(activeConcept);

const services = {
  steildach: ['01', 'Konstruktion & Eindeckung', 'Steildächer mit klarer Linie.', 'Von der energetischen Sanierung bis zum Neubau: technisch sauber geplant, handwerklich präzise ausgeführt und passend zur Architektur Ihres Hauses.', 'assets/service-steildach.webp', 'Präzise ausgeführtes anthrazitfarbenes Steildach an einem modernen Wohnhaus', 'leistungen/steildach.html'],
  flachdach: ['02', 'Abdichtung & Entwässerung', 'Flachdächer ohne Kompromisse.', 'Sichere Abdichtung, durchdachte Entwässerung und kontrollierte Details – für langlebige Flächen auf Wohnhaus, Anbau oder Gewerbegebäude.', 'assets/service-flachdach.webp', 'Modernes Flachdach mit präziser Attika, Entwässerung und dezentem Gründachstreifen', 'leistungen/flachdach.html'],
  fassade: ['03', 'Wärmeschutz & Gebäudehaut', 'Fassaden, die dauerhaft schützen.', 'Dämmung, Bekleidung, Metallanschlüsse und Fensterdetails werden als zusammenhängende Gebäudehaut geplant – energetisch wirksam und architektonisch ruhig.', 'assets/hero-scenes/facade.webp', 'Moderne helle Fassade mit präzisen Fenster- und Dachanschlüssen', 'leistungen/fassaden.html'],
  fenster: ['04', 'Licht & Raumkomfort', 'Mehr Himmel. Mehr Zuhause.', 'Wir integrieren Dachfenster so, dass Tageslicht, Wärmeschutz, Verschattung und Anschlüsse als ein funktionierendes System zusammenspielen.', 'assets/service-dachfenster.webp', 'Großes Dachfenster bringt weiches Tageslicht in einen modernen Dachraum', 'leistungen/dachfenster.html'],
  terrasse: ['05', 'Abdichtung & Nutzfläche', 'Flächen, die trocken bleiben.', 'Terrassen und Balkone erhalten einen abgestimmten Aufbau aus Abdichtung, Gefälle, Entwässerung und belastbarem Belag.', 'assets/hero-scenes/terrace-balcony-v2.jpg', 'Moderne Dachterrasse mit Plattenbelag, Türanschluss und linearer Entwässerungsrinne', 'leistungen/terrassen-balkone.html'],
  service: ['06', 'Substanz & Werterhalt', 'Kleine Ursache. Sauber gelöst.', 'Wir finden Schäden früh, reparieren nachvollziehbar und dokumentieren den Zustand – damit aus einem Detail kein großes Problem wird.', 'assets/service-wartung.webp', 'Fachgerechte Kontrolle eines Metallanschlusses und der Dachrinne mit einem Messwerkzeug', 'leistungen/service-wartung.html']
};
const serviceTabs = [...document.querySelectorAll('[data-service]')];
function activateService(serviceKey) {
  const data = services[serviceKey];
  if (!data) return;
  serviceTabs.forEach(item => {
    const selected = item.dataset.service === serviceKey;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
  });
  const activeTab = serviceTabs.find(item => item.dataset.service === serviceKey);
  const servicePanel = document.querySelector('#service-panel');
  if (activeTab && servicePanel) servicePanel.setAttribute('aria-labelledby', activeTab.id);
  const tabRail = activeTab?.closest('.service-tabs');
  if (activeTab && tabRail) {
    const left = activeTab.offsetLeft - (tabRail.clientWidth - activeTab.offsetWidth) / 2;
    tabRail.scrollTo({ left: Math.max(0, left), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }
  ['#service-index', '#service-label', '#service-title', '#service-copy'].forEach((selector, index) => document.querySelector(selector).textContent = data[index]);
  const serviceImage = document.querySelector('#service-image');
  serviceImage.classList.add('changing');
  const revealServiceImage = () => serviceImage.classList.remove('changing');
  serviceImage.addEventListener('load', revealServiceImage, { once: true });
  serviceImage.src = data[4];
  serviceImage.alt = data[5];
  const serviceLink = document.querySelector('#service-link');
  if (serviceLink) serviceLink.href = data[6];
  if (serviceImage.complete) revealServiceImage();
}
serviceTabs.forEach(tab => tab.addEventListener('click', () => activateService(tab.dataset.service)));
serviceTabs.forEach((tab, index) => tab.addEventListener('keydown', event => {
  let nextIndex;
  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % serviceTabs.length;
  if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + serviceTabs.length) % serviceTabs.length;
  if (event.key === 'Home') nextIndex = 0;
  if (event.key === 'End') nextIndex = serviceTabs.length - 1;
  if (nextIndex === undefined) return;
  event.preventDefault();
  const nextTab = serviceTabs[nextIndex];
  activateService(nextTab.dataset.service);
  nextTab.focus();
}));
document.querySelectorAll('[data-service-target]').forEach(link => link.addEventListener('click', () => activateService(link.dataset.serviceTarget)));

document.querySelectorAll('.quick-access-head, .quick-card, .intro-copy, .principles article, .trust-panel, .concepts-heading, .concept-compare-grid, .section-head, .direct-service-head, .assistant-card, .timeline li, .partners-heading, .partner-node, .faq > div, .accordion details').forEach(item => item.classList.add('reveal'));
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('in'); observer.unobserve(entry.target); }
}), { threshold: .12, rootMargin: '0px 0px -40px' });
document.querySelectorAll('.reveal').forEach(item => observer.observe(item));

const inquiryForm = document.querySelector('#inquiry-form');
const formSteps = [...document.querySelectorAll('.form-step')];
const progressSteps = [...document.querySelectorAll('.wizard-progress span')];
const dynamicFields = document.querySelector('.dynamic-fields');
const formError = document.querySelector('#form-error');
const assistantModeButtons = [...document.querySelectorAll('[data-assistant="service"], [data-assistant="fenster"]')];
const assistantOtherButton = document.querySelector('[data-assistant="all"]');
const assistantKicker = document.querySelector('[data-assistant-kicker]');
const assistantHeading = document.querySelector('[data-assistant-heading]');
const assistantCopy = document.querySelector('[data-assistant-copy]');
const detailLegend = document.querySelector('[data-detail-legend]');
const progressDetail = document.querySelector('[data-progress-detail]');
const photoInput = inquiryForm?.querySelector('input[type="file"]');
const uploadList = inquiryForm?.querySelector('.upload-list');
const inquirySummary = inquiryForm?.querySelector('[data-inquiry-summary]');
const summaryEditButton = inquiryForm?.querySelector('[data-summary-edit]');
const formStartedInput = inquiryForm?.querySelector('input[name="form_started"]');
const inquiryExpandButton = document.querySelector('[data-inquiry-expand]');
const inquiryCollapseButton = document.querySelector('[data-inquiry-collapse]');
const maxPhotoCount = 5;
const maxPhotoSize = 5 * 1024 * 1024;
const maxPhotoTotal = 15 * 1024 * 1024;
const allowedPhotoTypes = ['image/jpeg', 'image/png', 'image/webp'];

function setInquiryExpanded(expanded, { focus = false } = {}) {
  if (!inquirySection || !inquiryForm) return;
  inquirySection.classList.add('is-collapsible');
  inquirySection.classList.toggle('is-expanded', expanded);
  inquiryExpandButton?.setAttribute('aria-expanded', String(expanded));
  inquiryForm.hidden = !expanded;
  inquiryForm.setAttribute('aria-hidden', String(!expanded));
  if (expanded) inquiryForm.removeAttribute('inert');
  else inquiryForm.setAttribute('inert', '');
  if (focus) requestAnimationFrame(() => {
    (expanded ? inquiryForm.querySelector('.assistant-switch button') : inquiryExpandButton)?.focus({ preventScroll: true });
  });
}
const inquiryRequestParams = new URLSearchParams(location.search);
const projectFields = {
  steildach: `
    <label>Dachtyp <span class="required-marker"><span aria-hidden="true">*</span><span class="sr-only"> Pflichtfeld</span></span><select name="roof_type" required><option value="">Bitte wählen</option><option>Satteldach</option><option>Walmdach</option><option>Anderer Dachtyp</option><option>Unbekannt</option></select></label>
    <label>Baujahr<input name="construction_year" inputmode="numeric" placeholder="z. B. 1985 oder unbekannt" /></label>
    <label>Geschätzte Dachfläche<input name="area" placeholder="z. B. 180 m²" /></label>
    <label>Dämmung vorhanden?<select name="insulation"><option>Unbekannt</option><option>Ja</option><option>Nein</option></select></label>
    <label>Ist das Dach undicht?<select name="leak"><option>Nein</option><option>Ja</option><option>Unklar</option></select></label>`,
  flachdach: `
    <label>Projektziel<select name="flat_roof_goal"><option>Noch offen</option><option>Abdichtung sichern</option><option>Energetisch sanieren</option><option>Nutzung vorbereiten</option></select></label>
    <label>Aktuelles Material<input name="material" placeholder="z. B. Bitumen, Kunststoff oder unbekannt" /></label>
    <label>Geschätzte Fläche<input name="area" placeholder="z. B. 80 m²" /></label>
    <label>Steht Wasser auf dem Dach?<select name="standing_water"><option>Nein</option><option>Ja</option><option>Unklar</option></select></label>
    <label>Ist eine Leckage sichtbar?<select name="leak"><option>Nein</option><option>Ja</option><option>Unklar</option></select></label>
    <label>Nutzungswunsch<input name="use" placeholder="z. B. Gründach, Photovoltaik oder Dachterrasse" /></label>`,
  fenster: `
    <label>Vorhaben <span class="required-marker"><span aria-hidden="true">*</span><span class="sr-only"> Pflichtfeld</span></span><select name="window_project" required><option value="">Bitte wählen</option><option>Austausch eines vorhandenen Fensters</option><option>Reparatur / Ersatzteil</option><option>Sonnenschutz / Zubehör</option><option>Neuer Einbau</option><option>Beratung</option></select></label>
    <label>Hersteller<select name="manufacturer"><option>VELUX</option><option>Roto</option><option>Braas / Dörken</option><option>Anderer Hersteller</option><option>Unbekannt</option></select></label>
    <div class="typeplate-guide wide" role="note"><span>Bei vorhandenem Fenster: Typenschild</span><strong>Fenster öffnen und hinter der oberen Griffleiste rechts oder links nachsehen.</strong><small>Am besten fotografieren Sie das komplette Schild. Alternativ übertragen Sie die vier Angaben unten. Bei einem Neueinbau lassen Sie diese Felder einfach frei.</small></div>
    <label>Fenstertyp<input name="window_type" autocomplete="off" placeholder="z. B. GGL oder GGU" /></label>
    <label>Größe<input name="window_size" autocomplete="off" placeholder="z. B. MK08" /></label>
    <label>Ausführungskennziffer<input name="window_variant" autocomplete="off" placeholder="z. B. 3066" /></label>
    <label>Serien- / Produktionscode<input name="serial_number" autocomplete="off" placeholder="z. B. 77 BC 01 N" /></label>
    <label>Anzahl<input type="number" name="quantity" min="1" value="1" /></label>
    <label>Raumnutzung<select name="room_use"><option>Noch offen</option><option>Wohn- / Schlafzimmer</option><option>Bad</option><option>Küche</option><option>Flur / Treppenhaus</option><option>Unbeheizter Dachraum</option></select></label>
    <label>Rahmenmaterial<select name="frame_material"><option>Noch offen</option><option>Pflegeleichte Kunststoffoberfläche</option><option>Klar lackiertes Holz</option><option>Weiß lackiertes Holz</option></select></label>
    <label>Bedienung<select name="electric"><option>Noch offen</option><option>Manuell</option><option>Solar</option><option>Elektrisch</option></select></label>
    <label>Wichtigste Anforderung<select name="window_priority"><option>Noch offen</option><option>Wärmeschutz</option><option>Hitzeschutz</option><option>Schallschutz</option><option>Besonders viel Tageslicht</option></select></label>
    <label>Sonnenschutz gewünscht?<select name="sun_protection"><option>Noch offen</option><option>Ja, innen</option><option>Ja, außen / Hitzeschutz</option><option>Nein</option></select></label>`,
  service: `
    <label>Art des Schadens <span class="required-marker"><span aria-hidden="true">*</span><span class="sr-only"> Pflichtfeld</span></span><select name="damage_type" required><option value="">Bitte wählen</option><option>Undichtigkeit</option><option>Sturmschaden</option><option>Lose oder gebrochene Bauteile</option><option>Wartung / Inspektion</option><option>Anderes Anliegen</option></select></label>
    <label>Dringlichkeit <span class="required-marker"><span aria-hidden="true">*</span><span class="sr-only"> Pflichtfeld</span></span><select name="urgency" required><option value="">Bitte wählen</option><option>Akut – Wasser tritt ein</option><option>Zeitnah prüfen</option><option>Planbare Wartung</option></select></label>
    <label>Dachart<select name="roof_type"><option>Unbekannt</option><option>Steildach</option><option>Flachdach</option></select></label>
    <label>Gebäudehöhe<select name="building_height"><option>Unbekannt</option><option>Bis 5 m / etwa 1 Geschoss</option><option>5–8 m / etwa 2 Geschosse</option><option>Über 8 m</option></select></label>
    <label>Dachzugang<select name="roof_access"><option>Unbekannt</option><option>Leiter von außen möglich</option><option>Ausstieg von innen</option><option>Gerüst / Arbeitsbühne erforderlich</option></select></label>
    <label>Versicherungsschaden?<select name="insurance"><option>Unklar</option><option>Ja</option><option>Nein</option></select></label>
    <div class="urgent-intake-note wide" data-urgent-note hidden role="note"><strong>Wasser tritt aktiv ein?</strong><span>Bitte sichern Sie den Gefahrenbereich und steigen Sie nicht selbst aufs Dach. Senden Sie die Angaben ab und rufen Sie bei unmittelbarem Handlungsbedarf zusätzlich an.</span><a href="tel:+4917643487351">0176 43487351 anrufen</a></div>
    <label class="wide">Was ist sichtbar?<textarea name="damage_notes" rows="3" placeholder="Wo tritt Feuchtigkeit auf? Welche Bauteile sind betroffen? Seit wann besteht das Problem?"></textarea></label>`,
  fassade: `
    <label>Vorhaben <span class="required-marker"><span aria-hidden="true">*</span><span class="sr-only"> Pflichtfeld</span></span><select name="facade_project" required><option value="">Bitte wählen</option><option>Neue Bekleidung</option><option>Energetische Sanierung</option><option>Reparatur</option><option>Beratung</option></select></label>
    <label>Gewünschtes Material<input name="facade_material" placeholder="z. B. Zink, Schiefer oder noch offen" /></label>
    <label>Geschätzte Fläche<input name="area" placeholder="z. B. 120 m²" /></label>
    <label>Sichtbare Schäden?<select name="damage"><option>Nein</option><option>Ja</option><option>Unklar</option></select></label>`,
  terrasse: `
    <label>Fläche <span class="required-marker"><span aria-hidden="true">*</span><span class="sr-only"> Pflichtfeld</span></span><select name="terrace_type" required><option value="">Bitte wählen</option><option>Balkon</option><option>Terrasse</option><option>Carport / genutzte Dachfläche</option></select></label>
    <label>Aktueller Belag<input name="surface" placeholder="z. B. Stein, Holz oder unbekannt" /></label>
    <label>Geschätzte Fläche<input name="area" placeholder="z. B. 25 m²" /></label>
    <label>Feuchtigkeit sichtbar?<select name="leak"><option>Nein</option><option>Ja</option><option>Unklar</option></select></label>`
};

function selectedProjectKey() {
  return inquiryForm?.querySelector('input[name="type"]:checked')?.dataset.key || '';
}
function renderProjectFields() {
  const key = selectedProjectKey();
  if (!key) {
    if (dynamicFields) dynamicFields.replaceChildren();
    inquiryForm?.removeAttribute('data-project');
    return;
  }
  if (dynamicFields) dynamicFields.innerHTML = projectFields[key];
  if (key === 'flachdach' && dynamicFields) {
    const useMap = { gruendach: 'Gründach', photovoltaik: 'Photovoltaik', terrasse: 'Dachterrasse' };
    const goalMap = { abdichtung: 'Abdichtung sichern', energie: 'Energetisch sanieren', nutzung: 'Nutzung vorbereiten' };
    const requestedUse = useMap[inquiryRequestParams.get('nutzung')];
    const requestedGoal = goalMap[inquiryRequestParams.get('umfang')];
    if (requestedUse) dynamicFields.querySelector('[name="use"]').value = requestedUse;
    if (requestedGoal) dynamicFields.querySelector('[name="flat_roof_goal"]').value = requestedGoal;
  }
  inquiryForm?.setAttribute('data-project', key);
  const uploadTitle = inquiryForm?.querySelector('.upload-field b');
  const uploadHint = inquiryForm?.querySelector('.upload-field small');
  if (uploadTitle) uploadTitle.textContent = key === 'fenster' ? 'Typenschild und Fenster fotografieren' : key === 'service' ? 'Schaden fotografieren' : 'Fotos hinzufügen';
  if (uploadHint) uploadHint.textContent = key === 'fenster' ? 'Bitte Typenschild sowie Innen- und Außenansicht · maximal 5 Bilder' : key === 'service' ? 'Übersicht und Detailaufnahmen · maximal 5 Bilder' : 'JPG, PNG oder WebP · maximal 5 Bilder · je 5 MB';
  updateUrgentNote();
}
function showFormStep(step, moveFocus = false) {
  let activeStep;
  clearFormError();
  inquiryForm?.querySelectorAll('[aria-invalid="true"]').forEach(markFieldValid);
  formSteps.forEach(item => {
    const active = Number(item.dataset.step) === step;
    item.classList.toggle('active', active);
    item.setAttribute('aria-hidden', String(!active));
    item.tabIndex = -1;
    if (active) activeStep = item;
  });
  progressSteps.forEach((item, index) => {
    const active = index === step - 1;
    item.classList.toggle('active', active);
    item.classList.toggle('complete', index < step - 1);
    if (index === step - 1) item.setAttribute('aria-current', 'step');
    else item.removeAttribute('aria-current');
  });
  inquiryForm?.setAttribute('data-current-step', String(step));
  if (step === 3) updateInquirySummary();
  if (moveFocus) requestAnimationFrame(() => {
    activeStep?.focus({ preventScroll: true });
    inquiryForm?.scrollIntoView({
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start'
    });
  });
}
function syncAssistantPresentation(key) {
  const content = {
    service: {
      kicker: 'Reparatur-Assistent',
      heading: 'Schaden melden.<br />Zeit sparen.',
      copy: 'Beschreiben Sie Schadensart, Dringlichkeit und Zugang und ergänzen Sie aussagekräftige Fotos. So kann Pierre Meyer den nächsten Schritt gezielt vorbereiten.',
      detail: 'Schadendaten',
      legend: 'Details zu Ihrem Schaden'
    },
    fenster: {
      kicker: 'Dachfenster-Assistent',
      heading: 'Fenster erfassen.<br />Passend lösen.',
      copy: 'Fotografieren Sie das Typenschild und erfassen Sie die vorhandene Fenstersituation. Damit lassen sich Austausch, Reparatur oder Zubehör präzise zuordnen.',
      detail: 'Fensterdaten',
      legend: 'Details zu Ihrem Dachfenster'
    },
    all: {
      kicker: 'Direkt-Service / Reparatur & Dachfenster',
      heading: 'Was können wir<br />für Sie lösen?',
      copy: 'Wählen Sie den passenden Assistenten. Reparaturschäden und vorhandene Dachfenster werden mit jeweils eigenen, gezielten Fragen erfasst.',
      detail: 'Projektdaten',
      legend: 'Details zu Ihrem Projekt'
    }
  }[key] || null;
  if (!content) return;

  assistantModeButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.assistant === key)));
  assistantOtherButton?.classList.toggle('active', key === 'all');
  if (assistantKicker) assistantKicker.textContent = content.kicker;
  if (assistantHeading) assistantHeading.innerHTML = content.heading;
  if (assistantCopy) assistantCopy.textContent = content.copy;
  if (detailLegend) detailLegend.textContent = content.legend;
  if (progressDetail) progressDetail.textContent = content.detail;
}
function openAssistant(key, moveFocus = false) {
  const input = inquiryForm?.querySelector(`input[data-key="${key}"]`);
  if (!input) return;
  input.checked = true;
  renderProjectFields();
  syncAssistantPresentation(key);
  showFormStep(2, moveFocus);
}
function clearFormError() {
  if (formError) formError.textContent = '';
  photoInput?.closest('.upload-field')?.classList.remove('has-error');
}
function markFieldValid(field) {
  field.removeAttribute('aria-invalid');
  const fieldErrorId = field.dataset.errorId;
  if (fieldErrorId) document.getElementById(fieldErrorId)?.remove();
  delete field.dataset.errorId;
  field.removeAttribute('aria-describedby');
  field.closest('label')?.classList.remove('has-error');
}
function showFieldError(field, message) {
  const label = field.closest('label');
  const safeName = (field.name || field.id || 'field').replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '');
  const fieldErrorId = `field-error-${safeName}`;
  document.getElementById(fieldErrorId)?.remove();
  const fieldError = document.createElement('span');
  fieldError.className = 'field-error';
  fieldError.id = fieldErrorId;
  fieldError.textContent = message;
  label?.append(fieldError);
  field.dataset.errorId = fieldErrorId;
  field.setAttribute('aria-invalid', 'true');
  field.setAttribute('aria-describedby', fieldErrorId);
  label?.classList.add('has-error');
}
function focusInvalidField(field) {
  field.focus({ preventScroll: true });
  requestAnimationFrame(() => (field.closest('label') || field).scrollIntoView({
    behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    block: 'center'
  }));
}
function stepIsValid(step) {
  const fields = formSteps[step - 1]?.querySelectorAll('input, select, textarea') || [];
  fields.forEach(markFieldValid);
  clearFormError();
  for (const field of fields) {
    if (!field.checkValidity()) {
      const label = field.closest('label');
      const labelText = [...(label?.childNodes || [])].find(node => node.nodeType === Node.TEXT_NODE)?.textContent.trim() || 'Pflichtfeld';
      const message = `Bitte ergänzen Sie „${labelText}“ mit einer gültigen Angabe.`;
      showFieldError(field, message);
      focusInvalidField(field);
      return false;
    }
  }
  return true;
}

function photosAreValid() {
  const files = [...(photoInput?.files || [])];
  const uploadField = photoInput?.closest('.upload-field');
  const fail = message => {
    uploadField?.classList.add('has-error');
    if (photoInput) showFieldError(photoInput, message);
    if (photoInput) focusInvalidField(photoInput);
    return false;
  };
  uploadField?.classList.remove('has-error');
  if (photoInput) markFieldValid(photoInput);
  if (files.length > maxPhotoCount) return fail(`Bitte wählen Sie höchstens ${maxPhotoCount} Fotos aus.`);
  if (files.some(file => file.type && !allowedPhotoTypes.includes(file.type))) return fail('Bitte verwenden Sie nur JPG-, PNG- oder WebP-Bilder.');
  if (files.some(file => file.size > maxPhotoSize)) return fail('Ein Foto ist größer als 5 MB. Bitte verkleinern Sie die Datei.');
  if (files.reduce((sum, file) => sum + file.size, 0) > maxPhotoTotal) return fail('Die ausgewählten Fotos sind zusammen größer als 15 MB.');
  return true;
}

function updateUrgentNote() {
  const urgency = dynamicFields?.querySelector('[name="urgency"]');
  const note = dynamicFields?.querySelector('[data-urgent-note]');
  if (note) note.hidden = urgency?.value !== 'Akut – Wasser tritt ein';
}

function formatFileSize(bytes) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1).replace('.', ',')} MB`;
}

function renderUploadFeedback() {
  const files = [...(photoInput?.files || [])];
  const uploadSummary = inquiryForm?.querySelector('.upload-summary');
  if (uploadSummary) uploadSummary.textContent = files.length ? `${files.length} ${files.length === 1 ? 'Foto ausgewählt' : 'Fotos ausgewählt'}` : '';
  if (!uploadList) return;
  uploadList.replaceChildren(...files.map((file, index) => {
    const row = document.createElement('div');
    const details = document.createElement('span');
    const name = document.createElement('strong');
    const size = document.createElement('small');
    const remove = document.createElement('button');
    name.textContent = file.name;
    size.textContent = formatFileSize(file.size);
    details.append(name, size);
    remove.type = 'button';
    remove.textContent = 'Entfernen';
    remove.setAttribute('aria-label', `${file.name} entfernen`);
    remove.addEventListener('click', () => {
      const transfer = new DataTransfer();
      files.forEach((item, itemIndex) => { if (itemIndex !== index) transfer.items.add(item); });
      photoInput.files = transfer.files;
      photoInput.dispatchEvent(new Event('change', { bubbles: true }));
      photoInput.focus();
    });
    row.append(details, remove);
    return row;
  }));
}

function updateInquirySummary() {
  if (!inquirySummary) return;
  const entries = [];
  const selectedType = inquiryForm?.querySelector('input[name="type"]:checked');
  if (selectedType) entries.push(['Anliegen', selectedType.value]);
  const skipValues = new Set(['', 'Unbekannt', 'Unklar', 'Noch offen', 'Nein']);
  dynamicFields?.querySelectorAll('input, select, textarea').forEach(field => {
    const value = String(field.value || '').trim();
    if (skipValues.has(value)) return;
    const label = field.closest('label');
    const labelText = [...(label?.childNodes || [])].find(node => node.nodeType === Node.TEXT_NODE)?.textContent.trim();
    if (labelText) entries.push([labelText, value]);
  });
  const photoCount = photoInput?.files?.length || 0;
  entries.push(['Fotos', photoCount ? `${photoCount} ausgewählt` : 'keine ausgewählt']);
  inquirySummary.replaceChildren(...entries.slice(0, 7).flatMap(([term, value]) => {
    const dt = document.createElement('dt');
    const dd = document.createElement('dd');
    dt.textContent = term;
    dd.textContent = value;
    return [dt, dd];
  }));
}

inquiryForm?.addEventListener('input', event => {
  if (event.target.matches('input, select, textarea') && event.target.checkValidity()) markFieldValid(event.target);
  if (!inquiryForm.querySelector('[aria-invalid="true"]')) clearFormError();
});
inquiryForm?.addEventListener('change', event => {
  if (event.target.matches('[name="urgency"]')) updateUrgentNote();
});
photoInput?.addEventListener('change', () => {
  clearFormError();
  renderUploadFeedback();
  photosAreValid();
});
summaryEditButton?.addEventListener('click', () => showFormStep(2, true));

inquiryForm?.querySelectorAll('input[name="type"]').forEach(input => input.addEventListener('change', () => {
  renderProjectFields();
  syncAssistantPresentation(input.dataset.key);
}));
assistantModeButtons.forEach(button => button.addEventListener('click', () => openAssistant(button.dataset.assistant, true)));
assistantOtherButton?.addEventListener('click', () => {
  syncAssistantPresentation('all');
  showFormStep(1, true);
});
inquiryExpandButton?.addEventListener('click', () => {
  syncAssistantPresentation('all');
  showFormStep(1);
  setInquiryExpanded(true, { focus: true });
});
inquiryCollapseButton?.addEventListener('click', () => setInquiryExpanded(false, { focus: true }));
document.querySelectorAll('a[href="#anfrage"]').forEach(link => link.addEventListener('click', () => setInquiryExpanded(true)));
document.querySelectorAll('[data-form-all]').forEach(link => link.addEventListener('click', () => {
  setInquiryExpanded(true);
  syncAssistantPresentation('all');
  showFormStep(1);
}));
const requestedService = inquiryRequestParams.get('leistung');
const requestedInput = inquiryForm?.querySelector(`input[data-key="${requestedService}"]`);
if (requestedInput) requestedInput.checked = true;
document.querySelectorAll('[data-preset]').forEach(link => link.addEventListener('click', () => {
  setInquiryExpanded(true);
  const input = inquiryForm?.querySelector(`input[data-key="${link.dataset.preset}"]`);
  const directStep = Number(link.dataset.directStep || 1);
  if (input) { input.checked = true; renderProjectFields(); syncAssistantPresentation(input.dataset.key); showFormStep(Math.min(3, Math.max(1, directStep))); }
}));
inquiryForm?.querySelectorAll('.next-step').forEach(button => button.addEventListener('click', () => {
  const current = Number(inquiryForm.dataset.currentStep || 1);
  if (!stepIsValid(current)) return;
  if (current === 2 && !photosAreValid()) return;
  if (current === 1) renderProjectFields();
  showFormStep(Math.min(3, current + 1), true);
}));
inquiryForm?.querySelectorAll('.prev-step').forEach(button => button.addEventListener('click', () => {
  const current = Number(inquiryForm.dataset.currentStep || 1);
  showFormStep(Math.max(1, current - 1), true);
}));
renderProjectFields();
if (requestedInput && ['service', 'fenster'].includes(requestedService)) openAssistant(requestedService);
else if (requestedInput) { syncAssistantPresentation('all'); showFormStep(1); }
else { syncAssistantPresentation('all'); showFormStep(1); }
setInquiryExpanded(location.hash === '#anfrage' || Boolean(requestedService));
addEventListener('hashchange', () => {
  if (location.hash === '#anfrage') setInquiryExpanded(true);
});
if (formStartedInput) formStartedInput.value = String(Math.floor(Date.now() / 1000));

function showSubmissionSuccess(message) {
  const status = inquiryForm?.querySelector('.form-status');
  if (!inquiryForm || !status) return;
  const heading = document.createElement('strong');
  const copy = document.createElement('p');
  const next = document.createElement('p');
  const phone = document.createElement('a');
  const restart = document.createElement('button');
  heading.textContent = 'Ihre Anfrage ist eingegangen';
  copy.textContent = message || 'Vielen Dank. Ihre Angaben wurden sicher übermittelt.';
  next.textContent = 'Wir prüfen die Informationen persönlich und melden uns zur Abstimmung. Bei einem akuten Schaden erreichen Sie uns zusätzlich telefonisch.';
  phone.href = 'tel:+4917643487351';
  phone.textContent = '0176 43487351 anrufen';
  restart.type = 'button';
  restart.className = 'text-button';
  restart.textContent = 'Neue Anfrage erfassen';
  restart.addEventListener('click', () => {
    inquiryForm.reset();
    inquiryForm.classList.remove('is-submitted');
    status.classList.remove('is-success');
    status.replaceChildren();
    if (formStartedInput) formStartedInput.value = String(Math.floor(Date.now() / 1000));
    renderUploadFeedback();
    renderProjectFields();
    syncAssistantPresentation('all');
    showFormStep(1, true);
  });
  status.replaceChildren(heading, copy, next, phone, restart);
  status.classList.add('is-success');
  inquiryForm.classList.add('is-submitted');
  status.focus({ preventScroll: true });
  requestAnimationFrame(() => status.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' }));
}

inquiryForm?.addEventListener('submit', async event => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = form.querySelector('.form-status');
  const submitButton = form.querySelector('button[type="submit"]');
  if (!stepIsValid(3) || !photosAreValid() || !submitButton) return;

  const originalButton = submitButton.innerHTML;
  clearFormError();
  status.textContent = '';
  status.classList.remove('is-success');
  submitButton.disabled = true;
  submitButton.textContent = 'Wird gesendet …';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || !payload.ok) throw new Error(payload.message || 'Die Anfrage konnte nicht gesendet werden.');
    showSubmissionSuccess(payload.message);
  } catch (error) {
    if (formError) {
      formError.textContent = `${error.message} Bitte versuchen Sie es erneut oder rufen Sie uns unter +49 176 43487351 an.`;
      formError.focus();
    }
    submitButton.disabled = false;
    submitButton.innerHTML = originalButton;
  }
});
