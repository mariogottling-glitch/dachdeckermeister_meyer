(() => {
  const cards = [...document.querySelectorAll('.flat-use')];
  const choice = document.querySelector('.flat-choice');
  const content = {
    gruendach: { title: 'Gründach', copy: 'Wir prüfen, ob Tragwerk, Abdichtung, Wurzelschutz und Entwässerung zusammenpassen.' },
    photovoltaik: { title: 'Photovoltaik', copy: 'Wir ordnen Dachzustand, Befestigung, Modulfelder, Leitungswege und Wartung als gemeinsames System.' },
    terrasse: { title: 'Dachterrasse', copy: 'Wir klären Tragwerk, Schutz der Abdichtung, Schwellen, Entwässerung und Absturzsicherung.' }
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
    choice.querySelector('a').href = `../index.html?leistung=flachdach&nutzung=${key}#anfrage`;
  }));
})();
