const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open', !open);
});
nav?.addEventListener('click', event => {
  if (event.target.matches('a')) {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }
});

function initHeroBridge() {
  const cover = document.querySelector('.hero-cover');
  const transitionImage = cover?.querySelector('.hero-cover-transition');
  const coverStage = cover?.querySelector('.hero-cover-stage');
  const baseImage = cover?.querySelector('img:not(.hero-cover-transition)');
  const shade = cover?.querySelector('.hero-shade');
  const coverVeil = cover?.querySelector('.hero-cover-veil');
  const coverContent = cover?.querySelectorAll('.hero-grid, .cover-scroll');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!cover || !coverStage || !transitionImage || !coverVeil || reducedMotion || !window.gsap || !window.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);
  gsap.set(transitionImage, { autoAlpha: 0, scale: 1 });
  gsap.set(coverVeil, { autoAlpha: 0 });

  const bridge = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: cover,
      start: '20% top',
      end: '40% top',
      scrub: 1.05,
      invalidateOnRefresh: true
    }
  });

  bridge
    .to(coverContent, { autoAlpha: 0, y: -20, duration: .28 }, 0)
    .to(coverVeil, { autoAlpha: 1, duration: .28, ease: 'power2.inOut' }, .08)
    .set(baseImage, { autoAlpha: 0 }, .36)
    .set(transitionImage, { autoAlpha: 1, scale: 1 }, .36)
    .to(shade, { opacity: .78, duration: .3 }, .36)
    .to(coverVeil, { autoAlpha: 0, duration: .36, ease: 'power2.out' }, .38)
    .to(coverStage, { autoAlpha: 0, duration: .18 }, .82);
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
  }

  gsap.set(scenes.slice(1), { autoAlpha: 0, y: 28 });
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
      end: () => `+=${innerHeight * 6}`,
      pin: true,
      scrub: 1.15,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: self => setActiveScene(Math.min(5, Math.floor(self.progress * 5.5)))
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
  timeline.to(flatBuildOrder, { autoAlpha: 1, y: 0, stagger: .055, duration: .18 }, 2.08);
  timeline.to(flatLayers, { autoAlpha: 0, y: -8, stagger: .015, duration: .16 }, 2.43);
  timeline.to(flatMeta, { autoAlpha: 0, y: -5, duration: .12 }, 2.43);
  timeline.to(flatRail, { scaleY: 0, duration: .14, transformOrigin: 'top center' }, 2.43);

  timeline.to(scenes[2], { autoAlpha: 0, y: -20, duration: .22 }, 2.48);
  transitionFrame(3, 4, 2.59);
  timeline.fromTo(scenes[3], { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: .26 }, 3.04);
  timeline.to(facadeMeta, { autoAlpha: 1, y: 0, stagger: .04, duration: .16 }, 3.06);
  timeline.to(facadeRail, { scaleY: 1, duration: .32, ease: 'power1.out' }, 3.06);
  timeline.to(facadeBuildOrder, { autoAlpha: 1, x: 0, stagger: .055, duration: .18 }, 3.08);
  timeline.to(facadeLayers, { autoAlpha: 0, x: 10, stagger: .015, duration: .16 }, 3.43);
  timeline.to(facadeMeta, { autoAlpha: 0, y: -5, duration: .12 }, 3.43);
  timeline.to(facadeRail, { scaleY: 0, duration: .14, transformOrigin: 'top center' }, 3.43);

  timeline.to(scenes[3], { autoAlpha: 0, y: -20, duration: .22 }, 3.48);
  transitionFrame(4, 5, 3.59);
  timeline.fromTo(scenes[4], { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: .26 }, 4.04);
  timeline.to(systemSteps, { autoAlpha: 1, y: 0, stagger: .045, duration: .18 }, 4.10);

  timeline.to(scenes[4], { autoAlpha: 0, y: -20, duration: .22 }, 4.48);
  transitionFrame(5, 0, 4.59, 0);
  timeline.fromTo(scenes[5], { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: .3 }, 5.04);
  timeline.to(markers, { autoAlpha: .82, duration: .35 }, 5.08);
}

