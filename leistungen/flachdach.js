(() => {
  const cards = [...document.querySelectorAll('.flat-use')];
  const choice = document.querySelector('.flat-choice');
  const buildCards = [...document.querySelectorAll('.flat-build')];
  const buildChoice = document.querySelector('.flat-build-choice');
  let selectedUse = 'gruendach';
  let selectedBuild = 'abdichtung';
  const content = {
    gruendach: { title: 'Gründach', copy: 'Wir prüfen, ob Tragwerk, Abdichtung, Wurzelschutz und Entwässerung zusammenpassen.' },
    photovoltaik: { title: 'Photovoltaik', copy: 'Wir ordnen Dachzustand, Befestigung, Modulfelder, Leitungswege und Wartung als gemeinsames System.' },
    terrasse: { title: 'Dachterrasse', copy: 'Wir klären Tragwerk, Schutz der Abdichtung, Schwellen, Entwässerung und Absturzsicherung.' }
  };
  const buildContent = {
    abdichtung: { title: 'Abdichtung sichern', copy: 'Wir prüfen zuerst, ob eine gezielte Instandsetzung fachlich sinnvoll ist.' },
    energie: { title: 'Energetisch sanieren', copy: 'Wir betrachten Abdichtung, Gefälle, Wärme- und Feuchteschutz als abgestimmten Gesamtaufbau.' },
    nutzung: { title: 'Nutzung vorbereiten', copy: 'Wir planen Schutz-, Drän- und Nutzschichten passend zu Ihrer gewünschten Dachnutzung.' }
  };
  const syncInquiryLinks = () => {
    document.querySelectorAll('.flat-choice a, .flat-build-choice a').forEach((link) => {
      link.href = `../index.html?leistung=flachdach&nutzung=${selectedUse}&umfang=${selectedBuild}#anfrage`;
    });
  };
  cards.forEach((card) => card.querySelector('button')?.addEventListener('click', () => {
    const key = card.dataset.use;
    const selected = content[key];
    if (!selected || !choice) return;
    cards.forEach((item) => {
      const active = item === card;
      item.classList.toggle('is-selected', active);
      item.querySelector('button')?.setAttribute('aria-pressed', String(active));
    });
    choice.querySelector('strong').textContent = selected.title;
    choice.querySelector('p').textContent = selected.copy;
    selectedUse = key;
    syncInquiryLinks();
  }));
  buildCards.forEach((card) => card.querySelector('button')?.addEventListener('click', () => {
    const key = card.dataset.build;
    const selected = buildContent[key];
    if (!selected || !buildChoice) return;
    buildCards.forEach((item) => {
      const active = item === card;
      item.classList.toggle('is-selected', active);
      item.querySelector('button')?.setAttribute('aria-pressed', String(active));
    });
    buildChoice.querySelector('strong').textContent = selected.title;
    buildChoice.querySelector('p').textContent = selected.copy;
    selectedBuild = key;
    syncInquiryLinks();
  }));
  syncInquiryLinks();
})();
