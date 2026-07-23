(() => {
  const cards = [...document.querySelectorAll('.pv-situations .flat-use')];
  const choice = document.querySelector('.pv-situations .flat-choice');
  const form = document.querySelector('#pv-inquiry-form');
  const selectedUseInput = form?.querySelector('input[name="pv_situation"]');
  const requestSelection = form?.querySelector('[data-request-selection]');
  const formStarted = form?.querySelector('input[name="form_started"]');
  const photoInput = form?.querySelector('input[type="file"]');
  const photoOutput = form?.querySelector('.flat-upload output');
  const formError = form?.querySelector('.flat-form__error');
  const formStatus = form?.querySelector('.flat-form__status');

  const situations = {
    steildach: 'Photovoltaik auf Steildach',
    flachdach: 'Photovoltaik auf Flachdach',
    sanierung: 'Dachsanierung mit Photovoltaik'
  };

  function selectSituation(card) {
    const title = situations[card.dataset.use];
    if (!title) return;
    cards.forEach((item) => {
      const active = item === card;
      item.classList.toggle('is-selected', active);
      item.querySelector('button')?.setAttribute('aria-pressed', String(active));
    });
    if (choice) {
      choice.querySelector('strong').textContent = title;
      choice.querySelector('p').textContent = 'Die Auswahl ist im Anfrageformular bereits eingetragen.';
      choice.querySelector('a').href = '#pv-anfrage';
    }
    if (selectedUseInput) selectedUseInput.value = title;
    if (requestSelection) requestSelection.textContent = title;
  }

  cards.forEach((card) => card.querySelector('button')?.addEventListener('click', () => selectSituation(card)));
  if (formStarted) formStarted.value = String(Math.floor(Date.now() / 1000));

  function setError(message = '') {
    if (!formError) return;
    formError.textContent = message;
    if (message) formError.focus({ preventScroll: true });
  }

  function photosAreValid() {
    const files = [...(photoInput?.files || [])];
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    let message = '';
    if (files.length > 5) message = 'Bitte wählen Sie höchstens fünf Fotos aus.';
    else if (files.some((file) => file.size > 5 * 1024 * 1024)) message = 'Jedes Foto darf maximal 5 MB groß sein.';
    else if (totalSize > 15 * 1024 * 1024) message = 'Die Fotos dürfen zusammen maximal 15 MB groß sein.';
    if (photoOutput) photoOutput.textContent = files.length ? `${files.length} ${files.length === 1 ? 'Foto ausgewählt' : 'Fotos ausgewählt'}` : '';
    setError(message);
    return !message;
  }

  function formIsValid() {
    const invalid = [...form.querySelectorAll('input:invalid, select:invalid, textarea:invalid')]
      .filter((field) => !field.closest('[aria-hidden="true"]'));
    if (!invalid.length) return true;
    const labels = [...new Set(invalid.map((field) => {
      if (field.type === 'checkbox') return 'Datenschutzzustimmung';
      const label = field.closest('label');
      const directText = [...(label?.childNodes || [])]
        .filter((node) => node.nodeType === Node.TEXT_NODE)
        .map((node) => node.textContent.replace('*', '').trim())
        .filter(Boolean)
        .join(' ');
      return directText || field.name;
    }))];
    setError(`Bitte prüfen Sie folgende Pflichtangaben: ${labels.join(', ')}.`);
    invalid[0].focus({ preventScroll: true });
    return false;
  }

  photoInput?.addEventListener('change', photosAreValid);

  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!formIsValid() || !photosAreValid()) return;
    const submitButton = form.querySelector('button[type="submit"]');
    if (!submitButton || !formStatus) return;
    const buttonCopy = submitButton.innerHTML;
    setError();
    submitButton.disabled = true;
    submitButton.textContent = 'Wird gesendet …';

    try {
      const response = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload.ok) throw new Error(payload.message || 'Die Anfrage konnte nicht gesendet werden.');

      const heading = document.createElement('strong');
      const copy = document.createElement('p');
      const next = document.createElement('p');
      const phone = document.createElement('a');
      heading.textContent = 'Ihre Photovoltaik-Anfrage ist eingegangen';
      copy.textContent = payload.message || 'Vielen Dank. Ihre Angaben wurden sicher übermittelt.';
      next.textContent = 'Team Meyer prüft Ihre Projektsituation, Dachangaben und Fotos persönlich und meldet sich zur Abstimmung.';
      phone.href = 'tel:+4917643487351';
      phone.textContent = '0176 43487351 anrufen';
      formStatus.replaceChildren(heading, copy, next, phone);
      form.classList.add('is-submitted');
      formStatus.focus({ preventScroll: true });
    } catch (error) {
      setError(`${error.message} Bitte versuchen Sie es erneut oder rufen Sie uns unter 0176 43487351 an.`);
      submitButton.disabled = false;
      submitButton.innerHTML = buttonCopy;
    }
  });
})();