initHeroBridge();
initCinematicHero();

const layerData = [
  ['Tragwerk', 'Lasten sicher aufnehmen und präzise in das Gebäude ableiten.'],
  ['Dämmung', 'Wärme im Haus halten, sommerliche Hitze und Schall draußen lassen.'],
  ['Unterdach', 'Feuchtigkeit kontrolliert abführen und die Konstruktion dauerhaft schützen.'],
  ['Eindeckung', 'Witterung zuverlässig abhalten und die Architektur sichtbar prägen.']
];
const layerButtons = [...document.querySelectorAll('.layer')];
const roofLayers = [...document.querySelectorAll('.roof-layer')];
function setLayer(index) {
  layerButtons.forEach((button, i) => button.classList.toggle('active', i === index));
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
  if (!assembly || innerWidth <= 640) return;
  const rect = assembly.getBoundingClientRect();
  const travel = assembly.offsetHeight - innerHeight;
  const progress = Math.min(1, Math.max(0, -rect.top / travel));
  setLayer(Math.min(3, Math.floor(progress * 4)));
}
addEventListener('scroll', updateAssembly, { passive: true });

const services = {
  steildach: ['01', 'Konstruktion & Eindeckung', 'Steildächer mit klarer Linie.', 'Von der energetischen Sanierung bis zum Neubau: technisch sauber geplant, handwerklich präzise ausgeführt und passend zur Architektur Ihres Hauses.', 'assets/service-steildach.webp', 'Präzise ausgeführtes anthrazitfarbenes Steildach an einem modernen Wohnhaus', 'leistungen/steildach.html'],
  flachdach: ['02', 'Abdichtung & Entwässerung', 'Flachdächer ohne Kompromisse.', 'Sichere Abdichtung, durchdachte Entwässerung und kontrollierte Details – für langlebige Flächen auf Wohnhaus, Anbau oder Gewerbegebäude.', 'assets/service-flachdach.webp', 'Modernes Flachdach mit präziser Attika, Entwässerung und dezentem Gründachstreifen', 'leistungen/flachdach.html'],
  fenster: ['03', 'Licht & Raumkomfort', 'Mehr Himmel. Mehr Zuhause.', 'Wir integrieren Dachfenster so, dass Tageslicht, Wärmeschutz, Verschattung und Anschlüsse als ein funktionierendes System zusammenspielen.', 'assets/service-dachfenster.webp', 'Großes Dachfenster bringt weiches Tageslicht in einen modernen Dachraum', 'leistungen/dachfenster.html'],
  pv: ['04', 'Energie & Dachintegration', 'Photovoltaik. Präzise integriert.', 'Wir betrachten Modulflächen, Befestigung, Leitungswege und Dachanschlüsse gemeinsam – für eine leistungsfähige Anlage ohne Kompromisse beim Wetterschutz.', 'assets/hero-scenes/roof-pv.webp', 'In das anthrazitfarbene Steildach integrierte Photovoltaikanlage', 'leistungen/steildach.html#photovoltaik'],
  fassade: ['05', 'Wärmeschutz & Gebäudehaut', 'Fassaden, die dauerhaft schützen.', 'Dämmung, Putz, Anschlüsse und Fensterdetails werden als zusammenhängende Gebäudehaut geplant – energetisch wirksam und architektonisch ruhig.', 'assets/hero-scenes/facade.webp', 'Moderne helle Fassade mit präzisen Fenster- und Dachanschlüssen', 'leistungen/fassaden.html'],
  klempnerei: ['06', 'Metall & Entwässerung', 'Bauklempnerei bis ins Detail.', 'Dachrinnen, Fallrohre, Attiken und Zinkanschlüsse führen Wasser kontrolliert ab und schützen besonders sensible Übergänge dauerhaft.', 'assets/service-wartung.webp', 'Präzise ausgeführter Metallanschluss und Dachrinne', 'leistungen/fassaden.html#bauklempnerei'],
  service: ['07', 'Substanz & Werterhalt', 'Kleine Ursache. Sauber gelöst.', 'Wir finden Schäden früh, reparieren nachvollziehbar und dokumentieren den Zustand – damit aus einem Detail kein großes Problem wird.', 'assets/service-wartung.webp', 'Fachgerechte Kontrolle eines Metallanschlusses und der Dachrinne mit einem Messwerkzeug', 'leistungen/service-wartung.html']
};
const serviceTabs = [...document.querySelectorAll('[data-service]')];
function activateService(serviceKey) {
  const data = services[serviceKey];
  if (!data) return;
  serviceTabs.forEach(item => item.setAttribute('aria-selected', String(item.dataset.service === serviceKey)));
  const activeTab = serviceTabs.find(item => item.dataset.service === serviceKey);
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
document.querySelectorAll('[data-service-target]').forEach(link => link.addEventListener('click', () => activateService(link.dataset.serviceTarget)));

document.querySelectorAll('.intro-copy, .principles article, .trust-panel, .section-head, .service-panel, .check-grid a, .timeline li, .partners-heading, .partner-node, .partner-future, .faq > div, .accordion details').forEach(item => item.classList.add('reveal'));
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('in'); observer.unobserve(entry.target); }
}), { threshold: .12, rootMargin: '0px 0px -40px' });
document.querySelectorAll('.reveal').forEach(item => observer.observe(item));

