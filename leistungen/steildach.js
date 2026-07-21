(() => {
  const compare = document.querySelector('.roof-compare__media');
  const range = document.querySelector('.roof-compare__range');
  const cards = [...document.querySelectorAll('.roof-path')];
  const choice = document.querySelector('.roof-choice');

  range?.addEventListener('input', () => {
    compare?.style.setProperty('--compare', `${range.value}%`);
  });

  const content = {
    erhalt: {
      title: 'Eindeckung erhalten',
      copy: 'Wir prüfen zuerst, ob eine gezielte Instandsetzung technisch und wirtschaftlich sinnvoll ist.'
    },
    energie: {
      title: 'Energetisch sanieren',
      copy: 'Wir betrachten Dämmung, Luftdichtheit, Feuchteschutz und Eindeckung als gemeinsamen Dachaufbau.'
    },
    komplett: {
      title: 'Komplett erneuern',
      copy: 'Wir planen die betroffenen Schichten und alle wichtigen Anschlüsse als abgestimmten Neuaufbau.'
    }
  };

  cards.forEach((card) => {
    const button = card.querySelector('button');
    button?.addEventListener('click', () => {
      const key = card.dataset.path;
      const selected = content[key];
      if (!selected || !choice) return;
      cards.forEach((item) => {
        const active = item === card;
        item.classList.toggle('is-selected', active);
        item.querySelector('button')?.setAttribute('aria-pressed', String(active));
      });
      choice.querySelector('strong').textContent = selected.title;
      choice.querySelector('p').textContent = selected.copy;
      choice.querySelector('a').href = `../index.html?leistung=steildach&umfang=${key}#anfrage`;
    });
  });
})();