const inquiryForm = document.querySelector('#inquiry-form');
const formSteps = [...document.querySelectorAll('.form-step')];
const progressSteps = [...document.querySelectorAll('.wizard-progress span')];
const dynamicFields = document.querySelector('.dynamic-fields');
const projectFields = {
  steildach: `
    <label>Dachtyp<select name="roof_type" required><option value="">Bitte wählen</option><option>Satteldach</option><option>Walmdach</option><option>Anderer Dachtyp</option><option>Unbekannt</option></select></label>
    <label>Baujahr<input name="construction_year" inputmode="numeric" placeholder="z. B. 1985 oder unbekannt" /></label>
    <label>Geschätzte Dachfläche<input name="area" placeholder="z. B. 180 m²" /></label>
    <label>Dämmung vorhanden?<select name="insulation"><option>Unbekannt</option><option>Ja</option><option>Nein</option></select></label>
    <label>Ist das Dach undicht?<select name="leak"><option>Nein</option><option>Ja</option><option>Unklar</option></select></label>`,
  flachdach: `
    <label>Aktuelles Material<input name="material" placeholder="z. B. Bitumen, Kunststoff oder unbekannt" /></label>
    <label>Geschätzte Fläche<input name="area" placeholder="z. B. 80 m²" /></label>
    <label>Steht Wasser auf dem Dach?<select name="standing_water"><option>Nein</option><option>Ja</option><option>Unklar</option></select></label>
    <label>Ist eine Leckage sichtbar?<select name="leak"><option>Nein</option><option>Ja</option><option>Unklar</option></select></label>
    <label>Nutzung der Fläche<input name="use" placeholder="z. B. Garage, Wohnhaus, Terrasse" /></label>`,
  fenster: `
    <label>Vorhaben<select name="window_project" required><option value="">Bitte wählen</option><option>Neuer Einbau</option><option>Austausch</option><option>Beratung</option></select></label>
    <label>Anzahl<input type="number" name="quantity" min="1" placeholder="z. B. 2" /></label>
    <label>Hersteller<input name="manufacturer" placeholder="z. B. Velux oder unbekannt" /></label>
    <label>Elektrische Bedienung?<select name="electric"><option>Noch offen</option><option>Ja</option><option>Nein</option></select></label>
    <label>Sonnenschutz gewünscht?<select name="sun_protection"><option>Noch offen</option><option>Ja</option><option>Nein</option></select></label>`,
  service: `
    <label>Art des Schadens<select name="damage_type" required><option value="">Bitte wählen</option><option>Undichtigkeit</option><option>Sturmschaden</option><option>Lose oder gebrochene Bauteile</option><option>Wartung / Inspektion</option><option>Anderes Anliegen</option></select></label>
    <label>Dringlichkeit<select name="urgency" required><option value="">Bitte wählen</option><option>Akut – Wasser tritt ein</option><option>Zeitnah prüfen</option><option>Planbare Wartung</option></select></label>
    <label>Versicherungsschaden?<select name="insurance"><option>Unklar</option><option>Ja</option><option>Nein</option></select></label>`,
  fassade: `
    <label>Vorhaben<select name="facade_project" required><option value="">Bitte wählen</option><option>Neue Bekleidung</option><option>Energetische Sanierung</option><option>Reparatur</option><option>Beratung</option></select></label>
    <label>Gewünschtes Material<input name="facade_material" placeholder="z. B. Zink, Schiefer oder noch offen" /></label>
    <label>Geschätzte Fläche<input name="area" placeholder="z. B. 120 m²" /></label>
    <label>Sichtbare Schäden?<select name="damage"><option>Nein</option><option>Ja</option><option>Unklar</option></select></label>`,
  terrasse: `
    <label>Fläche<select name="terrace_type" required><option value="">Bitte wählen</option><option>Balkon</option><option>Terrasse</option><option>Carport / genutzte Dachfläche</option></select></label>
    <label>Aktueller Belag<input name="surface" placeholder="z. B. Stein, Holz oder unbekannt" /></label>
    <label>Geschätzte Fläche<input name="area" placeholder="z. B. 25 m²" /></label>
    <label>Feuchtigkeit sichtbar?<select name="leak"><option>Nein</option><option>Ja</option><option>Unklar</option></select></label>`
};

function selectedProjectKey() {
  return inquiryForm?.querySelector('input[name="type"]:checked')?.dataset.key || 'steildach';
}
function renderProjectFields() {
  if (dynamicFields) dynamicFields.innerHTML = projectFields[selectedProjectKey()];
}
function showFormStep(step) {
  formSteps.forEach(item => item.classList.toggle('active', Number(item.dataset.step) === step));
  progressSteps.forEach((item, index) => item.classList.toggle('active', index < step));
  inquiryForm?.setAttribute('data-current-step', String(step));
}
function stepIsValid(step) {
  const fields = formSteps[step - 1]?.querySelectorAll('input, select, textarea') || [];
  for (const field of fields) {
    if (!field.checkValidity()) { field.reportValidity(); return false; }
  }
  return true;
}

inquiryForm?.querySelectorAll('input[name="type"]').forEach(input => input.addEventListener('change', renderProjectFields));
const requestedService = new URLSearchParams(location.search).get('leistung');
const requestedInput = inquiryForm?.querySelector(`input[data-key="${requestedService}"]`);
if (requestedInput) requestedInput.checked = true;
document.querySelectorAll('[data-preset]').forEach(link => link.addEventListener('click', () => {
  const input = inquiryForm?.querySelector(`input[data-key="${link.dataset.preset}"]`);
  if (input) { input.checked = true; renderProjectFields(); showFormStep(1); }
}));
inquiryForm?.querySelectorAll('.next-step').forEach(button => button.addEventListener('click', () => {
  const current = Number(inquiryForm.dataset.currentStep || 1);
  if (!stepIsValid(current)) return;
  if (current === 1) renderProjectFields();
  showFormStep(Math.min(3, current + 1));
}));
inquiryForm?.querySelectorAll('.prev-step').forEach(button => button.addEventListener('click', () => {
  const current = Number(inquiryForm.dataset.currentStep || 1);
  showFormStep(Math.max(1, current - 1));
}));
renderProjectFields();
showFormStep(1);

inquiryForm?.addEventListener('submit', event => {
  event.preventDefault();
  const status = event.currentTarget.querySelector('.form-status');
  const rawName = String(new FormData(event.currentTarget).get('name') || '').trim();
  const name = rawName.split(' ')[0];
  status.textContent = `Danke${name ? `, ${name}` : ''}. Ihre Projektdaten sind vollständig vorbereitet – Pierre Meyer meldet sich persönlich.`;
  event.currentTarget.querySelector('button[type="submit"]').disabled = true;
});
